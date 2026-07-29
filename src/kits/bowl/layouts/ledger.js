import { brandmark, pill, foot } from '../helpers.js';

// THE SIGNATURE SLIDE — the receipt.
//
// Stu's hero feature (and the external jury's highlight on open-house day) is
// that a conversation ends as a filled cart, so this card shows the cart itself:
// real items, real rupees, a rule, a total. It is a screenshot of the outcome
// rather than a claim about it, which is why the numbers must stay honest — if
// the deck's `cart` and `total` ever disagree, the slide is lying.
//
// `cart` is DATA, not copy: each row is an object, so unlike the flat string
// fields around it these rows are NOT contenteditable (the save plugin rewrites
// string literals only — see CLAUDE.md). Edit them in the deck file.
export const ledger = {
  cls: 'slide s-ledger',
  render: (s, idx) => `
    <div class="pad">
      <div class="top">
        ${brandmark(s)}
        ${pill(s.pill)}
      </div>
      <h2 class="head" contenteditable="true" data-field="head">${s.head}</h2>
      <div class="ask" contenteditable="true" data-field="ask">${s.ask}</div>
      <div class="cart">
        ${(s.cart || [])
          .map(
            (r) => `<div class="row">
          <span class="item">${r.item}</span>
          <span class="qty">&times;${r.qty}</span>
          <span class="rs">${r.rs}</span>
        </div>`
          )
          .join('\n        ')}
        <div class="total">
          <span class="lbl" contenteditable="true" data-field="totalLabel">${s.totalLabel || 'Total'}</span>
          <span class="amt" contenteditable="true" data-field="total">${s.total}</span>
        </div>
      </div>
      ${foot(idx, `<span class="note" contenteditable="true" data-field="note">${s.note || ''}</span>`)}
    </div>`,
};
