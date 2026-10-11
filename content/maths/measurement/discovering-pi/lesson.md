---
order: 7
unit: circles
node: AC9M7M03 n2
uses: [AC9M7N06 n2]   # dividing decimals
title: Discovering π
summary: "Roll any circle out flat and its circumference is just over 3 of its diameters. C ÷ d is the same number for every circle: π (pi), about 3.14. π's digits never end: 3.14 and 22/7 are close, not exact."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A bike wheel, a coin and the Earth's equator: wildly different sizes, but for each one the distance round is the same number of times the distance across. People have known this for four thousand years."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8279
  url: http://127.0.0.1:8279/index.html
  readySelector: ".gbar button"
  layout: full
explainPicture: { ref: circle.yml#explain-pic, caption: "Rolled out flat, the circumference is 3 diameters and a little bit more (about 0.14 of a diameter): $C \\div d \\approx 3.14$." }
explainClip:
  query: { code: "@circle.yml#explain", fresh: 1, id: explain }
  caption: "Roll it out"
  say: "Roll the circle out flat."
  clip:
    - caption: { text: "Mark a point and roll the circle one full turn.", say: "Mark a point and roll the circle one full turn." }
    - click: Roll it out
    - wait: 2800
    - expect: { selector: "#gsum", contains: "circumference 9.42" }
    - caption: { text: "The track is 3 diameters and a bit: C ÷ d ≈ 3.14.", say: "The track is three diameters and a little bit more." }
    - wait: 1600
---
The **circumference** of a circle is hard to measure with a ruler, because it is curved. But you can roll the circle along a line for one full turn: the track it leaves is exactly its circumference, laid flat.

Compare that track with the **diameter**, and something remarkable happens: for every circle, big or small, the circumference is the same number of diameters. That number is called **π** (the Greek letter pi, said "pie"):

$$\pi = \frac{C}{d} \approx 3.14$$

## Predict: diameter 10

```step
stage: predict
insight: "Committing to an estimate for the circumference of a 10 cm circle shows whether they expect a fixed multiple of the diameter, and roughly what it is."
check:
  type: predict
  q: "A circle has diameter 10 cm. Roughly how long is its circumference?"
  options: ["About 31 cm", "About 20 cm", "About 10 cm", "About 100 cm"]
  actual: "About 31 cm: just over 3 diameters (31.4 cm). 20 cm would be 2 diameters, which is less than the way round."
```

Picture walking round a circle compared with walking across it.

## Run: roll three circles

```step
stage: run
insight: "Rolling circles of three sizes and dividing C by d each time shows the ratio is the same, about 3.14, whatever the size."
try: { playground: board, starter: "circle.yml#run", height: 640 }
check: { type: board, text: "Roll out at least three circles of different sizes. Look at C ÷ d in the table. Was your prediction right?", when: "n >= 3", explain: "C ÷ d is 3.14 every time: the circumference is π diameters." }
```

Change the radius, then press **Roll it out**. Each size adds a row to the table.

## Investigate: the same number every time

```step
stage: investigate
insight: "C ÷ d is the same for every circle; Kai's measurement gives 3.14, but π is not exactly 3.14. A quick estimate uses C ≈ 3d."
tasks:
  - check:
      type: question
      q: "What does the table show about C ÷ d?"
      options: ["It is about 3.14 for every circle", "It gets bigger for bigger circles", "It is 2, because the diameter is two radii", "It changes every time"]
      answer: 0
      feedback: [null, "C and d both get bigger, but their ratio stays the same.", "That is d ÷ r, not C ÷ d.", "Look again at the last column."]
      explain: "C ÷ d is the same number for every circle: π ≈ 3.14."
  - check:
      type: bug
      code: "working.txt#kai"
      text: "Kai measures a plate to find π. Click the line where his reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: pi-exact
      explain: "Line 3: a measurement gives π only to a few places. π = 3.14159… has digits that never end or settle into a pattern; 3.14 is an approximation."
  - check:
      type: number
      q: "A wheel has diameter 60 cm. Estimate its circumference in cm, using π ≈ 3.14."
      answer: 188.4
      tolerance: 0.5
      explain: "C ≈ 3.14 × 60 = 188.4 cm (quick check: 3 × 60 = 180, a bit more)."
```

### What π means

Here is what π is, and what it is not.

```worked
\pi = C \div d :: π is how many diameters fit round the circumference.
\pi = 3.14159265\ldots :: Its digits never end and never settle into a repeating pattern.
\pi \approx 3.14 \quad \text{or} \quad \pi \approx \tfrac{22}{7} :: Two handy approximations (22/7 = 3.142…).
C \approx 3 \times d :: A quick estimate: a bit more than 3 diameters.
```

Now: what does the table show?

### Find the mistake

Read Kai's reasoning. Is a measurement ever exact?

### Estimate

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a circle of diameter 1 (so C is π itself), π from a measurement, a quick estimate, and the edge case of a bigger circle having a bigger π."
try: { playground: board, starter: "circle.yml#unit", height: 640 }
tasks:
  - starter: "circle.yml#unit"
    hint: "Diameter 1 means radius 0.5."
    check: { type: board, text: "Roll out a circle with diameter 1 cm. How long is its circumference?", when: "d = 1 and o = 1", explain: "3.14 cm: a circle 1 across is π round." }
  - check:
      type: answer
      q: "A bin lid measures circumference 47.1 cm and diameter 15 cm. What is C ÷ d?"
      answer: "3.14"
      feedback:
        - ["32.1", "That subtracts. Divide."]
      explain: "47.1 ÷ 15 = 3.14."
  - check:
      type: question
      q: "A round pond is 2 m across. About how far is it round?"
      options: ["About 6.3 m", "About 4 m", "About 2 m", "About 12 m"]
      answer: 0
      feedback: [null, "That is 2 diameters. Round is just over 3.", "That is the diameter.", "That uses 6 diameters."]
      explain: "C ≈ 3.14 × 2 = 6.28 m."
  - check:
      type: question
      q: "Edge case: is π bigger for a bigger circle?"
      options: ["No: π is the same for every circle", "Yes: a bigger circle has a longer circumference", "Only for circles over 1 m"]
      answer: 0
      feedback: [null, "C is bigger, but so is d, by the same factor.", "Every circle gives the same C ÷ d."]
      explain: "Double the diameter and the circumference doubles too, so C ÷ d stays π."
```

### Diameter 1

Each task changes one thing.

### π from a measurement

### A quick estimate

### Bigger circles

## Practise: π

```step
stage: practise
insight: "Estimating and working out circumferences and the meaning of π, mixed; π as exact is the planted slip; the review keeps radius and diameter fresh."
tasks:
  - check:
      type: question
      q: "Using π ≈ 22/7, about how long is the circumference of a circle with diameter 7 cm?"
      options: ["22 cm", "14 cm", "7 cm", "49 cm"]
      answer: 0
      feedback: [null, "That is 2 diameters.", "That is the diameter.", "That is 7 × 7."]
      explain: "22/7 × 7 = 22 cm."
  - check:
      type: number
      q: "A circle has circumference 31.4 cm. Using π ≈ 3.14, what is its diameter, in cm?"
      answer: 10
      tolerance: 0.05
      explain: "C ÷ π = d: 31.4 ÷ 3.14 = 10 cm."
  - check:
      type: question
      q: "Which is true?"
      options: ["π is a little more than 3.14", "π is exactly 3.14", "π is exactly 22/7", "π is 3"]
      answer: 0
      feedback: [null, "3.14 is π rounded.", "22/7 = 3.1428…, a little more than π.", "3 is a rough estimate."]
      explain: "π = 3.14159…: a little more than 3.14, a little less than 22/7."
  - check:
      type: answer
      q: "Review: a circle has diameter 14 cm. What is its radius, in cm?"
      answer: "7"
      feedback:
        - ["28", "That doubles."]
      explain: "14 ÷ 2 = 7 cm."
```

### 22/7

### Backwards: the diameter

### What π is

### Review: radius

## Make: a circumference between 12 and 13

```step
stage: make
insight: "Searching for a circle with a circumference in a given range uses C ≈ 3.14d backwards as a prediction, checked by rolling."
try: { playground: board, starter: "circle.yml#unit", height: 640 }
hint: ["12 ÷ 3.14 is about 4. What radius gives diameter 4?", "Predict first, then roll to check."]
check: { type: board, text: "Find and roll out a circle whose circumference is between 12 cm and 13 cm.", when: "c > 12 and c < 13 and o = 1", explain: "Diameter 4 cm (radius 2): C = π × 4 ≈ 12.57 cm (3.14 × 4 = 12.56)." }
```

Predict the diameter before you roll.
