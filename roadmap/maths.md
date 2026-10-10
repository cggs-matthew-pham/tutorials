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

## Proposed: form checks on WPM (prototype run 11 Oct 2026; decision pending)

The plan named two ways to check that an answer is in a required form (expanded, factorised, simplified, a formula's subject): Numbas's JME with pattern matching, or math.js plus our own rules. A third came out of the prototype: the same rules on the parse tree WPM already builds. All three were run on 35 answers to 11 Year 8–10 tasks (expand and simplify, factorise including negatives and a quadratic, collect like terms, index laws, change the subject), then 12 harder ones.

| | Numbas JME | math.js + our rules | Our rules on WPM's tree |
|---|---|---|---|
| 35 main answers | 35/35 (after making `=` order matter) | 35/35 (after reading x(…) as a product) | 35/35 |
| 12 harder answers | 9/12: missed 6(x + 3/2), 2x(x + 2), (x + 3)² | 12/12 (after allowing (x + 3)²) | 12/12 |
| Added download | about 430 KB minified (120 KB gzipped) plus an English locale | about 320 KB (90 KB gzipped), parser only | about 3 KB (1 KB gzipped) |
| Feedback | "like terms or powers not collected" (could be split per rule set) | names the slip: brackets left, like terms not collected, powers not combined, numbers not multiplied, common factor left in a bracket | same as math.js |
| Notes | patterns are compact but subtle (commutative `=`); reads vt as one name | reads x(…) as a function call unless fixed | same parser as the equivalence check; reads vt as v × t |

Recommendation: our rules on WPM's tree (about 90 lines), behind the `form` slot the boards plan reserved. Prototypes and cases are in the session scratchpad, not the repo. Next, once agreed: `answer` checks take `form: expanded | factorised | simplified | subject x`, then the line-by-line working check, then Year 8 expanding (AC9M8A01 n1) with an algebra tiles board.

## Still to do

- **Publish and listen:** the five new clips (Number Foundations 3, Angles 2) record with the real voice on the next manual publish.
- **Try with classes:** all five new lessons, and whether students use the sliders or drag.
- **Year 8 integers:** Linear relations multiplies negatives (2(−1), −10 × 12), which is Year 8 Number. Needs that descriptor's page (code to confirm) and a lesson, or `assumes:`.
- **Next nodes:** AC9M7M05 n3 (unknown angles with reasons) needs the AC9M7M04 page (angles with parallel lines) first.
- **Reference cards for Linear relations** (it has none yet).
- **Keyboard access on the graph board:** its dragged points still need a pointer (the Move row could be reused there).
