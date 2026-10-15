---
title: "Use the counter"
subtitle: "Python Foundations with Turtle · Commands, loops and values · Lesson 4"
---

# Use the counter

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Progress bars, animation frames and game levels all count. The loop counter is how code counts.


:::teacher-note

**In one sentence:** Students use the loop counter i to work out something different on every pass, and meet the fact that counting starts at 0.

**Students should be able to say:** I can say what i holds on each pass of a loop. I can use i in a calculation inside a loop. I can change a drawing by changing one number in that calculation.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`forward(i * 5)` uses the counter to work out how far to go. Read the code. What will the turtle draw?

```python
from turtle import *

for i in range(30):
    forward(i * 5)
    right(90)
```

:::keep-together

**What will the turtle draw?**

☐ a spiral that grows outward

☐ a square

☐ a circle

☐ nothing: i is never stored

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** A spiral. i is 0 on the first pass, 1 on the second, 2 on the third, so i * 5 is 0, 5, 10, and every line is longer than the last.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

Follow the counter round the loop, then use what you know about names.

```python
from turtle import *

for i in range(30):
    forward(i * 5)
    right(90)
```

:::keep-together

### Follow the counter

**Fill in the counter and the length of the line on each pass.**

{{rows 1}}

| pass | i | line length (i * 5) |
|---|---|---|
| 1 | 0 | 0 |
| 2 |   |   |
| 3 |   |   |
| 4 |   |   |

:::


:::teacher-note

**Answer:** 1, 5, 2, 10, 3, 15

i starts at 0 and goes up by 1 each pass, so i * 5 goes 0, 5, 10, 15. The first line is 0 long, so you never see it.

:::


:::keep-together

### Work out the turn

**A program has sides = 8 and turns right(360 / sides) on every pass of its loop. How many degrees is each turn?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 45

360 / 8 = 45. The name sides holds 8 each time the line runs.

:::


:::typical

## Modify


**Grow faster.** Change one number so the spiral grows faster.

**Thicker and thicker.** Use the counter to make the line thicker on every pass.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Grow faster:**

```python
from turtle import *

for i in range(30):
    forward(i * 10)
    right(90)
```

**Thicker and thicker:**

```python
from turtle import *

for i in range(30):
    pensize(i + 1)
    forward(i * 5)
    right(90)
```

:::

:::


## Exit ticket

:::keep-together

**In for i in range(5): forward(i * 10), what is the length of the third line?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 20. The third pass has i = 2, and 2 * 10 = 20.

:::

