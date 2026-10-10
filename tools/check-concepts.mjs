// `npm run check-concepts`: tests for the hidden-assumptions scan (tools/concepts.mjs) on Python: the detectors on small
// snippets (including what must NOT match), and the lint on the real lessons with one tag changed at a time.
import { conceptsIn, auditConcepts, prerequisites } from './concepts.mjs';
import { loadLessons, loadDirMeta, getSnippet, CONTENT_ROOT } from './lesson.mjs';
let fails = 0;
const fail = (m) => { fails++; console.log('FAIL', m); };
const sorted = (s) => JSON.stringify([...s].sort());
const has = (code, ids) => { const got = conceptsIn(code); const ok = ids.every((i) => got.has(i)); ok ? console.log('ok  ', JSON.stringify(code).slice(0, 56), '→', ids.join(', ')) : fail(`${JSON.stringify(code)} should use ${ids}; got ${sorted(got)}`); };
const lacks = (code, ids) => { const got = conceptsIn(code); const ok = ids.every((i) => !got.has(i)); ok ? console.log('ok  ', JSON.stringify(code).slice(0, 56), '↛', ids.join(', ')) : fail(`${JSON.stringify(code)} should not use ${ids}; got ${sorted(got)}`); };

has('for i in range(4):\n    forward(i)', ['repeat', 'loop-index']);
lacks('for i in range(4):\n    forward(100)\n    right(90)', ['loop-index']);
lacks('for i in range(4):\n    forward(100)\nprint(i)', ['loop-index']);              // i read after the loop, not inside it
lacks('for _ in range(4):\n    forward(1)', ['loop-index']);
has('x = 5\nx = x + 1', ['variable', 'variable-update', 'arithmetic']);
has('n += 1', ['variable-update']);
lacks('if a == b:\n    pass', ['variable', 'variable-update']);
lacks('write(score, False, "left", ("Arial", 40, "normal"))', ['bool-value']);          // False inside the write recipe
has('write(score, False, "left", ("Arial", 40, "normal"))', ['write', 'string']);
has('showing = False', ['bool-value', 'variable']);
lacks('forward(-100)\ngoto(-150, -120)', ['arithmetic']);                                 // negative numbers are not calculations
lacks('# x = x + 1  while True: import random', ['variable-update', 'while', 'import-module', 'random']);   // comments
lacks('pencolor("while and or not if # x")', ['while', 'and-or', 'not', 'if']);           // string contents
has('pencolor("red")', ['string']);
has('if x > 3:\n    pass', ['if', 'compare']);
has('def f():\n    return 1', ['function', 'return-value']);
lacks('def f():\n    return 1', ['param']);
has('def f(a):\n    return a', ['param']);
has('onscreenclick(handle)', ['callback']);
has('colours = ["red"]\nprint(colours[0])', ['list', 'list-index', 'print']);
has('from turtle import *', ['import-star']);
lacks('from turtle import *', ['arithmetic']);
has('from ui import draw_button', ['import-from']);
has('import random\nx = random.randint(1, 6)', ['import-module', 'dotted-call', 'random']);
has('while True:\n    break', ['while', 'break']);
has('x = 7 // 2 + 2 ** 3 + 5 % 2', ['int-divide', 'power', 'remainder']);

// lint scenarios on the real lessons
const read = getSnippet, pre = prerequisites(loadDirMeta, CONTENT_ROOT);
const run = (mutate) => { const ls = loadLessons(); mutate(ls); return auditConcepts(ls, read, pre).warnings; };
const lesson = (ls, name) => ls.find((l) => l.slug.endsWith('/' + name));
const drop = (l, key, id) => { l[key] = l[key].filter((x) => x !== id); };
const expect = (name, warnings, re) => (warnings.some((w) => re.test(w)) ? console.log('ok  ', name) : fail(`${name}; got ${warnings.filter((w) => /python\//.test(w)).join(' | ')}`));
const base = run(() => {}).filter((w) => /code\/python\/turtle-/.test(w));
console.log(base.length === 3 && base.every((w) => /turtle-catch/.test(w)) ? 'ok   turtle course: only the three Catch random lines warn today' : (fail('baseline changed: ' + base.join(' | ')), ''));
expect('dropping variable-update from Variables warns Events (assumes)', run((ls) => drop(lesson(ls, 'turtle-variables'), 'introduces', 'variable-update')), /turtle-events › assumes: variable-update/);
expect('dropping loop-index from Decisions warns the lesson that uses it', run((ls) => drop(lesson(ls, 'turtle-decisions'), 'introduces', 'loop-index')), /turtle-decisions .*uses loop-index/);
expect('a typo in an id warns', run((ls) => lesson(ls, 'turtle-intro').introduces.push('loop-rnge')), /"loop-rnge" is not a concept id/);
expect('removing length from Lists warns the lesson that uses it', run((ls) => drop(lesson(ls, 'turtle-lists'), 'introduces', 'length')), /turtle-lists .*uses length/);
expect('introducing something the code never uses warns', run((ls) => lesson(ls, 'turtle-functions').introduces.push('while')), /turtle-functions › introduces: while, but no code/);
expect('introducing twice warns', run((ls) => lesson(ls, 'turtle-parameters').introduces.push('function')), /turtle-parameters › introduces: function, already introduced/);
expect('a recipe in Lesson 1 counts as seen later (no import-star warning in Lesson 5)', [...(run((ls) => drop(lesson(ls, 'turtle-modules'), 'introduces', 'import-star')).length ? ['x'] : []), 'turtle-ok'], /turtle-ok/);
const noRecipe = run((ls) => { drop(lesson(ls, 'turtle-intro'), 'recipes', 'import-star'); drop(lesson(ls, 'turtle-modules'), 'introduces', 'import-star'); });
expect('with no recipe and no introduction, import-star warns in Lesson 1', noRecipe, /turtle-intro .*uses import-star/);
const labelled = run((ls) => { lesson(ls, 'turtle-catch').recipes = ['import-module', 'dotted-call', 'random']; }).filter((w) => /turtle-catch/.test(w));
labelled.length === 0 ? console.log('ok   labelling the random lines as recipes clears the Catch warnings') : fail('recipes did not clear: ' + labelled);
console.log(fails ? `${fails} FAILED` : 'all passed');
process.exit(fails ? 1 : 0);
