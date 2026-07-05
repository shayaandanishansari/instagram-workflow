#!/usr/bin/env node
// Download a Google Drive file or folder (must be shared "Anyone with the
// link") straight into the repo — no manual download/upload round-trip.
//
// Usage:
//   npm run drive -- <drive-url> --project "Project Name"
//   npm run drive -- <drive-url> --out submissions/"Project Name"/images
//
// Needs GOOGLE_DRIVE_API_KEY in a .env file (see .env.example) or the
// environment. Get one free: console.cloud.google.com → APIs & Services →
// enable "Google Drive API" → Credentials → Create API key.

import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';

const API_BASE = 'https://www.googleapis.com/drive/v3/files';

const GOOGLE_EXPORT_MIME = {
  'application/vnd.google-apps.document': { mime: 'application/pdf', ext: '.pdf' },
  'application/vnd.google-apps.spreadsheet': {
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ext: '.xlsx',
  },
  'application/vnd.google-apps.presentation': {
    mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ext: '.pptx',
  },
  'application/vnd.google-apps.drawing': { mime: 'image/png', ext: '.png' },
};

async function loadDotEnv() {
  try {
    const text = await readFile(new URL('../.env', import.meta.url), 'utf8');
    for (const line of text.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (!(key in process.env)) process.env[key] = val;
    }
  } catch {
    // no .env file — fine, rely on the real environment
  }
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--out') args.out = argv[++i];
    else if (a === '--project') args.project = argv[++i];
    else args._.push(a);
  }
  return args;
}

function extractDriveId(url) {
  const patterns = [/\/file\/d\/([-\w]{10,})/, /\/folders\/([-\w]{10,})/, /[?&]id=([-\w]{10,})/];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  throw new Error(`Could not find a Drive file/folder id in: ${url}`);
}

function sanitizeName(name) {
  return name.replace(/[\\/:*?"<>|]/g, '_').trim();
}

async function driveFetch(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    if (res.status === 404) {
      throw new Error(
        `404 Not Found — the file/folder either doesn't exist or isn't shared "Anyone with the link".`
      );
    }
    if (res.status === 403) {
      throw new Error(
        `403 Forbidden — check the Drive API is enabled for your API key and the key has no restrictive referer/IP limits.\n${body}`
      );
    }
    throw new Error(`Drive API error ${res.status}: ${body}`);
  }
  return res;
}

async function listChildren(folderId, apiKey) {
  const files = [];
  let pageToken;
  do {
    const params = new URLSearchParams({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id, name, mimeType)',
      pageSize: '1000',
      key: apiKey,
    });
    if (pageToken) params.set('pageToken', pageToken);
    const res = await driveFetch(`${API_BASE}?${params}`);
    const data = await res.json();
    files.push(...(data.files || []));
    pageToken = data.nextPageToken;
  } while (pageToken);
  return files;
}

async function downloadFile(id, name, mimeType, destDir, apiKey) {
  let url;
  let filename = sanitizeName(name);

  if (mimeType.startsWith('application/vnd.google-apps.')) {
    const exp = GOOGLE_EXPORT_MIME[mimeType];
    if (!exp) {
      console.warn(`  skip "${name}" — unsupported Google type (${mimeType})`);
      return;
    }
    url = `${API_BASE}/${id}/export?mimeType=${encodeURIComponent(exp.mime)}&key=${apiKey}`;
    if (!filename.toLowerCase().endsWith(exp.ext)) filename += exp.ext;
  } else {
    url = `${API_BASE}/${id}?alt=media&key=${apiKey}`;
  }

  const res = await driveFetch(url);
  const buf = Buffer.from(await res.arrayBuffer());
  const dest = path.join(destDir, filename);
  await writeFile(dest, buf);
  console.log(`  saved ${dest}`);
}

async function downloadFolder(folderId, destDir, apiKey) {
  await mkdir(destDir, { recursive: true });
  const children = await listChildren(folderId, apiKey);
  console.log(`Folder has ${children.length} item(s) -> ${destDir}`);
  for (const child of children) {
    if (child.mimeType === 'application/vnd.google-apps.folder') {
      await downloadFolder(child.id, path.join(destDir, sanitizeName(child.name)), apiKey);
    } else {
      await downloadFile(child.id, child.name, child.mimeType, destDir, apiKey);
    }
  }
}

async function main() {
  await loadDotEnv();
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  const args = parseArgs(process.argv.slice(2));
  const url = args._[0];

  if (!url) {
    console.error(
      'Usage: npm run drive -- <drive-url> --project "Project Name"\n' +
        '   or: npm run drive -- <drive-url> --out some/dir'
    );
    process.exit(1);
  }
  if (!apiKey) {
    console.error(
      'Missing GOOGLE_DRIVE_API_KEY. Copy .env.example to .env and paste in your key\n' +
        '(console.cloud.google.com -> enable "Google Drive API" -> Credentials -> API key).'
    );
    process.exit(1);
  }

  const outDir = args.out || (args.project ? path.join('submissions', args.project, 'images') : null);
  if (!outDir) {
    console.error('Specify where to save: --project "Project Name" or --out <dir>');
    process.exit(1);
  }

  const id = extractDriveId(url);
  const meta = await driveFetch(
    `${API_BASE}/${id}?fields=id,name,mimeType&key=${apiKey}`
  ).then((r) => r.json());

  if (meta.mimeType === 'application/vnd.google-apps.folder') {
    await downloadFolder(id, outDir, apiKey);
  } else {
    await mkdir(outDir, { recursive: true });
    console.log(`Downloading "${meta.name}" -> ${outDir}`);
    await downloadFile(id, meta.name, meta.mimeType, outDir, apiKey);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
