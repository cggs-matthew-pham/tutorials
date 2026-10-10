# region: use
from turtle import *
from shapes import square, triangle

square(80)
triangle(80)
# endregion

# region: move
from turtle import *


def wall(size):
    for i in range(4):
        forward(size)
        right(80)


def roof(size):
    left(60)
    forward(size)
    right(120)
    forward(size)
    right(120)
    forward(size)
    right(180)


def house(size):
    wall(size)
    roof(size)


house(60)
# endregion

# region: make
from turtle import *

# Create a module of your own with several functions, then import it here and use it.
# endregion

# region: street
from turtle import *
from shapes import square, triangle

for i in range(4):
    square(60)
    triangle(60)
    penup()
    forward(80)
    pendown()
# endregion

# region: copies
# file: program_a.py
from turtle import *


def wall(size):
    for i in range(4):
        forward(size)
        right(80)


wall(60)

# file: program_b.py
from turtle import *


def wall(size):
    for i in range(4):
        forward(size)
        right(80)


wall(100)
# endregion

# region: sol-move
# file: main.py
from turtle import *
from house_parts import house

house(60)

# file: house_parts.py
from turtle import *


def wall(size):
    for i in range(4):
        forward(size)
        right(360 / 4)


def roof(size):
    left(60)
    forward(size)
    right(120)
    forward(size)
    right(120)
    forward(size)
    right(180)


def house(size):
    wall(size)
    roof(size)
# endregion

# region: sol-make
# file: main.py
from turtle import *
from garden import tree, flower, fence

speed(0)
penup()
goto(-180, -80)
pendown()
fence(18)
penup()
goto(-120, -80)
pendown()
tree(60)
penup()
goto(60, -80)
pendown()
flower(25)

# file: garden.py
from turtle import *


def tree(height):
    """A trunk and a round top."""
    setheading(90)
    pencolor("brown")
    forward(height)
    pencolor("green")
    dot(height)
    setheading(0)


def flower(size):
    """Five petals round a centre."""
    pencolor("purple")
    for i in range(5):
        circle(size / 2)
        left(72)
    dot(size / 2, "gold")


def fence(posts):
    """A row of fence posts, 20 apart."""
    setheading(0)
    pencolor("grey")
    for i in range(posts):
        left(90)
        forward(30)
        backward(30)
        right(90)
        forward(20)
# endregion

# region: sol-street
from turtle import *
from shapes import square, triangle

for i in range(5):
    square(60 + i * 10)
    pencolor("red")
    triangle(60 + i * 10)
    pencolor("black")
    penup()
    forward(110)
    pendown()
# endregion
