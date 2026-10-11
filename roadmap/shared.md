# Roadmap: shared and general (site, build, shared tools)

Things more than one subject depends on: the build, publishing, the home and plain pages, and shared tools (`tools/*.mjs`, `tools/lesson-view.mjs`, `playground-shared/`, `playground-board/core.js`). Before changing one of these, check this file and `git log` for work in progress, and note here what you are changing.

## Done (11 Oct 2026): parallel clip recording

The publish workflow now records clips in parallel jobs: `plan` → `record` (matrix, default 4, set in the Run workflow form) → `publish`. `tools/render-shards.mjs` asks `render.mjs --seed --check` what needs recording and shares lessons out by clip count. `render.mjs` is unchanged, so this re-records nothing. Caches (11 Oct): the browser, pip, the Kokoro model (key: `tools/voice.mjs`) and spoken lines (`.voice-cache`: each record job uploads its lines, the publish job merges them with the last set and saves `voice-<run id>`; old lines are never pruned, so clear the cache in the Actions tab if it grows large). Picture seeding downloads 16 at a time (about 1 minute down to a few seconds in the plan job; `pictures()` is not part of any picture's hash, so nothing redraws). Sharing picture drawing between jobs is not worth it for normal runs (about 3.5 minutes) and would add a stage, since explain clips depend on the pictures; revisit if full redraws (after a `SHARED` bump, 558 pictures) become common. Not done yet: narrow the clip hash (`render.mjs` source and whole playground folders re-record every clip on any edit); one browser per job instead of per clip.

## Done (11 Oct 2026): cooling widget `steps`, igneous clip

`widget: cooling` takes `steps: N` (1 to 10 cooling steps per frame, same result). The recorder plays about 7 frames a second, so the igneous explain clip (Slow cooling, about 290 frames) never reached "Solid rock" inside the check's 10 s window and failed in CI; with `steps: 6` it records. Open: in this sandbox the clip is still about 67 s (over the 30 s guide) because every click takes 7 to 15 s on that page; check the real length in the next run's log (the over-30 s warning) and shorten the clip if it is long, for example one cooling run instead of two. Editing `playground-science/main.js` re-records every science clip once (27 lessons).

## Effort: "if coding is hard, why do it" (11 Oct 2026)

Students expect coding to be fun and easy and read struggle as failure. Response: cut friction (bad hard), keep and name the thinking (good hard). AUTHORING › Effort and struggle has the rules.

**Done (shared tools, all subjects):**
- Predict and Make stage notes say a wrong guess is fine and a few tries are normal (`STAGE_INFO*` in `lesson-view.mjs`).
- **Now you can** at the end of every lesson, from `teacher.yml` `goals` ("I can" dropped). Every lesson already has goals, so it shows everywhere.
- `teacher.yml` `struggle:` (where it is hard on purpose, what to say instead of rescuing): For teachers, teacher guide, slide notes on the first Modify or Make.
- Lint `tools/effort.mjs`: one summary line in validate; `npm run effort [path]` lists no `struggle:`, no `goals:`, and first hints that give the answer (solution code of 10+ characters not in the starter, or a number check's answer).

**To do:**
1. **Audit existing lessons**, course by course from `npm run effort` (230 without `struggle:`, 18 first hints flagged, mostly HTML/CSS; some are judgement calls). Add difficulty cues to reliably hard tasks while there. Editing `teacher.yml` changes the lesson folder's clip hash, so batch it per course before a publish.
2. ~~Friendly Python errors~~ **Done 11 Oct**: `tools/python-errors.mjs` in both Python playgrounds, tested by `npm run check-python-errors` and in a headless browser (CLAUDE.md › Playground runtime). Next: watch real student errors in class for slips it misses.

## Done: home page and plain pages (11 Oct 2026)

`content/index.md` `about:` renders on the home page (About, Why we made this, How the lessons work). Any other `content/<name>.md` is a plain page at `/<name>/`: `approach.md` (Why we teach this way; references checked) and `behind-the-scenes.md` (how lessons are made and checked, privacy). Claims stay true to what the tools do; checks not yet built are worded as aims.

## Shared: progression data and node check (decided 11 Oct 2026, not built; for maths and science)

The `introduces`/`assumes` scan suits code, where a dependency is a construct on screen; each subject has a different kind of dependency, so maths and science also get their own in-lesson checks (see their files).

- **Data:** export the kit's nodes and `prior_knowledge` for the covered descriptors into the repo (a small JSON file), and add `node:` (descriptor and node) to every maths and science lesson.
- **Check:** warn when a lesson's node depends on a node that no earlier lesson covers and that the lesson does not list in `assumes:` (taught in class). Without `assumes:` most science lessons would warn, since one tutorial per hinge node leaves most prior nodes to class teaching. It finds gaps between nodes only; ideas used inside a lesson that the kit does not record still need a read-through.

Build it once, in one chat, and note here who is building it before starting; the other subject then tags its own lessons.

**Built by the maths chat (11 Oct 2026).** Data as pasted progression pages (`data/progressions/<subject>/<code>.md`, the waypoints-kit markdown export, since the kit repo is unreachable from here; README there), parsed by `tools/progressions.mjs`. Lesson frontmatter `node:` and `uses:` (`tools/lesson-core.mjs` keeps them); `assumes:` also takes descriptor and node codes. Warnings in `validate.mjs`; `npm run nodes` (map) and `npm run check-nodes` (tests, `tools/check-progressions.mjs`). Only subjects in `CHECKED` (maths) must name a node: science adds `data/progressions/science/` pages, tags its lessons and adds itself to `CHECKED`. Rules: the node before in the descriptor, or the page's Prior Knowledge for node 1, plus `uses:`; earlier-year prerequisites count as taught in class; Related standards are ignored.

Also changed: `prerequisites()` in `tools/concepts.mjs` now treats a course listed with both `path` and `id` as one (an `after:` may name either), so `after: [number-foundations]` reaches `maths/number`. Code courses are unaffected (none has both).

## Changed by the code chat (11 Oct 2026)

- `tools/concepts.mjs`: Python concept `try` (try and except).

- `tools/build-site.mjs`: Playground and Reference entries for `code/deeper`. `snippets/turtle.json`: a Text and collections group. `misconceptions.json`: three Deeper Python misconceptions.

- `tools/build-site.mjs`: Playground and Reference entries for `code/objects` (same pattern as the console bridge). `tools/concepts.mjs`: Python concepts `object`, `attribute`, `class`, `method`. `snippets/turtle.json`: an Objects group. `misconceptions.json`: five Objects misconceptions.

- `BUILDING.md` › 7 and `CLAUDE.md` (runtime limits): the turtle playground now has several turtles and more shapes (`playground/`, code-owned).

- New plain page `content/check.md` (Check your school, `/check/`) with its script `site/check.js`, copied to `dist/check.js` by one line in `tools/build-site.mjs`; Behind the scenes links to it. For the in-browser Python courses only.

- `tools/build-site.mjs`: Playground and Reference pages for `code/console`, and Reference pages for `code/microbit-computer` and `code/microbit-security` (both use `snippets/microbit.json`). New optional fields: a `PLAY` entry can give `id` (its own saved program) and `code` (a starter); a `REFS` entry can give `groups` (only those groups of the file), `title` and `summary`. Other entries are unchanged.

- `tools/concepts.mjs`: added `CONCEPTS.html`; `visibleCode` now also reads `.html`/`.css` regions and fenced `html`/`css` blocks (other languages unchanged: their warnings are the same before and after). `tools/check-concepts.mjs`: HTML tests.
- New `tools/check-makecode.mjs` (`npm run check-makecode`, script added to `package.json`): static checks on MakeCode code tasks. Reads only; changes no shared behaviour.
- `misconceptions.json`: added `global-missing` (home `code/python/turtle-events`), and `text-plus-number`, `input-is-text`, `loop-never-changes` (console bridge).
- `BUILDING.md` › 7 and `CLAUDE.md` › Playground runtime: console mode in the turtle playground (`playground/`, code-owned).

## Done by the code chat (11 Oct 2026): Explain it to me as a help button

`tools/lesson-view.mjs`: the "Explain it to me" panel moves out of the top of every lesson (where its clip could show the Predict answer, as in Lesson 1) into a "?" button in the sticky step-pills bar that opens it as a drawer. Before the lesson's first Predict is locked in, the button says to make the prediction first. Affects every subject's lesson pages; no clip re-records (page HTML is not in clip hashes). Built: `.xbtn` first in `nav.steps`, `#xdrawer` (Esc or Close shuts it, video pauses), `EXPLAIN_JS` reads `wp-predict` for the first `.check[data-type=predict]` and unlocks live on the `wp-predict` event; lessons with no Predict open at once. Before the prediction, the button shows a small popover (`.xpop`, fixed under the button; hides after 4 s, on a click elsewhere, Esc or a real scroll) instead of opening the drawer. `check-html` now counts `#xdrawer video`. Tested at desktop and phone widths.

## Changed by the maths chat (11 Oct 2026)

- Form checks (Matthew approved Numbas, 11 Oct): `vendor/numbas/` (Numbas JME v11.0, Apache-2.0, English only, minified; rebuilt by `tools/numbas/build-jme.sh`), `tools/maths-forms.mjs` (checker, page script, Node loader). `tools/lesson-core.mjs`: `answer` checks take `form:` (and skip WPM checks on their answer and feedback). `tools/lesson-view.mjs`: such checks carry `data-form` and are marked by `WPF` on the page; lessons with one load `_numbas/numbas-jme.min.js` (deferred) and the checker script; other pages are unchanged. `tools/build-site.mjs` passes the script in `maths.forms`; `tools/build-playground.mjs` gains `buildNumbas` (copies to `dist/_numbas/`). `tools/validate.mjs` marks every form check's answer and feedback in Node. New `npm run check-forms` (`tools/check-forms.mjs`, `data/forms-cases.json`). Plain answer checks and board conditions still use WPM. New check type `working` (lesson-core, lesson-view, teach.mjs, validate): one step per line, marked by the same Numbas checker; CLAUDE.md check-types line updated.

- Maths cards can come from several files: `snippets/maths.json` plus `snippets/maths-<name>.json`, each naming its `course:` (`loadAllMathsCards()` in `tools/maths-cards.mjs`; `build-site.mjs`, `validate.mjs` and the maths section of `render-pictures.mjs` read them all). Existing cards, ids and picture hashes are unchanged.
- Shared board (`playground-board/`): new maths widget `widgets/parallel.js` with its script tag in `index.html` and `.pangles` styles in `style.css`; the graph widget gains the keyboard Move row (maths-only widget). No change to `core.js` or other widgets.

## Speculative: teach a novice ("Nib") (11 Oct 2026, discussion only)

An intention, not a rule; pilot it before anything becomes a design rule. Applies to every subject. The novice is **Nib** (see Nib and Nib's notebook, below): one non-human character across subjects, so the mistake never carries a real student's name. (Error-analysis tasks that use "Sam" can stay as they are.)

- **Intent:** after the worked example, the student explains the lesson's one new move to Nib, who holds one named misconception. Nib then tries a new case, run or checked on the board where possible, so a weak explanation fails visibly and a good one works.
- **Why:** learning by teaching (the protégé effect) and self-explanation, without an LLM: offline, no accounts, predictable, reusing the misconception data and `when:` checks. Easier to script than a Socratic tutor, which without an LLM reduces to the hint and feedback lessons already have.
- **Leanings:** write a one-line explanation before choosing from options (choosing alone tests recognition, not production); use it sparingly, at hinge nodes where the misconception has a visible consequence; only after the worked example; end with an own-words explanation compared with a model one. Not for recall or evaluate steps.
- **Teacher in the loop, light to heavy:** an on-screen "check this with your teacher" after two failed attempts; the own-words explanation as an exit ticket (nothing stored); later, perhaps an ephemeral live "stuck on step X" view in Kit or Prepare. The last one bends the no-tracking stance and needs a decision.
- **Later, maybe:** a teacher-led LLM version in Waypoints Kit (the AI as a novice scoped to one move), given age terms and answer leakage.
- **Open:** pilot lesson (the winch, or a maths hinge node); how authored options and branches are written in the lesson format.
- **First use (maths, 11 Oct):** the `reasoning` check follows "write, then choose, then compare": free working (not marked), a reason chosen at the key step (marked, with misconception feedback), then a model and a self-check. In *Reasoning with angles* and *Unknown angles in shapes*; no Nib yet.

## Proposed: Nib and Nib's notebook (11 Oct 2026, discussed, not decided)

Replaces the Python-only "turtle companion" proposal (was in `roadmap/code.md`) with one character for every subject.

- **Nib:** a small, clearly non-human learner (a nib is a pen tip: it writes down what it is taught). Sits in the corner of course and lesson pages with a light CSS idle animation (blink, bob; still with reduced motion; can be hidden).
- **Nib's notebook:** clicking Nib opens what the student has taught it so far: the course's unlocked Reference cards (Python, web), maths cards, and later MakeCode blocks and science ideas, each with the lesson it came from. Gives maths and science an unlock moment they lack today.
- **Light gamification:** the notebook is a useful reference, not a score. One small moment when a page is added; no points, streaks or new badges beyond "Challenge complete". Per browser, built from existing progress data (`wp-progress`, `unlocks:`); no tracking.
- **Link:** the teach-a-novice step (above) is where Nib's pages come from, when a lesson has one.
- **Cost:** shared change (`tools/lesson-view.mjs`, `site/progress.js`, course pages); maths and science need a rule for which cards count as notebook pages. Snippet unlocks today: Python and HTML courses only; MakeCode, maths and science have none.
- New check type `reasoning` (Matthew approved 11 Oct; a first use of the teach-a-novice leaning "write before choosing"): `tools/lesson-core.mjs` (validation), `tools/lesson-view.mjs` (render, handler, `.rs-*` in MATHS_CSS, `wp-reasoning` storage), `tools/teach.mjs` (guides show the model steps). The free working is never marked; the answer and picked reasons are. AUTHORING and CLAUDE.md updated.
- `tools/maths-forms.mjs`: `subject x` accepts the subject in either case (Numbas already compares letters case-insensitively); case added to `data/forms-cases.json`.
- Board: geometry gains `angles: given …` and `exterior: C`; parallel takes several given angles (maths-only widgets).

## Proposed: other clips beyond Explain it to me (11 Oct 2026, discussed, not built)

Applies to every subject. The limits are the existing design rules: Predict comes before the new move, and new knowledge appears only in the worked example (or Investigate). So no clip may teach before Predict, and no "today we will learn" intro.

- **Hooks (phenomenon clips).** 10 to 20 s, little or no narration. A hook shows a situation without explaining it (the winch stalls, the sorter fails on a messy bench, a line tilts as m changes) and ends on the Predict question.
  - **Unit hook (the default):** one clip that sets the driving problem the unit returns to. Optional `hook:` clip in the course `index.md` `units:` entry, shown on the course page and the unit's first lesson.
  - **Lesson hook (sparingly):** only where the Predict depends on seeing something move or fail. Optional, on the Predict step. Many Predicts already hook; don't add filler.
  - Recorded from a board or playground setup with the existing clip pipeline, so cost is low. Avoid real footage (licences, school filters).
- **How-to clips: their own section, like Reference.** Short screen recordings of tool setup that is a recipe, not the lesson's knowledge: export a Teachable Machine model, connect a micro:bit over Web Serial, paste a link into the board, open MakeCode full screen.
  - One place per subject or pathway (beside Reference). A step links to the clip at the point of need ("How to: …").
  - Reused across courses (record "Connect a micro:bit" once).
  - Dated, with the tool version, so stale ones are easy to find when a tool's interface changes.
  - Prepare lists the how-tos a lesson needs, so teachers can rehearse the setup.
- **Recap: no new clip type.** Practise already does recap as retrieval. Instead, a review question (one revisiting an earlier lesson's idea) can point back to where the idea was taught:
  - A `revisit: <lesson slug>` field on the check. After a wrong answer (or two), the page shows "Revisit: <lesson title>", which opens that lesson with its Explain drawer already open (`?explain=1` on lesson pages).
  - Validate checks that the slug exists and comes earlier (same rule as `assumes`).
  - Not plain links in feedback: feedback is rendered as plain text (`textContent`, `plain()` in `lesson-view.mjs`).
  - Build it with the first Practise step that has review questions; document in AUTHORING.md only once built.
- **Open:** format for `hook:` (clip spec as for `explainClip`, or a board setup); where the How-to section lives (per pathway or per subject); whether how-tos are recorded by `render.mjs` or by hand (real tools such as Teachable Machine can't be driven from the sandbox).
- Answer forms `simplest` (fraction in lowest terms) and `decimal` in `tools/maths-forms.mjs` (no Numbas needed for them) and the form lists in `tools/lesson-core.mjs`; answer checks (`tools/lesson-view.mjs`) ignore a trailing % or °. New maths board widget `widgets/bars.js` (script tag in `playground-board/index.html`).
- Board (maths widgets): graph gains `plot: x = a` and `shade:` regions; numberline gains `ray:` (inequalities).
- New maths board widgets `widgets/data.js` (dot plots, stem-and-leaf, statistics) and `widgets/chance.js` (coin, dice, spinner, bag; trials and relative frequency), with script tags in `playground-board/index.html` and styles in `style.css`. New tool `tools/kit-page.mjs` writes progression pages from a waypoints-kit checkout (for the node check), noted in `data/progressions/README.md`; the map's importer (`tools/import-curriculum.mjs`) is unchanged.
- New maths board widgets (maths chat, 11 Oct): `widgets/square.js` (squares and roots), `factortree.js` (factor trees, HCF and LCM), `fracadd.js` (adding and subtracting fractions), `fracarea.js` (multiplying fractions) and `percent.js` (percentages of amounts), with script tags in `playground-board/index.html` and two `.ftpick` rules in `style.css`. No change to `core.js` or other widgets.
- New maths board widgets (maths chat, 11 Oct): `widgets/area.js` (parallelograms and triangles on a grid, cut and move), `prism.js` (prisms in layers, SVG) and `circle.js` (parts of a circle, roll it out for π), with script tags in `playground-board/index.html`. `square.js`, `fracarea.js` and `fracadd.js` gained `resize` (redraw on window resize). No change to `core.js`.
- Maths boards, Number (maths chat, 11 Oct): new `widgets/placevalue.js`, `widgets/rounding.js` (`mode: round | estimate`) and `widgets/ratio.js` (`mode: tape | share`), script tags in `playground-board/index.html`, `.pv*` styles in `style.css`. No existing widget changed. Board `when:` variables must be single letters (the expression evaluator multiplies adjacent letters). Every board widget needs an `#board svg` for `render-pictures` to wait on (placevalue draws counters in SVG for that reason).
- Maths boards, Space (maths chat, 11 Oct): new `widgets/transform.js` (`mode: translate | reflect | rotate`), `widgets/net.js` (`mode: cube | prism`) and `widgets/views.js`, script tags in `playground-board/index.html`, `.vgrid` / `.vcell` rules at the end of `style.css`. The SVG widgets (net, views, and now ratio and rounding) are absolutely positioned inside `#board` (`height: 100%`) so they fit the flex board. No change to `core.js` or other widgets; the classification algorithm lesson reuses the `key` widget.
- Maths boards (maths chat, 11 Oct): `widgets/geometry.js` gains `classify: on` (ticks, parallel arrows, right-angle marks and shape names; existing lessons unchanged, as it is off by default); new `widgets/pythag.js` (squares on the sides, an angle slider), script tag in `playground-board/index.html`.

## Done (11 Oct 2026): trail map on Code pathway pages

Pathway pages open on a trail map for students, with a "List for teachers" toggle. Code only (`trail: true` in `content/code/index.md`); maths and science pathway pages are unchanged. Mockup and discussion: the "Trail map mockup" canvas.

- **Shared files changed:** `tools/build-site.mjs` (pathway page: map, toggle, `tagline` on cards, warns when a course has no tagline; only when the subject has `trail: true`), `tools/lesson-view.mjs` (one rule: `.pcard .ptag`). New: `tools/trail.mjs` (layout and CSS), `site/trail.js` (copied to `dist/trail.js`).
- **Layout** from `after:`: a column per step along the trail, rows lining a course up with what it follows. An extension with no `after:` follows the foundations. A prerequisite in another pathway (Flask needs HTML & CSS) is a portal node linking to that pathway.
- **Progress** from `wp-progress` through `progress.js`: done, in progress (n/m), not started, coming later. "You are here" is the course of the last lesson opened, else one in progress; otherwise "Next stop" or "Start here". Hover or focus previews a course in the card; Continue opens the next unfinished lesson. On phones the map is a list with "After …" lines and the taglines.
- **Content:** every Code course has a student `tagline:` (drafts; Matthew to adjust wording).
- **Tested** headless at 1280 and 390 px, light and dark, no progress and seeded progress, keyboard focus, list remembered, list shown without JavaScript.

**Next:** Things you've made (proposed, not built): a gallery of each student's Make outputs, grouped by course on the pathway page (latest few plus "All n"), the full set on the course page, one starred favourite. Needs a snapshot per playground (turtle canvas, HTML preview, MakeCode simulator) saved per browser.

**Maths and science: to plan before turning the map on** (`trail: true`):
- Is a pathway a trail there? Maths courses follow the curriculum's year order and the progression data's `prior_knowledge`; the map could use those links instead of hand-written `after:`, which would make it much denser.
- What is a waypoint: a course, a unit, or a progression node? Science "courses" are year-level sets of concept tutorials (a side tool, not a whole course), so a map may not fit at all.
- Cross-subject links (the winch needs maths ratio and science forces) could be portal nodes, as Code does across pathways.
- Taglines for every maths and science course.
- Home page (`content/index.md`): a "Maths teachers: start here" link after the maths paragraph, to the new plain page `/maths-teachers/`.

## Done (11 Oct 2026): curriculum map for maths (preview for maths teachers)

`/maths/map/` (and "Curriculum map" in the Maths menu, and a card on the Maths page): all 101 Years 7–10 descriptors in a grid of strands by years, plus the 22 earlier-year descriptors they build on. Each tile shows its waypoints (done, has a lesson, no lesson yet, from lessons' `node:`). Hover or focus previews a descriptor in the card (descriptor text, waypoints with their lessons and courses, hinge marks, builds on and leads to); click chooses it and puts `#AC9M8A02` in the address to share. Lines show builds on (solid blue) and leads to (dashed teal) for the one in focus only. "With lessons" dims the rest. Phones: one list per strand, card first, no lines.

- **Data:** `data/curriculum/maths.json`, made by `node tools/import-curriculum.mjs <waypoints-kit checkout> maths` from waypoints-kit (now at cggs-matthew-pham/waypoints-kit, public) and committed, so the build never needs the kit. Titles: the progression page's where one exists, else the kit's in sentence case. `data/progressions/` (the node check) is unchanged.
- **Shared files changed:** `tools/build-site.mjs` (map page when the subject's index.md has `map: true` and the data exists; menu item; Maths page card), `tools/lesson-view.mjs` (one rule: `.pcard.pmap`). New: `tools/curriculum-map.mjs`, `site/curriculum-map.js`, `tools/import-curriculum.mjs`.
- **Questions for the maths teachers:** is the grid the right overview, or would a list by strand be quicker? Is a "usually taught" layer (term or school program) worth adding beside the builds-on lines? Which descriptors most need lessons next? Should students see this, or the course trails?
- **Science: built, switched off (11 Oct).** `data/curriculum/science.json` (51 Years 7–10 descriptors and 22 earlier ones). Rows: Biological, Chemical, Earth and space, Physical, Human endeavour, Inquiry. Human endeavour and Inquiry are written for two years at a time (7H, 7I = Years 7–8; 9H, 9I = Years 9–10), so their cells span two columns. The kit labels Year 7 Understanding descriptors only "Understanding" with no prior knowledge (except 7U06); the importer takes their sub-strand from the code, but their links back to Years 5–6 need fixing in the kit.
- **Handoff to the science chat:** tag each science lesson with the node it teaches (`node: AC9S7U04 n2`, as maths lessons do; the topic list in CLAUDE.md › Science gives most of them), then add `map: true` to `content/science/index.md`. Until the tags are in, every science tile shows "no lesson yet", which is why it is off. Adding `science` to `CHECKED` in `tools/progressions.mjs` is a separate choice (it makes validate require a node on every science lesson).

## Done (11 Oct 2026): trailheads on the Code page

With `trail: true`, `/code/` opens on trailheads: a Continue card (the course of the last lesson opened, else one in progress, linking to its next unfinished lesson), then one card per pathway with its summary, a small picture of its trail (dots and lines from the same layout as the pathway map, marked done, in progress and "you are here"), a "Start here…" line (new `fit:` on each pathway in `code/index.md`), "n of m courses done", and a link to its trail. "List for teachers" holds the old page and shares the `wp-pathview` choice with the pathway pages. Shared files: `tools/build-site.mjs` (subject page), `tools/trail.mjs` (`trailThumb`, `trailheadsHtml`, `TRAILHEADS_CSS`); new `site/trailheads.js`. Maths and science pages are unchanged until they set `trail: true` (their pathways would need `fit:` and course taglines).

## Done (11 Oct 2026): science trails

`/science/` now opens on trailheads and each science pathway page on a trail map, like Code (`trail: true`, `fit:` per pathway, a `tagline:` per course in `content/science/index.md`). Each pathway runs Year 7 → 8 → 9 → 10 through `after:`; Year 9 Physics also follows Year 7 Chemistry (heat transfer uses the particle model), shown as a portal. The curriculum map stays for teachers and curious students: on a subject with trails its card now sits below the trailheads instead of above them (`tools/build-site.mjs`, one line; Maths unchanged). Tested headless at 1280 and 390 px, no page errors, no sideways scroll. Maths followed the same day: `trail: true`, `fit:` and taglines in `content/maths/index.md` (its existing `after:` lines drive the layout; Number Foundations is a portal on the other three trails). `tools/trail.mjs` now accepts a course's `id:` in `after:` as well as its path (maths uses ids).

## Done (11 Oct 2026): science trail stops are standards

`trail: units` in a subject's index.md (science) makes each unit of a course a stop, named by the unit (one standard each in science: Particle theory, Pure substances and mixtures, ...), with the course's year in the stop's small line ("Year 8 · 5 lessons"). Units chain within a course; a course's first unit follows the last unit of what it comes after. `after:` may name one unit of another pathway's course (`science/chemistry#particles`), shown as a portal with the unit's name and in the teacher list as "Year 7 Chemistry (Particle theory)". Progress, "You are here" and Continue count the unit's lessons only (`unit` added to `progress-manifest.json` lessons and passed through `progress.js`); stops link to `#unit-<id>` on the course page (unit sections now have that id). Narrower columns for unit trails so eight stops fit at 1080 px; on phones the indent stops growing after two steps. Maths uses it too (same day); Code keeps one stop per course (`trail: true`). A stop's small line shows the course's year only when the course title starts with one (science); maths shows just the lesson count. Shared files: `tools/trail.mjs`, `tools/build-site.mjs`, `site/trail.js`, `site/trailheads.js`, `site/progress.js`.

## Proposed (11 Oct 2026, branch trail-expand): open one course at a time on the trail

Pathway pages of subjects with `trail: units` (Code too, on this branch) show one stop per course, laid out as the course trail; a course with two or more units opens into an area headed by its name, its units as stops snaking inside (up to three to a row, ending on the right so the trail leaves it cleanly). The current course opens on its own (else the first); clicking another course opens it and closes the one that was open; a unit stop goes to that unit on the course page. Trailhead pictures on subject pages are back to one dot per course. Shared files: `tools/trail.mjs` (`layoutTrailExpand`, area HTML and CSS), `site/trail.js` (rewritten: unit progress, open/close, lines in any direction), `tools/build-site.mjs`.

## Parked

- Custom domain setup (DNS and the Pages setting are on Matthew's side).
- Progress export and import (a short copy-and-paste code to move progress between browsers) and a printable certificate of current progress. A fun long-term idea; keep it account-free.

## Changed by the science chat (11 Oct 2026)

- New shared-board widget `playground-board/widgets/energy.js` (Matthew approved): `mode: coaster | chain | sankey` for Year 8 and 9 energy. One `<script>` line in `playground-board/index.html` and a few `.en*` rules at the end of `style.css`; nothing existing changed (AUTHORING › 12). As with any board change, board clips and pictures re-record and redraw on the next publish.
- Proposed (not built): validate does not parse `teacher.yml`, so a colon in an unquoted summary only fails at build time (it has happened twice). A YAML parse of each `teacher.yml` in validate would catch it.

- Science map switched on (handoff above done): all 65 science lessons have `node:` (from their teacher notes; every one matched the kit's node labels), `map: true` in `content/science/index.md`, and `science` is in `CHECKED` (`tools/progressions.mjs`). 21 progression pages written with `tools/kit-page.mjs` from the kit. 18 lessons list `assumes:` for earlier nodes taught in class (each comment names the node); seasons and word equations list a node they deliberately come before. `tools/curriculum-map.mjs` and `site/curriculum-map.js` (Matthew approved): `WOVEN` strands (science's Human endeavour and Inquiry) show no waypoint dots, "woven through lessons and class work" in the row and card instead of "no lesson yet". Maths is unchanged.

- `playground-board/widgets/atom.js` (Matthew approved): `mode: halflife`, a `colour:` option for the table, and a stable or radioactive line in build mode (values `u`, `i`); a fix to "1 electrons". `playground-board/style.css` gains `.atkey`, `.atsw`, `.atstab`. Only atom lessons change; every board clip and picture redraws on the next publish, as with any board change.

- `playground-board/widgets/atom.js` gains `mode: decay` and `mode: shield` (alpha, beta, gamma; for 9U06 n3). Science-owned widget, no other file changed. As with any board change, every board clip re-records and every board picture redraws on the next publish.

- Board: two new widgets, `playground-board/widgets/atom.js` and `equation.js`, each a `<script>` line in `playground-board/index.html` and a small block at the end of `playground-board/style.css` (`.atgrid`/`.atcell` for the element table, `.eqtally` for the tally). Nothing existing changed. AUTHORING › 12 and CLAUDE.md › Science list them. `data/progressions/science/` holds four pasted pages (science is not in `CHECKED`, so validate is unchanged).

- Pictures on the science board (Matthew approved): `pictureBoard(lesson)` in `lesson-core.mjs` ('science' when a step uses `playground: science`, else 'board'); `usesBoardPictures` is now maths or science. `render-pictures.mjs` has a new `science` section (`drawScience`: the science board's `#board` after 1.8 s, cropped like the board's; `dist/_pictures/science/`); the board section's filter takes `pictureBoard(l) === 'board'`, so its hash and the maths pictures are unchanged. `build-site.mjs` reads the right folder.

- Board pictures for science (Matthew approved): `usesBoardPictures(lesson)` in `tools/lesson-core.mjs` (maths, or science with no step on the science board). Validate, `render-pictures.mjs` (the `board` job) and `build-site.mjs` (the picture lookup) use it instead of `language === 'maths'`. Maths pictures and their hashes are unchanged; science-board lessons (`playground: science`) still cannot have pictures (that needs a draw function for `_playground-science/`).

- `playground-board/widgets/universe.js`: the redshift spectrum is drawn 5 times bigger, not 20 (at 20, far galaxies showed no lines). AUTHORING › 12 `universe` line updated to match. Only the Redshift lesson uses it.

## Changed by the code chat (11 Oct 2026): the Python playground (Matthew approved)

- **Pyodide on our own site.** `vendor/pyodide/` (Pyodide 314.0.7: core, pandas, FastAPI, Jinja2 and their dependencies, plus the Flask wheels from PyPI; 30 files, 24 MB) is committed, made by `tools/pyodide-vendor.mjs` (run by hand to change the version or packages). `buildPyPlayground` in `tools/build-playground.mjs` copies it to `dist/_pyodide/` (not stamped; its files are named by version) and builds `playground-py/` into `dist/_playground-py/`. No workflow change.
- `stampPlayground` also hashes `.py` files (only `playground-py/` has any; other playgrounds' stamps are unchanged).
- `tools/lesson-core.mjs`: `PLAYGROUND_KINDS` gains `python`; `unlockKind` maps `python` to `turtle`, and code checks on a `python` step use the turtle rules, so Python snippets, unlocks and code rules are shared. `tools/lesson-view.mjs` `PLAYGROUNDS` gains `python` (`_playground-py`). `tools/build-site.mjs` builds it, adds it to `VERSIONS`, and writes the turtle `unlocks.json` into it too.
- `tools/serve.mjs` serves `.wasm`, `.zip`, `.whl` and `.py` with proper types (Pyodide needs `application/wasm`). `render.mjs` is untouched, so no clip re-records.
- For Save the game (11 Oct): `snippets/turtle.json` gains a Files group (this re-records clips on the turtle playground, as any turtle snippet change does); `tools/concepts.mjs` gains Python concepts `file` and `json`; `misconceptions.json` gains `open-w-reads`; `tools/build-site.mjs`: the Deeper Python Reference shows the Files group and its Playground opens `_playground-py`.
- For Data detective (11 Oct): `try.files` on Python playground steps (data files from the lesson folder: validated in `tools/lesson-core.mjs`, copied to `<lesson>/files/` by `tools/build-site.mjs`, passed as `?files=&from=` by `tryEmbed` in `tools/lesson-view.mjs`; documented in AUTHORING). The playground adds missing lesson files, restores them on request and can add a file from the computer. **Fix in `evalRules`** (`tools/lesson-core.mjs`): Python comments are now stripped only outside quotes, so `"#" * 5` and `"#ff0000"` no longer cut a line short for `contains` rules (no existing lesson's result changed: validate passes). `snippets/turtle.json` gains a Data group (turtle-playground clips re-record again). `tools/concepts.mjs`: `csv`, `assert`, `pandas`. `misconceptions.json`: three entries. `tools/build-site.mjs`: Playground and Reference for `code/data`. `content/code/index.md`: Data detective is built; the machine learning card comes after `code/data`.
- For Web apps with Flask (11 Oct): `snippets/turtle.json` gains a Web apps group (turtle-playground clips re-record again); `tools/concepts.mjs` gains `decorator`; `misconceptions.json` six entries; `tools/build-site.mjs` Playground and Reference for `code/flask`; `content/code/index.md` lists `code/flask` on the Python and Web pathways (replacing the two planned cards).
- For Apps with Gradio (11 Oct): the playground's Gradio stand-in gains `gr.Radio`; tracebacks hide all of the playground's helper files; clips can pass a data file's text as `?file:<name>=` (the fix for the Data detective clips that failed in CI; AUTHORING updated). `snippets/turtle.json`: a quiz-question snippet in the Data group. `misconceptions.json`: three entries. `tools/build-site.mjs`: Playground and Reference for `code/gradio`.
- For Data detective's API lesson (11 Oct): the Python playground gains a `requests` stand-in (`playground-py/requests.py`, `wpFetch` in `worker.js`), and the package scan skips our stand-ins' imports (`requests`, `gradio`, `uvicorn`).
- For Machine learning (11 Oct): `vendor/pyodide/` adds scikit-learn (and scipy, joblib, threadpoolctl; `PACKAGES` in `tools/pyodide-vendor.mjs`), 43 MB in all; Check your school loads it too. `snippets/turtle.json`: a Machine learning group. `misconceptions.json`: three entries. `tools/build-site.mjs`: Playground and Reference for `code/ml`. `content/code/index.md`: the course is built.

## Changed by the code chat (11 Oct 2026): microStudio game player (Matthew approved link-out games)
- New playground kind `microstudio` (`PLAYGROUND_KINDS`, `unlockKind` maps it to `turtle` like `python`; `PLAYGROUNDS.microstudio` in `lesson-view.mjs`, titled "Play it", no saving). It is play only: `try: { playground: microstudio, starter: file#region }` shows the game running; no code checks.
- `playground-microstudio/index.html` plus `vendor/microstudio/` (microStudio's `microengine.js` and `runner.js`, Brython 3.11.3 and its stdlib, BitCell font; MIT and BSD-3 licences beside them). Built by `buildMicrostudioPlayground` in `build-playground.mjs` into `dist/_playground-microstudio/` (stamped; in `VERSIONS`). The page starts the engine itself when the game has no pictures (the engine otherwise waits for its first sprite to load) and replaces `Player.reportError` and `log` to show errors and prints over the game.

## Changed by the code chat (11 Oct 2026): p5.js playground
- New playground kind `p5` (`PLAYGROUND_KINDS`; `unlockKind` returns `p5` when a lesson's `language` is `javascript`; `PLAYGROUNDS.p5` in `lesson-view.mjs`). `playground-p5/` plus `vendor/p5/` (p5 2.3.4, LGPL-2.1, unmodified, licence and README beside it), built by `buildP5Playground` in `build-playground.mjs` into `dist/_playground-p5/` (stamped, in `VERSIONS`). The sketch runs in a sandboxed iframe (`allow-scripts`); the page reports `{wp:'run', kind:'p5', ...}` like the other playgrounds.
- `tools/lesson-core.mjs`: `P5_RULES` (`contains`, `defs`, `params`, `calls`, `loops`, `returns`, `uses`) and a `p5` branch in `evalRules` that reads JavaScript (comments and strings skipped; p5's own hook functions are not "functions of your own"). No existing lesson's result changed.
- `tools/concepts.mjs`: `CONCEPTS.javascript` (23 concepts); the fenced-code scan also reads `js` blocks. Note the scan ignores text before a lesson's first `##`. `misconceptions.json`: seven entries. `tools/build-playground.mjs`/`build-site.mjs` only add the new builder. `render.mjs` untouched: no clip re-records.
- `playground-p5/p5-errors.js` is pure (like `python-errors.mjs`) but has no test script yet.
- p5 round-off (11 Oct): `loadSnippetFiles` in `tools/lesson.mjs` also reads `snippets/p5.json`; `tools/build-site.mjs` adds `PLAY['code/p5']`, a `REFS` entry, and an empty `PICS.javascript` (so p5 cards never borrow turtle pictures by id); the playground page hides the unlock button for p5. `playground-p5/p5-errors.js` fixes (wrong-case hint, Unexpected identifier order); `npm run check-p5-errors`.
- Proposed and approved (Matthew, 11 Oct): two new shared-board widgets for 9U04 n2 to n5, `playground-board/widgets/wave.js` (`mode: sound | refract | spectrum`) and `charge.js` (`mode: static | pair | current`), each a `<script>` line in `playground-board/index.html` and a block at the end of `style.css`. Sound and charge draw on a canvas inside `#board`, so `B.jsx` in `core.js` gets one line that removes a leftover `canvas.wpcv` before it starts a JSXGraph board (nothing else in core changes). Board clips and pictures re-record and redraw on the next publish, as with any board change.

- `tools/render-pictures.mjs` (board section): `drawBoard` now also waits for `#board canvas.wpcv`, so the canvas boards (`wave` sound, `charge`) can have pictures. Boards drawn with JSXGraph are unchanged.
- p5 pictures and clips (11 Oct): `tools/render-pictures.mjs` gains sections `p5` and `p5shown` (own folders `_pictures/p5`, `_pictures/p5shown`; no existing section's hash changed, `SHARED` not bumped), a `WP_ONLY=<name prefix>` filter for testing one kind, and the `expected` section skips `language: javascript` lessons. `tools/lesson-core.mjs`: `picture:`/`explainPicture` and `expected:` are accepted in p5 lessons (`expected` needs `playground: p5`). `tools/build-site.mjs`: p5 lessons read their pictures from `p5shown`; `PICS.javascript` reads `_pictures/p5`. `playground-p5/main.js`: `?zoom=`. p5 clips use the lesson's `app:` (port 8130), so `render.mjs`/`stage.html` are untouched.
