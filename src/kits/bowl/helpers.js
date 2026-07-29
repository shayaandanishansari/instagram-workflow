// Decoration for the `bowl` kit only — the furniture every one of its slides
// draws: the logo lockup, the mono status pill, and the carousel footer.
//
// SLIDES/ASSETS are imported here but only ever dereferenced INSIDE a function:
// active.js -> kits/index.js -> this file is an import cycle, so touching them
// at module scope is a temporal-dead-zone crash (see CLAUDE.md).
import { SLIDES, ASSETS } from '../../data/active.js';

// The lockup: the bowl, then the wordmark in the app's own display serif. The
// name stays editable — it is the one word on the slide a deck might restyle.
export const brandmark = (s) => `
  <div class="brandmark">
    <img src="${s.logo || ASSETS.logo}" alt="">
    <span class="wm" contenteditable="true" data-field="brand">${s.brand || 'Stu'}</span>
  </div>`;

// The status chip. `live` fills it with bowl-green and adds the dot — reserved
// for the thing that is actually true right now (the beta being open).
export const pill = (text, live) =>
  !text
    ? ''
    : `<div class="pill${live ? ' live' : ''}">${live ? '<span class="led"></span>' : ''}<span contenteditable="true" data-field="pill">${text}</span></div>`;

// The carousel footer: the slide's own line on the left, position dots on the
// right (counted off the deck, so they are always right) and a swipe cue on
// every card but the last. This is what makes a slide read as one of several.
export const foot = (idx, left = '') => {
  const last = idx === SLIDES.length - 1;
  const dots = SLIDES.map((_, i) => `<span class="dot${i === idx ? ' on' : ''}"></span>`).join('');
  return `
    <div class="foot">
      <div class="foot-left">${left}</div>
      <div class="foot-right">
        ${last ? '' : '<span class="swipe">Swipe</span>'}
        <span class="dots">${dots}</span>
      </div>
    </div>`;
};
