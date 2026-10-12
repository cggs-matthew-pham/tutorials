import { createHash } from 'node:crypto';
// Teacher resources, generated from each lesson.md and its teacher.yml at build time (no AI):
//   deck.md       a Waypoints Prepare slide deck (Marp; see waypoints-kit format-prepare.md)
//   worksheet.md  a Waypoints Prepare/Print resource with :::teacher-note answers (format-print.md)
//   cheatsheet    one Print reference sheet per unit, from the snippets the unit unlocks
// plus the teacher guide pages under /teach/. Students never see solutions on lesson pages.
import { snippetPattern } from './snippet-pattern.mjs';
import { CLASS_AT, snippetFrom, splitFiles, parseTrace, workItems, sourceList } from './lesson-core.mjs';

export const SITE_URL = (process.env.SITE_URL || 'https://tutorials.learningwaypoints.com').replace(/\/$/, '');
export const PREPARE_URL = 'https://prepare.learningwaypoints.com/';
const STAGES = /^(Predict|Run|Investigate|Modify|Practise|Make|Info):\s*/i;
const bare = (t) => String(t).replace(STAGES, '');
// A maths task's text carries its worked example (a numbered list of $maths$ lines), so slides and worksheets keep it.
// Maths headings start with a capital ("Modify: harder scales" → "Harder scales"); code decks keep their titles as written.
const capMaths = (t) => (LANG === 'maths' ? t.charAt(0).toUpperCase() + t.slice(1) : t);
// A worked example on a slide, for live modelling: the slide shows the problem, and the steps stay hidden as Marp
// fragments ("1)") until the teacher has modelled them and reveals them to compare. The speaker notes carry a
// line-by-line script (what to write, what to say) for a teacher who is unsure how to model it.
function workedSlide(md) {
  const lines = String(md).split('\n');
  const steps = lines.map((l) => /^(\d+)\. \$(.+?)\$(?: — (.*))?$/.exec(l)).filter(Boolean).map((m) => ({ m: m[2], why: m[3] || '' }));
  const intro = lines.filter((l) => !/^\d+\. \$/.test(l)).join('\n').trim();
  // Speaker notes are plain text: TeX becomes readable maths (3x/3 → 3x ÷ 3, \\checkmark → ✓).
  const tex = (t) => String(t).replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, '$1 ÷ $2').replace(/\\text\{([^{}]*)\}/g, '$1')
    .replace(/\\times/g, '×').replace(/\\div/g, '÷').replace(/\\checkmark/g, '✓').replace(/\\[,;:! ]/g, '').replace(/\\[a-zA-Z]+/g, '').replace(/[{}]/g, '').replace(/\s+/g, ' ').trim();
  const plain = (t) => tex(String(t).replace(/\$([^$]+)\$/g, '$1').replace(/\*\*/g, ''));
  const slide = `${intro ? prose(intro) + '\n\n' : ''}$$${steps[0]?.m || ''}$$\n\n` + steps.slice(1).map((st, i) => `${i + 1}) $${st.m}$${st.why ? ` — ${st.why}` : ''}`).join('\n');
  const said = (w) => { const t = plain(w); return /[.?!]$/.test(t) ? t : `${t}.`; };
  const script = steps.map((st, i) => `${i ? `Line ${i}` : 'Start'}: write ${tex(st.m)}${st.why ? ` and say "${said(st.why)}"` : '.'}`).join(' ');
  return { slide, notes: `Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. ${script}` };
}
const hasWorked = (md) => LANG === 'maths' && /^1\. \$/m.test(String(md || ''));

// Maths lessons: a ```worked block (one step per line, "maths :: reason") becomes a numbered list with the maths
// typeset, so slides and worksheets show the worked example rather than its source.
const workedToMd = (md) => String(md || '').replace(/```worked\n([\s\S]*?)```/g, (m, src) => src.split('\n').map((l) => l.trim()).filter(Boolean)
  .map((l, i) => { const k = l.indexOf('::'); const mth = (k < 0 ? l : l.slice(0, k)).trim(), why = k < 0 ? '' : l.slice(k + 2).trim(); return `${i + 1}. $${mth}$${why ? ` — ${why}` : ''}`; }).join('\n'));
const forOutput = (lesson) => lesson.language !== 'maths' ? lesson : {
  ...lesson, intro: workedToMd(lesson.intro),
  steps: lesson.steps.map((st) => ({ ...st, body: workedToMd(st.body), tasks: st.tasks.map((t) => ({ ...t, body: workedToMd(t.body) })) })),
};
const strip = (t) => String(t).split('‹').join('').split('›').join('');
const oneLine = (t) => String(t || '').replace(/\s+/g, ' ').trim();
// Markdown that is safe inside a slide or a printed page: no slide separators, no "*" lists.
const safe = (t) => String(t || '').replace(/^---+$/gm, '').replace(/^(\s*)\* /gm, '$1- ').trim();
// Lesson step text without fenced code that belongs to the tutorial (task bodies keep their own code).
const prose = (t) => safe(String(t || '').replace(/```[\s\S]*?```/g, '').replace(/\n{3,}/g, '\n\n'));
const seeded = (seed) => { let h = 2166136261; for (const c of String(seed)) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0) / 4294967296); };
const shuffled = (arr, seed) => { const r = seeded(seed), a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const letters = 'ABCDEFGH';
// Plain text (goals, check questions and answers, snippet labels) going into Markdown: escape < > & outside
// `code` spans, so an HTML lesson's "<h1>" shows as text instead of opening a real tag (decks allow raw HTML).
const pt = (t) => String(t ?? '').split(/(`[^`]*`)/).map((part, i) => (i % 2 ? part : part.replace(/&(?![a-z#0-9]+;)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'))).join('');
/** checkParts, with its plain-text parts made safe for Markdown (decks and worksheets). */
const checkPartsMd = (k, snip, key) => {
  const p = checkParts(k, snip, key);
  return { ...p, q: pt(p.q), answer: pt(p.answer), options: p.options && p.options.map(pt), items: p.items && p.items.map(pt), match: p.match && { lefts: p.match.lefts, rights: p.match.rights.map(pt) } };
};

const BADGE = {
  check: '<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>',
  activity: '<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>',
  discussion: '<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>',
};

/** Where a step's playground opens on the live site, full screen. */
export const stepUrl = (lesson, step) => `${SITE_URL}/${lesson.slug}/?full=${step.id}#${step.id}`;
export const teachPath = (lesson) => `teach/${lesson.slug}/`;

/** The code a check shows (bug and parsons carry their own). */
const checkCode = (k, snip) => (k.code ? snip(k.code) : '');

/** One check as text pieces: the question, the student's way to answer, and the answer. */
function checkParts(k, snip, key) {
  const q = k.q || k.text || '';
  if (k.type === 'question' || (k.type === 'predict' && k.options)) {
    const ans = k.type === 'question' ? k.options[k.answer] : (k.actual || '');
    return { q, options: k.options, answer: ans, explain: k.explain || (k.type === 'predict' ? '' : '') };
  }
  if (k.type === 'predict') return { q, answer: k.actual || '', explain: '' };
  if (k.type === 'flag') return { q, field: true, answer: 'A flag (the exact answer is in the teacher notes)', explain: k.explain || '' };
  if (k.type === 'number') return { q, field: true, answer: String(k.answer), explain: k.explain || '' };
  if (k.type === 'trace') {
    const t = parseTrace(k.table);
    return { q: k.text || 'Fill in the table.', trace: t, answer: t.rows.flat().filter((c) => c.blank).map((c) => c.v).join(', '), explain: k.explain || '' };
  }
  if (k.type === 'match') {
    const rights = shuffled(k.pairs.map((p) => p[1]), key);
    return { q: k.q || 'Match each item with what it does.', match: { lefts: k.pairs.map((p) => p[0]), rights }, answer: k.pairs.map((p) => `${p[0]} → ${letters[rights.indexOf(p[1])]}. ${p[1]}`).join('; '), pairs: k.pairs, rights, explain: k.explain || '' };
  }
  if (k.type === 'bug') {
    const files = splitFiles(checkCode(k, snip));
    const ans = (Array.isArray(k.answer) ? k.answer : [k.answer]).map(String);
    return { q: k.text || 'Find the line with the bug.', files, answer: `line ${ans.join(' and ')}`, explain: k.explain || '' };
  }
  if (k.type === 'parsons') {
    const lines = checkCode(k, snip).replace(/\n$/, '').split('\n').filter((l) => l.trim());
    return { q: k.text || 'Put the lines in order.', parsons: shuffled(lines.concat(k.extra || []), key), solution: lines.join('\n'), answer: 'see the program below', explain: k.explain || '' };
  }
  if (k.type === 'answer') return { q, field: true, answer: k.equation ? `any equation that is true when ${Object.entries(k.equation).map(([n, v]) => `$${n} = ${v}$`).join(', ')}` : String(k.answer), explain: k.explain || '' };
  if (k.type === 'reasoning') return { q, field: true, answer: (k.steps || []).map(([a, r]) => `${a} (${r})`).join('; '), explain: k.explain || '' };
  if (k.type === 'working') return { q, field: true, answer: [k.start, ...(k.example || [])].join(' → '), explain: k.explain || '' };
  if (k.type === 'board') return { q: k.text, board: true, answer: '', explain: k.explain || '' };
  if (k.type === 'sort') return { q: k.q || 'Sort each one into its group.', options: k.options, items: k.items.map((it) => it[0]), answer: k.items.map((it) => `${it[0]} → ${it[1]}`).join('; '), explain: k.explain || '' };
  if (k.type === 'code') return { q: k.text, rules: k.rules, answer: '', explain: '' };
  if (k.type === 'reflect') return { q: k.text, reflect: true, answer: '', explain: '' };
  return { q, answer: '', explain: '' };
}

const numbered = (code) => code.replace(/\n$/, '').split('\n').map((l, i) => `${String(i + 1).padStart(2)}  ${l}`).join('\n');
// ---------------------------------------------------------------- MakeCode blocks pictures
// MakeCode lessons (language: makecode) show programs as blocks. render-pictures draws each program a teacher sees
// (display code, code in task text, solutions, explainPicture) as _pictures/makecode/<blocksId>.png, keyed by a hash
// of the code; snippets/microbit.json blocks are drawn as _pictures/makecode/<snippet id>.png for the cheat sheets.
// Builds without those pictures (offline) fall back to the code as text.
export const blocksId = (code) => 'code/' + createHash('sha1').update(String(code).trim()).digest('hex').slice(0, 12);
const FENCES = /```(\w*)\n([\s\S]*?)```/g;
/** Every MakeCode program shown in a lesson's pages and teacher material, as code text. */
export function makecodePrograms(lesson, snip) {
  if (lesson.language !== 'makecode') return [];
  const out = [], add = (ref) => { try { out.push(snip(ref)); } catch { /* reported by validate */ } };
  const fenced = (body) => { for (const m of String(body || '').matchAll(FENCES)) if (!m[1] || m[1] === 'makecode') out.push(m[2]); };
  fenced(lesson.intro);
  for (const s of lesson.steps) {
    if (s.config.code) add(s.config.code);
    fenced(s.body);
    for (const t of s.tasks) { fenced(t.body); if (t.config.check?.code) add(t.config.check.code); }
  }
  for (const ref of Object.values(lesson.teacher?.solutions || {})) add(ref);
  if (lesson.explainPicture) add(typeof lesson.explainPicture === 'string' ? lesson.explainPicture : lesson.explainPicture.ref);
  return [...new Set(out.map((c) => c.replace(/\n+$/, '') + '\n'))];
}
// Set by each generator from its options: code -> { url, w, h } of the blocks picture, or null.
let BLOCKS = null;
const blocksMd = (code, alt = 'The program as blocks') => {
  const p = LANG === 'makecode' && BLOCKS ? BLOCKS(code) : null;
  return p ? `![${alt}](${p.url})` : null;
};
// Code as Markdown: blocks pictures for MakeCode (when drawn), a fence otherwise. Fences in task text too.
const codeMd = (code, lang = LANG) => (lang === LANG && blocksMd(code)) || fence(code, lang);
const fencesToBlocks = (md) => (LANG === 'makecode' ? String(md).replace(FENCES, (m, lang, src) => ((!lang || lang === 'makecode') && blocksMd(src)) || m) : md);

// Code language for fences and highlighting: set from the lesson by each generator (python or html).
let LANG = 'python';
let E5 = false;   // 5E words: science, or shape: 5e
// Design projects (shape: design) title their steps with design-cycle words (Inquire, Develop, Create, Test, Evaluate):
// slides and worksheets use the step's own title, and the Inquire step is a brief to read, not a prediction.
let DESIGN = false;
const fence = (code, lang = LANG) => '```' + lang + '\n' + String(code).replace(/\n$/, '') + '\n```';

/** Every check in a lesson, with where it sits: [{ step, task, check, key }]. */
const checksOf = (lesson) => lesson.steps.flatMap((s) => [
  ...(s.config.check ? [{ step: s, task: null, check: s.config.check, key: `${lesson.slug}/${s.id}` }] : []),
  ...s.tasks.filter((t) => t.config.check).map((t) => ({ step: s, task: t, check: t.config.check, key: `${lesson.slug}/${t.id}` })),
]);

// ---------------------------------------------------------------- deck (Prepare Marp)
export function deckFor(lesson, { course, unit, snip, blocks = null }) {
  lesson = forOutput(lesson);
  LANG = lesson.language || 'python'; E5 = LANG === 'science' || lesson.shape === '5e';
  DESIGN = lesson.shape === 'design';
  BLOCKS = blocks;
  const T = lesson.teacher || {};
  const slides = [];
  const note = (t) => (t ? `\n\n<!-- Speaker note: ${oneLine(t).replace(/-->/g, '- ->')} -->` : '');
  const srcNote = sourceList(T).length ? ` Sources: ${sourceList(T).map((x) => `${x.title}, ${x.url}${x.checked ? ` (checked ${x.checked})` : ''}`).join('; ')}.` : '';
  slides.push(`# ${pt(lesson.title)}\n\n${course}${unit ? ` · ${unit}` : ''}` + note(`${T.summary || lesson.summary}${T.time ? ` About ${T.time} minutes${T.timing ? ` (${T.timing})` : ''}.` : ''}${srcNote}`));
  slides.push(`## Today\n\n**We are learning to** ${lowerFirst(lesson.summary.replace(/\.$/, ''))}.\n\n${(T.goals || []).map((g) => `- ${pt(g)}`).join('\n')}` + note(T.before ? `Before class: ${T.before}` : ''));
  if (lesson.hook) slides.push(`${BADGE.discussion}\n\n## Why it matters\n\n> ${lesson.hook}` + note(lesson.intro));
  // Class plan (content/<course>/class/<lesson>.yml): activities and questions for the room, placed after the first
  // step of their stage (or at the start or end). The site stays self-paced; the deck carries the talk.
  const CP = lesson.classPlan || {}, placed = new Set();
  const classSlides = (at) => {
    if (placed.has(at)) return;
    placed.add(at);
    for (const a of CP.activities || []) if (a.at === at) {
      slides.push(`${BADGE[a.kind || 'activity']}\n\n## ${pt(a.title)}${a.minutes ? ` <span style="font-size:.6em;color:#64748b">(${a.minutes} min)</span>` : ''}\n\n${prose(a.do)}` + note(a.notes || ''));
    }
    (CP.questions || []).filter((q) => q.at === at).forEach((q, i) => {
      const p = checkPartsMd(q, snip, `${lesson.slug}/class-${at}-${i}`);
      let body = p.q ? `**${p.q}**` : '';
      if (p.options) body += '\n\n' + p.options.map((o) => `- ${o}`).join('\n');
      if (p.trace) body += '\n\n' + traceTable(p.trace, true);
      if (p.match) body += '\n\n' + `| | |\n|---|---|\n` + p.match.lefts.map((l, j) => `| \`${l}\` | ${letters[j]}. ${p.match.rights[j]} |`).join('\n');
      slides.push(`${BADGE.check}\n\n## ${pt(q.title || 'Class question')}\n\n${body}\n\n* Answer: ${oneLine(p.answer)}` + note(`${p.explain || ''} Ask on mini whiteboards or by show of hands before the reveal.`));
    });
  };
  classSlides('start');
  // Programs too long for a slide are read in the tutorial instead.
  const showCode = (code, step) => blocksDeck(code) || (code.split('\n').length > 27
    ? `*The program is ${code.split('\n').length} lines long: open it in the tutorial and read it together.*\n\n[Open this step](${stepUrl(lesson, step)})`.replace(/^\*|\*(?=\n)/g, '_')
    : fence(code));
  // Board steps (maths and science) put the live board on the slide: {{embed: URL}}, which Waypoints Prepare
  // loads only while the slide is on screen (a link in PowerPoint and print). Other playgrounds open the step.
  const boardUrl = (step) => {
    const t = step.config.try, dir = { board: '_playground-board', maths: '_playground-board', science: '_playground-science' }[t?.playground];
    if (!dir || !t.starter) return null;
    // fresh=1: a projector shows the starting board every time, not the last class's work (the science board saves nothing anyway).
    const q = { id: `deck/${lesson.slug}/${step.id}`, code: snip(t.starter), ...(dir === '_playground-board' ? { fresh: '1' } : {}) };
    return `${SITE_URL}/${dir}/index.html?${new URLSearchParams(q)}`;
  };
  const boardSlide = (step, heading) => `${BADGE.activity}\n\n## ${heading}\n\n{{embed: ${boardUrl(step)}}}\n\n[Open this step in the tutorial](${stepUrl(lesson, step)})`;
  const runIt = (step, label = LANG === 'maths' ? 'Try it' : E5 ? 'Explore it' : 'Run it') => boardUrl(step) ? boardSlide(step, label) : `${BADGE.activity}\n\n## ${label}\n\nOpen the lesson at this step and try it together.\n\n[${stepUrl(lesson, step).replace(/^https:\/\//, '')}](${stepUrl(lesson, step)})`;
  let stuckDone = false;
  for (const s of lesson.steps) {
    const c = s.config, stage = c.stage, title = capMaths(bare(s.title));
    const code = c.code ? snip(c.code) : '';
    if (stage === 'predict' && !DESIGN) {
      const k = c.check?.type === 'predict' ? checkPartsMd(c.check, snip, s.id) : null;
      slides.push(`${BADGE.discussion}\n\n## ${E5 ? 'Engage: predict' : 'Predict'}\n\n${code ? showCode(code, s) + '\n\n' : ''}${k ? `**${k.q}**${k.options ? '\n\n' + k.options.map((o) => `- ${o}`).join('\n') : ''}` : prose(s.body)}` + note(`${k?.answer ? `What happens: ${k.answer}` : ''} Take two or three predictions before anyone runs it.`));
      classSlides('predict');
      if (k?.answer) slides.push(`${BADGE.check}\n\n## What happened?\n\n* ${oneLine(k.answer)}` + note('Reveal after running. Ask who predicted it, and what made them think so.'));
    } else if (stage === 'run') {
      slides.push(runIt(s) + note(`${prose(s.body)} ${c.check?.type === 'reflect' ? `Students should be able to say: ${c.check.text}` : ''}`));
    } else if (stage === 'investigate' || stage === 'practise' || (E5 && stage === 'modify') || (DESIGN && stage === 'predict')) {
      if (DESIGN && stage === 'predict' && s.body.trim()) slides.push(`${BADGE.discussion}\n\n## ${title}\n\n${prose(s.body)}` + note('Read the brief together: who it is for, what it must do (criteria) and the limits (constraints).'));
      if (code) slides.push(`${BADGE.discussion}\n\n## ${DESIGN || title === 'Investigate' ? title : `Investigate: ${title.replace(/^Investigate:\s*/, '')}`}\n\n${showCode(code, s)}` + note(`${prose(s.body)} ${c.insight ? `What this step is for: ${c.insight}` : ''}`));
      if (boardUrl(s)) slides.push(boardSlide(s, title) + note(`${prose(s.body)} ${c.insight ? `What this step is for: ${c.insight}` : ''}`));
      const items = s.tasks.length ? s.tasks.filter((t) => t.config.check).map((t) => ({ t, k: t.config.check })) : (c.check ? [{ t: null, k: c.check }] : []);
      for (const { t, k } of items) {
        const p = checkPartsMd(k, snip, `${s.id}${t ? t.id : ''}`);
        if (p.reflect || p.board || k.type === 'code') continue;
        let body = `**${p.q}**`;
        // A sort lists its groups and items on two lines, so the items fit beside the question.
        if (p.items) body += `\n\nGroups: ${p.options.join(' · ')}\n\n${p.items.join(' · ')}`;
        else if (p.options) body += '\n\n' + p.options.map((o) => `- ${o}`).join('\n');
        if (p.trace) body += '\n\n' + traceTable(p.trace, true);
        if (p.match) body += '\n\n' + `| | |\n|---|---|\n` + p.match.lefts.map((l, i) => `| \`${l}\` | ${letters[i]}. ${p.match.rights[i]} |`).join('\n');
        if (p.files) {
          const parts = p.files.map((f) => (f.name ? `**${f.name}**\n\n` : '') + fence(numbered(f.code), ''));
          // Two files side by side, so both stay readable.
          body += '\n\n' + (parts.length === 2 ? `<div class="cols" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">\n<div>\n\n${parts[0]}\n\n</div>\n<div>\n\n${parts[1]}\n\n</div>\n</div>` : parts.join('\n\n'));
        }
        if (p.parsons) body += '\n\n' + fence(p.parsons.join('\n'));
        if (t && hasWorked(t.body)) { const w = workedSlide(t.body); slides.push(`${BADGE.discussion}\n\n## ${t.title}\n\n${w.slide}` + note(w.notes)); }
        else if (t && /```/.test(t.body)) {
          const shown = prose(t.body.replace(/```(\w*)\n([\s\S]*?)```/g, (m, lang, src) => '\u0000' + (lang || '') + '\u0001' + src + '\u0000')).replace(/\u0000(\w*)\u0001([\s\S]*?)\u0000/g, (m, lang, src) => ((!lang || lang === LANG) && blocksDeck(src)) || fence(src, lang || LANG));
          // The task's own text (a program to read) and its check share a slide when they fit; when even the
          // smallest type would not fit them, the program gets a Discussion slide and the check follows it.
          const together = `${BADGE.check}\n\n## ${t.title}\n\n${shown}\n\n${body}${p.parsons ? '' : `\n\n* Answer: ${oneLine(p.answer)}`}`;
          if (tooTall(together)) slides.push(`${BADGE.discussion}\n\n## ${t.title}\n\n${shown}`);
          else body = shown + '\n\n' + body;
        }
        const reveal = p.parsons ? '' : `\n\n* Answer: ${oneLine(p.answer)}`;
        slides.push(`${BADGE.check}\n\n## ${t ? t.title : title}\n\n${body}${reveal}` + note(`${p.explain} ${p.parsons ? `Correct order: ${oneLine(p.solution)}` : ''} ${!t && c.insight ? `What this step is for: ${c.insight}` : ''}`));
      }
    } else if (stage === 'modify' || stage === 'make') {
      const tasks = s.tasks.length ? s.tasks.map((t) => `- **${t.title}:** ${oneLine(prose(t.body)).slice(0, 160)}`).join('\n') : '';
      const text = prose(s.body);
      const hints = [...(Array.isArray(c.hint) ? c.hint : c.hint ? [c.hint] : []), ...s.tasks.flatMap((t) => (Array.isArray(t.config.hint) ? t.config.hint : t.config.hint ? [t.config.hint] : []))];
      let n = `${c.insight ? `What this step is for: ${c.insight} ` : ''}${hints.length ? `Hints, in order: ${hints.join(' / ')} ` : ''}`;
      if (!stuckDone && T.struggle) n += `The hard part, on purpose: ${T.struggle} `;
      if (!stuckDone && T.stuck?.length) { n += 'When students get stuck: ' + T.stuck.map((x) => `${x.see} Ask: ${x.ask} Fix: ${x.fix}`).join(' / '); stuckDone = true; }
      else if (T.struggle) stuckDone = true;
      slides.push(`${BADGE.activity}\n\n## ${stage === 'make' && !DESIGN && !/make/i.test(title) ? `Make: ${bare(s.title)}` : title}\n\n${text}${tasks ? '\n\n' + tasks : ''}${c.try ? `\n\n[Open this step](${stepUrl(lesson, s)})` : ''}` + note(n));
    } else if (s.body.trim()) {
      slides.push(`## ${title}\n\n${prose(s.body)}`);
    }
    if (stage) classSlides(stage);
  }
  for (const at of CLASS_AT) classSlides(at);
  if (T.exit) slides.push(`${BADGE.check}\n\n## Exit ticket\n\n**${pt(T.exit.q)}**\n\n* ${pt(oneLine(T.exit.a))}` + note('Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson.'));
  return `---\nmarp: true\ntheme: default\nhtml: true\n---\n\n${slides.map(fitCode).join('\n\n---\n\n')}\n`;
}
const lowerFirst = (t) => t.charAt(0).toLowerCase() + t.slice(1);
// A blocks picture on a slide, scaled (Marp h:) so it stays on the slide.
const blocksDeck = (code) => {
  const p = LANG === 'makecode' && BLOCKS ? BLOCKS(code) : null;
  return p ? `![h:${Math.min(360, Math.max(60, Math.round(p.h / 2)))}](${p.url})` : null;
};
// Keep each slide on the slide (Marp scoped styles). A 1280x720 slide at 29px type has about
// 560px for content. Estimate the height of everything but code, then shrink code first
// (down to 0.5em), then the whole slide. `.render-tmp` overflow checks confirm the estimate.
// Room for content, a little under the ~560px a slide holds: the estimate runs a few pixels short on text-heavy slides
// (Reaction timer's Predict ran 5px over), and check-decks flags anything past 690px.
const ROOM = 545;
// Height estimate for a slide, as fitCode uses it: the text's height and the code's height at full size.
function slideSize(slide) {
  const blocks = slide.match(/```[\s\S]*?```/g) || [];
  const cols = /<div class="cols"/.test(slide) ? 2 : 1; // two columns: count half the code
  const lines = blocks.reduce((n, b) => n + b.split('\n').length - 2, 0) / cols;
  const plain = (l) => l.replace(/<[^>]+>|\*\*|`|\[([^\]]*)\]\([^)]*\)/g, '$1').trim();
  const wraps = (l, w) => Math.max(1, Math.ceil(plain(l).length / w));
  const rest = slide.replace(/```[\s\S]*?```/g, '').replace(/<!--[\s\S]*?-->|<style[\s\S]*?<\/style>/g, '').split('\n').filter((l) => l.trim());
  const text = rest.reduce((n, l) => {
    if (/^<span/.test(l)) return n + 60;
    if (/^#/.test(l)) return n + 75;
    if (/^\|[-| ]*\|$/.test(l)) return n + (/-/.test(l) ? 0 : 18);
    if (/^\|/.test(l)) return n + 25 + 44 * Math.max(...l.split('|').slice(1, -1).map((c) => wraps(c, 34)));
    if (/^<\/?div/.test(l)) return n;
    if (/^\*\*[^*]+\*\*$/.test(l) && /\.\w+\*\*$/.test(l)) return n + 60 / cols; // file name label
    if (/^[-*] /.test(l)) return n + 12 + 44 * wraps(l, 62);
    return n + 18 + 44 * wraps(l, 66);
  }, 0) + (35 * blocks.length) / cols;
  return { text, codeFull: lines * 29 * 1.25 };
}
// True when a slide cannot fit even at fitCode's smallest sizes (code at half size, text at 16px).
function tooTall(slide) {
  const { text, codeFull } = slideSize(slide);
  if (text + codeFull <= ROOM) return false;
  return ROOM / (text + codeFull * 0.5) < 16 / 29;
}
function fitCode(slide) {
  const { text, codeFull } = slideSize(slide);
  const code = (s) => codeFull * s;
  if (text + code(1) <= ROOM) return slide;
  let c = Math.min(0.85, (ROOM - text) / code(1)), s = 1;
  if (c < 0.5) { c = 0.5; s = ROOM / (text + code(0.5)); }
  const css = [`pre, marp-pre { font-size: ${Math.floor(c * 100) / 100}em; line-height: 1.25; }`];
  if (s < 1) css.push(`section { font-size: ${Math.max(16, Math.floor(29 * s))}px; }`);
  return `${slide}\n\n<style scoped>${css.join(' ')}</style>`;
}

function traceTable(t, blanks) {
  const head = `| ${t.head.join(' | ')} |\n|${t.head.map(() => '---').join('|')}|`;
  const rows = t.rows.map((r) => `| ${r.map((c) => (c.blank ? (blanks ? '?' : ' ') : c.v)).join(' | ')} |`).join('\n');
  return `${head}\n${rows}`;
}

// ---------------------------------------------------------------- worksheet (Prepare Print)
export function worksheetFor(lesson, { course, unit, snip, blocks = null }) {
  lesson = forOutput(lesson);
  LANG = lesson.language || 'python'; E5 = LANG === 'science' || lesson.shape === '5e';
  DESIGN = lesson.shape === 'design';
  BLOCKS = blocks;
  const T = lesson.teacher || {};
  const out = [];
  const tnote = (t) => (t && t.trim() ? `\n\n:::teacher-note\n\n${t.trim()}\n\n:::\n` : '');
  const keep = (t) => `\n\n:::keep-together\n\n${t.trim()}\n\n:::\n`;
  out.push(`---\ntitle: ${yamlStr(lesson.title)}\nsubtitle: ${yamlStr(`${course}${unit ? ` · ${unit}` : ''}${lesson.order != null ? ` · Lesson ${lesson.order}` : ''}`)}\n---\n\n# ${lesson.title}\n\n**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}\n\n> **Key question:** ${lesson.hook || lesson.summary}`);
  out.push(tnote(`**In one sentence:** ${T.summary || lesson.summary}\n\n${T.goals?.length ? `**Students should be able to say:** ${T.goals.map(pt).join(' ')}\n\n` : ''}${E5 ? '**Width:** the unmarked parts are the floor every student does (Engage, Explore, Explain, Evaluate). Typical and Wider sections add contexts, not difficulty.' : '**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty.'} Students work in the online tutorial alongside this sheet.`));
  const makeIndex = lesson.steps.findIndex((s) => s.config.stage === 'make');
  for (const [i, s] of lesson.steps.entries()) {
    const c = s.config, stage = c.stage, title = capMaths(bare(s.title));
    const code = c.code ? snip(c.code) : '';
    const tier = c.tier ? c.tier : stage === 'modify' ? (makeIndex >= 0 && i > makeIndex ? 'wider' : 'typical') : stage === 'info' && makeIndex >= 0 && i > makeIndex ? 'wider' : '';
    let part = '';
    if (stage === 'predict' && !DESIGN) {
      const k = c.check?.type === 'predict' ? checkPartsMd(c.check, snip, s.id) : null;
      part = `## ${E5 ? 'Engage' : 'Predict'}\n\n${prose(s.body)}${code ? '\n\n' + codeMd(code) : ''}` + keep(`${k ? `**${k.q}**\n\n${k.options ? k.options.map((o) => `☐ ${o}`).join('\n\n') + '\n\n' : ''}` : ''}My prediction, and why:\n\n{{lines-3}}`) + tnote(k?.answer ? `**What happens:** ${k.answer}` : '');
    } else if (stage === 'run') {
      part = `## ${E5 ? 'Explore' : 'Run'}\n\n${LANG === 'maths' || E5 ? 'Try it on the board in the tutorial' : 'Run the program in the tutorial'}. Was your prediction right? What was different?\n\n{{lines-2}}`;
    } else if (stage === 'investigate' || stage === 'practise' || (E5 && stage === 'modify') || (DESIGN && stage === 'predict')) {
      part = `## ${title}\n\n${prose(s.body)}${code ? '\n\n' + codeMd(code) : ''}`;
      const items = s.tasks.length ? s.tasks.filter((t) => t.config.check).map((t) => ({ t, k: t.config.check })) : (c.check ? [{ t: null, k: c.check }] : []);
      for (const { t, k } of items) {
        const p = checkPartsMd(k, snip, `${s.id}${t ? t.id : ''}`);
        if (p.reflect || p.board || k.type === 'code') continue;
        let q = `${t ? `### ${t.title}\n\n` : ''}**${p.q}**`;
        if (t && (/```/.test(t.body) || hasWorked(t.body))) q = `${t ? `### ${t.title}\n\n` : ''}${fencesToBlocks(t.body.trim())}\n\n**${p.q}**`;
        if (p.items) q += '\n\nGroups: ' + p.options.join(', ') + '\n\n' + p.items.map((it) => `- ${it}: {{field-15}}`).join('\n');
        else if (p.options) q += '\n\n' + p.options.map((o) => `☐ ${o}`).join('\n\n');
        if (p.field) q += '\n\nAnswer: {{field-15}}';
        if (p.trace) q += '\n\n{{rows 1}}\n\n' + traceTable(p.trace, false);
        if (p.match) q += '\n\n' + p.match.rights.map((r, i) => `${letters[i]}. ${r}`).join('\n\n') + '\n\n{{columns 60% 40%}}\n\n{{rows 1}}\n\n| Part | Letter |\n|---|---|\n' + p.match.lefts.map((l) => `| \`${l}\` | |`).join('\n');
        if (p.files) q += '\n\n' + p.files.map((f) => (f.name ? `**${f.name}**\n\n` : '') + fence(numbered(f.code), '')).join('\n\n') + '\n\nLine: {{field-15}}\n\nWhy is it wrong?\n\n{{lines-2}}';
        if (p.parsons) q += '\n\n' + p.parsons.map((l, i) => `${letters[i] || i + 1}. \`${l.trim()}\``).join('\n\n') + '\n\nCorrect order (letters): {{field-24}}';
        if (k.type === 'question' && !p.options) q += '\n\n{{lines-2}}';
        part += keep(q) + tnote(`**Answer:** ${p.answer}${p.explain ? `\n\n${pt(p.explain)}` : ''}${p.parsons ? `\n\n${fence(p.solution)}` : ''}`);
      }
    } else if (stage === 'modify' || stage === 'make') {
      const tasks = s.tasks.length ? s.tasks.map((t) => `**${t.title}.** ${prose(t.body)}`).join('\n\n') : '';
      const sols = (T.solutions || {});
      const ids = s.tasks.length ? s.tasks.map((t) => t.id) : [s.id];
      const solText = ids.filter((id) => sols[id]).map((id) => {
        const t = s.tasks.find((x) => x.id === id);
        return `${t ? `**${t.title}:**\n\n` : ''}${splitFiles(snip(sols[id])).map((f) => (f.name ? `*${f.name}*\n\n` : '') + codeMd(f.code)).join('\n\n')}`;
      }).join('\n\n');
      part = `## ${stage === 'make' && !DESIGN && !/make/i.test(title) ? `Make: ${bare(s.title)}` : title}\n\n${prose(s.body)}${tasks ? '\n\n' + tasks : ''}\n\nWork in the tutorial. Plan first: what will you change, and how will you test it?\n\n{{box-4}}` + tnote(solText ? (LANG === 'maths' ? `**One possible answer.** Other correct answers are fine; check that each one does what the task asks.\n\n${solText}` : `**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.\n\n${solText}`) : '');
    } else if (s.body.trim()) {
      part = `## ${title}\n\n${prose(s.body)}`;
    }
    if (!part) continue;
    out.push(tier ? `\n\n:::${tier}\n\n${part.trim()}\n\n:::\n` : part);
  }
  if (T.exit) out.push(`## Exit ticket` + keep(`**${pt(T.exit.q)}**\n\n{{lines-3}}`) + tnote(`**Answer:** ${pt(T.exit.a)}`));
  return out.join('\n\n').replace(/\n{4,}/g, '\n\n\n') + '\n';
}
const yamlStr = (s) => JSON.stringify(String(s));

// ---------------------------------------------------------------- cheat sheet (Prepare Print reference sheet)
export function cheatSheetFor({ course, unit, items, lang = 'python', picture = () => null }) {
  const body = items.map((i) => { const p = picture(i.id); return `:::keep-together\n\n**${pt(i.label)}**: ${pt(i.hint || '')}\n\n${p ? `![${pt(i.label)}](${p})\n\n` : ''}${fence(strip(i.code), lang)}\n\n:::`; }).join('\n\n');
  return `---\ntitle: ${yamlStr(`${unit.title}: cheat sheet`)}\nsubtitle: ${yamlStr(course)}\n---\n\n# ${unit.title}\n\n> ${lang === 'makecode' ? 'The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).' : 'The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.'}\n\n${body || (lang === 'makecode' ? '_This unit has no new blocks; it combines ones from earlier units._' : '_This unit has no new commands; it combines ones from earlier units._')}\n`;
}

// The snippets a unit introduces: what its lessons unlock, plus what the code students see uses
// (step code and starters, found with the Reference drawer's own patterns). Each snippet is listed once,
// in the first unit that has it (pass one `seen` set across units), in reference order.
export function unitSnippets(lessons, snippets, seen = new Set(), codeOf = () => []) {
  const ids = [...snippets.keys()], found = new Set();
  for (const l of lessons) {
    for (const s of l.steps) for (const id of [...(s.config.unlocks || []), ...s.tasks.flatMap((t) => t.config.unlocks || [])]) if (snippets.has(id)) found.add(id);
    const code = codeOf(l).join('\n');
    for (const [id, item] of snippets) { const re = snippetPattern(item); if (re && re.test(code)) found.add(id); }
  }
  const out = ids.filter((id) => found.has(id) && !seen.has(id)).map((id) => ({ id, ...snippets.get(id) }));
  out.forEach((i) => seen.add(i.id));
  return out;
}

// ---------------------------------------------------------------- printable cheat sheet (HTML)
// sections: [{ title, items: [{ id, label, hint, code, shows }] }]; pictures: { id: { w, h } } from
// render-pictures (device pixels at 2x, about 2.6 px per turtle step), drawn at one shared scale per kind
// (div: device pixels per printed pixel; 5.2 for turtle, set per picture for HTML).
export function cheatSheetBody({ title, course, sections, pictures = {}, picBase, esc, highlightCode, back, backLabel = 'Teacher guide', md, mdUrl, nav = '', lang = 'python' }) {
  const card = (i) => {
    const pic = pictures[i.id];
    const div = pic?.div || 5.2;
    const img = pic ? `<figure><img src="${esc(picBase + i.id)}.png${pic.hash ? `?v=${esc(pic.hash)}` : ''}" alt="${lang === 'makecode' ? 'The block' : 'What it draws'}" width="${Math.round(pic.w / div)}" height="${Math.round(pic.h / div)}">${i.shows ? `<figcaption>${esc(i.shows)}</figcaption>` : ''}</figure>` : '';
    const code = strip(i.code).replace(/\n+$/, '');
    // A picture shows the example program, which can differ from the bare snippet: show that code.
    const ex = pic && i.example && strip(i.example).trim() !== code.trim() ? `<div class="cs-ex">Example</div><pre><code>${highlightCode(strip(i.example).replace(/\n+$/, ''), lang)}</code></pre>` : '';
    return `<article class="cs-card${pic ? ' has-pic' : ''}"><h3>${esc(i.label)}</h3><p>${esc(i.hint || '')}</p><div class="cs-body"><div class="cs-code"><pre><code>${highlightCode(code, lang)}</code></pre>${ex}</div>${img}</div></article>`;
  };
  // Two columns filled by estimated height (CSS columns split badly across printed pages).
  const lines = (t) => (t ? strip(t).trim().split('\n').length : 0);
  const height = (i) => {
    const pic = pictures[i.id];
    const code = lines(i.code) + (pic && i.example && strip(i.example).trim() !== strip(i.code).trim() ? lines(i.example) + 1.5 : 0);
    return 3 + Math.max(code * 1.1, pic ? pic.h / (pic.div || 5.2) / 15 + (i.shows ? 1.5 : 0) : 0) + Math.ceil((i.hint || '').length / 55);
  };
  const cols = (items) => {
    const c = [[], []], h = [0, 0];
    for (const i of items) { const k = h[0] <= h[1] ? 0 : 1; c[k].push(card(i)); h[k] += height(i); }
    return `<div class="cs-grid"><div class="cs-col">${c[0].join('')}</div><div class="cs-col">${c[1].join('')}</div></div>`;
  };
  const secs = sections.filter((s) => s.items.length).map((s) => `${sections.length > 1 ? `<h2 class="cs-unit">${esc(s.title)}</h2>` : ''}${cols(s.items)}`).join('');
  return `<div class="cs-bar noprint"><a class="crumb" href="${esc(back)}">← ${esc(backLabel)}</a><span class="sn-grow"></span><button type="button" onclick="print()">Print</button>${mdUrl ? ` <a href="${esc(md)}" download>Markdown for Prepare</a> <button type="button" class="copyurl" data-url="${esc(mdUrl)}">Copy address for Prepare</button>` : ''}</div>${nav ? `<div class="noprint">${nav}</div>` : ''}
<div class="cs"><header class="cs-head"><h1>${esc(title)}</h1><p>${esc(course)} · ${lang === 'makecode' ? 'Find each block in the MakeCode toolbox (the category is at the end of each line).' : 'In any playground, open <b>Reference</b> to copy these.'}</p></header>${secs || `<p>This unit has no new ${lang === 'makecode' ? 'blocks' : 'commands'}; it combines ones from earlier units.</p>`}</div>`;
}
export const CHEAT_CSS = `.wrap{max-width:1000px}
.cs-nav{font-size:14px;margin:-6px 0 14px;line-height:1.8}.cs-nav b{color:var(--ink)}
.cs-bar{display:flex;gap:10px;align-items:center;margin:18px 0}.cs-bar button{font:inherit;font-size:14px;padding:5px 14px;border:1px solid var(--line);border-radius:8px;background:var(--card);color:var(--ink);cursor:pointer}.cs-bar a{font-size:14px}.sn-grow{flex:1}
.cs{--code:#f4f3ef;--codeink:#1d2430;--kw:#b42318;--str:#0a6b3d;--fn:#6a3fb5;--num:#0b5cad;--com:#6b7280;background:#fff;color:#1d2430;border:1px solid var(--line);border-radius:6px;padding:12mm 12mm 8mm}
.cs-head{border-bottom:2px solid #1d2430;margin-bottom:10px}.cs-head h1{font-size:22px;margin:0 0 2px}.cs-head p{margin:0 0 8px;font-size:12px;color:#5d6978}
.cs-unit{font-size:15px;margin:14px 0 6px;padding:3px 8px;background:#1d2430;color:#fff;border-radius:4px;break-after:avoid}
.cs-grid{display:flex;gap:10px;align-items:flex-start}.cs-col{flex:1;min-width:0}
.cs-card{break-inside:avoid;border:1px solid #d9d6cf;border-radius:6px;padding:6px 8px;margin:0 0 8px}
.cs-card h3{font:600 13px/1.3 ui-monospace,Menlo,Consolas,monospace;margin:0}.cs-card p{font-size:11.5px;line-height:1.35;margin:2px 0 5px;color:#3d4653}
.cs-body{display:flex;gap:8px;align-items:flex-start}.cs-code{flex:1;min-width:0}
.cs pre{background:var(--code);color:var(--codeink);border-radius:4px;padding:5px 7px;font:11px/1.4 ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap;overflow:visible}
.cs-ex{font-size:10px;text-transform:uppercase;letter-spacing:.04em;color:#5d6978;margin:5px 0 2px}
.cs figure{margin:0;flex:0 0 auto;max-width:46%;text-align:center}.cs figure img{max-width:100%;height:auto;border:1px solid #eceae4;border-radius:4px;display:block;margin:0 auto}
.cs figcaption{font-size:10px;line-height:1.3;color:#5d6978;margin-top:2px}
@page{size:A4;margin:10mm}
@media print{.sitenav,.noprint{display:none!important}body{background:#fff}.wrap{max-width:none;padding:0}.cs{border:0;padding:0}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
@media (max-width:640px){.cs{padding:14px}.cs-grid{display:block}}`;

// ---------------------------------------------------------------- teacher guide pages (HTML bodies)
export function lessonGuideBody(lesson, { esc, md, snip, highlightCode, codeBlock, studentHref, course, unit, files, blocks = null }) {
  LANG = lesson.language || 'python'; E5 = LANG === 'science' || lesson.shape === '5e';
  DESIGN = lesson.shape === 'design';
  BLOCKS = blocks;
  // MakeCode: the blocks picture, with the code one click away; code as text when there is no picture.
  const showProgram = (code, name = '') => {
    const p = LANG === 'makecode' && BLOCKS ? BLOCKS(code) : null;
    return p ? `<figure class="blocks"><img src="${esc(p.url)}" alt="The program as blocks" width="${Math.round(p.w / 2)}" loading="lazy"></figure><details class="mkjs"><summary>Show as code</summary>${codeBlock(highlightCode, code, LANG, name)}</details>` : codeBlock(highlightCode, code, LANG, name);
  };
  const T = lesson.teacher || {};
  const sec = (title, html) => (html ? `<section class="tg"><h2>${esc(title)}</h2>${html}</section>` : '');
  const insights = lesson.steps.flatMap((s) => [s.config.insight ? [bare(s.title), s.config.insight] : null, ...s.tasks.filter((t) => t.config.insight).map((t) => [`${bare(s.title)} › ${t.title}`, t.config.insight])]).filter(Boolean);
  const answers = checksOf(lesson).map(({ step, task, check, key }) => {
    const p = checkParts(check, snip, key);
    if (p.reflect || check.type === 'code') return '';
    return `<li><b>${esc(task ? task.title : bare(step.title))}:</b> ${esc(p.q)}<br><span class="ans">${esc(p.answer)}</span>${p.explain ? `<br><span class="muted">${esc(p.explain)}</span>` : ''}${p.parsons ? codeBlock(highlightCode, p.solution + '\n', LANG, '') : ''}</li>`;
  }).filter(Boolean).join('');
  const sols = T.solutions || {};
  const solHtml = workItems(lesson).map((w) => {
    const ref = sols[w.id];
    const name = w.task ? `${bare(w.step.title)} › ${w.task.title}` : bare(w.step.title);
    if (!ref) return `<h3>${esc(name)}</h3><p class="muted">Open task: any program that does what the step asks.</p>`;
    return `<h3>${esc(name)}</h3>${splitFiles(snip(ref)).map((f) => showProgram(f.code, f.name || '')).join('')}`;
  }).join('');
  const stuck = (T.stuck || []).length ? `<table class="stuck"><thead><tr><th>What you will see</th><th>A question to ask</th><th>The fix</th></tr></thead><tbody>${T.stuck.map((x) => `<tr><td>${esc(x.see)}</td><td>${esc(x.ask)}</td><td>${esc(x.fix)}</td></tr>`).join('')}</tbody></table>` : '';
  const dl = files.map((f) => `<li><b>${esc(f.label)}</b> <a href="${esc(f.href)}" download>Download</a> <button type="button" class="copyurl" data-url="${esc(f.url)}">Copy address for Prepare</button><span class="muted"> ${esc(f.note || '')}</span></li>`).join('');
  return `<header class="top"><a class="crumb" href="../">← Teacher guide</a><h1>${esc(lesson.title)}</h1><p class="lede">${esc(T.summary || lesson.summary)}</p><p class="tmeta">${esc(course)}${unit ? ` · ${esc(unit)}` : ''}${T.time ? ` · about ${T.time} minutes` : ''} · <a href="${esc(studentHref)}">Open the student lesson</a></p></header>` +
    sec('Classroom resources', `<p>Load these into <a href="${PREPARE_URL}" target="_blank" rel="noopener">Waypoints Prepare</a>: choose <b>Load URL</b> and paste the copied address, or download the file and import it. In Prepare, the worksheet's Teacher edition shows the answers; the student copy hides them.</p><ul class="dl">${dl}</ul>`) +
    sec('Students will be able to', T.goals ? `<ul>${T.goals.map((g) => `<li>${esc(g)}</li>`).join('')}</ul>` : '') +
    sec('Timing', T.timing ? `<p>${esc(T.timing)}</p>` : '') +
    sec('Before class', T.before ? md(T.before) : '') +
    sec('Running the lesson', T.running ? `<ol>${T.running.map((r) => `<li>${md(r).replace(/^<p>|<\/p>\s*$/g, '')}</li>`).join('')}</ol>` : '') +
    sec('In class', (lesson.classPlan?.activities || []).length || (lesson.classPlan?.questions || []).length ? `<p class="muted">On the slides at these points. Students can do the whole lesson on their own; these are for the room.</p><ul>${(lesson.classPlan.activities || []).map((a) => `<li><b>${esc(a.title)}</b> <span class="muted">(${esc(a.at)}${a.minutes ? `, ${a.minutes} min` : ''})</span>${md(a.do)}${a.notes ? `<p class="muted">${esc(a.notes)}</p>` : ''}</li>`).join('')}${(lesson.classPlan.questions || []).map((q, i) => { const p = checkParts(q, snip, `${lesson.slug}/class-${i}`); return `<li><b>${esc(q.title || 'Class question')}</b> <span class="muted">(${esc(q.at)})</span><br>${esc(p.q)}<br><span class="ans">${esc(p.answer)}</span>${p.explain ? `<br><span class="muted">${esc(p.explain)}</span>` : ''}</li>`; }).join('')}</ul>` : '') +
    sec('The hard part (on purpose)', T.struggle ? `<p>${esc(T.struggle)}</p>` : '') +
    sec('When students get stuck', stuck) +
    sec('Answers to the checks', answers ? `<ol class="answers">${answers}</ol>` : '') +
    sec('Solutions', solHtml ? `<p class="muted">One possible solution for each task. Other correct programs are fine.</p>${solHtml}` : '') +
    sec('Stretch and support', `${T.stretch ? `<p><b>Stretch:</b> ${esc(T.stretch)}</p>` : ''}${T.support ? `<p><b>Support:</b> ${esc(T.support)}</p>` : ''}`) +
    sec('Coach prompt (optional)', lesson.coach ? `<p>For a student who has done the lesson and is still stuck. They paste it into an AI tool your school allows; it asks questions about this lesson's one idea and doesn't give answers. Students see it on the course recap page only through a link ending in <code>?coach=1</code>: <a href="${esc(studentHref)}../recap/?coach=1">recap with coach prompts</a>.</p><pre class="coachp">${esc(lesson.coach)}</pre>` : '') +
    sec('Exit ticket', T.exit ? `<p><b>${esc(T.exit.q)}</b></p><p class="ans">${esc(T.exit.a)}</p>` : '') +
    sec('What each step is for', insights.length ? `<ul>${insights.map(([w, t]) => `<li><b>${esc(w)}:</b> ${esc(t)}</li>`).join('')}</ul>` : '') +
    sec('Where it leads', T.leads ? md(T.leads) : '') +
    sec('Sources', sourceList(T).length ? `<ul>${sourceList(T).map((x) => `<li><a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.title)}</a>${x.checked ? ` <span class="muted">(checked ${esc(x.checked)})</span>` : ''}</li>`).join('')}</ul>` : '');
}

export const TEACH_CSS = `.tg{margin:26px 0}.tg h2{font-size:1.15rem;margin:0 0 8px}.tg h3{font-size:1rem;margin:16px 0 6px}
.tmeta{color:var(--muted);font-size:14px}.ans{font-weight:600;color:var(--run)}.muted{color:var(--muted);font-size:14px}
.answers li{margin:0 0 10px}.stuck{width:100%;border-collapse:collapse;font-size:14px}.stuck th,.stuck td{border:1px solid var(--line);padding:8px 10px;vertical-align:top;text-align:left}.stuck th{background:var(--card)}
.dl{list-style:none;padding:0;display:grid;gap:8px}.dl li{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px 14px}
.copyurl{font:inherit;font-size:13px;margin-left:6px;padding:2px 10px;border:1px solid var(--line);border-radius:7px;background:var(--bg);color:var(--ink);cursor:pointer}
.blocks{margin:8px 0}.blocks img{max-width:100%;height:auto;background:#fff;border:1px solid var(--line);border-radius:10px;padding:8px}.mkjs summary{cursor:pointer;color:var(--muted);font-size:14px}
.coachp{white-space:pre-wrap;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px 14px;font-size:13.5px}.tunit{margin:26px 0}.tunit h2{margin:0 0 4px;font-size:1.15rem}.tunit ul{margin:6px 0}.primer{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:6px 18px}`;
export const TEACH_JS = `document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.copyurl');if(!b)return;var u=b.dataset.url,done=function(){var t=b.textContent;b.textContent='Copied';setTimeout(function(){b.textContent=t},1500)};
if(navigator.clipboard)navigator.clipboard.writeText(u).then(done,function(){prompt('Copy this address:',u)});else prompt('Copy this address:',u)});`;
