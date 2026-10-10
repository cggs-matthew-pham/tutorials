// `npm run render`: record one short clip per step that has a `clip:` block.
// Deterministic: reads lesson.md, starts the app, drives it with Playwright, encodes with ffmpeg.
//   --lesson <slug>   only this lesson        --force      ignore the clip cache
//   --no-serve        app is already running  --out <dir>  output root (default: dist)
//   --seed <url>      first download unchanged clips from the live site (same hash = same clip)
//   --check           only report which clips need recording (writes stale=N to $GITHUB_OUTPUT)
//   WP_NO_MAKECODE=1  skip MakeCode lessons and keep their existing clips (makecode.com unreachable, e.g. a sandbox)
import { chromium } from 'playwright-core';
import { spawn, execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync, readdirSync, statSync, renameSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadLessons, validateLesson, getSnippet, voiceSpec, captionText, captionSay } from './lesson.mjs';
import { synth, voiceHashInput, ENGINE as VOICE_ENGINE } from './voice.mjs';
import { blocksId } from './teach.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(n);
const opt = (n, d) => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : d);
const OUT = opt('--out', 'dist');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const CLIP_MAX_S = 30; // BUILDING › 4: clips that explain why stay under about 30 s

const highlightSrc = readFileSync(join(here, 'highlight.cjs'), 'utf8');
const stageHtml = readFileSync(join(here, 'stage.html'), 'utf8').replace('/*HIGHLIGHT*/', () => highlightSrc);
const rendererSrc = readFileSync(fileURLToPath(import.meta.url), 'utf8');

// ---------- cache ----------
// Clips show a playground, so a change to the playground a lesson uses (or its snippets) must re-record
// that lesson's clips. Only that playground counts: editing the micro:bit snippets leaves turtle clips alone.
const SNIPPETS = { playground: 'turtle', 'playground-html': 'html', 'playground-makecode': 'microbit', 'playground-maths': 'maths', 'playground-board': 'maths', 'playground-explain': 'none' };
const sharedCache = new Map();
function sharedFilesHash(lesson) {
  const pg = String(lesson.app?.command ?? '').match(/_(playground[\w-]*)/)?.[1];
  const key = pg || '';
  if (sharedCache.has(key)) return sharedCache.get(key);
  const h = createHash('sha1');
  const walk = (p) => { if (!existsSync(p)) return; if (statSync(p).isDirectory()) { for (const f of readdirSync(p).sort()) walk(join(p, f)); } else h.update(p).update(readFileSync(p)); };
  if (pg) [pg, 'playground-shared', join('snippets', `${SNIPPETS[pg] ?? pg}.json`)].forEach(walk);
  const d = h.digest('hex');
  sharedCache.set(key, d);
  return d;
}

function stepHash(lesson, step) {
  const h = createHash('sha1');
  h.update(JSON.stringify({ c: step.config, a: lesson.app, p: lesson.pacing, t: lesson.title, l: lesson.language }));
  for (const f of readdirSync(lesson.dir).sort()) {
    const p = join(lesson.dir, f);
    if (f !== 'lesson.md' && statSync(p).isFile()) h.update(f).update(readFileSync(p));
  }
  h.update(stageHtml).update(rendererSrc).update(sharedFilesHash(lesson));
  const vs = voiceSpec(lesson.voice);
  if (vs) h.update(voiceHashInput(vs));
  // The explain stage shows pictures drawn by render-pictures: they are part of the clip, so a missing or redrawn
  // picture records the clip again (a clip made while makecode.com was down mends itself on the next deploy).
  if (/_playground-explain/.test(lesson.app?.url || '')) {
    const q = step.config.query || {};
    const code = typeof q.code === 'string' && q.code.startsWith('@') ? getSnippet(lesson.dir, q.code.slice(1)) : String(q.code ?? '');
    for (const f of [join(OUT, '_pictures', 'makecode', `${blocksId(code)}.png`), join(OUT, '_pictures', 'makecode-out', String(q.lesson || ''), 'explain.png')])
      h.update(existsSync(f) ? readFileSync(f) : 'missing');
  }
  return h.digest('hex').slice(0, 16);
}

// Which voice a clip may have. A voiced lesson's clip records its engine in <id>.json (`voice`); a Kokoro build only
// accepts Kokoro clips, so clips made with the test voice (flite) or silent (none) are recorded again with the real
// voice, while a build without Kokoro reuses Kokoro clips and fills in the rest its own way.
const okVoice = (lesson, meta) => !voiceSpec(lesson.voice) || ['kokoro', VOICE_ENGINE].includes(meta.voice);
const clipMeta = (lesson, step, voice) => JSON.stringify(voiceSpec(lesson.voice) ? { hash: stepHash(lesson, step), voice } : { hash: stepHash(lesson, step) });

// Download a clip from the live site when its published hash matches: the same inputs give the same clip.
async function seedClip(base, lesson, step, outDir) {
  const url = `${base.replace(/\/$/, '')}/${lesson.slug}/clips/${step.id}`;
  try {
    const meta = await fetch(`${url}.json`, { cache: 'no-store' });
    const m = meta.ok ? await meta.json() : null;
    if (!m || m.hash !== stepHash(lesson, step) || !okVoice(lesson, m)) return false;
    for (const ext of voiceSpec(lesson.voice) ? ['mp4', 'jpg', 'vtt'] : ['mp4', 'jpg']) {
      const r = await fetch(`${url}.${ext}`);
      if (!r.ok) return false;
      writeFileSync(join(outDir, `${step.id}.${ext}`), Buffer.from(await r.arrayBuffer()));
    }
    writeFileSync(join(outDir, `${step.id}.json`), clipMeta(lesson, step, m.voice));
    return true;
  } catch { return false; }
}

// ---------- app process ----------
async function startApp(lesson) {
  if (flag('--no-serve')) return null;
  // REPO_ROOT / OUT_DIR let a lesson's command reach shared tooling and built files from any depth.
  const env = { ...process.env, REPO_ROOT: process.cwd(), OUT_DIR: resolve(OUT) };
  const child = spawn(lesson.app.command, { cwd: lesson.dir, shell: true, detached: true, stdio: ['ignore', 'pipe', 'pipe'], env });
  let log = '';
  child.stdout.on('data', (d) => (log += d));
  child.stderr.on('data', (d) => (log += d));
  for (let i = 0; i < 300; i++) {
    if (child.exitCode !== null) throw new Error(`App exited early (code ${child.exitCode}):\n${log.slice(-1200)}`);
    try { if ((await fetch(lesson.app.url)).ok) return child; } catch { /* not up yet */ }
    await sleep(200);
  }
  stopApp(child);
  throw new Error(`App did not respond at ${lesson.app.url} within 60s:\n${log.slice(-1200)}`);
}
function stopApp(child) {
  if (!child) return;
  try { process.kill(-child.pid); } catch { /* already gone */ }
}

// ---------- browser ----------
async function launchBrowser() {
  let executablePath = process.env.CHROMIUM_PATH;
  let args = [];
  if (!executablePath) {
    try { // optional: npm-bundled Chromium for sandboxes that cannot download browsers
      const m = (await import('@sparticuz/chromium')).default;
      executablePath = await m.executablePath();
      args = m.args;
    } catch { /* fall back to Playwright's own browser: npx playwright-core install chromium */ }
  }
  return chromium.launch({ headless: true, executablePath, args });
}

// ---------- locating things inside the app ----------
async function find(frame, name, kinds) {
  for (const k of kinds) {
    const loc =
      k === 'button' ? frame.getByRole('button', { name, exact: true })
      : k === 'label' ? frame.getByLabel(name, { exact: true })
      : k === 'placeholder' ? frame.getByPlaceholder(name, { exact: true })
      : k === 'link' ? frame.getByRole('link', { name, exact: true })
      : frame.getByText(name, { exact: true });
    if ((await loc.count()) > 0) return loc.first();
  }
  throw new Error(`could not find "${name}" in the app (tried ${kinds.join(', ')})`);
}
// { preview: true } looks inside the HTML playground's preview (the student's page), for example
// - click: { selector: "#go", preview: true } and - expect: { selector: "#message", contains: "Go!", preview: true }.
const target = (frame, v, kinds) => {
  const fr = typeof v === 'object' && v.preview ? frame.frameLocator('#preview') : frame;
  return typeof v === 'object' && v.selector ? fr.locator(v.selector).first() : find(fr, typeof v === 'object' ? v.into || v.field : v, kinds);
};

// ---------- voiceover ----------
// Place each spoken line at the moment its caption appeared, mix them into the clip, and write a transcript (.vtt)
// of what is said: the player's CC button shows it, while the burned-in caption stays the short version.
let clipReport = null;
const vttTime = (s) => { const ms = Math.max(0, Math.round(s * 1000)); const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, sec = Math.floor(ms / 1000) % 60; return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(ms % 1000).padStart(3, '0')}`; };
function muxVoice(mp4, spoken, trim, vttFile) {
  const lines = spoken.map((l) => ({ ...l, start: Math.max(0, l.at / 1000 - trim) }));
  const inputs = lines.flatMap((l) => ['-i', l.file]);
  const parts = lines.map((l, i) => `[${i + 1}:a]aresample=48000,aformat=channel_layouts=mono,adelay=${Math.round(l.start * 1000)}:all=1[a${i}]`);
  const mix = lines.length > 1 ? `${lines.map((_, i) => `[a${i}]`).join('')}amix=inputs=${lines.length}:normalize=0:duration=longest[a]` : '[a0]anull[a]';
  const out = mp4.replace(/\.mp4$/, '.voiced.mp4');
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', mp4, ...inputs, '-filter_complex', [...parts, mix].join(';'),
    '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', out]);
  renameSync(out, mp4);
  const cues = lines.map((l, i) => `${i + 1}\n${vttTime(l.start)} --> ${vttTime(Math.min(l.start + l.seconds, lines[i + 1]?.start ?? Infinity))}\n${l.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}\n`);
  writeFileSync(vttFile, `WEBVTT\n\n${cues.join('\n')}`);
}

// ---------- one clip ----------
async function recordClip(browser, lesson, step, outDir) {
  const { config: c } = step;
  const p = { ...lesson.pacing, ...(c.pacing || {}) }; // a step may override pacing, e.g. { keyDelayMs: 40 }
  const tmp = join('.render-tmp', `${lesson.slug.replace(/\//g, '_')}-${step.id}`);
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });

  // Voiceover: every line is generated before recording starts, so the video never waits on the speech engine.
  // The opening line is the step's say: (or its caption, if it has one); then each caption action's say: or text.
  const vs = VOICE_ENGINE === 'none' ? null : voiceSpec(lesson.voice); // none: record voiced lessons silent
  const voiceDir = join('.voice-cache');
  const opening = vs ? (c.say ?? c.caption ?? '') : '';
  const lineFor = new Map();
  if (vs) {
    for (const t of [opening, ...c.clip.filter((a) => a && a.caption !== undefined).map((a) => captionSay(a.caption))]) {
      if (t && !lineFor.has(t)) lineFor.set(t, await synth(t, vs, voiceDir));
    }
  }
  const spoken = [];         // { file, at (ms since t0), seconds, text }
  let speakingUntil = 0;     // a new line waits for the last one to finish, so lines never overlap
  let narrationWait = 0;     // how much the voice lengthened the clip
  const speak = async (text) => {
    const line = text && lineFor.get(text);
    if (!line) return;
    const gap = speakingUntil ? speakingUntil + 250 - Date.now() : 0;
    if (gap > 0) { narrationWait += gap; await sleep(gap); }
    spoken.push({ ...line, at: Date.now() - t0 });
    speakingUntil = Date.now() + line.seconds * 1000;
  };

  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    colorScheme: 'light',
    recordVideo: { dir: tmp, size: { width: 1280, height: 720 } },
  });
  const t0 = Date.now();
  const page = await ctx.newPage();
  await page.setContent(stageHtml);
  const code = c.code ? getSnippet(lesson.dir, c.code) : '';
  const fileLabel = c.code ? c.code.split('#')[0] : '';
  await page.evaluate((o) => window.stage.init(o), {
    title: lesson.title, stage: c.stage, language: lesson.language, cursorMs: p.cursorMs,
    command: lesson.app?.command, caption: c.caption ? captionText(c.caption) : step.title, code, file: fileLabel, layout: lesson.app?.layout,
  });

  // step.query adds URL parameters to the app; values like "@file.py#region" are replaced by that code.
  const appUrl = () => {
    const u = new URL(lesson.app.url);
    for (const [k, v] of Object.entries(c.query || {})) u.searchParams.set(k, typeof v === 'string' && v.startsWith('@') ? getSnippet(lesson.dir, v.slice(1)) : String(v));
    return u.toString();
  };
  const frame = page.frameLocator('#app');
  const openApp = async () => {
    await page.evaluate((u) => window.stage.showApp(u), appUrl());
    const ready = lesson.app.readySelector ? frame.locator(lesson.app.readySelector).first() : lesson.app.ready ? frame.getByLabel(lesson.app.ready, { exact: true }).first() : null;
    if (ready) await ready.waitFor({ state: 'visible', timeout: 30000 });
    else await sleep(1500);
  };
  if (c.app) await openApp();
  const readyAt = Date.now();
  await speak(opening);
  await sleep(p.preRollMs);

  // at: [x, y] clicks that point of a turtle drawing (turtle coordinates: 0, 0 is the middle, y up; the drawing
  // spans `extent` units across its shorter side, 500 unless the query sets one), e.g. a button drawn at (-130, -170).
  const go = async (loc, { click = true, at = null } = {}) => {
    await loc.scrollIntoViewIfNeeded();
    const b = await loc.boundingBox();
    const k = at ? Math.min(b.width, b.height) / (Number(c.query?.extent) || 500) : 0;
    const px = b.width / 2 + (at ? at[0] * k : 0), py = b.height / 2 - (at ? at[1] * k : 0);
    const x = b.x + px, y = b.y + py;
    await page.evaluate(([x, y]) => window.stage.moveCursor(x, y), [x, y]);
    await sleep(p.cursorMs + 80);
    if (click) {
      await page.evaluate(([x, y]) => window.stage.ripple(x, y), [x, y]);
      await loc.click(at ? { position: { x: px, y: py } } : undefined);
    }
  };

  for (const action of c.clip) {
    const verb = Object.keys(action)[0];
    const v = action[verb];
    const ctxMsg = `${lesson.slug} ${step.id} "${verb}"`;
    try {
      if (verb === 'caption') {
        if (vs) await speak(captionSay(v) && lineFor.has(captionSay(v)) ? captionSay(v) : '');
        await page.evaluate((t) => window.stage.caption(t), captionText(v));
        await sleep(350);
      }
      else if (verb === 'clear') { await page.evaluate(([f]) => window.stage.setCode('', f), [typeof v === 'string' ? v : '']); }
      else if (verb === 'show') {
        await page.evaluate(([t, f]) => window.stage.setCode(t, f), [''  , String(v).split('#')[0]]);
        await page.evaluate(([t, cps]) => window.stage.type(t, cps), [getSnippet(lesson.dir, v), p.typeCps]);
        await sleep(600);
      }
      else if (verb === 'run') { await openApp(); await sleep(900); }
      else if (verb === 'wait') await sleep(v);
      else if (verb === 'click') { await go(await target(frame, v, ['button', 'label', 'link', 'text']), { at: Array.isArray(v?.at) ? v.at : null }); await sleep(p.afterActionMs); }
      else if (verb === 'press') { await page.keyboard.press(v); await sleep(p.afterActionMs); }
      else if (verb === 'type') {
        const loc = await target(frame, v, ['label', 'placeholder']);
        await go(loc);
        // append: true types at the end of what is there (so captions can explain each part as it appears).
        // append: true types at the end; after: "text" types just after the first place that text appears
        // (for example inside a <style> block), so captions can explain each part as it appears.
        if (v.after !== undefined) {
          const at = await loc.evaluate((el, t) => { el.focus(); const i = el.value.indexOf(t); if (i >= 0) el.selectionStart = el.selectionEnd = i + t.length; return i; }, String(v.after));
          if (at < 0) throw new Error(`type.after: ${JSON.stringify(v.after)} is not in the editor`);
        }
        else if (v.append) { await loc.evaluate((el) => { el.focus(); if ('selectionStart' in el) el.selectionStart = el.selectionEnd = el.value.length; }); }
        else await loc.fill('');
        const text = typeof v.text === 'string' && v.text.startsWith('@') ? getSnippet(lesson.dir, v.text.slice(1)) : String(v.text);
        await loc.pressSequentially(text, { delay: p.keyDelayMs });
        await sleep(p.afterActionMs);
      }
      else if (verb === 'expect') {
        const loc = await target(frame, v, ['label', 'text']);
        const want = v.value !== undefined ? String(v.value) : String(v.contains);
        let got = '';
        for (let i = 0; i < 100; i++) {
          got = await loc.evaluate((el) => ('value' in el ? el.value : el.textContent) ?? '');
          if (v.value !== undefined ? got === want : got.includes(want)) break;
          await sleep(100);
          if (i === 99) throw new Error(`expected ${v.value !== undefined ? 'exactly' : 'to contain'} ${JSON.stringify(want)}, got ${JSON.stringify(got)}`);
        }
        await sleep(p.afterActionMs + 600); // let the viewer read the result
      }
    } catch (e) {
      await ctx.close().catch(() => {});
      throw new Error(`${ctxMsg} failed: ${e.message}`);
    }
  }
  if (speakingUntil > Date.now()) { narrationWait += speakingUntil - Date.now(); await sleep(speakingUntil - Date.now()); }
  await sleep(p.postRollMs);

  const video = page.video();
  await ctx.close();
  const webm = await video.path();

  mkdirSync(outDir, { recursive: true });
  const mp4 = join(outDir, `${step.id}.mp4`);
  const trim = Math.max(0, (readyAt - t0) / 1000 - 0.1).toFixed(2);
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-ss', trim, '-i', webm, '-an', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '24',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4]);
  if (spoken.length) muxVoice(mp4, spoken, Number(trim), join(outDir, `${step.id}.vtt`));
  else rmSync(join(outDir, `${step.id}.vtt`), { force: true });
  const length = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', mp4]).toString().trim());
  clipReport = { length, narration: narrationWait / 1000, lines: spoken.length };
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-sseof', '-1.2', '-i', mp4, '-frames:v', '1', '-q:v', '3', join(outDir, `${step.id}.jpg`)]);
  rmSync(tmp, { recursive: true, force: true });
  return mp4;
}

// ---------- main ----------
const lessons = loadLessons(opt('--lesson'));
if (!lessons.length) { console.error('No lessons found.'); process.exit(1); }

let failures = 0, stale = 0, seeded = 0;
const NO_MAKECODE = !!process.env.WP_NO_MAKECODE && process.env.WP_NO_MAKECODE !== '0';
// WP_DEADLINE=<unix seconds>: record nothing new after this time. A clip left over keeps the live site's version if it
// has one (with its old record, so the next run records it again), and the run ends normally, so what is done is
// published. The robotic test voice is never carried over.
const DEADLINE = Number(process.env.WP_DEADLINE) || 0;
const outOfTime = () => DEADLINE > 0 && Date.now() / 1000 > DEADLINE;
let leftForNextRun = 0, keptOld = 0;
async function keepLive(base, lesson, step, outDir) {
  if (!base) return false;
  const url = `${base.replace(/\/$/, '')}/${lesson.slug}/clips/${step.id}`;
  try {
    const meta = await fetch(`${url}.json`, { cache: 'no-store' });
    if (!meta.ok) return false;
    const m = await meta.json();
    if (m.voice === 'flite') return false;
    const got = {};
    for (const ext of ['mp4', 'jpg', 'vtt']) { const r = await fetch(`${url}.${ext}`); if (r.ok) got[ext] = Buffer.from(await r.arrayBuffer()); }
    if (!got.mp4) return false;
    for (const [ext, buf] of Object.entries(got)) writeFileSync(join(outDir, `${step.id}.${ext}`), buf);
    writeFileSync(join(outDir, `${step.id}.json`), JSON.stringify(m));
    return true;
  } catch { return false; }
}
for (const lesson of lessons) {
  if (NO_MAKECODE && lesson.language === 'makecode') { console.log(`• ${lesson.slug}: MakeCode, skipped (WP_NO_MAKECODE), existing clips kept`); continue; }
  const errs = validateLesson(lesson);
  if (errs.length) { errs.forEach((e) => console.error('✗ ' + e)); failures += errs.length; continue; }
  const clipSteps = [...lesson.steps, ...(lesson.explainStep ? [lesson.explainStep] : [])].filter((s) => s.config.clip);
  const outDir = join(OUT, lesson.slug, 'clips');
  mkdirSync(outDir, { recursive: true });

  const isSame = (s) => {
    const meta = join(outDir, `${s.id}.json`);
    if (!existsSync(meta) || !existsSync(join(outDir, `${s.id}.mp4`))) return false;
    const m = JSON.parse(readFileSync(meta, 'utf8'));
    return m.hash === stepHash(lesson, s) && okVoice(lesson, m);
  };
  const todo = [];
  for (const s of clipSteps) {
    if (flag('--force')) { todo.push(s); continue; }
    if (isSame(s)) { console.log(`• ${lesson.slug}/${s.id}: unchanged, skipped`); continue; }
    if (opt('--seed') && await seedClip(opt('--seed'), lesson, s, outDir)) { seeded++; console.log(`↓ ${lesson.slug}/${s.id}: unchanged, downloaded from the live site`); continue; }
    todo.push(s);
  }
  stale += todo.length;
  if (!todo.length || flag('--check')) { todo.forEach((s) => console.log(`○ ${lesson.slug}/${s.id}: needs recording`)); continue; }

  if (outOfTime()) { for (const s of todo) { leftForNextRun++; if (await keepLive(opt('--seed') || process.env.WP_LIVE_SITE, lesson, s, outDir)) keptOld++; } continue; }
  const app = await startApp(lesson);
  try {
    for (const s of todo) {
      if (outOfTime()) { leftForNextRun++; if (await keepLive(opt('--seed') || process.env.WP_LIVE_SITE, lesson, s, outDir)) keptOld++; continue; }
      const t = Date.now();
      // A fresh browser per clip: some sandboxed Chromium builds die when a recording context closes.
      const browser = await launchBrowser();
      try {
        clipReport = null;
        await recordClip(browser, lesson, s, outDir);
        writeFileSync(join(outDir, `${s.id}.json`), clipMeta(lesson, s, VOICE_ENGINE));
        const r = clipReport;
        const voiced = r?.lines ? `, ${r.lines} spoken lines, voice added ${r.narration.toFixed(1)}s` : '';
        console.log(`✓ ${lesson.slug}/${s.id} "${s.title}" (${r ? r.length.toFixed(1) + 's clip' + voiced + ', ' : ''}${((Date.now() - t) / 1000).toFixed(1)}s to record)`);
        if (r && r.length > CLIP_MAX_S) console.warn(`⚠ ${lesson.slug}/${s.id}: clip is ${r.length.toFixed(1)}s (over ${CLIP_MAX_S}s): shorten the spoken lines or split the idea`);
      } catch (e) { failures++; console.error(`✗ ${e.message.split('\n')[0]}`); }
      finally { await browser.close().catch(() => {}); }
    }
  } finally { stopApp(app); }
}
rmSync('.render-tmp', { recursive: true, force: true });
if (VOICE_ENGINE === 'flite') console.warn('⚠ voiced clips used the flite test voice: build-site will refuse to build with them (local tests only)');
if (VOICE_ENGINE === 'none') console.warn('⚠ voiced clips without a live Kokoro version were recorded silent; the next Kokoro build records them with the voice');
console.log(`Clips: ${seeded} downloaded, ${stale} ${flag('--check') ? 'to record' : 'recorded or failed'}.`);
if (process.env.GITHUB_OUTPUT) writeFileSync(process.env.GITHUB_OUTPUT, `stale=${stale}\n`, { flag: 'a' });
if (leftForNextRun) {
  const msg = `Out of time (WP_DEADLINE): ${leftForNextRun} clip(s) left for the next run (${keptOld} keep their live version meanwhile). Run the publish workflow again to finish.`;
  console.warn('⚠ ' + msg);
  if (process.env.GITHUB_STEP_SUMMARY) writeFileSync(process.env.GITHUB_STEP_SUMMARY, `- ${msg}\n`, { flag: 'a' });
}
process.exit(failures ? 1 : 0);
