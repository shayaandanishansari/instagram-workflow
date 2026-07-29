import { asset } from '../assets.js';

/* ============================================================================
   PROJECT: Stu — Open Beta (feed post)
   ----------------------------------------------------------------------------
   The launch carousel for open beta, 21 July 2026. Stu speaking as a product,
   not as an FYP submission — so it renders with the `bowl` kit (Stu's own brand:
   dotted chat canvas, forest sidebar, bowl-green, editorial serif) rather than
   `fyp`. Its story twin is stu-beta-story.js, same voice, one frame.

   Content is drawn from the two FYP write-ups in
   submissions/FYP_Showcase/Stu - Personal Food Concierge/ — the household
   problem from Abdul Tawab's, the hero feature from Shayaan's.

   ASSETS: this deck shares src/assets/stu/ with the FYP deck rather than
   duplicating the same logo — asset() paths are namespaced by folder, not by
   deck, so both point at the one set of Stu brand images.
   ========================================================================== */

export const meta = {
  id: 'stu-beta',
  name: 'Stu — Open Beta (Post)',
  kit: 'bowl',
  // no `format` — square 1080x1080 is the default (src/lib/formats.js)
};

export const ASSETS = {
  logo: asset('stu/logo.png'),
  app: asset('stu/app.png'), // the product screenshot: chat left, cart right
};

/* Slide types come from the `bowl` kit: 'cover' | 'statement' | 'shot' |
   'ledger' | 'cta'. Text may contain <b>…</b>, <em>…</em> (the green italic)
   and <span class="mark">…</span> (the green marker highlight). */
export const SLIDES = [
  {
    name: 'Open beta', type: 'cover', file: 'stu-beta-01-cover.png',
    logo: ASSETS.logo,
    brand: 'Stu',
    pill: 'Open beta',
    head: 'Open beta<br>starts today.',
    lede: 'Your kitchen, on a chat.',
    // The real path through the product, in order — that is what makes it a
    // track rather than a feature list.
    steps: ['Chat', 'Plan', 'Cart', 'Checkout'],
    note: '21 July 2026 · Free while in beta',
  },
  {
    name: 'Why Stu', type: 'statement', file: 'stu-beta-02-why.png',
    logo: ASSETS.logo,
    brand: 'Stu',
    pill: 'Why Stu',
    head: '&ldquo;What&rsquo;s for dinner?&rdquo;<br>is never <em>one</em> question.',
    body:
      'Someone avoids beef. Someone&rsquo;s lactose intolerant. Someone needs low salt. ' +
      'There&rsquo;s a budget, there&rsquo;s whatever is already in the kitchen, and there&rsquo;s ' +
      'whatever the shop down the road <b>actually has today</b>.',
    kicker: 'Stu holds all of it, and still answers.',
  },
  {
    name: 'Inside Stu', type: 'shot', file: 'stu-beta-03-inside.png',
    logo: ASSETS.logo,
    brand: 'Stu',
    pill: 'Inside Stu',
    head: 'This is the whole app.',
    photo: ASSETS.app,
    caption:
      'Ask on the left. The cart fills on the right. No list to keep, no tabs to juggle &mdash; the conversation <b>is</b> the shopping.',
  },
  {
    name: 'One chat, one cart', type: 'ledger', file: 'stu-beta-04-cart.png',
    logo: ASSETS.logo,
    brand: 'Stu',
    pill: 'The hero bit',
    head: 'One chat.<br>One filled cart.',
    ask: '&ldquo;Plan me a week of dinners for four.&rdquo;',
    /* Real items and real rupees from the app — the point of this slide is that
       it is a receipt, not a mock-up. `total` is the sum of the lines above it;
       keep them agreeing or the slide is lying. NOT contenteditable (the save
       plugin rewrites string literals, and these rows are objects). */
    cart: [
      { item: 'Mezan Cooking Oil', qty: 4, rs: '2051' },
      { item: 'Prema Milk, pasteurized', qty: 4, rs: '1040' },
      { item: 'Shezan White Vinegar 800ml', qty: 1, rs: '123' },
      { item: 'Hellmanns Mayonnaise', qty: 1, rs: '191' },
      { item: 'Nurpur Cheddar', qty: 1, rs: '445' },
    ],
    totalLabel: 'Total',
    total: 'Rs. 3850',
    note: 'You never opened a grocery app',
  },
  {
    name: 'Try it free', type: 'cta', file: 'stu-beta-05-try.png',
    logo: ASSETS.logo,
    brand: 'Stu',
    pill: 'Open beta · live',
    head: 'Try Stu <em>free</em>.',
    lede: 'Link in bio.',
    credit: '<br>',
    handle: '@stu_social',
  },
];
