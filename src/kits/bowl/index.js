// ============================================================================
// KIT: bowl — Stu's own product brand, on the 1080 canvas.
//
// Named for the logo. Where `fyp` showcases somebody else's project and `paper`
// is Highlighter's notebook voice, this kit is STU SPEAKING AS ITSELF — a
// product launch, not a submission write-up. Everything in it is lifted from
// the app: the warm dotted chat canvas, the deep-forest sidebar, the bright
// bowl-green, the gold of the spoon, and an editorial serif for the display
// line the app greets you with.
//
// The kit draws BOTH shapes (src/lib/formats.js):
//   square — the five carousel layouts (cover, statement, shot, ledger, cta)
//   story  — `launch`, one self-contained 1080x1920 frame
//
// Decks opt in with `kit: 'bowl'` in meta.
// ============================================================================
import './bowl.css';

import { cover } from './layouts/cover.js';
import { statement } from './layouts/statement.js';
import { shot } from './layouts/shot.js';
import { ledger } from './layouts/ledger.js';
import { cta } from './layouts/cta.js';
import { launch } from './layouts/launch.js';

export const meta = {
  id: 'bowl',
  name: 'Stu Bowl',
};

export const LAYOUTS = { cover, statement, shot, ledger, cta, launch };
