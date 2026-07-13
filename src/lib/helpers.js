// Engine-level helpers — shared by EVERY kit, and by render/export.
// Anything here is part of the contract a kit renders against; anything that is
// decoration for one particular look belongs in that kit's own helpers file
// (e.g. src/kits/fyp/helpers.js).

export const pad = (n) => (n < 10 ? '0' : '') + n;

// Every photo target and its file input share the slide index, so the
// "Replace photo" wiring and the export routine can find them generically.
// A kit that wants a swappable photo must put photoId(idx) on the element.
export const photoId = (idx) => 'photo-' + idx;
export const inputId = (idx) => 'photo-input-' + idx;

// Emit an attribute only when a value is present (keeps layouts tidy).
export const attr = (name, v) => (v ? ` ${name}="${v}"` : '');
