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

## Done (12 Oct 2026): Circuits with the micro:bit

- Course `engineering/circuits` (Physical computing pathway, foundations), units Lighting an LED and Reading inputs: 1. A complete loop, 2. Why the resistor (Ohm's law with the LED's 2 V), 3. A button is an input (pull-down, floating pin; Make is a Parsons of the reacting program), 4. Sensors that vary (analog read 0–1023; Make is a night-light threshold). Primers `outputs.md`, `inputs.md`. Misconceptions `one-wire-enough`, `resistor-before-led`, `floating-pin-reads-zero`, `reading-is-volts`.
- Decision: the Predict is settled on our own `circuit` board (so every step has a check), and each lesson has a `tier: typical` "Build it in Tinkercad" step (reflect check), rather than checking Tinkercad work directly. Tinkercad numbers will differ a little from the board's model; the lessons say so.
- Board widget `circuit` (`mode: led | button | sensor`; AUTHORING › board). All board checks tested in a headless browser; the four explain clips record (silent here).
- Ports 8501–8504.
- Not checked against Tinkercad itself (needs a person and an account): the reflect steps' instructions and the overcurrent warning.

## Done (12 Oct 2026): Arduino

- Course `engineering/arduino` (Physical computing, after Circuits), units A new board and Writing C++: 1. Same circuit, new board (pins by number; the dim pull-up glow), 2. Reading the C++ (setup once, loop for ever, delay timing; Make a lighthouse), 3. Values and decisions (int, analogRead, if; the missing `;` and `=` in an if; Make a band with &&), 4. Talking to the computer (Serial print/println, the `"words" + n` trap, map to a percentage), 5. Outputs that vary (PWM as on-off, ÷ 4, non-PWM pins, the 8-bit wrap; Make turns the mapping round). Misconceptions `code-any-pin`, `setup-repeats`, `cpp-assign-in-if`, `cpp-plus-joins-text`, `pwm-lower-voltage`, `analog-range-mismatch`.
- Decision: a lesson board runs the sketches (`arduino` widget: a C++ subset on a model Uno with simulated time) so every Try, Vary and Make step has a check. Tinkercad stays the `tier: typical` second tool (blocks to C++, its serial monitor and oscilloscope). The plan's blocks stage (lesson 5 in blocks) became Tinkercad's Blocks + Text view inside lesson 1.
- Every board check tested in a headless browser with the expected solution; five explain clips record (silent here). Ports 8505–8508 and 8510.

## Done (12 Oct 2026): Real hardware (Arduino unit 3)

- Lessons 6–8 of `engineering/arduino`, unit Real hardware: 6. From simulator to breadboard (new `breadboard` widget: strips, the gap, rails; a real-breadboard upload step), 7. A small system (a plant-water alarm brief; the `arduino` widget's new **Run the tests** with `test:` cases; boundary testing, a steady state, a three-band fridge alarm), 8. The same project on a Pico (optional; no board: match C++ to MicroPython, convert 0–1023 to 0–65535 and ms to seconds, a Parsons, Wokwi or Thonny as a `tier: typical` step). Misconceptions `breadboard-rows`, `tests-skip-boundary`, `pico-same-numbers`.
- Hardware and upload steps are `tier: typical` reflect checks (Uno serial isn't read: `B.serial` filters for the micro:bit's USB id).
- All board checks tested headless; two new clips record. Ports 8511–8512.

## Done (12 Oct 2026): Power and motors

- Course `engineering/power` (Physical computing, extensions, after Arduino; Years 9–10), units Driving a motor and Batteries: 1. Why a motor can't run from a pin (transistor, flyback diode), 2. Motor drivers (H-bridge truth table, ENA as PWM, brake vs coast), 3. Two supplies, one ground (shared 0 V; a motor on the Uno's 5V resets it), 4. Choosing a battery (run time = capacity ÷ current, 80% margin, voltage and weight criteria; the Make leads to a LiPo), 5. LiPo safety (teacher-led, no board: sort, voltages, routine Parsons, a teacher sign-off reflect). Primers `drive.md`, `battery.md`. Misconceptions `code-runs-motor`, `one-signal-speed-direction`, `separate-supplies-no-ground`, `mah-is-strength`.
- New `motor` widget (`mode: pin | hbridge | ground | battery`). Battery figures are typical, not exact (teacher notes say so). Every board check tested headless; four clips record. Ports 8513–8516.
- Physical computing is now complete as planned (circuits, Arduino blocks to C++, real hardware, power). Still open: the plan's two-motor drive-base Make as a teacher project; Uno USB ids in `B.serial`.

## Done (12 Oct 2026): Capstone projects

- Course `engineering/projects` (Physical computing, extensions, after Arduino), all lessons optional, three units: Years 8–9 (Smart plant monitor, Parking assistant, Reaction game), Years 9–10 (Two-motor drive base, Automated sorter, Lift), Stretch (Off the breadboard, Design a PCB). Students pick one per band.
- Each is a design-cycle lesson (`shape: design`, new: Inquire, Develop, Create, Test, Evaluate on the existing stages): a brief sorted into criteria and constraints, a Develop step that prototypes the logic on a board where it can (arduino `test:` cases, the motor battery chooser, the gears board) plus a planned test table, reflect evidence for Create and Test, and an evidence question plus a written evaluation. Teacher notes map the steps to MYP Design A–D.
- The drive base, sorter and lift link Power and motors, Mechanisms, the classifier (Code) and CAD; the stretch unit stands in for the Design your own board pathway until it has its own course.
- Shared change: `lesson-core.mjs` reads `shape:`; `lesson-view.mjs` has `STAGE_INFO_DESIGN` (logged in roadmap/shared.md). Deck slides still title the Inquire step "Predict" (teach.mjs unchanged).

## Next

1. Practise with code: the sample lesson's Python loop over every gear pair. A maths lesson has no Python playground; either a short linked Python task (console bridge) or leave it to the Code pathway.
2. Mechanisms: compound gear trains (Years 9–10, with efficiency per mesh and the constraint as an inequality), levers, pulleys.
3. CAD lessons 1–2 (dimensions, tolerance) with answer checks, or Mechanisms lesson 2 (compound gears / levers). Optional: let `B.serial` accept an Uno's USB ids so a real board's output can be checked.
4. `tools/concepts.mjs` `prerequisites()` reads `code, maths, science, systems`: add `engineering` if an Engineering lesson ever uses the concept lint (its lessons are `language: maths`, which the lint skips).

## Open questions

- Subject name: Engineering, Make or STEM.
- Pathway order: Mechanisms first (no kits), CAD, or Physical computing.
- Kits, printers, slicer and laser cutter at the school; Onshape or Fusion; Raspberry Pis.
- LiPos at all, or AA and NiMH only.
- Site content licence (decides whether CC BY-SA kit guides can be adapted).
