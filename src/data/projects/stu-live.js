import { asset } from '../assets.js';

/* ============================================================================
   PROJECT: Stu Live — one card, one ask
   ----------------------------------------------------------------------------
   A SINGLE feed post: the open beta is live, use Stu. Where stu-beta.js walks
   somebody through the product over five slides, this is the one card you post
   on the day (or re-post any week the beta is still open) — no carousel, no
   swipe, nothing to explain.

   It renders with the `beacon` kit rather than `bowl`: same Stu palette, but
   inverted into the app's forest with the broadcast rings behind it, because a
   launch card has to read as an event and not as a page of the product.

   ASSETS: shares src/assets/stu/ with the other Stu decks rather than
   duplicating the logo — asset() paths are namespaced by folder, not by deck.
   ========================================================================== */

export const meta = {
  id: 'stu-live',
  name: 'Stu Live (Post)',
  kit: 'beacon',
  // theme: 'dawn',   // the cream variant of the same card — see beacon.css
  // no `format` — square 1080x1080 is the default (src/lib/formats.js)
};

export const ASSETS = {
  logo: asset('stu/logo.png'),
};

/* One slide, type `announce` (the beacon kit's only layout). Text may contain
   <b>…</b>, <em>…</em> (the grass serif italic) and <span class="mark">…</span>
   (the green marker). */
export const SLIDES = [
  {
    name: 'Stu is live', type: 'announce', file: 'stu-live-01-announce.png',
    logo: ASSETS.logo,
    brand: 'Stu',
    status: 'Open beta · live',
    kicker: 'No waitlist. No invite code.',
    head: 'Stu is <em>live</em>.',
    lede:
      'Tell Stu what you want to eat this week. It plans the meals around your budget, ' +
      'your allergies and whatever is already in the kitchen &mdash; then <b>fills the cart and checks out</b>.',
    // The real path through the product, in order — that is what makes it a
    // track rather than a feature list.
    steps: ['Chat', 'Plan', 'Cart', 'Checkout'],
    cta: 'Try Stu free',
    note: 'Link in bio',
    handle: '@stu_social',
  },
];
