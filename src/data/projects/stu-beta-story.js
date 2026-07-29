import { asset } from '../assets.js';

/* ============================================================================
   PROJECT: Stu — Open Beta (story)
   ----------------------------------------------------------------------------
   The story twin of stu-beta.js: same launch, same `bowl` kit, but ONE frame at
   1080x1920 (`format: 'story'`) because a story gets a single tap and no swipe.
   So the frame has to carry the news, the proof and the ask by itself — that is
   the kit's `launch` layout, which exists only for this shape.

   Shares src/assets/stu/ with the feed deck and the FYP deck.
   ========================================================================== */

export const meta = {
  id: 'stu-beta-story',
  name: 'Stu — Open Beta (Story)',
  kit: 'bowl',
  format: 'story', // 1080x1920 — see src/lib/formats.js
};

export const ASSETS = {
  logo: asset('stu/logo.png'),
  app: asset('stu/app.png'),
};

export const SLIDES = [
  {
    name: 'Open beta story', type: 'launch', file: 'stu-beta-story-01.png',
    logo: ASSETS.logo,
    brand: 'Stu',
    pill: 'Open beta · live',
    head: 'Open beta<br>starts today.',
    lede: 'Your kitchen, on a chat.',
    photo: ASSETS.app,
    ctaHead: 'Try Stu free',
    ctaSub: 'Link in bio',
    handle: '@stu_social',
  },
];
