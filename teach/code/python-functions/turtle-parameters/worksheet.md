---
title: "Functions with parameters"
subtitle: "Python functions and events · Functions · Lesson 3"
---

# Functions with parameters

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** One well-made function can do the work of a hundred copied lines: sending a message, drawing a tile, converting a unit.


:::teacher-note

**In one sentence:** Students give a function inputs (parameters), so one function can draw many sizes and shapes, then build a pattern by calling one function from another.

**Students should be able to say:** I can write a function with parameters and call it with different values. I can explain the difference between a parameter (the name in the def) and an argument (the value in the call). I can call one function from inside another.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`size` is a parameter. What will this draw? Where do the three squares share a corner, and why?

```python
from turtle import *


def square(size):
    for i in range(4):
        forward(size)
        right(90)


square(50)
square(100)
square(150)
```

:::keep-together

My prediction, and why:

{{lines-3}}

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

`polygon(sides, size)` has two parameters. The angle is calculated from `sides`, just like in the variables lesson.

```python
from turtle import *


def polygon(sides, size):
    angle = 360 / sides
    for i in range(sides):
        forward(size)
        right(angle)


polygon(3, 80)
polygon(4, 80)
polygon(6, 80)
```

:::keep-together

### Trace three calls

**Fill in what each call passes to polygon(sides, size), and the angle it calculates.**

{{rows 1}}

| call | sides | size | angle |
|---|---|---|---|
| polygon(3, 80) | 3 | 80 |   |
| polygon(4, 80) | 4 | 80 |   |
| polygon(6, 80) |   |   |   |

:::


:::teacher-note

**Answer:** 120, 90, 6, 80, 60

Arguments go to the parameters in order, and angle = 360 / sides inside the function.

:::


:::keep-together

### Name the parts

**Match each piece with its role.**

A. calculated inside the function

B. a call: runs the function with these values

C. an argument: the value for sides

D. a parameter: filled in by each call

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `sides in def polygon(sides, size):` | |
| `6 in polygon(6, 80)` | |
| `angle = 360 / sides` | |
| `polygon(4, 80)` | |

:::


:::teacher-note

**Answer:** sides in def polygon(sides, size): → D. a parameter: filled in by each call; 6 in polygon(6, 80) → C. an argument: the value for sides; angle = 360 / sides → A. calculated inside the function; polygon(4, 80) → B. a call: runs the function with these values

Parameters are the names in the def. Arguments are the values you pass when you call it.

:::


:::typical

## Modify


**Draw one more shape.** Call `polygon` with sides and size of your choice.

**Add a colour parameter.** Change `polygon` so each call can choose its own pen colour, like `polygon(3, 80, "red")`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Draw one more shape:**

```python
from turtle import *


def polygon(sides, size):
    angle = 360 / sides
    for i in range(sides):
        forward(size)
        right(angle)


polygon(3, 80)
polygon(4, 80)
polygon(6, 80)
polygon(8, 50)
```

**Add a colour parameter:**

```python
from turtle import *


def polygon(sides, size, colour):
    pencolor(colour)
    angle = 360 / sides
    for i in range(sides):
        forward(size)
        right(angle)


polygon(3, 80, "red")
polygon(4, 80, "blue")
polygon(6, 80, "green")
polygon(8, 50, "purple")
```

:::

:::


## Mix it up

Work this out on paper first.

:::keep-together

**What is the turn in degrees for polygon(8, 50)?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 45

The turn is 360 / sides, and sides is 8, so 360 / 8 = 45. The size does not change the turn.

:::


## Make

Write `def pattern(sides, copies):` that draws `copies` polygons, turning a little between them so they fan out around a point.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *


def polygon(sides, size):
    angle = 360 / sides
    for i in range(sides):
        forward(size)
        right(angle)


def pattern(sides, copies):
    for i in range(copies):
        polygon(sides, 60)
        right(360 / copies)


speed(0)
pattern(5, 12)
```

:::


## Make: Keep it as a button

You have unlocked **Save selection to My tools**. Open **Reference**, put the cursor inside one of your functions, and click it. It appears under **My tools**, ready to copy into any program. A saved tool is the first layer of abstraction: you can use the idea again without rewriting it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}


:::wider

## Rearrange a floor plan

A floor plan is `room(width, depth)` called many times. Run it. Move the kitchen, add a bathroom, then change `scale` and see the whole plan resize.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

scale = 15  # pixels per metre


def room(width, depth):
    for i in range(2):
        forward(width * scale)
        right(90)
        forward(depth * scale)
        right(90)


def move_to(x, y):
    penup()
    goto(x * scale, y * scale)
    pendown()


move_to(-8, 4)
room(5, 4)    # bedroom
move_to(1, 4)
room(4, 4)    # kitchen, moved to the right
move_to(-3, 4)
room(4, 2)    # bathroom
move_to(-8, 0)
room(9, 3)    # living room
```

:::

:::


## Exit ticket

:::keep-together

**def polygon(sides, size): ... What does polygon(5, 40) draw?**

{{lines-3}}

:::


:::teacher-note

**Answer:** A pentagon (5 sides) with each side 40 steps long, turning 72 degrees at each corner.

:::

