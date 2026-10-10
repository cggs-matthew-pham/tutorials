// `npm run check-nodes`: tests for the progression data and node check (tools/progressions.mjs): the page parser on a
// real page, the check on small made-up lessons, and the real maths lessons with one tag changed at a time.
import { parsePage, parseRef, yearOf, auditNodes, loadProgressions } from './progressions.mjs';
import { prerequisites } from './concepts.mjs';
import { loadLessons, loadDirMeta, CONTENT_ROOT } from './lesson.mjs';
import { readFileSync } from 'node:fs';
let fails = 0;
const ok = (cond, m) => (cond ? console.log('ok  ', m) : (fails++, console.log('FAIL', m)));

// Parser
const a01 = parsePage(readFileSync('data/progressions/maths/AC9M7A01.md', 'utf8'));
ok(a01.code === 'AC9M7A01' && a01.year === 7, 'AC9M7A01 page: code and year');
ok(a01.nodes.length === 3 && a01.nodes[1].hinge && !a01.nodes[0].hinge && a01.nodes[2].width, 'three nodes; node 2 is a hinge, node 3 a width opportunity');
ok(a01.nodes[1].title === 'Substituting values into formulas', 'node title without its marks');
ok(a01.nodes[1].criteria.length === 3 && /order of operations/.test(a01.nodes[1].criteria[1]), 'success criteria read');
ok(JSON.stringify(a01.prior) === '["AC9M6A01","AC9M6A02"]', 'prior knowledge codes only (not related standards)');
const a03 = parsePage(readFileSync('data/progressions/maths/AC9M7A03.md', 'utf8'));
ok(!a03.prior.includes('AC9M7A01') && a03.prior.includes('AC9M7A02'), 'AC9M7A03: related standards (A01) are not prior knowledge');
ok(yearOf('AC9M10A01') === 10 && yearOf('AC9S7U05') === 7, 'year from code');
ok(parseRef('AC9M7A01 n2').n === 2 && parseRef('AC9M7N07').n === null && parseRef('7A01 n2') === null, 'refs parse');

// The check on made-up lessons in one course
const page = (code, n, prior = []) => ({ code, year: yearOf(code), prior, nodes: Array.from({ length: n }, (_, i) => ({ n: i + 1 })) });
const data = new Map([['AC9M7X01', page('AC9M7X01', 2, ['AC9M6X01'])], ['AC9M7X02', page('AC9M7X02', 2, ['AC9M7X01'])], ['AC9M7Y01', page('AC9M7Y01', 1)]]);
const L = (name, order, node, more = {}) => ({ slug: `maths/t/${name}`, title: name, order, node: [].concat(node), uses: [], assumes: [], ...more });
const none = () => new Set();
const run = (ls) => auditNodes(ls, none, data).warnings;
let w = run([L('a', 1, 'AC9M7X01 n1'), L('b', 2, 'AC9M7X01 n2'), L('c', 3, 'AC9M7X02 n1'), L('d', 4, 'AC9M7X02 n2')]);
ok(w.length === 0, 'a full chain is clean (earlier-year prior knowledge counts as taught in class)');
w = run([L('a', 1, 'AC9M7X01 n1'), L('c', 3, 'AC9M7X02 n1')]);
ok(w.length === 1 && /needs AC9M7X01 .*n2/.test(w[0]), 'a descriptor half taught: names the missing node');
w = run([L('b', 2, 'AC9M7X01 n2')]);
ok(w.length === 1 && /needs AC9M7X01 n1/.test(w[0]), 'node 2 without node 1 warns');
w = run([L('b', 2, 'AC9M7X01 n2', { assumes: ['AC9M7X01 n1'] })]);
ok(w.length === 0, 'assumes: a node clears it');
w = run([L('b', 1, 'AC9M7X01 n2'), L('a', 2, 'AC9M7X01 n1')]);
ok(w.length === 1, 'order matters: a later lesson does not count');
w = run([L('a', 1, 'AC9M7X01 n1'), L('b', 2, 'AC9M7X01 n2', { uses: ['AC9M7Y01'] })]);
ok(w.length === 1 && /AC9M7Y01/.test(w[0]), 'uses: a same-year descriptor no lesson teaches warns');
w = run([L('y', 1, 'AC9M7Y01 n1'), L('a', 2, 'AC9M7X01 n1'), L('b', 3, 'AC9M7X01 n2', { uses: ['AC9M7Y01'] })]);
ok(w.length === 0, 'uses: met by an earlier lesson');
w = run([L('a', 1, 'AC9M7X01 n1', { uses: ['AC9M7Z01'] })]);
ok(w.length === 1 && /no progression page/.test(w[0]), 'a descriptor with no page warns');
w = run([L('a', 1, 'AC9M7X01 n9')]);
ok(w.length === 1 && /has no node 9/.test(w[0]), 'a node the page lacks warns');
w = auditNodes([{ slug: 'maths/t/q', title: 'q', order: 1, node: [], uses: [], assumes: [] }], none, data).warnings;
ok(w.length === 1 && /node: none/.test(w[0]), 'a maths lesson with no node warns');
w = run([L('a', 1, 'AC9M7X01 n1', { optional: true }), L('b', 2, 'AC9M7X01 n2')]);
ok(w.length === 1, 'an optional lesson does not count for a required one');
// Across courses: a lesson in another course counts only if this course comes after it
const two = [L('y', 1, 'AC9M7Y01 n1'), { ...L('a', 1, 'AC9M7X01 n1', { uses: ['AC9M7Y01'] }), slug: 'maths/u/a' }];
ok(auditNodes(two, none, data).warnings.length === 1, 'another course does not count without after:');
ok(auditNodes(two, (c) => new Set(c === 'maths/u' ? ['maths/t'] : []), data).warnings.length === 0, 'it counts once the course comes after it');

// Real lessons: clean now, and removing a tag shows up
const real = loadLessons();
const prereqs = prerequisites(loadDirMeta, CONTENT_ROOT);
const progs = loadProgressions();
const base = auditNodes(real, prereqs, progs).warnings;
console.log(`info real lessons: ${base.length} node warning(s)`);
const sub = real.find((l) => l.slug === 'maths/algebra/substituting');
const changed = real.map((l) => (l === sub ? { ...l, node: [] } : l));
const w2 = auditNodes(changed, prereqs, progs).warnings;
ok(w2.some((x) => x.startsWith('maths/algebra/substituting › node: none')) && w2.some((x) => x.startsWith('maths/algebra/finding-unknowns › needs AC9M7A01 n2')), 'untagging Substituting warns there and in Finding an unknown');

console.log(fails ? `${fails} failed` : 'all passed');
process.exit(fails ? 1 : 0);
