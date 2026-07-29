import { backdrop, brandmark, badge, track } from '../helpers.js';

// The whole post in one card. Read top to bottom it is: who is talking, what
// changed, why you'd care, what the thing does, and what to do about it — the
// shortest complete argument a single feed post can make.
//
// Slide shape:
//   brand   — the product name beside the mark
//   logo    — the app icon (deck ASSETS)
//   status  — the badge text ("Open beta · live")
//   kicker  — the small line above the headline
//   head    — the announcement; may carry <em> (serif italic, grass)
//   lede    — one sentence on what Stu actually does
//   steps   — the track through the product, in order
//   cta     — the ask, on its grass plaque
//   note    — the small line under the ask ("Link in bio")
//   handle  — footer
export const announce = {
  cls: 'slide s-announce',
  render: (s) => `
    ${backdrop()}
    <div class="pad">
      <div class="top">
        ${brandmark(s)}
        ${badge(s.status)}
      </div>

      <div class="mid">
        <div class="kicker" contenteditable="true" data-field="kicker">${s.kicker}</div>
        <h2 class="head" contenteditable="true" data-field="head">${s.head}</h2>
        <p class="lede" contenteditable="true" data-field="lede">${s.lede}</p>
        <div class="track">${track(s.steps)}</div>
      </div>

      <div class="ask">
        <div class="plaque" contenteditable="true" data-field="cta">${s.cta}</div>
        ${s.note ? `<div class="note" contenteditable="true" data-field="note">${s.note}</div>` : ''}
      </div>

      ${s.handle ? `<div class="handle" contenteditable="true" data-field="handle">${s.handle}</div>` : ''}
    </div>`,
};
