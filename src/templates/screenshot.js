import { blobs, photoId } from './helpers.js';

// A single framed screenshot floating on the organic background.
export const screenshot = {
  cls: 'slide organic-bg s-screenshot',
  render: (s, idx) =>
    blobs() +
    `<div class="shot-frame" id="${photoId(idx)}" style="background-image:url('${s.photo}')"></div>`,
};
