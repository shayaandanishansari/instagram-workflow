# Kit: `bowl`

Stu's own product brand on the 1080 canvas — named for the logo. Where `fyp`
showcases somebody else's project and `paper` speaks in Highlighter's notebook
voice, this kit is **a product speaking as itself**: a launch, not a write-up.

Everything in it is lifted from the app rather than invented for the post — the
warm dotted chat canvas, the deep-forest sidebar, the bowl-green, the gold of
the spoon, and an editorial serif for the display line the app greets you with.
A launch post should look like the thing it is launching.

Deck opts in with `kit: 'bowl'`.

## Files

| file | what it is |
| --- | --- |
| `index.js` | `meta {id,name}` + `LAYOUTS`; imports the stylesheet |
| `bowl.css` | every rule scoped under `.kit-bowl` |
| `helpers.js` | the logo lockup, the status pill, the carousel footer |
| `layouts/` | one file per slide type |

## Both shapes

The kit draws a **square feed post** *or* a **story** — the deck picks with
`meta.format` (see `src/lib/formats.js`). They do not share layouts, because a
story is not a shorter carousel:

- **square** — `cover`, `statement`, `shot`, `ledger`, `cta`
- **story** — `launch`, one self-contained 1080×1920 frame

## Slide types

```js
{ type: 'cover',     pill, head, lede, steps: […], note }
{ type: 'statement', pill, head, body, kicker }
{ type: 'shot',      pill, head, photo, caption }
{ type: 'ledger',    pill, head, ask, cart: […], totalLabel, total, note }
{ type: 'cta',       pill, head, lede, credit, handle }
{ type: 'launch',    pill, head, lede, photo, ctaHead, ctaSub, handle }   // story only
```

Every slide also takes `logo` and `brand` for the lockup. `head` and `lede` may
contain `<em>…</em>` — the italic green accent, the app's own
"What's for dinner, *name*" move. Body copy may carry `<b>` and
`<span class="mark">` (a green marker here, not fyp's lime).

## The `ledger` slide is the signature

The product's whole claim is that a conversation ends as a filled cart, so the
slide shows **the cart** — items, quantities, prices, a rule, a total. It is a
receipt, not a feature list, which is the one thing in this kit allowed to be
loud. Keep everything around it quiet.

Two constraints:

- **`total` must equal the sum of the `cart` lines above it.** Somebody will add
  them up. If the app's own displayed total disagrees because of rounding, the
  slide follows the arithmetic, not the app.
- **`cart` rows are objects, so they are NOT editable in the studio.** The save
  plugin rewrites string *literals*; an array of objects is data, and it is
  edited in the deck file. Every other field on the slide is a flat string and
  edits/saves normally.

## Two rules the CSS lives by

**The accent green is a fill, never text on paper.** `--grass` (#16C257) on the
paper is ~2.2:1 — fine behind a marker highlight or under a pill, unreadable as
type. Green *text* uses `--grass-ink` (#0C8A3D, 4.4:1). On the forest ground of
`cta`/`launch` that inverts: there `--grass` is the legible one.

**On the story, the padding is the safe zone.** Instagram's profile row and
close button eat roughly the top 250px and the reply bar the bottom 250px, so
`.s-launch .pad` is `264px … 280px` and every margin under it is tuned to land
the handle above that line. Add height anywhere in `launch` and something falls
under Instagram's own furniture — re-check the bottom before shipping.

## Screenshots use `contain`, not `cover`

The interesting parts of a product screenshot are usually at its edges (here:
New Chat top-left, Checkout Now bottom-right) and `cover` ate both. `contain`
letterboxes against the card's white instead — invisible at the shot's own
ratio, and the forgiving behaviour when someone swaps in a photo of another
shape.

## html2canvas

No `filter`, no `clip-path`, no `background-clip:text`. Background images are
set with **longhands** — the shorthand parser is the flakiest part of its CSS
support, and a texture that silently fails to export is a bug you only find
after posting. The dot grid, pill fills, card borders and shadows are all
verified to survive export at 2×.
