# Roadmap: Science

The science chat's file. Lessons live in `content/science/` (see CLAUDE.md › Science).

## Done: kingdoms are not family trees (11 Oct 2026, Matthew's request)

A colleague's objection: teaching kingdoms as the endpoint implies same kingdom = close relatives and hides that classification is a model revised under evidence. Year 7 Kingdoms now has two Explain questions on the main path (a mushroom's closer relative is a sea star, not a fern; why classification went from two kingdoms to five to three domains), plus the revision summary, explain text, clip, goals, teacher notes and primer. Year 10 lessons don't lean on kingdoms. Still worth doing: a tree-of-life or common-ancestry step in Year 10 Natural selection, which would close the loop.

## Done: Explain it to me, batch 1 (11 Oct 2026, science chat)

Voiced explain clips (Emma, as maths) for 12 shared-board lessons: Year 7 Physics (arrows, balanced, unbalanced, weight), Year 10 Physics (first law, acceleration, F = ma) and Year 7 Biology (kingdoms, keys, food webs, energy flow, cascades). Each lesson has an `explain` region in `boards.yml` (its own small example, not the lesson's tasks) and `app:` on ports 8200–8211 (next free: 8212). Recorded locally with the flite test voice: 18–30 s each, frames checked; the publish run records the real voice.

`explainPicture` (a still of the idea, `explain-pic` region in `boards.yml`) on 9 of them, after the shared-tool change in `shared.md`. Not on Kingdoms and Keys (the key widget has no drawing for the picture tool) or First law (sliding friction cannot show in a still).

Next: batch 2 (Biology 8–10, Earth and space 7–10, 27 lessons), then a science-board pilot.

## Done: model checks and Year 7 forces node 3 (11 Oct 2026, science chat)

Plan approved 11 Oct; each item pushed to `main` (source only). Year 7 node text came from the AC9S7U04 progression page Matthew pasted (the kit is unreachable).

1. **Plates** (`earth-8/plates`): Explore opens with a one-question convection recap (warm fluid rises because it is less dense; feedback for "heat rises" and "hot is heavier"); teacher notes name the dependency on Year 9 Heat transfer and Year 7 density.
2. **Model-check review of the leads.** Heat transfer (`physics-9`): new Explain question, why the heated water rises, with feedback that names the board's push-up shortcut. Redshift (`earth-10`): Explore opens with a "Reading a spectrum" recap (wavelength, dark lines, stretched light); teacher note: assumes Year 9 waves. Photosynthesis needs no lesson change: the Year 8 Cell parts board introduces chloroplasts (photosynthesis), Year 7 Energy flow has producers capturing sunlight, and Carbon and living things teaches it itself; Cell parts' revision summary now names it.
3. **New lesson `physics-7/unbalanced`** (AC9S7U04 n3, order 3; Weight moves to 4): a steady push slows, stops and reverses a puck on ice (`forces`, `when: t >= 1 and v < 0`); Explain widens "change in motion" to starting, stopping, reversing and turning, with a force-diagram question; Typical starts a box from rest against friction; Wider: a fair test and the spearthrower. Every check passes in a headless run; decks fit.
4. **Node 5 as a class task**, not a tutorial (the kit marks it an integration point): `physics-7/primers/forces.md` › Class task (rubber-band trolleys, predict, an example data table, success criteria from the progression).

**Still open from this pass**
- **Redshift spectrum (fixed 11 Oct, approved):** the `universe` widget drew the shift 20 times bigger, so far galaxies showed no dark lines at all; it now draws it 5 times bigger (an 876 million light-year galaxy keeps three lines; the farthest keeps two). Text updated in the widget, Redshift teacher notes, the universe primer and AUTHORING.
- **Science node tags (waiting for the kit, Matthew 11 Oct):** the maths chat built the node check (`shared.md`). Science opts in by adding `data/progressions/science/` pages, `node:` on its lessons and itself to `CHECKED`; AC9S7U04 is ready to save from the pasted page. Needs the other science progression pages.
- Explain clips for science (gap noted above), populations engine, the remaining Years 8–10 nodes: unchanged.

## Planned: prerequisite checks and model checks (decided 11 Oct 2026, not built)

The code-style scan does not carry over: maths and science have no code to scan, and their tutorials sit beside class teaching. Checked against the repo: no lesson has a `node:` field (the node is named only in `teacher.yml` summaries, such as Plates "AC9S8U03, node 2"), and the repo holds no progression data (`prior_knowledge` lives in waypoints-kit and no build step reads it). 55 science and 19 maths lessons.

- **Science:** the risk is less a missing lesson than a model students hold in a different form (distance causes seasons; convection without density). So the main check is in the lesson: the Engage prediction must test the model this lesson relies on, with wrong options tied to its misconceptions, and the teacher notes name the model's simplifications. The node graph (as for maths) only flags big gaps between lessons. Gaps inside a lesson still need a manual review.
- **Science:** both kinds of gap matter. Between lessons, dependencies inside a strand are strong (the node graph catches them). Inside a lesson, the bigger risk is a model held in a different form (distance causes seasons; convection without density), so the Engage prediction should test the model the lesson relies on, with wrong options tied to its misconceptions, and the teacher notes name the model's simplifications (a review question, not a hard rule).
- **Found already (fixed 11 Oct, see Done above):** Year 8 Plates (`earth-8/plates`, AC9S8U03 n2) relies on convection, which the tutorials teach in Year 9 (`physics-9/heat-transfer`). Fix in Plates (a short convection recap with density) or mark `assumes:` with a teacher note.

Leads for the first science review (checked and resolved 11 Oct, see Done above): Year 8 *Plates* relies on convection, taught in Year 9 *Heat transfer*; "warm fluid rises because it is less dense" relies on density from Year 7 *Properties*; Year 10 *Redshift* uses wavelength and spectra, which no science lesson introduces; Year 8 *Organs* and *Specialised* and Year 9 *Carbon and living things* assume photosynthesis.

Related gap (11 Oct): none of the 55 science lessons has an `explainClip`, `explainPicture` or `voice:` yet. The 38 on the shared board can follow the voiced maths pattern; the 17 on the science board (`playground-science/`) may need recorder support first.

The shared part (progression data in the repo, the `node:` field and the node check in validate) is in `shared.md` › Shared: progression data and node check.

## Done: Science, Year 7 Chemistry (pushed 9 Oct 2026)

New subject **Science** with pathways Chemistry (built), Biology, Physics and Earth and space (coming later). Year 7 Chemistry: seven concept tutorials for introducing or revising (AC9S7U05 nodes 1–3; AC9S7U06 nodes 1–4), each a mini 5E cycle on the existing stages, with width tiers (`tier: typical | wider`, `?width=` floor) and a science board (`playground-science/`, particle engine and 15 widgets). New `sort` check and per-option `question` feedback; tiered checks are not needed to finish a lesson. Teacher layer: `teacher.yml` per lesson, primers for both units; decks and worksheets use 5E labels.

Slides embed the live board (`{{embed: URL}}`, Prepare loads it on the active slide only). Science courses have no cheat sheets (no commands to list; the primers carry the key ideas). Decided 9 Oct: no science revision sheets or glossaries either. Those belong to the planning side of the suite (Prepare, the node glossaries in waypoints-kit); here each lesson ends with a revision summary, and the deck and worksheet go into Prepare.

## Science engines: Years 7–10 plan (decided 9 Oct 2026, not built)

Engines are organised by what they model, not by subject or year. Every Years 7–10 Understanding hinge node in waypoints-kit `data/science/` sorts into one of five engines or a widget on the shared board (see the maths boards plan; diagram and data work waits for it).

| Engine | Hinge nodes | Notes |
|---|---|---|
| Particles + atoms (extend `playground-science/engine.js`) | 8U06 n1, n3 · 8U07 n2 · 9U07 n2 · 10U07 n5 · 8U04 n2 | Atom types, bonds, a reaction rule (collide with enough energy, rebond). Also convection for 8U03 n2 and 9U04 n1. Independent of the shared board: build first. |
| Forces and motion (new) | 7U04 n3, n5 · 10U05 n2–4 | Runs a free body diagram: trace, v–t graph from the shared board, friction toggle (Newton's first law misconception). |
| Stocks and flows (new, small) | 9U01 n5 · 9U05 n1, n2 · 10U04 n1–3 · 8U05 n4 · 9U03 n3 | Stores, flows and a set point: feedback, energy balance, greenhouse, conservation, carbon. Graphs from the shared board. |
| Populations, agents (new) | 7U02 n4 · 10U02 n1, n2 · 9U02 n3 | Heritable trait, selection pressure, predator and prey. Half-life (9U06 n4) is the same engine with random decay. |
| Sky model (new, geometric) | 7U03 n1, n2, n4 | Lit globe in two views; one standard only, last. |

Widgets on the shared board (no engine): free body diagram and vectors (7U04 n1, n2 · 10U05 n1, n6; its arrows feed the motion engine), classification key walker (7U01 n2, n3), atom and shell builder (9U06 n1 · 10U06 n1, n2), Punnett square (10U01 n4), equation balancer (9U07 n4), food web (7U02 n1, n2), labelled or zoomable diagrams (cells, organs, receptor pathways, meiosis, Earth's layers and spheres, sound waves, decay types, gametes, Big Bang timeline).

Built (branch `atoms`, 9 Oct): the atoms engine (`atoms.js`) with the `atoms` widget (elements, compounds, mixtures: 8U06 n1, n3, n4) and the `reaction` widget (chemical change and the atom tally: 8U07 n2, 9U07 n2; exothermic and endothermic: 8U07 n4, n5; collision theory and rate: 10U07 n5, n6; combustion: 9U03 n4). Also built: `cooling` (crystal size and cooling rate, glass: 8U04 n2) and `convection` (a heated liquid with a followed particle: 9U04 n1; `preset: mantle` with plates moving apart: 8U03 n2, n3; `mode: solid` for conduction). Lessons drafted (9 Oct): Year 8 Chemistry (atoms, compounds, chemical change), Years 9 and 10 Chemistry (rearranging atoms, collision theory), Year 8 Earth and space (igneous rocks, plates), Year 9 Physics (heat transfer). Every board reaches done in a headless run; decks fit. Still to do: try them with classes; the remaining Years 8–10 hinge nodes need the shared board (graphs, free body diagrams, keys) or new engines (forces, populations, stocks and flows).

Forces and motion built (9 Oct): the shared board's `forces` widget (force diagram plus motion) with Year 7 Physics (7U04 n1, n2, n4) and Year 10 Physics (10U05 n2, n3, n4). Year 7 Biology built (10 Oct): the shared board's `key` and `foodweb` widgets with five lessons (7U01 n2, n3; 7U02 n1, n2, n4). Year 7 now lacks only Earth and space (7U03, the sky model). The food web cascade is qualitative; a populations engine (numbers over time) remains for 10U02 and 9U02.

Years 8–10 Biology built (10 Oct): the shared board's `cell` (cells, tissues and the zoom to a gene), `coordination` (pathways, nerves against hormones, temperature feedback) and `cross` (offspring, meiosis, Punnett squares) widgets, and the science board's `selection` engine (`selection.js`, beetles and birds). Fifteen lessons: Year 8 (8U01 n2, n3; 8U02 n1, n3), Year 9 (9U01 n1, n2, n4, n5; 9U02 n1, n3), Year 10 (10U01 n1, n3, n4; 10U02 n1, n2). Every board reaches its check in a headless run; `check-engines` covers the selection model. Not yet tried with classes. Still open: a populations engine with numbers over time (predator and prey) and half-life; Year 7 Earth and space (the sky model, since built).

Year 7 Earth and space built (10 Oct): the shared board's `sky` widget (a geometric sky model: the Earth's orbit and tilt with real day lengths and distances, moon phases with a quiz, eclipses with the 5° tilted orbit and real eclipse limits, tides with spring and neap) and five lessons, `earth-7/`: rotation and revolution (7U03 n1), seasons (n4), moon phases (n2), eclipses (n3), tides (n5). Every board reaches its check in a headless run. Not yet tried with classes. Year 7 science now has every standard.

Years 8–10 Earth and space built (10 Oct): four shared-board widgets, `layers` (Earth's interior), `carbon` (spheres sorting and a carbon-cycle stocks-and-flows model), `universe` (big bang timeline, expanding galaxies with redshift and a Hubble graph) and `climate` (albedo, a one-layer energy-balance model with greenhouse gases). Nine lessons: Year 8 Earth's layers (8U03 n1, added to `earth-8`); Year 9 `earth-9` (9U03 n1, n3, n4); Year 10 `earth-10` (10U03 n2, n3; 10U04 n1, n2, n3). Every board reaches its check in a headless run. Not yet tried with classes. Still open: plate boundaries (8U03 n3–n6), the rest of the rock cycle (8U04), the carbon cycle diagram (9U03 n5), the cosmic microwave background (10U03 n4–n5), and human activity, indicators and responses (10U04 n4–n6).

Order: particles + atoms, then (after the shared board) forces and motion with the free body diagram widget, stocks and flows, populations, sky model. Classroom testing of the Year 7 chemistry set still to do: does the locked prediction hold, do students use the width control, do they take the 2D particle simplifications literally?
