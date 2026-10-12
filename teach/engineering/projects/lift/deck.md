---
marp: true
theme: default
html: true
---

# Lift

Capstone projects · Years 9–10: move it

<!-- Speaker note: A Years 9–10 design project: a motor-driven lift where the gear ratio is chosen against the brief on the gears board, driven both ways through a motor driver, and the measured lift time compared with the model's prediction. About 250 minutes (About 4 to 6 lessons (around 250 minutes). Inquire part lesson · Develop 1 · Create 2–3 · Test and evaluate 1). -->

---

## Today

**We are learning to** design a motor-driven lift that raises a load to a height within a time: choose a gear ratio against the brief, drive the motor through a driver, and compare the measured result with the prediction.

- I can choose a gear ratio against a brief.
- I can drive a motor both ways through a driver.
- I can compare a model's prediction with a measurement and explain the gap.

<!-- Speaker note: Before class: Builds on Mechanisms › Gear up the winch and Power and motors. LEGO Technic or Meccano gears are the quickest real build; printed gears need the CAD pathway. A limit switch (a microswitch on a pin with INPUT_PULLUP) is the tidy stop; a timed stop is fine for a first version. If you assess with MYP Design, the steps line up with the criteria: - **A Inquiring and analysing:** the brief, its criteria and constraints, and research into parts (Inquire). - **B Developing ideas:** a design specification, the circuit and code plan, and the test table written before building (Develop). - **C Creating the solution:** building it (in the simulator, then for real), following the plan and justifying changes (Create). - **D Evaluating:** testing against the specification, recording failures, improvements and impact (Test, Evaluate). Otherwise, use the same four headings as a simple rubric: each step's reflect checks are the evidence list. Teacher: Develop: ask what the model leaves out. Teacher: Test: five lifts, mean time, compared with the prediction. -->

---

## Why it matters

> The winch lesson worked on paper. Does a real motor, real gears and real friction agree with the numbers?

<!-- Speaker note: **Client:** a theatre group that needs a small prop to rise on cue. **Context:** a model lift on the bench. **Brief:** lift a **450 g** load **1 m** in **15 s or less**, stop at the top (a limit switch or a timed stop), and lower it again. The motor turns at **120 rpm** and lifts **200 g** with no gears; the drum winds **0.1 m** a turn. Kit gears (8, 16, 24, 40 teeth), a motor driver, its own battery. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Inquire: the brief

**Sort each line of the brief: a criterion (what it must do, which you can test) or a constraint (a limit you must work within)?**

Groups: Criterion · Constraint

Lifts 450 g by 1 m · Takes 15 s or less · Stops at the top and can lower again · Motor 120 rpm, 200 g with no gears · Gears from the kit: 8, 16, 24, 40 · A motor driver and its own battery

* Answer: Lifts 450 g by 1 m → Criterion; Takes 15 s or less → Criterion; Stops at the top and can lower again → Criterion; Motor 120 rpm, 200 g with no gears → Constraint; Gears from the kit: 8, 16, 24, 40 → Constraint; A motor driver and its own battery → Constraint

<!-- Speaker note: Criteria are what you will test at the end; constraints decide what you are allowed to build with. What this step is for: Separating what the design must do (criteria) from the limits it works within (constraints) is the first move of any design brief. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Develop: plan before you build

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fengineering%2Fprojects%2Flift%2Fstep-2&code=widget%3A+gears%0Achoose%3A+on%0Adriver%3A+8%0Adriven%3A+40%0Aload%3A+450%0Alimit%3A+15%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/engineering/projects/lift/?full=step-2#step-2)

<!-- Speaker note: What this step is for: Choosing the gear pair on the board makes the prediction; the real build then tests the model (no friction) against the world. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Margin

**Real gears lose about 10% of the force at each mesh. Which pair has more margin on strength?**

- 16 → 40: 500 g against 450 g
- 8 → 24: 600 g against 450 g
- They are the same
- Neither: friction doesn't matter

* Answer: 8 → 24: 600 g against 450 g

<!-- Speaker note: 600 × 0.9 = 540 g, still over 450. 16 → 40 drops to exactly 450 with no margin. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Create: build it



- **In the simulator:** 
- **For real:** 

<!-- Speaker note: What this step is for: Building in the simulator first catches wiring and code slips cheaply; the real build then tests the design against the world. For students who need more support: The winch worked example beside the board, and a driver wiring diagram. For early finishers: A compound gear train (two pairs) for a heavier load, and the constraint written as an inequality. The hard part, on purpose: The gap between predicted and measured time feels like failure. Make it the point: engineers explain gaps. When students get stuck: The lift stalls. Ask: What does the model say about margin with friction? Fix: Choose the pair with more strength in hand. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Test: run your table



- **Run the tests:** 
- **Fix and re-test:** 

<!-- Speaker note: What this step is for: Running the test table written in Develop, and recording every result including failures, is the evidence for the evaluation. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which is evidence?

**Your lift takes 17 s; the model predicted 15 s. What is the best explanation to give in your evaluation?**

- The gears are broken
- The brief was unfair
- The stopwatch was wrong
- The model ignores friction and the motor slowing under load; measure and say how much

* Answer: The model ignores friction and the motor slowing under load; measure and say how much

<!-- Speaker note: Real motors slow under load, and every mesh loses a little: the model's 15 s is a best case. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why might a real lift be slower than the gear model predicts?**

* The model ignores friction at each gear mesh and the motor slowing under load.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Other Years 9–10 projects: Two-motor drive base, Automated sorter. -->
