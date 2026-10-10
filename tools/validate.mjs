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
import { loadMathsCards, validateMathsCards } from './maths-cards.mjs';
const cards = loadMathsCards();
if (cards) {
  const units = loadDirMeta(pjoin(CONTENT_ROOT, cards.course)).units;
  const errs = validateMathsCards(cards, Array.isArray(units) ? units.map((u) => u.id) : []);
  errs.forEach((e) => console.error('✗ ' + e)); bad += errs.length;
  if (!errs.length) console.log(`✓ snippets/maths.json: ${cards.cards.length} cards typeset, units match ${cards.course}`);
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
process.exit(bad ? 1 : 0);
