---
title: "Functions"
subtitle: "Python Foundations with Turtle · Functions · Lesson 5"
---

# Functions

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every app is built from small named functions that other code calls. You are about to write your first.


:::teacher-note

**In one sentence:** Students give a group of steps a name with def, then use that name again and again, and see why one change inside a function updates every use.

**Students should be able to say:** I can write a function with def and call it by name. I can explain why changing a function once changes every place it is used. I can write a second function by following a pattern.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

This program draws three squares by repeating the same code. What does it draw? Count how many times the number `100` appears.

```python
from turtle import *

for i in range(4):
    forward(100)
    right(90)

penup()
forward(150)
pendown()

for i in range(4):
    forward(100)
    right(90)

penup()
forward(150)
pendown()

for i in range(4):
    forward(100)
    right(90)
```

:::keep-together

My prediction, and why:

{{lines-3}}

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

`def square():` gives the loop a name. The steps only run when the name is **called**: `square()`.

```python
from turtle import *


def square():
    for i in range(4):
        forward(100)
        right(90)


square()
penup()
forward(150)
pendown()
square()
penup()
forward(150)
pendown()
square()
```

:::keep-together

### Count the changes

**To make all three squares half as big now, how many numbers change?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 1

Only the numbers inside def square(): change. The three calls are just the name square(), so they never need editing.

:::


:::keep-together

### Match the parts

**Match each part of the program with its job.**

A. repeats the four sides

B. moves the turtle

C. runs the steps

D. gives the steps a name

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `def square():` | |
| `square()` | |
| `for i in range(4):` | |
| `forward(100)` | |

:::


:::teacher-note

**Answer:** def square(): → D. gives the steps a name; square() → C. runs the steps; for i in range(4): → A. repeats the four sides; forward(100) → B. moves the turtle

def only describes the steps. Calling the name is what runs them.

:::


:::keep-together

### Put it in order

**Put the lines in order so the program draws one square.**

A. `right(90)`

B. `for i in range(4):`

C. `def square():`

D. `forward(100)`

E. `square()`

Correct order (letters): {{field-24}}

:::


:::teacher-note

**Answer:** see the program below

The def comes first, indented lines belong inside it, and the call comes after.

```python
def square():
    for i in range(4):
        forward(100)
        right(90)
square()
```

:::


:::keep-together

### Same name twice

This is one file.

```python
from turtle import *


def square():
    for i in range(4):
        forward(100)
        right(90)


def square():
    for i in range(3):
        forward(100)
        right(120)


square()
```

**Someone pasted a second def square below the first. What does square() draw?**

☐ Nothing: Python stops because square is defined twice

☐ A square

☐ A square, then a triangle

☐ A triangle

:::


:::teacher-note

**Answer:** A triangle

A def gives a name to some steps. The second def gives the same name to new steps, so by the time square() is called it means the triangle. Python gives no warning: the first def is simply lost.

:::


:::typical

## Modify


**Resize the square.** Change the size of the square inside `def square():` and run it.

**Write a triangle function.** Write `def triangle():` following the pattern of `square`.

**Use both.** Draw a square, then a triangle, then a square again.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Resize the square:**

```python
from turtle import *


def square():
    for i in range(4):
        forward(50)
        right(90)


square()
```

**Write a triangle function:**

```python
from turtle import *


def square():
    for i in range(4):
        forward(100)
        right(90)


def triangle():
    for i in range(3):
        forward(100)
        right(120)


square()
triangle()
```

**Use both:**

```python
from turtle import *


def square():
    for i in range(4):
        forward(100)
        right(90)


def triangle():
    for i in range(3):
        forward(100)
        right(120)


def gap():
    penup()
    forward(130)
    pendown()


square()
gap()
triangle()
gap()
square()
```

:::

:::


## Make

Write a function that draws any shape you like (a rectangle, a hexagon, a star), then call it three times in a row.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *


def hexagon():
    for i in range(6):
        forward(40)
        right(60)


def gap():
    penup()
    forward(100)
    pendown()


penup()
goto(-180, 0)
pendown()
hexagon()
gap()
hexagon()
gap()
hexagon()
```

:::


:::wider

## Extend the house plan

A house plan is a few small named pieces: `wall()` and `roof()`. Run it. Then add a `door()` function and call it. Notice that you never edit `wall` or `roof` to do it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *


def wall():
    for i in range(4):
        forward(100)
        right(90)


def roof():
    left(60)
    forward(100)
    right(120)
    forward(100)
    right(120)
    forward(100)
    right(180)


def door():
    penup()
    forward(40)
    right(90)
    forward(60)
    left(90)
    pendown()
    for i in range(2):
        forward(20)
        right(90)
        forward(40)
        right(90)


wall()
roof()
door()
```

:::

:::


## Exit ticket

:::keep-together

**A program has def square(): with a loop inside, and nothing else. What does it draw, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Nothing. The def only describes the steps; the function has to be called with square() to run them.

:::

