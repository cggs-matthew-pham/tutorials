---
order: 16
unit: congruence
node: AC9M8SP01 n1
uses: [AC9M7SP02 n1]
title: Congruent triangles
summary: "Congruent triangles are the same shape and size. You don't need all six parts to check: some sets of three parts fix the triangle (the congruence tests: SSS, SAS, ASA or AAS, RHS), and one set of three can fit two different triangles."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A builder cuts a hundred identical roof trusses. To check two are the same, does she need to measure every side and every angle, or are three measurements enough?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8322
  url: http://127.0.0.1:8322/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: tri.yml#explain-pic, caption: "AB = 8, BC = 6 and angle A = 40°: two different triangles fit, so SSA is not a congruence test." }
explainClip:
  query: { code: "@tri.yml#explain", fresh: 1, id: explain }
  caption: "When SSA fails"
  say: "Two sides and an angle that is not between them."
  clip:
    - caption: { text: "AB = 8, angle A = 40°, BC = 9: one triangle.", say: "With BC nine, there is one triangle." }
    - wait: 1200
    - caption: { text: "Make BC shorter: it can swing to two places. Two triangles.", say: "Make BC shorter. It can meet the line in two places." }
    - click: Make side q smaller
    - click: Make side q smaller
    - click: Make side q smaller
    - click: Make side q smaller
    - click: Make side q smaller
    - click: Make side q smaller
    - expect: { selector: "#gnote", contains: "Two different triangles" }
    - wait: 1600
---
Two shapes are **congruent** when one fits exactly on the other: the same shape and the same size. For triangles, matching sides and matching angles are equal. Write $\triangle ABC \equiv \triangle PQR$, with the corners in matching order.

Do you need all six measurements to be sure?

## Predict: two sides and an angle

```step
stage: predict
insight: "Committing to whether two sides and any angle fix a triangle shows whether they know the angle's position matters."
check:
  type: predict
  q: "Two triangles both have sides of 8 cm and 6 cm and a 40° angle. Must they be congruent?"
  options: ["Not always: it depends where the angle is", "Yes: two sides and an angle are enough", "No: you always need all three sides"]
  actual: "Not always. With the angle between the two sides (SAS) the triangle is fixed. With the angle somewhere else (SSA), two different triangles can fit."
```

You do not need all six. These **congruence tests** each fix a triangle, so two triangles that share them are congruent. The angle between two sides is the **included angle**.

| Test | Equal parts |
|---|---|
| **SSS** | all three sides |
| **SAS** | two sides and the included angle (the angle **between** them) |
| **ASA** / **AAS** | two angles and a matching side |
| **RHS** | a right angle, the hypotenuse and one other side |

## Run: build from parts

```step
stage: run
insight: "Trying each set of parts on the board shows which sets fix one triangle and which (SSA) can give two."
try: { playground: board, starter: "tri.yml#run", height: 640 }
check: { type: board, text: "Try SSS, SAS and ASA, then SSA. Find parts that make two different triangles. Was your prediction right?", when: "n = 2", explain: "SSA with a short side opposite the angle: the side can meet the line in two places." }
```

Press a test to choose which parts are given, then change them with the sliders.

## Investigate: which test

```step
stage: investigate
insight: "Name the test from the parts and where the angle is; SSA is not a test (Tom treats it as SAS); equal angles alone give the same shape but not the same size."
tasks:
  - check:
      type: question
      q: "In both triangles, AB = 5 cm, AC = 7 cm and angle A = 40°. Which test shows they are congruent?"
      options: ["SAS: angle A is between AB and AC", "SSS", "ASA", "They might not be congruent"]
      answer: 0
      feedback: [null, "Only two sides are known.", "Only one angle is known.", "Angle A is between the two sides, so SAS fixes it."]
      explain: "Angle A is where AB and AC meet: two sides and the included angle."
  - check:
      type: bug
      code: "working.txt#tom"
      text: "Tom decides two triangles are congruent. Click the line where his reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: ssa-is-test
      explain: "Line 3: SAS needs the angle between the two sides. Here it is not (SSA), and SSA can give two different triangles."
  - check:
      type: question
      q: "Two triangles both have angles of 50°, 60° and 70°. Are they congruent?"
      options: ["Not necessarily: they are the same shape but can be different sizes", "Yes: all three angles match", "Yes, by ASA", "No, never"]
      answer: 0
      feedback: [null, "Matching angles fix the shape, not the size.", "ASA needs a side too.", "They could be congruent if a side matches as well."]
      explain: "Equal angles make them similar (same shape). A matching side is needed for congruence."
```

### Which test

Here is the routine.

```worked
\text{AB} = 6,\ \text{BC} = 4,\ \angle B = 70^\circ :: List the equal parts.
\angle B \text{ is between AB and BC} :: Where is the angle?
\text{SAS} :: Two sides and the included angle.
\triangle ABC \equiv \triangle PQR :: Write the congruence with matching corners in order.
```

### Find the mistake

Read Tom's working. Where is the 40° angle?

### Angles only

## Modify: tests that fail

```step
stage: modify
insight: "Finding parts that make no triangle, checking RHS, and reading congruence statements in order."
try: { playground: board, starter: "tri.yml#asa", height: 600 }
tasks:
  - starter: "tri.yml#asa"
    hint: "What must the two angles add to for the two lines to meet?"
    check: { type: board, text: "Change the two angles so that no triangle can be made.", when: "n = 0", explain: "If angle A + angle B is 180° or more, the two lines never meet." }
  - starter: "tri.yml#rhs"
    hint: "The hypotenuse is the longest side."
    check: { type: board, text: "With a right angle at A, set AB = 8 and the hypotenuse BC = 10. How many triangles fit?", when: "p = 8 and r = 10", explain: "Exactly one (AC = 6): a right angle, the hypotenuse and a side fix the triangle, so RHS is a test." }
  - starter: "tri.yml#sss"
    check: { type: board, text: "Find three sides that do not make a triangle.", when: "n = 0", explain: "The two shorter sides must add to more than the longest, 2, 3 and 6 fails." }
  - check:
      type: question
      q: "△ABC ≡ △PQR. Which side matches BC?"
      options: ["QR", "PQ", "PR", "You cannot tell"]
      answer: 0
      feedback: [null, "PQ matches AB.", "PR matches AC.", "The order of the letters tells you."]
      explain: "B matches Q and C matches R, so BC matches QR."
```

### No triangle

### RHS

### Sides that fail

### Matching order

## Practise: congruence tests

```step
stage: practise
insight: "Naming tests from given parts, mixed; treating SSA as a test is the planted slip; the angle sum review keeps triangles fresh."
tasks:
  - check:
      type: question
      q: "Both triangles have sides 4, 6 and 7 cm. Which test?"
      options: ["SSS", "SAS", "RHS", "Not enough to tell"]
      answer: 0
      feedback: [null, "No angle is given.", "No right angle is given.", "Three sides are enough."]
      explain: "Three equal sides: SSS."
  - check:
      type: question
      q: "Both triangles have angles 30° and 80°, and the side opposite the 80° angle is 9 cm. Which test?"
      options: ["AAS", "SSS", "SAS", "Not enough to tell"]
      answer: 0
      feedback: [null, "Only one side is given.", "Only one side is given.", "Two angles and a matching side are enough."]
      explain: "Two angles and a side that is not between them: AAS."
  - check:
      type: question
      q: "Both triangles have sides 9 cm and 6 cm, and a 35° angle opposite the 6 cm side (not between the two sides). Must they be congruent?"
      options: ["No: SSA is not a congruence test", "Yes, by SAS", "Yes, by SSS", "Yes, by RHS"]
      answer: 0
      feedback: [null, "The angle is not between the sides.", "Only two sides are given.", "No right angle is given."]
      explain: "Two sides and a non-included angle can make two different triangles."
  - check:
      type: number
      q: "Review: a triangle has angles of 47° and 68°. What is the third angle, in degrees?"
      answer: 65
      tolerance: 0
      explain: "180 − 47 − 68 = 65°."
```

### SSS

### AAS

### SSA

### Review: angle sum

## Make: exactly one

```step
stage: make
insight: "Finding SSA parts that give exactly one triangle shows when the ambiguous case disappears."
try: { playground: board, starter: "tri.yml#ssa", height: 600 }
hint: ["Too short a BC gives none; a little longer gives two.", "Try BC as long as AB, or longer."]
check: { type: board, text: "With AB = 6 and angle A = 40°, find a length of BC that gives exactly one triangle.", when: "n = 1", explain: "When BC is at least as long as AB (6 cm or more), only one triangle fits." }
```

Then explain why SSA still is not a congruence test.
