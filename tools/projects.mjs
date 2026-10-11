// Open projects (roadmap/code.md › Recap and open projects): small self-paced briefs written per course in
// content/<course>/projects.yml, with example programs beside it in content/<course>/projects/. Kept outside the
// lesson folders, so adding a brief never re-records a lesson's clips.
//
//   playground: turtle                    the course's playground (turtle, html, dom, microbit, arcade)
//   projects:
//     - id: night-sky                     slug, unique in the course
//       title: Night sky
//       after: turtle-parameters          the lesson after which every skill it needs has been taught
//       goal: |                           Markdown: what to make (never how)
//         Draw a night sky ...
//       example: night-sky.py             a possible result: drawn as the brief's picture, never shown to students
//       uses: [loop-index, param, random] 3 or 4 concept ids (tools/concepts-core.mjs); { id, label } renames one
//       milestones: [It runs ..., ...]    2 to 4, ticked by the student
//       stretch: [...]                    "make it yours" ideas
//       teacher: |                        notes for the teacher guide (Markdown)
//       parts:                            optional, for a crossover: one playground each (title, playground,
//         - { title: The micro:bit, playground: microbit, uses: [...], example: x.ts, starter: ... }
//
// A part's playground defaults to the course's (turtle, html, dom, microbit, arcade); the scan reads its language.
// The project page lights a "You'll use" chip when the student's own code uses it (concepts-core in the browser).
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse as YAMLparse } from 'yaml';
import { conceptIds, conceptsIn, CONCEPTS } from './concepts-core.mjs';

export const LANG_OF = { turtle: 'python', python: 'python', html: 'html', dom: 'html', microbit: 'makecode', arcade: 'makecode' };
const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Every course's briefs: [{ course, file, dir, projects: [...] }], parts filled in. defaultPlay(course) names the course's playground. */
export function loadProjects(root, defaultPlay) {
  const out = [];
  const walk = (rel) => {
    const dir = join(root, rel);
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) walk(rel ? `${rel}/${e.name}` : e.name);
      else if (e.name === 'projects.yml' && rel) {
        const file = join(dir, e.name);
        const data = YAMLparse(readFileSync(file, 'utf8')) || {};
        const projects = (Array.isArray(data.projects) ? data.projects : []).map((p) => {
          const parts = (Array.isArray(p.parts) && p.parts.length ? p.parts : [{ playground: p.playground, uses: p.uses, example: p.example, starter: p.starter }])
            .map((x) => {
              const playground = x.playground || data.playground || defaultPlay(rel);
              const read = (f) => (f && existsSync(join(dir, 'projects', f)) ? readFileSync(join(dir, 'projects', f), 'utf8') : null);
              return {
                title: x.title || '', playground, language: LANG_OF[playground] || 'python',
                uses: (Array.isArray(x.uses) ? x.uses : []).map((u) => (typeof u === 'string' ? { id: u } : u)),
                example: x.example || null, exampleCode: read(x.example),
                starter: typeof x.starter === 'string' ? (x.starter.includes('\n') || !read(x.starter) ? x.starter : read(x.starter)) : null,
                height: Number(x.height) || null,
              };
            });
          return { ...p, parts };
        });
        out.push({ course: rel, file, dir, projects });
      }
    }
  };
  walk('');
  return out;
}

/** Problems with a course's briefs: [{ level: 'error' | 'warn', msg }]. lessonsIn(course) gives its lessons. */
export function checkProjects(set, lessonsIn) {
  const out = [], where = set.file.replace(/^.*?content\//, 'content/');
  const err = (m) => out.push({ level: 'error', msg: `${where}: ${m}` }), warn = (m) => out.push({ level: 'warn', msg: `${where}: ${m}` });
  const seen = new Set(), names = new Set(lessonsIn(set.course).map((l) => l.slug.split('/').pop()));
  if (!set.projects.length) warn('no projects listed');
  for (const p of set.projects) {
    const tag = `project "${p.id}"`;
    if (!p.id || !ID.test(p.id)) { err(`a project needs an id (lower-case words joined by -): ${p.id}`); continue; }
    if (seen.has(p.id)) err(`${tag} is listed twice`); seen.add(p.id);
    if (!p.title) err(`${tag} has no title`);
    if (!p.goal) err(`${tag} has no goal`);
    if (!p.after || !names.has(String(p.after))) err(`${tag}: after: names no lesson of ${set.course} (${p.after})`);
    const ms = Array.isArray(p.milestones) ? p.milestones : [];
    if (ms.length < 2 || ms.length > 4) err(`${tag} needs 2 to 4 milestones (it has ${ms.length})`);
    for (const [i, part] of p.parts.entries()) {
      const pt = p.parts.length > 1 ? `${tag} part ${i + 1}` : tag;
      if (!LANG_OF[part.playground]) err(`${pt}: no playground for projects called "${part.playground}" (turtle, html, dom, microbit, arcade)`);
      const ids = conceptIds(part.language);
      if (!part.uses.length) err(`${pt} lists no skills (uses:)`);
      if (part.uses.length > 4) warn(`${pt} lists ${part.uses.length} skills: keep it to 3 or 4, so students build, not tick boxes`);
      for (const u of part.uses) if (!ids.has(u.id)) err(`${pt}: uses: "${u.id}" is not a ${part.language} concept (tools/concepts-core.mjs)`);
      if (part.example && part.exampleCode == null) err(`${pt}: example ${part.example} is not in ${set.course}/projects/`);
      if (part.exampleCode != null) {
        const found = conceptsIn(part.exampleCode, part.language);
        const miss = part.uses.filter((u) => ids.has(u.id) && !found.has(u.id)).map((u) => u.id);
        if (miss.length) err(`${pt}: its example does not use ${miss.join(', ')}, so a student's version might not either`);
      } else warn(`${pt} has no example (the brief's picture, and the check that its skills can be used together)`);
    }
  }
  return out;
}

/** The label students see for a skill. */
export const skillLabel = (language, u) => u.label || (CONCEPTS[language] || []).find((c) => c.id === u.id)?.label || u.id;
