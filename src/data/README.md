# `src/data/` — the content layer

What gets rendered, as opposed to how it looks (that's `src/kits/`) or the
machinery that renders it (that's `src/lib/`).

## Files

```
projects/     One deck per project. The decks themselves — see projects/README.md.
active.js     Resolves WHICH deck is currently open.
assets.js     Resolves image paths to URLs. Deck-agnostic, auto-discovering.
```

## `active.js` — the open deck

The studio shows one deck at a time. Which one is remembered in `localStorage`
(key `activeProject`), so it survives reloads and dev-server restarts.

```js
export const PROJECT = PROJECTS[getActiveId()];   // resolved ONCE, at module load
export const SLIDES  = PROJECT.SLIDES;
export const ASSETS  = PROJECT.ASSETS;
```

`render.js` and `export.js` import `SLIDES`/`ASSETS` from **here**, never from a
specific project file — which is what makes them deck-agnostic. Switching decks
is `setActiveId(id)` followed by a **reload**, and the reload is deliberate:
resolving once at load keeps render and export simple, with no reactive
re-wiring to get wrong.

If the stored id doesn't match a known project (e.g. a deck file was deleted),
it falls back to `DEFAULT_PROJECT` rather than breaking.

## `assets.js` — image resolution

`asset('stu/cover.png')` → the bundled URL for `src/assets/stu/cover.png`.

- **Auto-discovering**: globs `src/assets/**/*` eagerly, so there are no
  per-image import lines to maintain.
- **Namespaced by project**: two decks can each have a `cover.png` without
  colliding, because the key is the path relative to `src/assets/`.
- **Never fatal**: a missing image returns a labelled placeholder SVG (and logs a
  warning) instead of failing the build. This is what lets `src/assets/*` be
  gitignored — a fresh clone with no private photos still builds and runs.

It knows nothing about roles (logo/cover/demo); it just resolves paths. The role
map lives in each deck's `ASSETS` export.

## Privacy note

Deck files under `projects/` contain **real content from real submissions** —
team members' names, quotes, and social handles. Treat them as PII, the same as
the images in `src/assets/` and the raw downloads in `submissions/`. See
`SECURITY.md`.
