# `src/kits/fyp/` — the FYP Showcase design

The original studio look, and the reference implementation of a kit. Deep base
colour, decorative blobs, a bottom wave on the cover, an accent-coloured
"highlight" on the key phrase of each question, and a quote-styled answer.

`DEFAULT_KIT` — a deck that names no `kit` in its `meta` renders with this one.

## Files

```
index.js     meta { id, name } + LAYOUTS. Imports fyp.css. This is the kit's entry point.
fyp.css      Every rule for this design, scoped .kit-fyp — plus the theme mechanism.
layouts/     One file per slide type (see layouts/README.md).
helpers.js   Decoration for THIS kit only: blobs(), treeIcon(), treeGrove().
```

## Slide types it offers

| `type` | Slide |
|---|---|
| `cover` | Full-bleed hero photo, gradient, wave, wordmark + logo + tagline. Optional "recognised by" badge. |
| `screenshot` | A single framed screenshot floating on the organic background. |
| `qa` | Eyebrow → highlighted question → quoted answer. Optional bullets, demo photo, logo strip. |
| `audience` | A question plus a 2-column grid of audience cards, with a caption. |
| `closing` | Centred: logo, headline, subhead, optional team photo(s), credit, CTA pill. |

A deck picks these by `type` in its `SLIDES`. They are **this kit's** vocabulary —
another kit may define a `cover` that looks nothing like ours.

## How the CSS is scoped (and why it's written the way it is)

`render.js` puts `kit-fyp` on **both** the slide element and `<body>`. So:

- **Slide-level classes are compound**: `.kit-fyp.s-cover`, `.kit-fyp.organic-bg`
  — because `s-cover` and `kit-fyp` sit on the *same* element.
- **Inner elements are descendants**: `.kit-fyp .eyebrow`, `.kit-fyp .qa-answer`.
- **A theme combines both**: `.kit-fyp.theme-<name>.s-cover .wave` — write it
  compound, not as `.theme-<name> .s-cover .wave` (a descendant selector),
  since both classes sit on the same element; a descendant form would only
  ever match by the coincidence of `<body>` also carrying the theme class.

## Palette and themes

The deck palette (`--deep`, `--deep-2`, `--mid`, `--lime`, `--lime-2`, `--cream`)
is declared on `.kit-fyp` — **not** in `:root` — so it cannot leak into another
kit. Nearly every component reads these vars, which is why a theme is mostly just
a var remap.

A **theme** is a palette variant *of this kit*: same layouts, different brand
colours, plus the few places that hardcode a colour (the cover wave SVG, the
background motif). No theme ships by default — Stu's decks all use the base
palette declared on `.kit-fyp` above. Add one at the bottom of `fyp.css` by
overriding the palette vars under `.kit-fyp.theme-<name>{...}` (see the comment
there for the pattern).

A deck opts in with `theme: '<name>'` in its `meta`. Themes also tint the studio
chrome (`body.kit-fyp.theme-<x>` overrides `--paper`/`--line`/`--ink`).

## Export-driven quirks (don't "clean these up")

These look odd but exist because `html2canvas` renders the PNG, and it doesn't
support everything a browser does:

- **`.mark` uses `white-space:nowrap`.** `html2canvas` ignores
  `box-decoration-break`, so a highlight that *wraps* exports as one giant box
  with the preceding text dropped. Forcing the phrase onto one line avoids it.
- **The cover logo uses `logo-shadow.png`** (shadow baked into the image): CSS
  `filter: drop-shadow` does not survive the export. The negative margins around
  it trim the transparent shadow-padding that asset carries.
- **Photos are `background-image`, not `<img>`**: `html2canvas` honours
  `background-size: cover`, but not `object-fit`.

## Regenerating this kit

The contract is reconstructible from these docs; **the design is not**. The wave
path, the blob geometry, the type scale and the greens are taste, not spec.
Losing `fyp.css` means redesigning the look, not restoring it.
