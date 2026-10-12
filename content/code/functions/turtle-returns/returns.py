# region: returns
from turtle import *

scale = 20


def metres(m):
    return m * scale


forward(metres(5))
right(90)
forward(metres(3))
# endregion

# region: print
from turtle import *

scale = 20


def metres(m):
    return m * scale


print(metres(5))
forward(metres(5))
right(90)
forward(metres(3))
# endregion

# region: modify
from turtle import *

scale = 20


def metres(m):
    return m * scale


def room(width, depth):
    for i in range(2):
        forward(metres(width))
        right(90)
        forward(metres(depth))
        right(90)


room(5, 4)

# Write def area(width, depth) that returns width * depth, then print the area of this room.
# endregion

# region: make
from turtle import *

# Draw a street of five houses.
# endregion

# region: street
from turtle import *


def house(size):
    for i in range(4):
        forward(size)
        right(90)
    left(60)
    forward(size)
    right(120)
    forward(size)
    right(120)
    forward(size)
    right(180)


def move(distance):
    penup()
    forward(distance)
    pendown()


for i in range(5):
    house(30 + i * 10)
    move(80)
# endregion

# region: bug
from turtle import *

scale = 20


def metres(m):
    print(m * scale)


forward(metres(5))
# endregion

# region: sol-area
from turtle import *

scale = 20


def metres(m):
    return m * scale


def room(width, depth):
    for i in range(2):
        forward(metres(width))
        right(90)
        forward(metres(depth))
        right(90)


def area(width, depth):
    return width * depth


room(5, 4)
# endregion

# region: sol-print
from turtle import *

scale = 20


def metres(m):
    return m * scale


def room(width, depth):
    for i in range(2):
        forward(metres(width))
        right(90)
        forward(metres(depth))
        right(90)


def area(width, depth):
    return width * depth


room(5, 4)
print(area(5, 4))
# endregion

# region: sol-house
from turtle import *


def house(size):
    for i in range(4):
        forward(size)
        right(90)
    left(60)
    forward(size)
    right(120)
    forward(size)
    right(120)
    forward(size)
    right(180)


house(60)
# endregion

# region: sol-street
from turtle import *


def house(size):
    for i in range(4):
        forward(size)
        right(90)
    left(60)
    forward(size)
    right(120)
    forward(size)
    right(120)
    forward(size)
    right(180)


penup()
goto(-200, 0)
pendown()
for i in range(5):
    house(50)
    penup()
    forward(80)
    pendown()
# endregion

# region: sol-vary
from turtle import *


def house(size):
    for i in range(4):
        forward(size)
        right(90)
    left(60)
    forward(size)
    right(120)
    forward(size)
    right(120)
    forward(size)
    right(180)


def move(distance):
    penup()
    forward(distance)
    pendown()


penup()
goto(-220, 0)
pendown()
for i in range(6):
    house(70 - i * 10)
    move(75)
# endregion
