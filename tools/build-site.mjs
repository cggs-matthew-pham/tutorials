// `npm run build`: content/**/lesson.md -> static site in dist/ (URL path = path under content/).
//   dist/index.html                      all subjects
//   dist/<subject>/index.html            collections in a subject        (e.g. /code/)
//   dist/<subject>/<collection>/...      lessons in a collection         (e.g. /code/python/)
//   dist/<subject>/<collection>/<lesson>/index.html
//   dist/_playground/                    the embeddable Python turtle playground
//   dist/_playground-html/               the embeddable HTML & CSS playground
// A step with a clip embeds clips/step-N.mp4 if it exists, otherwise a labelled placeholder,
// so lessons can be written, reviewed and published before any clip is rendered.
import { mkdirSync, writeFileSync, existsSync, copyFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { Marked } from 'marked';
import { parse as YAMLparse } from 'yaml';
import { lessonPageHtml, tryEmbed, esc, titleCase, page, codeBlock, siteNav, NAV_CSS, NAV_JS, makecodeBlock } from './lesson-view.mjs';
import { readFileSync } from 'node:fs';
import { snippetId, unlockKind, pictureSpec, usesBoardPictures, pictureBoard, makecodePackage, makecodeExtensions, captionText } from './lesson-core.mjs';
import { loadLessons, validateLesson, getSnippet, loadDirMeta, loadSnippetFiles, loadSharedModules, CONTENT_ROOT } from './lesson.mjs';
import { buildPlayground, buildPyPlayground, buildHtmlPlayground, buildMathsPlayground, buildSciencePlayground, buildKatex, buildNumbas, buildMakecodePlayground, buildExplainStage } from './build-playground.mjs';
import { buildCreate } from './build-create.mjs';
import { layoutTrail, trailHtml, TRAIL_CSS } from './trail.mjs';
import { markedMath, textWithMath, workedHtml } from './maths.mjs';
import { FORMS_JS, NUMBAS_VERSION } from './maths-forms.mjs';
import { loadAllMathsCards, mathsRefItem, mathsCheatBody, mathsCheatMd, MATHS_CARD_CSS } from './maths-cards.mjs';
import { deckFor, worksheetFor, cheatSheetFor, cheatSheetBody, unitSnippets, CHEAT_CSS, lessonGuideBody, teachPath, stepUrl, SITE_URL, TEACH_CSS, TEACH_JS, blocksId } from './teach.mjs';

const require = createRequire(import.meta.url);
const { highlightCode } = require('./highlight.cjs');
const OUT = process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : 'dist';

// Never build a site whose clips speak with the flite test voice (render.mjs records each voiced clip's engine in
// clips/<id>.json). Record them with Kokoro, or silent with WP_VOICE_ENGINE=none. WP_ALLOW_TEST_VOICE=1 is for
// looking at a local build only.
{
  const { readdirSync, statSync } = await import('node:fs');
  const robotic = [];
  const walk = (d) => { if (!existsSync(d)) return; for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (f.endsWith('.json') && d.endsWith('clips')) { try { if (JSON.parse(readFileSync(p, 'utf8')).voice === 'flite') robotic.push(p); } catch { /* not a clip record */ } } } };
  walk(OUT);
  if (robotic.length && !process.env.WP_ALLOW_TEST_VOICE) {
    console.error(`✗ ${robotic.length} clip(s) use the flite test voice, which must not be published (first: ${robotic[0]}).\n  Record them with Kokoro (the publish workflow) or silent (WP_VOICE_ENGINE=none node tools/render.mjs ...).\n  To look at a local test build anyway: WP_ALLOW_TEST_VOICE=1 npm run build`);
    process.exit(1);
  }
}

function clipHtml(lesson, step) {
  const c = step.config;
  if (!c.clip) return '';
  const file = join(OUT, lesson.slug, 'clips', `${step.id}.mp4`);
  const cap = c.caption ? captionText(c.caption) : step.title;
  let inner;
  if (existsSync(file)) {
    const poster = existsSync(join(OUT, lesson.slug, 'clips', `${step.id}.jpg`)) ? ` poster="clips/${step.id}.jpg"` : '';
    // A voiced clip has a transcript of what is said (clips/<id>.vtt): the CC button shows it. Clips start muted
    // either way (captions first: headphones are not guaranteed), so students unmute when they can listen.
    const vtt = existsSync(join(OUT, lesson.slug, 'clips', `${step.id}.vtt`)) ? `<track kind="captions" srclang="en" label="Transcript" src="clips/${step.id}.vtt">` : '';
    inner = `<figure class="clip${vtt ? ' voiced' : ''}"><video controls loop muted playsinline preload="metadata"${poster}><source src="clips/${step.id}.mp4" type="video/mp4">${vtt}</video><figcaption>${esc(cap)}${vtt ? ' <span class="voiced-note">· Sound on for the voiceover</span>' : ''}</figcaption></figure>`;
  } else {
    inner = `<div class="placeholder"><b>Clip placeholder · ${esc(step.id)}</b><span>${esc(cap)}</span><span>Rendered automatically by the build.</span></div>`;
  }
  return c.reveal ? `<details class="reveal"><summary>${esc(typeof c.reveal === 'string' ? c.reveal : 'Reveal what happens')}</summary>${inner}</details>` : inner;
}


/** "Try it yourself": the playground embedded with the step's starter code; edits autosave per student. */
function tryHtml(lesson, step) {
  const t = step.config.try;
  if (!t) return '';
  // Modules a lesson offers: a file next to lesson.md overrides a shared one; shared ones the playground loads itself.
  const local = {};
  for (const name of lesson.modules) { const f = join(lesson.dir, `${name}.py`); if (existsSync(f)) local[name] = readFileSync(f, 'utf8'); }
  // Data files for the Python playground (try.files, paths from the lesson folder) are served from <lesson>/files/.
  if (Array.isArray(t.files)) { mkdirSync(join(OUT, lesson.slug, 'files'), { recursive: true }); for (const f of t.files) copyFileSync(join(lesson.dir, f), join(OUT, lesson.slug, 'files', f.split('/').pop())); }
  return tryEmbed(lesson, step, getSnippet(lesson.dir, t.starter || step.config.code), '../'.repeat(lesson.depth), '', { use: lesson.modules, local }, VERSIONS);
}

// "Show the expected result": pictures of solution pages (render-pictures), keyed "<slug>/<step-4-t2>".
let EXPECTED = null; // read on first use (readPics is defined further down)
function expectedHtml(lesson, cfg, key) {
  const pic = cfg.expected && (EXPECTED ||= readPics(['expected']))[`${lesson.slug}/${key}`];
  if (!pic) return '';
  return `<details class="reveal expected"><summary>Show the expected result</summary><figure><img src="${'../'.repeat(lesson.depth)}_pictures/expected/${esc(lesson.slug)}/${esc(key)}.png?v=${esc(pic.hash || '')}" alt="What the finished page looks like" width="${Math.round(pic.w / (pic.div || 2))}" height="${Math.round(pic.h / (pic.div || 2))}" loading="lazy"><figcaption>What it should look like. Your words can be different.</figcaption></figure></details>`;
}

// "What this code makes": picture: on steps and tasks, and explainPicture (render-pictures, _pictures/shown/<slug>/<key>.png).
let SHOWN = null, MKOUT = null, BOARDPICS = null, SCIPICS = null;
function pictureHtml(lesson, v, key) {
  const sp = pictureSpec(v);
  if (lesson.language === 'makecode' && sp) {
    let code = ''; try { code = getSnippet(lesson.dir, sp.ref); } catch { return ''; }
    const target = lesson.steps.map((s) => s.config.try?.playground).find((k) => k === 'microbit' || k === 'arcade') || 'microbit';
    // What the program makes, drawn by MakeCode's simulator at build time (render-pictures, makecode-out), beside the blocks.
    const out = makecodeExtensions(lesson).some((x) => x.noSimPicture) ? null : (MKOUT ||= readPics(['makecode-out']))[`${lesson.slug}/${key}`];
    const outFig = out ? `<figure class="mkout"><img src="${'../'.repeat(lesson.depth)}_pictures/makecode-out/${esc(lesson.slug)}/${esc(key)}.png?v=${esc(out.hash || '')}" alt="What this program shows in the ${target === 'arcade' ? 'game' : 'micro:bit'} simulator" width="${Math.round(out.w / (out.div || 2))}" height="${Math.round(out.h / (out.div || 2))}" loading="lazy"><figcaption>What it makes${target === 'arcade' ? ' (a moment from the game)' : ''}</figcaption></figure>` : '';
    return `<div class="mkpair${out ? ' has-out' : ''}"><figure class="shown mkshown">${makecodeBlock(highlightCode, code, '', target, blocksPic(code, '../'.repeat(lesson.depth)), makecodePackage(lesson))}<figcaption>The example, as blocks</figcaption></figure>${outFig}</div>`;
  }
  if (usesBoardPictures(lesson) && sp) {
    // A board setup drawn as students see it (render-pictures, board or science), with its caption.
    const kind = pictureBoard(lesson);
    const bp = (kind === 'science' ? (SCIPICS ||= readPics(['science'])) : (BOARDPICS ||= readPics(['board'])))[`${lesson.slug}/${key}`];
    if (!bp) return '';
    const cap = sp.caption ? (lesson.language === 'maths' ? textWithMath(sp.caption, esc) : esc(sp.caption)) : '';
    return `<figure class="shown boardpic"><img src="${'../'.repeat(lesson.depth)}_pictures/${kind}/${esc(lesson.slug)}/${esc(key)}.png?v=${esc(bp.hash || '')}" alt="${esc(sp.caption ? sp.caption.replace(/\$/g, '') : 'The board')}" width="${Math.round(bp.w / (bp.div || 2))}" height="${Math.round(bp.h / (bp.div || 2))}" loading="lazy">${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;
  }
  const pic = sp && (SHOWN ||= readPics(['shown']))[`${lesson.slug}/${key}`];
  if (!pic) return '';
  return `<figure class="shown"><img src="${'../'.repeat(lesson.depth)}_pictures/shown/${esc(lesson.slug)}/${esc(key)}.png?v=${esc(pic.hash || '')}" alt="The page this code makes${sp.boxes ? ', with Boxes on' : sp.inspect ? ', with the Box model view on' : ''}" width="${Math.round(pic.w / (pic.div || 2))}" height="${Math.round(pic.h / (pic.div || 2))}" loading="lazy"><figcaption>What this code makes${sp.boxes ? ' (with Boxes on: each box is a tag)' : sp.inspect ? ' (Box model view: margin orange, border gold, padding green, content blue)' : ''}</figcaption></figure>`;
}

function buildLesson(lesson, parentTitle, course) {
  const dir = join(OUT, lesson.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), lessonPageHtml(lesson, {
    Marked, highlightCode,
    snippet: (ref) => getSnippet(lesson.dir, ref),
    clipHtml: (s) => clipHtml(lesson, s),
    tryHtml: (s) => tryHtml(lesson, s),
    expectedHtml: (cfg, key) => expectedHtml(lesson, cfg, key),
    pictureHtml: (v, key) => pictureHtml(lesson, v, key),
    blocksPicture: (code) => blocksPic(code, '../'.repeat(lesson.depth)),
    snippetNames,
    crumb: { href: '../', title: parentTitle },
    course,
    siteRoot: '../'.repeat(lesson.depth),
    source: `content/${lesson.slug}/lesson.md`,
    teacherGuide: lesson.teacher ? `${'../'.repeat(lesson.depth)}${teachPath(lesson)}` : '',
    siteNavHtml: navFor(lesson.slug, 'lesson', lesson.slug.split('/').slice(0, -1).join('/')),
    maths: lesson.language === 'maths' ? { markedMath, textWithMath, workedHtml, forms: { js: FORMS_JS, src: `_numbas/numbas-jme.min.js?v=${NUMBAS_VERSION()}` } } : null,
  }));
}

const PLAYGROUND_PAGE_CSS = `:root{--bg:#fbfaf8;--ink:#1d2430;--line:#e4e1da;--card:#fff;--accent:#c2570a}
@media(prefers-color-scheme:dark){:root{--bg:#0f141a;--ink:#e6edf3;--line:#26303c;--card:#161d26;--accent:#ff9d3d}}
html,body{height:100%;margin:0}body{display:flex;flex-direction:column;background:var(--bg);color:var(--ink);font:15px/1.4 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.pgbar{display:flex;flex-wrap:wrap;align-items:center;gap:6px 14px;padding:4px 14px;border-bottom:1px solid var(--line);font-size:14px}
.pgbar a,.pgbar button{font:inherit;font-size:14px;font-weight:600;color:var(--ink);text-decoration:none;background:none;border:1px solid transparent;border-radius:8px;padding:5px 8px;cursor:pointer}
.pgbar a:hover,.pgbar button:hover{background:var(--card);border-color:var(--line)}.pgbar button{font-weight:500;color:inherit;opacity:.85}.grow{flex:1}
iframe{flex:1;width:100%;border:0;min-height:0}`;

// ---------- build ----------
const orderOf = (l) => (l.order ?? Infinity);
const lessons = loadLessons().sort((a, b) => (a.slug.split('/').slice(0, -1).join('/')).localeCompare(b.slug.split('/').slice(0, -1).join('/')) || orderOf(a) - orderOf(b) || a.slug.localeCompare(b.slug));
const snippetFiles = loadSnippetFiles();
// kind -> { snippet id -> label } so a check can say what it unlocked by name
const snippetNames = Object.fromEntries(Object.entries(snippetFiles).map(([k, d]) => [k, Object.fromEntries(d.groups.flatMap((g) => g.items.map((i) => [snippetId(i.label), i.label])))]));
let bad = 0;
for (const l of lessons) { const e = validateLesson(l); e.forEach((m) => console.error('✗ ' + m)); bad += e.length; }
if (bad) process.exit(1);

mkdirSync(OUT, { recursive: true });
buildPlayground(OUT);
buildPyPlayground(OUT);
buildHtmlPlayground(OUT);
await buildMathsPlayground(OUT);
buildSciencePlayground(OUT);
buildKatex(OUT);
buildNumbas(OUT);
buildMakecodePlayground(OUT);
buildExplainStage(OUT);
// Each playground's build stamp, added to the iframe URLs so a deploy is picked up at once.
const VERSIONS = Object.fromEntries(['_playground', '_playground-py', '_playground-html', '_playground-board', '_playground-makecode', '_playground-science'].map((d) => [d, readFileSync(join(OUT, d, 'version.txt'), 'utf8').trim()]));
buildCreate(OUT);

// Which lesson step unlocks which snippet: the playgrounds lock exactly these until the check is passed.
const claimsByKind = {};
for (const [kind, dir] of [['turtle', '_playground'], ['html', '_playground-html']]) {
  // The Python playground uses the turtle playground's snippets and unlocks (one Python Reference).
  const claims = claimsByKind[kind] = {};
  for (const l of lessons) for (const s of l.steps) {
    if (unlockKind(l, s) !== kind) continue;
    const stepTitle = s.title.replace(/^(Predict|Run|Investigate|Modify|Make|Info):\s*/i, '');
    for (const id of s.config.unlocks || []) claims[id] = { lesson: l.title, slug: l.slug, step: stepTitle };
    for (const t of s.tasks) for (const id of t.config.unlocks || []) claims[id] = { lesson: l.title, slug: l.slug, step: `${stepTitle} › ${t.title}` };
  }
  writeFileSync(join(OUT, dir, 'unlocks.json'), JSON.stringify(claims));
  if (kind === 'turtle') writeFileSync(join(OUT, '_playground-py', 'unlocks.json'), JSON.stringify(claims));
}

// directory tree: path ('' = root) -> { title, summary, kids: [{name, kind, title, summary}] }
const dirs = new Map();
const dirNode = (path) => {
  if (!dirs.has(path)) {
    const meta = loadDirMeta(join(CONTENT_ROOT, path));
    const name = path.split('/').pop() || 'Lessons';
    dirs.set(path, { path, title: meta.title || titleCase(name), summary: meta.summary || '', order: Number.isFinite(Number(meta.order)) && meta.order != null ? Number(meta.order) : null, kids: new Map(), meta });
  }
  return dirs.get(path);
};
for (const l of lessons) {
  const segs = l.slug.split('/');
  for (let i = 0; i < segs.length; i++) {
    const parent = dirNode(segs.slice(0, i).join('/'));
    if (i === segs.length - 1) parent.kids.set(segs[i], { kind: 'lesson', title: l.title, summary: l.summary, order: l.order });
    else if (!parent.kids.has(segs[i])) {
      const child = dirNode(segs.slice(0, i + 1).join('/'));
      parent.kids.set(segs[i], { kind: 'dir', title: child.title, summary: child.summary, order: child.order });
    }
  }
}

// Paths with a playground, and reference (cheat sheet) pages generated from the snippet files the playgrounds use.
const PLAY = { 'code/python': { kind: 'turtle', dir: '_playground', label: 'Python' }, 'code/html': { kind: 'html', dir: '_playground-html', label: 'HTML and CSS' }, 'code/microbit': { kind: 'microbit', dir: '_playground-makecode', label: 'micro:bit' }, 'code/arcade': { kind: 'arcade', dir: '_playground-makecode', label: 'Arcade' }, 'code/robotics': { kind: 'microbit', dir: '_playground-makecode', label: 'Robot', pkg: makecodePackage({ extensions: ['robot'] }) }, 'code/microbit-computer': { kind: 'microbit', dir: '_playground-makecode', label: 'micro:bit' }, 'code/microbit-security': { kind: 'microbit', dir: '_playground-makecode', label: 'micro:bit' }, 'code/ai-robots': { kind: 'microbit', dir: '_playground-makecode', label: 'Robot', pkg: makecodePackage({ extensions: ['robot'] }) },
  // The console bridge: the turtle playground with its own saved program; a starter with no turtle opens it in console mode.
  'code/console': { kind: 'turtle', dir: '_playground', label: 'Python console', id: 'free/console', code: 'name = input("What is your name? ")\nprint("Hello, " + name + "!")\n' },
  'code/objects': { kind: 'turtle', dir: '_playground', label: 'Python', id: 'free/objects' },
  'code/data': { kind: 'turtle', dir: '_playground-py', label: 'Python', id: 'free/data', code: 'import csv\n\nwith open("music.csv") as f:\n    songs = list(csv.DictReader(f))\n\nprint(songs[0])\n' },
  'code/deeper': { kind: 'turtle', dir: '_playground-py', label: 'Python', id: 'free/deeper', code: 'words = input("What do you do? ").strip().lower().split()\nprint(words)\n' } };
// Maths cards (snippets/maths.json, maths-<name>.json): a Reference page and cheat sheets for the course each names.
const MATHS_CARDS = loadAllMathsCards();
const REFS = [{ file: 'turtle', path: 'code/python/reference' }, { file: 'html', path: 'code/html/reference' }, { file: 'microbit', path: 'code/microbit/reference' }, { file: 'arcade', path: 'code/arcade/reference' }, { file: 'robot', path: 'code/robotics/reference' },
  { file: 'microbit', path: 'code/microbit-computer/reference' }, { file: 'microbit', path: 'code/microbit-security/reference' },
  // groups: only these groups of the file; title and summary: shown instead of the file's own.
  { file: 'turtle', path: 'code/console/reference', groups: ['Text in and out', 'Code structure'], title: 'Python console reference', summary: 'The commands from the console bridge, with what each one does.' },
  { file: 'turtle', path: 'code/deeper/reference', groups: ['Text in and out', 'Text and collections', 'Files', 'Code structure', 'Objects'], title: 'Python console reference', summary: 'Text, lists, dictionaries and files in the console, with what each command does.' },
  { file: 'turtle', path: 'code/data/reference', groups: ['Data', 'Text and collections', 'Code structure'], title: 'Data detective reference', summary: 'Reading, counting, charting, cleaning and testing data in Python, then pandas and Gradio.' },
  { file: 'turtle', path: 'code/objects/reference', title: 'Python turtle and objects reference', summary: 'Turtle commands, and the objects, dictionaries and classes from Objects with turtles.' }, ...MATHS_CARDS.map((m) => ({ file: m.file, path: `${m.course}/reference` }))];

// The site navbar: Learning Waypoints, Tutorials, then one menu per subject (a top-level folder, such as Code)
// listing its pathways (from its index.md); a pathway page is <subject>/paths/<id>/. navFor(pagePath, here,
// coursePath) builds it for a page at pagePath ('' is the site root); here says which kind of page it is (see siteNav).
const COURSES = [...new Set(lessons.map((l) => l.slug.split('/').slice(0, -1).join('/')))]
  .map((path) => ({ path, title: dirNode(path).title, order: dirNode(path).order }))
  .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity) || a.title.localeCompare(b.title));
const SUBJECTS = [...dirNode('').kids.entries()].filter(([, k]) => k.kind === 'dir')
  .map(([name, k]) => ({ path: name, title: k.title, order: k.order, pathways: Array.isArray(dirNode(name).meta?.pathways) ? dirNode(name).meta.pathways : [] }))
  .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity) || a.title.localeCompare(b.title));
const pathwayOf = (coursePath) => { for (const sub of SUBJECTS) for (const pw of sub.pathways) if ((pw.courses || []).some((c) => c.path === coursePath)) return { sub, pw }; return null; };
const navFor = (pagePath, here, coursePath = null) => {
  const c = coursePath && COURSES.find((x) => x.path === coursePath);
  const at = (p) => pagePath === p || pagePath.startsWith(p + '/');
  const inPw = coursePath ? pathwayOf(coursePath) : null;
  return siteNav({
    root: '../'.repeat(pagePath ? pagePath.split('/').length : 0), here, homeOn: pagePath === '',
    subjects: SUBJECTS.map((sub) => ({
      title: sub.title, href: `${sub.path}/`, on: at(sub.path) || inPw?.sub === sub,
      items: sub.pathways.map((pw) => ({ title: pw.title, href: `${sub.path}/paths/${pw.id}/`, on: at(`${sub.path}/paths/${pw.id}`) || inPw?.pw === pw })),
    })),
    current: c ? { href: `${c.path}/`, playground: !!PLAY[c.path], reference: REFS.some((r) => r.path === `${c.path}/reference`) } : null,
  });
};
// Pictures of what snippet examples draw (tools/render-pictures.mjs, run by `npm run render`): { id: { w, h, hash } }.
// Turtle pictures sit in _pictures/, HTML ones in _pictures/html/, maths boards in _pictures/maths/ (ids can repeat across kinds). div: device px per printed px.
const readPics = (sub) => { const f = join(OUT, '_pictures', ...sub, 'pictures.json'); return existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : {}; };
const PICS = { python: { pics: readPics([]), dir: '_pictures/' }, html: { pics: readPics(['html']), dir: '_pictures/html/' }, maths: { pics: readPics(['maths']), dir: '_pictures/maths/' }, makecode: { pics: readPics(['makecode']), dir: '_pictures/makecode/' } };
// Arcade blocks share the MakeCode manifest; render-pictures draws its snippet blocks as arcade/<snippet id>.png,
// because Arcade and micro:bit snippets can share a label (if, pause).
PICS.arcade = { pics: Object.fromEntries(Object.entries(PICS.makecode.pics).filter(([k]) => k.startsWith('arcade/')).map(([k, v]) => [k.slice(7), v])), dir: '_pictures/makecode/arcade/' };
// A MakeCode program's blocks picture (drawn by render-pictures), as { url, w, h } from base (the site root), or null.
const blocksPic = (code, base) => { const id = blocksId(code), p = PICS.makecode.pics[id]; return p ? { url: `${base}_pictures/makecode/${id}.png?v=${p.hash || ''}`, w: p.w, h: p.h } : null; };
const picsFor = (lang) => PICS[lang] || PICS.python;
// A Reference card: the code, then (when the snippet has one) its example program and a picture of what it draws.
function refItem(i, lang, depth, picKey = lang) {
  const plain = (t) => String(t).split('‹').join('').split('›').join('');
  const id = snippetId(i.label), P = picsFor(picKey), pic = P.pics[id], div = pic?.div || 5.2;
  const ex = i.example ? `<p class="ref-ex">Example</p>${codeBlock(highlightCode, plain(i.example).replace(/\n+$/, '') + '\n', lang, '')}` : '';
  const img = pic ? `<figure class="ref-pic"><img src="${'../'.repeat(depth)}${P.dir}${esc(id)}.png?v=${esc(pic.hash || '')}" alt="${lang === 'makecode' ? 'The block' : 'What the example draws'}" width="${Math.round(pic.w / div)}" height="${Math.round(pic.h / div)}" loading="lazy">${i.shows ? `<figcaption>${esc(i.shows)}</figcaption>` : ''}</figure>` : '';
  return `<div class="ref-item" data-text="${esc([i.label, i.hint || '', plain(i.code), i.shows || ''].join(' ').toLowerCase())}"><div>${codeBlock(highlightCode, plain(i.code).replace(/\n$/, '') + '\n', lang, '')}${ex}</div><div><b>${esc(i.label)}</b><p>${esc(i.hint || '')}</p>${img}<p class="ref-id">id: <code>${id}</code></p></div></div>`;
}
for (const r of REFS) {
  const data = JSON.parse(readFileSync(join('snippets', `${r.file}.json`), 'utf8'));
  const parent = r.path.split('/').slice(0, -1).join('/');
  const plain = (t) => String(t).split('‹').join('').split('›').join('');
  const search = `<input type="search" id="ref-search" class="ref-search" placeholder="Search: a name, or what it does" aria-label="Search the reference"><p id="ref-none" class="lede" hidden></p>`;
  // Same search as the playground drawer: every word must appear in the name, hint or code.
  const script = `<script>(function(){var q=document.getElementById('ref-search'),none=document.getElementById('ref-none');q.addEventListener('input',function(){var w=q.value.toLowerCase().split(/\\s+/).filter(Boolean),n=0;document.querySelectorAll('.ref-section').forEach(function(sec){var any=false;sec.querySelectorAll('.ref-item').forEach(function(it){var t=it.dataset.text,hit=w.every(function(x){return t.indexOf(x)>=0});it.hidden=!hit;if(hit){any=true;n++}});sec.hidden=!any});none.hidden=n>0;none.textContent=n?'':'Nothing matches "'+q.value.trim()+'".'})})();</script>`;
  const depth = r.path.split('/').length;
  const units = Array.isArray(dirs.get(parent)?.meta?.units) && dirs.get(parent).meta.units.length;
  const isM = data.language === 'maths';
  const printLink = units ? `<p class="ref-print"><a href="print/">Print a cheat sheet</a> <span class="muted">(the whole course or one unit, ${isM ? 'with board pictures' : `with a picture of ${data.language === 'makecode' ? 'each block' : 'what each command draws'}`})</span></p>` : '';
  const item = isM ? (i) => mathsRefItem({ ...i, id: `maths-${snippetId(i.label)}` }, { pictures: PICS.maths.pics, depth, esc }) : (i) => refItem(i, data.language, depth, data.target === 'arcade' ? 'arcade' : data.language);
  const body = (isM ? `<link rel="stylesheet" href="${'../'.repeat(depth)}_katex/katex.min.css"><style>${MATHS_CARD_CSS}</style>` : '') + printLink + search + data.groups.filter((g) => !r.groups || r.groups.includes(g.name)).map((g) => `<section class="ref-section"><h2 class="ref-group">${esc(g.name)}</h2>` + g.items.map(item).join('') + '</section>').join('') + script;
  mkdirSync(join(OUT, r.path), { recursive: true });
  writeFileSync(join(OUT, r.path, 'index.html'), page(r.title || data.title,
    `<header class="top"><a class="crumb" href="../">← ${esc(dirs.get(parent)?.title || titleCase(parent.split('/').pop()))}</a><h1>${esc(r.title || data.title)}</h1><p class="lede">${esc(r.summary || data.summary)}</p></header>${body}`, '', navFor(r.path, 'reference', parent)));
}

// Playground pages live beside Reference on the paths that have a playground (PLAY is defined above).
// One segment per check, in lesson order: its progress key, the step anchor and a label (for the course page).
const segmentsOf = (l) => l.steps.filter((s) => !s.config.tier).flatMap((s) => {
  const bare = s.title.replace(/^(Predict|Run|Investigate|Modify|Make|Info):\s*/i, '');
  const step = bare.charAt(0).toUpperCase() + bare.slice(1);
  const stage = s.config.stage || 'info';
  return s.tasks.length
    ? s.tasks.filter((t) => t.config.check).map((t) => ({ key: `${l.slug}/${t.id}`, href: `#${s.id}`, label: s.tasks.length > 1 ? `${step} › ${t.title}` : step, stage }))
    : s.config.check ? [{ key: `${l.slug}/${s.id}`, href: `#${s.id}`, label: step, stage }] : [];
});
// Steps with a width tier (typical, wider) are extra contexts: their checks are not needed to finish a lesson.
const checkKeys = (l) => l.steps.filter((s) => !s.config.tier).flatMap((s) => s.tasks.length ? s.tasks.filter((t) => t.config.check).map((t) => `${l.slug}/${t.id}`) : s.config.check ? [`${l.slug}/${s.id}`] : []);
for (const l of lessons) {
  const parentPath = l.slug.split('/').slice(0, -1).join('/');
  const sibs = lessons.filter((x) => x.slug.split('/').slice(0, -1).join('/') === parentPath);
  const i = sibs.indexOf(l);
  const link = (x) => ({ href: `../${x.slug.split('/').pop()}/`, title: x.title, order: x.order, summary: x.summary });
  buildLesson(l, dirNode(parentPath).title, {
    index: i + 1, total: sibs.length,
    prev: i > 0 ? link(sibs[i - 1]) : null, next: i < sibs.length - 1 ? link(sibs[i + 1]) : null,
    list: sibs.map((x) => ({ ...link(x), checks: checkKeys(x), current: x === l })),
    pathHref: '../', pathTitle: dirNode(parentPath).title,
    playground: PLAY[parentPath] ? '../playground/' : '',
  });
}

// progress-manifest.json: every path's lessons, checks and lesson-claimed snippets, for the "My progress" dialog.
const manifest = { paths: [] };
for (const path of [...new Set(lessons.map((l) => l.slug.split('/').slice(0, -1).join('/')))]) {
  const ls = lessons.filter((l) => l.slug.split('/').slice(0, -1).join('/') === path);
  const kind = PLAY[path]?.kind || null;
  const claims = (kind && claimsByKind[kind]) || {};
  manifest.paths.push({
    title: dirNode(path).title, href: `${path}/`, kind,
    lessons: ls.map((l) => ({ title: l.title, order: l.order, href: `${l.slug}/`, checks: checkKeys(l), optional: l.optional })),
    snippets: Object.entries(claims).map(([id, c]) => ({ id, label: snippetNames[kind]?.[id] || id, lesson: c.lesson, step: c.step })),
  });
}
writeFileSync(join(OUT, 'progress-manifest.json'), JSON.stringify(manifest));
copyFileSync(join('site', 'progress.js'), join(OUT, 'progress.js'));
copyFileSync(join('site', 'trail.js'), join(OUT, 'trail.js')); // the trail map on pathway pages (tools/trail.mjs)
copyFileSync(join('site', 'check.js'), join(OUT, 'check.js')); // the Check your school page (content/check.md)

const sharedModuleNames = Object.keys(loadSharedModules());
for (const [path, pg] of Object.entries(PLAY)) {
  const depth = path.split('/').length + 1; // .../playground/ -> site root
  const up = '../'.repeat(depth);
  const mkPg = pg.kind === 'microbit' || pg.kind === 'arcade';
  const src = `${up}${pg.dir}/index.html?id=${pg.id || (mkPg ? `free/${pg.pkg ? path.split('/').pop() : pg.kind}` : 'free')}&free=1${pg.code ? `&code=${encodeURIComponent(pg.code)}` : ''}&v=${VERSIONS[pg.dir]}${mkPg ? `&target=${pg.kind}` : ''}${pg.pkg ? `&pkg=${encodeURIComponent(pg.pkg)}` : ''}${pg.kind === 'turtle' && sharedModuleNames.length ? `&use=${sharedModuleNames.join(',')}` : ''}`;
  mkdirSync(join(OUT, path, 'playground'), { recursive: true });
  writeFileSync(join(OUT, path, 'playground', 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(pg.label)} playground</title><style>${PLAYGROUND_PAGE_CSS}${NAV_CSS}</style></head><body>
${navFor(`${path}/playground`, 'playground', path)}
<header class="pgbar"><b>${esc(pg.label)} playground</b><span class="grow"></span>
<button type="button" id="unlock" aria-pressed="false" title="Some snippets are for things you haven't learned yet."${mkPg ? ' hidden' : ''}>Unlock all snippets (use this if your progress was lost)</button>${mkPg ? '<span>Your program is saved in this browser.</span>' : ''}</header>
<iframe title="${esc(pg.label)} playground" src="${esc(src)}"></iframe>
<script>
(function(){var KEY='wp-progress',b=document.getElementById('unlock');
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}}
function paint(){var on=!!load().free;b.setAttribute('aria-pressed',String(on));b.textContent=on?'Re-lock snippets':'Unlock all snippets (use this if your progress was lost)'}
b.addEventListener('click',function(){var p=load();p.free=!p.free;try{localStorage.setItem(KEY,JSON.stringify(p))}catch(e){}paint();
var f=document.querySelector('iframe');try{f.contentWindow.dispatchEvent(new StorageEvent('storage',{key:KEY}))}catch(e){}});
paint()})();
${NAV_JS}
</script></body></html>`);
}

for (const node of dirs.values()) {
  const isRoot = node.path === '';
  const parentPath = node.path.split('/').slice(0, -1).join('/');
  const crumb = isRoot ? '' : `<a class="crumb" href="../">← ${esc(dirNode(parentPath).title)}</a>`;
  const ref = REFS.find((r) => r.path === `${node.path}/reference`);
  const play = PLAY[node.path];
  const items = (play ? `<li><a href="playground/"><b>Playground</b><span>Free play: write and run your own ${esc(play.label)} code.</span></a></li>` : '') + (ref ? `<li><a href="reference/"><b>Reference</b><span>Every command and tag in the playground, with what it does.</span></a></li>` : '') + (node.path === 'code' ? `<li><a href="create/"><b>Create a lesson</b><span>Write or paste a lesson, preview it with a live playground, and download it.</span></a></li>` : '') + [...node.kids.entries()].sort(([an, a], [bn, b]) => (a.order ?? Infinity) - (b.order ?? Infinity) || an.localeCompare(bn)).map(([name, k]) => `<li><a href="${esc(name)}/"><b>${k.kind === 'lesson' && k.order != null ? `${k.order}. ` : ''}${esc(k.title)}</b>${k.summary ? `<span>${esc(k.summary)}</span>` : ''}</a></li>`).join('');
  const outDir = join(OUT, node.path);
  mkdirSync(outDir, { recursive: true });
  const up = '../'.repeat(node.path ? node.path.split('/').length : 0);
  const courseLessons = lessons.filter((l) => l.slug.split('/').slice(0, -1).join('/') === node.path);
  if (courseLessons.length && !isRoot) {
    // A course page: progress first. Continue card, one compact row per lesson with a segment per check
    // (filled from this browser's progress by progress.js), and the playground and reference as small links.
    const tools = (play ? `<a class="chip" href="playground/">Playground</a>` : '') + (ref ? `<a class="chip" href="reference/">Reference</a>` : '');
    // One collapsed row per lesson: the whole sequence is visible; opening a row shows its steps.
    const row = (l) => {
      const segs = segmentsOf(l), name = l.slug.split('/').pop();
      const mini = segs.length ? `<span class="segs" aria-hidden="true">${segs.map((g) => `<i class="seg" data-key="${esc(g.key)}" style="--c:var(--${esc(g.stage)})"></i>`).join('')}</span>` : '';
      const steps = segs.length ? `<ol class="csteps">${segs.map((g) => `<li><a href="${esc(name)}/${g.href}"><i class="sdot" data-key="${esc(g.key)}" style="--c:var(--${esc(g.stage)})"></i>${esc(g.label)}</a></li>`).join('')}</ol>` : '';
      return `<details class="crow" data-keys="${esc(segs.map((g) => g.key).join('|'))}" data-hrefs="${esc(segs.map((g) => `${name}/${g.href}`).join('|'))}" data-labels="${esc(segs.map((g) => g.label).join('|'))}" data-href="${esc(name)}/" data-title="${esc(`${l.order != null ? `${l.order}. ` : ''}${l.title}`)}"${l.optional ? ' data-optional="1"' : ''}>` +
        `<summary><span class="cnum">${l.order ?? ''}</span><span class="ctitle">${esc(l.title.replace(/^Optional:\s*/, ''))}${l.optional ? ' <em class="opt">Optional</em>' : ''}</span>${mini}<span class="cstat">${segs.length ? 'Not started' : ''}</span></summary>` +
        `<div class="cbody">${l.summary ? `<p class="csum">${esc(l.summary)}</p>` : ''}${steps}<a class="cgo" href="${esc(name)}/">Start lesson</a></div></details>`;
    };
    // Units (from the course's index.md) group the lessons; lessons without a unit go last.
    const units = Array.isArray(node.meta?.units) ? node.meta.units : [];
    const groups = units.map((u) => ({ ...u, lessons: courseLessons.filter((l) => l.unit === u.id) })).filter((g) => g.lessons.length);
    const loose = courseLessons.filter((l) => !units.some((u) => u.id === l.unit));
    if (loose.length) groups.push({ id: '', title: units.length ? 'More lessons' : '', lessons: loose });
    const rows = groups.map((g) => `<section class="unit"${g.id ? ` data-unit="${esc(g.id)}"` : ''}>` +
      (g.title ? `<div class="uhead"><h2>${esc(g.title)}</h2><span class="ustat"></span>${g.summary ? `<p>${esc(g.summary)}</p>` : ''}</div>` : '') +
      `<div class="urows">${g.lessons.map(row).join('')}</div></section>`).join('');
    const challenge = node.meta?.challenge ? `<span class="badge" id="badge" data-unit="${esc(node.meta.challenge)}" hidden>★ Challenge complete</span>` : '';
    const hasChecks = courseLessons.some((l) => segmentsOf(l).length);
    writeFileSync(join(outDir, 'index.html'), page(node.title,
      `<header class="top">${crumb}<div class="ctop"><h1>${esc(node.title)}</h1><nav class="chips" aria-label="Tools">${tools}</nav></div>${node.summary ? `<p class="lede">${esc(node.summary)}</p>` : ''}${challenge}</header>` +
      (hasChecks ? `<a class="continue" id="continue" href="${esc(courseLessons[0].slug.split('/').pop())}/"><span class="ck">Start</span><b>${esc(`${courseLessons[0].order != null ? `${courseLessons[0].order}. ` : ''}${courseLessons[0].title}`)}</b><span class="cstep"></span></a>` : '') +
      `<div class="course" id="course" data-kind="${play?.kind || ''}">${rows}</div>` +
      (hasChecks ? `<p class="cfoot" id="cfoot">Progress is saved in this browser only. Nothing is sent anywhere.</p>` : '') +
      (courseLessons.some((l) => l.teacher) ? `<p class="ptools">For teachers: <a href="${up}teach/${node.path}/">Teacher guide</a> (notes, answers, solutions, slides and worksheets)</p>` : ''),
      `<script src="${up}progress.js" data-root="${up}" defer></script>`, navFor(node.path, 'course', node.path)));
    continue;
  }
  // A folder with pathways (code/index.md): each pathway lists its courses in order, foundations then
  // extensions; planned courses show as "Coming later" so the whole pathway is visible.
  const pathways = Array.isArray(node.meta?.pathways) ? node.meta.pathways : [];
  if (pathways.length) {
    // after: courses to do first, by path (built) or id (planned), shown on the card.
    const all = pathways.flatMap((pw) => pw.courses || []);
    const nameOf = (ref) => { const c = all.find((x) => x.path === ref || x.id === ref); if (!c) throw new Error(`${node.path}/index.md: "after: ${ref}" names no course`); return c.path ? dirs.get(c.path)?.title || c.path : c.title; };
    const after = (c) => (Array.isArray(c.after) && c.after.length ? `<small class="pafter">After: ${esc(c.after.map(nameOf).join(' and '))}</small>` : '');
    // up: from the page being written back to the site root, so course links work from any depth.
    const card = (c, up) => {
      if (c.path) {
        const d = dirs.get(c.path);
        if (!d) throw new Error(`${node.path}/index.md: pathway course "${c.path}" is not a folder of lessons`);
        const tag = d.meta?.tagline || c.tagline;
        return `<a class="pcard" href="${esc(up + c.path)}/"><b>${esc(d.title)}</b>${tag ? `<span class="ptag">${esc(tag)}</span>` : ''}${d.summary ? `<span>${esc(d.summary)}</span>` : ''}${after(c)}</a>`;
      }
      return `<div class="pcard soon"><b>${esc(c.title)}</b>${c.tagline ? `<span class="ptag">${esc(c.tagline)}</span>` : ''}${c.summary ? `<span>${esc(c.summary)}</span>` : ''}${after(c)}<em>Coming later</em></div>`;
    };
    const stage = (courses, name, label, up) => { const cs = courses.filter((c) => (c.stage || 'foundations') === name); return cs.length ? `<div class="pstage"><h3>${label}</h3><div class="pcards">${cs.map((c) => card(c, up)).join('')}</div></div>` : ''; };
    const stages = (pw, up) => stage(pw.courses || [], 'foundations', 'Foundations', up) + stage(pw.courses || [], 'extensions', 'Extensions', up);
    const upHere = '../'.repeat(node.path ? node.path.split('/').length : 0);
    const body = pathways.map((pw) => `<section class="pathway" id="${esc(pw.id || '')}"><h2><a href="paths/${esc(pw.id)}/">${esc(pw.title)}</a></h2>${pw.summary ? `<p class="psum">${esc(pw.summary)}</p>` : ''}` +
      stages(pw, upHere) + `</section>`).join('');
    const create = node.path === 'code' ? `<p class="ptools">For teachers: <a href="create/">Create a lesson</a></p>` : '';
    writeFileSync(join(outDir, 'index.html'), page(node.title,
      `<header class="top">${crumb}<h1>${esc(node.title)}</h1>${node.summary ? `<p class="lede">${esc(node.summary)}</p>` : ''}</header>${body}${create}`,
      `<script src="${up}progress.js" data-root="${up}" defer></script>`, navFor(node.path, 'home')));
    // One page per pathway: <subject>/paths/<id>/, with its courses in order and the planned ones as placeholders.
    for (const pw of pathways) {
      const pp = `${node.path}/paths/${pw.id}`, pup = '../'.repeat(pp.split('/').length);
      const built = (pw.courses || []).some((c) => c.path);
      const others = pathways.filter((x) => x !== pw).map((x) => `<a href="../${esc(x.id)}/">${esc(x.title)}</a>`).join(' · ');
      mkdirSync(join(OUT, pp), { recursive: true });
      // trail: true in the subject's index.md turns the map on (Code for now; maths and science later).
      const useTrail = node.meta?.trail === true;
      if (useTrail) for (const c of pw.courses || []) if (!(c.tagline || (c.path && dirs.get(c.path)?.meta?.tagline))) console.warn(`  ! ${node.path}/index.md: pathway ${pw.id}: ${c.path || c.id || c.title} has no tagline (the line students see on the trail map)`);
      // Trail map (students, the default) and list (teachers: about, what each course covers). The choice
      // is remembered per browser; without JavaScript the list shows. tools/trail.mjs, site/trail.js.
      const trail = useTrail && trailHtml(layoutTrail(pw, pathways, dirs, (path) => lessons.filter((l) => l.slug.split('/').slice(0, -1).join('/') === path && !l.optional).length), pup, esc);
      const view = `<script>(function(){var d=document.documentElement;d.classList.add('js-on');try{if(localStorage.getItem('wp-pathview')!=='list')d.classList.add('trail-on')}catch(e){d.classList.add('trail-on')}})()</script>` +
        `<div class="ptoggle" role="group" aria-label="View"><button type="button" data-view="map">Trail map</button><button type="button" data-view="list">List for teachers</button></div>`;
      writeFileSync(join(OUT, pp, 'index.html'), page(`${pw.title}: ${node.title}`,
        (useTrail ? `<style>${TRAIL_CSS}</style>` : '') + `<header class="top"><a class="crumb" href="../../">← ${esc(node.title)}</a><h1>${esc(pw.title)}</h1>${pw.summary ? `<p class="lede">${esc(pw.summary)}</p>` : ''}</header>` +
        (useTrail ? view + `<div class="pview-map">${trail}</div>` : '') + `<div class="pview-list">` +
        (pw.about ? `<div class="pabout">${new Marked().parse(String(pw.about))}</div>` : '') +
        (built ? '' : `<p class="pnote">Nothing to open here yet: these courses are being written. The other pathways teach the same big ideas, so you can start there.</p>`) +
        `<section class="pathway">${stages(pw, pup)}</section></div>` +
        (others ? `<p class="ptools">Other pathways: ${others}</p>` : ''),
        `<script src="${pup}progress.js" data-root="${pup}" defer></script>` + (useTrail ? `<script src="${pup}trail.js" data-root="${pup}" defer></script>` : ''), navFor(pp, 'home')));
    }
    continue;
  }
  // The home page (content/index.md) can carry an about: section (Markdown) above the subjects.
  const homeAbout = isRoot && node.meta?.about ? `<div class="pabout home-about">${new Marked().parse(String(node.meta.about))}</div><h2 class="home-subjects">Choose a subject</h2>` : '';
  writeFileSync(join(outDir, 'index.html'), page(isRoot ? 'Waypoints tutorials' : node.title,
    `<header class="top">${crumb}<h1>${esc(isRoot ? 'Waypoints tutorials' : node.title)}</h1>${node.summary ? `<p class="lede">${esc(node.summary)}</p>` : ''}</header>${homeAbout}<ul class="lessons">${items}</ul>`, `<script src="${up}progress.js" data-root="${up}" defer></script>`, navFor(node.path, 'home')));
}

// ---------- plain pages: content/<name>.md (besides index.md) becomes /<name>/ (approach, behind-the-scenes) ----------
for (const f of readdirSync(CONTENT_ROOT).filter((n) => n.endsWith('.md') && n !== 'index.md')) {
  const name = f.replace(/\.md$/, '');
  const raw = readFileSync(join(CONTENT_ROOT, f), 'utf8').replace(/\r\n/g, '\n');
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta = fm ? (YAMLparse(fm[1]) || {}) : {};
  const title = meta.title || titleCase(name);
  const body = new Marked().parse(fm ? raw.slice(fm[0].length) : raw);
  mkdirSync(join(OUT, name), { recursive: true });
  writeFileSync(join(OUT, name, 'index.html'), page(title,
    `<header class="top"><a class="crumb" href="../">← Tutorials</a><h1>${esc(title)}</h1>${meta.summary ? `<p class="lede">${esc(meta.summary)}</p>` : ''}</header><div class="pabout approach">${body}</div>`,
    '', navFor(name, 'home')));
}

// ---------- teacher guide: /teach/<course>/ and /teach/<lesson>/ with decks, worksheets and cheat sheets ----------
const tmd = new Marked();
const md = (t) => tmd.parse(String(t || ''));
// Maths lessons' guides render $...$ like the lesson page does (text and markdown both).
const mmd = new Marked().use(markedMath);
const mathsGuide = { md: (t) => mmd.parse(String(t || '')), esc: (t) => textWithMath(t, esc) };
const snippetById = new Map(Object.values(snippetFiles).flatMap((d) => d.groups.flatMap((g) => g.items.map((i) => [snippetId(i.label), i]))));
const teachCourses = [...new Set(lessons.filter((l) => l.teacher).map((l) => l.slug.split('/').slice(0, -1).join('/')))];
const teachPage = (title, body, pagePath, coursePath) => page(title, `<style>${TEACH_CSS}</style>${body}`, `<script>${TEACH_JS}</script>`, navFor(pagePath, 'home', coursePath));
for (const coursePath of teachCourses) {
  const node = dirNode(coursePath);
  const ls = lessons.filter((l) => l.slug.split('/').slice(0, -1).join('/') === coursePath);
  const units = Array.isArray(node.meta?.units) ? node.meta.units : [];
  const unitOf = (l) => units.find((u) => u.id === l.unit);
  const courseDir = join(OUT, 'teach', coursePath);
  mkdirSync(courseDir, { recursive: true });
  for (const l of ls.filter((x) => x.teacher)) {
    const dir = join(OUT, teachPath(l));
    mkdirSync(dir, { recursive: true });
    const snip = (ref) => getSnippet(l.dir, ref);
    const ctx = { course: node.title, unit: unitOf(l)?.title || '', snip, blocks: (code) => blocksPic(code, `${SITE_URL}/`) };
    writeFileSync(join(dir, 'deck.md'), deckFor(l, ctx));
    writeFileSync(join(dir, 'worksheet.md'), worksheetFor(l, ctx));
    const files = [
      { label: 'Slides', href: 'deck.md', url: `${SITE_URL}/${teachPath(l)}deck.md`, note: 'Present from the browser, or export to PowerPoint or PDF.' },
      { label: 'Worksheet', href: 'worksheet.md', url: `${SITE_URL}/${teachPath(l)}worksheet.md`, note: 'Print the student copy; the Teacher edition has the answers.' },
    ];
    const isM = l.language === 'maths';
    const body = lessonGuideBody(l, { esc: isM ? mathsGuide.esc : esc, md: isM ? mathsGuide.md : md, snip, highlightCode, codeBlock, studentHref: `${'../'.repeat(l.depth + 1)}${l.slug}/`, course: node.title, unit: ctx.unit, files, blocks: (code) => blocksPic(code, '../'.repeat(teachPath(l).split('/').filter(Boolean).length)) });
    const katexCss = isM ? `<link rel="stylesheet" href="${'../'.repeat(l.depth + 1)}_katex/katex.min.css">` : '';
    writeFileSync(join(dir, 'index.html'), teachPage(`Teacher guide: ${l.title}`, katexCss + body, `teach/${l.slug}`, coursePath));
  }
  // Printable cheat sheets: one per unit, and one for the whole course.
  // Snippets for this course's language only, and the code students see in each lesson.
  const mathsCourse = ls.some((l) => l.language === 'maths');
  // Science courses have no commands to list, so no cheat sheets (the primers carry the key ideas).
  const sheets = units.length && !ls.some((l) => l.language === 'science');
  // MakeCode courses: the kind is the playground the lessons use (a Predict step has none).
  const kind = !ls[0] ? 'turtle' : ls[0].language === 'makecode'
    ? (ls.flatMap((l) => l.steps).map((s) => s.config.try?.playground).find((k) => k === 'microbit' || k === 'arcade') || 'microbit')
    : unlockKind(ls[0], ls[0].steps[0] || { config: {} });
  // Pictures of this course's snippets: Arcade blocks sit apart from micro:bit ones (PICS.arcade).
  const picKey = kind === 'arcade' ? 'arcade' : (ls[0]?.language || 'python');
  // Robot lessons use the robot blocks (snippets/robot.json) first, then the micro:bit ones they build on.
  const robotCourse = ls.some((l) => makecodeExtensions(l).some((e) => e.name === 'microbit-robot'));
  const courseSnips = new Map([...(robotCourse ? [snippetFiles.robot] : []), snippetFiles[kind]].flatMap((f) => f?.groups || []).flatMap((g) => g.items.map((i) => [snippetId(i.label), i])));
  // MakeCode lessons ask students to add blocks their starters do not have yet (show leds, a parameter), so their
  // solutions count too: a cheat sheet lists blocks, never a task's answer.
  const codeOf = (l) => [...l.steps.flatMap((s) => [s.config.code, s.config.try?.starter, ...s.tasks.flatMap((t) => [t.config.code, t.config.starter, t.config.try?.starter])]),
    ...(l.language === 'makecode' ? Object.values(l.teacher?.solutions || {}) : [])]
    .filter((r) => typeof r === 'string').map((r) => { try { return getSnippet(l.dir, r); } catch { return ''; } });
  const unitSeen = new Set();
  const unitItems = Object.fromEntries(units.map((u) => [u.id, mathsCourse
    ? (MATHS_CARDS.find((m) => m.course === coursePath)?.cards.filter((c) => c.unit === u.id) || [])
    : unitSnippets(ls.filter((l) => l.unit === u.id), courseSnips, unitSeen, codeOf)]));
  // dir is relative to OUT. Teacher copies sit in /teach/ with Prepare links; student copies sit under the
  // course's Reference (reference/print/) and link only back to it, so students are never one click from answers.
  const cheatPage = ({ dir, title, sections, back, backLabel, mdName = '', mdUrl = '', nav = '', here = 'home' }) => {
    mkdirSync(join(OUT, dir), { recursive: true });
    const up = '../'.repeat(dir.split('/').length);
    const body = mathsCourse
      ? `<link rel="stylesheet" href="${up}_katex/katex.min.css">` + mathsCheatBody({ title, course: node.title, sections, pictures: PICS.maths.pics, picBase: `${up}${PICS.maths.dir}`, esc, back, backLabel, md: mdName, mdUrl, nav })
      : cheatSheetBody({ title, course: node.title, sections, pictures: picsFor(picKey).pics, picBase: `${up}${picsFor(picKey).dir}`, esc, highlightCode, back, backLabel, md: mdName, mdUrl, nav, lang: ls[0]?.language || 'python' });
    writeFileSync(join(OUT, dir, 'index.html'), page(title, `<style>${TEACH_CSS}${CHEAT_CSS}${mathsCourse ? MATHS_CARD_CSS : ''}</style>${body}`, `<script>${TEACH_JS}</script>`, navFor(dir, here, coursePath)));
  };
  // A row of links between the whole-course sheet and each unit's (base: the folder holding them).
  const sheetNav = (base, current) => units.length ? `<nav class="cs-nav" aria-label="Cheat sheets">${[['', 'Whole course'], ...units.map((u) => [u.id, u.title])].map(([id, t]) => {
    const href = `${base}${id ? `${id}/` : ''}`;
    return id === current ? `<b>${esc(t)}</b>` : `<a href="${esc(href)}">${esc(t)}</a>`;
  }).join(' · ')}</nav>` : '';
  if (sheets) {
    const all = units.map((u) => ({ title: u.title, items: unitItems[u.id] }));
    cheatPage({ dir: `teach/${coursePath}/cheatsheet`, title: `${node.title}: cheat sheet`, sections: all, back: '../', backLabel: 'Teacher guide' });
    if (REFS.some((r) => r.path === `${coursePath}/reference`)) {
      const base = `${coursePath}/reference/print`;
      cheatPage({ dir: base, title: `${node.title}: cheat sheet`, sections: all, back: '../', backLabel: 'Reference', nav: sheetNav('./', ''), here: 'reference' });
      for (const u of units) cheatPage({ dir: `${base}/${u.id}`, title: `${u.title}: cheat sheet`, sections: [{ title: u.title, items: unitItems[u.id] }], back: '../../', backLabel: 'Reference', nav: sheetNav('../', u.id), here: 'reference' });
    }
  }
  // Course guide: how to use it, then each unit with its primer, cheat sheet and lessons. A maths course renders $...$ in primers.
  const unitBlocks = (units.length ? units : [{ id: '', title: 'Lessons' }]).map((u) => {
    const mine = ls.filter((l) => (u.id ? l.unit === u.id : true));
    if (!mine.length) return '';
    let primer = '';
    const pf = join(CONTENT_ROOT, coursePath, 'primers', `${u.id}.md`);
    if (u.id && existsSync(pf)) {
      const raw = readFileSync(pf, 'utf8').replace(/\r\n/g, '\n');
      const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
      const title = m ? (m[1].match(/^title:\s*(.*)$/m) || [])[1] : '';
      primer = `<details class="primer"><summary><b>${esc(title || `${u.title}: primer`)}</b> (read before teaching this unit)</summary>${(mathsCourse ? mathsGuide.md : md)(m ? raw.slice(m[0].length) : raw)}</details>`;
    }
    let cheat = '';
    if (u.id && sheets) {
      const sheet = mathsCourse ? mathsCheatMd({ course: node.title, unit: u, items: unitItems[u.id] }) : cheatSheetFor({ course: node.title, unit: u, items: unitItems[u.id], lang: ls[0]?.language || 'python', picture: (id) => (ls[0]?.language === 'makecode' && picsFor(picKey).pics[id] ? `${SITE_URL}/${picsFor(picKey).dir}${id}.png?v=${picsFor(picKey).pics[id].hash || ''}` : null) });
      writeFileSync(join(courseDir, `cheatsheet-${u.id}.md`), sheet);
      const url = `${SITE_URL}/teach/${coursePath}/cheatsheet-${u.id}.md`;
      cheatPage({ dir: `teach/${coursePath}/cheatsheet-${u.id}`, title: `${u.title}: cheat sheet`, sections: [{ title: u.title, items: unitItems[u.id] }], back: '../', backLabel: 'Teacher guide', mdName: `../cheatsheet-${u.id}.md`, mdUrl: url });
      cheat = `<p>Cheat sheet: <a href="cheatsheet-${esc(u.id)}/">Open to print</a> <span class="muted">(A4, ${mathsCourse ? 'with board pictures' : 'with a picture of what each command draws'})</span> · <a href="cheatsheet-${esc(u.id)}.md" download>Markdown</a> <button type="button" class="copyurl" data-url="${esc(url)}">Copy address for Prepare</button></p>`;
    }
    const rows = mine.map((l) => l.teacher
      ? `<li><a href="${esc(l.slug.split('/').pop())}/">${esc(`${l.order != null ? `${l.order}. ` : ''}${l.title}`)}</a>${l.optional ? ' <span class="muted">(optional)</span>' : ''} <span class="muted">· <a href="${esc(l.slug.split('/').pop())}/deck.md" download>slides</a> · <a href="${esc(l.slug.split('/').pop())}/worksheet.md" download>worksheet</a></span></li>`
      : `<li>${esc(l.title)} <span class="muted">(teacher notes coming)</span></li>`).join('');
    return `<section class="tunit"><h2>${esc(u.title)}</h2>${u.summary ? `<p class="muted">${esc(u.summary)}</p>` : ''}${primer}${cheat}<ul>${rows}</ul></section>`;
  }).join('');
  const intro = `<p>Each lesson works two ways. Students can work through the online tutorial at their own pace (it checks their answers and saves their progress in their browser), or you can teach it to the whole class from the slides, then send students into the tutorial for the Modify and Make steps.</p><p>Every lesson guide has plain-language notes, the answers to every check, a solution for every task, and slides and a worksheet for <a href="https://prepare.learningwaypoints.com/" target="_blank" rel="noopener">Waypoints Prepare</a>. These guide pages are not linked from student pages, but they are not secret either: keep printed Teacher editions for answers you do not want students to find.</p>`;
  writeFileSync(join(courseDir, 'index.html'), teachPage(`Teacher guide: ${node.title}`, `${mathsCourse ? `<link rel="stylesheet" href="${'../'.repeat(coursePath.split('/').length + 1)}_katex/katex.min.css">` : ''}<header class="top"><a class="crumb" href="${'../'.repeat(coursePath.split('/').length)}">← Teacher guides</a><h1>Teacher guide: ${esc(node.title)}</h1><p class="lede">${esc(node.summary)}</p><p class="tmeta"><a href="${'../'.repeat(coursePath.split('/').length + 1)}${coursePath}/">Open the student course</a></p></header>${intro}${sheets ? `<p><b>Whole-course cheat sheet:</b> <a href="cheatsheet/">Open to print</a> <span class="muted">(every command, grouped by unit: a handout for the final challenge)</span></p>` : ''}${unitBlocks}`, `teach/${coursePath}`, coursePath));
}
mkdirSync(join(OUT, 'teach'), { recursive: true });
writeFileSync(join(OUT, 'teach', 'index.html'), teachPage('Teacher guides', `<header class="top"><h1>Teacher guides</h1><p class="lede">Notes, answers, solutions, slides and worksheets for each course.</p></header><ul class="lessons">${teachCourses.map((c) => `<li><a href="${esc(c)}/"><b>${esc(dirNode(c).title)}</b><span>${esc(dirNode(c).summary)}</span></a></li>`).join('')}</ul>`, 'teach', null));

writeFileSync(join(OUT, '.nojekyll'), '');

const missing = lessons.flatMap((l) => l.steps.filter((s) => s.config.clip && !existsSync(join(OUT, l.slug, 'clips', `${s.id}.mp4`))).map((s) => `${l.slug}/${s.id}`));
console.log(`Built ${lessons.length} lesson(s) into ${OUT}/` + (missing.length ? `; ${missing.length} clip placeholder(s): ${missing.join(', ')}` : '; all clips present'));
