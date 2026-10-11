---
order: 8
unit: boards
optional: true
title: Design a PCB
summary: "Design a printed circuit board for a project: draw the schematic, lay out the board, run the design rule check, and prepare the files a manufacturer needs."
language: maths
shape: design
hook: "Every device you own has a printed circuit board. Designing one is how a prototype becomes a product."
---
**Client:** you, for a project with a working breadboard version (a driver-and-sensor shield for the drive base is a good first board). **Context:** the board may be ordered for the class, or kept as a design.

**Brief:** a **schematic** that matches the working circuit, a **board layout** at most **5 × 5 cm** (or Uno-shield size), **no errors in the design rule check**, and **manufacturing files** (Gerbers) exported. Free tools only (KiCad or EasyEDA).

## Inquire: the brief

```step
stage: predict
insight: "Separating what the design must do (criteria) from the limits it works within (constraints) is the first move of any design brief."
check:
  type: sort
  q: "Sort each line of the brief: a criterion (what it must do, which you can test) or a constraint (a limit you must work within)?"
  options: ["Criterion", "Constraint"]
  items:
    - ["The schematic matches the working circuit", "Criterion"]
    - ["No design rule check errors", "Criterion"]
    - ["Gerber files exported", "Criterion"]
    - ["At most 5 × 5 cm, or Uno-shield size", "Constraint"]
    - ["Free tools only: KiCad or EasyEDA", "Constraint"]
  explain: "Criteria are what you will test at the end; constraints decide what you are allowed to build with."
```

## Develop: plan before you build

```step
stage: investigate
insight: "Ordering the steps of PCB design, and knowing what the design rule check catches, plans the work before the tool is learned."
tasks:
  - check:
      type: parsons
      code: "steps.txt#pcb"
      text: "Put the PCB design steps in order."
      explain: "Schematic first, then footprints, then layout and routing, then the checks, then the files."
  - check:
      type: question
      q: "What does the design rule check (DRC) catch?"
      options: ["Tracks or pads too close together, too thin, or not connected as the schematic says", "Mistakes in the code", "Whether the circuit does what the brief needs", "The cost of the board"]
      answer: 0
      feedback: [null, "The board has no code.", "That is what testing the built board shows.", "That comes from the manufacturer's quote."]
      explain: "It checks the layout can be made and matches the schematic, not that the design is a good one."
  - check: { type: reflect, text: "My schematic is drawn in KiCad or EasyEDA from my working breadboard circuit, and a partner has checked it against the breadboard." }
```

### The steps

### Design rule check

### The schematic

## Create: build it

```step
stage: make
insight: "Building in the simulator first catches wiring and code slips cheaply; the real build then tests the design against the world."
tasks:
  - check: { type: reflect, text: "Every part has a footprint that matches the real part I will use (checked against its datasheet or the actual part)." }
  - check: { type: reflect, text: "The board is laid out and routed, within the size limit, with mounting holes if it needs them." }
```

### In the simulator

### For real

## Test: run your table

```step
stage: modify
insight: "Running the test table written in Develop, and recording every result including failures, is the evidence for the evaluation."
tasks:
  - check: { type: reflect, text: "I ran the design rule check until it showed no errors, and recorded each error I fixed. If the board was made, I assembled it and ran my project's test table on it." }
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
