---
title: "Variables and operations"
subtitle: "Python Foundations with Turtle · Drawing and repeating · Lesson 2"
---

# Variables and operations

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

`print(angle)` shows a value under the drawing. Change `sides` and watch what `angle` becomes.

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

### Store it back

**A program has size = 20. Then it runs the line size = size + 5. What is stored in size afterwards?**

☐ Nothing: the line is an error

☐ 5

☐ 25

☐ 20 + 5

:::


:::teacher-note

**Answer:** 25

Read the line from the right. Python works out size + 5, which is 25, then stores 25 back in size. The = means store, not 'is equal to'.

:::


:::keep-together

### Watch it grow

Follow `size` round this loop, which adds to it every pass.

```python
size = 10

for i in range(4):
    forward(size)
    right(90)
    size = size + 10
```

**Fill in the size that forward(size) uses on each pass.**

{{rows 1}}

| pass | size used by forward(size) |
|---|---|
| 1 | 10 |
| 2 |   |
| 3 |   |
| 4 |   |

:::


:::teacher-note

**Answer:** 20, 30, 40

The last line of each pass stores size + 10 back in size, so the next pass starts with a bigger size. This is how a spiral grows.

:::


:::typical

## Modify


**Draw a hexagon, then a 12-sided shape.** Change one number at the top and run it each time.

**Choose the colour with a variable.** Add a variable for the pen colour and use it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Draw a hexagon, then a 12-sided shape:**

```python
from turtle import *

sides = 12
size = 40
angle = 360 / sides

for i in range(sides):
    forward(size)
    right(angle)
```

**Choose the colour with a variable:**

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

:::


## Make

Draw a **square spiral**: each time round the loop, the line should be a little longer than the last.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

size = 5

for i in range(50):
    forward(size)
    right(90)
    size = size + 5
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

**What does size = size + 5 do if size is 20?**

{{lines-3}}

:::


:::teacher-note

**Answer:** It works out 20 + 5 = 25 and stores 25 back in size.

:::

