---
order: 5
unit: lines
title: What c does to a line
summary: In y = mx + c, the number on its own moves the line up or down without changing its steepness, so lines with the same m are parallel.
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Two phone plans with the same price per gigabyte but different monthly fees never meet: their graphs are parallel. The fee is c."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8136
  url: http://127.0.0.1:8136/index.html
  readySelector: "#sl-c"
  layout: full
explainPicture: { ref: graph.yml#explain-pic, caption: "$y = 2x + 4$ is $y = 2x + 1$ moved up 3. Same $m$, so they are parallel." }
explainClip:
  query: { code: "@graph.yml#explain", fresh: 1, id: explain }
  caption: "c moves the line up or down; the steepness stays the same"
  say: "c moves the line up or down, and the steepness stays the same."
  clip:
    - caption: { text: "The dashed line is y = 2x + 1. The solid line starts the same.", say: "The dashed line is y equals two x plus one; the solid starts the same." }
    - wait: 400
    - caption: { text: "A bigger c moves the line up. It stays just as steep.", say: "A bigger c moves the line up, and it stays just as steep." }
    - click: Make c bigger
    - wait: 400
    - caption: { text: "c = 4: the line crosses the y-axis at 4.", say: "With c equal to four, the line crosses the y axis at four." }
    - caption: { text: "Same m, so it is parallel to the dashed line.", say: "It has the same m, so it is parallel to the dashed line." }
    - wait: 400
    - caption: { text: "A negative c moves it below: c = −2 crosses at −2.", say: "A negative c moves it down: c of negative two crosses at negative two." }
    - click: Make c smaller
    - click: Make c smaller
    - expect: { selector: "#legend", contains: "y = 2x − 2" }
    - wait: 1200
---
In the last lesson $c$ stayed at 1 and you changed $m$, the steepness. Now $m$ stays at 2 and you change $c$, the number on its own.

## Predict: a bigger c

```step
stage: predict
insight: "Committing to what c will do before moving it shows whether students have separated c from m."
check:
  type: predict
  q: "The line $y = 2x + 1$ has $c = 1$. If $c$ becomes 4, so the rule is $y = 2x + 4$, what happens to the line?"
  options:
    - "It moves up by 3, and is just as steep"
    - "It gets steeper"
    - "It crosses the $x$-axis at 4"
    - "It moves 3 to the right"
  actual: "It moves up by 3 and is just as steep. Every value of y is 3 more than before (2x + 4 instead of 2x + 1), so the whole line moves up 3. m is still 2, so the steepness is the same."
```

$$y = 2x + 1 \quad\longrightarrow\quad y = 2x + 4$$

Work out $y$ when $x = 0$ for each rule. Then think about what happens at $x = 1$.

## Run: change c

```step
stage: run
insight: "Moving c while m stays fixed slides the line up and down: the step stays 'up 2', and the line never turns."
try: { playground: board, starter: "graph.yml#run", height: 680 }
check: { type: board, text: "Set $c$ to 4. Was your prediction right?", when: "c = 4" }
```

Change $c$ and compare the solid line with the dashed line, $y = 2x + 1$. Watch the step, and the two rows of the table.

## Investigate: reading c

```step
stage: investigate
insight: "c is where the line crosses the y-axis (the value of y when x is 0). Lines with the same m are parallel; only c tells them apart."
tasks:
  - picture: { ref: graph.yml#explain-pic, caption: "Each $y$ on $y = 2x + 4$ is 3 more than on $y = 2x + 1$: the line moves up 3." }
    check:
      type: answer
      q: "Where does the line $y = 3x - 5$ cross the $y$-axis? Give the value of $y$."
      answer: "-5"
      feedback:
        - ["3", "3 is m, the steepness. The line crosses the y-axis where x = 0: work out y there."]
        - ["5", "Check the sign: when x = 0, y = 3 × 0 − 5."]
      explain: "−5. When x = 0, y = 3 × 0 − 5 = −5, which is c."
  - check:
      type: bug
      code: "working.txt#ana"
      text: "Ana decides whether two lines are parallel. Click the line where her reasoning goes wrong."
      answer: 4
      fault: logic
      misconception: parallel-same-numbers
      explain: "Line 4: parallel lines need the same m, the number in front of x. Here m is 2 and 5, so one is steeper than the other: they are not parallel."
  - check:
      type: question
      q: "Which line is parallel to $y = 3x + 1$?"
      options: ["$y = x + 3$", "$y = 3x - 4$", "$y = -3x + 1$"]
      answer: 1
      explain: "y = 3x − 4 has the same m, 3, so it is just as steep: it is y = 3x + 1 moved down 5."
```

### Where it crosses

Here is how to read $c$ from a rule.

```worked
y = 2x + 4 :: Where does this line cross the $y$-axis, and how does it compare with $y = 2x + 1$?
x = 0: \; y = 2(0) + 4 = 4 :: The $y$-axis is where $x = 0$. Put 0 in place of $x$.
c = 4 :: $2x$ is 0 there, so $y$ is just $c$: the line crosses at 4.
x = 1: \; 2(1) + 4 = 6, \; 2(1) + 1 = 3 :: Compare the two rules at $x = 1$.
6 - 3 = 3 :: $y$ is 3 more, and it is 3 more at every $x$, because only $c$ changed.
\text{same } m \Rightarrow \text{parallel} :: The line moved up 3 without turning: lines with the same $m$ are parallel.
```

### Find the mistake

Read Ana's working one line at a time. Which line does not follow?

### Parallel

Which number has to match?

## Modify: change c on purpose

```step
stage: modify
insight: "One change at a time: a negative c, c = 0 (through the origin), a point that is not on the y-axis, then both numbers at once for a parallel line."
try: { playground: board, starter: "graph.yml#below", height: 600 }
tasks:
  - starter: "graph.yml#below"
    hint: "T is on the y-axis. Where must the line cross it?"
    check: { type: board, text: "Set $c$ so the line passes through $T(0, -2)$.", when: "T on y = 2x + c", explain: "c = −2: the line crosses the y-axis at −2." }
  - starter: "graph.yml#origin"
    hint: ["Work out 2x at T: 2 × 2 = 4.", "T is at y = 4, so how much is left for c?"]
    check: { type: board, text: "Set $c$ so the line passes through $T(2, 4)$.", when: "T on y = 2x + c", explain: "c = 0: y = 2x passes through (0, 0), the origin." }
  - starter: "graph.yml#off-axis"
    hint: ["At T, x = 1, so 2x is 2.", "y at T is 6. What do you add to 2 to get 6?"]
    check: { type: board, text: "Set $c$ so the line passes through $T(1, 6)$.", when: "T on y = 2x + c", explain: "c = 4: at x = 1, y = 2 + 4 = 6." }
  - starter: "graph.yml#parallel"
    hint: ["Parallel means the same steepness. What is m for the dashed line?", "Then set c so the line crosses the y-axis at T."]
    check: { type: board, text: "Make a line parallel to the dashed line $y = -x + 3$ that passes through $T(0, -1)$.", when: "m = -1 and T on y = mx + c", explain: "m = −1 (same as the dashed line, so parallel) and c = −1 (it crosses at T)." }
```

### Below the axis

Each task puts a point $T$ on the board. Set $c$ so the line passes through $T(0, -2)$.

### Through the origin

Now take the line through $T(2, 4)$. What is $c$?

### Not on the axis

$T(1, 6)$ is not on the $y$-axis. Work out $2x$ at $T$ first.

### Parallel

Two sliders now. Make a line parallel to the dashed one, through $T(0, -1)$.

## Practise: read the line

```step
stage: practise
insight: "Reading c, recognising parallel lines and finding c from a point are one skill; the review question keeps m from the last lesson fresh."
tasks:
  - check:
      type: answer
      q: "Where does $y = 5x + 7$ cross the $y$-axis? Give the value of $y$."
      answer: "7"
      feedback:
        - ["5", "5 is m, the steepness. Put x = 0 into the rule."]
      explain: "7: when x = 0, y = 5 × 0 + 7 = 7."
  - check:
      type: question
      q: "Which two lines are parallel?"
      options:
        - "$y = 4x + 1$ and $y = 4x - 3$"
        - "$y = 4x + 1$ and $y = x + 4$"
        - "$y = 4x + 1$ and $y = 2x + 1$"
      answer: 0
      explain: "Both have m = 4, so they are equally steep. y = 4x + 1 and y = x + 4 use the same numbers but in different places; y = 4x + 1 and y = 2x + 1 cross at (0, 1)."
  - check:
      type: answer
      q: "The line $y = 2x + c$ passes through $(3, 10)$. What is $c$?"
      answer: "4"
      feedback:
        - ["10", "10 is y at x = 3. Work out 2x there first: 2 × 3 = 6."]
        - ["7", "Check: 2 × 3 = 6, and 6 + 7 = 13, not 10."]
      explain: "At x = 3, 2x = 6. 6 + c = 10, so c = 4."
  - check:
      type: answer
      q: "Review: how far does $y = -3x + 2$ go up for each step right? (A negative answer means it goes down.)"
      answer: "-3"
      feedback:
        - ["2", "2 is c, where the line crosses the y-axis. Look at the number in front of x."]
        - ["3", "Check the sign: −3 means the line goes down 3 for each step right."]
      explain: "m = −3: down 3 for each step right."
```

### From the rule

### Parallel

### From a point

### Review

## Make: a parallel line

```step
stage: make
insight: "Choosing a point and then finding the c that reaches it, with m fixed, reverses the lesson: from the picture to the rule."
try: { playground: board, starter: "graph.yml#make", height: 600 }
hint: ["Drag P first. Then work out 2x at P.", "c is the y of P minus 2x."]
check: { type: board, text: "Drag $P$ anywhere, then set $c$ so a line parallel to $y = 2x + 1$ passes through it.", when: "P on y = 2x + c", explain: "Your line has m = 2, like the dashed one, so they are parallel, and P is on it." }
```

Choose where $P$ goes, then find the $c$ that takes the line through it. Check: is your line parallel to the dashed one?

Stretch: write the rule of the line parallel to $y = 2x + 1$ that passes through $(5, 0)$.
