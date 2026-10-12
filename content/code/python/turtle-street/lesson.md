---
order: 2.5
unit: drawing
title: A street of houses
summary: Read a whole program that uses loops and variables together, then change it and add to it.
language: python
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground" 8123
  url: http://127.0.0.1:8123/index.html
  ready: Python code
  layout: full
pacing:
  keyDelayMs: 22
hook: "Real programs are longer than a few lines. Programmers spend more time reading code than writing it: they find the part that does a job, then change just that part."
---
This program uses only what you already know: loops, variables and a calculation. It is longer, so the skill now is **reading**: finding which part does which job, and how the parts depend on each other.

## Watch it built

```step
stage: info
app: true
query: { code: "", speed: 8 }
clip:
  - caption: "First, name the numbers the street depends on."
  - type: { into: "Python code", text: "from turtle import *\n\nspeed(0)\nhouses = 4\nwidth = 60\ngap = 20\n\n", append: true }
  - caption: "Move to the left of the screen without drawing."
  - type: { into: "Python code", text: "penup()\nbackward(220)\npendown()\n\n", append: true }
  - caption: "Everything indented under this line happens once per house."
  - type: { into: "Python code", text: "for house in range(houses):\n", append: true }
  - caption: "One house, part 1: the walls are a square."
  - type: { into: "Python code", text: "    # walls\n    for side in range(4):\n        forward(width)\n        left(90)\n", append: true }
  - caption: "Part 2: go up to the top corner, draw the roof, come back down."
  - type: { into: "Python code", text: "    # roof\n    left(90)\n    forward(width)\n    right(30)\n    forward(width)\n    right(120)\n    forward(width)\n    right(30)\n    forward(width)\n    left(90)\n", append: true }
  - caption: "Part 3: step along to where the next house starts."
  - type: { into: "Python code", text: "    # move along to the next house\n    penup()\n    forward(gap)\n    pendown()\n\n", append: true }
  - caption: "Last, work out how long the street is."
  - type: { into: "Python code", text: "print(houses * width + (houses - 1) * gap)\n", append: true }
  - click: Run
  - expect: { selector: "#status", contains: Finished }
  - caption: "Four houses, and the street is 300 long."
  - wait: 1500
```

Watch the program being built, one part at a time. Each caption names the job of the lines that follow it. You will need those jobs in a moment.

## Predict

```step
stage: predict
code: street.py#street
check:
  type: predict
  q: "Change houses to 5. What number will the last line print?"
  kind: number
  actual: "380. Five houses of 60 make 300, and the four gaps between them make 80 more: 5 × 60 + 4 × 20 = 380."
```

You saw it print 300 with 4 houses. Read the last line again: what changes when there is one more house?

## Run

```step
stage: run
code: street.py#street
try: { starter: "street.py#street", height: 420 }
check: { type: reflect, text: "I can point to the lines that draw one house, and the line that makes the houses repeat." }
```

Change `houses` to 5, run it and compare with your prediction. Watch the turtle: which part of the program is it running right now?

## Investigate

```step
stage: investigate
code: street.py#street
insight: "A longer program is made of parts that each do one job. Find the part, see what it depends on, and you can change it without breaking the rest."
tasks:
  - check:
      type: match
      q: "Match each part of the program with its job."
      pairs:
        - ["for side in range(4):", "draws the walls"]
        - ["left(90) then forward(width), right(30) ...", "draws the roof and comes back down to the ground"]
        - ["penup(), forward(gap), pendown()", "moves to where the next house starts, without drawing"]
        - ["for house in range(houses):", "repeats everything indented under it, once per house"]
      explain: "The outer loop repeats a whole house: walls, roof and the move along. The inner loop repeats only the walls."
  - check:
      type: number
      q: "Back to 4 houses. Change width to 70 and leave the rest. What will the last line print?"
      answer: 340
      explain: "4 × 70 + 3 × 20 = 340. Every part that uses width follows the change: the walls, the roof and the length."
  - check:
      type: bug
      code: street.py#bug
      text: "With houses = 4 this street looks right. Change houses to 6 and the roofs go wild. Click the wrong line."
      answer: 14
      fault: logic
      misconception: count-wrong-variable
      explain: "The walls loop repeats houses times instead of 4. It only looked right because houses happened to be 4. A square always has 4 sides, whatever houses is."
```

### Find the parts

Match each part with its job.

### Follow a change

What depends on `width`?

### Spot the bug

This version looks fine at first. Change a number and it isn't.

## Modify

```step
stage: modify
insight: "Change one part at a time and run after each change; the rest of the program should keep working."
try: { starter: "street.py#street", height: 420 }
tasks:
  - hint:
      - "The screen's right edge is about x = 250. The printed number is the street's length, starting from x = -220."
      - "Six houses need six widths and five gaps. Try a smaller width."
    check: { type: code, text: "Draw 6 houses that all fit on the screen.", rules: { contains: ["houses = 6"] } }
  - hint:
      - "Which line runs once per house? A change there happens to every house."
      - "Look back at size = size + 5 in lesson 2. Add a line at the end of the house loop."
    check: { type: code, text: "Make each house 10 wider than the one before.", rules: { contains: ["width = width + 10"] } }
  - check: { type: reflect, text: "After making the houses grow, I checked whether the printed length is still right, and said why." }
```

Change the street one step at a time. Run after each change.

### Six houses

Fit six houses on the screen.

### Growing houses

Make each house a little wider than the last.

### Is the length still right?

The last line works out the length from `width`. Is it still true?

## Make

```step
stage: make
try: { starter: "street.py#make", height: 420 }
tasks:
  - hint:
      - "Decide what one part looks like (one fence post, one tree), then what repeats."
      - "One post: turn up, go up, come back down, turn back, step along. Put those under a for line."
    check: { type: code, text: "Add something to the street that is drawn by its own loop.", rules: { loops: 3 } }
  - check: { type: reflect, text: "My new part uses a variable, so I can change how many or how big in one place." }
```

Add something new after the houses: a fence, a row of trees or a shop.

### Add a part

Give it its own loop, after the house loop.

### Make it adjustable

Give it its own variable, so how many or how big is set in one place.

## Lay a tiled floor

```step
stage: modify
try: { starter: "street.py#use", height: 420 }
```

Tilers plan floors like this: one tile, repeated. This program is a loop inside a loop, like the street. Which loop draws one tile, and which repeats the tile? Change the number of tiles, make them bigger, then add a second row.
