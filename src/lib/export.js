import html2canvas from 'html2canvas';
import { SLIDES } from '../data/slides.js';
import { pad } from '../templates/helpers.js';

// Oversampling factor for exports. The slide is a true 1080x1080; rendering (and
// writing out) at 2x yields a crisp 2160x2160 PNG. Bump to 3 for even sharper.
const EXPORT_SCALE = 2;

// Turn a same-origin image URL into a data URL so html2canvas can't taint the
// canvas. Cached. Under Vite (dev or built + served) assets are same-origin, so
// this succeeds; if it ever fails we fall back to useCORS below.
const _dataUrlCache = {};
async function toDataURL(url) {
  if (_dataUrlCache[url]) return _dataUrlCache[url];
  const res = await fetch(url);
  const blob = await res.blob();
  return (_dataUrlCache[url] = await new Promise((resolve) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.readAsDataURL(blob);
  }));
}

// Inline every external <img> and background-image inside a node into data URLs.
async function inlineAssets(root) {
  for (const im of root.querySelectorAll('img')) {
    if (im.src && !im.src.startsWith('data:')) {
      try { im.src = await toDataURL(im.src); } catch (e) { /* fall back to useCORS */ }
    }
  }
  for (const el of root.querySelectorAll('*')) {
    const bg = el.style && el.style.backgroundImage;
    if (bg && bg.indexOf('url(') !== -1 && bg.indexOf('data:') === -1) {
      const m = bg.match(/url\(["']?(.*?)["']?\)/);
      if (m && m[1]) {
        try { el.style.backgroundImage = 'url("' + (await toDataURL(m[1])) + '")'; } catch (e) { /* noop */ }
      }
    }
  }
}

// Clone the slide into a clean, off-screen, untransformed 1080x1080 box and
// capture THAT — so neither the preview scaling nor the cropped frame affect
// the output. Returns a Promise that resolves once the PNG has downloaded.
export async function exportSlide(idx) {
  const s = SLIDES[idx];
  const filename = s.file || 'stu-' + pad(idx + 1) + '.png';
  const original = document.getElementById('slide-' + (idx + 1));

  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, {
    position: 'fixed', top: '0', left: '-12000px', width: '1080px', height: '1080px',
    margin: '0', padding: '0', overflow: 'hidden',
  });

  const clone = original.cloneNode(true);
  Object.assign(clone.style, { transform: 'none', position: 'relative', top: '0', left: '0', margin: '0' });
  clone.querySelectorAll('.photo-swap-btn, input[type=file]').forEach((el) => el.remove());
  await inlineAssets(clone);

  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  try {
    const rendered = await html2canvas(clone, { scale: EXPORT_SCALE, useCORS: true, backgroundColor: '#0e2a1c' });
    document.body.removeChild(wrapper);

    // Normalize to an exact square at the oversampled resolution (source is already square).
    const size = 1080 * EXPORT_SCALE;
    const out = document.createElement('canvas');
    out.width = size;
    out.height = size;
    out.getContext('2d').drawImage(rendered, 0, 0, size, size);

    await new Promise((resolve) =>
      out.toBlob((blob) => {
        const link = document.createElement('a');
        link.download = filename;
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        resolve();
      }, 'image/png')
    );
  } catch (err) {
    if (wrapper.parentNode) document.body.removeChild(wrapper);
    alert('Export failed: ' + err.message + '\n\nRun the app with `npm run dev` (or `npm run preview`) so images load same-origin.');
    throw err;
  }
}

// Export every slide in order, stopping the batch on the first failure.
export async function exportAll() {
  for (let i = 0; i < SLIDES.length; i++) {
    try {
      await exportSlide(i);
    } catch (e) {
      return;
    }
    await new Promise((r) => setTimeout(r, 350));
  }
}
