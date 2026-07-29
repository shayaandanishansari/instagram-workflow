// ============================================================================
// KIT: paper — the Highlighter brand design, ported from the landing site
// (website/v1_landing): ruled notebook paper, red margin rule, the Archivo
// Black wordmark on its yellow swipe, mono eyebrows/buttons, marker highlights.
//
// This is the voice of Highlighter ITSELF (announcements, asks), where `fyp` is
// the design used to showcase somebody else's project. Decks opt in with
// `kit: 'paper'` in meta.
// ============================================================================
import './paper.css';

import { announce } from './layouts/announce.js';
import { cta } from './layouts/cta.js';

export const meta = {
  id: 'paper',
  name: 'Highlighter Paper',
};

export const LAYOUTS = { announce, cta };
