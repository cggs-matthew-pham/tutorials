---
order: 14
unit: fractions
node: AC9M7N06 n3
uses: [AC9M7N04 n2, AC9M7N06 n2]   # percentages as decimals; multiplying by a fraction less than 1
title: Percentages of amounts
summary: "15% of $80 is 0.15 × 80 = $12. Take it off for a discount ($68, or 80 × 0.85 in one step), add it on for an increase ($92, or 80 × 1.15). And 18 out of 24 is 18 ÷ 24 = 75%."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A jacket is $80, and the sign says 15% off. Before you reach the counter, can you work out what you will pay?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8271
  url: http://127.0.0.1:8271/index.html
  readySelector: "#sl-p"
  layout: full
explainPicture: { ref: bar.yml#explain-pic, caption: "15% off $80: the orange 15% is $12, and the blue 85% left is $68. $80 × 0.85 = $68 in one step." }
explainClip:
  query: { code: "@bar.yml#explain", fresh: 1, id: explain }
  caption: "A percentage of an amount"
  say: "A percentage is hundredths of the amount."
  clip:
    - caption: { text: "10% of $80 is a tenth: $8.", say: "Ten percent is a tenth: eight dollars." }
    - wait: 1000
    - caption: { text: "15% is 10% and 5%: $8 + $4 = $12.", say: "Fifteen percent is ten percent and five percent: twelve dollars." }
    - click: Make the percentage bigger
    - expect: { selector: "#gsum", contains: "= $12" }
    - wait: 600
    - caption: { text: "Or 0.15 × 80 = 12.", say: "Or multiply by nought point one five." }
    - wait: 1400
---
A percentage is a number of hundredths: $15\% = \tfrac{15}{100} = 0.15$. So 15% **of** an amount is $0.15 \times$ the amount, the same "of means multiply" as for fractions.

Three questions come up again and again:

- **A percentage of an amount:** 15% of $80 is 0.15 × 80 = $12.
- **An increase or decrease:** add it on or take it off, or multiply by what is left ($100\% - 15\% = 85\%$, so $\times 0.85$).
- **What percentage one amount is of another:** divide, then $\times 100$.

## Predict: 15% off

```step
stage: predict
insight: "Committing to a sale price shows whether they find the discount and take it off, stop at the discount, or add it."
check:
  type: predict
  q: "A jacket costs $80. It is 15% off. What do you pay?"
  options: ["$68", "$65", "$12", "$92"]
  actual: "$68. 15% of $80 is $12, and $80 − $12 = $68. $12 is the discount, not the price; $65 takes 15 dollars off, not 15%."
```

10% of $80 is $8. What is 5%?

## Run: take it off

```step
stage: run
insight: "Sliding the percentage to 15 shows the discount as part of the bar and the price as what is left: 85% of the whole."
try: { playground: board, starter: "bar.yml#run", height: 540 }
check: { type: board, text: "The bar is the $80 price. Set the discount to 15%. What do you pay? Was your prediction right?", when: "p = 15", explain: "15% of $80 = $12, so you pay $68: 85% of $80." }
```

The orange part is taken off; the blue part is what you pay.

## Investigate: of, off and out of

```step
stage: investigate
insight: "A percentage of an amount is a multiplication; Grace multiplies by the part taken off instead of what is left. Finding a percentage divides first."
tasks:
  - check:
      type: answer
      q: "Find 35% of 60."
      answer: "21"
      feedback:
        - ["25", "That is 60 − 35. 35% means 35 hundredths of 60."]
        - ["2100", "That is 35 × 60, 100 times too big: 35% is 35 hundredths, so divide by 100."]
      explain: "10% of 60 is 6, so 30% is 18, and 5% is 3: 21. Or 0.35 × 60 = 21."
  - check:
      type: bug
      code: "working.txt#grace"
      text: "Grace finds the sale price of a $50 game that is 20% off. Click the line where her working goes wrong."
      answer: 3
      fault: logic
      misconception: decrease-multiplier
      explain: "Line 3: 50 × 0.2 is the discount ($10), not the price. What is left is 80%: 50 × 0.8 = $40."
  - check:
      type: answer
      q: "Ari scored 18 out of 24. What percentage is that?"
      answer: "75"
      feedback:
        - ["0.75", "That is the fraction as a decimal. × 100 for a percentage."]
        - ["18", "18 out of 24, not out of 100. Divide first: 18 ÷ 24."]
      explain: "18 ÷ 24 = 0.75 = 75%."
```

### Find it, then use it

Here is each kind with $80.

```worked
10\% \text{ of } 80 = 8, \quad 5\% \text{ of } 80 = 4 :: Mental: 10% is a tenth, 5% is half of that.
15\% \text{ of } 80 = 0.15 \times 80 = 12 :: Or as a decimal: 15% = 0.15.
80 - 12 = 68 \quad \text{or} \quad 80 \times 0.85 = 68 :: A decrease: take it off, or keep 85% in one step.
80 \times 1.15 = 92 :: An increase: 100% + 15% = 115%, so × 1.15.
18 \div 24 = 0.75 = 75\% :: What percentage: divide, then × 100.
```

Now try one: 35% of 60.

### Find the mistake

Read Grace's working. Is $10 a sensible price?

### Out of

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: an increase on the board, an increase by a multiplier, a decrease, a percentage of a group, then increase then decrease."
try: { playground: board, starter: "bar.yml#gst", height: 540 }
tasks:
  - starter: "bar.yml#gst"
    hint: "GST in Australia is 10%."
    check: { type: board, text: "A TV is $250 before GST. Add 10% GST. What is the price?", when: "p = 10", explain: "10% of $250 = $25, so $275: 250 × 1.1." }
  - check:
      type: answer
      q: "Increase 60 by 25%."
      answer: "75"
      feedback:
        - ["15", "That is 25% of 60, the increase. Add it on."]
        - ["85", "That adds 25, not 25%."]
      explain: "25% of 60 = 15, so 75. Or 60 × 1.25 = 75."
  - check:
      type: answer
      q: "Decrease 45 by 40%."
      answer: "27"
      feedback:
        - ["18", "That is 40% of 45, the decrease. 60% is left."]
        - ["5", "That takes 40 off, not 40%."]
      explain: "60% is left: 0.6 × 45 = 27."
  - check:
      type: answer
      q: "In a class of 30, 12 students walk to school. What percentage walk?"
      answer: "40"
      feedback:
        - ["12", "12 out of 30, not out of 100."]
        - ["0.4", "× 100 for a percentage."]
      explain: "12 ÷ 30 = 0.4 = 40%."
  - check:
      type: question
      q: "Edge case: a $100 price goes up 10%, then the new price goes down 10%. What is it now?"
      options: ["$99", "$100", "$101", "$90"]
      answer: 0
      feedback: [null, "The 10% decrease is of $110, not of $100.", "Down 10% of $110 is $11.", "That is only the decrease, from $100."]
      explain: "$100 × 1.1 = $110, then $110 × 0.9 = $99. The decrease is 10% of a bigger amount."
```

### GST

Each task changes one thing.

### Increase

### Decrease

### What percentage?

### Up, then down

## Practise: percentages

```step
stage: practise
insight: "A friendly percentage, a multiplier, an increase and a percentage of a group, mixed; the multiplier for a decrease is the planted slip; the review keeps multiplying fractions fresh."
tasks:
  - check:
      type: answer
      q: "Find 12.5% of 64. (12.5% is $\\tfrac{1}{8}$.)"
      answer: "8"
      feedback:
        - ["51.5", "That is 64 − 12.5. Take an eighth of 64."]
      explain: "12.5% = 1/8, and 64 ÷ 8 = 8."
  - check:
      type: answer
      q: "What do you multiply by to decrease an amount by 30%?"
      answer: "0.7"
      feedback:
        - ["0.3", "× 0.3 gives the decrease. What is left is 70%."]
        - ["1.3", "That increases by 30%."]
      explain: "100% − 30% = 70% = 0.7."
  - check:
      type: answer
      q: "A plant 120 mm tall grows 5% taller. How tall is it now, in mm?"
      answer: "126"
      feedback:
        - ["6", "6 mm is the growth. Add it on."]
        - ["125", "That adds 5 mm, not 5%."]
      explain: "5% of 120 = 6, so 126 mm. Or 120 × 1.05 = 126."
  - check:
      type: answer
      q: "Review: work out $\\tfrac{2}{3} \\times \\tfrac{3}{4}$ in simplest form."
      answer: "1/2"
      form: simplest
      feedback:
        - ["6/12", "Right amount: simplify."]
      explain: "6/12 = 1/2."
```

### A friendly percentage

### A multiplier

### Growth

### Review: multiplying fractions

## Make: save $15

```step
stage: make
insight: "Finding a price and a discount that save exactly $15 shows that many pairs work, and that the saving is percentage × price."
try: { playground: board, starter: "bar.yml#make", height: 600 }
hint: ["10% of $150 is $15. Find another.", "Try 25% of something, or 50%."]
check: { type: board, text: "Set a price and a discount that save exactly $15.", when: "v = 15", explain: "For example 10% of $150, 15% of $100, 25% of $60, 30% of $50, 50% of $30 or 75% of $20." }
```

Then find the pair with the lowest sale price.
