import { ASSETS } from '../../../data/active.js';
import { photoId } from '../../../lib/helpers.js';
import { blobs, treeGrove } from '../helpers.js';

// A question followed by a 2-column grid of audience cards (one per `items` entry).
// Optionally shows a small rotated demo photo card in the top-right (when the
// slide has `photo`) — reuses the `.s-qa .demo-card` styling since this
// template's class list includes `s-qa`. Optionally shows a decorative row of
// trees under the caption (when the slide has `decorTrees: true`) — a filler
// for plant-themed decks whose caption leaves a lot of empty space below it.
export const audience = {
  cls: 'slide organic-bg s-qa s-audience',
  render: (s, idx) =>
    blobs() +
    `<img class="logo-chip logo-corner" src="${s.logo || ASSETS.logo}" alt="logo">` +
    (s.photo
      ? `<div class="demo-card" id="${photoId(idx)}" style="background-image:url('${s.photo}')"></div>`
      : '') +
    `<div class="content-pad">
      <div class="eyebrow">${s.eyebrow || 'From the team'}</div>
      <div class="hl-question" contenteditable="true" data-field="question" style="margin-bottom:18px;">${s.question}</div>
    </div>
    <div class="aud-grid">
      ${s.items
        .map(
          (l, i) =>
            `<div class="aud-card"><div class="label" contenteditable="true" data-field="items" data-index="${i}">${l}</div></div>`
        )
        .join('\n      ')}
    </div>
    ${s.caption ? `<div class="aud-caption" contenteditable="true" data-field="caption">${s.caption}</div>` : ''}
    ${s.decorTrees ? treeGrove() : ''}`,
};
