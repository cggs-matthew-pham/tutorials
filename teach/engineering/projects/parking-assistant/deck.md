---
marp: true
theme: default
html: true
---

# Parking assistant

Capstone projects · Years 8–9: sense and respond

<!-- Speaker note: A Years 8–9 design project: a parking assistant with an ultrasonic sensor and three warning bands, planned with band-edge tests, prototyped on the board, built in Tinkercad and optionally on hardware, tested with a ruler and evaluated. About 180 minutes (About 3 to 4 lessons (around 180 minutes). Inquire part lesson · Develop 1 · Create 1–2 · Test and evaluate 1). Sources: SparkFun HC-SR04 ultrasonic sensor guide (link), https://learn.sparkfun.com/tutorials/ultrasonic-distance-sensor-hc-sr04-hookup-guide (checked 12 October 2026). -->

---

## Today

**We are learning to** design a distance warning: an ultrasonic sensor and a buzzer or LED that warns sooner and harder as something gets closer, tested at each band edge.

- I can plan tests for every edge of a set of bands.
- I can read a distance sensor and act on it.
- I can evaluate my design against each criterion with evidence.

<!-- Speaker note: Before class: The sensor code (pulseIn and ÷ 58) is new: give it as a recipe card. HC-SR04 sensors are unreliable on soft or angled surfaces and under about 2 cm; good evaluations mention it. Builds on Arduino › A small system. If you assess with MYP Design, the steps line up with the criteria: - **A Inquiring and analysing:** the brief, its criteria and constraints, and research into parts (Inquire). - **B Developing ideas:** a design specification, the circuit and code plan, and the test table written before building (Develop). - **C Creating the solution:** building it (in the simulator, then for real), following the plan and justifying changes (Create). - **D Evaluating:** testing against the specification, recording failures, improvements and impact (Test, Evaluate). Otherwise, use the same four headings as a simple rubric: each step's reflect checks are the evidence list. Teacher: Develop: ask how many edges three bands have. Teacher: Test: rulers out; record the real distance and what the device did. -->

---

## Why it matters

> Reversing cars beep faster as they get closer to a wall. Can you build one, and prove it warns at the right distances?

<!-- Speaker note: **Client:** a family whose car has no reversing sensor. **Context:** a model on the bench (a ruler and a box stand in for the car and the wall). **Brief:** an ultrasonic distance sensor measures in centimetres. **Off** when the distance is over 100 cm, **beeping** (blinking) from 30 to 100 cm, **steady** under 30 cm. Kit parts only (HC-SR04 sensor, piezo buzzer or LED); USB power. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Inquire: the brief

**Sort each line of the brief: a criterion (what it must do, which you can test) or a constraint (a limit you must work within)?**

Groups: Criterion · Constraint

Off over 100 cm · Blinks or beeps from 30 to 100 cm · Steady under 30 cm · HC-SR04 sensor and a buzzer or LED from the kit · USB power

* Answer: Off over 100 cm → Criterion; Blinks or beeps from 30 to 100 cm → Criterion; Steady under 30 cm → Criterion; HC-SR04 sensor and a buzzer or LED from the kit → Constraint; USB power → Constraint

<!-- Speaker note: Criteria are what you will test at the end; constraints decide what you are allowed to build with. What this step is for: Separating what the design must do (criteria) from the limits it works within (constraints) is the first move of any design brief. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Develop: plan before you build

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fprojects%2Fparking-assistant%2Fstep-2&code=widget%3A+arduino%0Aled%3A+13%0Aknob%3A+A0%0Alevel%3A+20%0Atest%3A+10%2C+on%0Atest%3A+29%2C+on%0Atest%3A+30%2C+blink%0Atest%3A+100%2C+blink%0Atest%3A+101%2C+off%0Atest%3A+500%2C+off%0Acode%3A+int+cm+%3D+0%3B%0Acode%3A%0Acode%3A+void+setup%28%29+%7B%0Acode%3A+pinMode%2813%2C+OUTPUT%29%3B%0Acode%3A+%7D%0Acode%3A%0Acode%3A+void+loop%28%29+%7B%0Acode%3A+cm+%3D+analogRead%28A0%29%3B%0Acode%3A+%2F%2F+three+bands+here%0Acode%3A+delay%28100%29%3B%0Acode%3A+%7D%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/projects/parking-assistant/?full=step-2#step-2)

<!-- Speaker note: What this step is for: Three bands mean four edges to test; prototyping the bands on the board, with the knob as the distance in cm, gets the logic right before the sensor code. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Band edges

**How many test readings do you need at minimum to check every band edge (30 and 100), on both sides?**

- 2: 30 and 100
- 1: 50
- 4: 29, 30, 100, 101
- 3: one in each band

* Answer: 4: 29, 30, 100, 101

<!-- Speaker note: Each edge needs the reading just inside and just outside it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Create: build it



- **In the simulator:** 
- **For real:** 

<!-- Speaker note: What this step is for: Building in the simulator first catches wiring and code slips cheaply; the real build then tests the design against the world. For students who need more support: A recipe card for reading the HC-SR04, and the band table half filled. For early finishers: Beep faster as it gets closer, with the delay worked out from the distance (map). The hard part, on purpose: Real ultrasonic readings jump around; students blame their code. Print the readings first. When students get stuck: The readings jump around. Ask: What does the sensor read when nothing moves? Fix: Average three readings, or aim at a flat, hard surface. -->

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

- A test from the table that set the input and recorded the expected result
- The code has no errors
- It worked when I tried it
- My partner said it looks good

* Answer: A test from the table that set the input and recorded the expected result

<!-- Speaker note: A planned test with a recorded result is evidence; everything else is a feeling. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Give the four test distances that check your band edges.**

* 29, 30, 100 and 101 cm.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Other Years 8–9 projects: Smart plant monitor, Reaction game. -->
