// ============================================================================
// Active project — the deck currently open in the studio.
// ----------------------------------------------------------------------------
// Which project is open is remembered in localStorage, so it survives reloads
// and dev-server restarts. render.js / export.js import SLIDES + ASSETS from
// HERE (not from a specific project file), so switching projects is just:
//   setActiveId('offlink'); location.reload();
// A reload is intentional — SLIDES/ASSETS are resolved once at module load,
// which keeps render/export simple (no reactive re-wiring).
// ============================================================================
import { PROJECTS, DEFAULT_PROJECT } from './projects/index.js';

const KEY = 'activeProject';

export function getActiveId() {
  let id;
  try { id = localStorage.getItem(KEY); } catch { /* SSR / no storage */ }
  return id && PROJECTS[id] ? id : DEFAULT_PROJECT;
}

export function setActiveId(id) {
  if (!PROJECTS[id]) return false;
  try { localStorage.setItem(KEY, id); } catch { /* ignore */ }
  return true;
}

// Resolve the active deck once, at load. Everything downstream reads these.
export const PROJECT = PROJECTS[getActiveId()];
export const SLIDES = PROJECT.SLIDES;
export const ASSETS = PROJECT.ASSETS;
