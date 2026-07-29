import { backdrop, chip } from '../helpers.js';

// The whole post in one card: a huge headline dead centre, and a ring of words
// scattered around it naming everything the form is for. The words are the
// argument — the headline only has to be legible from a thumbnail.
//
// Slide shape:
//   kicker  — the small line above the hero ("Highlight your")
//   hero    — the shout itself; may carry per-letter <span class="c1|c2|c3">
//   sub     — the ask, on its highlighter swipe ("Fill in the form")
//   note    — optional line under the ask ("Link in bio")
//   words   — the ring; word i lands on anchor i (see helpers.js)
//   handle  — optional footer
export const poster = {
  cls: 'slide s-poster',
  render: (s) => `
    ${backdrop()}
    <div class="words">${(s.words || []).map(chip).join('\n      ')}</div>
    <div class="core">
      <div class="kicker" contenteditable="true" data-field="kicker">${s.kicker}</div>
      <div class="hero" contenteditable="true" data-field="hero">${s.hero}</div>
      <div class="sub">
        <span class="swipe"></span>
        <span class="sub-text" contenteditable="true" data-field="sub">${s.sub}</span>
      </div>
      ${s.note ? `<div class="note" contenteditable="true" data-field="note">${s.note}</div>` : ''}
    </div>
    ${s.handle ? `<div class="handle" contenteditable="true" data-field="handle">${s.handle}</div>` : ''}`,
};
