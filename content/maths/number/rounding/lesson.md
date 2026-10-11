---
order: 18
unit: placevalue
node: [AC9M7N05 n1, AC9M7N05 n2]
uses: [AC9M7N03 n1]   # the place value columns (Place value and powers of 10)
title: Rounding decimals
summary: "3.746 to 2 decimal places is 3.75: look at the next digit, 6, and round up. How much to round depends on what the number is for."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A stopwatch says 12.846 seconds. Do you report 12.846, 12.85, 12.8 or 13? It depends who is asking, and what the timer can really measure."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8288
  url: http://127.0.0.1:8288/index.html
  readySelector: "#sl-d"
  layout: full
explainPicture: { ref: rd.yml#explain-pic, caption: "3.746 sits between 3.74 and 3.75. It is past the halfway mark 3.745, so it rounds up to 3.75." }
explainClip:
  query: { code: "@rd.yml#explain", fresh: 1, id: explain }
  caption: "Rounding on a number line"
  say: "Rounding picks the nearer end."
  clip:
    - caption: { text: "To 3 places, 3.746 is exact.", say: "To three places, nothing changes." }
    - wait: 800
    - click: Make the decimal places smaller
    - expect: { selector: "#gsum", contains: "is 3.75" }
    - caption: { text: "To 2 places it is past halfway: up to 3.75.", say: "To two places it is past halfway, so it goes up." }
    - wait: 1400
    - click: Make the decimal places smaller
    - expect: { selector: "#gsum", contains: "is 3.7" }
    - caption: { text: "To 1 place: 3.7.", say: "To one place the next digit is four, so it stays." }
    - wait: 1400
---
To **round** a decimal to a number of **decimal places**, find the two numbers with that many places that it sits between, and pick the nearer one. The shortcut is to look at *one* digit, the one straight after the place you are rounding to:

- 5 or more: round **up**.
- 4 or less: round **down** (the digits stay).

So 3.746 to 2 decimal places: the digit after the hundredths is 6, so round up to 3.75. A number exactly halfway rounds up.

## Predict: round 3.746

```step
stage: predict
insight: "Committing to an answer shows whether they cut the digits off (3.74), look at the right digit (3.75) or round the wrong place (3.7)."
check:
  type: predict
  q: "Round 3.746 to 2 decimal places."
  options: ["3.75", "3.74", "3.7", "3.8"]
  actual: "3.75. The digit after the hundredths is 6, so the 4 goes up to 5. 3.74 cuts the digits off."
```

Which two numbers with 2 decimal places is 3.746 between?

## Run: where does it sit?

```step
stage: run
insight: "Seeing 3.746 on a line between 3.74 and 3.75, past the halfway mark, shows why the next digit decides: 5 or more is past halfway."
try: { playground: board, starter: "rd.yml#run", height: 420 }
check: { type: board, text: "Set the decimal places to 2. Is 3.746 before or past the halfway mark? What does it round to?", when: "d = 2 and r = 3.75", explain: "3.746 is past the halfway mark 3.745, so it is nearer 3.75: it rounds to 3.75." }
```

Change the decimal places and watch the line: the two ends are always the nearest numbers with that many places.

## Investigate: one digit decides

```step
stage: investigate
insight: "Only the digit straight after the place matters; Kai rounds the 9 into the 4 and then again. Halfway rounds up."
tasks:
  - check:
      type: answer
      q: "Round 8.372 to 1 decimal place."
      answer: "8.4"
      feedback:
        - ["8.3", "That cuts the digits off. The next digit is 7, so the 3 rounds up."]
        - ["8.37", "That is 2 decimal places. Round to 1."]
      explain: "The digit after the tenths is 7, so round up: 8.4."
  - check:
      type: bug
      code: "working.txt#kai"
      text: "Kai rounds 2.349 to 1 decimal place. Click the line where the working goes wrong."
      answer: 2
      fault: logic
      misconception: round-double
      explain: "Line 2: only the digit straight after the tenths matters, and that is 4, so round down. Kai let the 9 push the 4 up, then rounded again. 2.349 to 1 decimal place is 2.3."
  - check:
      type: question
      q: "Round 6.45 to 1 decimal place."
      options: ["6.5", "6.4", "6.45", "6.0"]
      answer: 0
      feedback: [null, "6.45 is exactly halfway between 6.4 and 6.5, and the rule rounds halfway up.", "That is not rounded: it still has 2 decimal places.", "6.0 has 1 decimal place but is nowhere near: 6.45 is between 6.4 and 6.5."]
      explain: "The next digit is 5, exactly halfway, and halfway rounds up: 6.5."
```

### Round it

Look at the digit after the place you are rounding to.

### Find the mistake

### Halfway

## Modify: how much is enough?

```step
stage: modify
insight: "The right amount of rounding depends on the job: a timer, a purchase and a ruler each suggest a different place, and sometimes 'enough' means always round up."
try: { playground: board, starter: "rd.yml#modify", height: 420 }
tasks:
  - check: { type: board, text: "A stopwatch gives 12.846 seconds. Round it to the nearest tenth of a second.", when: "d = 1 and r = 12.8", explain: "12.846 to 1 decimal place is 12.8: the next digit is 4." }
  - check:
      type: question
      q: "A painter needs 14.2 m² of coverage. One tin covers 4 m², so 14.2 ÷ 4 = 3.55 tins. How many tins should she buy?"
      options: ["4", "3.55", "3.6", "3"]
      answer: 0
      feedback: [null, "You cannot buy 0.55 of a tin.", "Tins are whole, and 3.6 would still leave the wall short.", "Standard rounding gives 4, but 3 tins would leave some wall unpainted."]
      explain: "Here you round up to the next whole tin: 4, so that there is enough."
  - check:
      type: question
      q: "A shop's total is $7.499. What is charged, to the nearest cent?"
      options: ["$7.50", "$7.49", "$7.40", "$7.499"]
      answer: 0
      feedback: [null, "The next digit after the cents is 9, so the 49 cents rounds up to 50 cents.", "That cuts off the cents instead of rounding them. Cents are 2 decimal places.", "A till cannot charge part of a cent."]
      explain: "Cents are 2 decimal places. The digit after is 9, so 7.49 goes up to 7.50."
  - check:
      type: question
      q: "A ruler marked in millimetres measures a pencil. The calculator gives 14.2857 cm. Which is the most sensible way to report it?"
      options: ["14.3 cm, to the nearest millimetre", "14.2857 cm", "14 cm", "14.29 cm"]
      answer: 0
      feedback: [null, "A ruler cannot show a ten-thousandth of a centimetre; the extra digits claim accuracy we do not have.", "That throws away accuracy the ruler does have: it can show tenths of a centimetre.", "14.29 claims to be accurate to 0.01 cm, finer than the millimetres on the ruler."]
      explain: "One millimetre is 0.1 cm, so the ruler supports 1 decimal place: 14.3 cm."
```

### The stopwatch

### Enough paint

### Dollars and cents

### The ruler

## Practise: rounding

```step
stage: practise
insight: "Rounding to 3 places, to the cent in a share, and rounding to 2 places where the next digit is small; the review keeps place value fresh."
tasks:
  - check:
      type: answer
      q: "Round 5.0763 to 3 decimal places."
      answer: "5.076"
      feedback:
        - ["5.08", "That is 2 decimal places. Count to the thousandths."]
        - ["5.077", "The next digit is 3, so the 6 stays."]
      explain: "The digit after the thousandths is 3, so 5.076."
  - check:
      type: answer
      q: "Round 7.0449 to 2 decimal places."
      answer: "7.04"
      feedback:
        - ["7.05", "Only the digit straight after the hundredths counts: it is 4, so the 4 stays. The 9 does not push it up."]
      explain: "The next digit is 4, so 7.04."
  - check:
      type: answer
      q: "Three friends share a $50 bill: $50 ÷ 3 = 16.666… Each pays this much, to the nearest cent. (Write it as 16.xx.)"
      answer: "16.67"
      feedback:
        - ["16.66", "That cuts the digits off. The next digit is 6, so round up."]
      explain: "Cents are 2 decimal places. The next digit is 6, so 16.67."
  - check:
      type: answer
      q: "Review: write $3 \\times 10^2 + 5 \\times 10^0$ as a number."
      answer: "305"
      feedback:
        - ["35", "3 × 10² is 300, not 30."]
      explain: "300 + 5 = 305. The tens column is 0."
```

### Three places

### The 9 does not count

### Share the bill

### Review: powers of 10

## Make: lands on 4.57

```step
stage: make
insight: "Finding a number that rounds to 4.57 shows a whole range of numbers, 4.565 up to just under 4.575, round to the same value."
try: { playground: board, starter: "rd.yml#make", height: 420 }
hint: ["It must be nearer 4.57 than 4.56 or 4.58.", "Try 4.568."]
check: { type: board, text: "Set the number so that, to 2 decimal places, it rounds to 4.57.", when: "d = 2 and r = 4.57", explain: "Any number from 4.565 to 4.5749… rounds to 4.57, for example 4.568 or 4.571." }
```

Then find the smallest number you can that still rounds to 4.57.
