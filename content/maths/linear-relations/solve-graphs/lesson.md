---
order: 8
unit: using
node: AC9M8A02 n2
uses: [AC9M7A05 n3, AC9M7N07 n2]   # each side drawn as a line from its rule
assumes: [AC9M8A02 n1]   # graphing y = mx + c is taught in Plotting a rule and Lines and their rules; graphing inequalities is class work
title: Solving equations with graphs
summary: Draw each side of an equation as a line. Where the lines meet, both sides are equal, so the x there is the solution.
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A graph can solve an equation you have no method for yet: draw both sides and look where they meet. Calculators, spreadsheets and engineers do exactly this."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8137
  url: http://127.0.0.1:8137/index.html
  readySelector: "#sl-k"
  layout: full
explainPicture: { ref: graph.yml#pic-solve, caption: "$y = 2x + 3$ meets $y = 11$ at $(4, 11)$, so $2x + 3 = 11$ when $x = 4$." }
explainClip:
  query: { code: "@graph.yml#explain", fresh: 1, id: explain }
  caption: "The solution is the x where the two lines meet"
  say: "The solution is the x where the two lines meet."
  clip:
    - caption: { text: "2x + 3 = 11: draw y = 2x + 3 and y = 11.", say: "To solve two x plus three equals eleven, draw both sides as lines." }
    - caption: { text: "They meet at x = 4.", say: "They meet where x is four, so the solution is x equals four." }
    - wait: 400
    - caption: { text: "Change the right side to 7: the meeting point moves to x = 2.", say: "Change the right side to seven, and the lines meet where x is two." }
    - click: Make k smaller
    - click: Make k smaller
    - wait: 400
    - caption: { text: "2x + 3 = 1: they meet left of the y-axis, so x = −1.", say: "For two x plus three equals one, they meet at x equals negative one." }
    - click: Make k smaller
    - click: Make k smaller
    - click: Make k smaller
    - expect: { selector: "#board", contains: "x = −1" }
    - wait: 1200
---
An equation such as $2x + 3 = 11$ says two things are equal. Each side can be drawn as a line: $y = 2x + 3$, and $y = 11$ (a flat line, because 11 does not change with $x$). In the Equations unit you solved equations with a balance and by backtracking. Now you solve them by looking at a graph.

## Predict: where they meet

```step
stage: predict
insight: "Committing to which number the meeting point gives (x or y) is the whole lesson: students who read y here will read y on every graph."
check:
  type: predict
  q: "The lines $y = 2x + 3$ and $y = 11$ are drawn. What is $x$ at the point where they meet?"
  options: ["$x = 4$", "$x = 11$", "$x = 8$", "$x = 3$"]
  actual: "x = 4. Where they meet, both lines have the same y, so 2x + 3 = 11. That happens when x = 4 (2 × 4 + 3 = 11). The point is (4, 11): 11 is its y, not its x."
```

$$2x + 3 = 11$$

On the line $y = 11$, every point has $y = 11$. On $y = 2x + 3$, $y$ is 11 at just one value of $x$.

## Run: find the meeting point

```step
stage: run
insight: "Dragging P onto both lines at once makes 'where they meet' physical: there is exactly one such point, and its x makes both sides equal."
try: { playground: board, starter: "graph.yml#run", height: 600 }
check: { type: board, text: "Drag $P$ to the point where the two lines meet.", when: "P on y = 2x + 3 and P on y = 11" }
```

Drag $P$ until it is on both lines. Read its coordinates under the board. Which number is the solution of $2x + 3 = 11$?

## Investigate: reading the solution

```step
stage: investigate
insight: "The solution is the x of the meeting point, never its y; and a graph's answer is still checked by substitution."
tasks:
  - picture: { ref: graph.yml#pic-solve, caption: "The lines meet at $(4, 11)$. The solution is the $x$: $x = 4$." }
    check:
      type: answer
      q: "On a graph, $y = 3x - 2$ meets $y = 7$ at $(3, 7)$. What is the solution of $3x - 2 = 7$?"
      answer: "3"
      feedback:
        - ["7", "7 is the y of the meeting point: it is the value of both sides. The solution is the value of x."]
      explain: "x = 3. Check: 3 × 3 − 2 = 7."
  - check:
      type: bug
      code: "working.txt#kai"
      text: "Kai solves an equation with a graph. Click the line where his working goes wrong."
      answer: 4
      fault: logic
      misconception: cross-read-y
      explain: "Line 4: 9 is the y of the meeting point, the value of both sides. The solution is the x: x = 4. Check: 4 + 5 = 9 and 2 × 4 + 1 = 9."
  - check:
      type: question
      q: "The lines $y = x + 5$ and $y = 2x + 1$ meet at $(4, 9)$. Which equation has the solution $x = 4$?"
      options: ["$x + 5 = 2x + 1$", "$x + 5 = 4$", "$2x + 1 = 4$"]
      answer: 0
      explain: "The meeting point is where the two sides are equal, so it solves x + 5 = 2x + 1. Check: 4 + 5 = 9 and 2 × 4 + 1 = 9."
```

### Solving with a graph

Here is the method, one line at a time.

```worked
2x + 3 = 11 :: Solve this equation with a graph.
y = 2x + 3, \quad y = 11 :: Draw each side as a line.
(4, 11) :: Find where they meet. There, both sides have the same value, 11.
x = 4 :: The solution is the $x$ of the meeting point, not the $y$.
2(4) + 3 = 11 \; \checkmark :: Check by substitution in the first equation.
```

### Find the mistake

Read Kai's working one line at a time. Which number did he take from the point?

### Which equation?

The meeting point solves the equation that sets the two rules equal.

## Modify: change the equation

```step
stage: modify
insight: "One change at a time: a subtraction, a negative solution, x on both sides, an answer between the grid lines, and two lines that never meet (no solution)."
try: { playground: board, starter: "graph.yml#subtract", height: 560 }
tasks:
  - starter: "graph.yml#subtract"
    check: { type: board, text: "Solve $3x - 4 = 8$: drag $P$ to where the lines meet.", when: "P on y = 3x - 4 and P on y = 8", explain: "They meet at (4, 8), so x = 4. Check: 3 × 4 − 4 = 8." }
  - starter: "graph.yml#negative"
    hint: "The lines meet to the left of the y-axis."
    check: { type: board, text: "Solve $2x + 3 = 1$: drag $P$ to where the lines meet.", when: "P on y = 2x + 3 and P on y = 1", explain: "They meet at (−1, 1), so x = −1. Check: 2 × (−1) + 3 = 1." }
  - starter: "graph.yml#both"
    hint: "Both lines slope now. Follow them until they cross."
    check: { type: board, text: "Solve $x + 5 = 3x + 1$: drag $P$ to where the lines meet.", when: "P on y = x + 5 and P on y = 3x + 1", explain: "They meet at (2, 7), so x = 2. Check: 2 + 5 = 7 and 3 × 2 + 1 = 7." }
  - starter: "graph.yml#half"
    hint: "P moves in halves on this board. The lines meet between two grid lines."
    check: { type: board, text: "Solve $2x + 1 = 6$: drag $P$ to where the lines meet.", when: "P on y = 2x + 1 and P on y = 6", explain: "They meet at (2.5, 6), so x = 2.5. Check: 2 × 2.5 + 1 = 6." }
  - starter: "graph.yml#never"
    check:
      type: question
      q: "Where do $y = 2x + 1$ and $y = 2x + 4$ meet?"
      options:
        - "At $(0, 1)$"
        - "Nowhere: they are parallel, so $2x + 1 = 2x + 4$ has no solution"
        - "At $x = 3$"
      answer: 1
      explain: "Both have m = 2, so they are parallel and never meet: 2x + 1 is always 3 less than 2x + 4. The equation has no solution."
```

### Subtraction

Each task draws both sides of a new equation. Solve $3x - 4 = 8$.

### A negative answer

Solve $2x + 3 = 1$.

### $x$ on both sides

Solve $x + 5 = 3x + 1$. Now both sides are sloping lines.

### Between the lines

Solve $2x + 1 = 6$.

### Never meeting

$2x + 1 = 2x + 4$. Look at the two lines. What does the last lesson say about them?

## Practise: read the graph

```step
stage: practise
insight: "Reading the solution as the x of a meeting point, and naming the equation it solves, in mixed forms; the review keeps c fresh."
tasks:
  - check:
      type: answer
      q: "A graph shows $y = 4x - 3$ meeting $y = 9$ at $(3, 9)$. Solve $4x - 3 = 9$."
      answer: "3"
      feedback:
        - ["9", "9 is the y of the meeting point. The solution is its x."]
      explain: "x = 3. Check: 4 × 3 − 3 = 9."
  - check:
      type: answer
      q: "$y = 2x - 1$ and $y = -x + 5$ meet at $(2, 3)$. What value of $x$ makes $2x - 1 = -x + 5$ true?"
      answer: "2"
      feedback:
        - ["3", "3 is the y of the meeting point, the value of both sides. Which x gives it?"]
      explain: "x = 2. Check: 2 × 2 − 1 = 3 and −2 + 5 = 3."
  - check:
      type: question
      q: "The lines $y = 5$ and $y = x + 2$ meet. Which equation does the meeting point solve?"
      options: ["$x + 2 = 5$", "$x + 5 = 2$", "$x = 5$"]
      answer: 0
      explain: "Set the two rules equal: x + 2 = 5. They meet at (3, 5), so x = 3."
  - check:
      type: answer
      q: "Review: where does $y = 3x - 4$ cross the $y$-axis? Give the value of $y$."
      answer: "-4"
      feedback:
        - ["3", "3 is m, the steepness. Put x = 0 into the rule."]
      explain: "−4: when x = 0, y = 3 × 0 − 4 = −4."
```

### From a graph

### Both sides sloping

### Which equation?

### Review

## Make: an equation with a chosen answer

```step
stage: make
insight: "Building a second line through a chosen meeting point reverses the lesson: from the solution to the equation."
try: { playground: board, starter: "graph.yml#make", height: 640 }
hint: ["At x = 3, the line y = 2x + 1 is at 7. Your line must pass through (3, 7).", "Pick m first. Then find c so that 3m + c = 7."]
check: { type: board, text: "Set $m$ and $c$ so that the equation $2x + 1 = mx + c$ has the solution $x = 3$.", when: "3m + c = 7 and (m - 2)^2 > 0", explain: "Your line meets y = 2x + 1 at (3, 7), so 2x + 1 = mx + c is true when x = 3." }
```

Your line is $y = mx + c$. The green point shows where it meets $y = 2x + 1$. Move it so they meet at $x = 3$. (Your line cannot be $y = 2x + 1$ itself.)

Stretch: write down your equation, then check $x = 3$ by substitution.
