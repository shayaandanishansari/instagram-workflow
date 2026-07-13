# `src/kits/fyp/layouts/` — this kit's slide types

One file per slide `type`. A deck's slide says `type: 'qa'`, and `render.js`
resolves that against **this kit's** `LAYOUTS` map (in `../index.js`) to find the
layout that draws it.

## What a layout is

```js
export const qa = {
  cls: 'slide organic-bg s-qa',        // classes for the slide element (must include `slide`)
  render: (s, idx) => `…html…`,        // s = the slide object from the deck; idx = its position
};
```

That's the whole interface — identical in every kit. `cls` + `render`, nothing
else. The engine never inspects the HTML you return.

## Adding a slide type to this kit

1. Create `<type>.js` here exporting a `{ cls, render }` object.
2. Register it in `../index.js`'s `LAYOUTS` map (this is the one place in the
   codebase with a hand-maintained list — layouts are deliberately explicit, so
   a stray file can't become a slide type by accident).
3. Style it in `../fyp.css`, scoped under `.kit-fyp` (compound for slide-level
   classes, descendant for inner elements).

## Rules every layout here must follow

- **Editable text → a flat string prop on the slide, plus
  `contenteditable="true" data-field="<prop>"`** on the element. For an array
  field (e.g. `bullets`), also set `data-index="<i>"` on each item. This is what
  lets the dev-server plugin write the edit back into the deck file. Text with no
  `data-field` renders fine but can never be saved.
- **Swappable photo → `id="${photoId(idx)}"`** (from `src/lib/helpers.js`), and
  the slide must have a `photo` property for `render.js` to inject the
  "Replace photo" button. Draw it as a `background-image` (see the kit README:
  `html2canvas` doesn't honour `object-fit`).
- **Optional fields are opt-in.** The pattern used throughout: `s.bullets ? … : ''`.
  A layout must render sensibly when only its required fields are present.
- **Assets fall back**: `s.logo || ASSETS.logo` — a slide may override the deck's
  role map per-slide.

## The current five

| File | `type` | Required slide fields | Optional |
|---|---|---|---|
| `cover.js` | `cover` | `brand`, `desc`, `tagline`, `photo` | `logo`, `badge {label, logos[]}` |
| `screenshot.js` | `screenshot` | `photo` | — |
| `qa.js` | `qa` | `question`, `answer` | `eyebrow`, `bullets[]`, `photo`, `logos[]`, `questionStyle`, `answerStyle` |
| `audience.js` | `audience` | `question`, `items[]` | `eyebrow`, `caption`, `photo`, `decorTrees` |
| `closing.js` | `closing` | `head`, `sub`, `credit`, `cta` | `logo`, `teamPhoto`, `teamPhotos[]` |

Every slide also carries `name` (the slot label in the studio) and `file` (the
export filename).

> Note `audience.js` includes `s-qa` in its `cls` on purpose — it reuses the
> `.s-qa .demo-card` styling for its optional top-right photo.
