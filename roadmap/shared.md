# Roadmap: shared and general (site, build, shared tools)

Things more than one subject depends on: the build, publishing, the home and plain pages, and shared tools (`tools/*.mjs`, `tools/lesson-view.mjs`, `playground-shared/`, `playground-board/core.js`). Before changing one of these, check this file and `git log` for work in progress, and note here what you are changing.

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

## Parked

- Custom domain setup (DNS and the Pages setting are on Matthew's side).
- Progress export and import (a short copy-and-paste code to move progress between browsers) and a printable certificate of current progress. A fun long-term idea; keep it account-free.

## Changed by the science chat (11 Oct 2026)

- Pictures on the science board (Matthew approved): `pictureBoard(lesson)` in `lesson-core.mjs` ('science' when a step uses `playground: science`, else 'board'); `usesBoardPictures` is now maths or science. `render-pictures.mjs` has a new `science` section (`drawScience`: the science board's `#board` after 1.8 s, cropped like the board's; `dist/_pictures/science/`); the board section's filter takes `pictureBoard(l) === 'board'`, so its hash and the maths pictures are unchanged. `build-site.mjs` reads the right folder.

- Board pictures for science (Matthew approved): `usesBoardPictures(lesson)` in `tools/lesson-core.mjs` (maths, or science with no step on the science board). Validate, `render-pictures.mjs` (the `board` job) and `build-site.mjs` (the picture lookup) use it instead of `language === 'maths'`. Maths pictures and their hashes are unchanged; science-board lessons (`playground: science`) still cannot have pictures (that needs a draw function for `_playground-science/`).

- `playground-board/widgets/universe.js`: the redshift spectrum is drawn 5 times bigger, not 20 (at 20, far galaxies showed no lines). AUTHORING › 12 `universe` line updated to match. Only the Redshift lesson uses it.

## Changed by the code chat (11 Oct 2026): the Python playground (Matthew approved)

- **Pyodide on our own site.** `vendor/pyodide/` (Pyodide 314.0.7: core, pandas, FastAPI, Jinja2 and their dependencies, plus the Flask wheels from PyPI; 30 files, 24 MB) is committed, made by `tools/pyodide-vendor.mjs` (run by hand to change the version or packages). `buildPyPlayground` in `tools/build-playground.mjs` copies it to `dist/_pyodide/` (not stamped; its files are named by version) and builds `playground-py/` into `dist/_playground-py/`. No workflow change.
- `stampPlayground` also hashes `.py` files (only `playground-py/` has any; other playgrounds' stamps are unchanged).
- `tools/lesson-core.mjs`: `PLAYGROUND_KINDS` gains `python`; `unlockKind` maps `python` to `turtle`, and code checks on a `python` step use the turtle rules, so Python snippets, unlocks and code rules are shared. `tools/lesson-view.mjs` `PLAYGROUNDS` gains `python` (`_playground-py`). `tools/build-site.mjs` builds it, adds it to `VERSIONS`, and writes the turtle `unlocks.json` into it too.
- `tools/serve.mjs` serves `.wasm`, `.zip`, `.whl` and `.py` with proper types (Pyodide needs `application/wasm`). `render.mjs` is untouched, so no clip re-records.
- For Save the game (11 Oct): `snippets/turtle.json` gains a Files group (this re-records clips on the turtle playground, as any turtle snippet change does); `tools/concepts.mjs` gains Python concepts `file` and `json`; `misconceptions.json` gains `open-w-reads`; `tools/build-site.mjs`: the Deeper Python Reference shows the Files group and its Playground opens `_playground-py`.
