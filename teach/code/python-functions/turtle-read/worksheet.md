---
title: "Read a program"
subtitle: "Python functions and events · Start from a working program · Lesson 1"
---

# Read a program

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Programmers read far more code than they write. The first skill is finding the part that does the job you want to change.


:::teacher-note

**In one sentence:** Students read a longer program that combines the counter, a list, an update and a decision, find the lines that do each job, and change one part without breaking the rest.

**Students should be able to say:** I can find the lines that do one job in a longer program. I can say what a part depends on before I change it. I can change one part and keep the rest working.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the code, one comment at a time. How tall is the third stem?

```python
from turtle import *

speed(0)
colours = ["red", "orange", "pink", "purple"]
stem = 50
head = 10

penup()
goto(-150, -80)
pendown()

for i in range(len(colours)):
    # stem
    if i % 2 == 0:
        pencolor("green")
    else:
        pencolor("darkgreen")
    pensize(3)
    left(90)
    forward(stem + i * 10)

    # flower head
    fillcolor(colours[i])
    begin_fill()
    circle(head)
    end_fill()
    head = head + 4

    # back down, then along to the next flower
    penup()
    backward(stem + i * 10)
    right(90)
    forward(70)
    pendown()
```

:::keep-together

**stem is 50. How tall is the third stem (when i is 2)?**

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 70. The stem is stem + i * 10, which is 50 + 2 * 10 = 70. Each stem is 10 taller than the one before.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
from turtle import *

speed(0)
colours = ["red", "orange", "pink", "purple"]
stem = 50
head = 10

penup()
goto(-150, -80)
pendown()

for i in range(len(colours)):
    # stem
    if i % 2 == 0:
        pencolor("green")
    else:
        pencolor("darkgreen")
    pensize(3)
    left(90)
    forward(stem + i * 10)

    # flower head
    fillcolor(colours[i])
    begin_fill()
    circle(head)
    end_fill()
    head = head + 4

    # back down, then along to the next flower
    penup()
    backward(stem + i * 10)
    right(90)
    forward(70)
    pendown()
```

:::keep-together

### Find the parts

**Match each part of the program with its job.**

A. makes each stem taller than the last

B. picks the flower's colour by its place

C. makes each flower head bigger than the last

D. alternates the stem between two greens

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `if i % 2 == 0: ... else: ...` | |
| `forward(stem + i * 10)` | |
| `head = head + 4` | |
| `colours[i]` | |

:::


:::teacher-note

**Answer:** if i % 2 == 0: ... else: ... → D. alternates the stem between two greens; forward(stem + i * 10) → A. makes each stem taller than the last; head = head + 4 → C. makes each flower head bigger than the last; colours[i] → B. picks the flower's colour by its place

Each line has one job. The if / else is a decision, i * 10 uses the counter, head + 4 is an update, and colours[i] is a list item picked by its place.

:::


:::keep-together

### Spot the bug

**The flower heads should grow, but all four are the same size. Click the line that stops them growing.**

```
 1  from turtle import *
 2  
 3  speed(0)
 4  colours = ["red", "orange", "pink", "purple"]
 5  stem = 50
 6  head = 10
 7  
 8  penup()
 9  goto(-150, -80)
10  pendown()
11  
12  for i in range(len(colours)):
13      pensize(3)
14      left(90)
15      forward(stem + i * 10)
16      head = 10
17      fillcolor(colours[i])
18      begin_fill()
19      circle(head)
20      end_fill()
21      head = head + 4
22      penup()
23      backward(stem + i * 10)
24      right(90)
25      forward(70)
26      pendown()
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 16

head = 10 is inside the loop, so it is reset to 10 at the start of every pass, and the update never gets a chance to add up. Set it once before the loop.

:::


:::typical

## Modify


**Add flowers.** Add two more colours. Everything else should keep working.

**Same height.** Find the part that makes the stems different, and change only that.

You have found parts by their jobs. In Course B, you will give those parts names, so you can reuse them.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Add flowers:**

```python
from turtle import *

speed(0)
colours = ["red", "orange", "pink", "purple", "gold", "teal"]
stem = 50
head = 10

penup()
goto(-200, -80)
pendown()

for i in range(len(colours)):
    if i % 2 == 0:
        pencolor("green")
    else:
        pencolor("darkgreen")
    pensize(3)
    left(90)
    forward(stem + i * 10)

    fillcolor(colours[i])
    begin_fill()
    circle(head)
    end_fill()
    head = head + 4

    penup()
    backward(stem + i * 10)
    right(90)
    forward(70)
    pendown()
```

**Same height:**

```python
from turtle import *

speed(0)
colours = ["red", "orange", "pink", "purple"]
stem = 50
head = 10

penup()
goto(-150, -80)
pendown()

for i in range(len(colours)):
    if i % 2 == 0:
        pencolor("green")
    else:
        pencolor("darkgreen")
    pensize(3)
    left(90)
    forward(stem)

    fillcolor(colours[i])
    begin_fill()
    circle(head)
    end_fill()
    head = head + 4

    penup()
    backward(stem)
    right(90)
    forward(70)
    pendown()
```

:::

:::


## Exit ticket

:::keep-together

**In the garden, which part would you change to make every flower head the same size?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The update head = head + 4. Remove it, or set head once and never add to it.

:::

