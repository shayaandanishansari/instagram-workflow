import { asset } from '../assets.js';

/* ============================================================================
   PROJECT: Stu — Personal Food Concierge
   ----------------------------------------------------------------------------
   One project = one deck. This file exports three things (the contract every
   project file in this folder must follow):

     meta    — { id, name, kit, theme? }  (id must be unique; it's the dropdown
               value + the localStorage key + this filename without .js.
               `kit` names the DESIGN that renders this deck — see src/kits/;
               `theme` is an optional palette variant within that kit.)
     ASSETS  — the role map for THIS deck; images live in src/assets/<id>/
     SLIDES  — the slides, the single source of truth for the deck

   Add a new project by copying this file to src/data/projects/<id>.js, changing
   meta.id, and dropping its images in src/assets/<id>/. It auto-registers.
   ========================================================================== */

export const meta = {
  id: 'stu',
  name: 'Stu — Personal Food Concierge',
  kit: 'fyp',              // the design that renders it — src/kits/fyp/
};

// Role map: which file plays which part in the deck. Swap filenames here and
// drop matching files into src/assets/stu/ to re-skin the whole deck.
export const ASSETS = {
  logo:       asset('stu/logo.png'),
  logoShadow: asset('stu/logo-shadow.png'), // logo with a baked-in silhouette shadow (survives PNG export)
  cover:      asset('stu/cover.png'),
  screenshot: asset('stu/demo.png'), // slide 2 currently reuses the demo shot
  demo:       asset('stu/demo.png'),
};

/* Slide types come from THIS DECK'S KIT (meta.kit). The 'fyp' kit offers:
   'cover' | 'screenshot' | 'qa' | 'audience' | 'closing' — one file each in
   ../../kits/fyp/layouts/. Another kit defines its own types, so switching kit
   means reshaping these slides. Text may contain <b>…</b> and
   <span class="mark">…</span> — the lime highlight. */
export const SLIDES = [
  {
    name: 'Cover', type: 'cover', file: 'stu-01-cover.png',
    brand: 'Stu',
    desc: 'Personal Food Concierge',
    tagline: 'Chat to plan meals, and order groceries, all in one platform.',
    photo: ASSETS.cover,
  },
  {
    name: 'Inside Stu', type: 'screenshot', file: 'stu-02-inside.png',
    photo: ASSETS.screenshot,
  },
  {
    name: 'What is Stu', type: 'qa', file: 'stu-03-what.png',
    eyebrow: 'From the team',
    question: 'What was your <span class="mark">project?</span>',
    answer: 'Stu is an AI simulating a <b>personal food concierge</b>.&nbsp;<div><br></div><div>That is you can <b>converse with Stu</b> (chatbot), <b>make meal plans</b>, align with your <b>dietary concerns</b>, and <b>order groceries</b> through our cart system integrated with a grocery store!</div>',
  },
  {
    name: 'Why we built it', type: 'qa', file: 'stu-04-why.png',
    eyebrow: 'From the team',
    question: 'Why did you do <span class="mark">this project?</span>',
    answer: 'We wanted to assist <b>homecooks</b>, and <b>household managers</b> make the <b>best decision</b> for themselves in the <b>easiest way possible</b>.',
    bullets: ['Reduce mental load', 'Manage daily chores', 'Make informed decisions'],
  },
  {
    name: "Who it's for", type: 'audience', file: 'stu-05-who.png',
    eyebrow: 'From the team',
    question: 'Who was it <span class="mark">for?</span>',
    items: ['Homemakers', 'Students', 'Household Management', 'Health Trackers'],
    caption: 'For anyone and everyone who thinks about food, cooks, and does groceries.',
  },
  {
    name: 'The journey', type: 'qa', file: 'stu-06-journey.png',
    eyebrow: 'From the team',
    question: 'What\'s your highlight from the <span class="mark">journey?</span>',
    answer: 'The highlight of our journey was <b>revamping the UI two days before the FYP presentation</b>! And it <b>paid off immensely</b>!&nbsp;<div><br></div><div>It made our <b>hero feature</b> (store cart integration and adding items through an LLM) shine in the best way possible, and was the <b>highlight feedback from the external jury</b> on the open house day.&nbsp;</div><div><br></div><div>Genuinely one of the most fun moments of the whole journey as it changed the immediate feedback for the whole team.</div>',
  },
  {
    name: 'Closing / CTA', type: 'closing', file: 'stu-07-closing.png',
    head: 'Plan. Cook. Order.',
    sub: 'All in one chat.',
    credit: 'Built by Shayaan Danish, Abdul Tawab Junejo &amp; Muhammed Umair Asad',
    cta: 'Follow the journey → @stu_social',
  },
];
