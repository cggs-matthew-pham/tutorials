---
order: 5
unit: drawing
introduces: [variable-update]
title: A value that grows
summary: A variable can change itself, so a value grows each time round a loop.
language: python
hook: "Scores go up, timers count down and bank balances change. All of them are a variable that works out its next value from its last one."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 8 }
  caption: "A variable can change itself"
  say: "A variable can work out its next value from its last one."
  pacing: { keyDelayMs: 22 }
  clip:
    - type: { into: "Python code", text: "from turtle import *\n\nsize = 0\n\nfor i in range(30):\n    forward(size)\n    right(90)\n", append: true }
    - caption:
        text: "size = size + 5 works out size + 5, then stores it back in size."
        say: "Work out size plus five, then store the answer back in size."
    - type: { into: "Python code", text: "    size = size + 5\n", append: true }
    - click: "Run"
    - expect: { selector: "#status", contains: "Finished" }
    - caption:
        text: "size grows by 5 every pass, so the lines grow."
        say: "Size grows by five every pass, so the lines grow."
    - wait: 1200
    - expect: { selector: "#status", contains: "Finished" }
---
Last lesson the counter `i` made the lines grow. A variable can do the same job on its own.

## Predict

```step
stage: predict
code: grow.py#spiral
check:
  type: predict
  q: "Last lesson the spiral used the counter. This one uses size = size + 5. What will it draw?"
  options: ["The same spiral", "A bigger spiral", "A smaller spiral", "An error: size cannot equal size + 5"]
  fault: logic
  misconception: update-is-equation
  actual: "The same spiral. size starts at 0 and grows by 5 on every pass: 0, 5, 10, 15. That is exactly what i * 5 gave last lesson."
```

`size = size + 5` is new. Read the code. Will the spiral look different from last lesson's?

## Run

```step
stage: run
code: grow.py#spiral
try: { starter: "grow.py#spiral", height: 420 }
```

Run it and compare it with your prediction.

Here is what each line does.

| Line | What it does | Why |
|---|---|---|
| `size = 0` | Starts `size` at 0 | It is before the loop, so it only happens once |
| `forward(size)` | Draws a line `size` long | Uses whatever `size` holds right now |
| `size = size + 5` | Works out `size + 5`, then stores the answer back in `size` | Read the right side first, then store. It is inside the loop, so it happens every pass |

The picture is the same as last lesson's. There the counter `i` did the growing; here `size` does it.

## Investigate

```step
stage: investigate
code: grow.py#spiral
insight: "A variable can change itself: the right side is worked out first with the old value, and the answer is stored back."
tasks:
  - check:
      type: question
      q: "A program has size = 20. Then it runs the line size = size + 5. What is stored in size afterwards?"
      options: ["25", "5", "20 + 5", "Nothing: the line is an error"]
      answer: 0
      fault: logic
      misconception: update-is-equation
      explain: "Read the line from the right. Python works out size + 5, which is 25, then stores 25 back in size. The = means store, not 'is equal to'."
  - check:
      type: trace
      text: "Fill in the size that forward(size) uses on each pass."
      table: |
        | pass | size used by forward(size) |
        | 1 | 10 |
        | 2 | [20] |
        | 3 | [30] |
        | 4 | [40] |
      explain: "The last line of each pass stores size + 10 back in size, so the next pass starts with a bigger size. This is how a spiral grows."
  - check:
      type: bug
      code: grow.py#bug
      text: "This should draw a growing spiral, but it draws one small square over and over. Click the wrong line."
      answer: 8
      fault: logic
      misconception: update-outside-loop
      explain: "size = size + 5 is not indented, so it runs once, after the loop. Inside the loop it runs on every pass. Indent it under the for line."
  - check:
      type: question
      q: "Last lesson's lines were i * 5. This lesson's size starts at 0. Which update inside the loop gives the same lengths?"
      options: ["size = size + 5", "size = size * 5", "size = i", "size = 5"]
      answer: 0
      explain: "Adding 5 each pass gives 0, 5, 10, 15, the same as i * 5. size * 5 stays at 0, size = i gives 0, 1, 2, and size = 5 is always 5."
```

Follow the value as it changes.

### Store it back

A variable can change itself. The line `size = size + 5` works out `size + 5`, then stores the answer back in `size`.

### Watch it grow

Follow `size` round this loop, which adds to it every pass.

```python
size = 10

for i in range(4):
    forward(size)
    right(90)
    size = size + 10
```

### Spot the bug

An update has to be inside the loop to happen every pass.

### Same lengths, two ways

Compare this lesson's way with last lesson's counter.

## Modify

```step
stage: modify
insight: "Changing the amount added changes how fast the value grows, with one edit."
try: { starter: "grow.py#modify", height: 420 }
hint: "Only the number being added needs to change."
check: { type: reflect, text: "I changed the amount added so the spiral grew faster." }
```

Change the amount added each pass so the spiral grows faster. Run it after each change.

## Make

```step
stage: make
try: { starter: "grow.py#make", height: 420 }
hint:
  - "Give the thickness its own variable, like size, and set it before the loop."
  - "Use pensize(width) inside the loop, and add to width at the end of each pass."
check: { type: code, text: "Make the pen thicker every pass using a variable.", rules: { uses: [pensize], loops: 1 } }
unlocks: [grow-value]
```

Make the spiral grow **and** get thicker on every pass. The thickness should be a variable that updates itself, like `size` does.
