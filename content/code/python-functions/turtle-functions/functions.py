# region: copies
from turtle import *

for i in range(4):
    forward(100)
    right(90)

penup()
forward(150)
pendown()

for i in range(4):
    forward(100)
    right(90)

penup()
forward(150)
pendown()

for i in range(4):
    forward(100)
    right(90)
# endregion

# region: def
from turtle import *


def square():
    for i in range(4):
        forward(100)
        right(90)


square()
penup()
forward(150)
pendown()
square()
penup()
forward(150)
pendown()
square()
# endregion

# region: modify
from turtle import *


def square():
    for i in range(4):
        forward(100)
        right(90)


square()

# Write def triangle(): below, then call it after the square.
# endregion

# region: make
from turtle import *

# Write a function that draws a shape of your choice, then call it three times in a row.
# endregion

# region: house
from turtle import *


def wall():
    for i in range(4):
        forward(100)
        right(90)


def roof():
    left(60)
    forward(100)
    right(120)
    forward(100)
    right(120)
    forward(100)
    right(180)


wall()
roof()
# endregion

# region: parsons
def square():
    for i in range(4):
        forward(100)
        right(90)


square()
# endregion

# region: sol-resize
from turtle import *


def square():
    for i in range(4):
        forward(50)
        right(90)


square()
# endregion

# region: sol-triangle
from turtle import *


def square():
    for i in range(4):
        forward(100)
        right(90)


def triangle():
    for i in range(3):
        forward(100)
        right(120)


square()
triangle()
# endregion

# region: sol-both
from turtle import *


def square():
    for i in range(4):
        forward(100)
        right(90)


def triangle():
    for i in range(3):
        forward(100)
        right(120)


def gap():
    penup()
    forward(130)
    pendown()


square()
gap()
triangle()
gap()
square()
# endregion

# region: sol-make
from turtle import *


def hexagon():
    for i in range(6):
        forward(40)
        right(60)


def gap():
    penup()
    forward(100)
    pendown()


penup()
goto(-180, 0)
pendown()
hexagon()
gap()
hexagon()
gap()
hexagon()
# endregion

# region: sol-door
from turtle import *


def wall():
    for i in range(4):
        forward(100)
        right(90)


def roof():
    left(60)
    forward(100)
    right(120)
    forward(100)
    right(120)
    forward(100)
    right(180)


def door():
    penup()
    forward(40)
    right(90)
    forward(60)
    left(90)
    pendown()
    for i in range(2):
        forward(20)
        right(90)
        forward(40)
        right(90)


wall()
roof()
door()
# endregion
