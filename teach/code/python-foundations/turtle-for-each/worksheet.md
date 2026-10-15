---
title: "For each item"
subtitle: "Python Foundations with Turtle · Choices and lists · Lesson 10"
---

# For each item

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A playlist plays each song, a printer prints each page and a game moves each enemy. They all work through a list, one item at a time.


:::teacher-note

**In one sentence:** Students visit every item of a list with a for-each loop, and see that the loop name holds the item itself.

**Students should be able to say:** I can use a for loop to visit each item in a list. I can say what the loop name holds on each pass. I can draw one thing for each item in a list.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The new line is `for c in colours:`. Read the code. What does `c` hold the first time round?

```python
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue"]
size = 40

penup()
goto(-130, 0)
pendown()

for c in colours:
    fillcolor(c)
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    penup()
    forward(size + 10)
    pendown()
```

:::keep-together

**On the first time round the loop, what does c hold?**

☐ "red", the first colour itself

☐ the whole list

☐ nothing yet

☐ 0, the place of the first colour

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** "red", the first colour itself. In for c in colours, c is each item in turn: first "red", then "orange", and so on. It is not a place number.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue"]
size = 40

penup()
goto(-130, 0)
pendown()

for c in colours:
    fillcolor(c)
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    penup()
    forward(size + 10)
    pendown()
```

:::keep-together

### What does c hold?

**Fill in what c holds on each pass.**

{{rows 1}}

| pass | c |
|---|---|
| 1 | red |
| 2 |   |
| 3 |   |
| 4 |   |
| 5 |   |

:::


:::teacher-note

**Answer:** orange, yellow, green, blue

c holds each item in turn, in the order they are in the list.

:::


:::keep-together

### Spot the bug

**This program should draw three circles, but it stops with an error. Click the line that causes it.**

```
 1  from turtle import *
 2  
 3  colours = ["red", "blue", "green"]
 4  
 5  for c in colours:
 6      pencolor(colours[c])
 7      circle(30)
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 6

c is already a colour, such as "red". colours[c] asks for the item in place "red", which makes no sense. Use pencolor(c).

:::


:::typical

## Modify

Add two more colours to the list. Move the start so they all fit on the screen.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
size = 40

penup()
goto(-190, 0)
pendown()

for c in colours:
    fillcolor(c)
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    penup()
    forward(size + 10)
    pendown()
```

:::

:::


## Mix it up

This program visits each score and decides its colour. Work out the answer before you run it.

```python
from turtle import *

scores = [45, 72, 90, 38, 66]
pass_mark = 50
width = 30

penup()
goto(-100, -100)
pendown()

for score in scores:
    if score >= pass_mark:
        fillcolor("green")
    else:
        fillcolor("red")
    begin_fill()
    forward(width)
    left(90)
    forward(score)
    left(90)
    forward(width)
    left(90)
    forward(score)
    left(90)
    end_fill()
    penup()
    forward(width + 10)
    pendown()
```

:::keep-together

**scores = [45, 72, 90, 38, 66] and pass_mark = 50. How many bars are green?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 3

72, 90 and 66 are at least 50, so three bars are green. 45 and 38 are red.

:::


## Make

Draw a **bar chart**: one bar for each number in `heights`, the height of the bar equal to the number.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

heights = [30, 80, 50, 100, 60]

penup()
goto(-100, -100)
pendown()

for h in heights:
    pendown()
    forward(20)
    left(90)
    forward(h)
    left(90)
    forward(20)
    left(90)
    forward(h)
    left(90)
    penup()
    forward(30)
```

:::


## Exit ticket

:::keep-together

**sizes = [10, 20, 30]. for s in sizes: forward(s). How far does the turtle go on the second pass?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 20. On the second pass s holds the second item, 20.

:::

