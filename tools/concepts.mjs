// Hidden-assumptions scan (ROADMAP › Hidden assumptions audit; BUILDING › 1, step 4).
//
// Every lesson can say, in frontmatter, which concepts it teaches and which it relies on:
//   introduces: [remainder, text-char]   taught here (the lesson explains it; later lessons may use it)
//   assumes:    [radio-value]            relied on, taught in an earlier lesson (checked, not scanned)
//   recipes:    [bitwise]                on screen but not taught: the lesson labels it "copy this for now"
// The scan reads the code students see (every `file#region` the lesson names, except `sol-*` regions, and
// fenced makecode blocks), finds the constructs in CONCEPTS, and warns (never fails) when a lesson uses a
// concept that no earlier lesson introduces and the lesson neither introduces nor labels as a recipe.
// "Earlier" means a lower `order` in the same course, or any lesson of a course it follows (`after:` in
// code/index.md, followed transitively). An optional lesson's concepts count only for later optional lessons.
//
//   node tools/concepts.mjs            lint (the same warnings `npm run validate` prints)
//   node tools/concepts.mjs --report   per course: each lesson's concepts, new ones marked, untagged first uses
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const strip = (code) => code
  .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')
  .replace(/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`[^`]*`/g, '""');   // string contents never count
const FOR = /for\s*\(\s*let\s+(\w+)\s*=\s*([^;]+);\s*\1\s*(<=?)\s*([^;]+);[^)]*\)/g;
const noForHeaders = (c) => c.replace(FOR, 'for ()');

/** MakeCode (the JavaScript that blocks compile to). Each concept: id, what students would call it, a test. A
 *  concept without a test is a fact, not syntax (such as the 8-character limit on sendValue names): it can be
 *  introduced and assumed, but the scan cannot see it. */
export const CONCEPTS = {
  makecode: [
    { id: 'variable', label: 'a variable (set)', re: /\blet\s+\w+\s*(:\s*[\w[\]]+\s*)?=/ },
    { id: 'variable-update', label: 'change a variable from itself (x = x + 1, change by)', test: (c) => /\b(\w+)\s*=\s*\1\s*[-+*/]|\+=|-=|\+\+|--/.test(noForHeaders(c)) },
    { id: 'if', label: 'if', re: /\bif\s*\(/ },
    { id: 'else', label: 'else / else if', re: /\belse\b/ },
    { id: 'and-or', label: 'and / or', re: /&&|\|\|/ },
    { id: 'not', label: 'not (!)', re: /!(?!=)/ },
    { id: 'random', label: 'pick random (randint)', re: /\brandint\s*\(|Math\.random/ },
    { id: 'repeat', label: 'repeat n times', test: (c) => [...c.matchAll(FOR)].some((m) => m[3] === '<' && /^\d+$/.test(m[4].trim()) && m[2].trim() === '0') },
    { id: 'loop-index', label: 'for index from … to … (a loop that uses its counter)', test: (c) => [...c.matchAll(FOR)].some((m) => !(m[3] === '<' && /^\d+$/.test(m[4].trim()) && m[2].trim() === '0')) },
    { id: 'for-of', label: 'for element of list', re: /\bfor\s*\(\s*let\s+\w+\s+of\b/ },
    { id: 'while', label: 'while', re: /\bwhile\s*\(/ },
    { id: 'list', label: 'a list (array)', re: /=\s*\[[^\]\n]*\]|:\s*\w+\[\]/ },
    { id: 'list-index', label: 'list[index] (get or set an item)', re: /\b\w+\s*\[\s*[^\]\s][^\]]*\]/ },
    { id: 'list-change', label: 'add or remove list items', re: /\.(push|pop|removeAt|insertAt|unshift|shift)\s*\(/ },
    { id: 'length', label: 'length of a list or text', re: /\.length\b/ },
    { id: 'function', label: 'a named function (define and call)', re: /^\s*function\s+\w+\s*\(/m },
    { id: 'param', label: 'a function with parameters', re: /^\s*function\s+\w+\s*\(\s*\w+/m },
    { id: 'return-value', label: 'a function that returns a value', re: /\breturn\s+[^\s;}]/ },
    { id: 'text-join', label: 'join text ("a" + b)', re: /""\s*\+|\+\s*""|\bconvertToText\s*\(/ },
    { id: 'text-compare', label: 'compare text (== "A")', re: /[!=]==?\s*""|""\s*[!=]==?/ },
    { id: 'text-char', label: 'the letter at a place (charAt)', re: /\.charAt\s*\(/ },
    { id: 'index-of', label: 'find a place (indexOf)', re: /\.indexOf\s*\(/ },
    { id: 'text-slice', label: 'part of a text (substr)', re: /\.(substr|substring|slice)\s*\(/ },
    { id: 'char-code', label: 'character codes (charCodeAt, fromCharCode)', re: /\.charCodeAt\s*\(|String\.fromCharCode/ },
    { id: 'parse-number', label: 'text to number (parseFloat)', re: /\bparse(Float|Int)\s*\(/ },
    { id: 'remainder', label: 'remainder (%)', re: /%/ },
    { id: 'int-divide', label: 'whole-number division (idiv, floor)', re: /Math\.(idiv|floor|trunc)\s*\(/ },
    { id: 'xor', label: 'XOR (^)', re: /\^/ },
    { id: 'bitwise', label: 'bit operations (&, |, <<, >>)', re: /[^&]&[^&=]|[^|]\|[^|=]|<<|>>/ },
    { id: 'math-fn', label: 'absolute value, min, max', re: /Math\.(abs|min|max)\s*\(/ },
    { id: 'bool-value', label: 'true / false stored in a variable', re: /(?<![=!<>])=\s*(true|false)\b/ },
    { id: 'running-time', label: 'running time (ms)', re: /input\.runningTime|control\.millis/ },
    { id: 'radio', label: 'radio group', re: /radio\.setGroup\s*\(/ },
    { id: 'radio-number', label: 'radio send / receive number', re: /radio\.(sendNumber|onReceivedNumber)\b/ },
    { id: 'radio-string', label: 'radio send / receive string', re: /radio\.(sendString|onReceivedString)\b/ },
    { id: 'radio-value', label: 'radio send / receive value (name and number)', re: /radio\.(sendValue|onReceivedValue)\b/ },
    { id: 'value-name-limit', label: 'sendValue names: 8 characters at most (longer names are cut)' },
    { id: 'serial-write', label: 'serial write', re: /serial\.write\w*\s*\(/ },
    { id: 'serial-read', label: 'serial read (on data received, read line)', re: /serial\.(onDataReceived|readLine|readUntil|readString|delimiters)\b/ },
  ],
};

export const conceptIds = (language) => new Set((CONCEPTS[language] || []).map((c) => c.id));
const has = (c, code) => (c.test ? c.test(code) : c.re ? c.re.test(code) : false);

/** The code students see in a lesson, by section ("frontmatter", then each "## " step title). */
export function visibleCode(lesson, read) {
  const raw = readFileSync(join(lesson.dir, 'lesson.md'), 'utf8').replace(/\r\n/g, '\n');
  const fm = raw.match(/^---\n[\s\S]*?\n---\n?/)?.[0] || '';
  const sections = [['frontmatter', fm], ...raw.slice(fm.length).split(/^## /m).slice(1).map((s) => [s.slice(0, s.indexOf('\n')).trim(), s])];
  return sections.map(([where, text]) => {
    const refs = [...text.matchAll(/([\w.-]+\.(?:ts|py|js))#([\w-]+)/g)].filter((m) => !m[2].startsWith('sol-'));
    const fenced = [...text.matchAll(/```(?:makecode|blocks|ts|typescript)\n([\s\S]*?)```/g)].map((m) => m[1]);
    return [where, strip([...new Set(refs.map((m) => m[0]))].map((r) => read(lesson.dir, r) || '').concat(fenced).join('\n'))];
  });
}

/** Concepts a lesson's visible code uses: Map id -> first section it appears in. */
export function scanLesson(lesson, read) {
  const out = new Map();
  for (const [where, code] of visibleCode(lesson, read)) for (const c of CONCEPTS[lesson.language] || []) if (!out.has(c.id) && has(c, code)) out.set(c.id, where);
  return out;
}

const list = (v) => (Array.isArray(v) ? v.map(String) : v ? [String(v)] : []);
const course = (slug) => slug.split('/').slice(0, -1).join('/');

/** Courses each course follows, transitively, from `after:` in every subject's index.md pathways. */
export function prerequisites(loadDirMeta, root) {
  const after = {};
  for (const subj of ['code', 'maths', 'science']) {
    for (const p of loadDirMeta(join(root, subj)).pathways || []) for (const c of p.courses || []) if (c.path) after[c.path] = (c.after || []).filter((a) => a.includes('/'));
  }
  const all = (c, seen = new Set()) => { for (const a of after[c] || []) if (!seen.has(a)) { seen.add(a); all(a, seen); } return seen; };
  return (c) => all(c);
}

/** Lint: { warnings: [string], report: [{ slug, title, optional, uses: Map, fresh: [ids], untagged: [ids] }] }. */
export function auditConcepts(lessons, read, prereqs) {
  const warnings = [];
  const report = [];
  const scoped = lessons.filter((l) => CONCEPTS[l.language]);
  const before = (a, b) => (course(a.slug) === course(b.slug) ? (a.order ?? 0) < (b.order ?? 0) : prereqs(course(b.slug)).has(course(a.slug)));
  for (const l of scoped) {
    const ids = conceptIds(l.language);
    const intro = list(l.introduces), assumes = list(l.assumes), recipes = list(l.recipes);
    for (const [k, v] of [['introduces', intro], ['assumes', assumes], ['recipes', recipes]]) for (const id of v) if (!ids.has(id)) warnings.push(`${l.slug} › ${k}: "${id}" is not a concept id (tools/concepts.mjs)`);
    const known = new Map();   // id -> slug of the earlier lesson that introduces it
    for (const e of scoped) if (e !== l && e.language === l.language && before(e, l) && (!e.optional || l.optional)) for (const id of list(e.introduces)) if (!known.has(id)) known.set(id, e.slug);
    const uses = scanLesson(l, read);
    const untagged = [];
    for (const [id, where] of uses) {
      if (known.has(id) || intro.includes(id) || recipes.includes(id)) continue;
      untagged.push(id);
      warnings.push(`${l.slug} › ${where}: uses ${id} [${CONCEPTS[l.language].find((c) => c.id === id).label}], which no earlier lesson introduces; teach it here (introduces), label it a recipe (recipes), or teach it earlier`);
    }
    for (const id of assumes) if (!known.has(id)) warnings.push(`${l.slug} › assumes: ${id}, but no earlier lesson introduces it`);
    for (const id of intro) {
      const c = CONCEPTS[l.language].find((x) => x.id === id);
      if (c && (c.re || c.test) && !uses.has(id)) warnings.push(`${l.slug} › introduces: ${id}, but no code students see uses it`);
      if (known.has(id)) warnings.push(`${l.slug} › introduces: ${id}, already introduced in ${known.get(id)} (use assumes, or recap it without introduces)`);
    }
    report.push({ slug: l.slug, title: l.title, order: l.order, optional: l.optional, uses, fresh: [...uses.keys()].filter((id) => !known.has(id)), untagged });
  }
  // MakeCode radio value names are cut to 8 characters, so a longer name never matches on the receiver.
  // Checked in every code file (solutions too: students copy them) and in lesson.md (code-check rules).
  for (const l of lessons.filter((x) => x.language === 'makecode')) {
    for (const f of readdirSync(l.dir).filter((n) => /\.(ts|md)$/.test(n))) {
      const text = readFileSync(join(l.dir, f), 'utf8');
      for (const m of text.matchAll(/radio\.sendValue\(\s*\\?"([\w ]+)\\?"|\bname\s*===?\s*\\?"([\w ]+)\\?"/g)) {
        const name = m[1] ?? m[2];
        if (name.length > 8) warnings.push(`${l.slug} › ${f}: radio value name "${name}" has ${name.length} characters; names are cut to 8, so it never arrives as "${name}"`);
      }
    }
  }
  return { warnings, report };
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const { loadLessons, loadDirMeta, getSnippet, CONTENT_ROOT } = await import('./lesson.mjs');
  const lessons = loadLessons();
  const { warnings, report } = auditConcepts(lessons, getSnippet, prerequisites(loadDirMeta, CONTENT_ROOT));
  if (process.argv.includes('--report')) {
    let cur = '';
    for (const r of report.sort((a, b) => (course(a.slug) === course(b.slug) ? (a.order ?? 0) - (b.order ?? 0) : 0))) {
      if (course(r.slug) !== cur) { cur = course(r.slug); console.log(`\n## ${cur}\n`); }
      const mark = (id) => (r.untagged.includes(id) ? `**${id}**` : r.fresh.includes(id) ? `+${id}` : id);
      console.log(`- ${r.order}. ${r.title}${r.optional ? ' (optional)' : ''}: ${[...r.uses.keys()].map(mark).join(', ') || '(no code)'}`);
    }
    console.log('\n(+id: introduced here; **id**: used before any lesson introduces it)');
  } else {
    warnings.forEach((w) => console.warn('⚠ ' + w));
    console.log(warnings.length ? `${warnings.length} hidden-assumption warning(s)` : '✓ hidden assumptions: every construct is introduced, assumed or a recipe');
  }
}
