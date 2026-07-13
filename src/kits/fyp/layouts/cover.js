import { ASSETS } from '../../../data/active.js';
import { photoId } from '../../../lib/helpers.js';

// Full-bleed hero photo, gradient overlay, decorative wave, and a bottom band
// with the wordmark + logo + tagline. Optionally shows a "recognised by" badge
// in the top-left (when the slide has `badge: { label, logos: [{src,alt}] }`)
// — a fixed-green rounded card with a 2-column grid of recognition logos.
export const cover = {
  cls: 'slide s-cover',
  render: (s, idx) => `
    <div class="photo-bg" id="${photoId(idx)}" style="background-image:url('${s.photo}')"></div>
    <div class="photo-overlay"></div>
    <div class="wave"></div>
    ${s.badge
      ? `<div class="recognition-badge">
          <div class="recognition-label">${s.badge.label || 'Recognised by'}</div>
          <div class="recognition-grid">
            ${s.badge.logos
              .map((l) => `<div class="recognition-chip"><img src="${l.src}" alt="${l.alt || ''}"></div>`)
              .join('')}
          </div>
        </div>`
      : ''}
    <div class="band-text">
      <div class="wordmark" contenteditable="true"><span class="brand" data-field="brand">${s.brand}</span><span class="desc" data-field="desc">${s.desc}</span></div>
      <div class="cover-right">
        <img class="logo-chip" src="${s.logo || ASSETS.logoShadow}" alt="logo">
        <div class="tagline" contenteditable="true" data-field="tagline">${s.tagline}</div>
      </div>
    </div>`,
};
