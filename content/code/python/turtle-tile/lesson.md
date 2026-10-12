---
order: 11
unit: choices
moveId: course-a-challenge
reviews: [loop-block, name-a-value, value-update, loop-counter, if-else, list-position, for-each]
assumes: [repeat, variable, arithmetic, loop-index, if, else, compare, remainder, list, list-index, length]
title: "Challenge: a tile"
summary: Read a tile pattern, change one thing and predict the result, then make a tile of your own.
language: python
hook: "Floors, fabrics, wrapping paper and websites are made from a tile repeated. Today you make the tile."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
---
This is the end of Course A. The program below uses everything you have learned: loops, names, the counter, a list and the remainder. Read it first, then make it your own.

## Predict

```step
stage: predict
code: tile.py#tile
check:
  type: predict
  q: "How many squares will the program draw?"
  kind: number
  actual: "12. The outer loop makes 3 rows and the inner loop makes 4 squares in each row, so 3 × 4 = 12."
```

There is a loop inside a loop. Read the code. How many squares will it draw?

## Run

```step
stage: run
code: tile.py#tile
try: { starter: "tile.py#tile", height: 440 }
```

Run it and compare it with your prediction. Which line makes the colours repeat in a pattern?

| Line | What it does | Why |
|---|---|---|
| `for row in range(3):` | Makes 3 rows | The outer loop |
| `for col in range(4):` | Makes 4 squares in each row | The inner loop runs fully for every row |
| `pick = (row + col) % len(colours)` | Works out which colour to use | The remainder goes 0, 1, 2, 0, 1, 2 ... however long the list is |
| `fillcolor(colours[pick])` | Uses that colour | A list item picked by its place |

## Investigate

```step
stage: investigate
code: tile.py#tile
insight: "A pattern comes from a few simple parts working together. You can predict a change by following the parts it touches."
tasks:
  - check:
      type: number
      q: "In row 0, column 1, what is pick?"
      answer: 1
      explain: "row + col is 0 + 1 = 1, and 1 % 3 is 1. colours[1] is navy."
  - check:
      type: number
      q: "colours has 4 colours instead of 3. What is pick in row 2, column 3?"
      answer: 1
      explain: "row + col is 5, and 5 % 4 is 1. A longer list changes the remainder, so the pattern repeats more slowly."
```

### Follow one square

Work out which colour one square gets.

### Change the list

Predict what a longer list does to the pattern.

## Modify

```step
stage: modify
insight: "Predict first, then run: the gap between them shows what you do not yet understand."
try: { starter: "tile.py#modify", height: 440 }
hint:
  - "Add a colour to the list, make the grid 4 rows by 5 columns, and move the start further left and down."
  - "backward(size * 5) must match the number of columns, so the next row starts at the left again."
check: { type: code, text: "Change the tile: a bigger grid and a fourth colour.", rules: { contains: ["range(4)", "range(5)"], uses: [colours] } }
```

Change **one** thing at a time, predicting each result before you run it. Then try a bigger grid with a fourth colour.

## Make

```step
stage: make
try: { starter: "tile.py#make", height: 440 }
hint:
  - "Start from the program above. Change the pattern rule: a decision instead of pick, or a different remainder."
  - "A checkerboard: if (row + col) % 2 == 0 picks one colour, else picks another."
check: { type: code, text: "Make your own tile with a name for the size, a list of colours, a loop in a loop and a decision.", rules: { loops: 2, uses: [if, colours, size] } }
```

Make a tile of your own. Plan it on paper first, then build it:

- a name for the size
- a list of colours
- a loop inside a loop
- a decision (`if` / `else`) that picks something

When it works, change one thing and predict what will happen before you run it.

You have finished Course A. Course B starts from a working program and builds something bigger.
