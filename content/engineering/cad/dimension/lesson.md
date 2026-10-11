---
order: 1
unit: size
title: Design to a dimension
summary: "A box has a wall on every side, so its inside is the outside minus two walls. To fit something inside, start from the thing: its size, plus a gap each side, plus a wall each side, gives the outside."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Your Arduino needs a case. You print a box 'about the right size', and it's 2 mm too small. Plastic is cheap; your time and the printer's aren't. How do you get it right first time?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8522
  url: http://127.0.0.1:8522/index.html
  readySelector: ".fbsvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "Uno 68.6 mm + 1 mm gap each side + 2 mm wall each side = 74.6 mm outside (rounded up to 75)." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "Two walls, not one"
  say: "A box has a wall on each side."
  clip:
    - caption: { text: "Outside 60 mm, walls 2 mm: inside 60 − 2 − 2 = 56 mm.", say: "Take off a wall on each side." }
    - wait: 2000
    - caption: { text: "The Uno is 68.6 mm wide, so it doesn't fit. Start from the part instead.", say: "Start from what goes inside." }
    - wait: 1800
    - expect: { selector: "#gsum", contains: "inside 56" }
---
Every measurement here is in **millimetres**. In Tinkercad you set a shape's size by typing in its dimension boxes, and you make a hollow box by grouping a solid box with a slightly smaller "hole" box.

## Predict: inside width

```step
stage: predict
insight: "Committing to the inside width tests the new move: a wall on each side comes off."
check:
  type: predict
  q: "A box is 40 mm wide on the outside, with 2 mm walls. How wide is the inside?"
  options: ["36 mm", "38 mm", "40 mm", "42 mm"]
  actual: "36 mm: 40 − 2 − 2. There is a wall on the left and one on the right."
```

## Try: walls and inside

```step
stage: run
insight: "Changing the wall on the board settles the prediction: the inside shrinks by twice the change."
try: { playground: board, starter: "board.yml#run", height: 600 }
tasks:
  - check: { type: board, text: "Make the walls 3 mm. How much did the inside width shrink?", when: "t = 3", explain: "From 56 to 54: 2 mm for a 1 mm thicker wall, because there are two walls." }
  - check: { type: board, text: "Now change the outside width so the inside is exactly 60 mm (walls still 3 mm).", when: "a = 60 and t = 3", explain: "Outside = 60 + 3 + 3 = 66 mm." }
```

### Thicker walls

### Inside 60

## Worked example: a case for an Uno

```step
stage: investigate
insight: "Working outwards from the part (part + gaps + walls) models the move; Sam's one-wall slip is planted after the method."
tasks:
  - check:
      type: answer
      q: "The Uno is 53.4 mm deep. With a 1 mm gap and a 2 mm wall each side, how deep is the case outside (mm)?"
      answer: "59.4"
      feedback:
        - ["56.4", "A gap and a wall on each side: add 2 × (1 + 2)."]
        - ["57.4", "Two walls and two gaps."]
      explain: "53.4 + 2 × 1 + 2 × 2 = 59.4 mm."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam's 57 mm part won't go in. Click the line where Sam's working first goes wrong."
      answer: 3
      fault: logic
      misconception: wall-one-side
      explain: "Line 3: there is a wall on each side, so the inside is 60 − 2 − 2 = 56 mm. The 57 mm part is 1 mm too big."
```

### From the part outwards

```worked
\text{Uno width} = 68.6 :: Start from what goes inside.
68.6 + 2 \times 1 = 70.6 :: A 1 mm gap on each side: the inside width.
70.6 + 2 \times 2 = 74.6 :: A 2 mm wall on each side: the outside width.
74.6 \to 75 :: Round up to a size you can set (never down).
```

Now the depth.

### Find the mistake

## Vary: change one thing

```step
stage: modify
insight: "Designing the case on the board, then changing only the wall, shows the outside must grow by twice the change to keep the same gap."
try: { playground: board, starter: "board.yml#vary", height: 600 }
tasks:
  - check: { type: board, text: "Set the outside size so the Uno fits with 1 to 1.5 mm to spare on the tightest side (2 mm walls).", when: "t = 2 and g >= 1 and g <= 1.5", explain: "About 75 × 59.5 mm outside." }
  - check: { type: board, text: "Now make the walls 3 mm for a tougher case, keeping a 1 to 1.5 mm gap.", when: "t = 3 and g >= 1 and g <= 1.5", explain: "Each dimension grows by 2 mm: about 77 × 61.5 mm." }
```

### The case

### Thicker walls

## Build it in Tinkercad

```step
stage: modify
tier: typical
insight: "Building the hollow box in Tinkercad by typing dimensions (not dragging) is the habit that makes parts fit."
check: { type: reflect, text: "In Tinkercad 3D: a solid box 75 × 59.5 × 25 mm, and a hole box 71 × 55.5 mm placed 2 mm in from each side and 2 mm up, grouped. I checked the inside with the ruler tool." }
```

## Practise: sizes

```step
stage: practise
insight: "Inside and outside both ways."
tasks:
  - check:
      type: answer
      q: "A box is 80 mm outside with 2.5 mm walls. Inside width (mm)?"
      answer: "75"
      feedback:
        - ["77.5", "Two walls."]
      explain: "80 − 2.5 − 2.5 = 75 mm."
  - check:
      type: answer
      q: "A 30 mm part, a 0.5 mm gap each side, 2 mm walls. Outside width (mm)?"
      answer: "35"
      feedback:
        - ["32.5", "Add a gap and a wall on each side."]
      explain: "30 + 2 × 0.5 + 2 × 2 = 35 mm."
```

### Inside

### Outside

## Make: the smallest case

```step
stage: make
insight: "Finding the smallest case that still fits reverses the process: start from a limit and work back to the dimensions."
try: { playground: board, starter: "board.yml#make", height: 600 }
hint: ["Walls 1.5 mm, gap at least 0.5 mm on the tightest side.", "Width: 68.6 + 2 × 0.5 + 2 × 1.5 = 72.6, so 73 on a 0.5 mm slider.", "Depth: 53.4 + 1 + 3 = 57.4, so 57.5."]
check: { type: board, text: "Make the smallest case you can with 1.5 mm walls and at least 0.5 mm to spare: no more than 73 × 58 mm.", when: "t = 1.5 and g >= 0.5 and w <= 73 and d <= 58", explain: "73 × 57.5 mm: every millimetre traced back to the part, a gap and a wall." }
```
