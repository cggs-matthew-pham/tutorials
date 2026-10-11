---
order: 12
unit: transform
node: AC9M7SP03 n1
title: Translations
summary: "A translation slides every point of a shape the same distance in the same direction. Right adds to x, left takes away; up adds to y, down takes away. The shape does not change size or turn."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A chess piece slides across the board, a lift goes up, a character steps left on a screen. Each is a translation: every point moves the same way."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8297
  url: http://127.0.0.1:8297/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: move.yml#explain-pic, caption: "The triangle moves 3 right and 2 down: every corner changes by $(+3, -2)$." }
explainClip:
  query: { code: "@move.yml#explain", fresh: 1, id: explain }
  caption: "Slide, and read the change"
  say: "Every corner moves the same way."
  clip:
    - caption: { text: "A triangle, A at (1, 1).", say: "A triangle, with A at one, one." }
    - wait: 800
    - caption: { text: "Move it 3 right.", say: "Move it three right." }
    - click: Make the move right bigger
    - click: Make the move right bigger
    - click: Make the move right bigger
    - caption: { text: "Now 2 down: every corner changes by the same amount.", say: "Now two down. Every corner changes by the same amount." }
    - click: Make the move up smaller
    - click: Make the move up smaller
    - expect: { selector: "#gsum", contains: "Translate 3 right, 2 down" }
    - wait: 1500
---
A **translation** slides a shape without turning or flipping it. Every point moves the same distance in the same direction, so the shape keeps its size and shape. The shape is called the **object** and its new position the **image**; a point A becomes A′ (said "A prime").

On the coordinate plane, a move right or up **adds** to a coordinate and a move left or down **takes away**. A translation of 3 right and 2 down changes $(x, y)$ to $(x + 3, y - 2)$.

## Predict: where does A land?

```step
stage: predict
insight: "Committing to the image of one point under 3 right and 2 down shows whether they add to the right coordinate in the right direction."
check:
  type: predict
  q: "Point A is at (1, 1). The triangle is translated 3 right and 2 down. Where does A land?"
  options: ["(4, −1)", "(4, 3)", "(−2, −1)", "(3, 2)"]
  actual: "(4, −1). Right adds 3 to x: 1 + 3 = 4. Down takes 2 from y: 1 − 2 = −1."
```

Add to x for right, take from y for down.

## Run: slide the triangle

```step
stage: run
insight: "Sliding the triangle and reading each corner's change shows that the same amount is added to every x and to every y."
try: { playground: board, starter: "move.yml#run", height: 600 }
check: { type: board, text: "Slide the triangle until A′ is at (4, −1). Was your prediction right?", when: "x(A) = 4 and y(A) = -1", explain: "A moves 3 right and 2 down, so A′ is (1 + 3, 1 − 2) = (4, −1)." }
```

The orange triangle is the image. The panel lists every corner and where it goes.

## Investigate: reading the move

```step
stage: investigate
insight: "Right and up add, left and down take away (Ravi adds for left); every corner moves the same; the shape stays the same size."
tasks:
  - check:
      type: question
      q: "The triangle has corners A (1, 1), B (3, 1) and C (3, 2). It moves 3 right and 2 down. Where does B land?"
      options: ["(6, −1)", "(6, 3)", "(0, −1)", "(4, −1)"]
      answer: 0
      feedback: [null, "Down takes 2 away from y.", "Right adds 3 to x.", "That is where A lands."]
      explain: "B′ = (3 + 3, 1 − 2) = (6, −1)."
  - check:
      type: bug
      code: "working.txt#ravi"
      text: "Ravi translates A (2, 3) by 4 left and 1 up. Click the line where his reasoning goes wrong."
      answer: 2
      fault: logic
      misconception: translate-sign
      explain: "Line 2: moving left makes x smaller, so take 4 away: 2 − 4 = −2. The image is (−2, 4)."
  - check:
      type: question
      q: "What stays the same when a shape is translated?"
      options: ["Its size, its shape and the way it faces", "Only its size", "Its position", "Its coordinates"]
      answer: 0
      feedback: [null, "The shape and direction stay the same too.", "The position is what changes.", "Every coordinate changes."]
      explain: "A translation only changes the position. The image is congruent to the object."
```

### Where does B land?

Apply the same move to B.

### Find the mistake

Read Ravi's working. Which way does x go when you move left?

### What stays the same

## Modify: choose the move

```step
stage: modify
insight: "Working backwards from where a corner should end up, and from the image back to the object, shows a translation is a reversible pair of changes."
try: { playground: board, starter: "move.yml#free", height: 600 }
tasks:
  - starter: "move.yml#free"
    hint: ["Compare the x-coordinates of A and A′.", "Then compare the y-coordinates."]
    check: { type: board, text: "Slide the triangle so that A′ is at (−3, 2).", when: "x(A) = -3 and y(A) = 2", explain: "From (1, 1) to (−3, 2) is 4 left and 1 up." }
  - starter: "move.yml#free"
    hint: ["The top corner C needs a y below 0.", "A′ must be to the right of the y-axis."]
    check: { type: board, text: "Slide the triangle into the fourth quadrant (right of the y-axis, below the x-axis).", when: "x(A) > 0 and y(C) < 0", explain: "For example 2 right and 4 down: every corner has a positive x and a negative y." }
  - check:
      type: question
      q: "A shape is translated 5 right and 3 down. Which translation moves the image back to where it started?"
      options: ["5 left and 3 up", "5 right and 3 up", "3 left and 5 up", "5 left and 3 down"]
      answer: 0
      feedback: [null, "That undoes only the vertical move.", "x and y changes are swapped.", "That undoes only the horizontal move."]
      explain: "Undo each part: 5 right becomes 5 left, and 3 down becomes 3 up."
  - check:
      type: question
      q: "A shape is translated 2 right, then 3 up. Another shape is translated 3 up, then 2 right. Do they end up in the same place?"
      options: ["Yes: the order of the two moves does not matter", "No: the first move is different", "Only if the shapes are triangles"]
      answer: 0
      feedback: [null, "Both add 2 to x and 3 to y.", "It is true for every shape."]
      explain: "Both change $(x, y)$ to $(x + 2, y + 3)$, so the order does not matter."
```

### Aim for A′

Work out the change in x, then in y.

### The fourth quadrant

### Undo the move

### Two moves

## Practise: translations

```step
stage: practise
insight: "Reading images, the move between two points and the quadrant, mixed; left and down not taking away is the planted slip; the quadrant review keeps coordinates fresh."
try: { playground: board, starter: "move.yml#free", height: 600 }
tasks:
  - check:
      type: answer
      q: "C is at (3, 2). After a translation of 3 right and 2 down, what is the x-coordinate of C′?"
      answer: "6"
      feedback:
        - ["0", "Right adds to x: 3 + 3."]
      explain: "3 + 3 = 6."
  - check:
      type: answer
      q: "With the same translation, what is the y-coordinate of C′?"
      answer: "0"
      feedback:
        - ["4", "Down takes away from y: 2 − 2."]
      explain: "2 − 2 = 0, so C′ = (6, 0)."
  - check:
      type: question
      q: "Which translation takes (2, 5) to (−1, 3)?"
      options: ["3 left and 2 down", "3 right and 2 down", "3 left and 2 up", "1 left and 3 down"]
      answer: 0
      feedback: [null, "Right would make x bigger.", "Up would make y bigger.", "Check the change in x: from 2 to −1."]
      explain: "x goes from 2 to −1 (3 left); y goes from 5 to 3 (2 down)."
  - check:
      type: question
      q: "Review: in which quadrant is the point (−3, 2)?"
      options: ["Top left", "Top right", "Bottom left", "Bottom right"]
      answer: 0
      feedback: [null, "A positive x is to the right of the y-axis.", "A positive y is above the x-axis.", "Both signs are wrong for the bottom right."]
      explain: "A negative x is left of the y-axis and a positive y is above the x-axis."
```

### The x-coordinate

### The y-coordinate

### Between two points

### Review: quadrants

## Make: a move to the origin

```step
stage: make
insight: "Finding the translation that puts a chosen corner at the origin makes them reason from the target back to the move."
try: { playground: board, starter: "move.yml#free", height: 600 }
hint: ["Corner C is at (3, 2).", "Both coordinates must become 0."]
check: { type: board, text: "Slide the triangle so that corner C′ lands exactly on the origin (0, 0).", when: "x(C) = 0 and y(C) = 0", explain: "C goes from (3, 2) to (0, 0): 3 left and 2 down." }
```

Then write the translation in words, and as a rule for $(x, y)$.
