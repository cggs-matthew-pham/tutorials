---
title: "Drawing with a turtle"
subtitle: "Python Foundations with Turtle · Commands, loops and values · Lesson 1"
---

# Drawing with a turtle

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every animation, game character and robot is moved by a list of commands that run in order. Today you give the commands.


:::teacher-note

**In one sentence:** Students meet the turtle, read a program that draws a digital 2, learn that the order of commands is the picture, and draw a 4 themselves.

**Students should be able to say:** I can say what forward, right and left do to the turtle. I can say why the order of the commands matters. I can write a program of several commands that draws a digit.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Meet the commands

A program is a list of commands. The turtle follows them one at a time, from the top down.

| Line | What it does | Why |
|---|---|---|
| `from turtle import *` | Gives your program the turtle commands | Copy this to the top of every program for now. A later lesson shows how it works |
| `forward(100)` | Moves the turtle 100 steps and draws a line | The number is how far |
| `right(90)` | Turns the turtle a quarter turn clockwise, on the spot | It does not move or draw. 90 is a quarter of a full turn |
| `left(90)` | Turns the turtle a quarter turn the other way | Also on the spot, also no line |
| `forward(100)` | Moves again, now in the new direction | The turn changed which way is forward |

The turtle starts in the middle, facing right. The order matters: swap two lines and you get a different picture.

## Predict

Read the code line by line, as if you were the turtle. Which picture will it draw?

```python
from turtle import *

forward(60)
right(90)
forward(60)
right(90)
forward(60)
left(90)
forward(60)
left(90)
forward(60)
```

:::keep-together

**What will the turtle draw?**

☐ The digit 2, like a calculator shows it

☐ A straight line, 300 steps long

☐ The digit 5, like a calculator shows it

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The digit 2. Five lines of 60, with a turn between each pair: across, down, across, down, across. The turns change direction without drawing (so not one straight line), and the first turn is right, so the turtle goes down on the right side first (so 2, not 5).

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Put the lines in order

Look at the picture, then put the lines in order.

```python
forward(60)
left(90)
forward(40)
right(90)
forward(60)
```

:::keep-together

**These five lines are mixed up. Put them in the order that draws the picture.**

A. `right(90)`

B. `forward(60)`

C. `forward(60)`

D. `forward(40)`

E. `left(90)`

Correct order (letters): {{field-24}}

:::


:::teacher-note

**Answer:** see the program below

The turtle goes across 60, turns left to face up, goes 40, turns right to face across again, then goes 60 more. Any other order draws a different picture, because each turn changes which way the next forward goes.

```python
forward(60)
left(90)
forward(40)
right(90)
forward(60)
```

:::


## Make

Draw a **4** like the one on a calculator: a short stroke down, a bar across, then one long stroke from top to bottom. Use bars of 50 steps. The turtle may draw over a line it has already drawn, so you do not need to lift the pen.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

right(90)
forward(50)
left(90)
forward(50)
left(90)
forward(50)
right(180)
forward(100)
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

