// Pictures for the printable cheat sheets: run each turtle snippet's `example` in the playground
// and save what it draws, cropped, as dist/_pictures/<snippet id>.png; render each HTML snippet's
// `example` as a page (as the HTML playground's preview shows it: browser defaults, 320px wide) and
// save it as dist/_pictures/html/<snippet id>.png (HTML ids can repeat turtle ones, such as `comment`).
// Maths cards (snippets/maths.json) with a `board` get a picture of the maths board in that setup,
// saved as dist/_pictures/maths/maths-<card id>.png.
// Shared by the Reference page, the playground's Reference drawer and the cheat sheets.
// pictures.json: { id: { w, h, hash, div? } }; div is device pixels per printed pixel (default 5.2, turtle).
// Part of `npm run render` (after build-playground). Cached: a picture is redrawn only when its
// example, the playground it uses, or its own section of this file changed (pictures.json keeps the hashes).
// A section's hash covers its draw function, its viewport and the helpers it names in `base`, not the whole
// file, so changing how one kind of picture is drawn redraws only that kind. Bump SHARED after changing
// pictures(), open() or the browser setup, which every section uses. --force redraws all.
// --seed <url>: first download pictures whose hash matches the live site's pictures.json.
// --check: draw nothing; report how many pictures need drawing (pictures_stale=N to $GITHUB_OUTPUT).
// WP_NO_MAKECODE=1: skip the MakeCode sections (blocks and output) and keep the pictures already there. For builds
// where makecode.com cannot be reached, such as a sandbox.
import { chromium } from 'playwright-core';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, extname, resolve, dirname, relative } from 'node:path';

const OUT = resolve(process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : 'dist');
const FORCE = process.argv.includes('--force');
const CHECK = process.argv.includes('--check');
const SEED = process.argv.includes('--seed') ? process.argv[process.argv.indexOf('--seed') + 1].replace(/\/$/, '') : null;
const NO_MAKECODE = !!process.env.WP_NO_MAKECODE && process.env.WP_NO_MAKECODE !== '0';
// WP_DEADLINE=<unix seconds>: draw nothing new after this time. Pictures left over keep their old entry (so the next
// run draws them), and the run still ends normally, so the publish workflow can publish what is done.
const ONLY = process.env.WP_ONLY || '';
const DEADLINE = Number(process.env.WP_DEADLINE) || 0;
const outOfTime = () => DEADLINE > 0 && Date.now() / 1000 > DEADLINE;
let leftForNextRun = 0;
const failed = []; // pictures whose drawing threw: reported, skipped, and drawn again next run (never fails the run)
let stale = 0, seeded = 0;
const DIR = join(OUT, '_pictures');
mkdirSync(DIR, { recursive: true });

// Same slug rule as snippet ids everywhere else (lesson-core snippetId).
const { snippetId, makecodePackage, makecodeExtensions } = await import('./lesson-core.mjs');
const strip = (c) => c.replace(/[‹›]/g, '');

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.wasm': 'application/wasm', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg' };
let browser = null, server = null, port = 0;
async function open() {
  if (browser) return;
  server = createServer((req, res) => {
    const p = join(OUT, decodeURIComponent(req.url.split('?')[0]));
    const f = existsSync(p) && statSync(p).isDirectory() ? join(p, 'index.html') : p;
    if (!existsSync(f)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream', 'access-control-allow-origin': '*' }); res.end(readFileSync(f)); // as on GitHub Pages: sandboxed previews can fetch
  }).listen(0);
  port = server.address().port;
  const executablePath = process.env.CHROMIUM_PATH || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
  browser = await chromium.launch({ headless: true, executablePath, args: ['--no-sandbox'] });
}

const SHARED = 'pictures-v1';
// One kind of picture: jobs [{ id, code }], drawn by draw(page, job) -> { data, w, h, div? } | null.
// legacy: bases from before per-section hashing (whole-file hashes); --seed accepts live pictures that match one.
async function pictures({ name, dir, base, jobs, viewport, draw, legacy = [] }) {
  if (ONLY && !ONLY.split(',').some((o) => name.startsWith(o))) return;   // WP_ONLY=p5: only the sections whose name starts so (for testing one kind)
  mkdirSync(dir, { recursive: true });
  const manifestPath = join(dir, 'pictures.json');
  const old = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};
  const key = createHash('sha1').update(SHARED).update(base).update(JSON.stringify(viewport)).update(String(draw)).digest('hex');
  const hashOf = (j) => createHash('sha1').update(key).update(j.code).digest('hex').slice(0, 16);
  const legacyOf = (b, j) => createHash('sha1').update(b).update(j.code).digest('hex').slice(0, 16);
  let todo = jobs.filter((j) => FORCE || old[j.id]?.hash !== hashOf(j) || !existsSync(join(dir, `${j.id}.png`)));
  const manifest = {};
  for (const j of jobs) if (!todo.includes(j) && old[j.id]) manifest[j.id] = old[j.id];
  // Same hash = same picture: take it from the live site instead of drawing it.
  if (SEED && todo.length && !FORCE) {
    const url = `${SEED}/${relative(OUT, dir).split('\\').join('/')}`;
    const live = await fetch(`${url}/pictures.json`, { cache: 'no-store' }).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
    // 16 downloads at a time (one at a time took about a minute for the whole set).
    const got = new Array(todo.length).fill(false);
    let next = 0;
    const worker = async () => {
      while (next < todo.length) {
        const n = next++, j = todo[n];
        const h = live[j.id]?.hash;
        got[n] = !!h && (h === hashOf(j) || legacy.some((b) => h === legacyOf(b, j))) && await fetch(`${url}/${j.id}.png`).then(async (r) => {
          if (!r.ok) return false;
          mkdirSync(dirname(join(dir, `${j.id}.png`)), { recursive: true });
          writeFileSync(join(dir, `${j.id}.png`), Buffer.from(await r.arrayBuffer()));
          return true;
        }).catch(() => false);
      }
    };
    await Promise.all(Array.from({ length: Math.min(16, todo.length) }, worker));
    const left = [];
    todo.forEach((j, n) => { if (got[n]) { manifest[j.id] = { ...live[j.id], hash: hashOf(j) }; seeded++; } else left.push(j); });
    todo = left;
  }
  stale += todo.length;
  if (CHECK) {
    for (const j of todo) if (old[j.id]) manifest[j.id] = old[j.id]; // keep entries; the real run decides
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 1) + '\n');
    console.log(`Pictures (${name}): ${jobs.length} examples, ${todo.length} to draw.`);
    return;
  }
  let skipped = 0;
  if (todo.length && !outOfTime()) {
    await open();
    let page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
    for (const j of todo) {
      if (outOfTime()) { leftForNextRun++; skipped++; if (old[j.id]) manifest[j.id] = old[j.id]; continue; }
      // One picture that cannot be drawn (a board that never starts, a timeout) is reported and skipped, so it does
      // not stop the others or the publish. It keeps its old picture if it had one (with its old record, so the
      // next run tries again); otherwise the page shows none.
      let png;
      try { png = await draw(page, j); }
      catch (e) {
        failed.push(`${name} ${j.id}`);
        console.error(`✗ ${name} ${j.id}: ${String(e.message || e).split('\n')[0]}`);
        if (old[j.id] && existsSync(join(dir, `${j.id}.png`))) manifest[j.id] = old[j.id];
        await page.close().catch(() => {});
        page = await browser.newPage({ viewport, deviceScaleFactor: 2 }); // a fresh page: the old one may be stuck
        continue;
      }
      if (!png) { console.log(`- ${name} ${j.id}: draws nothing, no picture`); continue; }
      mkdirSync(dirname(join(dir, `${j.id}.png`)), { recursive: true }); // expected pictures sit in a folder per lesson
      writeFileSync(join(dir, `${j.id}.png`), Buffer.from(png.data.split(',')[1], 'base64'));
      manifest[j.id] = { hash: hashOf(j), w: png.w, h: png.h, ...(png.div ? { div: png.div } : {}) };
      console.log(`✓ ${name} ${j.id} (${png.w}×${png.h})`);
    }
    await page.close();
  } else for (const j of todo) { leftForNextRun++; skipped++; if (old[j.id]) manifest[j.id] = old[j.id]; }
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 1) + '\n');
  console.log(`Pictures (${name}): ${jobs.length} examples, ${todo.length - skipped} drawn, ${jobs.length - todo.length} cached${skipped ? `, ${skipped} left for the next run` : ''}.`);
}

// HTML pages are drawn as the playground's preview shows them: pictures (src="trophy.svg") come from its media folder.
const withMedia = (code) => {
  const base = `<base href="http://localhost:${port}/_playground-html/media/">`;
  // Always standards mode, as in the playground preview (a page with no <!DOCTYPE> would otherwise render in quirks mode).
  const dt = code.match(/^\s*<!doctype[^>]*>/i);
  return dt ? dt[0] + base + code.slice(dt[0].length) : '<!DOCTYPE html>' + base + code;
};
// Load a page from the local server's address (not setContent, which writes it with document.write, so Chromium
// may block its <script src> lines: a Vue example or expected page then drew its {{ }} unfilled).
async function showPage(page, html) {
  const url = `http://localhost:${port}/__wp-picture.html`;
  await page.unroute(url).catch(() => {});
  await page.route(url, (r) => r.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: html }));
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(100);
}
const examples = (file, wrap) => JSON.parse(readFileSync(file, 'utf8')).groups.flatMap((g) => g.items.filter((i) => i.example).map((i) => ({ id: snippetId(i.label), code: wrap(strip(i.example)) })));
const hashDir = (...parts) => {
  const h = createHash('sha1');
  const walk = (d) => { for (const f of readdirSync(d).sort()) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else h.update(p).update(readFileSync(p)); } };
  for (const p of parts) if (typeof p === 'string' && existsSync(p) && statSync(p).isDirectory()) walk(p); else h.update(String(p));
  return h.digest('hex');
};

// Whole-file bases from before per-section hashing (render-pictures.mjs at 10 Oct 2026, before the Arcade click), so the
// first deploy after the change takes matching pictures from the live site instead of redrawing all of them. Not
// for makecode-out, whose drawing changed. Safe to delete once that deploy is live.
const LEGACY = { "turtle": "a824e0c062da79992b1d4431300e7f2d5b409a20", "html": "3b8d6f746eb35df476b1fc900e32c86505705118", "expected": "74855c794bba4d543a6fd7c07532e3a9bae43ed5", "shown": "a51285e8096deadcc27a923ee90b012caac8d8e0", "maths": "530d38ab199bb6c523956dfb6517e901d676a050", "board": "88d33d3baaf51f846e3c6dba82b2d40ecb42ff2c", "makecode": "df634266c95e2188f29077f7547a92d357a705d6" };

// ---- turtle: run the example in the playground, crop to what was drawn.
await pictures({
  name: 'turtle', dir: DIR, viewport: { width: 900, height: 700 },
  base: hashDir('playground', 'v2'), legacy: [LEGACY.turtle],
  jobs: examples('snippets/turtle.json', (c) => `from turtle import *\n\n${c}`),
  async draw(page, j) {
    await page.goto(`http://localhost:${port}/_playground/?view=output&speed=10&autorun=1&shape=classic&code=${encodeURIComponent(j.code)}`);
    await page.waitForFunction(() => ['done', 'error', 'stopped'].includes(window.__playground?.status), null, { timeout: 20000 });
    const st = await page.evaluate(() => window.__playground);
    if (st.status === 'error') throw new Error(`${j.id}: the example failed: ${st.error}`);
    // Crop to what was drawn (anything unlike the corner pixel), with a margin.
    return page.evaluate(() => {
      const c = document.getElementById('canvas'), x = c.getContext('2d');
      const { width: w, height: hh } = c, px = x.getImageData(0, 0, w, hh).data;
      const bg = px.slice(0, 4);
      let x0 = w, y0 = hh, x1 = 0, y1 = 0;
      for (let y = 0; y < hh; y++) for (let i = 0; i < w; i++) {
        const k = (y * w + i) * 4;
        const r = px[k], g = px[k + 1], b = px[k + 2];
        if (Math.abs(r - bg[0]) + Math.abs(g - bg[1]) + Math.abs(b - bg[2]) <= 30) continue;
        if (Math.max(r, g, b) - Math.min(r, g, b) < 12 && r > 150 && r < 240) continue; // the grey axes
        if (i < x0) x0 = i; if (i > x1) x1 = i; if (y < y0) y0 = y; if (y > y1) y1 = y;
      }
      if (x1 < x0) return null;
      // Always include the start (the centre), so the picture shows where the turtle began.
      const cx = Math.round(w / 2), cy = Math.round(hh / 2);
      x0 = Math.min(x0, cx); x1 = Math.max(x1, cx); y0 = Math.min(y0, cy); y1 = Math.max(y1, cy);
      const m = Math.round(Math.min(w, hh) * 0.04);
      x0 = Math.max(0, x0 - m); y0 = Math.max(0, y0 - m); x1 = Math.min(w - 1, x1 + m); y1 = Math.min(hh - 1, y1 + m);
      const o = document.createElement('canvas'); o.width = x1 - x0 + 1; o.height = y1 - y0 + 1;
      o.getContext('2d').drawImage(c, x0, y0, o.width, o.height, 0, 0, o.width, o.height);
      return { data: o.toDataURL('image/png'), w: o.width, h: o.height };
    });
  },
});

// ---- HTML: the example as a page, as the HTML playground's preview shows it (browser defaults),
// 320px wide; cropped to what is on it (text, boxes with a background or border, controls), with a margin.
await pictures({
  name: 'html', dir: join(DIR, 'html'), viewport: { width: 320, height: 600 },
  base: hashDir('media', String(withMedia), String(showPage), 'html-v1'), legacy: [LEGACY.html],
  jobs: examples('snippets/html.json', (c) => c),
  async draw(page, j) {
    await showPage(page, withMedia(j.code));
    const box = await page.evaluate(() => {
      let r = 0, b = 0;
      const add = (q) => { if (q.width > 0 && q.height > 0) { r = Math.max(r, q.right); b = Math.max(b, q.bottom); } };
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let n; (n = w.nextNode());) if (n.textContent.trim()) { const g = document.createRange(); g.selectNodeContents(n); [...g.getClientRects()].forEach(add); }
      for (const el of document.body.querySelectorAll('*')) {
        const cs = getComputedStyle(el), q = el.getBoundingClientRect();
        const paints = /^(IMG|INPUT|BUTTON|SELECT|TEXTAREA|HR|TABLE|TD|TH|SVG|CANVAS)$/i.test(el.tagName)
          || !/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor)
          || ['Top', 'Right', 'Bottom', 'Left'].some((s) => parseFloat(cs[`border${s}Width`]) > 0 && cs[`border${s}Style`] !== 'none');
        if (paints) add(q);
        if (el.tagName === 'LI') add({ ...q.toJSON(), right: q.left + 1 }); // keep its bullet or number
      }
      return { r: Math.ceil(r), b: Math.ceil(b) };
    });
    if (!box.r || !box.b) return null;
    const m = 8, width = Math.min(320, box.r + m), height = Math.min(600, box.b + m);
    const buf = await page.screenshot({ clip: { x: 0, y: 0, width, height } });
    return { data: `data:image/png;base64,${buf.toString('base64')}`, w: width * 2, h: height * 2, div: 3 };
  },
});

// ---- Expected results: the page a solution region makes, as a picture (no code), for "Show the expected result"
// in HTML lessons (expected: on a step or task). 520px wide like a lesson's preview, cropped to the page's height.
const { loadLessons, getSnippet, expectedItems } = await import('./lesson.mjs');
await pictures({
  name: 'expected', dir: join(DIR, 'expected'), viewport: { width: 520, height: 900 },
  base: hashDir('media', String(withMedia), String(showPage), 'expected-v1'), legacy: [LEGACY.expected],
  jobs: loadLessons().filter((l) => l.language !== 'javascript').flatMap((l) => expectedItems(l).map((e) => ({ id: `${l.slug}/${e.key}`, code: getSnippet(l.dir, e.ref) }))),
  async draw(page, j) {
    await showPage(page, withMedia(j.code));
    const bottom = await page.evaluate(() => {
      let b = 0;
      for (const el of document.body.querySelectorAll('*')) { const q = el.getBoundingClientRect(); if (q.height > 0) b = Math.max(b, q.bottom + parseFloat(getComputedStyle(el).marginBottom || 0)); }
      return Math.ceil(b);
    });
    if (!bottom) return null;
    const height = Math.min(900, bottom + 8);
    const buf = await page.screenshot({ clip: { x: 0, y: 0, width: 520, height } });
    return { data: `data:image/png;base64,${buf.toString('base64')}`, w: 1040, h: height * 2, div: 2 };
  },
});

// ---- "What this code makes": picture: on steps and tasks, and explainPicture, drawn by the HTML playground itself
// (so the Boxes view looks exactly as students see it), cropped to the page's content.
const { pictureItems, usesBoardPictures, pictureBoard } = await import('./lesson.mjs');
await pictures({
  name: 'shown', dir: join(DIR, 'shown'), viewport: { width: 1100, height: 1400 },
  base: hashDir('media', 'playground-html', 'shown-v1'), legacy: [LEGACY.shown],
  // The view settings are part of the cached code, so changing boxes or inspect redraws the picture.
  jobs: loadLessons().filter((l) => l.language === 'html').flatMap((l) => pictureItems(l).map((e) => ({ id: `${l.slug}/${e.key}`, view: e.inspect ? `inspect=${encodeURIComponent(e.inspect)}&` : e.boxes ? 'boxes=1&' : '', src: getSnippet(l.dir, e.ref) }))).map((j) => ({ ...j, code: `<!-- view: ${j.view} -->\n${j.src}` })),
  async draw(page, j) {
    await page.goto(`http://localhost:${port}/_playground-html/index.html?${j.view}code=${encodeURIComponent(j.src)}`);
    await page.waitForFunction(() => window.__playground?.updates > 0);
    await page.waitForTimeout(j.view.startsWith('inspect') ? 800 : 500);
    const el = await page.$('#preview'), frame = await el.contentFrame(), box = await el.boundingBox();
    const ext = await frame.evaluate(() => {
      let r = 0, b = 0;
      for (const e of document.querySelectorAll('body *, [data-wp-inspect] *')) { const q = e.getBoundingClientRect(); if (q.width && q.height) { r = Math.max(r, q.right); b = Math.max(b, q.bottom); } }
      return { r: Math.ceil(r), b: Math.ceil(b) };
    });
    if (!ext.b) return null;
    const width = Math.min(box.width - 2, ext.r + 14), height = Math.min(box.height - 2, ext.b + 14);
    const buf = await page.screenshot({ clip: { x: box.x + 1, y: box.y + 1, width, height } });
    return { data: `data:image/png;base64,${buf.toString('base64')}`, w: Math.round(width * 2), h: Math.round(height * 2), div: 2 };
  },
});

// ---- Open projects (tools/projects.mjs): a brief's example as its picture ("one way it could look"), never its code.
// Python runs in the turtle playground (a program that waits for clicks or keys is pictured after 4 seconds); HTML and
// DOM examples are pages, like expected results. MakeCode examples are drawn in makecode-out (projects/<course>/<id>). _pictures/projects/<course>/<id>[-<part>].png.
const { loadProjects } = await import('./projects.mjs');
await pictures({
  name: 'projects', dir: join(DIR, 'projects'), viewport: { width: 900, height: 700 },
  base: hashDir('playground', 'media', String(withMedia), String(showPage), 'projects-v1'),
  jobs: loadProjects('content', () => undefined).flatMap((s) => s.projects.flatMap((p) => p.parts.map((x, i) => ({ x, i, p }))
    .filter(({ x }) => x.exampleCode && ['python', 'html'].includes(x.language))
    .map(({ x, i, p }) => ({ id: `${s.course}/${p.id}${p.parts.length > 1 ? `-${i + 1}` : ''}`, lang: x.language, code: `<!-- ${x.language} -->\n${x.exampleCode}`, src: x.exampleCode })))),
  async draw(page, j) {
    if (j.lang === 'html') {
      await page.setViewportSize({ width: 520, height: 700 });
      await showPage(page, withMedia(j.src));
      await page.waitForTimeout(400);
      const bottom = await page.evaluate(() => { let b = 0; for (const el of document.body.querySelectorAll('*')) { const q = el.getBoundingClientRect(); if (q.height > 0) b = Math.max(b, q.bottom); } return Math.ceil(b); });
      if (!bottom) return null;
      const height = Math.min(700, bottom + 12);
      const buf = await page.screenshot({ clip: { x: 0, y: 0, width: 520, height } });
      return { data: `data:image/png;base64,${buf.toString('base64')}`, w: 1040, h: height * 2, div: 2 };
    }
    await page.setViewportSize({ width: 900, height: 700 });
    await page.goto(`http://localhost:${port}/_playground/?view=output&speed=10&autorun=1&shape=classic&code=${encodeURIComponent(j.src)}`);
    await page.waitForFunction(() => ['done', 'error', 'stopped'].includes(window.__playground?.status), null, { timeout: 4000 }).catch(() => {});
    const st = await page.evaluate(() => window.__playground);
    if (st?.status === 'error') throw new Error(`${j.id}: the example failed: ${st.error}`);
    const png = await page.evaluate(() => {
      const c = document.getElementById('canvas'), x = c.getContext('2d');
      const { width: w, height: hh } = c, px = x.getImageData(0, 0, w, hh).data, bg = px.slice(0, 4);
      let x0 = w, y0 = hh, x1 = 0, y1 = 0;
      for (let y = 0; y < hh; y++) for (let i = 0; i < w; i++) {
        const k = (y * w + i) * 4, r = px[k], g = px[k + 1], b = px[k + 2];
        if (Math.abs(r - bg[0]) + Math.abs(g - bg[1]) + Math.abs(b - bg[2]) <= 30) continue;
        if (Math.max(r, g, b) - Math.min(r, g, b) < 12 && r > 150 && r < 240) continue;
        if (i < x0) x0 = i; if (i > x1) x1 = i; if (y < y0) y0 = y; if (y > y1) y1 = y;
      }
      if (x1 < x0) return null;
      const m = Math.round(Math.min(w, hh) * 0.03);
      x0 = Math.max(0, x0 - m); y0 = Math.max(0, y0 - m); x1 = Math.min(w - 1, x1 + m); y1 = Math.min(hh - 1, y1 + m);
      const o = document.createElement('canvas'); o.width = x1 - x0 + 1; o.height = y1 - y0 + 1;
      const ox = o.getContext('2d'); ox.fillStyle = `rgb(${bg[0]},${bg[1]},${bg[2]})`; ox.fillRect(0, 0, o.width, o.height);
      ox.drawImage(c, x0, y0, o.width, o.height, 0, 0, o.width, o.height);
      return { data: o.toDataURL('image/png'), w: o.width, h: o.height };
    });
    return png && { ...png, div: 2 };
  },
});

// ---- The board: a setup drawn as students see it, without its controls (the scale, the machine, or a graph's
// axes and lines), cropped to what is drawn (anything unlike the board's background), ignoring the board's border.
async function drawBoard(page, j) {
  await page.goto(`http://localhost:${port}/_playground-board/index.html?id=picture&fresh=1&code=${encodeURIComponent(j.code)}`);
  // Any board content counts as started (#board > *): widgets built from plain HTML (decode, pixels) have no svg.
  // What to photograph: the machine's row, a growing pattern's figure, a formula (with its shape and working), or the board.
  const sel = /widget:\s*formula/.test(j.code) ? '.rulebox' : /widget:\s*machine/.test(j.code) ? '#mrow' : /widget:\s*pattern/.test(j.code) ? '.patfig' : /widget:\s*rule/.test(j.code) ? '#gpanel' : '#board';
  await page.waitForSelector({ '#mrow': '#mrow .mbox', '.patfig': '.patsvg line, .patsvg circle', '#gpanel': '.rulebox', '.rulebox': '.rulebox .rulework', '#board': '#board svg, #board canvas.wpcv, #board > *' }[sel], { timeout: 20000, state: 'attached' });
  await page.waitForTimeout(400);
  if (await page.locator('#error').isVisible()) throw new Error(`${j.id}: the board did not start: ${await page.locator('#error').innerText()}`);
  const shot = (await page.locator(sel).screenshot()).toString('base64');
  const png = await page.evaluate(async (b64) => {
    const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
    const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    const { width: w, height: hh } = c, px = x.getImageData(0, 0, w, hh).data, edge = 8;
    const k0 = (edge * w + edge) * 4, bg = [px[k0], px[k0 + 1], px[k0 + 2]];
    let x0 = w, y0 = hh, x1 = 0, y1 = 0;
    for (let y = edge; y < hh - edge; y++) for (let i = edge; i < w - edge; i++) {
      const k = (y * w + i) * 4;
      if (Math.abs(px[k] - bg[0]) + Math.abs(px[k + 1] - bg[1]) + Math.abs(px[k + 2] - bg[2]) <= 30) continue;
      if (i < x0) x0 = i; if (i > x1) x1 = i; if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
    if (x1 < x0) return null;
    const m = 12; x0 = Math.max(0, x0 - m); y0 = Math.max(0, y0 - m); x1 = Math.min(w - 1, x1 + m); y1 = Math.min(hh - 1, y1 + m);
    const o = document.createElement('canvas'); o.width = x1 - x0 + 1; o.height = y1 - y0 + 1;
    o.getContext('2d').drawImage(c, x0, y0, o.width, o.height, 0, 0, o.width, o.height);
    return { data: o.toDataURL('image/png'), w: o.width, h: o.height };
  }, shot);
  if (!png) throw new Error(`${j.id}: the board drew nothing`);
  return png;
}

// Maths cards with a `board` (the Reference page and cheat sheets), from every snippets/maths*.json:
// dist/_pictures/maths/maths-<card id>.png.
const mathsCardFiles = readdirSync('snippets').filter((f) => /^maths(-[\w-]+)?\.json$/.test(f)).sort();
if (mathsCardFiles.length) await pictures({
  name: 'maths', dir: join(DIR, 'maths'), viewport: { width: 760, height: 430 },
  base: hashDir('playground-board', String(drawBoard), 'maths-v1'), legacy: [LEGACY.maths],
  jobs: mathsCardFiles.flatMap((f) => JSON.parse(readFileSync(join('snippets', f), 'utf8')).groups.flatMap((g) => g.items.filter((i) => i.board).map((i) => ({ id: `maths-${snippetId(i.label)}`, code: i.board })))),
  async draw(page, j) { return { ...(await drawBoard(page, j)), div: 4 }; },
});

// picture: on steps and tasks, and explainPicture, in lessons that use the board (maths, and science on the shared board): the region is a board
// setup. dist/_pictures/board/<lesson>/<key>.png.
await pictures({
  name: 'board', dir: join(DIR, 'board'), viewport: { width: 680, height: 440 },
  base: hashDir('playground-board', String(drawBoard), 'board-v1'), legacy: [LEGACY.board],
  jobs: loadLessons().filter((l) => usesBoardPictures(l) && pictureBoard(l) === 'board').flatMap((l) => pictureItems(l).map((e) => ({ id: `${l.slug}/${e.key}`, code: getSnippet(l.dir, e.ref) }))),
  async draw(page, j) { return { ...(await drawBoard(page, j)), div: 2 }; },
});

// ---- The science board (playground-science): explainPicture and picture: in science lessons on that board. Particles
// move, so the picture is a moment after the widget has run for a short while (each widget starts from a fixed seed).
// Cropped like the board's pictures. dist/_pictures/science/<lesson>/<key>.png.
async function drawScience(page, j) {
  await page.goto(`http://localhost:${port}/_playground-science/index.html?id=picture&code=${encodeURIComponent(j.code)}`);
  await page.waitForSelector('#board svg', { timeout: 20000, state: 'attached' });
  await page.waitForTimeout(1800);
  if (await page.locator('#error').isVisible()) throw new Error(`${j.id}: the science board did not start: ${await page.locator('#error').innerText()}`);
  const shot = (await page.locator('#board').screenshot()).toString('base64');
  const png = await page.evaluate(async (b64) => {
    const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
    const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    const { width: w, height: hh } = c, px = x.getImageData(0, 0, w, hh).data, edge = 8;
    const k0 = (edge * w + edge) * 4, bg = [px[k0], px[k0 + 1], px[k0 + 2]];
    let x0 = w, y0 = hh, x1 = 0, y1 = 0;
    for (let y = edge; y < hh - edge; y++) for (let i = edge; i < w - edge; i++) {
      const k = (y * w + i) * 4;
      if (Math.abs(px[k] - bg[0]) + Math.abs(px[k + 1] - bg[1]) + Math.abs(px[k + 2] - bg[2]) <= 30) continue;
      if (i < x0) x0 = i; if (i > x1) x1 = i; if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
    if (x1 < x0) return null;
    const m = 12; x0 = Math.max(0, x0 - m); y0 = Math.max(0, y0 - m); x1 = Math.min(w - 1, x1 + m); y1 = Math.min(hh - 1, y1 + m);
    const o = document.createElement('canvas'); o.width = x1 - x0 + 1; o.height = y1 - y0 + 1;
    o.getContext('2d').drawImage(c, x0, y0, o.width, o.height, 0, 0, o.width, o.height);
    return { data: o.toDataURL('image/png'), w: o.width, h: o.height };
  }, shot);
  if (!png) throw new Error(`${j.id}: the science board drew nothing`);
  return png;
}
await pictures({
  name: 'science', dir: join(DIR, 'science'), viewport: { width: 680, height: 440 },
  base: hashDir('playground-science', String(drawScience), 'science-v1'),
  jobs: loadLessons().filter((l) => usesBoardPictures(l) && pictureBoard(l) === 'science').flatMap((l) => pictureItems(l).map((e) => ({ id: `${l.slug}/${e.key}`, code: getSnippet(l.dir, e.ref) }))),
  async draw(page, j) { return { ...(await drawScience(page, j)), div: 2 }; },
});

// ---- p5.js: what a sketch draws, from the p5 playground itself (cropped to the canvas). Two kinds, each with its own
// folder: the `example` of each snippets/p5.json card (for the Reference and cheat sheets), and a p5 lesson's picture:,
// explainPicture and expected: (key `<slug>/<key>`, expected ones `<slug>/exp-<key>`). A sketch that animates is
// captured after a short wait; one that uses random() differs each time it is drawn, then stays cached.
const { pictureItems: p5PictureItems, expectedItems: p5ExpectedItems } = await import('./lesson.mjs');
const p5Draw = async (page, j) => {
  await page.goto(`http://localhost:${port}/_playground-p5/index.html?code=${encodeURIComponent(j.code)}`);
  await page.click('#run');
  await page.waitForFunction(() => ['done', 'error'].includes(window.__playground?.status), null, { timeout: 15000 });
  if (await page.evaluate(() => window.__playground.status) === 'error') return null;
  await page.waitForTimeout(900);
  const canvas = page.frameLocator('#preview').locator('canvas').first();
  if (!(await canvas.count())) return null;
  const box = await canvas.boundingBox();
  const buf = await page.screenshot({ clip: { x: box.x, y: box.y, width: box.width, height: box.height } });
  return { data: `data:image/png;base64,${buf.toString('base64')}`, w: Math.round(box.width * 2), h: Math.round(box.height * 2), div: 2 };
};
const p5Lessons = loadLessons().filter((l) => l.language === 'javascript');
await pictures({
  name: 'p5', dir: join(DIR, 'p5'), viewport: { width: 1000, height: 700 },
  base: hashDir('playground-p5', 'vendor/p5', 'p5-v1'),
  jobs: examples(resolve('snippets', 'p5.json'), (c) => c),
  draw: p5Draw,
});
await pictures({
  name: 'p5shown', dir: join(DIR, 'p5shown'), viewport: { width: 1000, height: 700 },
  base: hashDir('playground-p5', 'vendor/p5', 'p5shown-v1'),
  jobs: p5Lessons.flatMap((l) => [
    ...p5PictureItems(l).map((e) => ({ id: `${l.slug}/${e.key}`, code: getSnippet(l.dir, e.ref) })),
    ...p5ExpectedItems(l).map((e) => ({ id: `${l.slug}/exp-${e.key}`, code: getSnippet(l.dir, e.ref) })),
  ]),
  draw: p5Draw,
});

// ---- microStudio: what each snippets/microstudio.json example draws (Reference and cheat sheets), from the play-only
// player in _playground-microstudio, cropped to the game's canvas after a short wait. Own folder: _pictures/microstudio.
await pictures({
  name: 'microstudio', dir: join(DIR, 'microstudio'), viewport: { width: 320, height: 200 },
  base: hashDir('playground-microstudio', 'vendor/microstudio', 'microstudio-v1'),
  jobs: examples(resolve('snippets', 'microstudio.json'), (c) => c),
  async draw(page, j) {
    await page.goto(`http://localhost:${port}/_playground-microstudio/index.html?hint=0&code=${encodeURIComponent(j.code)}`);
    await page.waitForFunction(() => window.player?.runtime?.started || window.__gameError, null, { timeout: 30000 });
    await page.waitForTimeout(800);
    if (await page.evaluate(() => window.__gameError)) return null;
    const canvas = page.locator('canvas').first();
    if (!(await canvas.count())) return null;
    const box = await canvas.boundingBox();
    const buf = await page.screenshot({ clip: { x: box.x, y: box.y, width: box.width, height: box.height } });
    return { data: `data:image/png;base64,${buf.toString('base64')}`, w: Math.round(box.width * 2), h: Math.round(box.height * 2), div: 2 };
  },
});

// ---- MakeCode blocks: each snippets/microbit.json and snippets/arcade.json block (for the cheat sheets and Reference) and every program a
// MakeCode lesson shows (decks, worksheets, guides, explainPicture), drawn by MakeCode's own renderer through
// _playground-makecode/render.html. Needs makecode.microbit.org: offline, nothing is drawn and the pages keep the
// code as text. ?render= in MAKECODE_RENDER points at another renderer (tests only).
if (NO_MAKECODE) console.log('Pictures (makecode, makecode-out): skipped (WP_NO_MAKECODE), existing pictures kept.');
else {
  const { blocksId, makecodePrograms } = await import('./teach.mjs');
  // Each job names its editor (target): Arcade blocks are drawn by Arcade's renderer, micro:bit ones by micro:bit's.
  const snipJobs = (file, target, prefix, pkg = '') => (existsSync(`snippets/${file}.json`) ? JSON.parse(readFileSync(`snippets/${file}.json`, 'utf8')).groups.flatMap((g) => g.items.map((i) => ({ id: prefix + snippetId(i.label), code: strip(i.code), target, pkg }))) : []);
  // Robot blocks need the robot extension in the renderer; their labels differ from micro:bit ones, so they share its folder.
  const mkSnips = [...snipJobs('microbit', 'microbit', ''), ...snipJobs('robot', 'microbit', '', makecodePackage({ extensions: ['robot'] })), ...snipJobs('arcade', 'arcade', 'arcade/')];
  const targetOf = (l) => l.steps.map((s) => s.config.try?.playground).find((k) => k === 'microbit' || k === 'arcade') || 'microbit';
  const mkCode = loadLessons().filter((l) => l.language === 'makecode').flatMap((l) => makecodePrograms(l, (ref) => getSnippet(l.dir, ref)).map((code) => ({ id: blocksId(code), code, target: targetOf(l), pkg: makecodePackage(l) })));
  const seen = new Set();
  const down = new Set();
  let loaded = '';
  await pictures({
    name: 'makecode', dir: join(DIR, 'makecode'), viewport: { width: 1200, height: 1600 },
    base: hashDir('makecode-v1'), legacy: [LEGACY.makecode],
    jobs: [...mkSnips, ...mkCode].filter((j) => !seen.has(j.id) && seen.add(j.id)).sort((a, b) => a.target.localeCompare(b.target)),
    async draw(page, j) {
      if (down.has(j.target)) return null;
      if (loaded !== j.target) {
        const q = new URLSearchParams({ target: j.target });
        if (process.env.MAKECODE_RENDER) q.set('render', process.env.MAKECODE_RENDER);
        await page.goto(`http://localhost:${port}/_playground-makecode/render.html?${q}`);
        const ok = await page.evaluate(() => Promise.race([window.wpReady, new Promise((r) => setTimeout(() => r(false), 30000))]));
        if (!ok) { down.add(j.target); console.log(`- makecode: the MakeCode ${j.target} renderer cannot be reached, so no blocks pictures for it (pages show code as text)`); return null; }
        loaded = j.target;
      }
      const size = await page.evaluate(([code, pkg]) => window.wpRender(code, pkg), [j.code, j.pkg || '']);
      if (!size) return null;
      const buf = await (await page.$('#out')).screenshot();
      return { data: `data:image/png;base64,${buf.toString('base64')}`, w: size.w * 2, h: size.h * 2, div: 2 };
    },
  });
}

// ---- MakeCode output: what a program makes, drawn by MakeCode's own simulator. For `picture:` on steps and tasks and
// for explainPicture in MakeCode lessons, the program is loaded into the embedded editor (_playground-makecode in
// picture mode, ?sim=1), MakeCode runs it, and the simulator's screen is screenshotted: the Arcade game screen or the
// micro:bit board, after WAIT ms. Saved as _pictures/makecode-out/<lesson slug>/<key>.png. Needs makecode.com
// (offline, nothing is drawn and pages show the blocks only). MAKECODE_EDITOR points the editor at a mock (tests only).
if (!NO_MAKECODE) {
  const { pictureItems } = await import('./lesson.mjs');
  const targetOf = (l) => l.steps.map((s) => s.config.try?.playground).find((k) => k === 'microbit' || k === 'arcade') || 'microbit';
  const WAIT = { arcade: 2500, microbit: 3000 };
  const down = new Set(), drew = new Set(), failures = [];
  await pictures({
    name: 'makecode-out', dir: join(DIR, 'makecode-out'), viewport: { width: 1280, height: 900 },
    base: hashDir('playground-makecode', 'makecode-out-v1'),
    jobs: loadLessons().filter((l) => l.language === 'makecode' && !makecodeExtensions(l).some((x) => x.noSimPicture)).flatMap((l) => pictureItems(l).map((e) => {
      const target = targetOf(l);
      const pkg = makecodePackage(l);
      return { id: `${l.slug}/${e.key}`, target, pkg, src: getSnippet(l.dir, e.ref), code: `// ${target}${pkg ? ` ${pkg}` : ''}\n${getSnippet(l.dir, e.ref)}` };
    })).concat(
      // Open projects (tools/projects.mjs): a MakeCode brief's example, as its picture (projects/<course>/<id>[-<part>].png).
      (await import('./projects.mjs')).loadProjects('content', () => undefined).flatMap((st) => st.projects.flatMap((p) => p.parts.map((x, i) => ({ x, i, p }))
        .filter(({ x }) => x.exampleCode && x.language === 'makecode')
        .map(({ x, i, p }) => ({ id: `projects/${st.course}/${p.id}${p.parts.length > 1 ? `-${i + 1}` : ''}`, target: x.playground, pkg: '', src: x.exampleCode, code: `// ${x.playground}\n${x.exampleCode}` })))),
    ),
    async draw(page, j) {
      if (down.has(j.target)) return null;
      const q = new URLSearchParams({ target: j.target, sim: '1', code: j.src });
      if (j.pkg) q.set('pkg', j.pkg);
      const mock = process.env.MAKECODE_EDITOR;
      if (mock) q.set('editor', mock.startsWith('/') ? `http://localhost:${port}${mock}` : mock);
      const SIM = '.simframe iframe, iframe[id^="sim-frame"], iframe[src*="simulator"]';
      // MakeCode can replace the simulator's frame when it restarts the program, so the frame is found again
      // just before the screenshot, and a failed attempt is tried once more from a fresh page.
      const attempt = async () => {
        await page.goto(`http://localhost:${port}/_playground-makecode/index.html?${q}`);
        const editor = await (await page.waitForSelector('#editor', { timeout: 10000 })).contentFrame();
        await editor.waitForSelector(SIM, { timeout: 90000 });
        await page.waitForFunction(() => window.__playground?.simStarted, null, { timeout: 30000 });
        // Arcade's simulator can wait behind a play button (no user gesture yet): click the middle of the game
        // screen to start it, or the picture is the button. (A click on the micro:bit board does nothing.)
        if (j.target === 'arcade') {
          const box = await (await editor.waitForSelector(SIM, { timeout: 30000 })).boundingBox();
          if (box) await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        }
        await page.waitForTimeout(WAIT[j.target] || 2500);
        const simEl = await editor.waitForSelector(SIM, { timeout: 30000 });
        const sim = await simEl.contentFrame();
        await sim.waitForSelector('canvas, svg', { timeout: 30000 });
        // The screen is the biggest canvas (Arcade) or svg (the micro:bit board) in the simulator.
        const shots = [];
        for (const h of await sim.$$('canvas, svg')) { const bx = await h.boundingBox(); if (bx && bx.width > 40 && bx.height > 40) shots.push({ h, a: bx.width * bx.height, b: bx }); }
        shots.sort((x, y) => y.a - x.a);
        const el = shots[0]?.h || simEl, box = shots[0]?.b || await simEl.boundingBox();
        const buf = await el.screenshot();
        return { data: `data:image/png;base64,${buf.toString('base64')}`, w: Math.round(box.width * 2), h: Math.round(box.height * 2), div: 2 };
      };
      let err = null;
      for (let n = 0; n < 2; n++) {
        try { const png = await attempt(); drew.add(j.target); return png; } catch (e) { err = e; }
      }
      // Say what went wrong and which frames the page held, in the log and in failures.txt beside the pictures
      // (published with the site, so it can be read without the deploy log).
      const what = page.frames().map((f) => f.url().slice(0, 90)).join(' | ');
      const line = `${j.id}: ${err.message.split('\n')[0]} (frames: ${what})`;
      failures.push(line);
      console.log(`- makecode-out ${line}`);
      if (/Timeout/.test(err.message) && !drew.has(j.target)) { down.add(j.target); console.log(`- makecode-out: no ${j.target} simulator, so no more output pictures for it this run`); }
      return null;
    },
  });
  if (!CHECK) writeFileSync(join(DIR, 'makecode-out', 'failures.txt'), failures.length ? failures.join('\n') + '\n' : 'none\n');
}

if (browser) { await browser.close(); server.close(); }
if (SEED) console.log(`Pictures: ${seeded} downloaded from the live site.`);
if (process.env.GITHUB_OUTPUT) writeFileSync(process.env.GITHUB_OUTPUT, `pictures_stale=${stale}\n`, { flag: 'a' });
if (failed.length) {
  const msg = `${failed.length} picture(s) could not be drawn and were skipped: ${failed.join(', ')}`;
  console.warn('⚠ ' + msg);
  if (process.env.GITHUB_STEP_SUMMARY) writeFileSync(process.env.GITHUB_STEP_SUMMARY, `- ${msg}\n`, { flag: 'a' });
  if (process.env.GITHUB_ACTIONS) console.log(`::warning title=Pictures skipped::${msg}`);
}
if (leftForNextRun) {
  const msg = `Out of time (WP_DEADLINE): ${leftForNextRun} picture(s) left for the next run.`;
  console.warn('⚠ ' + msg);
  if (process.env.GITHUB_STEP_SUMMARY) writeFileSync(process.env.GITHUB_STEP_SUMMARY, `- ${msg}\n`, { flag: 'a' });
}
