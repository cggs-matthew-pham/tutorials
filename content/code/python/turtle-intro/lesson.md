---
order: 1
unit: drawing
introduces: []
recipes: [import-star]
title: Drawing with a turtle
summary: Give a turtle commands, in order, and watch the picture they make.
language: python
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground" 8123
  url: http://127.0.0.1:8123/index.html
  ready: Python code
  layout: full
pacing:
  keyDelayMs: 30
hook: "Every animation, game character and robot is moved by a list of commands that run in order. Today you give the commands."
voice: true
explainClip:
  query: { code: "", speed: 6 }
  caption: "The turtle follows your commands from the top down"
  say: "The turtle follows your commands one at a time, from the top down."
  pacing: { keyDelayMs: 22 }
  clip:
    - type: { into: "Python code", text: "from turtle import *\n\n", append: true }
    - caption:
        text: "forward(100) moves the turtle 100 steps and draws a line."
        say: "Forward 100 moves the turtle 100 steps and draws a line."
    - type: { into: "Python code", text: "forward(100)\n", append: true }
    - caption:
        text: "right(90) turns it a quarter turn. It does not move or draw."
        say: "Right 90 turns the turtle a quarter turn without moving."
    - type: { into: "Python code", text: "right(90)\n", append: true }
    - caption:
        text: "The next forward goes in the new direction."
        say: "The next forward goes the new way."
    - type: { into: "Python code", text: "forward(100)\n", append: true }
    - click: "Run"
    - expect: { selector: "#status", contains: "Finished" }
---
A turtle walks across the screen, leaving a line behind. Your program tells it where to go.

## Meet the commands

```step
stage: info
app: true
query: { code: "", speed: 8 }
clip:
  - caption: "A program is a list of commands. The turtle follows them from the top down."
  - type: { into: "Python code", text: "from turtle import *\n\n", append: true }
  - caption: "forward(100) moves the turtle 100 steps and draws a line."
  - type: { into: "Python code", text: "forward(100)\n", append: true }
  - caption: "right(90) turns it a quarter turn. It does not move or draw."
  - type: { into: "Python code", text: "right(90)\n", append: true }
  - caption: "The next forward goes in the new direction."
  - type: { into: "Python code", text: "forward(100)\n", append: true }
  - click: Run
  - expect: { selector: "#status", contains: Finished }
```

A program is a list of commands. The turtle follows them one at a time, from the top down.

| Line | What it does | Why |
|---|---|---|
| `from turtle import *` | Gives your program the turtle commands | Copy this to the top of every program for now. A later lesson shows how it works |
| `forward(100)` | Moves the turtle 100 steps and draws a line | The number is how far |
| `right(90)` | Turns the turtle a quarter turn, on the spot | It does not move or draw. 90 is a quarter of a full turn |
| `forward(100)` | Moves again, now in the new direction | The turn changed which way is forward |

`left(90)` turns the other way.

The order matters. The turtle does the first line first. Swap two lines and you get a different picture.

## Predict

```step
stage: predict
code: square.py#commit
reveal: true
check:
  type: predict
  q: "What will the turtle draw?"
  options:
    - "An L: 100 steps across, a turn, then 50 steps down"
    - "A line of 100 steps, then a line of 90 steps"
    - "50 steps across first, then 100 steps down"
  fault: logic
  misconception: turn-draws
  actual: "An L. forward(100) draws across, right(90) turns without drawing, and forward(50) draws down. The turn is not a line (so not 90 steps), and the lines run in the order written (so 100 comes before 50)."
app: true
clip:
  - caption: The turtle starts in the middle, facing right.
  - type:
      into: Python code
      text: "@square.py#commit"
  - click: Run
  - expect: { selector: "#status", contains: Finished }
```

Read the code and decide. Which picture will it draw?

## Run

```step
stage: run
code: square.py#commit
try: { starter: "square.py#commit", height: 420 }
```

Run the program and compare it with your prediction. Did the turn draw anything?

## Put the lines in order

```step
stage: investigate
code: square.py#parsons
insight: "The order of the commands is the picture: the same lines in a different order make a different drawing."
app: true
query: { code: "@square.py#hook-pic", view: output, autorun: 1 }
clip:
  - wait: 600
  - expect: { selector: "#status", contains: Finished }
caption: "The picture to match"
reveal: Show the picture to match
check:
  type: parsons
  code: square.py#parsons
  text: "These five lines are mixed up. Put them in the order that draws the picture."
  fault: logic
  misconception: order-free
  explain: "The turtle draws 100 across, turns, draws 60, turns, then draws 30, so each line is shorter and the picture hooks inward. Any other order draws a different picture, because each turn changes which way the next forward goes."
```

Look at the picture, then put the lines in the order that draws it.

## Make

```step
stage: make
try: { starter: "square.py#make", height: 420 }
app: true
query: { code: "@square.py#sol-square", view: output, autorun: 1 }
clip:
  - wait: 600
  - expect: { selector: "#status", contains: Finished }
caption: "The expected result: a square"
reveal: Show what the square should look like
hint:
  - "A square has four equal sides. How many forward lines will you need? How many turns?"
  - "Draw one side, then turn a quarter turn (90). Do that four times, one line after another."
check: { type: code, text: "Draw a square with forward and right.", rules: { uses: [forward, right] } }
```

Draw a square. Each side is 100 steps long. Write every command out, one after another. Next lesson shows a shorter way.
