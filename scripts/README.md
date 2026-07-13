# `scripts/` — one-off tooling

Node scripts run from the command line. **Not part of the app bundle** — nothing
in `src/` imports these, and they never run in the browser.

## `download-drive.js`

Some FYP submissions attach their files; others just paste a **Google Drive
link**. This pulls such a link down into `submissions/` so the rest of the
workflow (pick images → write the deck) is identical either way.

```bash
npm run drive -- "<drive-folder-or-file-url>" --project "Project Name"
```

Downloads into `submissions/<Project Name>/`, which is gitignored — the
submission folder holds PII, so its contents are never published.

Needs a Google API key, set up once. See `.env.example`; the key lives in `.env`,
which is gitignored.

## Adding a script

Keep them self-contained and side-effect-free until invoked, and add an npm alias
in `package.json` so the invocation is discoverable. If a script writes anything
derived from a submission, it must write it somewhere gitignored
(`submissions/` or `src/assets/`) — never into a tracked file.
