---
order: 8
unit: choices
moveId: remainder-pattern
reviews: [name-a-value]
introduces: [remainder, elif]
assumes: [if, else, compare, loop-index]
title: Every other
summary: Use the remainder, %, to pick every second or third pass, and add a third choice with elif.
language: python
hook: "Zebra crossings, chessboards, stripes and blinking lights all repeat a pattern: every second one is different."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 8 }
  caption: "The remainder picks every second pass"
  say: "The remainder picks out every second pass."
  pacing: { keyDelayMs: 22 }
  clip:
    - type: { into: "Python code", text: "from turtle import *\n\npensize(6)\nfor i in range(8):\n", append: true }
    - caption:
        text: "i % 2 is the remainder when i is divided by 2."
        say: "Percent gives the remainder left after dividing."
    - type: { into: "Python code", text: "    if i % 2 == 0:\n        pencolor(\"red\")\n", append: true }
    - caption:
        text: "It is 0 for 0, 2, 4, 6 and 1 for the others."
        say: "It is zero for even numbers and one for odd numbers."
    - type: { into: "Python code", text: "    else:\n        pencolor(\"blue\")\n    forward(30)\n    right(45)\n", append: true }
    - click: "Run"
    - expect: { selector: "#status", contains: "Finished" }
    - caption:
        text: "Red and blue sides take turns."
        say: "Red and blue sides take turns."
    - wait: 1200
    - expect: { selector: "#status", contains: "Finished" }
---
Last lesson the program chose by comparing the counter with a number. A pattern that repeats needs a different question: is this pass an even one?

## Predict

```step
stage: predict
code: every_other.py#pattern
check:
  type: predict
  q: "What colour are the sides, in order?"
  options:
    - "Red, blue, red, blue, and so on, taking turns"
    - "Four red sides, then four blue sides"
    - "Every side red"
    - "Only the first side red, the rest blue"
  fault: logic
  misconception: remainder-is-divide
  actual: "Red and blue take turns. i % 2 is the remainder after dividing i by 2: 0 for 0, 2, 4 and 6, and 1 for 1, 3, 5 and 7. The condition is true on every second pass."
```

The new sign is `%`. It does not mean percent: `i % 2` is the **remainder** when `i` is divided by 2. Read the code. What colour are the sides, in order?

## Run

```step
stage: run
code: every_other.py#pattern
try: { starter: "every_other.py#pattern", height: 420 }
```

Run it and compare it with your prediction.

| Line | What it does | Why |
|---|---|---|
| `if i % 2 == 0:` | Is the remainder 0 when i is divided by 2? | True for 0, 2, 4, 6: every second pass |
| `    pencolor("red")` | Runs on those passes | The even ones |
| `else:` | Means "otherwise" | The odd passes: 1, 3, 5, 7 |

## Investigate

```step
stage: investigate
code: every_other.py#pattern
insight: "The remainder repeats: 0, 1, 0, 1 for 2 and 0, 1, 2, 0, 1, 2 for 3. That repeat is what makes a pattern."
tasks:
  - check:
      type: trace
      text: "Fill in the gaps: the remainder when i is divided by 3."
      table: |
        | i | i % 3 |
        | 0 | 0 |
        | 1 | [1] |
        | 2 | [2] |
        | 3 | [0] |
        | 4 | [1] |
        | 5 | [2] |
      explain: "Dividing by 3 leaves a remainder of 0, 1 or 2, then it starts again. i % 3 == 0 is true for 0, 3, 6, 9: every third pass."
  - check:
      type: question
      q: "What does 7 % 2 work out to?"
      options: ["1", "3", "3.5", "0"]
      answer: 0
      fault: logic
      misconception: remainder-is-divide
      feedback: [null, "3 is how many times 2 fits into 7. The remainder is what is left over.", "7 divided by 2 is 3.5, but % gives the remainder, not the division.", "0 would mean 2 fits exactly. 2 fits 3 times (6) with 1 left over."]
      explain: "2 fits into 7 three times (6), and 1 is left over. So 7 % 2 is 1."
  - check:
      type: number
      q: "The loop runs for i = 0 to 9 (ten passes). How many are red with if i % 2 == 0?"
      answer: 5
      explain: "The red passes are i = 0, 2, 4, 6 and 8, so there are five."
```

### Follow the remainder

Work out the remainder for each pass.

### What does % give?

Predict the answer to one remainder.

### Count the red sides

Use the pattern to answer without drawing.

## Modify

```step
stage: modify
insight: "A second question (elif) is asked only when the first answer was no, so it adds a choice without rewriting the rest."
try: { starter: "every_other.py#modify", height: 420 }
hint:
  - "Put the new check first, before the others. Python stops at the first true answer."
  - "i % 3 == 0 is true for 0, 3 and 6. Use elif for the red check."
check: { type: code, text: "Make every third side green, using elif.", rules: { uses: [elif], contains: ["i % 3"] } }
unlocks: [every-other]
```

Make every **third** side green and keep the red and blue taking turns on the rest. Use `elif`.

## Mix it up

```step
stage: investigate
code: every_other.py#third
insight: "When an if and an elif could both be true, only the first one runs."
tasks:
  - check:
      type: question
      q: "On pass i = 6, both i % 3 == 0 and i % 2 == 0 are true. Which colour is the side?"
      options: ["Green: the first true check wins", "Red: the last true check wins", "Both: the side is drawn twice", "Blue: the else covers them"]
      answer: 0
      fault: logic
      misconception: elif-both-run
      explain: "Python asks the checks in order and stops at the first true one. 6 % 3 == 0 is asked first, so the side is green and the elif is never asked."
  - check:
      type: number
      q: "size = 30 and the line is forward(size + (i % 2) * 20). How long is the line on pass i = 3?"
      answer: 50
      explain: "3 % 2 is 1, so the line is 30 + 1 * 20 = 50. On even passes the remainder is 0, so the line is 30."
```

### Which check wins?

Think about the order Python asks the questions.

### Work out the length

Combine a name, the counter and the remainder.
