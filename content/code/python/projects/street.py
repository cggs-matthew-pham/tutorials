from turtle import *

speed(0)


def house(x, size, colour):
    penup()
    goto(x, -60)
    pendown()
    fillcolor(colour)
    begin_fill()
    for side in range(4):
        forward(size)
        left(90)
    end_fill()
    fillcolor("brown")
    begin_fill()
    goto(x, -60 + size)
    goto(x + size / 2, -60 + size * 1.5)
    goto(x + size, -60 + size)
    goto(x, -60 + size)
    end_fill()


def tree(x, size):
    penup()
    goto(x, -60)
    pendown()
    fillcolor("sienna")
    begin_fill()
    for side in range(2):
        forward(size / 4)
        left(90)
        forward(size / 2)
        left(90)
    end_fill()
    penup()
    goto(x + size / 8, -60 + size / 2)
    pendown()
    fillcolor("green")
    begin_fill()
    circle(size / 3)
    end_fill()


street = [("house", 50, "lightblue"), ("tree", 70, ""), ("house", 70, "pink"), ("house", 40, "khaki"), ("tree", 60, "")]
x = -230
for thing in street:
    if thing[0] == "house":
        house(x, thing[1], thing[2])
    else:
        tree(x, thing[1])
    x = x + thing[1] + 25
hideturtle()
