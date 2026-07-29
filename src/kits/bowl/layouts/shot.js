import { photoId } from '../../../lib/helpers.js';
import { brandmark, pill, foot } from '../helpers.js';

// The product card. The screenshot sits on the dotted canvas as one plain,
// square-on slab — no tilt, no fake browser chrome. Stu's interface is calm and
// the presentation should not out-talk it.
//
// The photo element carries photoId(idx) and an INLINE background-image: that
// is the contract "Replace photo" and the exporter both look for.
export const shot = {
  cls: 'slide s-shot',
  render: (s, idx) => `
    <div class="pad">
      <div class="top">
        ${brandmark(s)}
        ${pill(s.pill)}
      </div>
      <h2 class="head" contenteditable="true" data-field="head">${s.head}</h2>
      <div class="shot-frame" id="${photoId(idx)}" style="background-image:url('${s.photo}')"></div>
      <div class="caption" contenteditable="true" data-field="caption">${s.caption}</div>
      ${foot(idx)}
    </div>`,
};
