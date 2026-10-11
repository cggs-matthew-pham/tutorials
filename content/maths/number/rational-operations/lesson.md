---
order: 16
unit: fractions
node: AC9M8N04 n2
uses: [AC9M7N04 n1]   # simplifying fractions (Equivalent fractions)
title: Calculating with negative fractions and decimals
summary: "The sign rules for integers work for every fraction and decimal: work out the sign, then the size. Choose an efficient order: multiplying can be done in any order (25 × 4 first), and a hard product can be split (6 × 2.5 = 6 × 2 + 6 × 0.5)."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A temperature falls half a degree an hour for three hours. A share loses 2.4 dollars over 6 days. Negative fractions and decimals are everywhere money and weather are measured."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8178
  url: http://127.0.0.1:8178/index.html
  readySelector: "#sl-a"
  layout: full
explainPicture: { ref: line.yml#explain-pic, caption: "$-3 \\times (-\\tfrac{1}{2}) = 1\\tfrac{1}{2}$: 3 jumps of $-\\tfrac{1}{2}$ would go left to $-1\\tfrac{1}{2}$; a negative number of jumps goes the opposite way." }
explainClip:
  query: { code: "@line.yml#explain", fresh: 1, id: explain }
  caption: "The sign rules work for fractions too"
  say: "The sign rules for integers work for fractions and decimals too."
  clip:
    - caption: { text: "3 × 1/2: 3 jumps of a half, to 1 1/2.", say: "Three jumps of a half: one and a half." }
    - wait: 400
    - caption: { text: "3 × (−1/2): the jumps go left, to −1 1/2.", say: "Three jumps of negative a half go left." }
    - click: Make b smaller
    - click: Make b smaller
    - wait: 400
    - caption: { text: "−3 × (−1/2): a negative number of jumps goes the opposite way: 1 1/2.", say: "Negative three jumps go the opposite way: positive one and a half." }
    - click: Make a smaller
    - click: Make a smaller
    - click: Make a smaller
    - click: Make a smaller
    - click: Make a smaller
    - click: Make a smaller
    - expect: { selector: "#nlsum", contains: "= 1 1/2" }
    - wait: 1200
---
You know the sign rules for integers: the same signs give a positive, different signs a negative, for multiplying and dividing. They work just the same for fractions and decimals: $-0.5 \times (-4) = 2$, and $-\tfrac{3}{4} \times \tfrac{2}{5} = -\tfrac{3}{10}$.

This lesson also looks for **efficient** ways to calculate: choosing the order, or splitting a number, so the arithmetic is easy.

## Predict: a negative half

```step
stage: predict
insight: "Committing to −3 × (−1/2) shows whether the integer sign rules carry over to fractions, before the board shows the jumps."
check:
  type: predict
  q: "What is $-3 \\times (-\\tfrac{1}{2})$?"
  options:
    - "$1\\tfrac{1}{2}$"
    - "$-1\\tfrac{1}{2}$"
    - "$-3\\tfrac{1}{2}$"
    - "$\\tfrac{1}{6}$"
  actual: "1 1/2. Same signs give a positive, and 3 × 1/2 = 1 1/2."
```

Which sign rule applies? Then: what is $3 \times \tfrac{1}{2}$?

## Run: jumps of a half

```step
stage: run
insight: "Setting −3 jumps of −1/2 on the line shows the same picture as with integers: the sign rules do not care whether the jump is a whole number."
try: { playground: board, starter: "line.yml#run", height: 460 }
check: { type: board, text: "Set the board to $-3 \\times (-\\tfrac{1}{2})$. Was your prediction right?", when: "a = -3 and b = -0.5" }
```

Then try $-3 \times \tfrac{1}{2}$ and $3 \times (-\tfrac{1}{2})$. Which sign rule does each follow?

## Investigate: sign, size, strategy

```step
stage: investigate
insight: "Sign first, then size; and choose an order or a split that makes the size easy. Leo's mistake uses 'two negatives make a negative' from adding."
tasks:
  - check:
      type: answer
      q: "Work out $-\\tfrac{3}{4} \\times \\tfrac{2}{5}$. Simplify."
      answer: "-3/10"
      form: simplest
      feedback:
        - ["3/10", "Different signs give a negative."]
        - ["-6/20", "Right value; simplify: 6 and 20 share 2."]
      explain: "Different signs: negative. 3 × 2 = 6 and 4 × 5 = 20: −6/20 = −3/10."
  - check:
      type: bug
      code: "working.txt#leo"
      text: "Leo works out $-0.4 \\times (-0.5)$. Click the line where his working goes wrong."
      answer: 3
      fault: logic
      misconception: sign-rules-addition
      explain: "Line 3: for multiplying, the same signs give a positive. −0.4 × (−0.5) = 0.2."
  - check:
      type: reasoning
      q: "Work out $25 \\times (-3.7) \\times 4$ the easy way. Write your steps your own way."
      steps:
        - ["$25 \\times 4 = 100$", "multiplying can be done in any order, so pair the friendly numbers first"]
        - ["$100 \\times (-3.7) = -370$", "different signs give a negative; × 100 moves the digits two places"]
      picks:
        - step: 1
          options: ["Multiplying can be done in any order", "You must work from left to right", "Multiply the decimal first"]
          answer: 0
          feedback: [null, "Left to right is one way, but not the only one: 25 × 4 × (−3.7) gives the same answer.", "That works, but 25 × 3.7 is harder than 25 × 4."]
      answer: "-370"
      feedback:
        - ["370", "One factor is negative: the answer is negative."]
      explain: "25 × 4 = 100, then 100 × (−3.7) = −370."
```

### Sign, then size, then strategy

Here is how to work with negative fractions and decimals, and two shortcuts.

```worked
-\tfrac{3}{4} \times \tfrac{2}{5} :: Sign first: different signs, so negative.
= -\tfrac{6}{20} = -\tfrac{3}{10} :: Then size: multiply tops and bottoms, then simplify.
25 \times (-3.7) \times 4 = 100 \times (-3.7) :: Any order: pair 25 and 4 first (commutative and associative).
= -370 :: × 100 is easy.
6 \times (-2.5) = 6 \times (-2) + 6 \times (-0.5) :: Split a hard number (distributive): $-12 + (-3)$.
= -15 :: Then add.
```

Try one: $-\tfrac{3}{4} \times \tfrac{2}{5}$.

### Find the mistake

Read Leo's working. Which rule is he using?

### Choose the order

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: adding negative fractions on the line, dividing decimals, dividing fractions, splitting with the distributive law, then the edge case of a power of a negative decimal."
try: { playground: board, starter: "line.yml#add", height: 460 }
tasks:
  - starter: "line.yml#add"
    hint: "Start at −1 1/4 and move 2 1/2 right."
    check: { type: board, text: "Set the board to $-1\\tfrac{1}{4} + 2\\tfrac{1}{2}$. Where do you land?", when: "a = -1.25 and b = 2.5", explain: "−1 1/4 + 2 1/2 = 1 1/4." }
  - check:
      type: answer
      q: "Work out $-2.4 \\div 0.6$."
      answer: "-4"
      feedback:
        - ["4", "Different signs give a negative."]
        - ["-0.4", "2.4 ÷ 0.6 = 24 ÷ 6 = 4."]
      explain: "24 ÷ 6 = 4, different signs: −4."
  - check:
      type: answer
      q: "Work out $-\\tfrac{2}{3} \\div (-\\tfrac{4}{9})$. Simplify."
      answer: "3/2"
      form: simplest
      feedback:
        - ["-3/2", "Same signs give a positive."]
        - ["18/12", "Right value; simplify."]
        - ["8/27", "Dividing by 4/9 is multiplying by 9/4."]
      explain: "Same signs: positive. 2/3 × 9/4 = 18/12 = 3/2 (or 1 1/2)."
  - check:
      type: reasoning
      q: "Work out $8 \\times (-1.25)$ by splitting $-1.25$. Write your steps."
      steps:
        - ["$8 \\times (-1) = -8$ and $8 \\times (-0.25) = -2$", "split −1.25 into −1 and −0.25 (distributive law)"]
        - ["$-8 + (-2) = -10$", "add the two parts"]
      answer: "-10"
      feedback:
        - ["10", "One factor is negative: the answer is negative."]
        - ["-8.25", "8 × −0.25 is −2, not −0.25."]
      explain: "8 × (−1) + 8 × (−0.25) = −8 + (−2) = −10."
  - check:
      type: question
      q: "Edge case: what is $(-0.1)^2$?"
      options: ["$0.01$", "$-0.01$", "$0.2$", "$-0.2$"]
      answer: 0
      feedback: [null, "(−0.1) × (−0.1): same signs give a positive.", "Squaring multiplies: 0.1 × 0.1 = 0.01.", "Squaring multiplies, and the signs are the same."]
      explain: "(−0.1) × (−0.1) = 0.01: positive, and smaller than 0.1."
```

### Add on the line

Each task changes one thing.

### Divide decimals

### Divide fractions

### Split a decimal

### A power

## Practise: mixed rational calculations

```step
stage: practise
insight: "Adding, multiplying and subtracting with negative fractions and decimals, mixed; the addition-rule slip planted again; the review keeps simplifying fresh."
tasks:
  - check:
      type: answer
      q: "Work out $-1.5 + (-2.75)$."
      answer: "-4.25"
      feedback:
        - ["4.25", "Adding a negative to a negative goes further left."]
        - ["1.25", "Both are negative: add the sizes, keep the negative."]
      explain: "Both move left: −4.25."
  - check:
      type: answer
      q: "Work out $-0.3 \\times 40$."
      answer: "-12"
      feedback:
        - ["12", "Different signs give a negative."]
        - ["-1.2", "0.3 × 40 = 3 × 4 = 12."]
      explain: "3 × 4 = 12, different signs: −12."
  - check:
      type: answer
      q: "Work out $\\tfrac{5}{6} - (-\\tfrac{1}{3})$. Simplify."
      answer: "7/6"
      form: simplest
      feedback:
        - ["1/2", "Subtracting a negative is adding: 5/6 + 1/3."]
        - ["6/6", "1/3 = 2/6, so 5/6 + 2/6."]
      explain: "5/6 + 2/6 = 7/6 (or 1 1/6)."
  - check:
      type: answer
      q: "Review: write $\\tfrac{15}{35}$ in its simplest form."
      answer: "3/7"
      form: simplest
      feedback:
        - ["15/35", "15 and 35 share 5."]
      explain: "÷ 5: 3/7."
```

### Add negatives

### Multiply a decimal

### Subtract a negative

### Review: simplest form

## Make: two negatives that make −1

```step
stage: make
insight: "Choosing two negative fractions that add to −1 reverses the lesson: from the answer back to the parts, using quarters."
try: { playground: board, starter: "line.yml#make", height: 460 }
hint: ["Both must be between −1 and 0.", "Try −1/4 and −3/4."]
check: { type: board, text: "Set $a$ and $b$ to two negative fractions (not whole numbers) that add to $-1$.", when: "r = -1 and a > -1 and a < 0", explain: "−1/4 + (−3/4), −1/2 + (−1/2) or −3/4 + (−1/4)." }
```

Then: two negative fractions whose product is $\tfrac{1}{4}$?
