# Stu — Instagram Post Studio

A small, data-driven studio for building the Stu FYP Instagram carousel. Every
slide is a live, editable 1080×1080 card; click any text to edit, swap photos
per-slide, and export true 1080×1080 PNGs (one at a time or the whole deck).

Fully client-side — no server, no accounts, no data leaves your browser. The
only runtime dependency is [`html2canvas`](https://html2canvas.hertzen.com/)
(it powers PNG export).

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

```
index.html              Page shell (topbar, intro, empty #grid, footer)
src/
  main.js               Entry: loads styles, wires resize, renders the deck
  styles.css            All styling (CSS vars + per-type slide layouts)
  data/
    assets.js           Imports every image once → ASSETS map
    slides.js           SLIDES: the single source of truth for the deck
  templates/
    index.js            TEMPLATES registry (type → layout)
    helpers.js          Shared render helpers (blobs, ids, attr…)
    cover.js            Layout: full-bleed hero + wordmark band
    screenshot.js       Layout: single framed screenshot
    qa.js               Layout: question + quote (+ optional demo photo)
    audience.js         Layout: question + 2-col audience grid
    closing.js          Layout: centered logo + headline + CTA
  lib/
    render.js           Builds slots from SLIDES, wires interactions
    export.js           html2canvas → 1080×1080 PNG (per-slide + all)
    scale.js            Scales previews to fit their column
  assets/               Your images — auto-discovered, gitignored (see below)
submissions/            Raw form downloads (drop-zone) — gitignored, see its README
```

## Working from a form submission

Downloaded a folder from the **FYP Submission Form**? Drop it straight into
[`submissions/`](./submissions/) — that's the drop-zone for raw form data (one
folder per project, plus the responses CSV). It's **gitignored** because it holds
PII, so nothing there is published. See [`submissions/README.md`](./submissions/README.md)
for how to turn a submission into a deck (copy its images into `src/assets/`,
then fill in `src/data/slides.js`).

## Editing the deck

Everything flows from **`src/data/slides.js`** — there's no hardcoded slide
count anywhere.

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

The loader is **asset-agnostic**: every file in `src/assets/` is auto-discovered
(no import lines to maintain), and a missing image falls back to a labelled
placeholder instead of breaking the build.

- **Replace artwork** — drop a file with the same name into `src/assets/`.
- **Use different filenames** — edit the role map in `src/data/assets.js`
  (e.g. `cover: asset('my-hero.jpg')`).
- **Add a brand-new image** — drop it in and reference it from a slide via
  `photo: asset('yourfile.png')`.

> The images themselves are **gitignored** so private photos aren't published;
> the folder + `src/assets/README.md` stay tracked. A fresh clone builds and
> runs (with placeholders) until you add your own. See `src/assets/README.md`.

### Adding a new layout type

1. Create `src/templates/mytype.js` exporting `{ cls, render(slide, idx) }`.
2. Register it in `src/templates/index.js`.
3. Add any layout CSS to `src/styles.css` (scope it under a `.s-mytype` class).
4. Use `type: 'mytype'` in a slide.

## Contributing & security

- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — dev setup and conventions.
- [`SECURITY.md`](./SECURITY.md) — reporting and the one rule to remember:
  slide content is injected as HTML, so **never render untrusted input without
  sanitizing it**. As shipped, all content is author-controlled and safe.

## License

[MIT](./LICENSE) © 2026 Shayaan Danish
