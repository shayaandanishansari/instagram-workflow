import { SLIDES, ASSETS, PROJECT, CANVAS } from '../data/active.js';
import { PROJECT_LIST } from '../data/projects/index.js';
import { setActiveId } from '../data/active.js';
import { getKit } from '../kits/index.js';
import { pad, inputId } from './helpers.js';
import { fitScalers } from './scale.js';
import { exportSlide, exportAll } from './export.js';

// Build every slot from SLIDES. No hardcoded slide count lives anywhere — the
// grid, index badges, download buttons, filenames and photo wiring all derive
// from the array.
export function render() {
  const grid = document.getElementById('grid');

  // The deck's KIT (its design) and, within that kit, its THEME (a palette
  // variant of that design). Both classes must live on the .slide element
  // itself, so their CSS vars resolve where html2canvas snapshots; both are
  // mirrored onto <body> so the studio chrome can be tinted to match.
  const KIT = getKit(PROJECT.kit);
  const themeCls = PROJECT.theme ? ' theme-' + PROJECT.theme : '';
  const kitCls = ' kit-' + KIT.id;
  document.body.classList.add('kit-' + KIT.id);
  if (PROJECT.theme) document.body.classList.add('theme-' + PROJECT.theme);

  // The deck's CANVAS (square feed post / story). The class sizes the .slide box
  // and its preview frame, and lets a kit that supports both shapes style the
  // difference (see src/lib/formats.js).
  const fmtCls = ' fmt-' + CANVAS.id;

  grid.innerHTML = SLIDES.map((s, idx) => {
    // A slide's `type` resolves against ITS KIT's layouts — two kits may both
    // define a `cover`, and they need not look remotely alike.
    const tpl = KIT.LAYOUTS[s.type];
    if (!tpl) return `<div class="slot"><div class="slot-name">Unknown type "${s.type}" in kit "${KIT.id}"</div></div>`;

    const photoUI = s.photo
      ? `<button class="photo-swap-btn" data-input="${inputId(idx)}">Replace photo</button>
         <input type="file" id="${inputId(idx)}" accept="image/*">`
      : '';

    return `
      <div class="slot">
        <div class="slot-head">
          <div class="slot-label"><span class="slot-index">${pad(idx + 1)}</span><span class="slot-name">${s.name}</span></div>
        </div>
        <div class="frame${fmtCls}"><div class="scaler${fmtCls}">
          <div class="${tpl.cls}${kitCls}${themeCls}${fmtCls}" id="slide-${idx + 1}">${tpl.render(s, idx)}${photoUI}</div>
        </div></div>
        <div class="slot-foot"><button class="btn-mini" data-export="${idx}">Download PNG</button></div>
      </div>`;
  }).join('\n');

  // Top-bar bits that depend on the deck.
  document.getElementById('brandLogo').src = ASSETS.logo;
  document.getElementById('brandCount').textContent =
    SLIDES.length + ' slides · ' + CANVAS.label + ' · ' + CANVAS.w + '×' + CANVAS.h;
  document.getElementById('exportAllBtn').textContent = 'Download all ' + SLIDES.length;
  document.getElementById('brandTitle').textContent = PROJECT.name;
  document.title = PROJECT.name + ' — Instagram Post Studio';

  wireProjectSwitcher();
  wireInteractions();
  wireSaving();
  fitScalers();
}

// Populate the project dropdown and switch decks on change. Switching persists
// the choice (localStorage) and reloads — active.js resolves the new deck at
// load, so render/export stay simple.
function wireProjectSwitcher() {
  const sel = document.getElementById('projectSelect');
  if (!sel) return;
  sel.innerHTML = PROJECT_LIST
    .map((p) => `<option value="${p.id}">${p.name}</option>`)
    .join('');
  sel.value = PROJECT.id;
  sel.addEventListener('change', () => {
    if (setActiveId(sel.value)) location.reload();
  });
}

// Persist text edits back to src/data/slides.js via the dev-server endpoint
// (see vite-plugin-save-slides.js). Dev only — the built static site has no
// backend, so there we simply leave edits ephemeral.
function wireSaving() {
  if (!import.meta.env.DEV) return;

  document.querySelectorAll('#grid [contenteditable]').forEach((ce) => {
    ce.addEventListener('focus', () => (ce.dataset.orig = ce.innerHTML));
    ce.addEventListener('blur', () => {
      if (ce.innerHTML === ce.dataset.orig) return; // nothing changed
      // A contenteditable may itself carry a data-field, or wrap several
      // (e.g. the cover wordmark holds both brand + desc).
      const fields = [ce, ...ce.querySelectorAll('[data-field]')].filter((n) => n.dataset.field);
      fields.forEach(saveField);
    });
  });
}

function saveField(node) {
  const slideEl = node.closest('[id^="slide-"]');
  if (!slideEl) return;
  const idx = Number(slideEl.id.split('-')[1]) - 1;
  const payload = {
    file: PROJECT.file, // which project file to write back to (e.g. 'stu.js')
    idx,
    field: node.dataset.field,
    index: node.dataset.index !== undefined ? Number(node.dataset.index) : undefined,
    value: node.innerHTML.trim(),
  };

  fetch('/__save-slide', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((r) => r.json())
    .then((res) => (res.ok ? toast('Saved') : toast('Save failed: ' + res.error, true)))
    .catch((e) => toast('Save failed: ' + e.message, true));
}

let toastTimer;
function toast(msg, isError) {
  let el = document.getElementById('save-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'save-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = 'show' + (isError ? ' error' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (el.className = ''), 1600);
}

function wireInteractions() {
  // Replace-photo buttons open their file input; the input sets the target bg.
  document.querySelectorAll('.photo-swap-btn').forEach((btn) => {
    btn.addEventListener('click', () => document.getElementById(btn.dataset.input).click());
  });

  document.querySelectorAll('input[type=file]').forEach((input) => {
    input.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (!file) return;
      // input id "photo-input-N" targets the photo element "photo-N"
      const target = document.getElementById(this.id.replace('photo-input-', 'photo-'));
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (target) target.style.backgroundImage = "url('" + ev.target.result + "')";
      };
      reader.readAsDataURL(file);
    });
  });

  document.querySelectorAll('[data-export]').forEach((btn) => {
    btn.addEventListener('click', () => exportSlide(+btn.dataset.export));
  });

  document.getElementById('exportAllBtn').addEventListener('click', exportAll);

  document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('Reset all text edits and photos back to the originals?')) location.reload();
  });
}
