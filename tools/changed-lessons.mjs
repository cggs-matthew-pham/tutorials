// Which lessons changed since they were last published, for the "Publish changed lessons" workflow.
//   node tools/changed-lessons.mjs --live <gh-pages checkout> [--lessons "slug course ..."] [--json out.json]
//
// Base commit: the last recording publish ("Site build from <sha>" in the live branch's history), or, per lesson,
// the commit this workflow last published it from (published.json on the live branch) when that is newer.
// A lesson counts as changed when anything in its folder, or its class/<name>.yml or practice/<name>.yml, differs
// between its base and HEAD. Course-level files (index.md, primers/, projects.yml) mark the course itself.
// Anything outside content/ that the build or clips depend on (tools, playgrounds, snippets, site, data …) is
// listed as shared: those changes reach the live site only through a whole-site publish.
//
// --lessons skips the git comparison: each word is a lesson slug (code/python-foundations/turtle-intro), a course
// (code/python-foundations: all its lessons) or a lesson folder name (turtle-intro).
// Writes lessons=, courses=, shared= (space separated) and count= to $GITHUB_OUTPUT when set.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const argv = process.argv.slice(2);
const opt = (n, d) => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : d);
const LIVE = opt('--live');
const git = (...a) => execFileSync('git', a, { encoding: 'utf8', maxBuffer: 64 << 20 }).trim();
const tryGit = (...a) => { try { return git(...a); } catch { return null; } };

// Lessons are content/<subject>/<course>/<lesson>/lesson.md (no dependencies, so this runs before npm ci).
const dirs = (p) => (existsSync(p) ? readdirSync(p, { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith('.')).map((d) => d.name) : []);
const ALL = dirs('content').flatMap((s) => dirs(`content/${s}`).flatMap((c) => dirs(`content/${s}/${c}`)
  .filter((l) => existsSync(`content/${s}/${c}/${l}/lesson.md`)).map((l) => `${s}/${c}/${l}`)));
const isLesson = new Set(ALL);
const courseOf = (slug) => slug.split('/').slice(0, 2).join('/');

// Paths that never affect the site.
const DOCS = /^(README\.md|ROADMAP\.md|BUILDING\.md|AUTHORING\.md|CLAUDE\.md|roadmap\/|\.github\/|\.gitignore$)/;

const lessons = new Set(), courses = new Set(), shared = new Set();
let base = null;
const note = [];

if (opt('--lessons')) {
  for (const w of opt('--lessons').split(/[\s,]+/).filter(Boolean).map((w) => w.replace(/^\/+|\/+$/g, '').replace(/^content\//, ''))) {
    const hits = isLesson.has(w) ? [w] : ALL.filter((s) => courseOf(s) === w || s.endsWith('/' + w));
    if (!hits.length) { console.error(`No lesson or course matches "${w}".`); process.exit(1); }
    hits.forEach((s) => lessons.add(s));
  }
} else {
  if (!LIVE || !existsSync(LIVE)) { console.error('--live <gh-pages checkout> is needed to find what was last published.'); process.exit(1); }
  // The newest recording publish in the live branch's history.
  const log = git('-C', LIVE, 'log', '--format=%s', '-n', '200');
  const m = log.match(/^Site build from ([0-9a-f]{7,40})$/m);
  if (!m) { console.error('No "Site build from <sha>" commit in the live branch history. Name the lessons instead (--lessons).'); process.exit(1); }
  base = tryGit('rev-parse', '--verify', '--quiet', `${m[1]}^{commit}`);
  if (!base) { console.error(`Commit ${m[1]} (last whole-site publish) is not in this checkout's history. Fetch more history or name the lessons.`); process.exit(1); }
  let perLesson = {};
  try { perLesson = JSON.parse(readFileSync(join(LIVE, 'published.json'), 'utf8')).lessons || {}; } catch {}
  const baseFor = (slug) => {
    const s = perLesson[slug] && tryGit('rev-parse', '--verify', '--quiet', `${perLesson[slug]}^{commit}`);
    return s && tryGit('merge-base', '--is-ancestor', base, s) !== null ? s : base;
  };

  // Files changed since the site base; per-lesson bases are checked afterwards.
  const files = git('diff', '--name-only', base, 'HEAD').split('\n').filter(Boolean);
  const candidates = new Set();
  for (const f of files) {
    if (DOCS.test(f)) continue;
    if (!f.startsWith('content/')) { shared.add(f.split('/')[0]); continue; }
    const p = f.slice('content/'.length).split('/');
    if (p.length < 3) { shared.add(f); continue; }          // content/index.md, content/code/index.md, plain pages
    const course = p.slice(0, 2).join('/');
    const lesson = `${course}/${p[2]}`;
    if (isLesson.has(lesson)) { candidates.add(lesson); continue; }
    const named = p.length === 4 && /^(class|practice)$/.test(p[2]) && `${course}/${p[3].replace(/\.ya?ml$/, '')}`;
    if (named && isLesson.has(named)) { candidates.add(named); continue; }
    courses.add(course);                                     // index.md, primers/, projects.yml, a removed lesson …
  }
  for (const slug of candidates) {
    const b = baseFor(slug);
    const course = courseOf(slug), name = slug.split('/').pop();
    const paths = [`content/${slug}`, `content/${course}/class/${name}.yml`, `content/${course}/practice/${name}.yml`];
    if (b === base || git('diff', '--name-only', b, 'HEAD', '--', ...paths)) lessons.add(slug);
    else note.push(`${slug}: unchanged since it was published from ${b.slice(0, 7)}`);
  }
}
for (const s of lessons) courses.add(courseOf(s));

const out = { base, lessons: [...lessons].sort(), courses: [...courses].sort(), shared: [...shared].sort() };
if (opt('--json')) writeFileSync(opt('--json'), JSON.stringify(out, null, 1) + '\n');
if (process.env.GITHUB_OUTPUT) {
  writeFileSync(process.env.GITHUB_OUTPUT, [
    `lessons=${out.lessons.join(' ')}`, `courses=${out.courses.join(' ')}`, `shared=${out.shared.join(' ')}`, `count=${out.lessons.length}`,
  ].join('\n') + '\n', { flag: 'a' });
}
if (base) console.log(`Compared with ${base.slice(0, 7)} (last whole-site publish).`);
console.log(`Lessons (${out.lessons.length}):${out.lessons.map((s) => '\n  ' + s).join('') || ' none'}`);
console.log(`Courses whose pages are rebuilt: ${out.courses.join(', ') || 'none'}`);
note.forEach((n) => console.log('  · ' + n));
if (out.shared.length) console.log(`⚠ Shared files changed (${out.shared.join(', ')}): these reach the site only through a whole-site publish.`);
