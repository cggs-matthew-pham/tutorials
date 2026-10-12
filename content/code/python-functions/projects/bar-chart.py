from turtle import *

speed(0)
hours = [2, 3, 1, 4, 6, 5, 2]


def colour_for(value):
    if value >= 5:
        return "tomato"
    elif value >= 3:
        return "gold"
    return "mediumseagreen"


def bar(height, colour):
    fillcolor(colour)
    pendown()
    begin_fill()
    left(90)
    forward(height)
    right(90)
    forward(30)
    right(90)
    forward(height)
    left(90)
    end_fill()
    penup()
    forward(10)


penup()
goto(-180, -100)
for h in hours:
    bar(h * 30, colour_for(h))
hideturtle()
