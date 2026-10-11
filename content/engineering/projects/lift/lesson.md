---
order: 6
unit: advanced
optional: true
title: Lift
summary: "Design a motor-driven lift that raises a load to a height within a time: choose a gear ratio against the brief, drive the motor through a driver, and compare the measured result with the prediction."
language: maths
shape: design
hook: "The winch lesson worked on paper. Does a real motor, real gears and real friction agree with the numbers?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8521
  url: http://127.0.0.1:8521/index.html
  readySelector: "#board svg"
  layout: full
---
**Client:** a theatre group that needs a small prop to rise on cue. **Context:** a model lift on the bench.

**Brief:** lift a **450 g** load **1 m** in **15 s or less**, stop at the top (a limit switch or a timed stop), and lower it again. The motor turns at **120 rpm** and lifts **200 g** with no gears; the drum winds **0.1 m** a turn. Kit gears (8, 16, 24, 40 teeth), a motor driver, its own battery.

## Inquire: the brief

```step
stage: predict
insight: "Separating what the design must do (criteria) from the limits it works within (constraints) is the first move of any design brief."
check:
  type: sort
  q: "Sort each line of the brief: a criterion (what it must do, which you can test) or a constraint (a limit you must work within)?"
  options: ["Criterion", "Constraint"]
  items:
    - ["Lifts 450 g by 1 m", "Criterion"]
    - ["Takes 15 s or less", "Criterion"]
    - ["Stops at the top and can lower again", "Criterion"]
    - ["Motor 120 rpm, 200 g with no gears", "Constraint"]
    - ["Gears from the kit: 8, 16, 24, 40", "Constraint"]
    - ["A motor driver and its own battery", "Constraint"]
  explain: "Criteria are what you will test at the end; constraints decide what you are allowed to build with."
```

## Develop: plan before you build

```step
stage: investigate
insight: "Choosing the gear pair on the board makes the prediction; the real build then tests the model (no friction) against the world."
try: { playground: board, starter: "board.yml#develop", height: 600 }
tasks:
  - check: { type: board, text: "Choose a gear pair that meets the brief, and lift with it.", when: "p = 1 and l = 1", explain: "8 → 24 (600 g, 15 s) or 16 → 40 (500 g, 12.5 s). With real friction, the one with more margin is safer." }
  - check:
      type: question
      q: "Real gears lose about 10% of the force at each mesh. Which pair has more margin on strength?"
      options: ["8 → 24: 600 g against 450 g", "16 → 40: 500 g against 450 g", "They are the same", "Neither: friction doesn't matter"]
      answer: 0
      feedback: [null, "500 × 0.9 = 450: no margin at all.", "Work out each one × 0.9.", "It decides whether the real lift stalls."]
      explain: "600 × 0.9 = 540 g, still over 450. 16 → 40 drops to exactly 450 with no margin."
  - check: { type: reflect, text: "My plan has: the gear pair and why, the driver wiring (direction for up and down, ENA), how it stops at the top, and a test table with predicted and measured times." }
```

### Choose the gears

### Margin

### The plan

## Create: build it

```step
stage: make
insight: "Building in the simulator first catches wiring and code slips cheaply; the real build then tests the design against the world."
tasks:
  - check: { type: reflect, text: "In Tinkercad: the motor through an L293D with a button for up and one for down. The sketch drives it both ways." }
  - check: { type: reflect, text: "For real (if you have the kit): the gears mounted (LEGO, Meccano or printed), the drum and string, the motor and driver, and a limit switch or timed stop." }
```

### In the simulator

### For real

## Test: run your table

```step
stage: modify
insight: "Running the test table written in Develop, and recording every result including failures, is the evidence for the evaluation."
tasks:
  - check: { type: reflect, text: "I lifted the load five times, timed each lift, and recorded the predicted time beside the measured one, plus any stalls." }
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
      q: "Your lift takes 17 s; the model predicted 15 s. What is the best explanation to give in your evaluation?"
      options: ["The model ignores friction and the motor slowing under load; measure and say how much", "The stopwatch was wrong", "The gears are broken", "The brief was unfair"]
      answer: 0
      feedback: [null, "Possible once; five lifts make it unlikely.", "Then it wouldn't lift at all.", "The brief is the brief: explain the gap."]
      explain: "Real motors slow under load, and every mesh loses a little: the model's 15 s is a best case."
  - check: { type: reflect, text: "I wrote my evaluation: for each criterion, met or not, with the test that shows it; one improvement I would make and why; and who else could use it." }
```

### Which is evidence?

### Write it up
