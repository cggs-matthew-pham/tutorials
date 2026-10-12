// Hidden-assumptions scan (ROADMAP › Hidden assumptions audit; BUILDING › 1, step 4).
//
// Every lesson can say, in frontmatter, which concepts it teaches and which it relies on:
//   introduces: [remainder, text-char]   taught here (the lesson explains it; later lessons may use it)
//   assumes:    [radio-value]            relied on, taught in an earlier lesson (checked, not scanned)
//   recipes:    [bitwise]                on screen but not taught: the lesson labels it "copy this for now"
// The scan reads the code students see (every `file#region` the lesson names, except `sol-*` regions, and
// fenced makecode, python, html and css blocks), finds the constructs in CONCEPTS, and warns (never fails) when a lesson uses a
// concept that no earlier lesson introduces and the lesson neither introduces nor labels as a recipe.
// A recipe labelled in an earlier lesson counts as seen for later ones. "Earlier" means a lower `order` in the same course, or any lesson of a course it follows (`after:` in
// code/index.md, followed transitively). An optional lesson's concepts count only for later optional lessons.
//
//   node tools/concepts.mjs            lint (the same warnings `npm run validate` prints)
//   node tools/concepts.mjs --report   per course: each lesson's concepts, new ones marked, untagged first uses
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { CONCEPTS, conceptIds, conceptsIn, strip, stripPy, splitHtml, has, THEORY, theoryIds } from './concepts-core.mjs';
export { CONCEPTS, conceptIds, conceptsIn, THEORY };

/** The code students see in a lesson, by section ("frontmatter", then each "## " step title): [where, code, raw] (raw keeps string contents; Python comments are dropped from both). */
export function visibleCode(lesson, read) {
  const raw = readFileSync(join(lesson.dir, 'lesson.md'), 'utf8').replace(/\r\n/g, '\n');
  const fm = raw.match(/^---\n[\s\S]*?\n---\n?/)?.[0] || '';
  const sections = [['frontmatter', fm], ...raw.slice(fm.length).split(/^## /m).slice(1).map((s) => [s.slice(0, s.indexOf('\n')).trim(), s])];
  return sections.map(([where, text]) => {
    const refs = [...text.matchAll(/([\w.-]+\.(?:ts|py|js|html|css))#([\w-]+)/g)].filter((m) => !m[2].startsWith('sol-'));
    const fenced = [...text.matchAll(/```(?:makecode|blocks|ts|typescript|python|py|js|javascript|html|css)\n([\s\S]*?)```/g)].map((m) => m[1]);
    const chunks = [...new Set(refs.map((m) => m[0]))].map((r) => read(lesson.dir, r) || '').concat(fenced);
    if (lesson.language === 'html') { const s = splitHtml(chunks); return [where, s.code, s.raw]; }
    const joined = chunks.join('\n');
    if (lesson.language === 'python') { const s = stripPy(joined); return [where, s.code, s.raw]; }
    const s = strip(joined);
    return [where, s, s];
  });
}

/** Concepts a lesson's visible code uses: Map id -> first section it appears in. */
export function scanLesson(lesson, read) {
  const out = new Map();
  for (const [where, code, raw] of visibleCode(lesson, read)) for (const c of CONCEPTS[lesson.language] || []) if (!out.has(c.id) && has(c, c.raw ? raw : code)) out.set(c.id, where);
  return out;
}

const list = (v) => (Array.isArray(v) ? v.map(String) : v ? [String(v)] : []);
const course = (slug) => slug.split('/').slice(0, -1).join('/');
const subject = (slug) => slug.split('/')[0];
const theoryTags = (l) => list(l.introduces).length > 0 || list(l.assumes).some((id) => theoryIds.has(id));

/** Courses each course follows, transitively, from `after:` in every subject's index.md pathways (through planned courses too, by their `id`). */
export function prerequisites(loadDirMeta, root) {
  const after = {};
  const alias = {};   // a built course listed with both path and id: `after:` may name either
  for (const subj of ['code', 'maths', 'science', 'systems', 'engineering']) {
    for (const p of loadDirMeta(join(root, subj)).pathways || []) for (const c of p.courses || []) {
      if (c.path && c.id) { alias[c.id] = c.path; alias[c.path] = c.id; }
      if (c.path || c.id) after[c.path || c.id] = c.after || [];   // planned courses (id:) pass their prerequisites on
    }
  }
  const all = (c, seen = new Set()) => { for (const a of after[c] || []) for (const k of [a, alias[a]].filter(Boolean)) if (!seen.has(k)) { seen.add(k); all(k, seen); } return seen; };
  return (c) => all(c);
}

/** Lint: { warnings: [string], report: [{ slug, title, optional, uses: Map, fresh: [ids], untagged: [ids] }] }. */
export function auditConcepts(lessons, read, prereqs) {
  const warnings = [];
  const report = [];
  // Lessons in a scanned language, plus any lesson that tags a theory concept (Digital systems lessons are maths-language;
  // maths lessons also use assumes: for progression nodes, so only theory ids are read from their assumes).
  const scoped = lessons.filter((l) => CONCEPTS[l.language] || theoryTags(l));
  const before = (a, b) => (course(a.slug) === course(b.slug) ? (a.order ?? 0) < (b.order ?? 0) : prereqs(course(b.slug)).has(course(a.slug)));
  for (const l of scoped) {
    const scanned = !!CONCEPTS[l.language];
    const ids = new Set([...conceptIds(l.language), ...theoryIds]);
    const keep = (v) => (scanned ? v : v.filter((id) => theoryIds.has(id)));
    const intro = list(l.introduces), assumes = keep(list(l.assumes)), recipes = keep(list(l.recipes));
    for (const [k, v] of [['introduces', intro], ['assumes', assumes], ['recipes', recipes]]) for (const id of v) if (!ids.has(id)) warnings.push(`${l.slug} › ${k}: "${id}" is not a concept id (tools/concepts.mjs)`);
    const known = new Map();   // id -> slug of the earlier lesson that introduces it
    const shown = new Map();   // id -> slug of the earlier lesson that labelled it a recipe (the student has seen "copy this for now")
    for (const e of scoped) if (e !== l && (!e.optional || l.optional)) {
      const earlier = e.language === l.language && before(e, l);
      for (const id of list(e.introduces)) if (!known.has(id) && (earlier || (theoryIds.has(id) && (subject(e.slug) !== subject(l.slug) || before(e, l))))) known.set(id, e.slug);
      if (earlier) for (const id of list(e.recipes)) if (!shown.has(id)) shown.set(id, e.slug);
    }
    const uses = scanLesson(l, read);
    const untagged = [];
    for (const [id, where] of uses) {
      if (known.has(id) || shown.has(id) || intro.includes(id) || recipes.includes(id)) continue;
      untagged.push(id);
      warnings.push(`${l.slug} › ${where}: uses ${id} [${CONCEPTS[l.language].find((c) => c.id === id).label}], which no earlier lesson introduces; teach it here (introduces), label it a recipe (recipes), or teach it earlier`);
    }
    for (const id of assumes) if (!known.has(id) && !shown.has(id)) warnings.push(`${l.slug} › assumes: ${id}, but no earlier lesson introduces it`);
    for (const id of intro) {
      const c = (CONCEPTS[l.language] || []).find((x) => x.id === id);
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

/** Links between lessons through theory concepts, for the lesson pages: slug -> { on: [{ slug, label }], in: [{ slug, label }] }.
 *  on: lessons that introduce a theory concept this lesson assumes ("Builds on"); in: lessons that assume one this
 *  lesson introduces ("Put to work in"). */
export function theoryLinks(lessons) {
  const label = (id) => THEORY.find((c) => c.id === id)?.label || id;
  const intro = new Map();   // id -> [slug]
  for (const l of lessons) for (const id of list(l.introduces)) if (theoryIds.has(id)) intro.set(id, [...(intro.get(id) || []), l.slug]);
  const out = new Map(), get = (s) => out.get(s) || (out.set(s, { on: [], in: [] }), out.get(s));
  for (const l of lessons) for (const id of list(l.assumes)) if (theoryIds.has(id)) for (const s of intro.get(id) || []) {
    if (s === l.slug) continue;
    get(l.slug).on.push({ slug: s, label: label(id) });
    get(s).in.push({ slug: l.slug, label: label(id) });
  }
  return out;
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
