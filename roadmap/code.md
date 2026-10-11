# Roadmap: Code (Python, Web, MakeCode)

The code chat's file: current status, what is open and the decisions that still apply. Rewritten 12 Oct 2026. Earlier entries (design reasoning, test notes, older decisions) are in [`archive/code-to-2026-10-12.md`](archive/code-to-2026-10-12.md), word for word. Shared tools and site pages: `shared.md`.

**How to keep it current:** when something is built, update its course block below. Don't add a dated section. Write new proposals under "Proposed". After a push, give one line in "Log". Move long design notes to the archive once they are decided.

## Open now

**Needs Matthew (school devices, classes, live sites)**
- **School network:** the Pyodide courses (first load, jsDelivr or our own copy), wikidata.org and api.open-meteo.com, and microstudio.dev (works at home; if the school blocks it, Matthew asks IT). The `/check/` page tests most of these.
- **MakeCode against the live editors and real hardware:**
  - every micro:bit, Arcade and Robotics lesson (block names, toolbox drawers, simulator details written from knowledge);
  - whether the text `indexOf`/`charAt` and bitwise `^` blocks exist (Secret messages);
  - the `ml` extension in our embed;
  - serial and the radio bridge on real micro:bits;
  - a real Teachable Machine export in the classifier board;
  - whether the robot start block errors on a micro:bit that isn't in a robot.
- **Class trials:** none of the extension courses has been tried with a class yet.
- **Python pathway questions still open:** whether turtle lessons 9–10 (events, build a button) suit foundations or extensions.

**Code chat can do next**

## Courses

Lesson counts include optional lessons. "Pictures" are drawn by `render-pictures`; "clips" are explain clips unless named.

### Python pathway

- **Python Foundations with Turtle** (`code/python`, 15 lessons): built.
  - Lessons, in order: intro, variables, decisions, lists, functions, parameters, returns, functions that decide (12 Oct: the lists and `if` revisit, an `if` inside a function called for every item of a list), modules, events, build a button, then the challenge (Catch the turtle and Power-ups, plus optional Control panel and Game levels).
  - Has teacher layer, voice and concept tags.
- **Console bridge** (`code/console`, 4 lessons): built 11 Oct.
  - Console mode in the turtle playground with inline `input()`; Playground and Reference pages.
  - The last foundations course: every extension comes after it.
- **Objects with turtles** (`code/objects`, 5): built 11 Oct. Several turtles in the playground (BUILDING › 7).
- **Deeper Python in the console** (`code/deeper`, 6): built 11 Oct.
  - Text, lists, dictionaries, errors, a text adventure, and Save the game (`json`, on the Python playground).
- **Data detective** (`code/data`, 6 incl. optional Ask an API): built 11 Oct.
  - Runs on the Python playground (Pyodide). Data sets in `sets/`.
  - Not done: a shared `load()` helper, and a real Wikidata export to replace the hand-made `music.csv`.
- **Apps with Gradio** (`code/gradio`, 4): built 11 Oct, using the mini-Gradio stand-in. Real Gradio is covered in the teacher notes.
- **Machine learning with Gradio** (`code/ml`, 6): built 11 Oct.
  - Palmer Penguins data, scikit-learn vendored.
  - No clips: scikit-learn takes about 15 s to load.
- **Web apps with Flask** (`code/flask`, 6, on the Python and Web pathways): built 11 Oct.
  - Not done: SQLite as the last storage step, templates in files, FastAPI's `/docs` page.
- **Games with microStudio** (`code/games`, 5): built 11 Oct; Playground, Reference and clips added 12 Oct.
  - Students make their games on microstudio.dev (decided: link out). Our pages show each game playing in `playground-microstudio/`, the engine and Brython from microStudio's HTML5 export.
  - The Playground (`edit.html`) puts code beside the player and also works when microstudio.dev is blocked.
  - Reference: `snippets/microstudio.json` (22 cards, 9 pictures).
  - Clips for A game loop, Stars as objects, and Catch and score.
  - No clip for Keys (the recorder can't hold a key down) or Make it yours (sound and sprites).
  - Not done: a class trial.

### Web pathway

- **HTML & CSS** (`code/html`, 12 incl. optional Make it react and Grid): built 9 Oct.
  - Units: Structure, Style, Components and layout, then the Challenge (the club page).
  - Has voice, pictures, Boxes and Box model views, and `check-html`.
  - Scope rule (still applies): only core ideas, what the DOM needs, and what the challenge page uses; everything else becomes a Reference card.
  - Later: a wider code panel for clips.
- **Pages with Bootstrap** (`code/bootstrap`, 3): built 12 Oct.
  - Style by class names; Navbar, cards and a grid (the club page rebuilt); Make Bootstrap yours (own rules after the link, Bootstrap vs hand-built, and a look at Bulma, Tailwind, daisyUI and Pico).
  - HTML playground; libraries from `vendor/web/` served beside the page. Reference (Bootstrap and Other CSS frameworks groups in `snippets/html.json`), pictures, voiced clips, `check-html` walks it.
  - Bootstrap's CSS only (no JavaScript): the navbar uses `navbar-expand`. Tailwind runs on its browser build, labelled as the trying-things version.
  - Not done: a class trial.
- **Drawing and animation with p5.js** (`code/p5`, 8 incl. optional Moving art): built 11 Oct.
  - Own playground (`playground-p5/`, p5 2.3.4 vendored), Reference (37 cards), pictures and clips.
  - Not done: clips for the moving sketches (animated sketches show a still), a class trial.
- **The DOM and the browser console** (`code/dom`, 8 incl. optional The real browser console): built 11 Oct.
  - Its own `playground-dom/` (Run, console panel, DOM hints; reports as `html`), clips and expected pictures.
  - Optional lesson 10, Saving between visits (built 12 Oct): `localStorage`, lists as JSON; the DOM playground keeps each step's saved data (a stand-in, since the sandboxed preview has none).
  - Optional lesson 9, Data from the web: fetch (built 12 Oct): `fetch`, `await`, `.json()`, and `try`/`catch` falling back to the saved `weather.json` (Data detective's file, now also in `media/html/`) when Open-Meteo can't be reached. Reference page added (`code/dom/reference`).
  - Not done: a class trial, saving between visits (by design).

- **Apps with Vue** (`code/vue`, 7 incl. optional Same app, three frameworks): built 12 Oct.
  - Data on the page, Lists and choices, Events and inputs, Computed, Components and props, then the challenge (a to-do app in three milestones) and the optional three-framework lesson (Vue, Preact with htm, Svelte compiled in the page).
  - Composition API (`ref`, `computed`) in the global build, on the DOM playground. Vue's development build, for its warnings. Svelte components sit in a hidden `<textarea data-svelte>`, compiled by `svelte.js` (vendor/web).
  - Reference (Vue and Frameworks groups in `snippets/html.json`), pictures, voiced clips; `check-html` walks it and the DOM course.
  - Not done: a class trial; `:key` and `emit` are teacher-note stretches only.

- **Your site, for real** (`code/site`, 2): built 12 Oct. After HTML & CSS, so every route ends there; works on any page.
  - Pages for everyone (alt, heading outline, labels, link text, contrast, keyboard, then a classmate test) and Put it online (a site is a folder, relative paths, Download, publish with the teacher: GitHub Pages, Netlify Drop or the school's site; the publish step is `tier: typical`).
  - Download button in the HTML and DOM playgrounds (`playground-html/download.js`).
  - Not done: a class trial; a built-in accessibility checker (Lighthouse is in the teacher notes).

### MakeCode pathway

- **micro:bit Foundations** (`code/microbit`, 14): built 9 Oct.
  - Events come at lesson 2; a Python peek from lesson 8.
  - Playground in controller mode, blocks pictures and "what it makes" pictures, Reference.
  - Not yet tried against the live editor.
- **MakeCode Arcade** (`code/arcade`, 14): written.
  - Lesson 13 teaches which games suit Arcade (table in the archive, "Arcade Foundations sequence").
  - Not yet tried against the live editor. Tilemaps are outside the core.
- **Robotics challenges** (`code/robotics`, 12): built 10 Oct.
  - Uses `microbit-robot` v2.7.4 with the Cutebot. Units: Drive, Sense, Modes, Talk, then the challenge (Showcase, Patrol and alert, optional Tripwire).
  - Rule: radio handlers only set a mode; forever drives the motors.
  - MOVE Motor support later, as a driver contributed to `microbit-robot`.
- **micro:bit and the computer** (`code/microbit-computer`, 8): built 10 Oct.
  - Topics: USB serial, a radio bridge, Teachable Machine with the classifier board, CreateAI with the `ml` extension, and a capstone.
  - Tested only with stand-in models and a mocked micro:bit.
- **AI robots** (`code/ai-robots`, 5): built 10 Oct. In the simulator, buttons stand in for the model.
- **Secret messages** (`code/microbit-security`, 10): built 10 Oct.
  - Defence-oriented: no lessons where students sniff, spoof or replay each other's messages.
  - Uses the `flag` check (it stores only a hash).
  - Not done: clips, a cipher board widget, a teacher trial.

## MakeCode embedding (reference)

The playground relies on these protocol rules. Each one broke the checks until it was fixed (full notes in the archive, "MakeCode: embedding check"):
- Be a real project store: answer every `workspacesync` with all projects.
- After `importproject`, follow the new id.
- Set the project name in `pxt.json`.
- Build imports from a real header.
- Starters can be JavaScript only (`switchblocks` after the import).
- Route messages by frame.
- Saves arrive in pairs: wait about 500 ms after the last one.
- Controller mode reports no compile errors, so checks read `main.ts`.
- Ignore the leftover default project.

Risks: we depend on Microsoft's hosted editor and its unversioned message API. Fallback: link out to MakeCode's own tutorials. `?tutorial=` works but is not a lesson option yet (see Parked).

## Standing decisions

- **Pathways are options, not gates** (`after:` is a hint). Typical year fit is a teacher note only. Extensions run side by side after the console bridge. The only real dependencies are machine learning after Data detective and microStudio after Objects.
- **Build it yourself, then meet the real tool**, for example turtle buttons before Gradio.
- Arcade is games with blocks; microStudio is games in text code.
- **Python runtimes:** Skulpt for turtle, the console bridge and Objects. One Pyodide playground, hosted on our site, for everything that needs real libraries.
- Gradio over Streamlit. Flask, then optionally FastAPI. Storage goes variables → CSV → JSON → SQLite.
- APIs are kept small: keyless only, always with a saved copy to fall back on.
- **Data sets are swappable:** one table shape, with each set's licence and credit line shipped beside it.
- **Hidden assumptions:** use the `introduces`/`assumes`/`recipes` lint plus scaffolds inside lessons; no "Before you start" card. MakeCode, HTML, p5.js and the turtle lessons are tagged.
- **No vendor CDN at run time:** p5, Pyodide, microStudio and Teachable Machine are all served from our site.
- **No student accounts on our site.** Progress is saved per browser.

## Proposed (discussed, not decided)

- **Revisit if/else** in a new context: a function that decides and an `if` over a list are built (turtle lesson 8); still open: an `if` inside a Gradio function.
- **Clips on the create page:** a helper to write `explainClip` steps, and a live preview.
- A small form on the create page for code-check rules.
- Drag-and-drop for match items; keep Parsons answers across reloads.
- Prepare: confirm its load-by-URL parameter so "Copy address" can become "Open in Prepare".

## Built (12 Oct 2026, Matthew agreed): recap and open projects for code

Maths and science have recap pages (`recap: true`, roadmap/shared.md). For code, recalling an idea is not the same as using it, so the plan has two parts that do different jobs:

1. **Recap (cheap).** All 162 code lessons already have `exit:`. Turn on `recap: true` for the foundations courses (Python, HTML & CSS, micro:bit, Arcade) once each exit question has been checked to stand alone, as maths did. Use it at the crossings between courses: Python to Gradio or the console bridge, HTML to Bootstrap or the DOM, micro:bit to Robotics.
2. **Open projects (the main value).** A Projects page per pathway (`<subject>/paths/<id>/projects/`, or a course flag) with 4 to 6 loose briefs. Each brief has:
   - a goal and one picture of a possible result (never the code)
   - "You'll use" chips linking to recap cards, so recap is where a stuck student goes
   - 2 or 3 milestones students tick themselves, and "make it yours" stretch ideas
   - no code checks (a reflect check at most)

   This is the step after Make and the challenge units, with less support. It stays apart from "large projects belong to the teacher": these are small, self-paced briefs, and bigger ideas stay in For teachers. Python and Web first. MakeCode's Showcase, Patrol and Tripwire already work much like open briefs.
3. **Coach prompts: off for code.** An AI is likely to write the solution. If wanted later, use a stricter prompt (no code, ask a question back) and test it in Copilot first.

**Where projects live (agreed 12 Oct).** Each brief is written in a course (`content/code/<course>/projects.yml`) and shown in three places:
- a Projects chip on the course page, beside Playground, Reference and Recap
- a side branch on the pathway trail just after that course, which never blocks the main route
- gathered for the whole pathway in its "List for teachers" view, and listed in the course's teacher guide beside its primers

A brief that needs two courses belongs to the later one. Why not a pathway page alone: the "You'll use" chips link to course recap cards, and one long page would mix briefs for students at very different points.

**A project is a self-assessed achievement (discussed 12 Oct).**
- **Milestones.** The student ticks them ("it runs", "it does the goal", "I added my own idea"); nothing is marked.
- **Evidence chips.** Worked out from the code by the concept scan: "You built it with: functions with parameters · a list · an `if` inside a loop". A brief lists only 3 or 4 skills. The wording is "you used", never "you still need", so students aren't pushed to cram in constructs.
- **A short reflection,** such as "the hardest part was…".
- **A badge,** kept apart from lesson progress (it shows on the course page and the trail, not in "Done").
- **A "Show your teacher" card** (badge, skills, reflection, Download), because progress is per browser.

**No new playground features.** Every playground already reports its code to the page. The page embeds the course's playground as a step and runs `conceptsIn(code, language)` on each report. That function moves into a pure `concepts-core.mjs` the build copies to the site, as `python-errors.mjs` is. One thing to check: a Python project with modules must report every tab. These are shared changes (`build-site`, `lesson-view`, the scanner split), so they get a roadmap/shared.md proposal before building.

**Crossovers (later, a small set).** For example, a micro:bit and a web page:
- one page, a playground per part, chips combined
- lives in the course after both halves (micro:bit and the computer), and shows on both trails
- needs a small `microbit.js` helper in `media/` (`connect()`, `onLine()`), labelled as a recipe
- the sandboxed preview probably can't use Web Serial, so the real version is downloaded and opened in Chrome (`tier: typical`), and a "pretend micro:bit" button sends lines in the playground

**Decided and built (12 Oct, "build it now"):**
- Briefs are `projects.yml` per course, with examples in `projects/` (AUTHORING › Open projects).
- Badges never count towards Done.
- The reflection shows on the Show your teacher card.
- Recap shipped with the exit-question check (four questions that leaned on their lesson rewritten: turtle-catch, turtle-decisions, microbit-duel, microbit-reaction; their clips re-record).
- `microbit.js` is ours (`web-helpers/`), not a site like MakeAIRobots, so the pages students make keep working from a downloaded file.

**What exists:**
- Python Foundations: Pattern maker, A street of your own, Chart your data, Click-and-key art, Your own game.
- HTML & CSS: A page about something you love, A recipe card, An event page, An order form.
- micro:bit and the computer: A live dashboard (crossover: MakeCode and a DOM page with `microbit.js`).
- Recap on for Python, HTML & CSS, micro:bit and Arcade.

**Next:**
- Briefs for Arcade, micro:bit, the DOM course, Vue and Bootstrap.
- MakeCode examples have no picture yet (render-pictures draws Python and HTML ones).
- Try the badge and the Show your teacher card with a class.
- Test `microbit.js` with a real micro:bit in Chrome (the sandbox has no USB).

## Proposed (12 Oct 2026, Matthew agreed the direction; not built): Web pathway after the DOM

The plan keeps "build it yourself, then meet the real tool": students hand-build components (HTML & CSS) and state (DOM lesson 6) before a framework does the same work for them. Everything runs in the browser with no build step, and every library is hosted on our site.

1. **Bootstrap** (built 12 Oct, see Courses; extension after HTML & CSS; about 3 lessons). Rebuild the club page's navbar, cards and form with Bootstrap classes, compare it with the hand-built CSS, then customise it.
   - Bootstrap's CSS is hosted under the HTML playground's media folder, so the HTML playground works unchanged.
   - Checks use `contains` on class names.
   - Why Bootstrap rather than Tailwind: it reads easily for beginners, and its class names map onto the components students already built by hand.
2. **Vue** (built 12 Oct, see Courses; extension after the DOM course; about 5 lessons, Years 10+).
   - Lessons: data and `{{ }}`, `v-if` and `v-for`, events, `computed`, components with props, then a small app (the quiz or a to-do list).
   - Teach the **Composition API** (`ref`, `computed`), because it is the closest to React hooks and Svelte's patterns.
   - The no-build version of Vue (about 150 KB) is hosted on our site. It probably runs in the DOM playground, with `<script>` loading it.
   - The hard part: when the page updates, and keeping derived values in `computed`.
3. **Same app, three frameworks** (built 12 Oct as `code/vue/vue-compare`; an optional last Vue lesson). The same small app in Vue, React-style (Preact with htm, about 5 KB) and Svelte (its compiler in the browser, about 1–2 MB, loaded only by this lesson).
   - The point: components, state, derived values and events are the same ideas in all three, and only the syntax and update rules differ.
   - React's update rule (`setState`, and replacing values rather than changing them) is named as the thing that catches people out.
   - Angular is left out: it needs TypeScript and a command-line toolchain. AngularJS is dead (support ended in 2021).
4. **`fetch` and APIs in JavaScript** (built 12 Oct as `code/dom/dom-fetch`; an optional DOM lesson). Load JSON, show it on the page, and fall back to a saved copy when the network fails, as Data detective does in Python.

## Built (12 Oct 2026, Matthew agreed): the end of the Web pathway, with or without a framework

Every route through the Web pathway (hand-built pages, Bootstrap, the DOM, Vue) ends in the same optional steps. They teach no new framework and work on whatever page the student already has.

1. **Saving between visits** (optional DOM lesson 10, `code/dom/dom-save`). Plain `localStorage`: save a list or score as JSON when it changes, load it when the page opens, and start fresh when nothing is saved. The teacher notes show the Vue version (`watch` the list and save it), for students coming from the to-do app.
2. **A new course, "Your site, for real"** (`code/site`, extension, `after: [code/html]`, so every route reaches it; 2 lessons, bring your own page):
   - **Pages for everyone:** headings as the page's outline, `alt` text, labels joined to their boxes, link text that says where it goes, contrast; then a five-minute test with a classmate and fixing the top three problems. Works the same on a hand-built page, a Bootstrap page or a Vue app.
   - **Put it online:** "you have a website; here is how it goes online". A site is files in a folder: download the page, put its pictures and library files (`vue.js`, `bootstrap.min.css`) beside it, make every path relative, open it from the computer to test, then publish. Publishing itself is teacher-led (accounts): GitHub Pages, Netlify Drop or the school's own server, each in the teacher notes with the account and privacy questions. That step is `tier: typical`, so classes without accounts can complete the course.
3. **Playground change (code chat's own files):** a **Download** button in the HTML and DOM playgrounds. It saves the page as `index.html` (wrapped in a full HTML page if the code has no `<!DOCTYPE>`) and lists the files the page uses from beside it (pictures, `vue.js`, `bootstrap.min.css`, `weather.json`), each with its own download link. Every HTML and DOM clip already records again at the next publish, so this adds no cost.

**Parked: Node.js.** It does not run in a browser. StackBlitz's WebContainers is proprietary, heavy, and needs security headers GitHub Pages cannot set. Local installs or online editors need accounts. Flask already teaches servers and APIs, and schools generally prefer Python. Revisit only if a school wants a JavaScript-only path.

## Parked

- Pygame: only after a prototype proves the in-browser runtime. microStudio covers games for now.
- Blockly.
- Auto-closing tags in the HTML playground; a student view link for unpublished lessons.
- MakeCode tutorials as a lesson option (`try.tutorial`). `?tutorial=` already opens built-in and GitHub tutorials in our embed.
- **Hiding blocks (toolbox filters), decided 12 Oct: not per step.** Hidden blocks make later tasks confusing, our editor would differ from the MakeCode students use elsewhere, and every step's list would need upkeep against an unversioned API. If hiding blocks is wanted (say after class trials show overwhelm), it comes through tutorials: a MakeCode tutorial limits the toolbox to the blocks its own code uses, so a tutorial as a lesson option (above), for a guided Make or a first lesson, is the way.
- An Arcade "Worlds" unit (tilemaps); a picture of the robot arena.

## Log
- 12 Oct: open projects (10 briefs, self-assessed badges, skills lit by the concept scan), `microbit.js` with a pretend micro:bit, recap on four foundations courses.

- 12 Oct: per-step MakeCode toolbox filters parked; hiding blocks, if wanted, comes through tutorials (Parked).
- 12 Oct: Python Foundations lesson 8, Functions that decide (the lists and `if` revisit); later lessons renumbered 9 to 15 (slugs unchanged, so progress keeps).
- 12 Oct: Saving between visits (DOM lesson 10), Your site, for real (2 lessons), and a Download button in the HTML and DOM playgrounds.
- 12 Oct: Data from the web: fetch (optional DOM lesson 9). The four web proposals are all built.
- 12 Oct: Apps with Vue (6 lessons + optional Same app, three frameworks); the DOM playground loads local libraries with CORS and gives Vue hints; `check-html` also walks the DOM and Vue courses.
- 12 Oct: Pages with Bootstrap (3 lessons), with a nod to Bulma, Tailwind, daisyUI and Pico (Matthew's request); `vendor/web/` and the shared changes in `shared.md`.
- 12 Oct: `struggle:` notes for all 63 MakeCode lessons; every code lesson now has one (`npm run effort` is clean for code).
- 12 Oct: effort audit for Python Foundations, the console bridge, Objects, Deeper Python 1 to 5 and HTML & CSS (40 `struggle:` notes; 17 first hints now point at the idea, with the code as the next hint); two overflowing deck slides fixed (Robotics Drive, Python Variables).
- 12 Oct: voiceover for the 19 clips in p5.js, DOM and Games (`af_heart` at 1.1; `say:` lines read code aloud). Timed with the test voice: 24 to 32 s.
- 12 Oct: Games with microStudio gets a Playground, Reference and three clips; this file is rewritten (history archived).
- 11 Oct: DOM course; p5.js course with Reference, pictures and clips; Data detective, Web apps with Flask, Apps with Gradio, Machine learning, Deeper Python, Objects, the console bridge, the Python playground, Check your school.
- 10 Oct: Robotics, micro:bit and the computer, AI robots, Secret messages, the MakeCode hidden-assumptions scan.
- 9 Oct: HTML & CSS, micro:bit Foundations, the MakeCode playground, Arcade written.
