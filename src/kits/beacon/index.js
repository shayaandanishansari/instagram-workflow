// ============================================================================
// KIT: beacon — the one-card "we're live" announcement.
//
// One slide type, `announce`: a night-forest canvas with a broadcast signal
// pulsing out from a live badge, one enormous headline, and a single ask on a
// grass plaque. Where `bowl` walks you through Stu over five quiet slides, this
// kit says one thing loudly on one card — the post you make the day a thing
// ships.
//
// It is Stu's palette (forest, grass, gold, cream) inverted into the dark: the
// same product, after hours, with the light on.
//
// Decks opt in with `kit: 'beacon'` in meta.
// ============================================================================
import './beacon.css';

import { announce } from './layouts/announce.js';

export const meta = {
  id: 'beacon',
  name: 'Beacon Announcement',
  // A single announcement card is a feed post. A deck may still override with
  // meta.format (see src/lib/formats.js); the story sizing is at the bottom of
  // beacon.css.
  format: 'square',
};

export const LAYOUTS = { announce };
