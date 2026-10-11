---
order: 5
unit: powers
node: [AC9M7N01 n3, AC9M7N01 n4]
title: Between the squares
summary: "43 is not a perfect square, but it sits between 36 and 49, so √43 is between 6 and 7. Closer to 49 or to 36? Square a decimal to find out: 6.6² ≈ 43.6."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A square vegetable patch needs 43 m² of soil. No whole number squares to 43, but a builder still needs to know the side, to the nearest 10 cm."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8265
  url: http://127.0.0.1:8265/index.html
  readySelector: "#sl-s"
  layout: full
explainPicture: { ref: square.yml#explain-pic, caption: "$6.6^2 = 43.56$: just over 43. $6^2 = 36$ and $7^2 = 49$, so $\\sqrt{43}$ is between 6 and 7, about 6.6." }
explainClip:
  query: { code: "@square.yml#explain", fresh: 1, id: explain }
  caption: "Between two squares"
  say: "Find the perfect squares either side."
  clip:
    - caption: { text: "6² = 36: too small for 43.", say: "Six squared is thirty-six: too small." }
    - wait: 800
    - caption: { text: "7² = 49: too big. So √43 is between 6 and 7.", say: "Seven squared is forty-nine: too big. The root is between six and seven." }
    - wait: 1600
    - caption: { text: "Try tenths: 6.6² = 43.56, very close.", say: "Try tenths. Six point six squared is very close." }
    - click: Make s bigger
    - click: Make s bigger
    - click: Make s bigger
    - click: Make s bigger
    - click: Make s bigger
    - click: Make s bigger
    - expect: { selector: "#gsum", contains: "6.6 × 6.6" }
    - wait: 1400
---
Most numbers are not perfect squares, but they still have square roots. $\sqrt{43}$ is the side of a square with area 43: no whole number, but somewhere between two.

The method: find the perfect squares either side. $36 < 43 < 49$, and $\sqrt{36} = 6$, $\sqrt{49} = 7$, so $\sqrt{43}$ is between 6 and 7. Then try decimals to get closer.

## Predict: where is √43?

```step
stage: predict
insight: "Committing to an interval for √43 shows whether they use the squares either side, or halve, or think of 43's digits."
check:
  type: predict
  q: "$\\sqrt{43}$ is between which two whole numbers?"
  options: ["6 and 7", "21 and 22", "3 and 4", "40 and 50"]
  actual: "6 and 7. 6² = 36 and 7² = 49, and 43 is between them. 21 and 22 come from halving: 21 × 21 = 441."
```

Which perfect squares are near 43?

## Run: as close as you can

```step
stage: run
insight: "Stepping the side in tenths until the square is as close to the target as possible estimates a root to one decimal place, and shows it is between the whole numbers found first."
try: { playground: board, starter: "square.yml#run", height: 560 }
check: { type: board, text: "The dashed square has area 43. Change the side (in tenths) to make your square as close to 43 as you can. Was your prediction right?", when: "s = 6.6", explain: "6.5² = 42.25 (0.75 under) and 6.6² = 43.56 (0.56 over), so 6.6 is closer: √43 ≈ 6.6." }
```

The board says how far your square is from 43, over or under.

## Investigate: the squares either side

```step
stage: investigate
insight: "Bounding a root by the perfect squares either side gives an interval with reasons; Noah's halving is the squaring-as-doubling mistake run backwards."
tasks:
  - check:
      type: answer
      q: "$\\sqrt{70}$ is between 8 and which whole number?"
      answer: "9"
      feedback:
        - ["35", "That is half of 70. Which perfect square comes after 64?"]
        - ["7", "7² = 49, which is less than 64. √70 is more than 8."]
      explain: "8² = 64 and 9² = 81, and 70 is between them, so √70 is between 8 and 9."
  - check:
      type: bug
      code: "working.txt#noah"
      text: "Noah estimates $\\sqrt{50}$. Click the line where his reasoning goes wrong."
      answer: 2
      fault: logic
      misconception: square-double
      explain: "Line 2: the square root is not half (25 × 25 = 625). 7² = 49 and 8² = 64, so √50 is just over 7."
  - check:
      type: reasoning
      q: "A square garden bed has area 90 m². Between which two whole numbers of metres is its side? Write each step with its reason."
      steps:
        - ["$9^2 = 81$ and $10^2 = 100$", "these are the perfect squares either side of 90"]
        - ["$81 < 90 < 100$, so $9 < \\sqrt{90} < 10$", "a bigger square has a bigger side"]
      picks:
        - step: 1
          options: ["Find the perfect squares either side of 90", "Halve 90: 45", "Divide 90 by 10: 9"]
          answer: 0
          feedback: [null, "45 × 45 = 2025: far too big. A root is not a half.", "9 is close, but this is not a reason: 90 ÷ 10 finds a tenth, not a root."]
      explain: "81 < 90 < 100, so the side is between 9 m and 10 m (about 9.5 m: 9.5² = 90.25)."
```

### Bound it, then get closer

Here is the method for $\sqrt{43}$.

```worked
36 < 43 < 49 :: Find the perfect squares either side of 43.
6 < \sqrt{43} < 7 :: Take their roots: √43 is between 6 and 7.
6.5^2 = 42.25 \quad 6.6^2 = 43.56 :: Square some tenths. 6.5 is under and 6.6 is over.
\sqrt{43} \approx 6.6 :: 43.56 is closer to 43 (0.56 over) than 42.25 (0.75 under).
```

Now try one: between which whole numbers is $\sqrt{70}$?

### Find the mistake

Read Noah's working. Square his answer to check it.

### With reasons

Your working can be short notes. Then choose the reason for the key step.

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a new target on the board, a bigger root, an area from a perimeter (backwards), then which numbers are perfect squares at all."
try: { playground: board, starter: "square.yml#twenty", height: 560 }
tasks:
  - starter: "square.yml#twenty"
    hint: ["4² = 16 and 5² = 25, so start between 4 and 5.", "Compare how far 4.4² and 4.5² are from 20."]
    check: { type: board, text: "The dashed square has area 20 m². Make your square as close to it as you can.", when: "s = 4.5", explain: "4.4² = 19.36 (0.64 under), 4.5² = 20.25 (0.25 over): √20 ≈ 4.5." }
  - check:
      type: question
      q: "$\\sqrt{200}$ is between which two whole numbers?"
      options: ["14 and 15", "100 and 101", "19 and 20", "10 and 20, and no closer"]
      answer: 0
      feedback: [null, "That is half of 200.", "19² = 361: too big.", "You can get closer: 14² = 196 and 15² = 225."]
      explain: "14² = 196 and 15² = 225, and 200 is between them."
  - check:
      type: answer
      q: "A square has perimeter 36 cm. What is its area, in cm²?"
      answer: "81"
      feedback:
        - ["324", "That is 18². Find one side first: 36 ÷ 4."]
        - ["9", "9 cm is the side. The area is side × side."]
      explain: "Side = 36 ÷ 4 = 9 cm. Area = 9² = 81 cm²."
  - check:
      type: question
      q: "Edge case: which of these is a perfect square?"
      options: ["400", "40", "4000", "200"]
      answer: 0
      feedback: [null, "6² = 36 and 7² = 49: 40 is between.", "63² = 3969 and 64² = 4096: 4000 is between.", "14² = 196 and 15² = 225."]
      explain: "20² = 400. A perfect square needs a whole-number root."
```

### Twenty

Each task changes one thing.

### A bigger root

### Backwards: from the perimeter

### Perfect or not

## Practise: roots between

```step
stage: practise
insight: "An estimate to one decimal place, an interval, and a two-step problem, mixed; halving is the planted slip; the review keeps squares fresh."
tasks:
  - check:
      type: number
      q: "Estimate $\\sqrt{30}$ to one decimal place. (5² = 25 and 6² = 36.)"
      answer: 5.5
      tolerance: 0.05
      explain: "5.4² = 29.16 and 5.5² = 30.25: 30.25 is closer to 30, so √30 ≈ 5.5."
  - check:
      type: question
      q: "$\\sqrt{150}$ is between which two whole numbers?"
      options: ["12 and 13", "75 and 76", "11 and 12", "15 and 16"]
      answer: 0
      feedback: [null, "That is half of 150.", "11² = 121 and 12² = 144: both under 150.", "15² = 225: too big."]
      explain: "12² = 144 and 13² = 169."
  - check:
      type: answer
      q: "A square floor needs 64 square tiles, each 1 m by 1 m. How much skirting board goes round the edge, in metres?"
      answer: "32"
      feedback:
        - ["8", "8 m is one side. Skirting goes round all 4 sides."]
        - ["256", "That is 4 × 64. Find the side first: √64."]
      explain: "Side = √64 = 8 m. Perimeter = 4 × 8 = 32 m."
  - check:
      type: answer
      q: "Review: work out $12^2$."
      answer: "144"
      feedback:
        - ["24", "That is 12 × 2. Squaring is 12 × 12."]
      explain: "12 × 12 = 144."
```

### To one decimal place

### Between

### Two steps

### Review: squares

## Make: an area in the thirties

```step
stage: make
insight: "Choosing a side whose square lands between 30 and 40 turns the bounding argument round: the side must be between √30 and √40."
try: { playground: board, starter: "square.yml#make", height: 560 }
hint: ["5² = 25 is too small and 6² = 36 is inside. Are there others?", "Step in tenths: 5.5² = 30.25."]
check: { type: board, text: "Make a square whose area is between 30 and 40.", when: "a > 30 and a < 40", explain: "Any side from 5.5 to 6.3 works: √30 ≈ 5.48 and √40 ≈ 6.32." }
```

Then find the smallest and the biggest side (in tenths) that work.
