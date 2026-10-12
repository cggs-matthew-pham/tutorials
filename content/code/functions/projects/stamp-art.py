from turtle import *

speed(0)
penup()
hideturtle()
colours = ["tomato", "gold", "teal", "purple"]
c = 0
size = 30
squares = False


def square(length):
    pendown()
    fillcolor(colours[c])
    begin_fill()
    for side in range(4):
        forward(length)
        left(90)
    end_fill()
    penup()


def draw_here(x, y):
    goto(x, y)
    if squares:
        square(size)
    else:
        dot(size, colours[c])


def next_colour():
    global c
    c = (c + 1) % len(colours)


def bigger():
    global size
    size = size + 10


def switch_shape():
    global squares
    squares = not squares


for x in range(-150, 151, 75):
    draw_here(x, 0)
    next_colour()
onscreenclick(draw_here)
onkey(next_colour, "c")
onkey(bigger, "b")
onkey(switch_shape, "s")
listen()
mainloop()
