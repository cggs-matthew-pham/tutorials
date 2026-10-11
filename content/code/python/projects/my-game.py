from turtle import *
import random

speed(0)
penup()
shape("circle")
color("tomato")
score = 0
lives = 5
caught = True
playing = True


def show():
    clear()
    here = position()
    goto(-190, 160)
    write("Score " + str(score) + "   Lives " + str(lives), False, "left", ("Arial", 16, "normal"))
    goto(here)


def move():
    global lives, caught, playing
    if not caught:
        lives = lives - 1
    if lives == 0 or score >= 10:
        playing = False
        show()
        hideturtle()
        return
    caught = False
    goto(random.randint(-150, 150), random.randint(-120, 120))
    show()
    ontimer(move, 1200)


def clicked(x, y):
    global score, caught
    if playing and not caught and abs(x - xcor()) < 20 and abs(y - ycor()) < 20:
        score = score + 1
        caught = True
        show()


onscreenclick(clicked)
move()
mainloop()
