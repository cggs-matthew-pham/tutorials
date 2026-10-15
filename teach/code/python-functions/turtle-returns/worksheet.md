---
title: "Functions that give answers"
subtitle: "Python functions and events · Functions · Lesson 4"
---

# Functions that give answers

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Calculators, maps and games are full of functions that take something in and give an answer back.


:::teacher-note

**In one sentence:** Students write functions that give an answer back with return, see why print is not the same, and combine small functions to build a street.

**Students should be able to say:** I can write a function that gives a value back with return. I can explain the difference between return (hand the value back) and print (only show it). I can build a program from several small functions working together.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`metres(5)` gives back a number. What do you think `forward(metres(5))` does? How far will the turtle move, and how far does the second `forward` take it?

```python
from turtle import *

scale = 20


def metres(m):
    return m * scale


forward(metres(5))
right(90)
forward(metres(3))
```

:::keep-together

My prediction, and why:

{{lines-3}}

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

`print(metres(5))` shows the answer under the drawing. Change `scale` and watch both the printed value and the drawing change.

```python
from turtle import *

scale = 20


def metres(m):
    return m * scale


print(metres(5))
forward(metres(5))
right(90)
forward(metres(3))
```

:::keep-together

### What comes back?

**scale is 20. What number does metres(5) give back?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 100

metres(5) returns 5 * 20 = 100, so forward(metres(5)) moves 100.

:::


:::keep-together

### Spot the bug

**This version prints 100, then stops with a TypeError on the last line. Click the line that causes it.**

```
 1  from turtle import *
 2  
 3  scale = 20
 4  
 5  
 6  def metres(m):
 7      print(m * scale)
 8  
 9  
10  forward(metres(5))
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 7

print(m * scale) shows the value but does not give it back. It should be return m * scale.

:::


:::keep-together

### Explain return

**What does the word return do in metres?**

☐ It draws the shape again

☐ It prints the answer

☐ It gives the answer back to the code that called the function

☐ It stops the program

:::


:::teacher-note

**Answer:** It gives the answer back to the code that called the function

return hands the value back, so forward(metres(5)) can use it. print only shows a value; it does not give it back.

:::


:::typical

## Modify

`room` calls `metres` to turn sizes into pixels. Functions are working together here.

**Write area.** Write `def area(width, depth)` that **returns** the area.

**Print the area.** Print the area of the room that the program draws.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Write area:**

```python
from turtle import *

scale = 20


def metres(m):
    return m * scale


def room(width, depth):
    for i in range(2):
        forward(metres(width))
        right(90)
        forward(metres(depth))
        right(90)


def area(width, depth):
    return width * depth


room(5, 4)
```

**Print the area:**

```python
from turtle import *

scale = 20


def metres(m):
    return m * scale


def room(width, depth):
    for i in range(2):
        forward(metres(width))
        right(90)
        forward(metres(depth))
        right(90)


def area(width, depth):
    return width * depth


room(5, 4)
print(area(5, 4))
```

:::

:::


## Mix it up

Work this out on paper first.

:::keep-together

**What does label(50) give back?**

☐ 50

☐ big

☐ nothing

☐ small

:::


:::teacher-note

**Answer:** small

50 &gt; 50 is False, because 50 is not more than 50. So the else path runs and the function returns "small".

:::


## Make a street

This time there is no starter. Build the street in two stages.

**Draw one house.** Write a function that draws one house.

**Draw five in a row.** Use a loop to repeat it for a **street of five houses**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Draw one house:**

```python
from turtle import *


def house(size):
    for i in range(4):
        forward(size)
        right(90)
    left(60)
    forward(size)
    right(120)
    forward(size)
    right(120)
    forward(size)
    right(180)


house(60)
```

**Draw five in a row:**

```python
from turtle import *


def house(size):
    for i in range(4):
        forward(size)
        right(90)
    left(60)
    forward(size)
    right(120)
    forward(size)
    right(120)
    forward(size)
    right(180)


penup()
goto(-200, 0)
pendown()
for i in range(5):
    house(50)
    penup()
    forward(80)
    pendown()
```

:::


:::wider

## Vary a street of houses

This is a finished street. Make the houses all the same size, then make them shrink along the street. Add a sixth house, or change the gap between them.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *


def house(size):
    for i in range(4):
        forward(size)
        right(90)
    left(60)
    forward(size)
    right(120)
    forward(size)
    right(120)
    forward(size)
    right(180)


def move(distance):
    penup()
    forward(distance)
    pendown()


penup()
goto(-220, 0)
pendown()
for i in range(6):
    house(70 - i * 10)
    move(75)
```

:::

:::


## Exit ticket

:::keep-together

**def double(n): return n * 2. What does forward(double(30)) do?**

{{lines-3}}

:::


:::teacher-note

**Answer:** double(30) gives back 60, so the turtle moves forward 60 steps.

:::

