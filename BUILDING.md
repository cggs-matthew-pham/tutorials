# Building a course

How a course is designed and built here, learned from Python Foundations with Turtle. `AUTHORING.md` is the file format reference; this is the method. Use it for every new course (web and MakeCode next).

**Starting a new course in a fresh chat:** read `CLAUDE.md`, then this file, then `AUTHORING.md` sections 9 (teacher notes) and Error tasks. Look at one finished lesson end to end before writing: `content/code/python/turtle-functions/` (`lesson.md`, `functions.py` with its `sol-*` regions, `teacher.yml`) and what it generates (`dist/teach/code/python/turtle-functions/`: guide page, `deck.md`, `worksheet.md`). Section 8 lists the web pathway's groundwork (built) and what each HTML lesson needs.

## 1. Shape: pathway › course › unit › lesson › step › task

- **Pathway** (Python, Web, MakeCode): listed in `content/code/index.md`, courses in order, each `stage: foundations | extensions`, plus a one-line `summary` and an optional `about` (Markdown for its pathway page). A course can list `after:` (course paths, or `id`s of planned courses) to show what comes first. Planned courses go in early as "Coming later", so the whole path is visible. Each pathway gets a page at `/code/paths/<id>/` and an item in the navbar's Code menu; a new course is listed under its pathway, never in the navbar itself. Keep course folders where they are once students use them: progress is keyed by the lesson's path.
- **Course**: a folder with `index.md` (title, summary, `order`, `units`, optional `challenge`).
- **Unit**: 2 to 4 lessons that share one idea. Never call it a module (Python meaning).
- **Lesson**: one concept, PRIMM steps. **Step**: one stage. **Task**: a sub-pill inside a step, only when there are several.

Typical fit (year levels) is a teacher note, never a label or a gate.

## 2. Design order

Do these in order, and write each down before building the next.

1. **Concept spine.** Map the course onto the shared spine (sequence, loops, variables, decisions, lists, functions, events, building a widget). Reuse the order unless the new language has a real reason to differ. Students who meet a second pathway should recognise everything.
2. **Units and lessons.** One concept per lesson; group into units by dependency. Mark what each lesson *introduces*.
3. **One insight per step.** Write the `insight:` first (what the student should realise), then choose the check that produces it (see `AUTHORING.md` › Check types: count and predict → number, how something changes → trace, what each part does → match, why it is wrong → bug, structure → parsons).
4. **Hidden assumptions.** For every construct on screen: the goal of this lesson, already taught (cite where), a recipe ("copy this line for now"), or a prerequisite to check. Fix gaps in the lesson that should have taught it, not in the one that trips over it (example: `global` was used in Events and Build a button but explained nowhere; the challenge exposed it). Record it in frontmatter (`introduces`, `assumes`, `recipes`; AUTHORING › 10) so `npm run validate` checks it; `npm run concepts` shows the course's concept order.
5. **Error tasks.** Plant this lesson's misconception, authentic, one named fault, symptom not answer, faithful to the real language (`AUTHORING.md` › Error tasks; ids in `misconceptions.json` with a home lesson).
6. **Final challenge** (section 5).
7. **Teacher layer** (section 3) for every lesson and unit, written with the lesson.

## 3. Teacher layer (every lesson, written with the lesson)

The student tutorial stays light on words; the teacher layer carries the explanation for a non-specialist teacher. Write it as part of the lesson, not afterwards.

- **`teacher.yml`** (fields in `AUTHORING.md` section 9): plain language, jargon explained on first use. Same sections every lesson. `stuck` comes from real failure points (what you will see → a question to ask → the fix), usually the planted misconception plus two common slips. `goals` start "I can" and match the step insights. `exit` is one question on the main idea.
- **Solutions:** one `sol-*` region per Modify and Make task (or `step-N#tM` per task), using only what students have met. Validate checks each passes its task's code check; also run each one in the playground (section 6, step 2).
- **Unit primer** (`primers/<unit>.md`): the concept for a teacher who has never programmed, with an everyday picture and where it breaks.
- **Generated, nothing to write by hand:** per lesson a Prepare deck (`deck.md`) and Print worksheet (`worksheet.md`); per unit a cheat sheet as a printable A4 page and as Markdown for Prepare; one whole-course cheat sheet. All under `/teach/`, linked only from the course page footer.
- **Cheat sheet pictures:** students see them too (Reference page, the drawer's Example button, `reference/print/`), so an example must never answer a task: check new examples against every Modify, Make and stretch task and solution. A snippet's `example` (a short complete program) and `shows` (caption) in `snippets/<kind>.json` give its card a picture. `npm run render` draws them (`tools/render-pictures.mjs`, cached; CI does the same). A unit's sheet lists what its lessons unlock and what the code students see uses, each command once, in the first unit that uses it. If a needed command is missing from a sheet, it has no snippet: add one.
- **Slides fit by estimate** (`fitCode` in `tools/teach.mjs`): code shrinks, then the whole slide; programs over 27 lines link to the tutorial; a check slide that still cannot fit at the smallest sizes (`tooTall`) puts the task's program on its own Discussion slide first. `check-decks` uses marp-cli; Prepare renders with marp-core and its own themes, so a slide near the limit can pass one and not the other. After changing deck layout or adding long checks, run `npm run check-decks`.
- **Prepare:** pages offer "Copy address for Prepare" (Load URL). Prepare's own load-by-URL parameter is unconfirmed, so there is no one-click open yet.

## 4. Lesson recipe

- **Predict** on code that runs (lock in a prediction; Run shows it beside the result). **Run** with a reflect tick. **Investigate** with tools that follow the insight. **Modify** a small complete example whose heading names the task. **Make** is an explicit task with fading support (starter, then outline, then goals only).
- **Real world** is a small complete thing students change; big projects are the teacher's.
- **Build it yourself, then meet the real tool**: hand-built buttons before Gradio, a hand-built loop before a game engine. End with a "Where this leads" line.
- **Make the expected result clear, and show it.** Every Modify and Make task says what success looks like; where words alone leave it unclear, show it behind "Show the expected result" (after the playground, so students try first; the picture or clip only, never the code):
  - **A picture** when the result is static (most HTML and CSS): `expected: page.html#sol-x` on the step or task; `npm run render` screenshots the solution's page.
  - **A clip** only when the result moves or happens over time (turtle drawing, animation, a click that changes something): an output-only clip (`view: output, autorun: 1`, `reveal: "Show the expected result"`).
  - **A captioned clip to explain why** (an idea that is spatial or happens in steps, such as nesting): short (under about 30 s), key phrases as captions. A voiceover is optional (`voice:`, AUTHORING › Voiceover): captions still carry the idea with the sound off, and the voice says a fuller version of each caption. The lesson's main idea goes in **Explain it to me** as a clip (`explainClip`) with two or three lines of text, not a page of prose.
- **Show combinations, not just the one case.** Once a lesson's tag or idea works on its own, show it combined with what students already know (a link inside a list item, a list inside a list, a picture inside a link, a link inside a table cell), so they see that any sensible nesting works. Usually one Investigate task with a `picture:` (Boxes on) and one Modify task.
- **Video, text and pictures cover the same ground.** The Explain it to me text follows the clip step by step (numbered, like the captions), and `explainPicture` shows the clip's result, so a student who skips the video gets the same idea from the text and the picture.
- **Clips** only where they earn it: a hook, an expected result that moves, or explaining why.
- **Code checks** (`type: code`) use `contains` for the exact idea ("the hit test is in the click handler"), not just names: `uses` passes on an import line alone, and `calls` passes on any function called often.
- **Unlocks**: each lesson unlocks the snippets it teaches; the Reference drawer's "This lesson" also picks up snippets its starter code uses. Add a snippet `matches` regex when its first line is too generic.

## 5. Final challenge pattern

- **Low floor, high ceiling.** A core everyone finishes, built in milestones (most code → outline → goals only), then a shared enrichment lesson, then optional lessons that go deeper.
- **Blend both directions in the core and the shared lesson**: state, events, a hit test, a timer loop, lists (shared); a status bar and buttons (user interface); lives, rewards, costs (game rules). The Investigate match "UI or game rule?" names the split.
- **Optional lessons point to the extensions**: a UI lesson (towards Gradio and the DOM) and a games lesson (towards Arcade and microStudio). `optional: true` keeps them out of completion; the course's `challenge:` unit marks "Challenge complete" when its required lessons are done.
- **Prediction as a mechanic** where possible (the turtle on a path), so PRIMM carries into play.
- **No new knowledge in the core.** Anything new is one line, named in the text ("Behind the code"), or moved to an option (random spots).

## 6. Testing (every batch)

1. `npm run validate`: errors fail; warnings (error-task lint, units) are read, not ignored.
2. **Run every code region** headlessly in its playground, starters included: no errors, and the starter does what the step text says. For interactive programs, **play them**: the harness clicks the target, presses Start, waits for game over and restarts (see `.render-tmp` scripts from the challenge batch; they are scratch, so rewrite as needed).
3. **Course and pathway pages** with a fresh browser, part progress and full progress, at desktop and phone width: Continue card, unit counts, open row, badge, `/code/` and pathway-page counts (required lessons only); every navbar link resolves from every kind of page.
4. **Screenshots** of anything visual, read before pushing.
5. **Teacher layer:** every solution runs in its playground; `npm run check-decks` reports no overflowing slides; open one guide page, one deck (marp-cli render) and the unit cheat sheets as A4 PDFs (Playwright `page.pdf`) and read them; the student lesson's For teachers panel shows no solutions.
6. Clips: CI records new or changed clips on deploy and reuses the rest from the live site. Render a lesson locally only to watch a new or changed clip.

## 7. Runtime facts that shape lessons

**Turtle playground:** one turtle only; `?shape=classic` (or `shape("classic")`) draws Python's arrow instead of the sprite (cheat-sheet pictures use it); the turtle sprite's colour is fixed (mark it with a `dot`); `speed(0)` for instant drawing; clicks wait until an animated move ends, so moving targets step on a 50 ms timer; `write` needs positional arguments (`write(v, False, "left", ("Arial", 20, "normal"))`); `str()` and string joining are not taught yet, so write labels and values separately.

**HTML playground:** live preview, no Run button (a paste closes the Reference drawer); edits autosave per step.

## 8. Before the web units

Settle these first; the HTML & CSS course should be written to the full standard (lessons and teacher layer) from its first lesson.

- **PRIMM in HTML, used selectively.** Predict only where a wrong guess is likely (nesting, which rule applies, the box model, Flexbox, forms): conceptual errors are a small share of beginners' HTML/CSS errors but about half go unresolved, and the browser hides them (Park et al. 2013). Vocabulary lessons (images, tables, lists) go light: Run, a short Investigate, Modify, Make. Fade support across the course (expertise reversal): full PRIMM early, shorter Predict later, milestones only in the challenge. Investigate and planted bugs carry the most weight, since a page can look right while hiding a mistake.
- **Spine mapping for HTML & CSS foundations** (to agree first): structure and text, lists and links, images and boxes, CSS rules and selectors, layout, then a small challenge page that blends both directions (a page with a working menu or a quiz card, shared core, optional "make it interactive" leading to p5.js and the DOM). Units in `content/code/html/index.md`; the existing `first-page` lesson predates units and the teacher layer.
- **HTML code checks:** built (`tags` and `contains`, ticking live as students type; `AUTHORING.md` › Code checks). Predict works as in Python: display code on the Predict step, the playground on the Run step, where the compare box fills in from the preview.
- **Web misconceptions:** in `misconceptions.json` (`html-error-message`, `tag-overlap`, `list-item-outside`, `table-row-cells`, `selector-mismatch`, `css-missing-unit`, `flex-on-items`, `label-not-linked`), with homes at the planned lesson slugs: `code/html/first-page` (lesson 1 keeps its slug, so progress survives the rework), `lists-links`, `tables`, `selectors`, `boxes`, `flexbox`, `forms`. Use those slugs, or update the homes.
- **Reference**: HTML snippets exist (`snippets/html.json`); each lesson's `unlocks` should match what it teaches, and snippets with `matches` keep "This lesson" and the cheat sheets accurate.
- **Teacher layer for HTML** (generators are language-aware: fences and highlighting follow `language: html`):
  - **Cheat-sheet pictures:** built. `render-pictures` renders an HTML snippet's `example` as a page (browser defaults, 320px wide, as the preview shows it), cropped to what is on it, into `dist/_pictures/html/` (HTML ids can repeat turtle ones). Write CSS examples one declaration per line, as students do. Examples must not answer a task (they show on the Reference page and in the drawer); an `<img>` example needs a picture that loads in CI, so `<img>` has none yet.
  - **Decks:** Predict slides show code; a rendered preview beside it would help (a screenshot of the expected page, like clips). HTML files with CSS are often two files: use `# file:` panels, which show side by side on slides.
  - **Primers:** "what a browser does with a file", "tags are labels, CSS is rules": written for a teacher who has never made a web page.
  - **Solutions** as regions in the lesson's files: `<!-- region: sol-x -->` … `<!-- endregion -->` in HTML, and `/* region: sol-x */` … `/* endregion */` in CSS files or inside a `<style>` block (`snippetFrom` in `lesson-core.mjs` accepts `#`, `//`, `<!--` and `/*` markers).
- **Testing HTML lessons:** `npm run check-html` (after `render` and `build`) walks every region, check and solution. Then look at the clips (a frame from the middle and the end) and the expected-result pictures.
- **Older note on testing HTML lessons:** load every region in the HTML playground and screenshot the preview; there is no Run status to wait for, so wait for the preview frame's load.
