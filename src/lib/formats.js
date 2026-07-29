// ============================================================================
// Canvas formats — the SHAPE a slide is rendered and exported at.
// ----------------------------------------------------------------------------
// The studio used to assume one shape (1080x1080) in four places: the preview
// frame, the scaler, the .slide box, and the export canvas. All four now ask
// here instead, so a story deck is a data choice rather than a fork of the
// engine.
//
// Who decides which shape:
//   1. the DECK's `meta.format` — a deck knows what it's being posted as
//   2. else the KIT's `meta.format` — a design may only make sense in one shape
//   3. else `square` — every deck written before formats existed
//
// A kit that wants to support both shapes styles the difference under
// `.fmt-story` / `.fmt-square`, which render.js stamps on the slide element
// alongside `kit-<id>`.
// ============================================================================
export const FORMATS = {
  square: { id: 'square', w: 1080, h: 1080, label: 'Feed post' },
  story: { id: 'story', w: 1080, h: 1920, label: 'Story' },
};

export const DEFAULT_FORMAT = 'square';

export function getFormat(id) {
  return FORMATS[id] || FORMATS[DEFAULT_FORMAT];
}
