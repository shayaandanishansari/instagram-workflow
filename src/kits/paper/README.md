# `src/kits/paper/` — the Highlighter brand design

The landing site (`website/v1_landing`) on a 1080×1080 canvas: ruled notebook
paper, the red margin rule, the Archivo Black wordmark on its torn yellow
swipe, mono eyebrows and buttons, and the marker-pen highlights.

Where `fyp` is the design used to showcase *somebody else's* project, `paper` is
Highlighter speaking in **its own voice** — announcements, updates, asks.

It is drawn for **the feed, not the browser**: headline type sized to be read at
a glance in a scrolling column, and every slide ends in a carousel footer —
position dots (from the deck's own length) plus a swipe cue on all but the last
slide. That footer is what makes a card read as one frame of a post.

## Files

```
index.js     meta { id, name } + LAYOUTS. Imports paper.css. The kit's entry point.
paper.css    Every rule for this design, scoped .kit-paper.
layouts/     One file per slide type.
helpers.js   For THIS kit only: rule(), wordmark(), badge(), foot(), the social glyphs.
```

## Slide types it offers

| `type` | Slide |
|---|---|
| `announce` | Wordmark + stats badge, eyebrow, headline, and a tilted sticky note whose ticked `lines` are the update. Optional handwritten `kicker`. |
| `cta` | The ask: headline, `body` copy, then the asks — `primary` (black slab) and `share` (outlined slab) — with the `secondary` "we're also here" line, pinned to the bottom. |

**The `cta` has no buttons, on purpose.** Nothing in an exported PNG is
tappable, and a "Follow on Instagram" button shown to somebody already scrolling
Instagram asks them to do what the app's own Follow button does. So each ask
points *at* one of Instagram's real controls:

- `primary` → the Follow button at the **top** of the post (`↑ Hit follow, up there`)
- `share` → the paper plane at the **bottom** (`Send this to a builder ↓`)
- `secondary` → LinkedIn, stated as a fact, not a control

The share ask is the one that earns reach: a follow adds one person, a share
puts the post in front of a room. If a future deck needs a real link, it belongs
in the caption or bio, not painted on the slide.

## Deck fields

```js
{ type: 'announce', brand, eyebrow, title, lines: [], kicker?,
  badge?: { instagram, linkedin, note } }
{ type: 'cta', brand, title, body, primary, share?, secondary?, handle?, badge? }
```

The left half of the footer is the slide's own (`kicker` here, `handle` there);
the dots and swipe cue come from `foot()`.

Text may carry `<b>` and `<span class="mark">` — plus `mark-pink`, `mark-green`,
`mark-blue` for the site's other three highlighter colours. A mark is `nowrap`,
because html2canvas ignores `box-decoration-break` and a highlight broken across
two lines exports as one full-width bar; it moves to the next line whole
instead. Keep marks to short phrases so that never strands a line.

## Fonts

Archivo Black (wordmark/headlines), Work Sans (body), IBM Plex Mono (eyebrows,
buttons), Caveat (the kicker) — all loaded in `index.html`, same as the site.

## html2canvas notes

The export path is fussier than the browser, so this kit avoids what it can't
draw: the swipe is an inline SVG polygon (not `clip-path`), the marks are
two-stop gradients (not an animated `background-size`), the ruled paper is an
SVG tile, and the button glyphs are `<img>` data-URIs — as CSS background-images
on an empty span they exported as specks.
