import { rule, wordmark, badge, foot, LI_ICON, SEND_ICON } from '../helpers.js';

// The ask. Deliberately NOT a row of buttons: nothing in an exported PNG is
// tappable, and a "Follow on Instagram" button shown to someone already inside
// Instagram is asking them to do what the app's own Follow button does. So each
// ask points AT one of Instagram's real controls — `primary` at Follow (top of
// the post), `share` at the paper plane (bottom) — and LinkedIn is stated as a
// place we also exist: a line, not a fake button.
export const cta = {
  cls: 'slide s-cta',
  render: (s, idx) => `
    ${rule()}
    <div class="pad">
      <div class="head-row">
        ${wordmark(s.brand)}
        ${badge(s.badge)}
      </div>
      <h2 class="title" contenteditable="true" data-field="title">${s.title}</h2>
      <div class="body" contenteditable="true" data-field="body">${s.body}</div>
      <div class="ask">
        <div class="ask-primary"><span class="arrow-up">↑</span><span contenteditable="true" data-field="primary">${s.primary}</span></div>
        ${s.share
          ? `<div class="ask-share"><img class="ico" src="${SEND_ICON}" alt=""><span contenteditable="true" data-field="share">${s.share}</span><span class="arrow-down">↓</span></div>`
          : ''}
        ${s.secondary
          ? `<div class="ask-also"><img class="ico" src="${LI_ICON}" alt=""><span contenteditable="true" data-field="secondary">${s.secondary}</span></div>`
          : ''}
      </div>
      ${foot(idx, s.handle ? `<span class="handle" contenteditable="true" data-field="handle">${s.handle}</span>` : '')}
    </div>`,
};
