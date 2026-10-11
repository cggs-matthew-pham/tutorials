---
order: 25
unit: modelling
node: AC9M8N05 n1
uses: [AC9M7N06 n3, AC9M7N09 n1]
title: Percentage change
summary: "An increase of p% multiplies by (1 + p/100); a decrease multiplies by (1 − p/100). One change after another means multiplying the multipliers, so up 20% then down 20% is × 1.2 × 0.8 = × 0.96: a 4% fall overall, not back to the start."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A shop puts a price up 20% in March and has a 20% sale in April. The sign says 'back to the old price'. Is it?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8316
  url: http://127.0.0.1:8316/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: change.yml#explain-pic, caption: "$100 up 20% is $120; then down 20% takes off 20% of $120 ($24), leaving $96." }
explainClip:
  query: { code: "@change.yml#explain", fresh: 1, id: explain }
  caption: "Up 20%, down 20%"
  say: "Does down twenty percent undo up twenty percent?"
  clip:
    - caption: { text: "$100 up 20%: × 1.2 gives $120.", say: "A hundred dollars up twenty percent is one hundred and twenty." }
    - wait: 1000
    - caption: { text: "Down 20% of $120 is $24 off: $96, not $100.", say: "Twenty percent of one twenty is twenty-four. That leaves ninety-six." }
    - click: Make the second change smaller
    - click: Make the second change smaller
    - click: Make the second change smaller
    - click: Make the second change smaller
    - expect: { selector: "#gsum", contains: "$96" }
    - wait: 1600
---
A percentage change is a multiplication by a **multiplier**:

- an **increase** of $p\%$: multiply by $1 + \frac{p}{100}$ (up 15%: × 1.15);
- a **decrease** of $p\%$: multiply by $1 - \frac{p}{100}$ (down 15%: × 0.85).

When one change follows another, the second is a percentage of the **new** amount, so multiply the multipliers: up 20% then down 20% is $1.2 \times 0.8 = 0.96$, a 4% decrease overall. Ask "a percentage of what?" every time.

## Predict: up then down

```step
stage: predict
insight: "Committing to the final price after up 10% then down 10% shows whether they take the second percentage of the new amount."
check:
  type: predict
  q: "A $100 price goes up 10%, then the new price goes down 10%. What is the final price?"
  options: ["$99", "$100", "$101", "$90"]
  actual: "$99. Up 10% makes $110. Then 10% of $110 is $11, so the price falls to $99."
```

## Run: two changes

```step
stage: run
insight: "Trying pairs of changes on the bars shows that equal percentages up and down do not cancel."
try: { playground: board, starter: "change.yml#run", height: 560 }
check: { type: board, text: "Set up 10%, then down 10%. Was your prediction right? Then try 20% each way.", when: "a = 10 and b = -10", explain: "1.1 × 0.9 = 0.99: $99, a 1% fall overall. 20% each way gives 1.2 × 0.8 = 0.96: $96." }
```

## Investigate: multipliers

```step
stage: investigate
insight: "Each change is a multiplier on the current amount (Sam takes 10% of the old price); the overall multiplier gives the overall change."
tasks:
  - check:
      type: number
      q: "What do you multiply by for a 15% increase?"
      answer: 1.15
      tolerance: 0
      feedback:
        - ["0.15", "That finds the increase only. Add it to the whole amount: 1 + 0.15."]
      explain: "100% + 15% = 115% = 1.15."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam works out the jacket's final price. Click the line where his working goes wrong."
      answer: 3
      fault: logic
      misconception: percent-wrong-base
      explain: "Line 3: the 10% decrease is 10% of the new price, $220, which is $22. The jacket costs $198."
  - check:
      type: question
      q: "A price is multiplied by 0.85. Has it gone up or down, and by how much?"
      options: ["Down 15%", "Up 85%", "Down 85%", "Up 15%"]
      answer: 0
      feedback: [null, "Less than 1 means it got smaller.", "It keeps 85%: it lost 15%.", "Multiplying by less than 1 makes it smaller."]
      explain: "0.85 = 85%: 15% has been taken off."
```

### Multipliers

Here is the routine.

```worked
\text{up } 20\% :: \times 1.2
\text{down } 20\% :: \times 0.8
1.2 \times 0.8 = 0.96 :: Multiply the multipliers.
0.96 = 96\% :: 4% less than the start: an overall decrease of 4%.
```

### Find the mistake

Read Sam's working. 10% of which price?

### Reading a multiplier

## Modify: back to the start, and discounts

```step
stage: modify
insight: "Finding a change that undoes another, comparing two discounts with one, and a mark-up show the multiplier model at work."
try: { playground: board, starter: "change.yml#free", height: 560 }
tasks:
  - starter: "change.yml#free"
    hint: ["Up 25% is × 1.25.", "What times 1.25 is 1? Try down 20%."]
    check: { type: board, text: "Go up 25%, then find the decrease that brings it back to exactly $100.", when: "a = 25 and y = 100", explain: "1.25 × 0.8 = 1: down 20% undoes up 25%." }
  - starter: "change.yml#free"
    check: { type: board, text: "Set two discounts of 20% in a row. Is that the same as 40% off?", when: "a = -20 and b = -20", explain: "0.8 × 0.8 = 0.64: 36% off, not 40%." }
  - check:
      type: number
      q: "A price goes up 50% and then down 50%. What is the overall percentage change? (A decrease is negative.)"
      answer: -25
      tolerance: 0
      explain: "1.5 × 0.5 = 0.75: a 25% decrease."
  - starter: "change.yml#markup"
    check: { type: board, text: "A shop buys a hat for $40 and marks it up 30%. Set the board. What is the selling price?", when: "p = 30", explain: "40 × 1.3 = $52." }
```

### Undo it

### Two discounts

### Up 50, down 50

### Mark-up

## Practise: percentage change

```step
stage: practise
insight: "Multipliers both ways and a two-step change, mixed; taking the second percentage of the old amount is the planted slip; the percentage-of review keeps the basics fresh."
tasks:
  - check:
      type: number
      q: "Increase $80 by 15%."
      answer: 92
      tolerance: 0
      explain: "80 × 1.15 = $92."
  - check:
      type: number
      q: "What do you multiply by for a 35% decrease?"
      answer: 0.65
      tolerance: 0
      feedback:
        - ["0.35", "That is the part taken off. What is left: 1 − 0.35."]
      explain: "100% − 35% = 65% = 0.65."
  - check:
      type: number
      q: "A $250 bike goes up 20%, then has a 10% discount. What does it cost now, in dollars?"
      answer: 270
      tolerance: 0
      feedback:
        - ["275", "The 10% is of the new price, $300, not of $250."]
      explain: "250 × 1.2 = 300, then 300 × 0.9 = $270."
  - check:
      type: number
      q: "Review: what is 15% of 60?"
      answer: 9
      tolerance: 0
      explain: "0.15 × 60 = 9."
  - check:
      type: number
      q: "A price is $80 before GST. GST adds 10%. What is the price with GST, in dollars?"
      answer: 88
      tolerance: 0
      feedback:
        - ["8", "That is the GST alone. The price with GST is 80 × 1.1."]
      explain: "80 × 1.1 = $88."
```

### Increase

### Decrease multiplier

### Two steps

### Review: percentage of

### GST

## Make: an overall change

```step
stage: make
insight: "Searching for two changes with a given overall multiplier uses the product of multipliers as the model."
try: { playground: board, starter: "change.yml#free", height: 560 }
hint: ["−28% overall means × 0.72.", "0.9 × 0.8 = 0.72."]
check: { type: board, text: "Find two changes that make an overall decrease of exactly 28%.", when: "c = -28", explain: "For example down 10% then down 20% (0.9 × 0.8 = 0.72), or up 20% then down 40% (1.2 × 0.6 = 0.72)." }
```

Then explain why the order of the two changes does not matter to the final price.
