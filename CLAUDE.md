# CLAUDE.md

Guidance for Claude working in this repo.

## What this is

A data-driven studio that turns an **FYP form submission** into an Instagram
carousel: editable 1080×1080 slide cards, exported to PNG via `html2canvas`.
Pure client-side Vite app, no backend/accounts. One **project = one deck**; you
switch between them from the **Project** dropdown in the top bar.

## Layout that matters

```
submissions/              Raw form downloads (drop-zone) — GITIGNORED (holds PII)
  <Project>/              One folder per download: <Person>.txt + images/ + CSV
src/
  data/
    active.js             Resolves the open project → re-exports its SLIDES + ASSETS
    assets.js             Resolves image paths (recursive, deck-agnostic)
    projects/
      index.js            Auto-discovers every *.js with a meta.id (no registry to edit)
      stu.js, offlink.js  One file per deck: exports meta{id,name}, ASSETS, SLIDES
  assets/<id>/            That project's images — GITIGNORED, one subfolder per project
  templates/              Slide layouts: cover | screenshot | qa | audience | closing
vite-plugin-save-slides.js  Dev-only: saves in-browser text edits back to the active project file
```

## The main task: "add a new project" (usually from a submission)

The user drops a form download into `submissions/<Project>/` and asks you to add
it. Do this:

1. **Read the source** in `submissions/<Project>/` — the `.txt` writeup(s) and/or
   the responses CSV — for the project name, motivation (why), outcome (what),
   audience (who), highlight (journey), team names, and links.
2. **Assets:** create `src/assets/<id>/` and copy the images you'll use from
   `submissions/<Project>/images/` into it (typically `logo.png`, `cover.png`,
   `demo.png`). Skip formats browsers can't render (e.g. `.NEF`).
3. **Deck file:** copy `src/data/projects/stu.js` to `src/data/projects/<id>.js`
   and edit: `meta.id` (unique, = filename sans `.js`), `meta.name`, the `ASSETS`
   paths (`asset('<id>/…')`), and the `SLIDES` (text + `file: '<id>-0N-….png'`).
   Follow `offlink.js` as the reference for wording style.
4. **Verify:** `npm run build` must pass. It auto-registers — no import lines to
   add anywhere. It appears in the dropdown on reload.

`<id>` is a short kebab/lowercase slug (e.g. `offlink`, `stu`).

## Conventions & guardrails

- **Slide text is injected as HTML.** It may contain `<b>…</b>` and
  `<span class="mark">…</span>` (the lime highlight). All content is
  author-controlled — never render untrusted input unsanitized (see SECURITY.md).
- **Privacy:** `submissions/` and `src/assets/*` are gitignored on purpose — they
  hold PII (emails, phone numbers, private photos). Don't un-ignore them or move
  that data into tracked files.
- **Saving needs the dev server** (`npm run dev`); the built static site has no
  backend to write to, so edits there stay in the browser.
- Keep new code in the style of the file around it; the codebase favours
  auto-discovery (globs) over hand-maintained lists — preserve that.

## Commands

```bash
npm install
npm run dev        # studio at the printed localhost URL (needed for saving edits)
npm run build      # production bundle → dist/  (use this to verify changes)
npm run preview    # serve the built dist/
```
