# Authoring a lesson

A lesson is a folder: `content/<subject>/<collection>/<lesson>/` containing `lesson.md`, the code being taught, and
(optionally) `requirements.txt`. The build never calls an LLM. Everything below is the
complete format, so it also works as a brief to give an LLM that is writing a lesson.

## 1. Pick the teaching sequence (PRIMM)

Order steps so students **Predict** before they run, then **Run**, **Investigate**,
**Modify**, and **Make**. Use `info` for anything that does not fit.

| Stage | Student does | Clip? |
|---|---|---|
| `predict` | Reads code, writes a prediction | Optional, hidden behind a "Reveal" (`reveal: true`) |
| `run` | Runs it, compares with prediction | Yes: show the run |
| `investigate` | Links lines of code to behaviour (questions, not answers) | Yes: show the behaviour the questions are about |
| `modify` | Changes one thing at a time | Usually no |
| `make` | Builds something new from a spec | No |

Guidelines: one concept per step; one short clip per concept (10–25 s); write
Investigate prompts as questions; put a prediction question *before* any output is shown.

## 2. `lesson.md` layout

Frontmatter keys: `title`, `summary`, `author` (optional, shown as "By …"), `language`, `app`, `pacing`.

```markdown
---
title: Intro to Gradio
summary: One sentence for the lesson index.
language: python            # used for syntax colouring
app:                        # only needed if any step has a clip
  command: python app.py    # run from the lesson folder
  url: http://127.0.0.1:7860
  ready: Name               # a label to wait for before recording (or readySelector: "css")
pacing: { typeCps: 55 }     # optional overrides, see tools/lesson.mjs
---

Intro text (markdown).

## Predict: what will `greet` return?

```step
stage: predict
code: app.py#greet          # file, or file#region
app: true                   # show the running app from the first frame
reveal: true                # hide the clip behind "Reveal what happens"
caption: Shown at the start of the clip
clip:
  - type: { into: Name, text: Ada }
  - click: Submit
  - expect: { field: Greeting, value: "Hello, Ada." }
```

Student-facing markdown for this step goes here.
```

Every `## ` heading starts a step. The ```` ```step ```` block is the only machine-read part;
steps without a `clip` are plain text and need no app.

## 3. Showing code: regions

Mark the parts of a source file you want to show:

```python
# region: greet
def greet(name): ...
# endregion
```

`code: app.py#greet` shows only that block (marker lines are removed). `code: app.py` shows
the whole file. Because the page and the video read the real file, they cannot drift from it.

## 4. Clip actions

Each list item has exactly one verb.

| Verb | Example | Effect |
|---|---|---|
| `caption` | `- caption: Now tick the box` | Changes the bottom caption |
| `run` | `- run: true` | Reveals the app (when `app: false` at start) |
| `show` | `- show: app.py#launch` | Types that code into the code panel |
| `clear` | `- clear: app.py` | Empties the code panel |
| `type` | `- type: { into: Name, text: Ada }` | Moves pointer, clicks field, types (clears it first; `append: true` types at the end instead, and `after: "text"` types just after the first place that text appears, such as inside a `<style>` block, so captions can explain each part as it appears) |
| `click` | `- click: Submit` | Button, then label, link or text with that name; `{ selector: "#go", preview: true }` clicks inside the HTML preview; `{ selector: "#canvas", at: [-130, -170] }` clicks that point of a turtle drawing (turtle coordinates) |
| `press` | `- press: Enter` | Key press |
| `expect` | `- expect: { field: Greeting, value: "Hello" }` | **Fails the build** if the value is wrong (`contains:` also works; `preview: true` checks an element inside the HTML preview) |
| `wait` | `- wait: 1000` | Pause in milliseconds |

Targets are found by visible label/name, not position. If something has no usable label,
use `{ selector: "#css" }` instead (works for `click`, `type`, `expect`).

Always end a clip with an `expect`. It turns every clip into a test: if the app changes so
the lesson is no longer true, CI fails instead of publishing a stale video.

### MakeCode explain clips (explain stage)

MakeCode lessons cannot type code into a clip, so their `explainClip` records the **explain stage** (`playground-explain/`, built to `_playground-explain/`): the program's blocks picture beside "What it makes", revealed by `click: Run`, with captions (and voice) walking through the explain text. The pictures are the lesson's `explainPicture` ones, drawn by `render-pictures`. Frontmatter:

```yaml
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$OUT_DIR" 8131
  url: http://127.0.0.1:8131/_playground-explain/index.html
  readySelector: "#stage[data-ready]"
  layout: full
explainClip:
  query: { code: "@if.ts#predict", lesson: "code/microbit/microbit-if", target: microbit }
  clip: [ ...captions..., click: Run, ..., expect: { selector: "#out h2", contains: Running } ]
```

`code` must be the `explainPicture` program (its blocks picture is found by the same hash); `lesson` is the slug. A clip's hash includes both pictures, so one recorded while a picture was missing records again once it is drawn.

### Voiceover (`voice:`)

Captions come first: clips start muted, because headphones are not guaranteed. A lesson can add a voiceover that students hear when they unmute.

- **Turn it on** in the frontmatter: `voice: true` (voice `af_heart`), a voice name (`bf_emma`), or `{ name: bf_emma, speed: 1.1 }`. Voices: `af_heart`, `af_bella`, `bf_emma`, `am_fenrir`, `am_michael`, `bm_george`, `bm_fable` (Kokoro, US and UK English; there is no Australian voice). Speed 0.7–1.4.
- **What is said:** each `caption` is spoken as written. When a caption is too terse to say aloud, give the fuller line with `say`, and keep the caption short: `- caption: { text: "</ul> closes the list.", say: "The closing U L tag ends the list." }`. The voice may add words but never contradicts or reorders the caption. A step's opening `caption:` is spoken too, or its `say:` instead; a step with no `caption:` opens silently. `say: ""` keeps a caption silent.
- **A choice of voices:** every voiced clip is recorded once and spoken in Emma (`bf_emma`), George (`bm_george`) and Heart (`af_heart`), all at the lesson's speed (`CLIP_VOICES` in `tools/lesson-core.mjs`). The lesson's own voice is mixed into `clips/<id>.mp4`, as before; each other voice is `clips/<id>.<voice>.m4a`, listed in `clips/<id>.json` (`voices`). Under the clip a picker ("Voice: Emma · George · Heart") chooses one; the choice is saved per browser (`wp-voice`) and applies to every clip. Students hear the lesson's voice until they choose. The video's sound button stays the on/off switch (on iPhone and iPad, where the page cannot silence the video's own track, each press turns the chosen voice on or off and the note beside the picker says which). A missing voice file falls back to the lesson's voice.
- **Timing:** a line starts when its caption appears and is timed by the slowest of the three voices: the next caption waits until every voice has finished, so faster voices have a slightly longer pause. The first click, press or run after a caption also waits until every voice has finished that line, so a board never moves on while a voice is still describing it; code typed as a caption explains it (`show`, `type`) still runs alongside the words, moved only by how much longer the slowest voice takes. Keep each line to one sentence of at most 15 words (validate warns), and clips under about 30 s in the slowest voice (render warns and lists them at the end, and in the publish run's summary).
- **Code read aloud:** tags and calls are said the way a teacher would (`</ul>` → "closing U L", `forward(100)` → "forward 100"). Add words or tags to `tools/voice-lexicon.json` when the voice says one wrongly.
- **Transcript:** a voiced clip also gets `clips/<id>.vtt`, the spoken lines (the same words in every voice), shown by the player's CC button.
- **Recording:** clips are made from Chromium's screencast frames, each placed at the time it was drawn, so a busy board that drops frames still keeps step with the voice (Playwright's own recorder fell behind on such boards).
- **Hearing it before it goes live:** the Voiceover preview workflow (parked in `.github/workflows-off/voice-preview.yml`; move it back to `.github/workflows/` to use it) records voiced lessons with the real voice onto a `voice-preview` branch. Otherwise the real voice is first heard after a manual publish. Locally, `WP_VOICE_ENGINE=flite node tools/render.mjs --lesson <slug>` uses ffmpeg's robotic test voice to check timing (a different flite voice stands in for each of the three, so timing by the slowest voice shows); `npm run build` then refuses to build (test-voice clips and their `.m4a` files) (`WP_ALLOW_TEST_VOICE=1` to look anyway), so they cannot be published. A build that cannot reach Hugging Face uses `WP_VOICE_ENGINE=none`: it reuses the live Kokoro clips and records any others silent. Each voiced clip's `clips/<id>.json` records its `voice` (kokoro, flite or none), and a Kokoro build records again every clip whose voice is not kokoro. Kokoro itself needs `npm install --no-save kokoro-js` and downloads its model (about 90 MB) from Hugging Face on first use.
- **Building without makecode.com (a sandbox):** set `WP_NO_MAKECODE=1` for `tools/render-pictures.mjs` and `tools/render.mjs`. Both skip their MakeCode sections (blocks pictures, output pictures, MakeCode lessons' clips) and keep what is already in `dist/`, instead of waiting on a renderer they cannot reach.

## 5. Commands

```bash
npm run validate   # check lessons (fast, no browser)
npm run build      # site with clip placeholders (no browser needed)
npm run render     # record clips (needs ffmpeg + Chromium); skips unchanged clips
npm run all        # validate, render, build
```

`dist/` is the finished site.

## 6. Nested paths, the playground and other options

- **Path = URL.** `content/code/python/turtle-intro/` is served at `/code/python/turtle-intro/`.
  Add `index.md` (frontmatter `title`, `summary`) in a subject or collection folder to name its index page.
- **`try`** (any step): embeds the playground so students can edit and run code on the page.
  `try: { starter: file#region, height: 420, extent: 500, speed: 6 }`. If omitted, `starter`
  defaults to the step's `code`. Student edits autosave in their browser.
- **Recording the playground.** Frontmatter:
  ```yaml
  app:
    command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground" 8123
    url: http://127.0.0.1:8123/index.html
    ready: Python code
    layout: full        # app fills the stage; no separate code panel (default: split)
  ```
  A clip step also needs `app: true` to open the app. Useful targets: `type: {into: "Python code", text: "@file.py#region"}`
  (a leading `@` means "use this code reference"), `click: Run`, and
  `expect: { selector: "#status", contains: Finished }` / `{ selector: "#turtle-state", contains: "heading 0" }`.
- **`try.playground`**: `turtle` (default) or `html`. For HTML, record with `ready: HTML code`, `type: {into: "HTML code", text: "@page.html#region"}` and `expect: {selector: "#preview-text", contains: "..."}`; use `query: { code: "" }` to start from an empty editor. Region markers in HTML are `<!-- region: name -->` / `<!-- endregion -->`.
- **MakeCode extensions** (`language: makecode` lessons): `extensions: [robot]` in the frontmatter adds an extension to every step's project and to the blocks pictures, so its blocks draw as blocks and its simulator appears. The keys and pinned versions live in `MAKECODE_EXTENSIONS` (`tools/lesson-core.mjs`); `robot` is Microsoft's `microbit-robot` (two-wheeled robots and the robot simulator), micro:bit playground only. Robot programs start with the block that picks the robot (`robot.elecfreaksCuteBot.start()`); see `content/code/robotics/`. `ml` is micro:bit CreateAI's **Machine Learning** blocks with six practice actions (`ml.event.Still`, `Walking`, `Running`, `Jumping`, `Waving`, `Clapping`) from this repo's `makecode-ext/ml-events` (a nested GitHub extension pinned by the commit that last changed it; a change to the extension needs that new commit's hash in `MAKECODE_EXTENSIONS`), so lessons can run `ml.onStart(...)` code with the simulator's ML panel and no trained model; see `content/code/microbit-computer/createai-code/`.
- **`query`** (clip step): extra URL parameters for the app, e.g. `query: { speed: 8, code: "@file.py#region" }`.
- **Box model view** (HTML playground): `boxmodel: 1`, or `inspect: ".card"` to pin one element (students use the **Box model** button and point at a box). Like the browser's developer tools, it shades margin (orange), border (gold), padding (green) and content (blue) and shows the sizes, without changing the layout. Use it, not Boxes, whenever sizes or spacing matter: Boxes adds its own padding to show nesting. In a `picture:`, write `{ ref: page.html#x, inspect: ".card" }`.
- **Python playground** (`try: { playground: python, ... }`): real Python (Pyodide) for lessons that need files, `json`, `csv`, pandas, the mini-Gradio stand-in, Flask or FastAPI; Python snippets, unlocks and code rules are the turtle playground's. Its files are kept per course in the browser (Files tab). `files: [../sets/music.csv]` lists data files (paths from the lesson folder): the build copies them to `<lesson>/files/`, and the playground adds any the student does not have yet (their own edits are kept; "Get this lesson's files again" restores them). In clips, pass each file's text in the query, `query: { "file:music.csv": "@../sets/music.csv" }` (clips are recorded before the site build copies `files/`), and serve the whole site so Pyodide loads (see `content/code/data/data-rows/lesson.md`).
- **HTML playground options:** `boxes: 1` turns on the **Boxes** view (a labelled outline around every element, coloured by depth, so nesting shows; students can toggle it with the Boxes button), and `zoom: 1.7` enlarges the code and preview for clips. A step's `try: { boxes: true }` opens its playground with Boxes on, and `try: { boxmodel: true }` with the Box model view on. In clips, type nested code over several indented lines: long lines scroll out of the narrow editor.
- **`pacing`** (frontmatter or a clip step): override `typeCps`, `keyDelayMs`, `preRollMs`, `postRollMs`, `cursorMs`, `afterActionMs`.
- `$REPO_ROOT` and `$OUT_DIR` are available to `app.command`.

## 7. Checks and unlockable snippets

Each playground has a collapsible **Reference** panel built from snippets (`snippets/turtle.json`, `snippets/html.json`).
Each snippet is a card with its code and a Copy button: students copy and paste it themselves, so deciding where
code goes stays their job. `‹text›` marks a value to change (highlighted on the card, removed when copied).
The panel is a drawer over the canvas (or preview), with search and a **This lesson / All** filter. This lesson
(the default inside a lesson) shows the snippets this lesson unlocks, the ones the step's starter code uses, the
lesson's modules and the student's own tools; free play opens on All. "Uses" is found from each snippet's first
line, with placeholders as wildcards; when that line is too generic, add `"matches": "regex"` to the snippet
(as for `def`, lists and the event functions). The full reference pages have the same search. A snippet
is locked only if some step claims it with `unlocks`; unclaimed snippets are always available. A step earns its
unlocks with a `check`, shown under the step:

```yaml
check: { type: reflect, text: "I can explain what forward(100) does." }   # a tick box
unlocks: [forward, right]                                                   # snippet ids
```

```yaml
check:
  type: question
  q: "How many times does the loop repeat?"
  options: ["2 times", "4 times", "90 times"]
  answer: 1                         # number of the correct option, counting from 0
  explain: "Right: range(4) repeats 4 times."
unlocks: [for-loop]
```

- A snippet's id is its label in lowercase with dashes ("for loop" becomes `for-loop`); the generated reference
  pages (`/code/python/reference/`, `/code/html/reference/`) show every id. `npm run validate` rejects unknown ids.
- The playground a step's `unlocks` refer to is its `try.playground` (default `turtle`, or `html` for `language: html`).
- Progress is stored in the student's browser only. Question answers are in the page source, so this suits
  practice, not assessment. Teachers can open any lesson or playground with `?unlock=all` to show everything
  (remembered in that browser), and `?unlock=off` to switch it back.

## 8. Python modules (tools that become buttons)

A module is an ordinary Python file whose functions the playground turns into buttons, so students can use an
idea (say, "draw a square") before they can write the `def` themselves. Offer modules in the frontmatter:

```yaml
modules: [shapes]
```

- **Where the file lives:** `shapes.py` next to `lesson.md` (lesson-local, wins) or in the repo's `modules/` folder (shared by all lessons).
- **What becomes a button:** each top-level `def name(args):` that starts with a docstring. The first docstring line is the hint; default values become the placeholders: `square(‹100›)`.
- **What the card shows:** two lines to copy, `from shapes import square` (at the top of `main.py`) and the call (where it should run). "Show how it works" opens the module's source; once `my-module` is unlocked it also offers **Open a copy to edit**, which makes an editable module of the student's own with the same name (theirs wins the import until they delete it).
- **Locking:** module functions are snippets with ids like `shapes.square`, so `unlocks: [shapes.square]` works as in section 7. `npm run validate` checks that the module and function exist.
- **Limits:** modules can use only what the playground's turtle supports. Detection is a simple pattern, so decorators and nested functions do not become buttons. Only the Python turtle playground supports modules.
- **On the create page:** "+ Add module" adds a file tab and the `modules:` line.

### Student-made buttons and modules (turtle playground)

Two features let students build their own tools, which is how abstraction is taught:

- **Save selection to My tools** (feature id `save-as-button`): students select code (or put the cursor in a `def`) and save it under **My tools**, where it can be copied, edited or removed. Tools are kept per browser and follow the student across lessons. Editing a tool changes future copies only; code already pasted stays as it was (the copied-code fault, used in Modules).
- **+ module** (feature id `my-module`): a tab for a file of their own functions. Functions with a docstring appear as cards under "My module: name" (the import line and the call to copy), with **Edit name.py** to open the tab. Modules are kept per browser and follow the student across lessons and steps.

Both are unlockable like snippets: put `save-as-button` or `my-module` in a step's `unlocks:` (the create page lists them under "Playground features"). Until a lesson unlocks them they stay locked, if some lesson claims them.

Suggested order: sequence, loop, variable, function (students write `def`), **save to My tools** (function as a tool), then **module** (several related functions in one file, shared rather than copied).

## 9. Hook, "Use it" step and teacher notes

Optional frontmatter, plain text:

```yaml
hook: "Loops are how a program draws 100 tiles without 100 lines of code."
```

- `hook`: one or two sentences shown at the top of the lesson: where the skill appears in real life. No project, just the "why".

### teacher.yml (teacher notes, solutions, "Explain it to me")

Teacher notes live in `teacher.yml` beside `lesson.md`. Write for any teacher, not a specialist: plain words, jargon explained on first use. `npm run validate` warns when a lesson in a course with units has none, or a code-checked task has no solution.

```yaml
summary: One sentence on what students do and see.
time: 50                       # minutes
timing: "Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 10 min"
goals: ["I can write a function with def and call it by name."]   # each starts "I can"
before: Try the Make task yourself; the surprise for students is ...
running: ["Predict and Run: ...", "Investigate: ...", "Make: ..."]  # what to do and say, in order
struggle: Where the lesson is hard on purpose, and what to say instead of rescuing (one or two sentences).
stuck:                         # what you will see → a question to ask → the fix
  - { see: "Nothing is drawn, and no error.", ask: "Where do you call the function?", fix: "Add square() below the def." }
stretch: ...
support: ...
leads: Where it leads next, and class ideas (Markdown).
exit: { q: "One question on the main idea", a: "Its answer" }
explain: |                     # optional: the student "Explain it to me" panel (Markdown)
  ...
solutions:                     # work item → code region
  step-4#t2: functions.py#sol-triangle
  step-5: functions.py#sol-make
sources:                       # where real-world facts came from (rates, dates, data)
  - { title: "Tax rates – Australian residents (ATO)", url: "https://www.ato.gov.au/...", checked: 2026-10-12 }
```

- **`sources`**: where a lesson's real-world facts came from (rates, dates, offsets, data), each with a `title`, a full `https://` `url` and the date it was `checked` (YYYY-MM-DD). It shows as Sources in For teachers, the teacher guide and the title slide's speaker note; `npm run validate` checks the fields. Definitions and worked arithmetic need no source.

- **`explainClip`** (lesson frontmatter; needs `app:`): a captioned clip shown first in the student's **Explain it to me** panel, written like a step's clip (`query`, `caption`, `clip:` actions); it records as `clips/explain.mp4`. Keep the `explain` text to two or three lines beside it.
- **Where it shows:** the lesson's collapsed **For teachers** panel (no solutions), the teacher guide page `/teach/<course>/<lesson>/`, and the generated slides and worksheet. `explain` is a collapsed panel after the lesson intro.
- **Solutions** are code regions (`sol-*`) in the lesson's `.py` files, keyed by work item: each Modify or Make step with a playground (`step-N`), or each of its tasks (`step-N#tM`). A solution must pass its task's code check (validate runs the rules). Multi-file solutions use `# file:` lines. Use only what students have met by then. An open Make task with no solution shows "any program that does what the step asks".
- **Unit primers:** `content/<course>/primers/<unit id>.md` (front matter `title`, for example "Functions in 5 minutes"), shown on the course guide. Sections: the idea in plain words; why programmers use it; an everyday picture and where it breaks; try it yourself (5 minutes); questions students ask; how it connects.
- **Generated at build time** (`tools/teach.mjs`, no AI) into `dist/teach/<course>/<lesson>/`: `deck.md` (Waypoints Prepare Marp: goal and "I can" slide, Predict and Investigate as Discussion and Check slides with click-to-reveal answers, Modify and Make as Activity slides with an "Open this step" link that opens the playground full screen via `?full=step-N`, an exit ticket; speaker notes from the notes above) and `worksheet.md` (Prepare Print: answers and solutions in `:::teacher-note`; Modify before Make is `:::typical`, later real-world steps `:::wider`). Each unit gets a printable cheat sheet (`cheatsheet-<unit>/`, A4, two columns, a picture per command) and `cheatsheet-<unit>.md` for Prepare, listing the snippets its lessons unlock or use; the course gets a whole-course sheet (`cheatsheet/`). A snippet gets a picture from `example` (a short complete program, run by `npm run render`) and an optional `shows` caption in `snippets/<kind>.json`. The same example and picture appear on the Reference page and behind the drawer card's **Example** button, and students get the same cheat sheets at `<course>/reference/print/`. Keep examples off the lessons' tasks: an example must not be the answer to a Modify, Make or stretch task (a star, a square spiral, a lesson's own shape function). Code too long for a slide shrinks; programs over 27 lines link to the tutorial instead. After changing deck layout, `npm run check-decks` renders every deck and reports slides that overflow.

- **Make vs a real-world Modify:** Make is an explicit task ("draw a house: a square with two lines on top"). A real-world step is a small, complete, pre-made example the student modifies (`stage: modify`, no check). Give it a heading that names the task ("Resize a room plan", "Extend a street"), not "In the real world": the real-world framing is implied by the example, the hook and the teacher notes. Larger projects belong to the teacher.
- Clips are optional. Use one for a first-run demo or to explain why; skip it where students are about to do the thing in the playground.

### Hints and expected results

- `picture: page.html#combos` (or `{ ref: page.html#combos, boxes: true }`) on an Investigate, Modify, Make or info step or task, in an HTML lesson: a picture of what that code makes, shown beside it (not hidden), drawn by the playground itself so Boxes looks as students see it. Not allowed on Predict or Run (it would give the answer away). `explainPicture:` (lesson frontmatter, same form) puts one in the Explain it to me panel, after the text.
- `expected: page.html#sol-x` (HTML steps and tasks with a playground) shows a picture of that region's page, no code, under a collapsed "Show the expected result". `npm run render` draws it (cached in `dist/_pictures/expected/`); until then the reveal is left out. Use a picture for static results and an output-only clip (below) for results that move.

### Hints and "expected result" clips

- `hint: "text"` or a list of up to 3 texts adds "Need a hint?" (then "Another hint") buttons under the playground. Write nudges, not answers, in this order: the idea, then where to look (the line or the part that changes), then at most a partial example. Never solution code in the first hint (`npm run effort` flags it).
- `reveal: "Show the expected result"` hides a step's clip behind a button with that text, placed after the playground so students try first.
- An **output-only clip** shows the result without the code. Give the step `app: true` and a query that loads the solution and hides the editor:

```yaml
app: true
query: { code: "@square.py#triangle", view: output, autorun: 1 }
clip:
  - expect: { selector: "#status", contains: Finished }
```

  `view=output` shows only the drawing and `autorun=1` runs the program when the page loads.

### Effort and struggle

Students often expect coding to be fun and easy, and read being stuck as "this isn't for me". Lessons should remove the friction that teaches nothing (typos, unexplained syntax, setup) and keep the difficulty that is the thinking, and say plainly that it is meant to be hard.

- **Bad hard vs good hard.** Start from working code, label recipes, use Parsons and bug tasks for long typing, one new move per lesson. What is left to struggle with should be predicting, tracing and working out why.
- **Say it before it happens.** The Predict and Make stage notes already say a wrong guess is fine and a few tries are normal. Where a task is reliably hard, add a line to its text ("Most people need two goes at this").
- **Name the hard part for teachers.** `struggle:` in `teacher.yml`: where students should find it hard, and what to say instead of helping ("Ask them to trace it first"). It shows in For teachers, the teacher guide and the slide notes. Non-specialist teachers tend to rescue too early.
- **End with what they can now do.** The lesson's `goals` show at the end as **Now you can** (the "I can" dropped), so write goals a student would recognise.
- **Hints escalate**, never starting with the answer (above).

`npm run validate` prints one summary line; `npm run effort [path]` lists every gap (no `struggle:`, no `goals:`, a first hint with solution code or a number check's answer).

### Ordering lessons

Add `order: 1` (a number) to a lesson's frontmatter. Index pages list lessons by `order`, show it as "1. Title", and put unnumbered lessons after the numbered ones, alphabetically. A folder's `index.md` can have `order` too (folders are sorted but not numbered).

### Code checks (mastery you can see)

A check can look at the student's code instead of asking them to tick a box:

```yaml
check:
  type: code
  text: "Write a function for a house, call it in a loop, and run it."
  rules: { defs: 1, calls: 1, loops: 1 }
```

The box ticks when the student runs a program that meets every rule. Rules (all optional, at least one needed): `defs` (functions defined), `params` (a function with this many parameters), `calls` (one of their functions called this many times), `loops` (for/while), `returns` (return statements), `imports` (list of module names). The check reads all the student's files, ignores comments, and needs a `try` playground on the step. It can unlock snippets like any check.

**In the HTML playground** a code check ticks as the student types (there is no Run): the playground reports its code on every preview update. Only two rules apply: `tags` (tag names that must be used, without brackets: `tags: [ul, li, a]`) and `contains` (fragments, spaces and letter case ignored: `contains: ["display: flex"]`). `<!-- -->` and `/* */` comments are ignored, and `#` is not a comment (colours, links). Validate rejects Python rules on an HTML step. The first report (page load) never ticks a check, so a starter that already passes does not tick itself; still write starters that do not pass. The Run step's compare box also works for HTML: it fills in as soon as the preview loads and updates when the prediction is locked.

### Lesson navigation, playground pages and My progress

- **Course bar:** every lesson page has a sticky bar with previous and next lessons (by `order`), a "3 of 6" menu with ticks for finished lessons, and links to the path, the playground and My progress. A "Next lesson" card ends each lesson. Nothing to configure: it follows `order`.
- **Playground pages:** `/code/python/playground/` and `/code/html/playground/` are free play. They remember the student's last lesson ("Continue lesson"), respect unlock progress, and have an "Unlock all snippets" toggle that applies only to free play.
- **My progress:** a dialog (course bar, playground page, path pages) comparing this browser's progress with `progress-manifest.json`, which the build writes. It is per browser and nothing is sent anywhere. `window.wpProgressSummary()` returns the same data for a future export.

## 10. Tasks (sub-pills) and more check types

### Tasks: several parts in one step

Put `###` headings inside a step and each becomes a **task**, shown as a sub-pill (only when there are two or more). Per-task settings go in a `tasks:` list in the step's YAML, in the same order:

````markdown
## Modify

```step
stage: modify
insight: "Change a working program one small step at a time."
try: { starter: "square.py#modify", height: 420 }
tasks:
  - hint: "Two numbers change."
    check: { type: reflect, text: "I drew a triangle." }
  - starter: "square.py#modify"      # optional: "Reset to this task's start"
    hint: ["First nudge.", "Second nudge."]
    check: { type: code, text: "Change the colour.", rules: { uses: [pencolor] } }
unlocks: [pencolor]                  # fires when every task is done
```

### Draw a triangle
...
### Change the pen
...
````

- One playground is shared by all the tasks, so code carries on from task to task. A task `starter` adds a "Reset to this task's start" button.
- A task can have its own `hint` (text or up to 3), `check`, `unlocks` and `insight`. Checks go on tasks, not on the step.
- Step-level `unlocks` fire when every task with a check is done; task-level `unlocks` fire when that task passes.
- Code checks only evaluate for the task that is open, so a later task cannot be ticked by code written for an earlier one.
- The sticky step pill shows progress, for example "Modify 2/3". Pills are ordered but never locked.
- Works on any stage (Investigate questions, Modify ladders, Make milestones).

### Design projects (`shape: design`)

`shape: design` in a lesson's frontmatter shows the stages in design-cycle words, for teacher-led projects that follow a brief (first used by `engineering/projects/`): `predict` = **Inquire** (the brief: criteria and constraints), `investigate` = **Develop** (plan, test table, prototype), `make` = **Create**, `modify` = **Test**, `practise` = **Evaluate**, written in that order. Checks work as usual (a board can prototype the logic in Develop); most Create and Test evidence is `reflect`. Teacher notes map the steps to an assessment rubric (MYP Design A–D in the Engineering projects).

### `insight:` (what the step is for)

A step or a task can have `insight: "..."`: one sentence on what students should come to see. It is shown to teachers only, in **For teachers › What each step is for**.

### Units, optional lessons and pathways

A course folder's `index.md` can group its lessons into units:

```yaml
units:
  - { id: functions, title: Functions, summary: "Name steps, give them inputs and outputs." }
challenge: challenge   # optional: the unit whose required lessons mark "Challenge complete"
```

**Hidden assumptions** (`introduces`, `assumes`, `recipes`; MakeCode and Python lessons). In the frontmatter, `introduces: [remainder, text-char]` lists the concepts the lesson teaches, `assumes: [radio-value]` the ones it relies on from an earlier lesson that the scan cannot see (facts such as `value-name-limit`), and `recipes: [if]` the ones it shows but labels "read this for now". Concept ids and the patterns that find them are in `tools/concepts.mjs`. `npm run validate` scans the code students see (every `file#region` the lesson names except `sol-*`, and fenced makecode or python blocks) and warns when a lesson uses a concept that no earlier lesson introduces (a lower `order` in the course, or a course it follows through `after:` in `code/index.md`; an optional lesson's concepts count only for later optional lessons), and when a radio value name is longer than 8 characters. `npm run concepts` prints each course's concepts per lesson, new ones marked. A recipe labelled in an earlier lesson counts as seen in later ones (the student has already been told to copy it for now). Python ids are the `python` list in `tools/concepts.mjs` (`repeat`, `loop-index`, `variable-update`, `function`, `param`, `return-value`, `global`, `callback`, `dotted-call`, `while`, `input`, `to-text` and others); comments and the text inside strings never count, and `False` inside a `write(...)` line is not a boolean. A planned course (an `id:` entry in `code/index.md`) passes its `after:` on, so a follow-on course counts what the turtle course taught. Fix a warning in the lesson that should teach the concept, not the one that trips over it, and do not tag a construct only to silence a warning. `npm run check-concepts` tests the detectors and the lint.

**Theory concepts** (`THEORY` in `tools/concepts-core.mjs`; any subject or language). Ideas from Digital systems, not syntax, so the scan never sees them: `text-as-numbers`, `rgb-colour`, `pixel-grid`, `sound-samples`, `binary`, `bit-patterns`, `logic-gates`, `run-length`, `lossy-lossless`, `packets`, `encryption-purpose`, `ip-dns`, `permissions`, `hashing`, `public-key`, `hardware-specs`, `fetch-execute`, `web-layers`. The Digital systems lesson that teaches one lists it in `introduces:`; a lesson anywhere that relies on it lists it in `assumes:` (for example the Caesar cipher assumes `text-as-numbers`, p5 Shapes assumes `rgb-colour`). Validate warns when nothing introduces an assumed theory concept; an introduction in another subject counts (there is no order across subjects), and within a subject the usual order applies. Both lesson pages show the link under the hook: "Builds on: Text as numbers (Digital systems › Data representation)" and "Put to work in: The Caesar cipher (Code › Secret messages)". In maths-language lessons `assumes:` also holds progression nodes; theory ids sit beside them.

Each lesson then names its unit (`unit: functions`) and can be `optional: true` (shown with an Optional tag and not needed to finish the course). `npm run validate` checks the unit ids. `code/index.md` lists the pathways shown on `/code/`: each has `courses`, either `{ path: code/python, stage: foundations }` for a built course or `{ title, summary, tagline, stage: extensions }` for one coming later. A built course puts its `tagline:` (one line for students: what they will make) in its own `index.md`; the build warns when one is missing (BUILDING › Pathway).

### Check types

All except `code` are static and need no running code. Write the check under `check:` (a step with no tasks) or under a task.

| `type` | You write | Student does |
|---|---|---|
| `reflect` | `text` | ticks a box |
| `question` | `q`, `options`, `answer` (0-based), `explain` | picks one option (shown in a fixed shuffle: see below) |
| `number` | `q`, `answer`, optional `tolerance`, `feedback` (`[["wrong number", "message"]]`, matched within the tolerance), `explain` | types a number |
| `flag` | `q`, `hash`, `explain` | types a capture-the-flag answer. Only a hash is stored: make it with `node tools/flag-hash.mjs "WP{answer}"` (SHA-256 of `wp-flag:` + the lower-cased, trimmed answer). The page checks with `crypto.subtle`, so view-source does not give the flag away; the repository is public, so the answer goes in the lesson's teacher notes |
| `match` | `q`, `pairs: [[left, right], ...]`, `explain` | picks each right-hand item from a list (shuffled for them) |
| `trace` | `text`, `table`, `explain` | fills the blanks of a table |
| `bug` | `code: file#region`, `answer: 7` (or `[7, 19]`; `"main.py:7"` when the code has several files), `fault`, `misconception`, `text`, `explain` | clicks the wrong line (every listed line, when there are several) |
| `parsons` | `code: file#region` (the correct program), optional `extra: [spare lines]`, `text`, `explain` | orders scrambled lines |
| `predict` | `q`, optional `options: [...]` (else typed; `kind: number` for a number), optional `actual` | locks in a prediction before running (cannot change it) |
| `code` | `text`, `rules` (`defs`, `calls`, `loops`, `returns`, `params`, `imports`, `uses`, `contains: ["inside(x, y"]`) | runs a program that meets the rules |

**Open projects.** A course with `content/<course>/projects.yml` gets `<course>/projects/` (a Projects chip on the course page, a side branch on its pathway trail, a section in its teacher guide): small self-paced briefs, each a goal rather than steps. The file is `playground:` (turtle, html, dom, microbit or arcade) and `projects:`, each with `id`, `title`, `after` (the lesson after which everything it needs has been taught), `goal` (Markdown), `uses` (3 or 4 concept ids from `tools/concepts-core.mjs`; `{ id, label }` renames one), `milestones` (2 to 4, ticked by the student), `stretch`, `teacher` (Markdown, guide only) and `example` (a file in `content/<course>/projects/`: drawn as the brief's picture by `render-pictures` (Python and HTML in its `projects` section, MakeCode by the simulator in `makecode-out`, as `projects/<course>/<id>`), shown to teachers as one possible solution, never to students). Validate fails a brief whose example does not use every skill it lists. A crossover lists `parts:` instead, each with its own `title`, `playground`, `uses`, `example`, `starter` and `height` (for example a micro:bit and a web page). The page embeds the playground(s) and runs the concept scan on every report, so a "You'll use" chip lights when the student's own code uses it; each chip links to where the skill was taught (its recap card, else the lesson). The student ticks the milestones, writes one line about the hardest part and claims a badge; "Show your teacher" opens a large card with the skills, milestones and reflection, and "Download my code" saves it. Badges are per browser (`wp-projects`) and never count towards a course's Done. Kept outside the lesson folders, so briefs never re-record clips. Web pages can load `microbit.js` (`web-helpers/`, served beside the libraries): `microbit.connect()` from a click, `onLine`, `onValue(name, number)`, `send(text)`, and `pretend([...])`; where USB is not allowed (the playground preview, Safari, Firefox) it opens a pretend micro:bit panel for typing lines, so a downloaded page in Chrome or Edge is the real thing.

**Practice page.** A course with a `practice/` folder (`content/<course>/practice/<lesson>.yml`, one file per lesson, kept outside the lesson folders so it never re-records clips) gets `<course>/practice/`, linked as a Practice chip: endless questions with new numbers each time, one skill (lesson), a unit mixed, or the whole course mixed (favouring skills not yet practised); 3 right in a row marks a skill practised (per browser, `wp-practice`); Show the answer appears after a wrong answer or a second try of any kind (a form slip such as "write it as x = …" keeps the streak but still counts as a try), and Next question always skips; `?skill=<lesson>` opens one skill (each lesson with a practice file links there from a "Practise this skill" card after Now you can); a teacher can print 10 questions with answers. Each file is `templates:`, each template `q`, `vars` (`"2..9"`, `"1..5 by 0.5"` or a list), optional `let`, `where`, `answer` (marked as any equivalent form; units, `$`, thousands commas and mixed numbers are accepted), `show` (how a revealed answer is written), `tolerance`, `form: simplest | decimal | whole | expanded | factorised | simplified | subject x` (the algebra forms are judged by the Numbas form checker, loaded only on pages that use them; a slip of form says so without breaking the streak), `feedback` ([wrong answer, message], skipped when it equals the right answer) and `explain`. Text uses `{expression}` with filters `|p` (brackets round negatives), `|s` (signed), `|n` (thousands), `|m` (money), `|f1` (fixed places); `2^3` shows as 2³. Answers with `:` are ratios, marked part by part. Answers with letters are expressions (`{a}n + {b}`, marked as any equivalent expression in the same letters; `|c` writes a coefficient, so 1 → nothing and −1 → −, and `|sc` a signed one); `x ≥ {k}` is an inequality (students may type `>=`, or put x on the right); `({x}, {y})` or `({x}, {y}, {z})` is a point (brackets, labels such as A′ and `x =` are optional; a swapped pair is named). Three more kinds of question: `choices:` (multiple choice: the right one first, each "text" or [text, feedback]; shown shuffled, lettered when printed), `cases:` (a bank of scenarios, one map picked per question, its keys used like values; case text may contain `{expressions}`), and `board:` (a setup for the board, filled from the values and drawn above the answer; `height:`), with `when:` for a question answered on the board (a condition on its scope, as in a lesson's board check). Board questions are left out of printing. Validate generates 300 questions per template and fails any that break (format and engine: `tools/practice-core.mjs`); `npm run check-practice` (after a build) loads every board setup in Chromium and checks each `when` uses values the board reports and does not already hold.

**Option order.** Write the right option wherever it reads best (usually first). Students see `question` and `predict` options in a shuffle seeded by the lesson and the question, so it is the same on every build and on the page, guide, deck and worksheet; `answer` and per-option `feedback` are remapped (`arrangeOptions` in `lesson-core.mjs`). Options that are all numbers (or fractions) are sorted instead; catch-all options (None of them, Neither, You cannot tell, It depends) stay last. `shuffle: false` on a check keeps the order as written (for options that refer to each other). Test harnesses should read the parsed lesson's `answer`, not the authored one.

A **trace table** is a pipe table; the first row is the header and cells in `[brackets]` are the blanks, with the answer inside:

```yaml
table: |
  | corner | turned so far |
  | 0 | 72 |
  | 1 | [144] |
  | 2 | [216] |
```

Choose the tool from the insight the step should produce: repetition cost, count and predict (`number`); how a loop or variable changes, `trace`; what each part controls, `match`; why code is wrong, `bug`; how code is structured, `parsons`. `predict` goes on a Predict step with no right or wrong. The locked answer is kept in the browser; the next Run step shows "You predicted X. It actually: Y." (Y is `actual`, or what the program printed). Good prompts: what is printed, how many repeats or sides, which colour. Code rules now also include `uses: [pencolor]` (a name that must appear in the code).

On the create page, the helper row adds a starter for each check type and for tasks.

### HTML lessons: pictures and links

Pictures students use live in `media/html/` (drawn for the course: `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg`, `music.svg`); lesson code names them directly, `<img src="trophy.svg" alt="...">`, as files next to a real page. Add new ones there (your own drawings, or images you may share). Libraries are files there too, from `vendor/web/` (README there): `<link rel="stylesheet" href="bootstrap.min.css">`, `<script src="vue.js"></script>`, `preact.js`, `svelte.js` (a component in `<textarea data-svelte hidden>`), `bulma.min.css`, `pico.classless.min.css`, `tailwind.js`, `daisyui.css`; the DOM playground has the same folder. Links in the preview open in a new tab, so the student's page stays; use `https://example.com/...` addresses in lessons. Forms send nowhere: pressing a form's button (or Enter in a box) shows a short note saying nothing was sent.

### HTML lessons: tags in text

Write every tag in running text inside backticks: `` `<h1>` ``. A bare `<h1>` in Markdown (lesson text, task bodies, **hints**, and the Markdown fields of `teacher.yml`: `before`, `running`, `leads`, `explain`) becomes a real tag on the page, the teacher guide and the slides, and swallows the text after it (a bare `<style>` swallows the rest of the page, its script included, so no check works). `npm run validate` warns about any it finds. Plain-text fields (check questions, options, match pairs, explanations, `goals`, `stuck`, `stretch`, `support`, `exit`) can use bare tags: every page and generator escapes them. Code is highlighted as HTML (tags, attributes, values, comments) when the lesson's `language` or a fence is `html`.

### Several files in one example

A line `# file: name.py` (`<!-- file: name.html -->` in HTML) starts a new file. Display code, fenced code in a
step or task body, and `bug` checks then show one panel per file with its name, so two programs never read as one
file. A `bug` answer names the file: `answer: ["program_a.py:7", "program_b.py:7"]` (line numbers count within
each file).

### Error tasks (planted bugs and misconceptions)

A planted error is a teaching choice, so it is chosen on purpose. Before writing one, check:

- **On the path:** it is this lesson's misconception (or a spiral of an earlier one), never one from a later lesson and never an incidental slip.
- **Authentic:** an error students really make, not an invented typo.
- **One fault, named:** `fault: syntax | runtime | logic | design`. A `design` fault (the code runs, but is badly built, such as copied code) is not a one-line hunt: ask for every place it costs, or make it a refactor in Modify.
- **Symptom, not answer:** the stem says what happens ("stops with a TypeError", "every click counts"); it never states the corrected value.
- **Faithful:** the symptom matches real Python. If the playground differs, fix the playground.

Name the misconception with an id from `misconceptions.json` (`misconception: return-vs-print`); each id has a
`home` lesson. Questions and predictions that plant an error take the same two fields. `npm run validate` warns
(it never fails) when an item has no fault or misconception, uses an unknown id, targets a misconception whose home
is a later lesson, or sets a `design` fault as a one-line hunt. Add a new id to `misconceptions.json` with its home
and a one-line description.

## 11. Maths lessons

A lesson with `language: maths` (see `content/maths/algebra/`) gets maths notation, maths checks and the board.
How maths lessons are sequenced, and why, is in the Project note `maths-structure.md` (Predict, Try, Worked example,
Vary, Practise, Make).

- **Notation:** `$2x + 3 = 11$` inline and `$$...$$` on its own line, rendered with KaTeX at build time (no maths
  library on student pages). Works in lesson text, headings, check questions and options, and the teacher guide.
  Money stays text: the opening `$` must be followed by a non-space, the closing `$` preceded by one and not followed
  by a digit, so "$5 and $10" is not maths. Explanations (`explain:`) show maths as plain text.
- **Worked example:** a fenced block with the language `worked`, one step per line, maths then the reason after `::`.
  Students reveal it one step at a time; decks and worksheets get a numbered list.
  ````
  ```worked
  2x + 3 = 11 :: Start with the equation.
  2(4) + 3 :: Put 4 in place of $x$.
  ```
  ````
- **`answer` check** (typed maths): `answer: "13"` passes any equivalent form (`26/2`, `3(5) - 2`, `x = 13`);
  `equation: { x: 6 }` instead passes any equation that value makes true (for Make tasks). `feedback:` is a list of
  `[wrong answer, what to say]` pairs for planted misconceptions; validate rejects feedback that is the right answer.
  Equivalence is tested by evaluating at several values (`tools/math-expr.mjs`), so it handles algebra like `2(x + 1)`.
  A trailing `%` or `°` on a typed answer is ignored, so a percentage can be typed as `60` or `60%` (write `answer: "60"`).
- **`form:` on an `answer` check** (Years 8 and up): the answer must be equivalent **and** written in a form:
  `form: expanded` (no brackets left, nothing left to collect), `simplified` (nothing left to collect; brackets allowed),
  `factorised` (a product, whole numbers, no common factor left in a bracket, numbers or letters), `subject d` (`d = …`,
  with d only on the left, either case), `simplest` (a whole number, fraction or mixed numeral in lowest terms: `4/6`
  is told to simplify) or `decimal` (a decimal number: `3/8` is told to write a decimal). `answer:` is the expected answer in that form. Students who write an equivalent answer in
  another form are told the slip ("Collect the like terms", "Take out the highest common factor"); `feedback:` entries
  may be equivalent on purpose (`["6x + 12 - x", "..."]`) and are matched by what was typed. An equivalent answer whose
  form cannot be judged passes with a note. These checks are marked by Numbas (`vendor/numbas/`, loaded only on
  lessons that have one; `tools/maths-forms.mjs`); validate runs the same code in Node, so every `answer:` must be in
  its form and every `feedback:` answer must be marked wrong. `npm run check-forms` tests the forms
  (`data/forms-cases.json`: add a case whenever a real answer is marked wrongly).
- **`working` check:** students write their working one step per line. Each line must equal the one before (for
  equations: have the same solutions, so doing the same to both sides passes), starting from `start:`; the last line
  must be in `form:` if one is given. The first line that does not follow is marked, with why. Fields: `q`, `start`
  (`"3(2x + 4) - x"` or `"3x + 7 = 19"`), optional `form`, `example` (a model solution, one string per line; validate
  checks it passes) and optional `wrong` (planted wrong solutions validate checks are rejected). Marked by Numbas, like
  `form:` (`npm run check-forms` has working cases too).
- **`reasoning` check** (maths; reasoning students own): a free working box that is never marked (students write
  it their own way: notes and short reasons are fine), then the marked parts, then a model to compare with. Fields:
  `q`; `steps` (the model solution, each `["statement", "reason"]`, Markdown with `$...$`); optional `answer` (the
  final value, marked like an `answer` check; a ° is ignored) with `feedback` pairs; optional `picks`, the one or two
  steps where the misconception bites: `{ step: 1, options: [reasons], answer: 0, feedback: [null, ...] }` (students
  choose that step's reason); optional `criteria` (self-check sentences; default: each step says what it finds, each
  step has a reason, my answer matches the model); `explain`. It needs `answer`, `picks` or both. Check marks the
  answer and picks; when they are right, the student's working and the model show side by side with the self-check
  (ticked by the student, not needed to complete). After three wrong tries, **Show a model solution** reveals the model
  without completing. Working, answer and ticks are kept in the browser (`wp-reasoning`). Write without for a single
  rule; use it where a chain of reasons is the point (first used by `maths/angles/angle-reasoning`).
- **`board` check:** ticks when the board reports what the check asks for, and never on the starting position. It
  needs `try: { playground: board, starter: file#region }` on the step (`maths` is the old name and still works).
  - `when:` a condition on the board's named values (any board with sliders or points): `"m = -1 and c = 2"`,
    `"c > 0"`, `"P on y = mx + c"` (the point's coordinates make the equation true), `"x(A) = 3"`, `"y(B) > y(A)"`.
    Comparisons are `=`, `<`, `>`, `<=`, `>=`; join parts with `and`. Validate checks that it can be read.
  - `expect:` fields of the balance or machine report: `balanced`, `solved` or `x`. With both, both must hold.
- **Practise stage:** `stage: practise`, between Modify and Make: a few `answer` checks with feedback.
- **The board** (`playground-board/`, JSXGraph): interactive diagrams for any subject. `core.js` reads the setup and
  reports to the lesson; each widget is a file in `widgets/`. The starter is a region in a `.yml` file, one line each:
  `key: value` (a setting) or `kind name: value` (a named object). `# ...` starts a comment.
  - `widget: balance` with `left:` and `right:` (one variable). `mode: try` (default): a slider for x; the scale tips
    and shows each side worked out. `mode: solve`: take blocks or bags of x from both sides, or share both sides into
    equal groups; the scale stays level, the steps are written as algebra, and the answer is checked in the first
    equation. Both sides must be whole-number bags and blocks (such as `2x + 3`).
  - `widget: machine` with `ops: × 2, + 3` and `output: 11`: students undo the steps from the output, last step
    first; a wrong undo gets a nudge, not the answer.
  - `widget: graph`: axes, with
    - `x: -1, 10` and `y: -1, 20` (ranges; default -10 to 10), `grid: 1` (spacing, or `off`), `snap: 0.5` or `snap: 1, 5` for x and y (where
      dragged points land; default the grid spacing);
    - `slider m: 0, 5, 2` (min, max, start, optional step; one lower-case letter, not x or y): shown with − and +
      buttons, and usable in plots and points;
    - `plot: y = mx + c` (up to 4): drawn, and listed under the graph with the slider values put in (`y = 2x + 1`);
      `plot: y = 2x + 1, dashed` draws a dashed line (a line to compare with);
      `plot: y = 5x + 20, from 0` (and/or `to 10`) draws only where a model makes sense; `cross:` looks only there;
    - `plot: x = 3` draws a vertical line (no table row, not with `cross:`); `shade: y < 2x + 1` (also `<=`, `>`, `>=`,
      `≤`, `≥`, sliders allowed) or `shade: x >= 3` shades a region with its boundary, dashed for < and > and solid for ≤
      and ≥, listed under the graph. Checks on a dragged point in a region: `"y(P) < 2 * x(P) + 1"` (write the × before
      `x(P)`).
    - `point A: 2, 5` (fixed; coordinates may use sliders, as in `point B: 0, c`) and `point P: 1, 3, drag`
      (students drag it; it lands on the nearest grid point, and checks see it only once it is let go); one capital letter each;
      dragged points also get a Move row (pick the point, then arrow buttons or arrow keys step it by the snap), so they work
      without a pointer; a `drag y` point gets only ↑ ↓;
    - `segment: A, B` or `line: A, B`; `table: 0, 1, 2, 3` (a table of values of each plot at these x values).
    - `step: 1`: the "1 right, m up" triangle on the first plot from that x, labelled with how far it goes up or down.
    - `axes: d (km), T ($)`: names for a context. The axes are labelled with them, and the legend, table and `cross:`
      use the letters (`T = 2d + 4`). Plots, points and `when:` conditions still use x and y.
    - Data graphs (axes start at 0, with a margin for tick labels): `series Gas: 0,5; 1,7; 2,6` is a line through data points
      (x going up; up to 3 series; the name is the legend). `series: A, B, C` is a line through named points, so students
      can draw one with `point B: 4, 6, drag y`. `drag y` moves a point up and down only; `drag x` across only.
      `grid: 6, 10` and `snap: 1, 5` take x then y. `axes: Time (h), Temperature (°C)` takes words and units.
    - `cursor R: 1` (data series only): a slider (step 1; `cursor R: 1, 4` starts at 4) and a click or drag on the graph read
      values off the first series. Point R is on the first series (S and T on the others), with a dashed line to the x-axis
      and a readout ("Time = 14 h. Day = 29 °C"). Checks use `x(R) = 15`, `y(R) > 20`. Not available with draggable points.
    - `cross: 1, 2`: where plots 1 and 2 meet (by number, in order): a point with its coordinates and a dashed line down to the x-axis labelled `x = …`. Nothing is drawn when they do not meet (parallel lines). Leave it off where students should find the point themselves.
  - `widget: pattern`: figure n of a growing pattern, with what each figure adds in orange. `shape: squares` (sticks,
    3n + 1), `triangles` (2n + 1), `cross` (dots, 4n + 1) or `columns` (`add: 3`, `start: 2`: an + b dots; `adjust: on`
    gives sliders a and b). `n: 1, 8, 1` (first, last, start), `count: on` shows the count. Scope: n, s (the count), a, b.
  - `widget: rule`: a rule machine. `rule: y = 2x + 3`, `x: -5, 10` (allowed inputs), `start: 0`. Students put inputs in,
    see the substitution and collect ordered pairs in a table. Scope: k (pairs), l and h (lowest and highest input), x, y.
    Condition names are single letters (`lo` would read as l × o).
  - `widget: formula`: a formula with a slider for each letter and the substitution written out with × signs
    (P = 2 × 4 + 2 × 3 = 14 cm). `formula: P = 2l + 2w` (a one-letter subject), `slider l: 1, 10, 4[, step]` for every
    letter on the right, `shape: rectangle` (drawn from the first two sliders), `units: cm`, `result: off` (show the
    substitution but not the value, so students finish the arithmetic). Scope: each slider and the subject, so checks
    read `when: "P = 20 and l = 6"` or `when: "l = 2w"`. `hide: formula` shows only the sliders and the result (T = 13): a mystery rule
    for "write an expression, then check it against what the board gives" (the board still sets the scope, so checks work).
  - `widget: numberline` (first used by `maths/number`): one line, `range: -10, 10` (required), numbered every 1 (or
    `labels: 5`; on a narrow screen the board numbers every 2 or 5 by itself), `snap: 0.5` for where dragged points land
    (default 1), `fractions: 4` (values between whole numbers written as fractions and mixed numerals, −1 1/4, with the
    decimal beside them in readouts; points land on quarters unless `snap:` says otherwise), `context: Temperature (°C)`
    (a name and unit under the line and in readouts).
    - `point A: -7` (fixed; `point A: -7, Canberra` adds a caption), `point P: 0, drag` (students drag it along the line;
      checks see it once let go; a **Move** row under the line steps it with buttons or the arrow keys, for keyboards and
      clips: `click: Move P left`), `point A: a` (follows slider a);
    - `compare: A, B`: the comparison written live under the line ("−7 < −2: A is further left, so it is less than B");
    - `sum: a + b` or `sum: a - b` with `slider a: ...` and `slider b: ...` (as on the graph): a jump from a by b, landing
      on R, written "5 − (−3) = 8". When subtracting, a faint dashed arrow shows which way adding b would go. `sum: a ? b`
      adds + and − buttons. `product: a × b`: a jumps of b from 0; a negative number of jumps goes the opposite way, with
      the jumps it reverses drawn faintly above ("−3 × (−2) = 6"); values `a`, `b` and `r`.
    - `ray: P` (with `point P: 0, drag`): an inequality to build: P sets the end, and Open circle / Closed circle and
      Shade left / Shade right buttons draw the ray; the panel writes `x ≤ 3`. Values `k` (1 closed) and `s` (1 right,
      −1 left), with `x(P)`: `"x(P) = 5 and k = 0 and s = -1"` is x < 5. `ray: x >= -2` draws a fixed one (pictures).
    - Values for checks: points as `x(P)` (`"x(P) < -4"`, `"x(P) < x(Q) and x(P) + x(Q) < 0"`), the sliders, `r` the
      result and `o` the operation (1 add, −1 subtract): `"o = -1 and b < 0 and r = 10"`.
  - `widget: geometry` (first used by `maths/angles`): a triangle or polygon on a square dot grid. Students drag the
    corners (they land on the dots); the interior angle at each corner is measured live, to the nearest degree, with the
    rounding shared out so the shown angles add to the shown total.
    - `shape: triangle` or `polygon` with `sides: 5` (3 to 10) or `sides: choose` (More sides and Fewer sides buttons);
      `grid: 12, 8`; `corners: 1,1; 9,1; 4,6` (A, B, C, … in order; default a regular shape); `snap: 0.5`.
    - `tear: on` (triangle): a **Tear off the corners** button showing the three angles side by side on a straight line;
      `split: on` (polygon): **Split into triangles**, lines from A to every corner not next to it (only when no corner
      points in). `tear: shown` and `split: shown` start pressed (for pictures). `presets: on` (triangle): buttons
      Acute, Right-angled, Obtuse and Very flat, which clips can press. `sum: off` hides the total.
    - A **Move** row (pick a corner, then the arrow buttons or keys) moves corners without a pointer; clips can press
      `Move C up`.
    - `angles: given a, b` shows only those corners' sizes (the others show their letter, to find; for pictures).
      `exterior: C` extends the side into C past C (dashed) and marks the exterior angle `x` (value `x`; add `x` to
      `given` to show it).
    - Values for checks: each corner's angle by its lower-case letter (`a`, `b`, `c`, …), `s` the total, `m` the largest
      angle, `n` sides, `k` triangles shown by split (else 0), `t` 1 while torn, `v` 1 if no corner points in; corners as
      points (`x(A)`). Examples: `"m > 120"`, `"m = 90"`, `"n = 5 and k = 3"`, `"n = 4 and v = 0"`, `"s = 1260"`.
    - `classify: on` (first used by `maths/angles/classifying-triangles`) marks equal sides with ticks (within 2%: a
      square grid cannot make an exact equilateral triangle), parallel sides with arrows and right angles with a small
      square, and names the shape under the angles (`#gclass`): a triangle by sides and angles, a quadrilateral by
      family with its other names ("Square: … (also a rectangle, a rhombus, a parallelogram and a kite)"), any other
      polygon as regular or irregular, convex or concave. A trapezium has at least one pair of parallel sides (the Australian Curriculum's definition), so parallelograms are trapezia too; `z` gives the most special name. Values: `e`
      (most sides of one length), `q` (1 scalene, 2 isosceles, 3 equilateral), `r` (1 acute, 2 right, 3 obtuse), `g`
      (right angles), `p` (parallel pairs), `w` (1 regular), `z` (1 square, 2 rectangle, 3 rhombus, 4 parallelogram, 5
      trapezium, 6 kite, 0 other). Checks: `"q = 2 and r = 2"`, `"z = 3"`, `"z = 5 and g >= 1"`, `"n = 6 and v = 0"`.
    - `diagonals: on` (first used by `maths/angles/quadrilateral-proofs`; quadrilaterals only) draws AC and BD dashed with
      the crossing point, and adds their lengths (in two parts from the crossing) to `#gsum`. Values `l` (1 if equal), `u`
      (1 if they cut each other in half), `y` (1 if at 90°). Checks: `"z = 2 and l = 1"`, `"z = 6 and y = 1 and u = 0"`.
  - `widget: bars` (first used by `maths/number/equivalent-fractions`): fraction bars. The top bar is `a` of `b` equal
    parts shaded (sliders or fixed values; b from 1 to 24); an optional second bar `c` of `d` (give both). `hundred: on`
    makes the second a 10 by 10 grid with `c` of 100 squares shaded. `show: decimal, percent` writes each fraction as a
    decimal and/or a percentage too. The panel says whether the two shade the same amount and how (× or ÷ on the top
    and the bottom). Values: `a`, `b`, `c`, `d`, `v` (a/b), `w` (c/d), `e` (1 when equal), `t` and `s` (1 when a/b, c/d
    are in lowest terms), `p` (a/b as a percentage). Checks: `"e = 1 and d = 6"`, `"e = 1 and s = 1"`, `"e = 1"` (grid).
  - `widget: fracadd` (first used by `maths/number/adding-fractions`): two fraction bars `a/b` and `c/d` (sliders or fixed
    values; bottoms 1 to 24) and their sum or difference end to end below, every bar cut into `k` parts (`slider k`, or
    `k: 12`). When `k` is a common multiple of both bottoms the parts can be counted ("1/3 + 1/4 = 4/12 + 3/12 = 7/12");
    otherwise the panel says which bar does not split. `op: + | − | ?` (? gives + and − buttons). A second whole is
    drawn only when a sum is more than 1. Values: `a`, `b`, `c`, `d`, `k`, `e` (1 when k splits both), `l` (1 when k is
    the LCM), `o` (1 or −1), `p` (parts of k in the answer), `r` (its value). Checks: `"e = 1"`, `"e = 1 and l = 1"`,
    `"o = 1 and r = 1 and (b - d)^2 > 0"` (there is no `!=`).
  - `widget: fracarea` (first used by `maths/number/multiplying-fractions`): a unit square with `a` of `b` columns (blue)
    and `c` of `d` rows (orange) shaded; the purple overlap is a/b × c/d. Sliders or fixed values for each. Values: `a`,
    `b`, `c`, `d`, `p` (a × c), `q` (b × d), `v` (the product). Checks: `"a = 1 and b = 2 and c = 1 and d = 3"`,
    `"v = 0.25 and q > 4"`.
  - `widget: percent` (first used by `maths/number/percentages`): a quantity `q` as a bar marked 0% to 100% above and in
    amounts below, with `p`% shaded. `mode: of | increase | decrease` (an increase adds a part past 100%, up to 200%; a
    decrease marks the part taken off). Sliders `p` and `q` (with a step: `slider p: 0, 50, 0, 5`) or fixed values;
    `units: $` goes before amounts, other units after. Values: `q`, `p`, `v` (p% of q), `n` (the new amount; v for
    `of`), `m` (the multiplier). Checks: `"p = 15"`, `"v = 18"`.
  - `widget: square` (first used by `maths/number/squares-and-roots`): a square of side `s` on a grid of unit squares
    (`slider s: 1, 12, 3`, with an optional step such as 0.1, or `s: 6`), its area written as s × s. `target: 43` draws
    a square of that area dashed and says how far off the student's square is, and which perfect squares 43 is
    between; `units: cm`. Values: `s`, `a` (area), `t` (target or 0), `d` (a − t). Checks: `"a = 49"`, `"s = 6.6"`,
    `"a > 30 and a < 40"`.
  - `widget: factortree` (first used by `maths/number/powers`): a factor tree for `number: 36` (and `second: 48`).
    Students click a number that is not prime, or its Split button, then a factor-pair button; primes are circled and
    the panel writes the factorisation with exponents (36 = 2² × 3²). With two numbers, a Venn diagram of their primes
    appears when both trees are finished, with the HCF and LCM. `grown: on` starts finished (each number split by its
    middle factor pair), for pictures and cards. Values: `n`, `k` (primes so far), `c` (1 when finished), `N`, `K`, `C`
    for the second, `h` (HCF) and `l` (LCM) once both are finished. Checks: `"c = 1"`, `"c = 1 and C = 1"`.
  - `widget: area` (first used by `maths/measurement/parallelograms`): `shape: parallelogram | triangle | rectangle` on
    a grid of unit squares, with the base and the perpendicular height (dashed, with a right-angle mark) labelled.
    Sliders or fixed values `b` (base), `h` (height) and `s` (where the top sits: a parallelogram's top-left corner or a
    triangle's apex, measured along from the base's left end; default 2, or b ÷ 2 for a triangle). The top can also be
    dragged along its line (`drag: off` stops it). When the top is past an end, the base is extended (dashed) to meet
    the height. `cut: on` adds **Cut and move** (a parallelogram rearranged into a rectangle) or **Add a turned copy**
    (a triangle doubled into a parallelogram); `cut: shown` starts that way. `slant: on` also labels the left slanted
    side. `units: cm`. Values: `b`, `h`, `s`, `a` (area), `l` (slanted side, 2 dp), `c` (1 while cut or copied), `o` (1
    when the height falls outside the base). Checks: `"c = 1"`, `"s = 0"`, `"b = 8 and a = 24"`, `"o = 1"`, `"a = 18 and s^2 > 0"`.
  - `widget: prism` (first used by `maths/measurement/volume-layers`): a right prism drawn in 3D, `base: rectangle`
    (unit cubes, the top layer orange) or `base: triangle` (a right triangle with legs `l` and `w`, the right angle at
    the front, layer lines on the faces). Sliders or fixed values `l`, `w` and `h` (layers; 0 allowed), whole numbers up
    to 12. `units: cm`; `capacity: on` adds mL or L. Values: `l`, `w`, `h`, `A` (base area), `v` (volume), `c` (mL, with
    cm). Checks: `"h = 5"`, `"v = 24 and h = 2"`, `"v = 1000"`.
  - `widget: circle` (first used by `maths/measurement/parts-of-a-circle`): a circle of radius `r` (`slider r: 1, 6, 2`,
    a step of 0.5 is fine, or `r: 3`) with its centre, radius, diameter, a chord and the circumference named
    (`show: none` gives just r = and d =). `roll: on` adds **Roll it out**: the circle rolls one turn along a line, the
    circumference is laid flat beside three diameters and a bit, and each size goes into a table of d, C and C ÷ d;
    `roll: shown` starts rolled (pictures). `units: cm`. Values: `r`, `d`, `c` (2 dp), `q` (C ÷ d), `o` (1 once this size
    is rolled), `n` (sizes in the table). Checks: `"d = 10"`, `"n >= 3"`, `"r = 2.5 and o = 1"`, `"c > 24.5 and c < 25.5"`.
  - `widget: pythag` (first used by `maths/measurement/pythagoras`): a triangle with sides `a` and `b` (sliders or fixed,
    up to 20) meeting at angle `t` (default 90; `slider t: 60, 120, 90, 5` opens and closes it), with a square on each
    side drawn in unit squares and labelled with its area; the picture rescales to fit. At 90° the panel writes
    a² + b² = c² and c (exact or ≈ 2 dp); otherwise it compares a² + b² with c². `hide: c` hides c's length and area.
    Values: `a`, `b`, `c` (2 dp), `C` (c²), `s` (a² + b²), `t`, `r` (1 acute, 2 right, 3 obtuse). Checks:
    `"a = 3 and b = 4"`, `"c = 10"`, `"r = 1 and C < 20"`, `"(C - 169) * (C - 289) = 0"` (either of two values).
  - `widget: placevalue` (first used by `maths/number/expanded-notation`): place value columns, each with its power of 10
    (10⁰, 10¹, …), a digit 0 to 9 with ▲ and ▼ (drawn also as that many counters) and its value (4 × 1000). `places: 5`
    (2 to 8), `n: 4052` (the start), `shift: on` adds × 10 and ÷ 10 (every digit moves a column), `names: off` hides the
    column names. The panel writes the expanded notation. Values: `n`, `z` (digits that are not 0), `t` (the highest
    power with a digit). Checks: `"n = 4052"`, `"z = 3 and t = 4"`.
  - `widget: bits` (first used by `systems/data/binary-numbers` and `binary-patterns`): binary cards after CS Unplugged,
    each worth double the one on its right and drawn as that many dots (a number from 64 up); click a card to turn it
    face up (1) or down (0). `bits: 4` (1 to 8), `n: 11` or `start: 1011` (the starting pattern), `number: off` hides
    the sum and the number, `count: on` adds − 1 and + 1 (past the largest it overflows to 0), `grow: on` adds Add a card
    and Take away a card (1 to 8), `lock: on` makes the cards a pattern to read. Values: `n` (the number), `c` (cards
    face up), `b` (cards), `m` (largest, 2^b − 1), `o` (1 after an overflow). Checks: `"n = 11 and c = 3"`, `"o = 1"`,
    `"b = 6 and n = 39"`.
  - `widget: decode` (first used by `systems/data/data-as-numbers`): the same numbers read as text (character codes;
    controls show as a dot), grey shades (0 black to 255 white) or sound samples (128 is silence). `numbers: 72, 105, 33`
    (1 to 8, each 0 to 255), `as: text | grey | sound | all` (the starting reading), `switch: off` hides the reading
    buttons, `edit: on` lets students change each number (− and +, or typed), `type: on` adds a text box whose characters
    set the numbers (up to 8; codes above 255 kept as Unicode, unreadable as grey or sound), `table: on` shows a short
    code table. Values: `a`, `b`, `c`, … (the numbers in order), `n` (how many), `u` (largest), `w` (spaces), `r`
    (reading: 1 text, 2 grey, 3 sound, 0 all). Checks: `"r = 2"`, `"a = 89 and b = 101 and c = 115"`, `"n > 2 and w >= 1"`.
  - `widget: pixels` (first used by `systems/data/colour-and-images`): a bitmap grid; sliders set a red, green, blue brush
    (0 to 255; `mode: grey` for one number) and clicking a pixel paints it. `size: 4, 4` (up to 12 × 12), `colour: 255, 0, 0`
    (the brush), `start: white | black` or rows of key letters (`wwww / wrrw / …`), `target:` rows to copy (shown small),
    `key:` extra letters (`o=255,128,0`; defaults w k r g b y), `numbers: on`, `sliders: off`. The panel counts the numbers
    the image needs. Values: `r`, `g`, `b` (brush), `p`, `q`, `s` (the last pixel painted), `m` (1 when it matches the
    target), `n` (numbers in the image), `c` (pixels changed). Checks: `"p = 255 and q = 255 and s = 0"`, `"m = 1"`.
    Compression (first used by `systems/compression/`): `mode: bw` (black or white, a Black and a White button for the
    brush), `rle: on` writes each row's run-length code beside it (bw: run lengths taking turns from white, a leading 0
    when a row starts black; otherwise count × value pairs), `show: codes` shows the target only as its codes (draw the
    picture from them), digits 0 to 9 in `start:`/`target:` are greys from black to white, and `lossy: on` (grey mode)
    shows the start picture compressed with a Tolerance slider (0 to 128; a pixel joins the run before it when within
    the tolerance), the original drawn small beside it. Extra values: `k` (numbers in the codes), `t` (tolerance), `d`
    (pixels that came back different). Checks: `"k = 8"`, `"t = 27 and d = 0"`.
  - `widget: logic` (first used by `systems/data/logic-gates`): switches A and B (buttons, aria-label "Switch A, off, 0")
    feed a gate whose output lights a lamp; a truth table fills in as rows are tried. `gate: and | or | not | xor | adder`
    (a half adder: sum = A XOR B, carry = A AND B, shown as a two-bit answer), `choose: on` (buttons for AND, OR, NOT;
    `all` adds XOR), `view: circuit` (a battery, two switches and a lamp: in a line for AND, side by side for OR),
    `mystery: on` (the gate's name hidden), `table: off`. Values: `a`, `b`, `o` (output, or the adder's sum), `c` (carry),
    `t` (rows tried), `g` (1 AND, 2 OR, 3 NOT, 4 XOR, 5 adder). Checks: `"t = 4"`, `"g = 2 and a = 1 and b = 0 and o = 1"`,
    `"c = 1 and o = 0"`.
  - `widget: sampling` (first used by `systems/data/sound-as-numbers`): a sine wave sampled `rate:` times a wave (2 to 32),
    each sample rounded to one of `levels:` (2 to 256, powers of 2); dots are the stored numbers, steps the playback.
    `waves: 2`, `sliders: rate, levels` (or `none`), `wave: off`, `play: on` (Web Audio: the original tone and the one
    rebuilt from the numbers). Values: `s` (samples a wave), `l` (levels), `n` (numbers stored), `e` (average % off the
    wave). Checks: `"s = 16 and n = 32"`, `"l = 256 and e < 10 and s < 11"`.
  - `widget: network` (first used by `systems/networks/`): four modes. `mode: link`: a laptop and a cable, Wi-Fi or
    mobile link (buttons Cable, Wi-Fi, Mobile; `link:`, `file:` MB, Wi-Fi `distance:` and `walls:` sliders) with speed
    (Mb/s), delay (ms), packets lost (%) and the file's time, from a simple stated model; values `w` (1 cable, 2 Wi-Fi,
    3 mobile), `b`, `l`, `p`, `s` (seconds), `d`, `k` (walls). `mode: packets`: a message (`message:`, `size:` characters
    a packet, `sizes: on` slider) sent as numbered packets through six routers; busy router C is slow and loses packet
    `drop:` once; links can be clicked to break (aria-label "Link C (busy) to E, working…"); `tcp: off`, `choose: on`
    adds a TCP switch; values `n`, `a` (arrived), `o` (out of order), `r` (resent), `k` (complete), `x` (broken links),
    `u` (no route), `t` (TCP), `f` (sends). `mode: snoop`: past a café Wi-Fi where Eve copies packets; Encrypt button and
    Key slider (a shift of letters and digits); values `e`, `s` (key), `v` (Eve could read it), `z` (key leaves digits
    unchanged), `k`, `f`. `mode: journey`: laptop, Wi-Fi, home router, fibre, provider, two routes, shop, with a step log;
    HTTPS button; values `h`, `k`, `r`, `v`, `f`. A Send press counts as using the board. Ready selector for clips:
    `.nwbox` (a horizontal link has no height, so `.nwlink` never counts as visible).
  - `widget: gears` (first used by `engineering/mechanisms/winch`): a motor gear (driver) meshing with a winch gear
    (driven) whose drum lifts a bucket; no friction. `gears: 8, 16, 24, 40` (the kit, one of each), `driver:`, `driven:`,
    `choose: on` (pick both from the kit; the same gear twice is refused), `rpm: 120`, `lift: 200` (g the motor lifts at
    1 : 1), `drum: 0.1` (m a winch turn), `height: 1` (m), `load:` (g), `addload: on` (± 50 g), `limit:` (s; criteria ticks
    when numbers show), `numbers: off` (hide ratio, speeds, capacity and time: students count turns and find the stall),
    `brief: edit` (students set load and limit; the board lists the kit's pairs that meet it). Buttons Turn the motor once
    (orange dots mark a tooth on each gear) and Lift the bucket (stalls when the load is more than it can lift). Values
    `r` (driven ÷ driver), `d`, `g` (teeth), `rpm_w`, `cap_g`, `time_s`, `load_g`, `limit_s`, `turns_m`, `turns_w`, `s`
    (last lift stalled), `l` (last lift worked), `p` (this pair meets both criteria), `n_pass` (pairs that do). Checks:
    `"turns_m >= 1"`, `"s = 1 and load_g > 450"`, `"load_g = 300 and r = 1.5 and l = 1"`, `"n_pass = 1"`. Ready selector `.gearsvg`.
  - `widget: train` (first used by `engineering/mechanisms/trains`): a gear train from the motor to the winch, as for
    `gears` (same `rpm`, `lift`, `drum`, `height`, `load`, `addload`, `limit`, `numbers: off`, `brief: edit`). `train: 8 > 24 = 8 > 40`
    lists the gears by teeth: `>` two gears in mesh, `=` two on one axle (a compound train); `8 > 40 > 24` is a simple
    train with an idler. Starts and ends with a mesh; two gears at most on an axle; six gears at most. `gears:` is the box
    (any number of each). `choose: on` (every gear) or positions from 1 (`choose: 2`, the idler). The panel shows the
    ratio mesh by mesh (`24 ÷ 8 × 40 ÷ 8 = 15`) and which way the winch turns. Values `r`, `r_1`, `r_2` (stage ratios;
    0 with one stage), `n_stage`, `n_mesh`, `same` (1 if the winch turns the same way as the motor), `t_1` … `t_6`
    (teeth), and `rpm_w`, `cap_g`, `time_s`, `load_g`, `limit_s`, `turns_m`, `turns_w`, `s`, `l`, `p` as for `gears`;
    `n_pass` counts trains from the box (changing only the choosable gears) that meet the brief. Checks:
    `"l = 1 and load_g = 600 and t_2 < 40"`, `"load_g = 1500 and l = 1 and time_s <= 40"`, `"load_g > 1000 and p = 1 and l = 1"`.
    Ready selector `.gearsvg`.
  - `widget: lever` (first used by `engineering/mechanisms/levers` and `pulleys`): no friction, weightless bar and
    pulleys. `mode: lever`: a bar on a pivot with a load (a box) and a push (an arrow, down for class 1, up for 2 and 3).
    `length: 2`, `pivot:`, `loadat:`, `effortat:` (m from the left end), `load:` and `push:` (N; push is the most the
    student can push), `move: pivot` (a list of pivot, load, effort, or none: a slider each, `step: 0.1`), `rise: 0.1`
    (m the load lifts), `travel:` (m the hand may move; a criterion), `numbers: off`, `brief: edit` (load, push, travel).
    Push lifts the load (the bar turns about the pivot) or shakes; ± 50 N buttons unless `brief: edit`. Values `f_m`,
    `x_l`, `x_e`, `d_l`, `d_e` (from the pivot), `e_n` (push needed), `m_a`, `k` (class 1, 2 or 3), `load_n`, `push_n`,
    `move_e`, `travel_m`, `l`, `s`, `p`. `mode: pulley`: a top block, a bottom block and `ropes:` holding it (1 to 6;
    `choose: on` with `options:`); the rope pulled goes over the top block, in orange. `load:`, `push:`, `height: 1`.
    Pull lifts the load (the hand moves farther) or shakes; the note says how much rope was pulled even with numbers off.
    Values `n`, `e_n`, `m_a`, `load_n`, `push_n`, `pull_m`, `h_m`, `l`, `s`, `p`, `n_min` (fewest ropes in the options
    that lift it). Checks: `"s = 1 and f_m = 1"`, `"l = 1 and k = 2"`, `"load_n = 900 and l = 1 and n = 5"`,
    `"n = 4 and l = 1 and n_min = 4"`. Ready selector `.gearsvg`.
  - `widget: motion` (first used by `engineering/linkages/`): changing one motion into another, rigid parts, no
    friction. A trace graph on the right (crank and cam). `choose: on` adds sliders (and a cam menu); `numbers: off`
    hides the measurements. Button Turn the crank (or cam) once; any change resets `turns`, so `t = 1` means turned since
    the last change. `mode: crank`: `radius:` and `rod:` (mm; the rod must be longer), `rpm:`, `target:` (stroke in mm);
    the graph is the slider's position. Values `r_mm`, `rod_mm`, `stroke_mm` (2 × radius), `rpm`, `spm`, `turns`, `t`,
    `target_mm`, `p`. `mode: cam`: `cam: eccentric | pear | snail | heart`, `lift:` (mm, up to 30), `base:`; the graph is
    the follower's height (a displacement graph). Values `c` (1 to 4 in that order), `lift_mm`, `dwell`, `drop`, `turns`,
    `t`. `mode: linkage`: a four-bar linkage, `crank:`, `coupler:`, `rocker:`, `ground:` (mm), `swing:` (degrees, a
    criterion); the coupler's path is traced; a crank that cannot turn fully stops with "Jammed". Values `a_mm`, `b_mm`,
    `c_mm`, `d_mm`, `g` (shortest + longest ≤ the other two), `full` (the crank turns all the way, found by trying every
    degree), `swing` (rocker degrees, 0 if not full), `jam`, `turns`, `t`, `p`. Checks: `"stroke_mm = 60 and t = 1"`,
    `"c = 3 and t = 1"`, `"a_mm = 55 and jam = 1"`, `"full = 1 and swing >= 100 and t = 1"`. Ready selector `.gearsvg`.
  - `widget: pcb` (first used by `engineering/pcb/`): a teaching model of a PCB tool on a 2.54 mm grid (one cell),
    through-hole pads on both layers. `grid: 20, 12`; `part R1: resistor at 6,3 turn 1` (footprints resistor, diode,
    led, cap, button, transistor, dip8, header2 to header8; the cell of pad 1; quarter turns); `net GND: J1.4, R2.2`
    (net names start with a letter); `edge:` and `fixed:` (part lists); `target:` (ratsnest mm); `trace GND: bottom
    0,5 0,6 via …` (prepared copper; `via` switches layer at the last cell); `current MA: 1.5` (A); `squeeze: MA` (nets
    whose path passes between header pins, 0.4 mm at most). Clicks act on cells (or focus the board, arrow keys and
    Enter). `mode: layout`: click a pad to light its net, click a part then an empty cell to move its pad 1 there,
    Rotate; dashed ratsnest lines (Prim's shortest joins); values `rat_mm`, `inside`, `overlap` (parts need an empty
    cell between them), `edge_ok`, `p`, `sel_k` (selected net, 1 = first listed), `sel_pins`, `moves`. `mode: route`:
    click a pad (or a trace) to start, then one neighbouring cell at a time; a step onto another net is refused (a
    short); Switch layer (a via while drawing), Undo; values `routed`, `n_nets`, `done`, `vias`, `len_mm`, `bot_mm`,
    `sel_k`. `mode: rules`: a width menu per net with a `current:` (and a path menu for squeezed nets); safe currents
    0.25 mm 0.8 A, 0.5 mm 1.4 A, 1 mm 2.4 A, 1.5 mm 3.2 A, 2 mm 3.9 A (IPC-2221, 1 oz, outer, 10 °C, rounded down);
    values `n_fail`, `n_net`, `w_<net>`, `ok_<net>` (lower case). Checks: `"sel_k = 5"`, `"p = 1"`,
    `"done = 1 and bot_mm = 0"`, `"done = 1 and len_mm <= 100"`, `"n_fail = 0 and w_ma >= 1"`. Ready selector `.pcbsvg`.
  - `widget: truss` (first used by `engineering/structures/`). `mode: truss`: a pin-jointed frame solved by the
    stiffness method (equal stiffness, so spare members work; a singular matrix means it collapses). `joint A: 0, 0 pin`
    (metres; `pin` or `roller` supports; single capital letters), `member: A-B, A-C`, `load C: 1000 down` (up, left,
    right; several allowed; the first sets `load_n`), `strength:` (most pull, N), `buckle:` (push that buckles a 1 m
    member; a member L m long buckles at buckle ÷ L²), `edit: on` (click or Enter on a joint, then another, to add or
    remove a member), `raise C: 1, 4` (a height slider), `cost:` ($ a metre) and `budget:`, `numbers: off`. Buttons
    Test it and Load until it fails (forces scale to the failure load; the first member to go is dashed). Blue pulls,
    red pushes, thickness grows with force. Values `stable`, `n_m`, `n_j`, `fail` (99 when it collapses), `max_t`,
    `max_c`, `load_n`, `cost`, `fail_load`, `tested`, `h_<joint>`, `f_ab` (+ pull, − push). `mode: beam`: a pine beam
    on two supports, `span:` (m), `load:` (N), `at:` (m from the left), `shape: flat | edge | ibeam | tube` (about the
    same wood; `choose: on` gives a menu), `move: on` (load position slider), `limit:` (mm of sag); ± 5 N buttons.
    Values `r_a`, `r_b`, `defl_mm`, `i_mm4`, `area_mm2`, `s` (1 to 4), `ok`, `load_n`, `at_m`. Checks:
    `"stable = 1 and n_m = 9 and tested = 1"`, `"stable = 1 and fail = 0 and cost <= 300 and fail_load >= 1400"`,
    `"ok = 1 and area_mm2 <= 90"`, `"r_a = 8"`. Ready selector `.trsvg`.
  - `widget: circuit` (first used by `engineering/circuits/`): parts wired to a micro:bit's pins, from a simple stated
    model (pin 3.3 V, LED drops 2 V and is damaged above 20 mA, analog read 0–1023 for 0–3.3 V). `mode: led`: pin 0 →
    resistor → LED → GND; `resistor:` (ohms, 0 = none), `place: after`, `output: off`, `gnd: off`, `turned: on`, and
    controls `pinbtn: on`, `unclip: on`, `choose: on` (a resistor list), `quick: 0, 220, 1000` (a button each, named
    "Use a 1 kΩ resistor" / "Take the resistor out"), `move: on`, `flip: on`; `numbers: off` hides the current. Values `k`
    (complete loop), `o`, `i` (mA), `r`, `b` (resistor before the LED), `f` (LED turned round), `w`, `c` (pin and GND wires
    unclipped), `l` (lit), `x` (over 20 mA). `mode: button`: 3V → button → pin 0 with a 10 kΩ pull-down (`pulldown: off`,
    `toggle: on`); Hold the button (pointer or Space); the micro:bit shows a heart while pin 0 reads 1, and a floating pin
    reads at random; values `p`, `v`, `n` (presses), `d`, `z` (floating seen). `mode: sensor`: `sensor: pot | light` in a
    divider into pin 0, `level:` (%), a slider; `night: on` lights the display below `threshold:` (`threshold: edit` adds a
    slider), `volts: off`, `numbers: off`; values `a` (reading), `u` (volts), `s` (%), `t`, `l`. Ready selector `.cksvg`.
  - `widget: arduino` (first used by `engineering/arduino/`): an Uno running a sketch in an editor, with Upload and run,
    Stop and Reset code. Not a compiler: a C++ subset turned into JavaScript and run against a model with simulated time
    (so `delay` timings are exact). Supports `setup()`/`loop()`, own functions, int/long/float/bool/byte/const, if/else/
    for/while, pinMode, digitalWrite/Read, analogRead (0–1023 for 0–5 V), analogWrite, delay, millis, map, constrain,
    Serial.begin/print/println. Behaves like the real board for what lessons teach: a missing `;` or an undeclared name
    stops the upload (naming the line), `=` in an if assigns, HIGH without pinMode OUTPUT glows dimly (pull-up),
    `"words" + n` moves along the text, analogWrite keeps the low 8 bits and is on/off on non-PWM pins, nothing prints
    before Serial.begin. Setup: `led: 13` (or `13, 9`), `knob: A0`, `level:` (%), `button: 2`, `wave: on` (draw each LED
    pin's signal), `edit: off`, `run: on`, then the sketch as `code:` lines (indentation is rebuilt from the braces; no
    `#` lines, which the setup format reads as comments). Values `e`, `g`, `l`, `h`, `o`, `f` (ms), `t`, `s`, `m`, `w`,
    `n`, `p`, `j`, `x`, `k`, `b` (the widget's header lists them). `test: 250, on` lines (a knob reading, and the first LED
    `on` steady, `off` or `blink`) add **Run the tests**: each case runs on a fresh board for 3 s of board time with no
    waiting, and the monitor lists ✓ and ✗; values `q` (passed) and `u` (cases). Ready selector `.ardsvg`.
  - `widget: breadboard` (first used by `engineering/arduino/breadboard`): a breadboard beside an Uno's 13, 12, 9, 5V and
    GND terminals. Each numbered column's a–e holes are one strip, f–j another, and the rails (`t+3`, `t-3`, `b+3`, `b-3`)
    run the board's length. `cols: 17`, `pin: 13` (taken as HIGH), `part LED: led, c7, c8` (anode first), `resistor`,
    `wire`, `button` (Hold B1); `lock: W1, R`. Click a hole to light everything joined to it; click a leg's dot then a
    hole to move it, or use Move [leg] to [hole]. Values `l` (first LED lit), `r` (a resistor in its loop), `x` (no
    resistor), `z` (pin or 5V straight to GND), `v` (would light turned round), `y` (both legs in one strip), `q` (holes
    looked at), `m` (legs moved), `p` (button held). Ready selector `.bbsvg`.
  - `widget: motor` (first used by `engineering/power/`): a stated model (pin about 20 mA, 40 at most; a 6 V gear motor
    150 mA running, 700 starting). `mode: pin`: pin 9 drives a motor straight or through a transistor and battery
    (`wiring: direct | transistor`, `choose: on`, `diode: on`, `toggle: on`); values `w`, `o`, `i`, `n`, `m`, `x` (pin
    overloaded), `f` (diode), `z` (switch-off spike seen). `mode: hbridge`: IN1, IN2 and an ENA slider (0–255); values
    `a`, `b`, `e`, `d` (1, −1, 0), `s` (%), `k` (braking). `mode: ground`: `ground: off`, `supply: board`; Start the
    motor; values `g`, `p`, `m`, `r` (Uno resets), `t` (started). `mode: battery`: six typical packs (`battery: aa4 |
    nimh4 | nimh6 | pp3 | lipo2 | lipo2b`), `draw:` (mA), `need:` (minutes), `volts: 6, 9`, `grams:`, `derate: on` (use
    80%); values `v`, `c`, `i`, `t` (minutes), `q` (grams), `p` (meets every criterion), `u` (usable %). Ready selector `.mtsvg`.
  - `widget: fab` (first used by `engineering/cad/` and `engineering/parametric/`): sizes in mm. `mode: box` (top view;
    `width`, `depth`, `wall`, `object: 68.6, 53.4` or `none`; values `w`, `d`, `t`, `a`, `b` inside, `g` smallest gap),
    `mode: fit` (peg in a printed hole; `peg`, `hole`, `shrink: 0.2`, `grow: 0.1`; values `p`, `h`, `c` clearance, `f` 0
    won't go in, 1 press, 2 sliding, 3 loose), `mode: orient` (an L-bracket four ways round; Try the next way round;
    values `o`, `s` supports, `k` layers along the load), `mode: slicer` (a 40 × 40 × 20 block; `layer`, `infill`,
    `walls`; values `l`, `i`, `w`, `t` minutes, `g` grams, `s` strength, `q` finish), `mode: param` (outside = part +
    2 × (clearance + wall); `part`, `clearance`, `wall`; values `u`, `c`, `t`, `o`, `n`), `mode: kerf` (laser slot =
    drawn + kerf; `board`, `slot`, `kerf`; values `d`, `k`, `c`, `f`). Sliders are labelled for tests ("Hole drawn
    (mm)"). Ready selector `.fbsvg`.
  - `widget: security` (first used by `systems/security/`): five modes. `mode: os`: apps (Video call, Notes, Game) ask
    the OS, which uses a driver per device; Swap webcam, Swap storage, Install/Remove driver (webcam B; `driver: on`), and
    a Game camera permission; values `c`, `s`, `d`, `o` (last request worked), `g`, `q`. `mode: dns`: an address bar
    (label Address, `#scaddr`; `address:` prefills) and fixed names (school.edu.au 203.0.113.10, library.school.edu.au
    203.0.113.20, weather.example 192.0.2.44, lookalike schoo1.edu.au 198.51.100.66: example ranges only), steps and a
    router table; values `f`, `k`, `r` (real school), `l` (lookalike), `x` (row). `mode: access`: sign in (practice
    accounts Sam maple, Ms Lee orbit, Admin quartz-river-71; MFA code 4096), Read/Change buttons per file, a permissions
    table (`perms: 210 / 220 / 112`, rows Students/Teachers/Admins, columns Homework/Marks/Settings, 0 none 1 read 2 read +
    change; `edit: on` makes cells clickable; `mfa: on`); values `a`, `u`, `m`, `o`, `t`, `z` (wider than the least
    privilege table), `e` (narrower). `mode: hash`: a password box (`#scpw`), its SHA-256 shown short (the browser's, or a
    built-in copy where `crypto.subtle` is missing, as in clips), `salt:` shows an "Add each user's salt" switch, `leak
    name: 12-hex` lines list stored hashes (a matching row lights); values `n`, `m`, `d` (digits changed), `s`, `w`
    (words). `mode: keys`: Bob locks with Alice's padlock, his own or none (`lock:`), Send; values `l`, `k`, `v`, `f`.
  - `widget: hardware` (first used by `systems/hardware/`): a spec sheet (processor cores 2–32 and 2–4 GHz, RAM 4–128 GB,
    storage 128 GB–4 TB SSD or HDD, network 50 Mb/s–10 Gb/s, graphics card) and jobs to run (`jobs: tabs, video, game,
    download, ai, photos`, `job:`; `jobs: none` for a spec sheet only). Run shows each part's seconds as bars, the longest
    in red (the bottleneck). Simple model, times add up: processor work ÷ (cores the job can use × GHz), RAM shortfall
    swapped to storage, storage MB ÷ 100 (HDD) or 2000 (SSD) MB/s, network MB × 8 ÷ Mb/s, AI on the graphics card if
    present. `device: phone | laptop | server | old` or a line `device A: 8 3 8 ssd 1024 50 0` (cores, GHz, RAM, type,
    size, Mb/s, graphics; one letter shows as "Option A"); `devices:` buttons; `pick: none` or a list of cpu, ram,
    storage, network, gpu; `explain: on` adds "What does it measure?" per row; `budget:`, `target:`. Values `t` (seconds;
    0 before a run), `u` (1 if that run matches the specs shown: use it in every time check), `b` (bottleneck 1–5), `c`
    cost, `k`, `g` (GHz × 10), `r`, `s` (SSD), `z`, `n`, `h`, `j` (job 1–6), `f` (fits), `x` runs, `y` jobs run, `w`
    devices run, `v` device shown, `m` parts changed from the start, `p` rows explained.
  - `widget: gates` (first used by `systems/logic/`): three modes. `mode: build`: switches (`inputs: A, B`, up to 4),
    gates and output lamps (`outputs: Q`, up to 3); wire by clicking a "from" ● (label `Wire from A`, `Wire from gate 1
    (AND)`) then a "to" pin (`gate 1 (AND) input 1`, `Output Q`); clicking a wired "to" pin with nothing chosen unplugs
    it; loops are refused. `gate g1: and A B` prewires (and, or, not, nand, nor, xor; names g1, g2, …), `wire Q: g1`,
    `add: and, not` gives Add buttons (`max:` 6), `lock: on` fixes the wiring, `target Q: 0110` (rows count up from all
    0s, first input the biggest bit), `table: all | tried | off`. Values `a`–`d` switches, `o`, `p` outputs now, `m` rows
    matching, `r` rows, `k` (all match, nothing unplugged), `g`, `w`, `u` unplugged, `n` (all NAND), `t` rows tried, `j`
    depth. `mode: adder`: bit switches for A and B (`bits:` 1–8, `half: on`, `a:`/`b:` start), a full adder per place
    with carries; values `a`, `b`, `s`, `c` last carry, `z` places that carried, `o` overflow, `y` sums tried.
    `mode: latch`: an SR latch of two NOR gates (switches `Reset (R)`, `Set (S)`), `register: 4` adds data switches,
    Store and the stored bits; values `s`, `r`, `q`, `h` (holding a 1 with both off), `f` (both on tried), `k` changes,
    `d`, `v` stored, `w` stores.
  - `widget: cpu` (first used by `systems/logic/processor`): 16 memory cells and a processor (PC, IR, ACC); Clock tick
    (one phase of fetch, decode, execute), Whole instruction, Run, Reset. `program: LOAD 6; ADD 7; OUT; HALT` from cell 0,
    `data: 6=5, 7=3`, `edit: on` (cells are text boxes labelled `Memory 0`…; type `ADD 7` or a number, Enter), `expect:
    2, 4, 6`, `watch: 9`. Instructions are numbers (operation × 16 + address): 0 HALT, 1 LOAD, 2 ADD, 3 SUB, 4 STORE,
    5 JUMP, 6 JZ, 7 OUT; numbers wrap at 256; stops after 600 ticks. Values `p`, `a`, `t` ticks, `i` instructions, `h`
    halted, `o` last output (−1 none), `n` outputs, `x` (halted with exactly the expected outputs), `v` watched cell, `e`
    error, `q` cells typed, `f` phase.
  - `widget: webdoc` (first used by `systems/web/`): a web page as content, structure and presentation, drawn in a
    shadow root (student HTML is cleaned: no scripts, frames or event attributes). `doc: club | messy` (the same words
    with headings, a list and landmarks, or faked with font, b and br), `compare: on` (Page A / Page B), `styles: plain,
    ocean, poster` (buttons; the first starts), `edit: css | html | both` (text boxes "Style sheet (CSS)", "Page
    (HTML)"), `pages: on` (two more pages of the site share the style sheet), `reader: off`. Buttons: Style sheet,
    Show structure (tag outlines), Screen reader (announces headings, links, lists, landmarks), Phone width. Values `o`,
    `e` (structure shown once), `p`, `y`, `n` styles tried, `c`/`t` CSS/HTML edits, `u` structure unchanged, `d` words
    unchanged, `w` looks different, `a` h1 colour changed, `f` h2 px, `g` background changed, `r`, `v`, `h` headings,
    `l` lists, `k` landmarks, `b` look-only tags, `x` (2+ headings, a list, no look-only tags), `j` pages heard.
  - `widget: shell` (first used by `systems/shell/`): a pretend Linux terminal (input labelled "Command"; Enter runs, Up
    and Down for history, Tab completes) over a pretend filesystem. `fs: school | hunt | empty`, `file: /path | text\nmore`,
    `dir: /path`, `start: /home/sam`, `tree: on | all` (folder tree beside it), `run: ls; cd x` (run silently first).
    Commands: help, pwd, ls [-a] [-l], cd, cat, grep [-i] [-c] [-v] [-n], wc [-l] [-w], sort, uniq, head [-n N], echo,
    touch, mkdir, cp, mv, rm [-r], chmod (644 or u+x/o-r/a+w), whoami, history, clear; pipes and > or >>. The user is
    sam; files have an owner and read/write/run for owner and everyone else (groups are shown but not checked); sudo
    is refused. Values `w` (at the folder named by `at:`), `s` (the `find:` file's contents shown), `x` (`exists:`
    path exists), `z` (`gone:` path deleted), `m` (`watch:` file's permissions as digits), `k` (others may read it),
    `o` last output as a number, `l` its lines, `u` used a pipe, `p` used > or >>, `e` last command failed, `n`
    commands, `h` different commands, `a` used ls -a, `g` used grep, `c` cd count, `d` folder depth. Clips type with
    `type: { into: Command, text: ls }` then `press: Enter`.
  - `widget: cyber` (first used by `systems/cyber/`): defensive cyber safety and privacy on a made-up club app; every
    choice button is labelled "<row>: <option>" (row is the account, field, point, or a card's first 30 characters).
    `mode: breach` (`set: same | mixed`, `manager: on`; Leak!; values l, f, r, c, m), `mfa` (factors None, SMS code,
    App code, Security key; `fake: on`; Attempt; values t, i, b, n, k, p, e), `inbox` (`set: easy | tricky`: Safe or
    Report and Check link, values a, w, t, n, c; `set: newsletter`: Fix buttons, values g, n, a), `footprint` (`set:
    club | excursion`: Needed or Not needed, values k, n, x, e, s; `set: collects`: given or collected as used, values
    k, n, p, q; `set: settings`: values s, n, f), `threat` (`set: login | photos | messages`: risk and defence per
    point, values d, r, n, w), `weakness` (`set: kinds` kind only, default six cards, `set: club`; values t, f, n),
    `privacy` (APP and meets or breaches, `fix: on` adds a change per breach; values a, b, n, c; `set: notice` writes
    the APP 5 notice, values g, n, a), `review` (Inspect, then three fixes per weakness, the wrong ones say why; a
    fully fixed section shows its flag; values x, n, s, w). Full value lists are in the widget's header comment.
  - `widget: shapes` (first used by `systems/data/shapes-as-numbers`): `mode: vector` draws `shape:` lines (circle x y r,
    rect x y width height, triangle x1 y1 x2 y2 x3 y3, then a colour) on a 100 by 100 page twice, as a vector and as a
    bitmap (`grid: 8 | 16 | 32 | 64`, or `grid: 32 fixed`), with Zoom buttons ("Zoom 8×") and grid buttons ("Bitmap grid
    64"); `edit: on` gives inputs labelled "Shape 2 r"; `target:` shapes split by `;` are drawn dashed (m = 1 on a
    match); `view: both | vector | bitmap`. Values z, g, v (vector numbers), b (bitmap numbers), s, m, c. `mode: mesh`
    (`shape: cube | pyramid | prism`): a 3D model as corners and faces, Turn left and Turn right, inputs "Corner 5 y";
    values n, f, k (numbers stored), h, w, p (1 when the cube's top four corners meet), t, c.
  - `widget: encode` (first used by `systems/ctf/`): `mode: send` writes `message:` as plain text, binary, hex, base64
    and Encrypted (a key-word Vigenère; input "Key word"), Send buttons "Send as Hex", and Eve tries every public
    decoder; `shared:` is Ava's key word. Values f (0 plain to 4 encrypted), e (Eve can read it), l, q (key matches
    shared), s. `mode: decode` undoes `data:` one layer per button ("Decode as Base64", "Decode with the key word", Undo);
    `plain:` gives d = 1 on a match (leave it out for flags). Values d, u, w, r. `#` can't appear in data (it starts a
    comment).
  - `widget: source` (first used by `systems/ctf/`): a made-up page and what it gives away. `set: club | signup |
    archive`; `mode: find` (View source, Photo details, buttons "Line 4: mark as a leak") or `mode: fix` (three fixes per
    leak, labelled "Line 2: <fix>", wrong ones say why). Values v, p, l (leaks marked), n, x (wrong lines marked), f, w.
  - `widget: netctf` (first used by `systems/networks/ctf`): four network puzzles. `mode: capture` (six packets from club
    devices, "Open packet 3"; plain ones are readable; `fix: on` adds two fixes per plain device, labelled "Room 12
    display: Switch it to HTTPS"; values o, r, n, u, w), `reorder` (`secret:` the message in base64, `size:`; buttons
    "Move packet 4 earlier"; values s, m, n), `lost` (`packets: 16`, `missing: 11`; values n, a), `route` (routers A to
    H with link delays, E overloaded; buttons "Router C", Clear; values v, t, b, p).
  - `widget: rounding` (first used by `maths/number/rounding` and `estimating`): `mode: round` (default) puts `x` on a number line
    between the two numbers with `d` decimal places (sliders or fixed; `d` 0 to 4), with the halfway mark; values `x`, `d`,
    `r` (rounded), `l`, `h` (the line's ends), `m` (halfway); checks `"d = 2 and r = 3.75"`. `mode: estimate` shows a op b
    (`op: ×` `+` `−` `÷`; sliders `a`, `b`), each rounded to its first digit, the estimate and the exact answer as two
    bars; values `a`, `b`, `p`, `q` (rounded), `s` (estimate), `v` (exact), `o`; checks `"s = 2000 and v < 2000"`.
  - `widget: ratio` (first used by `maths/number/ratios`, `equivalent-ratios`, `sharing-in-a-ratio`): `mode: tape` draws a row of
    blocks per term (`a`, `b`, optional `c`; sliders or fixed) and `slider k:` copies of the ratio, with part to part and
    part to whole written; `mode: share` draws one bar of a + b (+ c) equal parts for `total` (slider or fixed; `units: $`
    or kg, L), with one part and each share. `labels: red, blue` names the terms. Up to 48 blocks in a row, 40 parts.
    Values (single letters): `a b c k`, `p q r` (terms times k), `t` (parts), `g` (common factor), `s` (1 if simplest),
    `w` (total), `u` (one part), `x y z` (shares). Checks: `"p = 6 and q = 9"`, `"a = 2 and b = 3 and s = 1"`, `"w = 60 and y = 36"`.
  - `widget: transform` (first used by `maths/angles/translations`, `reflections`, `rotations`): a shape (`shape: 1,1; 3,1; 3,2`,
    3 to 6 corners called A, B, C…) and its image on the coordinate plane (`range: 8` is the axes' half-width). `mode: translate`
    (`slider dx:` and `slider dy:` as min, max, start[, step], or fixed `dx: 3`), `mode: reflect` (buttons Reflect in the x-axis,
    Reflect in the y-axis and Show the original only, or `axis: x | y`), `mode: rotate` (`slider t: 0, 360, 0, 90`, anticlockwise
    degrees; `centre: 1, 0`). `show: none` hides the rule line. Values: `dx dy`, `m` (0 none, 1 x-axis, 2 y-axis), `t`, and
    points `A B C…` for the IMAGE corners. Checks: `"x(A) = 4 and y(A) = -1"`, `"m = 1"`, `"t = 270 and x(B) = 1"`.
  - `widget: net` (first used by `maths/angles/nets`): `mode: cube` is a grid (`grid: 6, 4`) where students press squares to build a
    net (`cells: 1,0; 0,1; …`, x,y with y down; at most 8 squares); the board rolls a cube over it, colours each square by the face
    it lands on and says whether it folds. Values `c` (squares), `f` (1 if it folds), `d` (different faces). `mode: prism` is the net
    of a triangular prism on a right triangle (`slider a: 1, 10, 3`, `slider b:`, `slider L:` or fixed `a: 3`; `units: cm`): values
    `a b L`, `c` (hypotenuse), `A` (net area = surface area), `v` (volume). Checks: `"f = 1 and c = 6"`, `"a = 3 and b = 4 and A > 90"`.
  - `widget: views` (first used by `maths/angles/views`): piles of cubes on a `size: 3` base (2 to 4), drawn isometrically and as
    the top, front and side views. `start: 2,1,0; 0,1,0; 0,0,3` (rows from the back, left to right), `max: 4` (tallest pile),
    `numbers: on` (heights on the top view), `hide: iso | views`. Students press a cell to add a cube (back to 0 after the tallest).
    Front view looks at the front row; side view from the right. Values `n` (cubes), `h` (tallest), `t`, `f`, `s` (squares in the
    top, front and side views). Checks: `"t = 4 and f = 5"`, `"n = 12 and t = 4 and h = 3"`.
  - `widget: composite` (first used by `maths/measurement/composite-shapes`, `irregular-shapes`): `mode: shape` draws a polygon
    (`corners: 0,0; a,0; a,3; 3,3; 3,6; 0,6`, numbers or slider letters, `slider a: 4, 10, 8`) on a unit grid with its side
    lengths (`hide: 3, 4` writes ? on those sides, counted from corner 1); `split: on` adds Cut across, Cut up and down, Take
    away from a rectangle and No cuts, which name each piece (rectangle, triangle, trapezium) and its area. Values `A`, `P`,
    `k` (0 none, 1 across, 2 up and down, 3 take away), `n` (pieces) and the slider letters. `mode: estimate` puts an irregular
    shape (`blob: lake | leaf | island`, `size: 8`) on a grid: Count the squares (full green, part orange), Finer grid and
    Coarser grid (1, 0.5, 0.25), and `slider n:` straight pieces round the edge for the perimeter. Values `g`, `f`, `p`, `e`
    (full + half the part, times one square), `t` (measured area), `c` (1 once counted), `n`, `l` (pieces' length), `m`
    (measured perimeter); the measured values show on the finest grid. Checks: `"k = 3 and A = 60"`, `"c = 1 and g = 0.25"`.
  - `widget: circlearea` (first used by `maths/measurement/circle-area`): a circle (`slider r:` or `r: 3`) cut into `n` slices
    (even, 4 to 64); `cut: on` adds Rearrange the pieces (alternately up and down: nearly a rectangle πr by r) and Put the
    circle back (`cut: shown` starts rearranged); `squares: on` adds Compare with squares (the 4r² and 2r² squares and one r²).
    Values `r`, `n`, `a` (πr²), `c` (2πr), `w` (πr), `k` (1 while rearranged), `s` (1 while the squares show).
  - `widget: timezone` (first used by `maths/measurement/time-zones`): `cities: Sydney +11; London +1` (2 to 4, UTC offsets) on
    24-hour lines at the same moment, `slider t:` the first city's time in hours (9.5 is 9:30), `day: Monday`; `flight: on`
    adds `slider f:` (hours; default 0.5 to 24) and marks the landing in the last city. Values `t`, `u v w` (other cities'
    times), `x y z` (their day compared with the first: −1, 0, 1), `f`, `a` (landing time), `b` (landing day). Checks:
    `"v = 9 and y = 0"`, `"a >= 9 and a <= 12"`. The prism board's `capacity: on` now also takes `units: m` (litres).
  - `widget: longdiv` (first used by `maths/real-numbers/recurring-decimals`): a/b divided out step by step (remainder × 10,
    digit, new remainder), the decimal with a bar over the repeating block; `slider a:`/`slider b:` or fixed (b 2 to 60);
    `factors: on` adds the simplest form and the denominator's primes with the 2s-and-5s rule. Values `a`, `b`, `t` (1 if it
    terminates), `p` (block length), `d` (digits before the block), `s` (simplified denominator), `f` (1 if only 2s and 5s).
  - `widget: zoomline` (first used by `maths/real-numbers/irrational-numbers`): find `number:` (sqrt2, sqrt3, sqrt5, sqrt6, sqrt7,
    sqrt8, sqrt10, pi, phi or a fraction like 1/7) by pressing the tenth of the line it is in, zooming ten times each time
    (`places: 4`, `from: 0`; `found: 2` starts with that many found, for pictures). Wrong presses get the squares of the ends (roots)
    or too big/small. Values `k` (right presses), `w` (wrong), `d` (1 when done). Pieces are labelled "Between 1.4 and 1.5".
  - `widget: indexlaws` (first used by `maths/real-numbers/index-laws`): powers as rows of factor chips. `mode: product | quotient |
    power | zero`, sliders `a` (base), `m`, `n` (quotient keeps m ≥ n; zero sets n = m), `result: off`. Values `a m n`, `k`
    (resulting index), `v` (its value).
  - `widget: money` (first used by `maths/number/percentage-change`, `money-models`): `mode: change` (q, then changes `a` and `b`
    in %, as bars with multipliers; values `q a b x y`, `m` overall multiplier, `c` overall % change) or `mode: tax` (`slider i:`
    income, `brackets: 18200: 0; 45000: 15; 135000: 30; 190000: 37; 45`; values `i`, `t` tax, `e` effective %, `r` marginal %,
    `n` after tax). `units: $` (default).
  - `widget: rate` (first used by `maths/number/rates`): a double number line, `top: km, distance` over `bottom: h, time`, with
    `rate: 60` or `slider r:`, `slider x:` (the bottom amount; the line runs to its max), the unit rate dashed. `compare: 75, Car B`
    (and `name: Car A`) adds a second line; `base: 4.2` adds a fixed starting amount (top = base + rate × x); `money: top` writes
    dollars (automatic when a unit is `$`). km over h also gives the rate in m/s. Values `r`, `x`, `y` (base + r × x), `c`
    (the compared amount), `q`, `b`, `m` (m/s). Checks: `"r = 75 and x = 2"`, `"y = 460"`, `"m = 25"`.
  - `widget: congruence` (first used by `maths/angles/congruent-triangles`): a triangle built from given parts on base AB,
    drawing every triangle they allow (none, one, or two for SSA). `test: SSS | SAS | ASA | AAS | RHS | SSA | choose`
    (`choose` adds a "Give SSS" button for each). Parts are sliders or fixed values, sides `p`, `q`, `r` and angles `s`, `t`
    (defaults: sides 1 to 12 in halves, angles 10° to 170° in 5s), named by the test: SSS AB, AC, BC; SAS AB, AC, angle A;
    ASA AB, angles A, B; AAS BC (opposite A), angles A, B; RHS AB and hypotenuse BC = `r`; SSA AB, BC, angle A. Values `n`
    (0, 1 or 2 triangles), `k` (1 if the test always fixes the triangle, 0 for SSA), `p`, `q`, `r`, `s`, `t`. Sliders say
    "Make side q smaller", "Make angle s bigger". Checks: `"n = 2"`, `"p = 6 and r = 10"`.
  - `widget: similar` (first used by `maths/angles/similar-shapes`): `shape: triangle` (`sides: 3, 4, 5`, `slider k:` or
    `k: 2`, `hide: y` writes ? for that copy side; values `k`, `a`, `b`, `c`, copy sides `x`, `y`, `z`) or `shape: rectangle`
    (`first: 4, 2`, `slider w:` and `slider h:`; values `w`, `h`, `s` 1 if similar, `c` 1 if congruent, `k` the scale
    factor if similar). Sliders say "Make the scale factor bigger", "Make the width bigger". Checks: `"k = 2"`, `"y = 12"`,
    `"s = 1 and c = 0"`.
  - `widget: space3d` (first used by `maths/angles/3d-coordinates`): x, y and z axes in isometric view (`size: 6`, 2 to 10)
    with a point P set by `slider x:`, `slider y:`, `slider z:` (or fixed), its path from the origin dashed. `target: 3, 2, 4`
    draws a ring Q; `box: on` draws the box from the origin to P. Values `x`, `y`, `z`, `d` (1 on the target), `v` (the box's
    volume). Use a height near 680. Checks: `"d = 1"`, `"v = 24"`.
  - `widget: events` (first used by `maths/data/complementary-events`): the sample space of `first:` and optional `second:`
    (each `dice`, `dice 4` to `dice 12`, `coin`, or a list of equally likely outcomes `red, blue, green`; `names:` renames
    them), drawn as a row, a grid (`view: grid`) or a tree (`view: tree`, at most 16 outcomes; `both` adds a switch button).
    `show: sum` labels two dice by their total. Students click outcomes to make event A (`choose: off` stops them);
    `event:` and `target:` are rules over `a`, `b` and `s` (the sum) with `and`, `or`, `not`, `=`, `<`, `>`, `%` and outcome
    names as words (`a = H and b % 2 = 0`). `complement: on` adds Show not A (`shown` starts it shown); `trials: on` adds
    Run 1 to 1000 and a frequency table (`seed:` for clips). Values `n` (in A), `m` (all), `p`, `q` (not A), `k` (not A
    shown), `r` (A matches the target), `u` (trials), `c`, `f` (relative frequency of A), `e` (|f − p|). Checks: `"r = 1"`,
    `"n = 9 and k = 1"`, `"u >= 1000 and e < 0.04"`.
  - `widget: venn` (first used by `maths/data/two-way-tables`): `labels: Sport, Music` and `counts: 12, 8, 5, 5` (A only, both,
    B only, neither) as a Venn diagram and a two-way table with totals (`show: venn | table | both`). Students choose regions
    by clicking either, or with buttons named "Sport only", "Sport and Music", "Music only", "Neither"; `event: a or b` (a,
    b, a and b, a or b, not a, not b, a only, b only, neither, all; join with +) chooses at the start. `blank: table` or
    `blank: venn` turns the four counts into boxes to fill from the other picture. Values `x`, `y`, `z`, `w` (A only, both,
    B only, neither chosen), `n`, `t`, `p`, `k` (every box right). Checks: `"x = 1 and y = 1 and z = 1 and w = 0"`, `"k = 1"`.
  - `widget: sample` (first used by `maths/data/collecting-data`): a made-up school of 200 students (four year groups of
    50, the same every time; sleep falls and sport drops with year level) and samples from it. `measure: sport | sleep`,
    `method: random | systematic | stratified | convenience | census | choose` (buttons "Use simple random sampling" ...;
    convenience is the front rows, Year 7), `slider n:` or `n:`, `population: hidden` (a Show the population button),
    `plot: results | values` (each sample's result, or this sample's values), `seed:`, `start:` (samples already taken, for
    pictures). Buttons Take a sample, Take 10 samples. Changing n or method clears the results. Values `n`, `s` (samples
    with these settings), `p`, `m`, `d`, `w` (this sample's proportion, mean, median and range of sleep), `q`, `a` (the
    population's proportion and mean), `e`, `r` (range of results), `k` (1 random, 2 systematic, 3 stratified, 4
    convenience, 5 census), `v` (population shown). Checks: `"k = 3 and s >= 1"`, `"n >= 100 and s >= 10"`, `"s >= 10 and r <= 0.15"`, `"v = 1"`.
  - Board variables in `when:` must be single letters: the evaluator reads a longer name such as `sb` as s × b.
  - `widget: data` (first used by `maths/data`): a dot plot of `values: 4, 7, 7, 8` on `range: 0, 20` (default: around
    the data), with the mean (▲), median (dashed) and range (arrow) marked and written underneath (`show: mean, median,
    mode, range` or `none`). `edit: on`: students click the line to add a value (landing on `step:`, default 1), click a
    dot to remove it, or type the values in a box. `view: stem` draws an ordered stem-and-leaf plot instead (whole
    numbers; tens as stems, with every stem and a key); `view: both` adds it under the dot plot. `second: 5, 6, 8` and
    `names: Class A, Class B` draw a second set above (not editable). `label:` names the variable. Values: `n`, `s`
    (sum), `m` (mean), `d` (median), `o` (the mode, the smallest if several), `k` (how many modes; 0 if none), `r`, `l`,
    `h` (range, lowest, highest), and the same in capitals for the second set. Checks: `"n = 6 and m = 7"`, `"d > D"`.
  - `widget: chance` (first used by `maths/data`): `device: coin | dice | spinner | bag` (`sides: 6`; `outcomes: red 2,
    blue 1` for spinner sector sizes or bag counters, drawn with replacement). Run 1, 10, 100 and 1000 buttons; a tally
    (count, relative frequency, probability, expected count) and a graph of the relative frequency of `watch:` (default
    the first outcome) against trials, with the probability dashed. `predict: off` hides the probability; `hide: on`
    hides the device too (a mystery to estimate); `seed: 7` fixes the randomness (pictures, clips); `start: 20` runs that
    many first. Values: `t` (trials), `c` (count of the watched outcome), `f` (its relative frequency), `p` (its
    probability), `e` (|f − p|), `w` (outcomes). Checks: `"t >= 1000"`, `"t >= 1000 and e <= 0.01"`.
  - `widget: parallel` (first used by `maths/angles/parallel-lines`): two parallel lines (marked >>) crossed by a
    transversal, with the eight angles a to h (upper crossing a above left, b above right, c below left, d below right;
    lower crossing e to h the same). `slider t: 30, 150, 60` (or `t: 60`) turns the transversal (step 5 unless given);
    optional `slider w: -20, 20, 0` tilts the lower line so the lines are not parallel. Students pick two angles (click
    them, or the letter buttons) and the board names the pair and its rule. `angles: hidden` shows letters only;
    `angles: given b` (or `given b, g`) shows only those sizes; `names: off` does not name the pair (students decide); `pair: c, f` starts
    with two picked (for pictures). Values: `t`, `w`, `a` to `h` (sizes), `m` (angles picked), `r` (the picked pair:
    1 corresponding, 2 alternate, 3 co-interior, 4 vertically opposite, 5 on a straight line, 6 alternate outside the
    lines, 0 other), `s` (sum of the picked sizes), `p` (1 when parallel). Checks: `"r = 2"`, `"c = 65 and r = 3"`, `"c = e"`.
  - `widget: tiles` (first used by `maths/algebra/expanding`): algebra tiles for expanding `k(ax + b)`: k rows, each of a
    x-tiles and b unit tiles, with the bracket along the top and k down the side. Negative tiles are red with a minus;
    a negative k flips every tile. `slider k: -4, 5, 2`, `slider a`, `slider b` (whole numbers), or fixed values
    (`k: 3`); optional `slider p` and `slider q` add extra terms after the bracket (for "expand, then collect").
    `result: off` hides the expansion. The panel writes `3(2x + 4) = 6x + 12` and counts the tiles. Values for checks:
    `k`, `a`, `b`, `p`, `q`, `m` (x-tiles in all, k·a + p) and `c` (ones in all, k·b + q).
    Factorising (first used by `maths/algebra/factorising`): give `s` x-tiles and `t` ones (sliders or fixed, 1 or more)
    and a `k` slider for the number of rows. When k divides both, the tiles share into k rows of `ax + b` and the panel
    writes `6x + 9 = 3(2x + 3)`; otherwise they stay in one heap ("2 rows do not work"). Values: `k`, `s`, `t`, `f`
    (1 when k rows work), `h` (1 when fully factorised: k is the highest common factor) and `g` (the HCF of s and t).
  - `widget: forces` (any subject; first used by the physics lessons): a force diagram and, with `motion: on`, the
    motion it causes.
    - `object: Box` (its name), `mass: 2` (kg; `mass: 1, 10, 2` is a slider), `g: 9.8` (N/kg) or
      `place: Earth, Moon, Mars, Jupiter` (buttons that set g);
    - `force P: right, 10, Push, adjust 0-20` (a capital letter, a direction: left, right, up or down, a size in N,
      then in any order a label and `adjust MIN-MAX` (`by 0.5` for the step) for a slider). The size can be
      `weight` (m × g, down) or `support` (up, just enough to balance what pushes down);
    - `friction: 6` (the most friction the surface can give: it matches a push up to this, then stays at it while
      sliding; drawn as force F), `friction: 6, toggle` for an on/off button;
    - `motion: on`: Play, Pause and Reset; the object moves along a track (left and right only), dropping a dot every
      half second, with a live speed–time graph. `speed: 3` (starting speed, m/s, + is right), `track: 40` (m),
      `time: 10` (s).
    - Named values for `when:` checks: each force by its letter (`P = 30`, `A = W`), `F` friction, `f` net horizontal
      force, `a` acceleration, `v` speed, `t` time, `d` distance, `m`, `g`, `w` weight; `expect: { balanced: true }`
      means both directions balance. Values are rounded to 2 decimal places. Examples: `"f = 0"`,
      `"t >= 3 and f = 0 and v > 0"` (steady speed), `"m = 4 and a = 2"`. The acceleration shows before Play.
  - `widget: key` (a dichotomous key): `step A: Does it have a backbone? | B | D` (a question, then where yes and no
    lead: a step letter or an answer; the first step is the start) and `specimen: Kookaburra | Has feathers and a beak.`
    (the key's answer, what students see, and optionally a third part naming it when the answer is a group:
    `Plant | Green leaves… | Gum tree`). Specimens are anonymous until the key names them; a wrong answer points to
    the first step where the path went wrong. `need: 5`. Values: `n` identified, `k` specimens, `e` wrong.
    Validate-time errors catch loops, missing steps and specimens no path reaches.
  - `widget: foodweb`: `organism G: Grass` (add `, decomposer`), `eats K: L, G` (arrows L → K and G → K). Laid out by
    feeding level automatically. `mode: build` (default): students click a food, then its eater; wrong arrows turn
    red (`c` correct, `x` wrong, `k` links). `mode: trace` with `energy: 10000`: students follow a chain from a
    producer to the top, with the energy at each level (10% rule) (`l` longest chain completed, `n` chains).
    `mode: remove` (optionally `remove: D`): one species is removed, students predict each other population
    (↑, ↓ or –) and check against the model's cascade with a reason for each (`r`, `p` predictions, `k`, `h` 1 once
    checked, `c` matching). The cascade follows feeding links outward, nearest effects first; disagreeing effects
    at the same distance are "could go either way".
  - `widget: classifier` (AI; first used by `code/microbit-computer`): students train an image model in Teachable
    Machine, export it with **Upload my model** and paste the link; the board tests it on a fixed set of photos.
    - `testset: recycling` (photos and labels in `playground-board/media/classifier/<name>/test.json`; the recycling set
      is made from TrashNet by `tools/classifier/make-recycling-set.py`, which also writes the two training zips),
      `groups: plain, messy` (which groups to test; default all), `classes: Paper, Plastic` (expected labels; default
      the set's), `model: ask` (default; the last model a student loaded fills in) or a link or a folder on this site,
      `webcam: on` (live preview, not checked).
    - `serial: on`: a **Connect a micro:bit** button (Web Serial, 115200 baud; Chrome or Edge). Clicking a test photo
      sends its predicted label as a line; the webcam sends a label once it holds `threshold:` (default 0.8) for 300 ms
      and differs from the last one sent. Lines the micro:bit sends back are shown; `name:number` lines (MakeCode's
      **serial write value**) become values.
    - Values for `when:` checks (every name has an underscore): `acc_all`, `acc_<group>` (0 to 1), `n_correct`,
      `n_total`, `n_classes`, `has_<label>` (1 or 0), and with serial `n_sent`, `n_replies`, `in_<name>`. Examples:
      `"acc_messy >= 0.75"`, `"has_neither = 1 and acc_neither >= 0.75"`, `"n_sent >= 3"`. Training is not checked;
      the model it makes is. The Teachable Machine library and TensorFlow.js load only when this widget is used.
    - Leave out `testset:` for a webcam-only board (driving a robot): then `classes:` names the expected labels.
      `threshold Go: 0.95` gives one label its own threshold; `unsure: on` sends **Unsure** when no label holds its
      threshold; `repeat: 1` resends the current label every second (a heartbeat for a robot's watchdog). Extra values:
      `sent_<label>` (times sent, including `sent_unsure`). The webcam is mirrored, as in Teachable Machine.
    - `testset: own`: students add **their own test photos** on the board (a class, a group name such as desk or
      dim, then the photos), shrunk to 224 px and kept in this browser only (`wp-classifier-own`), shared by every
      `testset: own` board on the site and kept in step across a lesson's boards. With `classes:` the class is a
      list; without it students type it. Extra values: `n_photos`, `n_groups`, `photos_<label>`, and `acc_min` (the
      weakest group's accuracy) once a model has run.
  - `widget: serial` (a micro:bit on USB, any lesson): **Connect a micro:bit**, then a live graph of every `name:value`
    line it sends (`serial write value`), its latest, lowest and highest values, and a message list.
    `plot: light, temp` (which to graph; default all), `window: 20` (seconds shown), `button Happy: happy` (a button
    that sends the line happy; any number), `text: on` (a box to send any line). Values: `n_lines`, `n_sent`,
    `n_names`, and per value `in_`, `min_`, `max_`, `n_<name>`; per word sent `sent_<word>`. The connection is shared
    by all of a board's widgets (`B.serial` in `core.js`) and survives a task's new setup.
  - `widget: cell`: `show: animal, plant` (cell types side by side: animal, plant, bacterium, yeast, redblood, nerve,
    muscle, roothair, sperm, egg, pollen), or one tissue (`leaf`, `heart`), or `zoom`. Students click a part to see
    its name, what it does and where it is found; `find: nucleus, membrane, cytoplasm` limits which parts count (ids:
    nucleus, membrane, cytoplasm, wall, chloroplasts, vacuole, mitochondria and each cell's own, shown on click).
    Rings and lines are hit by nearness, shapes by the smallest containing one. `show: zoom` steps body → cell →
    nucleus → chromosome → DNA → gene with Zoom in and Zoom out. Values: `n` found, `k` to find (each cell counts its
    own), `l` deepest zoom level (0 to 5).
  - `widget: coordination` (AC9S9U01): `stimulus: Touching a hot pan | external | Heat receptors | Spinal cord | Arm
    muscles | You pull your hand away` lines. `mode: pathway`: click a stimulus to send it through the five boxes
    (`n` tried). `mode: build`: students choose the receptor, command centre and effector from menus; a wrong one names
    the first wrong step (`c` built, `need` default 3). `mode: race`: a nerve and a hormone response to one fright on
    a graph (`r` races). `mode: feedback`: body temperature with an Air slider; sweating or shivering switch on away
    from 37 °C; `break: on` adds Break and Repair for the receptor, control centre and effectors. Values `t`, `v`
    (temperature), `s` 37, `d` distance from it, `r` recoveries (back within 0.3 °C after more than 0.6 °C away), `b` 1
    while broken. A toy model: name that real core temperature moves far less.
  - `widget: cross`: `mode: offspring` (two creatures with three genes; Sexual reproduction and Asexual (a clone of
    parent 1); `o` sexual offspring, `u` different-looking, `a` clones). `mode: meiosis` (3 chromosome pairs, red from
    the mother, blue from the father; Make a gamete; `g` made, `u` different, `h` 3). `mode: punnett` with
    `gene: P | purple flowers | p | white flowers` and `parents: Pp x Pp` (or `choose`): students click-cycle the
    gametes and grid cells, then Breed 100 offspring (`f` 1 when right, `n` bred, `p` percent dominant). Use traits
    that really are one gene with full dominance (pea flowers, guinea pig fur), not eye colour.
  - `widget: sky` (Earth, sun and moon, AC9S7U03): one geometric model, two views side by side (one at a time, with
    a swap button, on narrow screens). Not to scale; angles, day lengths, timings and eclipse limits are real.
    - `mode: earth`: from above (the Earth's orbit, its axis always pointing the same way) and from the side (the sun
      to the left: the lean towards the sun, day and night, and a place's latitude). Date slider, Play a day, Play a
      year, a Place menu (`place: Canberra`; Darwin, Hobart, Singapore, London, Tromsø, Davis station), `tilt: choose`
      for a tilt slider. Values: `d` day of year, `r` days played, `o` years played, `h` daylight hours, `a` noon sun
      height, `k` distance (million km), `t` tilt, `m` months looked at and `g` longest minus shortest daylight seen
      (both reset when the place or tilt changes), `p` places, `q` hemispheres (1 or 2).
    - `mode: moon`: drag the moon round the Earth (Next phase, Play a month) beside "what you see from Earth"
      (`view: south` (default, waxing lit on the left) or `north`). `shadow: on` adds a button showing Earth's shadow.
      `quiz: on` places the moon and hides the view; students name the phase (`need`, default 5). Values: `n` phases
      visited (of 8), `f` percent lit, `e` days since new moon, `c` named right, `w` wrong.
    - `mode: eclipse`: from above (the moon's orbit, bright where it is above Earth's orbit plane, and the crossing
      line) and from the side (tilt and shadows exaggerated). Next full moon / Next new moon steps half a month, with
      a log; the first eclipses come in month 4. `tilt: choose` adds "Flatten the moon's orbit". Values: `m` steps,
      `s` solar, `u` lunar (partial or total), `b` penumbral, `f` 1 while flat, `l` steps while flat.
    - `mode: tides`: the oceans' two bulges (moon, and smaller ones from the sun), a beach turning with the Earth
      (Play a day at the beach), Moon: next quarter or drag, and a month of tides with today marked. Values: `d` days
      since new moon, `r` range (m), `s` spring tides found (of 2), `q` neap tides found (of 2), `b` beach days.
  - `widget: layers` (AC9S8U03 n1): a wedge of the Earth from surface to centre. Click a layer (crust, rigid upper
    mantle, asthenosphere, mantle, outer core, inner core) to see its state and make-up; the Depth slider reads
    temperature and pressure (rough textbook values); "Show it to scale" draws true thicknesses. `find:` limits the
    layers that count. Values: `n` found, `k`, `d` depth, `t` °C, `p` thousand atmospheres, `m` deepest probe,
    `s` 1 once the to-scale view was seen.
  - `widget: carbon` (AC9S9U03): `mode: spheres`, a landscape of ten things to place in the four spheres (the cloud
    and the soil accept two); values `n`, `k`, `w` wrong. `mode: cycle`, four stores (air, living things and soil,
    oceans, fossil fuels) with flows in GtC a year; buttons switch photosynthesis, respiration and decay, and ocean
    exchange; Run 10 or 50 years; a graph of CO₂ (ppm). `combustion: on` adds a Burning slider (0 to 20);
    `start: today` starts at 420 ppm burning 10. Plants and oceans take up extra CO₂ in proportion to how far the air
    is above 280 ppm (about 60% of burned carbon stays in the air over 50 years; the real figure is about 45%).
    Values: `a` ppm, `y` years, `c` burning, `u`/`v` 1 once a run of 10 years or more lowered/raised CO₂ by 5 ppm or
    more, `s` 1 once a run kept it steady (under 0.25 ppm a year), `f` processes off, `b` biosphere store, `o`, `r`.
  - `widget: universe` (AC9S10U03): `mode: timeline`, ten stages from the big bang to today (Earlier / Later or
    click the timeline) with temperature and a picture of a patch of space; values `n` visited, `k` 10, `s` now.
    `mode: expand`, a field of galaxies: "Let space expand" stretches distances ×1.6; "Live in a different galaxy"
    re-centres; click galaxies to measure distance, speed (H₀ about 70 km/s/Mpc) and a spectrum with the shift drawn
    5 times bigger; points build a distance–speed graph. Values: `e` 1 once expanded, `h` homes tried, `m`
    measured, `z` largest redshift ×1000, `q` 1 with 3 or more points.
  - `widget: climate` (AC9S10U04): `mode: albedo`, a row of surfaces (`tiles: ocean, forest, ice, ...`, 4 to 10;
    click to change; Melt the ice, Freeze the oceans, Clear the forests); values `a` % reflected, `e` absorbed W/m²,
    `i` ice tiles, `k` kinds used, `g` range of % reflected seen. `mode: balance` (Sunlight and Reflected sliders)
    and `mode: greenhouse` (CO₂ slider, Remove all greenhouse gases): a one-layer energy-balance model calibrated to
    about 15 °C at 280 ppm, −18 °C with no greenhouse gases and +3 °C for double CO₂; Run 10 or 50 years with a
    temperature graph. Values: `t` °C, `i` in, `o` out, `d` in − out, `y` years, `b` 1 once balance returned after
    being upset, `c` changes, `g` ppm, `z` 1 once a run with no greenhouse gases went below −10 °C, `w` warmest.
  - `widget: atom` (AC9S9U06, AC9S10U06): a Bohr model, not to scale. `mode: build` (default): + and − for
    protons, neutrons and electrons (aria-labels "Protons: more" and so on); the board names the element (1 to 20),
    gives atomic number, mass number, charge and shells (2, 8, 8, 2). `start: 6, 6, 6` (p, n, e), `target:
    carbon-12` (or `C 12`, or `Na+ 23` for an ion) shows a card and sets `t`; `shells: off` draws one ring. Values:
    `p`, `n`, `e`, `z`, `a`, `q` charge, `o` outer electrons, `s` shells, `t`. `mode: table`: elements 1 to 20 by
    group and period (buttons labelled with the element's name); clicking one shows its shells with the outer shell
    orange and a note on its group. `find: Li, Na, K` (default all 20); `colour: shells | outer | metal` shades the table
    with a key. Values: `n` found, `k`, `z`, `o`, `g` group. In build mode, a line says whether the nucleus is stable
    or radioactive (elements 1 to 20); values `u` (1 if unstable) and `i` (isotopes of this element built so far).
    `mode: halflife` (9U06 n4): a sample of `nuclei: 100` (4 to 400) of `isotope: iodine-131` (one of 13 with known
    half-lives, such as F-18, C-14, U-238) decaying at random, with a graph of how many are left over 6 half-lives;
    Run, Pause, Wait one half-life, Start again (a new sample). `run: 3` starts with a fixed sample already run, for a
    picture. Values: `n` left, `k` start, `t` time, `h` half-lives gone, `e` expected left, `c` runs finished, `r`.
    `mode: decay` (9U06 n3): one nucleus, `isotope: radon-222` (or `Rn-222`; any element up to americium; default
    uranium-238), and buttons Alpha decay, Beta decay, Gamma ray: each shows what leaves and the new atomic and mass
    numbers, says whether that is how the isotope really decays (about 25 common ones, including the uranium-238 and
    radon-222 chains) and stops at a stable isotope. Values: `z`, `a`, `x` alphas, `y` betas, `w` gammas, `r` real
    decays in a row from the start, `s` 1 once stable. `mode: shield`: fire alpha, beta and gamma at paper,
    aluminium and lead (`fired: alpha, beta, gamma` starts with all three shown, for a picture). Values: `x`, `y`,
    `w` 1 once fired, `f` kinds fired.
  - `widget: wave` (AC9S9U04 n2 and n4). `mode: sound`: a speaker, a tube of particles, a listener and a pressure
    graph (canvas): compressions and rarefactions travel, each particle only moves to and fro (one orange particle
    marks this), the wave is slowed down and the speeds are not to scale. `medium: air | water | steel | vacuum |
    choose` (a menu), `freq: 2` and `amp: 3` (1 to 5; sliders Pitch and Loudness unless `sliders: off`), `mark`,
    `labels` (compression, rarefaction, wavelength), `hear: on` (a Hear it tone button), `run: 2` (seconds already
    run, for a picture), `play: off`. Values: `f`, `a`, `m` (0 vacuum, 1 air, 2 water, 3 steel), `v` real speed (m/s),
    `l` wavelength in tube lengths, `h` 1 once the sound has reached the listener. `mode: refract`: wave fronts
    (blue) and rays crossing from air into `medium: glass | water | diamond | choose` with `angle: 40` (a slider
    Angle, 0 to 80 in 5s), or `surface: mirror` for reflection; fronts are closer and slower in the material and the
    ray follows Snell's law (not named for students). `rays: off`, `play: off`, `run`. Values: `i`, `r` (refraction
    or reflection angle), `n` index of the material, `e` 1 for a mirror. `mode: spectrum`: the seven bands, one at a
    time (buttons or click the bar), with typical wavelength, frequency, use and care, and a schematic wave;
    `band: visible`. Values: `b` band (0 radio to 6 gamma), `n` bands looked at, `f` and `l` log10 of frequency and
    wavelength.
  - `widget: charge` (AC9S9U04 n3). `mode: static`: two materials of eight atoms each, `rub: Wool > Balloon`
    (gives up electrons > gains them); buttons Rub (one electron each, at most `max: 6`), Touch metal (the extra
    electrons rush back, with a spark) and Start again; `run: 4` rubs already done, for a picture. Values: `a` net
    charge of the first, `b` of the second, `n` electrons moved, `d` times touched while charged, `s` 1 after a touch.
    `mode: pair`: two balls with `first: 2` and `second: -1` (-3 to 3, sliders Ball 1 and Ball 2): like charges
    push apart, unlike pull together. Values: `p`, `q`, `f` (-1 pull, 0 none, 1 push). `mode: current`: a battery, a
    wire loop and a bulb with fixed + atoms and moving - electrons, `material: copper | plastic | choose`, `volts: 3`
    (0 to 6, slider Battery), `run: 2`. Values: `v`, `m` (1 conductor), `i`, `l` (1 if the bulb is lit). Sound and
    charge draw on a canvas (`canvas.wpcv`) inside `#board`; `B.jsx` removes a leftover one.
  - `widget: energy` (AC9S8U05, AC9S9U05). `mode: coaster`: a roller coaster car on a track of hills (Play, Pause,
    Reset) with bars for potential, kinetic, and heat and sound, and the total marked; `start: 30` (m, 10 to 50),
    `mass: 500`, `g: 10`, `friction: off | on | toggle`, `drag: 400` (N while moving), `run: 4` (seconds already run,
    for a picture). Values `h`, `v`, `p`, `k`, `q`, `t` (kJ), `r` runs finished, `f` friction on, `z` past the first
    dip. `mode: chain`: `stage: Battery | chemical` lines (name, useful type, then by-products); students choose each
    stage's useful energy and each arrow (Transfer or Transformation), then Check; `show: answers` fills it in. Types:
    chemical, gravitational, elastic, kinetic, thermal (or heat), sound, light, electrical. Values `c` 1 once all
    right, `w` wrong at the last check, `n` checks. `mode: sankey`: `device:`, `input: 100, electrical`,
    `output: Light, 10, useful` lines; band widths to scale, wasted bands bend down; `build: on` gives a slider per
    output starting at 0. Values `i`, `u` useful, `w` wasted, `o` all out, `b` 1 while outputs = input, `e` %.
  - `widget: equation` (AC9S9U07 n4): `equation: CH4 + O2 -> CO2 + H2O` (symbols and subscripts, no brackets, 2 to 5
    substances, at most 9 atoms each). + and − change only the coefficients (aria-labels "CH4: more" and so on, 1 to
    6); each molecule is drawn, with an atom tally per element. `start: 1, 2, 1, 2`. Values: `b` 1 while balanced,
    `l` 1 while balanced with the smallest whole numbers (check with `when: "l = 1"`), `c` changes, `m` largest
    coefficient.
  - Each task's `starter` loads its own board when the task is opened. Work is saved in the browser per step;
    `?fresh=1` on the board's address starts from the setup and saves nothing (slides on a shared projector).
  - The board's old address, `_playground-maths/`, forwards to it with the same parameters, so embeds keep working
    (the embedding contract is in the project notes).
- **Maths cards** (`snippets/maths.json`, for the course named by its `course:`): the words and methods of the course,
  one card each, with `label`, `code` (TeX, shown typeset), `hint` (may use `$...$`), `unit` (the unit whose cheat sheet
  lists it) and optionally `board` (a board setup, drawn as the card's picture by `npm run render`) with `shows` (its
  caption). They make the course's Reference page (`<course>/reference/`, with search), the student print sheets, and
  the teacher cheat sheets (A4 and Markdown for Prepare). Validate checks the maths parses and the unit exists.
- **Progression nodes:** every maths lesson names the node it teaches, `node: AC9M7A01 n2` (a list if it teaches
  more than one), from the pages in `data/progressions/maths/` (one per descriptor; see its README). Validate warns
  when a prerequisite is not taught by an earlier lesson: the node before it in the same descriptor, or for node 1 the
  descriptors in the page's Prior Knowledge (all their nodes), plus anything in `uses: [AC9M7N07]` (a descriptor or
  node the lesson relies on that the page does not name, found by reading the lesson). Earlier means a lower `order`
  in the course, or a course it comes `after:` in `content/maths/index.md`. Prerequisites from an earlier year count
  as taught in class. Otherwise teach it earlier, or list it in `assumes:` (taught in class) and, where it matters,
  check it with a short retrieval question at the start or in Practise. `npm run nodes` prints the map;
  `npm run check-nodes` tests the check. Related standards are not prerequisites.
- **Maths pathways:** `content/maths/index.md` lists pathways like `code/index.md`, with planned courses as "Coming later".

## 12. Science lessons

A lesson with `language: science` (see `content/science/chemistry/`) is a short concept tutorial for introducing or
revising one idea, beside practical work, never instead of it. One tutorial per hinge node of the XY Model node files
(waypoints-kit `data/science/`); nodes whose response mode is `integration` are left to class tasks.

- **Woven strands.** Human endeavour and Inquiry have no tutorials of their own; they are woven into lessons. A lesson
  lists the ones a student genuinely practises in it as `woven: [AC9S7H03, AC9S7I05]` (descriptor codes from
  `data/curriculum/science.json`; validate checks each is in a woven strand), and the curriculum map lists those lessons on
  the descriptor's card. A predict step alone isn't Inquiry; tag only where the student does the thing (judges a claim,
  finds an anomaly, weighs impacts). Where a descriptor has no lesson, add a short `tier: typical` Elaborate step.
- **5E on the existing stages.** Science pages label the stages in 5E words, so predict-and-compare, decks and
  worksheets work unchanged: `predict` = **Engage** (one `predict` check, with `actual:`), `run` = **Explore** (a board;
  the compare box shows the prediction), `investigate` = **Explain**, `practise` = **Practise** (when the node's response
  mode is consolidation), `modify` = **Elaborate**, `info` = **Evaluate** (a `reflect` check and a revision summary).
- **Width tiers** (any lesson, not only science): `tier: typical` or `tier: wider` on a step marks extra contexts beyond
  the minimum path. The page shows a Minimum / Typical / Wider control; `?width=` in the link sets the floor (a
  teacher's choice), students can widen but not narrow, and the default is typical. Tiered steps' checks are not
  needed to finish the lesson and are left out of course progress. Worksheets wrap them in `:::typical` / `:::wider`.
  Wider means more contexts, never harder content.
- **`sort` check** (any lesson): `options:` are groups, `items:` are `[text, group]` or `[text, group, why]`; a group can
  be used many times (unlike `match`), and extra groups act as distractors. The why shows once an item is right.
- **`question` feedback** (any lesson): `feedback:` is one entry per option (text, or `null`), shown when that wrong
  option is chosen. Aim each at the misconception behind the option.
- **`board` check:** `expect: { done: true }` ticks when the science board's widget finishes its task.
- **The science board** (`playground-science/`: `engine.js` is the particle engine, `main.js` the widgets; JSXGraph).
  The starter is a `key: value` region in `boards.yml`. Widgets: `zoom` (`samples:` from ice, water, steam,
  distilled, salt, sand, air, copper), `identify` (`need:`), `build`, `syringe`, `diffusion`, `jar`, `heat`, `dissolve`,
  `bench`, `filter`, `evaporate`, `distil`, `chroma`, `box` (a model to look at), `windows` (`set: floatsink | six |
  ice | abc`, static diagrams) and `quiz` (`need:`, `options: Label=value; …`, repeated `item: text | value | why`).
  Each task's `starter` loads its own board. Nothing on the board is saved.
- **Atoms and reactions** (`atoms.js`, for Years 8–10 chemistry): molecules built from element atoms (model-kit
  colours, symbols on by default, `labels: off` hides them), moving as a gas in a box shaped to the screen with the same
  area everywhere. Particles are written `H2 x4` or `4 H2`; formulas use real element symbols (a typo is an error).
  - `widget: atoms`, `show: H2 x4, O2 x3, H2O x5`, optional `need:` (kinds to inspect; default all) and `temp:` (K).
    Students click particles (or press Inspect next particle) to see each kind's atoms, element or compound; with
    more than one kind the board names the box a mixture. Done once `need` kinds are inspected.
  - `widget: reaction`, `show:` and one or more `react: H2 + Cl2 -> 2 HCl` lines (atoms must balance, or the board
    refuses). Options: `ea:` energy a collision needs, in multiples of the average energy (default 3); `release:`
    energy given out per reaction (negative absorbs; try 0.5–1); `temp:` (default 300 K) and `temps: 150-600` for the
    slider (`slider: off` hides it); `catalyst: on` (a toggle that halves `ea`); `hold: on | off` (keep the temperature
    fixed; default on unless `release` is set, so exothermic and endothermic reactions warm or cool the gas);
    `target: HCl 10` (default: three quarters of what the first reaction can make). `goal:` is `target` (done when the
    target is reached), `react` (done at the first reaction), `compare` (done after reaching the target under two
    different conditions; a run whose temperature or catalyst changed part-way does not count) or `none`.
    The panel shows counts, the atom tally before and now, collisions and reactions, temperature and time; a yellow
    ring marks each collision that reacts. Simplifications to name for students: 2D, rigid molecules, and reactions with
    more than two reactants (CH4 + 2 O2) take the extra particles from nearby rather than in several steps.
    With about ten of each reactant, run times vary by a factor of two or so: use 15 or more for rate comparisons.
- **Cooling magma** (`crystals.js`, 8U04 node 2): `widget: cooling`. Students pick a cooling speed (Very slow, Slow,
  Fast, Very fast, Instant: each names where it happens, from deep underground to lava quenched in seconds), press
  Cool the magma and watch crystals start and grow; each finished run adds a row (crystals, average and largest size,
  glass). Typical results: very slow, about 5 crystals of 60 particles (like granite); fast, about 23 of 14 (like
  basalt); instant, mostly glass (like obsidian). `rates: 1, 3, 5` offers only some speeds; `goal: compare` (default:
  done after two different speeds) or `none`. `steps: 6` takes six cooling steps per frame (1 to 10): the same result in a sixth of the time. Clips use it, because the recorder plays only about 7 frames a second. Name for students: real granite and basalt also differ in what they are
  made of; the model shows only the effect of cooling speed.
- **Heat transfer** (`convection.js`): `widget: convection`. Particles are coloured blue (cool) to red (hot).
  - Default (a liquid heated from below, 9U04 node 1): a ringed particle and its trail; click another, or press Follow
    another particle. `goal: loop` (default): done when the followed particle rises, crosses the top and sinks again
    (usually 6–20 s). Heat: on/off toggle.
  - `preset: mantle` (8U03 node 2): the same current labelled as the mantle, with two plates on top that move apart
    above the rising current.
  - `mode: solid`: a bar heated at one end (conduction): the particles vibrate in place, warmer ones harder, and the
    panel shows the temperature of each quarter. `goal: spread` (default): done when the far end warms.
  Name for students: in the model hot particles are pushed up directly; in a real fluid the warm part rises because
  it has spread out (less dense).
- **Natural selection** (`selection.js`, 10U02 n1, n2): `widget: selection`. Beetles on pale (`ground: light`) or
  dark ground, colour from 0 (pale) to 1 (dark). `hunter: student` (click beetles to eat half) or `birds` (they find
  beetles that contrast with the ground more often, with some luck); then Survivors breed (offspring get the parents'
  average plus a small random change). Bar charts compare the start with the latest generation. `change: on` adds a
  button that darkens the ground (after a bushfire). `goal: generations` (default; done after `need`, default 4) or
  `measure` (no hunting: click beetles to measure; done after `need`, default 20). `n` (40), `mean` (0.5).
- Boards with hundreds of particles (cooling, convection) draw on a canvas layer over the board (`SCI.dots`), because
  SVG points cannot move that many each frame. After changing any engine, run `node tools/check-engines.mjs`.
- **Explain it to me** (science on the shared board): as for maths, `explainClip` runs a board setup (`query: { code: "@boards.yml#explain" }`) and `explainPicture` draws one (`{ ref: boards.yml#explain-pic, caption: … }`). Pictures need a drawn board (not the key widget); on the science board the picture is a moment 1.8 s after the widget starts, so choose setups that read well early (a jar starts as a gas, a syringe as wax).
- **Science pathways:** `content/science/index.md` lists Chemistry (built), Biology, Physics and Earth and space.
