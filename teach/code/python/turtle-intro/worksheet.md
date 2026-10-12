---
title: "Drawing with a turtle"
subtitle: "Python Foundations with Turtle · Drawing and repeating · Lesson 1"
---

# Drawing with a turtle

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every animation, game character and robot is moved by a list of commands that run in order. Today you give the commands.


:::teacher-note

**In one sentence:** Students meet the turtle, read a short program that follows its commands in order, and learn that the order is the picture.

**Students should be able to say:** I can say what forward and right do to the turtle. I can say why the order of the commands matters. I can write a program of several commands that draws a shape.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Meet the commands

A program is a list of commands. The turtle follows them one at a time, from the top down.

| Line | What it does | Why |
|---|---|---|
| `from turtle import *` | Gives your program the turtle commands | Copy this to the top of every program for now. A later lesson shows how it works |
| `forward(100)` | Moves the turtle 100 steps and draws a line | The number is how far |
| `right(90)` | Turns the turtle a quarter turn, on the spot | It does not move or draw. 90 is a quarter of a full turn |
| `forward(100)` | Moves again, now in the new direction | The turn changed which way is forward |

`left(90)` turns the other way.

The order matters. The turtle does the first line first. Swap two lines and you get a different picture.

## Predict

Read the code and decide. Which picture will it draw?

```python
from turtle import *

forward(100)
right(90)
forward(50)
```

:::keep-together

**What will the turtle draw?**

☐ 50 steps across first, then 100 steps down

☐ An L: 100 steps across, a turn, then 50 steps down

☐ A line of 100 steps, then a line of 90 steps

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** An L. forward(100) draws across, right(90) turns without drawing, and forward(50) draws down. The turn is not a line (so not 90 steps), and the lines run in the order written (so 100 comes before 50).

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Put the lines in order

Look at the picture, then put the lines in the order that draws it.

```python
forward(100)
right(90)
forward(60)
right(90)
forward(30)
```

:::keep-together

**These five lines are mixed up. Put them in the order that draws the picture.**

A. `right(90)`

B. `forward(30)`

C. `forward(100)`

D. `forward(60)`

E. `right(90)`

Correct order (letters): {{field-24}}

:::


:::teacher-note

**Answer:** see the program below

The turtle draws 100 across, turns, draws 60, turns, then draws 30, so each line is shorter and the picture hooks inward. Any other order draws a different picture, because each turn changes which way the next forward goes.

```python
forward(100)
right(90)
forward(60)
right(90)
forward(30)
```

:::


## Make

Draw a square. Each side is 100 steps long. Write every command out, one after another. Next lesson shows a shorter way.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

forward(100)
right(90)
forward(100)
right(90)
forward(100)
right(90)
forward(100)
right(90)
```

:::


## Exit ticket

:::keep-together

**A turtle runs forward(100), right(90), forward(50). How many lines does it draw, and which is longer, the first or the second?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Two lines (the turn does not draw). The first is longer: 100 steps against 50.

:::

