import { brandmark, pill, foot } from '../helpers.js';

// The announcement card. Logo lockup and a live status pill up top, the news in
// the app's display serif, and under it the product reduced to its four moves.
//
// `steps` is a real sequence — chat, plan, cart, checkout is the actual path a
// user takes through Stu — which is the only reason it gets to be a numbered-
// feeling track rather than a list.
export const cover = {
  cls: 'slide s-cover',
  render: (s, idx) => `
    <div class="pad">
      <div class="top">
        ${brandmark(s)}
        ${pill(s.pill, true)}
      </div>
      <div class="mid">
        <h2 class="head" contenteditable="true" data-field="head">${s.head}</h2>
        <div class="lede" contenteditable="true" data-field="lede">${s.lede}</div>
      </div>
      <div class="steps">
        ${(s.steps || [])
          .map(
            (st, i) =>
              `<span class="step" contenteditable="true" data-field="steps" data-index="${i}">${st}</span>`
          )
          .join('<span class="arrow">&rarr;</span>')}
      </div>
      ${foot(idx, `<span class="note" contenteditable="true" data-field="note">${s.note || ''}</span>`)}
    </div>`,
};
