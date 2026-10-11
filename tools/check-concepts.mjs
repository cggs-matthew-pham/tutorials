// `npm run check-concepts`: tests for the hidden-assumptions scan (tools/concepts.mjs) on Python: the detectors on small
// snippets (including what must NOT match), and the lint on the real lessons with one tag changed at a time.
import { conceptsIn, auditConcepts, prerequisites, theoryLinks } from './concepts.mjs';
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

// HTML and CSS: tags and attributes in the markup, properties only in CSS (never in page text or comments)
const hasH = (code, ids) => { const got = conceptsIn(code, 'html'); ids.every((i) => got.has(i)) ? console.log('ok   html', JSON.stringify(code).slice(0, 51), '→', ids.join(', ')) : fail(`html ${JSON.stringify(code)} should use ${ids}; got ${sorted(got)}`); };
const lacksH = (code, ids) => { const got = conceptsIn(code, 'html'); ids.every((i) => !got.has(i)) ? console.log('ok   html', JSON.stringify(code).slice(0, 51), '↛', ids.join(', ')) : fail(`html ${JSON.stringify(code)} should not use ${ids}; got ${sorted(got)}`); };
hasH('<h1>Sports day</h1>\n<p>Bring <strong>water</strong></p>', ['heading', 'paragraph', 'emphasis']);
lacksH('<h1>Sports day</h1>', ['attribute', 'link', 'css-rule']);
hasH('<ul>\n  <li><a href="https://example.com">Club</a></li>\n</ul>', ['list', 'link', 'attribute']);
hasH('<a href="#join">Join</a>', ['link', 'link-in-page']);
hasH('<img src="trophy.svg" alt="A trophy">', ['image', 'attribute']);
hasH('<style>\n  .note { color: crimson; }\n  h1, h2 { font-size: 40px; }\n</style>\n<p class="note">Hi</p>', ['style-block', 'css-rule', 'class-selector', 'group-selector', 'text-colour', 'font', 'class']);
lacksH('<p>Favourite color: blue. Padding: none. display: flex</p>', ['text-colour', 'box', 'flex', 'css-rule']);     // CSS words in page text
lacksH('<!-- <table> display: grid --><p>Hi</p>', ['table', 'grid']);                                           // comments
hasH('  nav ul {\n    display: flex;\n    gap: 12px;\n  }', ['css-rule', 'descendant-selector', 'flex', 'flex-options']);   // a region inside <style>
hasH('<p style="color: red; padding: 4px">Hi</p>', ['style-attr', 'text-colour', 'box']);
hasH('.layout { display: grid; grid-template-columns: 150px 1fr; }', ['grid', 'css-units']);
lacksH('.card { width: 50%; padding: 10px; }', ['css-units']);
hasH('label { display: block; }', ['display']);
lacksH('label { display: block; }', ['flex']);
hasH('<button id="go">Go</button>\n<script>\n  document.querySelector("#go").addEventListener("click", () => {});\n</script>', ['button', 'id', 'script', 'js-event', 'js-query']);

// lint scenarios on the real lessons
const read = getSnippet, pre = prerequisites(loadDirMeta, CONTENT_ROOT);
const run = (mutate) => { const ls = loadLessons(); mutate(ls); return auditConcepts(ls, read, pre).warnings; };
const lesson = (ls, name) => ls.find((l) => l.slug.endsWith('/' + name));
const drop = (l, key, id) => { l[key] = l[key].filter((x) => x !== id); };
const expect = (name, warnings, re) => (warnings.some((w) => re.test(w)) ? console.log('ok  ', name) : fail(`${name}; got ${warnings.filter((w) => /python\//.test(w)).join(' | ')}`));
const base = run(() => {}).filter((w) => /code\/python\/turtle-/.test(w));
console.log(base.length === 0 ? 'ok   turtle course: no warnings' : (fail('baseline changed: ' + base.join(' | ')), ''));
expect('dropping variable-update from Variables warns Events (assumes)', run((ls) => drop(lesson(ls, 'turtle-variables'), 'introduces', 'variable-update')), /turtle-events › assumes: variable-update/);
expect('dropping loop-index from Decisions warns the lesson that uses it', run((ls) => drop(lesson(ls, 'turtle-decisions'), 'introduces', 'loop-index')), /turtle-decisions .*uses loop-index/);
expect('a typo in an id warns', run((ls) => lesson(ls, 'turtle-intro').introduces.push('loop-rnge')), /"loop-rnge" is not a concept id/);
expect('removing length from Lists warns the lesson that uses it', run((ls) => drop(lesson(ls, 'turtle-lists'), 'introduces', 'length')), /turtle-lists .*uses length/);
expect('introducing something the code never uses warns', run((ls) => lesson(ls, 'turtle-functions').introduces.push('while')), /turtle-functions › introduces: while, but no code/);
expect('introducing twice warns', run((ls) => lesson(ls, 'turtle-parameters').introduces.push('function')), /turtle-parameters › introduces: function, already introduced/);
expect('a recipe in Lesson 1 counts as seen later (no import-star warning in Lesson 5)', [...(run((ls) => drop(lesson(ls, 'turtle-modules'), 'introduces', 'import-star')).length ? ['x'] : []), 'turtle-ok'], /turtle-ok/);
const noRecipe = run((ls) => { drop(lesson(ls, 'turtle-intro'), 'recipes', 'import-star'); drop(lesson(ls, 'turtle-modules'), 'introduces', 'import-star'); });
expect('with no recipe and no introduction, import-star warns in Lesson 1', noRecipe, /turtle-intro .*uses import-star/);
const noImportRecipe = run((ls) => drop(lesson(ls, 'turtle-catch'), 'recipes', 'import-module'));
expect('taking import-module out of Catch recipes warns again', noImportRecipe, /turtle-catch .*uses import-module/);
expect('introducing random in Catch is checked against its code', run((ls) => lesson(ls, 'turtle-catch').introduces.push('while')), /turtle-catch › introduces: while, but no code/);
const baseH = run(() => {}).filter((w) => /code\/html\//.test(w));
console.log(baseH.length === 0 ? 'ok   HTML course: no warnings' : (fail('HTML baseline changed: ' + baseH.join(' | ')), ''));
expect('dropping link from Lists and links warns Images (it uses a link)', run((ls) => drop(lesson(ls, 'lists-links'), 'introduces', 'link')), /code\/html\/(lists-links|images) .*uses link/);
expect('dropping display from Forms warns Forms', run((ls) => drop(lesson(ls, 'forms'), 'introduces', 'display')), /code\/html\/forms .*uses display/);
expect('the optional Grid lesson does not count for the required club page', run((ls) => { drop(lesson(ls, 'flexbox'), 'introduces', 'flex-options'); lesson(ls, 'grid').introduces.push('flex-options'); }), /code\/html\/(flexbox|sections|club-page) .*uses flex-options/);
// theory concepts (Digital systems): introduced in a systems lesson, assumed by lessons in any subject
const baseT = run(() => {}).filter((w) => /systems\/|microbit-security\/caesar|p5-shapes/.test(w));
console.log(baseT.length === 0 ? 'ok   theory links: no warnings' : (fail('theory baseline changed: ' + baseT.join(' | ')), ''));
expect('dropping text-as-numbers from Text as numbers warns the Caesar cipher (another subject)', run((ls) => drop(lesson(ls, 'text-as-numbers'), 'introduces', 'text-as-numbers')), /microbit-security\/caesar › assumes: text-as-numbers/);
expect('a theory id typo warns, even in a maths-language lesson', run((ls) => lesson(ls, 'binary-numbers').introduces.push('binery')), /binary-numbers › introduces: "binery" is not a concept id/);
expect('within a subject the order counts: a later lesson cannot be what an earlier one assumes', run((ls) => lesson(ls, 'data-as-numbers').assumes.push('binary')), /data-as-numbers › assumes: binary/);
{ const tl = theoryLinks(loadLessons()), c = tl.get('code/microbit-security/caesar'), t = tl.get('systems/data/text-as-numbers');
  (c?.on.some((x) => x.slug === 'systems/data/text-as-numbers') && t?.in.some((x) => x.slug === 'code/microbit-security/caesar')) ? console.log('ok   links: Caesar builds on Text as numbers, and back') : fail('theoryLinks: Caesar and Text as numbers not linked'); }
console.log(fails ? `${fails} FAILED` : 'all passed');
process.exit(fails ? 1 : 0);
