---
order: 17
unit: placevalue
node: [AC9M7N03 n1, AC9M7N03 n2]
uses: [AC9M7N02 n1]   # exponent notation and powers of 10 (Powers)
title: Place value and powers of 10
summary: "Each place value column is a power of 10: the thousands column is 10³, the ones column is 10⁰ = 1. So 4052 = 4 × 10³ + 5 × 10¹ + 2 × 10⁰."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The 4 in 4052 is worth 4000, but the 5 is worth only 50. What does the column a digit sits in do to its value?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8287
  url: http://127.0.0.1:8287/index.html
  readySelector: ".pvcol button"
  layout: full
explainPicture: { ref: pv.yml#explain-pic, caption: "4052 on the columns: 4 × 10³ + 0 × 10² + 5 × 10¹ + 2 × 10⁰. The 0 is a column with nothing in it." }
explainClip:
  query: { code: "@pv.yml#explain", fresh: 1, id: explain }
  caption: "Digits and powers of 10"
  say: "Each column has a power of ten."
  clip:
    - caption: { text: "The 4 sits in the thousands: 4 × 10³.", say: "The four sits in the thousands column." }
    - click: Add one thousand (10 to the power 3)
    - click: Add one thousand (10 to the power 3)
    - click: Add one thousand (10 to the power 3)
    - click: Add one thousand (10 to the power 3)
    - expect: { selector: "#gsum", contains: "4 × 10³" }
    - wait: 600
    - caption: { text: "Add 5 tens: 5 × 10¹.", say: "Five tens is five times ten to the one." }
    - click: Add one ten (10 to the power 1)
    - click: Add one ten (10 to the power 1)
    - click: Add one ten (10 to the power 1)
    - click: Add one ten (10 to the power 1)
    - click: Add one ten (10 to the power 1)
    - expect: { selector: "#gsum", contains: "5 × 10¹" }
    - wait: 600
    - caption: { text: "Add up the terms: 4000 + 50 = 4050.", say: "Add up the terms to get the number." }
    - wait: 1400
---
You already know that the 5 in 4052 is worth 50, not 5. A number is built from its digits, each worth *digit × its column*. Every column is ten times the one to its right, so every column is a **power of 10**:

| Column | ones | tens | hundreds | thousands | ten thousands |
| --- | --- | --- | --- | --- | --- |
| Power of 10 | $10^0$ | $10^1$ | $10^2$ | $10^3$ | $10^4$ |
| Value | 1 | 10 | 100 | 1000 | 10 000 |

The exponent counts the zeros in the value: $10^3 = 1000$ has three zeros. Writing a number as a sum of *digit × power of 10* is called **expanded notation**.

## Predict: how much is 10³?

```step
stage: predict
insight: "Committing to a value for 10³ shows whether they read the exponent as a multiplier (30) or as the number of zeros (1000)."
check:
  type: predict
  q: "What is $10^3$?"
  options: ["1000", "30", "100", "10 000"]
  actual: "1000. 10³ = 10 × 10 × 10: three 10s multiplied, so 1 followed by three zeros. 30 is 10 × 3."
```

How many zeros does $10^6$ have?

## Run: build 4052

```step
stage: run
insight: "Raising the thousands digit to 4 and the tens digit to 5 shows each digit multiplied by its column's power of 10, and the empty hundreds column left as 0."
try: { playground: board, starter: "pv.yml#run", height: 460 }
check: { type: board, text: "Build 4052: 4 thousands, no hundreds, 5 tens and 2 ones. Which power of 10 goes with the 5?", when: "n = 4052", explain: "4052 = 4 × 10³ + 5 × 10¹ + 2 × 10⁰. The 5 is in the tens column, so its power is 10¹. The hundreds column holds a 0, so it adds nothing." }
```

Each column's number is its digit times its power of 10.

## Investigate: columns and powers

```step
stage: investigate
insight: "The exponent is the column's position counting from 0 at the ones; Sam counts from 1 and every power is one too big. 10⁰ = 1 is the ones column, one 10 to no power."
tasks:
  - check:
      type: answer
      q: "In 4052, the 5 is in the tens column. What is the exponent of its power of 10? (The 5 is worth $5 \\times 10^{?}$.)"
      answer: "1"
      feedback:
        - ["2", "10² is the hundreds column. The tens are one column left of the ones."]
        - ["0", "10⁰ is the ones column. Tens come next."]
        - ["10", "10 is the value of the column; the exponent is the small number: 10 = 10¹."]
      explain: "The ones column is 10⁰, the tens column 10¹, the hundreds 10². So 5 tens is 5 × 10¹ = 50."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam writes 4052 in expanded notation. Click the line where the working first goes wrong."
      answer: 4
      fault: logic
      misconception: power-off-by-one
      explain: "Line 4: the tens column is 10¹, not 10². Sam counted the ones column as 10¹. The ones column is 10⁰."
  - check:
      type: question
      q: "Why is $10^0 = 1$?"
      options: ["It is the ones column: 1 one, so the power is 1", "Any number to the power 0 is 0", "10⁰ means 10 × 0", "It is not allowed"]
      answer: 0
      feedback: [null, "Anything to the power 0 is 1, not 0. Here the pattern shows why: 10³ = 1000, 10² = 100, 10¹ = 10, 10⁰ = 1.", "The exponent counts how many 10s are multiplied; it is not a multiplier.", "It is allowed, and it is the ones column."]
      explain: "Each step down divides by 10: 1000, 100, 10, then 1. So 10⁰ = 1, the value of the ones column."
```

### Read the powers

The board shows the columns. Here is 4052 written out.

```worked
4052 = 4000 + 0 + 50 + 2 :: Each digit is worth its digit times its column.
4000 = 4 \times 1000 = 4 \times 10^3 :: The thousands column is 10³.
50 = 5 \times 10 = 5 \times 10^1 :: The tens column is 10¹.
2 = 2 \times 1 = 2 \times 10^0 :: The ones column is 10⁰.
4052 = 4 \times 10^3 + 5 \times 10^1 + 2 \times 10^0 :: The 0 in the hundreds adds nothing, so we leave it out.
```

Now try one: which power goes with the 5?

### Find the mistake

Count the columns from the ones, which is 0.

### Why 10⁰?

## Modify: build, read, convert

```step
stage: modify
insight: "Building a number with gaps, reading the value of a digit, converting expanded notation back, and shifting by ×10 or ×100 connect the exponent to the number of zeros."
try: { playground: board, starter: "pv.yml#modify", height: 460 }
tasks:
  - check: { type: board, text: "Build a number with a 6 in the ten thousands column and a 9 in the ones column, and zeros between.", when: "n = 60009", explain: "60 009 = 6 × 10⁴ + 9 × 10⁰." }
  - check:
      type: answer
      q: "Write $7 \\times 10^4 + 2 \\times 10^2 + 5$ as a number."
      answer: "70205"
      feedback:
        - ["7205", "7 × 10⁴ is 70 000, not 7000. Check the zeros: four of them."]
        - ["72 005", "Check the 2: 2 × 10² is 200, not 2000."]
      explain: "70 000 + 200 + 5 = 70 205. The empty tens column is a 0."
  - check:
      type: answer
      q: "In 380 000, the 8 is worth $8 \\times 10^{?}$. What is the exponent?"
      answer: "4"
      feedback:
        - ["3", "10³ is the thousands. The 8 is in the ten thousands."]
        - ["5", "10⁵ is the hundred thousands; that is where the 3 is."]
        - ["80000", "That is the value, 8 × 10⁴. The exponent is 4."]
      explain: "The 3 is in the hundred thousands (10⁵) and the 8 in the ten thousands (10⁴): 380 000 = 3 × 10⁵ + 8 × 10⁴."
  - check: { type: board, text: "Build 345, then press × 10 twice. What number do you get, and what happened to each digit?", when: "n = 34500", explain: "345 × 100 = 34 500. Every digit moved two columns left, so each power of 10 went up by 2, and two zeros filled the gaps." }
```

### Far apart

### Back to a number

### Which exponent?

### Shift the digits

## Practise: expanded notation

```step
stage: practise
insight: "The value of a digit, the number from its expanded notation, and why times 100 adds two zeros; the review keeps powers fresh."
tasks:
  - check:
      type: answer
      q: "What is the value of the 2 in 52 300?"
      answer: "2000"
      feedback:
        - ["2", "That is the digit. Its value depends on the column."]
        - ["200", "The 3 is in the hundreds; the 2 is one column left, the thousands."]
      explain: "The 2 is in the thousands column: 2 × 10³ = 2000."
  - check:
      type: answer
      q: "Write $6 \\times 10^5 + 4 \\times 10^2$ as a number."
      answer: "600400"
      feedback:
        - ["64", "Do not add the digits: 6 × 10⁵ = 600 000 and 4 × 10² = 400."]
        - ["60400", "6 × 10⁵ has five zeros: 600 000."]
      explain: "600 000 + 400 = 600 400."
  - check:
      type: question
      q: "Why is $6300 \\times 100$ the same as $6300 \\times 10^2$, and why is it easy?"
      options: ["10² = 100, and × 10² moves every digit two columns left (add two zeros)", "× 10² means × 10 × 2 = × 20", "10² = 20, so it doubles", "It is not the same"]
      answer: 0
      feedback: [null, "10² is 10 × 10 = 100, not 10 × 2.", "10² is 10 × 10 = 100.", "10² = 100, so they are the same."]
      explain: "10² = 100. Multiplying by 100 moves each digit two columns left: 630 000."
  - check:
      type: answer
      q: "Review: what is $2^5$?"
      answer: "32"
      feedback:
        - ["10", "That is 2 × 5. 2⁵ is five 2s multiplied."]
      explain: "2 × 2 × 2 × 2 × 2 = 32."
  - check:
      type: answer
      q: "Write 3 000 000 as $3 \\times 10^{?}$. What is the exponent?"
      answer: "6"
      feedback:
        - ["7", "3 000 000 has six zeros, so the power is 10⁶. Millions are 10⁶, ten millions 10⁷."]
        - ["3", "10³ is the thousands. Count the zeros: six."]
      explain: "The exponent counts the zeros: 3 000 000 = 3 × 10⁶, and 10⁶ is the millions column."
```

### The value of a digit

### Back to a number

### Times 100

### Review: powers

### Millions

## Make: three terms

```step
stage: make
insight: "Building any number with exactly three non-zero terms and a top power of 10⁴ shows that the top term decides the size and the zeros are columns."
try: { playground: board, starter: "pv.yml#make", height: 460 }
hint: ["The top power is 10⁴, so the first digit is in the ten thousands column.", "Three columns with digits and two with 0."]
check: { type: board, text: "Build a number with three digits that are not 0, and a top power of 10⁴.", when: "z = 3 and t = 4", explain: "For example 30 502 = 3 × 10⁴ + 5 × 10² + 2 × 10⁰." }
```

Then read your number out in expanded notation.
