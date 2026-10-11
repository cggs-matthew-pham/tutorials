---
order: 14
unit: solving
node: AC9M8A02 n3
assumes: [AC9M8A02 n1]   # graphing inequalities: Linear relations, Lines and regions; the boards here draw the lines
title: Inequalities
summary: "Solve an inequality like an equation, doing the same to both sides, but when you multiply or divide by a negative, reverse the inequality sign. Show the answer on a number line: open circle for < and >, closed for ≤ and ≥. Check with a value."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "You need more than 50 points to pass, and a ride needs riders at least 120 cm tall. Not one answer: a whole range of them."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8177
  url: http://127.0.0.1:8177/index.html
  readySelector: "#legend"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "$-2x$ is more than 6 (the line above the dashed one) to the left of $x = -3$: the solution of $-2x > 6$ is $x < -3$." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Dividing by a negative turns it round"
  say: "Dividing by a negative reverses the inequality."
  clip:
    - caption: { text: "−2x > 6. The line y = −2x is above y = 6 on the left of x = −3.", say: "Minus two x is more than six on the left of minus three." }
    - wait: 1200
    - caption: { text: "So x < −3. Dividing by −2 reversed > into <.", say: "So x is less than minus three. Dividing by minus two turned the inequality sign round." }
    - wait: 1200
    - caption: { text: "Check x = −4: −2 × (−4) = 8, and 8 > 6. ✓", say: "Check: minus four gives eight, and eight is more than six." }
    - wait: 1400
---
An **inequality** compares two sides with $<$, $>$, $\le$ or $\ge$. Its solution is usually a whole range of values, such as $x < 5$, which you can show on a number line.

You solve it like an equation, doing the same to both sides, with one new rule. This lesson finds the rule, and why it works.

## Predict: a negative in front

```step
stage: predict
insight: "Committing to a solution of −2x > 6 shows whether they divide by −2 and keep the sign, the slip this lesson is built around."
check:
  type: predict
  q: "Which is the solution of $-2x > 6$?"
  options:
    - "$x < -3$"
    - "$x > -3$"
    - "$x > 3$"
    - "$x < 3$"
  actual: "x < −3. Check x = −4: −2 × (−4) = 8, and 8 > 6. But x = 0 (which x > −3 allows) gives 0, and 0 > 6 is false."
```

Pick a value from your answer and check it in $-2x > 6$.

## Run: when is −2x more than 6?

```step
stage: run
insight: "Dragging P along y = −2x to where it is above y = 6 shows the solution lies to the left of −3: the sign turned round."
try: { playground: board, starter: "boards.yml#run", height: 600 }
check: { type: board, text: "$P$ is on the line $y = -2x$. Drag it to a point where $-2x$ is more than 6 (above the dashed line). Was your prediction right?", when: "P on y = -2x and y(P) > 6" }
```

Where are all the points that work: left or right of $x = -3$?

## Investigate: solve, show, check

```step
stage: investigate
insight: "Adding, subtracting, and multiplying or dividing by a positive keep the inequality sign; multiplying or dividing by a negative reverses it, because it flips the order on the number line. Mia keeps the inequality sign after dividing by −2."
try: { playground: board, starter: "boards.yml#ray", height: 380 }
tasks:
  - starter: "boards.yml#ray"
    hint: ["3x − 4 < 11: add 4, then divide by 3.", "x < 5: open circle at 5 (5 itself is not included), shade left."]
    check: { type: board, text: "Solve $3x - 4 < 11$, then show the solution: move $P$, choose the circle and the direction.", when: "x(P) = 5 and k = 0 and s = -1", explain: "3x < 15, so x < 5: an open circle at 5, shaded left." }
  - check:
      type: bug
      code: "working.txt#mia"
      text: "Mia solves $-2x > 6$. Click the line where her working goes wrong."
      answer: 3
      fault: logic
      misconception: inequality-reverse
      explain: "Line 3: dividing by −2 reverses the inequality sign, so x < −3. Her check on line 4 fails, which is the clue: x = 0 should work if x > −3 were right."
  - check:
      type: question
      q: "Which is the solution of $-3x \\le 12$?"
      options: ["$x \\ge -4$", "$x \\le -4$", "$x \\ge 4$"]
      answer: 0
      feedback: [null, "Dividing by −3 reverses ≤ into ≥.", "12 ÷ (−3) is −4, not 4."]
      explain: "Divide by −3 and reverse: x ≥ −4. Check x = 0: 0 ≤ 12. ✓"
```

### Solve, show, check

Here is how to solve and show an inequality.

```worked
3x - 4 < 11 :: Solve like an equation: do the same to both sides.
3x < 15 :: Add 4 to both sides: the sign stays.
x < 5 :: Divide by 3 (positive): the sign stays.
\text{open circle at } 5,\ \text{shaded left} :: On a number line: an open circle at 5 ($<$: 5 is not included; $\le$ would be closed), shaded left.
-2x > 6 \;\Rightarrow\; x < -3 :: Divide by $-2$ (negative): **reverse** the inequality sign. $2 < 3$ but $-2 > -3$: a negative flips the order.
x = -4:\; 8 > 6\; \checkmark :: Check a value from the solution in the first inequality.
```

Now solve $3x - 4 < 11$ and show it on the board.

### Find the mistake

Read Mia's working. Her check is a clue.

### Divide by a negative

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a closed circle, a negative x term, a fraction, then a range between two values, and the edge case: why the inequality sign reverses."
try: { playground: board, starter: "boards.yml#ray", height: 380 }
tasks:
  - starter: "boards.yml#ray"
    hint: "2x ≥ 4, so x ≥ 2: a closed circle (2 is included)."
    check: { type: board, text: "Solve $2x + 3 \\ge 7$ and show it.", when: "x(P) = 2 and k = 1 and s = 1", explain: "2x ≥ 4, x ≥ 2: closed circle at 2, shaded right." }
  - check:
      type: question
      q: "Solve $5 - x > 2$."
      options: ["$x < 3$", "$x > 3$", "$x > -3$"]
      answer: 0
      feedback: [null, "−x > −3: dividing by −1 reverses the inequality sign.", "Take 5 from both sides: −x > −3."]
      explain: "−x > −3, then divide by −1 and reverse: x < 3. Check x = 0: 5 > 2. ✓"
  - starter: "boards.yml#ray"
    hint: ["Add 1: x/2 < 4.", "Multiply by 2 (positive): x < 8."]
    check: { type: board, text: "Solve $\\dfrac{x}{2} - 1 < 3$ and show it.", when: "x(P) = 8 and k = 0 and s = -1", explain: "x/2 < 4, x < 8: open circle at 8, shaded left." }
  - check:
      type: answer
      q: "A range: how many integers $x$ have $-1 < x \\le 4$?"
      answer: "5"
      feedback:
        - ["6", "−1 is not included (<), so start at 0."]
        - ["4", "4 is included (≤)."]
      explain: "0, 1, 2, 3, 4: five integers. −1 is left out (open), 4 is in (closed)."
  - check:
      type: question
      q: "Edge case: $2 < 5$. Multiply both sides by $-1$. Which is true?"
      options: ["$-2 > -5$", "$-2 < -5$", "$-2 = -5$"]
      answer: 0
      feedback: [null, "On a number line, −2 is to the right of −5, so −2 is more.", "They are not equal."]
      explain: "Multiplying by −1 reflects every number about 0, so the order flips: 2 < 5 but −2 > −5. That is why the inequality sign reverses."
```

### A closed circle

Each task changes one thing.

### A negative x

### A fraction

### A range

### Why it reverses

## Practise: inequalities

```step
stage: practise
insight: "Solving with and without reversal, reading a number line and the largest integer, mixed; the review keeps equations fresh."
tasks:
  - check:
      type: question
      q: "Solve $4x + 1 \\ge -7$."
      options: ["$x \\ge -2$", "$x \\le -2$", "$x \\ge 2$"]
      answer: 0
      feedback: [null, "Dividing by 4 (positive) keeps the sign.", "−7 − 1 = −8, and −8 ÷ 4 = −2."]
      explain: "4x ≥ −8, x ≥ −2."
  - check:
      type: question
      q: "Solve $-5x < 20$."
      options: ["$x > -4$", "$x < -4$", "$x > 4$"]
      answer: 0
      feedback: [null, "Dividing by −5 reverses the inequality sign.", "20 ÷ (−5) = −4."]
      explain: "Divide by −5 and reverse: x > −4. Check x = 0: 0 < 20. ✓"
  - picture: { ref: boards.yml#pic-less-5, caption: "A solution on a number line." }
    check:
      type: question
      q: "Which inequality does this number line show?"
      options: ["$x < 5$", "$x \\le 5$", "$x > 5$"]
      answer: 0
      feedback: [null, "The circle is open: 5 is not included.", "The ray goes left: smaller values."]
      explain: "Open circle at 5, shaded left: x < 5."
  - check:
      type: answer
      q: "Review: solve $3x + 2 = 2x + 7$."
      answer: "5"
      feedback:
        - ["9", "Take 2x from both sides: x + 2 = 7."]
      explain: "x + 2 = 7, x = 5. Check: 17 = 17."
```

### Positive coefficient

### Negative coefficient

### Read the line

### Review: equations

## Make: write one with a negative

```step
stage: make
insight: "Writing an inequality with a negative x term whose solution is x ≥ −2, then showing it, reverses the lesson: from the solution back to an inequality that needs the reversal."
try: { playground: board, starter: "boards.yml#ray", height: 380 }
hint: ["Start from x ≥ −2 and multiply both sides by −3: the sign reverses.", "−3x ≤ 6. Check x = 0: 0 ≤ 6. ✓"]
check: { type: board, text: "Write an inequality with $-3x$ in it whose solution is $x \\ge -2$. Solve it on paper, then show the solution on the line.", when: "x(P) = -2 and k = 1 and s = 1", explain: "For example −3x ≤ 6, or 1 − 3x ≤ 7. Dividing by −3 reverses ≤ into ≥: x ≥ −2." }
```

Swap with a partner: solve theirs, and check a value.
