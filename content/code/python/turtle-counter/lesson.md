---
order: 4
unit: drawing
introduces: [loop-index]
title: Use the counter
summary: The loop counter i changes every pass, so a line can grow without you typing each number.
language: python
hook: "Progress bars, animation frames and game levels all count. The loop counter is how code counts."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 8 }
  caption: "The counter i changes every pass"
  say: "The counter i is a different number on every pass."
  pacing: { keyDelayMs: 22 }
  clip:
    - type: { into: "Python code", text: "from turtle import *\n\nfor i in range(30):\n", append: true }
    - caption:
        text: "i is 0 on the first pass, 1 on the second, and so on."
        say: "i is zero on the first pass, one on the second."
    - type: { into: "Python code", text: "    forward(i * 5)\n    right(90)\n", append: true }
    - click: "Run"
    - caption:
        text: "Each line is longer than the last, so it spirals out."
        say: "Each line is longer than the last, so it spirals out."
    - wait: 1200
    - expect: { selector: "#status", contains: "Finished" }
---
You have met `i` in every loop so far, but never used it. It is a counter, and it changes on every pass.

## Predict

```step
stage: predict
code: counter.py#spiral
check:
  type: predict
  q: "What will the turtle draw?"
  options: ["a square", "a spiral that grows outward", "a circle", "nothing: i is never stored"]
  fault: logic
  misconception: counter-constant
  actual: "A spiral. i is 0 on the first pass, 1 on the second, 2 on the third, so i * 5 is 0, 5, 10, and every line is longer than the last."
```

`forward(i * 5)` uses the counter to work out how far to go. Read the code. What will the turtle draw?

## Run

```step
stage: run
code: counter.py#spiral
try: { starter: "counter.py#spiral", height: 420 }
```

Run it and compare it with your prediction.

Here is what each line does.

| Line | What it does | Why |
|---|---|---|
| `for i in range(30):` | Runs 30 times and makes a counter called `i` | `i` is 0 on the first pass, 1 on the second, up to 29 |
| `    forward(i * 5)` | Draws a line `i * 5` long | The lines are 0, 5, 10, 15 and so on, so they grow |
| `    right(90)` | Turns a quarter turn | The same turn every pass |

The first line is 0 steps long, because `i` is 0 on the first pass. Counting starts at 0, not 1.

## Investigate

```step
stage: investigate
code: counter.py#spiral
insight: "The counter takes a new value on every pass, so any line that uses it does something different each time round."
tasks:
  - check:
      type: trace
      text: "Fill in the counter and the length of the line on each pass."
      table: |
        | pass | i | line length (i * 5) |
        | 1 | 0 | 0 |
        | 2 | [1] | [5] |
        | 3 | [2] | [10] |
        | 4 | [3] | [15] |
      explain: "i starts at 0 and goes up by 1 each pass, so i * 5 goes 0, 5, 10, 15. The first line is 0 long, so you never see it."
  - check:
      type: number
      q: "A program has sides = 8 and turns right(360 / sides) on every pass of its loop. How many degrees is each turn?"
      answer: 45
      explain: "360 / 8 = 45. The name sides holds 8 each time the line runs."
```

Follow the counter round the loop, then use what you know about names.

### Follow the counter

Work out `i` and the length of the line on each pass.

### Work out the turn

A name holds a value you can calculate with.

## Modify

```step
stage: modify
insight: "Because the line length is worked out from i, changing one number changes every line of the spiral."
try: { starter: "counter.py#modify", height: 420 }
tasks:
  - hint: "Only one number needs to change. Which number is multiplied by i?"
    check: { type: reflect, text: "I changed one number so the spiral grows faster." }
  - hint:
      - "pensize( ) sets how thick the line is. The pen needs a number that changes each pass."
      - "The counter changes each pass, so use it. pensize(i + 1) starts at 1."
    check: { type: code, text: "Use the counter to change the pen size.", rules: { uses: [pensize] } }
    unlocks: [counter-step]
```

### Grow faster

Change one number so the spiral grows faster.

### Thicker and thicker

Use the counter to make the line thicker on every pass.
