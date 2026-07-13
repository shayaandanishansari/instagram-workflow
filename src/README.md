# `src/` — the application

Everything the studio runs on. The whole app is client-side: Vite bundles this
folder, `index.html` mounts `main.js`, and there is no backend at runtime.

## The one idea that explains the structure

There are **three layers, and they are kept strictly apart**:

| Layer | Where | What it knows |
|---|---|---|
| **Engine** | `lib/`, `data/`, `styles.css` | How to render *any* deck in *any* design. Knows nothing about a particular look or a particular project. |
| **Kit** | `kits/<id>/` | A **design**: slide layouts + its own scoped stylesheet. Knows nothing about any specific project's content. |
| **Deck** | `data/projects/<id>.js` | **Content**: one project's slides, text, and image roles. Names the kit that renders it. |

Read that table before changing anything here. Most of the mistakes this
structure exists to prevent are one layer reaching into another — a colour from
a kit hardcoded in the engine, or a question from one project baked into a kit.

## What's in here

```
main.js       Entry point. Imports styles.css, starts the resize watcher, calls render().
styles.css    Studio CHROME (topbar, grid, preview frames, toast) + the 1080×1080
              canvas contract. Deliberately contains NO deck design — that's a kit's.
lib/          The engine: render, PNG export, preview scaling, shared helpers.
kits/         The designs. One folder per kit; auto-discovered.
data/         The content: project decks, the active-project resolver, the asset loader.
assets/       Images, one subfolder per project. GITIGNORED (private photos).
```

## The flow, end to end

1. `main.js` calls `render()` (`lib/render.js`).
2. `render` reads the **active deck** from `data/active.js` (which resolves the
   project chosen in the dropdown, remembered in `localStorage`).
3. It looks up that deck's **kit** (`meta.kit`) in `kits/index.js`.
4. For each slide, it finds the layout for the slide's `type` **in that kit** and
   calls `layout.render(slide, idx)` to get HTML.
5. It stamps `kit-<id>` and (if set) `theme-<x>` onto the slide element and onto
   `<body>`, then wires editing, photo-swap, and export buttons.
6. `lib/export.js` clones a slide into a clean off-screen 1080×1080 box and
   snapshots it with `html2canvas`.

## Regenerating this folder

The sub-READMEs here are written as **contracts**, so the wiring is
reconstructible from them. Two things are *not*, and no doc can make them so:

- **`kits/fyp/fyp.css`** — the specific look (the wave, the greens, the blob
  geometry). The README tells you what a kit stylesheet must *satisfy*; it does
  not encode the taste. Losing it means redesigning, not restoring.
- **`data/projects/*.js` and `assets/`** — real project content and real photos.
  They come from `submissions/`, not from any spec.
