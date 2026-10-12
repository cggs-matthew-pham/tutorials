---
title: "Functions that decide"
subtitle: "Python Foundations with Turtle · Functions · Lesson 8"
---

# Functions that decide

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Apps decide all the time: is this message spam, is this score a pass, which colour is this weather? Each is a function with an if inside.


:::teacher-note

**In one sentence:** Students write a function with an if inside that chooses its answer, call it for every size in a list to colour dots, trace its decisions, find a counter reset inside the loop, add an elif and a counting function, and colour score bars.

**Students should be able to say:** I can write a function that uses if to choose its answer. I can call a function for every item in a list. I can count items in a list with a loop and an if inside a function.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Each call gives back one of two words. Which one depends on the size.

```python
from turtle import *


def size_colour(size):
    if size > 50:
        return "red"
    else:
        return "blue"


print(size_colour(80))
print(size_colour(30))
```

:::keep-together

**What two words are printed?**

☐ red, then red

☐ red, then blue

☐ blue, then red

☐ size_colour, then size_colour

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** red, then blue. 80 is more than 50, so the if returns red; 30 is not, so the else returns blue.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
from turtle import *

speed(0)


def size_colour(size):
    if size > 50:
        return "red"
    else:
        return "blue"


sizes = [20, 60, 35, 80, 50]

penup()
goto(-160, 0)
for s in sizes:
    dot(s, size_colour(s))
    forward(80)
```

:::keep-together

### Trace the decisions

**Fill in what size_colour gives back for each size in the list.**

{{rows 1}}

| s | size_colour(s) |
|---|---|
| 20 | blue |
| 60 | red |
| 35 |   |
| 80 |   |
| 50 |   |

:::


:::teacher-note

**Answer:** blue, red, blue

50 is not more than 50, so it goes to the else: blue. &gt; means more than, not equal to.

:::


:::keep-together

### Why a function?

**Why put the if inside a function, and not straight in the loop?**

☐ It makes the dots bigger

☐ It runs faster

☐ Python only allows if inside functions

☐ The decision gets a name and can be used anywhere: in this loop, in another loop, in a print

:::


:::teacher-note

**Answer:** The decision gets a name and can be used anywhere: in this loop, in another loop, in a print

Named once, size_colour can be reused and changed in one place. Change the rule inside it, and every place that uses it follows.

:::


:::keep-together

### Spot the bug

**There are two sizes over 50, but this prints 1. There is no error. Click the line that is wrong.**

```
 1  def count_big(sizes):
 2      for s in sizes:
 3          count = 0
 4          if s > 50:
 5              count = count + 1
 6      return count
 7  
 8  
 9  print(count_big([20, 60, 35, 80]))
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

count = 0 is inside the loop, so it goes back to 0 for every size: only the last count survives. Set it to 0 once, before the loop.

:::


:::typical

## Modify


**Three colours.** Add an elif.

**Count the big ones.** Count with a loop and an if.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Three colours:**

```python
from turtle import *

speed(0)


def size_colour(size):
    if size > 50:
        return "red"
    elif size > 30:
        return "orange"
    else:
        return "blue"


sizes = [20, 60, 35, 80, 50]

penup()
goto(-160, 0)
for s in sizes:
    dot(s, size_colour(s))
    forward(80)
```

**Count the big ones:**

```python
from turtle import *

speed(0)


def size_colour(size):
    if size > 50:
        return "red"
    else:
        return "blue"


def count_big(sizes):
    count = 0
    for s in sizes:
        if s > 50:
            count = count + 1
    return count


sizes = [20, 60, 35, 80, 50]

penup()
goto(-160, 0)
for s in sizes:
    dot(s, size_colour(s))
    forward(80)

print(count_big(sizes))
```

:::

:::


## Make: score bars

Draw a bar for each score, as tall as the score, coloured by a function you write: **green** for 70 or more, **orange** for 50 or more, **red** below that. Most people need two goes at the bars: draw one bar first, then loop.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

speed(0)

scores = [45, 80, 62, 30, 95]


def score_colour(score):
    if score >= 70:
        return "green"
    elif score >= 50:
        return "orange"
    else:
        return "red"


def bar(height, colour):
    fillcolor(colour)
    begin_fill()
    for i in range(2):
        forward(30)
        left(90)
        forward(height)
        left(90)
    end_fill()


penup()
goto(-150, -80)
pendown()
for s in scores:
    bar(s * 2, score_colour(s))
    penup()
    forward(50)
    pendown()
```

:::


## Exit ticket

:::keep-together

**def grade(score): if score &gt;= 50: return "pass" else: return "try again". What is grade(50)?**

{{lines-3}}

:::


:::teacher-note

**Answer:** pass: 50 is greater than or equal to 50.

:::

