---
order: 17
unit: circles
node: AC9M8M03 n2
uses: [AC9M8M03 n1]
title: Circle problems
summary: "Choose the formula by what you need: C = 2πr for a length round the edge, A = πr² for the space inside. Work backwards from an area with r = √(A ÷ π). Half and quarter circles, rings and tracks are parts of circles added to or taken from other shapes."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A running track, a round garden bed, a pizza deal: is a 30 cm pizza more than twice a 20 cm one? Circle problems need the right formula, sometimes run backwards."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8308
  url: http://127.0.0.1:8308/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: circle.yml#explain-pic, caption: "A circle of radius 3 m: A = π × 9 ≈ 28.27 m²." }
explainClip:
  query: { code: "@circle.yml#explain", fresh: 1, id: explain }
  caption: "From area back to radius"
  say: "Which radius gives an area of about twenty-eight?"
  clip:
    - caption: { text: "We need an area of about 28.3 m². Try radius 1.", say: "We need about twenty-eight. Try radius one." }
    - wait: 800
    - caption: { text: "Radius 3: π × 9 ≈ 28.27. Found it.", say: "Radius three. Pi times nine. Found it." }
    - click: Make the radius bigger
    - click: Make the radius bigger
    - click: Make the radius bigger
    - click: Make the radius bigger
    - expect: { selector: "#gsum", contains: "28.27" }
    - wait: 1500
---
Ask first: is the answer a **length** round the edge (circumference, $C = 2\pi r$) or the **space** inside (area, $A = \pi r^2$)?

To find the radius from an area, undo each step: divide by $\pi$, then take the square root.

$$r = \sqrt{A \div \pi}$$

For part of a circle, take the fraction: a semicircle is half the area $\frac{1}{2}\pi r^2$, a quarter circle a quarter. Its perimeter is the curved part plus the straight edges. Say which value of π you used (the π button, or 3.14).

## Predict: a round rug

```step
stage: predict
insight: "Committing to a radius from an area shows whether they undo π and the square, or divide only."
check:
  type: predict
  q: "A round rug has an area of 12.57 m². What is its radius?"
  options: ["2 m", "4 m", "6.28 m", "3.14 m"]
  actual: "2 m. 12.57 ÷ π = 4 = r², so r = √4 = 2 m."
```

What times itself, times π, makes 12.57?

## Run: find the radius

```step
stage: run
insight: "Searching for the radius that gives the area shows the two steps that undo A = πr²."
try: { playground: board, starter: "circle.yml#run", height: 560 }
check: { type: board, text: "Find the radius of the 12.57 m² rug. Was your prediction right?", when: "r = 2", explain: "π × 2² = π × 4 ≈ 12.57 m²." }
```

## Investigate: backwards and in parts

```step
stage: investigate
insight: "Undo π then the square (Leo forgets the square root); a semicircle is half the area."
tasks:
  - check:
      type: number
      q: "A circle has an area of 113.1 cm². Find its radius in cm."
      answer: 6
      tolerance: 0.05
      feedback:
        - ["36", "That is r². Take the square root."]
      explain: "113.1 ÷ π ≈ 36, and √36 = 6 cm."
  - check:
      type: bug
      code: "working.txt#leo"
      text: "Leo finds the radius of a circle with area 50 cm². Click the line where his working goes wrong."
      answer: 2
      fault: logic
      misconception: circle-forget-root
      explain: "Line 2: 50 ÷ 3.14 is r², not r. Take the square root: r = √15.9 ≈ 4.0 cm."
  - check:
      type: question
      q: "How do you find the area of a semicircle of radius 4 cm?"
      options: ["Half of π × 4²", "π × 4² × 2", "Half of 2 × π × 4", "π × 2²"]
      answer: 0
      feedback: [null, "That is two whole circles.", "That is half the circumference, a length.", "That is a circle of radius 2."]
      explain: "A semicircle is half the circle: ½ × π × 16 ≈ 25.1 cm²."
```

### Backwards

Here is the routine.

```worked
78.5 \div \pi \approx 25 :: Undo the π: this is r².
r = \sqrt{25} = 5\ \text{cm} :: Undo the square with a square root.
\pi \times 5^2 \approx 78.5 :: Check by going forwards.
```

### Find the mistake

Read Leo's working. Is 50 ÷ 3.14 the radius, or the radius squared?

### Semicircles

## Modify: tracks and rings

```step
stage: modify
insight: "Composite problems with circles: a semicircle, a running track's area and perimeter, and a target area on the board."
try: { playground: board, starter: "circle.yml#free", height: 560 }
tasks:
  - check:
      type: number
      q: "Find the area of a semicircle of radius 4 cm, in cm², to 1 decimal place."
      answer: 25.1
      tolerance: 0.1
      explain: "½ × π × 16 ≈ 25.1 cm²."
  - check:
      type: number
      q: "A running track's field is a 100 m by 60 m rectangle with a semicircle on each 60 m end. What is its area in m²? (Round to the nearest whole number.)"
      answer: 8827
      tolerance: 2
      explain: "The two semicircles make a circle of radius 30: π × 900 ≈ 2827 m². Plus the rectangle 6000 m²: about 8827 m²."
  - check:
      type: number
      q: "What is the perimeter of that field in metres, to the nearest whole number?"
      answer: 388
      tolerance: 1
      explain: "Two straights of 100 m, and the two semicircles make one circle of diameter 60: π × 60 ≈ 188.5 m. 200 + 188.5 ≈ 388 m."
  - starter: "circle.yml#free"
    check: { type: board, text: "Find the smallest radius (in steps of 0.5 m) whose area is more than 100 m².", when: "r = 6", explain: "r = 5.5 gives about 95 m²; r = 6 gives about 113 m²." }
```

### A semicircle

### A track's area

### A track's perimeter

### Over 100

## Practise: circle problems

```step
stage: practise
insight: "Radius from area, parts of circles, a ring and a semicircle's perimeter, mixed; forgetting the square root is the planted slip."
tasks:
  - check:
      type: number
      q: "A circular pool cover has an area of 154 m². Find its radius in m."
      answer: 7
      tolerance: 0.05
      feedback:
        - ["49", "That is r². Take the square root."]
      explain: "154 ÷ π ≈ 49, and √49 = 7 m."
  - check:
      type: number
      q: "Find the area of a quarter circle of radius 10 cm, to 1 decimal place."
      answer: 78.5
      tolerance: 0.1
      explain: "¼ × π × 100 ≈ 78.5 cm²."
  - check:
      type: number
      q: "A ring is between circles of radius 5 cm and 3 cm. Find its area in cm², to 1 decimal place."
      answer: 50.3
      tolerance: 0.2
      explain: "π × 25 − π × 9 = π × 16 ≈ 50.3 cm²."
  - check:
      type: number
      q: "Find the perimeter of a semicircle of radius 5 cm (the curve and the diameter), to 1 decimal place."
      answer: 25.7
      tolerance: 0.1
      explain: "Half the circumference, π × 5 ≈ 15.7 cm, plus the diameter 10 cm: 25.7 cm."
```

### Back to the radius

### A quarter circle

### A ring

### A semicircle's perimeter

## Make: a garden bed

```step
stage: make
insight: "Choosing a radius to meet an area range uses the formula backwards as a prediction, checked on the board."
try: { playground: board, starter: "circle.yml#free", height: 560 }
hint: ["25 ÷ π ≈ 8 and 30 ÷ π ≈ 9.5.", "Which radius has a square between those?"]
check: { type: board, text: "A round garden bed must have an area between 25 and 30 m². Choose its radius.", when: "a > 25 and a < 30", explain: "r = 3 m: π × 9 ≈ 28.3 m²." }
```

Then work out how much edging the bed needs (its circumference), and say which value of π you used.
