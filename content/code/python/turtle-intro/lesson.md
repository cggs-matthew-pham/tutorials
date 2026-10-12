---
order: 1
unit: drawing
introduces: [repeat]
recipes: [import-star]
title: Drawing with a turtle
summary: Predict, run and change short Python programs that draw shapes.
language: python
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground" 8123
  url: http://127.0.0.1:8123/index.html
  ready: Python code
  layout: full
pacing:
  keyDelayMs: 30
hook: "Loops are how a program draws 100 tiles, sends 100 emails or reads 100 sensors without 100 lines of code."
voice: true
explainClip:
  query: { code: "", speed: 6 }
  caption: "A loop repeats lines, so you write them once"
  say: "A program runs from the top down, and a loop repeats lines for you."
  pacing: { keyDelayMs: 22 }
  clip:
    - type: { into: "Python code", text: "from turtle import *\n\n", append: true }
    - caption:
        text: "for i in range(4): does the indented lines 4 times."
        say: "A for loop does the lines indented under it, here four times."
    - type: { into: "Python code", text: "for i in range(4):\n", append: true }
    - caption:
        text: "forward(100) draws a line. right(90) turns a quarter turn."
        say: "forward 100 draws a line, and right 90 turns a quarter of a full turn."
    - type: { into: "Python code", text: "    forward(100)\n    right(90)\n", append: true }
    - click: "Run"
    - expect: { selector: "#status", contains: "Finished" }
    - caption:
        text: "4 turns of 90 make one full turn: 360 degrees."
        say: "Four turns of 90 degrees add up to one full turn, 360 degrees."
    - wait: 1200
    - expect: { selector: "#turtle-state", contains: "heading 0" }
---
A turtle walks across the screen, leaving a line behind. Your program tells it where to go.

## Predict

```step
stage: predict
code: square.py#loop
reveal: true
check:
  type: predict
  q: "What will the turtle draw?"
  options: ["a square", "one long line", "one side, then a turn", "nothing, because i is never used"]
  fault: logic
  misconception: loop-body-indent
  actual: "A square. The two indented lines run 4 times: a side of 100, then a quarter turn, four times over. The turtle finishes where it started, facing right."
app: true
clip:
  - caption: The turtle starts in the middle, facing right.
  - type:
      into: Python code
      text: "@square.py#loop"
  - click: Run
  - expect: { selector: "#status", contains: Finished }
  - expect: { selector: "#turtle-state", contains: "heading 0" }
```

`forward(100)` moves the turtle 100 steps and draws a line. `right(90)` turns it a quarter turn. The line `for i in range(4):` is new. Read the code. What will the turtle draw?

## Run

```step
stage: run
code: square.py#loop
try: { starter: "square.py#loop", height: 420 }
check: { type: reflect, text: "I can explain what forward(100) and right(90) do to the turtle." }
unlocks: [forward, backward, right, left]
```

Run the program and compare it with your prediction. Which lines ran four times?

The first line, `from turtle import *`, gives your program the turtle commands. Copy it to the top of every program for now; a later lesson shows how it works.

## Investigate

```step
stage: investigate
code: square.py#compare
insight: "Repetition has a cost: without a loop the code grows with every side, and a loop does the same work with a number you can change."
app: true
clip:
  - type:
      into: Python code
      text: "@square.py#loop"
  - click: Run
  - expect: { selector: "#status", contains: Finished }
tasks:
  - check:
      type: number
      q: "The square without a loop uses 8 lines of drawing code. A 20-sided shape drawn the same way would use how many lines?"
      answer: 40
      explain: "Each side needs 2 lines (forward and a turn), so 20 sides need 40."
  - check:
      type: bug
      code: square.py#bug
      text: "This was meant to draw a square. Instead the turtle draws one long line and turns once at the very end. Click the wrong line."
      answer: 5
      fault: logic
      misconception: loop-body-indent
      explain: "right(90) is not indented, so it is not part of the loop. The loop draws four sides in a straight line, and the turn runs once afterwards. Indent it under the for line so both lines repeat."
  - check:
      type: trace
      text: "for i in range(4): makes a counter called i. It starts at 0 and goes up by 1 each time round the loop. Fill in the table for the square."
      table: |
        | pass | i | turned so far |
        | 1 | 0 | 90 |
        | 2 | [1] | [180] |
        | 3 | [2] | [270] |
        | 4 | [3] | [360] |
      explain: "i counts 0, 1, 2, 3: four passes, starting from 0. This square never uses i, but it is there, and later programs will use it. After four turns of 90 the turtle has turned 360 degrees, a full turn."
```

Compare the two programs. They draw the same square.

### Count the lines

How much code does each way need as the shape gets more sides?

### Spot the bug

Indented lines belong to the loop. Find the line that should repeat but doesn't.

### Follow the counter

In `for i in range(4):`, the name `i` is a counter. Follow it round the loop.

## Modify

```step
stage: modify
insight: "Change a working program one small step at a time and check each result; the turn angle comes from the shape, not from guessing."
try: { starter: "square.py#modify", height: 420 }
app: true
query: { code: "@square.py#triangle", view: output, autorun: 1 }
clip:
  - wait: 600
  - expect: { selector: "#status", contains: Finished }
  - expect: { selector: "#turtle-state", contains: "heading 0" }
caption: "The expected result: a triangle"
reveal: Show what the triangle should look like
tasks:
  - hint:
      - "A square turns the turtle 90 degrees four times. How many times does a triangle turn, and what do all the turns add up to?"
      - "Two numbers change: how many times the loop repeats, and how far the turtle turns each time."
    check: { type: reflect, text: "I changed the loop so it draws a triangle." }
  - hint: "Only one number needs to change."
    check: { type: reflect, text: "I made the triangle's sides twice as long by changing one number." }
  - hint: "pencolor(\"red\") goes before the loop. pensize(5) makes the line thicker."
    check: { type: code, text: "Change the pen colour with pencolor and run it.", rules: { uses: [pencolor] } }
unlocks: [pencolor, pensize, circle]
```

Change the loop in small steps. Run after each change.

### Draw a triangle

Change the loop so it draws a triangle instead of a square.

### Double the sides

Make each side of your triangle twice as long.

### Change the pen

Give your triangle a colour. Try a thicker line too.

## Make

```step
stage: make
try: { starter: "square.py#make", height: 420 }
app: true
query: { code: "@square.py#sol-stairs", view: output, autorun: 1 }
clip:
  - wait: 600
  - expect: { selector: "#status", contains: Finished }
caption: "The expected result: a staircase with 5 steps"
reveal: Show what the staircase should look like
tasks:
  - hint:
      - "Trace one step with your finger. Which moves and turns make one step?"
      - "One step is four lines: up, turn, across, turn back. Put those under a for line."
    check: { type: code, text: "Draw a staircase with 5 steps using a loop.", rules: { loops: 1 } }
  - hint: "Only one number needs to change."
    check: { type: reflect, text: "I made the staircase 10 steps by changing one number." }
  - check: { type: reflect, text: "I drew a pattern of my own: I found the part that repeats and wrote it once." }
```

A loop works for any pattern, not only shapes. Find the part that repeats, write it once, and say how many times.

### Draw a staircase

Draw a staircase with 5 steps, like the picture.

### Make it taller

Make it 10 steps.

### Your own pattern

Try a zigzag, a row of battlements or a dashed line. Find the part that repeats first.

Next lesson adds variables. Then you put loops and variables to work on a whole program: a street of houses.
