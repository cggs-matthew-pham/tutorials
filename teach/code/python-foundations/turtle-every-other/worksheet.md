---
title: "Every other"
subtitle: "Python Foundations with Turtle · Choices and lists · Lesson 8"
---

# Every other

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Zebra crossings, chessboards, stripes and blinking lights all repeat a pattern: every second one is different.


:::teacher-note

**In one sentence:** Students use the remainder, %, to make a decision repeat every second or third pass, and add a third choice with elif.

**Students should be able to say:** I can say what i % 2 gives and when it is 0. I can pick every second or every third pass of a loop. I can add a third choice with elif and say which check wins.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The new sign is `%`. It does not mean percent: `i % 2` is the **remainder** when `i` is divided by 2. Read the code. What colour are the sides, in order?

```python
from turtle import *

pensize(6)
for i in range(8):
    if i % 2 == 0:
        pencolor("red")
    else:
        pencolor("blue")
    forward(30)
    right(45)
```

:::keep-together

**What colour are the sides, in order?**

☐ Red, blue, red, blue, and so on, taking turns

☐ Only the first side red, the rest blue

☐ Four red sides, then four blue sides

☐ Every side red

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Red and blue take turns. i % 2 is the remainder after dividing i by 2: 0 for 0, 2, 4 and 6, and 1 for 1, 3, 5 and 7. The condition is true on every second pass.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
from turtle import *

pensize(6)
for i in range(8):
    if i % 2 == 0:
        pencolor("red")
    else:
        pencolor("blue")
    forward(30)
    right(45)
```

:::keep-together

### Follow the remainder

**Fill in the gaps: the remainder when i is divided by 3.**

{{rows 1}}

| i | i % 3 |
|---|---|
| 0 | 0 |
| 1 |   |
| 2 |   |
| 3 |   |
| 4 |   |
| 5 |   |

:::


:::teacher-note

**Answer:** 1, 2, 0, 1, 2

Dividing by 3 leaves a remainder of 0, 1 or 2, then it starts again. i % 3 == 0 is true for 0, 3, 6, 9: every third pass.

:::


:::keep-together

### What does % give?

**What does 7 % 2 work out to?**

☐ 0

☐ 1

☐ 3

☐ 3.5

:::


:::teacher-note

**Answer:** 1

2 fits into 7 three times (6), and 1 is left over. So 7 % 2 is 1.

:::


:::keep-together

### Count the red sides

**The loop runs for i = 0 to 9 (ten passes). How many are red with if i % 2 == 0?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 5

The red passes are i = 0, 2, 4, 6 and 8, so there are five.

:::


:::typical

## Modify

Make every **third** side green and keep the red and blue taking turns on the rest. Use `elif`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

pensize(6)
for i in range(8):
    if i % 3 == 0:
        pencolor("green")
    elif i % 2 == 0:
        pencolor("red")
    else:
        pencolor("blue")
    forward(30)
    right(45)
```

:::

:::


## Mix it up


```python
from turtle import *

pensize(6)
for i in range(8):
    if i % 3 == 0:
        pencolor("green")
    elif i % 2 == 0:
        pencolor("red")
    else:
        pencolor("blue")
    forward(30)
    right(45)
```

:::keep-together

### Which check wins?

**On pass i = 6, both i % 3 == 0 and i % 2 == 0 are true. Which colour is the side?**

☐ Green: the first true check wins

☐ Blue: the else covers them

☐ Red: the last true check wins

☐ Both: the side is drawn twice

:::


:::teacher-note

**Answer:** Green: the first true check wins

Python asks the checks in order and stops at the first true one. 6 % 3 == 0 is asked first, so the side is green and the elif is never asked.

:::


:::keep-together

### Work out the length

**size = 30 and the line is forward(size + (i % 2) * 20). How long is the line on pass i = 3?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 50

3 % 2 is 1, so the line is 30 + 1 * 20 = 50. On even passes the remainder is 0, so the line is 30.

:::


## Exit ticket

:::keep-together

**A loop colours pass i red if i % 2 == 0, else blue. What colour is pass 5, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Blue. 5 % 2 is 1, so the condition is false and the else path runs.

:::

