// Node/fs side of lesson loading and validation. Pure logic lives in lesson-core.mjs.
//
// Content tree:  content/<subject>/<collection>/<lesson>/lesson.md
// A lesson's slug is its path under content/ (e.g. "code/python/turtle-intro") and is also
// its URL path on the site. Optional content/<dir>/index.md (frontmatter: title, summary)
// names the subject and collection pages.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve, relative, sep } from 'node:path';
import YAML from 'yaml';
import { snippetFrom, parseLessonText, validateLessonCore, snippetId, FEATURES } from './lesson-core.mjs';

export * from './lesson-core.mjs';

export const CONTENT_ROOT = resolve('content');

const readIn = (dir) => (file) => { const p = join(dir, file); return existsSync(p) ? readFileSync(p, 'utf8') : undefined; };

export function listLessonDirs(root = CONTENT_ROOT) {
  const out = [];
  const walk = (dir) => {
    if (existsSync(join(dir, 'lesson.md'))) { out.push(dir); return; }
    for (const name of readdirSync(dir).sort()) {
      const p = join(dir, name);
      if (name.startsWith('.') || name === 'node_modules') continue;
      if (statSync(p).isDirectory()) walk(p);
    }
  };
  if (existsSync(root)) walk(root);
  return out;
}

/** Frontmatter of content/<dir>/index.md, for subject and collection pages. */
export function loadDirMeta(dir) {
  const file = join(dir, 'index.md');
  if (!existsSync(file)) return {};
  const m = readFileSync(file, 'utf8').replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/);
  return m ? YAML.parse(m[1]) || {} : {};
}

/** Read a code reference "file" or "file#region" relative to the lesson dir. */
export function getSnippet(dir, ref) { return snippetFrom(readIn(dir), ref); }

export function loadLesson(dir) {
  const slug = relative(CONTENT_ROOT, dir).split(sep).join('/');
  const lesson = { ...parseLessonText(readFileSync(join(dir, 'lesson.md'), 'utf8'), slug), dir };
  // teacher.yml beside lesson.md: notes, goals, exit ticket, student explanation and solutions (see AUTHORING.md).
  const t = join(dir, 'teacher.yml');
  if (existsSync(t)) lesson.teacher = YAML.parse(readFileSync(t, 'utf8')) || {};
  return lesson;
}

export function loadLessons(only) {
  return listLessonDirs()
    .map(loadLesson)
    .filter((l) => !only || l.slug === only || l.slug.endsWith('/' + only));
}

/** Snippet files: { turtle: {...}, html: {...} } (parsed JSON), read from snippets/ in the repo root. */
export function loadSnippetFiles() {
  const out = {};
  for (const kind of ['turtle', 'html', 'microbit', 'arcade', 'robot']) {
    const p = resolve('snippets', `${kind}.json`);
    if (existsSync(p)) out[kind] = JSON.parse(readFileSync(p, 'utf8'));
  }
  return out;
}

/** Shared modules: { name: source } from modules/*.py in the repo root. */
export function loadSharedModules() {
  const dir = resolve('modules');
  const out = {};
  if (existsSync(dir)) for (const f of readdirSync(dir)) if (f.endsWith('.py')) out[f.slice(0, -3)] = readFileSync(join(dir, f), 'utf8');
  return out;
}

export function validateLesson(lesson) {
  const files = loadSnippetFiles();
  const known = Object.fromEntries(Object.entries(files).map(([k, d]) => [k, new Set(d.groups.flatMap((g) => g.items.map((i) => snippetId(i.label))))]));
  if (known.turtle) for (const f of FEATURES) known.turtle.add(f.id);
  return validateLessonCore(lesson, readIn(lesson.dir), known, loadSharedModules());
}
