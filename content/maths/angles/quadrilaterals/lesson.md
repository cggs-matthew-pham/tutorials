---
order: 8
unit: shapes
node: AC9M7SP02 n2
uses: [AC9M7M04 n2]   # co-interior angles at parallel lines
title: The quadrilateral family
summary: "Quadrilaterals are named by their properties: parallel sides, equal sides and right angles. A shape that has all of another's properties belongs to it too: every square is a rectangle and a rhombus, and every rectangle is a parallelogram."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Is a square a rectangle? People argue about it, but mathematicians agree: yes. A name is a list of properties, and a square has every property on the rectangle's list."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8282
  url: http://127.0.0.1:8282/index.html
  readySelector: "#gclass"
  layout: full
explainPicture: { ref: shape.yml#explain-pic, caption: "A square: four equal sides (ticks), two pairs of parallel sides (arrows) and four right angles. So it is also a rectangle, a rhombus, a parallelogram, a trapezium and a kite." }
explainClip:
  query: { code: "@shape.yml#explain", fresh: 1, id: explain }
  caption: "Named by properties"
  say: "A quadrilateral is named by its properties."
  clip:
    - caption: { text: "One pair of parallel sides (arrows): a trapezium.", say: "One pair of parallel sides: a trapezium." }
    - wait: 1400
    - caption: { text: "Move A: now two pairs, and four right angles. A rectangle.", say: "Move one corner. Two pairs of parallel sides and four right angles: a rectangle." }
    - click: Move A left
    - expect: { selector: "#gclass", contains: "Rectangle" }
    - wait: 1000
    - caption: { text: "It has every parallelogram property too.", say: "It has every property of a parallelogram too." }
    - wait: 1200
---
A **quadrilateral** has four sides. Its name comes from its **properties**:

| Name | Properties |
|---|---|
| **trapezium** | at least one pair of parallel sides |
| **parallelogram** | two pairs of parallel sides (opposite sides equal) |
| **rhombus** | four equal sides (so two pairs of parallel sides) |
| **rectangle** | four right angles (so two pairs of parallel sides) |
| **square** | four equal sides and four right angles |
| **kite** | two pairs of equal sides next to each other |

The board marks **parallel** sides with matching arrows, **equal** sides with matching ticks, and right angles with a small square. When a shape has every property of another, it belongs to that family too: a square is also a rectangle, a rhombus and a parallelogram.

## Predict: square or rectangle?

```step
stage: predict
insight: "Committing to whether a square is a rectangle surfaces the everyday meaning of 'rectangle' (longer than it is wide) against the property definition."
check:
  type: predict
  q: "Is a square a rectangle?"
  options: ["Yes", "No: a rectangle has two long sides and two short sides", "Only a big square"]
  actual: "Yes. A rectangle is a quadrilateral with four right angles, and a square has four right angles. It is a special rectangle, with its sides equal too."
```

What does a shape need to be a rectangle?

## Run: a rectangle that is not a square

```step
stage: run
insight: "Dragging an irregular quadrilateral into a rectangle shows the properties appearing one by one (parallel arrows, right angles) and the board's 'also' names."
try: { playground: board, starter: "shape.yml#run", height: 600 }
check: { type: board, text: "Drag the corners to make a rectangle that is not a square. What else does the board say it is? Was your prediction right?", when: "z = 2", explain: "A rectangle is also a parallelogram. Make the sides equal as well and it becomes a square, which is also a rectangle." }
```

Watch for the arrows (parallel sides), ticks (equal sides) and right-angle marks.

## Investigate: a family of properties

```step
stage: investigate
insight: "Each name is a list of properties, and having all of one name's properties puts a shape in that family; Sam lets an extra property exclude a square from the rectangles."
tasks:
  - check:
      type: match
      q: "Match each quadrilateral to its defining property."
      pairs:
        - ["trapezium", "at least one pair of parallel sides"]
        - ["parallelogram", "two pairs of parallel sides"]
        - ["rhombus", "four equal sides"]
        - ["rectangle", "four right angles"]
        - ["kite", "two pairs of equal sides next to each other"]
      explain: "A square has four equal sides and four right angles, so it fits the rhombus, rectangle and parallelogram rows too."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam decides whether a square is a rectangle. Click the line where his reasoning goes wrong."
      answer: 4
      fault: logic
      misconception: square-not-rectangle
      explain: "Line 4: having an extra property (equal sides) does not take away the rectangle's properties. A square has four right angles, so it is a rectangle: a special one."
  - check:
      type: question
      q: "Which is always true?"
      options: ["Every rhombus is a parallelogram", "Every parallelogram is a rhombus", "Every rectangle is a square", "Every kite is a rhombus"]
      answer: 0
      feedback: [null, "A parallelogram's sides need not all be equal.", "A rectangle's sides need not all be equal.", "A kite's opposite sides need not be equal."]
      explain: "A rhombus has two pairs of parallel sides, so it has the parallelogram's property: every rhombus is a parallelogram."
```

### Properties first

Here is how to name a quadrilateral: check the properties, from the most special.

```worked
\text{4 equal sides, 4 right angles} \Rightarrow \text{square} :: Check the most special names first.
\text{4 right angles} \Rightarrow \text{rectangle} :: Right angles but sides not all equal.
\text{4 equal sides} \Rightarrow \text{rhombus} :: Equal sides but no right angles.
\text{2 pairs parallel} \Rightarrow \text{parallelogram} :: Then parallelogram, trapezium (at least one pair), kite.
```

Now match each name to its property.

### Find the mistake

Read Sam's reasoning. Does an extra property take a name away?

### Always true?

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time on the board: a rhombus that is not a square, a parallelogram that is neither, a kite, then the edge case of four equal sides with one right angle."
try: { playground: board, starter: "shape.yml#free", height: 600 }
tasks:
  - starter: "shape.yml#free"
    hint: ["All four sides the same length, but no right angles.", "Try corners (1, 1), (6, 1), (9, 5) and (4, 5): each side is 5."]
    check: { type: board, text: "Make a rhombus that is not a square.", when: "z = 3", explain: "Four equal sides, no right angles. It is also a parallelogram and a kite." }
  - starter: "shape.yml#free"
    hint: "Two pairs of parallel sides, with no right angles and the sides not all equal."
    check: { type: board, text: "Make a parallelogram that is not a rectangle and not a rhombus.", when: "z = 4", explain: "For example (1, 1), (7, 1), (9, 5), (3, 5)." }
  - starter: "shape.yml#free"
    hint: ["Two short equal sides next to each other at the top, two long equal sides next to each other at the bottom.", "Try (5, 1), (8, 5), (5, 7), (2, 5)."]
    check: { type: board, text: "Make a kite that is not a rhombus.", when: "z = 6", explain: "Two pairs of equal sides next to each other, but not all four equal." }
  - check:
      type: question
      q: "Edge case: a quadrilateral has four equal sides and one right angle. What is it?"
      options: ["A square", "A rhombus that is not a square", "A kite", "It cannot exist"]
      answer: 0
      feedback: [null, "Four equal sides make it a rhombus, and a rhombus's angles next to a right angle must be 90° too.", "It is a kite, but there is a more special name.", "It exists: think of a square."]
      explain: "A rhombus is a parallelogram, so angles next to each other add to 180° (co-interior). One right angle makes them all right angles: a square."
```

### A rhombus

Each task changes one thing.

### A plain parallelogram

### A kite

### One right angle

## Practise: naming quadrilaterals

```step
stage: practise
insight: "Naming from properties, a family question and an angle from parallel sides, mixed; a square excluded from the rectangles is the planted slip; the review keeps isosceles triangles fresh."
tasks:
  - check:
      type: question
      q: "A quadrilateral has two pairs of parallel sides, no right angles, and sides that are not all equal. What is its most special name?"
      options: ["Parallelogram", "Rhombus", "Rectangle", "Trapezium"]
      answer: 0
      feedback: [null, "Its sides are not all equal.", "It has no right angles.", "It is a trapezium too, but parallelogram is more special: two pairs of parallel sides."]
      explain: "Two pairs of parallel sides, nothing more: a parallelogram."
  - check:
      type: question
      q: "Which names fit a square?"
      options: ["Square, rectangle, rhombus, parallelogram, trapezium and kite", "Only square", "Square and rectangle only", "Square and rhombus only"]
      answer: 0
      feedback: [null, "A square has every property on the rectangle's and the rhombus's lists.", "It also has the rectangle's and the rhombus's properties.", "It has the rhombus's four equal sides too."]
      explain: "A square has all these properties, so it belongs to all these families."
  - check:
      type: answer
      q: "One angle of a parallelogram is 70°. What is the angle next to it, in degrees?"
      answer: "110"
      feedback:
        - ["70", "That is the opposite angle. Angles next to each other are co-interior."]
        - ["290", "Angles next to each other add to 180°, not 360°."]
      explain: "Neighbouring angles of a parallelogram are co-interior: 180 − 70 = 110°."
  - check:
      type: answer
      q: "Review: an isosceles triangle has two angles of 35°. What is the third, in degrees?"
      answer: "110"
      feedback:
        - ["145", "Both 35° angles count: 180 − 35 − 35."]
      explain: "180 − 35 − 35 = 110°."
```

### Most special name

### All the names

### Angles in a parallelogram

### Review: triangles

## Make: a right-angled trapezium

```step
stage: make
insight: "Building a trapezium with a right angle that is not a parallelogram combines a parallel pair with a right angle while avoiding a second parallel pair."
try: { playground: board, starter: "shape.yml#make", height: 600 }
hint: ["Make the top and bottom parallel, then make one side straight up.", "Keep the other side slanted so there is only one parallel pair."]
check: { type: board, text: "Make a trapezium that is not a parallelogram, with at least one right angle.", when: "z = 5 and g >= 1", explain: "For example (1, 1), (9, 1), (6, 5), (1, 5): one pair of parallel sides and two right angles." }
```

Then: how many right angles can such a trapezium have, and why not three?
