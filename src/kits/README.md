# `src/kits/` — the designs

A **kit is a design**: a set of slide layouts plus its own stylesheet. It is the
unit you add when you want a post that looks *nothing like* the existing ones.

## Kit vs. theme — the distinction that matters

These are two different levers, and conflating them is the mistake this folder
exists to prevent:

- A **theme** (`meta.theme`) is a **palette variant within a kit**. Same wave,
  same blobs, same rhythm — different colours. Cheap. Four of them live at the
  bottom of `fyp/fyp.css`.
- A **kit** (`meta.kit`) is a **different design**. Different layouts, different
  motifs, different everything.

If a post still "feels like the same post in another colour," you wanted a kit
and reached for a theme.

## Adding a kit

```
src/kits/<id>/
  index.js     exports meta { id, name } and LAYOUTS { <type>: layout }; imports the CSS
  <id>.css     EVERY rule scoped under .kit-<id>
  layouts/     one file per slide type
  helpers.js   (optional) decoration used only by this kit
```

It **auto-registers** — `index.js` in this folder globs `./*/index.js` and picks
up anything exporting a `meta.id`. There is no list to edit. A deck opts in with
`kit: '<id>'` in its `meta`.

## The contract a kit must satisfy

1. **A layout is `{ cls, render(slide, idx) => htmlString }`.** `cls` is the class
   list for the slide element (must include `slide`); `render` returns its inner
   HTML. Identical shape in every kit — that's what lets the engine stay generic.

2. **Scope every CSS rule under `.kit-<id>`.** This is load-bearing, not style
   policing: Vite bundles all kit stylesheets into **one sheet**, so an unscoped
   `.eyebrow` in your kit will silently restyle every other kit. `render.js` puts
   `kit-<id>` on both the slide element and `<body>`, so:
   - slide-level classes are written **compound** — `.kit-x.s-cover`
   - inner elements are written as **descendants** — `.kit-x .eyebrow`

3. **Editable text must be a flat string property on the slide object**, rendered
   with `contenteditable` + `data-field="<prop>"`. The dev-server save plugin
   rewrites *string literals* in the deck file; text buried inside an HTML blob
   has nothing to rewrite and won't save.

4. **A swappable photo must carry `id="${photoId(idx)}"`** (from
   `src/lib/helpers.js`). That id is the only way "Replace photo" and the exporter
   find it.

5. **The canvas is 1080×1080, `overflow:hidden`.** The box itself is the engine's
   (`src/styles.css`); your kit paints inside it.

Inside those five constraints you are free — any layout, any palette, any type.

## Why the palette lives in the kit, not `:root`

`src/styles.css` holds only the **chrome** palette (`--ink`, `--paper`, `--line`,
`--muted`, …). Each kit declares its own deck palette on `.kit-<id>` (see
`fyp.css`). If deck colours sat in `:root`, every new kit would silently inherit
the previous kit's palette — which is exactly how a "new design" ends up looking
like a recolour of the old one.

## Current kits

- **`fyp/`** — the FYP Showcase design (the original studio look): cover,
  screenshot, qa, audience, closing. `DEFAULT_KIT`, so decks that name no kit get
  this one.
- **`paper/`** — Highlighter's notebook voice: ruled paper, marker, handwriting.
- **`shout/`** — the loud recruitment poster: black canvas, one enormous
  headline, a ring of colour-coded word chips. Square *or* story.
- **`bowl/`** — Stu's own product brand: cream chat canvas, forest sidebar,
  bowl-green, editorial serif. A carousel that walks you through the product.
- **`beacon/`** — the one-card "we're live" announcement: Stu's palette inverted
  into the dark, broadcast rings, one headline, one ask. Single `announce`
  layout.
