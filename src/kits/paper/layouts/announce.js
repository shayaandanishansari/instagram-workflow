import { rule, wordmark, badge, foot } from '../helpers.js';

// The update slide: wordmark + stats badge, a mono eyebrow, the headline, and a
// rotated sticky note whose ticked lines are the announcement itself. Each
// `lines` entry is one note line; `kicker` is the optional handwritten sign-off.
export const announce = {
  cls: 'slide s-announce',
  render: (s, idx) => `
    ${rule()}
    <div class="pad">
      <div class="head-row">
        ${wordmark(s.brand)}
        ${badge(s.badge)}
      </div>
      <div class="eyebrow" contenteditable="true" data-field="eyebrow">${s.eyebrow}</div>
      <h2 class="title" contenteditable="true" data-field="title">${s.title}</h2>
      <div class="note">
        ${s.lines
          .map(
            (l, i) =>
              `<div class="note-line"><span class="tick">✓</span><span contenteditable="true" data-field="lines" data-index="${i}">${l}</span></div>`
          )
          .join('\n        ')}
      </div>
      ${foot(idx, s.kicker ? `<span class="kicker" contenteditable="true" data-field="kicker">${s.kicker}</span>` : '')}
    </div>`,
};
