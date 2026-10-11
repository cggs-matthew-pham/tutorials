// Import a subject's Years 7–10 descriptors from a waypoints-kit checkout into data/curriculum/<subject>.json,
// for the curriculum map (tools/curriculum-map.mjs). Earlier-year descriptors named as prior knowledge come too,
// so the map can show what Year 7 builds on.
//
//   node tools/import-curriculum.mjs <path to waypoints-kit> [maths | science]
//
// waypoints-kit holds one JSON file per descriptor in data/<subject>/ (copied from ACARA Progressions). Descriptor
// text is from the Australian Curriculum v9 (ACARA, CC BY 4.0); waypoints and prior knowledge are Learning Waypoints'.
// Re-run it when the kit changes; the output is committed, so the build never needs the kit.
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const [kit, subject = 'maths'] = process.argv.slice(2);
if (!kit) { console.error('usage: node tools/import-curriculum.mjs <path to waypoints-kit> [maths]'); process.exit(1); }
const PREFIX = { maths: 'AC9M', science: 'AC9S', systems: 'AC9TDI' }[subject];
const KIT = { systems: 'technologies' }[subject] || subject;   // the kit's folder
const ONLY = { systems: /^AC9TDI\d+K/ }[subject];             // Digital systems: Knowledge and understanding only (the P descriptors belong to Code)
if (!PREFIX) { console.error(`no prefix for subject "${subject}"`); process.exit(1); }
const CODE = /AC9[A-Z]{1,4}\d{1,2}[A-Z]{1,3}\d{2}/g;
const yearOf = (c) => Number(c.match(/^AC9[A-Z]+?(\d{1,2})/)?.[1]);
const truthy = (v) => v === true || v === 'True' || v === 'true';
const list = (v) => (Array.isArray(v) ? v : typeof v === 'string' && v.startsWith('[') ? JSON.parse(v.replace(/'/g, '"').replace(/\bNone\b/g, 'null')) : []);

// Every descriptor in the kit, by code.
const all = new Map();
for (const f of readdirSync(join(kit, 'data', KIT)).filter((n) => n.endsWith('.json'))) {
  let d;
  try { d = JSON.parse(readFileSync(join(kit, 'data', KIT, f), 'utf8')); } catch { continue; }
  const s = d.standard;
  if (!s?.code?.startsWith(PREFIX) || (ONLY && !ONLY.test(s.code))) continue;
  all.set(s.code, s);
}

// Kit titles are in Title Case; the site writes sentence case. Keep capitals the curriculum needs.
const KEEP = new Set(['Cartesian', 'Pythagoras', "Pythagoras'", 'Australian', 'Earth', 'I', 'GST', 'Newton', 'Bohr', 'Big', 'Bang', 'First', 'Nations', 'Aboriginal', 'Torres', 'Strait', 'Islander']);
const sentence = (t) => String(t).split(' ').map((w, i) => (i === 0 || KEEP.has(w.replace(/'s$/, '')) || /^[A-Z0-9]{2,}$/.test(w) ? w : w.toLowerCase())).join(' ');
// Hand-written titles from the progression pages win where they exist.
const pageTitles = new Map();
try {
  for (const f of readdirSync(join('data', 'progressions', subject))) {
    const m = readFileSync(join('data', 'progressions', subject, f), 'utf8').match(/^#\s+(AC9\S+)\s+[—-]\s+(.+)$/m);
    if (m) pageTitles.set(m[1], m[2].trim());
  }
} catch { /* no pages */ }

// Strand names. Maths: Years 7–10 use the curriculum's (Number, Algebra…); earlier years use keys such as
// number_concepts. Science: the four Understanding sub-strands, Human endeavour and Inquiry; the kit labels Year 7
// Understanding descriptors only "Understanding", so those take their sub-strand from the code.
const SCI = [['biolog', 'Biological'], ['chemi', 'Chemical'], ['earth', 'Earth and space'], ['physic', 'Physical'], ['endeavour', 'Human endeavour'], ['inquiry', 'Inquiry']];
const SCI7 = { U01: 'Biological', U02: 'Biological', U03: 'Earth and space', U04: 'Physical', U05: 'Chemical', U06: 'Chemical' };
// Digital systems: the kit files every K descriptor under one strand, so the map's rows come from the code.
const SYS = { '6K01': 'Digital systems', '6K02': 'Networks and security', '6K03': 'Data representation', '6K04': 'Data representation', '8K01': 'Digital systems', '8K02': 'Networks and security', '8K03': 'Data representation', '8K04': 'Data representation', '10K01': 'Networks and security', '10K02': 'Web documents', '10K03': 'Data representation' };
const strandOf = (s, code) => {
  const k = String(s || '').toLowerCase();
  if (subject === 'science') {
    for (const [m, n] of SCI) if (k.includes(m)) return n;
    if (/^AC9S7U0\d$/.test(code)) return SCI7[code.slice(-3)];
    return /^AC9S\d+H/.test(code) ? 'Human endeavour' : /^AC9S\d+I/.test(code) ? 'Inquiry' : s;
  }
  if (subject === 'systems') return SYS[code.match(/(\d+)K(\d\d)$/)?.slice(1).join('K')] || 'Digital systems';
  for (const n of ['Number', 'Algebra', 'Measurement', 'Space', 'Statistics', 'Probability']) if (k.startsWith(n.toLowerCase())) return n;
  return s;
};
// Science as a human endeavour and Science inquiry are written for two years at a time (7H01 is Years 7–8).
const spanOf = (code) => (subject === 'science' && /^AC9S\d+[HI]\d/.test(code) ? 2 : 1);
const want = [...all.keys()].filter((c) => yearOf(c) >= 7 && yearOf(c) <= 10);
const prior = (s) => [...new Set(String(s.prior_knowledge || '').match(CODE) || [])].filter((c) => c !== s.code);
for (const c of [...want]) for (const p of prior(all.get(c))) if (!want.includes(p) && all.has(p)) want.push(p);

const out = want.sort((a, b) => yearOf(a) - yearOf(b) || a.localeCompare(b)).map((c) => {
  const s = all.get(c);
  return {
    code: c, year: yearOf(c), span: spanOf(c), strand: strandOf(s.strand, c), title: sentence(pageTitles.get(c) || s.title), description: s.description,
    prior: prior(s),
    nodes: (s.nodes || []).map((n) => ({ n: Number(n.id), label: n.label, checkpoint: n.progression_checkpoint, hinge: truthy(n.hinge), criteria: list(n.success_criteria) })),
  };
});
let source = kit;
try { source = `waypoints-kit ${execFileSync('git', ['-C', kit, 'rev-parse', '--short', 'HEAD']).toString().trim()}`; } catch { /* not a git checkout */ }
mkdirSync(join('data', 'curriculum'), { recursive: true });
writeFileSync(join('data', 'curriculum', `${subject}.json`), JSON.stringify({
  subject, source, note: 'Descriptor text: Australian Curriculum v9 (ACARA, CC BY 4.0). Waypoints and prior knowledge: Learning Waypoints. Made by tools/import-curriculum.mjs; do not edit by hand.',
  descriptors: out,
}, null, 1) + '\n');
console.log(`data/curriculum/${subject}.json: ${out.filter((d) => d.year >= 7).length} Years 7–10 descriptors, ${out.filter((d) => d.year < 7).length} earlier ones they build on (${source})`);
