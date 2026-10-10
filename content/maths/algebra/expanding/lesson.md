---
order: 10
unit: brackets
node: AC9M8A01 n1
assumes: [AC9M8N04 n1]   # multiplying negatives (−2 × −5): Number Foundations' Multiplying and dividing integers; Algebra does not need that course first, so a quick check in Modify retrieves it
title: Expanding brackets
summary: The number outside a bracket multiplies every term inside it. 3(2x + 4) is 3 rows of 2x + 4, so 6x + 12. Then collect any like terms.
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Three friends each buy a drink and a $4 snack. Three drinks and three snacks: the 3 goes to both. That is all expanding a bracket is."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8165
  url: http://127.0.0.1:8165/index.html
  readySelector: "#sl-k"
  layout: full
explainPicture: { ref: tiles.yml#explain-pic, caption: "$3(2x + 4)$: 3 rows of $2x + 4$ make $6x + 12$." }
explainClip:
  query: { code: "@tiles.yml#explain", fresh: 1, id: explain }
  caption: "The number outside multiplies every term inside"
  say: "The number outside a bracket multiplies every term inside."
  clip:
    - caption: { text: "2(x + 3) is 2 rows of x + 3: 2x + 6.", say: "Two lots of x plus three is two rows: two x, and six ones." }
    - wait: 400
    - caption: { text: "3 rows: 3x + 9. The 3 multiplies the x and the 3.", say: "Three rows: three x plus nine. The three multiplies both terms." }
    - click: Make k bigger
    - wait: 400
    - caption: { text: "3(x − 1): each row takes 1 away, so 3x − 3.", say: "Three lots of x minus one: each row takes one away. Three x minus three." }
    - click: Make b smaller
    - click: Make b smaller
    - click: Make b smaller
    - click: Make b smaller
    - expect: { selector: "#tsum", contains: "3x − 3" }
    - wait: 1200
---
In Algebra Foundations you wrote expressions with brackets: $3(x + 2)$ means "add 2 to $x$, then multiply by 3". **Expanding** writes the same expression without the bracket.

In this lesson you find out what the number outside the bracket does to the terms inside, using algebra tiles: a long tile for each $x$ and a small square for each 1.

## Predict: 3(x + 2)

```step
stage: predict
insight: "Committing to an expansion of 3(x + 2) before building it tests whether they think the 3 reaches the 2."
check:
  type: predict
  q: "Which expression is the same as $3(x + 2)$?"
  options:
    - "$3x + 6$"
    - "$3x + 2$"
    - "$3x + 5$"
    - "$x + 6$"
  actual: "3x + 6. 3(x + 2) is 3 lots of x + 2: three x-tiles and three lots of 2 ones, which is 6."
```

Think of $x + 2$ as one row of tiles: one $x$ and two ones. What do 3 rows hold?

## Run: build it with tiles

```step
stage: run
insight: "Building k rows of the bracket and counting the tiles shows the number outside multiplies every term inside, not just the first."
try: { playground: board, starter: "tiles.yml#run", height: 560 }
check: { type: board, text: "Set the board to $3(x + 2)$ and count the tiles. Was your prediction right?", when: "k = 3 and a = 1 and b = 2" }
```

$k$ is the number outside the bracket. $a$ is the number of $x$ inside, and $b$ the number on its own. The board draws $k$ rows of the bracket, then counts every tile.

## Investigate: multiply every term

```step
stage: investigate
insight: "Expanding multiplies each term in the bracket by the number outside, signs included; collecting like terms then tidies up. Sam's mistake multiplies only the first term."
tasks:
  - check:
      type: answer
      q: "Expand $2(5x - 3)$."
      answer: "10x - 6"
      form: expanded
      feedback:
        - ["10x - 3", "The 2 multiplies the 3 too: 2 × 3 = 6."]
        - ["10x + 6", "The bracket has − 3, so 2 × (−3) = −6."]
        - ["7x - 3", "Multiply, don't add: 2 × 5x."]
      explain: "2 × 5x = 10x and 2 × (−3) = −6, so 10x − 6."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam expands $4(x + 3)$. Click the line where his working goes wrong."
      answer: 3
      fault: logic
      misconception: partial-distribution
      explain: "Line 3: the 4 multiplies every term in the bracket, so the 3 becomes 4 × 3 = 12. 4(x + 3) = 4x + 12."
  - check:
      type: working
      q: "Expand and simplify $3(2x + 4) - x$. Write one step per line."
      start: "3(2x + 4) - x"
      form: expanded
      example: ["6x + 12 - x", "5x + 12"]
      wrong: [["6x + 4 - x", "5x + 4"], ["6x + 12 - x"]]
      explain: "First expand: 6x + 12 − x. Then collect the like terms 6x and −x: 5x + 12."
```

### Expand, then collect

Here is how to expand a bracket and then collect like terms.

```worked
3(2x + 4) - x :: Expand the bracket first.
3 \times 2x = 6x :: The 3 multiplies the first term.
3 \times 4 = 12 :: And the second term: every term in the bracket.
6x + 12 - x :: The bracket is gone. The $-x$ was outside it, so it stays as it is.
5x + 12 :: Collect like terms: $6x - x = 5x$. The 12 has no like term.
```

Try one: expand $2(5x - 3)$.

### Find the mistake

Read Sam's working one line at a time. Which term did the 4 miss?

### Your working

Write each step on its own line. The checker marks the first line that does not follow.

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: bigger numbers, subtraction in the bracket, a negative outside (after a quick check of multiplying negatives), extra terms to collect, then the edge case of two brackets."
try: { playground: board, starter: "tiles.yml#vary", height: 600 }
tasks:
  - starter: "tiles.yml#vary"
    hint: "Set k, a and b, then count: k × a x-tiles and k × b ones."
    check: { type: answer, q: "Expand $5(2x + 3)$. Build it on the board to check.", answer: "10x + 15", form: expanded, feedback: [["10x + 3", "The 5 multiplies the 3 as well."]], explain: "5 × 2x = 10x and 5 × 3 = 15." }
  - starter: "tiles.yml#vary"
    hint: "b is negative here: each row has 2 negative ones."
    check: { type: answer, q: "Expand $4(3x - 2)$.", answer: "12x - 8", form: expanded, feedback: [["12x - 2", "The 4 multiplies the 2 as well."], ["12x + 8", "4 × (−2) is −8."]], explain: "4 × 3x = 12x and 4 × (−2) = −8." }
  - check:
      type: answer
      q: "Quick check before a negative outside: what is $-2 \\times (-5)$?"
      answer: "10"
      feedback:
        - ["-10", "Same signs give a positive: −2 × (−5) = 10."]
        - ["-7", "That is −2 + (−5). Multiply."]
      explain: "Same signs give a positive: 10 (Number Foundations, Multiplying and dividing integers)."
  - starter: "tiles.yml#vary"
    hint: ["Set k to −2. Every tile flips sign.", "−2 × x = −2x and −2 × (−5) = +10."]
    check: { type: answer, q: "Expand $-2(x - 5)$.", answer: "-2x + 10", form: expanded, feedback: [["-2x - 10", "A negative times a negative is positive: −2 × (−5) = +10."], ["-2x + 5", "The −2 multiplies the 5 as well."]], explain: "−2 × x = −2x and −2 × (−5) = +10, so −2x + 10." }
  - starter: "tiles.yml#collect"
    hint: ["Expand the bracket first: 2(x + 3) = 2x + 6.", "Then collect: 2x + 3x, and 6 − 1."]
    check: { type: answer, q: "Expand and simplify $2(x + 3) + 3x - 1$. Use p and q for the terms after the bracket.", answer: "5x + 5", form: expanded, feedback: [["2x + 6 + 3x - 1", "That is expanded. Now collect the like terms."], ["5x + 2", "2 × 3 = 6, then 6 − 1 = 5."]], explain: "2x + 6 + 3x − 1 = 5x + 5." }
  - check:
      type: answer
      q: "Edge case, two brackets: expand and simplify $2(x + 3) + 3(x - 1)$."
      answer: "5x + 3"
      form: expanded
      feedback:
        - ["2x + 6 + 3x - 3", "That is expanded. Now collect the like terms."]
        - ["5x + 9", "3 × (−1) is −3, not +3."]
      explain: "2x + 6 + 3x − 3 = 5x + 3. Expand each bracket on its own, then collect."
```

### Bigger numbers

Each task changes one thing. The board shows the tiles; type the expansion.

### Subtraction inside

### Quick check

Multiplying two negatives, from Number Foundations.

### A negative outside

$k$ can be negative now: watch every tile change sign.

### Collect afterwards

### Two brackets

No board for this one: expand each bracket, then collect.

## Practise: expand and simplify

```step
stage: practise
insight: "Expanding with each sign, collecting, and full working, mixed; the review keeps writing brackets from words fresh."
tasks:
  - check:
      type: answer
      q: "Expand $6(x + 2)$."
      answer: "6x + 12"
      form: expanded
      feedback:
        - ["6x + 2", "The 6 multiplies the 2 as well."]
      explain: "6 × x = 6x and 6 × 2 = 12."
  - check:
      type: answer
      q: "Expand $-3(2x - 4)$."
      answer: "-6x + 12"
      form: expanded
      feedback:
        - ["-6x - 12", "−3 × (−4) is +12."]
        - ["-6x - 4", "The −3 multiplies the 4 as well."]
      explain: "−3 × 2x = −6x and −3 × (−4) = +12."
  - check:
      type: working
      q: "Expand and simplify $4(2x - 3) + 5$. Write one step per line."
      start: "4(2x - 3) + 5"
      form: expanded
      example: ["8x - 12 + 5", "8x - 7"]
      wrong: [["8x - 3 + 5", "8x + 2"]]
      explain: "8x − 12 + 5 = 8x − 7."
  - check:
      type: question
      q: "Review: which expression means \"add 3 to $n$, then multiply by 5\"?"
      options: ["$5(n + 3)$", "$5n + 3$", "$n + 3 \\times 5$"]
      answer: 0
      feedback: [null, "5n + 3 multiplies n first, then adds 3.", "That multiplies only the 3."]
      explain: "Brackets group the part done first: 5(n + 3)."
```

### Positive

### Negative outside

### Full working

### Review

## Make: brackets backwards

```step
stage: make
insight: "Finding a bracket that expands to a given expression reverses the lesson, and shows more than one bracket can give the same result."
try: { playground: board, starter: "tiles.yml#make", height: 560 }
hint: ["Which number goes into both 6 and 12?", "Try k = 3: then 3 × a = 6 and 3 × b = 12."]
check: { type: board, text: "Set $k$, $a$ and $b$ so the bracket expands to $6x + 12$, with $k$ bigger than 1.", when: "m = 6 and c = 12 and k > 1", explain: "2(3x + 6), 3(2x + 4) and 6(x + 2) all expand to 6x + 12. Going backwards like this is called factorising." }
```

Find a bracket that expands to $6x + 12$. Then find a different one.

Stretch: which bracket with the biggest possible $k$ expands to $12x + 18$?
