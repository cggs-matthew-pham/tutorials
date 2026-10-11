// Tests the p5 playground's friendly errors (playground-p5/p5-errors.js): each case runs a slip in Node to get the
// engine's own message, then checks the hint names the cause (and, for a name slip, the right spelling).
//   npm run check-p5-errors
import vm from 'node:vm';
import { hint } from '../playground-p5/p5-errors.js';

const cases = [
  ['ReferenceError', 'let x = 1;\nconsole.log(y);', /name `y`/],
  ['case of a name', 'function drawFlower() {}\ndrawflower();', /`drawFlower`/],
  ['used before let', 'console.log(a);\nlet a = 1;', /`a` is used before/],
  ['const changed', 'const a = 1;\na = 2;', /`const` can never change/],
  ['not a function', 'let a = 5;\na();', /not a function/],
  ['property of undefined', 'let l = [];\nconsole.log(l[3].x);', /undefined/],
  ['missing )', 'console.log(1;', /`\(` has no matching|missing or extra/],
  ['missing }', 'function f() {\n  let a = 1;\n', /`\{` has no matching/],
  ['unclosed quote', 'let s = "abc;\n', /quote/],
  ['two names', 'let a = 1 let b = 2;', /side by side/],
  ['let twice', 'let a = 1;\nlet a = 2;', /made twice/],
];
let bad = 0;
for (const [name, code, want] of cases) {
  let msg = '';
  try { new vm.Script(code); vm.runInNewContext(code); } catch (e) { msg = `${e.name}: ${e.message}`; }
  const h = hint(msg, code, 1).hint;
  const ok = msg && h && want.test(h);
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${ok ? '' : `: "${msg}" -> ${h}`}`);
  if (!ok) bad++;
}
if (bad) { console.error(`${bad} case(s) failed`); process.exit(1); }
console.log('all passed');
