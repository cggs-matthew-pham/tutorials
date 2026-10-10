---
order: 2
unit: drawing
title: Variables and operations
summary: Give a number a name, then calculate with it.
language: python
hook: "Games keep score, maps keep scale and apps keep your settings. All of them store a value under a name and calculate with it."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 8 }
  caption: "A variable is a name for a value"
  say: "A variable is a name for a value, like a labelled box."
  pacing: { keyDelayMs: 22 }
  clip:
    - caption:
        text: "sides = 5 stores 5 in a box called sides."
        say: "sides equals 5 stores five in a box called sides."
    - type: { into: "Python code", text: "from turtle import *\n\nsides = 5\n", append: true }
    - caption:
        text: "angle = 360 / sides works out the turn for you."
        say: "angle equals 360 divided by sides works out the turn for you."
    - type: { into: "Python code", text: "angle = 360 / sides\n\nfor i in range(sides):\n    forward(80)\n    left(angle)\n", append: true }
    - click: "Run"
    - expect: { selector: "#status", contains: "Finished" }
    - caption: "Change sides and the turn updates by itself."
    - type: { into: "Python code", text: "", after: "sides = 5" }
    - press: "Backspace"
    - type: { into: "Python code", text: "8", after: "sides = " }
    - click: "Run"
    - wait: 400
    - expect: { selector: "#status", contains: "Finished" }
    - wait: 1200
    - expect: { selector: "#status", contains: "Finished" }
---
In the last lesson the numbers were typed straight into each command. Here you give a number a **name**, so you can change it in one place and calculate with it.

## Predict

```step
stage: predict
code: variables.py#polygon
check:
  type: predict
  q: "How many sides will the shape have?"
  kind: number
  actual: "Five sides. angle = 360 / 5 = 72, so the turtle turns 72 degrees at each corner and the shape closes."
```

`angle = 360 / sides` stores the result of a calculation. What will the turtle draw? How many sides, and why does `right(angle)` turn by that amount?

## Run

```step
stage: run
code: variables.py#polygon
try: { starter: "variables.py#polygon", height: 420 }
check: { type: reflect, text: "I can explain what sides, size and angle store, and where angle comes from." }
unlocks: [variable, print]
```

Run it and compare it with your prediction.

## Investigate

```step
stage: investigate
code: variables.py#print
insight: "A variable is a named value: you can follow how it is used, find where it goes wrong, and change it in one place."
tasks:
  - check:
      type: trace
      text: "sides = 5, so angle is 72. Fill in how many degrees the turtle has turned in total after each corner."
      table: |
        | corner | turned so far |
        | 0 | 72 |
        | 1 | [144] |
        | 2 | [216] |
        | 3 | [288] |
        | 4 | [360] |
      explain: "Every corner adds 72, and after 5 corners the turtle has made one full turn."
  - check:
      type: number
      q: "If sides = 6, what is angle?"
      answer: 60
      explain: "360 / 6 = 60, so the turtle turns 60 degrees at each corner."
  - check:
      type: bug
      code: variables.py#bug
      text: "This program should draw a 5-sided shape, but it does not close. Click the wrong line."
      answer: 5
      fault: logic
      misconception: angle-from-sides
      explain: "angle = 360 * sides is too big. To split one full turn between the corners it should be 360 / sides."
```

`print(angle)` shows a value under the drawing. Change `sides` and watch what `angle` becomes.

### Trace the corners

Follow the turtle round the shape.

### Calculate the angle

Work out `angle` yourself before you check.

### Spot the bug

Here is a version where something is wrong.

## Modify

```step
stage: modify
insight: "Changing the program through a variable is safer than changing many numbers: one edit, whole shape updated."
try: { starter: "variables.py#modify", height: 420 }
tasks:
  - hint: "You should only need to change one number. Which variable controls the number of sides?"
    check: { type: reflect, text: "I changed one variable and the whole shape updated." }
  - hint:
      - "A variable can hold text as well as numbers, for example a colour in quotes."
      - "Give the colour a name at the top, then use that name inside pencolor( )."
    check: { type: code, text: "Store a colour in a variable and use it with pencolor.", rules: { uses: [pencolor] } }
```

### Draw a hexagon, then a 12-sided shape

Change one number at the top and run it each time.

### Choose the colour with a variable

Add a variable for the pen colour and use it.

## Make

```step
stage: make
try: { starter: "variables.py#make", height: 420 }
hint:
  - "The line should get longer every time round the loop. What can change `size` inside the loop?"
  - "A variable can be updated using its own value: the new `size` is the old `size` plus something."
```

Draw a **square spiral**: each time round the loop, the line should be a little longer than the last.

## Resize a room plan

```step
stage: modify
try: { starter: "variables.py#plan", height: 420 }
```

Plans and maps store a **scale**: how many pixels are one metre. This program draws a 6 m by 4 m room. Change the room to 8 m by 5 m, then change `scale` and notice the whole plan resizes. Then add a second room beside it.
