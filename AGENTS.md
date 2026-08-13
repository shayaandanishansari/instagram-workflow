# AGENTS.md

Guidance for AI coding agents working in this repo.

## What this is

A data-driven studio that turns a form submission into an Instagram carousel:
editable 1080×1080 slide cards, exported to PNG via `html2canvas`. Pure
client-side Vite app, no backend/accounts. One **project = one deck**; you switch
between them from the **Project** dropdown in the top bar.

Three layers, and keeping them apart is the point of the structure:

- **Engine** (`src/lib/`, `src/data/`) — renders whatever it's given. Knows
  nothing about any particular design.
- **Kit** (`src/kits/<id>/`) — a *design*: its slide layouts + its own scoped
  stylesheet. `fyp` is the original FYP-showcase look; a genuinely different post
  is a new kit, not a new theme.
- **Deck** (`src/data/projects/<id>.js`) — *content*. Names the kit that renders
  it (`meta.kit`) and, optionally, a palette variant of that kit (`meta.theme`).

## Origin

Built by [Shayaan Danish Ansari](https://shayaandanishansari.com), co-founder of
[Stu](https://stu-concierge.com) — an agentic e-commerce platform (landing page:
[home.stu-concierge.com](https://home.stu-concierge.com)) — to generate Stu's own
Instagram content. The two Stu decks tracked in this repo (`stu-beta.js` —
"Stu — Open Beta (Post)" — and `stu-live.js` — "Stu Live (Post)") aren't sample
data added for the demo; they're kept as-is as a homage to why this tool exists,
and they double as the worked example/template for anyone adapting the repo to
their own project. Their images (`src/assets/stu/`) are gitignored like any
other project's, so a fresh clone renders them with labelled placeholders until
you drop in real artwork. Nothing about the engine, kits, or workflow is
Stu-specific — swap in a new deck and it works the same way for any product.

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
      stu-beta.js          One deck per file: meta{id,name,kit,theme?}, ASSETS, SLIDES
  assets/<id>/            That project's images — GITIGNORED, one subfolder per project
  kits/
    index.js              Auto-discovers every kits/*/index.js with a meta.id
    fyp/                  KIT: the FYP-showcase design
      index.js            meta{id,name} + LAYOUTS{cover|screenshot|qa|audience|closing}
      fyp.css             ALL of its styling — every rule scoped under .kit-fyp
      layouts/            One file per slide type: { cls, render(slide, idx) }
      helpers.js          Decoration for THIS kit only (blobs, tree grove)
  lib/
    helpers.js            Engine helpers every kit renders against (pad, photoId, …)
    formats.js            The CANVAS shapes: square 1080×1080 | story 1080×1920
    render.js             Builds the grid; stamps kit-<id> + theme-<x> + fmt-<x> per slide
    export.js, scale.js   PNG export (html2canvas) and preview scaling
  styles.css              Studio chrome + the slide-canvas contract — NOT deck design
vite-plugin-save-slides.js  Dev-only: saves in-browser text edits back to the active project file
```

## Adding a new kit (a genuinely different design)

1. `src/kits/<id>/index.js` — export `meta {id, name}` and `LAYOUTS` (a map of
   slide `type` → layout). Import its stylesheet from here.
2. `src/kits/<id>/<id>.css` — **every rule scoped under `.kit-<id>`**. This is
   load-bearing: Vite bundles all kit stylesheets into one sheet, so an unscoped
   `.eyebrow` silently restyles every other kit. `render.js` puts `kit-<id>` on
   the slide element *and* on `<body>` (the slide, so CSS vars resolve where
   html2canvas captures; the body, so a kit's theme can tint the studio chrome).
3. A layout is `{ cls, render(slide, idx) => htmlString }` — same contract for
   every kit. It auto-registers; a deck opts in with `kit: '<id>'`.

Two constraints the engine imposes on any kit:

- **Editable text must be a flat string property on the slide object** (`title`,
  `answer`, …) that the layout interpolates, and the element needs
  `contenteditable` + `data-field="<prop>"`. The save plugin rewrites *string
  literals* in the deck file — text buried inside an HTML blob cannot be saved.
- **A swappable photo must carry `id="${photoId(idx)}"`** (from `src/lib/helpers.js`),
  which is how "Replace photo" and the exporter find it.

Themes (`meta.theme`) are palette variants *within* a kit — same layouts,
different colours (see the THEMES comment at the bottom of `fyp.css` for the
pattern; none ship by default). They cannot give you a different design;
that's what a new kit is for.

**Canvas format** (`src/lib/formats.js`) is the *shape*: `square` (1080×1080
feed post, the default) or `story` (1080×1920). A deck asks for one with
`meta.format`; failing that it gets its kit's `meta.format`; failing that,
square. `render.js` stamps `fmt-<id>` on the slide, so a kit that supports both
styles the difference under `.kit-<id>.fmt-story` (see `shout`). Nothing else in
the engine hardcodes a size — preview scaling and the PNG export both read the
resolved `CANVAS` from `src/data/active.js`.

A kit helper must read `CANVAS`/`SLIDES` **inside a function**, never at module
scope: `active.js` → `kits/index.js` → every kit is a cycle, so touching them at
module scope is a temporal-dead-zone crash the build won't catch.

## The main task: "add a new project" (usually from a submission)

The user drops a form download into `submissions/<Project>/` and asks you to add
it. Do this:

1. **Read the source** in `submissions/<Project>/` — the `.txt` writeup(s) and/or
   the responses CSV — for the project name, motivation (why), outcome (what),
   audience (who), highlight (journey), team names, and links.
2. **Assets:** create `src/assets/<id>/` and copy the images you'll use from
   `submissions/<Project>/images/` into it (typically `logo.png`, `cover.png`,
   `demo.png`). Skip formats browsers can't render (e.g. `.NEF`).
3. **Deck file:** copy `src/data/projects/stu-beta.js` to `src/data/projects/<id>.js`
   and edit: `meta.id` (unique, = filename sans `.js`), `meta.name`, `meta.kit`
   (`'fyp'` unless the post wants a different design), the `ASSETS` paths
   (`asset('<id>/…')`), and the `SLIDES` (text + `file: '<id>-0N-….png'`).
   Follow `stu-beta.js` as the reference for wording style.
4. **Verify:** `npm run build` must pass. It auto-registers — no import lines to
   add anywhere. It appears in the dropdown on reload.

`<id>` is a short kebab/lowercase slug (e.g. `stu`, `acme-app`).

## Conventions & guardrails

- **Slide text is injected as HTML.** It may contain `<b>…</b>` and
  `<span class="mark">…</span>` (the lime highlight). All content is
  author-controlled — never render untrusted input unsanitized (see SECURITY.md).
- **Privacy:** `submissions/`, `src/assets/*` **and the deck files
  (`src/data/projects/*.js`)** are gitignored on purpose — they hold PII (real
  names, quotes, handles, emails, private photos). Don't un-ignore them, and
  never move that data into a tracked file (including into a README or a commit
  message).
  - Tracked exceptions, all deliberate: `example.js` (invented), and **Stu's own
    decks** — `stu-beta.js` and `stu-live.js` — published by the owner's
    decision so the Stu team can collaborate on their decks in this repo. **The repo is
    public**, so that data is world-readable. Stu is this project's origin
    (see "Origin" above) and its content is already public elsewhere, so its
    decks stay in the repo as a worked template/example rather than as a
    project someone else needs to remove — a new user can leave them as
    reference or delete them freely.
  - That exception covers Stu and nothing else. Every other deck and asset
    folder belongs to somebody who submitted a form; adding one to the
    `.gitignore` allowlist needs that person's say-so, not just a request to
    "share the project".
- **Saving needs the dev server** (`npm run dev`); the built static site has no
  backend to write to, so edits there stay in the browser.
- Keep new code in the style of the file around it; the codebase favours
  auto-discovery (globs) over hand-maintained lists — preserve that.

## Getting started (no git, no Node — just Claude Code)

Someone can land here with nothing installed but Claude Code. Walk them through:

1. **No git needed to get the code.** Every GitHub Release auto-generates a
   "Source code (zip)" download on the repo's Releases page (the repo's green
   "Code → Download ZIP" button works too, off `main`). Unzip it and open that
   folder in Claude Code.
2. **No Node.js?** Check with `node -v`; if it's missing, install it first —
   `winget install OpenJS.NodeJS.LTS` on Windows, `brew install node` on macOS —
   then continue. Node 18+ is required.
3. From there it's the normal flow below: `npm install`, `npm run dev`.

## Commands

```bash
npm install
npm run dev        # studio at the printed localhost URL (needed for saving edits)
npm run build      # production bundle → dist/  (use this to verify changes)
npm run preview    # serve the built dist/
```
