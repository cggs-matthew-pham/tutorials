---
marp: true
theme: default
html: true
---

# Two-motor drive base

Capstone projects · Years 9–10: move it

<!-- Speaker note: A Years 9–10 design project: a two-motor drive base for a line or obstacle course, with a battery chosen against the brief, steering planned, built in a simulator then for real, and tested on a timed course. About 300 minutes (About 5 to 8 lessons (around 300 minutes). Inquire 1 · Develop 1–2 · Create 2–4 · Test and evaluate 1). -->

---

## Today

**We are learning to** design a small robot base that follows a line or avoids obstacles: two motors through a driver, a battery chosen against the brief, gearing and a chassis, tested on a course.

- I can choose a battery and motors against a brief.
- I can plan a robot's steering from its sensors.
- I can test a robot on a course and evaluate it with data.

<!-- Speaker note: Before class: Needs Power and motors (drivers, shared ground, batteries); LiPos only after the LiPo safety sign-off and if your risk assessment allows. Pairs with Mechanisms (gearing), CAD (a printed chassis) and the robotics simulator. The micro:bit Cutebot (Code › Robotics challenges) is a ready-made alternative base for classes without kits. If you assess with MYP Design, the steps line up with the criteria: - **A Inquiring and analysing:** the brief, its criteria and constraints, and research into parts (Inquire). - **B Developing ideas:** a design specification, the circuit and code plan, and the test table written before building (Develop). - **C Creating the solution:** building it (in the simulator, then for real), following the plan and justifying changes (Create). - **D Evaluating:** testing against the specification, recording failures, improvements and impact (Test, Evaluate). Otherwise, use the same four headings as a simple rubric: each step's reflect checks are the evidence list. Teacher: Develop: the battery choice must be justified against all three numbers. Teacher: Create: drive straight first, then add one sensor. Teacher: Test: three timed runs, results in a table. -->

---

## Why it matters

> Every robot competition starts with the same question: can it drive where you want, for long enough, without falling apart?

<!-- Speaker note: **Client:** the STEM club, for a line-following or obstacle course. **Context:** a 2 m course on the floor. **Brief:** complete the course **in under 60 s**, **without leaving the line (or touching an obstacle) more than once**, and **run for 30 minutes** on one battery. Two DC gear motors through a **motor driver**, a battery of **6 to 9 V** weighing **at most 150 g**, a chassis that fits in **20 × 20 cm**. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Inquire: the brief

**Sort each line of the brief: a criterion (what it must do, which you can test) or a constraint (a limit you must work within)?**

Groups: Criterion · Constraint

Completes the course in under 60 s · Leaves the line at most once · Runs for 30 minutes on one battery · Two DC gear motors and a motor driver · Battery 6–9 V, at most 150 g · Chassis fits in 20 × 20 cm

* Answer: Completes the course in under 60 s → Criterion; Leaves the line at most once → Criterion; Runs for 30 minutes on one battery → Criterion; Two DC gear motors and a motor driver → Constraint; Battery 6–9 V, at most 150 g → Constraint; Chassis fits in 20 × 20 cm → Constraint

<!-- Speaker note: Criteria are what you will test at the end; constraints decide what you are allowed to build with. What this step is for: Separating what the design must do (criteria) from the limits it works within (constraints) is the first move of any design brief. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Develop: plan before you build

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fengineering%2Fprojects%2Fdrive-base%2Fstep-2&code=widget%3A+motor%0Amode%3A+battery%0Abattery%3A+pp3%0Adraw%3A+900%0Aneed%3A+30%0Agrams%3A+150%0Aderate%3A+on%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/engineering/projects/drive-base/?full=step-2#step-2)

<!-- Speaker note: What this step is for: Choosing the battery against the brief and planning the turn signals before building connects Power and motors to a real design. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Steering

**The line drifts left under the robot. To steer back, the robot should…**

- Stop both
- Slow the left motor (or reverse it) and keep the right one going
- Speed up both motors
- Slow the right motor

* Answer: Slow the left motor (or reverse it) and keep the right one going

<!-- Speaker note: Turning towards the line: the inside wheel slows. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Create: build it



- **In the simulator:** 
- **For real:** 

<!-- Speaker note: What this step is for: Building in the simulator first catches wiring and code slips cheaply; the real build then tests the design against the world. For students who need more support: A driver wiring diagram and a two-sensor line-follower sketch to Modify. For early finishers: Proportional steering: slow the inside wheel by an amount that depends on how far off the line it is. The hard part, on purpose: Mechanical problems (loose wheels, a dragging chassis) look like code problems. Test the base driving straight before adding sensors. When students get stuck: The robot turns the wrong way. Ask: Which motor slows when the sensor sees the line? Fix: Swap the turn logic, or swap a motor's wires. / It resets when it starts. Ask: Where do the motors get their power? Fix: Their own battery, grounds joined. -->

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

- My partner said it looks good
- It worked when I tried it
- The code has no errors
- A test from the table that set the input and recorded the expected result

* Answer: A test from the table that set the input and recorded the expected result

<!-- Speaker note: A planned test with a recorded result is evidence; everything else is a feeling. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name the three numbers you checked to choose your battery.**

* Voltage (in the driver's range), run time (capacity × 80% ÷ current) and weight.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Other Years 9–10 projects: Automated sorter, Lift. -->
