---
order: 4
unit: choices
title: Lists
summary: Store many values under one name, then work through them one by one.
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
    - type: { into: "Python code", text: "from turtle import *\n\npensize(5)\n", append: true }
    - caption:
        text: "colours = [\"red\", \"blue\", \"green\"] is a list of 3 items."
        say: "Here is a list of three colours, called colours."
    - type: { into: "Python code", text: "colours = [\"red\", \"blue\", \"green\"]\n\n", append: true }
    - caption:
        text: "for c in colours: takes the items one at a time."
        say: "The loop takes the items one at a time. Each time, c holds the next."
    - type: { into: "Python code", text: "for c in colours:\n    pencolor(c)\n    forward(100)\n    left(120)\n", append: true }
    - click: "Run"
    - expect: { selector: "#status", contains: "Finished" }
    - caption:
        text: "Places count from 0: colours[0] is \"red\", colours[2] is \"green\"."
        say: "Each item has a place, counted from zero. Place zero is red."
    - wait: 1200
    - expect: { selector: "#status", contains: "Finished" }
---
Variables hold one value. A **list** holds many, in order, under a single name.

## Predict

```step
stage: predict
code: lists.py#colours
check:
  type: predict
  q: "How many squares will the program draw?"
  kind: number
  actual: "Five squares, one for each colour in the list, drawn in order from left to right."
```

`for c in colours` takes the colours **one at a time**. Each time round the loop, `c` holds the next one.

## Run

```step
stage: run
code: lists.py#colours
try: { starter: "lists.py#colours", height: 440 }
check: { type: reflect, text: "I can explain how the loop uses each colour in the list in turn." }
unlocks: [list]
```

Run it and compare it with your prediction.

## Investigate

```step
stage: investigate
code: lists.py#index
insight: "A list is numbered from 0, so you can pick one item by its place, count them, and spot a bug when the place does not exist."
unlocks: [for-each-item]
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
      explain: "Places run from 0 to 7, so the last of eight is colours[7]. The length is always one more than the last place."
  - check:
      type: bug
      code: lists.py#bug
      text: "This program should draw three circles, but it stops with an error. Click the line that causes it."
      answer: 6
      fault: runtime
      misconception: list-index-range
      explain: "The loop runs four times, so on the last time it asks for colours[3]. The list has only places 0, 1 and 2."
```

`colours[2]` is the item in place 2. `len(colours)` counts the items. Run it and read the output.

### Find the place

Work out which item sits in each place.

### Last place

Use the length to find the last item.

### Spot the bug

Here is a version where something is wrong.

## Modify

```step
stage: modify
insight: "Adding to a list changes the whole result with no change to the loop, which is why data and code are kept apart."
try: { starter: "lists.py#modify", height: 440 }
tasks:
  - hint: "Each colour is a word in quotes, separated from the next by a comma."
    check: { type: reflect, text: "I added colours to the list and the program drew more squares." }
  - hint:
      - "Write the list on one line in square brackets, then use it in the loop."
      - "You do not need to change the loop for a longer list."
    check: { type: code, text: "Use a list in a for loop.", rules: { loops: 1, uses: [colours] } }
```

### Add two colours

Put two more colours into the list and run it.

### Change the first colour

Replace the first colour and notice what moves.

## Make

```step
stage: make
try: { starter: "lists.py#make", height: 440 }
hint:
  - "Use `for h in heights:` and draw one bar each time round."
  - "A bar is a rectangle: forward(20), left(90), forward(h), left(90), forward(20), left(90), forward(h), left(90). Then move on before the next bar."
```

Draw a **bar chart**: one bar for each number in `heights`, the height of the bar equal to the number.

## Colour a bar chart by pass mark

```step
stage: modify
try: { starter: "lists.py#scores", height: 440 }
```

A teacher's chart colours each score green or red by comparing it with a pass mark. This program holds the scores in a list and uses an `if` inside the loop. Change the scores to five of your own, then change `pass_mark` to 70 and see which bars change colour. Then add a third colour for scores above 85.
