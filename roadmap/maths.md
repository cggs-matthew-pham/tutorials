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

## Done: Area, volume and circles, Year 7 (11 Oct 2026)

New course *Area, volume and circles* (`content/maths/measurement/`, the pathway's `area-volume` course, after Angles and shapes, Number and Algebra): Area unit (Area of parallelograms 7M01 n1, Area of triangles n1, Area problems n2), Volume unit (Volume in layers 7M02 n1, Prisms and capacity n2), Circles unit (Parts of a circle 7M03 n1, Discovering π n2, Circumference n3). New board widgets `area` (cut and move, turned copy, height outside), `prism` (isometric layers) and `circle` (roll it out, C ÷ d table); misconceptions slant-height, triangle-no-half, area-units, volume-visible-cubes, radius-diameter, pi-exact; 11 cards; three primers. Reasoning checks: the house wall (composite area), the biggest circle in a box, and d = C ÷ π. Every lesson has a `struggle:` note, and so do the nine Number lessons from the morning batch.

## Done: Classifying shapes and Pythagoras (11 Oct 2026)

Angles and shapes gains a unit *Classifying shapes* (lessons 7 to 9): Classifying triangles (7SP02 n1), The quadrilateral family (n2), Polygons (n3), on the geometry board with `classify: on` (ticks, parallel arrows, right-angle marks, live names; a trapezium has at least one pair of parallel sides, as in the Australian Curriculum glossary, so parallelograms are trapezia too). The measurement course becomes *Area, volume, circles and Pythagoras* with a unit *Pythagoras* (lessons 9 to 11): Pythagoras' theorem (8M06 n1), Finding a side (n2), Right, acute or obtuse? (n3), on the new `pythag` board (squares on the sides, an angle slider). Misconceptions acute-one-angle, square-not-rectangle, regular-sides-only, pyth-no-squares, pyth-add-for-leg, c-not-longest; 7 cards; two primers; struggle notes.

## Done: Number, the rest of Year 7 (11 Oct 2026)

Number Foundations gains three units and eight lessons (17 to 24): Place value and estimating (Place value and powers of 10, 7N03 n1 and n2; Rounding decimals, 7N05 n1 and n2; Estimating to check, 7N05 n3), Ratios (What is a ratio?, 7N08 n1; Equivalent and simplest ratios, n2; Sharing in a ratio, n3) and Modelling (Modelling with money, 7N09 n1 to n3; Modelling with ratios, 7M06 n1 and n2). New boards `placevalue`, `rounding` (round, estimate) and `ratio` (tape, share); primers `placevalue.md`, `ratio.md`, `modelling.md`; 15 reference cards; nine misconceptions (power-off-by-one, round-truncate, round-double, est-zero-slip, est-no-compare, ratio-part-whole, ratio-add-not-multiply, share-by-term, percent-wrong-base, model-no-units). An independent reviewer found and we fixed wrong feedback messages, a clip that showed 2000 not 4000, a self-contradictory option and several uncovered node criteria. Lessons 17 to 24 sit after the fractions unit so no existing lesson was renumbered. Modelling with money comes before Modelling with ratios because M06 assumes N09.

## Done: Space and investigations, the rest of Year 7 (11 Oct 2026)

Angles and shapes gains three units and six lessons (10 to 15): Solids (Nets, 7SP01 n1; Views of a solid, n2 and n3), Transformations (Translations, 7SP03 n1; Reflections, n2; Rotations, n3) and Algorithms (Algorithms for classifying shapes, 7SP04 n1 and n2, on the `key` board). Linear relations gains *Changing one thing at a time* (12, 7A06 n1 and n2, on the `formula` board) and Data and chance gains *Statistical investigations* (9, 7ST03 n1 and n2, on the `data` board); a full investigation is still a class task, which the teacher notes and the Make step set up. New boards `transform`, `net` and `views` (see roadmap/shared.md). New misconceptions: net-count-only, view-adds-up, translate-sign, reflect-axis-swap, rotate-swap-only, algo-general-first, vary-two-at-once, sample-generalise. The Year 7 descriptors left over from the earlier pushes (7SP01, 7SP03, 7SP04, 7A06, 7ST03) are now taught.

## Done: Angles practice (12 Oct 2026)
- `content/maths/angles/practice/`: 17 of 21 lessons, geometry described in words (no diagrams on the page). Left out: the two algorithm lessons, Angles at parallel lines (naming pairs) and Proving quadrilateral properties (proofs). Transformations and 3D coordinates are answered as points.
- Review fixes: a triangular pyramid's net (4 triangles, not 3), chains whose answer flips between a and 180 − a so it can't be guessed from the wording, scrambled congruence statements (△ABC ≡ △QRP), feedback slips that are possible, and the lessons' own words. Core: point answers, "A′(3, −2)", "x = 3, y = −2", º for °, and ×4 for a scale factor.

## Done: Measurement practice (12 Oct 2026)
- `content/maths/measurement/practice/`: all 18 lessons. π questions accept the π button and 3.14 where the question allows either; where it names 3.14 or 22/7, the other value gets "use … as the question says". Right, acute or obtuse is asked as a count or as a² + b² − c². Time zones use October offsets (as the lesson does) and real flight lengths per route.
- Review fixes: a² + b² − c² questions where c wasn't the longest side (or no triangle), rounded feedback answers, ring area and semicircle perimeter (taught but missing), safe ladder angles, sizes per object, wider ranges. Core: "50.3 cm2", "2 pm" (asks for 24-hour time), "16π" (asks for a number) and "14:00" for an hour.

## Done: Irrational numbers and index laws practice (12 Oct 2026)
- `content/maths/real-numbers/practice/`: all 6 lessons. Classify questions (rational or irrational, terminate or recur) are asked as counts, so the page's one text box can mark them.
- Review fixes: the irrational count no longer lands on 2 nine times in ten (half the roots are perfect squares; the fourth item rotates through a fraction, 0.25, π, 0.333… and 22/7), a different-bases question (the lesson's planted slip), a tenths bracket in place of a "type 1 or 2" question, and feedback when a student types the power (2⁷) instead of the index. Core: every superscript digit typed or copied (2⁷) is read as a power.

## Done: Linear relations practice (12 Oct 2026)
- `content/maths/linear-relations/practice/`: 10 of 12 lessons (Reading a graph and Describing a relationship need a graph; the page is text only). Line equations are answered as `x = 3` (`form: subject x`), so a vertical/horizontal mix-up is marked wrong.
- Review fixes: "1x", "0x" and "+ 0" text, the meeting point given as in the lesson, positive constants in growing patterns (as taught), a ≥ region question with points on the line, m as a fraction, wider ranges. Core: "100 cm²" accepted, "(0, 4)" asks for just the number, "3n + 2 = s" accepted.

## Done: Algebra practice (12 Oct 2026)
- `content/maths/algebra/practice/`: 14 files, one per lesson, 3 to 5 templates each, kept to what each lesson teaches (no negatives or powers in the Year 7 lessons). Expanding and factorising answers must be expanded or fully factorised; rearranging answers must be `x = …`; inequalities are answered as `x > 3` (or `>=`).
- Independent review: no wrong answers; fixed zero terms ("+ 0"), "1x", "− −5", "whole numbers" for negative ranges (now integers), questions beyond the lesson, and marking slips (typed x², capital letters, either side of a subject answer, unreadable input no longer resets the streak).
- Next: practice for data, with a review.

## Done: Practice page, Number Foundations first (12 Oct 2026)

`maths/number/practice/`: endless questions from 29 template files (2 to 5 templates per lesson), one skill, a unit or the whole course mixed, 3 in a row to mark a skill practised, print 10 with answers. Independent review fixed wording that broke for some numbers, made marking accept units, $, commas and mixed numbers, and added skills the lessons teach (tax across two brackets, rounding up to whole tins, estimating roots to 1 dp, perimeter from area, fraction ÷ whole number, three-way shares, decrease by a multiplier). Next: the other six maths courses, one at a time with a review each.

## Done: recap pages and coach prompts for maths (12 Oct 2026)

`recap: true` and `coach: true` on all seven maths courses: each course has a Recap page (each lesson's exit question to try first, then the answer, explanation, picture and clip), and every card has a "Still stuck? Copy a coach prompt" box, shown only when the teacher shares the recap link with `?coach=1` (all 121 lessons get a prompt from their progression node and `stuck:` list). Five exit questions that relied on the lesson were rewritten to stand alone (money-models' tax brackets; parallel-lines, parallel-angles, angle-reasoning and unknown-angles, which named diagram labels). Test a prompt in the school's AI tool (Copilot) before sharing the `?coach=1` link.

## Done: Year 8 Statistics (12 Oct 2026)

Data and chance gains a unit *Samples* (15 to 20): Census, sample, experiment or observation (8ST01 n1), Bias in collecting data (n2), Ways to choose a sample (8ST02 n1), Describing a sample (n2), How samples vary (8ST03 n1 and n2) and Investigating with samples (8ST04 n1 and n2), on the new `sample` board: a fixed school of 200 where sleep and sport change with year level, so convenience samples (the Year 7 rows) are biased and random, systematic and stratified samples scatter around the truth. New misconceptions census-always, big-sample-no-bias, random-haphazard, sample-is-population, sample-differ-wrong; five cards; a Samples primer. The real investigation is a class task planned in the last Make step. This completes Year 8: every 8th descriptor now has lessons.

## Done: Year 8 Chance (12 Oct 2026)

Data and chance gains five Year 8 lessons in the Chance unit (10 to 14): Complementary events (8P01 n1 and n2), Venn diagrams and two-way tables (8P02 n1), Grids and tree diagrams (n1), And, or and not (n2), and Simulating compound events (8P03 n1 and n2), on the new `events` board (sample spaces as rows, grids or trees, a complement button and simulated trials) and the new `venn` board (Venn diagram and two-way table side by side, with boxes to fill from one to the other). Every outcome is equally likely (multiplying along branches is Year 10). New misconceptions complement-exclusive, venn-double-count, pairs-order, or-double-count, sim-too-few; five cards; a Year 8 section in the chance primer. The simulation teacher notes cover spreadsheets and checking AI-written simulations.

## Done: Year 8 Space (12 Oct 2026)

Angles and shapes gains a unit *Congruence and similarity* (16 Congruent triangles, 8SP01 n1, on the new `congruence` board; 17 Similar shapes, n2 and n3, on the new `similar` board; 18 Proving quadrilateral properties, 8SP02 n1, and 19 Problems with quadrilaterals, n2, on the geometry board with the new `diagonals: on`), 20 Algorithms for congruence (8SP04 n1 and n2, on the key board, with a gap students find and fix) in Algorithms, and 21 Coordinates in 3D (8SP03 n1 and n2, on the new `space3d` board) in Solids. New misconceptions ssa-is-test, similar-add, proof-by-picture, opp-angles-supplementary, coord3d-order; six cards; a congruence primer and Year 8 sections in the solids and algorithms primers. Proofs are written as a plan with reasons (Parsons and the teacher notes), not two-column.

## Done: Year 8 Rates (12 Oct 2026)

Number Foundations gains a unit *Rates* (27 Rates, 8M05 n1; 28 Using rates, n2) and two more Modelling lessons (29 Ratio and rate models, 8M07 n1; 30 Checking a model, n2), on the new `rate` board (a double number line, with a second rate to compare and a fixed starting amount for refined models) and the ratio board. Fixed along the way: `feedback` on `number` checks now shows (it was silently ignored, 34 pairs across maths). New misconceptions rate-inverted, rate-multiply-divide, model-round-down, model-blame-maths; three cards; a rates primer and a Year 8 section in the modelling primer.

## Done: Year 8 Number (12 Oct 2026)

A new extension course, *Irrational numbers and index laws* (`content/maths/real-numbers/`, replacing the pathway placeholder), with three units: Recurring decimals (Recurring decimals, 8N03 n1; Which decimals stop?, n2), Irrational numbers (Irrational numbers, 8N01 n1; Irrational numbers on the line, n2) and Index laws (Index laws, 8N02 n1; Using the index laws, n2). Number Foundations gains Percentage change (25, 8N05 n1) and Money models (26, 8N05 n2: pay, and income tax in brackets with the 2026–27 resident rates, simplified; the teacher notes say to check the ATO). New boards `longdiv`, `zoomline`, `indexlaws` and `money`. New misconceptions recurring-is-irrational, terminate-no-simplify, root-always-irrational, root-as-half, index-multiply-base, index-different-bases, tax-whole-income; reused percent-wrong-base. Cards in `snippets/maths-real.json` and two in Number; three primers and a Year 8 section in the modelling primer.

## Done: Year 8 Measurement (11 Oct 2026)

Area, volume, circles and Pythagoras gains seven Year 8 lessons (12 to 18): Composite shapes (8M01 n1) and Irregular shapes (n2) in Area, on the new `composite` board; Volume and capacity (8M02 n1) and Prism problems (n2) in Volume, on the prism board (now with litres for metres); Area of a circle (8M03 n1) and Circle problems (n2) in Circles, on the new `circlearea` board; and Time zones (8M04 n1 and n2) in a new unit, on the new `timezone` board (offsets for early October, named in the teacher notes). New misconceptions composite-wrong-height, estimate-part-full, cube-conversion, prism-lwh-always, circle-area-circumference, circle-forget-root, tz-wrong-direction; seven cards; a time primer and Year 8 sections in the area, volume and circles primers. Year 8 order agreed with Matthew: Measurement, Number (8N03, N01, N02, N05), Rates (8M05, M07), Space (8SP02, SP01, SP04, SP03), Chance (8P01 to P03), Statistics (8ST01 to ST04).

## Still to do

- **Publish and listen:** the new clips (Number Foundations 30, Area, volume, circles and Pythagoras 18, Irrational numbers and index laws 6, Angles 21, Algebra 5, Linear relations 2, Data and chance 20) record with the real voice on the next manual publish.
- **Teacher feedback:** maths teachers try the site when it suits them (the For maths teachers page and the feedback form); act on what comes back.
- **Watch in class:** whether students write real working in the reasoning box or skip to the marked parts; whether the self-check ticks are honest.
- **Next (agreed order, checked against the curriculum map's builds-on links):** The agreed order is done (Number gaps; Area, volume and circles; Classifying shapes; Pythagoras). Next: Matthew chooses. The Year 7 gaps listed before are filled. Year 8 is mostly untaught beyond algebra, 8N04 and Pythagoras; Year 8 is done in the agreed order (Measurement, Number, Rates, Space, Chance, Statistics). Next: Matthew chooses (Year 9 is the natural next step). The Make step of the algorithms lesson repeats the quadrilateral run; a better Make would be a drawn flowchart (no board for that yet). Pages come from the kit with `tools/kit-page.mjs`. 
- **Form-check coverage:** simplest and decimal are built; ratio and inequalities are not; add them when a lesson needs one.
