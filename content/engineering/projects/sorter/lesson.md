---
order: 5
unit: advanced
optional: true
title: Automated sorter
summary: "Design a machine that sorts objects into two bins by what a sensor sees: a light sensor (or a trained model) decides, a servo flap acts, and accuracy is measured on a test set."
language: maths
shape: design
hook: "Recycling centres sort millions of items a day with sensors and flaps. Can yours sort a box of mixed items, and how often is it right?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8520
  url: http://127.0.0.1:8520/index.html
  readySelector: "#board svg"
  layout: full
---
**Client:** the school's recycling team. **Context:** light and dark items (or paper and plastic) slide down a chute past a sensor.

**Brief:** a light sensor reads each item; **light items (reading 400 or more) go to bin B, dark items to bin A**; a servo flap moves within **0.5 s**; the sorter must be **at least 90% accurate on a test set of 20 items**. Kit parts only; USB power.

## Inquire: the brief

```step
stage: predict
insight: "Separating what the design must do (criteria) from the limits it works within (constraints) is the first move of any design brief."
check:
  type: sort
  q: "Sort each line of the brief: a criterion (what it must do, which you can test) or a constraint (a limit you must work within)?"
  options: ["Criterion", "Constraint"]
  items:
    - ["Light items (400 or more) go to bin B", "Criterion"]
    - ["The flap moves within 0.5 s", "Criterion"]
    - ["At least 90% accurate on 20 test items", "Criterion"]
    - ["Kit parts only", "Constraint"]
    - ["USB power", "Constraint"]
  explain: "Criteria are what you will test at the end; constraints decide what you are allowed to build with."
```

## Develop: plan before you build

```step
stage: investigate
insight: "Prototyping the decision against threshold tests, then planning a separate accuracy test with real items, separates \"the code is right\" from \"the machine sorts well\"."
try: { playground: board, starter: "board.yml#develop", height: 700 }
tasks:
  - check: { type: board, text: "Here the LED stands in for the flap (on = bin B). Write the decision so all four tests pass.", when: "u = 4 and q = 4", explain: "if (level >= 400) flap to B (LED on), else A (off)." }
  - check:
      type: number
      q: "Your sorter puts 17 of 20 test items in the right bin. What is its accuracy, as a percentage?"
      answer: 85
      explain: "17 ÷ 20 = 0.85 = 85%: under the 90% the brief needs."
  - check: { type: reflect, text: "My plan has: the light sensor and servo wiring (the servo's power from 5V or its own supply), the flap angles for each bin, and a labelled test set of 20 items." }
```

### Prototype the decision

### Accuracy

### The plan

Stretch route: replace the light sensor with the Teachable Machine classifier from Code › micro:bit and the computer, sending its label to the board over serial.

## Create: build it

```step
stage: make
insight: "Building in the simulator first catches wiring and code slips cheaply; the real build then tests the design against the world."
tasks:
  - check: { type: reflect, text: "In Tinkercad: a light sensor on A0, a micro servo on pin 9 (Servo library), and my sketch. The flap moves to the right side as I change the light." }
  - check: { type: reflect, text: "For real (if you have the kit): the sensor and servo mounted on a chute (cardboard or printed), sketch uploaded." }
```

### In the simulator

### For real

## Test: run your table

```step
stage: modify
insight: "Running the test table written in Develop, and recording every result including failures, is the evidence for the evaluation."
tasks:
  - check: { type: reflect, text: "I ran my 20-item test set, recorded which bin each item went to and which it should have, worked out the accuracy, and timed the flap." }
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
