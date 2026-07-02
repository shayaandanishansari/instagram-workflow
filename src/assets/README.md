# src/assets/

Drop your images here. The loader (`src/data/assets.js`) **auto-discovers**
everything in this folder via `import.meta.glob` — there are no import lines to
edit. Supported: `.png .jpg .jpeg .webp .svg .gif .avif`.

> The image files themselves are **gitignored** (see `.gitignore`) so nobody's
> private photos get published. This README stays tracked so the folder and its
> contract are visible. If an expected image is absent, the app renders a
> labelled placeholder instead of crashing — so a fresh clone still builds and
> runs.

## Files the deck expects

These filenames are referenced by the role map in `src/data/assets.js`. Provide
them (or change the names in that map to match your files):

| Filename    | Role                          | Used by                    | Suggested size |
|-------------|-------------------------------|----------------------------|----------------|
| `logo.png`  | Brand logo / wordmark chip    | cover, qa, audience, closing | ~512×512, transparent |
| `cover.png` | Full-bleed hero photo         | cover slide                | ≥1080×1080 |
| `demo.png`  | App screenshot / demo shot    | screenshot + journey slides | ≥1080×1080 (screenshot), ≥600×376 (card) |

## Swapping assets

- **Replace an image**: drop a file with the same name — done, no code change.
- **Use different filenames**: edit the role map in `src/data/assets.js`
  (e.g. `cover: asset('my-hero.jpg')`).
- **Add a brand-new image**: drop it here and reference it from a slide in
  `src/data/slides.js` via `asset('yourfile.png')`.

## Publishing a sample image (optional)

If you want the public repo to show real artwork out of the box, un-ignore a
specific safe file in `.gitignore`, e.g.:

```gitignore
!src/assets/logo.png
```
