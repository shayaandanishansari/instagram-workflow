// Small shared helpers used across the layout templates.

export const pad = (n) => (n < 10 ? '0' : '') + n;

// Every photo target and its file input share the slide index, so the
// "Replace photo" wiring and the export routine can find them generically.
export const photoId = (idx) => 'photo-' + idx;
export const inputId = (idx) => 'photo-input-' + idx;

// The three decorative background circles used by organic-bg slides.
export const blobs = () =>
  '<div class="blob blob-a"></div><div class="blob blob-b"></div><div class="blob blob-c"></div>';

// Emit an attribute only when a value is present (keeps templates tidy).
export const attr = (name, v) => (v ? ` ${name}="${v}"` : '');
