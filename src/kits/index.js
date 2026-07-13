// ============================================================================
// Kit registry — AUTO-DISCOVERED (same pattern as the project registry).
// ----------------------------------------------------------------------------
// A KIT is a design: a set of slide layouts + its own scoped stylesheet. Every
// src/kits/<id>/index.js that exports a `meta.id` is registered. There are no
// import lines to maintain — drop in a new kit folder and it's available.
//
// To add a kit:
//   src/kits/<id>/index.js    exports meta { id, name } and LAYOUTS { type: layout }
//   src/kits/<id>/<id>.css    imported by that index.js; EVERY rule scoped .kit-<id>
//
// A layout is { cls: string, render: (slide, idx) => htmlString } — same shape
// for every kit. render.js stamps `kit-<id>` on the slide element and on <body>.
//
// The scoping is load-bearing: Vite bundles all kit stylesheets into one sheet,
// so an unscoped rule in one kit will restyle every other kit.
// ============================================================================
const mods = import.meta.glob('./*/index.js', { eager: true });

export const KITS = {};
for (const path in mods) {
  const m = mods[path];
  if (!m.meta || !m.meta.id) continue;
  KITS[m.meta.id] = {
    id: m.meta.id,
    name: m.meta.name || m.meta.id,
    LAYOUTS: m.LAYOUTS || {},
  };
}

// The kit a deck gets when its meta doesn't name one — keeps every existing
// deck (which predates kits) rendering exactly as before.
export const DEFAULT_KIT = 'fyp';

export function getKit(id) {
  return KITS[id] || KITS[DEFAULT_KIT];
}
