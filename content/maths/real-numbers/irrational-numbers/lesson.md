---
order: 3
unit: irrational
node: AC9M8N01 n1
uses: [AC9M8N03 n1, AC9M7N01 n1]
title: Irrational numbers
summary: "A rational number is a fraction: its decimal stops or repeats. An irrational number cannot be written as a fraction: its decimal never stops and never repeats. √2, √3 and π are irrational; √16 = 4 is not."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The diagonal of a 1 m square tile is exactly √2 metres long. You can measure it, but you can never write it down as a fraction or a decimal that ends."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8312
  url: http://127.0.0.1:8312/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: zoom.yml#explain-pic, caption: "π = 3.14159…: zoom in as far as you like, the digits never stop and never settle into a repeat." }
explainClip:
  query: { code: "@zoom.yml#explain", fresh: 1, id: explain }
  caption: "Zooming in on √2"
  say: "Each zoom finds one more digit."
  clip:
    - caption: { text: "√2 is between 1 and 2: 1² = 1 and 2² = 4.", say: "Root two is between one and two." }
    - click: Between 1 and 2
    - wait: 800
    - caption: { text: "Zoom in: 1.4² = 1.96 and 1.5² = 2.25, so it is between 1.4 and 1.5.", say: "Zoom in. Between one point four and one point five." }
    - click: Between 1.4 and 1.5
    - wait: 800
    - caption: { text: "And again: it never stops.", say: "And again. It never stops." }
    - click: Between 1.41 and 1.42
    - expect: { selector: "#gsum", contains: "1.41" }
    - wait: 1500
---
A **rational** number can be written as a fraction $\frac{a}{b}$ of integers (whole numbers or their negatives, with $b \ne 0$): 0.25, $\frac{1}{7}$, −3, $0.\overline{3}$. Its decimal **terminates** or **recurs**.

An **irrational** number cannot be written as a fraction. Its decimal goes on **forever without repeating**. Examples: $\sqrt{2} = 1.41421356\ldots$, $\sqrt{3}$, $\sqrt{5}$, and $\pi = 3.14159265\ldots$ The square root of a whole number is irrational unless the number is a perfect square: $\sqrt{16} = 4$ is rational.

Irrational numbers are ordinary numbers you can calculate with; we use the exact form ($\sqrt{2}$, $\pi$) or a rounded value (1.414, 3.14).

## Predict: the digits of √2

```step
stage: predict
insight: "Committing to whether √2's digits stop or repeat shows whether they expect every number to be a neat fraction."
check:
  type: predict
  q: "√2 = 1.414… Do its digits ever stop, or settle into a repeating block?"
  options: ["Neither: they go on forever without repeating", "They stop after a few more digits", "They repeat, like 1/7"]
  actual: "Neither. √2 is irrational: no fraction equals it, so its decimal can never stop or repeat."
```

## Run: zoom in on √2

```step
stage: run
insight: "Finding √2 one digit at a time, with the squares as evidence, shows the process never has to end."
try: { playground: board, starter: "zoom.yml#run", height: 520 }
check: { type: board, text: "Find the first 3 decimal digits of √2 by zooming in. Was your prediction right?", when: "d = 1", explain: "√2 = 1.414… and the board shows more digits: 1.414213562…, never stopping or repeating." }
```

Press the piece of the line that √2 is in. A wrong piece shows you the squares of its ends.

## Investigate: rational or irrational

```step
stage: investigate
insight: "Sorting by the decimal's behaviour; perfect squares are rational (Ana calls every root irrational); irrational numbers are usable numbers."
tasks:
  - check:
      type: sort
      q: "Rational or irrational?"
      options: ["Rational", "Irrational"]
      items:
        - ["1/7", "Rational"]
        - ["0.25", "Rational"]
        - ["√9", "Rational", "√9 = 3."]
        - ["√5", "Irrational"]
        - ["π", "Irrational"]
        - ["0.333…", "Rational", "It is 1/3."]
        - ["22/7", "Rational", "A fraction, close to π but not π."]
      explain: "Fractions, and decimals that stop or repeat, are rational; √5 and π are not."
  - check:
      type: bug
      code: "working.txt#ana"
      text: "Ana sorts √16. Click the line where her reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: root-always-irrational
      explain: "Line 3: √16 = 4, a whole number, so it is rational. Only roots of numbers that are not perfect squares are irrational."
  - check:
      type: question
      q: "Can you calculate with irrational numbers?"
      options: ["Yes: use the exact form (√2, π) or a rounded value (1.414, 3.14)", "No: they never end", "Only with a calculator that has infinite digits", "Only if you round them to whole numbers"]
      answer: 0
      feedback: [null, "We use them all the time, for example C = πd.", "Rounded values are good enough for measuring.", "Rounding to whole numbers loses too much."]
      explain: "Irrational does not mean unusable: π and √2 are exact numbers with endless decimals."
```

### Sort them

Here is the routine.

```worked
\text{a fraction?} :: Yes: rational.
\text{decimal stops or repeats?} :: Yes: rational (it is a fraction).
\sqrt{n},\ n \text{ a perfect square?} :: √16 = 4: rational. √15: irrational.
\pi,\ \sqrt{2},\ \sqrt{3} :: Never stop, never repeat: irrational.
```

### Find the mistake

Read Ana's working. What is √16?

### Using them

## Modify: other numbers

```step
stage: modify
insight: "Zooming in on √3 and 1/7 compares an irrational number with a repeating one; π and 22/7 differ; irrationals can combine to a rational."
try: { playground: board, starter: "zoom.yml#sqrt3", height: 520 }
tasks:
  - starter: "zoom.yml#sqrt3"
    hint: "1.7² = 2.89 and 1.8² = 3.24."
    check: { type: board, text: "Find the first 3 decimal digits of √3.", when: "d = 1", explain: "√3 = 1.732…, endless and not repeating." }
  - starter: "zoom.yml#seventh"
    check: { type: board, text: "Zoom in on 1/7 to 6 places. What do its digits do?", when: "d = 1", explain: "1/7 = 0.142857 142857…: they repeat, so 1/7 is rational." }
  - check:
      type: question
      q: "Is π equal to 22/7?"
      options: ["No: 22/7 = 3.142857… repeats; π = 3.14159… does not", "Yes, exactly", "Yes, to 5 decimal places", "Only for big circles"]
      answer: 0
      feedback: [null, "22/7 is a fraction; π is not.", "They differ in the third decimal place.", "π is the same for every circle."]
      explain: "22/7 is a close rational approximation of the irrational π."
  - check:
      type: question
      q: "√2 × √2 = 2. What does this show?"
      options: ["Two irrational numbers can multiply to a rational number", "√2 is rational", "2 is irrational", "Multiplying irrational numbers is not allowed"]
      answer: 0
      feedback: [null, "√2 is still irrational.", "2 = 2/1, a fraction.", "It is allowed."]
      explain: "By definition √2 × √2 = 2, a rational number."
```

### Root 3

### One seventh

### π and 22/7

### Root 2 squared

## Practise: rational or irrational

```step
stage: practise
insight: "Classifying and using roots and decimals, mixed; calling every root irrational is the planted slip; the square root review keeps perfect squares fresh."
tasks:
  - check:
      type: question
      q: "Which number is irrational?"
      options: ["√10", "√25", "0.121212…", "3/11"]
      answer: 0
      feedback: [null, "√25 = 5.", "It repeats: a fraction.", "A fraction is rational."]
      explain: "10 is not a perfect square, so √10 is irrational."
  - check:
      type: question
      q: "Which number is rational?"
      options: ["√36", "√7", "π", "√2"]
      answer: 0
      feedback: [null, "7 is not a perfect square.", "π never stops or repeats.", "2 is not a perfect square."]
      explain: "√36 = 6."
  - check:
      type: question
      q: "A decimal goes on forever without repeating. What kind of number is it?"
      options: ["Irrational", "Rational", "Recurring", "A whole number"]
      answer: 0
      feedback: [null, "Rational decimals stop or repeat.", "Recurring means it repeats.", "Whole numbers have no decimal part."]
      explain: "Never stopping and never repeating means irrational."
  - check:
      type: number
      q: "Review: what is √49?"
      answer: 7
      tolerance: 0
      explain: "7 × 7 = 49."
```

### Irrational

### Rational

### Never repeats

### Review: square roots

## Make: π

```step
stage: make
insight: "Finding π to 4 places with only 'too big, too small' feedback applies the zooming method to a number with no squares to help."
try: { playground: board, starter: "zoom.yml#pi", height: 520 }
hint: ["π is a little more than 3.", "Its first two decimal digits are 14."]
check: { type: board, text: "Find the first 4 decimal digits of π.", when: "d = 1", explain: "π = 3.1415… and on: never stopping, never repeating. Rounded to 4 decimal places it is 3.1416." }
```

Then explain why 3.1416 is not exactly π.
