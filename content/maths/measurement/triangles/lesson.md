---
order: 2
unit: area
node: AC9M7M01 n1
title: Area of triangles
summary: "Two copies of any triangle, one turned round, make a parallelogram with the same base and height. So a triangle's area is half of base × height: A = ½bh."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Sails, roof gables and the slices of a pizza cut into wedges are triangles. How much fabric does a triangular sail need?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8274
  url: http://127.0.0.1:8274/index.html
  readySelector: "#sl-s"
  layout: full
explainPicture: { ref: area.yml#explain-pic, caption: "A turned copy (dashed) makes a parallelogram, $6 \\times 4 = 24$ cm². The triangle is half: $\\tfrac{1}{2} \\times 6 \\times 4 = 12$ cm²." }
explainClip:
  query: { code: "@area.yml#explain", fresh: 1, id: explain }
  caption: "Half a parallelogram"
  say: "A triangle is half of a parallelogram."
  clip:
    - caption: { text: "Add a turned copy of the triangle.", say: "Add a copy of the triangle, turned round." }
    - click: Add a turned copy
    - expect: { selector: "#gsum", contains: "= 12" }
    - wait: 600
    - caption: { text: "Together: a parallelogram, 6 × 4 = 24. The triangle is half: 12.", say: "Together they make a parallelogram. The triangle is half of it." }
    - wait: 1400
    - click: Remove the copy
    - caption: { text: "Move the top: same base, same height, same area.", say: "Move the top along. The area stays the same." }
    - click: Move the top right
    - click: Move the top right
    - expect: { selector: "#gsum", contains: "= 12" }
    - wait: 1000
---
A triangle also has a **base** (any side) and a **perpendicular height**: the distance from the opposite corner (the apex) straight down to the base, at a right angle.

Two copies of a triangle, one turned round, fit together into a parallelogram with the same base and height. So the triangle is **half** of it:

$$A = \tfrac{1}{2} \times b \times h$$

## Predict: a 6 by 4 triangle

```step
stage: predict
insight: "Committing to an area for a triangle with base 6 and height 4 shows whether they halve, or multiply as for a parallelogram."
check:
  type: predict
  q: "A triangle has base 6 cm and perpendicular height 4 cm. What is its area?"
  options: ["12 cm²", "24 cm²", "10 cm²", "20 cm²"]
  actual: "12 cm². Two copies make a 6 by 4 parallelogram, 24 cm², so one triangle is half: 12 cm². 24 is the parallelogram."
```

How would two copies of the triangle fit together?

## Run: add a turned copy

```step
stage: run
insight: "Adding a turned copy shows two triangles make a parallelogram with the same base and height, so the triangle is half; moving the apex keeps the area."
try: { playground: board, starter: "area.yml#run", height: 540 }
check: { type: board, text: "Press **Add a turned copy**. What do the two triangles make? Then move the top along. Was your prediction right?", when: "c = 1", explain: "A parallelogram with base 6 and height 4, area 24 cm², so the triangle is half: 12 cm². Moving the top keeps the base and height, so the area stays 12." }
```

The dashed orange line is the height, from the top straight down to the base.

## Investigate: half of base times height

```step
stage: investigate
insight: "A = ½bh; Omar forgets the half, giving the parallelogram. The height can fall outside the triangle, onto the base extended."
tasks:
  - check:
      type: answer
      q: "A triangle has base 10 cm and perpendicular height 7 cm. What is its area, in cm²?"
      answer: "35"
      feedback:
        - ["70", "That is the parallelogram two copies make. The triangle is half."]
        - ["17", "That adds. Multiply, then halve."]
      explain: "½ × 10 × 7 = 35 cm²."
  - check:
      type: bug
      code: "working.txt#omar"
      text: "Omar finds the area of a triangle. Click the line where his working goes wrong."
      answer: 2
      fault: logic
      misconception: triangle-no-half
      explain: "Line 2: a triangle is half of base × height. ½ × 8 × 5 = 20 cm²."
  - picture: { ref: area.yml#obtuse-pic, caption: "A triangle with base 4 cm whose top leans past the end of the base." }
    check:
      type: question
      q: "Where is this triangle's perpendicular height?"
      options: ["Outside the triangle: straight down from the top to the base, extended", "Along the longest side", "It has no height, because the top is not above the base"]
      answer: 0
      feedback: [null, "The longest side slants. The height meets the base line at a right angle.", "Every triangle has a height: extend the base until the line from the top meets it."]
      explain: "Extend the base (dashed) and drop the height from the top at a right angle. The area is still ½ × 4 × 4 = 8 cm²."
```

### Halve it

Here is the reason, then the routine.

```worked
6 \times 4 = 24 :: Two copies of the triangle make a parallelogram with the same base and height.
A = \tfrac{1}{2} \times 6 \times 4 = 12 \text{ cm}^2 :: One triangle is half of it.
A = \tfrac{1}{2} \times 10 \times 7 = 35 \text{ cm}^2 :: Multiply the base by the height, then halve (or halve first: 5 × 7).
```

Now try one: base 10 cm, height 7 cm.

### Find the mistake

Read Omar's working. What shape has area base × height?

### A height outside

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a height outside the triangle on the board, building an area from a base, a new triangle, a missing height (backwards), then a right-angled triangle where the height is a side."
try: { playground: board, starter: "area.yml#outside", height: 540 }
tasks:
  - starter: "area.yml#outside"
    hint: "Move the top past either end of the base."
    check: { type: board, text: "Move the top so the height falls outside the triangle. Does the area change?", when: "o = 1", explain: "The base is extended (dashed) to meet the height. Still ½ × 4 × 4 = 8 cm²." }
  - starter: "area.yml#twelve"
    hint: ["½ × 4 × h = 12, so 4 × h = 24.", "Set b to 4 first."]
    check: { type: board, text: "Make a triangle with base 4 cm and area 12 cm².", when: "b = 4 and a = 12", explain: "½ × 4 × 6 = 12: the height is 6 cm." }
  - check:
      type: answer
      q: "Base 9 cm, perpendicular height 4 cm. Area, in cm²?"
      answer: "18"
      feedback:
        - ["36", "Halve it: a triangle is half the parallelogram."]
      explain: "½ × 9 × 4 = 18 cm²."
  - check:
      type: answer
      q: "A triangle has area 20 cm² and base 8 cm. What is its perpendicular height, in cm?"
      answer: "5"
      feedback:
        - ["2.5", "That uses base × height = 20. For a triangle, ½ × 8 × h = 20, so 8 × h = 40."]
        - ["80", "That multiplies. Undo the steps: double 20, then divide by 8."]
      explain: "½ × 8 × h = 20, so 4 × h = 20 and h = 5 cm."
  - check:
      type: question
      q: "Edge case: a right-angled triangle has sides 6 cm, 8 cm and 10 cm, with the right angle between the 6 cm and 8 cm sides. What is its area?"
      options: ["24 cm²", "48 cm²", "30 cm²", "40 cm²"]
      answer: 0
      feedback: [null, "Halve it.", "10 cm is the sloping side. Use the two sides at the right angle.", "10 cm is the sloping side. Use the two sides at the right angle."]
      explain: "The two sides at the right angle are a base and its height: ½ × 6 × 8 = 24 cm²."
```

### A height outside

Each task changes one thing.

### Area 12

### Another triangle

### Backwards: the height

### A right angle

## Practise: triangles

```step
stage: practise
insight: "Whole and decimal answers and half a rectangle, mixed; forgetting the half is the planted slip; the review keeps parallelograms fresh."
tasks:
  - check:
      type: answer
      q: "Base 12 m, perpendicular height 5 m. Area, in m²?"
      answer: "30"
      feedback:
        - ["60", "Halve it."]
      explain: "½ × 12 × 5 = 30 m²."
  - check:
      type: answer
      q: "Base 7 cm, perpendicular height 3 cm. Area, in cm²?"
      answer: "10.5"
      feedback:
        - ["21", "Halve it."]
        - ["10", "Half of 21 is 10.5."]
      explain: "½ × 7 × 3 = 10.5 cm²."
  - check:
      type: answer
      q: "A 10 cm by 6 cm rectangle is cut along a diagonal. What is the area of one triangle, in cm²?"
      answer: "30"
      feedback:
        - ["60", "That is the whole rectangle."]
      explain: "Half of 10 × 6 = 60: 30 cm²."
  - check:
      type: answer
      q: "Review: a parallelogram has base 7 cm and perpendicular height 6 cm. Area, in cm²?"
      answer: "42"
      feedback:
        - ["21", "A parallelogram is not halved: only a triangle is."]
      explain: "7 × 6 = 42 cm²."
```

### Halve it

### A decimal answer

### Half a rectangle

### Review: parallelograms

## Make: area 15

```step
stage: make
insight: "Building a triangle with a given area means choosing a base and height whose product is double it."
try: { playground: board, starter: "area.yml#make", height: 560 }
hint: ["½ × b × h = 15, so b × h = 30.", "Which pairs multiply to 30 and fit the sliders?"]
check: { type: board, text: "Make a triangle with area 15 cm².", when: "a = 15", explain: "b × h must be 30: base 6 and height 5, base 10 and height 3, or base 5 and height 6." }
```

Then find a second triangle with the same area and a different base.
