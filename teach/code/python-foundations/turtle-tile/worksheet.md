---
title: "Challenge: a tile"
subtitle: "Python Foundations with Turtle · Choices and lists · Lesson 11"
---

# Challenge: a tile

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Floors, fabrics, wrapping paper and websites are made from a tile repeated. Today you make the tile.


:::teacher-note

**In one sentence:** Students read a tile pattern that combines loops, names, a list and the remainder, change it, and make a tile of their own.

**Students should be able to say:** I can read a pattern program and predict what it draws. I can change one part and say what will happen before I run it. I can make a tile using a loop in a loop, a list, a name and a decision.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

There is a loop inside a loop. Read the code. How many squares will it draw?

```python
from turtle import *

colours = ["gold", "navy", "teal"]
size = 40
speed(0)

penup()
goto(-80, -60)
for row in range(3):
    for col in range(4):
        pick = (row + col) % len(colours)
        fillcolor(colours[pick])
        begin_fill()
        for side in range(4):
            forward(size)
            right(90)
        end_fill()
        forward(size)
    backward(size * 4)
    left(90)
    forward(size)
    right(90)
```

:::keep-together

**How many squares will the program draw?**

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 12. The outer loop makes 3 rows and the inner loop makes 4 squares in each row, so 3 × 4 = 12.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
from turtle import *

colours = ["gold", "navy", "teal"]
size = 40
speed(0)

penup()
goto(-80, -60)
for row in range(3):
    for col in range(4):
        pick = (row + col) % len(colours)
        fillcolor(colours[pick])
        begin_fill()
        for side in range(4):
            forward(size)
            right(90)
        end_fill()
        forward(size)
    backward(size * 4)
    left(90)
    forward(size)
    right(90)
```

:::keep-together

### Follow one square

**In row 0, column 1, what is pick?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 1

row + col is 0 + 1 = 1, and 1 % 3 is 1. colours[1] is navy.

:::


:::keep-together

### Change the list

**colours has 4 colours instead of 3. What is pick in row 2, column 3?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 1

row + col is 5, and 5 % 4 is 1. A longer list changes the remainder, so the pattern repeats more slowly.

:::


:::typical

## Modify

Change **one** thing at a time, predicting each result before you run it. Then try a bigger grid with a fourth colour.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

colours = ["gold", "navy", "teal", "tomato"]
size = 40
speed(0)

penup()
goto(-100, -80)
for row in range(4):
    for col in range(5):
        pick = (row + col) % len(colours)
        fillcolor(colours[pick])
        begin_fill()
        for side in range(4):
            forward(size)
            right(90)
        end_fill()
        forward(size)
    backward(size * 5)
    left(90)
    forward(size)
    right(90)
```

:::

:::


## Make

Make a tile of your own. Plan it on paper first, then build it:

- a name for the size
- a list of colours
- a loop inside a loop
- a decision (`if` / `else`) that picks something

When it works, change one thing and predict what will happen before you run it.

You have finished Course A. Course B starts from a working program and builds something bigger.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

colours = ["pink", "purple", "teal"]
size = 30
speed(0)

penup()
goto(-90, -60)
for row in range(4):
    for col in range(6):
        if (row + col) % 2 == 0:
            fillcolor(colours[col % len(colours)])
        else:
            fillcolor("white")
        begin_fill()
        for side in range(4):
            forward(size)
            right(90)
        end_fill()
        forward(size)
    backward(size * 6)
    left(90)
    forward(size)
    right(90)
```

:::


## Exit ticket

:::keep-together

**A grid has 5 rows and 6 columns. How many squares is that, and which line would you change to get 8 columns?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 30 squares. Change the number in the inner loop, range(6), and the backward(size * 6) line to match.

:::

