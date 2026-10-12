---
order: 10
unit: choices
moveId: for-each
reviews: [if-else, remainder-pattern, list-position]
introduces: [for-of]
assumes: [list, list-index, length, repeat, if, else, compare]
title: For each item
summary: Visit every item in a list in turn, without counting places.
language: python
hook: "A playlist plays each song, a printer prints each page and a game moves each enemy. They all work through a list, one item at a time."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 6 }
  caption: "for c in colours: takes the items one at a time"
  say: "A for loop can take a list's items one at a time."
  pacing: { keyDelayMs: 22 }
  clip:
    - type: { into: "Python code", text: "from turtle import *\n\npensize(5)\ncolours = [\"red\", \"blue\", \"green\"]\n\n", append: true }
    - caption:
        text: "for c in colours: runs once for each item."
        say: "This loop runs once for each item in the list."
    - type: { into: "Python code", text: "for c in colours:\n", append: true }
    - caption:
        text: "c is the item itself, not its place."
        say: "Each time, c holds the next item, such as red."
    - type: { into: "Python code", text: "    pencolor(c)\n    forward(100)\n    left(120)\n", append: true }
    - click: "Run"
    - expect: { selector: "#status", contains: "Finished" }
    - wait: 1200
    - expect: { selector: "#status", contains: "Finished" }
---
Last lesson you picked items by their place. Often you don't care about the place: you want to do something with **each** item.

## Predict

```step
stage: predict
code: for_each.py#each
check:
  type: predict
  q: "On the first time round the loop, what does c hold?"
  options: ["0, the place of the first colour", "\"red\", the first colour itself", "the whole list", "nothing yet"]
  fault: logic
  misconception: for-each-is-index
  actual: "\"red\", the first colour itself. In for c in colours, c is each item in turn: first \"red\", then \"orange\", and so on. It is not a place number."
```

The new line is `for c in colours:`. Read the code. What does `c` hold the first time round?

## Run

```step
stage: run
code: for_each.py#each
try: { starter: "for_each.py#each", height: 440 }
```

Run it and compare it with your prediction.

| Line | What it does | Why |
|---|---|---|
| `for c in colours:` | Runs the indented lines once for each item | No `range`, no counting |
| `c` | Holds the current item: `"red"`, then `"orange"` ... | It is the item itself, not its place |
| `fillcolor(c)` | Uses the colour for this square | Five items, five squares |

## Investigate

```step
stage: investigate
code: for_each.py#each
insight: "In a for-each loop the name holds the item itself. Use it directly; asking the list for it again is a mistake."
tasks:
  - check:
      type: trace
      text: "Fill in what c holds on each pass."
      table: |
        | pass | c |
        | 1 | red |
        | 2 | [orange] |
        | 3 | [yellow] |
        | 4 | [green] |
        | 5 | [blue] |
      explain: "c holds each item in turn, in the order they are in the list."
  - check:
      type: bug
      code: for_each.py#bug
      text: "This program should draw three circles, but it stops with an error. Click the line that causes it."
      answer: 6
      fault: runtime
      misconception: for-each-is-index
      explain: "c is already a colour, such as \"red\". colours[c] asks for the item in place \"red\", which makes no sense. Use pencolor(c)."
```

### What does c hold?

Follow the name from pass to pass.

### Spot the bug

Here is a version where something is wrong.

## Modify

```step
stage: modify
insight: "A longer list gives a longer result with no change to the loop, and you never count the items."
try: { starter: "for_each.py#modify", height: 440 }
hint:
  - "Each colour is a word in quotes, separated from the next by a comma."
  - "Seven squares are wider than five. Move the start further left, with goto."
check: { type: reflect, text: "I added colours and the loop drew a square for each one." }
```

Add two more colours to the list. Move the start so they all fit on the screen.

## Mix it up

```step
stage: investigate
code: for_each.py#scores
insight: "Each item can be tested as it is visited: an if inside a for-each decides what to do with each one."
check:
  type: number
  q: "scores = [45, 72, 90, 38, 66] and pass_mark = 50. How many bars are green?"
  answer: 3
  explain: "72, 90 and 66 are at least 50, so three bars are green. 45 and 38 are red."
```

This program visits each score and decides its colour. Work out the answer before you run it.

## Make

```step
stage: make
try: { starter: "for_each.py#make", height: 440 }
hint:
  - "One bar for each number in the list: for h in heights does that, and each time round h is the next height."
  - "A bar is a rectangle: forward(20), left(90), forward(h), left(90), forward(20), left(90), forward(h), left(90). Then move on before the next bar."
check: { type: code, text: "Draw a bar for each number using a for-each loop.", rules: { loops: 1, contains: ["for h in heights"] } }
unlocks: [for-each-item]
```

Draw a **bar chart**: one bar for each number in `heights`, the height of the bar equal to the number.
