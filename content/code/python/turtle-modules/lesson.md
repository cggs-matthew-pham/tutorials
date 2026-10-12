---
order: 17
unit: functions
moveId: module-toolbox
reviews: [name-steps, function-inputs]
assumes: [function, param]
introduces: [import-from, import-star]
title: Modules
summary: Keep related functions together in a file you can import, like a toolbox.
language: python
modules: [shapes]
hook: "Every Python program you will ever use imports other people's modules. Now you will build your own."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 8, use: "shapes" }
  caption: "A module is a file of functions any program can use"
  say: "A module is a file of related functions that any program can use."
  pacing: { keyDelayMs: 22 }
  clip:
    - caption:
        text: "from shapes import square brings square in from shapes.py."
        say: "This line brings the square function in, from the file shapes dot py."
    - type: { into: "Python code", text: "from turtle import *\nfrom shapes import square\n\n", append: true }
    - caption:
        text: "Now call it like any function."
        say: "Now call it, like any other function."
    - type: { into: "Python code", text: "square(60)\nright(45)\nsquare(60)\n", append: true }
    - click: "Run"
    - expect: { selector: "#status", contains: "Finished" }
    - caption:
        text: "One copy, in the module: fix it once, and every program gets the fix."
        say: "There is one copy, in the module, so one fix fixes every program."
    - wait: 1200
    - expect: { selector: "#status", contains: "Finished" }
---
You have written several functions. A **module** is a file that holds related functions, so any program can import them.

## Predict

```step
stage: predict
code: modules.py#use
```

This program never defines `square` or `triangle`. What does it draw? Where do you think they come from?

## Run

```step
stage: run
code: modules.py#use
try: { starter: "modules.py#use", height: 420 }
check: { type: reflect, text: "I ran a program that imports functions from a module." }
unlocks: [my-module]
```

Run it. The line `from shapes import square, triangle` brings two ready-made functions into your program.

## Investigate: one bug, two copies

```step
stage: investigate
insight: "Copied code multiplies the work of fixing it; one shared module is fixed once."
tasks:
  - check:
      type: bug
      code: modules.py#copies
      text: "The walls do not close: the turn inside wall is wrong. Click every line you would have to change."
      answer: ["program_a.py:7", "program_b.py:7"]
      fault: design
      misconception: copied-code
      explain: "Both programs run, but each has its own copy of wall, so the same fix is needed in two places. Miss one and that program stays wrong."
  - check:
      type: question
      q: "You fix the bug in program_a.py. What happens to program_b.py?"
      options: ["It is fixed too", "It still has the bug, so you fix it separately", "It stops working", "Python warns you"]
      answer: 1
      explain: "Each file has its own copy of wall, so each copy needs fixing. If both programs imported wall from one module, you would fix it once."
```

Two separate programs both need `wall`, so each has its own copy. Nothing here crashes; the problem is the copying. Pasting from **My tools** works the same way: each paste is a copy, and editing the tool does not change copies already pasted. This is the problem a module solves.

### Every line to change

The walls should close into squares. Find every place the fix has to go.

### Count the fixes

You fix one copy. What about the other?

## Investigate: where does it come from?

```step
stage: investigate
code: modules.py#use
try: { starter: "modules.py#use", height: 420 }
insight: "An import gives a program names; a def with the same name replaces the imported one without warning."
tasks:
  - check:
      type: question
      q: "Where is square defined?"
      options: ["In this program", "In shapes.py, which this program imports", "Inside the turtle module", "Nowhere"]
      answer: 1
      explain: "The def lives in shapes.py. The import line makes it available here."
    unlocks: [shapes.square, shapes.triangle, shapes.polygon]
  - check:
      type: question
      q: "main.py imports square, then defines its own square. What does square(80) draw?"
      options: ["A square, from shapes.py", "A circle, from main.py", "A square and a circle", "Nothing: Python stops with an error"]
      answer: 1
      fault: logic
      misconception: name-rebinding
      explain: "The def in main.py comes after the import, so the name square now means the new function. Python gives no warning. Use a different name, or keep one definition."
```

Open **Reference**, find **Module: shapes** and click **Show how it works**. Compare it with the functions you have written.

### Find the def

Where does `square` come from?

### Same name twice

```python
# file: shapes.py
from turtle import *


def square(size):
    for i in range(4):
        forward(size)
        right(90)

# file: main.py
from turtle import *
from shapes import square


def square(size):
    circle(size / 2)


square(80)
```

## Modify

```step
stage: modify
try: { starter: "modules.py#move", height: 460 }
hint:
  - "Click + module, give it a name, then cut the three functions and paste them there."
  - "Your program needs a line at the top: from yourname import house"
  - "The walls turn 80 degrees. Work the turn out from the shape instead: right(360 / 4)."
check: { type: reflect, text: "I moved my functions into a module, imported them, and fixed the wall in one place." }
```

These three functions are all in one file, and the wall does not close. Click **+ module**, move them into it, and import `house` back into `main.py`. Then fix the turn in `wall`, once, in the module. Work it out from the shape, as you did with variables: `360 / 4`, not a guessed number.

## Make

```step
stage: make
try: { starter: "modules.py#make", height: 460 }
hint:
  - "Pick a theme for your module, such as trees, stars or buildings."
  - "Keep drawing calls in main.py. The module should only contain functions."
```

Create a module of your own with at least three related functions. Import it and use it to draw a small scene.

## Extend a street

```step
stage: modify
try: { starter: "modules.py#street", height: 440 }
```

A street is a few buildings repeated, and each building comes from a module. Run it. Add a roof colour, a taller house, or a gap in the street. You are changing the plan without rewriting any of the shapes.
