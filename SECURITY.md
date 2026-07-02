# Security Policy

## What this project is (and isn't)

Stu — Instagram Post Studio is a **fully client-side, static tool**. It has:

- no backend server, database, or API,
- no user accounts, authentication, sessions, or cookies,
- no secrets or credentials,
- no network requests to third parties at runtime (fonts are the only external
  request, and everything else is bundled).

Everything runs in your own browser, and the exported PNGs are generated
locally. The practical attack surface is therefore very small.

## The one thing to be careful about

Slides are rendered from `src/data/slides.js` using `innerHTML`. That content is
**author-controlled** — you write it — so it is not an injection risk as shipped.

If you extend this tool to render slide content that comes from an **untrusted
source** (URL parameters, uploaded/imported JSON, a public "paste your deck"
feature, etc.), treat that content as hostile and **sanitize/escape it** before
inserting it into the DOM. Otherwise you introduce a cross-site scripting (XSS)
vector. See `CONTRIBUTING.md` for details.

## Dev-time dependencies

Build tooling (Vite/esbuild) runs only on a maintainer's machine and never ships
to users. We keep it patched via Dependabot; advisories there do not affect
anyone using the built app.

## Reporting a vulnerability

Please report privately rather than opening a public issue:

- Use GitHub's **"Report a vulnerability"** (Security → Advisories) on this repo, or
- email the maintainer.

We'll acknowledge within a few days and aim to address confirmed issues promptly.
