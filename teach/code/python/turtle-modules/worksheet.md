---
title: "Modules"
subtitle: "Python Foundations with Turtle · Functions · Lesson 9"
---

# Modules

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every Python program you will ever use imports other people's modules. Now you will build your own.


:::teacher-note

**In one sentence:** Students import functions from a module (a separate file of related functions), see why copied code costs more to fix, then build a module of their own.

**Students should be able to say:** I can import functions from a module and use them. I can explain why one shared module is easier to fix than copies of the same code. I can move related functions into a module of my own.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

This program never defines `square` or `triangle`. What does it draw? Where do you think they come from?

```python
from turtle import *
from shapes import square, triangle

square(80)
triangle(80)
```

:::keep-together

My prediction, and why:

{{lines-3}}

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## one bug, two copies

Two separate programs both need `wall`, so each has its own copy. Nothing here crashes; the problem is the copying. Pasting from **My tools** works the same way: each paste is a copy, and editing the tool does not change copies already pasted. This is the problem a module solves.

:::keep-together

### Every line to change

**The walls do not close: the turn inside wall is wrong. Click every line you would have to change.**

**program_a.py**

```
 1  from turtle import *
 2  
 3  
 4  def wall(size):
 5      for i in range(4):
 6          forward(size)
 7          right(80)
 8  
 9  
10  wall(60)
```

**program_b.py**

```
 1  from turtle import *
 2  
 3  
 4  def wall(size):
 5      for i in range(4):
 6          forward(size)
 7          right(80)
 8  
 9  
10  wall(100)
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line program_a.py:7 and program_b.py:7

Both programs run, but each has its own copy of wall, so the same fix is needed in two places. Miss one and that program stays wrong.

:::


:::keep-together

### Count the fixes

**You fix the bug in program_a.py. What happens to program_b.py?**

☐ It is fixed too

☐ It still has the bug, so you fix it separately

☐ It stops working

☐ Python warns you

:::


:::teacher-note

**Answer:** It still has the bug, so you fix it separately

Each file has its own copy of wall, so each copy needs fixing. If both programs imported wall from one module, you would fix it once.

:::


## where does it come from?

Open **Reference**, find **Module: shapes** and click **Show how it works**. Compare it with the functions you have written.

```python
from turtle import *
from shapes import square, triangle

square(80)
triangle(80)
```

:::keep-together

### Find the def

**Where is square defined?**

☐ In shapes.py, which this program imports

☐ Nowhere

☐ In this program

☐ Inside the turtle module

:::


:::teacher-note

**Answer:** In shapes.py, which this program imports

The def lives in shapes.py. The import line makes it available here.

:::


:::keep-together

### Same name twice

```python
# file: shapes.py
from turtle import *


def square(size):
    for i in range(4):
        forward(size)
        right(90)

# file: main.py
from turtle import *
from shapes import square


def square(size):
    circle(size / 2)


square(80)
```

**main.py imports square, then defines its own square. What does square(80) draw?**

☐ Nothing: Python stops with an error

☐ A circle, from main.py

☐ A square and a circle

☐ A square, from shapes.py

:::


:::teacher-note

**Answer:** A circle, from main.py

The def in main.py comes after the import, so the name square now means the new function. Python gives no warning. Use a different name, or keep one definition.

:::


:::typical

## Modify

These three functions are all in one file, and the wall does not close. Click **+ module**, move them into it, and import `house` back into `main.py`. Then fix the turn in `wall`, once, in the module. Work it out from the shape, as you did with variables: `360 / 4`, not a guessed number.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

*main.py*

```python
from turtle import *
from house_parts import house

house(60)
```

*house_parts.py*

```python
from turtle import *


def wall(size):
    for i in range(4):
        forward(size)
        right(360 / 4)


def roof(size):
    left(60)
    forward(size)
    right(120)
    forward(size)
    right(120)
    forward(size)
    right(180)


def house(size):
    wall(size)
    roof(size)
```

:::

:::


## Make

Create a module of your own with at least three related functions. Import it and use it to draw a small scene.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

*main.py*

```python
from turtle import *
from garden import tree, flower, fence

speed(0)
penup()
goto(-180, -80)
pendown()
fence(18)
penup()
goto(-120, -80)
pendown()
tree(60)
penup()
goto(60, -80)
pendown()
flower(25)
```

*garden.py*

```python
from turtle import *


def tree(height):
    """A trunk and a round top."""
    setheading(90)
    pencolor("brown")
    forward(height)
    pencolor("green")
    dot(height)
    setheading(0)


def flower(size):
    """Five petals round a centre."""
    pencolor("purple")
    for i in range(5):
        circle(size / 2)
        left(72)
    dot(size / 2, "gold")


def fence(posts):
    """A row of fence posts, 20 apart."""
    setheading(0)
    pencolor("grey")
    for i in range(posts):
        left(90)
        forward(30)
        backward(30)
        right(90)
        forward(20)
```

:::


:::wider

## Extend a street

A street is a few buildings repeated, and each building comes from a module. Run it. Add a roof colour, a taller house, or a gap in the street. You are changing the plan without rewriting any of the shapes.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *
from shapes import square, triangle

for i in range(5):
    square(60 + i * 10)
    pencolor("red")
    triangle(60 + i * 10)
    pencolor("black")
    penup()
    forward(110)
    pendown()
```

:::

:::


## Exit ticket

:::keep-together

**Two programs each have their own copy of a draw_tree function with a bug. Why would putting draw_tree in a module be better?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Both programs would import the one function, so fixing it once in the module fixes it for both.

:::

