# region: predict
class Pet:
    def __init__(self, name, legs):
        self.name = name
        self.legs = legs

a = Pet("Rex", 4)
b = Pet("Tweety", 2)
print(a.name, b.legs)
# endregion

# region: game
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
# endregion

# region: bug
class Star:
    def __init__(self, speed):
        speed = speed

s = Star(5)
print(s.speed)
# endregion

# region: sol-colour
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
# endregion

# region: sol-points
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
# endregion

# region: sol-rock
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
# endregion
