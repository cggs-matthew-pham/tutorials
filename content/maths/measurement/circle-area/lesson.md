---
order: 16
unit: circles
node: AC9M8M03 n1
uses: [AC9M7M03 n3]
title: Area of a circle
summary: "Cut a circle into thin slices and lay them top to tail: they make a shape close to a rectangle, πr long and r high. So the area of a circle is A = πr². It is between 2r² and 4r², about 3.14 times r²."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "How much pizza is in a pizza? Cut it into slices, lay them out top to tail, and a rectangle appears."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8307
  url: http://127.0.0.1:8307/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: circle.yml#explain-pic, caption: "24 slices of a circle of radius 3 cm, top to tail: nearly a rectangle 3π ≈ 9.42 cm long and 3 cm high, so about 28.3 cm²." }
explainClip:
  query: { code: "@circle.yml#explain", fresh: 1, id: explain }
  caption: "Slices into a rectangle"
  say: "Rearrange the slices, and a rectangle appears."
  clip:
    - caption: { text: "A circle cut into 8 slices.", say: "A circle cut into eight slices." }
    - wait: 800
    - caption: { text: "Lay them top to tail: a bumpy rectangle.", say: "Lay them top to tail." }
    - click: Rearrange the pieces
    - expect: { selector: "#gsum", contains: "πr × r" }
    - wait: 1000
    - caption: { text: "More slices: πr long, r high. A = πr².", say: "More slices. Pi r long, r high. Area is pi r squared." }
    - click: Make the number of pieces bigger
    - click: Make the number of pieces bigger
    - click: Make the number of pieces bigger
    - click: Make the number of pieces bigger
    - wait: 1600
---
Cut a circle into equal slices (sectors) and lay them out top to tail. Half the slices point up and half point down, so the shape is about **half the circumference** long ($\pi r$) and **one radius** high ($r$). The more slices, the closer it is to a rectangle. So

$$A = \pi r \times r = \pi r^2$$

A quick check: a circle fits inside a square of side $2r$ (area $4r^2$) and around a square of area $2r^2$, so its area is between $2r^2$ and $4r^2$: about $3.14 r^2$. Do not mix it up with the circumference, $C = 2\pi r$, which is a length.

## Predict: radius 3

```step
stage: predict
insight: "Committing to an area for radius 3 shows whether they reason between 2r² and 4r², or mix area with circumference."
check:
  type: predict
  q: "A circle has radius 3 cm. Which is closest to its area?"
  options: ["28 cm²", "19 cm²", "9 cm²", "36 cm²"]
  actual: "28 cm². It is between 2 × 9 = 18 and 4 × 9 = 36 cm²: about 3.14 × 9 = 28.3 cm². (19 cm² is close to the circumference, 18.8 cm, a length.)"
```

Imagine the circle inside a square 6 cm by 6 cm.

## Run: slices into a rectangle

```step
stage: run
insight: "Rearranging more and more slices shows the shape approaching a rectangle πr by r, which gives A = πr²."
try: { playground: board, starter: "circle.yml#run", height: 600 }
check: { type: board, text: "Rearrange the pieces, then use at least 16 slices. Was your prediction right?", when: "k = 1 and n >= 16", explain: "The slices make a near-rectangle πr long and r high: A = πr × r = πr²." }
```

## Investigate: why it works

```step
stage: investigate
insight: "The long side is half the circumference; area and circumference are different formulas (Jo uses 2πr); 2r² < A < 4r² is a check."
tasks:
  - check:
      type: question
      q: "Why is the rearranged shape πr long?"
      options: ["Half the slices' curved edges are along the bottom: half of the circumference 2πr", "Because the circle has radius r", "Because π is about 3", "Because there are n slices"]
      answer: 0
      feedback: [null, "The radius is the height.", "π comes from the circumference.", "The length does not depend on how many slices."]
      explain: "The curved edges of the slices make the circumference; half is on top, half on the bottom: πr each."
  - check:
      type: bug
      code: "working.txt#jo"
      text: "Jo finds the area of a circle of radius 5 cm. Click the line where her working goes wrong."
      answer: 2
      fault: logic
      misconception: circle-area-circumference
      explain: "Line 2: 2πr is the circumference (a length). The area is πr² = 3.14 × 25 ≈ 78.5 cm²."
  - check:
      type: question
      q: "A circle has radius 5 cm. Why must its area be between 50 and 100 cm²?"
      options: ["It is more than the inside square (2r² = 50) and less than the outside square (4r² = 100)", "Because 5 × 10 = 50", "Because π is between 2 and 4 exactly", "Because the diameter is 10"]
      answer: 0
      feedback: [null, "That is not the reason.", "π is about 3.14; the squares give the bounds.", "The diameter helps draw the outside square, but not alone."]
      explain: "The outside square has side 2r (area 4r² = 100); the square on the diagonals has area 2r² = 50."
```

### The long side

### Find the mistake

Read Jo's working. Is 2πr an area or a length?

### A check with squares

## Modify: squares and sizes

```step
stage: modify
insight: "Comparing with squares, using the formula, and doubling the radius show how area grows with r²."
try: { playground: board, starter: "circle.yml#squares", height: 600 }
tasks:
  - starter: "circle.yml#squares"
    hint: "Set the radius to 4, then press Compare with squares."
    check: { type: board, text: "Compare a circle of radius 4 cm with the squares. Between which two areas is it?", when: "s = 1 and r = 4", explain: "Between 2 × 16 = 32 and 4 × 16 = 64 cm²; πr² ≈ 50.3 cm²." }
  - check:
      type: number
      q: "Find the area of a circle of radius 10 cm, in cm², to 1 decimal place."
      answer: 314.2
      tolerance: 0.2
      explain: "π × 10² = π × 100 ≈ 314.2 cm² (with 3.14: 314 cm²)."
  - check:
      type: question
      q: "The radius of a circle doubles. What happens to its area?"
      options: ["It becomes 4 times as big", "It doubles", "It becomes 3.14 times as big", "It stays the same"]
      answer: 0
      feedback: [null, "r is squared: 2r squared is 4r².", "π does not change.", "A bigger circle has more area."]
      explain: "π(2r)² = 4πr²: four times the area."
  - starter: "circle.yml#free"
    check: { type: board, text: "Rearrange 32 slices of a circle. How close is the shape to a rectangle?", when: "k = 1 and n = 32", explain: "With 32 slices the edges are nearly straight: the rectangle is πr by r." }
```

### Squares

### Radius 10

### Double the radius

### 32 slices

## Practise: circle areas

```step
stage: practise
insight: "Area from the radius or diameter and a formula choice, mixed; using 2πr for area is the planted slip; the circumference review keeps the other formula separate."
tasks:
  - check:
      type: number
      q: "Find the area of a circle of radius 7 cm, in cm², to 1 decimal place."
      answer: 153.9
      tolerance: 0.1
      explain: "π × 49 ≈ 153.9 cm² (with 3.14: 153.86)."
  - check:
      type: number
      q: "A circle has diameter 10 m. Find its area in m², to 1 decimal place."
      answer: 78.5
      tolerance: 0.1
      feedback:
        - ["314.2", "Use the radius, not the diameter: r = 5."]
      explain: "r = 5 m, so A = π × 25 ≈ 78.5 m²."
  - check:
      type: question
      q: "Which formula gives the area of a circle?"
      options: ["A = πr²", "A = 2πr", "A = πd", "A = 2r²"]
      answer: 0
      feedback: [null, "That is the circumference.", "That is also the circumference.", "That is the inside square, smaller than the circle."]
      explain: "A = πr²; the circumference is C = 2πr = πd."
  - check:
      type: number
      q: "Review: find the circumference of a circle of radius 5 cm, in cm, to 1 decimal place."
      answer: 31.4
      tolerance: 0.05
      explain: "C = 2 × π × 5 ≈ 31.4 cm."
```

### Radius 7

### From the diameter

### The formula

### Review: circumference

## Make: an area of 50

```step
stage: make
insight: "Searching for a radius to hit an area uses πr² as a prediction before the board checks it."
try: { playground: board, starter: "circle.yml#free", height: 600 }
hint: ["πr² = 50, so r² is about 16.", "The square root of 16 is 4."]
check: { type: board, text: "Find the radius (in steps of 0.5 cm) whose area is closest to 50 cm².", when: "a > 49 and a < 51", explain: "r = 4: π × 16 ≈ 50.3 cm²." }
```

Then explain why the area is not 3.14 × 4 = 12.56.
