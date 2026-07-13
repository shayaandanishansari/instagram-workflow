import { ASSETS } from '../data/active.js';

// Centered closing card: big logo, headline, subhead, credit line, and CTA pill.
// Optionally shows one large founders/team photo (`teamPhoto`, a single URL)
// and/or a row of small avatar chips (`teamPhotos`, an array of URLs) — a
// deck can use either, or both (avatars sit just above the credit line).
export const closing = {
  cls: 'slide s-closing',
  render: (s) => `
    <div class="blob blob-a" style="opacity:.35;"></div>
    <div class="close-wrap">
      <img class="logo-big" src="${s.logo || ASSETS.logo}" alt="logo">
      <div class="close-head" contenteditable="true" data-field="head">${s.head}</div>
      <div class="close-sub" contenteditable="true" data-field="sub">${s.sub}</div>
      ${s.teamPhoto ? `<div class="team-photo" style="background-image:url('${s.teamPhoto}')"></div>` : ''}
      ${s.teamPhotos
        ? `<div class="team-stack">
            ${s.teamPhotos.map((p) => `<img class="team-avatar" src="${p}" alt="">`).join('')}
          </div>`
        : ''}
      <div class="credit" contenteditable="true" data-field="credit">${s.credit}</div>
      <div class="cta" contenteditable="true" data-field="cta">${s.cta}</div>
    </div>`,
};
