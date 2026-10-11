---
order: 10
unit: fractions
node: AC9M7N04 n2
title: Fractions, decimals and percentages
summary: "One amount, three ways to write it. A percentage is out of 100, so 3/4 = 75/100 = 75% = 0.75. Divide the top by the bottom for a decimal; put a percentage over 100 and simplify for a fraction."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A 25% discount, a quarter off, 0.25 of the price: the same saving, written three ways. Which is easiest depends on the job."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8174
  url: http://127.0.0.1:8174/index.html
  readySelector: "#sl-c"
  layout: full
explainPicture: { ref: bars.yml#explain-pic, caption: "$\\tfrac{3}{4}$ of the bar and 75 of the 100 squares: $\\tfrac{3}{4} = \\tfrac{75}{100} = 0.75 = 75\\%$." }
explainClip:
  query: { code: "@bars.yml#explain", fresh: 1, id: explain }
  caption: "One amount, three names"
  say: "One amount can be a fraction, a decimal or a percentage."
  clip:
    - caption: { text: "3/4 of the bar. How many of 100 squares is that?", say: "Three quarters of the bar. How many of a hundred squares?" }
    - wait: 500
    - caption: { text: "75 of 100: 75/100 = 0.75 = 75%.", say: "Seventy five out of a hundred: nought point seven five, or seventy five percent." }
    - click: Make c bigger
    - click: Make c bigger
    - click: Make c bigger
    - click: Make c bigger
    - click: Make c bigger
    - expect: { selector: "#gsum", contains: "3/4 = 75/100" }
    - wait: 1200
---
In Equivalent fractions you wrote one amount as different fractions. **Percent** means "out of 100", so a percentage is a fraction with 100 parts: $75\% = \tfrac{75}{100}$. A **decimal** shows tenths, hundredths and thousandths: $0.75$ is 75 hundredths.

In this lesson you move between all three, using a hundred grid to see why they match.

## Predict: three quarters

```step
stage: predict
insight: "Committing to a percentage for 3/4 shows whether they treat the digits as the percentage (34%) or think in hundredths."
check:
  type: predict
  q: "Which is the same amount as $\\tfrac{3}{4}$?"
  options:
    - "$75\\%$"
    - "$34\\%$"
    - "$0.34$"
    - "$3.4\\%$"
  actual: "75%. 3/4 = 75/100 (× 25 on the top and the bottom), and out of 100 is a percentage: 75%. As a decimal, 0.75."
```

How many of 100 squares is three quarters?

## Run: shade the grid

```step
stage: run
insight: "Shading the hundred grid to match 3/4 turns the fraction into hundredths, which is what a percentage and a two-place decimal both are."
try: { playground: board, starter: "bars.yml#run", height: 600 }
check: { type: board, text: "The bar is $\\tfrac{3}{4}$. Shade the same amount of the hundred grid. Was your prediction right?", when: "e = 1" }
```

$c$ is the number of squares shaded, out of 100.

## Investigate: converting

```step
stage: investigate
insight: "Each conversion goes through a fraction over 100 or a division: fraction to decimal by dividing, decimal to percentage by × 100, percentage to fraction over 100 then simplified. Max's mistake reads the digits after the point as the percentage."
tasks:
  - check:
      type: answer
      q: "Write $\\tfrac{3}{8}$ as a decimal."
      answer: "0.375"
      form: decimal
      feedback:
        - ["0.38", "That is rounded. 3 ÷ 8 is exactly 0.375."]
        - ["3.8", "Divide the top by the bottom: 3 ÷ 8."]
      explain: "3 ÷ 8 = 0.375. As a percentage: 37.5%."
  - check:
      type: bug
      code: "working.txt#max"
      text: "Max writes $0.5$ as a percentage. Click the line where his working goes wrong."
      answer: 4
      fault: logic
      misconception: decimal-percent-place
      explain: "Line 4: 0.5 is 5 tenths, which is 50 hundredths. Out of 100: 50%. Multiply a decimal by 100 for the percentage."
  - check:
      type: answer
      q: "Write $16\\%$ as a fraction in its simplest form."
      answer: "4/25"
      form: simplest
      feedback:
        - ["16/100", "That is right, but 16 and 100 share 4. Simplify."]
        - ["8/50", "8 and 50 still share 2."]
      explain: "16% = 16/100 = 4/25 (÷ 4)."
```

### Three ways

Here is how to move between the three.

```worked
\tfrac{3}{4} = \tfrac{75}{100} = 75\% :: Fraction to percentage: make it out of 100 (× 25 on the top and the bottom).
\tfrac{3}{8} = 3 \div 8 = 0.375 :: Fraction to decimal: divide the top by the bottom.
0.375 \times 100 = 37.5\% :: Decimal to percentage: multiply by 100.
16\% = \tfrac{16}{100} = \tfrac{4}{25} :: Percentage to fraction: put it over 100, then simplify.
45\% = 0.45 :: Percentage to decimal: divide by 100.
```

Try one: write $\tfrac{3}{8}$ as a decimal.

### Find the mistake

Read Max's working. How many hundredths is 0.5?

### Percentage to fraction

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: fifths on the grid, each direction of conversion, then the edge case of a decimal that never ends."
try: { playground: board, starter: "bars.yml#fifths", height: 600 }
tasks:
  - starter: "bars.yml#fifths"
    hint: "One fifth of 100 is 20."
    check: { type: board, text: "The bar is $\\tfrac{2}{5}$. Shade the same amount of the grid.", when: "e = 1", explain: "2/5 = 40/100 = 40%." }
  - check:
      type: answer
      q: "Write $0.6$ as a percentage (a number of percent)."
      answer: "60"
      feedback:
        - ["6", "0.6 is 6 tenths, which is 60 hundredths."]
        - ["0.6", "Multiply by 100 for the percentage."]
      explain: "0.6 × 100 = 60%."
  - check:
      type: answer
      q: "Write $35\\%$ as a decimal."
      answer: "0.35"
      form: decimal
      feedback:
        - ["3.5", "Divide by 100, not by 10."]
        - ["35", "35% is 35 out of 100: divide by 100."]
      explain: "35 ÷ 100 = 0.35."
  - check:
      type: answer
      q: "Write $\\tfrac{7}{20}$ as a percentage."
      answer: "35"
      feedback:
        - ["0.35", "That is the decimal. Multiply by 100 for the percent."]
        - ["720", "Make it out of 100: × 5 on the top and the bottom."]
      explain: "7/20 = 35/100 = 35%."
  - check:
      type: question
      q: "Edge case: what is $\\tfrac{1}{3}$ as a decimal?"
      options: ["0.333…, with the 3s going on for ever", "0.3 exactly", "0.33 exactly", "3.3"]
      answer: 0
      feedback: [null, "3 × 0.3 = 0.9, not 1.", "3 × 0.33 = 0.99, not 1.", "1 ÷ 3 is less than 1."]
      explain: "1 ÷ 3 = 0.333…: a recurring decimal. Still a rational number (a fraction); the grid shows about 33.3 squares."
```

### Fifths

Each task changes one thing.

### Decimal to percentage

### Percentage to decimal

### Fraction to percentage

### A decimal that never ends

## Practise: all three

```step
stage: practise
insight: "Conversions in every direction, mixed, with digit-reading planted again; ordering mixed forms; the review keeps simplifying fresh."
tasks:
  - check:
      type: answer
      q: "Write $0.45$ as a fraction in its simplest form."
      answer: "9/20"
      form: simplest
      feedback:
        - ["45/100", "Simplify: 45 and 100 share 5."]
      explain: "0.45 = 45/100 = 9/20."
  - check:
      type: answer
      q: "Write $\\tfrac{3}{5}$ as a percentage."
      answer: "60"
      feedback:
        - ["35", "3/5 is not 35%: make it out of 100 (× 20)."]
        - ["0.6", "That is the decimal. × 100 for the percent."]
      explain: "3/5 = 60/100 = 60%."
  - check:
      type: question
      q: "Which is smallest: $0.6$, $\\tfrac{2}{3}$ or $65\\%$?"
      options: ["0.6", "2/3", "65%"]
      answer: 0
      feedback: [null, "2/3 = 0.666…, which is more than 0.65.", "65% = 0.65, more than 0.6."]
      explain: "Write each as a decimal: 0.6, 0.666… and 0.65. The smallest is 0.6."
  - check:
      type: answer
      q: "Review: write $\\tfrac{9}{12}$ in its simplest form."
      answer: "3/4"
      form: simplest
      feedback:
        - ["9/12", "9 and 12 share 3."]
      explain: "÷ 3: 3/4."
```

### Decimal to fraction

### Fraction to percentage

### Order them

### Review: simplest form

## Make: eighths that are whole percentages

```step
stage: make
insight: "Searching eighths for whole-number percentages shows which fractions fit hundredths exactly, and that the rest (3/8 = 37.5%) need a decimal."
try: { playground: board, starter: "bars.yml#make", height: 600 }
hint: ["1/8 = 12.5%: not a whole number.", "Try 2/8: simplify it first."]
check: { type: board, text: "Choose a number of eighths ($a$) that is a whole-number percentage, then shade the same amount on the grid.", when: "e = 1 and a > 0", explain: "2/8 = 25%, 4/8 = 50%, 6/8 = 75% (and 8/8 = 100%). Odd numbers of eighths end in .5%." }
```

Which eighths cannot be shaded exactly on the grid? Why?
