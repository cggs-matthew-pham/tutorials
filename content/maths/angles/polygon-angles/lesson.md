---
order: 2
unit: angle-sums
node: AC9M7M05 n2
title: Angles in a polygon
summary: Split a polygon into triangles from one corner. A shape with n sides makes n − 2 triangles, so its angles add to (n − 2) × 180°.
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Stop signs are octagons, honeycomb cells are hexagons, a soccer ball is pentagons and hexagons. The triangle rule tells you the angles of all of them."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8163
  url: http://127.0.0.1:8163/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: geo.yml#explain-pic, caption: "A pentagon splits into 3 triangles from $A$: $3 \\times 180° = 540°$." }
explainClip:
  query: { code: "@geo.yml#explain", fresh: 1, id: explain }
  caption: "Split it into triangles"
  say: "To find a polygon's angle sum, split it into triangles."
  clip:
    - caption: { text: "A square's four angles add to 360°.", say: "A square's four angles add to three hundred and sixty." }
    - wait: 400
    - caption: { text: "Split it from A: 2 triangles, 2 × 180° = 360°.", say: "Split it from A: two triangles, two times one eighty." }
    - click: Split into triangles
    - wait: 600
    - caption: { text: "Five sides: 3 triangles, 540°.", say: "Five sides make three triangles: five hundred and forty." }
    - click: More sides
    - wait: 600
    - caption: { text: "Six sides: 4 triangles, 720°. Always two fewer than the sides.", say: "Six sides, four triangles. Always two fewer than the sides." }
    - click: More sides
    - expect: { selector: "#gsum", contains: "4 × 180° = 720°" }
    - wait: 1500
---
In the last lesson you found that the angles of any triangle add to $180°$. A **polygon** is any closed shape with straight sides: a quadrilateral (4 sides), pentagon (5), hexagon (6), octagon (8) and so on.

In this lesson you use the triangle rule to find the total of a polygon's angles, without measuring them.

## Predict: four corners

```step
stage: predict
insight: "Committing to a total for a quadrilateral before splitting it makes the board a test of their idea: 4 corners do not mean 4 × something, or 180° again."
check:
  type: predict
  q: "What do the four angles of a quadrilateral add to?"
  options:
    - "$360°$"
    - "$180°$, like a triangle"
    - "$540°$"
    - "It depends on the shape"
  actual: "360°. Any quadrilateral splits into 2 triangles from one corner, and 2 × 180° = 360°."
```

Think about a square or a rectangle first. Does a lopsided quadrilateral have the same total?

## Run: split a quadrilateral

```step
stage: run
insight: "Splitting a quadrilateral from one corner shows two triangles whose angles exactly fill the four corners, so the total is 2 × 180° whatever the shape."
try: { playground: board, starter: "geo.yml#run", height: 600 }
check: { type: board, text: "Press **Split into triangles**, then drag the corners into a new quadrilateral. Was your prediction right?", when: "n = 4 and k = 2" }
```

The board measures each angle and adds them up. **Split into triangles** draws lines from corner $A$ to the corners that are not next to it. Drag the corners and watch both totals.

## Investigate: a triangle for each side, less two

```step
stage: investigate
try: { playground: board, starter: "geo.yml#pentagon", height: 600 }
insight: "Lines from one corner split a shape with n sides into n − 2 triangles, and those triangles' angles exactly fill the polygon's corners, so the sum is (n − 2) × 180°. Ben's split adds the angles around his middle point too."
tasks:
  - check:
      type: trace
      text: "Split shapes on the board, or in your head, and fill in the table."
      table: |
        | sides | 3 | 4 | 5 | 6 | 8 |
        | triangles from one corner | 1 | [2] | [3] | [4] | [6] |
        | angle sum (°) | 180 | [360] | [540] | [720] | [1080] |
      explain: "Each shape makes 2 fewer triangles than it has sides, and each triangle adds 180°."
  - check:
      type: bug
      code: "working.txt#ben"
      text: "Ben finds the angle sum of a pentagon. Click the line where his reasoning goes wrong."
      answer: 4
      fault: logic
      misconception: polygon-centre-angles
      explain: "Line 4: his 5 triangles also have angles around the middle point, a full turn of 360°, which are not angles of the pentagon. 900° − 360° = 540°."
  - check:
      type: answer
      q: "What do the angles of a hexagon (6 sides) add to?"
      answer: "720"
      feedback:
        - ["1080", "That is 6 × 180°. From one corner, a hexagon splits into fewer triangles than it has sides."]
        - ["900", "That is 5 × 180°. How many triangles from one corner?"]
      explain: "6 − 2 = 4 triangles, and 4 × 180° = 720°."
```

### Splitting from one corner

Here is the method for a pentagon.

```worked
\text{A pentagon has 5 corners} :: Choose one corner, $A$.
\text{Lines from A to C and to D} :: Join $A$ to every corner that is not next to it.
3 \text{ triangles} :: The two lines split the pentagon into 3 triangles.
\text{Their angles fill the pentagon's corners} :: Every triangle's corners are at the pentagon's corners, and together they fill them exactly.
3 \times 180° = 540° :: So the pentagon's angles add to 540°.
(n - 2) \times 180° :: A shape with $n$ sides splits into $n - 2$ triangles this way.
```

### Find the mistake

Read Ben's working one line at a time. Which line counts angles that are not the pentagon's?

### A hexagon

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a lopsided pentagon (same total), a corner that points in (still 360°), more sides on the board, then the rule without the board."
try: { playground: board, starter: "geo.yml#pentagon", height: 600 }
tasks:
  - starter: "geo.yml#pentagon"
    hint: "Move any corner. Does the number of triangles change?"
    check: { type: board, text: "Drag the pentagon into a lopsided shape (keep every corner pointing out). Split it: what is the total?", when: "n = 5 and k = 3", explain: "Still 3 triangles, so still 540°." }
  - starter: "geo.yml#dart"
    hint: ["Drag one corner towards the middle of the shape, past the line joining its neighbours.", "Look at the angle at that corner: it is more than 180°."]
    check: { type: board, text: "Edge case: drag one corner in so it points into the shape. What is the total now?", when: "n = 4 and v = 0", explain: "Still 360°: the corner that points in has an angle of more than 180°, and the other three shrink to make up for it." }
  - starter: "geo.yml#choose"
    hint: "Use More sides. How many triangles does each new side add?"
    check: { type: board, text: "Make a polygon whose angles add to $1080°$.", when: "s = 1080", explain: "8 sides: 6 triangles, 6 × 180° = 1080°." }
  - check:
      type: answer
      q: "Without the board: what do the angles of a 12-sided polygon add to?"
      answer: "1800"
      feedback:
        - ["2160", "That is 12 × 180°. From one corner, how many triangles?"]
        - ["1980", "That is 11 × 180°. A shape with 12 sides makes 12 − 2 triangles."]
      explain: "(12 − 2) × 180° = 10 × 180° = 1800°."
```

### A lopsided pentagon

Each task changes one thing. First: the same pentagon in a new shape.

### A corner that points in

### More sides

### Twelve sides

## Practise: the rule

```step
stage: practise
insight: "The rule forwards, for an equal-angled shape, and backwards from a total, mixed; the review keeps the triangle rule fresh."
tasks:
  - check:
      type: answer
      q: "What do the angles of a 10-sided polygon add to?"
      answer: "1440"
      feedback:
        - ["1800", "That is 10 × 180°. How many triangles from one corner?"]
      explain: "(10 − 2) × 180° = 1440°."
  - check:
      type: answer
      q: "A regular hexagon has 6 equal angles. How big is each one?"
      answer: "120"
      feedback:
        - ["720", "720° is the total. Share it between the 6 equal angles."]
        - ["60", "That is 360° ÷ 6. Find the hexagon's angle sum first."]
      explain: "The angles add to 720°, so each is 720° ÷ 6 = 120°."
  - check:
      type: answer
      q: "A polygon's angles add to $900°$. How many sides does it have?"
      answer: "7"
      feedback:
        - ["5", "5 is the number of triangles (900 ÷ 180). How many sides make 5 triangles?"]
      explain: "900° ÷ 180° = 5 triangles, and a shape with 7 sides makes 7 − 2 = 5 triangles."
  - check:
      type: question
      q: "Review: a triangle has angles $35°$ and $75°$, and a third angle. Do the three add to more than, less than, or exactly $180°$?"
      options: ["Exactly $180°$", "Less than $180°$: $35 + 75 = 110$", "It depends on the third angle"]
      answer: 0
      feedback: [null, "That is only two of the angles. With the third, any triangle's angles add to 180°.", "Whatever the third angle is, the three add to 180°."]
      explain: "Every triangle's angles add to 180°, so the third angle is 180° − 110° = 70°."
```

### Ten sides

### Equal angles

### Backwards

### Review

## Make: from a total to a shape

```step
stage: make
insight: "Building a shape from a given total reverses the lesson: from the angle sum back to the number of triangles and sides."
try: { playground: board, starter: "geo.yml#choose", height: 600 }
hint: ["How many lots of 180° make 1260°?", "That is the number of triangles. A shape has 2 more sides than triangles."]
check: { type: board, text: "Make a polygon whose angles add to $1260°$.", when: "s = 1260", explain: "1260° ÷ 180° = 7 triangles, so 9 sides." }
```

Work it out first, then use **More sides** to check.

Stretch: why can no polygon have angles that add to $1000°$?
