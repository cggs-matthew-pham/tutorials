from turtle import *


def inside(x, y, bx, by, bw, bh):
    """Is the point (x, y) inside a button?"""
    return x > bx and x < bx + bw and y > by and y < by + bh


def draw_button(bx, by, bw, bh, label):
    """Draw a button with a label."""
    penup()
    goto(bx, by)
    pendown()
    for i in range(2):
        forward(bw)
        left(90)
        forward(bh)
        left(90)
    penup()
    goto(bx + 10, by + bh / 3)
    write(label)
