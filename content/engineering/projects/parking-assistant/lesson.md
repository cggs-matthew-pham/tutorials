---
order: 2
unit: core
optional: true
title: Parking assistant
summary: "Design a distance warning: an ultrasonic sensor and a buzzer or LED that warns sooner and harder as something gets closer, tested at each band edge."
language: maths
shape: design
hook: "Reversing cars beep faster as they get closer to a wall. Can you build one, and prove it warns at the right distances?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8518
  url: http://127.0.0.1:8518/index.html
  readySelector: "#board svg"
  layout: full
---
**Client:** a family whose car has no reversing sensor. **Context:** a model on the bench (a ruler and a box stand in for the car and the wall).

**Brief:** an ultrasonic distance sensor measures in centimetres. **Off** when the distance is over 100 cm, **beeping** (blinking) from 30 to 100 cm, **steady** under 30 cm. Kit parts only (HC-SR04 sensor, piezo buzzer or LED); USB power.

## Inquire: the brief

```step
stage: predict
insight: "Separating what the design must do (criteria) from the limits it works within (constraints) is the first move of any design brief."
check:
  type: sort
  q: "Sort each line of the brief: a criterion (what it must do, which you can test) or a constraint (a limit you must work within)?"
  options: ["Criterion", "Constraint"]
  items:
    - ["Off over 100 cm", "Criterion"]
    - ["Blinks or beeps from 30 to 100 cm", "Criterion"]
    - ["Steady under 30 cm", "Criterion"]
    - ["HC-SR04 sensor and a buzzer or LED from the kit", "Constraint"]
    - ["USB power", "Constraint"]
  explain: "Criteria are what you will test at the end; constraints decide what you are allowed to build with."
```

## Develop: plan before you build

```step
stage: investigate
insight: "Three bands mean four edges to test; prototyping the bands on the board, with the knob as the distance in cm, gets the logic right before the sensor code."
try: { playground: board, starter: "board.yml#develop", height: 700 }
tasks:
  - check:
      type: question
      q: "How many test readings do you need at minimum to check every band edge (30 and 100), on both sides?"
      options: ["4: 29, 30, 100, 101", "2: 30 and 100", "3: one in each band", "1: 50"]
      answer: 0
      feedback: [null, "Each edge needs both sides.", "One per band misses the edges.", "One reading checks one band."]
      explain: "Each edge needs the reading just inside and just outside it."
  - check: { type: board, text: "Here the knob reading stands in for the distance in cm. Write the bands so all six tests pass.", when: "u = 6 and q = 6", explain: "if (cm < 30) steady; else if (cm <= 100) blink; else off." }
  - check: { type: reflect, text: "My plan has: the sensor wiring (trig, echo, 5V, GND), the buzzer or LED, the bands, and my test table with distances measured by ruler." }
```

### Band edges

### Prototype the bands

### The plan

On the real sensor, `pulseIn` measures the echo time; distance in cm ≈ time (µs) ÷ 58. Tinkercad's ultrasonic sensor lets you drag the object to set the distance.

## Create: build it

```step
stage: make
insight: "Building in the simulator first catches wiring and code slips cheaply; the real build then tests the design against the world."
tasks:
  - check: { type: reflect, text: "In Tinkercad: the ultrasonic sensor, a piezo buzzer (tone) or LED, and my sketch with the three bands. I dragged the object through every band." }
  - check: { type: reflect, text: "For real (if you have the kit): built and uploaded; distances checked with a ruler." }
```

### In the simulator

### For real

## Test: run your table

```step
stage: modify
insight: "Running the test table written in Develop, and recording every result including failures, is the evidence for the evaluation."
tasks:
  - check: { type: reflect, text: "I ran every test in my table with a ruler (29, 30, 100 and 101 cm, plus one in each band) and recorded each result, including any where the sensor was unreliable." }
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
