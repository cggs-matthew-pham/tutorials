---
order: 5
unit: functions
title: Functions
summary: Give a group of commands a name, then use that name again and again.
language: python
hook: "Every app is built from small named functions that other code calls. You are about to write your first."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 8 }
  caption: "def teaches Python a new word; calling it runs the steps"
  say: "A function is a named set of steps. def teaches Python a new word."
  pacing: { keyDelayMs: 22 }
  clip:
    - type: { into: "Python code", text: "from turtle import *\n\ndef square():\n    for i in range(4):\n        forward(40)\n        right(90)\n\n", append: true }
    - caption:
        text: "Run it: nothing is drawn. The def only says what square means."
        say: "Run it, and nothing is drawn. The def only says what square means."
    - click: "Run"
    - expect: { selector: "#status", contains: "Finished" }
    - caption:
        text: "The steps run when you call it: square()"
        say: "The steps run when you call it, by its name with brackets."
    - type: { into: "Python code", text: "square()\nforward(60)\nsquare()\nforward(60)\nsquare()\n", append: true }
    - click: "Run"
    - wait: 400
    - expect: { selector: "#status", contains: "Finished" }
    - caption:
        text: "Three calls, three squares. Change the def once and all three change."
        say: "Three calls, three squares. Change the def once, and every square changes."
    - wait: 1200
    - expect: { selector: "#status", contains: "Finished" }
---
You already know how to repeat steps with a loop. Now you will give a whole shape a **name**.

## Predict

```step
stage: predict
code: functions.py#copies
```

This program draws three squares by repeating the same code. What does it draw? Count how many times the number `100` appears.

## Run

```step
stage: run
code: functions.py#copies
try: { starter: "functions.py#copies", height: 440 }
check: { type: reflect, text: "I changed the same number in several places to resize all three squares." }
```

Run it. Then make all three squares half as big. Notice how many places you had to change.

## Investigate

```step
stage: investigate
code: functions.py#def
insight: "A def only describes steps; calling its name runs them, so one change inside the def changes every call."
unlocks: [def-function]
tasks:
  - check:
      type: number
      q: "To make all three squares half as big now, how many numbers change?"
      answer: 1
      explain: "Only the numbers inside def square(): change. The three calls are just the name square(), so they never need editing."
  - check:
      type: match
      q: "Match each part of the program with its job."
      pairs:
        - ["def square():", "gives the steps a name"]
        - ["square()", "runs the steps"]
        - ["for i in range(4):", "repeats the four sides"]
        - ["forward(100)", "moves the turtle"]
      explain: "def only describes the steps. Calling the name is what runs them."
  - check:
      type: parsons
      code: functions.py#parsons
      text: "Put the lines in order so the program draws one square."
      explain: "The def comes first, indented lines belong inside it, and the call comes after."
  - check:
      type: question
      q: "Someone pasted a second def square below the first. What does square() draw?"
      options: ["A square", "A triangle", "A square, then a triangle", "Nothing: Python stops because square is defined twice"]
      answer: 1
      fault: logic
      misconception: name-rebinding
      explain: "A def gives a name to some steps. The second def gives the same name to new steps, so by the time square() is called it means the triangle. Python gives no warning: the first def is simply lost."
```

`def square():` gives the loop a name. The steps only run when the name is **called**: `square()`.

### Count the changes

Compare this with the copy-and-paste version from the last step.

### Match the parts

What does each part of this program do?

### Put it in order

Build the function from scrambled lines.

### Same name twice

This is one file.

```python
from turtle import *


def square():
    for i in range(4):
        forward(100)
        right(90)


def square():
    for i in range(3):
        forward(100)
        right(120)


square()
```

## Modify

```step
stage: modify
insight: "Writing your own def, following a pattern, is the step from reading functions to making them."
try: { starter: "functions.py#modify", height: 440 }
tasks:
  - hint: "Change a number inside the def, not the call."
    check: { type: reflect, text: "I changed one number inside the def and the square changed." }
  - hint:
      - "Copy the pattern of `square`: the word `def`, a name, brackets, a colon, then the indented steps."
      - "A triangle has 3 sides. The turn at each corner is not 90."
    check: { type: code, text: "Write def triangle() and run your program.", rules: { defs: 2 } }
  - hint: "Call each function by its name with brackets, like square()."
    check: { type: code, text: "Call square twice and triangle at least once.", rules: { defs: 2, calls: 2 } }
```

### Resize the square

Change the size of the square inside `def square():` and run it.

### Write a triangle function

Write `def triangle():` following the pattern of `square`.

### Use both

Draw a square, then a triangle, then a square again.

## Make

```step
stage: make
try: { starter: "functions.py#make", height: 440 }
hint:
  - "Start with a shape you can already draw with a loop, then put `def name():` above it."
check:
  type: code
  text: "Write your function and call it three times."
  rules: { defs: 1, calls: 3 }
```

Write a function that draws any shape you like (a rectangle, a hexagon, a star), then call it three times in a row.

## Extend the house plan

```step
stage: modify
try: { starter: "functions.py#house", height: 440 }
```

A house plan is a few small named pieces: `wall()` and `roof()`. Run it. Then add a `door()` function and call it. Notice that you never edit `wall` or `roof` to do it.
