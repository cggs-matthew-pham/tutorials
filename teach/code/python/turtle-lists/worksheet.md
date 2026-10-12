---
title: "Lists"
subtitle: "Python Foundations with Turtle · Choices and collections · Lesson 4"
---

# Lists

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A playlist, a shopping cart, a class roll and a leaderboard are all lists: many values kept in order under one name.


:::teacher-note

**In one sentence:** Students keep many values in one list, loop over it to draw one square per colour, and learn that the places in a list are counted from 0.

**Students should be able to say:** I can store several values in a list and loop over them. I can find an item by its place, counting from 0. I can change a program's result by changing its list, not its loop.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`for c in colours` takes the colours **one at a time**. Each time round the loop, `c` holds the next one.

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

**How many squares will the program draw?**

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Five squares, one for each colour in the list, drawn in order from left to right.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

`colours[2]` is the item in place 2. `len(colours)` counts the items. Run it and read the output.

```python
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue"]

print(colours[0])
print(colours[2])
print(len(colours))

pencolor(colours[2])
pensize(5)
circle(60)
```

:::keep-together

### Find the place

**Fill in the item at each place in the list (counting from 0).**

{{rows 1}}

| place | item |
|---|---|
| 0 | red |
| 1 |   |
| 2 |   |
| 3 |   |
| 4 |   |

:::


:::teacher-note

**Answer:** orange, yellow, green, blue

Counting starts at 0, so the first item is colours[0] and the last of five is colours[4].

:::


:::keep-together

### Last place

**A list has 8 items. What is the place number of the last one?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 7

Places run from 0 to 7, so the last of eight is colours[7]. The length is always one more than the last place.

:::


:::keep-together

### Spot the bug

**This program should draw three circles, but it stops with an error. Click the line that causes it.**

```
 1  from turtle import *
 2  
 3  colours = ["red", "blue", "green"]
 4  
 5  for i in range(4):
 6      pencolor(colours[i])
 7      circle(20 + i * 10)
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 6

The loop runs four times, so on the last time it asks for colours[3]. The list has only places 0, 1 and 2.

:::


:::typical

## Modify


**Add two colours.** Put two more colours into the list and run it.

**Change the first colour.** Replace the first colour and notice what moves.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Add two colours:**

```python
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
size = 30

penup()
goto(-170, 0)
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

**Change the first colour:**

```python
from turtle import *

colours = ["pink", "orange", "yellow", "green", "blue", "indigo", "violet"]
size = 30

penup()
goto(-170, 0)
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
    pendown()
```

:::


:::wider

## Colour a bar chart by pass mark

A teacher's chart colours each score green or red by comparing it with a pass mark. This program holds the scores in a list and uses an `if` inside the loop. Change the scores to five of your own, then change `pass_mark` to 70 and see which bars change colour. Then add a third colour for scores above 85.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

scores = [55, 92, 70, 40, 81]
pass_mark = 70
width = 30

penup()
goto(-100, -100)
pendown()

for score in scores:
    if score > 85:
        fillcolor("gold")
    elif score >= pass_mark:
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

:::

:::


## Exit ticket

:::keep-together

**colours = ["red", "blue", "green", "gold"]. What is colours[1], and what is the place of "gold"?**

{{lines-3}}

:::


:::teacher-note

**Answer:** colours[1] is "blue" (counting starts at 0). "gold" is in place 3.

:::

