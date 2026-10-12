---
order: 9
unit: choices
moveId: list-position
reviews: [loop-counter, name-a-value]
introduces: [list, list-index, length]
assumes: [variable, loop-index]
title: Lists
summary: Keep many values under one name, pick one by its place, and count them with len.
language: python
hook: "A playlist, a shopping cart, a class roll and a leaderboard are all lists: many values kept in order under one name."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 6 }
  caption: "A list keeps many values in order, under one name"
  say: "A list keeps many values in order, under one name."
  pacing: { keyDelayMs: 22 }
  clip:
    - type: { into: "Python code", text: "from turtle import *\n\npensize(8)\n", append: true }
    - caption:
        text: "colours = [\"red\", \"blue\", \"green\"] is a list of 3 items."
        say: "Here is a list of three colours, called colours."
    - type: { into: "Python code", text: "colours = [\"red\", \"blue\", \"green\"]\n\n", append: true }
    - caption:
        text: "colours[0] is the first item. Places count from 0."
        say: "Each item has a place, counted from zero. Place zero is red."
    - type: { into: "Python code", text: "for i in range(len(colours)):\n    pencolor(colours[i])\n    forward(100)\n    left(120)\n", append: true }
    - caption:
        text: "len(colours) counts the items: 3."
        say: "The len of colours counts the items, so the loop runs three times."
    - click: "Run"
    - expect: { selector: "#status", contains: "Finished" }
    - wait: 1200
    - expect: { selector: "#status", contains: "Finished" }
---
Names hold one value. A **list** holds many, in order, under a single name. You pick one by its place.

## Predict

```step
stage: predict
code: lists.py#picks
check:
  type: predict
  q: "What colour is the third side?"
  options: ["red", "orange", "yellow", "green"]
  fault: logic
  misconception: index-starts-one
  actual: "Yellow. The third pass has i = 2, and colours[2] is the item in place 2. Places count from 0, so place 0 is red, place 1 is orange and place 2 is yellow."
```

`colours[i]` is the item in place `i`. The counter `i` goes 0, 1, 2 and so on. Read the code. What colour is the third side?

## Run

```step
stage: run
code: lists.py#picks
try: { starter: "lists.py#picks", height: 440 }
```

Run it and compare it with your prediction.

| Line | What it does | Why |
|---|---|---|
| `colours = ["red", ...]` | Keeps five colours under one name | Each one is in quotes, with commas between |
| `colours[0]` | The item in place 0: `"red"` | The first place is 0, not 1 |
| `len(colours)` | How many items: 5 | The loop runs once for each |
| `pencolor(colours[i])` | Picks the colour for this pass | `i` is the place |

## Investigate

```step
stage: investigate
code: lists.py#picks
insight: "A list is numbered from 0, so the last place is one less than the length, and asking for a place that does not exist stops the program."
tasks:
  - check:
      type: trace
      text: "Fill in the item at each place in the list (counting from 0)."
      table: |
        | place | item |
        | 0 | red |
        | 1 | [orange] |
        | 2 | [yellow] |
        | 3 | [green] |
        | 4 | [blue] |
      explain: "Counting starts at 0, so the first item is colours[0] and the last of five is colours[4]."
  - check:
      type: number
      q: "A list has 8 items. What is the place number of the last one?"
      answer: 7
      fault: logic
      misconception: len-is-last-index
      explain: "Places run from 0 to 7, so the last of eight is colours[7]. The length is always one more than the last place."
  - check:
      type: bug
      code: lists.py#bug
      text: "This program should draw three circles, but it stops with an error. Click the line that causes it."
      answer: 6
      fault: runtime
      misconception: list-index-range
      explain: "The loop runs four times, so on the last time it asks for colours[3]. The list has only places 0, 1 and 2. range(len(colours)) would always match the list."
```

### Find the place

Work out which item sits in each place.

### Last place

Use the length to find the last item.

### Spot the bug

Here is a version where something is wrong.

## Modify

```step
stage: modify
insight: "Changing a list changes the whole result with no change to the loop, which is why the data and the instructions are kept apart."
try: { starter: "lists.py#modify", height: 440 }
tasks:
  - hint: "Each colour is a word in quotes, separated from the next by a comma."
    check: { type: reflect, text: "I added colours to the list and the program drew more sides." }
  - hint:
      - "Replace the first word in the list. Nothing else changes."
      - "The first item is colours[0]. The loop still uses it first."
    check: { type: code, text: "Change the first colour in the list.", rules: { contains: ["colours", "pink"] } }
```

### Add two colours

Put two more colours into the list and run it. Does the loop need to change?

### Change the first colour

Replace the first colour (place 0) with "pink".

## Mix it up

```step
stage: investigate
code: lists.py#review
insight: "Names, the counter and a list work together: the list holds the values, the counter picks one, and len keeps the loop in step."
check:
  type: number
  q: "sizes = [20, 40, 60] and the turn is 360 / len(sizes). How many degrees does the turtle turn on each pass?"
  answer: 120
  explain: "len(sizes) is 3, and 360 / 3 is 120. The turn is worked out from the list, so a longer list gives a smaller turn."
unlocks: [list]
```

This mixes three lessons: a name, the counter, and a list. Work it out on paper first.
