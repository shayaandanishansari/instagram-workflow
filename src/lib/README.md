# `src/lib/` — the engine

The part of the app that renders **any** deck in **any** kit. Nothing in here may
know what a slide looks like: no colours, no fonts, no layout, no project names.
If you find yourself adding one, it belongs in a kit (`src/kits/<id>/`).

That rule is why this folder is small and why it hasn't needed to change when a
new project or a new design is added.

## Files

```
render.js    Builds the studio: one slot per slide, plus all the interaction wiring.
export.js    PNG export via html2canvas (single slide + whole deck).
scale.js     Fits the true-size slide into its (smaller) preview column.
formats.js   The canvas shapes: square (1080x1080) and story (1080x1920).
helpers.js   The few helpers that are part of the ENGINE's contract with a kit.
```

## `render.js` — what it actually does

1. Resolves the active deck (`data/active.js`) and its kit (`kits/index.js`,
   via `meta.kit`; falls back to `DEFAULT_KIT`).
2. For each slide, looks up `KIT.LAYOUTS[slide.type]`. Unknown type → renders a
   visible "Unknown type" slot rather than failing silently.
3. Emits `<div class="{layout.cls} kit-<id> theme-<x>" id="slide-N">`.
   **Both classes go on the slide element *and* on `<body>`**, on purpose:
   - on the **slide**, so the kit/theme CSS variables resolve on the element
     `html2canvas` actually captures;
   - on the **body**, so a kit's theme can tint the studio chrome to match.
4. Injects the "Replace photo" button for any slide with a `photo`.
5. Wires: project switcher (persists to `localStorage` + reloads), text saving,
   photo replacement, per-slide and bulk export, reset.

## `helpers.js` — the engine/kit contract

Small, but load-bearing. These are the names a kit must use to plug into the
engine's generic wiring:

| Helper | Why it exists |
|---|---|
| `photoId(idx)` | The id a kit must put on a swappable photo element. "Replace photo" and the exporter find photos **only** by this id. |
| `inputId(idx)` | Matching id for the hidden file input `render.js` injects. |
| `pad(n)` | Zero-padded slide numbers (slot badges, fallback export filenames). |
| `attr(name, v)` | Emit an attribute only when a value is present — keeps layouts tidy. |

Decoration (blobs, motifs, ornaments) does **not** belong here — that's kit-local;
see `src/kits/fyp/helpers.js` for the counterpart.

## Text saving (dev only)

`render.js` marks fields `contenteditable` and, on blur, POSTs to `/__save-slide`,
which `vite-plugin-save-slides.js` handles by **surgically rewriting the matching
string literal** in the deck file. This is why the engine imposes a rule on every
kit:

> Editable text must be a **flat string property** on the slide object
> (`title`, `answer`, …), rendered with `contenteditable` + `data-field="<prop>"`.
> Text baked into an HTML blob has no string literal to rewrite, so it silently
> won't save.

The built static site has no server, so edits there stay in the browser.

## `export.js` notes

- Clones the slide into an off-screen, untransformed box the size of the deck's
  `CANVAS`, so neither the preview scaling nor the rounded frame affects the output.
- Inlines every image and background-image to a data URL first, so `html2canvas`
  can't taint the canvas.
- `backgroundColor: null` **on purpose** — every kit paints its own opaque slide
  background, so hardcoding one here would leak a kit's palette into the engine.
- Oversamples by `EXPORT_SCALE` (2 → a 2160×2160 PNG; 2160×3840 for a story).
