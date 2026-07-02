// Registry mapping each slide `type` to its layout template.
// A template is an object: { cls: string, render: (slide, idx) => htmlString }.
// To add a new layout: create a file here and register it below.
import { cover } from './cover.js';
import { screenshot } from './screenshot.js';
import { qa } from './qa.js';
import { audience } from './audience.js';
import { closing } from './closing.js';

export const TEMPLATES = { cover, screenshot, qa, audience, closing };
