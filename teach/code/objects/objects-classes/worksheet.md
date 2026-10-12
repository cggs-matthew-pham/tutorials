---
title: "A Star class"
subtitle: "Objects with turtles · Classes · Lesson 4"
---

# A Star class

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Game engines are full of classes: one Enemy class, a hundred enemies made from it, each with its own position and health.


:::teacher-note

**In one sentence:** Students rebuild the stars game with a Star class, set up each star in __init__, store its values with self, and add a second class for rocks.

**Students should be able to say:** I can write a class with __init__ that stores values with self. I can make several objects from one class and read their values (star.speed). I can explain what self is inside __init__.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`class Pet:` describes a new kind of object. `__init__` (two underscores each side) runs every time one is made, and `self.name = name` stores the name **in that pet**. What does it print?

```python
class Pet:
    def __init__(self, name, legs):
        self.name = name
        self.legs = legs

a = Pet("Rex", 4)
b = Pet("Tweety", 2)
print(a.name, b.legs)
```

:::keep-together

**What does it print?**

☐ Rex 2

☐ Rex 4

☐ Tweety 2

☐ name legs

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Rex 2. Pet("Rex", 4) runs __init__ with name "Rex" and legs 4, and stores them in that pet. a.name is "Rex"; b is the other pet, so b.legs is 2.

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

class Star:
    def __init__(self, x):
        self.turtle = Turtle()
        self.turtle.shape("circle")
        self.turtle.color("gold")
        self.turtle.penup()
        self.turtle.goto(x, 200)
        self.turtle.setheading(270)
        self.speed = random.randint(3, 7)
        self.points = 1

stars = []
for i in range(4):
    stars.append(Star(-150 + i * 100))

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    for star in stars:
        star.turtle.forward(star.speed)
        if star.turtle.distance(xcor(), ycor()) < 25:
            score += star.points
            star.turtle.goto(random.randint(-200, 200), 200)
        if star.turtle.ycor() < -220:
            star.turtle.goto(random.randint(-200, 200), 200)
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

A. runs each time a star is made

B. makes a star, with x = -150 + i * 100

C. stores a speed in this star

D. describes a new kind of object

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `class Star:` | |
| `def __init__(self, x):` | |
| `self.speed = random.randint(3, 7)` | |
| `Star(-150 + i * 100)` | |

:::


:::teacher-note

**Answer:** class Star: → D. describes a new kind of object; def __init__(self, x): → A. runs each time a star is made; self.speed = random.randint(3, 7) → C. stores a speed in this star; Star(-150 + i * 100) → B. makes a star, with x = -150 + i * 100

:::


:::keep-together

### What is self?

**Inside __init__, what is self?**

☐ The star being made right now

☐ The class itself

☐ Every star at once

☐ The player

:::


:::teacher-note

**Answer:** The star being made right now

Each time Star(...) runs, self is the new star, so self.speed = ... stores a speed in that star only. Four stars, four speeds.

:::


:::keep-together

### Spot the bug

**This stops with AttributeError: 'Star' object has no attribute 'speed'. Click the line that causes it.**

```
 1  class Star:
 2      def __init__(self, speed):
 3          speed = speed
 4  
 5  s = Star(5)
 6  print(s.speed)
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

speed = speed only changes a variable inside __init__, which is thrown away when it ends. self.speed = speed stores it in the star.

:::


:::typical

## Modify


**A colour for each star.** Give `__init__` a **colour** parameter, and pass a colour in where the stars are made.

**Different points.** Give each star a random **1 to 3** points.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A colour for each star:**

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

class Star:
    def __init__(self, x, colour):
        self.turtle = Turtle()
        self.turtle.shape("circle")
        self.turtle.color(colour)
        self.turtle.penup()
        self.turtle.goto(x, 200)
        self.turtle.setheading(270)
        self.speed = random.randint(3, 7)
        self.points = 1

stars = []
for i in range(4):
    stars.append(Star(-150 + i * 100, "orange"))

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    for star in stars:
        star.turtle.forward(star.speed)
        if star.turtle.distance(xcor(), ycor()) < 25:
            score += star.points
            star.turtle.goto(random.randint(-200, 200), 200)
        if star.turtle.ycor() < -220:
            star.turtle.goto(random.randint(-200, 200), 200)
    show_score()
    ontimer(tick, 50)

onkey(go_left, "Left")
onkey(go_right, "Right")
listen()
show_score()
tick()
mainloop()
```

**Different points:**

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

class Star:
    def __init__(self, x):
        self.turtle = Turtle()
        self.turtle.shape("circle")
        self.turtle.color("gold")
        self.turtle.penup()
        self.turtle.goto(x, 200)
        self.turtle.setheading(270)
        self.speed = random.randint(3, 7)
        self.points = random.randint(1, 3)

stars = []
for i in range(4):
    stars.append(Star(-150 + i * 100))

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    for star in stars:
        star.turtle.forward(star.speed)
        if star.turtle.distance(xcor(), ycor()) < 25:
            score += star.points
            star.turtle.goto(random.randint(-200, 200), 200)
        if star.turtle.ycor() < -220:
            star.turtle.goto(random.randint(-200, 200), 200)
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


## Make a Rock class

Add a **Rock** class: a grey square that falls, with its own speed. Make a list of two rocks, move them in `tick` like the stars, and take **3 points** off when one touches you.

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

class Star:
    def __init__(self, x):
        self.turtle = Turtle()
        self.turtle.shape("circle")
        self.turtle.color("gold")
        self.turtle.penup()
        self.turtle.goto(x, 200)
        self.turtle.setheading(270)
        self.speed = random.randint(3, 7)
        self.points = 1

stars = []
for i in range(4):
    stars.append(Star(-150 + i * 100))

class Rock:
    def __init__(self, x):
        self.turtle = Turtle()
        self.turtle.shape("square")
        self.turtle.color("gray")
        self.turtle.penup()
        self.turtle.goto(x, 200)
        self.turtle.setheading(270)
        self.speed = random.randint(4, 8)

rocks = []
for i in range(2):
    rocks.append(Rock(-100 + i * 200))

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    for star in stars:
        star.turtle.forward(star.speed)
        if star.turtle.distance(xcor(), ycor()) < 25:
            score += star.points
            star.turtle.goto(random.randint(-200, 200), 200)
        if star.turtle.ycor() < -220:
            star.turtle.goto(random.randint(-200, 200), 200)
    for rock in rocks:
        rock.turtle.forward(rock.speed)
        if rock.turtle.distance(xcor(), ycor()) < 25:
            score -= 3
            rock.turtle.goto(random.randint(-200, 200), 200)
        if rock.turtle.ycor() < -220:
            rock.turtle.goto(random.randint(-200, 200), 200)
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

The stars and rocks still need the game to move them and check them one line at a time. Next lesson gives the class its own **methods**, so a star can move itself: `star.move()`.

:::


## Exit ticket

:::keep-together

**class Dog: def __init__(self, name): self.name = name. d = Dog("Rex"). What is d.name?**

{{lines-3}}

:::


:::teacher-note

**Answer:** "Rex": __init__ stored it in d with self.name = name.

:::

