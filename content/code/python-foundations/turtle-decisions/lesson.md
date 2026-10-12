---
order: 7
unit: choices
moveId: if-else
reviews: [loop-counter, value-update]
introduces: [if, else, compare]
assumes: [loop-index, variable]
title: If and else
summary: Make a program choose which lines to run, using if and else.
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
    - type: { into: "Python code", text: "from turtle import *\n\npensize(6)\nfor i in range(6):\n", append: true }
    - caption:
        text: "if i < 3: asks a question. Is i less than 3?"
        say: "The if asks a question: is i less than three?"
    - type: { into: "Python code", text: "    if i < 3:\n        pencolor(\"red\")\n", append: true }
    - caption:
        text: "Yes: the lines under if run. No: the lines under else run."
        say: "If yes, the lines under if run. If not, the lines under else run."
    - type: { into: "Python code", text: "    else:\n        pencolor(\"blue\")\n    forward(60)\n    right(60)\n", append: true }
    - click: "Run"
    - expect: { selector: "#status", contains: "Finished" }
    - caption:
        text: "The first three sides are red, the last three blue."
        say: "The first three sides are red, and the last three are blue."
    - wait: 1200
    - expect: { selector: "#status", contains: "Finished" }
---
So far every line of your program has run, every time. Now the program will **choose**: run some lines if something is true, and other lines if it is not.

## Predict

```step
stage: predict
code: decisions.py#halves
check:
  type: predict
  q: "What will the turtle draw?"
  options:
    - "A hexagon: three red sides, then three blue"
    - "A hexagon with every side red, then every side blue (twelve lines)"
    - "A hexagon with the sides taking turns, red then blue"
    - "A blue hexagon, because else runs last and covers the red"
  fault: logic
  misconception: else-always-runs
  actual: "Three red sides, then three blue. On each pass the program asks one question, i < 3, and runs only one of the two paths. i is 0, 1, 2 for the first three passes (red) and 3, 4, 5 for the last three (blue)."
```

`i` is the counter from the spiral. The new line is `if i < 3:`. Read the code. What will the turtle draw?

## Run

```step
stage: run
code: decisions.py#halves
try: { starter: "decisions.py#halves", height: 420 }
```

Run it and compare it with your prediction.

| Line | What it does | Why |
|---|---|---|
| `if i < 3:` | Asks: is `i` less than 3? | The answer is `True` or `False` |
| `    pencolor("red")` | Runs only when the answer is `True` | It is indented under the `if` |
| `else:` | Means "otherwise" | Its lines run only when the answer is `False` |
| `    pencolor("blue")` | Runs only when the answer is `False` | Only one of the two paths runs on each pass |

## Investigate

```step
stage: investigate
code: decisions.py#halves
insight: "A decision is a condition plus two paths. You can follow it by working out the condition for each value, and find a bug by checking the form of the condition."
tasks:
  - check:
      type: trace
      text: "Fill in the gaps for each pass: is i < 3, and which colour does the program pick?"
      table: |
        | i | i < 3 | colour |
        | 0 | True | red |
        | 2 | [True] | [red] |
        | 3 | [False] | [blue] |
        | 5 | [False] | [blue] |
      explain: "The condition is true for 0, 1 and 2, so the if path runs and the pen is red. From 3 on it is false, so the else path runs and the pen is blue."
  - check:
      type: bug
      code: decisions.py#bug
      text: "This should colour only the fourth side red, but the program will not even start. Click the wrong line."
      answer: 5
      fault: syntax
      misconception: assign-vs-compare
      explain: "A single = stores a value. To ask whether two things are equal, the condition needs two: i == 3."
  - check:
      type: question
      q: "A condition works out to a value, like a sum does. What does 5 < 3 work out to?"
      options: ["False", "True", "5", "3"]
      answer: 0
      feedback: [null, "5 is not less than 3, so the answer to the question is no.", "5 is one of the numbers in the question, not the answer to it.", "3 is one of the numbers in the question, not the answer to it."]
      explain: "5 < 3 is a question, and the answer is False. Every condition works out to True or False, and if runs its lines only when it is True."
```

### Trace the passes

Work out the condition and the colour for each pass.

### Spot the bug

Here is a version where something is wrong.

### True or false

`if` asks a question, and Python works out the answer before deciding.

## Modify

```step
stage: modify
insight: "Changing a condition changes which passes take which path, and nothing else in the program."
try: { starter: "decisions.py#modify", height: 420 }
hint:
  - "Which number sets where the red stops and the blue starts?"
  - "i is 0, 1, 2, 3 for four passes. Which test is true for exactly those?"
check: { type: code, text: "Make four sides red and two blue.", rules: { contains: ["i < 4"] } }
```

Change the condition so **four** sides are red and two are blue. Run it to check.

## Mix it up

```step
stage: investigate
code: decisions.py#make
insight: "A decision can use any name, not only the counter. Follow the value that the condition reads."
check:
  type: number
  q: "size starts at 10 and grows by 20 every pass. A line is red while size < 50, otherwise blue. How many of the first six lines are red?"
  answer: 2
  explain: "size is 10, 30, 50, 70, 90, 110. Only 10 and 30 are less than 50, so two lines are red."
```

This mixes two lessons: a value that grows, and a decision that reads it. Work it out on paper first.

## Make

```step
stage: make
try: { starter: "decisions.py#make", height: 420 }
hint:
  - "Put an if / else at the top of the loop, before the forward line."
  - "The condition reads size: if size < 60, the pen is red; else it is blue."
check: { type: code, text: "Colour the spiral with an if / else that reads size.", rules: { uses: [pencolor], loops: 1 } }
unlocks: [if-else]
```

The spiral grows by 10 every pass. Make it **red while the lines are short and blue once they are long**. Then try a different cut-off, or a third colour of your own once you have seen `elif` next lesson.
