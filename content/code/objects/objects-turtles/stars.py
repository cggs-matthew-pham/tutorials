# region: predict
from turtle import *

a = Turtle()
b = Turtle()
b.color("red")
a.forward(100)
b.left(90)
b.forward(50)
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
# endregion

# region: bug
from turtle import *

a = Turtle()
b = Turtle()
a.color("red")
b.color("blue")
a.forward(100)
left(90)
b.forward(100)
# endregion

# region: sol-blue
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
# endregion

# region: sol-four
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
# endregion
