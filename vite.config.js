import { defineConfig } from 'vite';
import { saveSlidesPlugin } from './vite-plugin-save-slides.js';

// base:'./' keeps asset URLs relative so the built dist/ works when opened
// from any path (including file://) as well as when served.
export default defineConfig({
  base: './',
  plugins: [saveSlidesPlugin()], // dev-only: writes in-browser text edits back to slides.js
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0, // keep images as real files, not inlined data URIs
  },
});
