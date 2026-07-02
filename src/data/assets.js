// ============================================================================
// Asset loader — ASSET-AGNOSTIC, per-project namespaced.
// ----------------------------------------------------------------------------
// Images are auto-discovered from src/assets/ (recursively) via Vite's
// import.meta.glob, so there are NO per-file import lines to maintain. Each
// project keeps its images in its own subfolder, e.g. src/assets/stu/cover.png,
// src/assets/offlink/logo.png — so two decks can both have a "cover.png"
// without colliding. Reference an image by its path RELATIVE to src/assets/:
//   asset('stu/cover.png')      asset('offlink/logo.png')
//
// A missing file does NOT break the build — asset() returns a labelled
// placeholder and logs a warning, so a fresh clone with no images still runs.
// That's also what lets you gitignore your own private photos safely.
// ============================================================================

// Eagerly resolve every image under src/assets/ (any depth) to its final URL.
const files = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,svg,gif,avif}', {
  eager: true,
  import: 'default',
});

// Map project-relative path -> URL, e.g. { 'stu/logo.png': '/assets/stu/logo-abc123.png', … }
const byName = {};
for (const path in files) {
  byName[path.replace('../assets/', '')] = files[path];
}

// A visible stand-in for a missing asset (dark card + the expected filename).
function placeholder(name) {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'>` +
    `<rect width='100%' height='100%' fill='#163a26'/>` +
    `<rect x='16' y='16' width='568' height='568' fill='none' stroke='#4ade60' stroke-width='3' stroke-dasharray='14 12' rx='20'/>` +
    `<text x='50%' y='47%' fill='#4ade60' font-family='monospace' font-size='26' text-anchor='middle'>missing asset</text>` +
    `<text x='50%' y='55%' fill='#f6f3e6' font-family='monospace' font-size='22' text-anchor='middle'>src/assets/${name}</text>` +
    `</svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

// Resolve a filename to a usable URL (or a placeholder if it isn't there yet).
export function asset(name) {
  if (byName[name]) return byName[name];
  console.warn(`[assets] "${name}" not found in src/assets/ — using placeholder. Available: ${Object.keys(byName).join(', ') || '(none)'}`);
  return placeholder(name);
}

// Every path currently present under src/assets/ (handy for tooling/UI).
export const ASSET_NAMES = Object.keys(byName);

// NOTE: the per-deck role map (logo/cover/demo…) now lives inside each project
// file under src/data/projects/, e.g. projects/stu.js, which calls
// asset('stu/cover.png'). This module just resolves paths — it is deck-agnostic.
