// Small shared helpers used across the layout templates.

export const pad = (n) => (n < 10 ? '0' : '') + n;

// Every photo target and its file input share the slide index, so the
// "Replace photo" wiring and the export routine can find them generically.
export const photoId = (idx) => 'photo-' + idx;
export const inputId = (idx) => 'photo-input-' + idx;

// The three decorative background circles used by organic-bg slides.
export const blobs = () =>
  '<div class="blob blob-a"></div><div class="blob blob-b"></div><div class="blob blob-c"></div>';

// Emit an attribute only when a value is present (keeps templates tidy).
export const attr = (name, v) => (v ? ` ${name}="${v}"` : '');

// A simple layered-pine silhouette, sized/tinted by the caller. Used as a
// decorative filler (e.g. a "grove" row) on slides with empty space —
// currentColor means it picks up whatever CSS color the wrapper sets.
export const treeIcon = (size, opacity = 1) =>
  `<svg width="${size}" height="${size * 1.2}" viewBox="0 0 100 120" style="opacity:${opacity}">
    <g fill="currentColor">
      <polygon points="50,0 72,42 28,42"/>
      <polygon points="50,20 78,64 22,64"/>
      <polygon points="50,42 85,88 15,88"/>
      <rect x="43" y="88" width="14" height="24" rx="3"/>
    </g>
  </svg>`;

// A horizontal row of trees at varying sizes/opacities — a quick "grove"
// motif for filling empty space on plant-themed decks.
export const treeGrove = (sizes = [56, 76, 62, 84, 58]) =>
  `<div class="tree-grove">${sizes
    .map((s, i) => treeIcon(s, i % 2 ? 0.55 : 0.85))
    .join('')}</div>`;
