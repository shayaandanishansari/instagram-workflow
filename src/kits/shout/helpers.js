// Decoration for the `shout` kit ONLY — the word ring, its palette, and the
// backdrop behind the black. Nothing here is engine; a new kit brings its own
// motifs.
import { CANVAS } from '../../data/active.js';

// The six accents, in ring order.
const COLOURS = ['#FF9F1C', '#FF5D8F', '#4CC9F0', '#C8F135', '#B388FF', '#FFE45E'];
const INK = '#08080A';

// ---------------------------------------------------------------------------
// THE BACKDROP: a colour burst radiating from behind the headline, over a fine
// cross-hatch, fading to black at the edges so the word ring still reads.
//
// Drawn as ONE data-URI SVG rather than as DOM elements. That is not fussiness:
// html2canvas rasterises an <img>/background-image faithfully, but it ignores
// CSS `filter` and is unreliable with conic/radial gradients — so a "glow" built
// out of blurred divs would export looking nothing like the preview. An SVG
// gradient inside an image has no such problem.
//
// The width/height attributes below are LOAD-BEARING, not decoration. A browser
// renders an SVG with only a viewBox happily, but it has no intrinsic size — and
// html2canvas paints backgrounds with canvas drawImage(), which draws nothing at
// all for a sizeless image. The layer then disappears from the PNG while looking
// perfect in the preview. Every SVG data-URI in this kit carries both.
// ---------------------------------------------------------------------------
const RAYS = 22;

function burstSvg() {
  const c = 500; // centre of the 1000x1000 viewBox
  const r = 1500; // overshoots the box, so every ray runs off the canvas
  let wedges = '';
  for (let i = 0; i < RAYS; i++) {
    // Each ray is a wedge half as wide as its slice, so the black shows between.
    const a0 = ((i * 360) / RAYS) * (Math.PI / 180);
    const a1 = (((i + 0.5) * 360) / RAYS) * (Math.PI / 180);
    const pts = [
      `${c},${c}`,
      `${(c + r * Math.cos(a0)).toFixed(1)},${(c + r * Math.sin(a0)).toFixed(1)}`,
      `${(c + r * Math.cos(a1)).toFixed(1)},${(c + r * Math.sin(a1)).toFixed(1)}`,
    ].join(' ');
    wedges += `<polygon points="${pts}" fill="${COLOURS[i % COLOURS.length]}" opacity="0.22"/>`;
  }

  // The fade: transparent over the headline, solid ink by the edges. This is what
  // keeps a 22-colour starburst from turning the poster into a fairground.
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">` +
    `<defs><radialGradient id="f" cx="50%" cy="50%" r="52%">` +
    `<stop offset="0" stop-color="${INK}" stop-opacity="0.35"/>` +
    `<stop offset="0.5" stop-color="${INK}" stop-opacity="0.72"/>` +
    `<stop offset="1" stop-color="${INK}" stop-opacity="1"/>` +
    `</radialGradient></defs>` +
    wedges +
    `<rect width="1000" height="1000" fill="url(#f)"/>` +
    `</svg>`;

  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

export const backdrop = () =>
  `<div class="burst" style="background-image:url('${burstSvg()}')"></div>` +
  `<div class="hatch"></div>`;

// The ring of scattered word chips. The DECK supplies plain strings (so they
// stay editable and saveable); the KIT owns where each one lands. Word i takes
// anchor i — so the order of `words` in the deck is a layout decision.
//
// x/y are percentages of the canvas, and a chip is centred on its anchor. Every
// anchor sits in the top band or the bottom band, clear of the headline block in
// the middle. There is one table per canvas shape, because a story is twice as
// tall: percentages alone would strand the chips at the very ends of it.
//
// The two tables are DELIBERATELY parallel — same length, and the same four
// indices are the edge slots — so one deck's `words` array works in either
// shape. Don't break that when you tune a position.
//
// SHORT SLOTS: anchors 3, 6, 13 and 16 hug the canvas edge (x <= 11% or
// x >= 89%) — a chip there is centred on the anchor, so a long word would run
// off the canvas. Keep those to roughly one short word.
const ANCHORS_SQUARE = [
  { x: 22, y: 7, r: -6 },
  { x: 50, y: 7, r: 3 },
  { x: 78, y: 7, r: -4 },
  { x: 11, y: 16, r: 5 }, // short
  { x: 36, y: 16, r: -3 },
  { x: 64, y: 16, r: 6 },
  { x: 90, y: 16, r: -5 }, // short
  { x: 20, y: 25, r: 4 },
  { x: 52, y: 25, r: -2 },
  { x: 82, y: 25, r: 5 },
  { x: 17, y: 75, r: -6 },
  { x: 49, y: 75, r: 3 },
  { x: 80, y: 75, r: -4 },
  { x: 10, y: 84, r: 6 }, // short
  { x: 34, y: 84, r: -3 },
  { x: 63, y: 84, r: 4 },
  { x: 89, y: 84, r: -5 }, // short
  { x: 25, y: 92, r: 3 },
  { x: 55, y: 92, r: -6 },
  { x: 78, y: 92, r: 5 },
];

// Story: 1080x1920. The bands are deeper (four rows each instead of three), and
// they start further in — a chip at y:5% here is 96px down, which is under
// Instagram's own profile/close-button overlay, so nothing lands above y:6%.
const ANCHORS_STORY = [
  { x: 24, y: 7, r: -6 },
  { x: 62, y: 6, r: 3 },
  { x: 40, y: 13, r: -4 },
  { x: 11, y: 14, r: 5 }, // short
  { x: 75, y: 13, r: -3 },
  { x: 28, y: 20, r: 6 },
  { x: 90, y: 21, r: -5 }, // short
  { x: 62, y: 21, r: 4 },
  { x: 20, y: 28, r: -2 },
  { x: 70, y: 29, r: 5 },
  { x: 26, y: 71, r: -6 },
  { x: 66, y: 72, r: 3 },
  { x: 44, y: 78, r: -4 },
  { x: 10, y: 79, r: 6 }, // short
  { x: 78, y: 79, r: -3 },
  { x: 30, y: 86, r: 4 },
  { x: 89, y: 87, r: -5 }, // short
  { x: 63, y: 87, r: 3 },
  { x: 22, y: 93, r: -6 },
  { x: 62, y: 94, r: 5 },
];

// Which table this deck gets. Read LAZILY, at render time, not at module scope:
// kits/index.js eagerly imports every kit and active.js imports kits/index.js,
// so this module is evaluated while active.js is still initialising — touching
// CANVAS up here would be a temporal-dead-zone crash. (The same reason paper's
// helpers only reach for SLIDES inside a function.)
export const anchors = () => (CANVAS.id === 'story' ? ANCHORS_STORY : ANCHORS_SQUARE);

// Six accent colours, cycled by index; every third chip is filled rather than
// outlined, so the ring reads as scattered stickers instead of a uniform grid.
const HUES = 6;

// One word chip, positioned and coloured by its anchor index.
export const chip = (word, i) => {
  const a = anchors()[i];
  if (!a) return ''; // more words than anchors: the extras are simply dropped
  const fill = i % 3 === 0 ? ' filled' : '';
  return `<span class="word c${i % HUES}${fill}"
    style="left:${a.x}%; top:${a.y}%; transform:translate(-50%,-50%) rotate(${a.r}deg)"
    contenteditable="true" data-field="words" data-index="${i}">${word}</span>`;
};
