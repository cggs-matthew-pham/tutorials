---
order: 9
unit: shapes
node: AC9M7SP02 n3
uses: [AC9M7M05 n2]   # the angle sum of a polygon
title: Polygons
summary: "A polygon is named by its number of sides (pentagon 5, hexagon 6, octagon 8, decagon 10). It is regular when all its sides and all its angles are equal, and concave when a corner points in."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Stop signs are octagons, honeycomb cells are hexagons, and a star is a polygon with corners that point in. What makes some of them regular?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8283
  url: http://127.0.0.1:8283/index.html
  readySelector: "#gclass"
  layout: full
explainPicture: { ref: shape.yml#explain-pic, caption: "A hexagon with one corner pointing in: concave. Its sides are not all equal, so it is irregular too." }
explainClip:
  query: { code: "@shape.yml#explain", fresh: 1, id: explain }
  caption: "Regular, or not"
  say: "Regular means equal sides and equal angles."
  clip:
    - caption: { text: "A square: the regular quadrilateral.", say: "A square is the regular quadrilateral." }
    - wait: 1000
    - caption: { text: "Five equal sides and five equal angles: a regular pentagon.", say: "One more side: a regular pentagon." }
    - click: More sides
    - expect: { selector: "#gclass", contains: "Regular pentagon" }
    - wait: 1000
    - caption: { text: "Move one corner: still a pentagon, but irregular.", say: "Move one corner. Still a pentagon, but now irregular." }
    - click: Move A right
    - click: Move A right
    - expect: { selector: "#gclass", contains: "Irregular pentagon" }
    - wait: 1200
---
A **polygon** is a closed shape with straight sides. Its name counts the sides:

| Sides | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|
| Name | triangle | quadrilateral | pentagon | hexagon | heptagon | octagon | nonagon | decagon |

A polygon is **regular** when **all its sides are equal and all its angles are equal**; otherwise it is **irregular**. It is **convex** when every corner points out (every angle less than 180°), and **concave** when at least one corner points in (an angle more than 180°).

## Predict: six equal sides

```step
stage: predict
insight: "Committing to whether equal sides alone make a regular hexagon shows whether they know regular needs equal angles too."
check:
  type: predict
  q: "A hexagon has six equal sides. Must it be a regular hexagon?"
  options: ["No: its angles might not be equal", "Yes: equal sides make it regular", "Only if it is convex"]
  actual: "No. Squash a regular hexagon and the sides stay equal but the angles change. Regular needs equal sides and equal angles."
```

Picture pushing two opposite corners of a regular hexagon towards each other.

## Run: a corner that points in

```step
stage: run
insight: "Changing the number of sides and dragging one corner inwards shows regular, irregular and concave as properties of any polygon."
try: { playground: board, starter: "shape.yml#run", height: 600 }
check: { type: board, text: "Make a hexagon with one corner pointing in (concave). Is it regular? Was your prediction about sides and angles right?", when: "n = 6 and v = 0", explain: "A corner pointing in has an angle over 180°, so the angles are not all equal: a concave polygon is never regular." }
```

**More sides** and **Fewer sides** change the shape; it starts regular. Then drag a corner.

## Investigate: names and properties

```step
stage: investigate
insight: "Names count sides; regular needs equal sides and equal angles (Kim checks only the sides); concave means a corner points in."
tasks:
  - check:
      type: match
      q: "Match each polygon to its number of sides."
      pairs:
        - ["pentagon", "5"]
        - ["hexagon", "6"]
        - ["heptagon", "7"]
        - ["octagon", "8"]
        - ["decagon", "10"]
      explain: "Pent- five, hex- six, hept- seven, oct- eight (an octopus has eight arms), dec- ten."
  - check:
      type: bug
      code: "working.txt#kim"
      text: "Kim decides whether a rhombus is regular. Click the line where her reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: regular-sides-only
      explain: "Line 3: regular needs equal angles too, and 60° and 120° are not equal. The only regular quadrilateral is a square."
  - check:
      type: question
      q: "How can you tell that a polygon is concave?"
      options: ["At least one corner points in, with an angle more than 180°", "It has more than six sides", "Its sides are not all equal", "It has a right angle"]
      answer: 0
      feedback: [null, "A regular octagon has eight sides and is convex.", "That makes it irregular, not concave.", "A square has right angles and is convex."]
      explain: "A concave polygon has a corner that points in: a reflex angle, over 180°."
```

### Count, then check

Here is the routine for naming a polygon.

```worked
\text{6 sides} \Rightarrow \text{hexagon} :: Count the sides for the name.
\text{sides equal and angles equal?} :: Both: regular. Either one fails: irregular.
\text{an angle} > 180^\circ? :: Yes: concave (a corner points in). No: convex.
\text{square} = \text{regular quadrilateral} :: A rhombus has equal sides but not equal angles; a rectangle the reverse.
```

Now match the names.

### Find the mistake

Read Kim's reasoning. What else must be equal?

### Concave

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time on the board: a concave pentagon, an irregular convex octagon, then why a rectangle is not regular and whether a circle is a polygon."
try: { playground: board, starter: "shape.yml#free", height: 600 }
tasks:
  - starter: "shape.yml#free"
    hint: "One More sides click, then drag one corner towards the middle."
    check: { type: board, text: "Make a concave pentagon.", when: "n = 5 and v = 0", explain: "Five sides with one corner pointing in." }
  - starter: "shape.yml#free"
    hint: ["Make 8 sides first: it starts regular.", "Then move one corner a little, keeping every corner pointing out."]
    check: { type: board, text: "Make an octagon that is convex but not regular.", when: "n = 8 and v = 1 and w = 0", explain: "Every corner points out, but the sides or angles are no longer all equal." }
  - check:
      type: question
      q: "Why is a rectangle (that is not a square) not regular?"
      options: ["Its angles are equal but its sides are not", "Its sides are equal but its angles are not", "It is concave", "It has only four sides"]
      answer: 0
      feedback: [null, "That describes a rhombus.", "Every corner of a rectangle points out.", "A square has four sides and is regular."]
      explain: "Four right angles, but two long and two short sides: equal angles, unequal sides."
  - check:
      type: question
      q: "Edge case: is a circle a polygon?"
      options: ["No: it has no straight sides", "Yes: a regular polygon with very many sides", "Yes: it is closed"]
      answer: 0
      feedback: [null, "Polygons with many sides look like circles, but their sides are still straight.", "Closed is needed, but so are straight sides."]
      explain: "A polygon's sides are straight lines; a circle is one curve."
```

### A concave pentagon

Each task changes one thing.

### An irregular octagon

### Rectangles

### Circles

## Practise: polygons

```step
stage: practise
insight: "Names, regular or not and an angle sum, mixed; equal sides alone is the planted slip; the review keeps the polygon angle sum fresh."
tasks:
  - check:
      type: question
      q: "What is a polygon with 9 sides called?"
      options: ["Nonagon", "Heptagon", "Decagon", "Octagon"]
      answer: 0
      feedback: [null, "A heptagon has 7.", "A decagon has 10.", "An octagon has 8."]
      explain: "9 sides: a nonagon."
  - check:
      type: question
      q: "Which is a regular polygon?"
      options: ["An equilateral triangle", "A rhombus with angles 70° and 110°", "A rectangle 4 cm by 6 cm", "An isosceles triangle"]
      answer: 0
      feedback: [null, "Equal sides, unequal angles.", "Equal angles, unequal sides.", "Only two sides are equal."]
      explain: "An equilateral triangle has equal sides and equal angles (60° each)."
  - check:
      type: answer
      q: "Each angle of a regular hexagon is the same. The angles add to 720°. How big is each one, in degrees?"
      answer: "120"
      feedback:
        - ["60", "That is 360 ÷ 6. The angles add to 720°."]
      explain: "720 ÷ 6 = 120°."
  - check:
      type: answer
      q: "Review: what do the angles of an octagon add to, in degrees?"
      answer: "1080"
      feedback:
        - ["1440", "An octagon splits into 6 triangles, not 8."]
      explain: "(8 − 2) × 180 = 1080°."
```

### Names

### Regular

### A regular hexagon

### Review: angle sums

## Make: a dart

```step
stage: make
insight: "Building a concave kite (a dart) combines a family name with concave: the kite's properties survive a corner pointing in."
try: { playground: board, starter: "shape.yml#make", height: 600 }
hint: ["A kite has two pairs of equal sides next to each other.", "Push one corner of a kite in past the middle, like an arrowhead."]
check: { type: board, text: "Make a dart: a kite with one corner pointing in.", when: "z = 6 and v = 0", explain: "For example (5, 1), (8, 6), (5, 4), (2, 6): two pairs of equal neighbouring sides, and the corner at (5, 4) points in." }
```

Then: is your dart regular? Why can a concave polygon never be regular?
