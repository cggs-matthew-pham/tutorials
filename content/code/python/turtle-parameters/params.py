# region: nested
from turtle import *


def square(size):
    for i in range(4):
        forward(size)
        right(90)


square(50)
square(100)
square(150)
# endregion

# region: polygon
from turtle import *


def polygon(sides, size):
    angle = 360 / sides
    for i in range(sides):
        forward(size)
        right(angle)


polygon(3, 80)
polygon(4, 80)
polygon(6, 80)
# endregion

# region: make
from turtle import *


def polygon(sides, size):
    angle = 360 / sides
    for i in range(sides):
        forward(size)
        right(angle)


# Write def pattern(sides, copies): below. It draws a polygon, turns a little, and repeats.
# endregion

# region: rooms
from turtle import *

scale = 20  # pixels per metre


def room(width, depth):
    for i in range(2):
        forward(width * scale)
        right(90)
        forward(depth * scale)
        right(90)


def move_to(x, y):
    penup()
    goto(x * scale, y * scale)
    pendown()


move_to(-8, 4)
room(5, 4)    # bedroom
move_to(-3, 4)
room(4, 4)    # kitchen
move_to(-8, 0)
room(9, 3)    # living room
# endregion

# region: sol-fourth
from turtle import *


def polygon(sides, size):
    angle = 360 / sides
    for i in range(sides):
        forward(size)
        right(angle)


polygon(3, 80)
polygon(4, 80)
polygon(6, 80)
polygon(8, 50)
# endregion

# region: sol-colour
from turtle import *


def polygon(sides, size, colour):
    pencolor(colour)
    angle = 360 / sides
    for i in range(sides):
        forward(size)
        right(angle)


polygon(3, 80, "red")
polygon(4, 80, "blue")
polygon(6, 80, "green")
polygon(8, 50, "purple")
# endregion

# region: sol-pattern
from turtle import *


def polygon(sides, size):
    angle = 360 / sides
    for i in range(sides):
        forward(size)
        right(angle)


def pattern(sides, copies):
    for i in range(copies):
        polygon(sides, 60)
        right(360 / copies)


speed(0)
pattern(5, 12)
# endregion

# region: sol-rooms
from turtle import *

scale = 15  # pixels per metre


def room(width, depth):
    for i in range(2):
        forward(width * scale)
        right(90)
        forward(depth * scale)
        right(90)


def move_to(x, y):
    penup()
    goto(x * scale, y * scale)
    pendown()


move_to(-8, 4)
room(5, 4)    # bedroom
move_to(1, 4)
room(4, 4)    # kitchen, moved to the right
move_to(-3, 4)
room(4, 2)    # bathroom
move_to(-8, 0)
room(9, 3)    # living room
# endregion
