---
order: 2
unit: expressions
title: Substituting into formulas
summary: To use a formula, replace each letter with its value, write in the × signs, then work it out in the right order.
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A formula is a recipe for a number. Put in the values you know, and it gives you the one you want: a perimeter, a cost, a speed."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8143
  url: http://127.0.0.1:8143/index.html
  readySelector: "#sl-l"
  layout: full
explainClip:
  query: { code: "@formula.yml#explain", fresh: 1, id: explain }
  caption: "Replace each letter with its value"
  say: "To use a formula, replace each letter with its value."
  clip:
    - caption: { text: "P = 2l + 2w, with l = 3 and w = 2.", say: "P equals two l plus two w, with l as three and w as two." }
    - wait: 400
    - caption: { text: "2l means 2 × l: write in the × signs.", say: "Two l means two times l, so write in the times signs." }
    - wait: 400
    - caption: { text: "2 × 3 + 2 × 2 = 6 + 4 = 10 cm.", say: "Two times three, plus two times two, is six plus four: ten." }
    - click: Make l bigger
    - wait: 400
    - caption: { text: "New values, same formula: 2 × 4 + 2 × 2 = 12 cm.", say: "New values, same formula: two times four plus two times two is twelve." }
    - expect: { selector: ".rulework", contains: "P = 2 × 4 + 2 × 2 = 12" }
    - wait: 1200
---
To **substitute** into a formula is to replace each letter with its value, then work out the answer. A number written next to a letter, such as $2l$, means multiply: $2 \times l$.

## Predict: a perimeter

```step
stage: predict
insight: "Committing to a value exposes reading 2l with l = 5 as 25, the digits side by side."
check:
  type: predict
  q: "$P = 2l + 2w$. What is $P$ when $l = 5$ and $w = 3$?"
  options: ["16", "13", "30", "48"]
  actual: "16. 2l means 2 × l = 2 × 5 = 10, and 2w = 2 × 3 = 6. So P = 10 + 6 = 16. (48 comes from reading 2l as 25 and 2w as 23.)"
```

$$P = 2l + 2w$$

What does $2l$ mean? Write the formula again with the × signs in.

## Run: check your value

```step
stage: run
insight: "The board writes every substitution out with the × signs, so the student can compare it with their own working."
try: { playground: board, starter: "formula.yml#run", height: 520 }
check: { type: board, text: "Set $l = 5$ and $w = 3$. Was your prediction right?", when: "l = 5 and w = 3" }
```

Read the working under the rectangle. Where did the × signs come from?

## Investigate: three steps

```step
stage: investigate
insight: "Substituting is three steps: write the formula, replace each letter (with × signs in), then work out in order: multiply before adding."
tasks:
  - check:
      type: answer
      q: "The area of a rectangle is $A = lw$. Find $A$ when $l = 8$ and $w = 3$."
      answer: "24"
      feedback:
        - ["83", "lw means l × w. Put the numbers in with a × sign between them."]
        - ["11", "lw means l × w, not l + w."]
      explain: "A = 8 × 3 = 24."
  - check:
      type: answer
      q: "A plumber charges $C = 5h + 20$ dollars. Find $C$ when $h = 3$."
      answer: "35"
      feedback:
        - ["75", "That adds first: 5 × (3 + 20). Multiply first, then add: 5 × 3 + 20."]
        - ["73", "5h means 5 × h, not 5 then 3."]
        - ["15", "That is the hours only. Add the 20."]
      explain: "C = 5 × 3 + 20 = 15 + 20 = 35 dollars."
  - check:
      type: bug
      code: "working.txt#leo"
      text: "Leo works out a perimeter. Click the line where he goes wrong."
      answer: 2
      fault: logic
      misconception: algebra-juxtaposition
      explain: "Line 2: 2l means 2 × l, so 2 × 5 = 10, not 25. With the × signs in: P = 2 × 5 + 2 × 3 = 10 + 6 = 16."
```

### Area

Here is how to substitute, step by step.

```worked
P = 2l + 2w :: Write the formula first.
l = 5, \; w = 3 :: Write down the values you know.
P = 2 \times 5 + 2 \times 3 :: Replace each letter with its value. Write in the × signs that were hidden in $2l$ and $2w$.
P = 10 + 6 :: Multiply before adding.
P = 16 \text{ cm} :: Add, and give the units.
```

### A plumber

### Find the mistake

Read Leo's working one line at a time. What does $2l$ mean?

## Modify: other formulas

```step
stage: modify
insight: "One change at a time: a decimal value, three letters multiplied, a division, and brackets that are worked out first."
try: { playground: board, starter: "formula.yml#decimal", height: 520 }
tasks:
  - starter: "formula.yml#decimal"
    check:
      type: answer
      q: "Find $P = 2l + 2w$ when $l = 2.5$ and $w = 4$. Set the board to check your substitution."
      answer: "13"
      feedback:
        - ["25", "2l is 2 × 2.5 = 5, not 2 then 2.5."]
        - ["8.5", "That adds l and w once each. There are two of each."]
      explain: "P = 2 × 2.5 + 2 × 4 = 5 + 8 = 13 cm."
  - starter: "formula.yml#box"
    check:
      type: answer
      q: "The volume of a box is $V = lwh$. Find $V$ when $l = 2$, $w = 3$ and $h = 4$."
      answer: "24"
      feedback:
        - ["9", "lwh means l × w × h, not l + w + h."]
        - ["234", "lwh means multiply: put × signs between the values."]
      explain: "V = 2 × 3 × 4 = 24 cubic units."
  - starter: "formula.yml#speed"
    check:
      type: answer
      q: "Average speed is $s = d / t$ (distance ÷ time). Find $s$ in km/h when $d = 120$ km and $t = 2$ hours."
      answer: "60"
      feedback:
        - ["240", "d / t means d ÷ t. Divide, don't multiply."]
      explain: "s = 120 ÷ 2 = 60 km/h."
  - starter: "formula.yml#brackets"
    check:
      type: answer
      q: "A hire company charges $C = 5(h + 4)$ dollars. Find $C$ when $h = 2$."
      answer: "30"
      feedback:
        - ["14", "That is 5 × 2 + 4. The brackets are worked out first: 2 + 4, then × 5."]
        - ["56", "5(h + 4) means 5 × (h + 4). Put h = 2 in the brackets first."]
      explain: "C = 5 × (2 + 4) = 5 × 6 = 30 dollars."
```

### A decimal

Each task loads a new formula. The board shows the substitution, but not the answer: work it out yourself.

### Three letters

### Divide

### Brackets

## Practise: substitute

```step
stage: practise
insight: "Substituting into new formulas with the order of operations, mixed; the review is naming variables and constants from the last lesson."
tasks:
  - check:
      type: answer
      q: "Find $T = 12n + 6$ when $n = 4$."
      answer: "54"
      feedback:
        - ["130", "12n with n = 4 is 12 × 4, not 124. Then add 6."]
        - ["120", "That adds first. Multiply 12 × 4, then add 6."]
      explain: "T = 12 × 4 + 6 = 48 + 6 = 54."
  - check:
      type: answer
      q: "Find $y = 3(x - 2)$ when $x = 7$."
      answer: "15"
      feedback:
        - ["19", "That is 3 × 7 − 2. Work out the brackets first: 7 − 2."]
      explain: "y = 3 × (7 − 2) = 3 × 5 = 15."
  - check:
      type: answer
      q: "Find $A = \\frac{bh}{2}$ (the area of a triangle) when $b = 6$ and $h = 5$."
      answer: "15"
      feedback:
        - ["30", "That is b × h. The formula then divides by 2."]
        - ["5.5", "bh means b × h, not b + h."]
      explain: "A = 6 × 5 ÷ 2 = 30 ÷ 2 = 15."
  - check:
      type: question
      q: "Review: in $V = 3t + 10$, which are the constants?"
      options: ["3 and 10", "$V$ and $t$", "Only 10"]
      answer: 0
      explain: "3 and 10 stay the same; V and t are variables that change."
```

### Tickets

### Brackets again

### A triangle

### Review

## Make: rectangles with the same area

```step
stage: make
insight: "Choosing values to hit a target reverses substitution: from the answer back to the letters."
try: { playground: board, starter: "formula.yml#make", height: 520 }
hint: ["A = l × w. Which two whole numbers multiply to 24?", "Try l = 6. What must w be?"]
check: { type: board, text: "Make a rectangle with an area of 24 cm².", when: "A = 24", explain: "Your l × w = 24. Other pairs work too: 3 × 8, 4 × 6, 2 × 12." }
```

Find a rectangle with area 24 cm². Then find another one. How many can you find with whole-number sides?

Stretch: which of your rectangles has the smallest perimeter? Use $P = 2l + 2w$ to check.
