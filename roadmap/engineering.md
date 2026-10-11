# Roadmap: Engineering

An elective STEM layer beside Code, Maths, Science and Digital systems: `content/engineering/`. Not core Digital Technologies (Code and Digital systems carry that): what a school with kits, a makerspace or a STEM elective adds. Lessons apply Maths, Science and Code rather than re-teach them, and name their curriculum hooks (D&T Engineering principles and systems first) without aiming for descriptor coverage. Plans and reasons: Project docs `engineering-plan.md` and `physical-computing-plan.md` (12 Oct 2026).

Principles: borrow first and build only where a lesson needs a check (benchmark SparkFun, Raspberry Pi Foundation, Teach Computing, TeachEngineering; adapt only openly licensed material once the site licence is decided; link the rest); one home per idea (gates and vector vs raster stay in Digital systems); two lesson shapes, the maths shape for concepts and a design-project shape (brief, criteria and constraints, build, test, evaluate); build there, check here for outside tools (Tinkercad, Onshape, Blender), as the classifier does for Teachable Machine.

## Done (12 Oct 2026): subject and the winch

- Subject `content/engineering/index.md` ("Engineering", trail by units). Pathways: Mechanisms (built: Mechanisms; planned: Levers and pulleys), Physical computing (planned: Circuits with the micro:bit, Arduino, Power and motors), CAD and fabrication (planned), Design your own board (planned), 3D and animation (planned).
- Course `engineering/mechanisms`, unit Gears: 1. Gear up the winch (from Project doc `engineering-sample-lesson.md`). Primer `primers/gears.md`. Misconceptions `bigger-gear-faster`, `gear-ratio-upside-down`, `gear-one-effect`. No `node:` (Engineering is not in the node check; there are no D&T progression pages).
- Board widget `gears` (AUTHORING › board): gears from a kit, Turn once, Lift (stalls), hidden numbers for the Try, `brief: edit` lists the pairs that pass (the Make: a brief with exactly one passing pair).
- Lessons use `language: maths` (board, answer and number checks, worked examples, maths stage names), as Digital systems does.
- Every board check tested in a headless browser; the explain clip records (silent here).
- Clip-server ports: Engineering lessons use 8500–8539.

## Next

1. Practise with code: the sample lesson's Python loop over every gear pair. A maths lesson has no Python playground; either a short linked Python task (console bridge) or leave it to the Code pathway.
2. Mechanisms: compound gear trains (Years 9–10, with efficiency per mesh and the constraint as an inequality), levers, pulleys.
3. Physical computing unit 1 (Circuits with the micro:bit in Tinkercad): observation answers; a `serial` paste mode for Tinkercad's serial monitor (the widget exists for real micro:bits).
4. CAD lessons 1–2 (dimensions, tolerance) with answer checks.
5. `tools/concepts.mjs` `prerequisites()` reads `code, maths, science, systems`: add `engineering` when the first built Engineering course has `after:`.

## Open questions

- Subject name: Engineering, Make or STEM.
- Pathway order: Mechanisms first (no kits), CAD, or Physical computing.
- Kits, printers, slicer and laser cutter at the school; Onshape or Fusion; Raspberry Pis.
- LiPos at all, or AA and NiMH only.
- Site content licence (decides whether CC BY-SA kit guides can be adapted).
