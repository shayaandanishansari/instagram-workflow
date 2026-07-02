// ============================================================================
// Asset loader — ASSET-AGNOSTIC.
// ----------------------------------------------------------------------------
// Images are auto-discovered from src/assets/ via Vite's import.meta.glob, so
// there are NO per-file import lines to maintain. To swap artwork you just:
//   1. drop a file into src/assets/  (any name, png/jpg/webp/svg/gif), and
//   2. point a slide (or the ASSETS map below) at that filename.
//
// A missing file does NOT break the build — asset() returns a labelled
// placeholder and logs a warning, so a fresh clone with no images still runs.
// That's also what lets you gitignore your own private photos safely.
// ============================================================================

// Eagerly resolve every image in src/assets/ to its final (hashed) URL.
const files = import.meta.glob('../assets/*.{png,jpg,jpeg,webp,svg,gif,avif}', {
  eager: true,
  import: 'default',
});

// Map bare filename -> URL, e.g. { 'logo.png': '/assets/logo-abc123.png', … }
const byName = {};
for (const path in files) {
  byName[path.split('/').pop()] = files[path];
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

// Every filename currently present in src/assets/ (handy for tooling/UI).
export const ASSET_NAMES = Object.keys(byName);

// ----------------------------------------------------------------------------
// Role map: which file plays which part in the deck. This is the ONE place to
// change to re-skin the whole deck — swap the filenames, drop matching files in
// src/assets/, done. Slides reference these roles (e.g. ASSETS.cover).
// ----------------------------------------------------------------------------
export const ASSETS = {
  logo:       asset('logo.png'),
  logoShadow: asset('logo-shadow.png'), // logo with a baked-in silhouette shadow (survives PNG export)
  cover:      asset('cover.png'),
  screenshot: asset('demo.png'), // slide 2 currently reuses the demo shot
  demo:       asset('demo.png'),
};
