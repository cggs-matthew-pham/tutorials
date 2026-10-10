# region: predict
speeds = [3, 8, 5, 6]
points = [1, 1, 5, 1]
print(speeds[2], points[2])
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

stars = []
speeds = []
points = []
for i in range(4):
    s = Turtle()
    s.shape("circle")
    s.color("gold")
    s.penup()
    s.goto(-150 + i * 100, 200)
    s.setheading(270)
    stars.append(s)
    speeds.append(random.randint(3, 7))
    points.append(1)

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    for i in range(len(stars)):
        stars[i].forward(speeds[i])
        if stars[i].distance(xcor(), ycor()) < 25:
            score += points[i]
            stars[i].goto(random.randint(-200, 200), 200)
        if stars[i].ycor() < -220:
            stars[i].goto(random.randint(-200, 200), 200)
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

stars = []
speeds = [3, 5, 4, 6]
for i in range(5):
    s = Turtle()
    s.penup()
    stars.append(s)

for i in range(len(stars)):
    stars[i].forward(speeds[i])
# endregion

# region: sol-six
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

stars = []
speeds = []
points = []
for i in range(6):
    s = Turtle()
    s.shape("circle")
    s.color("gold")
    s.penup()
    s.goto(-150 + i * 100, 200)
    s.setheading(270)
    stars.append(s)
    speeds.append(random.randint(3, 7))
    points.append(1)

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    for i in range(len(stars)):
        stars[i].forward(speeds[i])
        if stars[i].distance(xcor(), ycor()) < 25:
            score += points[i]
            stars[i].goto(random.randint(-200, 200), 200)
        if stars[i].ycor() < -220:
            stars[i].goto(random.randint(-200, 200), 200)
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

stars = []
speeds = []
points = []
for i in range(4):
    s = Turtle()
    s.shape("circle")
    s.color("gold")
    s.penup()
    s.goto(-150 + i * 100, 200)
    s.setheading(270)
    stars.append(s)
    speeds.append(random.randint(3, 7))
    points.append(random.randint(1, 3))

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    for i in range(len(stars)):
        stars[i].forward(speeds[i])
        if stars[i].distance(xcor(), ycor()) < 25:
            score += points[i]
            stars[i].goto(random.randint(-200, 200), 200)
        if stars[i].ycor() < -220:
            stars[i].goto(random.randint(-200, 200), 200)
    show_score()
    ontimer(tick, 50)

onkey(go_left, "Left")
onkey(go_right, "Right")
listen()
show_score()
tick()
mainloop()
# endregion

# region: sol-bad
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

stars = []
speeds = []
points = []
bad = []
for i in range(4):
    s = Turtle()
    s.shape("circle")
    s.color("gold")
    s.penup()
    s.goto(-150 + i * 100, 200)
    s.setheading(270)
    stars.append(s)
    speeds.append(random.randint(3, 7))
    points.append(1)
    if i == 0:
        bad.append(True)
        s.color("red")
    else:
        bad.append(False)

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    for i in range(len(stars)):
        stars[i].forward(speeds[i])
        if stars[i].distance(xcor(), ycor()) < 25:
            if bad[i]:
                score -= 3
            else:
                score += points[i]
            stars[i].goto(random.randint(-200, 200), 200)
        if stars[i].ycor() < -220:
            stars[i].goto(random.randint(-200, 200), 200)
    show_score()
    ontimer(tick, 50)

onkey(go_left, "Left")
onkey(go_right, "Right")
listen()
show_score()
tick()
mainloop()
# endregion
