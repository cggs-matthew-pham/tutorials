---
order: 4
unit: advanced
optional: true
title: Two-motor drive base
summary: "Design a small robot base that follows a line or avoids obstacles: two motors through a driver, a battery chosen against the brief, gearing and a chassis, tested on a course."
language: maths
shape: design
hook: "Every robot competition starts with the same question: can it drive where you want, for long enough, without falling apart?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8519
  url: http://127.0.0.1:8519/index.html
  readySelector: "#board svg"
  layout: full
---
**Client:** the STEM club, for a line-following or obstacle course. **Context:** a 2 m course on the floor.

**Brief:** complete the course **in under 60 s**, **without leaving the line (or touching an obstacle) more than once**, and **run for 30 minutes** on one battery. Two DC gear motors through a **motor driver**, a battery of **6 to 9 V** weighing **at most 150 g**, a chassis that fits in **20 × 20 cm**.

## Inquire: the brief

```step
stage: predict
insight: "Separating what the design must do (criteria) from the limits it works within (constraints) is the first move of any design brief."
check:
  type: sort
  q: "Sort each line of the brief: a criterion (what it must do, which you can test) or a constraint (a limit you must work within)?"
  options: ["Criterion", "Constraint"]
  items:
    - ["Completes the course in under 60 s", "Criterion"]
    - ["Leaves the line at most once", "Criterion"]
    - ["Runs for 30 minutes on one battery", "Criterion"]
    - ["Two DC gear motors and a motor driver", "Constraint"]
    - ["Battery 6–9 V, at most 150 g", "Constraint"]
    - ["Chassis fits in 20 × 20 cm", "Constraint"]
  explain: "Criteria are what you will test at the end; constraints decide what you are allowed to build with."
```

## Develop: plan before you build

```step
stage: investigate
insight: "Choosing the battery against the brief and planning the turn signals before building connects Power and motors to a real design."
try: { playground: board, starter: "board.yml#battery", height: 560 }
tasks:
  - check: { type: board, text: "The two motors and the board draw about 900 mA together. Choose a battery that meets the brief (30 minutes using 80%, 6–9 V, 150 g at most).", when: "p = 1 and u = 80", explain: "4 × AA alkaline (107 min, 100 g) or the 2200 mAh LiPo (147 min, 120 g, and the LiPo safety lesson first). The PP3 and the 1000 mAh LiPo run out too soon; 4 × NiMH is under 6 V; 6 × NiMH is too heavy." }
  - check:
      type: question
      q: "The line drifts left under the robot. To steer back, the robot should…"
      options: ["Slow the left motor (or reverse it) and keep the right one going", "Speed up both motors", "Slow the right motor", "Stop both"]
      answer: 0
      feedback: [null, "That keeps the same heading.", "That turns it right, away from the line.", "Then it never gets back."]
      explain: "Turning towards the line: the inside wheel slows."
  - check: { type: reflect, text: "My plan has: the driver wiring (IN1–IN4, two ENA pins, shared ground), the battery chosen above, the sensor and its position, the chassis sketch with sizes, and the course tests." }
```

### The battery

### Steering

### The plan

## Create: build it

```step
stage: make
insight: "Building in the simulator first catches wiring and code slips cheaply; the real build then tests the design against the world."
tasks:
  - check: { type: reflect, text: "In Tinkercad (or the robotics simulator): the two motors on an L293D, the sensors and the sketch. It turns the right way for each sensor reading." }
  - check: { type: reflect, text: "For real (if you have the kit): chassis built (cut or 3D printed), motors, driver and battery mounted, sketch uploaded." }
```

### In the simulator

### For real

## Test: run your table

```step
stage: modify
insight: "Running the test table written in Develop, and recording every result including failures, is the evidence for the evaluation."
tasks:
  - check: { type: reflect, text: "I ran the course at least three times, timing each run and counting how often it left the line, and ran a battery test (or calculated it from a measured current)." }
  - check: { type: reflect, text: "I fixed at least one failure and ran that test again, and I recorded what I changed and why." }
```

### Run the tests

### Fix and re-test

## Evaluate: against the brief

```step
stage: practise
insight: "Judging the design criterion by criterion, with evidence from the tests, is what separates an evaluation from a description."
tasks:
  - check:
      type: question
      q: "Which is the strongest evidence that the design meets a criterion?"
      options: ["A test from the table that set the input and recorded the expected result", "It worked when I tried it", "My partner said it looks good", "The code has no errors"]
      answer: 0
      feedback: [null, "Which input did you try, and was it the one the criterion is about?", "Opinions aren't measurements.", "Code with no errors can still do the wrong thing."]
      explain: "A planned test with a recorded result is evidence; everything else is a feeling."
  - check: { type: reflect, text: "I wrote my evaluation: for each criterion, met or not, with the test that shows it; one improvement I would make and why; and who else could use it." }
```

### Which is evidence?

### Write it up
