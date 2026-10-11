---
order: 18
unit: congruence
node: AC9M8SP02 n1
uses: [AC9M8SP01 n1, AC9M7SP02 n2, AC9M7M04 n2]
title: Proving quadrilateral properties
summary: "A diagonal cuts a quadrilateral into two triangles. When those triangles are congruent, their matching sides and angles are equal, and that proves a property for every shape of the kind: a rectangle's diagonals are equal, a parallelogram's cut each other in half, a kite's cross at 90°."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "You measure the diagonals of one rectangle: both 10 cm. Is that true for every rectangle in the world? Measuring can't check them all, but a proof can."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8324
  url: http://127.0.0.1:8324/index.html
  readySelector: "#gclass"
  layout: full
explainPicture: { ref: quad.yml#explain-pic, caption: "A rectangle and its diagonals AC and BD: equal, and they cut each other in half." }
explainClip:
  query: { code: "@quad.yml#explain", fresh: 1, id: explain }
  caption: "Diagonals of a rectangle"
  say: "A rectangle's diagonals are equal."
  clip:
    - caption: { text: "A rectangle: the diagonals AC and BD are equal.", say: "In a rectangle, the diagonals are equal." }
    - expect: { selector: "#gsum", contains: "equal" }
    - wait: 800
    - caption: { text: "Move A: no longer a rectangle, and they are not equal.", say: "Move one corner. Now they are not equal." }
    - click: Move A left
    - expect: { selector: "#gclass", contains: "rapezium" }
    - wait: 1200
    - caption: { text: "Why? Triangles ABC and BAD are congruent (SAS).", say: "Why? Two triangles inside it are congruent." }
    - click: Move A right
    - wait: 1600
---
A **proof** shows that something is true for every shape of a kind, with a reason for each step.

For quadrilaterals, the main tool is congruent triangles. Draw a diagonal (or both), find two triangles, and show they are congruent with a test (SSS, SAS, ASA, AAS or RHS). Then **matching parts of congruent triangles are equal**.

| Shape | Its diagonals |
|---|---|
| parallelogram | cut each other in half (bisect each other) |
| rectangle | equal, and bisect each other |
| rhombus | bisect each other at 90° |
| square | equal, and bisect each other at 90° |
| kite | cross at 90°; one cuts the other in half |

## Predict: does one drawing prove it?

```step
stage: predict
insight: "Committing to whether one measured rectangle proves a rule shows whether they know what a proof needs."
check:
  type: predict
  q: "Ana draws one rectangle and measures both diagonals: 10 cm each. Has she proved that every rectangle's diagonals are equal?"
  options: ["No: one example is not a proof", "Yes: she measured carefully", "Yes, if she draws two more"]
  actual: "No. Examples suggest the rule, but a proof gives reasons that work for every rectangle, such as two congruent triangles."
```

## Run: test many shapes

```step
stage: run
insight: "Dragging a parallelogram into many rectangles shows the diagonals always equal: evidence, which the proof then explains."
try: { playground: board, starter: "quad.yml#run", height: 640 }
check: { type: board, text: "Drag the corners to make a rectangle. Are its diagonals equal? Try a few different rectangles. Does that prove it, as you predicted?", when: "z = 2 and l = 1", explain: "Every rectangle you make has equal diagonals. That is strong evidence, but only a proof covers every rectangle." }
```

The dashed lines are the diagonals AC and BD. The panel gives their lengths, in two parts from where they cross.

## Investigate: write the proof

```step
stage: investigate
insight: "A proof finds two triangles, names the test, then uses matching parts; one measured picture is not a proof (Leo); a kite's triangles are congruent by SSS."
tasks:
  - check:
      type: parsons
      code: "steps.txt#rect"
      text: "Put the proof that a rectangle's diagonals are equal in order."
      extra: ["The diagonals look the same length, so they are equal."]
      explain: "Find two triangles, give the equal parts with reasons, name the test, then use matching sides."
  - check:
      type: bug
      code: "working.txt#leo"
      text: "Leo tries to prove a property of kites. Click the line where his reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: proof-by-picture
      explain: "Line 3: one measured kite is an example, not a proof. A proof gives reasons that hold for every kite."
  - check:
      type: question
      q: "Kite ABCD has AB = AD and CB = CD. The diagonal AC splits it into triangles ABC and ADC. Which test shows they are congruent?"
      options: ["SSS: AB = AD, CB = CD and AC is shared", "SAS", "RHS", "They are not congruent"]
      answer: 0
      feedback: [null, "No angle is known to be equal yet.", "No right angle is known yet.", "Three pairs of sides match."]
      explain: "AC is in both triangles, so all three sides match: SSS. Then angle BAC = angle DAC, so AC cuts angle A in half."
```

### The proof

Here is a proof that a parallelogram's diagonals cut each other in half. Every proof in this lesson has the same plan.

```worked
\text{Parallelogram } ABCD,\ \text{diagonals cross at } M :: Look at triangles ABM and CDM.
AB = CD :: Opposite sides of a parallelogram are equal.
\angle BAM = \angle DCM,\ \angle ABM = \angle CDM :: Alternate angles: AB is parallel to DC.
\triangle ABM \equiv \triangle CDM\ (\text{ASA}) :: Name the test.
AM = CM,\ BM = DM :: Matching sides are equal: the diagonals cut each other in half.
```

### Find the mistake

Read Leo's working. How many kites did he check?

### A kite

## Modify: more properties

```step
stage: modify
insight: "Making a kite, a rhombus and a parallelogram on the board and reading off their diagonal properties."
try: { playground: board, starter: "quad.yml#free", height: 640 }
tasks:
  - starter: "quad.yml#free"
    hint: ["A kite has two pairs of equal sides next to each other.", "Put A and C on one vertical line, with B and D the same distance either side of it.", "Such as corners 5,1; 7,3; 5,7; 3,3."]
    check: { type: board, text: "Make a kite that is not a rhombus. Do its diagonals cross at 90°? Do they cut each other in half?", when: "z = 6 and y = 1 and u = 0", explain: "They cross at 90°, and AC cuts BD in half, but BD does not cut AC in half." }
  - starter: "quad.yml#free"
    hint: "Four equal sides: try steps of 3 across and 4 up, which are 5 long."
    check: { type: board, text: "Make a rhombus that is not a square. What do you notice about its diagonals?", when: "z = 3", explain: "They cut each other in half at 90°, but they are not equal." }
  - starter: "quad.yml#free"
    check: { type: board, text: "Make a parallelogram that is not a rectangle. Do its diagonals cut each other in half?", when: "z = 4 and u = 1", explain: "Yes: every parallelogram's diagonals bisect each other. The two triangles at each end are congruent (ASA, with alternate angles)." }
  - check:
      type: question
      q: "A square is a rectangle and a rhombus. Which properties must its diagonals have?"
      options: ["Equal, cutting each other in half, at 90°", "Equal only", "At 90° only", "None of these"]
      answer: 0
      feedback: [null, "A square is a rhombus too.", "A square is a rectangle too.", "It has every property of both."]
      explain: "It has the rectangle's diagonal properties and the rhombus's."
```

### A kite

### A rhombus

### A parallelogram

### A square

## Practise: reasons

```step
stage: practise
insight: "Naming the test and the property it proves, mixed; one example as proof is the planted slip; the angle review keeps parallel lines fresh."
tasks:
  - check:
      type: question
      q: "In parallelogram ABCD, the diagonal AC makes triangles ABC and CDA. AB = CD and BC = DA (opposite sides). Which test shows they are congruent?"
      options: ["SSS: AC is shared", "RHS", "SSA", "They are not congruent"]
      answer: 0
      feedback: [null, "There may be no right angle.", "SSA is not a test.", "Three pairs of sides match."]
      explain: "AB = CD, BC = DA and AC is in both: SSS. So angle B = angle D: opposite angles are equal."
  - check:
      type: question
      q: "Which is a proof that a rhombus's diagonals cross at 90°?"
      options: ["The four small triangles are congruent by SSS, so the four angles at the centre are equal and add to 360°", "I measured one and got 90°", "It looks like a plus sign", "All rhombuses are squares"]
      answer: 0
      feedback: [null, "One measurement is an example.", "A picture is not a reason.", "Most rhombuses are not squares."]
      explain: "Four equal angles that make 360° are 90° each."
  - check:
      type: question
      q: "Which quadrilateral's diagonals always cut each other in half, but are not always equal?"
      options: ["A parallelogram", "A rectangle", "A square", "A kite"]
      answer: 0
      feedback: [null, "A rectangle's diagonals are always equal.", "A square's diagonals are always equal.", "Only one of a kite's diagonals is cut in half."]
      explain: "Every parallelogram's diagonals bisect each other; they are equal only when it is a rectangle."
  - check:
      type: number
      q: "Review: two parallel lines are cut by a transversal. One co-interior angle is 115°. What is the other, in degrees?"
      answer: 65
      tolerance: 0
      explain: "Co-interior angles add to 180°: 180 − 115 = 65°."
```

### Parallelogram

### Rhombus

### Which shape

### Review: parallel lines

## Make: equal, not halved

```step
stage: make
insight: "Building a shape from a diagonal property, not a name, shows they can reason from properties to shapes."
try: { playground: board, starter: "quad.yml#free", height: 640 }
hint: ["Rectangles have equal diagonals that also cut each other in half. Change one thing.", "Keep one pair of sides parallel, but make the other two sides slope in by the same amount.", "Try a trapezium with equal slanted sides."]
check: { type: board, text: "Make a quadrilateral with one pair of parallel sides whose diagonals are equal but do not cut each other in half.", when: "l = 1 and u = 0 and z = 5", explain: "An isosceles trapezium, such as corners 1,1; 9,1; 7,5; 3,5." }
```

Then write a proof (or the plan of one) that its diagonals are equal. Which two triangles would you use?
