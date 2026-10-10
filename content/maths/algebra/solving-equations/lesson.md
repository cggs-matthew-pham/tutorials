---
order: 13
unit: solving
node: AC9M8A02 n2
uses: [AC9M8A01 n1]   # expanding brackets first
assumes: [AC9M8A02 n1]   # graphing lines: Linear relations (Lines and their rules); the Run board draws both lines, so plotting is not needed here
title: Solving harder equations
summary: "Get the x terms on one side and the numbers on the other, doing the same to both sides; expand any brackets first. Then check by substituting into the first equation."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Two phone plans: 7 dollars plus 3 a gigabyte, or 5 a gigabyte minus a 9 dollar credit. When do they cost the same? 3x + 7 = 5x − 9."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8175
  url: http://127.0.0.1:8175/index.html
  readySelector: "#legend"
  layout: full
explainPicture: { ref: graph.yml#explain, caption: "$y = 3x + 7$ and $y = 5x - 9$ meet at $(8, 31)$: both sides of $3x + 7 = 5x - 9$ equal 31 when $x = 8$." }
explainClip:
  query: { code: "@graph.yml#explain", fresh: 1, id: explain }
  caption: "Same to both sides, then check"
  say: "Collect the x terms on one side, the numbers on the other."
  clip:
    - caption: { text: "3x + 7 = 5x − 9. Take 3x from both sides: 7 = 2x − 9.", say: "Take three x from both sides. Seven equals two x take nine." }
    - wait: 1200
    - caption: { text: "Add 9 to both sides: 16 = 2x. Halve: x = 8.", say: "Add nine to both sides, then halve. x is eight." }
    - wait: 1200
    - caption: { text: "Check: 3 × 8 + 7 = 31 and 5 × 8 − 9 = 31. The lines meet at x = 8.", say: "Check: both sides are thirty one. The lines meet there." }
    - wait: 1600
---
In Year 7 you solved equations with the balance method, even with $x$ on both sides. Year 8 equations add negatives, brackets and fractions, where blocks on a scale no longer help. The rule is the same: **do the same to both sides**, until $x$ is on its own.

Then **check**: put your answer back into the first equation. If both sides are equal, it is right.

## Predict: when do they cost the same?

```step
stage: predict
insight: "Committing to a solution of 3x + 7 = 5x − 9 before solving shows whether they can reason about both sides; the graph then shows the solution as where the two sides are equal."
check:
  type: predict
  q: "Which value of $x$ makes $3x + 7 = 5x - 9$ true?"
  options:
    - "$x = 8$"
    - "$x = 1$"
    - "$x = -8$"
    - "$x = 2$"
  actual: "x = 8. Check: 3 × 8 + 7 = 31 and 5 × 8 − 9 = 31. Both sides are equal."
```

Try each option in both sides. Or solve it: what could you take from both sides first?

## Run: where both sides are equal

```step
stage: run
insight: "Each side of the equation is a line; the solution is where they meet, because there both sides have the same value."
try: { playground: board, starter: "graph.yml#run", height: 600 }
check: { type: board, text: "The two lines are $y = 3x + 7$ and $y = 5x - 9$. Drag $P$ to where they meet. Was your prediction right?", when: "P on y = 3x + 7 and P on y = 5x - 9" }
```

Read $P$'s coordinates. Which number is the solution, and what does the other one tell you?

## Investigate: same to both sides

```step
stage: investigate
insight: "Move the smaller x term (so the x term stays positive), then the numbers, then divide; substitute to check. Ben's mistake takes 7 away to undo − 7, instead of adding it."
tasks:
  - check:
      type: working
      q: "Solve $3x + 7 = 5x - 9$. Write one step per line."
      start: "3x + 7 = 5x - 9"
      form: subject x
      example: ["7 = 2x - 9", "16 = 2x", "x = 8"]
      wrong: [["8x + 7 = -9", "8x = -16", "x = -2"], ["7 = 2x - 9", "-2 = 2x", "x = -1"]]
      explain: "Take 3x from both sides: 7 = 2x − 9. Add 9: 16 = 2x. Halve: x = 8."
  - check:
      type: bug
      code: "working.txt#ben"
      text: "Ben solves $2x + 5 = 4x - 7$. Click the line where his working goes wrong."
      answer: 3
      fault: logic
      misconception: inverse-sign
      explain: "Line 3: to undo − 7, add 7 to both sides: 12 = 2x, so x = 6. Check: 2 × 6 + 5 = 17 and 4 × 6 − 7 = 17."
  - check:
      type: answer
      q: "Check $x = 8$ in $3x + 7 = 5x - 9$: what is the value of each side?"
      answer: "31"
      feedback:
        - ["8", "That is x. Put 8 in for x on each side."]
      explain: "3 × 8 + 7 = 31 and 5 × 8 − 9 = 31: equal, so x = 8 is right."
```

### Solve, then check

Here is how to solve with $x$ on both sides.

```worked
3x + 7 = 5x - 9 :: $x$ is on both sides.
7 = 2x - 9 :: Take $3x$ from both sides (the smaller $x$ term, so $2x$ stays positive).
16 = 2x :: Add 9 to both sides: this undoes $- 9$.
x = 8 :: Divide both sides by 2.
3(8) + 7 = 31,\; 5(8) - 9 = 31 :: Check in the first equation: both sides are 31.
```

Now solve it yourself, one step per line. The checker marks the first line that does not follow.

### Find the mistake

Read Ben's working one line at a time. How do you undo $- 7$?

### Check by substituting

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a bracket, a negative answer, a fraction, brackets on both sides, then the edge case of an equation with no solution."
tasks:
  - check:
      type: working
      q: "A bracket: solve $2(x + 3) = x + 10$. Expand first. One step per line."
      start: "2(x + 3) = x + 10"
      form: subject x
      example: ["2x + 6 = x + 10", "x + 6 = 10", "x = 4"]
      wrong: [["2x + 3 = x + 10", "x + 3 = 10", "x = 7"]]
      explain: "Expand: 2x + 6 = x + 10. Take x: x + 6 = 10. Take 6: x = 4. Check: 2(4 + 3) = 14 and 4 + 10 = 14."
  - check:
      type: answer
      q: "A negative answer: solve $4x - 3 = 7x + 12$."
      answer: "-5"
      feedback:
        - ["5", "Check it: 4 × 5 − 3 = 17 but 7 × 5 + 12 = 47. Watch the signs."]
        - ["3", "Take 4x from both sides first: −3 = 3x + 12."]
      explain: "Take 4x: −3 = 3x + 12. Take 12: −15 = 3x. So x = −5. Check: 4(−5) − 3 = −23 and 7(−5) + 12 = −23."
  - check:
      type: answer
      q: "A fraction: solve $\\dfrac{x}{3} + 2 = 6$."
      answer: "12"
      feedback:
        - ["4", "That is x/3. Multiply by 3 to undo ÷ 3."]
        - ["24", "Take 2 away first: x/3 = 4."]
      explain: "Take 2: x/3 = 4. Multiply by 3: x = 12. Check: 12 ÷ 3 + 2 = 6."
  - check:
      type: working
      q: "Brackets on both sides: solve $3(x - 2) = 2(x + 1)$. One step per line."
      start: "3(x - 2) = 2(x + 1)"
      form: subject x
      example: ["3x - 6 = 2x + 2", "x - 6 = 2", "x = 8"]
      wrong: [["3x - 2 = 2x + 1", "x = 3"]]
      explain: "Expand both: 3x − 6 = 2x + 2. Take 2x: x − 6 = 2. Add 6: x = 8. Check: 3(6) = 18 and 2(9) = 18."
  - check:
      type: question
      q: "Edge case: solve $2x + 3 = 2x + 5$. What happens?"
      options: ["No value works: taking 2x away leaves 3 = 5, which is never true", "x = 1", "x = 0"]
      answer: 0
      feedback: [null, "Check: 2 + 3 = 5 but 2 + 5 = 7.", "Check: 3 is not 5."]
      explain: "Taking 2x from both sides leaves 3 = 5: false for every x, so there is no solution. On a graph, the two lines are parallel and never meet."
```

### A bracket

Each task changes one thing. Check each answer by substituting.

### A negative answer

### A fraction

### Brackets on both sides

### No solution

## Practise: solve and check

```step
stage: practise
insight: "Equations with x on both sides, negatives and a geometry context, mixed; the inverse-sign slip is planted again; the review keeps expanding fresh."
tasks:
  - check:
      type: working
      q: "Solve $5x - 4 = 2x + 11$. One step per line."
      start: "5x - 4 = 2x + 11"
      form: subject x
      example: ["3x - 4 = 11", "3x = 15", "x = 5"]
      wrong: [["3x - 4 = 11", "3x = 7", "x = 7/3"]]
      explain: "Take 2x: 3x − 4 = 11. Add 4: 3x = 15. x = 5. Check: 21 = 21."
  - check:
      type: answer
      q: "Solve $6 - x = 2x - 9$."
      answer: "5"
      feedback:
        - ["-5", "Check: 6 − (−5) = 11, but 2(−5) − 9 = −19."]
        - ["1", "Add x to both sides first: 6 = 3x − 9."]
      explain: "Add x: 6 = 3x − 9. Add 9: 15 = 3x. x = 5. Check: 1 = 1."
  - check:
      type: answer
      q: "Angles on a straight line are $3x$ and $x + 20$ degrees. Find $x$."
      answer: "40"
      feedback:
        - ["45", "3x + x + 20 = 180, so 4x = 160."]
        - ["160", "That is 4x. Divide by 4."]
      explain: "3x + x + 20 = 180, so 4x = 160 and x = 40. The angles are 120° and 60°."
  - check:
      type: answer
      q: "Review: expand $4(2x - 3)$."
      answer: "8x - 12"
      form: expanded
      feedback:
        - ["8x - 3", "The 4 multiplies the 3 as well."]
      explain: "4 × 2x = 8x and 4 × (−3) = −12."
```

### x on both sides

### Negative x

### Angles

### Review: expanding

## Make: build an equation

```step
stage: make
insight: "Choosing a second line that meets y = 2x + 1 at x = 3 builds an equation with that solution, reversing the lesson: from the answer to the equation."
try: { playground: board, starter: "graph.yml#make", height: 600 }
hint: ["At x = 3, the first line is at y = 7. Your line must pass through (3, 7).", "Try m = 4: then c must make 4 × 3 + c = 7."]
check: { type: board, text: "Set $m$ and $c$ so that $2x + 1 = mx + c$ has the solution $x = 3$, with $m$ more than 2.", when: "3m + c = 7 and m > 2", explain: "For example m = 4, c = −5: 2x + 1 = 4x − 5 gives x = 3. Any line through (3, 7) works." }
```

Write your equation, then solve it on paper to check.
