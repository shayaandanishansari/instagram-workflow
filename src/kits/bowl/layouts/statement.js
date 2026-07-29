import { brandmark, pill, foot } from '../helpers.js';

// The problem card: one serif statement carrying the whole argument, a short
// paragraph of the specifics under it, and a handwritten-weight sign-off line.
// `head` may contain <em>…</em> — the italic runs green (see bowl.css).
export const statement = {
  cls: 'slide s-statement',
  render: (s, idx) => `
    <div class="pad">
      <div class="top">
        ${brandmark(s)}
        ${pill(s.pill)}
      </div>
      <div class="mid">
        <h2 class="head" contenteditable="true" data-field="head">${s.head}</h2>
        <div class="body" contenteditable="true" data-field="body">${s.body}</div>
      </div>
      ${s.kicker ? `<div class="kicker" contenteditable="true" data-field="kicker">${s.kicker}</div>` : ''}
      ${foot(idx)}
    </div>`,
};
