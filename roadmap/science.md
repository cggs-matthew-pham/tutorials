# Roadmap: Science

The science chat's file. Lessons live in `content/science/` (see CLAUDE.md › Science).

## Done: six tutorials from the class-taught list (11 Oct 2026, science chat)

Each removes an `assumes:` line: What is an element? (`chemistry-8/elements`, 8U06 n2), Same particles, new look? (`chemistry-8/physical-change`, 8U07 n1), What is the net force? (`physics-10/net-force`, 10U05 n1), How small is a cell? (`biology-8/cell-scale`, 8U01 n1), What is a tissue? (`biology-8/tissues`, 8U02 n2) and a short one, Why sort living things? (`biology-7/why-classify`, 7U01 n1, Matthew asked for it as a brief lesson). Existing boards only; orders in Year 8 Chemistry, Year 8 Biology, Year 7 Biology and Year 10 Physics moved to fit. Voiced clips (ports 8265–8270, next free 8271) and pictures (none for the key board); every check passes headless; decks fit; primers updated.
- Fix in the atoms widget (`playground-science/main.js`, science-owned): a kind listed twice in `show:` (the explain boards' "inspect next" order trick) was counted twice ("6 kinds of particle", duplicate table rows). Now counted once.
- Noted, not changed (shared `forces` widget): arrows for large forces (a car's newtons) are short and labels of two forces on one side crowd the object. Readable; worth a look if the Year 10 force lessons grow.
- Still class-taught (in `assumes:`): 7U02 n3, 8U01 n4–n5, 8U04 n1, 8U06 n4–n5, 9U01 n3, 9U02 n2, 9U03 n2, 10U01 n2, 10U03 n1, 10U07 n4, 7U05 n4–n5.

## Done: science lessons tagged, map on (11 Oct 2026, science chat)

Every science lesson names its node; the node check runs for science; `/science/map/` is on. Decided (Matthew): Human endeavour and Inquiry are woven through lessons and class work, with no tutorials of their own; the map says so. The `assumes:` lines are the class-taught nodes the tutorials rely on, a ready list for the non-hinge queue (such as 7U01 n1 purpose of classification, 8U01 n1 cellular scale, 8U06 n2 elements, 8U07 n1 physical change, 10U05 n1 force as a vector).

## Done: isotopes, half-life, trends and word equations (11 Oct 2026, science chat)

Four tutorials in `chemistry-9-10/`, from the non-hinge queue: Same element, different atoms? (isotopes, 9U06 n2, order 2), How long does radioactivity last? (half-life, 9U06 n4, order 4), What goes in, what comes out? (reactants, products and word equations, 9U07 n1 and n3 in one lesson with a Practise step, order 5) and Why does the periodic table repeat? (trends, 10U06 n3, order 10). Later lessons moved down. The atom board gains `mode: halflife` (a random sample with a graph, Wait one half-life), table `colour: shells | outer | metal`, and a stable or radioactive line in build mode. The half-life Wider step covers dating First Peoples' presence carefully: radiocarbon for younger layers, luminescence for older ones, agreement between methods (teacher note: local resources and community guidance). Voiced explain clips and pictures (ports 8261–8264, next free 8265); every check passes headless (the solver's science-board run step needs a longer wait; checked by hand); decks fit. Primers updated.

Left in the queue: non-hinge nodes in the Year 7 and 8 units already built. Class tasks: 9U06 n5 decay chains, 9U07 n5, 10U06 n4.

## Done: alpha, beta and gamma (11 Oct 2026, science chat)

What comes out of a decaying nucleus? (`chemistry-9-10/decay`, 9U06 n3, the last hinge in the pasted pages; unit Inside the atom, order 2, later lessons moved down one). The atom board gains `mode: decay` (any isotope up to americium; Alpha, Beta and Gamma buttons; knows how about 25 common isotopes really decay and when a stable one is reached) and `mode: shield` (paper, aluminium, lead). Explore: radon-222 to polonium-218, then the shield board; Explain: a sort of what leaves, what changes and what stops it, two number checks (U-238 alpha, C-14 beta), gamma, a detector question and why alpha stops soonest; Typical: iodine-131 treatment and gamma imaging; Wider: the americium smoke alarm and radon in homes. Voiced explain clip (uranium-238: alpha, beta, gamma; port 8260, next free 8261) and a shield picture. 17 checks pass headless; decks fit.

Decided (Matthew, 11 Oct): non-hinge nodes can have tutorials too; the hinge-only rule above no longer limits what we build. Integration nodes stay class tasks unless he says otherwise. Queue: built 11 Oct (see above), except non-hinge nodes in the Year 7 and 8 units.

## Done: atoms, the periodic table and balancing equations (11 Oct 2026, science chat)

From the progression pages Matthew pasted (now in `data/progressions/science/`). Two new shared-board widgets, `atom` (Bohr model; build mode and a first-20 table) and `equation` (coefficients only, molecules drawn, atom tally, smallest whole numbers). Four lessons in `chemistry-9-10/`, one per hinge node: What's inside an atom? (9U06 n1, new unit Inside the atom), How do you balance an equation? (9U07 n4, with a Practise step: methane, ammonia, magnesium), How are the electrons arranged? (10U06 n1) and Why do elements in a group behave alike? (10U06 n2), the last two in a new unit, Atoms and the periodic table. Rearranging atoms moves to order 2 and Collision theory to 6. Primers for the two new units. Each lesson has a voiced explain clip and picture (ports 8256–8259; next free 8260). Every check passes in a headless run; decks fit.

Not tutorials (by the progression's response modes): 9U06 n2 isotopes and n4 half-life (not hinges; the atom board's build mode already makes isotopes), n5 decay chains and 9U07 n5 conservation in open and closed systems, 10U06 n4 (integration, class tasks). Still worth building: 9U06 n3 (alpha, beta and gamma decay, a hinge), which needs a decay mode on the atom board (Z and A changes, penetration); 10U06 n3 periodic trends.

## Done: Explain it to me on the science board (11 Oct 2026, science chat)

The recorder needed no change: the science board takes `?code=` like the shared board. Voiced clips for all 17 science-board lessons (Year 7 Chemistry, Chemistry 8 and 9–10, Year 10 Variation and Natural selection, Igneous, Plates, Heat transfer); ports 8239–8255 (next free: 8256). Timed with flite: 20–35 s (Igneous 35 s: the cooling itself takes time). Tips: "Inspect next particle" walks particles in setup order, so explain setups list one of each kind first; slow reactions need `temp:` raised to show change within a clip; canvas-drawn boards (beetles) can't be clicked by element.

Every one of the 56 science lessons now has an Explain it to me clip. Pictures on 16 of the 17 science-board lessons too (after the shared change in `shared.md`); not Igneous, whose first moment is all liquid. 42 science lessons have pictures in all.

## Done: Explain it to me, batch 2 (11 Oct 2026, science chat)

Voiced explain clips for the other 27 shared-board lessons: Biology 8 (4), 9 (6), 10 (DNA and genes, meiosis, Punnett), Earth and space 7 (5), 8 (layers), 9 (3) and 10 (5). Ports 8212–8238 (next free: 8239). Explain pictures on 17 of them; none where the widget isn't drawn on the board (cross, the pathway and race modes, feedback) or where the picture tool's smaller size makes the labels collide (the carbon cycle). Sunlight's picture uses a four-tile `explain-pic`.

How the clips drive the boards (worth reusing): cell parts and spheres things by fill colour (`click: { selector: '#board [fill="#8e6bbf"]' }`), sliders by clicking then `press: End` or `Home` (a click lands in the middle), Punnett boxes by aria-label. A caption followed by a click gets a pause of about 0.33 s per spoken word so the board doesn't run ahead of the voice. Timed with flite: 21–31 s, Punnett 38 s (14 clicks).

All 39 shared-board science lessons now have clips. Next: the science-board pilot (17 lessons on `playground-science/`).

## Done: kingdoms are not family trees (11 Oct 2026, Matthew's request)

A colleague's objection: teaching kingdoms as the endpoint implies same kingdom = close relatives and hides that classification is a model revised under evidence. Year 7 Kingdoms now has two Explain questions on the main path (a mushroom's closer relative is a sea star, not a fern; why classification went from two kingdoms to five to three domains), plus the revision summary, explain text, clip, goals, teacher notes and primer. Year 10 lessons don't lean on kingdoms. Loop closed (11 Oct): Year 10 Natural selection (AC9S10U02 n2) has three Explain questions on the main path: a branching tree, not a ladder; DNA similarity tracks how recently species shared an ancestor; back to the Year 7 kingdoms (features can mislead about relatedness). The descriptor asks students to explain past and present diversity and analyse the evidence for evolution, so this sits inside it. Still open: a fuller evidence-for-evolution lesson (fossils, comparative anatomy, DNA) when the kit's later U02 nodes are available.

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

Related gap (11 Oct), since closed: every science lesson now has a voiced `explainClip` (see Done above); pictures on 26 shared-board lessons.

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
