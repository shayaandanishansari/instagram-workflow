# Contributing

Thanks for your interest! This is a small, dependency-light tool — contributions
that keep it that way are very welcome.

## Getting started

```bash
npm install
npm run dev      # open the printed localhost URL
```

- `npm run build` — production build into `dist/`
- `npm run preview` — serve the built `dist/`

Run the app through the dev/preview server (not by opening `index.html` off
disk); PNG export needs images to load same-origin.

## Project structure

See the layout table in [`README.md`](./README.md). In short:

- **Add / edit / reorder slides** → that project's deck file,
  `src/data/projects/<id>.js` (the source of truth for one carousel).
- **Add a slide layout to an existing design** → a file in
  `src/kits/<kit>/layouts/` + register it in that kit's `index.js` `LAYOUTS` map
  + styles in `src/kits/<kit>/<kit>.css`, scoped under `.kit-<kit>`.
- **Add a whole new design** → a new kit folder, `src/kits/<id>/`. See
  [`src/kits/README.md`](./src/kits/README.md).
- **Add an image** → drop it in `src/assets/<project>/`; it's auto-discovered, so
  there's nothing to import. Reference it as `asset('<project>/file.png')`.

## Security-sensitive rule (please read)

Slide content is injected with `innerHTML`. Today that content is
**author-controlled**, so it's safe. **Do not** add features that render
**untrusted** input (URL params, uploaded/imported decks, remote fetches, a
public paste box, etc.) as HTML without sanitizing/escaping it first — that would
introduce an XSS vulnerability. If you need rich text from untrusted sources, use
a sanitizer (e.g. DOMPurify) or set text via `textContent`. See
[`SECURITY.md`](./SECURITY.md).

## Keep dependencies minimal

The only runtime dependency is `html2canvas` (it powers PNG export). Please avoid
adding new runtime dependencies unless there's a strong reason; dev-only tooling
is fine but should stay lean.

## Before opening a PR

- `npm run build` succeeds.
- No new `npm audit` findings (`npm audit`).
- The deck still renders and a slide exports to a 1080×1080 PNG.
