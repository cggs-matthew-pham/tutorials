# region: predict
class Counter:
    def __init__(self):
        self.count = 0

    def add(self, n):
        self.count = self.count + n

c = Counter()
c.add(2)
c.add(5)
print(c.count)
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
# endregion

# region: bug
class Star:
    def __init__(self):
        self.speed = 5

    def faster():
        self.speed = self.speed + 1

s = Star()
s.faster()
print(s.speed)
# endregion

# region: sol-flash
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
# endregion

# region: sol-level
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
# endregion
