---
order: 10
unit: solids
node: AC9M7SP01 n1
title: Nets
summary: "A net is a flat pattern that folds into a solid. Six squares make a cube only if they land on six different faces; a triangular prism has two triangles and three rectangles."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A cereal box starts as one flat piece of card. Which flat shapes fold up into a box, and which ones jam?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8295
  url: http://127.0.0.1:8295/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: nets.yml#explain-pic, caption: "A cross of six squares folds into a cube: each square lands on a different face." }
explainClip:
  query: { code: "@nets.yml#explain", fresh: 1, id: explain }
  caption: "From a row to a net"
  say: "Six squares in a row do not fold. Move two and it works."
  clip:
    - caption: { text: "Six squares in a row: some land on the same face.", say: "Six squares in a row. Some land on the same face." }
    - wait: 1000
    - caption: { text: "Take the last two squares away.", say: "Take the last two squares away." }
    - click: Square at column 6, row 2, in the net (press to remove)
    - click: Square at column 5, row 2, in the net (press to remove)
    - caption: { text: "Add one square above and one below.", say: "Add one above, and one below." }
    - click: Square at column 2, row 1, empty (press to add)
    - click: Square at column 2, row 3, empty (press to add)
    - expect: { selector: "#gsum", contains: "folds into a cube" }
    - wait: 1500
---
A **net** is a flat pattern that folds up into a solid. A cube's net is six squares joined along their edges. A **prism** is a solid with two matching ends and flat rectangular sides; the net of a triangular prism is two triangles and three rectangles.

## Predict: six in a row

```step
stage: predict
insight: "Committing to whether six squares in a row fold into a cube shows whether they count squares or picture the fold."
check:
  type: predict
  q: "Six squares joined in a straight row. Will they fold into a cube?"
  options: ["No: some squares would land on top of each other", "Yes: a cube has six faces", "Only if the row is bent"]
  actual: "No. Fold the row round and the sixth square lands on the first. A net needs six squares on six different faces."
```

Picture wrapping the row round a cube: where does the fifth square go?

## Run: fold the net

```step
stage: run
insight: "Changing the squares of a net and watching the board fold it shows that a net works only when all six squares land on different faces."
try: { playground: board, starter: "nets.yml#run", height: 600 }
check: { type: board, text: "Click squares to change the row until the board says it folds into a cube. Was your prediction right?", when: "f = 1", explain: "Folding needs six squares on six different faces. A row of six wraps back on itself." }
```

Click a square to add it or take it away. The colours show which face each square becomes.

## Investigate: six squares is not enough

```step
stage: investigate
insight: "Six squares is necessary but not enough (Zara counts only); the test is whether the faces differ; a prism net adds up its faces."
tasks:
  - check:
      type: answer
      q: "A net folds into a cube. How many squares does it have?"
      answer: "6"
      explain: "A cube has 6 faces, so its net has 6 squares."
  - check:
      type: bug
      code: "working.txt#zara"
      text: "Zara says her block of six squares folds into a cube. Click the line where her reasoning goes wrong."
      answer: 4
      fault: logic
      misconception: net-count-only
      explain: "Line 4: six squares is needed, but they must land on six different faces. A 2 by 3 block has squares that fold on top of each other."
  - check:
      type: question
      q: "What is the best way to test a net for a cube?"
      options: ["Fold it (or roll a cube over it) and check that every face is covered once", "Count that it has six squares", "Check that it is a rectangle", "Check that it is symmetrical"]
      answer: 0
      feedback: [null, "Six squares is needed, but a row of six fails.", "A 2 by 3 block is a rectangle and does not fold.", "A row of six is symmetrical and does not fold."]
      explain: "Fold it, in your head or on the board: each face must be covered exactly once."
```

### How many squares?

Think about the faces of the cube.

### Find the mistake

Read Zara's reasoning. What else must be true?

### The test

## Modify: other nets and other solids

```step
stage: modify
insight: "Different cube nets (a cross, six squares that fail) and the prism's net area: faces of a prism are two ends and a rectangle for each side."
try: { playground: board, starter: "nets.yml#modify", height: 600 }
tasks:
  - starter: "nets.yml#modify"
    hint: ["Start with a row of 4 squares.", "Add one square above and one below the row."]
    check: { type: board, text: "Make a net of a cube with a row of four squares in the middle.", when: "f = 1 and c = 6", explain: "Four in a row with one above and one below folds: the row wraps round and the extra squares are the top and bottom." }
  - starter: "nets.yml#cross"
    hint: ["Move one square so that two squares would land on the same face.", "A row of five with one square on top does not fold."]
    check: { type: board, text: "Make a net with six squares that does not fold into a cube.", when: "c = 6 and f = 0", explain: "For example a row of five with one square on top, a 2 by 3 block, or the row of six: two squares land on the same face." }
  - starter: "nets.yml#prism"
    hint: ["The net area is the area of 2 triangles plus 3 rectangles.", "Slide the length L to 5."]
    check: { type: board, text: "The triangle has sides 3, 4 and 5 cm. Set the length to 5 cm. What is the net's area?", when: "L = 5", explain: "Two triangles of 6 cm² and rectangles 3 × 5, 4 × 5 and 5 × 5: 12 + 60 = 72 cm²." }
  - check:
      type: question
      q: "How many rectangles are in the net of a triangular prism?"
      options: ["3", "2", "4", "5"]
      answer: 0
      feedback: [null, "Those are the two triangles.", "A triangle has three sides, not four.", "That is the total number of faces."]
      explain: "One rectangle for each side of the triangle: 3, plus the 2 triangles makes 5 faces."
```

### A cross

### Six squares that fail

### A prism

### Count the rectangles

## Practise: nets

```step
stage: practise
insight: "Prism surface area and other nets, mixed; counting faces is the planted slip; the triangle area review keeps the prism's end faces fresh."
try: { playground: board, starter: "nets.yml#prism-free", height: 600 }
tasks:
  - check:
      type: question
      q: "What is the net of a square pyramid made of?"
      options: ["1 square and 4 triangles", "4 squares and 1 triangle", "2 squares and 4 triangles", "5 squares"]
      answer: 0
      feedback: [null, "The base is a square and the sides are triangles.", "A pyramid has one base.", "That is the net of an open box."]
      explain: "A square base and four triangles that meet at the point."
  - starter: "nets.yml#prism-free"
    check: { type: board, text: "A prism has a right triangle with sides 6, 8 and 10 cm and length 5 cm. Set the board to match.", when: "a = 6 and b = 8 and L = 5", explain: "Two triangles of 24 cm² and rectangles 6 × 5, 8 × 5 and 10 × 5: 48 + 120 = 168 cm²." }
  - check:
      type: answer
      q: "Read the net's area on the board. The prism's surface area is how many square centimetres?"
      answer: "168"
      feedback:
        - ["84", "The net is the whole surface laid flat, so there is no halving."]
      explain: "The net is the surface laid flat, so its area is the surface area."
  - check:
      type: answer
      q: "Review: a triangle has base 8 cm and height 5 cm. What is its area in square centimetres?"
      answer: "20"
      feedback:
        - ["40", "That is base × height. A triangle is half of that."]
      explain: "(8 × 5) ÷ 2 = 20 cm²."
  - check:
      type: question
      q: "How many rectangles are in the net of a rectangular prism (a box)?"
      options: ["6", "4", "5", "3"]
      answer: 0
      feedback: [null, "Those are the sides only; the top and bottom are rectangles too.", "A box has 6 faces.", "Opposite faces are the same size, but all six are drawn."]
      explain: "A box has 6 faces, all rectangles, in 3 matching pairs (some may be squares)."
```

### A pyramid

### Surface area

### Net area

### Review: triangle area

### A box

## Make: a net to fit

```step
stage: make
insight: "Choosing the length of a prism to meet a target area applies the net as faces added up."
try: { playground: board, starter: "nets.yml#prism-free", height: 600 }
hint: ["Each extra centimetre of length adds 3 + 4 + 5 = 12 cm² with a 3, 4, 5 triangle.", "The two triangles give 12 cm² whatever the length."]
check: { type: board, text: "Make a prism net with a surface area between 90 and 100 cm². Use a 3, 4, 5 triangle.", when: "a = 3 and b = 4 and A > 90 and A < 100", explain: "With a 3, 4, 5 triangle the area is 12 + 12 × L, so L = 7 gives 96 cm²." }
```

Then: why does a net show the surface area exactly, when a 3D drawing does not?
