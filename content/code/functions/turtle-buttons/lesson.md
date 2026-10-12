---
order: 8
unit: interaction
moveId: build-a-button
reviews: [react-to-event, if-else]
introduces: [and-or]
assumes: [callback, variable-update, global]
title: Build a button
summary: Turtle has no buttons, so build one from a rectangle and a click check.
language: python
modules: [ui]
hook: "Frameworks give you a button in one line. Underneath, it is a rectangle, a label and a check that a click landed inside. You are about to build all three."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query:
    code: |
      from turtle import *

      hideturtle()
      bx = -60
      by = -25
      bw = 120
      bh = 50

      penup()
      goto(bx, by)
      pendown()
      for i in range(2):
          forward(bw)
          left(90)
          forward(bh)
          left(90)
      penup()
      goto(bx + 10, by + 15)
      write("Press me")
    speed: 10
  caption: "A button is a rectangle, a label and a check"
  say: "A button is three things: a rectangle, a label, and a check."
  pacing: { keyDelayMs: 22 }
  clip:
    - caption:
        text: "The rectangle and label are drawn. Now the check."
        say: "The rectangle and the label are drawn already. Now for the check."
    - caption:
        text: "Inside: x between the left and right edges, y between bottom and top."
        say: "Inside means x is between the side edges, and y between bottom and top."
    - type: { into: "Python code", text: "\ndef clicked(x, y):\n    if x > bx and x < bx + bw and y > by and y < by + bh:\n        print(\"button pressed\")\n", append: true }
    - caption: "All four must be true, so they are joined with and."
    - type: { into: "Python code", text: "\nonscreenclick(clicked)\nmainloop()\n", append: true }
    - click: "Run"
    - expect: { selector: "#status", contains: "Running" }
    - click: { selector: "#canvas" }
    - expect: { selector: "#output", contains: "button pressed" }
    - caption:
        text: "A real app then changes something and redraws the screen."
        say: "A real app would then change something, and redraw the screen."
    - wait: 1200
    - expect: { selector: "#status", contains: "Running" }
---
A button is not magic. It is a **rectangle**, a **label**, and a check that asks: *did the click land inside the rectangle?*

Click the picture once before you use it, and press **Stop** when you are done.

## Predict

```step
stage: predict
code: buttons.py#hit
check:
  type: predict
  q: "You click the very centre of the picture, at (0, 0). What does the program print?"
  options: ["button pressed", "missed"]
  actual: "button pressed. The button runs from x = -60 to 60 and from y = -25 to 25, and (0, 0) is inside it."
```

The button's corner is at `(bx, by)`. It is `bw` wide and `bh` high. A click at `(x, y)` is inside when `x` is between `bx` and `bx + bw`, **and** `y` is between `by` and `by + bh`.

## Run

```step
stage: run
code: buttons.py#hit
try: { starter: "buttons.py#hit", height: 440 }
check: { type: reflect, text: "I can explain how the program decides whether a click is on the button." }
```

Run it, click inside the button and outside it, then press **Stop**.

## Investigate

```step
stage: investigate
code: buttons.py#counter
insight: "A hit test is four comparisons joined with and. You can work out the answer for any click, and find the bug by checking each comparison."
tasks:
  - check:
      type: trace
      text: "The button runs from x = -60 to 60 and y = -25 to 25. Fill in whether each click is inside."
      table: |
        | click x | click y | inside? |
        | 0 | 0 | yes |
        | 80 | 0 | [no] |
        | -30 | 20 | [yes] |
        | 10 | 40 | [no] |
      explain: "A click is inside only when all four comparisons are true. x = 80 is past the right edge, and y = 40 is above the top."
  - check:
      type: number
      q: "A button has bx = -60 and bw = 120. What is the largest x that counts as the right edge?"
      answer: 60
      explain: "The right edge is bx + bw = -60 + 120 = 60."
  - check:
      type: bug
      code: buttons.py#bug
      text: "Every click counts as a press, even one far from the button. Click the wrong line."
      answer: 7
      fault: logic
      misconception: and-vs-or
      explain: "With or, one true comparison is enough, and x > bx alone is true for most clicks. A click is inside only when all four are true, so they are joined with and."
```

The program above counts presses. `draw_scene` redraws everything, and `clicked` checks the click.

### Test some clicks

Work out which clicks are inside the button.

### Find the right edge

Use the numbers to find an edge.

### Spot the bug

Here is a version where something is wrong.

## Modify

```step
stage: modify
insight: "Changing the numbers moves and resizes the button, and changing what clicked does changes what the button means."
try: { starter: "buttons.py#counter", height: 440 }
tasks:
  - hint: "Change bx, by, bw and bh at the top. The click check uses the same names, so it follows."
    check: { type: reflect, text: "I moved and resized the button and it still worked." }
  - hint:
      - "Change the line inside clicked that adds to count."
      - "To add 5, use count = count + 5."
    check: { type: code, text: "Change what a click does, and keep the counter.", rules: { defs: 2, uses: [count] } }
```

### Move and resize it

Make the button bigger and move it to a new place.

### Change what a click does

Make each click add 5 instead of 1.


## Mix it up

```step
stage: investigate
insight: "A hit test is a decision: the code under if runs only when the condition is true."
check:
  type: number
  q: "The student clicks at x = 120. How many times does \"pressed\" appear?"
  answer: 0
  explain: "120 is not between 0 and 100, so the condition is false and the print does not run. Zero times."
```

Work this out on paper first.

```python
# the button covers x from 0 to 100
def clicked(x, y):
    if x >= 0 and x <= 100:
        print("pressed")
```

## Make

```step
stage: make
try: { starter: "buttons.py#make", height: 440 }
hint:
  - "Write one function that draws a button at a given place, and call it twice."
  - "In clicked, use two separate if statements, one for each button. Change count by +1 or -1."
check: { type: code, text: "Build a two-button counter.", rules: { defs: 2, uses: [onscreenclick] } }
```

Build a counter with **two buttons**: `+1` on the left and `-1` on the right, with the number shown above.

## Pick a background colour

```step
stage: modify
try: { starter: "buttons.py#panel", height: 440 }
```

A control panel is a list of buttons. This program keeps the button names in a list, draws one button for each with a loop, and uses a loop in `clicked` to find which one was pressed. Add `"lightgreen"` to the list and see a fifth button appear. Then change the panel so the buttons sit in two rows.

## Use your toolkit

```step
stage: modify
try: { starter: "buttons.py#toolkit", height: 440 }
unlocks: [ui.draw_button, ui.inside]
check: { type: reflect, text: "I used draw_button and inside from the ui module instead of writing them again." }
```

You wrote the drawing and the click check by hand. Real programs keep them in a module. `ui` holds both as functions: `draw_button` and `inside`. Use them to add a second button that takes one away. Compare how many lines this took with your hand-built version.
