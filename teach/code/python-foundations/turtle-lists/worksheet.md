---
title: "Lists"
subtitle: "Python Foundations with Turtle · Choices and lists · Lesson 9"
---

# Lists

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A playlist, a shopping cart, a class roll and a leaderboard are all lists: many values kept in order under one name.


:::teacher-note

**In one sentence:** Students keep many values in one list, pick one by its place, and count them with len, learning that places start at 0.

**Students should be able to say:** I can store several values in a list. I can find an item by its place, counting from 0. I can use len to count the items in a list.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`colours[i]` is the item in place `i`. The counter `i` goes 0, 1, 2 and so on. Read the code. What colour is the third side?

```python
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue"]

pensize(8)
for i in range(len(colours)):
    pencolor(colours[i])
    forward(50)
    right(72)
```

:::keep-together

**What colour is the third side?**

☐ orange

☐ yellow

☐ red

☐ green

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Yellow. The third pass has i = 2, and colours[2] is the item in place 2. Places count from 0, so place 0 is red, place 1 is orange and place 2 is yellow.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue"]

pensize(8)
for i in range(len(colours)):
    pencolor(colours[i])
    forward(50)
    right(72)
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

The loop runs four times, so on the last time it asks for colours[3]. The list has only places 0, 1 and 2. range(len(colours)) would always match the list.

:::


:::typical

## Modify


**Add two colours.** Put two more colours into the list and run it. Does the loop need to change?

**Change the first colour.** Replace the first colour (place 0) with "pink".

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Add two colours:**

```python
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]

pensize(8)
for i in range(len(colours)):
    pencolor(colours[i])
    forward(50)
    right(360 / len(colours))
```

**Change the first colour:**

```python
from turtle import *

colours = ["pink", "orange", "yellow", "green", "blue"]

pensize(8)
for i in range(len(colours)):
    pencolor(colours[i])
    forward(50)
    right(72)
```

:::

:::


## Mix it up

This mixes three lessons: a name, the counter, and a list. Work it out on paper first.

```python
from turtle import *

sizes = [20, 40, 60]

for i in range(len(sizes)):
    forward(sizes[i])
    right(360 / len(sizes))
```

:::keep-together

**sizes = [20, 40, 60] and the turn is 360 / len(sizes). How many degrees does the turtle turn on each pass?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 120

len(sizes) is 3, and 360 / 3 is 120. The turn is worked out from the list, so a longer list gives a smaller turn.

:::


## Exit ticket

:::keep-together

**colours = ["red", "blue", "green", "gold"]. What is colours[1], and what is the place of "gold"?**

{{lines-3}}

:::


:::teacher-note

**Answer:** colours[1] is "blue" (counting starts at 0). "gold" is in place 3.

:::

