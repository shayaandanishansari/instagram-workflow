# Kit: `shout`

The loud poster. Black canvas, one enormous headline in the middle, a ring of
colour-coded word chips around it. It exists to make an **ask** — "Highlight
your FYP / fill in the form" — where `fyp` showcases somebody else's project and
`paper` speaks in Highlighter's notebook voice.

Deck opts in with `kit: 'shout'`.

## Files

| file | what it is |
| --- | --- |
| `index.js` | `meta {id,name}` + `LAYOUTS { poster }`; imports the stylesheet |
| `shout.css` | every rule scoped under `.kit-shout` |
| `helpers.js` | the **anchor table** (where each word chip lands), the chip renderer, the backdrop |
| `layouts/poster.js` | the single slide type |

## The `poster` slide

```js
{
  type: 'poster',
  kicker: 'Highlight your',        // small line above the shout
  hero:   'F<span class="c1">Y</span>P',  // the shout; letters may carry .c1/.c2/.c3 accents
  sub:    'Fill in the form',      // the ask, on a highlighter swipe
  note:   'Link in bio',           // optional
  words:  ['Thesis', 'Recruiters', …],  // the ring
  handle: '@highlighter.world',    // optional footer
}
```

**The order of `words` is the layout.** Word *i* lands on anchor *i* in
`helpers.js` — there are 20 anchors, and extras are dropped. Anchors **3, 6, 13
and 16** hug the canvas edge (a chip is centred on its anchor), so keep those
entries to one short word or they run off the 1080px canvas.

## Both shapes

The kit draws a **square feed post** *or* a **story** — the deck picks with
`meta.format: 'story'` (see `src/lib/formats.js`). The ring has one anchor table
per shape, because percentages alone would strand the chips at the ends of a
1920px canvas. The two tables are deliberately parallel — same length, same four
edge slots — so one deck's `words` array works in either shape unchanged. Keep
that true if you tune them.

In story, the ring's top row stays below Instagram's profile/close overlay and
the footer sits well clear of the reply bar.

Colour cycles through six accents by index, and every third chip is filled
rather than outlined — that's what stops the ring reading as a uniform border.
Nothing about a word's colour or angle lives in the deck; it's all positional.
