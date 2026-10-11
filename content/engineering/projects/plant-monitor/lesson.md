---
order: 1
unit: core
optional: true
title: Smart plant monitor
summary: "Design a monitor that warns when a pot plant needs water: a soil moisture sensor, an alarm, and a display of the reading, tested at its threshold."
language: maths
shape: design
hook: "The garden club loses plants every holiday. Can a microcontroller tell them which pot is dry before it is too late?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8517
  url: http://127.0.0.1:8517/index.html
  readySelector: "#board svg"
  layout: full
---
**Client:** the school garden club. **Context:** pot plants in a classroom, checked twice a week.

**Brief:** a soil moisture sensor on A0 reads low when the soil is dry. The monitor must **blink an LED when the reading is 300 or below**, stay **off** otherwise, and **show the reading** (LCD or serial monitor). It must use **only parts from the kit** (or Tinkercad's parts), run on **4 × AA or USB**, and fit in a box **no bigger than a pencil case**.

## Inquire: the brief

```step
stage: predict
insight: "Separating what the design must do (criteria) from the limits it works within (constraints) is the first move of any design brief."
check:
  type: sort
  q: "Sort each line of the brief: a criterion (what it must do, which you can test) or a constraint (a limit you must work within)?"
  options: ["Criterion", "Constraint"]
  items:
    - ["Blinks the LED at a reading of 300 or below", "Criterion"]
    - ["Stays off above 300", "Criterion"]
    - ["Shows the current reading", "Criterion"]
    - ["Only parts from the kit", "Constraint"]
    - ["Runs on 4 × AA or USB", "Constraint"]
    - ["Fits in a pencil-case-sized box", "Constraint"]
  explain: "Criteria are what you will test at the end; constraints decide what you are allowed to build with."
```

## Develop: plan before you build

```step
stage: investigate
insight: "Writing the test table and prototyping the decision on the board before wiring anything turns the criteria into something checkable."
try: { playground: board, starter: "board.yml#develop", height: 700 }
tasks:
  - check:
      type: question
      q: "Which test table checks the threshold best?"
      options: ["0 blink, 299 blink, 300 blink, 301 off, 1023 off", "0 blink, 1023 off", "150 blink, 800 off", "300 blink only"]
      answer: 0
      feedback: [null, "Nothing near 300.", "Nothing near 300.", "One case can't show both behaviours."]
      explain: "Both sides of the threshold, the threshold itself, and the ends."
  - check: { type: board, text: "Prototype the decision: write the sketch so all five tests pass.", when: "u = 5 and q = 5", explain: "if (level <= 300) blink, else off: the logic is ready before any wiring." }
  - check: { type: reflect, text: "My design plan has: a parts list, a circuit diagram (sensor on A0, LED and resistor on pin 13, display), and my test table." }
```

### The test table

### Prototype the logic

### The plan

## Create: build it

```step
stage: make
insight: "Building in the simulator first catches wiring and code slips cheaply; the real build then tests the design against the world."
tasks:
  - check: { type: reflect, text: "In Tinkercad: the soil moisture sensor on A0, the LED on pin 13, the 16 × 2 LCD (or the serial monitor), and my sketch. It runs." }
  - check: { type: reflect, text: "For real (if you have the kit): built on a breadboard, uploaded, and the sensor tested in dry and wet soil." }
```

### In the simulator

### For real

## Test: run your table

```step
stage: modify
insight: "Running the test table written in Develop, and recording every result including failures, is the evidence for the evaluation."
tasks:
  - check: { type: reflect, text: "I ran every test in my table on the built monitor (dry soil, wet soil, and readings near 300 using a knob or a damp cloth) and recorded each result." }
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
