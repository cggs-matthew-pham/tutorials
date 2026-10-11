---
order: 7
unit: shapes
node: AC9M7SP02 n1
uses: [AC9M7M05 n1]   # the angle sum of a triangle
title: Classifying triangles
summary: "Name a triangle twice: by its sides (scalene, isosceles, equilateral) and by its biggest angle (acute, right, obtuse). Equal sides sit opposite equal angles, so some pairs are impossible: no right-angled equilateral triangle."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Roof trusses, bridges and set squares are all triangles, but not the same kind. Builders name them by their sides and their angles, because that tells you how they fit together."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8281
  url: http://127.0.0.1:8281/index.html
  readySelector: "#gclass"
  layout: full
explainPicture: { ref: shape.yml#explain-pic, caption: "Two sides are marked with a tick: they are equal, so the triangle is isosceles. Every angle is less than 90°, so it is also acute." }
explainClip:
  query: { code: "@shape.yml#explain", fresh: 1, id: explain }
  caption: "Two names for a triangle"
  say: "A triangle gets a name for its sides and one for its angles."
  clip:
    - caption: { text: "No two sides the same: scalene. Every angle under 90°: acute.", say: "No two sides are the same: scalene. Every angle is under ninety: acute." }
    - wait: 1400
    - caption: { text: "Move A until two sides match: isosceles (the ticks).", say: "Move one corner until two sides match. The ticks show it is isosceles." }
    - click: Move A right
    - expect: { selector: "#gclass", contains: "Isosceles" }
    - wait: 1600
---
Every triangle gets **two** names.

By its **sides**:

- **scalene**: no sides equal;
- **isosceles**: two sides equal (marked with the same tick);
- **equilateral**: all three sides equal.

By its **angles**:

- **acute**: every angle is less than 90°;
- **right-angled**: one angle is 90° (marked ∟);
- **obtuse**: one angle is more than 90°.

Equal sides sit opposite equal angles: an isosceles triangle has two equal angles, and an equilateral triangle has three, each 60°.

## Predict: right and isosceles?

```step
stage: predict
insight: "Committing to whether a triangle can be right-angled and isosceles at once shows whether they see the two names as independent."
check:
  type: predict
  q: "Can a triangle be right-angled **and** isosceles?"
  options: ["Yes", "No: a right-angled triangle can't have equal sides", "Only if it is equilateral"]
  actual: "Yes: angles 90°, 45° and 45°, with the two sides at the right angle equal (half a square, cut along its diagonal)."
```

Think of a square cut in half along a diagonal.

## Run: make one

```step
stage: run
insight: "Dragging corners until the board names the triangle 'isosceles, right-angled' shows the two names are separate choices that can combine."
try: { playground: board, starter: "shape.yml#run", height: 600 }
check: { type: board, text: "Drag the corners to make a triangle that is isosceles and right-angled. Was your prediction right?", when: "q = 2 and r = 2", explain: "For example corners (2, 1), (7, 1) and (2, 6): two sides of 5 at a right angle, and two 45° angles." }
```

Equal sides get matching ticks; a right angle gets a small square.

## Investigate: two names

```step
stage: investigate
insight: "The sides name and the angles name are separate; Zara names the triangle by an acute angle it has, but acute means every angle is under 90°. Some pairs are impossible."
tasks:
  - check:
      type: question
      q: "A triangle has sides 5 cm, 5 cm and 8 cm. Name it by its sides."
      options: ["Isosceles", "Scalene", "Equilateral", "Right-angled"]
      answer: 0
      feedback: [null, "Two of the sides are the same length.", "Only two sides are equal, not three.", "That names an angle, not the sides."]
      explain: "Two equal sides: isosceles."
  - check:
      type: bug
      code: "working.txt#zara"
      text: "Zara names a triangle by its angles. Click the line where her reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: acute-one-angle
      explain: "Line 3: every triangle has at least two acute angles. The biggest angle decides: 110° is more than 90°, so it is obtuse."
  - check:
      type: question
      q: "Which of these triangles is impossible?"
      options: ["A right-angled equilateral triangle", "An obtuse isosceles triangle", "A right-angled scalene triangle", "An acute scalene triangle"]
      answer: 0
      feedback: [null, "Angles 120°, 30°, 30° work.", "Angles 90°, 60°, 30° work.", "Angles 50°, 60°, 70° work."]
      explain: "An equilateral triangle has three equal angles, 60° each: none can be 90°."
```

### Sides, then angles

Here is the routine for naming a triangle.

```worked
90^\circ, 45^\circ, 45^\circ :: A triangle with these angles: two are equal, so the sides opposite them are equal.
\text{isosceles} :: Sides name: two equal sides.
\text{right-angled} :: Angles name: the biggest angle is 90°. Give both: isosceles, right-angled.
60^\circ, 60^\circ, 60^\circ :: Equilateral means equal angles too, so an equilateral triangle is always acute.
```

Now try one: sides 5, 5 and 8.

### Find the mistake

Read Zara's working. Which angle decides the name?

### Impossible pairs

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time on the board: from isosceles to scalene, then an obtuse scalene triangle, then nearly equilateral on half squares, then the edge case of two right angles."
try: { playground: board, starter: "shape.yml#scalene", height: 600 }
tasks:
  - starter: "shape.yml#scalene"
    hint: "Move one corner so that no two sides match: the ticks disappear."
    check: { type: board, text: "This triangle is isosceles. Move one corner to make it scalene and still acute.", when: "q = 1 and r = 1", explain: "No ticks and every angle under 90°: scalene, acute." }
  - starter: "shape.yml#scalene"
    hint: "Pull the top far to one side, past the end of the bottom side."
    check: { type: board, text: "Make an obtuse scalene triangle.", when: "q = 1 and r = 3", explain: "One angle over 90° and no equal sides." }
  - starter: "shape.yml#equilateral"
    hint: ["Corners land on half squares here.", "Try a bottom side of 4, with the top 3.5 up, half way along."]
    check: { type: board, text: "Make a triangle as close to equilateral as the grid allows.", when: "q = 3", explain: "For example (2, 1), (6, 1), (4, 4.5): sides 4, 4.03 and 4.03. A square grid can only get close." }
  - check:
      type: question
      q: "Edge case: can a triangle have two right angles?"
      options: ["No: two right angles already make 180°, leaving nothing for the third", "Yes, if it is isosceles", "Yes, if it is very long"]
      answer: 0
      feedback: [null, "The angles must still add to 180°.", "90° + 90° = 180° leaves 0° for the third corner: the sides never meet."]
      explain: "90° + 90° = 180°, so the third angle would be 0°: the two sides would be parallel and never meet."
```

### Make it scalene

Each task changes one thing.

### Obtuse and scalene

### Nearly equilateral

### Two right angles?

## Practise: naming triangles

```step
stage: practise
insight: "Naming from sides, from angles and from both, mixed; one acute angle is the planted slip; the review keeps the angle sum fresh."
tasks:
  - check:
      type: question
      q: "A triangle has angles 50°, 50° and 80°. Name it by its sides and its angles."
      options: ["Isosceles and acute", "Isosceles and obtuse", "Scalene and acute", "Equilateral and acute"]
      answer: 0
      feedback: [null, "80° is less than 90°.", "Two equal angles mean two equal sides.", "The angles are not all 60°."]
      explain: "Two equal angles sit opposite two equal sides: isosceles. The biggest angle, 80°, is under 90°: acute."
  - check:
      type: question
      q: "A triangle has angles 25°, 65° and 90°. Name it."
      options: ["Scalene and right-angled", "Isosceles and right-angled", "Scalene and acute", "Scalene and obtuse"]
      answer: 0
      feedback: [null, "No two angles are equal, so no two sides are.", "One angle is 90°.", "90° is not more than 90°."]
      explain: "No equal angles, so no equal sides: scalene. One 90° angle: right-angled."
  - check:
      type: answer
      q: "An isosceles triangle has one angle of 40° between its two equal sides. What is each of the other two angles, in degrees?"
      answer: "70"
      feedback:
        - ["140", "That is the two together. They are equal: halve it."]
        - ["40", "The 40° is between the equal sides. The other two share 180° − 40°."]
      explain: "180 − 40 = 140, shared equally: 70° each."
  - check:
      type: answer
      q: "Review: a triangle has angles 35° and 85°. What is the third, in degrees?"
      answer: "60"
      feedback:
        - ["240", "The angles add to 180°, not 360°."]
      explain: "180 − 35 − 85 = 60°."
```

### Equal angles

### A right angle

### Base angles

### Review: angle sum

## Make: obtuse and isosceles

```step
stage: make
insight: "Building an obtuse isosceles triangle combines both names on purpose: the equal sides meet at the obtuse angle."
try: { playground: board, starter: "shape.yml#make", height: 600 }
hint: ["The obtuse angle has to be between the two equal sides.", "Try a long flat bottom with the top just above its middle."]
check: { type: board, text: "Make a triangle that is isosceles and obtuse.", when: "q = 2 and r = 3", explain: "For example (1, 2), (11, 2), (6, 4): two equal sides meeting at an angle over 90°." }
```

Then explain why the obtuse angle has to be the one between the equal sides.
