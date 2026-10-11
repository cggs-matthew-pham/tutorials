---
order: 13
unit: fractions
node: AC9M7N06 n2
uses: [AC9M7N04 n1]   # simplifying fractions (Equivalent fractions)
title: Multiplying and dividing fractions
summary: "a/b × c/d is c/d of a/b: multiply the tops and multiply the bottoms. Multiplying by a fraction less than 1 makes a number smaller. Dividing asks how many fit: 3 ÷ 1/4 = 12."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Half of a pizza is left, and you eat a third of what is left. How much of the whole pizza did you eat? Fractions of fractions are multiplications."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8270
  url: http://127.0.0.1:8270/index.html
  readySelector: "#sl-c"
  layout: full
explainPicture: { ref: area.yml#explain-pic, caption: "$\\tfrac{3}{4}$ of $\\tfrac{2}{3}$: the purple overlap is 6 of the 12 small parts, so $\\tfrac{2}{3} \\times \\tfrac{3}{4} = \\tfrac{6}{12} = \\tfrac{1}{2}$." }
explainClip:
  query: { code: "@area.yml#explain", fresh: 1, id: explain }
  caption: "A fraction of a fraction"
  say: "Multiplying fractions takes a fraction of a fraction."
  clip:
    - caption: { text: "2/3 of the square is blue.", say: "Two thirds of the square is blue." }
    - wait: 800
    - caption: { text: "Take 3/4 of it: 3 of 4 rows.", say: "Now take three quarters of it." }
    - click: Make c bigger
    - click: Make c bigger
    - expect: { selector: "#gsum", contains: "6/12" }
    - wait: 600
    - caption: { text: "6 of 12 parts: tops × tops, bottoms × bottoms.", say: "Six of twelve parts: multiply the tops and the bottoms." }
    - wait: 1400
---
"Of" means multiply: $\tfrac{1}{3}$ of 12 is $\tfrac{1}{3} \times 12 = 4$. A fraction of a fraction works the same way: $\tfrac{3}{4}$ of $\tfrac{2}{3}$ is $\tfrac{2}{3} \times \tfrac{3}{4}$.

To multiply fractions, **multiply the tops and multiply the bottoms**: no common denominator needed. A square cut into columns and rows shows why: the parts multiply, and so do the shaded ones.

## Predict: half of a third

```step
stage: predict
insight: "Committing to whether 1/2 × 1/3 is bigger or smaller than 1/2 surfaces the belief that multiplying always makes bigger."
check:
  type: predict
  q: "Is $\\tfrac{1}{2} \\times \\tfrac{1}{3}$ bigger or smaller than $\\tfrac{1}{2}$?"
  options: ["Smaller", "Bigger", "The same"]
  actual: "Smaller: 1/2 × 1/3 = 1/6, a third of a half. Multiplying by a number less than 1 takes only part."
```

Think of it as $\tfrac{1}{3}$ of $\tfrac{1}{2}$.

## Run: a third of a half

```step
stage: run
insight: "Shading 1/2 of the columns and 1/3 of the rows shows the overlap is 1/6: smaller than both."
try: { playground: board, starter: "area.yml#run", height: 620 }
check: { type: board, text: "The board shows $\\tfrac{1}{2}$ of the square. Change $c$ and $d$ to show $\\tfrac{1}{2} \\times \\tfrac{1}{3}$. Was your prediction right?", when: "a = 1 and b = 2 and c = 1 and d = 3", explain: "The overlap is 1 of 6 parts: 1/2 × 1/3 = 1/6." }
```

$a$ of $b$ columns are blue; $c$ of $d$ rows are orange. The overlap is purple.

## Investigate: multiply, and divide

```step
stage: investigate
insight: "Tops times tops and bottoms times bottoms; Jack's belief that multiplying makes bigger fails for fractions less than 1. Dividing counts how many fit, so dividing by a fraction less than 1 makes bigger."
tasks:
  - check:
      type: answer
      q: "Work out $\\tfrac{2}{3} \\times \\tfrac{3}{5}$ in simplest form."
      answer: "2/5"
      form: simplest
      feedback:
        - ["6/15", "Right amount: now simplify. 6 and 15 share 3."]
        - ["5/8", "That adds. To multiply, multiply the tops and the bottoms."]
      explain: "(2 × 3)/(3 × 5) = 6/15 = 2/5."
  - check:
      type: bug
      code: "working.txt#jack"
      text: "Jack compares $\\tfrac{3}{4} \\times 20$ with 20. Click the line where his reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: multiply-makes-bigger
      explain: "Line 3: multiplying by a number less than 1 makes smaller. 3/4 of 20 is 15, less than 20."
  - check:
      type: answer
      q: "How many quarters are there in 3? Work out $3 \\div \\tfrac{1}{4}$."
      answer: "12"
      feedback:
        - ["3/4", "That is 3 × 1/4. Dividing asks how many quarters fit into 3."]
        - ["0.75", "That is 3 × 1/4. Dividing asks how many quarters fit into 3."]
      explain: "4 quarters in each whole, so 12 in 3: 3 ÷ 1/4 = 3 × 4 = 12."
```

### Multiply across; divide by flipping

Here is how each kind works.

```worked
\tfrac{2}{3} \times \tfrac{3}{4} = \tfrac{2 \times 3}{3 \times 4} = \tfrac{6}{12} = \tfrac{1}{2} :: Multiply the tops and the bottoms, then simplify.
\tfrac{3}{4} \times 20 = \tfrac{60}{4} = 15 :: A whole number is over 1: 20 = 20/1. 15 is less than 20.
\tfrac{1}{2} \div 3 = \tfrac{1}{6} :: Share a half into 3: each share is a sixth (the same as × 1/3).
3 \div \tfrac{1}{4} = 3 \times 4 = 12 :: How many quarters in 3? Dividing by 1/4 is multiplying by 4.
\tfrac{2}{3} \div \tfrac{1}{6} = \tfrac{2}{3} \times 6 = 4 :: Divide by a fraction: multiply by it flipped (1/6 flipped is 6/1 = 6).
0.4 \times 3 = 1.2 :: Decimals: 4 tenths × 3 = 12 tenths.
```

Now try one: $\tfrac{2}{3} \times \tfrac{3}{5}$.

### Find the mistake

Read Jack's reasoning. Work out $\tfrac{3}{4}$ of 20 first.

### How many fit?

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a new product on the board, a fraction of a whole number, dividing by a whole number, dividing by a fraction, then which product is bigger than the number."
try: { playground: board, starter: "area.yml#fifths", height: 620 }
tasks:
  - starter: "area.yml#fifths"
    hint: "Columns: 3 of 4. Rows: 2 of 5."
    check: { type: board, text: "Show $\\tfrac{3}{4} \\times \\tfrac{2}{5}$ on the board.", when: "a = 3 and b = 4 and c = 2 and d = 5", explain: "6 of 20 parts: 6/20 = 3/10." }
  - check:
      type: answer
      q: "Work out $\\tfrac{2}{5}$ of 30."
      answer: "12"
      feedback:
        - ["75", "That is 30 ÷ 2/5. 'Of' means multiply: a fifth of 30 is 6."]
      explain: "30 ÷ 5 = 6, × 2 = 12."
  - check:
      type: answer
      q: "Work out $\\tfrac{3}{4} \\div 3$ in simplest form."
      answer: "1/4"
      form: simplest
      feedback:
        - ["9/4", "That is × 3. Share 3 quarters into 3 groups."]
        - ["3/12", "Right amount: simplify."]
      explain: "Share 3 quarters into 3: one quarter each. (3/4 × 1/3 = 3/12 = 1/4.)"
  - check:
      type: answer
      q: "Work out $\\tfrac{2}{3} \\div \\tfrac{1}{6}$."
      answer: "4"
      feedback:
        - ["1/9", "That multiplies. How many sixths fit in 2/3?"]
        - ["2/18", "That multiplies. How many sixths fit in 2/3?"]
      explain: "2/3 = 4/6, so four sixths fit: 2/3 × 6 = 4."
  - check:
      type: question
      q: "Edge case: which of these is bigger than 12?"
      options: ["$12 \\times \\tfrac{5}{4}$", "$12 \\times \\tfrac{3}{4}$", "$12 \\times \\tfrac{1}{2}$", "$12 \\div 2$"]
      answer: 0
      feedback: [null, "3/4 is less than 1, so the answer is less than 12: 9.", "Half of 12 is 6.", "12 ÷ 2 = 6."]
      explain: "5/4 is more than 1, so 12 × 5/4 = 15 is bigger. Multiplying makes bigger only when the multiplier is more than 1."
```

### Three quarters of two fifths

Each task changes one thing.

### Of a whole number

### Divide by a whole number

### Divide by a fraction

### Bigger or smaller?

## Practise: multiply and divide

```step
stage: practise
insight: "Fractions, a decimal and a division, mixed; 'multiplying makes bigger' is the planted slip; the review keeps adding fractions fresh."
tasks:
  - check:
      type: answer
      q: "Work out $\\tfrac{4}{5} \\times \\tfrac{5}{8}$ in simplest form."
      answer: "1/2"
      form: simplest
      feedback:
        - ["20/40", "Right amount: simplify."]
      explain: "20/40 = 1/2."
  - check:
      type: answer
      q: "A bottle holds 0.6 L. How many litres do 4 bottles hold?"
      answer: "2.4"
      feedback:
        - ["24", "6 tenths × 4 = 24 tenths: 2.4."]
        - ["0.24", "4 bottles hold more than 1 bottle: 6 tenths × 4 = 24 tenths."]
      explain: "0.6 × 4 = 2.4 L."
  - check:
      type: answer
      q: "A ribbon is $\\tfrac{3}{4}$ m long. How many pieces $\\tfrac{1}{8}$ m long can be cut from it?"
      answer: "6"
      feedback:
        - ["3/32", "That multiplies. How many eighths fit in 3/4?"]
      explain: "3/4 = 6/8: six eighths. (3/4 ÷ 1/8 = 3/4 × 8 = 6.)"
  - check:
      type: answer
      q: "Review: work out $\\tfrac{1}{2} + \\tfrac{1}{5}$."
      answer: "7/10"
      form: simplest
      feedback:
        - ["2/7", "That adds across. Write both in tenths."]
      explain: "5/10 + 2/10 = 7/10."
```

### Multiply

### Decimals

### Divide in context

### Review: adding

## Make: a quarter, another way

```step
stage: make
insight: "Building a product equal to 1/4 other than 1/2 × 1/2 shows many products share a value, and that simplifying is part of multiplying."
try: { playground: board, starter: "area.yml#make", height: 680 }
hint: ["Try 1/2 of something that is 1/2 once simplified, such as 2/4.", "Or 3/4 × 1/3."]
check: { type: board, text: "Make the overlap exactly $\\tfrac{1}{4}$ of the square, without using $\\tfrac{1}{2} \\times \\tfrac{1}{2}$.", when: "v = 0.25 and q > 4 and a < b and c < d", explain: "For example 3/4 × 1/3 = 3/12, 2/4 × 1/2 = 2/8, or 2/3 × 3/8 = 6/24." }
```

Then find one where neither fraction has a 1 on top.
