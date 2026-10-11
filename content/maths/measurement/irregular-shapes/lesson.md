---
order: 13
unit: area
node: AC9M8M01 n2
uses: [AC9M8M01 n1]
title: Irregular shapes
summary: "A lake or a leaf has no formula. Lay a grid over it: count the full squares, add half the part squares, and multiply by the area of one square. A finer grid gives a better estimate; straight pieces round the edge estimate the perimeter."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "How big is a lake? Councils, farmers and park rangers estimate areas like this from maps all the time, with a grid and some careful counting."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8304
  url: http://127.0.0.1:8304/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: shapes.yml#explain, caption: "A lake on a grid of 1 km squares, with 8 straight pieces round its edge." }
explainClip:
  query: { code: "@shapes.yml#explain", fresh: 1, id: explain }
  caption: "Count, then refine"
  say: "Count the full squares, add half the part squares."
  clip:
    - caption: { text: "Green squares are full; orange ones are partly inside.", say: "Green squares are full. Orange ones are partly inside." }
    - click: Count the squares
    - expect: { selector: "#gsum", contains: "Estimate" }
    - wait: 1500
    - caption: { text: "A finer grid: more squares, a better estimate.", say: "A finer grid gives a better estimate." }
    - click: Finer grid
    - wait: 1600
---
An **irregular shape** has curved or uneven edges, so no formula fits. Estimate instead:

- **Area:** put a grid over the shape. Count the **full squares**, and count each **part square** as half (some are mostly in, some mostly out, so on average half). Multiply by the area of one square. A **finer grid** gives a closer estimate.
- **Perimeter:** join points on the edge with **straight pieces** and add their lengths. More, shorter pieces follow the curve more closely.

Always say how precise your estimate is ("about 25 km², to the nearest whole km²").

## Predict: only the full squares

```step
stage: predict
insight: "Committing to what counting only full squares gives shows whether they see that the edge squares hold area too."
check:
  type: predict
  q: "You count only the squares that are completely inside a lake. Is that the area, too little or too much?"
  options: ["Too little", "Too much", "Exactly the area"]
  actual: "Too little. The squares on the edge are partly inside the lake, and their parts are left out. Counting each as a half fixes most of that."
```

Look at the squares the edge passes through.

## Run: count and refine

```step
stage: run
insight: "Counting on a coarse grid then a finer one shows the estimate settling as the squares shrink."
try: { playground: board, starter: "shapes.yml#run", height: 620 }
check: { type: board, text: "Count the squares, then make the grid finer. Was your prediction right? How much did the estimate change?", when: "c = 1 and g = 0.5", explain: "With a finer grid, the part squares cover less area in total, so the half-a-square guess matters less." }
```

**Count the squares** colours full squares green and part squares orange.

## Investigate: why half?

```step
stage: investigate
insight: "Part squares count as half because edges cut them at random (Sam counts them as whole); straight pieces always fall a little short of a curve."
tasks:
  - check:
      type: question
      q: "Why is each part square counted as half a square?"
      options: ["Some are mostly in and some mostly out, so on average about half is inside", "Because half of them are inside", "Because the grid is half a kilometre", "So the answer is smaller"]
      answer: 0
      feedback: [null, "It is about each square, not how many.", "The grid size does not decide this.", "It can make the estimate bigger or smaller than the full squares alone."]
      explain: "The edge cuts each part square somewhere: on average, half of it is inside."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam estimates his lake's area. Click the line where his method goes wrong."
      answer: 3
      fault: logic
      misconception: estimate-part-full
      explain: "Line 3: a square the edge passes through is only partly inside. Count each as half: 20 + 7 = 27 km²."
  - check:
      type: question
      q: "You estimate a curved edge with straight pieces between points on it. How does the estimate compare with the real perimeter?"
      options: ["A little shorter: a straight piece is the shortest way between its two points", "A little longer", "Exactly the same", "Twice as long"]
      answer: 0
      feedback: [null, "A curve between two points is longer than the straight line.", "Only for straight edges.", "Far too much."]
      explain: "Each straight piece cuts the corner of the curve, so the total is a little short; more pieces get closer."
```

### Half a square

### Find the mistake

Read Sam's working. Is every orange square all lake?

### Straight pieces

## Modify: closer estimates

```step
stage: modify
insight: "More pieces and finer grids close in on the true values; a different shape tests the method; the answer states its precision."
try: { playground: board, starter: "shapes.yml#run", height: 620 }
tasks:
  - starter: "shapes.yml#run"
    hint: "Watch the perimeter estimate as n grows."
    check: { type: board, text: "Use 32 straight pieces. Does the perimeter estimate get bigger or smaller?", when: "n = 32", explain: "It grows a little and settles: the pieces hug the curve more closely." }
  - starter: "shapes.yml#run"
    hint: ["Press Finer grid twice.", "Then Count the squares."]
    check: { type: board, text: "Use the finest grid (0.25 km squares) and count. How close is the estimate to the measured area?", when: "c = 1 and g = 0.25", explain: "The finest grid is within about 1 km² of the measured area." }
  - starter: "shapes.yml#leaf"
    check: { type: board, text: "Estimate the area of a leaf on a 0.5 cm grid.", when: "c = 1 and g = 0.5", explain: "Full squares plus half the part squares, times 0.25 cm² each." }
  - check:
      type: question
      q: "Your estimate on a 1 km grid is 26.5 km². How should you report it?"
      options: ["About 27 km² (to the nearest km²): the grid cannot be more precise", "26.500 km²", "Exactly 26.5 km²", "Between 0 and 100 km²"]
      answer: 0
      feedback: [null, "Extra decimal places claim a precision the grid does not have.", "It is an estimate, not exact.", "True, but far less useful than it could be."]
      explain: "A 1 km grid gives an estimate to about the nearest km²; say so."
```

### More pieces

### The finest grid

### A leaf

### Precision

## Practise: estimating

```step
stage: practise
insight: "The count rule with different square sizes, mixed; counting part squares as whole is the planted slip; the composite review keeps exact areas fresh."
tasks:
  - check:
      type: number
      q: "A shape covers 30 full squares and part of 12 more. Each square is 1 m². Estimate its area in m²."
      answer: 36
      tolerance: 0
      feedback:
        - ["42", "Part squares count as half each."]
      explain: "30 + 12 ÷ 2 = 36 m²."
  - check:
      type: number
      q: "On a grid of 0.5 m squares, a shape covers 40 full squares and part of 20 more. Estimate its area in m²."
      answer: 12.5
      tolerance: 0
      explain: "Each square is 0.5 × 0.5 = 0.25 m². (40 + 10) × 0.25 = 12.5 m²."
  - check:
      type: question
      q: "Which gives the best estimate of a pond's perimeter?"
      options: ["24 short straight pieces round its edge", "4 straight pieces round its edge", "Counting the squares inside it", "Multiplying its length by its width"]
      answer: 0
      feedback: [null, "Four pieces cut big corners off the curve.", "That estimates area, not perimeter.", "That is for rectangles' areas."]
      explain: "More, shorter pieces follow the curve more closely."
  - check:
      type: number
      q: "Review: a rectangle 8 m by 5 m has a 2 m by 2 m square cut from one corner. What is its area in m²?"
      answer: 36
      tolerance: 0
      explain: "8 × 5 − 2 × 2 = 40 − 4 = 36 m²."
```

### Count

### Half-metre squares

### Perimeter

### Review: composite shapes

## Make: an island

```step
stage: make
insight: "Estimating to a stated precision brings the counting method and the finer grid together."
try: { playground: board, starter: "shapes.yml#island", height: 620 }
hint: ["Count on each grid, coarsest first.", "The measured area appears on the finest grid."]
check: { type: board, text: "Estimate the island's area to within 2 km² of the measured area.", when: "c = 1 and g = 0.25 and e - t < 2 and t - e < 2", explain: "On the finest grid, full squares plus half the part squares lands within about 1 km²." }
```

Then write your estimate with its precision, and estimate the coastline with 32 pieces.
