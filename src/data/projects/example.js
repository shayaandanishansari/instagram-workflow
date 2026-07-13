import { asset } from '../assets.js';

/* ============================================================================
   PROJECT: Example — a template deck (SAFE TO PUBLISH)
   ----------------------------------------------------------------------------
   This is the ONLY deck file tracked in git. Every real deck holds a team's
   personal details (names, quotes, handles) taken from an FYP submission, so
   src/data/projects/*.js is gitignored — see .gitignore and SECURITY.md.

   It exists for two reasons:
     1. A fresh clone has no real decks, so without this the project registry
        would be empty and the studio would have nothing to render.
     2. It is the template — copy it to <id>.js and fill it in. The content
        below is invented; no real person appears in it.

   Its images aren't in the repo either, so the slides render with labelled
   "missing asset" placeholders. That's expected, and it's exactly what a fresh
   clone should look like until you add a deck of your own.

   THE CONTRACT (every deck file must export these three):
     meta    — { id, name, kit, theme? }  id is unique, = filename without .js,
               and is the dropdown value + the localStorage key. `kit` names the
               DESIGN that renders this deck (a folder in src/kits/); `theme` is
               an optional palette variant within that kit.
     ASSETS  — the role map for THIS deck; images live in src/assets/<id>/
     SLIDES  — the slides, the single source of truth for the deck
   ========================================================================== */

export const meta = {
  id: 'example',
  name: 'Example — Template Deck',
  kit: 'fyp',              // the design that renders it — src/kits/fyp/
};

// Role map: which file plays which part. Drop matching files into
// src/assets/example/ (or rename these to match the files you have).
export const ASSETS = {
  logo:       asset('example/logo.png'),
  logoShadow: asset('example/logo-shadow.png'), // logo with a baked-in shadow (survives PNG export)
  cover:      asset('example/cover.png'),
  screenshot: asset('example/demo.png'),
  demo:       asset('example/demo.png'),
};

/* Slide types come from THIS DECK'S KIT (meta.kit). The 'fyp' kit offers:
   'cover' | 'screenshot' | 'qa' | 'audience' | 'closing' — one file each in
   ../../kits/fyp/layouts/. Text may contain <b>…</b> and
   <span class="mark">…</span> (the accent highlight). */
export const SLIDES = [
  {
    name: 'Cover', type: 'cover', file: 'example-01-cover.png',
    brand: 'Example',
    desc: 'One-line description of the project',
    tagline: 'The hook: what it does, in a sentence someone would actually say.',
    photo: ASSETS.cover,
  },
  {
    name: 'Inside the product', type: 'screenshot', file: 'example-02-inside.png',
    photo: ASSETS.screenshot,
  },
  {
    name: 'What is it', type: 'qa', file: 'example-03-what.png',
    eyebrow: 'From the team',
    question: 'What was your <span class="mark">project?</span>',
    answer: 'A short, concrete description of what was built.&nbsp;<div><br></div><div>Lead with the <b>hero feature</b> — the one thing that makes people look twice — then fill in what supports it.</div>',
  },
  {
    name: 'Why we built it', type: 'qa', file: 'example-04-why.png',
    eyebrow: 'From the team',
    question: 'Why did you do <span class="mark">this project?</span>',
    answer: 'The problem, stated as the people who have it would state it. Keep the motivation human rather than technical.',
    bullets: ['A benefit', 'Another benefit', 'A third benefit'],
  },
  {
    name: "Who it's for", type: 'audience', file: 'example-05-who.png',
    eyebrow: 'From the team',
    question: 'Who was it <span class="mark">for?</span>',
    items: ['Audience one', 'Audience two', 'Audience three', 'Audience four'],
    caption: 'A single line that widens it out — who this is really for.',
  },
  {
    name: 'The journey', type: 'qa', file: 'example-06-journey.png',
    eyebrow: 'From the team',
    question: 'What\'s your highlight from the <span class="mark">journey?</span>',
    answer: 'The story beat: a moment that changed things, told the way it happened.&nbsp;<div><br></div><div>Specifics beat adjectives — what shipped, what broke, what landed.</div>',
  },
  {
    name: 'Closing / CTA', type: 'closing', file: 'example-07-closing.png',
    head: 'Three. Word. Hook.',
    sub: 'The payoff line.',
    credit: 'Built by the team',
    cta: 'Where to find it →',
  },
];
