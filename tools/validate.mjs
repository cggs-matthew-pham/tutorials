// `npm run validate`: parse every lesson and report problems. Exits 1 on any error.
import { loadLessons, validateLesson } from './lesson.mjs';

const lessons = loadLessons(process.argv[2]);
if (!lessons.length) { console.error('No lessons found in lessons/*/lesson.md'); process.exit(1); }

let bad = 0;
for (const l of lessons) {
  const errs = validateLesson(l);
  const clips = l.steps.filter((s) => s.config.clip).length;
  if (errs.length) { bad += errs.length; errs.forEach((e) => console.error('✗ ' + e)); }
  else console.log(`✓ ${l.slug}: ${l.steps.length} steps, ${clips} clips`);
}
import { readFileSync, readdirSync } from 'node:fs';
for (const f of readdirSync('snippets').filter((n) => n.endsWith('.json'))) {
  try {
    const d = JSON.parse(readFileSync(`snippets/${f}`, 'utf8'));
    let n = 0;
    for (const g of d.groups) for (const i of g.items) {
      n++;
      if (!i.label || !i.code || !i.hint) { bad++; console.error(`✗ snippets/${f} › ${g.name} › ${i.label || '(no label)'}: needs label, code and hint`); }
      if ((i.code.match(/‹/g) || []).length !== (i.code.match(/›/g) || []).length) { bad++; console.error(`✗ snippets/${f} › ${i.label}: unbalanced ‹ ›`); }
      if (i.matches !== undefined) { try { new RegExp(i.matches, 'm'); } catch (e) { bad++; console.error(`✗ snippets/${f} › ${i.label}: matches is not a valid regex (${e.message})`); } }
    }
    if (!bad) console.log(`✓ snippets/${f}: ${n} snippets`);
  } catch (e) { bad++; console.error(`✗ snippets/${f}: ${e.message}`); }
}

// Units: a lesson's unit must be one its course lists (index.md units:); in a course with units, every lesson needs one.
import { loadDirMeta, CONTENT_ROOT } from './lesson.mjs';
import { join as pjoin } from 'node:path';
for (const l of lessons) {
  const course = l.slug.split('/').slice(0, -1).join('/');
  const units = loadDirMeta(pjoin(CONTENT_ROOT, course)).units;
  const ids = Array.isArray(units) ? units.map((u) => u.id) : [];
  if (l.unit && !ids.includes(l.unit)) { bad++; console.error(`✗ ${l.slug} › frontmatter: unit "${l.unit}" is not in ${course}/index.md units (${ids.join(', ') || 'none'})`); }
  else if (!l.unit && ids.length) console.warn(`⚠ ${l.slug} › frontmatter: no unit; it will show under "More lessons"`);
}
// Maths cards: every card's maths parses, and its unit is one of its course's units.
import { loadAllMathsCards, validateMathsCards } from './maths-cards.mjs';
for (const cards of loadAllMathsCards()) {
  const units = loadDirMeta(pjoin(CONTENT_ROOT, cards.course)).units;
  const errs = validateMathsCards(cards, Array.isArray(units) ? units.map((u) => u.id) : []);
  errs.forEach((e) => console.error('✗ ' + e)); bad += errs.length;
  if (!errs.length) console.log(`✓ snippets/${cards.file}.json: ${cards.cards.length} cards typeset, units match ${cards.course}`);
}
// Teacher notes: a lesson in a course with units should have teacher.yml, and every code-checked task a solution.
import { workItems } from './lesson-core.mjs';
for (const l of lessons) {
  if (!l.teacher) { if (l.unit) console.warn(`⚠ ${l.slug}: no teacher.yml (teacher notes and solutions)`); continue; }
  const sol = l.teacher.solutions || {};
  for (const w of workItems(l)) if (w.check?.type === 'code' && !sol[w.id]) console.warn(`⚠ ${l.slug} › teacher.yml: no solution for ${w.id}, which has a code check`);
}
// Error-task lint (warnings, never a failure): each planted error names its fault and misconception,
// stays on the lesson's path (no misconception from a later lesson), and a design fault is not a one-line hunt.
import { bugKeys, FAULTS } from './lesson-core.mjs';
let mis = {};
try { mis = JSON.parse(readFileSync('misconceptions.json', 'utf8')); } catch (e) { console.warn(`⚠ misconceptions.json: ${e.message}`); }
const bySlug = Object.fromEntries(lessons.map((l) => [l.slug, l]));
let warned = 0;
const warn = (m) => { warned++; console.warn('⚠ ' + m); };
for (const l of lessons) {
  const checks = [];
  for (const st of l.steps) {
    if (st.config.check) checks.push([`${st.id} "${st.title}"`, st.config.check]);
    for (const t of st.tasks) if (t.config.check) checks.push([`${st.id} "${st.title}" task ${t.index}`, t.config.check]);
  }
  for (const [where, k] of checks) {
    const at = `${l.slug} › ${where}`;
    const planted = k.type === 'bug' || k.fault !== undefined || k.misconception !== undefined;
    if (!planted) continue;
    if (!FAULTS.includes(k.fault)) warn(`${at}: name the fault (fault: ${FAULTS.join(' | ')})`);
    if (!k.misconception) warn(`${at}: name the misconception it targets (misconception: an id from misconceptions.json)`);
    else if (!mis[k.misconception]) warn(`${at}: misconception "${k.misconception}" is not in misconceptions.json`);
    else {
      const home = bySlug[mis[k.misconception].home];
      if (!home) warn(`${at}: misconception "${k.misconception}" has home "${mis[k.misconception].home}", which is not a lesson`);
      else if (home.slug.split('/').slice(0, -1).join('/') === l.slug.split('/').slice(0, -1).join('/') && (home.order ?? 0) > (l.order ?? 0)) {
        warn(`${at}: targets "${k.misconception}", which belongs to a later lesson (${home.slug}); plant this lesson's misconception instead`);
      }
    }
    if (k.type === 'bug' && k.fault === 'design' && bugKeys(k.answer).length < 2) {
      warn(`${at}: a design fault is not a one-line bug hunt; ask for every place the copy costs, or make it a refactor task`);
    }
  }
}
if (warned) console.warn(`${warned} warning(s) in error tasks (see AUTHORING.md, Error tasks)`);
else console.log('✓ error tasks: every planted error names its fault and an on-path misconception');
// Hidden assumptions (warnings, never a failure): every construct in the code students see is introduced by this
// or an earlier lesson, or labelled a recipe; radio value names fit in 8 characters. See tools/concepts.mjs.
{
  const { auditConcepts, prerequisites } = await import('./concepts.mjs');
  const { getSnippet } = await import('./lesson.mjs');
  const { warnings } = auditConcepts(lessons, getSnippet, prerequisites(loadDirMeta, CONTENT_ROOT));
  warnings.forEach((w) => console.warn('⚠ ' + w));
  if (!warnings.length) console.log('✓ hidden assumptions: every construct is introduced, assumed or a recipe');
}
// Progression nodes (warnings, never a failure): each maths lesson names its node, and its prerequisites (the node
// before, the descriptor's prior knowledge, its uses:) are taught earlier, assumed, or from an earlier year.
{
  const { auditNodes, loadProgressions } = await import('./progressions.mjs');
  const { prerequisites } = await import('./concepts.mjs');
  const { warnings } = auditNodes(lessons, prerequisites(loadDirMeta, CONTENT_ROOT), loadProgressions());
  warnings.forEach((w) => console.warn('⚠ ' + w));
  if (!warnings.length) console.log('✓ progression nodes: every prerequisite is taught earlier, assumed or from an earlier year');
}
// Woven strands (science Human endeavour and Inquiry): woven: lists descriptor codes from the subject's curriculum data,
// each in a woven strand, so the curriculum map can show where they are practised.
{
  const { loadCurriculum, WOVEN } = await import('./curriculum-map.mjs');
  let n = 0, tagged = 0;
  for (const l of lessons) {
    if (!l.woven?.length) continue;
    const subject = l.slug.split('/')[0], cur = loadCurriculum(subject), by = new Map((cur?.descriptors || []).map((d) => [d.code, d]));
    for (const c of l.woven) {
      const d = by.get(c);
      if (!d) { n++; console.warn(`⚠ ${l.slug} › woven: ${c} is not a descriptor in data/curriculum/${subject}.json`); }
      else if (!(WOVEN[subject] || []).includes(d.strand)) { n++; console.warn(`⚠ ${l.slug} › woven: ${c} is ${d.strand}, not a woven strand; use node: for it`); }
      else tagged++;
    }
  }
  if (!n) console.log(`✓ woven strands: ${tagged} tags, all woven-strand descriptors`);
}
// Bare tags in Markdown: in an HTML lesson, "<h1>" written outside `backticks` becomes a real tag on the page,
// the teacher guide and the slides, and swallows the text after it. Write tags as `<h1>`.
{
  const TAG = /<\/?(?:[a-z][a-z0-9]*)(?:\s[^<>]*)?>|<!DOCTYPE[^>]*>/i;
  const bare = (md) => String(md || '').replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '').replace(/<!--[\s\S]*?-->/g, '').match(TAG);
  let n = 0;
  for (const l of lessons) {
    const hints = (c, w) => [].concat(c.hint ?? []).map((h, i) => [`${w} hint ${i + 1}`, h]);
    const where = [['intro', l.intro], ...l.steps.flatMap((s) => [[`${s.id} "${s.title}"`, s.body], ...hints(s.config, s.id), ...s.tasks.flatMap((t) => [[`${t.id} "${t.title}"`, t.body], ...hints(t.config, t.id)])])];
    for (const k of ['before', 'leads', 'explain']) where.push([`teacher.yml ${k}`, l.teacher?.[k]]);
    (l.teacher?.running || []).forEach((r, i) => where.push([`teacher.yml running ${i + 1}`, r]));
    for (const [w, md] of where) { const m = bare(md); if (m) { n++; console.warn(`⚠ ${l.slug} › ${w}: ${m[0]} outside backticks becomes a real tag; write it as \`${m[0]}\``); } }
  }
  if (!n) console.log('✓ markdown: no bare tags outside backticks');
}
// Form checks (answer checks with form:, marked by Numbas in the page): the expected answer is equivalent and in the
// form, and every planted feedback answer is marked wrong. Run with the same Numbas build the pages load.
{
  const formed = [];
  for (const l of lessons) for (const s of l.steps) for (const [id, k] of [[s.id, s.config.check], ...s.tasks.map((t) => [t.id, t.config.check])]) if ((k?.type === 'answer' && k.form !== undefined) || k?.type === 'working') formed.push([`${l.slug} › ${id}`, k]);
  if (formed.length) {
    const { loadForms } = await import('./maths-forms.mjs');
    const F = await loadForms();
    let n = 0;
    for (const [at, k] of formed) {
      if (k.type === 'working') {
        const r = F.working((k.example || []).map(String), String(k.start), k.form ? String(k.form) : '');
        if (!r.ok) { n++; console.error(`✗ ${at}: example working is not accepted (${r.why})`); }
        for (const w of k.wrong || []) if (F.working(w.map(String), String(k.start), k.form ? String(k.form) : '').ok) { n++; console.error(`✗ ${at}: wrong working ${JSON.stringify(w)} would be accepted`); }
        continue;
      }
      const r = F.check(String(k.answer), String(k.answer), String(k.form));
      if (!r.ok || r.unsure) { n++; console.error(`✗ ${at}: answer "${k.answer}" is not ${k.form} (${r.unsure ? 'the checker cannot judge it' : r.why})`); }
      for (const [w] of k.feedback || []) { const fr = F.check(String(w), String(k.answer), String(k.form)); if (fr.ok) { n++; console.error(`✗ ${at}: feedback "${w}" would be marked right`); } }
    }
    bad += n;
    if (!n) console.log(`✓ form checks: ${formed.length} answers and workings marked as their lessons expect (Numbas ${(await import('./maths-forms.mjs')).NUMBAS_VERSION()})`);
  }
}
// Voiceover: in a voiced lesson every caption is spoken (or its say: line). Long lines make long clips.
{
  const { captionSay, SAY_MAX_WORDS } = await import('./lesson-core.mjs');
  const words = (t) => String(t).trim().split(/\s+/).filter(Boolean).length;
  let n = 0;
  for (const l of lessons.filter((x) => x.voice)) {
    for (const s of [...l.steps, ...(l.explainStep ? [l.explainStep] : [])].filter((x) => x.config.clip)) {
      const lines = [s.config.say ?? s.config.caption, ...s.config.clip.filter((a) => a && a.caption !== undefined).map((a) => captionSay(a.caption))].filter(Boolean);
      for (const t of lines) if (words(t) > SAY_MAX_WORDS) { n++; console.warn(`⚠ ${l.slug} › ${s.id}: spoken line has ${words(t)} words (keep to ${SAY_MAX_WORDS}, one sentence): "${t}"`); }
    }
  }
  if (!n) console.log('✓ voiceover: spoken lines are short');
}
// Practice templates (content/<course>/practice/<lesson>.yml): each names a lesson in its course, and every template
// makes sensible questions when tried many times (tools/practice-core.mjs).
{
  const { checkPractice } = await import('./practice-core.mjs');
  const { MATH } = await import('./math-expr.mjs');
  const YAML = (await import('yaml')).default;
  const { existsSync } = await import('node:fs');
  const courses = [...new Set(lessons.map((l) => l.slug.split('/').slice(0, -1).join('/')))];
  let files = 0, n = 0, w = 0, WPF = null;
  const boardWidgets = readdirSync('playground-board/widgets').filter((f) => f.endsWith('.js')).flatMap((f) => [...readFileSync(pjoin('playground-board/widgets', f), 'utf8').matchAll(/\.widget\('(\w+)'/g)].map((m) => m[1]));
  for (const c of courses) {
    const dir = pjoin(CONTENT_ROOT, c, 'practice');
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir).filter((x) => x.endsWith('.yml'))) {
      files++;
      const where = `${c}/practice/${f}`, name = f.replace(/\.yml$/, '');
      if (!bySlug[`${c}/${name}`]) { n++; console.error(`✗ ${where}: there is no lesson ${c}/${name}`); continue; }
      let d; try { d = YAML.parse(readFileSync(pjoin(dir, f), 'utf8')); } catch (e) { n++; console.error(`✗ ${where}: ${e.message}`); continue; }
      if (!WPF && /"form":"(expanded|factorised|simplified)"/.test(JSON.stringify(d))) WPF = await (await import('./maths-forms.mjs')).loadForms();
      const r = checkPractice(d, where, MATH, 300, WPF, boardWidgets);
      r.errors.forEach((e) => console.error('✗ ' + e)); r.warnings.forEach((e) => console.warn('⚠ ' + e));
      n += r.errors.length; w += r.warnings.length;
    }
  }
  bad += n;
  if (files && !n) console.log(`✓ practice: ${files} files of templates make sensible questions${w ? ` (${w} warnings)` : ''}`);
}
// Effort (warnings, never a failure): each lesson names its hard part, ends with a recap, and no first hint gives the
// answer away. One line here; `npm run effort` lists every gap (AUTHORING › Effort and struggle).
{
  const { auditEffort, summary } = await import('./effort.mjs');
  const { getSnippet } = await import('./lesson.mjs');
  const gaps = auditEffort(lessons, getSnippet);
  if (gaps.length) console.warn(`⚠ effort: ${summary(gaps)} (npm run effort lists them)`);
  else console.log('✓ effort: every lesson names its hard part, ends with a recap, and no first hint gives the answer');
}
// Open projects (content/<course>/projects.yml, tools/projects.mjs): each brief names a lesson, 2 to 4 milestones and
// real concept ids, and its example uses every skill it lists.
{
  const { loadProjects, checkProjects } = await import('./projects.mjs');
  const sets = loadProjects(CONTENT_ROOT, () => undefined);
  const course = (l) => l.slug.split('/').slice(0, -1).join('/');
  let n = 0, e = 0;
  for (const s of sets) for (const r of checkProjects(s, (c) => lessons.filter((l) => course(l) === c))) {
    if (r.level === 'error') { bad++; e++; console.error('✗ ' + r.msg); } else console.warn('⚠ ' + r.msg);
  }
  for (const s of sets) n += s.projects.length;
  if (sets.length && !e) console.log(`✓ projects: ${n} briefs in ${sets.length} courses; every example uses the skills its brief lists`);
}
process.exit(bad ? 1 : 0);
