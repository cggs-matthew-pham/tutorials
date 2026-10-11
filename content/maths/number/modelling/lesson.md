---
order: 23
unit: modelling
node: [AC9M7N09 n1, AC9M7N09 n2, AC9M7N09 n3]
uses: [AC9M7N06 n3, AC9M7N08 n3]   # percentages of amounts (Percentages); sharing in a ratio
title: Modelling with money
summary: "Discounts, markups and profit: formulate the problem, choose fractions, percentages or ratios, solve, and say what the answer means in dollars."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A $200 bike is 20% off, and then a coupon takes a further 10% off the new price. Is that the same as 30% off?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8294
  url: http://127.0.0.1:8294/index.html
  readySelector: "#sl-p"
  layout: full
explainPicture: { ref: mm.yml#explain-pic, caption: "30% off $200 is $140. But 20% off then 10% off leaves $200 × 0.8 × 0.9 = $144: percentages of different amounts do not add." }
explainClip:
  query: { code: "@mm.yml#explain", fresh: 1, id: explain }
  caption: "Percentages in steps"
  say: "Each percentage is of a different amount."
  clip:
    - caption: { text: "20% off $200 leaves $160.", say: "Twenty percent off two hundred leaves one sixty." }
    - wait: 1200
    - click: Make the percentage bigger
    - expect: { selector: "#gsum", contains: "= $140" }
    - caption: { text: "30% off all at once is $140.", say: "Thirty percent off in one step is one forty." }
    - wait: 1200
    - caption: { text: "But 10% off $160 is $144: not the same.", say: "Ten percent off one sixty is one forty-four." }
    - wait: 1600
---
Money problems are ratio and percentage problems with a context. The habit is the same three steps:

1. **Formulate:** what is known (price, discount, cost), what is unknown, and which representation (fraction, decimal, percentage, ratio) fits?
2. **Solve:** choose an efficient calculation, estimate first, and use a calculator where it helps.
3. **Interpret:** say what the answer means, in dollars, with a sensible amount of rounding, and **justify** why you chose that representation.

Two traps: a percentage is always *of* something (the **original** amount for profit or discount), and percentages of different amounts cannot be added.

## Predict: two discounts

```step
stage: predict
insight: "Committing shows whether they add the percentages (30% off, $140), apply them in turn ($144), or take both off the original."
check:
  type: predict
  q: "A $200 bike is 20% off, then a coupon takes 10% off the new price. What is the final price?"
  options: ["$144", "$140", "$150", "$160"]
  actual: "$144. 20% off $200 is $160, then 10% off $160 is $144. $140 would be 30% off $200; the 10% is of a smaller amount."
```

Why is 10% of the new price less than 10% of $200?

## Run: 30% off $200

```step
stage: run
insight: "Setting 30% off $200 gives $140, the single-step answer to compare with the two-step $144."
try: { playground: board, starter: "mm.yml#run", height: 420 }
check: { type: board, text: "Set the discount to 30%. What is the sale price? Is it the same as your predicted price for two discounts?", when: "p = 30 and n = 140", explain: "30% off $200 is $140. Two discounts of 20% then 10% leave $144, because the second is of $160, not $200." }
```

Now set 20%, then use 10% off that price.

## Investigate: formulate, solve, interpret

```step
stage: investigate
insight: "Profit percentage is out of the cost, the original; Ben divides by the selling price. A fraction is easier to compare when both discounts are in the same form."
tasks:
  - check:
      type: answer
      q: "Known: a $60 jumper is 25% off. Unknown: the sale price. What is it, in dollars?"
      answer: "45"
      feedback:
        - ["15", "That is the discount, 25% of $60. The question asks for the price you pay."]
        - ["35", "That takes 25 dollars off. 25% is a part of $60."]
      explain: "25% of $60 = $15, so $45. Or 60 × 0.75 = 45."
  - check:
      type: bug
      code: "working.txt#ben"
      text: "Ben finds the percentage profit on a scarf. Click the line where his working goes wrong."
      answer: 3
      fault: logic
      misconception: percent-wrong-base
      explain: "Line 3: profit is a percentage of the cost, the original amount: 3 ÷ 5 = 0.6 = 60%. Ben divided by the selling price."
  - check:
      type: question
      q: "Shop A takes $\\tfrac{1}{3}$ off a $90 jacket. Shop B takes 30% off. Which is the better deal, and why?"
      options: ["Shop A: $\\tfrac{1}{3}$ is about 33%, more than 30%", "Shop B: 30 is bigger than 3", "They are the same", "You cannot tell"]
      answer: 0
      feedback: [null, "30 and 3 are different kinds of numbers. Write both as a percentage or both as fractions first.", "$\\tfrac{1}{3}$ of $90 is $30; 30% is $27.", "Write both in the same form and you can."]
      explain: "$\\tfrac{1}{3}$ of $90 = $30 off; 30% of $90 = $27 off. Writing both as percentages (33⅓% and 30%) makes the comparison immediate."
```

### Say what you know

### Find the mistake

### Which representation?

## Modify: new money problems

```step
stage: modify
insight: "A discount on the board, a pay rise, a markup then a discount, and the answer written the way a shop would: each asks for the model, then the units."
try: { playground: board, starter: "mm.yml#game", height: 420 }
tasks:
  - check: { type: board, text: "A game costs $120 and has 15% off. What is the sale price?", when: "p = 15 and n = 102", explain: "15% of $120 is $18, so $102. Or 120 × 0.85 = 102." }
  - check:
      type: answer
      q: "You earn $20 an hour and get a 5% pay rise. What is your new hourly rate, in dollars?"
      answer: "21"
      feedback:
        - ["1", "That is the rise, 5% of $20. The new rate is the old rate plus the rise."]
        - ["25", "That adds 5 dollars. 5% of $20 is $1."]
      explain: "5% of $20 = $1, so $21. Or 20 × 1.05 = 21."
  - check:
      type: answer
      q: "A $50 top is marked up by 40% and then sold at 20% off the new price. Estimate first: will the final price be more or less than $50? Then work it out, in dollars."
      answer: "56"
      feedback:
        - ["60", "That adds 40% − 20% = +20% of $50. The 20% off is of the marked-up price, $70."]
        - ["70", "That is the marked-up price. Now take 20% off it."]
      explain: "50 × 1.4 = $70, then 70 × 0.8 = $56. The two percentages are of different amounts."
  - check:
      type: question
      q: "The calculator shows a sale price of 33.6. How do you write it in a shop?"
      options: ["$33.60", "33.6", "$34", "$33.6"]
      answer: 0
      feedback: [null, "No units: 33.6 what?", "Rounding to $34 loses 40 cents, and prices are written to the cent.", "Money has two decimal places."]
      explain: "Dollars to the cent: $33.60."
  - check:
      type: question
      q: "You model the top with 50 × 1.4 × 0.8. What does the model assume about the 20% off?"
      options: ["It is 20% of the marked-up price, not of $50", "It is 20% of $50", "It is 20 dollars", "It is added to the 40%"]
      answer: 0
      feedback: [null, "That would be 50 × 1.4 − 10. The model takes 20% of the new price.", "20% is a percentage, not an amount in dollars.", "That would be 50 × 1.2: percentages of different amounts do not add."]
      explain: "Writing × 0.8 after × 1.4 assumes the sale is 20% of the marked-up price. Stating assumptions like this is part of the model."
```

### The game

### A pay rise

### Markup, then sale

### Write the price

### What does it assume?

## Practise: money models

```step
stage: practise
insight: "A fraction of a prize, a saving goal as a percentage, a bulk saving, and a ratio review."
tasks:
  - check:
      type: answer
      q: "A $240 prize is shared: $\\tfrac{1}{4}$ to Ann, and the rest equally among 3 others. How much does each of the other three get, in dollars?"
      answer: "60"
      feedback:
        - ["180", "That is the rest altogether. Share it among 3."]
        - ["80", "That shares the whole $240 among 3."]
      explain: "Ann gets $60, leaving $180. $180 ÷ 3 = $60 each."
  - check:
      type: answer
      q: "A bike costs $400. You have saved 65% of it. How many more dollars do you need?"
      answer: "140"
      feedback:
        - ["260", "That is what you have saved. The question asks what is left to save."]
      explain: "65% of $400 = $260 saved. $400 − $260 = $140. Or 35% of $400."
  - check:
      type: answer
      q: "A pack of 12 pens costs $9, while one pen costs $1. What percentage cheaper is each pen in the pack?"
      answer: "25"
      feedback:
        - ["75", "That is the pack price as a percentage of buying 12 singles. The saving is what is left: 100% − 75%."]
      explain: "12 singles cost $12; the pack costs $9, so each pen costs 75% as much. That is 25% cheaper."
  - check:
      type: answer
      q: "Review: share $84 in the ratio $3 : 4$. What is the bigger share, in dollars?"
      answer: "48"
      feedback:
        - ["36", "That is the smaller share."]
      explain: "3 + 4 = 7 parts. 84 ÷ 7 = 12. The bigger share is 4 × 12 = 48."
```

### Fractions of a prize

### Saving up

### Bulk buying

### Review: sharing

## Make: a $75 sale

```step
stage: make
insight: "Choosing a price and a discount that give exactly $75 shows many models fit and each says something different about the shop."
try: { playground: board, starter: "mm.yml#make", height: 460 }
hint: ["The sale price is price × (1 − discount).", "Try $100 with 25% off."]
check: { type: board, text: "Choose a price and a discount so the sale price is exactly $75.", when: "n = 75", explain: "For example $100 less 25%, or $150 less 50%. The sale price is the original times (1 − the discount)." }
```

Then write one sentence for a shopper explaining your sale.
