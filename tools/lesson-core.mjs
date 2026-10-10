// Pure lesson logic shared by the Node build and the in-browser /create/ page: no fs, no DOM.
// `read(file)` returns the text of a lesson-relative file (or undefined if missing).
import YAML from 'yaml';
import { scanModule } from './modules-scan.mjs';
import { MATH } from './math-expr.mjs';

export const STAGES = ['predict', 'run', 'investigate', 'modify', 'practise', 'make', 'info'];
export const VERBS = ['caption', 'show', 'clear', 'run', 'type', 'click', 'press', 'expect', 'wait'];
export const LAYOUTS = ['split', 'full'];
/** Voiceover (frontmatter `voice:`): Kokoro voices graded A to C on its model card; US and UK English only. */
export const VOICES = ['af_heart', 'af_bella', 'bf_emma', 'am_fenrir', 'am_michael', 'bm_george', 'bm_fable'];
export const DEFAULT_VOICE = 'af_heart';
/** A spoken line longer than this many words gets a validate warning: one sentence keeps clips short. */
export const SAY_MAX_WORDS = 15;
/** Frontmatter `voice:` -> { name, speed } or null. Accepts true, a voice name, or { name, speed }. */
export function voiceSpec(v) {
  if (!v) return null;
  if (v === true) return { name: DEFAULT_VOICE, speed: 1 };
  if (typeof v === 'string') return { name: v, speed: 1 };
  if (typeof v === 'object' && !Array.isArray(v)) return { name: v.name || DEFAULT_VOICE, speed: Number(v.speed) || 1 };
  return null;
}
/** A caption action is a string, or { text, say } when the voice should say a fuller line than the caption shows. */
export const captionText = (v) => (v && typeof v === 'object' ? String(v.text ?? '') : String(v ?? ''));
export const captionSay = (v) => (v && typeof v === 'object' && v.say !== undefined ? String(v.say) : captionText(v));
// board: interactive diagrams (balance, machine, graph…); maths is its old name and still works.
export const PLAYGROUND_KINDS = ['turtle', 'python', 'html', 'board', 'maths', 'microbit', 'arcade', 'science'];
const isBoard = (pg) => ['board', 'maths', 'science'].includes(pg);
/** What a board check can expect from a board's report: the board (balance, machine), and the science board (done: the widget's task is finished). Newer boards use when: conditions. */
export const BOARD_KEYS = ['balanced', 'solved', 'x'];
export const SCIENCE_BOARD_KEYS = ['done'];
/** Width tiers (the XY Model): a step marked typical or wider adds contexts beyond the minimum path; students can widen, not narrow. */
export const TIERS = ['minimum', 'typical', 'wider'];
/** Playgrounds that host the MakeCode editor: students build with blocks, which always compile to MakeCode JavaScript (main.ts). */
export const MAKECODE_KINDS = ['microbit', 'arcade'];
/**
 * MakeCode extensions a lesson can name (frontmatter `extensions: [robot]`). Each is added to every step's project
 * (pxt.json dependencies) and to the blocks renderer, so the lesson's blocks and the extension's simulator both work.
 * Pin a released tag: a new version must not change lessons under students' feet.
 *   robot: Microsoft's microbit-robot (two-wheeled robots such as the Elecfreaks Cutebot), with its robot simulator.
 *   ml: micro:bit CreateAI's Machine Learning blocks, with practice actions (see below).
 * wide: the editor opens full screen (MakeCode hides extension simulators in a narrow window).
 * noSimPicture: skip "What it makes" pictures (render-pictures screenshots the micro:bit, not the extension's simulator).
 */
export const MAKECODE_EXTENSIONS = {
  robot: { name: 'microbit-robot', version: 'github:microsoft/microbit-robot#v2.7.4', target: 'microbit', wide: true, noSimPicture: true },
  // ml: micro:bit CreateAI's Machine Learning blocks with practice actions (still, walking, running, jumping, waving,
  // clapping) from this repo's makecode-ext/ml-events (a nested GitHub extension, pinned by the commit that last changed it: this sandbox can't push tags), so lessons can use the
  // blocks and the ML simulator panel without a trained model. It brings machine-learning in as its dependency.
  ml: { name: 'waypoints-ml-events', version: 'github:cggs-matthew-pham/tutorials/makecode-ext/ml-events#9d016cb3d6bbef4e344f9066d477a9f4fbcc4382', target: 'microbit', wide: true, noSimPicture: true },
};
/** The extension settings a lesson uses (known keys only). */
export const makecodeExtensions = (lesson) => (Array.isArray(lesson?.extensions) ? lesson.extensions : []).map((k) => MAKECODE_EXTENSIONS[k]).filter(Boolean);
/** A lesson's extensions as MakeCode's package string ("name=version,name=version"), or '' for none. */
export const makecodePackage = (lesson) => makecodeExtensions(lesson).map((e) => `${e.name}=${e.version}`).join(',');
export const CHECK_TYPES = ['reflect', 'question', 'code', 'number', 'bug', 'match', 'trace', 'parsons', 'predict', 'answer', 'board', 'sort', 'flag', 'working', 'reasoning'];
// What kind of fault an error item plants (bug, and error-based question or predict): see AUTHORING.md "Error tasks".
export const FAULTS = ['syntax', 'runtime', 'logic', 'design'];

/**
 * A trace table written as a small pipe table: first row is the header, cells in [brackets] are the blanks
 * students fill in (the bracket holds the answer). Returns { head: [..], rows: [[{v, blank}]] }.
 */
export function parseTrace(text) {
  const rows = String(text).split('\n').map((l) => l.trim()).filter(Boolean).map((l) => l.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim()));
  if (rows.length < 2) throw new Error('needs a header row and at least one data row');
  const head = rows.shift();
  const body = rows.map((r) => {
    if (r.length !== head.length) throw new Error(`every row needs ${head.length} cells (found a row with ${r.length})`);
    return r.map((c) => { const m = c.match(/^\[(.*)\]$/); return m ? { v: m[1].trim(), blank: true } : { v: c, blank: false }; });
  });
  if (!body.some((r) => r.some((c) => c.blank))) throw new Error('needs at least one blank, written in [brackets] with its answer inside');
  return { head, rows: body };
}
export const CODE_RULES = ['defs', 'calls', 'loops', 'returns', 'params', 'imports', 'uses', 'contains', 'tags', 'inside', 'count'];
/** Code rules the HTML playground can check (HTML has no functions or loops). */
export const HTML_RULES = ['contains', 'tags'];
/** Code rules the MakeCode playgrounds can check (read from main.ts, the JavaScript the blocks compile to). */
export const MAKECODE_RULES = ['contains', 'inside', 'count', 'defs', 'calls', 'params'];

/**
 * Evaluates a code check's rules against the student's code (all their files joined). Pure and
 * self-contained: the lesson page inlines this function's source, so it must not use anything outside itself.
 * Rules: defs (functions defined), calls (one of the student's functions called this many times, in the text),
 * loops (for/while lines), returns (return lines), params (one function with this many parameters),
 * imports (list of module names), uses (list of names that must appear, such as pencolor). Returns [{ label, ok }].
 */
export function evalRules(rules, text, kind) {
  // kind 'html': HTML and CSS (comments are <!-- --> and /* */; # is a colour or a link, not a comment; case does not matter).
  if (kind === 'html') {
    const src = String(text).replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '').toLowerCase();
    const out = [];
    (rules.tags || []).forEach((t) => out.push({ label: `Use <${t}>`, ok: new RegExp('<' + String(t).toLowerCase() + '[\\s>/]').test(src) }));
    const flatH = src.replace(/\s+/g, '');
    (rules.contains || []).forEach((frag) => out.push({ label: `Your code has ${frag}`, ok: flatH.includes(String(frag).toLowerCase().replace(/\s+/g, '')) }));
    return out;
  }
  // kind 'microbit' / 'arcade': MakeCode JavaScript (main.ts). Comments are // and /* */; everything is compared with
  // spaces removed, so `basic.forever(function () {` and `basic.forever(function(){` match.
  //   inside: { "basic.forever": [fragments] }   fragments in the first { ... } block after each place the key appears
  //   count: { "basic.show": 3 }                 a fragment appears at least this many times
  //   defs / params / calls                      named functions (`function name (points: number)`); event blocks
  //                                              are anonymous `function ()`, so they never count as a definition
  // Labels are for teachers and the validator; students working in blocks see the check's own text instead.
  if (kind === 'microbit' || kind === 'arcade') {
    const plain = String(text).replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
    const flatM = (s) => String(s).replace(/\s+/g, '');
    const fm = flatM(plain);
    const block = (key) => {
      const out = []; let i = 0; const k = flatM(key);
      while ((i = fm.indexOf(k, i)) >= 0) {
        const j = fm.indexOf('{', i + k.length); if (j < 0) break; let d = 0;
        for (let x = j; x < fm.length; x++) { if (fm[x] === '{') d++; else if (fm[x] === '}' && --d === 0) { out.push(fm.slice(j + 1, x)); break; } }
        i = j;
      }
      return out.join('|');
    };
    const fdefs = []; plain.replace(/function\s+([A-Za-z_]\w*)\s*\(([^)]*)\)/g, (m, n, ps) => { fdefs.push({ name: n, params: ps.split(',').filter((x) => x.trim()).length }); return m; });
    const fcalls = (n) => (plain.match(new RegExp('\\b' + n + '\\s*\\(', 'g')) || []).length - 1;
    const out = [];
    (rules.contains || []).forEach((frag) => out.push({ label: `Has ${frag}`, ok: fm.includes(flatM(frag)) }));
    Object.keys(rules.inside || {}).forEach((key) => { const b = block(key); [].concat(rules.inside[key]).forEach((frag) => out.push({ label: `Inside ${key}: ${frag}`, ok: b.includes(flatM(frag)) })); });
    Object.keys(rules.count || {}).forEach((frag) => out.push({ label: `${frag} at least ${rules.count[frag]} times`, ok: fm.split(flatM(frag)).length - 1 >= rules.count[frag] }));
    if (rules.defs) out.push({ label: `At least ${rules.defs} function${rules.defs === 1 ? '' : 's'} of your own`, ok: fdefs.length >= rules.defs });
    if (rules.params) out.push({ label: `A function with at least ${rules.params} parameter${rules.params === 1 ? '' : 's'}`, ok: fdefs.some((d) => d.params >= rules.params) });
    if (rules.calls) out.push({ label: rules.calls === 1 ? 'Call your function' : `Call one of your functions at least ${rules.calls} times`, ok: Math.max(0, ...fdefs.map((d) => fcalls(d.name))) >= rules.calls });
    return out;
  }
  const code = String(text).split('\n').map((l) => l.replace(/#.*$/, ''));
  const defs = [];
  code.forEach((l) => { const m = l.match(/^\s*def\s+([A-Za-z_]\w*)\s*\(([^)]*)\)/); if (m) defs.push({ name: m[1], params: m[2].split(',').filter((x) => x.trim()).length }); });
  const count = (re) => code.filter((l) => re.test(l)).length;
  const callsOf = (name) => code.filter((l) => !/^\s*def\s/.test(l)).reduce((n, l) => n + (l.match(new RegExp('\\b' + name + '\\s*\\(', 'g')) || []).length, 0);
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
  const out = [];
  if (rules.defs) out.push({ label: `Define at least ${plural(rules.defs, 'function')} with def`, ok: defs.length >= rules.defs });
  if (rules.params) out.push({ label: `Write a function with at least ${plural(rules.params, 'parameter')}`, ok: defs.some((d) => d.params >= rules.params) });
  if (rules.calls) out.push({ label: rules.calls === 1 ? 'Call your function' : `Call one of your functions at least ${rules.calls} times`, ok: Math.max(0, ...defs.map((d) => callsOf(d.name))) >= rules.calls });
  if (rules.loops) out.push({ label: rules.loops === 1 ? 'Use a loop' : `Use at least ${rules.loops} loops`, ok: count(/^\s*(for|while)\b/) >= rules.loops });
  if (rules.returns) out.push({ label: 'Use return to give a value back', ok: count(/^\s*return\b/) >= rules.returns });
  (rules.uses || []).forEach((n) => out.push({ label: `Use ${n}`, ok: code.some((l) => new RegExp('\\b' + n + '\\b').test(l)) }));
  (rules.imports || []).forEach((m) => out.push({ label: `Import from ${m}`, ok: code.some((l) => new RegExp('^\\s*(from|import)\\s+' + m + '\\b').test(l)) }));
  // contains: code fragments that must appear somewhere (spaces ignored, comments skipped), shown as written.
  const flat = code.join('\n').replace(/\s+/g, '');
  (rules.contains || []).forEach((frag) => out.push({ label: `Your code has ${frag}`, ok: flat.includes(String(frag).replace(/\s+/g, '')) }));
  return out;
}

/** Playground features (not snippets) that a step can unlock for the turtle playground. */
export const FEATURES = [
  { id: 'save-as-button', label: 'Save selection as button', hint: 'Turn code the student selects (or a def) into their own button.' },
  { id: 'my-module', label: '+ module (own module file)', hint: 'Let the student write their own module file and import from it.' },
];

/** Stable id for a snippet, from its label: "for loop" -> "for-loop". */
export const snippetId = (label) => String(label).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Which playground (and so which snippet list) a step's unlocks refer to. */
// The Python playground (Pyodide) shares the turtle playground's Python snippets, unlocks and code rules.
export const unlockKind = (lesson, step) => (step.config.try?.playground === 'python' ? 'turtle' : step.config.try?.playground) || (lesson.language === 'html' ? 'html' : lesson.language === 'science' ? 'science' : 'turtle');

export const DEFAULT_PACING = {
  typeCps: 55,        // characters per second when code is "typed" into the stage's code panel
  keyDelayMs: 150,    // delay between keystrokes in app fields
  preRollMs: 700,     // hold before the first action
  postRollMs: 1800,   // hold after the last action
  cursorMs: 800,      // time the pointer takes to travel to a target
  afterActionMs: 450, // beat after each click/type
};


/** Read a code reference "file" or "file#region" via read(file). */
export function snippetFrom(read, ref) {
  const [file, region] = String(ref).split('#');
  const text = read(file);
  if (text === undefined || text === null) throw new Error(`code reference "${ref}": file not found`);
  const lines = String(text).replace(/\r\n/g, '\n').split('\n');
  const marker = /^\s*(?:#|\/\/|<!--|\/\*)\s*(end)?region\b\s*:?\s*([\w-]*)/;
  let out = lines;
  if (region) {
    let on = false;
    out = [];
    for (const line of lines) {
      const m = line.match(marker);
      if (m && !m[1] && m[2] === region) { on = true; continue; }
      if (m && m[1] && on) { on = false; break; }
      if (on) out.push(line);
    }
    if (!out.length) throw new Error(`code reference "${ref}": region "${region}" not found or empty`);
  }
  return out.filter((l) => !marker.test(l)).join('\n').replace(/^\n+|\s+$/g, '') + '\n';
}

/**
 * Split display code into files. A line "# file: name.py" (or "<!-- file: name -->", "// file: name")
 * starts a new file, so several programs show as separate panels and never as one file.
 * Returns [{ name, code }]; code with no marker is one file with name ''.
 */
export function splitFiles(code) {
  const mark = /^\s*(?:#|\/\/|<!--)\s*file:\s*([\w.\-/]+)\s*(?:-->)?\s*$/;
  const files = [];
  let cur = null;
  for (const line of String(code).replace(/\n$/, '').split('\n')) {
    const m = line.match(mark);
    if (m) { cur = { name: m[1], lines: [] }; files.push(cur); continue; }
    if (!cur) { cur = { name: '', lines: [] }; files.push(cur); }
    cur.lines.push(line);
  }
  return files
    .map((f) => ({ name: f.name, code: f.lines.join('\n').replace(/^\n+|\s+$/g, '') + '\n' }))
    .filter((f) => f.name || f.code.trim());
}

/** Bug answers as "line" (one file) or "file:line" (several files) keys, the same keys the page uses. */
export function bugKeys(answer) {
  return (Array.isArray(answer) ? answer : [answer]).map((a) => String(a).trim());
}

/** Parse lesson.md text into a lesson object (no files touched). */
export function parseLessonText(raw, slug = 'lesson') {
  raw = raw.replace(/\r\n/g, '\n');
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!fm) throw new Error(`${slug}: lesson.md must start with --- frontmatter ---`);
  const meta = YAML.parse(fm[1]) || {};
  const rest = raw.slice(fm[0].length);
  const parts = rest.split(/^## /m);
  const intro = parts.shift().trim();
  const steps = parts.map((chunk, i) => {
    const nl = chunk.indexOf('\n');
    const title = (nl === -1 ? chunk : chunk.slice(0, nl)).trim();
    let body = nl === -1 ? '' : chunk.slice(nl + 1);
    let config = {};
    const m = body.match(/```step\n([\s\S]*?)\n```\n?/);
    if (m) {
      config = YAML.parse(m[1]) || {};
      body = body.replace(m[0], '');
    }
    // "### Heading" lines inside a step are its tasks (sub-pills). One or no heading: the step has a single task.
    const secs = body.split(/^### /m);
    const lead = secs.shift();
    let tasks = [];
    if (secs.length >= 2) {
      tasks = secs.map((t, n) => {
        const nl2 = t.indexOf('\n');
        return { index: n + 1, id: `step-${i + 1}#t${n + 1}`, title: (nl2 === -1 ? t : t.slice(0, nl2)).trim(), body: (nl2 === -1 ? '' : t.slice(nl2 + 1)).trim(), config: (Array.isArray(config.tasks) && config.tasks[n] && typeof config.tasks[n] === 'object') ? config.tasks[n] : {} };
      });
      body = lead;
    }
    return { index: i + 1, id: `step-${i + 1}`, title, body: body.trim(), config, tasks };
  });
  return {
    slug,
    depth: slug.split('/').length,
    title: meta.title || slug,
    summary: meta.summary || '',
    author: meta.author ? String(meta.author) : '',
    order: Number.isFinite(Number(meta.order)) && meta.order !== null && meta.order !== '' ? Number(meta.order) : null,
    hook: meta.hook ? String(meta.hook).trim() : '',
    unit: meta.unit ? String(meta.unit) : '',          // the unit (group of lessons) in the course's index.md
    optional: meta.optional === true,                // an optional lesson: not needed to finish the course
    introduces: Array.isArray(meta.introduces) ? meta.introduces.map(String) : [],   // concept ids taught here (tools/concepts.mjs)
    assumes: Array.isArray(meta.assumes) ? meta.assumes.map(String) : [],         // concept ids taught in an earlier lesson
    recipes: Array.isArray(meta.recipes) ? meta.recipes.map(String) : [],         // on screen, labelled "copy this for now"
    node: meta.node == null ? [] : [].concat(meta.node).map(String),               // progression node(s) taught here (tools/progressions.mjs)
    uses: Array.isArray(meta.uses) ? meta.uses.map(String) : [],                  // descriptors or nodes relied on that the data does not record
    teachers: meta.teachers ? String(meta.teachers).trim() : '',
    modules: Array.isArray(meta.modules) ? meta.modules.map(String) : [],
    language: meta.language || 'python',
    extensions: meta.extensions,                     // MakeCode extensions by key (MAKECODE_EXTENSIONS), e.g. [robot]
    app: meta.app || null,
    pacing: { ...DEFAULT_PACING, ...(meta.pacing || {}) },
    voice: meta.voice ?? null,                       // voiceover for this lesson's clips (see voiceSpec, AUTHORING.md)
    intro,
    steps,
    // explainClip (frontmatter): a captioned clip shown in the "Explain it to me" panel. It is recorded and validated
    // like a step's clip, as a pseudo-step with id "explain" (clips/explain.mp4).
    explainPicture: meta.explainPicture || null,   // a picture of a region's page in the Explain it to me panel (see pictureItems)
    explainStep: meta.explainClip && typeof meta.explainClip === 'object' && !Array.isArray(meta.explainClip)
      ? { index: 0, id: 'explain', title: 'Explain it to me', body: '', tasks: [], config: { stage: 'info', app: true, ...meta.explainClip } }
      : null,
  };
}

/** known (optional): { turtle: Set<snippet id>, html: Set<...> } to check `unlocks` ids against. */
export function validateLessonCore(lesson, read, known, shared = {}) {
  // Modules this lesson offers: a file next to lesson.md wins over a shared one in modules/.
  const errs = [];
  const moduleSource = (name) => read(`${name}.py`) ?? shared[name];
  if (lesson.modules?.length) {
    known = { ...known };
    const ids = new Set(known.turtle || []);
    for (const f of FEATURES) ids.add(f.id);
    for (const name of lesson.modules) {
      const src = /^[a-z][a-z0-9_]*$/.test(name) ? moduleSource(name) : undefined;
      if (src === undefined) { errs.push(`${lesson.slug} › frontmatter: module "${name}" not found (add ${name}.py next to lesson.md or in modules/; names are lowercase letters, digits and _)`); continue; }
      for (const fn of scanModule(src)) ids.add(`${name}.${fn.name}`);
    }
    if (known.turtle) known.turtle = ids;
  }
  const snip = (ref) => snippetFrom(read, ref);
  // expected: file#region whose page is shown (as a picture, no code) behind "Show the expected result". HTML playground only.
  // picture: a region's page shown beside the code (HTML lessons; not on Predict or Run, where it would give the answer away).
  const validatePicture = (v, where, stage) => {
    if (v === undefined) return;
    const sp = pictureSpec(v);
    if (!sp) return err(where, 'picture must be a code reference, such as page.html#combos, or { ref: page.html#combos, boxes: true }');
    if (lesson.language === 'makecode' && where === 'explainPicture') { try { snip(sp.ref); } catch (e) { err(where, `explainPicture: ${e.message}`); } return; } // shown as blocks
    if (usesBoardPictures(lesson)) {
      // A board setup, drawn as a picture by render-pictures (the board as students see it, without its controls).
      if (stage === 'predict' || stage === 'run') return err(where, 'picture would give the prediction away: use it on Investigate, Modify, Make or info steps');
      let setup = ''; try { setup = snip(sp.ref); } catch (e) { return err(where, `picture: ${e.message}`); }
      if (!/^\s*widget\s*:/m.test(setup)) err(where, `picture: ${sp.ref} is not a board setup (it needs a "widget:" line)`);
      return;
    }
    if (lesson.language !== 'html') return err(where, lesson.language === 'makecode' ? 'picture works in HTML lessons only (MakeCode lessons can use explainPicture, shown as blocks)' : 'picture works in HTML, maths and science lessons only');
    if (stage === 'predict' || stage === 'run') return err(where, 'picture would give the prediction away: use it on Investigate, Modify, Make or info steps');
    try { snip(sp.ref); } catch (e) { err(where, `picture: ${e.message}`); }
  };
  validatePicture(lesson.explainPicture ?? undefined, 'explainPicture', 'info');
  const validateExpected = (v, where, c) => {
    if (v === undefined) return;
    if (typeof v !== 'string' || !v.trim()) return err(where, 'expected must be a code reference, such as page.html#sol-make');
    if (!c.try) return err(where, 'expected needs the step to have a try playground');
    if ((c.try.playground || (lesson.language === 'html' ? 'html' : 'turtle')) !== 'html') return err(where, 'expected works in the HTML playground only (for turtle, use an output-only clip: see AUTHORING.md)');
    try { snip(v); } catch (e) { err(where, `expected: ${e.message}`); }
  };
  const err = (where, msg) => errs.push(`${lesson.slug} › ${where}: ${msg}`);
  const hasClips = lesson.steps.some((s) => s.config.clip) || !!lesson.explainStep?.config.clip;

  if (!lesson.steps.length) err('lesson', 'no steps (each step starts with "## Title")');
  if (hasClips) {
    if (!lesson.app?.command) err('frontmatter', 'app.command is required when any step has a clip');
    if (!lesson.app?.url) err('frontmatter', 'app.url is required when any step has a clip');
  }
  if (lesson.voice !== null && lesson.voice !== undefined && lesson.voice !== false) {
    const vs = voiceSpec(lesson.voice);
    if (!vs) err('frontmatter', 'voice must be true, a voice name, or { name, speed }');
    else {
      if (!VOICES.includes(vs.name)) err('frontmatter', `voice: "${vs.name}" is not one of ${VOICES.join(', ')}`);
      if (!(vs.speed >= 0.7 && vs.speed <= 1.4)) err('frontmatter', 'voice.speed must be between 0.7 and 1.4');
    }
  }
  if (lesson.app?.layout && !LAYOUTS.includes(lesson.app.layout)) err('frontmatter', `app.layout must be one of ${LAYOUTS.join(', ')}`);
  if (lesson.extensions !== undefined) {
    if (lesson.language !== 'makecode') err('frontmatter', 'extensions works in MakeCode lessons only (language: makecode)');
    else if (!Array.isArray(lesson.extensions)) err('frontmatter', 'extensions must be a list, such as [robot]');
    else lesson.extensions.forEach((k) => {
      const e = MAKECODE_EXTENSIONS[k];
      if (!e) return err('frontmatter', `extensions: "${k}" is not one of ${Object.keys(MAKECODE_EXTENSIONS).join(', ')}`);
      lesson.steps.forEach((s) => { const pg = s.config.try?.playground; if (pg && MAKECODE_KINDS.includes(pg) && pg !== e.target) err(`step ${s.id}`, `the ${k} extension works in the ${e.target} playground only`); });
    });
  }

  // One check (a step's, or a task's). c is the step config, for what a check needs from the step (a playground).
  const validateCheck = (k, where, c) => {
    if (!k || typeof k !== 'object' || Array.isArray(k) || !CHECK_TYPES.includes(k.type)) return err(where, `check.type must be one of ${CHECK_TYPES.join(', ')}`);
    const str = (v) => typeof v === 'string' && v.trim();
    if (k.fault !== undefined && !FAULTS.includes(k.fault)) err(where, `check fault must be one of ${FAULTS.join(', ')}`);
    if (k.misconception !== undefined && !/^[a-z][a-z0-9-]*$/.test(String(k.misconception))) err(where, 'check misconception must be a concept id such as return-vs-print (lowercase, hyphens)');
    if (k.type === 'reflect') { if (!str(k.text)) err(where, 'check (reflect) needs text, e.g. "I can explain why the turtle turns"'); }
    else if (k.type === 'code') {
      if (!str(k.text)) err(where, 'check (code) needs text, e.g. "Write a function and call it"');
      const r = k.rules;
      if (!r || typeof r !== 'object' || Array.isArray(r)) err(where, `check (code) needs rules, a mapping using ${CODE_RULES.join(', ')}`);
      else {
        for (const key of Object.keys(r)) if (!CODE_RULES.includes(key)) err(where, `unknown code rule "${key}" (use ${CODE_RULES.join(', ')})`);
        for (const key of ['defs', 'calls', 'loops', 'returns', 'params']) if (r[key] !== undefined && !(Number.isInteger(r[key]) && r[key] > 0)) err(where, `code rule ${key} must be a whole number above 0`);
        if (r.uses !== undefined && !(Array.isArray(r.uses) && r.uses.every((m) => /^\w+$/.test(String(m))))) err(where, 'code rule uses must be a list of names, such as [pencolor]');
        if (r.imports !== undefined && !(Array.isArray(r.imports) && r.imports.every((m) => /^\w+$/.test(String(m))))) err(where, 'code rule imports must be a list of module names');
        if (r.contains !== undefined && !(Array.isArray(r.contains) && r.contains.every((f) => typeof f === 'string' && f.trim()))) err(where, 'code rule contains must be a list of code fragments, such as ["inside(x, y"]');
        const frags = (v) => Array.isArray(v) ? v.every((f) => typeof f === 'string' && f.trim()) : typeof v === 'string' && v.trim();
        if (r.inside !== undefined && !(r.inside && typeof r.inside === 'object' && !Array.isArray(r.inside) && Object.keys(r.inside).length && Object.values(r.inside).every(frags))) err(where, 'code rule inside must map a block to code fragments, such as { "basic.forever": ["basic.pause("] }');
        if (r.count !== undefined && !(r.count && typeof r.count === 'object' && !Array.isArray(r.count) && Object.keys(r.count).length && Object.values(r.count).every((n) => Number.isInteger(n) && n > 0))) err(where, 'code rule count must map a code fragment to a whole number, such as { "basic.show": 3 }');
        if (!Object.keys(r).length) err(where, 'check (code) needs at least one rule');
      }
      const pk = c.try ? ({ python: 'turtle' }[c.try.playground] || c.try.playground || (lesson.language === 'html' ? 'html' : 'turtle')) : null;
      if (!pk || !['turtle', 'html', ...MAKECODE_KINDS].includes(pk)) err(where, 'a code check needs a playground on the step (try: { starter: ... })');
      else if (r && typeof r === 'object') {
        const allowedR = pk === 'html' ? HTML_RULES : MAKECODE_KINDS.includes(pk) ? MAKECODE_RULES : CODE_RULES.filter((x) => !['tags', 'inside', 'count'].includes(x));
        const pname = pk === 'html' ? 'HTML' : MAKECODE_KINDS.includes(pk) ? 'MakeCode' : 'turtle';
        for (const key of Object.keys(r)) if (CODE_RULES.includes(key) && !allowedR.includes(key)) err(where, `code rule ${key} does not work in the ${pname} playground (use ${allowedR.join(', ')})`);
        if (r.tags !== undefined && !(Array.isArray(r.tags) && r.tags.every((t) => /^[a-z][a-z0-9]*$/i.test(String(t))))) err(where, 'code rule tags must be a list of tag names without brackets, such as [ul, li]');
      }
    }
    else if (k.type === 'question') {
      if (!str(k.q)) err(where, 'check (question) needs q');
      if (!Array.isArray(k.options) || k.options.length < 2 || !k.options.every((o) => typeof o === 'string')) err(where, 'check (question) needs options: a list of at least two strings');
      else if (!Number.isInteger(k.answer) || k.answer < 0 || k.answer >= k.options.length) err(where, `check.answer must be the number (from 0) of the correct option, 0 to ${k.options.length - 1}`);
      // feedback: what to say for each wrong option (same order as options; null or "" for none), aimed at the misconception behind it.
      if (k.feedback !== undefined && !(Array.isArray(k.feedback) && Array.isArray(k.options) && k.feedback.length === k.options.length && k.feedback.every((f) => f === null || typeof f === 'string'))) err(where, 'check (question) feedback must be a list with one entry per option (text, or null for none)');
    }
    else if (k.type === 'sort') {
      // Sort items into groups: options are the groups, items are [text, group] pairs (a group can be used many times).
      if (!Array.isArray(k.options) || k.options.length < 2 || !k.options.every(str)) err(where, 'check (sort) needs options: the groups, a list of at least two strings');
      else if (!Array.isArray(k.items) || k.items.length < 2 || !k.items.every((it) => Array.isArray(it) && it.length >= 2 && it.length <= 3 && str(it[0]) && k.options.includes(it[1]) && (it[2] === undefined || str(it[2])))) err(where, 'check (sort) needs items: a list of at least two [text, group] or [text, group, why] entries, each group one of the options');
    }
    else if (k.type === 'number') {
      if (!str(k.q)) err(where, 'check (number) needs q');
      if (typeof k.answer !== 'number' || !Number.isFinite(k.answer)) err(where, 'check (number) needs answer: a number');
      if (k.tolerance !== undefined && !(typeof k.tolerance === 'number' && k.tolerance >= 0)) err(where, 'check (number) tolerance must be 0 or more');
    }
    else if (k.type === 'flag') {
      // A typed secret (capture-the-flag): only the SHA-256 of "wp-flag:" + the lowercased, trimmed answer is stored. tools/flag-hash.mjs makes it.
      if (!str(k.q)) err(where, 'check (flag) needs q');
      if (typeof k.hash !== 'string' || !/^[0-9a-f]{64}$/.test(k.hash)) err(where, 'check (flag) needs hash: 64 hex digits from tools/flag-hash.mjs');
    }
    else if (k.type === 'bug' || k.type === 'parsons') {
      let code = '';
      if (!str(k.code)) err(where, `check (${k.type}) needs code: a file#region reference`);
      else { try { code = snip(k.code); } catch (e) { err(where, `check.code: ${e.message}`); } }
      const lines = code.replace(/\n$/, '').split('\n');
      if (k.type === 'bug') {
        const files = code ? splitFiles(code) : [];
        const multi = files.length > 1 || (files[0] && files[0].name);
        const keys = k.answer === undefined || k.answer === null ? [] : bugKeys(k.answer);
        if (!keys.length) err(where, 'check (bug) needs answer: a line number, or a list of line numbers (counting from 1)');
        else if (code) {
          for (const key of keys) {
            const m = key.match(/^(?:(.+):)?(\d+)$/);
            const f = m && (m[1] ? files.find((x) => x.name === m[1]) : (!multi ? files[0] : null));
            if (!m || Number(m[2]) < 1) err(where, `check (bug) answer "${key}" must be a line number${multi ? ' written as file:line, such as program_b.py:6' : ''}`);
            else if (!f) err(where, multi ? `check (bug) answer "${key}" must name one of the files: ${files.map((x) => x.name).join(', ')} (as file:line)` : `check (bug) answer "${key}" names a file, but the code has no "# file:" lines`);
            else if (Number(m[2]) > f.code.replace(/\n$/, '').split('\n').length) err(where, `check (bug) answer "${key}" is past the end of ${f.name || 'the code'}`);
          }
        }
        
      } else {
        if (code && lines.filter((l) => l.trim()).length < 3) err(where, 'check (parsons) needs at least 3 lines of code');
        if (k.extra !== undefined && !(Array.isArray(k.extra) && k.extra.every((l) => typeof l === 'string' && l.trim()))) err(where, 'check (parsons) extra must be a list of spare lines');
      }
    }
    else if (k.type === 'match') {
      if (!Array.isArray(k.pairs) || k.pairs.length < 2 || !k.pairs.every((p) => Array.isArray(p) && p.length === 2 && p.every(str))) err(where, 'check (match) needs pairs: a list of at least two [left, right] pairs');
      else if (new Set(k.pairs.map((p) => p[1].trim())).size !== k.pairs.length) err(where, 'check (match) every right-hand item must be different');
    }
    else if (k.type === 'predict') {
      if (!str(k.q)) err(where, 'check (predict) needs q, e.g. "How many sides will the shape have?"');
      if (k.kind !== undefined && !['text', 'number'].includes(k.kind)) err(where, 'check (predict) kind must be text or number');
      if (k.options !== undefined && !(Array.isArray(k.options) && k.options.length >= 2 && k.options.every((o) => typeof o === 'string' && o.trim()))) err(where, 'check (predict) options must be a list of at least two strings');
      if (k.actual !== undefined && !str(String(k.actual))) err(where, 'check (predict) actual must be text, shown after the Run step');
    }
    else if (k.type === 'answer') {
      // A typed maths answer: any equivalent form passes (answer), or any equation the given values make true (equation).
      if (!str(k.q)) err(where, 'check (answer) needs q');
      const hasA = k.answer !== undefined && k.answer !== null && String(k.answer).trim() !== '';
      if (hasA === (k.equation !== undefined)) err(where, 'check (answer) needs exactly one of answer: (an expression or number) or equation: (values, such as { x: 6 })');
      // form: (expanded, simplified, factorised, subject x) is marked by Numbas (tools/maths-forms.mjs); validate.mjs
      // checks its answer and feedback in Node, since a wrong-form feedback answer is equivalent on purpose.
      const formed = k.form !== undefined;
      if (formed && !(['expanded', 'simplified', 'factorised', 'simplest', 'decimal'].includes(String(k.form)) || /^subject [a-zA-Z]$/.test(String(k.form)))) err(where, 'check (answer) form must be expanded, simplified, factorised, simplest, decimal or subject x (a letter)');
      if (formed && !hasA) err(where, 'check (answer) with form needs answer: (the expected answer in that form)');
      if (hasA && !formed) { try { MATH.parse(String(k.answer)); } catch (e) { err(where, `check (answer) answer "${k.answer}": ${e.message}`); } }
      if (k.equation !== undefined && !(k.equation && typeof k.equation === 'object' && !Array.isArray(k.equation) && Object.entries(k.equation).length && Object.entries(k.equation).every(([n, v]) => /^[a-zA-Z]$/.test(n) && typeof v === 'number'))) err(where, 'check (answer) equation must map one-letter variables to numbers, such as { x: 6 }');
      if (k.feedback !== undefined) {
        if (!Array.isArray(k.feedback) || !k.feedback.every((f) => Array.isArray(f) && f.length === 2 && str(String(f[0])) && str(f[1]))) err(where, 'check (answer) feedback must be a list of [wrong answer, what to say] pairs');
        else if (!formed) for (const [w] of k.feedback) { try { MATH.parse(String(w)); if (hasA && MATH.equivalent(String(w), String(k.answer))) err(where, `check (answer) feedback "${w}" is the right answer`); } catch (e) { err(where, `check (answer) feedback "${w}": ${e.message}`); } }
      }
    }
    else if (k.type === 'working') {
      // Maths working, one step per line: each line equal to the one before (or, for equations, with the same
      // solutions), the last in form:. Marked by Numbas (tools/maths-forms.mjs); validate runs example: through it.
      if (!str(k.q)) err(where, 'check (working) needs q');
      if (!str(String(k.start ?? ''))) err(where, 'check (working) needs start (the expression or equation to work from)');
      if (!Array.isArray(k.example) || !k.example.length || !k.example.every((l) => str(String(l)))) err(where, 'check (working) needs example: a model solution, one line per step');
      if (k.form !== undefined && !(['expanded', 'simplified', 'factorised', 'simplest', 'decimal'].includes(String(k.form)) || /^subject [a-zA-Z]$/.test(String(k.form)))) err(where, 'check (working) form must be expanded, simplified, factorised or subject x (a letter)');
      if (k.wrong !== undefined && !(Array.isArray(k.wrong) && k.wrong.every((w) => Array.isArray(w) && w.every((l) => str(String(l)))))) err(where, 'check (working) wrong must be a list of planted wrong solutions, each a list of lines');
    }
    else if (k.type === 'reasoning') {
      // Reasoning students own: free working (never marked), then the marked parts (an optional final answer and a
      // reason picked at one or two key steps), then a model solution to compare with and a self-check.
      if (!str(k.q)) err(where, 'check (reasoning) needs q');
      const steps = k.steps;
      if (!Array.isArray(steps) || !steps.length || !steps.every((st) => Array.isArray(st) && st.length === 2 && str(String(st[0])) && str(String(st[1])))) err(where, 'check (reasoning) needs steps: the model solution, each ["statement", "reason"]');
      const hasA = k.answer !== undefined && k.answer !== null && String(k.answer).trim() !== '';
      if (hasA) { try { MATH.parse(String(k.answer)); } catch (e) { err(where, `check (reasoning) answer "${k.answer}": ${e.message}`); } }
      if (k.feedback !== undefined) {
        if (!hasA) err(where, 'check (reasoning) feedback needs answer: (it is about the final answer)');
        else if (!Array.isArray(k.feedback) || !k.feedback.every((f) => Array.isArray(f) && f.length === 2 && str(String(f[0])) && str(f[1]))) err(where, 'check (reasoning) feedback must be a list of [wrong answer, what to say] pairs');
        else for (const [w] of k.feedback) { try { MATH.parse(String(w)); if (MATH.equivalent(String(w), String(k.answer))) err(where, `check (reasoning) feedback "${w}" is the right answer`); } catch (e) { err(where, `check (reasoning) feedback "${w}": ${e.message}`); } }
      }
      if (k.picks !== undefined) {
        if (!Array.isArray(k.picks) || !k.picks.length) err(where, 'check (reasoning) picks must be a list of { step, options, answer }');
        else k.picks.forEach((pk, i) => {
          const at = `check (reasoning) picks[${i + 1}]`;
          if (!pk || typeof pk !== 'object') return err(where, `${at} must be { step, options, answer }`);
          if (!Number.isInteger(pk.step) || !Array.isArray(steps) || pk.step < 1 || pk.step > steps.length) err(where, `${at} step must be a step number (1 to ${Array.isArray(steps) ? steps.length : '?'})`);
          if (!Array.isArray(pk.options) || pk.options.length < 2 || !pk.options.every((o) => str(String(o)))) err(where, `${at} needs at least two options (reasons to choose from)`);
          else if (!Number.isInteger(pk.answer) || pk.answer < 0 || pk.answer >= pk.options.length) err(where, `${at} answer must be the index of the right option (from 0)`);
          if (pk.feedback !== undefined && !(Array.isArray(pk.feedback) && Array.isArray(pk.options) && pk.feedback.length === pk.options.length)) err(where, `${at} feedback must have one entry per option (null for the right one)`);
        });
      }
      if (!hasA && !k.picks) err(where, 'check (reasoning) needs answer:, picks:, or both: something to mark besides the free working');
      if (k.criteria !== undefined && !(Array.isArray(k.criteria) && k.criteria.length && k.criteria.every((c) => str(String(c))))) err(where, 'check (reasoning) criteria must be a list of self-check sentences');
    }
    else if (k.type === 'board') {
      if (!str(k.text)) err(where, 'check (board) needs text, e.g. "Find the value of x that balances the scale."');
      // expect: fields of the board's report; when: a condition on its scope (the board, not the science board),
      // such as "A on y = 2x + 1" or "m = 3 and c > 0". With both, both must hold.
      const sci = c.try?.playground === 'science', keys = sci ? SCIENCE_BOARD_KEYS : BOARD_KEYS;
      if (k.expect === undefined && (k.when === undefined || sci)) err(where, sci ? `check (board) needs expect: a mapping using ${keys.join(', ')}` : `check (board) needs when: (a condition, such as "A on y = 2x + 1") or expect: (using ${keys.join(', ')})`);
      if (k.expect !== undefined) {
        if (!k.expect || typeof k.expect !== 'object' || Array.isArray(k.expect) || !Object.keys(k.expect).length) err(where, `check (board) expect must be a mapping using ${keys.join(', ')}`);
        else for (const key of Object.keys(k.expect)) if (!keys.includes(key)) err(where, `check (board) cannot expect "${key}" (use ${keys.join(', ')})`);
      }
      if (k.when !== undefined) {
        if (sci) err(where, 'check (board) when: works on the board, not the science board (use expect: { done: true })');
        else { try { MATH.checkCondition(String(k.when)); } catch (e) { err(where, `check (board) when "${k.when}": ${e.message}`); } }
      }
      if (!c.try || !isBoard(c.try.playground)) err(where, 'a board check needs a board on the step (try: { playground: board or science, starter: ... })');
    }
    else if (k.type === 'trace') {
      if (!str(k.table)) err(where, 'check (trace) needs table: a pipe table with blanks in [brackets]');
      else { try { parseTrace(k.table); } catch (e) { err(where, `check (trace) table ${e.message}`); } }
    }
  };

  for (const s of [...lesson.steps, ...(lesson.explainStep ? [lesson.explainStep] : [])]) {
    const where = `${s.id} "${s.title}"`;
    const c = s.config;
    if (!STAGES.includes(c.stage)) err(where, `stage must be one of ${STAGES.join(', ')} (got "${c.stage}")`);
    if (c.tier !== undefined && !TIERS.slice(1).includes(c.tier)) err(where, 'tier must be typical or wider (leave it out for the minimum path)');
    validateExpected(c.expected, where, c);
    validatePicture(c.picture, where, c.stage);
    if (c.code) {
      try { snip(c.code); } catch (e) { err(where, e.message); }
    }
    if (c.pacing !== undefined && (typeof c.pacing !== 'object' || Array.isArray(c.pacing))) err(where, 'pacing must be a mapping, e.g. { keyDelayMs: 40 }');
    if (c.query !== undefined) {
      if (typeof c.query !== 'object' || Array.isArray(c.query)) err(where, 'query must be a mapping of URL parameters');
      else for (const [k, v] of Object.entries(c.query)) {
        if (typeof v === 'string' && v.startsWith('@')) { try { snip(v.slice(1)); } catch (e) { err(where, `query.${k}: ${e.message}`); } }
      }
    }
    if (c.try !== undefined) {
      if (typeof c.try !== 'object' || Array.isArray(c.try)) err(where, 'try must be a mapping: { starter: file#region, height: 460 }');
      else if (c.try.playground && !PLAYGROUND_KINDS.includes(c.try.playground)) err(where, `try.playground must be one of ${PLAYGROUND_KINDS.join(', ')}`);
      else if (c.try.starter) { try { snip(c.try.starter); } catch (e) { err(where, `try.starter: ${e.message}`); } }
      else if (!c.code) err(where, 'try needs a starter (file#region) or a step-level code reference to start from');
    }
    if (c.clip !== undefined) {
      if (!Array.isArray(c.clip) || !c.clip.length) { err(where, 'clip must be a non-empty list of actions'); continue; }
      c.clip.forEach((a, i) => {
        const w = `${where} clip[${i + 1}]`;
        const keys = a && typeof a === 'object' ? Object.keys(a) : [];
        if (keys.length !== 1) return err(w, 'each action must have exactly one verb key');
        const verb = keys[0];
        const v = a[verb];
        if (!VERBS.includes(verb)) return err(w, `unknown verb "${verb}" (use ${VERBS.join(', ')})`);
        if (verb === 'show') { try { snip(v); } catch (e) { err(w, e.message); } }
        if (verb === 'caption' && !(typeof v === 'string' || (v && typeof v === 'object' && !Array.isArray(v) && typeof v.text === 'string' && (v.say === undefined || typeof v.say === 'string'))))
          err(w, 'caption needs a text, or { text, say } (say: the fuller line the voice speaks)');
        if (verb === 'type' && !(v && v.text !== undefined && (v.into || v.selector))) err(w, 'type needs {into|selector, text}');
        if (verb === 'expect' && !(v && (v.field || v.selector) && (v.value !== undefined || v.contains !== undefined))) err(w, 'expect needs {field|selector, value|contains}');
        if (verb === 'click' && !(typeof v === 'string' || (v && v.selector))) err(w, 'click needs a label string or {selector}');
        if (verb === 'click' && v && typeof v === 'object' && v.at !== undefined && !(Array.isArray(v.at) && v.at.length === 2 && v.at.every(Number.isFinite))) err(w, 'click.at needs turtle coordinates [x, y]');
        if (verb === 'wait' && typeof v !== 'number') err(w, 'wait needs milliseconds');
        if (verb === 'type' && v && typeof v.text === 'string' && v.text.startsWith('@')) {
          try { snip(v.text.slice(1)); } catch (e) { err(w, `type.text: ${e.message}`); }
        }
      });
    }
    if (c.check !== undefined) {
      if (s.tasks.length) err(where, 'this step has tasks (### headings): put each check on its task, under tasks:');
      else validateCheck(c.check, where, c);
    }
    const tasksHaveChecks = s.tasks.some((t) => t.config.check);
    if (c.unlocks !== undefined) {
      if (!Array.isArray(c.unlocks) || !c.unlocks.every((u) => typeof u === 'string')) err(where, 'unlocks must be a list of snippet ids');
      else {
        if (!c.check && !tasksHaveChecks) err(where, 'unlocks needs a check (what the student does to earn them)');
        const ids = known?.[unlockKind(lesson, s)];
        if (ids) for (const u of c.unlocks) if (!ids.has(u)) err(where, `unknown snippet id "${u}" (see the reference page for ids)`);
      }
    }
    if (c.insight !== undefined && !(typeof c.insight === 'string' && c.insight.trim())) err(where, 'insight must be a short text: what this step should help students see');
    if (c.tasks !== undefined) {
      if (!Array.isArray(c.tasks)) err(where, 'tasks must be a list, one entry per ### heading in the step');
      else if (c.tasks.length !== s.tasks.length) err(where, `tasks has ${c.tasks.length} entries but the step has ${s.tasks.length} ### headings (they must match, in order)`);
    }
    s.tasks.forEach((t) => {
      const tw = `${where} task ${t.index} "${t.title}"`;
      const tc = t.config;
      if (tc.hint !== undefined) {
        const hs = Array.isArray(tc.hint) ? tc.hint : [tc.hint];
        if (hs.length > 3 || !hs.every((h) => typeof h === 'string' && h.trim())) err(tw, 'hint must be a short text, or a list of up to 3 texts');
      }
      if (tc.starter !== undefined) {
        if (!c.try) err(tw, 'a task starter needs the step to have a try playground');
        else { try { snip(tc.starter); } catch (e) { err(tw, `starter: ${e.message}`); } }
      }
      if (tc.insight !== undefined && !(typeof tc.insight === 'string' && tc.insight.trim())) err(tw, 'insight must be a short text');
      validateExpected(tc.expected, tw, c);
      validatePicture(tc.picture, tw, c.stage);
      if (tc.check !== undefined) validateCheck(tc.check, tw, c);
      if (tc.unlocks !== undefined) {
        if (!Array.isArray(tc.unlocks) || !tc.unlocks.every((u) => typeof u === 'string')) err(tw, 'unlocks must be a list of snippet ids');
        else {
          if (!tc.check) err(tw, 'unlocks needs a check on this task');
          const ids = known?.[unlockKind(lesson, s)];
          if (ids) for (const u of tc.unlocks) if (!ids.has(u)) err(tw, `unknown snippet id "${u}"`);
        }
      }
    });
    if (c.hint !== undefined) {
      const hs = Array.isArray(c.hint) ? c.hint : [c.hint];
      if (hs.length > 3 || !hs.every((h) => typeof h === 'string' && h.trim())) err(where, 'hint must be a short text, or a list of up to 3 texts (nudges, not answers)');
    }
    if (c.reveal !== undefined && typeof c.reveal !== 'boolean' && !(typeof c.reveal === 'string' && c.reveal.trim())) err(where, 'reveal must be true, or the text of the button, e.g. "Show the expected result"');
    if (c.reveal && !c.clip) err(where, '"reveal" only makes sense on a step with a clip');
    if (c.say !== undefined) {
      if (typeof c.say !== 'string') err(where, 'say must be a text: the line spoken over the opening caption');
      else if (!c.clip) err(where, '"say" only makes sense on a step with a clip');
    }
  }
  if (lesson.teacher) validateTeacher(lesson, snip, err);
  return errs;
}

/** The fields of teacher.yml. Text fields are Markdown; see AUTHORING.md › Teacher notes. */
export const TEACHER_TEXT = ['summary', 'before', 'stretch', 'support', 'leads', 'explain', 'timing'];

/** Steps and tasks a solution can be keyed by: "step-4" or "step-4#t2". */
/** picture: "page.html#x", { ref, boxes: true } (Boxes view) or { ref, inspect: ".card" } (Box model view pinned on that element) -> { ref, boxes, inspect, caption } (or null). caption: shown under a board picture (maths). */
export const pictureSpec = (v) => (typeof v === 'string' ? { ref: v, boxes: false, inspect: '' } : v && typeof v === 'object' && typeof v.ref === 'string' ? { ref: v.ref, boxes: !!v.boxes && !v.inspect, inspect: typeof v.inspect === 'string' ? v.inspect : '', caption: typeof v.caption === 'string' ? v.caption : '' } : null);

/** Lessons whose pictures are board setups: maths and science. pictureBoard says which board draws them: 'science'
 *  for a science lesson with any step on the science board (playground: science), otherwise 'board' (the shared board). */
export function usesBoardPictures(lesson) {
  return lesson.language === 'maths' || lesson.language === 'science';
}
export function pictureBoard(lesson) {
  const sci = lesson.language === 'science' && (lesson.steps || []).some((s) => s.config?.try?.playground === 'science' || (s.tasks || []).some((t) => t.config?.try?.playground === 'science'));
  return sci ? 'science' : 'board';
}

/** Every "what this code makes" picture in an HTML lesson: steps' and tasks' picture:, and explainPicture (key "explain"). */
export function pictureItems(lesson) {
  const out = [];
  for (const s of lesson.steps) {
    if (s.config.picture) out.push({ key: s.id, ...pictureSpec(s.config.picture) });
    for (const t of s.tasks) if (t.config.picture) out.push({ key: t.id.replace('#', '-'), ...pictureSpec(t.config.picture) });
  }
  if (lesson.explainPicture) out.push({ key: 'explain', ...pictureSpec(lesson.explainPicture) });
  return out.filter((x) => x.ref);
}

/** Every "Show the expected result" picture a lesson asks for: [{ key: 'step-4-t2', ref: 'page.html#sol-x' }]. */
export function expectedItems(lesson) {
  return lesson.steps.flatMap((s) => [
    ...(s.config.expected ? [{ key: s.id, ref: s.config.expected }] : []),
    ...s.tasks.filter((t) => t.config.expected).map((t) => ({ key: t.id.replace('#', '-'), ref: t.config.expected })),
  ]);
}

export function workItems(lesson) {
  return lesson.steps.flatMap((s) => (s.tasks.length ? s.tasks.map((t) => ({ id: t.id, step: s, task: t, check: t.config.check })) : [{ id: s.id, step: s, task: null, check: s.config.check }]))
    .filter((w) => ['modify', 'make'].includes(w.step.config.stage) && w.step.config.try);
}

function validateTeacher(lesson, snip, err) {
  const t = lesson.teacher, w = 'teacher.yml';
  if (typeof t !== 'object' || Array.isArray(t)) return err(w, 'must be a mapping of fields');
  const allowed = [...TEACHER_TEXT, 'time', 'goals', 'running', 'stuck', 'exit', 'solutions'];
  for (const k of Object.keys(t)) if (!allowed.includes(k)) err(w, `unknown field "${k}" (use ${allowed.join(', ')})`);
  for (const k of TEACHER_TEXT) if (t[k] !== undefined && typeof t[k] !== 'string') err(w, `${k} must be text`);
  if (t.time !== undefined && !(Number.isInteger(t.time) && t.time > 0)) err(w, 'time must be the lesson length in minutes, such as 50');
  for (const k of ['goals', 'running']) if (t[k] !== undefined && !(Array.isArray(t[k]) && t[k].every((x) => typeof x === 'string' && x.trim()))) err(w, `${k} must be a list of sentences`);
  if (t.goals && !t.goals.every((g) => /^I can\b/.test(g))) err(w, 'each goal starts "I can"');
  if (t.stuck !== undefined && !(Array.isArray(t.stuck) && t.stuck.every((x) => x && ['see', 'ask', 'fix'].every((f) => typeof x[f] === 'string' && x[f].trim())))) err(w, 'stuck must be a list of { see, ask, fix }');
  if (t.exit !== undefined && !(t.exit && typeof t.exit.q === 'string' && typeof t.exit.a === 'string')) err(w, 'exit must be { q, a }: one question and its answer');
  if (t.solutions !== undefined) {
    if (typeof t.solutions !== 'object' || Array.isArray(t.solutions)) return err(w, 'solutions must map a step or task id ("step-4" or "step-4#t2") to file#region');
    const items = workItems(lesson);
    for (const [id, ref] of Object.entries(t.solutions)) {
      const item = items.find((i) => i.id === id);
      if (!item) { err(w, `solutions: "${id}" is not a Modify or Make step or task with a playground (${items.map((i) => i.id).join(', ')})`); continue; }
      let code;
      try { code = snip(ref); } catch (e) { err(w, `solutions.${id}: ${e.message}`); continue; }
      // A solution must pass the check it answers.
      if (item.check?.type === 'code' && item.check.rules) {
        const failed = evalRules(item.check.rules, code, unlockKind(lesson, item.step)).filter((r) => !r.ok).map((r) => r.label);
        if (failed.length) err(w, `solutions.${id} fails its own check: ${failed.join('; ')}`);
      }
    }
  }
}
