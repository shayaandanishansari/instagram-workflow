// ============================================================================
// Vite dev plugin: persist in-browser text edits back into src/data/slides.js.
// ----------------------------------------------------------------------------
// The studio marks slide text `contenteditable`. This plugin adds a dev-only
// endpoint (POST /__save-slide) that the browser hits on blur; it surgically
// replaces ONLY the target string literal in slides.js, leaving every comment,
// asset reference (e.g. ASSETS.cover) and bit of formatting untouched.
//
// It is a tiny, dependency-free scanner (no acorn/babel needed). It understands
// just enough JS to skip over strings and comments correctly while it walks the
// SLIDES array to the right object / property / array element.
// ============================================================================
import fs from 'node:fs';
import path from 'node:path';

// --- low-level skippers (all return the index just PAST the thing) ----------
function scanStringEnd(src, i) {
  const q = src[i];
  i++;
  while (i < src.length) {
    const c = src[i];
    if (c === '\\') { i += 2; continue; }
    if (c === q) return i + 1;
    i++;
  }
  return i;
}
function scanComment(src, i) {
  if (src[i] === '/' && src[i + 1] === '/') {
    i += 2;
    while (i < src.length && src[i] !== '\n') i++;
    return i;
  }
  if (src[i] === '/' && src[i + 1] === '*') {
    i += 2;
    while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) i++;
    return i + 2;
  }
  return i;
}
function matchPair(src, i, open, close) {
  let depth = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === '"' || c === "'" || c === '`') { i = scanStringEnd(src, i); continue; }
    if (c === '/' && (src[i + 1] === '/' || src[i + 1] === '*')) { i = scanComment(src, i); continue; }
    if (c === open) depth++;
    else if (c === close) { depth--; if (depth === 0) return i + 1; }
    i++;
  }
  return i;
}
const matchBrace = (src, i) => matchPair(src, i, '{', '}');
const matchBracket = (src, i) => matchPair(src, i, '[', ']');

function skipTrivia(src, i, limit) {
  while (i < limit) {
    const c = src[i];
    if (c === ' ' || c === '\t' || c === '\n' || c === '\r' || c === ',') { i++; continue; }
    if (c === '/' && (src[i + 1] === '/' || src[i + 1] === '*')) { i = scanComment(src, i); continue; }
    break;
  }
  return i;
}
function scanValueEnd(src, i, limit) {
  while (i < limit) {
    const c = src[i];
    if (c === '"' || c === "'" || c === '`') { i = scanStringEnd(src, i); continue; }
    if (c === '/' && (src[i + 1] === '/' || src[i + 1] === '*')) { i = scanComment(src, i); continue; }
    if (c === '{') { i = matchBrace(src, i); continue; }
    if (c === '[') { i = matchBracket(src, i); continue; }
    if (c === ',' || c === '}' || c === ']') return i;
    i++;
  }
  return i;
}

// --- locate the pieces we need ----------------------------------------------
function findArrayStart(src) {
  const m = /\bSLIDES\s*=\s*\[/.exec(src);
  if (!m) throw new Error('SLIDES array not found in slides.js');
  return m.index + m[0].length - 1; // index of the opening '['
}
function findSlideObject(src, arrStart, targetIdx) {
  let i = arrStart + 1;
  let count = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === '"' || c === "'" || c === '`') { i = scanStringEnd(src, i); continue; }
    if (c === '/' && (src[i + 1] === '/' || src[i + 1] === '*')) { i = scanComment(src, i); continue; }
    if (c === ']') return null;
    if (c === '{') {
      const end = matchBrace(src, i);
      if (count === targetIdx) return { start: i, end };
      count++;
      i = end;
      continue;
    }
    i++;
  }
  return null;
}
function findPropertyValueStart(src, objStart, objEnd, field) {
  let i = objStart + 1;
  while (i < objEnd) {
    i = skipTrivia(src, i, objEnd);
    if (i >= objEnd || src[i] === '}') break;
    let keyEnd, key;
    if (src[i] === '"' || src[i] === "'") {
      keyEnd = scanStringEnd(src, i);
      key = src.slice(i + 1, keyEnd - 1);
    } else {
      let j = i;
      while (j < objEnd && /[A-Za-z0-9_$]/.test(src[j])) j++;
      keyEnd = j;
      key = src.slice(i, j);
    }
    let k = skipTrivia(src, keyEnd, objEnd);
    if (src[k] !== ':') { i = keyEnd + 1; continue; } // not a key/value pair
    const valStart = skipTrivia(src, k + 1, objEnd);
    if (key === field) return valStart;
    const e = scanValueEnd(src, valStart, objEnd);
    i = src[e] === ',' ? e + 1 : e;
  }
  return -1;
}
function findArrayElementRange(src, arrStart, index) {
  if (src[arrStart] !== '[') return null;
  const end = matchBracket(src, arrStart);
  let p = arrStart + 1;
  let count = 0;
  while (p < end - 1) {
    p = skipTrivia(src, p, end - 1);
    if (p >= end - 1 || src[p] === ']') break;
    const s = p;
    let e;
    if (src[p] === '"' || src[p] === "'") e = scanStringEnd(src, p);
    else if (src[p] === '{') e = matchBrace(src, p);
    else if (src[p] === '[') e = matchBracket(src, p);
    else e = scanValueEnd(src, p, end - 1);
    if (count === index) return [s, e];
    count++;
    p = src[e] === ',' ? e + 1 : e;
  }
  return null;
}

// Serialize a value into a single-quoted JS string literal (matches file style).
function toJsSingleQuoted(str) {
  return "'" + String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n') + "'";
}

// Apply one edit and return the new file text.
export function applyEdit(src, { idx, field, index, value }) {
  const arrStart = findArrayStart(src);
  const obj = findSlideObject(src, arrStart, idx);
  if (!obj) throw new Error(`slide index ${idx} not found`);
  const valStart = findPropertyValueStart(src, obj.start, obj.end, field);
  if (valStart < 0) throw new Error(`field "${field}" not found on slide ${idx}`);

  let range;
  if (index === undefined || index === null) {
    if (src[valStart] !== '"' && src[valStart] !== "'") {
      throw new Error(`field "${field}" is not an editable string literal`);
    }
    range = [valStart, scanStringEnd(src, valStart)];
  } else {
    range = findArrayElementRange(src, valStart, index);
    if (!range) throw new Error(`index ${index} not found in "${field}"`);
  }
  return src.slice(0, range[0]) + toJsSingleQuoted(value) + src.slice(range[1]);
}

// --- the Vite plugin --------------------------------------------------------
export function saveSlidesPlugin() {
  let slidesPath;
  let suppressReload = false;
  return {
    name: 'save-slides',
    apply: 'serve', // dev only — the built static site has no backend to write to
    configResolved(cfg) {
      slidesPath = path.resolve(cfg.root, 'src/data/slides.js');
    },
    handleHotUpdate(ctx) {
      // Swallow the HMR event for our own write so typing isn't interrupted by a
      // full reload (the DOM already shows the edit). Manual code edits still HMR.
      if (suppressReload && ctx.file === slidesPath) {
        suppressReload = false;
        return [];
      }
    },
    configureServer(server) {
      server.middlewares.use('/__save-slide', (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; return res.end(); }
        const chunks = [];
        req.on('data', (c) => chunks.push(c));
        req.on('end', () => {
          try {
            const edit = JSON.parse(Buffer.concat(chunks).toString('utf8'));
            const src = fs.readFileSync(slidesPath, 'utf8');
            const out = applyEdit(src, edit);
            if (out !== src) {
              suppressReload = true;
              fs.writeFileSync(slidesPath, out);
            }
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify({ ok: true }));
          } catch (e) {
            res.statusCode = 400;
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify({ ok: false, error: String((e && e.message) || e) }));
          }
        });
      });
    },
  };
}
