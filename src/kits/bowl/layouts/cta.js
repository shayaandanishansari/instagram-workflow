import { brandmark, pill, foot } from '../helpers.js';

// The closing card, inverted onto the deep forest of the app's sidebar so the
// carousel lands somewhere darker than it started. Nothing here is tappable —
// a PNG in a feed has no controls — so the ask names where the link actually
// lives rather than pretending to be a button.
export const cta = {
  cls: 'slide s-cta',
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
      <div class="credit" contenteditable="true" data-field="credit">${s.credit}</div>
      ${foot(idx, `<span class="handle" contenteditable="true" data-field="handle">${s.handle}</span>`)}
    </div>`,
};
