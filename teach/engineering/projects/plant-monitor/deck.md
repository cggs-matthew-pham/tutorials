---
marp: true
theme: default
html: true
---

# Smart plant monitor

Capstone projects · Years 8–9: sense and respond

<!-- Speaker note: A Years 8–9 design project: a plant monitor with a soil sensor, an alarm at a threshold and a display, planned with a test table, prototyped on the board, built in Tinkercad and optionally on hardware, tested and evaluated against the brief. About 180 minutes (About 3 to 4 lessons (around 180 minutes). Inquire 1 lesson part · Develop 1 lesson · Create 1–2 lessons · Test and evaluate 1 lesson). Sources: SparkFun soil moisture sensor hookup guide (link), https://learn.sparkfun.com/tutorials/soil-moisture-sensor-hookup-guide (checked 12 October 2026). -->

---

## Today

**We are learning to** design a monitor that warns when a pot plant needs water: a soil moisture sensor, an alarm, and a display of the reading, tested at its threshold.

- I can turn a brief into criteria and constraints.
- I can plan and run tests that check a threshold.
- I can evaluate my design against each criterion with evidence.

<!-- Speaker note: Before class: Builds on Arduino › A small system (the same alarm logic and boundary tests). Real soil sensors read differently in different soils: calibrate the threshold with real dry and wet soil, and say so in the evaluation. Resistive soil probes corrode if powered all the time; powering the sensor from a pin only while reading is a good extension. If you assess with MYP Design, the steps line up with the criteria: - **A Inquiring and analysing:** the brief, its criteria and constraints, and research into parts (Inquire). - **B Developing ideas:** a design specification, the circuit and code plan, and the test table written before building (Develop). - **C Creating the solution:** building it (in the simulator, then for real), following the plan and justifying changes (Create). - **D Evaluating:** testing against the specification, recording failures, improvements and impact (Test, Evaluate). Otherwise, use the same four headings as a simple rubric: each step's reflect checks are the evidence list. Teacher: Inquire: ask which criterion will be hardest to test. Teacher: Develop: no wiring until the test table is written. Teacher: Evaluate: insist on a test result for every criterion. -->

---

## Why it matters

> The garden club loses plants every holiday. Can a microcontroller tell them which pot is dry before it is too late?

<!-- Speaker note: **Client:** the school garden club. **Context:** pot plants in a classroom, checked twice a week. **Brief:** a soil moisture sensor on A0 reads low when the soil is dry. The monitor must **blink an LED when the reading is 300 or below**, stay **off** otherwise, and **show the reading** (LCD or serial monitor). It must use **only parts from the kit** (or Tinkercad's parts), run on **4 × AA or USB**, and fit in a box **no bigger than a pencil case**. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Inquire: the brief

**Sort each line of the brief: a criterion (what it must do, which you can test) or a constraint (a limit you must work within)?**

Groups: Criterion · Constraint

Blinks the LED at a reading of 300 or below · Stays off above 300 · Shows the current reading · Only parts from the kit · Runs on 4 × AA or USB · Fits in a pencil-case-sized box

* Answer: Blinks the LED at a reading of 300 or below → Criterion; Stays off above 300 → Criterion; Shows the current reading → Criterion; Only parts from the kit → Constraint; Runs on 4 × AA or USB → Constraint; Fits in a pencil-case-sized box → Constraint

<!-- Speaker note: Criteria are what you will test at the end; constraints decide what you are allowed to build with. What this step is for: Separating what the design must do (criteria) from the limits it works within (constraints) is the first move of any design brief. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Develop: plan before you build

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fprojects%2Fplant-monitor%2Fstep-2&code=widget%3A+arduino%0Aled%3A+13%0Aknob%3A+A0%0Alevel%3A+50%0Atest%3A+0%2C+blink%0Atest%3A+299%2C+blink%0Atest%3A+300%2C+blink%0Atest%3A+301%2C+off%0Atest%3A+1023%2C+off%0Acode%3A+int+level+%3D+0%3B%0Acode%3A%0Acode%3A+void+setup%28%29+%7B%0Acode%3A+pinMode%2813%2C+OUTPUT%29%3B%0Acode%3A+%7D%0Acode%3A%0Acode%3A+void+loop%28%29+%7B%0Acode%3A+level+%3D+analogRead%28A0%29%3B%0Acode%3A+%2F%2F+decide+what+the+LED+does+here%0Acode%3A+delay%28100%29%3B%0Acode%3A+%7D%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/projects/plant-monitor/?full=step-2#step-2)

<!-- Speaker note: What this step is for: Writing the test table and prototyping the decision on the board before wiring anything turns the criteria into something checkable. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The test table

**Which test table checks the threshold best?**

- 150 blink, 800 off
- 0 blink, 1023 off
- 0 blink, 299 blink, 300 blink, 301 off, 1023 off
- 300 blink only

* Answer: 0 blink, 299 blink, 300 blink, 301 off, 1023 off

<!-- Speaker note: Both sides of the threshold, the threshold itself, and the ends. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Create: build it



- **In the simulator:** 
- **For real:** 

<!-- Speaker note: What this step is for: Building in the simulator first catches wiring and code slips cheaply; the real build then tests the design against the world. For students who need more support: A partly filled test table and the A small system sketch as a starting point. For early finishers: Add a second threshold (very dry: steady on) or a buzzer, and stop the alarm flickering near 300. The hard part, on purpose: Students build first and plan never. Hold the test table as the ticket to start building. When students get stuck: The alarm triggers at the wrong time. Ask: What does the sensor read in dry soil, and in wet? Fix: Print the readings and recalibrate the threshold. -->

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
- The code has no errors
- A test from the table that set the input and recorded the expected result
- My partner said it looks good

* Answer: A test from the table that set the input and recorded the expected result

<!-- Speaker note: A planned test with a recorded result is evidence; everything else is a feeling. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name one criterion of your monitor and the test that shows whether it is met.**

* For example: blinks at 300 or below; test at readings 299, 300 and 301.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Other Years 8–9 projects: Parking assistant, Reaction game. -->
