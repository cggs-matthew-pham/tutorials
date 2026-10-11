---
order: 1
unit: param
title: Parametric design
summary: "In a parametric model, dimensions are linked by rules: outside = part + 2 × (clearance + wall). Change the part, and everything that depends on it updates. Name the numbers that drive the design, and work the rest out from them."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The board your case was designed for has been replaced by a bigger one. Do you start again, or change one number?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8526
  url: http://127.0.0.1:8526/index.html
  readySelector: ".fbsvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "outside = part + 2 × (clearance + wall): 68.6 + 2 × 3 = 74.6 mm." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "One rule, every size"
  say: "The outside is worked out from the part."
  clip:
    - caption: { text: "The rule: outside = part + 2 × (clearance + wall).", say: "One rule links the sizes." }
    - wait: 2000
    - caption: { text: "Change the part, and the outside follows. Nothing is redrawn.", say: "Change one number, and the model updates." }
    - wait: 1800
    - expect: { selector: "#gsum", contains: "74.6" }
---
In Onshape (and Fusion, and Tinkercad's newer parameters) a design can have **variables**: `#part = 68.6 mm`, `#clearance = 1 mm`, `#wall = 2 mm`. Every other size is an **expression** using them, such as `#part + 2 * (#clearance + #wall)`. That is a **parametric** model: the numbers that matter **drive** it, and the rest is worked out.

## Predict: a bigger part

```step
stage: predict
insight: "Committing to what changes when the part grows tests the new move: in a parametric model, dependent sizes update themselves."
check:
  type: predict
  q: "In a parametric case, the part gets 10 mm wider. What happens to the outside width?"
  options: ["It grows by 10 mm by itself", "Nothing until you redraw it", "It grows by 20 mm", "The walls get thinner to make room"]
  actual: "It grows by 10 mm by itself: outside = part + 2 × (clearance + wall), and only the part changed."
```

## Try: change the part

```step
stage: run
insight: "Changing the driving numbers on the board settles the prediction and shows which numbers each size depends on."
try: { playground: board, starter: "board.yml#run", height: 560 }
tasks:
  - check: { type: board, text: "Make the part 10 mm wider (78.6 mm). What is the outside now?", when: "u = 78.6", explain: "84.6 mm: 10 more, nothing redrawn." }
  - check: { type: board, text: "Now halve the clearance (0.5 mm). How much does the outside change?", when: "c = 0.5", explain: "1 mm less: the clearance is on both sides." }
```

### A wider part

### Less clearance

## Worked example: write the rules

```step
stage: investigate
insight: "Writing each size as an expression of the driving variables models the move. Sam's typed-in number is planted after the method."
tasks:
  - check:
      type: answer
      q: "Part 50 mm, clearance 1 mm, wall 2 mm. Outside width (mm)?"
      answer: "56"
      feedback:
        - ["53", "Clearance and wall on both sides: 2 × (1 + 2)."]
      explain: "50 + 2 × (1 + 2) = 56 mm."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam has to redraw the whole case for the new board. Click the line where Sam's design first goes wrong."
      answer: 2
      fault: logic
      misconception: edit-means-redraw
      explain: "Line 2: typing 74.6 as a plain number cuts the link to the part. As #part + 2 * (#clearance + #wall), changing #part to 75 would update the case by itself."
```

### Driving and driven

```worked
\#part = 68.6, \; \#clearance = 1, \; \#wall = 2 :: The driving dimensions: the only numbers typed in.
\text{inside} = \#part + 2 \times \#clearance = 70.6 :: Worked out, never typed.
\text{outside} = \text{inside} + 2 \times \#wall = 74.6 :: Worked out from the inside.
\#part = 75 \Rightarrow \text{outside} = 81 :: Change one number; every size that depends on it follows.
```

Now a 50 mm part.

### Find the mistake

## Do it in Onshape

```step
stage: modify
tier: typical
insight: "Creating variables in Onshape and using them in sketch dimensions is the real skill this lesson points at."
check: { type: reflect, text: "In Onshape: I created variables #part, #clearance and #wall, sketched the case with the outside dimension typed as #part + 2 * (#clearance + #wall), extruded it, then changed #part and watched the case update." }
```

## Practise: rules

```step
stage: practise
insight: "Reading and writing dependent sizes."
tasks:
  - check:
      type: question
      q: "Which size should be a driving variable rather than worked out?"
      options: ["The width of the part that goes inside", "The case's outside width", "The case's inside width", "The lid's outside width"]
      answer: 0
      feedback: [null, "That depends on the part, clearance and wall.", "That depends on the part and clearance.", "That depends on the case."]
      explain: "Drive the design from what you can't change (the part) and the choices you make (clearance, wall)."
  - check:
      type: answer
      q: "A lid sits over the case with 0.5 mm clearance each side and its own 2 mm wall. Outside = 74.6. Lid outside (mm)?"
      answer: "79.6"
      feedback:
        - ["77.1", "Clearance and wall are on both sides."]
      explain: "74.6 + 2 × (0.5 + 2) = 79.6 mm."
```

### Which drives?

### The lid

## Make: the biggest part

```step
stage: make
insight: "Working back from a limit on the outside to the largest part that fits reverses the rule."
try: { playground: board, starter: "board.yml#make", height: 560 }
hint: ["outside = part + 2 × (1 + 2) = part + 6.", "The outside can be at most 80.", "part = 80 − 6 = 74."]
check: { type: board, text: "The case must be no more than 80 mm wide outside (clearance 1 mm, wall 2 mm). Set the biggest part that fits.", when: "c = 1 and t = 2 and o <= 80 and o >= 79.9", explain: "74 mm: 80 − 2 × (1 + 2)." }
```
