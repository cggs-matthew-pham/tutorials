# Roadmap: Maths

The maths chat's file. Lessons live in `content/maths/`. Design notes and status so far are in the project docs (`maths-structure`, `maths-boards-plan`, `maths-expressions-status`, `maths-graphs-7a04-status`, `board-embed-contract`); record new decisions here.

## Done: prerequisite checks (decided and built 11 Oct 2026)

The code-style scan does not carry over: maths and science have no code to scan, and their tutorials sit beside class teaching. Checked against the repo: no lesson has a `node:` field (the node is named only in `teacher.yml` summaries, such as Plates "AC9S8U03, node 2"), and the repo holds no progression data (`prior_knowledge` lives in waypoints-kit and no build step reads it). 55 science and 19 maths lessons.

- **Maths:** dependencies are prior skills in a chain, so the ACARA node graph fits. Each lesson gets a `node:` field (today the node is only named in the teacher notes), and the waypoints-kit `prior_knowledge` is exported into the repo (it is not in the repo or read by the build today). The check warns when a lesson's prerequisite node is neither taught in an earlier lesson nor marked `assumes:` (taught in class). In the lesson itself, the prerequisite is checked with a short retrieval question at the start or in Practise, not taken for granted.
- **Maths:** prerequisites form a skills chain, so the node graph fits; in the lesson, a prerequisite is checked with a short retrieval question at the start or in Practise, not assumed.

The shared part (progression data in the repo, the `node:` field and the node check in validate) is in `shared.md` › Shared: progression data and node check.

**Built (11 Oct).** Data: `data/progressions/maths/` holds 13 descriptor pages pasted from the progressions site (the kit repo was unreachable): Year 7 A01–A06, N04, N07, M05 and Year 8 A01–A04. Every maths lesson has `node:`; `npm run validate` warns on gaps (`tools/progressions.mjs`, `npm run nodes`, `npm run check-nodes`; shared.md has the details). Rules agreed: Prior Knowledge and the node before are prerequisites, Related standards are not (many point forward); earlier-year prerequisites count as taught in class; gaps the data misses are tagged `uses:` after reading the lesson.

Read-through findings: Linear relations computes with negatives from Tables from rules on (`uses: [AC9M7N07 …]` on seven lessons, now met by Number Foundations); Tables from rules got a quick check (−4 + 3) before negative inputs. Year 8 lessons `assumes:` the parts of AC9M8A02 that are class work (inequalities, x on both sides). Words into expressions assumes 0 − 1 = −1 (one feedback line). Validate is clean.

## Done: number line board and Number Foundations (11 Oct 2026)

Board widget `numberline` (AUTHORING › 11): fixed, dragged and slider-following points, a live comparison sentence, jumps for + and − with the adding direction drawn faintly when subtracting, `context:` for temperatures; numbers thin out on a narrow screen. Course `maths/number` (pathway id `number-foundations`), unit Integers: 1. Comparing integers (7N07 n1), 2. Adding and subtracting integers (7N07 n2). Teacher notes, primer, voiced explain clips (flite timing 24 s and 28 s), pictures; misconceptions `negative-magnitude`, `subtract-negative`. Every check passes headless.

## Done: geometry board and Angles and shapes (11 Oct 2026)

Board widget `geometry` (AUTHORING › 11): a triangle or polygon on a dot grid, draggable corners, live interior angles rounded so they add to the exact total, Tear off the corners (triangle), Split into triangles from A (convex polygons), presets, More/Fewer sides. Built as its own widget on JSXGraph rather than a preset of `graph` (no axes, square grid, its own values). Course `maths/angles` (pathway id `angles-shapes`), unit Angle sums: 1. Angles in a triangle (7M05 n1), 2. Angles in a polygon (7M05 n2), on the Relationship template (predict, explore, explain why, vary, practise, make). Teacher notes, primer, voiced clips (21 s and 22 s), pictures; misconceptions `angle-sum-size`, `polygon-centre-angles`. Every check passes headless.

## Done: keyboard moves, reference cards, fractions on the line (11 Oct 2026)

- **Keyboard:** the number line and geometry boards have a **Move** row (pick a point, then arrow buttons or keys), so dragged points work without a pointer and clips can press `Move P left`.
- **Reference cards:** maths cards now come from `snippets/maths.json` plus one `snippets/maths-<name>.json` per course (shared.md has the tool change). Number Foundations (9 cards) and Angles and shapes (5 cards) have Reference pages and filled cheat sheets.
- **AC9M7N04 n3:** new unit Fractions and decimals in Number Foundations, lesson 3 *Fractions and decimals on the line* (positive and negative fractions, decimals and mixed numerals; quarters, tenths, a line without zero in the middle; misconception `negative-decimal-direction`). Node 2 (conversions) is assumed taught in class and retrieved with a quick check. The number line board gained `fractions: 4` (readouts as mixed numerals with the decimal).
- The Algebra pathway text no longer says Linear relations is being built.

## Form checks: options compared (prototype run 11 Oct 2026; Numbas chosen)

The plan named two ways to check that an answer is in a required form (expanded, factorised, simplified, a formula's subject): Numbas's JME with pattern matching, or math.js plus our own rules. A third came out of the prototype: the same rules on the parse tree WPM already builds. All three were run on 35 answers to 11 Year 8–10 tasks (expand and simplify, factorise including negatives and a quadratic, collect like terms, index laws, change the subject), then 12 harder ones.

| | Numbas JME | math.js + our rules | Our rules on WPM's tree |
|---|---|---|---|
| 35 main answers | 35/35 (after making `=` order matter) | 35/35 (after reading x(…) as a product) | 35/35 |
| 12 harder answers | 9/12: missed 6(x + 3/2), 2x(x + 2), (x + 3)² | 12/12 (after allowing (x + 3)²) | 12/12 |
| Added download | about 430 KB minified (120 KB gzipped) plus an English locale | about 320 KB (90 KB gzipped), parser only | about 3 KB (1 KB gzipped) |
| Feedback | "like terms or powers not collected" (could be split per rule set) | names the slip: brackets left, like terms not collected, powers not combined, numbers not multiplied, common factor left in a bracket | same as math.js |
| Notes | patterns are compact but subtle (commutative `=`); reads vt as one name | reads x(…) as a function call unless fixed | same parser as the equivalence check; reads vt as v × t |

**Numbas follow-up checks (11 Oct):** Matthew leans to Numbas for answer checks (equivalence and form), WPM staying for board conditions. Three checks, all passed:
1. Letters as students mean them: `scope.expandJuxtapositions` turns `2xy` into 2 × x × y, `vt` into v × t and `x(3)` into x × 3, keeps `sin`, `ln`, `pi`, `e`, and `jme.compare` then finds `xy + yx` equivalent to `2xy`. WPM and Numbas would read answers the same way.
2. Node, for validate: the JME runtime runs in a plain `vm` context (no browser, no jsdom), ready in about 0.3 s; the form checks give the same results as in Chromium.
3. Size: JME runtime plus an English-only locale, minified, about 474 KB (133 KB gzipped); loaded only on lessons with form checks. Some modules (calculus, scheduling) could be trimmed later.
With the three pattern misses fixed (fractions inside a bracket, `x(...)` as a product, a squared bracket), Numbas scores 47/47, like the other two.

Earlier recommendation (before the follow-up checks): our rules on WPM's tree (about 90 lines). Decision now between that and Numbas; either sits behind the `form` slot the boards plan reserved. Prototypes and cases are in the session scratchpad, not the repo. Next, once agreed: `answer` checks take `form: expanded | factorised | simplified | subject x`, then the line-by-line working check, then Year 8 expanding (AC9M8A01 n1) with an algebra tiles board.

## Done: form checks on Numbas, working check, tiles, Expanding brackets (11 Oct 2026)

- **Decision:** Numbas (vendored v11.0, English only, about 133 KB gzipped) marks `answer` checks with `form:` and the new `working` check, and is loaded only on lessons that use them; plain answer checks and board conditions stay on WPM. The follow-up checks (letter splitting, Node, size) all passed. Validate marks every form answer, feedback answer and working example in Node with the same build. `npm run check-forms`: 71 case-file answers, 15 workings, 717 generated answers. Add a case to `data/forms-cases.json` whenever a real answer is marked wrongly.
- **Lenient by design:** an equivalent answer the checker cannot judge passes with a note; a wrong form is told its slip (brackets left, like terms, powers, numbers, not a product, whole numbers, common factor left).
- **Board `tiles`:** algebra tiles for k(ax + b), negatives in red, extra terms to collect.
- **AC9M8A01 n1:** unit Brackets in Algebra Foundations, lesson *Expanding brackets* (tiles, form-checked answers, two working checks, misconception `partial-distribution`, three Reference cards).

## Done: Multiplying and dividing integers (11 Oct 2026)

AC9M8N04 page added; lesson 3 of Number Foundations' Integers unit, *Multiplying and dividing integers* (node 1): the pattern a × (−2), the number line's new `product: a × b` (a negative number of jumps goes the opposite way), division by the same rule, powers of −1; misconception `sign-rules-addition`; two cards. Fractions on the line moves to order 4. Comparing two plans and Solving with graphs now list it in `uses:`; Expanding brackets lists it in `assumes:` with a quick check (−2 × (−5)) before its negative-outside task, since Algebra does not come after Number Foundations; Tables from rules notes that its rule machine shows 2(−2).

## Done: Factorising (11 Oct 2026)

AC9M8A01 n2: lesson 11 of Algebra Foundations' Brackets unit, *Factorising*. The tiles board gains a factorise mode (`s` x-tiles and `t` ones, a `k` rows slider; values `f` rows work, `h` fully factorised, `g` the HCF): tiles that do not share stay in a heap. Form-checked answers (`form: factorised`, numbers and a letter taken out, three terms), a working check that allows taking out a factor in steps, misconception `hcf-not-highest` (Ava's 2(6x − 4)), one Reference card.

## Done: Changing the subject (11 Oct 2026)

AC9M8A01 n3: lesson 12, *Changing the subject*, completing AC9M8A01 in the Brackets unit. The formula board works P = 2l + 2w forwards so students check a rearranged formula by substitution (Run, Modify, and Make with T = 4n + 6). `form: subject x` answers (one step, minus sign, undoing a divide, a fraction, a negative subject), two working checks, misconception `divide-one-term` (Jo's y ÷ 4 = x − 3), one Reference card. The Brackets primer and unit summary now cover all three lessons. Found: the subject check is case-sensitive while Numbas compares letters case-insensitively, so a subject written in the other case (c for C) is told to rewrite; lessons use lower-case subjects for now.

## Done: Linear relations cards (11 Oct 2026)

`snippets/maths-linear.json`: 11 cards in three groups (Rules and tables, Lines, Solving and modelling), five with board pictures (growing pattern, ordered pair, gradient, parallel lines, solve with a graph). The course now has a Reference page and cheat sheets.

## Done: keyboard moves on the graph board (11 Oct 2026)

Every graph board with dragged points gets the Move row (a point picker, arrow buttons and arrow keys, steps of the snap); `drag y` and `drag x` points get only their own directions. Board clips re-record on the next publish anyway (the board playground changed).

## Done: Parallel lines (11 Oct 2026)

AC9M7M04 n1 and n2: a new first unit in Angles and shapes, Parallel lines, with *Angles at parallel lines* (naming corresponding, alternate and co-interior pairs; misconception `vertically-opposite-pair`) and *Finding angles with parallel lines* (the rules and reasons; misconception `co-interior-equal`). New board widget `parallel` (turn the transversal, tilt a line so it is not parallel, pick two angles; the board names the pair unless `names: off`). Angles in a triangle and Angles in a polygon move to orders 3 and 4. Six Reference cards (three with pictures) and a primer.

## Done: reasoning check and unknown angles (11 Oct 2026)

Matthew's steer: students own their working; the platform supports it but is not strict about it (unlike Mathspace). New `reasoning` check: free working never marked, then the answer and a reason chosen at the key step are marked, then the student's working beside a model, with a self-check. Lessons: *Reasoning with angles* (AC9M7M04 n3, Parallel lines lesson 3; misconception `assume-equal-angles`) and *Unknown angles in shapes* (AC9M7M05 n3, last in Angle sums; `wrong-angle-sum`, exterior angle = the two opposite angles). Geometry board: `angles: given …` and `exterior: C`; parallel board: several given angles. Triangle and polygon lessons move to orders 4 and 5. `subject x` answers accept either case.

## Done: equivalent fractions and conversions (11 Oct 2026)

AC9M7N04 n1 and n2 in Number Foundations' Fractions unit: *Equivalent fractions* (misconception `fraction-add-same`) and *Fractions, decimals and percentages* (`decimal-percent-place`), before *Fractions and decimals on the line* (now order 6, its `assumes` dropped). New board widget `bars` (fraction bars and a hundred grid). Answer forms `simplest` and `decimal`; a typed % or ° is ignored. Six cards and the Fractions primer updated.

## Done: Solving harder equations (11 Oct 2026)

AC9M8A02 n2: new unit Equations and inequalities in Algebra Foundations, lesson 13 *Solving harder equations* (x on both sides, brackets, negatives, a fraction, no solution; working checks; the graph shows the solution where the two sides meet; misconception `inverse-sign`; two cards). It lists AC9M8A02 n1 in `assumes:` (graphing lines is Linear relations; the board draws them).

## Done: lines, regions and inequalities (11 Oct 2026)

AC9M8A02 n1: *Lines and regions* (Linear relations, Lines unit, order 8; Solving with graphs, Rules from situations and Comparing two plans move to 9 to 11; misconception `boundary-solid`). AC9M8A02 n3: *Inequalities* (Algebra, Equations and inequalities unit, lesson 14; reversing for a negative, number-line rays, graphical check; `inequality-reverse`). Board: graph `plot: x = a` and `shade:`; numberline `ray:`. Four cards.

## Done: Calculating with negative fractions and decimals (11 Oct 2026)

AC9M8N04 n2: Number Foundations' Fractions unit, lesson 7 (sign first, then size; efficient order and the distributive split, with two reasoning-check strategy tasks). Two cards. Number unit and course summaries updated.

## Done: review fixes and the teachers' page (11 Oct 2026)

An independent read of all 19 lessons found no wrong mathematics; fixed one bug-task line (Max, line 4), one feedback message, unclear working and wording, and added the terms numerator, denominator, reflex, convex, concave, "sum of the two interior opposite angles" and "inequality sign". The parallel board now reports the picked pair (`u`, `v`), so checks can ask for a specific pair. New page *For maths teachers* (`content/maths-teachers.md`, linked from the home page): what is here, how a lesson runs, the teacher guides, a ten-minute tour, and the feedback form. The site is for maths teachers to try when it suits them.

## Done: Data and chance, Year 7 (11 Oct 2026)

New course *Data and chance* (`content/maths/data/`, after Number Foundations): Data unit (Counting and measuring 7ST01 n1, Mean, median, mode and range n2, Which measure? n3, Stem-and-leaf plots 7ST02 n1, Comparing data sets n2 and n3) and Chance unit (Sample spaces and probability 7P01 n1 and n2, Predict and test 7P01 n3 and 7P02 n1, Many trials 7P02 n2). 7ST03 (statistical investigations) is a class task in the Data primer. New board widgets `data` and `chance`; progression pages written from the kit by `tools/kit-page.mjs`; misconceptions discrete-decimal, median-unsorted, mean-always-best, stem-skip-empty, compare-single-value, equally-likely-outcomes, expect-exact, gamblers-fallacy; 11 cards and two primers.

## Done: Number gaps, squares, powers and fractions operations (11 Oct 2026)

Number Foundations gains a unit *Squares, powers and primes* between Integers and Fractions (orders 4 to 8): Squares and square roots (7N01 n1, n2), Between the squares (n3, n4), Powers (7N02 n1), Prime factors (n2), HCF and LCM (n3). It sits before Fractions because simplifying and common denominators use the HCF and LCM. The fractions unit gains Adding and subtracting fractions (7N06 n1), Multiplying and dividing fractions (n2), Percentages of amounts (n3) and Choosing a strategy (n4), before Calculating with negative fractions and decimals (now 16); the existing fractions lessons are renumbered 9 to 11 (slugs unchanged, so progress is kept). New board widgets `square`, `factortree` (with `grown: on` for pictures), `fracadd`, `fracarea` and `percent`; misconceptions square-double, power-times, tree-stops-early, lcm-product, fraction-add-across, multiply-makes-bigger, decrease-multiplier; 13 cards; a Powers primer; the Fractions primer covers the operations. Reasoning checks are used for the bus problem (LCM), bounding a root, and the strategy lesson; the HCF and LCM Make step is a reasoning check (two numbers from their HCF and LCM).

## Still to do

- **Publish and listen:** the thirty-six new clips (Number Foundations 16, Angles 6, Algebra 5, Linear relations 1, Data and chance 8) record with the real voice on the next manual publish.
- **Teacher feedback:** maths teachers try the site when it suits them (the For maths teachers page and the feedback form); act on what comes back.
- **Watch in class:** whether students write real working in the reasoning box or skip to the marked parts; whether the self-check ticks are honest.
- **Next (agreed order, checked against the curriculum map's builds-on links):** Number gaps are done; next Area and volume 7M01, 7M02, then circles 7M03; then classifying shapes 7SP02 and Pythagoras 8M06. Pages come from the kit with `tools/kit-page.mjs`. AC9M7A06 stays a class task.
- **Form-check coverage:** simplest and decimal are built; ratio and inequalities are not; add them when a lesson needs one.
