// ============================================================================
// Project registry — AUTO-DISCOVERED.
// ----------------------------------------------------------------------------
// Every *.js file in this folder that exports a `meta.id` is registered as a
// project (a deck you can open/close from the topbar dropdown). There are no
// import lines to maintain: drop in a new <id>.js following the stu.js contract
// ({ meta:{id,name}, ASSETS, SLIDES }) and it appears in the switcher.
// ============================================================================
const mods = import.meta.glob('./*.js', { eager: true });

export const PROJECTS = {};
for (const path in mods) {
  const m = mods[path];
  if (!m.meta || !m.meta.id) continue; // skips this index file + anything non-project
  PROJECTS[m.meta.id] = {
    id: m.meta.id,
    name: m.meta.name || m.meta.id,
    file: path.split('/').pop(), // e.g. 'stu.js' — the save plugin writes here
    theme: m.meta.theme || null, // optional per-deck skin, e.g. 'offlink' → .theme-offlink
    SLIDES: m.SLIDES || [],
    ASSETS: m.ASSETS || {},
  };
}

// Stable, name-sorted list for the dropdown.
export const PROJECT_LIST = Object.values(PROJECTS).sort((a, b) => a.name.localeCompare(b.name));

// Which deck loads first if none has been chosen yet.
export const DEFAULT_PROJECT = PROJECTS.stu ? 'stu' : (PROJECT_LIST[0] && PROJECT_LIST[0].id);
