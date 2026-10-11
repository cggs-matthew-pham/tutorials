// Progression data and the node check (maths now; science once its lessons are tagged).
//
// Data: data/progressions/<subject>/<code>.md, one page per descriptor (see data/progressions/README.md).
// Lessons: `node: AC9M7A01 n2` (or a list), `uses: [AC9M7N07]` (a descriptor or node the lesson relies on that the
// data does not record), `assumes: [AC9M8A02 n3]` (taught in class, not on the site).
//
// A lesson's prerequisites: the node before it in the same descriptor, or for node 1 every descriptor named in the
// page's Prior Knowledge; plus its `uses:`. A prerequisite is met when an earlier lesson (lower order in the course,
// or a course it comes after in the subject's index.md) covers it (a descriptor: every one of its nodes), when the
// lesson lists it in `assumes:`, or when it is from an earlier year (taught in class). Related standards are ignored:
// many point forward.
//
// `node tools/progressions.mjs --report` (npm run nodes) prints each course's lessons, nodes and prerequisites.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export const CHECKED = ['maths', 'science', 'systems'];   // subjects whose lessons must name a node
const CODE = /AC9[A-Z]{1,4}\d{1,2}[A-Z]{1,3}\d{2}/g;

/** Parse one progression page. */
export function parsePage(md) {
  const head = md.match(/^#\s+(AC9\S+)\s+[—-]\s+(.+)$/m);
  if (!head) return null;
  const section = (name) => { const m = md.match(new RegExp(`^## ${name}\\s*\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'm')); return m ? m[1] : ''; };
  const nodes = [];
  const parts = md.split(/^#### /m).slice(1);
  for (const p of parts) {
    const t = p.match(/^(\d+)\.\s+(.+)$/m);
    if (!t) continue;
    const title = t[2].replace(/[⚑★]/g, '').trim();
    const crit = (p.match(/\*\*Success criteria:\*\*\s*\n([\s\S]*?)(?:\n\s*\n|$)/) || [, ''])[1]
      .split('\n').map((s) => s.replace(/^\s*-\s*/, '').trim()).filter(Boolean);
    nodes.push({ n: Number(t[1]), title, hinge: /⚑/.test(t[2]), width: /★/.test(t[2]), criteria: crit });
  }
  const code = head[1];
  return { code, title: head[2].trim(), year: yearOf(code), prior: [...new Set((section('Prior Knowledge').match(CODE) || []))].filter((c) => c !== code), nodes };
}

/** The year level in a code such as AC9M7A01 (7), AC9M10A01 (10) or AC9TDI8K03 (8); null if none. */
export function yearOf(code) { const m = String(code).match(/^AC9[A-Z]+?(\d{1,2})/); return m ? Number(m[1]) : null; }

/** All pages: Map code -> page. */
export function loadProgressions(root = 'data/progressions') {
  const out = new Map();
  if (!existsSync(root)) return out;
  for (const subj of readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory())) {
    for (const f of readdirSync(join(root, subj.name)).filter((n) => n.endsWith('.md'))) {
      const p = parsePage(readFileSync(join(root, subj.name, f), 'utf8'));
      if (p) out.set(p.code, { ...p, subject: subj.name, file: join(root, subj.name, f) });
    }
  }
  return out;
}

/** "AC9M7A01 n2" -> { code, n }; "AC9M7N07" -> { code, n: null }; else null. */
export function parseRef(s) {
  const m = String(s).trim().match(/^(AC9[A-Z0-9]+?)(?:\s+n(\d+))?$/);
  return m && m[1].match(CODE)?.[0] === m[1] ? { code: m[1], n: m[2] ? Number(m[2]) : null } : null;
}
const key = (r) => (r.n ? `${r.code} n${r.n}` : r.code);
const list = (v) => (v == null ? [] : Array.isArray(v) ? v : [v]).map(String);
const course = (slug) => slug.split('/').slice(0, -1).join('/');

/**
 * The check. lessons: parsed lessons (each with `node`, `uses`, `assumes`, `order`, `optional`, `slug`);
 * prereqs: course path -> Set of course paths (and ids) it comes after; data: loadProgressions().
 * Returns { warnings: [string], report: [{ slug, title, course, nodes, deps: [{ ref, status, by }] }] }.
 */
export function auditNodes(lessons, prereqs, data) {
  const warnings = [];
  const report = [];
  const subjectOf = (l) => l.slug.split('/')[0];
  const before = (a, b) => (course(a.slug) === course(b.slug) ? (a.order ?? 0) < (b.order ?? 0) : prereqs(course(b.slug)).has(course(a.slug)));
  const tagged = lessons.filter((l) => list(l.node).length);
  for (const l of lessons) if (CHECKED.includes(subjectOf(l)) && !list(l.node).length) warnings.push(`${l.slug} › node: none; name the progression node it teaches (node: AC9M7A01 n1)`);

  for (const l of tagged) {
    const mine = [];
    for (const s of list(l.node)) {
      const r = parseRef(s);
      if (!r || !r.n) { warnings.push(`${l.slug} › node: "${s}" is not a node (write it as AC9M7A01 n2)`); continue; }
      const page = data.get(r.code);
      if (!page) { warnings.push(`${l.slug} › node: no progression page for ${r.code} (add data/progressions/${subjectOf(l)}/${r.code}.md)`); mine.push(r); continue; }
      if (!page.nodes.some((x) => x.n === r.n)) { warnings.push(`${l.slug} › node: ${r.code} has no node ${r.n} (it has ${page.nodes.length})`); continue; }
      mine.push(r);
    }
    const assumed = list(l.assumes).map(parseRef).filter(Boolean);
    for (const s of list(l.assumes)) if (!parseRef(s) && CHECKED.includes(subjectOf(l))) warnings.push(`${l.slug} › assumes: "${s}" is not a descriptor or node code`);
    const earlier = tagged.filter((e) => e !== l && before(e, l) && (!e.optional || l.optional));
    const coveredBy = (code, n) => {
      const hit = (e) => list(e.node).map(parseRef).some((r) => r && r.code === code && r.n === n);
      if (mine.some((r) => r.code === code && r.n === n)) return l.slug;
      return earlier.find(hit)?.slug || null;
    };
    const year = Math.min(...mine.map((r) => yearOf(r.code) ?? 99));
    const deps = [];
    const need = (ref, why) => { if (!deps.some((d) => key(d.ref) === key(ref))) deps.push({ ref, why }); };
    for (const r of mine) {
      if (r.n > 1) need({ code: r.code, n: r.n - 1 }, `node before ${key(r)}`);
      else for (const c of data.get(r.code)?.prior || []) need({ code: c, n: null }, `prior knowledge of ${r.code}`);
    }
    for (const s of list(l.uses)) {
      const r = parseRef(s);
      if (!r) { warnings.push(`${l.slug} › uses: "${s}" is not a descriptor or node code`); continue; }
      need(r, 'uses');
    }
    const rows = [];
    for (const { ref, why } of deps) {
      const isAssumed = assumed.some((a) => a.code === ref.code && (a.n == null || a.n === ref.n));
      const y = yearOf(ref.code);
      let status, by = '';
      if (isAssumed) status = 'assumed';
      else if (y != null && year !== 99 && y < year) status = 'earlier year';
      else if (ref.n) {
        by = coveredBy(ref.code, ref.n);
        status = by ? 'taught' : 'missing';
        if (!by) warnings.push(`${l.slug} › needs ${key(ref)} (${why}), which no earlier lesson teaches; teach it earlier, check it in this lesson and list it in assumes:, or list it in assumes: if it is taught in class`);
      } else {
        const page = data.get(ref.code);
        if (!page) {
          status = 'no page';
          warnings.push(`${l.slug} › needs ${ref.code} (${why}), which has no progression page; add data/progressions/${subjectOf(l)}/${ref.code}.md, or list it in assumes: if it is taught in class`);
        } else {
          const gaps = page.nodes.filter((x) => !coveredBy(ref.code, x.n) && !assumed.some((a) => a.code === ref.code && a.n === x.n)).map((x) => `n${x.n}`);
          status = gaps.length ? 'missing' : 'taught';
          by = gaps.length ? gaps.join(', ') : '';
          if (gaps.length) warnings.push(`${l.slug} › needs ${ref.code} (${why}), but no earlier lesson teaches ${gaps.join(', ')}; teach it earlier, or list it in assumes: (taught in class)`);
        }
      }
      rows.push({ ref: key(ref), why, status, by });
    }
    report.push({ slug: l.slug, title: l.title, course: course(l.slug), order: l.order, nodes: mine.map(key), deps: rows });
  }
  return { warnings, report };
}

// CLI: npm run nodes
if (process.argv[1] && process.argv[1].endsWith('progressions.mjs') && process.argv.includes('--report')) {
  const { loadLessons, loadDirMeta, CONTENT_ROOT } = await import('./lesson.mjs');
  const { prerequisites } = await import('./concepts.mjs');
  const lessons = loadLessons();
  const { report, warnings } = auditNodes(lessons, prerequisites(loadDirMeta, CONTENT_ROOT), loadProgressions());
  let c = '';
  for (const r of report.sort((a, b) => a.course.localeCompare(b.course) || (a.order ?? 0) - (b.order ?? 0))) {
    if (r.course !== c) { c = r.course; console.log(`\n${c}`); }
    console.log(`  ${String(r.order ?? '').padStart(2)}. ${r.title} — ${r.nodes.join(', ')}`);
    for (const d of r.deps) console.log(`        ${d.status === 'missing' || d.status === 'no page' ? '✗' : '·'} ${d.ref} (${d.why}): ${d.status}${d.by ? ' ' + d.by.replace(/^maths\/[^/]+\//, '') : ''}`);
  }
  console.log(`\n${warnings.length} warning(s)`);
}
