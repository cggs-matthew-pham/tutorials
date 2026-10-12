---
order: 2
unit: drawing
introduces: [variable, arithmetic]
recipes: [string, print]
title: Name a value
summary: Give a number a name, then let the program work out the rest.
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
In the last lesson the numbers were typed straight into each command. Here you give a number a **name**, so you can change it in one place and let the program work out the rest.

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
```

Run it and compare it with your prediction.

Here is what each line does.

| Line | What it does | Why |
|---|---|---|
| `sides = 5` | Stores 5 under the name `sides` | Read `=` as "store": put 5 in a box called `sides` |
| `size = 80` | Stores 80 under the name `size` | Change it here and every `size` below changes |
| `angle = 360 / sides` | Works out the turn and stores it | A full turn is 360 degrees, split between the corners |
| `range(sides)` | Repeats `sides` times | The name stands in for 5 |
| `right(angle)` | Turns by whatever `angle` holds | 72 here, but you never typed 72 |

Change `sides` and the turn updates by itself.

## Investigate

```step
stage: investigate
code: variables.py#print
insight: "A variable is a named value: you can follow how it is used, find where it goes wrong, and change it in one place."
tasks:
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
  - check:
      type: question
      q: "The program stores size = 50 and draws a line. Later it stores size = 100 and draws another line. How long was the first line?"
      options: ["50", "100", "150", "Storing size twice is an error"]
      answer: 0
      fault: logic
      misconception: variable-copies-later
      explain: "A line uses the value size holds at that moment. Storing a new value changes the lines drawn after it, not the ones already drawn."
  - check:
      type: bug
      code: variables.py#bug-indent
      text: "This should draw a hexagon, but the turtle draws one long line and turns once at the end. Click the wrong line."
      answer: 9
      fault: logic
      misconception: loop-body-indent
      explain: "right(angle) is not indented, so it is not part of the loop. Indent it under the for line so both lines repeat."
```

`print(angle)` shows a value under the drawing. Copy it whenever you want to see what a name holds; the console lessons explain how it works. Change `sides` and watch what `angle` becomes, then work through the checks.

### Calculate the angle

Work out `angle` yourself before you check.

### Spot the bug

Here is a version where something is wrong.

### A name keeps its value

A name holds one value at a time. Lines that ran earlier keep what they used.

```python
size = 50
forward(size)
size = 100
forward(size)
```

### Spot the bug in the loop

You have met this one before, now with names in it.

## Modify

```step
stage: modify
insight: "Changing the program through a variable is safer than changing many numbers: one edit, whole shape updated."
try: { starter: "variables.py#modify", height: 420 }
hint: "You should only need to change one number. Which variable controls the number of sides?"
check: { type: reflect, text: "I changed one variable and the whole shape updated." }
```

Change one number at the top to draw a hexagon, then a 12-sided shape. Run it each time.

## Make

```step
stage: make
try: { starter: "variables.py#make", height: 420 }
hint:
  - "Put three names at the top: sides, size and colour. Then use each name below."
  - "A colour is text, so it goes in quotes: colour = \"purple\". Use it with pencolor(colour)."
check: { type: code, text: "Use a variable for the pen colour and draw a shape with a loop.", rules: { uses: [pencolor], loops: 1 } }
unlocks: [variable]
```

Make your own shape generator. Put three names at the top (`sides`, `size` and `colour`) and use all three below. Then change each one and watch the shape change.

## Resize a room plan

```step
stage: modify
try: { starter: "variables.py#plan", height: 420 }
```

Plans and maps store a **scale**: how many pixels are one metre. This program draws a 6 m by 4 m room. Change the room to 8 m by 5 m, then change `scale` and notice the whole plan resizes. Then add a second room beside it.
