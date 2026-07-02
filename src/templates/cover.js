import { ASSETS } from '../data/active.js';
import { photoId } from './helpers.js';

// Full-bleed hero photo, gradient overlay, decorative wave, and a bottom band
// with the wordmark + logo + tagline.
export const cover = {
  cls: 'slide s-cover',
  render: (s, idx) => `
    <div class="photo-bg" id="${photoId(idx)}" style="background-image:url('${s.photo}')"></div>
    <div class="photo-overlay"></div>
    <div class="wave"></div>
    <div class="band-text">
      <div class="wordmark" contenteditable="true"><span class="brand" data-field="brand">${s.brand}</span><span class="desc" data-field="desc">${s.desc}</span></div>
      <div class="cover-right">
        <img class="logo-chip" src="${s.logo || ASSETS.logoShadow}" alt="logo">
        <div class="tagline" contenteditable="true" data-field="tagline">${s.tagline}</div>
      </div>
    </div>`,
};
