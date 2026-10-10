// Checks the science board's simulation engines without a browser. Run: node tools/check-engines.mjs
//   atoms.js       every kind of reaction keeps its atoms and changes the total kinetic energy by exactly `release`
//                  per reaction; a higher temperature or a catalyst makes a reaction faster
//   crystals.js    slower cooling gives fewer, bigger crystals; instant cooling gives mostly glass
//   convection.js  a heated fluid circulates (particles complete loops); a heated solid bar warms along its length
//   selection.js   bird predation shifts a beetle population's average colour towards the ground's; no hunting, no drift
import { readFileSync } from 'node:fs';
const window = { SCI: {} }; globalThis.matchMedia = () => ({ matches: false });
for (const f of ['atoms', 'crystals', 'convection', 'selection']) new Function('window', readFileSync(new URL(`../playground-science/${f}.js`, import.meta.url), 'utf8'))(window);
const A = window.SCI.atoms;
let bad = 0;
const fail = (m) => { bad++; console.log('✗ ' + m); };
const box = () => ({ x0: 0, x1: 22, y0: 0, y1: 12 });
const cases = [
  ['H2 + Cl2 -> 2 HCl', [['H2', 12], ['Cl2', 12]], 1.5, -0.5, 1],
  ['H2 + O2 -> H2O2', [['H2', 12], ['O2', 6]], 1.5, 1, 1],
  ['N2O4 -> 2 NO2', [['N2O4', 10]], 2, -0.5, 2],
  ['CH4 + 2 O2 -> CO2 + 2 H2O', [['CH4', 6], ['O2', 12]], 1, 1, 1],
];
for (const [rule, start, ea, release, t] of cases) {
  const sim = new A.Sim(box()); sim.t = t; sim.hold = false; sim.rules = [A.parseRule(rule, ea, release)];
  start.forEach(([f, n]) => sim.add(f, n)); sim.setTemp(t);
  // Tallies compared in a fixed order: key order follows whichever particle comes first, which reactions change.
  const tally = () => JSON.stringify(Object.entries(sim.atomTally()).sort());
  const ke = () => sim.ms.reduce((s, m) => s + sim.ke(m), 0), atoms0 = tally(), k0 = ke();
  for (let f = 0; f < 900; f++) sim.step();
  if (!sim.wins) fail(`${rule}: no reactions`);
  if (tally() !== atoms0) fail(`${rule}: atoms changed`);
  if (Math.abs(ke() - (k0 + release * sim.wins)) > 1e-6) fail(`${rule}: energy ${ke().toFixed(3)}, expected ${(k0 + release * sim.wins).toFixed(3)}`);
  else console.log(`✓ ${rule}: ${sim.wins} reactions, atoms and energy conserved`);
}
// Rates: time for 3/4 of H2 + Cl2 at ea 3, averaged over runs.
const time = (K, cat) => { let sum = 0; for (let r = 0; r < 4; r++) { const sim = new A.Sim(box()); sim.t = K / 300; sim.catalyst = cat; sim.rules = [A.parseRule('H2 + Cl2 -> 2 HCl', 3, 0)]; sim.add('H2', 15); sim.add('Cl2', 15); sim.setTemp(K / 300); let f = 0; while (sim.count('HCl') < 22 && f < 60 * 240) { sim.step(); f++; } sum += f / 60; } return sum / 4; };
const [cold, hot, cat] = [time(300, 1), time(500, 1), time(300, 0.5)];
console.log(`  3/4 reacted: 300 K ${cold.toFixed(1)} s · 500 K ${hot.toFixed(1)} s · 300 K with catalyst ${cat.toFixed(1)} s`);
if (!(hot < cold && cat < cold)) fail('a higher temperature and a catalyst should both be faster');
for (const bad of ['H2 + Cl2 -> HCl', 'Xx2 -> X']) { try { A.parseRule(bad, 1, 0); fail(`accepted "${bad}"`); } catch { /* refused, as it should be */ } }

// Crystals: average of several melts at each cooling setting.
const { Melt, RATES } = window.SCI.crystals;
const melt = new Melt({ x0: 0, x1: 22, y0: 0, y1: 12 });
const avg = (rate) => { const rs = [0, 1, 2].map(() => melt.run(rate)); return { crystals: rs.reduce((s, r) => s + r.crystals, 0) / 3, size: rs.reduce((s, r) => s + r.average, 0) / 3, glass: rs.reduce((s, r) => s + r.glass / r.total, 0) / 3 }; };
const rows = RATES.map(([rate, name]) => [name, avg(rate)]);
console.log('  cooling: ' + rows.map(([n, r]) => `${n} ${r.crystals.toFixed(0)} crystals of ${r.size.toFixed(0)}${r.glass > 0.05 ? `, ${Math.round(100 * r.glass)}% glass` : ''}`).join(' · '));
if (!(rows[0][1].size > 3 * rows[2][1].size)) fail('very slow cooling should give crystals at least 3 times bigger than fast cooling');
if (!(rows[4][1].glass > 0.5)) fail('instant cooling should give mostly glass');
else console.log('✓ crystals: slower cooling, bigger crystals; instant cooling, glass');

// Convection: loops in a heated fluid; heat spreading along a solid bar.
const { Flow } = window.SCI.flow;
const fl = new Flow({ x0: 0, x1: 22, y0: 0, y1: 12 }); let loops = 0; const st = fl.ps.map(() => 0);
for (let k = 0; k < 60 * 30; k++) { fl.step(); fl.ps.forEach((p, i) => { if (st[i] === 0 && p.y < 4) st[i] = 1; else if (st[i] === 1 && p.y > 8) st[i] = 2; else if (st[i] === 2 && p.y < 4) { st[i] = 3; loops++; } }); }
if (loops < fl.ps.length / 5) fail(`convection: only ${loops} of ${fl.ps.length} particles completed a loop in 30 s`); else console.log(`✓ convection: ${loops} of ${fl.ps.length} particles completed a loop in 30 s`);
const bar = new Flow({ x0: 0, x1: 22, y0: 0, y1: 4 }, { solid: true }); for (let k = 0; k < 60 * 15; k++) bar.step();
const q = [0, 1, 2, 3].map((i) => bar.heatAt(i * 5.5, i * 5.5 + 5.5));
if (!(q[0] > q[1] && q[1] > q[2] && q[3] > 0.01) || bar.ps.some((p) => Math.hypot(p.x - p.sx, p.y - p.sy) > 0.2)) fail('conduction: heat should spread along the bar with no particle leaving its place');
else console.log(`✓ conduction: bar quarters ${q.map((h) => h.toFixed(2)).join(' > ')}, no particle moved along`);

// Natural selection: hunting moves the average colour towards the ground's; breeding alone barely moves it.
const { Population } = window.SCI.selection;
const run = (ground, hunt, gens = 6) => { let t = 0; for (let r = 0; r < 10; r++) { const p = new Population(40, { ground, mean: 0.5 }); for (let g = 0; g < gens; g++) { if (hunt) p.hunt(20); else p.hunt(0); p.breed(); } t += p.mean(); } return t / 10; };
const dark = run(0.85, true), pale = run(0.15, true), none = run(0.15, false);
if (!(dark > 0.6 && pale < 0.4 && Math.abs(none - 0.5) < 0.08)) fail(`selection: average after 6 generations dark ground ${dark.toFixed(2)}, pale ${pale.toFixed(2)}, no hunting ${none.toFixed(2)}`);
else console.log(`✓ selection: average colour after 6 generations, dark ground ${dark.toFixed(2)} · pale ground ${pale.toFixed(2)} · no hunting ${none.toFixed(2)}`);
console.log(bad ? `${bad} problem(s)` : 'Science engines OK.');
process.exit(bad ? 1 : 0);
