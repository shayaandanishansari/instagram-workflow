// ============================================================================
// KIT: fyp — the FYP Showcase design (the original studio look).
// ----------------------------------------------------------------------------
// A kit is a self-contained design: its LAYOUTS (the slide types a deck can
// use) plus its own scoped stylesheet. Decks opt in with `kit: 'fyp'` in meta.
// ============================================================================
import './fyp.css';

import { cover } from './layouts/cover.js';
import { screenshot } from './layouts/screenshot.js';
import { qa } from './layouts/qa.js';
import { audience } from './layouts/audience.js';
import { closing } from './layouts/closing.js';

export const meta = {
  id: 'fyp',
  name: 'FYP Showcase',
};

// The slide types this kit offers. A deck's `type` is resolved against THIS map,
// so another kit is free to define its own `cover` that looks nothing like ours.
export const LAYOUTS = { cover, screenshot, qa, audience, closing };
