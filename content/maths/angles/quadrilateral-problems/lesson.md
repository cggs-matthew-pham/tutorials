---
order: 19
unit: congruence
node: AC9M8SP02 n2
uses: [AC9M8SP02 n1, AC9M7M04 n2, AC9M7M05 n3]
assumes: [AC9M8M06 n2]
title: Problems with quadrilaterals
summary: "Use the properties of parallelograms, rhombuses, rectangles, kites and trapeziums to find unknown angles and lengths, with a reason for each step, and check with the angle sum of 360°."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A gate is braced with a diagonal so it stays a rectangle. A carpenter checks it by measuring both diagonals. Why does that work, and what does it tell her?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8325
  url: http://127.0.0.1:8325/index.html
  readySelector: "#gclass"
  layout: full
explainPicture: { ref: quad.yml#explain-pic, caption: "A parallelogram: opposite angles are equal (45° and 45°, 135° and 135°), and neighbouring angles add to 180°." }
explainClip:
  query: { code: "@quad.yml#explain", fresh: 1, id: explain }
  caption: "Angles in a parallelogram"
  say: "Opposite angles are equal."
  clip:
    - caption: { text: "A parallelogram: A = C and B = D.", say: "In a parallelogram, opposite angles are equal." }
    - expect: { selector: "#gsum", contains: "A = 45°" }
    - wait: 800
    - caption: { text: "Neighbours add to 180°: 45° + 135°. They are co-interior.", say: "Neighbouring angles add to one hundred and eighty. They are co-interior angles." }
    - wait: 1800
    - caption: { text: "Move A: not a parallelogram, and opposite angles are no longer equal.", say: "Move one corner, and opposite angles are no longer equal." }
    - click: Move A left
    - wait: 1600
    - click: Move A right
    - wait: 600
---
Problems with quadrilaterals use their **properties**, with a reason for each step. Start with what you already know: every quadrilateral's angles add to 360°, and co-interior angles between parallel lines add to 180°.

## Predict: one angle

```step
stage: predict
insight: "Committing to all four angles of a parallelogram from one shows whether they use opposite-equal and co-interior."
check:
  type: predict
  q: "A parallelogram has one angle of 70°. What are the other three?"
  options: ["110°, 70°, 110°", "70°, 70°, 70°", "110°, 110°, 70°", "You cannot tell"]
  actual: "110°, 70° and 110°. The opposite angle is equal (70°), and each neighbour is 180° − 70° = 110°."
```

Here are the properties to use:

| Shape | Angles | Diagonals |
|---|---|---|
| any quadrilateral | add to 360° | |
| parallelogram | opposite angles equal; neighbours add to 180° | bisect each other |
| rhombus | as a parallelogram | bisect each other at 90° |
| rectangle | four right angles | equal, and bisect each other |
| kite | the angles between the unequal sides are equal | cross at 90° |
| isosceles trapezium | base angles equal (in pairs) | equal |

Neighbouring angles of a parallelogram add to 180° because they are **co-interior** angles between parallel sides.

## Run: make a parallelogram

```step
stage: run
insight: "Making parallelograms on the board shows opposite angles equal and neighbours adding to 180° every time."
try: { playground: board, starter: "quad.yml#run", height: 640 }
check: { type: board, text: "Drag the corners to make a parallelogram that is not a rectangle. Check the angles: were you right?", when: "z = 4", explain: "Opposite angles are equal and each pair of neighbours adds to 180°, whatever the parallelogram." }
```

## Investigate: find the angles

```step
stage: investigate
insight: "Use co-interior angles for neighbours and equality for opposites, with reasons; opposite angles adding to 180° is the slip (Jo); a kite's equal angles come from congruent triangles."
tasks:
  - check:
      type: number
      q: "In parallelogram PQRS, angle P = 65°. What is angle Q, in degrees?"
      answer: 115
      tolerance: 0
      feedback:
        - ["65", "Q is next to P, not opposite. Neighbouring angles add to 180°."]
      explain: "P and Q are co-interior angles between the parallel sides PS and QR: 180 − 65 = 115°."
  - check:
      type: bug
      code: "working.txt#jo"
      text: "Jo works out the angles of a parallelogram. Click the line where she goes wrong."
      answer: 2
      fault: logic
      misconception: opp-angles-supplementary
      explain: "Line 2: opposite angles are equal, so C = 65°. Neighbouring angles add to 180°. Then D = 115°."
  - check:
      type: question
      q: "Kite ABCD has AB = AD and CB = CD, and angle B = 100°. Which other angle must be 100°, and why?"
      options: ["Angle D: triangles ABC and ADC are congruent (SSS)", "Angle A: it is opposite", "Angle C: it is next to B", "None of them"]
      answer: 0
      feedback: [null, "A is next to B, not opposite it; D is opposite B.", "C is between CB and CD, next to B.", "The congruent triangles give one equal pair."]
      explain: "AB = AD, CB = CD and AC is shared, so the triangles are congruent and angle B = angle D."
```

### Neighbours

Here is the routine.

```worked
\angle K = 72^\circ \text{ in parallelogram } KLMN :: What is given?
\angle K + \angle L = 180^\circ :: Co-interior angles: KN is parallel to LM.
\angle L = 180^\circ - 72^\circ = 108^\circ :: Work it out.
\angle M = 72^\circ,\ \angle N = 108^\circ :: Opposite angles are equal. Check: they add to 360°.
```

### Find the mistake

Read Jo's working. Which angle is opposite A?

### A kite

## Modify: other shapes

```step
stage: modify
insight: "The same reasoning on a rhombus, a rectangle's diagonals, a kite and an isosceles trapezium."
tasks:
  - check:
      type: number
      q: "A rhombus has an angle of 70°. What is the size of its larger angles, in degrees?"
      answer: 110
      tolerance: 0
      explain: "A rhombus is a parallelogram: neighbouring angles add to 180°, so 180 − 70 = 110°."
  - check:
      type: number
      q: "Rectangle ABCD has diagonals that cross at M. AC = 10 cm. How long is BM, in cm?"
      answer: 5
      tolerance: 0
      feedback:
        - ["10", "BM is half of BD."]
      explain: "The diagonals are equal (BD = 10) and cut each other in half, so BM = 5 cm."
  - check:
      type: number
      q: "Kite ABCD has AB = AD and CB = CD. Angle A = 70° and angle C = 90°. What is angle B, in degrees?"
      answer: 100
      tolerance: 0
      feedback:
        - ["200", "200° is B and D together."]
      explain: "Angles B and D are equal (congruent triangles). 360 − 70 − 90 = 200, so each is 100°."
  - check:
      type: number
      q: "An isosceles trapezium has two base angles of 70°. What is each of the other two angles, in degrees?"
      answer: 110
      tolerance: 0
      explain: "Each top angle is co-interior with a base angle: 180 − 70 = 110°. Check: 70 + 70 + 110 + 110 = 360."
```

### Rhombus

### Rectangle diagonals

### Kite

### Isosceles trapezium

## Practise: quadrilateral problems

```step
stage: practise
insight: "Angles with algebra, diagonals and Pythagoras, mixed; opposite angles as supplementary is the planted slip again; similar shapes review."
tasks:
  - check:
      type: number
      q: "Two neighbouring angles of a parallelogram are x° and 2x°. What is x?"
      answer: 60
      tolerance: 0
      feedback:
        - ["120", "That is 2x. Solve x + 2x = 180."]
      explain: "x + 2x = 180, so 3x = 180 and x = 60. The angles are 60° and 120°."
  - check:
      type: number
      q: "A rhombus has diagonals of 6 cm and 8 cm. How long is each side, in cm?"
      answer: 5
      tolerance: 0
      explain: "The diagonals cut each other in half at 90°, making right-angled triangles with legs 3 and 4: the side is 5 cm."
  - check:
      type: number
      q: "In parallelogram ABCD, angle A = 52°. What is angle C, in degrees?"
      answer: 52
      tolerance: 0
      feedback:
        - ["128", "C is opposite A, not next to it. Opposite angles are equal."]
      explain: "Opposite angles of a parallelogram are equal: 52°."
  - check:
      type: number
      q: "Review: a 2 cm by 3 cm rectangle is enlarged with scale factor 4. What is the longer side now, in cm?"
      answer: 12
      tolerance: 0
      explain: "3 × 4 = 12 cm."
```

### Angles with x

### Rhombus sides

### Opposite angles

### Review: similar shapes

## Make: a right-angled kite

```step
stage: make
insight: "Building a kite with a given angle, then solving for the others, joins the board, the properties and the angle sum."
try: { playground: board, starter: "quad.yml#make", height: 640 }
hint: ["A kite has AB = AD and CB = CD.", "Put B and D level, the same distance either side of A, so that angle A is 90°.", "Try A at 5,1, B at 7,3 and D at 3,3, then move C up the middle."]
check: { type: board, text: "Make a kite (not a square) with a right angle at A, where AB = AD.", when: "z = 6 and a = 90", explain: "Such as corners 5,1; 7,3; 5,7; 3,3. Angles B and D are equal (congruent triangles), and all four add to 360°." }
```

Then read angle C on the board and work out angles B and D, with a reason for each. The board rounds each angle to a whole degree, so its B and D can differ by 1°: your answer can be a half.
