import { photoId } from '../../../lib/helpers.js';
import { brandmark, pill } from '../helpers.js';

// THE STORY FRAME (1080x1920) — the whole announcement on one card, because a
// story gets one tap of attention and no swipe.
//
// Reading order top to bottom: who (lockup) -> what (headline) -> proof
// (screenshot) -> where (the ask). No carousel footer: there is nothing to
// swipe to, and dots on a single story frame would be a lie.
//
// Instagram's own chrome overlays a story — the profile row and close button
// eat roughly the top 250px, the reply bar the bottom 250px — so the padding in
// bowl.css keeps every readable thing inside that middle band.
export const launch = {
  cls: 'slide s-launch',
  render: (s, idx) => `
    <div class="pad">
      <div class="top">
        ${brandmark(s)}
        ${pill(s.pill, true)}
      </div>
      <h2 class="head" contenteditable="true" data-field="head">${s.head}</h2>
      <div class="lede" contenteditable="true" data-field="lede">${s.lede}</div>
      <div class="shot-frame" id="${photoId(idx)}" style="background-image:url('${s.photo}')"></div>
      <div class="ask-block">
        <div class="ask-head" contenteditable="true" data-field="ctaHead">${s.ctaHead}</div>
        <div class="ask-sub" contenteditable="true" data-field="ctaSub">${s.ctaSub}</div>
      </div>
      <div class="handle" contenteditable="true" data-field="handle">${s.handle}</div>
    </div>`,
};
