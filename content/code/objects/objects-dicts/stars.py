# region: predict
star = {"speed": 5, "points": 2}
star["points"] = star["points"] + 1
print(star["speed"], star["points"])
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
for i in range(4):
    s = Turtle()
    s.shape("circle")
    s.penup()
    s.goto(-150 + i * 100, 200)
    s.setheading(270)
    stars.append({
        "turtle": s,
        "speed": random.randint(3, 7),
        "points": 1,
    })

for star in stars:
    star["turtle"].color("gold")

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
        star["turtle"].forward(star["speed"])
        if star["turtle"].distance(xcor(), ycor()) < 25:
            score += star["points"]
            star["turtle"].goto(random.randint(-200, 200), 200)
        if star["turtle"].ycor() < -220:
            star["turtle"].goto(random.randint(-200, 200), 200)
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
stars = [{"speed": 5, "points": 1}, {"speed": 3, "points": 5}]
for star in stars:
    print(star[speed] * 2)
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
for i in range(4):
    s = Turtle()
    s.shape("circle")
    s.penup()
    s.goto(-150 + i * 100, 200)
    s.setheading(270)
    stars.append({
        "turtle": s,
        "speed": random.randint(3, 7),
        "points": random.randint(1, 3),
    })

for star in stars:
    star["turtle"].color("gold")

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
        star["turtle"].forward(star["speed"])
        if star["turtle"].distance(xcor(), ycor()) < 25:
            score += star["points"]
            star["turtle"].goto(random.randint(-200, 200), 200)
        if star["turtle"].ycor() < -220:
            star["turtle"].goto(random.randint(-200, 200), 200)
    show_score()
    ontimer(tick, 50)

onkey(go_left, "Left")
onkey(go_right, "Right")
listen()
show_score()
tick()
mainloop()
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

colours = ["gold", "orange", "yellow"]
stars = []
for i in range(4):
    s = Turtle()
    s.shape("circle")
    s.penup()
    s.goto(-150 + i * 100, 200)
    s.setheading(270)
    stars.append({
        "turtle": s,
        "speed": random.randint(3, 7),
        "points": 1,
        "colour": colours[i % 3],
    })

for star in stars:
    star["turtle"].color(star["colour"])

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
        star["turtle"].forward(star["speed"])
        if star["turtle"].distance(xcor(), ycor()) < 25:
            score += star["points"]
            star["turtle"].goto(random.randint(-200, 200), 200)
        if star["turtle"].ycor() < -220:
            star["turtle"].goto(random.randint(-200, 200), 200)
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
for i in range(4):
    s = Turtle()
    s.shape("circle")
    s.penup()
    s.goto(-150 + i * 100, 200)
    s.setheading(270)
    stars.append({
        "turtle": s,
        "speed": random.randint(3, 7),
        "points": 1,
        "bad": i == 0,
    })

for star in stars:
    if star["bad"]:
        star["turtle"].color("red")
    else:
        star["turtle"].color("gold")

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
        star["turtle"].forward(star["speed"])
        if star["turtle"].distance(xcor(), ycor()) < 25:
            if star["bad"]:
                score -= 3
            else:
                score += star["points"]
            star["turtle"].goto(random.randint(-200, 200), 200)
        if star["turtle"].ycor() < -220:
            star["turtle"].goto(random.randint(-200, 200), 200)
    show_score()
    ontimer(tick, 50)

onkey(go_left, "Left")
onkey(go_right, "Right")
listen()
show_score()
tick()
mainloop()
# endregion
