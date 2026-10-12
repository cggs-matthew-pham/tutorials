---
title: "Many turtles"
subtitle: "Objects with turtles · Many things on screen · Lesson 1"
---

# Many turtles

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every game has many things moving at once: enemies, coins, bullets, clouds. Each one is an object with its own position and its own commands.


:::teacher-note

**In one sentence:** Students make extra turtles with Turtle(), give each one commands by name, and play a catch-the-stars game built from three separate star variables, so they can count what each star costs in code.

**Students should be able to say:** I can make a new turtle with Turtle() and give it commands by name. I can explain which turtle a command without a name in front goes to. I can work out how much code each extra object costs when every one has its own variable.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`a = Turtle()` makes a turtle and names it `a`. `a.forward(100)` gives the command to `a` only. Read the program: how many turtles will you see?

```python
from turtle import *

a = Turtle()
b = Turtle()
b.color("red")
a.forward(100)
b.left(90)
b.forward(50)
```

:::keep-together

**How many turtles are on the screen when it finishes?**

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 2: a and b. Every command has a name in front of it, so the turtle you used in the turtle course (the default turtle) is never used, and Python does not draw it.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
from turtle import *
import random

speed(0)
penup()
goto(0, -180)
left(90)
score = 0

pen = Turtle()
pen.hideturtle()
pen.penup()
pen.goto(-220, 200)

s1 = Turtle()
s1.shape("circle")
s1.color("gold")
s1.penup()
s1.goto(-120, 200)
s1.setheading(270)

s2 = Turtle()
s2.shape("circle")
s2.color("gold")
s2.penup()
s2.goto(0, 200)
s2.setheading(270)

s3 = Turtle()
s3.shape("circle")
s3.color("gold")
s3.penup()
s3.goto(120, 200)
s3.setheading(270)

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    s1.forward(4)
    if s1.distance(xcor(), ycor()) < 25:
        score += 1
        s1.goto(random.randint(-200, 200), 200)
    if s1.ycor() < -220:
        s1.goto(random.randint(-200, 200), 200)
    s2.forward(6)
    if s2.distance(xcor(), ycor()) < 25:
        score += 1
        s2.goto(random.randint(-200, 200), 200)
    if s2.ycor() < -220:
        s2.goto(random.randint(-200, 200), 200)
    s3.forward(3)
    if s3.distance(xcor(), ycor()) < 25:
        score += 1
        s3.goto(random.randint(-200, 200), 200)
    if s3.ycor() < -220:
        s3.goto(random.randint(-200, 200), 200)
    show_score()
    ontimer(tick, 50)

onkey(go_left, "Left")
onkey(go_right, "Right")
listen()
show_score()
tick()
mainloop()
```

:::keep-together

### Match the lines

**Match each line with what it does.**

A. moves s1 only

B. writes the score with the hidden pen turtle

C. moves you, the turtle at the bottom

D. makes a new turtle and names it s1

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `s1 = Turtle()` | |
| `s1.forward(4)` | |
| `goto(xcor() - 25, ycor())` | |
| `pen.write(...)` | |

:::


:::teacher-note

**Answer:** s1 = Turtle() → D. makes a new turtle and names it s1; s1.forward(4) → A. moves s1 only; goto(xcor() - 25, ycor()) → C. moves you, the turtle at the bottom; pen.write(...) → B. writes the score with the hidden pen turtle

:::


:::keep-together

### Count the cost

**Count the lines that mention s1 (making it, moving it, catching it, sending it back to the top). How many are there?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 11

Six lines make s1, then five more in tick move it, catch it and send it back. Every star costs those 11 lines again, so twenty stars would need about 220.

:::


:::keep-together

### Spot the bug

**This should draw a red line to the right and a blue line straight up. The blue line goes right instead, and a third turtle appears. Click the line that causes it.**

```
 1  from turtle import *
 2  
 3  a = Turtle()
 4  b = Turtle()
 5  a.color("red")
 6  b.color("blue")
 7  a.forward(100)
 8  left(90)
 9  b.forward(100)
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 8

left(90) has no name in front, so it turns the default turtle (which then appears) instead of b. It should be b.left(90).

:::


:::typical

## Modify


**A blue star.** Make `s2` **blue** and faster than the others.

**A fourth star.** Add a fourth star, `s4`. Count how many lines it took.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A blue star:**

```python
from turtle import *
import random

speed(0)
penup()
goto(0, -180)
left(90)
score = 0

pen = Turtle()
pen.hideturtle()
pen.penup()
pen.goto(-220, 200)

s1 = Turtle()
s1.shape("circle")
s1.color("gold")
s1.penup()
s1.goto(-120, 200)
s1.setheading(270)

s2 = Turtle()
s2.shape("circle")
s2.color("blue")
s2.penup()
s2.goto(0, 200)
s2.setheading(270)

s3 = Turtle()
s3.shape("circle")
s3.color("gold")
s3.penup()
s3.goto(120, 200)
s3.setheading(270)

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    s1.forward(4)
    if s1.distance(xcor(), ycor()) < 25:
        score += 1
        s1.goto(random.randint(-200, 200), 200)
    if s1.ycor() < -220:
        s1.goto(random.randint(-200, 200), 200)
    s2.forward(9)
    if s2.distance(xcor(), ycor()) < 25:
        score += 1
        s2.goto(random.randint(-200, 200), 200)
    if s2.ycor() < -220:
        s2.goto(random.randint(-200, 200), 200)
    s3.forward(3)
    if s3.distance(xcor(), ycor()) < 25:
        score += 1
        s3.goto(random.randint(-200, 200), 200)
    if s3.ycor() < -220:
        s3.goto(random.randint(-200, 200), 200)
    show_score()
    ontimer(tick, 50)

onkey(go_left, "Left")
onkey(go_right, "Right")
listen()
show_score()
tick()
mainloop()
```

**A fourth star:**

```python
from turtle import *
import random

speed(0)
penup()
goto(0, -180)
left(90)
score = 0

pen = Turtle()
pen.hideturtle()
pen.penup()
pen.goto(-220, 200)

s1 = Turtle()
s1.shape("circle")
s1.color("gold")
s1.penup()
s1.goto(-120, 200)
s1.setheading(270)

s2 = Turtle()
s2.shape("circle")
s2.color("gold")
s2.penup()
s2.goto(0, 200)
s2.setheading(270)

s3 = Turtle()
s3.shape("circle")
s3.color("gold")
s3.penup()
s3.goto(120, 200)
s3.setheading(270)

s4 = Turtle()
s4.shape("circle")
s4.color("gold")
s4.penup()
s4.goto(60, 200)
s4.setheading(270)

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    s1.forward(4)
    if s1.distance(xcor(), ycor()) < 25:
        score += 1
        s1.goto(random.randint(-200, 200), 200)
    if s1.ycor() < -220:
        s1.goto(random.randint(-200, 200), 200)
    s2.forward(6)
    if s2.distance(xcor(), ycor()) < 25:
        score += 1
        s2.goto(random.randint(-200, 200), 200)
    if s2.ycor() < -220:
        s2.goto(random.randint(-200, 200), 200)
    s3.forward(3)
    if s3.distance(xcor(), ycor()) < 25:
        score += 1
        s3.goto(random.randint(-200, 200), 200)
    if s3.ycor() < -220:
        s3.goto(random.randint(-200, 200), 200)
    s4.forward(5)
    if s4.distance(xcor(), ycor()) < 25:
        score += 1
        s4.goto(random.randint(-200, 200), 200)
    if s4.ycor() < -220:
        s4.goto(random.randint(-200, 200), 200)
    show_score()
    ontimer(tick, 50)

onkey(go_left, "Left")
onkey(go_right, "Right")
listen()
show_score()
tick()
mainloop()
```

:::

:::


## Make a rock

Add a **rock**: a grey square (`rock.shape("square")`) that falls like a star but **costs 3 points** if it touches you. It needs its own lines to make it, move it, and check whether it touched you.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *
import random

speed(0)
penup()
goto(0, -180)
left(90)
score = 0

pen = Turtle()
pen.hideturtle()
pen.penup()
pen.goto(-220, 200)

s1 = Turtle()
s1.shape("circle")
s1.color("gold")
s1.penup()
s1.goto(-120, 200)
s1.setheading(270)

s2 = Turtle()
s2.shape("circle")
s2.color("gold")
s2.penup()
s2.goto(0, 200)
s2.setheading(270)

s3 = Turtle()
s3.shape("circle")
s3.color("gold")
s3.penup()
s3.goto(120, 200)
s3.setheading(270)

rock = Turtle()
rock.shape("square")
rock.color("gray")
rock.penup()
rock.goto(-60, 200)
rock.setheading(270)

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    s1.forward(4)
    if s1.distance(xcor(), ycor()) < 25:
        score += 1
        s1.goto(random.randint(-200, 200), 200)
    if s1.ycor() < -220:
        s1.goto(random.randint(-200, 200), 200)
    s2.forward(6)
    if s2.distance(xcor(), ycor()) < 25:
        score += 1
        s2.goto(random.randint(-200, 200), 200)
    if s2.ycor() < -220:
        s2.goto(random.randint(-200, 200), 200)
    s3.forward(3)
    if s3.distance(xcor(), ycor()) < 25:
        score += 1
        s3.goto(random.randint(-200, 200), 200)
    if s3.ycor() < -220:
        s3.goto(random.randint(-200, 200), 200)
    rock.forward(5)
    if rock.distance(xcor(), ycor()) < 25:
        score -= 3
        rock.goto(random.randint(-200, 200), 200)
    if rock.ycor() < -220:
        rock.goto(random.randint(-200, 200), 200)
    show_score()
    ontimer(tick, 50)

onkey(go_left, "Left")
onkey(go_right, "Right")
listen()
show_score()
tick()
mainloop()
```

:::


:::wider

## Where this leads

Separate names work for three stars and break down for fifty. The rest of this course tidies the game step by step: a list of stars, then one dictionary per star, then a `Star` class of your own.

:::


## Exit ticket

:::keep-together

**a = Turtle(), then forward(50). Which turtle moves?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The default turtle, not a: forward(50) has no name in front. a.forward(50) would move a.

:::

