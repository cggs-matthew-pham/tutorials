// `npm run check-forms`: tests for the form checks (tools/maths-forms.mjs, Numbas). Two parts:
// 1. data/forms-cases.json: real tasks with right and wrong answers, and the slip each wrong one should name.
// 2. Generated cases: random expressions already in a form must pass, and rewritten versions that are not must fail
//    (or, if the checker cannot judge them, pass as "unsure": a correct answer is never marked wrong for its shape).
import { readFileSync } from 'node:fs';
import { loadForms } from './maths-forms.mjs';

const F = await loadForms();
let fails = 0, n = 0;
const fail = (m) => { fails++; console.log('FAIL', m); };
const keyOf = (r) => {
  if (r.ok) return 'ok';
  const k = Object.entries(F.MSG).find(([, m]) => m === r.why)?.[0];
  if (k) return k;
  if (/^Write it as|^Write an equation/.test(r.why)) return 'subject';
  return r.equivalent ? r.why : 'equivalent';
};

// 1. The case file
const { cases } = JSON.parse(readFileSync('data/forms-cases.json', 'utf8'));
for (const c of cases) {
  for (const [a, want, slip] of c.answers) {
    n++;
    const r = F.check(a, c.expected, c.form), got = keyOf(r);
    if (want ? !r.ok : (r.ok || (slip && got !== slip))) fail(`${c.task}: "${a}" gave ${got}${r.unsure ? ' (unsure)' : ''}, expected ${want ? 'ok' : slip || 'wrong'}`);
  }
}
console.log(`${n - fails}/${n} case-file answers marked as expected`);
{
  const f0 = fails; let w = 0;
  for (const c of JSON.parse(readFileSync('data/forms-cases.json', 'utf8')).workings || []) for (const [lines, want] of c.tries) {
    w++; const r = F.working(lines, c.start, c.form);
    if (r.ok !== want) fail(`working from ${c.start}: ${JSON.stringify(lines)} gave ${r.ok ? 'ok' : r.why}`);
  }
  console.log(`${w - (fails - f0)}/${w} workings marked as expected`);
}

// 2. Generated cases (a fixed seed, so a failure can be reproduced)
let seed = 7;
const rnd = (lo, hi) => { seed = (seed * 1103515245 + 12345) % 2147483648; return lo + (seed % (hi - lo + 1)); };
const nz = (lo, hi) => { let v = 0; while (!v) v = rnd(lo, hi); return v; };
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const lin = (p, q, v = 'x') => `${p === 1 ? '' : p === -1 ? '-' : p}${v} ${q < 0 ? '-' : '+'} ${Math.abs(q)}`;
const before = fails, g0 = n;
for (let i = 0; i < 150; i++) {
  const v = 'xyab'[rnd(0, 3)], a = nz(-9, 9), b = nz(-12, 12), k = nz(2, 6);
  const exp = lin(a, b, v);
  const tests = [
    // expanded: in form, then each slip
    ['expanded', exp, exp, true],
    ...(a - k ? [['expanded', exp, `${a - k}${v} + ${k}${v} ${b < 0 ? '-' : '+'} ${Math.abs(b)}`, false, 'terms']] : []),
    ['expanded', `${k * a}${v} ${k * b < 0 ? '-' : '+'} ${Math.abs(k * b)}`, `${k}(${exp})`, false, 'brackets'],
  ];
  // factorised: k(p v + q) with gcd(p, q) = 1 is fully factorised; g k (p' v + q') with a common factor left is not
  const p = nz(1, 9), q = nz(-9, 9);
  if (gcd(p, q) === 1) {
    const full = `${k}(${lin(p, q, v)})`, expd = lin(k * p, k * q, v);
    tests.push(['factorised', full, full, true], ['factorised', full, expd, false, 'product']);
    const m = nz(2, 3);
    if (k % m === 0) tests.push(['factorised', full, `${k / m}(${lin(m * p, m * q, v)})`, false, 'hcf']);
  }
  for (const [form, expected, ans, want, slip] of tests) {
    n++;
    const r = F.check(ans, expected, form), got = keyOf(r);
    if (want ? !r.ok : r.ok && !r.unsure) fail(`generated ${form}: "${ans}" (expected ${expected}) gave ${got}`);
    else if (!want && slip && got !== slip && !r.unsure) fail(`generated ${form}: "${ans}" named ${got}, not ${slip}`);
  }
}
console.log(`${n - g0 - (fails - before)}/${n - g0} generated answers marked as expected`);
console.log(fails ? `${fails} failed` : 'all passed');
process.exit(fails ? 1 : 0);
