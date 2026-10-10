---
order: 8
unit: lines
node: AC9M8A02 n1
title: Lines and regions
summary: "y = 2x + 1 is a line; y < 2x + 1 is every point below it. Draw the boundary (dashed if points on it are not included, solid if they are), then test a point to see which side to shade. Vertical lines are x = a; horizontal lines are y = a."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A delivery zone, a speed limit, a budget: often the answer is not one point but a whole region of points that work."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8176
  url: http://127.0.0.1:8176/index.html
  readySelector: "#legend"
  layout: full
explainPicture: { ref: graph.yml#explain, caption: "$y < 2x + 1$: below the dashed line. $O(0, 0)$ is in it ($0 < 1$); $A(1, 4)$ is not ($4 < 3$ is false)." }
explainClip:
  query: { code: "@graph.yml#explain", fresh: 1, id: explain }
  caption: "A line, then a region"
  say: "An inequality is a region: every point that makes it true."
  clip:
    - caption: { text: "The boundary is y = 2x + 1. Dashed: for <, points on it are not included.", say: "The boundary is the line. It is dashed, so the line itself is not included." }
    - wait: 1000
    - caption: { text: "Test O (0, 0): 0 < 2 × 0 + 1 is true, so shade O's side.", say: "Test a point. Zero is less than one: true, so shade that side." }
    - wait: 1000
    - caption: { text: "Test A (1, 4): 4 < 3 is false. A is outside.", say: "Four is not less than three, so A is outside." }
    - wait: 1400
---
You can graph a line from its rule, such as $y = 2x + 1$. Now: what about $y < 2x + 1$? Every point whose $y$ is less than $2x + 1$ makes it true, and those points fill a whole **region** of the graph.

You also meet lines with only one letter: $x = 3$ (vertical) and $y = -2$ (horizontal).

## Predict: in or out?

```step
stage: predict
insight: "Committing to whether (1, 4) satisfies y < 2x + 1 shows whether they substitute both coordinates, before the board shows the region."
check:
  type: predict
  q: "Is the point $(1, 4)$ in the region $y < 2x + 1$?"
  options:
    - "No: 4 is not less than 2 × 1 + 1 = 3"
    - "Yes: 4 is bigger than 1"
    - "It is on the boundary line"
  actual: "No. Put x = 1 and y = 4 in: is 4 < 3? No. (1, 4) is above the line, outside the region."
```

Put $x = 1$ and $y = 4$ into $y < 2x + 1$. Is it true?

## Run: into the region

```step
stage: run
insight: "Dragging P into the shaded region and reading its coordinates shows that every point there makes the inequality true, and the boundary is not included for <."
try: { playground: board, starter: "graph.yml#run", height: 600 }
check: { type: board, text: "Drag $P$ into the shaded region $y < 2x + 1$. Check its coordinates in the inequality. Was your prediction right about $(1, 4)$?", when: "y(P) < 2 * x(P) + 1" }
```

Try a point on the dashed line too. Does it make $y < 2x + 1$ true?

## Investigate: boundary, then test

```step
stage: investigate
insight: "Draw the boundary (dashed for < and >, solid for ≤ and ≥), test a point not on it, and shade the side that makes it true. Ana's mistake draws a strict inequality's boundary solid."
try: { playground: board, starter: "graph.yml#two", height: 600 }
tasks:
  - check:
      type: question
      q: "For $y \\ge x - 2$, is the boundary line solid or dashed?"
      options: ["Solid: ≥ includes the points on the line", "Dashed: points on the line are not included", "There is no boundary"]
      answer: 0
      feedback: [null, "≥ means greater than or equal to, so the line's points count.", "Every region of this kind is bounded by the line y = x − 2."]
      explain: "≤ and ≥ include the boundary (solid); < and > do not (dashed)."
  - check:
      type: bug
      code: "working.txt#ana"
      text: "Ana graphs $y > x + 1$. Click the line where her working goes wrong."
      answer: 2
      fault: logic
      misconception: boundary-solid
      explain: "Line 2: > does not include the line itself, so the boundary is dashed. Her test and shading are right."
  - starter: "graph.yml#two"
    hint: ["The orange region is x ≥ 3: on or right of x = 3.", "The other is y < 2: below the dashed line y = 2."]
    check: { type: board, text: "Two regions: $x \\ge 3$ and $y < 2$. Drag $P$ to a point that is in both.", when: "x(P) >= 3 and y(P) < 2", explain: "Any point with x at least 3 and y below 2, such as (4, 0)." }
```

### Boundary and test

Here is how to graph an inequality.

```worked
y < 2x + 1 :: The boundary is the line $y = 2x + 1$.
\text{dashed} :: $<$ does not include the line's points (for $\le$ or $\ge$, draw it solid).
(0, 0):\; 0 < 2 \times 0 + 1 :: Test a point not on the line. $0 < 1$ is true.
\text{shade the side with } (0, 0) :: True: shade the test point's side. (False: shade the other side.)
x = 3,\; y = -2 :: One letter: $x = 3$ is vertical (every point has $x$ = 3); $y = -2$ is horizontal.
```

Solid or dashed for $y \ge x - 2$?

### Find the mistake

Read Ana's working. Which line does not match the sign?

### Two regions at once

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: vertical and horizontal lines, reading an inequality from its region, a point on a solid boundary, a point on a dashed one, then a region with no x in it."
try: { playground: board, starter: "graph.yml#cross", height: 600 }
tasks:
  - starter: "graph.yml#cross"
    hint: "x = −2 is the vertical line; y = 3 the horizontal one."
    check: { type: board, text: "Drag $P$ to where $x = -2$ meets $y = 3$.", when: "x(P) = -2 and y(P) = 3", explain: "(−2, 3): on x = −2 (x is −2) and on y = 3 (y is 3)." }
  - picture: { ref: graph.yml#which-pic, caption: "A shaded region with a solid boundary." }
    check:
      type: question
      q: "Which inequality is shaded?"
      options: ["$y \\ge -x + 2$", "$y > -x + 2$", "$y \\le -x + 2$", "$y \\ge x + 2$"]
      answer: 0
      feedback: [null, "The boundary is solid, so it is ≥.", "The shading is above the line.", "The line goes down: its gradient is −1."]
      explain: "The line y = −x + 2 (down 1 for each step right, through (0, 2)), solid, shaded above: y ≥ −x + 2."
  - starter: "graph.yml#edge"
    hint: "On the line: y = 4 − x. The boundary is solid, so those points count."
    check: { type: board, text: "The region is $y \\le -x + 4$. Drag $P$ to a point on its boundary line.", when: "y(P) = 4 - x(P)", explain: "Points on y = −x + 4, such as (1, 3), are in the region: ≤ includes the line." }
  - check:
      type: question
      q: "Is $(2, 5)$ in the region $y > 2x + 1$?"
      options: ["No: 5 > 5 is false, so it is on the dashed boundary, not in the region", "Yes: 5 is more than 2", "Yes: it is on the line"]
      answer: 0
      feedback: [null, "Use both coordinates: 2 × 2 + 1 = 5.", "On a dashed line means not included."]
      explain: "2 × 2 + 1 = 5, and 5 > 5 is false: the point is on the boundary, which > leaves out."
  - picture: { ref: graph.yml#below-pic, caption: "The region $y < 3$." }
    check:
      type: question
      q: "Edge case: which points are in $y < 3$?"
      options: ["Every point below the horizontal line y = 3, whatever its x", "Only points with x less than 3", "Only the point (0, 3)"]
      answer: 0
      feedback: [null, "There is no x in y < 3: only y matters.", "That point is on the boundary, which < leaves out."]
      explain: "x can be anything; y must be less than 3: the half below the dashed line y = 3."
```

### Vertical and horizontal

Each task changes one thing.

### Read the region

### On a solid boundary

### On a dashed boundary

### No x

## Practise: regions

```step
stage: practise
insight: "Testing points, choosing boundaries and reading lines, mixed; the solid-dashed slip planted again; the review keeps gradient and intercept fresh."
tasks:
  - check:
      type: question
      q: "Which point is in $y \\le 3x - 2$?"
      options: ["$(2, 1)$", "$(0, 1)$", "$(1, 3)$"]
      answer: 0
      feedback: [null, "1 ≤ −2 is false.", "3 ≤ 1 is false."]
      explain: "(2, 1): 1 ≤ 3 × 2 − 2 = 4. True."
  - check:
      type: question
      q: "Which has a dashed boundary?"
      options: ["$x < -1$", "$x \\le -1$", "$y \\ge 2x$"]
      answer: 0
      feedback: [null, "≤ includes the line: solid.", "≥ includes the line: solid."]
      explain: "< and > leave the line out: dashed."
  - check:
      type: question
      q: "Which line is vertical?"
      options: ["$x = 4$", "$y = 4$", "$y = 4x$"]
      answer: 0
      feedback: [null, "y = 4 is horizontal: every point has y = 4.", "y = 4x goes through the origin, up 4 for each step right."]
      explain: "x = 4: every point has x = 4, so the points stack straight up: a vertical line."
  - check:
      type: question
      q: "Review: what are the gradient and y-intercept of $y = 3x - 2$?"
      options: ["Gradient 3, y-intercept −2", "Gradient −2, y-intercept 3", "Gradient 3, y-intercept 2"]
      answer: 0
      feedback: [null, "m is the number in front of x.", "The intercept keeps its sign: −2."]
      explain: "y = mx + c with m = 3 and c = −2."
```

### Test a point

### Solid or dashed

### Vertical

### Review: m and c

## Make: fit the region

```step
stage: make
insight: "Choosing m and c so a region contains some points and not others reverses the lesson: from points to the inequality."
try: { playground: board, starter: "graph.yml#make", height: 620 }
hint: ["(0, 0) in y ≤ mx + c means 0 ≤ c.", "(0, 3) outside means c is less than 3. Then check B (2, 1): 1 ≤ 2m + c."]
check: { type: board, text: "Set $m$ and $c$ so the region $y \\le mx + c$ contains $A(0, 0)$ and $B(2, 1)$ but not $C(0, 3)$.", when: "c >= 0 and c < 3 and 2m + c >= 1", explain: "For example m = 1, c = 0: y ≤ x contains (0, 0) and (2, 1), and 3 ≤ 0 is false for C." }
```

Find two different answers. What do they have in common?
