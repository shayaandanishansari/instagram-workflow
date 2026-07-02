import { ASSETS } from '../data/assets.js';

// Centered closing card: big logo, headline, subhead, credit line, and CTA pill.
export const closing = {
  cls: 'slide s-closing',
  render: (s) => `
    <div class="blob blob-a" style="opacity:.35;"></div>
    <div class="close-wrap">
      <img class="logo-big" src="${s.logo || ASSETS.logo}" alt="logo">
      <div class="close-head" contenteditable="true" data-field="head">${s.head}</div>
      <div class="close-sub" contenteditable="true" data-field="sub">${s.sub}</div>
      <div class="credit" contenteditable="true" data-field="credit">${s.credit}</div>
      <div class="cta" contenteditable="true" data-field="cta">${s.cta}</div>
    </div>`,
};
