import { ASSETS } from '../data/active.js';
import { blobs, photoId, attr } from './helpers.js';

// Eyebrow + highlighted question + supporting quote answer. Optionally shows a
// small rotated demo photo card in the top-right (when the slide has `photo`).
export const qa = {
  cls: 'slide organic-bg s-qa',
  render: (s, idx) =>
    blobs() +
    `<img class="logo-chip logo-corner" src="${s.logo || ASSETS.logo}" alt="logo">` +
    (s.photo
      ? `<div class="demo-card" id="${photoId(idx)}" style="background-image:url('${s.photo}')"></div>`
      : '') +
    `<div class="content-pad">
      <div class="eyebrow">${s.eyebrow || 'From the team'}</div>
      <div class="hl-question" contenteditable="true" data-field="question"${attr('style', s.questionStyle)}>${s.question}</div>
      <div class="qa-answer" contenteditable="true" data-field="answer"${attr('style', s.answerStyle)}>${s.answer}</div>
      ${s.bullets
        ? `<ul class="qa-bullets">${s.bullets
            .map((b, i) => `<li contenteditable="true" data-field="bullets" data-index="${i}">${b}</li>`)
            .join('')}</ul>`
        : ''}
    </div>`,
};
