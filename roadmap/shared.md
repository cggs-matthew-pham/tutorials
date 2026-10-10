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

## Parked

- Custom domain setup (DNS and the Pages setting are on Matthew's side).
- Progress export and import (a short copy-and-paste code to move progress between browsers) and a printable certificate of current progress. A fun long-term idea; keep it account-free.

## Changed by the science chat (11 Oct 2026)

- Board pictures for science (Matthew approved): `usesBoardPictures(lesson)` in `tools/lesson-core.mjs` (maths, or science with no step on the science board). Validate, `render-pictures.mjs` (the `board` job) and `build-site.mjs` (the picture lookup) use it instead of `language === 'maths'`. Maths pictures and their hashes are unchanged; science-board lessons (`playground: science`) still cannot have pictures (that needs a draw function for `_playground-science/`).

- `playground-board/widgets/universe.js`: the redshift spectrum is drawn 5 times bigger, not 20 (at 20, far galaxies showed no lines). AUTHORING › 12 `universe` line updated to match. Only the Redshift lesson uses it.
