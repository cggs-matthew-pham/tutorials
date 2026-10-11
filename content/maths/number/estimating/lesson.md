---
order: 19
unit: placevalue
node: AC9M7N05 n3
uses: [AC9M7N05 n1]   # rounding (Rounding decimals)
title: Estimating to check
summary: "Round each number to its first digit, then calculate: 38 × 52 ≈ 40 × 50 = 2000. If the calculator says 197.6 or 19 760, something slipped."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "You type 3.2 × 48 and the calculator shows 15.36. Looks plausible. But before you trust it, how big should the answer be?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8289
  url: http://127.0.0.1:8289/index.html
  readySelector: "#sl-a"
  layout: full
explainPicture: { ref: es.yml#explain-pic, caption: "38 × 52 ≈ 40 × 50 = 2000. The exact answer 1976 is close, so it is reasonable." }
explainClip:
  query: { code: "@es.yml#explain", fresh: 1, id: explain }
  caption: "An estimate and the exact answer"
  say: "Round first, then calculate."
  clip:
    - caption: { text: "38 rounds to 40 and 52 to 50.", say: "Round each number to its first digit." }
    - wait: 1200
    - caption: { text: "40 × 50 = 2000 in your head.", say: "Forty times fifty is two thousand." }
    - wait: 1200
    - click: Make the first number bigger
    - expect: { selector: "#gsum", contains: "≈ 40 × 50" }
    - caption: { text: "Exact is close to the estimate: reasonable.", say: "The exact answer is close, so it is reasonable." }
    - wait: 1400
---
An **estimate** is a quick answer that is close, found by rounding the numbers to something easy. A good habit: round each number to its **first digit** (keep its size), do the easy calculation, and compare with the real answer.

$$38 \times 52 \approx 40 \times 50 = 2000$$

If the exact answer is near the estimate, it is **reasonable**. If it is ten times too big or too small, check the decimal point.

## Predict: estimate 38 × 52

```step
stage: predict
insight: "Committing to an estimate shows whether they round to the first digit and keep the size (2000), lose a zero (200) or gain one (20 000)."
check:
  type: predict
  q: "Which is the best estimate for $38 \\times 52$?"
  options: ["2000", "200", "20 000", "90"]
  actual: "2000. 38 is about 40 and 52 is about 50, and 40 × 50 = 2000. 90 is 38 + 52."
```

Is the exact answer going to be a bit more or a bit less than 2000? Why?

## Run: estimate and exact

```step
stage: run
insight: "Moving a and b shows the estimate (rounded numbers) staying close to the exact answer, and both bars the same size."
try: { playground: board, starter: "es.yml#run", height: 420 }
check: { type: board, text: "Set a = 49 and b = 21. What is the estimate? Is it more or less than the exact answer?", when: "a = 49 and b = 21", explain: "49 ≈ 50 and 21 ≈ 20, so the estimate is 50 × 20 = 1000. The exact answer is 1029, a little more." }
```

The orange bar is the estimate, the blue bar the exact answer. They are nearly the same length.

## Investigate: estimates catch slips

```step
stage: investigate
insight: "Keeping the size of each rounded number (19.6 is 20, not 2) is the whole skill; an estimate of the wrong size cannot catch a decimal slip."
tasks:
  - check:
      type: answer
      q: "Estimate $6.8 \\times 31$ by rounding each number to its first digit."
      answer: "210"
      feedback:
        - ["21", "6.8 is about 7 and 31 is about 30. 7 × 30 = 210, not 21."]
        - ["200", "Round each number: 7 × 30 = 210."]
      explain: "6.8 ≈ 7 and 31 ≈ 30, so 7 × 30 = 210."
  - check:
      type: bug
      code: "working.txt#lina"
      text: "Lina estimates 19.6 × 4.1. Click the line where her working goes wrong."
      answer: 2
      fault: logic
      misconception: est-zero-slip
      explain: "Line 2: 19.6 is about 20, not 2: rounding keeps the size. 20 × 4 = 80, so 19.6 × 4.1 is about 80."
  - check:
      type: question
      q: "You type $3.2 \\times 48$ and the calculator shows 15.36. Is that reasonable?"
      options: ["No: 3 × 50 = 150, so the decimal point is in the wrong place", "Yes: 3 × 5 = 15 is close", "Yes: a calculator is always right", "No: the answer should be a whole number"]
      answer: 0
      feedback: [null, "3 × 5 is 15, but 48 is about 50, not 5. The size is wrong.", "A calculator does what you typed, so a slip when typing still gives a wrong answer.", "Decimals times whole numbers can be any kind of number."]
      explain: "3.2 × 48 ≈ 3 × 50 = 150. The real answer is 153.6: the calculator shows 15.36 only if the 3.2 was typed as 0.32."
```

### Round, then calculate

Round each number to its first digit.

### Find the mistake

### Is it reasonable?

## Modify: other operations, other sizes

```step
stage: modify
insight: "Estimating works for adding, dividing and with decimals; an estimate can be above or below the exact answer."
try: { playground: board, starter: "es.yml#plus", height: 420 }
tasks:
  - check: { type: board, text: "Estimate 387 + 512 by rounding to the first digit. Set a near 387 and b near 512: what is the estimate?", when: "s = 900", explain: "387 ≈ 400 and 512 ≈ 500, so the estimate is 900. The exact answer is 899." }
  - check:
      type: answer
      q: "Estimate $4.9 \\times 81$."
      answer: "400"
      feedback:
        - ["40", "5 × 80 = 400, not 40: keep the size of each number."]
        - ["4000", "5 × 80 is 400. Count the zeros."]
      explain: "4.9 ≈ 5 and 81 ≈ 80, so 5 × 80 = 400."
  - check:
      type: answer
      q: "Estimate $612 \\div 29$."
      answer: "20"
      feedback:
        - ["200", "600 ÷ 30 = 20. Count the zeros."]
        - ["2", "600 ÷ 30 = 20, not 2."]
      explain: "612 ≈ 600 and 29 ≈ 30, so 600 ÷ 30 = 20."
  - check:
      type: question
      q: "Is an estimate always smaller than the exact answer?"
      options: ["No: 38 × 52 ≈ 2000, but the exact answer is 1976", "Yes: rounding always makes numbers smaller", "Yes: estimates are lower bounds", "No: an estimate is always bigger"]
      answer: 0
      feedback: [null, "Rounding can go up (38 to 40) or down (52 to 50).", "An estimate is neither a lower nor an upper limit.", "Sometimes it is smaller: 49 × 21 ≈ 1000, exact 1029."]
      explain: "Rounding goes up for some numbers and down for others, so an estimate can be above or below. What matters is that it is close."
```

### Add them

### Keep the size

### Divide

### Bigger or smaller?

## Practise: estimating

```step
stage: practise
insight: "Estimates for multiplying and for a decimal product, a calculator check with a division, and a rounding review."
tasks:
  - check:
      type: answer
      q: "Estimate $58 \\times 19$."
      answer: "1200"
      feedback:
        - ["120", "60 × 20 = 1200: count the zeros."]
        - ["77", "That is 58 + 19."]
      explain: "58 ≈ 60 and 19 ≈ 20, so 60 × 20 = 1200."
  - check:
      type: answer
      q: "Estimate $7.9 \\times 4.2$."
      answer: "32"
      feedback:
        - ["320", "8 × 4 = 32: 7.9 is about 8, not 80."]
      explain: "7.9 ≈ 8 and 4.2 ≈ 4, so 8 × 4 = 32."
  - check:
      type: question
      q: "The calculator shows $504 \\div 6.3 = 8$. Is that reasonable?"
      options: ["No: 500 ÷ 6 is about 80, so 8 has lost a zero", "Yes: 50 ÷ 6 is about 8", "Yes: 504 ÷ 6 is about 8", "No: you cannot divide by a decimal"]
      answer: 0
      feedback: [null, "50 ÷ 6 is about 8, but 504 is 500, not 50.", "504 ÷ 6 is 84, not 8.", "Dividing by a decimal is fine."]
      explain: "504 ÷ 6.3 = 80. Estimating 500 ÷ 6 ≈ 80 shows 8 has lost a zero."
  - check:
      type: answer
      q: "Review: round 6.45 to 1 decimal place."
      answer: "6.5"
      feedback:
        - ["6.4", "Halfway rounds up."]
      explain: "The next digit is 5, so 6.5."
```

### Two numbers

### A decimal times

### Check the calculator

### Review: rounding

## Make: close but under

```step
stage: make
insight: "Finding numbers whose estimate is exactly 2000 but whose exact product is less shows an estimate is a close value, not a bound."
try: { playground: board, starter: "es.yml#make", height: 420 }
hint: ["The estimate must be 40 × 50, so a is near 40 and b near 50.", "Try a = 38 and b = 52."]
check: { type: board, text: "Set a and b so that the estimate is exactly 2000 but the exact answer is less than 2000.", when: "s = 2000 and v < 2000", explain: "For example 38 × 52 = 1976: the estimate 40 × 50 = 2000 is a little bigger." }
```

Then find a pair where the exact answer is more than 2000, and write which rounding you used and why.
