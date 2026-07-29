// ============================================================================
// KIT: shout — the loud recruitment poster.
//
// One slide type, `poster`: a black canvas, an enormous centred headline, and a
// ring of colour-coded word chips around it naming what the form is for. Built
// for the "Highlight your FYP — fill in the form" ask, where `fyp` showcases a
// project and `paper` is Highlighter's notebook voice.
//
// Decks opt in with `kit: 'shout'` in meta.
// ============================================================================
import './shout.css';

import { poster } from './layouts/poster.js';

export const meta = {
  id: 'shout',
  name: 'Shout Poster',
};

export const LAYOUTS = { poster };
