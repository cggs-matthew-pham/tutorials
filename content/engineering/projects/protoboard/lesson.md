---
order: 7
unit: boards
optional: true
title: Off the breadboard
summary: "Move a finished breadboard project onto soldered protoboard so it survives being carried around: plan the layout, solder safely, and test it against the same table as before."
language: maths
shape: design
hook: "A breadboard circuit falls apart in a school bag. How do you make it permanent?"
---
**Client:** you, for any project you have already built. **Context:** the project has to survive a school bag.

**Brief:** the same circuit on **protoboard** (or stripboard), **working the same tests as the breadboard version**, **no loose wires**, and **fits on a 5 × 7 cm board**. Soldering only with the teacher's safety briefing, in the soldering area.

## Inquire: the brief

```step
stage: predict
insight: "Separating what the design must do (criteria) from the limits it works within (constraints) is the first move of any design brief."
check:
  type: sort
  q: "Sort each line of the brief: a criterion (what it must do, which you can test) or a constraint (a limit you must work within)?"
  options: ["Criterion", "Constraint"]
  items:
    - ["Passes the same tests as the breadboard version", "Criterion"]
    - ["No loose wires", "Criterion"]
    - ["Fits on a 5 × 7 cm board", "Constraint"]
    - ["Soldering only after the safety briefing, in the soldering area", "Constraint"]
  explain: "Criteria are what you will test at the end; constraints decide what you are allowed to build with."
```

## Develop: plan before you build

```step
stage: investigate
insight: "Planning the layout on paper (or in Tinkercad) before the iron is hot is what makes protoboard work: holes can't be moved later."
tasks:
  - check:
      type: question
      q: "On stripboard the copper strips join every hole in a row. An LED's two legs must go in the same row, but must not be joined. What do you do?"
      options: ["Cut the strip between the legs", "Solder them together", "Use a bigger resistor", "Put the LED the other way round"]
      answer: 0
      feedback: [null, "That shorts the LED out.", "The resistor doesn't break the strip.", "Both legs are still joined."]
      explain: "A track cut breaks the strip so the legs are in separate pieces, as on a breadboard."
  - check:
      type: sort
      q: "Soldering: safe or unsafe?"
      options: ["Safe", "Unsafe"]
      items:
        - ["Iron back in its stand whenever you put it down", "Safe"]
        - ["Fume extractor on, face out of the smoke", "Safe"]
        - ["Testing whether the iron is hot with a finger", "Unsafe"]
        - ["Cutting component legs with the board pointing at a classmate", "Unsafe"]
        - ["Washing hands after soldering", "Safe"]
      explain: "The iron is around 350 °C; the fumes and offcuts are hazards too."
  - check: { type: reflect, text: "My layout is drawn on a grid of the board's holes, with every part, wire and track cut marked, and it matches my circuit diagram." }
```

### Track cuts

### Soldering safety

### The layout

## Create: build it

```step
stage: make
insight: "Building in the simulator first catches wiring and code slips cheaply; the real build then tests the design against the world."
tasks:
  - check: { type: reflect, text: "Layout checked against the circuit diagram by a partner before soldering." }
  - check: { type: reflect, text: "Soldered, with each joint shiny and cone-shaped; checked for bridges between neighbouring holes." }
```

### In the simulator

### For real

## Test: run your table

```step
stage: modify
insight: "Running the test table written in Develop, and recording every result including failures, is the evidence for the evaluation."
tasks:
  - check: { type: reflect, text: "I ran the same test table as the breadboard version and recorded each result, plus a shake test (gently shaken, then re-tested)." }
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
