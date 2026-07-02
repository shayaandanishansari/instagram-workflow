import { ASSETS } from '../data/active.js';
import { blobs } from './helpers.js';

// A question followed by a 2-column grid of audience cards (one per `items` entry).
export const audience = {
  cls: 'slide organic-bg s-qa s-audience',
  render: (s) =>
    blobs() +
    `<img class="logo-chip logo-corner" src="${s.logo || ASSETS.logo}" alt="logo">` +
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
    ${s.caption ? `<div class="aud-caption" contenteditable="true" data-field="caption">${s.caption}</div>` : ''}`,
};
