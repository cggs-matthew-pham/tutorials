---
order: 11
unit: brackets
node: AC9M8A01 n2
title: Factorising
summary: "Factorising is expanding backwards. Share the terms into equal rows: 6x + 9 is 3 rows of 2x + 3, so 3(2x + 3). Take out the highest common factor, then check by expanding."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "6 x-tiles and 9 ones. Can you share them into equal rows, with nothing left over? The number of rows goes outside the bracket."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8167
  url: http://127.0.0.1:8167/index.html
  readySelector: "#sl-k"
  layout: full
explainPicture: { ref: factor.yml#explain-pic, caption: "$6x + 9$ shared into 3 equal rows: each row is $2x + 3$, so $6x + 9 = 3(2x + 3)$." }
explainClip:
  query: { code: "@factor.yml#explain", fresh: 1, id: explain }
  caption: "Share the tiles into equal rows"
  say: "Factorising shares the tiles into equal rows."
  clip:
    - caption: { text: "6x + 9: 6 x-tiles and 9 ones.", say: "Six x tiles and nine ones." }
    - wait: 400
    - caption: { text: "2 rows: 9 ones do not share into 2.", say: "Two rows do not work: nine ones do not share into two." }
    - click: Make k bigger
    - wait: 400
    - caption: { text: "3 rows of 2x + 3: 6x + 9 = 3(2x + 3).", say: "Three rows of two x plus three. That is the bracket." }
    - click: Make k bigger
    - expect: { selector: "#tsum", contains: "6x + 9 = 3(2x + 3)" }
    - wait: 1200
---
In Expanding brackets you turned $3(2x + 4)$ into $6x + 12$. **Factorising** goes the other way: from $6x + 12$ back to a bracket.

In this lesson you share algebra tiles into equal rows. The number of rows goes outside the bracket, and one row goes inside.

## Predict: fully factorised

```step
stage: predict
insight: "Committing to a factorisation of 6x + 9 before using the board tests whether they divide every term, and whether they take out the biggest number."
check:
  type: predict
  q: "Which is $6x + 9$ written as a bracket, with the biggest possible number outside?"
  options:
    - "$3(2x + 3)$"
    - "$6(x + 9)$"
    - "$3(2x + 9)$"
    - "$2(3x + 4.5)$"
  actual: "3(2x + 3). 3 goes into 6 and into 9: 6x ÷ 3 = 2x and 9 ÷ 3 = 3. Check by expanding: 3 × 2x = 6x and 3 × 3 = 9."
```

Think about it: which number goes into both 6 and 9?

## Run: share into rows

```step
stage: run
insight: "Trying k = 1, 2, 3 on the tiles shows which numbers of rows work (the ones that divide both totals) and what each row holds."
try: { playground: board, starter: "factor.yml#run", height: 560 }
check: { type: board, text: "The board has $6x + 9$. Change $k$, the number of rows, until the tiles share into equal rows with more than one row. Was your prediction right?", when: "k = 3 and f = 1" }
```

$k$ is the number of rows. When the tiles share equally, the board writes the bracket: $k$ outside, one row inside.

## Investigate: the highest common factor

```step
stage: investigate
insight: "Factorising divides every term by a common factor; taking out the highest common factor leaves nothing more to share, and expanding checks it. Ava's mistake takes out a common factor that is not the highest."
tasks:
  - check:
      type: answer
      q: "Factorise $10x + 15$ fully."
      answer: "5(2x + 3)"
      form: factorised
      feedback:
        - ["5(2x + 15)", "Divide every term: 15 ÷ 5 = 3."]
        - ["5(5x + 10)", "Divide by 5, don't subtract it: 10x ÷ 5 = 2x."]
      explain: "The HCF of 10 and 15 is 5: 10x ÷ 5 = 2x and 15 ÷ 5 = 3. Check: 5 × 2x + 5 × 3 = 10x + 15."
  - check:
      type: bug
      code: "working.txt#ava"
      text: "Ava factorises $12x - 8$. Click the line where her working goes wrong."
      answer: 2
      fault: logic
      misconception: hcf-not-highest
      explain: "Line 2: 2 goes into both, but 4 is the biggest. 6x − 4 still shares a 2, so it is not fully factorised: 12x − 8 = 4(3x − 2)."
  - check:
      type: question
      q: "How can you check that $4(3x - 2)$ is right for $12x - 8$?"
      options: ["Expand it and compare", "Add 4 to each term", "Check that 3 and 2 are both prime"]
      answer: 0
      feedback: [null, "Factorising divides; the check multiplies back.", "That says nothing about 12x − 8."]
      explain: "Expand: 4 × 3x = 12x and 4 × (−2) = −8. You are back to 12x − 8."
```

### Take out the HCF

Here is how to factorise, then check.

```worked
12x - 8 :: Find a number that goes into every term.
\text{HCF of } 12 \text{ and } 8 = 4 :: Take out the biggest: the highest common factor.
12x \div 4 = 3x :: Divide every term by 4.
-8 \div 4 = -2 :: The sign comes too.
4(3x - 2) :: The HCF goes outside; what is left goes inside.
4 \times 3x - 4 \times 2 = 12x - 8 :: Check by expanding.
```

Try one: factorise $10x + 15$.

### Find the mistake

Read Ava's working one line at a time. Is her answer wrong, or just not finished?

### Check it

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: different numbers on the board, a minus sign, three terms, a letter as the common factor, then the edge case of nothing to take out."
try: { playground: board, starter: "factor.yml#vary", height: 560 }
tasks:
  - starter: "factor.yml#vary"
    hint: "Which numbers go into both 10 and 15? Try the biggest."
    check: { type: board, text: "The board has $10x + 15$. Share it into the most rows that work.", when: "h = 1", explain: "5 rows of 2x + 3: 10x + 15 = 5(2x + 3)." }
  - check:
      type: answer
      q: "Factorise $9x - 6$ fully."
      answer: "3(3x - 2)"
      form: factorised
      feedback:
        - ["3(3x + 2)", "The minus comes too: −6 ÷ 3 = −2."]
        - ["3(3x - 6)", "Divide every term: 6 ÷ 3 = 2."]
      explain: "HCF 3: 9x ÷ 3 = 3x and −6 ÷ 3 = −2. Check: 3(3x − 2) = 9x − 6."
  - check:
      type: answer
      q: "Three terms: factorise $4x + 8y - 12$ fully."
      answer: "4(x + 2y - 3)"
      form: factorised
      feedback:
        - ["4(x + 8y - 12)", "Divide every term by 4, not only the first."]
        - ["2(2x + 4y - 6)", "2 goes into all three, but 4 is bigger."]
      explain: "4 goes into 4, 8 and 12: 4(x + 2y − 3)."
  - check:
      type: answer
      q: "A letter can be a common factor too. Factorise $2x^2 + 4x$ fully."
      answer: "2x(x + 2)"
      form: factorised
      feedback:
        - ["2(x^2 + 2x)", "x goes into both terms as well: take it out too."]
        - ["x(2x + 4)", "2 goes into both terms as well."]
      explain: "2 and x go into both: 2x² ÷ 2x = x and 4x ÷ 2x = 2, so 2x(x + 2)."
  - check:
      type: question
      q: "Edge case: can $7x + 5$ be factorised?"
      options: ["No: no number bigger than 1 goes into 7 and 5", "Yes: 7(x + 5)", "Yes: 5(7x + 1)"]
      answer: 0
      feedback: [null, "Expand it: 7(x + 5) = 7x + 35.", "Expand it: 5(7x + 1) = 35x + 5."]
      explain: "The HCF of 7 and 5 is 1, so 7x + 5 is already as simple as it gets. On the board, only 1 row works."
```

### On the board

Each task changes one thing.

### A minus sign

No board from here: divide each term, then check by expanding.

### Three terms

### A letter in common

### Nothing to take out

## Practise: factorise and check

```step
stage: practise
insight: "Factorising with each sign and full working, mixed; stopping at a common factor that is not the highest is the planted slip, and the review keeps expanding fresh."
tasks:
  - check:
      type: answer
      q: "Factorise $15x + 20$ fully."
      answer: "5(3x + 4)"
      form: factorised
      feedback:
        - ["5(3x + 20)", "Divide every term by 5."]
      explain: "HCF 5: 5(3x + 4)."
  - check:
      type: answer
      q: "Factorise $8x - 12$ fully."
      answer: "4(2x - 3)"
      form: factorised
      feedback:
        - ["2(4x - 6)", "4x − 6 still shares a 2. Take out the biggest: 4."]
        - ["4(2x + 3)", "The minus comes too: −12 ÷ 4 = −3."]
      explain: "HCF 4: 4(2x − 3)."
  - check:
      type: working
      q: "Factorise $18x + 12$ fully. You may take out a factor in steps. Write one step per line."
      start: "18x + 12"
      form: factorised
      example: ["2(9x + 6)", "6(3x + 2)"]
      wrong: [["2(9x + 6)"], ["6(3x + 12)"]]
      explain: "2(9x + 6) still shares a 3, so take it out too: 6(3x + 2). Or take out the HCF 6 straight away."
  - check:
      type: answer
      q: "Review: expand $3(2x - 5)$."
      answer: "6x - 15"
      form: expanded
      feedback:
        - ["6x - 5", "The 3 multiplies the 5 as well."]
      explain: "3 × 2x = 6x and 3 × (−5) = −15."
```

### Positive

### A minus sign

### Full working

### Review: expanding

## Make: four rows

```step
stage: make
insight: "Choosing tiles that factorise fully with exactly 4 outside reverses the lesson: from the factor back to the expression."
try: { playground: board, starter: "factor.yml#make", height: 560 }
hint: ["Both numbers must be in the 4 times table.", "But the rows must not share further: 8 and 16 have HCF 8, not 4."]
check: { type: board, text: "Set $s$ and $t$ so that $sx + t$ is fully factorised with 4 outside the bracket, then set $k$ to 4.", when: "k = 4 and h = 1", explain: "8x + 12 = 4(2x + 3), 4x + 8 = 4(x + 2) and 12x + 4 = 4(3x + 1) all work. 8x + 8 does not: its HCF is 8." }
```

Find an expression $sx + t$ that factorises fully as $4(\ldots)$. Then find another.

Stretch: why can't $s$ and $t$ both be multiples of 8?
