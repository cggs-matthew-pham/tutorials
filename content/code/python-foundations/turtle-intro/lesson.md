---
order: 1
unit: drawing
moveId: commands-in-order
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
A turtle walks across the screen, leaving a line behind. Your program tells it where to go. By the end you will draw digits, the way a calculator or a digital clock does.

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
| `right(90)` | Turns the turtle a quarter turn clockwise, on the spot | It does not move or draw. 90 is a quarter of a full turn |
| `left(90)` | Turns the turtle a quarter turn the other way | Also on the spot, also no line |
| `forward(100)` | Moves again, now in the new direction | The turn changed which way is forward |

The turtle starts in the middle, facing right. The order matters: swap two lines and you get a different picture.

## Predict

```step
stage: predict
code: lesson.py#digital2
reveal: true
check:
  type: predict
  q: "What will the turtle draw?"
  options:
    - "The digit 2, like a calculator shows it"
    - "A straight line, 300 steps long"
    - "The digit 5, like a calculator shows it"
  fault: logic
  misconception: turn-draws
  actual: "The digit 2. Five lines of 60, with a turn between each pair: across, down, across, down, across. The turns change direction without drawing (so not one straight line), and the first turn is right, so the turtle goes down on the right side first (so 2, not 5)."
app: true
clip:
  - caption: The turtle starts in the middle, facing right.
  - type:
      into: Python code
      text: "@lesson.py#digital2"
  - click: Run
  - expect: { selector: "#status", contains: Finished }
```

Read the code line by line, as if you were the turtle. Which picture will it draw?

## Run

```step
stage: run
code: lesson.py#digital2
try: { starter: "lesson.py#digital2", height: 420 }
```

Run the program and compare it with your prediction. Which lines did the drawing, and which only turned?

## Put the lines in order

```step
stage: investigate
code: lesson.py#parsons
insight: "The order of the commands is the picture: the same lines in a different order make a different drawing."
app: true
query: { code: "@lesson.py#step-pic", view: output, autorun: 1 }
clip:
  - wait: 600
  - expect: { selector: "#status", contains: Finished }
caption: "The picture to match"
reveal: Show the picture to match
check:
  type: parsons
  code: lesson.py#parsons
  text: "These five lines are mixed up. Put them in the order that draws the picture."
  fault: logic
  misconception: order-free
  explain: "The turtle goes across 60, turns left to face up, goes 40, turns right to face across again, then goes 60 more. Any other order draws a different picture, because each turn changes which way the next forward goes."
```

Look at the picture, then put the lines in order.

## Make

```step
stage: make
try: { starter: "lesson.py#make", height: 420 }
app: true
query: { code: "@lesson.py#sol-four", view: output, autorun: 1 }
clip:
  - wait: 600
  - expect: { selector: "#status", contains: Finished }
caption: "The expected result: the digit 4"
reveal: Show what the 4 should look like
hint:
  - "Start at the top left. The first stroke goes down 50, then across 50 to the right, then up 50 to the top."
  - "You can go back over a line you already drew. After the stroke up, turn right twice (right(180)) and go down 100 for the long stroke."
check: { type: code, text: "Draw a 4 with forward, left and right.", rules: { uses: [forward, left, right] } }
```

Draw a **4** like the one on a calculator: a short stroke down, a bar across, then one long stroke from top to bottom. Use bars of 50 steps. The turtle may draw over a line it has already drawn, so you do not need to lift the pen.

```teacher
summary: Students meet the turtle, read a program that draws a digital 2, learn that the order of commands is the picture, and draw a 4 themselves.
time: 35
timing: "Meet the commands 8 min · Predict and Run 8 min · Put the lines in order 7 min · Make 12 min"
goals:
  - I can say what forward, right and left do to the turtle.
  - I can say why the order of the commands matters.
  - I can write a program of several commands that draws a digit.
before: |
  Draw the 4 yourself. It takes two minutes, and you will see why the last turn is right(180).
running:
  - "Meet the commands: you explain, at the board. Run the three lines live, one at a time. Say what forward and right do, that right does not move the turtle, and that left turns the other way."
  - "Predict: show the digit-2 program and take a vote before anyone runs it. Ask students to walk it as the turtle. The wrong options are two slips: thinking the turns draw, and mixing up right with left."
  - "Run: run it on the slide, then students run it themselves. Ask: which lines drew, and which only turned?"
  - "Put the lines in order: students do the ordering on their own screens. Circulate; if a student is stuck, ask which way the turtle is facing after the first turn."
  - "Make: the 4. Hints are in the speaker notes. If the room is unsure, model the first stroke on the board and let students write the rest. The last stroke goes over a line already drawn, which is allowed."
stuck:
  - see: The turtle draws a line where the student expected a turn.
    ask: Does right(90) move the turtle, or only turn it?
    fix: right and left turn the turtle on the spot. Only forward draws.
  - see: The 4 comes out back to front, or the strokes point the wrong way.
    ask: Read the lines aloud in order, as if you were the turtle. Where does it face after each turn?
    fix: Each line happens after the one above it, and each turn changes which way forward goes. Swap a left for a right, or the other way, and see.
  - see: A NameError or "forward is not defined".
    ask: What is the first line of your program?
    fix: Every program starts with from turtle import *. Copy it to the top.
stretch: Draw a second digit beside the first, such as an 8 or a 7. Where does the turtle have to start?
support: Give the first stroke and the first turn, and ask the student to add the rest.
leads: "Next lesson: the same commands again and again. A square is eight lines written out, and a loop makes it three."
exit:
  q: "A turtle runs forward(100), right(90), forward(50). How many lines does it draw, and which is longer, the first or the second?"
  a: "Two lines (the turn does not draw). The first is longer: 100 steps against 50."
explain: |
  A program is a list of commands the computer follows in order, from the top down. `forward(100)` moves the turtle 100 steps and draws a line. `right(90)` turns it on the spot, a quarter of a full turn clockwise; it does not move or draw. `left(90)` turns the other way.

  Because each turn changes the way the turtle faces, the order of the commands is the picture. Swapping two lines gives a different drawing.

  The first line, `from turtle import *`, gives a program the turtle commands. Students copy it for now; Functions and Modules explain how it works.
solutions:
  step-5: lesson.py#sol-four
struggle: "Remembering that right and left turn without drawing. Ask what the turtle did on that line, instead of telling them."
class:
  inquiry:
    q: "A robot follows its commands in the wrong order and walks into a wall. Whose fault is it: the robot's or the programmer's?"
    prompts:
      - "Did the robot do what it was told?"
      - "What could the programmer have done to catch the mistake before running it?"
    notes: "Let students defend both sides. The robot did exactly what the program said, so the mistake is in the program. Return to this after the ordering task: did anyone's first order give a surprising picture?"
  activities:
    - at: start
      kind: info
      title: "By the end of this lesson"
      do: |
        Here is a digital 2 made from five lines of commands. By the end of the lesson you will write commands that draw a 4.
      notes: "Show the finished 2 on the projector before anything else."
    - at: investigate
      title: Play turtle
      minutes: 5
      do: |
        One volunteer is the turtle, standing in the middle facing the window.
        The class reads the commands aloud, one at a time. The turtle obeys: 3 steps for each forward, a quarter turn for right(90) or left(90).
      notes: "Papert designed the turtle so learners could play it. Walking the commands makes it concrete that a turn changes which way forward goes."
```

```code lesson.py#digital2
from turtle import *

forward(60)
right(90)
forward(60)
right(90)
forward(60)
left(90)
forward(60)
left(90)
forward(60)
```

```code lesson.py#parsons
forward(60)
left(90)
forward(40)
right(90)
forward(60)
```

```code lesson.py#step-pic
from turtle import *

forward(60)
left(90)
forward(40)
right(90)
forward(60)
```

```code lesson.py#make
from turtle import *

# Draw a 4. Each bar is 50 steps.
```

```code lesson.py#sol-four
from turtle import *

right(90)
forward(50)
left(90)
forward(50)
left(90)
forward(50)
right(180)
forward(100)
```
