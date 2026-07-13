# src/assets/

Drop your images here, **one subfolder per project** — `stu/`, `offlink/`, …
The loader (`src/data/assets.js`) **auto-discovers** everything under this
folder recursively via `import.meta.glob` — there are no import lines to edit —
and keys each image by its path relative to `src/assets/` (e.g. `stu/cover.png`).
Supported: `.png .jpg .jpeg .webp .svg .gif .avif`.

Per-project subfolders mean two decks can each have a `cover.png`/`logo.png`
without clashing. Reference an image from a project's `ASSETS` map (in
`src/data/projects/<id>.js`) as `asset('<id>/cover.png')`.

> The image files themselves are **gitignored** (see `.gitignore`) so nobody's
> private photos get published. This README stays tracked so the folder and its
> contract are visible. If an expected image is absent, the app renders a
> labelled placeholder instead of crashing — so a fresh clone still builds and
> runs.

## Files each deck expects

Inside a project's subfolder (`src/assets/<id>/`), these filenames are
referenced by the role map (`ASSETS`) in `src/data/projects/<id>.js`. Provide
them (or change the names in that map to match your files):

| Filename    | Role                          | Used by (in the `fyp` kit)   | Suggested size |
|-------------|-------------------------------|------------------------------|----------------|
| `logo.png`  | Brand logo / wordmark chip    | cover, qa, audience, closing | ~512×512, transparent |
| `cover.png` | Full-bleed hero photo         | cover slide                  | ≥1080×1080 |
| `demo.png`  | App screenshot / demo shot    | screenshot + journey slides  | ≥1080×1080 (screenshot), ≥600×376 (card) |

> These roles are a **convention of the `fyp` kit**, not a rule of the loader.
> `assets.js` just resolves paths — the role map is whatever a deck's `ASSETS`
> export says it is, and a different kit (`src/kits/<id>/`) is free to expect a
> completely different set of images.

## Swapping assets

- **Replace an image**: drop a file with the same name into `src/assets/<id>/`
  — done, no code change.
- **Use different filenames**: edit the role map (`ASSETS`) in
  `src/data/projects/<id>.js` (e.g. `cover: asset('stu/my-hero.jpg')`).
- **Add a brand-new image**: drop it in `src/assets/<id>/` and reference it from
  a slide in `src/data/projects/<id>.js` via `asset('<id>/yourfile.png')`.

## Publishing a sample image (optional)

If you want the public repo to show real artwork out of the box, un-ignore a
specific safe file in `.gitignore`, e.g.:

```gitignore
!src/assets/stu/logo.png
```
