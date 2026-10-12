---
title: "Decisions"
subtitle: "Python Foundations with Turtle · Choices and collections · Lesson 3"
---

# Decisions

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Traffic lights, game scores, login screens and thermostats all do the same thing: check a condition and pick what happens next.


:::teacher-note

**In one sentence:** Students make the program choose with if and else, using the remainder (%) to colour every other square, then add a third choice with elif.

**Students should be able to say:** I can write an if / else that chooses between two actions. I can work out whether a condition is true for a given value. I can add another choice with elif.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`i` is the loop counter from Lesson 1, which counts 0, 1, 2, 3 and so on. `i % 2` is the **remainder** when `i` is divided by 2. It is 0 for even numbers and 1 for odd numbers. The `if` line runs its body only when that remainder is 0.

```python
from turtle import *

size = 40
penup()
goto(-160, 0)
pendown()

for i in range(8):
    if i % 2 == 0:
        fillcolor("black")
    else:
        fillcolor("white")
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    forward(size)
```

:::keep-together

**What colour is the third square (when i is 2)?**

☐ black

☐ white

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Black. The squares alternate black, white, black, white, starting with black, because i % 2 is 0 for 0, 2, 4 and 6.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

`print(i, i % 2)` shows each remainder as it is worked out. Run it and watch the output.

```python
from turtle import *

size = 40
penup()
goto(-160, 0)
pendown()

for i in range(8):
    print(i, i % 2)
    if i % 2 == 0:
        fillcolor("black")
    else:
        fillcolor("white")
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    forward(size)
```

:::keep-together

### Trace the squares

**Fill in the gaps for each square: the remainder and the colour the program picks.**

{{rows 1}}

| i | i % 2 | colour |
|---|---|---|
| 0 | 0 | black |
| 1 |   |   |
| 2 |   |   |
| 3 |   |   |

:::


:::teacher-note

**Answer:** 1, white, 0, black, 1, white

Even numbers leave a remainder of 0, so the condition is true and the square is black. Odd numbers leave 1, so the else path makes it white.

:::


:::keep-together

### Count the black squares

**If the row had 9 squares instead of 8, how many would be black?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 5

The black squares are i = 0, 2, 4, 6 and 8, so there are five.

:::


:::keep-together

### Spot the bug

**This program should draw a row of circles that alternate colour, but it will not even start. Click the wrong line.**

```
 1  from turtle import *
 2  
 3  for i in range(8):
 4      if i % 2 = 0:
 5          fillcolor("black")
 6      else:
 7          fillcolor("white")
 8      begin_fill()
 9      circle(20)
10      end_fill()
11      forward(50)
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

A single = stores a value. To ask whether two things are equal, the condition needs two: i % 2 == 0.

:::


:::keep-together

### True or false

**A condition is worked out to a value, like a sum is. What would print(3 % 2 == 0) show?**

☐ 1

☐ False

☐ True

☐ 0

:::


:::teacher-note

**Answer:** False

3 % 2 is 1, and 1 == 0 is not true, so the condition is False. Every condition works out to True or False, and if runs its lines only when it is True.

:::


:::typical

## Modify


**Change the colours.** Swap black and white for two colours of your own.

**Add a third colour.** Make every third square green. Place the new check before the others, and use `elif`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Change the colours:**

```python
from turtle import *

size = 40
penup()
goto(-160, 0)
pendown()

for i in range(8):
    if i % 2 == 0:
        fillcolor("navy")
    else:
        fillcolor("gold")
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    forward(size)
```

**Add a third colour:**

```python
from turtle import *

size = 40
penup()
goto(-160, 0)
pendown()

for i in range(8):
    if i % 3 == 0:
        fillcolor("green")
    elif i % 2 == 0:
        fillcolor("navy")
    else:
        fillcolor("gold")
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    forward(size)
```

:::

:::


## Make

Draw a row of **10 shapes**. Even-numbered shapes should be circles, odd-numbered shapes squares.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

penup()
goto(-180, 0)
pendown()

for i in range(10):
    if i % 2 == 0:
        circle(15)
    else:
        for side in range(4):
            forward(30)
            left(90)
    penup()
    forward(40)
    pendown()
```

:::


:::wider

## Set the traffic light

A traffic light is a decision: one variable says which light is on, and the program picks what to do. Change `light` to `"red"`, run it, then to `"orange"`. Then add a new state, `"flashing"`, that fills the circle yellow and prints `"Slow down"`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

light = "flashing"

if light == "red":
    fillcolor("red")
    print("Stop")
elif light == "orange":
    fillcolor("orange")
    print("Get ready")
elif light == "flashing":
    fillcolor("yellow")
    print("Slow down")
else:
    fillcolor("green")
    print("Go")

begin_fill()
circle(50)
end_fill()
```

:::

:::


## Exit ticket

:::keep-together

**A loop colours square i black if i % 2 == 0, else white. Is square 5 black or white? Explain using the remainder.**

{{lines-3}}

:::


:::teacher-note

**Answer:** White. 5 % 2 is 1, so the condition i % 2 == 0 is false and the else path runs.

:::

