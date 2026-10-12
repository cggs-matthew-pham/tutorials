---
title: "Drawing with a turtle"
subtitle: "Python Foundations with Turtle · Drawing and repeating · Lesson 1"
---

# Drawing with a turtle

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Loops are how a program draws 100 tiles, sends 100 emails or reads 100 sensors without 100 lines of code.


:::teacher-note

**In one sentence:** Students meet the turtle, read and run a tiny program, then find out why programmers use loops instead of copying the same lines.

**Students should be able to say:** I can say what forward, right and left do to the turtle. I can use a loop to repeat lines instead of copying them. I can work out the turn for a shape with any number of sides.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`forward(100)` moves the turtle 100 steps and draws a line. `right(90)` turns it a quarter turn. The line `for i in range(4):` is new. Read the code. What will the turtle draw?

```python
from turtle import *

for i in range(4):
    forward(100)
    right(90)
```

:::keep-together

**What will the turtle draw?**

☐ nothing, because i is never used

☐ one side, then a turn

☐ one long line

☐ a square

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** A square. The two indented lines run 4 times: a side of 100, then a quarter turn, four times over. The turtle finishes where it started, facing right.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

Compare the two programs. They draw the same square.

```python
# Without a loop
forward(100)
right(90)
forward(100)
right(90)
forward(100)
right(90)
forward(100)
right(90)

# With a loop
for i in range(4):
    forward(100)
    right(90)
```

:::keep-together

### Count the lines

**The square without a loop uses 8 lines of drawing code. A 20-sided shape drawn the same way would use how many lines?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 40

Each side needs 2 lines (forward and a turn), so 20 sides need 40.

:::


:::keep-together

### Spot the bug

**This was meant to draw a square. Instead the turtle draws one long line and turns once at the very end. Click the wrong line.**

```
 1  from turtle import *
 2  
 3  for i in range(4):
 4      forward(100)
 5  right(90)
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 5

right(90) is not indented, so it is not part of the loop. The loop draws four sides in a straight line, and the turn runs once afterwards. Indent it under the for line so both lines repeat.

:::


:::keep-together

### Follow the counter

**for i in range(4): makes a counter called i. It starts at 0 and goes up by 1 each time round the loop. Fill in the table for the square.**

{{rows 1}}

| pass | i | turned so far |
|---|---|---|
| 1 | 0 | 90 |
| 2 |   |   |
| 3 |   |   |
| 4 |   |   |

:::


:::teacher-note

**Answer:** 1, 180, 2, 270, 3, 360

i counts 0, 1, 2, 3: four passes, starting from 0. This square never uses i, but it is there, and later programs will use it. After four turns of 90 the turtle has turned 360 degrees, a full turn.

:::


:::typical

## Modify

Change the loop in small steps. Run after each change.

**Draw a triangle.** Change the loop so it draws a triangle instead of a square.

**Double the sides.** Make each side of your triangle twice as long.

**Change the pen.** Give your triangle a colour. Try a thicker line too.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Draw a triangle:**

```python
from turtle import *

for i in range(3):
    forward(100)
    right(120)
```

**Double the sides:**

```python
from turtle import *

for i in range(3):
    forward(200)
    right(120)
```

**Change the pen:**

```python
from turtle import *

pencolor("red")
pensize(5)
for i in range(3):
    forward(200)
    right(120)
```

:::

:::


## Make

A loop works for any pattern, not only shapes. Find the part that repeats, write it once, and say how many times.

**Draw a staircase.** Draw a staircase with 5 steps, like the picture.

**Make it taller.** Make it 10 steps.

**Your own pattern.** Try a zigzag, a row of battlements or a dashed line. Find the part that repeats first.

Next lesson adds variables. Then you put loops and variables to work on a whole program: a street of houses.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Draw a staircase:**

```python
from turtle import *

for i in range(5):
    left(90)
    forward(20)
    right(90)
    forward(20)
```

**Make it taller:**

```python
from turtle import *

for i in range(10):
    left(90)
    forward(20)
    right(90)
    forward(20)
```

:::


## Exit ticket

:::keep-together

**A turtle draws a shape with 5 equal sides using a loop. How many times does the loop repeat, and how far does the turtle turn each time?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 5 times, turning 72 degrees each time (360 divided by 5).

:::

