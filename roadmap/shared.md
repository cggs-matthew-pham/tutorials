# Roadmap: shared and general (site, build, shared tools)

Things more than one subject depends on: the build, publishing, the home and plain pages, and shared tools (`tools/*.mjs`, `tools/lesson-view.mjs`, `playground-shared/`, `playground-board/core.js`). Before changing one of these, check this file and `git log` for work in progress, and note here what you are changing.

## Done: home page and plain pages (11 Oct 2026)

`content/index.md` `about:` renders on the home page (About, Why we made this, How the lessons work). Any other `content/<name>.md` is a plain page at `/<name>/`: `approach.md` (Why we teach this way; references checked) and `behind-the-scenes.md` (how lessons are made and checked, privacy). Claims stay true to what the tools do; checks not yet built are worded as aims.

## Shared: progression data and node check (decided 11 Oct 2026, not built; for maths and science)

The `introduces`/`assumes` scan suits code, where a dependency is a construct on screen; each subject has a different kind of dependency, so maths and science also get their own in-lesson checks (see their files).

- **Data:** export the kit's nodes and `prior_knowledge` for the covered descriptors into the repo (a small JSON file), and add `node:` (descriptor and node) to every maths and science lesson.
- **Check:** warn when a lesson's node depends on a node that no earlier lesson covers and that the lesson does not list in `assumes:` (taught in class). Without `assumes:` most science lessons would warn, since one tutorial per hinge node leaves most prior nodes to class teaching. It finds gaps between nodes only; ideas used inside a lesson that the kit does not record still need a read-through.

Build it once, in one chat, and note here who is building it before starting; the other subject then tags its own lessons.

## Parked

- Custom domain setup (DNS and the Pages setting are on Matthew's side).
- Progress export and import (a short copy-and-paste code to move progress between browsers) and a printable certificate of current progress. A fun long-term idea; keep it account-free.
