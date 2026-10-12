# region: stamp
from turtle import *

speed(0)
penup()


def stamp(x, y):
    goto(x, y)
    dot(30, "orange")


onscreenclick(stamp)
listen()
mainloop()
# endregion

# region: keys
from turtle import *

speed(0)


def go_up():
    setheading(90)
    forward(20)


def go_down():
    setheading(270)
    forward(20)


onkey(go_up, "Up")
onkey(go_down, "Down")
listen()
mainloop()
# endregion

# region: modify
from turtle import *

speed(0)
penup()


def stamp(x, y):
    goto(x, y)
    dot(30, "orange")


onscreenclick(stamp)
listen()
mainloop()

# Change the size and colour of the dot. Then make each click stamp a square instead.
# endregion

# region: make
from turtle import *

speed(0)

# Make the arrow keys steer the turtle:
#   Up moves forward 20, Left turns left 30, Right turns right 30.
# Remember: onkey( ) wants the function's name with no brackets, and listen( ) and mainloop( ) go last.
# endregion

# region: counter
from turtle import *

hideturtle()
score = 0
penup()
goto(-20, 0)


def add_point(x, y):
    global score
    score = score + 1
    clear()
    write(score, False, "left", ("Arial", 40, "normal"))


onscreenclick(add_point)
listen()
mainloop()
# endregion

# region: walk
from turtle import *

speed(0)


def step():
    forward(5)
    ontimer(step, 50)


step()
mainloop()
# endregion

# region: bug
from turtle import *

def stamp(x, y):
    goto(x, y)
    dot(30)

onscreenclick(stamp())
mainloop()
# endregion

# region: sol-restyle
from turtle import *

speed(0)
penup()


def stamp(x, y):
    goto(x, y)
    dot(50, "purple")


onscreenclick(stamp)
listen()
mainloop()
# endregion

# region: sol-square
from turtle import *

speed(0)
penup()


def stamp(x, y):
    goto(x, y)
    pendown()
    for i in range(4):
        forward(30)
        right(90)
    penup()


onscreenclick(stamp)
listen()
mainloop()
# endregion

# region: sol-steer
from turtle import *

speed(0)


def go_up():
    forward(20)


def turn_left():
    left(30)


def turn_right():
    right(30)


onkey(go_up, "Up")
onkey(turn_left, "Left")
onkey(turn_right, "Right")
listen()
mainloop()
# endregion

# region: sol-counter
from turtle import *

hideturtle()
score = 0
penup()
goto(-20, 0)


def show():
    clear()
    write(score, False, "left", ("Arial", 40, "normal"))


def add_point(x, y):
    global score
    score = score + 5
    show()


def reset():
    global score
    score = 0
    show()


def tick():
    global score
    score = score + 1
    show()
    ontimer(tick, 1000)


show()
onscreenclick(add_point)
onkey(reset, "r")
ontimer(tick, 1000)
listen()
mainloop()
# endregion
