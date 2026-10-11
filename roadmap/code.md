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
- The lists and `if` revisit: lists inside functions, and an `if` inside a function that decides (see Proposed).
- Effort audit: the MakeCode courses (63 lessons) still have no `struggle:` notes (`npm run effort`).
- MakeCode toolbox filters per step (`importproject` takes `filters`).

## Courses

Lesson counts include optional lessons. "Pictures" are drawn by `render-pictures`; "clips" are explain clips unless named.

### Python pathway

- **Python Foundations with Turtle** (`code/python`, 14 lessons): built.
  - Lessons, in order: intro, variables, decisions, lists, functions, parameters, returns, modules, events, build a button, then the challenge (Catch the turtle and Power-ups, plus optional Control panel and Game levels).
  - Has teacher layer, voice and concept tags.
  - Still to do: the lists and `if` revisit.
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
- **Drawing and animation with p5.js** (`code/p5`, 8 incl. optional Moving art): built 11 Oct.
  - Own playground (`playground-p5/`, p5 2.3.4 vendored), Reference (37 cards), pictures and clips.
  - Not done: clips for the moving sketches (animated sketches show a still), a class trial.
- **The DOM and the browser console** (`code/dom`, 8 incl. optional The real browser console): built 11 Oct.
  - Its own `playground-dom/` (Run, console panel, DOM hints; reports as `html`), clips and expected pictures.
  - Not done: a class trial, saving between visits (by design).

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

- **Revisit if/else** in a new context: a function that decides, an `if` over a list, an `if` inside a Gradio function.
- **Clips on the create page:** a helper to write `explainClip` steps, and a live preview.
- A small form on the create page for code-check rules.
- Drag-and-drop for match items; keep Parsons answers across reloads.
- Prepare: confirm its load-by-URL parameter so "Copy address" can become "Open in Prepare".

## Parked

- Pygame: only after a prototype proves the in-browser runtime. microStudio covers games for now.
- Blockly.
- Auto-closing tags in the HTML playground; a student view link for unpublished lessons.
- MakeCode tutorials as a lesson option (`try.tutorial`). `?tutorial=` already opens built-in and GitHub tutorials in our embed.
- An Arcade "Worlds" unit (tilemaps); a picture of the robot arena.

## Log

- 12 Oct: effort audit for Python Foundations, the console bridge, Objects, Deeper Python 1 to 5 and HTML & CSS (40 `struggle:` notes; 17 first hints now point at the idea, with the code as the next hint); two overflowing deck slides fixed (Robotics Drive, Python Variables).
- 12 Oct: voiceover for the 19 clips in p5.js, DOM and Games (`af_heart` at 1.1; `say:` lines read code aloud). Timed with the test voice: 24 to 32 s.
- 12 Oct: Games with microStudio gets a Playground, Reference and three clips; this file is rewritten (history archived).
- 11 Oct: DOM course; p5.js course with Reference, pictures and clips; Data detective, Web apps with Flask, Apps with Gradio, Machine learning, Deeper Python, Objects, the console bridge, the Python playground, Check your school.
- 10 Oct: Robotics, micro:bit and the computer, AI robots, Secret messages, the MakeCode hidden-assumptions scan.
- 9 Oct: HTML & CSS, micro:bit Foundations, the MakeCode playground, Arcade written.
