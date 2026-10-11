---
order: 15
unit: fractions
node: AC9M7N06 n4
uses: [AC9M7N06 n2, AC9M7N06 n3, AC9M7N04 n2]   # multiplying fractions; percentages; fractions as decimals and percentages
title: Choosing a strategy
summary: "The same calculation can be quick or slow. Change the order (4 × 2.7 × 25 = 100 × 2.7), change the form (0.75 × 36 = 3/4 of 36), or split a number (12 × 2.5 = 24 + 6). Then check the answer is about right."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Two students work out 25% of 48. One writes a long multiplication; the other halves twice in their head. Both get 12. Which would you rather do in a shop?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8272
  url: http://127.0.0.1:8272/index.html
  readySelector: "#sl-p"
  layout: full
explainPicture: { ref: bar.yml#explain-pic, caption: "25% of 48 is a quarter of the bar: half of 48 is 24, half again is 12." }
explainClip:
  query: { code: "@bar.yml#explain", fresh: 1, id: explain }
  caption: "Halve, and halve again"
  say: "Some percentages are friendly fractions."
  clip:
    - caption: { text: "50% is a half: 24.", say: "Fifty percent is a half: twenty-four." }
    - wait: 1000
    - caption: { text: "25% is half of that: 12. No long multiplication.", say: "Twenty-five percent is half of that: twelve." }
    - click: Make the percentage smaller
    - expect: { selector: "#gsum", contains: "= 12" }
    - wait: 1600
---
Every calculation with fractions, decimals and percentages can be done the long way. A good strategy makes it quick, and it usually comes from one of three moves:

- **Change the order.** Multiplying can be done in any order: $4 \times 2.7 \times 25 = (4 \times 25) \times 2.7 = 100 \times 2.7$.
- **Change the form.** $0.75 = \tfrac{3}{4} = 75\%$: use whichever suits the numbers.
- **Split a number.** $12 \times 2.5 = 12 \times 2 + 12 \times 0.5 = 24 + 6$.

Then **check**: is the answer about the right size?

## Predict: 25% of 48

```step
stage: predict
insight: "Committing to the quickest method for 25% of 48 shows whether they see 25% as a quarter or only as a decimal to multiply."
check:
  type: predict
  q: "What is the quickest way to work out 25% of 48?"
  options: ["Halve 48, then halve again", "Work out 0.25 × 48 as a long multiplication", "Work out 48 × 25, then divide by 100", "They are all as quick"]
  actual: "All three give 12, but halving twice is quickest: 25% is a quarter, and 48 halves easily (24, then 12)."
```

What fraction is 25%?

## Run: a quarter of the bar

```step
stage: run
insight: "Seeing 25% as a quarter of the bar connects the percentage to the friendly fraction that makes it quick."
try: { playground: board, starter: "bar.yml#run", height: 520 }
check: { type: board, text: "The bar is 48. Set it to 25%. What fraction of the bar is shaded? Was your prediction right?", when: "p = 25", explain: "A quarter: 48 ÷ 4 = 12. 50% would be a half (24), and 75% three quarters (36)." }
```

Look at where 50% and 25% sit on the bar.

## Investigate: three moves

```step
stage: investigate
insight: "Each move has a reason: any order for multiplying, a fraction that suits the numbers, and splitting with the distributive law. Students write their own way and choose the reason for the key step."
tasks:
  - check:
      type: reasoning
      q: "Work out $4 \\times 2.7 \\times 25$ without a calculator. Write your steps."
      steps:
        - ["$4 \\times 25 = 100$", "multiplying can be done in any order, so pair the 4 and the 25"]
        - ["$100 \\times 2.7 = 270$", "multiplying by 100 makes each digit 100 times bigger"]
      picks:
        - step: 1
          options: ["Multiplying can be done in any order", "Always work from left to right", "Round 2.7 to 3 first"]
          answer: 0
          feedback: [null, "Left to right works (10.8, then 270) but 4 × 2.7 is harder than 4 × 25.", "Rounding gives an estimate (300), not the answer."]
      answer: "270"
      feedback:
        - ["300", "That is an estimate. Work it out exactly: 4 × 25 first."]
      explain: "4 × 25 = 100, and 100 × 2.7 = 270."
  - check:
      type: reasoning
      q: "Work out $0.75 \\times 36$ without a calculator. Write your steps."
      steps:
        - ["$0.75 = \\tfrac{3}{4}$", "a decimal can be written as a fraction"]
        - ["$\\tfrac{1}{4}$ of 36 is 9, so $\\tfrac{3}{4}$ of 36 is 27", "36 divides by 4, so the fraction is quick"]
      picks:
        - step: 1
          options: ["0.75 is 3/4, and 36 divides by 4", "0.75 is close to 1, so the answer is 36", "Multiply 75 × 36, then divide by 100"]
          answer: 0
          feedback: [null, "Close to 1 gives an estimate: the answer is a bit less than 36.", "That works, but 75 × 36 is the long way. Look for a fraction."]
      answer: "27"
      feedback:
        - ["36", "That is the estimate. Three quarters of 36 is less than 36."]
      explain: "0.75 = 3/4. 36 ÷ 4 = 9, × 3 = 27."
  - check:
      type: question
      q: "Which way works out $25 \\times 3.2$ by splitting?"
      options: ["$25 \\times 3 + 25 \\times 0.2 = 75 + 5 = 80$", "$25 \\times 3 + 0.2 = 75.2$", "$25 \\times 3 \\times 0.2 = 15$", "$20 \\times 3.2 + 5 \\times 3 = 79$"]
      answer: 0
      feedback: [null, "The 0.2 must be multiplied by 25 too.", "Split by adding, not multiplying: 3.2 = 3 + 0.2.", "25 was split into 20 + 5, but the 5 was multiplied by 3, not 3.2: a part was missed."]
      explain: "3.2 = 3 + 0.2, so 25 × 3.2 = 25 × 3 + 25 × 0.2 = 75 + 5 = 80 (the distributive law)."
```

### Three moves

Here are the three moves, each with a check.

```worked
4 \times 2.7 \times 25 = (4 \times 25) \times 2.7 = 270 :: Change the order: 4 × 25 = 100. Check: 2.7 is about 3, and 100 × 3 = 300.
0.75 \times 36 = \tfrac{3}{4} \times 36 = 27 :: Change the form: 36 ÷ 4 = 9, × 3 = 27. Check: a bit less than 36.
12 \times 2.5 = 12 \times 2 + 12 \times 0.5 = 24 + 6 = 30 :: Split a number: 2.5 = 2 + 0.5. Check: between 12 × 2 and 12 × 3.
```

Your working can be short notes. Then choose the reason for the key step.

### Change the form

### Split

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: three quarters on the board, a longer product to reorder, a fraction of a whole number, then choosing a strategy for an awkward percentage."
try: { playground: board, starter: "bar.yml#threequarters", height: 520 }
tasks:
  - starter: "bar.yml#threequarters"
    hint: "75% is three quarters."
    check: { type: board, text: "The bar is 36. Find 75% of it. Work it out in your head first.", when: "p = 75", explain: "A quarter of 36 is 9, so three quarters is 27." }
  - check:
      type: answer
      q: "Work out $0.25 \\times 3.6 \\times 40$ without a calculator."
      answer: "36"
      feedback:
        - ["3.6", "0.25 × 40 = 10, not 1."]
        - ["360", "0.25 × 40 is 10, not 100."]
      explain: "0.25 × 40 = 10 (a quarter of 40), and 10 × 3.6 = 36."
  - check:
      type: answer
      q: "Work out $\\tfrac{3}{5}$ of 45 without a calculator."
      answer: "27"
      feedback:
        - ["9", "That is a fifth. Three fifths is 3 times as much."]
        - ["75", "That is 45 ÷ 3/5. 'Of' means multiply."]
      explain: "45 ÷ 5 = 9, × 3 = 27."
  - check:
      type: question
      q: "Which is the quickest way to find 37% of 50?"
      options: ["Halve 37 (50 is half of 100): 18.5", "Find 1% (0.5) and multiply by 37", "Work out 0.37 × 50 as a long multiplication", "Round to 40% of 50 = 20"]
      answer: 0
      feedback: [null, "That works, but × 37 is slower than halving.", "That works, but the long way.", "That is an estimate, not the answer."]
      explain: "37% of 100 is 37, so 37% of 50 is half: 18.5. (Percentages can swap: 37% of 50 = 50% of 37.)"
```

### Three quarters

Each task changes one thing.

### A longer product

### A fraction of a number

### An awkward percentage

## Practise: quick ways

```step
stage: practise
insight: "A reorder, a friendly percentage, a split near a round number and a review, mixed; students choose the strategy each time."
tasks:
  - check:
      type: answer
      q: "Work out $8 \\times 1.25$."
      answer: "10"
      feedback:
        - ["9.25", "1.25 must be multiplied by 8 all through: 8 × 1 + 8 × 0.25."]
      explain: "1.25 = 1 1/4, so 8 + 2 = 10. Or 8 × 1.25 = 8 × 5/4 = 10."
  - check:
      type: answer
      q: "Find 20% of 35."
      answer: "7"
      feedback:
        - ["15", "That is 35 − 20."]
        - ["700", "That is 20 × 35. 20% is 20 hundredths: a fifth."]
      explain: "20% is a fifth: 35 ÷ 5 = 7."
  - check:
      type: answer
      q: "Work out $99 \\times 0.4$. (Try $100 \\times 0.4$ first.)"
      answer: "39.6"
      feedback:
        - ["40", "That is 100 × 0.4. Take one 0.4 off."]
        - ["39", "Take off 0.4, not 1."]
      explain: "99 × 0.4 = 100 × 0.4 − 1 × 0.4 = 40 − 0.4 = 39.6."
  - check:
      type: answer
      q: "Review: a $40 bag is 15% off. What is the sale price, in dollars?"
      answer: "34"
      feedback:
        - ["6", "That is the discount."]
        - ["25", "That takes 15 dollars off, not 15%."]
      explain: "10% is $4 and 5% is $2, so $6 off: $34. Or 40 × 0.85 = 34."
```

### Reorder

### Friendly percentage

### Near a round number

### Review: percentages

## Make: 18 in your head

```step
stage: make
insight: "Building several percentage-of-amount pairs that give 18, each chosen to be easy in your head, makes strategy choice the task."
try: { playground: board, starter: "bar.yml#make", height: 600 }
hint: ["50% of what is 18?", "Or 10% of something, or 25% of something."]
check: { type: board, text: "Choose an amount and a percentage you can do in your head that give exactly 18.", when: "v = 18", explain: "For example 50% of 36, 25% of 72, 10% of 180, 20% of 90, 75% of 24, 30% of 60, 90% of 20 or 15% of 120." }
```

Then find two more, and say which was quickest and why.
