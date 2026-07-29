# Kit: `beacon`

The one-card **"we're live"** announcement. A night-forest canvas with a
broadcast pulse radiating from a live badge, one enormous headline inside the
rings, and a single ask on a grass plaque.

It is Stu's palette after dark. Where `bowl` walks somebody through the product
over five quiet slides on cream, this kit says one thing loudly on one card —
the post you make the day a thing ships. `shout` is the neighbouring idea but
Highlighter's voice and its own confetti palette; this one is the product's.

Deck opts in with `kit: 'beacon'`.

## Files

| file | what it is |
| --- | --- |
| `index.js` | `meta {id,name,format}` + `LAYOUTS { announce }`; imports the stylesheet |
| `beacon.css` | every rule scoped under `.kit-beacon`, plus the `dawn` theme and story sizing |
| `helpers.js` | the ring backdrop, the grain, the brandmark, the badge, the step track |
| `layouts/announce.js` | the single slide type |

## The `announce` slide

```js
{
  type: 'announce',
  logo:   ASSETS.logo,             // the app icon, top-left
  brand:  'Stu',
  status: 'Open beta · live',      // the badge — the bit that reads at thumbnail size
  kicker: 'No waitlist. No invite code.',
  head:   'Stu is <em>live</em>.', // <em> = the grass serif italic
  lede:   'Tell Stu what you want to eat…',  // may carry <b> and <span class="mark">
  steps:  ['Chat', 'Plan', 'Cart', 'Checkout'],  // the track, in order
  cta:    'Try Stu free',          // the plaque
  note:   'Link in bio',           // optional
  handle: '@stu_social',           // optional footer
}
```

Read top to bottom the card is: who is talking, what changed, why you'd care,
what the thing does, what to do about it. Keep `head` to three or four words —
it is set at 128px and the layout gives it two lines at most.

`steps` is the real path *through* the product, in order. That's what makes it
evidence rather than a feature list; four is the comfortable maximum before the
track wraps.

## One bright thing

The only saturated fills on the canvas are the badge and the plaque, and that is
deliberate: the eye lands on "live", reads the head, and leaves through the ask.
If you add a third green fill you lose the path.

Green is a **fill** colour. Grass text on the forest uses `--grass-lift`
(`#3EE07C`); on the `dawn` theme's cream that same var is redefined to the
darker `#0C8A3D` (matching `bowl`'s `--grass-ink`) —
the fill green is ~2.2:1 on cream and unreadable as type.

## Themes and shapes

- `theme: 'dawn'` — the same layout flipped onto Stu's cream. A palette variant,
  not a second design.
- `meta.format: 'story'` — 1080×1920. The padding grows at both ends so nothing
  that must be read sits under Instagram's profile row or reply bar.
