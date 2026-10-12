---
marp: true
theme: default
html: true
---

# Design a PCB

Capstone projects · Stretch: make it permanent

<!-- Speaker note: A stretch project: design a PCB for a working project in KiCad or EasyEDA (schematic, footprints, layout, design rule check, Gerber files), optionally ordered and assembled. About 250 minutes (About 4 to 6 lessons (around 250 minutes). Inquire and Develop 1 · Create 2–4 · Test and evaluate 1). Sources: KiCad (free, open source; link), https://www.kicad.org/ (checked 12 October 2026); EasyEDA (free, in the browser; link), https://easyeda.com/ (checked 12 October 2026). -->

---

## Today

**We are learning to** design a printed circuit board for a project: draw the schematic, lay out the board, run the design rule check, and prepare the files a manufacturer needs.

- I can draw a schematic from a working circuit.
- I can lay out and check a board.
- I can prepare a design for manufacture.

<!-- Speaker note: Before class: Teacher-run: tool skills come from KiCad's or EasyEDA's own tutorials (link them); this page structures the project. Ordering boards needs a budget and a manufacturer's student-friendly service; plan a few weeks of lead time. Through-hole parts are easiest to solder for a first board. If you assess with MYP Design, the steps line up with the criteria: - **A Inquiring and analysing:** the brief, its criteria and constraints, and research into parts (Inquire). - **B Developing ideas:** a design specification, the circuit and code plan, and the test table written before building (Develop). - **C Creating the solution:** building it (in the simulator, then for real), following the plan and justifying changes (Create). - **D Evaluating:** testing against the specification, recording failures, improvements and impact (Test, Evaluate). Otherwise, use the same four headings as a simple rubric: each step's reflect checks are the evidence list. Teacher: Develop: schematic checked against the breadboard before layout starts. Teacher: Create: run the DRC early and often. -->

---

## Why it matters

> Every device you own has a printed circuit board. Designing one is how a prototype becomes a product.

<!-- Speaker note: **Client:** you, for a project with a working breadboard version (a driver-and-sensor shield for the drive base is a good first board). **Context:** the board may be ordered for the class, or kept as a design. **Brief:** a **schematic** that matches the working circuit, a **board layout** at most **5 × 5 cm** (or Uno-shield size), **no errors in the design rule check**, and **manufacturing files** (Gerbers) exported. Free tools only (KiCad or EasyEDA). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Inquire: the brief

**Sort each line of the brief: a criterion (what it must do, which you can test) or a constraint (a limit you must work within)?**

Groups: Criterion · Constraint

The schematic matches the working circuit · No design rule check errors · Gerber files exported · At most 5 × 5 cm, or Uno-shield size · Free tools only: KiCad or EasyEDA

* Answer: The schematic matches the working circuit → Criterion; No design rule check errors → Criterion; Gerber files exported → Criterion; At most 5 × 5 cm, or Uno-shield size → Constraint; Free tools only: KiCad or EasyEDA → Constraint

<!-- Speaker note: Criteria are what you will test at the end; constraints decide what you are allowed to build with. What this step is for: Separating what the design must do (criteria) from the limits it works within (constraints) is the first move of any design brief. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The steps

**Put the PCB design steps in order.**

```maths
Place the parts on the board outline.
Export the Gerber files.
Draw the schematic from the working circuit.
Run the design rule check and fix every error.
Give every part a footprint that matches the real part.
Route the tracks.
```

<!-- Speaker note: Schematic first, then footprints, then layout and routing, then the checks, then the files. Correct order: Draw the schematic from the working circuit. Give every part a footprint that matches the real part. Place the parts on the board outline. Route the tracks. Run the design rule check and fix every error. Export the Gerber files. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Design rule check

**What does the design rule check (DRC) catch?**

- Mistakes in the code
- Tracks or pads too close together, too thin, or not connected as the schematic says
- The cost of the board
- Whether the circuit does what the brief needs

* Answer: Tracks or pads too close together, too thin, or not connected as the schematic says

<!-- Speaker note: It checks the layout can be made and matches the schematic, not that the design is a good one. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Create: build it



- **In the simulator:** 
- **For real:** 

<!-- Speaker note: What this step is for: Building in the simulator first catches wiring and code slips cheaply; the real build then tests the design against the world. For students who need more support: A finished example board for an LED and resistor to copy the steps from. For early finishers: A two-layer board with a ground plane. The hard part, on purpose: Footprints that don't match the real part (pin spacing, hole size) are the classic first-board failure. Check each one against the part in hand. When students get stuck: The DRC shows unconnected nets. Ask: Which pins does the schematic join that the layout doesn't? Fix: Route the missing tracks, or fix the schematic. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Test: run your table



- **Run the tests:** 
- **Fix and re-test:** 

<!-- Speaker note: What this step is for: Running the test table written in Develop, and recording every result including failures, is the evidence for the evaluation. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which is evidence?

**Which is the strongest evidence that the design meets a criterion?**

- The code has no errors
- It worked when I tried it
- My partner said it looks good
- A test from the table that set the input and recorded the expected result

* Answer: A test from the table that set the input and recorded the expected result

<!-- Speaker note: A planned test with a recorded result is evidence; everything else is a feeling. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name two things a design rule check catches, and one it can't.**

* It catches tracks too close or too thin and unconnected nets; it can't tell whether the circuit meets the brief.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Back to the Engineering capstones, or CAD and fabrication for an enclosure. -->
