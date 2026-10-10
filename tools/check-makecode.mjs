// `npm run check-makecode`: every code-checked Modify and Make task in the MakeCode courses, checked statically
// (no editor needed) with the same rules the lesson page uses:
//   1. the teacher solution passes the task's check (validate checks this too);
//   2. the starter the student begins from does not (a task that ticks before the student does anything);
//   3. no earlier task's solution in the same step passes it. A step keeps one project, so a student who has done
//      task 1 starts task 2 from that code; if task 1's answer already ticks task 2, task 2 is free.
// A task with no solution in teacher.yml is listed, not failed (validate warns about it). Exit 1 on any failure.
//   node tools/check-makecode.mjs [course]     e.g. code/arcade
import { loadLessons, getSnippet, evalRules, workItems, unlockKind, MAKECODE_KINDS } from './lesson.mjs';

const only = process.argv[2];
const lessons = loadLessons().filter((l) => l.language === 'makecode' && (!only || l.slug.startsWith(only + '/')))
  .sort((a, b) => a.slug.split('/').slice(0, -1).join('/').localeCompare(b.slug.split('/').slice(0, -1).join('/')) || (a.order ?? 0) - (b.order ?? 0));
const read = (l, ref) => { try { return getSnippet(l.dir, ref); } catch { return null; } };
const failing = (rules, code, kind) => evalRules(rules, code, kind).filter((r) => !r.ok).map((r) => r.label);
let fails = 0, tasks = 0, noSolution = 0;
const fail = (m) => { fails++; console.log('  ✗ ' + m); };

for (const l of lessons) {
  const items = workItems(l).filter((w) => w.check?.type === 'code' && w.check.rules);
  if (!items.length) continue;
  console.log(`${l.slug}`);
  const sol = l.teacher?.solutions || {};
  for (const w of items) {
    tasks++;
    const before = fails;
    const kind = unlockKind(l, w.step);
    if (!MAKECODE_KINDS.includes(kind)) { console.log(`  · ${w.id}: playground "${kind}" is not MakeCode, skipped`); continue; }
    const label = `${w.id}${w.task ? ` (${(w.check.text || '').slice(0, 60)})` : ''}`;
    // 1. the solution passes
    const s = sol[w.id] ? read(l, sol[w.id]) : null;
    if (s === null) { noSolution++; console.log(`  · ${label}: no solution in teacher.yml`); }
    else { const f = failing(w.check.rules, s, kind); if (f.length) fail(`${label}: the solution ${sol[w.id]} fails: ${f.join('; ')}`); }
    // 2. the starter does not
    const starterRef = w.task?.config.try?.starter ?? w.task?.config.starter ?? w.step.config.try?.starter;
    const starter = starterRef ? read(l, starterRef) : '';
    if (starter !== null && !failing(w.check.rules, starter, kind).length) fail(`${label}: the starter ${starterRef || '(empty)'} already passes, so it ticks before the student starts`);
    // 3. no earlier solution in the same step does (tasks that bring their own starter start fresh)
    if (w.task && !(w.task.config.try?.starter ?? w.task.config.starter)) {
      for (const e of items.filter((x) => x.step === w.step && x.task && x.task.index < w.task.index)) {
        const es = sol[e.id] ? read(l, sol[e.id]) : null;
        if (es && !failing(w.check.rules, es, kind).length) fail(`${label}: the solution to ${e.id} (${sol[e.id]}) already passes it, so it ticks for free`);
      }
    }
    if (fails === before) console.log(`  ✓ ${w.id}`);
  }
}
console.log(`\n${tasks} code-checked task(s) in ${lessons.length} MakeCode lesson(s); ${noSolution} without a solution; ${fails ? `${fails} FAILED` : 'all passed'}`);
process.exit(fails ? 1 : 0);
