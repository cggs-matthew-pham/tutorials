---
order: 26
unit: modelling
node: AC9M8N05 n2
uses: [AC9M8N05 n1]
title: Money models
summary: "Model a money problem by choosing what to calculate, then check the answer makes sense. Pay is the rate times the hours. Income tax is worked out in brackets: each part of the income is taxed at its own rate, so for incomes above $18 200 the rate on the last dollar (the marginal rate) is higher than the tax as a share of all the income (the effective rate)."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "People sometimes turn down a pay rise because it 'puts them in a higher tax bracket'. Do they lose money? A tax model answers it."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8317
  url: http://127.0.0.1:8317/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: tax.yml#explain-pic, caption: "On $60 000: nothing on the first $18 200, 15% of the next $26 800 ($4020), and 30% of the last $15 000 ($4500). Tax $8520." }
explainClip:
  query: { code: "@tax.yml#explain", fresh: 1, id: explain }
  caption: "Tax in brackets"
  say: "Each part of the income is taxed at its own rate."
  clip:
    - caption: { text: "$40 000: the first $18 200 is tax-free, the rest at 15%.", say: "The first eighteen thousand two hundred dollars is tax free." }
    - wait: 1200
    - caption: { text: "Past $45 000, only the extra dollars are taxed at 30%.", say: "Past forty-five thousand, only the extra dollars are taxed at thirty percent." }
    - click: Make the income bigger
    - click: Make the income bigger
    - click: Make the income bigger
    - click: Make the income bigger
    - expect: { selector: "#gsum", contains: "30%" }
    - wait: 1600
---
To **model** a money problem: say what you need to find, choose the calculation, work it out, then check the answer makes sense in the situation.

- **Pay:** pay = rate × hours. Overtime at "time and a half" pays 1.5 × the rate.
- **Income tax** (simplified from Australia's 2026–27 rates, without the Medicare levy):

| Income | Rate on that part |
|---|---|
| \$0 to \$18 200 | 0% |
| \$18 201 to \$45 000 | 15% |
| \$45 001 to \$135 000 | 30% |
| \$135 001 to \$190 000 | 37% |
| over \$190 000 | 45% |

Each **part** of the income is taxed at its own rate. The **marginal rate** is the rate on the last dollar; the **effective rate** is all the tax as a percentage of the income.

## Predict: one more dollar

```step
stage: predict
insight: "Committing to what happens when income crosses a bracket shows whether they think the whole income is taxed at the higher rate."
check:
  type: predict
  q: "Your income goes from $45 000 to $45 001, into the 30% bracket. What happens to your tax?"
  options: ["It goes up 30 cents: only the extra dollar is taxed at 30%", "All $45 001 is now taxed at 30%", "You pay less tax", "Nothing changes"]
  actual: "It goes up 30 cents. Only the part above $45 000 is taxed at 30%; the rest is taxed as before."
```

## Run: tax on an income

```step
stage: run
insight: "Moving the income across brackets shows each part taxed at its own rate, and the effective rate staying below the marginal rate."
try: { playground: board, starter: "tax.yml#run", height: 560 }
check: { type: board, text: "Set the income to $60 000. Read the tax and the two rates. Was your prediction right?", when: "i = 60000", explain: "Tax $8520: the marginal rate is 30%, but the effective rate is 8520 ÷ 60 000 = 14.2%." }
```

## Investigate: marginal and effective

```step
stage: investigate
insight: "Tax is added up part by part (Jay taxes the whole income at the top rate); marginal and effective rates answer different questions."
tasks:
  - check:
      type: number
      q: "What is the tax on an income of $30 000, in dollars?"
      answer: 1770
      tolerance: 0
      feedback:
        - ["4500", "The first $18 200 is tax-free: only $11 800 is taxed at 15%."]
      explain: "30 000 − 18 200 = 11 800, and 15% of 11 800 = $1770."
  - check:
      type: bug
      code: "working.txt#jay"
      text: "Jay works out his tax. Click the line where his model goes wrong."
      answer: 3
      fault: logic
      misconception: tax-whole-income
      explain: "Line 3: only the part above $45 000 is taxed at 30%. Tax = 15% of 26 800 + 30% of 5000 = 4020 + 1500 = $5520."
  - check:
      type: question
      q: "Someone earns $60 000. Why is their effective tax rate (14.2%) lower than their marginal rate (30%)?"
      options: ["Most of their income is taxed at 0% or 15%; only the top part is taxed at 30%", "The marginal rate is wrong", "Effective rates are always half the marginal rate", "Because of the Medicare levy"]
      answer: 0
      feedback: [null, "It is the rate on the last dollar: 30%.", "There is no such rule.", "The model leaves the levy out."]
      explain: "The lower brackets pull the average down."
```

### Tax on $30 000

Here is the routine.

```worked
60\,000 - 45\,000 = 15\,000 :: The part in the 30% bracket.
26\,800 \times 0.15 = 4020 :: The part from $18 200 to $45 000, at 15%.
15\,000 \times 0.30 = 4500 :: The top part, at 30%.
4020 + 4500 = 8520 :: Add the parts: the tax.
8520 \div 60\,000 = 14.2\% :: The effective rate.
```

### Find the mistake

Read Jay's working. Which part of his income is in the 30% bracket?

### Two rates

## Modify: brackets and pay

```step
stage: modify
insight: "Finding incomes with given taxes and rates, then modelling pay with a rate, hours and overtime."
try: { playground: board, starter: "tax.yml#free", height: 560 }
tasks:
  - starter: "tax.yml#free"
    hint: "Where does the 15% bracket end?"
    check: { type: board, text: "Find the income at the top of the 15% bracket. What is the tax there?", when: "i = 45000", explain: "15% of 26 800 = $4020." }
  - starter: "tax.yml#free"
    hint: ["Try $90 000, then go higher.", "Watch the effective rate as the income passes $90 000."]
    check: { type: board, text: "Find an income whose effective tax rate is more than 20%.", when: "e > 20", explain: "Any income above about $94 800: at $95 000, 19 020 ÷ 95 000 ≈ 20.02%; at $100 000, 20.52%." }
  - starter: "tax.yml#pay"
    check: { type: board, text: "A job pays $28.50 an hour. Set the board for 12 hours. What is the pay?", when: "r = 28.5 and h = 12", explain: "28.50 × 12 = $342." }
  - check:
      type: number
      q: "Overtime is paid at time and a half. How much is 3 hours of overtime at a rate of $28.50, in dollars?"
      answer: 128.25
      tolerance: 0
      explain: "1.5 × 28.50 = $42.75 an hour, × 3 = $128.25."
```

### The 15% bracket

### Over 20%

### Pay

### Overtime

## Practise: money models

```step
stage: practise
insight: "Tax, the effective rate and judging the model, mixed; taxing the whole income at the top rate is the planted slip; the percentage review keeps multipliers fresh."
tasks:
  - check:
      type: number
      q: "What is the tax on $100 000, in dollars?"
      answer: 20520
      tolerance: 0
      feedback:
        - ["30000", "Only the part above $45 000 is taxed at 30%."]
      explain: "4020 + 30% of 55 000 = 4020 + 16 500 = $20 520."
  - check:
      type: number
      q: "What is the effective tax rate on $100 000, as a percentage to 2 decimal places?"
      answer: 20.52
      tolerance: 0.01
      explain: "20 520 ÷ 100 000 = 20.52%."
  - check:
      type: question
      q: "How could this tax model be improved to match a real tax bill?"
      options: ["Add the Medicare levy and tax offsets", "Tax everything at the top rate", "Remove the tax-free part", "Use one rate for everyone"]
      answer: 0
      feedback: [null, "That is not how Australian tax works.", "The tax-free part is real.", "Australia uses brackets."]
      explain: "The model leaves out the Medicare levy (usually 2%) and offsets, so real tax is a bit different."
  - check:
      type: number
      q: "Review: decrease $250 by 12%. What is the new amount, in dollars?"
      answer: 220
      tolerance: 0
      explain: "250 × 0.88 = $220."
  - check:
      type: number
      q: "A bank account is overdrawn: its balance is −$120. Then $85 is paid in and a $40 fee is taken. What is the balance now, in dollars?"
      answer: -75
      tolerance: 0
      feedback:
        - ["-5", "The fee is taken away: −120 + 85 − 40."]
      explain: "−120 + 85 − 40 = −75: still overdrawn, by $75."
```

### Tax on $100 000

### Effective rate

### Improve the model

### Review: decrease

### An overdrawn account

## Make: $50 000 to spend

```step
stage: make
insight: "Searching for an income with a given after-tax amount uses the model in reverse and checks it in context."
try: { playground: board, starter: "tax.yml#free", height: 560 }
hint: ["Income after tax = income − tax.", "Try incomes between $55 000 and $60 000."]
check: { type: board, text: "Find an income (to the nearest $1000) that leaves about $50 000 after tax: between $49 500 and $50 500.", when: "n > 49500 and n < 50500", explain: "$58 000: tax 4020 + 3900 = $7920, leaving $50 080." }
```

Then say whether your answer makes sense, and what the model leaves out.
