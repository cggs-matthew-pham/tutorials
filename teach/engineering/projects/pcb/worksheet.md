---
title: "Design a PCB"
subtitle: "Capstone projects · Stretch: make it permanent · Lesson 8"
---

# Design a PCB

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every device you own has a printed circuit board. Designing one is how a prototype becomes a product.


:::teacher-note

**In one sentence:** A stretch project: design a PCB for a working project in KiCad or EasyEDA (schematic, footprints, layout, design rule check, Gerber files), optionally ordered and assembled.

**Students should be able to say:** I can draw a schematic from a working circuit. I can lay out and check a board. I can prepare a design for manufacture.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Inquire: the brief


:::keep-together

**Sort each line of the brief: a criterion (what it must do, which you can test) or a constraint (a limit you must work within)?**

Groups: Criterion, Constraint

- The schematic matches the working circuit: {{field-15}}
- No design rule check errors: {{field-15}}
- Gerber files exported: {{field-15}}
- At most 5 × 5 cm, or Uno-shield size: {{field-15}}
- Free tools only: KiCad or EasyEDA: {{field-15}}

:::


:::teacher-note

**Answer:** The schematic matches the working circuit → Criterion; No design rule check errors → Criterion; Gerber files exported → Criterion; At most 5 × 5 cm, or Uno-shield size → Constraint; Free tools only: KiCad or EasyEDA → Constraint

Criteria are what you will test at the end; constraints decide what you are allowed to build with.

:::


## Develop: plan before you build


:::keep-together

### The steps

**Put the PCB design steps in order.**

A. `Place the parts on the board outline.`

B. `Export the Gerber files.`

C. `Draw the schematic from the working circuit.`

D. `Run the design rule check and fix every error.`

E. `Give every part a footprint that matches the real part.`

F. `Route the tracks.`

Correct order (letters): {{field-24}}

:::


:::teacher-note

**Answer:** see the program below

Schematic first, then footprints, then layout and routing, then the checks, then the files.

```maths
Draw the schematic from the working circuit.
Give every part a footprint that matches the real part.
Place the parts on the board outline.
Route the tracks.
Run the design rule check and fix every error.
Export the Gerber files.
```

:::


:::keep-together

### Design rule check

**What does the design rule check (DRC) catch?**

☐ Mistakes in the code

☐ Tracks or pads too close together, too thin, or not connected as the schematic says

☐ The cost of the board

☐ Whether the circuit does what the brief needs

:::


:::teacher-note

**Answer:** Tracks or pads too close together, too thin, or not connected as the schematic says

It checks the layout can be made and matches the schematic, not that the design is a good one.

:::


## Create: build it


**In the simulator.** 

**For real.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}


:::wider

## Test: run your table


**Run the tests.** 

**Fix and re-test.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Evaluate: against the brief


:::keep-together

### Which is evidence?

**Which is the strongest evidence that the design meets a criterion?**

☐ The code has no errors

☐ It worked when I tried it

☐ My partner said it looks good

☐ A test from the table that set the input and recorded the expected result

:::


:::teacher-note

**Answer:** A test from the table that set the input and recorded the expected result

A planned test with a recorded result is evidence; everything else is a feeling.

:::


## Exit ticket

:::keep-together

**Name two things a design rule check catches, and one it can't.**

{{lines-3}}

:::


:::teacher-note

**Answer:** It catches tracks too close or too thin and unconnected nets; it can't tell whether the circuit meets the brief.

:::

