# region: tile
from turtle import *

colours = ["gold", "navy", "teal"]
size = 40
speed(0)

penup()
goto(-80, -60)
for row in range(3):
    for col in range(4):
        pick = (row + col) % len(colours)
        fillcolor(colours[pick])
        begin_fill()
        for side in range(4):
            forward(size)
            right(90)
        end_fill()
        forward(size)
    backward(size * 4)
    left(90)
    forward(size)
    right(90)
# endregion

# region: modify
from turtle import *

colours = ["gold", "navy", "teal"]
size = 40
speed(0)

penup()
goto(-80, -60)
for row in range(3):
    for col in range(4):
        pick = (row + col) % len(colours)
        fillcolor(colours[pick])
        begin_fill()
        for side in range(4):
            forward(size)
            right(90)
        end_fill()
        forward(size)
    backward(size * 4)
    left(90)
    forward(size)
    right(90)

# Change one thing: the colours, the size, the rows or the columns.
# Predict what it will do before you run it.
# endregion

# region: make
from turtle import *

speed(0)
# Make a tile of your own. Plan it first:
#   one name for the size
#   a list of colours
#   a loop in a loop
#   a decision that picks something
# endregion

# region: sol-modify
from turtle import *

colours = ["gold", "navy", "teal", "tomato"]
size = 40
speed(0)

penup()
goto(-100, -80)
for row in range(4):
    for col in range(5):
        pick = (row + col) % len(colours)
        fillcolor(colours[pick])
        begin_fill()
        for side in range(4):
            forward(size)
            right(90)
        end_fill()
        forward(size)
    backward(size * 5)
    left(90)
    forward(size)
    right(90)
# endregion

# region: sol-make
from turtle import *

colours = ["pink", "purple", "teal"]
size = 30
speed(0)

penup()
goto(-90, -60)
for row in range(4):
    for col in range(6):
        if (row + col) % 2 == 0:
            fillcolor(colours[col % len(colours)])
        else:
            fillcolor("white")
        begin_fill()
        for side in range(4):
            forward(size)
            right(90)
        end_fill()
        forward(size)
    backward(size * 6)
    left(90)
    forward(size)
    right(90)
# endregion
