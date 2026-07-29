// ============================================================================
// Project registry — AUTO-DISCOVERED.
// ----------------------------------------------------------------------------
// Every *.js file in this folder that exports a `meta.id` is registered as a
// project (a deck you can open/close from the topbar dropdown). There are no
// import lines to maintain: drop in a new <id>.js following the stu.js contract
// ({ meta:{id,name,kit?,theme?}, ASSETS, SLIDES }) and it appears in the switcher.
//
// A deck is CONTENT; how it looks is its KIT (src/kits/<id>/). A deck that names
// no kit gets DEFAULT_KIT, so decks written before kits existed are unchanged.
// ============================================================================
import { DEFAULT_KIT } from '../../kits/index.js';

const mods = import.meta.glob('./*.js', { eager: true });

export const PROJECTS = {};
for (const path in mods) {
  const m = mods[path];
  if (!m.meta || !m.meta.id) continue; // skips this index file + anything non-project
  PROJECTS[m.meta.id] = {
    id: m.meta.id,
    name: m.meta.name || m.meta.id,
    file: path.split('/').pop(), // e.g. 'stu.js' — the save plugin writes here
    kit: m.meta.kit || DEFAULT_KIT, // which DESIGN renders it (src/kits/<id>/)
    theme: m.meta.theme || null, // optional palette variant WITHIN that kit, e.g. 'offlink'
    format: m.meta.format || null, // optional canvas shape: 'square' | 'story' (src/lib/formats.js)
    SLIDES: m.SLIDES || [],
    ASSETS: m.ASSETS || {},
  };
}

// Stable, name-sorted list for the dropdown.
export const PROJECT_LIST = Object.values(PROJECTS).sort((a, b) => a.name.localeCompare(b.name));

// Which deck loads first if none has been chosen yet.
export const DEFAULT_PROJECT = PROJECTS.stu ? 'stu' : (PROJECT_LIST[0] && PROJECT_LIST[0].id);
