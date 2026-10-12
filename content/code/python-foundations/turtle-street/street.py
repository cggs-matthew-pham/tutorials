# region: street
from turtle import *

speed(0)
houses = 4
width = 60
gap = 20

penup()
backward(220)
pendown()

for house in range(houses):
    # walls
    for side in range(4):
        forward(width)
        left(90)
    # roof
    left(90)
    forward(width)
    right(30)
    forward(width)
    right(120)
    forward(width)
    right(30)
    forward(width)
    left(90)
    # move along to the next house
    penup()
    forward(gap)
    pendown()

print(houses * width + (houses - 1) * gap)
# endregion

# region: bug
from turtle import *

speed(0)
houses = 4
width = 60
gap = 20

penup()
backward(220)
pendown()

for house in range(houses):
    # walls
    for side in range(houses):
        forward(width)
        left(90)
    # roof
    left(90)
    forward(width)
    right(30)
    forward(width)
    right(120)
    forward(width)
    right(30)
    forward(width)
    left(90)
    # move along to the next house
    penup()
    forward(gap)
    pendown()
# endregion

# region: make
from turtle import *

speed(0)
houses = 4
width = 60
gap = 20

penup()
backward(220)
pendown()

for house in range(houses):
    # walls
    for side in range(4):
        forward(width)
        left(90)
    # roof
    left(90)
    forward(width)
    right(30)
    forward(width)
    right(120)
    forward(width)
    right(30)
    forward(width)
    left(90)
    # move along to the next house
    penup()
    forward(gap)
    pendown()

# Add something new to the street here: a fence, trees or a shop.
# endregion

# region: use
from turtle import *

for tile in range(5):
    for side in range(4):
        forward(40)
        right(90)
    penup()
    forward(40)
    pendown()
# endregion

# region: sol-six
from turtle import *

speed(0)
houses = 6
width = 50
gap = 20

penup()
backward(220)
pendown()

for house in range(houses):
    # walls
    for side in range(4):
        forward(width)
        left(90)
    # roof
    left(90)
    forward(width)
    right(30)
    forward(width)
    right(120)
    forward(width)
    right(30)
    forward(width)
    left(90)
    # move along to the next house
    penup()
    forward(gap)
    pendown()

print(houses * width + (houses - 1) * gap)
# endregion

# region: sol-grow
from turtle import *

speed(0)
houses = 4
width = 40
gap = 20

penup()
backward(220)
pendown()

for house in range(houses):
    # walls
    for side in range(4):
        forward(width)
        left(90)
    # roof
    left(90)
    forward(width)
    right(30)
    forward(width)
    right(120)
    forward(width)
    right(30)
    forward(width)
    left(90)
    # move along to the next house
    penup()
    forward(gap)
    pendown()
    width = width + 10
# endregion

# region: sol-fence
from turtle import *

speed(0)
houses = 4
width = 60
gap = 20
posts = 8

penup()
backward(220)
pendown()

for house in range(houses):
    # walls
    for side in range(4):
        forward(width)
        left(90)
    # roof
    left(90)
    forward(width)
    right(30)
    forward(width)
    right(120)
    forward(width)
    right(30)
    forward(width)
    left(90)
    # move along to the next house
    penup()
    forward(gap)
    pendown()

# a fence: one post, then step along, posts times
for post in range(posts):
    left(90)
    forward(30)
    backward(30)
    right(90)
    forward(10)
# endregion

# region: sol-tiles
from turtle import *

# Two rows of six bigger tiles.
for row in range(2):
    for tile in range(6):
        for side in range(4):
            forward(50)
            right(90)
        penup()
        forward(50)
        pendown()
    penup()
    backward(300)
    right(90)
    forward(50)
    left(90)
    pendown()
# endregion
