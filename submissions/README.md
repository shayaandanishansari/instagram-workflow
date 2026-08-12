# submissions/ — raw form downloads (the drop-zone)

This is where the raw **FYP Submission Form** downloads live. Drop each project's
downloaded folder straight in here — no restructuring needed.

If a submission points to a Google Drive link instead of attached files, pull
it straight in with `npm run drive` (see [`scripts/download-drive.js`](../scripts/download-drive.js)
and [`.env.example`](../.env.example) for one-time API key setup):

```bash
npm run drive -- "<drive-folder-or-file-url>" --project "Project Name"
```

```
submissions/
  Final Year Project (FYP) Submission Form.csv   The raw form-responses export
  <Project Name>/                                One folder per project
    <Person>.txt                                 A team member's written answers
    images/                                       Photos, logos, posters, etc.
  ...
```

> This README deliberately does **not** list what's currently in here. The folder
> contents, the team names, and the deck files built from them are all PII — see
> *Privacy* below. Run `ls submissions/` locally to see your own drop-zone.

## How this connects to the studio

These folders are **source material**, not wired into the deck automatically.
To turn a submission into a carousel:

1. **Read the source** — the `.txt` writeup(s) and/or the responses CSV — for the
   project name, motivation (why), outcome (what), audience (who), highlight
   (journey), team names, and links.
2. **Copy the images** you want from `submissions/<Project>/images/` into
   `src/assets/<id>/` (auto-discovered — see [`src/assets/`](../src/assets/)).
   Skip formats browsers can't render (e.g. `.NEF`, `.HEIC` — convert first).
3. **Write the deck**: copy `src/data/projects/stu-beta.js` to
   `src/data/projects/<id>.js` and fill in its `meta`, `ASSETS` role map, and
   `SLIDES` — see [`src/data/projects/`](../src/data/projects/). It auto-registers.
4. **Verify** with `npm run build`.

The full step-by-step lives in [`CLAUDE.md`](../CLAUDE.md).

## Privacy

> **Everything under `submissions/` is gitignored** (see the repo `.gitignore`),
> except this README. These folders contain PII — names, emails, WhatsApp
> numbers, and private team photos — so their contents are **never published**.
> Only this file stays tracked so the workflow is documented on a fresh clone.

The **deck files** built from these submissions (`src/data/projects/<id>.js`)
carry the same PII forward — real names, quotes and handles in the slide copy —
so they are gitignored too. The only tracked deck is `example.js`, which is
invented. Don't move submission content into any tracked file.
