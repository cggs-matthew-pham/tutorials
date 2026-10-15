---
title: "A street of houses"
subtitle: "Python Foundations with Turtle · Commands, loops and values · Lesson 6"
---

# A street of houses

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Real programs are longer than a few lines. Programmers spend more time reading code than writing it: they find the part that does a job, then change just that part.


:::teacher-note

**In one sentence:** Students watch a 30-line program being built part by part, then read it closely, change it and add to it. It uses only loops, variables and calculations from lessons 1 and 2; the new skill is reading a whole program.

**Students should be able to say:** I can find the lines in a longer program that do one job. I can say what changes when I change one variable, before I run it. I can add a new part to a program without breaking the rest.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Watch it built

Watch the program being built, one part at a time. Each caption names the job of the lines that follow it. You will need those jobs in a moment.

## Predict

You saw it print 300 with 4 houses. Read the last line again: what changes when there is one more house?

```python
from turtle import *

speed(0)
houses = 4
width = 60
gap = 20

penup()
backward(220)
pendown()

for house in range(houses):
    # walls
    for side in range(4):
        forward(width)
        left(90)
    # roof
    left(90)
    forward(width)
    right(30)
    forward(width)
    right(120)
    forward(width)
    right(30)
    forward(width)
    left(90)
    # move along to the next house
    penup()
    forward(gap)
    pendown()

print(houses * width + (houses - 1) * gap)
```

:::keep-together

**Change houses to 5. What number will the last line print?**

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 380. Five houses of 60 make 300, and the four gaps between them make 80 more: 5 × 60 + 4 × 20 = 380.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
from turtle import *

speed(0)
houses = 4
width = 60
gap = 20

penup()
backward(220)
pendown()

for house in range(houses):
    # walls
    for side in range(4):
        forward(width)
        left(90)
    # roof
    left(90)
    forward(width)
    right(30)
    forward(width)
    right(120)
    forward(width)
    right(30)
    forward(width)
    left(90)
    # move along to the next house
    penup()
    forward(gap)
    pendown()

print(houses * width + (houses - 1) * gap)
```

:::keep-together

### Find the parts

**Match each part of the program with its job.**

A. draws the walls

B. moves to where the next house starts, without drawing

C. repeats everything indented under it, once per house

D. draws the roof and comes back down to the ground

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `for side in range(4):` | |
| `left(90) then forward(width), right(30) ...` | |
| `penup(), forward(gap), pendown()` | |
| `for house in range(houses):` | |

:::


:::teacher-note

**Answer:** for side in range(4): → A. draws the walls; left(90) then forward(width), right(30) ... → D. draws the roof and comes back down to the ground; penup(), forward(gap), pendown() → B. moves to where the next house starts, without drawing; for house in range(houses): → C. repeats everything indented under it, once per house

The outer loop repeats a whole house: walls, roof and the move along. The inner loop repeats only the walls.

:::


:::keep-together

### Follow a change

**Back to 4 houses. Change width to 70 and leave the rest. What will the last line print?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 340

4 × 70 + 3 × 20 = 340. Every part that uses width follows the change: the walls, the roof and the length.

:::


:::keep-together

### Spot the bug

**With houses = 4 this street looks right. Change houses to 6 and the roofs go wild. Click the wrong line.**

```
 1  from turtle import *
 2  
 3  speed(0)
 4  houses = 4
 5  width = 60
 6  gap = 20
 7  
 8  penup()
 9  backward(220)
10  pendown()
11  
12  for house in range(houses):
13      # walls
14      for side in range(houses):
15          forward(width)
16          left(90)
17      # roof
18      left(90)
19      forward(width)
20      right(30)
21      forward(width)
22      right(120)
23      forward(width)
24      right(30)
25      forward(width)
26      left(90)
27      # move along to the next house
28      penup()
29      forward(gap)
30      pendown()
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 14

The walls loop repeats houses times instead of 4. It only looked right because houses happened to be 4. A square always has 4 sides, whatever houses is.

:::


:::typical

## Modify

Change the street one step at a time. Run after each change.

**Six houses.** Fit six houses on the screen.

**Growing houses.** Make each house a little wider than the last.

**Is the length still right?.** The last line works out the length from `width`. Is it still true?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Six houses:**

```python
from turtle import *

speed(0)
houses = 6
width = 50
gap = 20

penup()
backward(220)
pendown()

for house in range(houses):
    # walls
    for side in range(4):
        forward(width)
        left(90)
    # roof
    left(90)
    forward(width)
    right(30)
    forward(width)
    right(120)
    forward(width)
    right(30)
    forward(width)
    left(90)
    # move along to the next house
    penup()
    forward(gap)
    pendown()

print(houses * width + (houses - 1) * gap)
```

**Growing houses:**

```python
from turtle import *

speed(0)
houses = 4
width = 40
gap = 20

penup()
backward(220)
pendown()

for house in range(houses):
    # walls
    for side in range(4):
        forward(width)
        left(90)
    # roof
    left(90)
    forward(width)
    right(30)
    forward(width)
    right(120)
    forward(width)
    right(30)
    forward(width)
    left(90)
    # move along to the next house
    penup()
    forward(gap)
    pendown()
    width = width + 10
```

:::

:::


## Make

Add something new after the houses: a fence, a row of trees or a shop.

**Add a part.** Give it its own loop, after the house loop.

**Make it adjustable.** Give it its own variable, so how many or how big is set in one place.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Add a part:**

```python
from turtle import *

speed(0)
houses = 4
width = 60
gap = 20
posts = 8

penup()
backward(220)
pendown()

for house in range(houses):
    # walls
    for side in range(4):
        forward(width)
        left(90)
    # roof
    left(90)
    forward(width)
    right(30)
    forward(width)
    right(120)
    forward(width)
    right(30)
    forward(width)
    left(90)
    # move along to the next house
    penup()
    forward(gap)
    pendown()

# a fence: one post, then step along, posts times
for post in range(posts):
    left(90)
    forward(30)
    backward(30)
    right(90)
    forward(10)
```

:::


:::wider

## Lay a tiled floor

Tilers plan floors like this: one tile, repeated. This program is a loop inside a loop, like the street. Which loop draws one tile, and which repeats the tile? Change the number of tiles, make them bigger, then add a second row.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

# Two rows of six bigger tiles.
for row in range(2):
    for tile in range(6):
        for side in range(4):
            forward(50)
            right(90)
        penup()
        forward(50)
        pendown()
    penup()
    backward(300)
    right(90)
    forward(50)
    left(90)
    pendown()
```

:::

:::


## Exit ticket

:::keep-together

**The street has houses = 3, width = 50 and gap = 10. What does the last line print, and where does house 2 start if house 1 starts at x = -220?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 170 (3 × 50 + 2 × 10). House 2 starts at -160 (-220 + 50 + 10).

:::

