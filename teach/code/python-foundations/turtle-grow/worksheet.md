---
title: "A value that grows"
subtitle: "Python Foundations with Turtle · Commands, loops and values · Lesson 5"
---

# A value that grows

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Scores go up, timers count down and bank balances change. All of them are a variable that works out its next value from its last one.


:::teacher-note

**In one sentence:** Students meet a variable that changes itself, size = size + 5, and use it to grow a spiral without the loop counter.

**Students should be able to say:** I can say what size = size + 5 does. I can use an update inside a loop to make a value grow. I can find an update that is in the wrong place.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`size = size + 5` is new. Read the code. Will the spiral look different from last lesson's?

```python
from turtle import *

size = 0

for i in range(30):
    forward(size)
    right(90)
    size = size + 5
```

:::keep-together

**Last lesson the spiral used the counter. This one uses size = size + 5. What will it draw?**

☐ A smaller spiral

☐ A bigger spiral

☐ The same spiral

☐ An error: size cannot equal size + 5

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The same spiral. size starts at 0 and grows by 5 on every pass: 0, 5, 10, 15. That is exactly what i * 5 gave last lesson.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

Follow the value as it changes.

```python
from turtle import *

size = 0

for i in range(30):
    forward(size)
    right(90)
    size = size + 5
```

:::keep-together

### Store it back

**A program has size = 20. Then it runs the line size = size + 5. What is stored in size afterwards?**

☐ 20 + 5

☐ Nothing: the line is an error

☐ 25

☐ 5

:::


:::teacher-note

**Answer:** 25

Read the line from the right. Python works out size + 5, which is 25, then stores 25 back in size. The = means store, not 'is equal to'.

:::


:::keep-together

### Watch it grow

Follow `size` round this loop, which adds to it every pass.

```python
size = 10

for i in range(4):
    forward(size)
    right(90)
    size = size + 10
```

**Fill in the size that forward(size) uses on each pass.**

{{rows 1}}

| pass | size used by forward(size) |
|---|---|
| 1 | 10 |
| 2 |   |
| 3 |   |
| 4 |   |

:::


:::teacher-note

**Answer:** 20, 30, 40

The last line of each pass stores size + 10 back in size, so the next pass starts with a bigger size. This is how a spiral grows.

:::


:::keep-together

### Spot the bug

**This should draw a growing spiral, but it draws one small square over and over. Click the wrong line.**

```
 1  from turtle import *
 2  
 3  size = 10
 4  
 5  for i in range(30):
 6      forward(size)
 7      right(90)
 8  size = size + 5
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 8

size = size + 5 is not indented, so it runs once, after the loop. Inside the loop it runs on every pass. Indent it under the for line.

:::


:::keep-together

### Same lengths, two ways

**Last lesson's lines were i * 5. This lesson's size starts at 0. Which update inside the loop gives the same lengths?**

☐ size = size + 5

☐ size = i

☐ size = size * 5

☐ size = 5

:::


:::teacher-note

**Answer:** size = size + 5

Adding 5 each pass gives 0, 5, 10, 15, the same as i * 5. size * 5 stays at 0, size = i gives 0, 1, 2, and size = 5 is always 5.

:::


:::typical

## Modify

Change the amount added each pass so the spiral grows faster. Run it after each change.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

size = 0

for i in range(30):
    forward(size)
    right(90)
    size = size + 10
```

:::

:::


## Make

Make the spiral grow **and** get thicker on every pass. The thickness should be a variable that updates itself, like `size` does.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

size = 0
width = 1

for i in range(30):
    pensize(width)
    forward(size)
    right(90)
    size = size + 5
    width = width + 0.5
```

:::


## Exit ticket

:::keep-together

**What does size = size + 5 do if size is 20?**

{{lines-3}}

:::


:::teacher-note

**Answer:** It works out 20 + 5 = 25 and stores 25 back in size.

:::

