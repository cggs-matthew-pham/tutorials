# Roadmap

Split by workstream on 11 Oct 2026 so separate chats can work at the same time (one each for code, maths and science) without editing the same file:

- [`roadmap/code.md`](roadmap/code.md): Python, Web (HTML and CSS) and MakeCode, including everything recorded here before the split.
- [`roadmap/maths.md`](roadmap/maths.md): maths lessons and boards.
- [`roadmap/science.md`](roadmap/science.md): science lessons and engines.
- [`roadmap/systems.md`](roadmap/systems.md): Digital systems (the Digital Technologies Knowledge and understanding strand: data representation, networks, security, hardware), added 12 Oct 2026.
- [`roadmap/engineering.md`](roadmap/engineering.md): Engineering (an elective STEM layer: mechanisms, physical computing with Arduino, CAD and fabrication, board design, 3D and animation), added 12 Oct 2026.
- [`roadmap/shared.md`](roadmap/shared.md): shared and general: the build, publishing, home and plain pages, and shared tools.

"ROADMAP › <section>" in CLAUDE.md, AUTHORING.md and BUILDING.md means that section in the subject's file. Older sections moved to `roadmap/archive/` when a file was tidied (the code file on 12 Oct 2026: `roadmap/archive/code-to-2026-10-12.md`), so look there if a section is not in the current file.

## Working in parallel

1. Start every session with `git pull --rebase origin main`, then read CLAUDE.md and your subject's file.
2. Write decisions and proposals in your subject's file only. Your lessons live in your subject's folder under `content/`.
3. Shared files (anything under `tools/`, `playground-shared/`, `playground-board/core.js`, `tools/lesson-view.mjs`, CLAUDE.md, AUTHORING.md, BUILDING.md, `roadmap/shared.md`): before changing one, check `roadmap/shared.md` and `git log` for work already under way, keep the change small, and say in `shared.md` what you changed.
4. Before every push, `git pull --rebase origin main`, run `npm run validate`, and resolve any conflict by keeping both sides' work. Never force-push to `main`.
5. Pushing deploys nothing. One manual publish run builds whatever is on `main`, so any chat's pushes go out together.
