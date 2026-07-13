# `src/data/projects/` — the decks

**One project = one deck = one file.** Each file here is the single source of
truth for one Instagram carousel: its slides, its copy, its image roles, and the
design it renders in.

These files are **content**, not code you should be clever in. All the design
lives in a kit (`src/kits/`); all the machinery lives in `src/lib/`.

## The contract

Every deck file exports exactly three things:

```js
export const meta = {
  id:    'stu',              // unique; = filename without .js, the dropdown value,
                             //   and the localStorage key
  name:  'Stu — Personal Food Concierge',   // label in the Project dropdown
  kit:   'fyp',              // WHICH DESIGN renders it (a folder in src/kits/)
  theme: 'greenflow',        // optional: a palette variant WITHIN that kit
};

export const ASSETS = {      // role map: which file plays which part
  logo:   asset('stu/logo.png'),
  cover:  asset('stu/cover.png'),
  demo:   asset('stu/demo.png'),
};

export const SLIDES = [      // the deck, in order
  { name: 'Cover', type: 'cover', file: 'stu-01-cover.png', brand: 'Stu', … },
  …
];
```

**It auto-registers.** `index.js` globs `./*.js` and picks up anything exporting
a `meta.id` — there is no list to edit anywhere. Drop the file in, reload, it's
in the dropdown.

## Rules that aren't obvious

- **`SLIDES` must stay a literal array of literal objects.** The dev-server save
  plugin (`vite-plugin-save-slides.js`) finds `SLIDES = [` by regex and surgically
  rewrites the target **string literal** in place. Generate the array from a
  function — `export const SLIDES = buildDeck(content)` — and in-browser editing
  breaks with `SLIDES array not found`. This is the single biggest constraint on
  this folder, and the reason deck files are repetitive rather than abstracted.

- **A slide's `type` is resolved against its kit**, not globally. `type: 'cover'`
  means "the cover layout *of the kit named in `meta.kit`*". Switching a deck's
  kit therefore means reshaping its slides — the field names belong to the kit.

- **Slide text is injected as HTML.** It may contain `<b>…</b>` and
  `<span class="mark">…</span>` (the accent highlight). Content is
  author-controlled — never render untrusted input here unsanitised (`SECURITY.md`).

- **`file`** is the export filename for that slide (`'<id>-0N-name.png'`).

## Adding a deck

See the "add a new project" section in `CLAUDE.md` for the full flow from a raw
submission. In short: copy `stu.js` → `<id>.js`, change `meta`, point `ASSETS` at
`src/assets/<id>/`, write the `SLIDES`, and run `npm run build`.

Use `offlink.js` as the reference for wording/tone.

## ⚠ These files are GITIGNORED — they contain PII

Deck copy carries **real team members' full names, quotes, and social handles**,
taken from FYP submissions. That's the same PII `submissions/` and `src/assets/*`
are gitignored to protect, so the decks are gitignored too:

```gitignore
src/data/projects/*
!src/data/projects/index.js
!src/data/projects/example.js
!src/data/projects/README.md
```

Only three files here are tracked: `index.js` (the registry — code, no PII), this
README, and **`example.js`** — an invented deck with no real person in it, which
doubles as the template and keeps a fresh clone runnable.

Your real decks live on disk and work exactly as normal; they're just never
published. Don't un-ignore them, and don't copy their copy into a tracked file.
See `SECURITY.md`.
