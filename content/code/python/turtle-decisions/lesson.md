---
order: 3
unit: choices
introduces: [if, else, elif, compare, remainder, loop-index]
title: Decisions
summary: Make a program choose between two things with if and else.
language: python
hook: "Traffic lights, game scores, login screens and thermostats all do the same thing: check a condition and pick what happens next."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 8 }
  caption: "if lets the program choose which lines run"
  say: "An if lets your program choose which lines to run."
  pacing: { keyDelayMs: 22 }
  clip:
    - type: { into: "Python code", text: "from turtle import *\n\npensize(5)\nfor i in range(6):\n", append: true }
    - caption:
        text: "if i % 2 == 0: asks a question. % is the remainder."
        say: "The if asks a question: does i divide by two with nothing left over?"
    - type: { into: "Python code", text: "    if i % 2 == 0:\n        pencolor(\"red\")\n", append: true }
    - caption:
        text: "Yes: the lines under if run. No: the lines under else run."
        say: "If yes, the lines under if run. If not, the lines under else run."
    - type: { into: "Python code", text: "    else:\n        pencolor(\"blue\")\n    forward(80)\n    left(60)\n", append: true }
    - click: "Run"
    - expect: { selector: "#status", contains: "Finished" }
    - caption:
        text: "Even sides red, odd sides blue. == asks, = stores."
        say: "Even sides are red, odd sides blue. Two equals signs ask; one stores."
    - wait: 1200
    - expect: { selector: "#status", contains: "Finished" }
---
So far every line of your program has run, in order, every time. Now the program will **choose**: run these lines if something is true, and those lines if it is not.

## Predict

```step
stage: predict
code: decisions.py#checker
check:
  type: predict
  q: "What colour is the third square (when i is 2)?"
  options: ["black", "white"]
  actual: "Black. The squares alternate black, white, black, white, starting with black, because i % 2 is 0 for 0, 2, 4 and 6."
```

`i` is the loop counter from Lesson 1, which counts 0, 1, 2, 3 and so on. `i % 2` is the **remainder** when `i` is divided by 2. It is 0 for even numbers and 1 for odd numbers. The `if` line runs its body only when that remainder is 0.

## Run

```step
stage: run
code: decisions.py#checker
try: { starter: "decisions.py#checker", height: 440 }
check: { type: reflect, text: "I can explain how the program chooses black or white for each square." }
unlocks: [if-else]
```

Run it and compare it with your prediction.

## Investigate

```step
stage: investigate
code: decisions.py#print
insight: "A decision is a condition plus two paths. You can follow it by working out the condition for each value, and find the bug by checking the form of the condition."
tasks:
  - check:
      type: trace
      text: "Fill in the gaps for each square: the remainder and the colour the program picks."
      table: |
        | i | i % 2 | colour |
        | 0 | 0 | black |
        | 1 | [1] | [white] |
        | 2 | [0] | [black] |
        | 3 | [1] | [white] |
      explain: "Even numbers leave a remainder of 0, so the condition is true and the square is black. Odd numbers leave 1, so the else path makes it white."
  - check:
      type: number
      q: "If the row had 9 squares instead of 8, how many would be black?"
      answer: 5
      explain: "The black squares are i = 0, 2, 4, 6 and 8, so there are five."
  - check:
      type: bug
      code: decisions.py#bug
      text: "This program should draw a row of circles that alternate colour, but it will not even start. Click the wrong line."
      answer: 4
      fault: syntax
      misconception: assign-vs-compare
      explain: "A single = stores a value. To ask whether two things are equal, the condition needs two: i % 2 == 0."
```

`print(i, i % 2)` shows each remainder as it is worked out. Run it and watch the output.

### Trace the squares

Work out the remainder and the colour for each square.

### Count the black squares

Use the pattern to answer without drawing.

### Spot the bug

Here is a version where something is wrong.

## Modify

```step
stage: modify
insight: "Changing a condition changes the whole pattern, and an extra path (elif) adds a choice without rewriting the rest."
try: { starter: "decisions.py#modify", height: 440 }
tasks:
  - hint: "The colours are the words in quotes inside fillcolor( )."
    check: { type: reflect, text: "I changed the colours and ran the program to check." }
  - hint:
      - "Check the third-square case first, with an elif above the else."
      - "The condition `i % 3 == 0` is true for 0, 3, 6 and 9."
    check: { type: code, text: "Add an elif so one more colour appears.", rules: { uses: [elif] } }
```

### Change the colours

Swap black and white for two colours of your own.

### Add a third colour

Make every third square green. Place the new check before the others, and use `elif`.

## Make

```step
stage: make
try: { starter: "decisions.py#make", height: 440 }
hint:
  - "Inside the loop, use `if i % 2 == 0:` to pick between two different shapes."
  - "One path could draw a circle, the other a square. Both paths finish by moving forward."
```

Draw a row of **10 shapes**. Even-numbered shapes should be circles, odd-numbered shapes squares.

## Set the traffic light

```step
stage: modify
try: { starter: "decisions.py#light", height: 440 }
```

A traffic light is a decision: one variable says which light is on, and the program picks what to do. Change `light` to `"red"`, run it, then to `"orange"`. Then add a new state, `"flashing"`, that fills the circle yellow and prints `"Slow down"`.
