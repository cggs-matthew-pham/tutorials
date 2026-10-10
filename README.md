# waypoints-tutorials

Write a lesson as markdown. Get a GitHub Pages site with recorded walkthrough clips.
No LLM runs at build time: an LLM (or you) writes `lesson.md` once, and CI renders it.

```
content/<subject>/<collection>/<lesson>/     e.g. content/code/python/turtle-intro/
  lesson.md          PRIMM steps + clip scripts (the only thing you author)
  *.py               the code being taught (shown on the page AND typed in the clips)
  requirements.txt   (optional)
content/<subject>/index.md, content/<subject>/<collection>/index.md   titles for the index pages (optional)
playground/          lightweight Python turtle playground (Skulpt + Canvas), embedded in lessons
tools/               validate / render / build
```

**What the build does**

1. `validate`: parses every lesson, checks code references and clip actions.
2. `render`: starts the lesson's app, drives it with Playwright from the clip script,
   asserts the results (`expect`), encodes `step-N.mp4` + poster with ffmpeg.
   Unchanged clips are skipped.
3. `build`: writes `dist/` (static HTML). A lesson's URL is its path under `content/`, e.g. `/code/python/turtle-intro/`; every folder above it gets an index page. The playground is copied to `/_playground/`. Steps whose clip is missing show a labelled
   placeholder, so you can publish the written lesson before any clip exists.

## Quick start

```bash
npm ci
npm run validate
npm run build            # site with placeholders, no browser needed
npx playwright-core install chromium   # once
npm run render           # needs ffmpeg and the lesson's own dependencies (pip install -r ...)
npm run all
```

`npm run render` first builds the playground (`dist/_playground`), which turtle lessons record and embed.

Open `dist/index.html`.

## Publish on GitHub Pages

1. Settings → Pages → Source: **Deploy from a branch**, `gh-pages`, root.
2. Push to `main` (this runs nothing by itself).
3. Actions → **Build and publish (manual)** → Run workflow. `.github/workflows/publish.yml` validates, reuses what is live, records and draws the rest, and pushes the built site to `gh-pages`.

A clip whose `expect` fails fails the build, so a published lesson cannot silently drift
from the code it teaches.

## Add a lesson

Copy `content/code/gradio/intro/` (a web app) or `content/code/python/turtle-intro/` (the playground), then follow [AUTHORING.md](AUTHORING.md). For a whole new course, read [BUILDING.md](BUILDING.md) first. It documents the
whole format and doubles as a brief you can hand to an LLM ("write a lesson on X following
AUTHORING.md").

## What suits this approach

Anything that runs as a web page or a local web server: Gradio, Streamlit, Flask apps,
p5.js, Blockly, a Godot web export, or a hosted site such as MakeCode (CI has open
internet). Desktop apps are out of scope.

## The playground

`playground/` is a small, dependency-free Python turtle environment: real Python via Skulpt
(vendored from npm at build) drawing on a plain Canvas 2D renderer. It is not the full
CodeSwitch app (no blocks, transpiler or JS mode). Lessons embed it for students with a
`try` block and record it with `app.layout: full`. See AUTHORING.md.

## Playgrounds

- `playground/`: Python turtle (Skulpt + Canvas) at `/_playground/`.
- `playground-html/`: HTML & CSS, no dependencies, at `/_playground-html/`. The preview is a sandboxed iframe.

A step picks one with `try: { playground: html }` (default `turtle`). To record the HTML one, a lesson's `app` serves
`dist/_playground-html` and clips type into the field labelled "HTML code"; `expect` can check `#preview-text`
(the text of the rendered page). See `content/code/html/first-page/`.

## Snippets and reference pages

`snippets/turtle.json` and `snippets/html.json` are the single source for two things: the **Reference**
drawer in each playground (it covers the canvas or preview; cards show real code with a Copy button and students
paste it where it belongs; search, plus a This lesson / All filter; `‹text›` marks a value to change), and the generated cheat sheets at `/code/python/reference/` and `/code/html/reference/`.
Each snippet needs a `label`, `code` and `hint`; `npm run validate` checks them. Lesson steps can lock snippets
until the student passes a check (a tick box or a short question); see AUTHORING.md section 7. Progress is per browser.

## Modules

`modules/*.py` are shared Python modules (e.g. `shapes.py`) that a lesson can offer with `modules: [shapes]`; each
function becomes a palette button, and students can open the source with "Show how it works". See AUTHORING.md section 8.

## Create a lesson in the browser

`/code/create/` is a MakeCode-style lesson maker: paste or upload `lesson.md` and code files, see a live preview
(with the working playground), get validation messages, copy a share link, and download the lesson folder as a
.zip to commit under `content/`. It runs entirely in the browser, reusing the same parser, validator and page
renderer as the build (`tools/lesson-core.mjs`, `tools/lesson-view.mjs`). Clips are placeholders there; they
are recorded by CI once the lesson is in the repository.

While editing `lesson.md`, the helper row adds a **tick box** or **question** check to the step under the cursor and
opens a picker for the **snippets it unlocks**. The preview locks those snippets in its playgrounds so teachers can
try the whole flow ("Reset progress" clears what they passed), and unknown snippet ids are flagged.

## Custom domain

Set the domain under Settings → Pages (DNS CNAME to `<user>.github.io`). Nothing in the build assumes a domain; links are relative.

## Sandbox note

In environments that cannot download browsers, the optional dependency `@sparticuz/chromium`
(installed by plain `npm install`; CI skips it) provides a Chromium binary through npm; the renderer uses it automatically if present.
You can also point `CHROMIUM_PATH` at any Chromium.
