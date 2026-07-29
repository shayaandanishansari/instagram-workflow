// Decoration for the `beacon` kit ONLY — the broadcast rings, the grain, the
// brandmark and the step track. Nothing here is engine; another kit brings its
// own motifs.
//
// Nothing in this file reads CANVAS or SLIDES at module scope: active.js →
// kits/index.js → every kit is a cycle, so a module-scope read here is a
// temporal-dead-zone crash (see shout/helpers.js for the same note).

const GRASS = '#16C257';

// ---------------------------------------------------------------------------
// THE BACKDROP — the whole idea of the kit: something is ON AIR, so the canvas
// is a signal going out. Concentric rings radiate from the live dot at the top,
// fading into the forest before they reach the edges.
//
// Drawn as ONE data-URI SVG rather than as stacked divs with border-radius:
// html2canvas rasterises an image faithfully but is unreliable with large
// radial gradients and ignores `filter`, so a glow built from blurred DOM would
// export looking nothing like the preview.
//
// The width/height attributes are LOAD-BEARING, not decoration: an SVG with only
// a viewBox has no intrinsic size, and html2canvas paints backgrounds with
// drawImage(), which draws nothing at all for a sizeless image — the layer then
// vanishes from the PNG while looking perfect on screen.
// ---------------------------------------------------------------------------
const RINGS = 13;
const CX = 500; // the rings' origin in a 1000x1000 viewBox: the live badge,
const CY = 300; // which sits at roughly 30% down the canvas.

function ringsSvg() {
  let circles = '';
  for (let i = 1; i <= RINGS; i++) {
    const r = i * 78;
    // Rings thin and fade as they travel — a pulse leaving, not a target.
    const w = (2.6 - i * 0.12).toFixed(2);
    const o = (0.4 - i * 0.026).toFixed(3);
    circles += `<circle cx="${CX}" cy="${CY}" r="${r}" fill="none" stroke="${GRASS}" stroke-opacity="${o}" stroke-width="${w}"/>`;
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">` +
    circles +
    `</svg>`;

  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

export const backdrop = () =>
  `<div class="rings" style="background-image:url('${ringsSvg()}')"></div>` +
  `<div class="grain"></div>`;

// The brandmark: the app icon and the product name, small, top-left. It is the
// only place the logo appears — the post is one card, so the mark states who is
// talking once and gets out of the way.
export const brandmark = (s) => `
  <div class="brandmark">
    ${s.logo ? `<img src="${s.logo}" alt="">` : ''}
    <span class="brandname" contenteditable="true" data-field="brand">${s.brand || ''}</span>
  </div>`;

// The status badge — a filled dot and a word. This is the piece that has to read
// at thumbnail size, so it is the brightest thing above the headline.
export const badge = (text) =>
  `<div class="badge"><span class="dot"></span><span class="badge-text" contenteditable="true" data-field="status">${text}</span></div>`;

// The track: the path THROUGH the product, in order, as arrow-separated steps.
// The deck supplies plain strings so each stays editable and saveable; the kit
// owns the separators and the colour rhythm (every other step picks up the
// gold, so a four-step track doesn't read as one grey rule).
export const track = (steps = []) =>
  steps
    .map(
      (w, i) =>
        `${i ? '<span class="sep">&rsaquo;</span>' : ''}<span class="step${i % 2 ? ' alt' : ''}" contenteditable="true" data-field="steps" data-index="${i}">${w}</span>`
    )
    .join('');
