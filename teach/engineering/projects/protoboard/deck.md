---
marp: true
theme: default
html: true
---

# Off the breadboard

Capstone projects · Stretch: make it permanent

<!-- Speaker note: A stretch project: move a working breadboard project onto protoboard or stripboard, with a planned layout, a soldering safety briefing, and the original test table re-run. About 120 minutes (About 2 to 3 lessons (around 120 minutes). Inquire and Develop 1 · Create 1 · Test and evaluate part lesson). -->

---

## Today

**We are learning to** move a finished breadboard project onto soldered protoboard so it survives being carried around: plan the layout, solder safely, and test it against the same table as before.

- I can plan a protoboard layout from a circuit diagram.
- I can solder safely and check my joints.
- I can show the permanent version works the same as the breadboard one.

<!-- Speaker note: Before class: Teacher-led and equipment-dependent: soldering stations with stands and fume extraction, safety glasses, lead-free solder, and your school's soldering risk assessment. Give the safety briefing in person before anyone uses an iron; this page does not replace it. If you assess with MYP Design, the steps line up with the criteria: - **A Inquiring and analysing:** the brief, its criteria and constraints, and research into parts (Inquire). - **B Developing ideas:** a design specification, the circuit and code plan, and the test table written before building (Develop). - **C Creating the solution:** building it (in the simulator, then for real), following the plan and justifying changes (Create). - **D Evaluating:** testing against the specification, recording failures, improvements and impact (Test, Evaluate). Otherwise, use the same four headings as a simple rubric: each step's reflect checks are the evidence list. Teacher: Develop: partner checks the layout against the diagram. Teacher: Create: inspect the first three joints together. -->

---

## Why it matters

> A breadboard circuit falls apart in a school bag. How do you make it permanent?

<!-- Speaker note: **Client:** you, for any project you have already built. **Context:** the project has to survive a school bag. **Brief:** the same circuit on **protoboard** (or stripboard), **working the same tests as the breadboard version**, **no loose wires**, and **fits on a 5 × 7 cm board**. Soldering only with the teacher's safety briefing, in the soldering area. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Inquire: the brief

**Sort each line of the brief: a criterion (what it must do, which you can test) or a constraint (a limit you must work within)?**

Groups: Criterion · Constraint

Passes the same tests as the breadboard version · No loose wires · Fits on a 5 × 7 cm board · Soldering only after the safety briefing, in the soldering area

* Answer: Passes the same tests as the breadboard version → Criterion; No loose wires → Criterion; Fits on a 5 × 7 cm board → Constraint; Soldering only after the safety briefing, in the soldering area → Constraint

<!-- Speaker note: Criteria are what you will test at the end; constraints decide what you are allowed to build with. What this step is for: Separating what the design must do (criteria) from the limits it works within (constraints) is the first move of any design brief. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Track cuts

**On stripboard the copper strips join every hole in a row. An LED's two legs must go in the same row, but must not be joined. What do you do?**

- Put the LED the other way round
- Cut the strip between the legs
- Solder them together
- Use a bigger resistor

* Answer: Cut the strip between the legs

<!-- Speaker note: A track cut breaks the strip so the legs are in separate pieces, as on a breadboard. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Soldering safety

**Soldering: safe or unsafe?**

Groups: Safe · Unsafe

Iron back in its stand whenever you put it down · Fume extractor on, face out of the smoke · Testing whether the iron is hot with a finger · Cutting component legs with the board pointing at a classmate · Washing hands after soldering

* Answer: Iron back in its stand whenever you put it down → Safe; Fume extractor on, face out of the smoke → Safe; Testing whether the iron is hot with a finger → Unsafe; Cutting component legs with the board pointing at a classmate → Unsafe; Washing hands after soldering → Safe

<!-- Speaker note: The iron is around 350 °C; the fumes and offcuts are hazards too. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Create: build it



- **In the simulator:** 
- **For real:** 

<!-- Speaker note: What this step is for: Building in the simulator first catches wiring and code slips cheaply; the real build then tests the design against the world. For students who need more support: A printed hole grid and a worked layout for an LED and resistor. For early finishers: Make it a shield: headers that plug straight onto the Uno. The hard part, on purpose: Students want to start soldering. The layout drawing is the ticket to the iron. When students get stuck: Two neighbouring joints are joined by solder. Ask: Is there a bridge? Fix: Remove it with solder wick, then re-check. -->

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

- It worked when I tried it
- A test from the table that set the input and recorded the expected result
- The code has no errors
- My partner said it looks good

* Answer: A test from the table that set the input and recorded the expected result

<!-- Speaker note: A planned test with a recorded result is evidence; everything else is a feeling. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why plan a protoboard layout before soldering?**

* Parts can't be moved easily once soldered, so the layout must match the circuit first.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next stretch: Design a PCB. -->
