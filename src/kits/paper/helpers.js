// Decoration for the `paper` kit only — the shared furniture every one of its
// slides draws: the ruled sheet's red margin rule, the wordmark on its swipe,
// the follower-count badge, and the carousel footer.
import { SLIDES } from '../../data/active.js';

export const rule = () => `<div class="rule"></div>`;

// The carousel footer: whatever the slide wants to say on the left, and on the
// right the position dots — the deck's own length, so they're always right —
// plus a swipe cue on every slide but the last. This is the bit that makes a
// slide read as one card of a post rather than a page.
export const foot = (idx, left = '') => {
  const last = idx === SLIDES.length - 1;
  const dots = SLIDES.map(
    (_, i) => `<span class="dot${i === idx ? ' on' : ''}"></span>`
  ).join('');
  return `
    <div class="foot">
      <div class="foot-left">${left}</div>
      <div class="foot-right">
        ${last ? '' : '<span class="swipe-cue">Swipe</span>'}
        <span class="dots">${dots}</span>
      </div>
    </div>`;
};

// The Highlighter wordmark. The swipe is a sibling span (not a pseudo-element)
// so html2canvas paints it; the text stays editable on top of it.
export const wordmark = (brand = 'Highlighter') => `
  <div class="wordmark">
    <span class="swipe"></span>
    <span class="wm-text" contenteditable="true" data-field="brand">${brand}</span>
  </div>`;

// The social glyphs, as <img> sources rather than CSS background-images:
// html2canvas collapses a background-image on an empty span to a speck, but it
// rasterises a data-URI <img> faithfully.
export const IG_ICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23FAF7EE' stroke-width='2'%3E%3Crect x='2.5' y='2.5' width='19' height='19' rx='5'/%3E%3Ccircle cx='12' cy='12' r='4.6'/%3E%3Ccircle cx='17.6' cy='6.4' r='1.3' fill='%23FAF7EE' stroke='none'/%3E%3C/svg%3E";

// The paper plane — Instagram's own Send/Share glyph, so the ask points at a
// control the viewer can actually see at the bottom of the post.
export const SEND_ICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%231C1B17' stroke-width='1.8' stroke-linejoin='round'%3E%3Cpath d='M21.5 2.5 2.8 9.4l7.1 2.7 2.7 7.1z'/%3E%3Cpath d='M21.5 2.5 9.9 12.1'/%3E%3C/svg%3E";

export const LI_ICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%231C1B17'%3E%3Cpath d='M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4z'/%3E%3C/svg%3E";

// `badge: { instagram, linkedin, note }` on a slide — omit the key, omit the badge.
export const badge = (b) =>
  !b
    ? ''
    : `<div class="badge">
        <div><span class="num"><span class="mark mark-pink">${b.instagram}</span></span> <span class="lbl">Instagram</span></div>
        <div><span class="num"><span class="mark mark-blue">${b.linkedin}</span></span> <span class="lbl">LinkedIn</span></div>
        <div class="growing"><span class="dot"></span>${b.note || 'Growing!'}</div>
      </div>`;
