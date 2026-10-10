---
order: 3
unit: rules
node: AC9M7A05 n3
title: Plotting a rule
summary: Plot each ordered pair from a rule's table as a point, across first and then up. For a rule like y = 2x + 1, the points lie on a straight line.
language: maths
hook: "A table of numbers hides its pattern; a graph shows it at a glance. Plotting the pairs turns a rule into a picture you can read."
explainPicture: { ref: graph.yml#pic, caption: "The pairs of $y = 2x + 1$: $(0, 1)$, $(1, 3)$, $(2, 5)$, $(3, 7)$. They lie on a straight line, going up 2 for each step right." }
---
In the last lesson you made tables of ordered pairs from rules. Now you **plot** them. To plot the point $(x, y)$, start at $(0, 0)$, go **across** $x$, then **up** $y$. Then look at the shape the points make.

## Predict: what shape?

```step
stage: predict
insight: "Committing to a shape before plotting makes the straight line a discovery, and sets up the question of why."
check:
  type: predict
  q: "The pairs of $y = 2x + 1$ are $(0, 1)$, $(1, 3)$, $(2, 5)$ and $(3, 7)$. If you plot them, what shape will they make?"
  options: ["A straight line going up", "A curve that gets steeper", "Scattered points, no pattern", "A flat line"]
  actual: "A straight line going up. Each step of 1 across adds the same amount (2) to y, so every point is the same step up from the one before."
```

| $x$ | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| $y = 2x + 1$ | 1 | 3 | 5 | 7 |

How much does $y$ go up each time $x$ goes up by 1?

## Run: plot the points

```step
stage: run
insight: "Dragging each point to its pair, across then up, and seeing them line up settles the prediction and shows why: the same step each time."
try: { playground: board, starter: "graph.yml#run", height: 600 }
check: { type: board, text: "Drag $A$ to $(0, 1)$, $B$ to $(1, 3)$, $C$ to $(2, 5)$ and $D$ to $(3, 7)$.", when: "x(A) = 0 and y(A) = 1 and x(B) = 1 and y(B) = 3 and x(C) = 2 and y(C) = 5 and x(D) = 3 and y(D) = 7" }
```

| Point | A | B | C | D |
|---|---|---|---|---|
| $(x, y)$ | $(0, 1)$ | $(1, 3)$ | $(2, 5)$ | $(3, 7)$ |

Drag each point from the bottom of the board to its pair. For each one: across first, then up. What shape do they make?

## Investigate: plotting and describing

```step
stage: investigate
insight: "Across first, then up; and a rule that adds the same amount for each step makes a straight line, described by which way it goes and how fast."
tasks:
  - picture: { ref: graph.yml#pic, caption: "The four points lie on a straight line: up 2 for each step right." }
    check:
      type: question
      q: "Which point is $(3, 2)$?"
      options: ["The point 3 across and 2 up", "The point 2 across and 3 up", "The point 3 across and 3 up"]
      answer: 0
      explain: "The first number is how far across (x); the second is how far up (y). (2, 3) is a different point."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam plots the point $(2, 5)$. Click the line where his method goes wrong."
      answer: 3
      fault: logic
      misconception: plot-up-first
      explain: "Line 3: the first number is x, how far across. Sam should go across 2, then up 5. Going up 2 and across 5 plots (5, 2)."
  - check:
      type: question
      q: "The table for $y = 10 - x$ is $(0, 10)$, $(1, 9)$, $(2, 8)$, $(3, 7)$. Which describes its graph?"
      options: ["A straight line going down 1 for each step right", "A straight line going up 1 for each step right", "A curve going down"]
      answer: 0
      explain: "y goes down by 1 each time x goes up by 1: the same step each time, so a straight line, going down."
```

### Plotting a rule

Here is how to plot a rule and describe its graph.

```worked
y = 2x + 1: \; (0, 1), (1, 3), (2, 5), (3, 7) :: Start with the table of ordered pairs.
(0, 1): \text{ across } 0, \text{ up } 1 :: Plot each pair from $(0, 0)$: across first, then up.
(1, 3), (2, 5), (3, 7) :: Plot the rest the same way.
\text{up } 2 \text{ for each step right} :: Each step of 1 across, $y$ goes up 2: the same step every time.
\text{a straight line} :: So the points lie on a straight line. Join them with a ruler.
\text{going up, starting at } 1 :: Describe it: it goes up 2 for each step right and crosses the $y$-axis at 1.
```

### Find the mistake

Read Sam's method one line at a time. Which way should he go first?

### Describing a graph

## Modify: new tables

```step
stage: modify
insight: "One change at a time: a subtraction rule, negative inputs, a line going down, and a rule whose points do not make a straight line."
try: { playground: board, starter: "graph.yml#subtract", height: 600 }
tasks:
  - starter: "graph.yml#subtract"
    check: { type: board, text: "$y = 3x - 2$: drag $A$ to $(0, -2)$, $B$ to $(1, 1)$, $C$ to $(2, 4)$ and $D$ to $(3, 7)$.", when: "x(A) = 0 and y(A) = -2 and x(B) = 1 and y(B) = 1 and x(C) = 2 and y(C) = 4 and x(D) = 3 and y(D) = 7", explain: "A straight line going up 3 for each step right, crossing the y-axis at −2." }
  - starter: "graph.yml#negative"
    hint: "A negative x means go across to the left first."
    check: { type: board, text: "$y = x + 2$: drag $A$ to $(-2, 0)$, $B$ to $(-1, 1)$, $C$ to $(0, 2)$ and $D$ to $(1, 3)$.", when: "x(A) = -2 and y(A) = 0 and x(B) = -1 and y(B) = 1 and x(C) = 0 and y(C) = 2 and x(D) = 1 and y(D) = 3", explain: "Negative inputs go to the left. Still a straight line: up 1 for each step right." }
  - starter: "graph.yml#down"
    check: { type: board, text: "$y = 6 - 2x$: drag $A$ to $(0, 6)$, $B$ to $(1, 4)$, $C$ to $(2, 2)$ and $D$ to $(3, 0)$.", when: "x(A) = 0 and y(A) = 6 and x(B) = 1 and y(B) = 4 and x(C) = 2 and y(C) = 2 and x(D) = 3 and y(D) = 0", explain: "A straight line going down 2 for each step right." }
  - starter: "graph.yml#square"
    check: { type: board, text: "$y = x \\times x$: drag $A$ to $(0, 0)$, $B$ to $(1, 1)$, $C$ to $(2, 4)$ and $D$ to $(3, 9)$. Is it a straight line?", when: "x(A) = 0 and y(A) = 0 and x(B) = 1 and y(B) = 1 and x(C) = 2 and y(C) = 4 and x(D) = 3 and y(D) = 9", explain: "Not a straight line: y goes up 1, then 3, then 5. The steps are not the same, so the points curve upwards." }
```

### Subtraction

Each task loads a new table. Drag $A$ to $D$ to the pairs, across then up.

### Negative inputs

### Going down

### Not a straight line

Plot it, then look at the steps between the points.

## Practise: points and graphs

```step
stage: practise
insight: "Reading and plotting points in order, and telling a straight-line rule from its table, mixed; the review is making a table from a rule."
tasks:
  - check:
      type: question
      q: "A point is 4 across and 1 up from $(0, 0)$. What are its coordinates?"
      options: ["$(4, 1)$", "$(1, 4)$", "$(4, 4)$"]
      answer: 0
      explain: "Across is x, up is y: (4, 1)."
  - check:
      type: question
      q: "Which table's points lie on a straight line?"
      options:
        - "(0, 2), (1, 5), (2, 8), (3, 11)"
        - "(0, 2), (1, 3), (2, 6), (3, 11)"
        - "(0, 1), (1, 2), (2, 4), (3, 8)"
      answer: 0
      explain: "y goes up 3 every time in the first table. In the others the steps change (1, 3, 5 and 1, 2, 4), so the points curve."
  - check:
      type: answer
      q: "The points of a rule lie on a straight line through $(0, 3)$, $(1, 5)$ and $(2, 7)$. Where is the next point, at $x = 3$? Give its $y$."
      answer: "9"
      feedback:
        - ["8", "Check the step: from 3 to 5 to 7, y goes up 2 each time."]
      explain: "Up 2 for each step right: 7 + 2 = 9. The point is (3, 9)."
  - check:
      type: answer
      q: "Review: for $y = 4x - 1$, what is the output when the input is 2?"
      answer: "7"
      feedback:
        - ["41", "4x means 4 × x: 4 × 2 = 8."]
      explain: "4 × 2 − 1 = 8 − 1 = 7. The pair is (2, 7)."
```

### Coordinates

### Straight or not?

### The next point

### Review

## Make: your own straight line

```step
stage: make
insight: "Placing points so they make a chosen straight line reverses the lesson: from the shape back to the steps between pairs."
try: { playground: board, starter: "graph.yml#make", height: 620 }
hint: ["Put A anywhere. Then B is 1 across and 3 up from A.", "C is 1 across and 3 up from B."]
check: { type: board, text: "Place $A$, $B$ and $C$ (left to right) on a straight line that goes up 3 for each step right.", when: "x(B) > x(A) and x(C) > x(B) and y(B) - y(A) = 3(x(B) - x(A)) and y(C) - y(B) = 3(x(C) - x(B))", explain: "Each point is 3 up for each step across from the one before, so they lie on one straight line going up 3." }
```

Choose where your line starts. Then place the other points so the line goes up 3 for each step to the right.

Stretch: what rule $y = \ldots$ gives your points? Check it with all three.
