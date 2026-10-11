// Coach prompt: a copy-and-paste prompt for an AI tool the school allows, scoped to one lesson's move.
// Built at build time from data the lesson already has (no AI here): the node's title and statement and its
// success criteria (data/progressions/), the lesson's stuck list (teacher.yml: the misconceptions teachers see),
// and the node before it (one step back). Shown on recap pages only with ?coach=1, and in the teacher guide,
// for courses with `coach: true` in their index.md. Aim: beneficial, not detrimental, offloading (Lodge and
// Loble, UTS, March 2026): the student does the thinking; the coach asks.
import { readFileSync } from 'node:fs';
import { parseRef, yearOf } from './progressions.mjs';

const statementCache = new Map();
/** The "Students can …" line under a node's heading on its progression page. */
function statement(file, n) {
  if (!statementCache.has(file)) statementCache.set(file, readFileSync(file, 'utf8'));
  const md = statementCache.get(file);
  const part = md.split(/^#### /m).find((p) => p.startsWith(`${n}.`));
  const line = part && part.split('\n').slice(1).map((s) => s.trim()).find((s) => s && !s.startsWith('**'));
  return line ? line.replace(/^Students can /, '').replace(/\.$/, '') : '';
}

/** The prompt text for a lesson, or '' when its nodes are not in the progression data. */
export function coachPrompt(lesson, progressions) {
  const ideas = [], criteria = [], before = [];
  let year = null;
  for (const ref of lesson.node || []) {
    const r = parseRef(ref);
    const page = r && progressions.get(r.code);
    const node = page && r.n && page.nodes.find((x) => x.n === r.n);
    if (!node) continue;
    year = year || yearOf(r.code);
    const st = statement(page.file, r.n);
    ideas.push(st ? `${node.title}: I can ${st}.` : `${node.title}.`);
    criteria.push(...node.criteria);
    const prev = page.nodes.find((x) => x.n === r.n - 1);
    if (prev && !(lesson.node || []).some((x) => parseRef(x)?.code === r.code && parseRef(x)?.n === prev.n)) before.push(prev.title);
  }
  if (!ideas.length) return '';
  const mistakes = (lesson.teacher?.stuck || []).map((s) => String(s.see || '').trim()).filter(Boolean).slice(0, 3);
  const subject = { science: 'science', maths: 'maths', systems: 'digital technologies' }[lesson.slug.split('/')[0]] || 'school';
  const one = ideas.length === 1;
  return [
    `You are a patient ${subject} coach for a Year ${year || '7–10'} student in Australia. Help me understand ${one ? 'ONE idea' : 'the ideas in ONE lesson'} only, from the lesson "${lesson.title}".`,
    '',
    one ? `The idea: ${ideas[0]}` : `The ideas:\n${ideas.map((i) => `- ${i}`).join('\n')}`,
    '',
    'What understanding looks like:',
    ...[...new Set(criteria)].map((c) => `- ${c}`),
    ...(mistakes.length ? ['', 'Mistakes students often make here:', ...mistakes.map((m) => `- ${m}`)] : []),
    '',
    'How to coach me:',
    '- Ask me one short question at a time and wait for my answer. Never give me the answer or write my explanation for me.',
    '- Start by asking me to explain the idea in my own words, or to predict what happens in a simple example.',
    '- If I am stuck, give a small hint or a simpler example, not the answer.',
    ...(before.length ? [`- If I seem to be missing the idea that comes before this one (${[...new Set(before)].join('; ')}), check it quickly, then come back.`] : []),
    '- If I ask about anything else, tell me it is for another lesson and bring me back to this idea.',
    '- Use simple words and keep your replies short.',
    `- Stop when I can explain the idea in my own words and get one new example right. Then tell me to go back to the lesson "${lesson.title}".`,
  ].join('\n');
}
