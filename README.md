# Stu — Instagram Post Studio

A small, data-driven studio for building Instagram carousels. Every slide is a
live, editable 1080×1080 card; click any text to edit, swap photos per-slide,
and export true 1080×1080 PNGs (one at a time or the whole deck).

Fully client-side — no server, no accounts, no data leaves your browser. The
only runtime dependency is [`html2canvas`](https://html2canvas.hertzen.com/)
(it powers PNG export).

Nothing about the tool is tied to one product — see [Origin & credits](#origin--credits)
below for why it's named after Stu and how to make it yours.

## Run it

```bash
npm install
npm run dev        # open the printed http://localhost URL
```

Build a static bundle:

```bash
npm run build      # outputs to dist/
npm run preview    # serve the built dist/ locally
```

> Run it through the dev/preview server (not by opening `index.html` off disk).
> PNG export needs the images to load same-origin, which the server provides.

## Project layout

The codebase is **three layers, kept strictly apart**: an *engine* that can render
anything, *kits* that each define a design, and *decks* that hold one project's
content. Adding a project touches only a deck; adding a new look touches only a
kit.

```
index.html              Page shell (topbar, intro, empty #grid, footer)
src/
  main.js               Entry: loads styles, wires resize, renders the deck
  styles.css            Studio CHROME + the 1080×1080 canvas contract (no deck design)
  lib/                  THE ENGINE — renders any deck in any kit
    render.js           Builds slots from SLIDES, wires interactions
    export.js           html2canvas → 1080×1080 PNG (per-slide + all)
    scale.js            Scales previews to fit their column
    helpers.js          The engine/kit contract (photoId, inputId, pad, attr)
  kits/                 THE DESIGNS — one folder per kit, auto-discovered
    index.js            Registry: finds every kit + the default
    fyp/                Kit: the FYP Showcase look
      index.js          meta + LAYOUTS (cover|screenshot|qa|audience|closing)
      fyp.css           All of its styling, scoped .kit-fyp — plus its themes
      layouts/          One file per slide type
      helpers.js        Decoration for this kit only (blobs, tree grove)
  data/                 THE CONTENT
    assets.js           Resolves image paths (recursive, deck-agnostic)
    active.js           The open project → re-exports its SLIDES + ASSETS
    projects/           One file per project (deck) — auto-discovered
      index.js          Registry: finds every project + the default
      stu-beta.js       Deck: Stu — Open Beta (Post) — the origin project, kept as a template
      stu-live.js       Deck: Stu Live (Post)
  assets/               Your images, one subfolder per project (stu/, <id>/, …)
                        Auto-discovered, gitignored (see below)
scripts/                One-off CLI tooling (e.g. pull a submission from Drive)
submissions/            Raw form downloads (drop-zone) — gitignored, see its README
```

**Every folder has its own README** explaining what it is, the contract it
imposes, and how it ties into the tool — start with [`src/README.md`](./src/README.md).

## Kits vs. themes

A **theme** (`meta.theme`) is a palette variant *within* a design — same layouts,
different colours. A **kit** (`meta.kit`) is a different design outright: its own
layouts and its own stylesheet. If a post still reads as "the same post in another
colour," you wanted a kit and reached for a theme. See
[`src/kits/README.md`](./src/kits/README.md) for how to add one.

## Multiple projects (open / close decks)

The studio holds **one deck per project** and you switch between them from the
**Project** dropdown in the top bar. Each project is a file in
`src/data/projects/` (e.g. `stu.js`, `<id>.js`) that exports its own
`SLIDES` + `ASSETS`. Switching remembers your choice (localStorage) and the
title, logo, slide count and export filenames all follow the active deck.

**Add a new project:**

1. Copy `src/data/projects/stu-beta.js` to `src/data/projects/<id>.js` and change
   `meta.id` (unique) + `meta.name`.
2. Drop that project's images in `src/assets/<id>/` and point its `ASSETS` map
   at them (e.g. `asset('<id>/cover.png')`).
3. Fill in its `SLIDES`. It **auto-registers** — no import lines to edit — and
   appears in the dropdown on reload.

Text edits made in the browser are saved back to **whichever project is open**
(dev server only — see below).

## Working from a form submission

Downloaded a folder from the **FYP Submission Form**? Drop it straight into
[`submissions/`](./submissions/) — that's the drop-zone for raw form data (one
folder per project, plus the responses CSV). It's **gitignored** because it holds
PII, so nothing there is published. See [`submissions/README.md`](./submissions/README.md)
for how to turn a submission into a deck (copy its images into `src/assets/<id>/`,
then fill in that project's `src/data/projects/<id>.js`).

## Editing the deck

Everything flows from the **active project file** in `src/data/projects/`
(e.g. `stu-beta.js`) — there's no hardcoded slide count anywhere.

- **Edit text** — change the strings in a slide object. They may contain
  `<b>…</b>` and `<span class="mark">…</span>` (the lime highlight).
- **Add a slide** — copy an object, drop it anywhere in the `SLIDES` array.
- **Remove** — delete its object.
- **Reorder** — move objects around; index numbers and export filenames
  auto-update.

### Slide types

| `type`       | Layout                                            | Key fields |
|--------------|---------------------------------------------------|------------|
| `cover`      | Hero photo + wordmark band                        | `brand`, `desc`, `tagline`, `photo` |
| `screenshot` | Single framed screenshot                          | `photo` |
| `qa`         | Question + quote answer (+ optional demo photo)   | `question`, `answer`, `eyebrow`, `photo?`, `questionStyle?`, `answerStyle?` |
| `audience`   | Question + 2-column card grid                     | `question`, `items[]`, `eyebrow` |
| `closing`    | Centered logo + headline + CTA                    | `head`, `sub`, `credit`, `cta` |

### Images / swapping assets

The loader is **asset-agnostic**: every file under `src/assets/` is
auto-discovered recursively (no import lines to maintain), keyed by its path
relative to `src/assets/`. Each project keeps its images in its own subfolder
(`src/assets/stu/`, `src/assets/<id>/`) so two decks can both have a
`cover.png` without colliding. A missing image falls back to a labelled
placeholder instead of breaking the build.

- **Replace artwork** — drop a file with the same name into `src/assets/<id>/`.
- **Use different filenames** — edit the role map (`ASSETS`) in that project's
  `src/data/projects/<id>.js` (e.g. `cover: asset('stu/my-hero.jpg')`).
- **Add a brand-new image** — drop it in and reference it from a slide via
  `photo: asset('<id>/yourfile.png')`.

> The images themselves are **gitignored** so private photos aren't published;
> the folder + `src/assets/README.md` stay tracked. A fresh clone builds and
> runs (with placeholders) until you add your own. See `src/assets/README.md`.

### Adding a new slide type (to an existing design)

1. Create `src/kits/<kit>/layouts/mytype.js` exporting `{ cls, render(slide, idx) }`.
2. Register it in that kit's `index.js`, in its `LAYOUTS` map.
3. Add its CSS to `src/kits/<kit>/<kit>.css`, **scoped under `.kit-<kit>`**
   (unscoped rules leak into every other kit — all kit stylesheets are bundled
   into one sheet).
4. Use `type: 'mytype'` in a slide of a deck whose `meta.kit` is that kit.

### Adding a new design

That's a **kit**, not a layout — see [`src/kits/README.md`](./src/kits/README.md).

## Contributing & security

- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — dev setup and conventions.
- [`SECURITY.md`](./SECURITY.md) — reporting and the one rule to remember:
  slide content is injected as HTML, so **never render untrusted input without
  sanitizing it**. As shipped, all content is author-controlled and safe.

## Origin & credits

Built by **Shayaan Danish Ansari** — co-founder of [**Stu**](https://stu-concierge.com),
an agentic e-commerce platform (landing page: [home.stu-concierge.com](https://home.stu-concierge.com))
— to generate Stu's own Instagram content.

The two Stu decks tracked in this repo — `stu-beta.js` ("Stu — Open Beta
(Post)") and `stu-live.js` ("Stu Live (Post)") — aren't sample data, they're
the real thing, kept here as a homage to why this tool exists, and they double
as the worked example/template for anyone adapting the repo to their own
project. Their images are gitignored like any other project's — a fresh clone
renders them with labelled placeholders until you add your own artwork under
`src/assets/stu/`. The engine, kits, and workflow are all product-agnostic:
add your own deck under `src/data/projects/` and it works the same way.

- Website: [shayaandanishansari.com](https://shayaandanishansari.com)
- Email: [shayaan0303@gmail.com](mailto:shayaan0303@gmail.com)
- GitHub: [github.com/shayaandanishansari](https://github.com/shayaandanishansari)
- LinkedIn: [linkedin.com/in/shayaan-danish-ansari-43a852246](https://www.linkedin.com/in/shayaan-danish-ansari-43a852246/)

## License

[AGPL-3.0](./LICENSE) © 2026 Shayaan Danish
