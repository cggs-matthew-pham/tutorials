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
- **Timing:** a line starts when its caption appears; the clip keeps typing and clicking while it is spoken, and the next caption waits until the line ends. Keep each line to one sentence of at most 15 words (validate warns), and clips under about 30 s (render warns).
- **Code read aloud:** tags and calls are said the way a teacher would (`</ul>` → "closing U L", `forward(100)` → "forward 100"). Add words or tags to `tools/voice-lexicon.json` when the voice says one wrongly.
- **Transcript:** a voiced clip also gets `clips/<id>.vtt`, the spoken lines, shown by the player's CC button.
- **Hearing it before it goes live:** the Voiceover preview workflow (parked in `.github/workflows-off/voice-preview.yml`; move it back to `.github/workflows/` to use it) records voiced lessons with the real voice onto a `voice-preview` branch. Otherwise the real voice is first heard after a manual publish. Locally, `WP_VOICE_ENGINE=flite node tools/render.mjs --lesson <slug>` uses ffmpeg's robotic test voice to check timing; `npm run build` then refuses to build (`WP_ALLOW_TEST_VOICE=1` to look anyway), so they cannot be published. A build that cannot reach Hugging Face uses `WP_VOICE_ENGINE=none`: it reuses the live Kokoro clips and records any others silent. Each voiced clip's `clips/<id>.json` records its `voice` (kokoro, flite or none), and a Kokoro build records again every clip whose voice is not kokoro. Kokoro itself needs `npm install --no-save kokoro-js` and downloads its model (about 90 MB) from Hugging Face on first use.
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
```

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

- `hint: "text"` or a list of up to 3 texts adds "Need a hint?" (then "Another hint") buttons under the playground. Write nudges, not answers: the first points at the idea, the second at what changes.
- `reveal: "Show the expected result"` hides a step's clip behind a button with that text, placed after the playground so students try first.
- An **output-only clip** shows the result without the code. Give the step `app: true` and a query that loads the solution and hides the editor:

```yaml
app: true
query: { code: "@square.py#triangle", view: output, autorun: 1 }
clip:
  - expect: { selector: "#status", contains: Finished }
```

  `view=output` shows only the drawing and `autorun=1` runs the program when the page loads.

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

Each lesson then names its unit (`unit: functions`) and can be `optional: true` (shown with an Optional tag and not needed to finish the course). `npm run validate` checks the unit ids. `code/index.md` lists the pathways shown on `/code/`: each has `courses`, either `{ path: code/python, stage: foundations }` for a built course or `{ title, summary, stage: extensions }` for one coming later.

### Check types

All except `code` are static and need no running code. Write the check under `check:` (a step with no tasks) or under a task.

| `type` | You write | Student does |
|---|---|---|
| `reflect` | `text` | ticks a box |
| `question` | `q`, `options`, `answer` (0-based), `explain` | picks one option |
| `number` | `q`, `answer`, optional `tolerance`, `explain` | types a number |
| `flag` | `q`, `hash`, `explain` | types a capture-the-flag answer. Only a hash is stored: make it with `node tools/flag-hash.mjs "WP{answer}"` (SHA-256 of `wp-flag:` + the lower-cased, trimmed answer). The page checks with `crypto.subtle`, so view-source does not give the flag away; the repository is public, so the answer goes in the lesson's teacher notes |
| `match` | `q`, `pairs: [[left, right], ...]`, `explain` | picks each right-hand item from a list (shuffled for them) |
| `trace` | `text`, `table`, `explain` | fills the blanks of a table |
| `bug` | `code: file#region`, `answer: 7` (or `[7, 19]`; `"main.py:7"` when the code has several files), `fault`, `misconception`, `text`, `explain` | clicks the wrong line (every listed line, when there are several) |
| `parsons` | `code: file#region` (the correct program), optional `extra: [spare lines]`, `text`, `explain` | orders scrambled lines |
| `predict` | `q`, optional `options: [...]` (else typed; `kind: number` for a number), optional `actual` | locks in a prediction before running (cannot change it) |
| `code` | `text`, `rules` (`defs`, `calls`, `loops`, `returns`, `params`, `imports`, `uses`, `contains: ["inside(x, y"]`) | runs a program that meets the rules |

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

Pictures students use live in `media/html/` (drawn for the course: `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg`, `music.svg`); lesson code names them directly, `<img src="trophy.svg" alt="...">`, as files next to a real page. Add new ones there (your own drawings, or images you may share). Links in the preview open in a new tab, so the student's page stays; use `https://example.com/...` addresses in lessons. Forms send nowhere: pressing a form's button (or Enter in a box) shows a short note saying nothing was sent.

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
- **`form:` on an `answer` check** (Years 8 and up): the answer must be equivalent **and** written in a form:
  `form: expanded` (no brackets left, nothing left to collect), `simplified` (nothing left to collect; brackets allowed),
  `factorised` (a product, whole numbers, no common factor left in a bracket, numbers or letters) or `subject d` (`d = …`,
  with d only on the left). `answer:` is the expected answer in that form. Students who write an equivalent answer in
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
    - `point A: 2, 5` (fixed; coordinates may use sliders, as in `point B: 0, c`) and `point P: 1, 3, drag`
      (students drag it; it lands on the nearest grid point, and checks see it only once it is let go); one capital letter each;
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
    - Values for checks: each corner's angle by its lower-case letter (`a`, `b`, `c`, …), `s` the total, `m` the largest
      angle, `n` sides, `k` triangles shown by split (else 0), `t` 1 while torn, `v` 1 if no corner points in; corners as
      points (`x(A)`). Examples: `"m > 120"`, `"m = 90"`, `"n = 5 and k = 3"`, `"n = 4 and v = 0"`, `"s = 1260"`.
  - `widget: tiles` (first used by `maths/algebra/expanding`): algebra tiles for expanding `k(ax + b)`: k rows, each of a
    x-tiles and b unit tiles, with the bracket along the top and k down the side. Negative tiles are red with a minus;
    a negative k flips every tile. `slider k: -4, 5, 2`, `slider a`, `slider b` (whole numbers), or fixed values
    (`k: 3`); optional `slider p` and `slider q` add extra terms after the bracket (for "expand, then collect").
    `result: off` hides the expansion. The panel writes `3(2x + 4) = 6x + 12` and counts the tiles. Values for checks:
    `k`, `a`, `b`, `p`, `q`, `m` (x-tiles in all, k·a + p) and `c` (ones in all, k·b + q).
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
  done after two different speeds) or `none`. Name for students: real granite and basalt also differ in what they are
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
- **Explain it to me** (science on the shared board): as for maths, `explainClip` runs a board setup (`query: { code: "@boards.yml#explain" }`) and `explainPicture` draws one (`{ ref: boards.yml#explain-pic, caption: … }`). Pictures need a drawn board: not the key widget, and not lessons on the science board yet.
- **Science pathways:** `content/science/index.md` lists Chemistry (built), Biology, Physics and Earth and space.
