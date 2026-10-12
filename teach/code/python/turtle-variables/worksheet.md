---
title: "Name a value"
subtitle: "Python Foundations with Turtle · Drawing and repeating · Lesson 2"
---

# Name a value

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Games keep score, maps keep scale and apps keep your settings. All of them store a value under a name and calculate with it.


:::teacher-note

**In one sentence:** Students give numbers names (variables) and let the program calculate the turn, so one change at the top updates the whole shape.

**Students should be able to say:** I can store a value in a variable and use its name instead of the number. I can work out a value with a calculation, such as angle = 360 / sides. I can change a whole drawing by changing one variable.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`angle = 360 / sides` stores the result of a calculation. What will the turtle draw? How many sides, and why does `right(angle)` turn by that amount?

```python
from turtle import *

sides = 5
size = 80
angle = 360 / sides

for i in range(sides):
    forward(size)
    right(angle)
```

:::keep-together

**How many sides will the shape have?**

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Five sides. angle = 360 / 5 = 72, so the turtle turns 72 degrees at each corner and the shape closes.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

`print(angle)` shows a value under the drawing. Copy it whenever you want to see what a name holds; the console lessons explain how it works. Change `sides` and watch what `angle` becomes, then work through the checks.

```python
from turtle import *

sides = 5
size = 80
angle = 360 / sides
print(angle)

for i in range(sides):
    forward(size)
    right(angle)
```

:::keep-together

### Calculate the angle

**If sides = 6, what is angle?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 60

360 / 6 = 60, so the turtle turns 60 degrees at each corner.

:::


:::keep-together

### Spot the bug

**This program should draw a 5-sided shape, but it does not close. Click the wrong line.**

```
 1  from turtle import *
 2  
 3  sides = 5
 4  size = 80
 5  angle = 360 * sides
 6  
 7  for i in range(sides):
 8      forward(size)
 9      right(angle)
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 5

angle = 360 * sides is too big. To split one full turn between the corners it should be 360 / sides.

:::


:::keep-together

### A name keeps its value

A name holds one value at a time. Lines that ran earlier keep what they used.

```python
size = 50
forward(size)
size = 100
forward(size)
```

**The program stores size = 50 and draws a line. Later it stores size = 100 and draws another line. How long was the first line?**

☐ Storing size twice is an error

☐ 50

☐ 100

☐ 150

:::


:::teacher-note

**Answer:** 50

A line uses the value size holds at that moment. Storing a new value changes the lines drawn after it, not the ones already drawn.

:::


:::keep-together

### Spot the bug in the loop

**This should draw a hexagon, but the turtle draws one long line and turns once at the end. Click the wrong line.**

```
 1  from turtle import *
 2  
 3  sides = 6
 4  size = 80
 5  angle = 360 / sides
 6  
 7  for i in range(sides):
 8      forward(size)
 9  right(angle)
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 9

right(angle) is not indented, so it is not part of the loop. Indent it under the for line so both lines repeat.

:::


:::typical

## Modify

Change one number at the top to draw a hexagon, then a 12-sided shape. Run it each time.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

sides = 12
size = 40
angle = 360 / sides

for i in range(sides):
    forward(size)
    right(angle)
```

:::

:::


## Make

Make your own shape generator. Put three names at the top (`sides`, `size` and `colour`) and use all three below. Then change each one and watch the shape change.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

sides = 6
size = 80
angle = 360 / sides
colour = "purple"

pencolor(colour)
for i in range(sides):
    forward(size)
    right(angle)
```

:::


:::wider

## Resize a room plan

Plans and maps store a **scale**: how many pixels are one metre. This program draws a 6 m by 4 m room. Change the room to 8 m by 5 m, then change `scale` and notice the whole plan resizes. Then add a second room beside it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

scale = 20   # pixels per metre
width = 8    # metres
depth = 5

for i in range(2):
    forward(width * scale)
    right(90)
    forward(depth * scale)
    right(90)

# A second room beside the first: 4 m by 5 m.
forward(width * scale)
for i in range(2):
    forward(4 * scale)
    right(90)
    forward(depth * scale)
    right(90)
```

:::

:::


## Exit ticket

:::keep-together

**A program has sides = 8 and angle = 360 / sides. How far does the turtle turn at each corner?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 45 degrees (360 divided by 8).

:::

