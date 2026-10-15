---
title: "Stars that move themselves"
subtitle: "Objects with turtles · Classes · Lesson 5"
---

# Stars that move themselves

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** In a game engine you never move every enemy by hand: you tell each enemy to update itself, and it knows how.


:::teacher-note

**In one sentence:** Students give the Star class methods (move, restart, touches), so the game loop asks each star to act, then add methods of their own and a Rock class with the same method names.

**Students should be able to say:** I can write a method (a def inside a class, with self first) and call it on an object. I can explain why behaviour belongs inside the class. I can add a second class with the same method names, so the game treats both kinds alike.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`def add(self, n):` inside the class is a **method**. `c.add(2)` runs it for `c`: `self` is `c` and `n` is 2. What does it print?

```python
class Counter:
    def __init__(self):
        self.count = 0

    def add(self, n):
        self.count = self.count + n

c = Counter()
c.add(2)
c.add(5)
print(c.count)
```

:::keep-together

**What number does it print?**

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 7. c starts at 0; c.add(2) makes it 2 and c.add(5) makes it 7. Each call runs add with self as c.

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

    def move(self):
        self.turtle.forward(self.speed)
        if self.turtle.ycor() < -220:
            self.restart()

    def restart(self):
        self.turtle.goto(random.randint(-200, 200), 200)

    def touches(self, x, y):
        return self.turtle.distance(x, y) < 25

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
        star.move()
        if star.touches(xcor(), ycor()):
            score += star.points
            star.restart()
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

### Match the calls

**Match each call with what it does.**

A. puts this star back at the top

B. makes a new star

C. gives True if this star is close to you

D. moves this star down, and sends it back to the top if it falls off

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `star.move()` | |
| `star.restart()` | |
| `star.touches(xcor(), ycor())` | |
| `Star(-150 + i * 100)` | |

:::


:::teacher-note

**Answer:** star.move() → D. moves this star down, and sends it back to the top if it falls off; star.restart() → A. puts this star back at the top; star.touches(xcor(), ycor()) → C. gives True if this star is close to you; Star(-150 + i * 100) → B. makes a new star

:::


:::keep-together

### Where does it belong?

**You want stars to fall faster as the game goes on. Where would that change go?**

☐ In go_left

☐ Inside the Star class (in move, or a new method)

☐ In a new list of speeds

☐ In every place a star is used

:::


:::teacher-note

**Answer:** Inside the Star class (in move, or a new method)

How a star behaves belongs to the Star class. Change it there once and every star follows.

:::


:::keep-together

### Spot the bug

**This stops with TypeError: faster() takes 0 positional arguments but 1 was given. Click the line that causes it.**

```
 1  class Star:
 2      def __init__(self):
 3          self.speed = 5
 4  
 5      def faster():
 6          self.speed = self.speed + 1
 7  
 8  s = Star()
 9  s.faster()
10  print(s.speed)
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 5

Python passes the star itself as the first argument of every method, so the method needs self: def faster(self):.

:::


:::typical

## Modify


**Flash.** Add a method `flash` that turns a star **orange**, and call it when a star is caught.

**Level up.** Add a method `level_up` that makes a caught star worth one more point and a little faster.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Flash:**

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

    def move(self):
        self.turtle.forward(self.speed)
        if self.turtle.ycor() < -220:
            self.restart()

    def restart(self):
        self.turtle.goto(random.randint(-200, 200), 200)

    def touches(self, x, y):
        return self.turtle.distance(x, y) < 25

    def flash(self):
        self.turtle.color("orange")

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
        star.move()
        if star.touches(xcor(), ycor()):
            score += star.points
            star.flash()
            star.restart()
    show_score()
    ontimer(tick, 50)

onkey(go_left, "Left")
onkey(go_right, "Right")
listen()
show_score()
tick()
mainloop()
```

**Level up:**

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

    def move(self):
        self.turtle.forward(self.speed)
        if self.turtle.ycor() < -220:
            self.restart()

    def restart(self):
        self.turtle.goto(random.randint(-200, 200), 200)

    def touches(self, x, y):
        return self.turtle.distance(x, y) < 25

    def level_up(self):
        self.points += 1
        self.speed += 1

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
        star.move()
        if star.touches(xcor(), ycor()):
            score += star.points
            star.level_up()
            star.restart()
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


## Make rocks that move themselves

Add a **Rock** class with the same three methods as `Star` (`move`, `restart`, `touches`). Make two rocks, and in `tick` ask each rock to move and to check whether it touches you. A rock costs **3 points**. How many lines in `tick` did the rocks need?

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

    def move(self):
        self.turtle.forward(self.speed)
        if self.turtle.ycor() < -220:
            self.restart()

    def restart(self):
        self.turtle.goto(random.randint(-200, 200), 200)

    def touches(self, x, y):
        return self.turtle.distance(x, y) < 25

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

    def move(self):
        self.turtle.forward(self.speed)
        if self.turtle.ycor() < -220:
            self.restart()

    def restart(self):
        self.turtle.goto(random.randint(-200, 200), 200)

    def touches(self, x, y):
        return self.turtle.distance(x, y) < 25

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
        star.move()
        if star.touches(xcor(), ycor()):
            score += star.points
            star.restart()
    for rock in rocks:
        rock.move()
        if rock.touches(xcor(), ycor()):
            score -= 3
            rock.restart()
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

You started with 11 lines per star. Now a star is one line, `Star(x)`, and each kind of thing knows how to move itself. Game engines such as microStudio and MakeCode Arcade work this way: sprites are objects, and you write how they behave.

:::


## Exit ticket

:::keep-together

**class Lamp: def __init__(self): self.on = False. Write a method switch that turns it on.**

{{lines-3}}

:::


:::teacher-note

**Answer:** def switch(self): self.on = True (inside the class), called as lamp.switch().

:::

