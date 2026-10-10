# region: square
from turtle import *

forward(100)
right(90)
forward(100)
right(90)
forward(100)
right(90)
forward(100)
right(90)
# endregion

# region: loop
from turtle import *

for i in range(4):
    forward(100)
    right(90)
# endregion

# region: modify
from turtle import *

for i in range(4):
    forward(100)
    right(90)

# Change the code so it draws a triangle.
# endregion

# region: make
from turtle import *

# Draw your own shape here.
# endregion

# region: triangle
from turtle import *

for i in range(3):
    forward(100)
    right(120)
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

# region: compare
# Without a loop
forward(100)
right(90)
forward(100)
right(90)
forward(100)
right(90)
forward(100)
right(90)

# With a loop
for i in range(4):
    forward(100)
    right(90)
# endregion

# region: sol-triangle
from turtle import *

for i in range(3):
    forward(100)
    right(120)
# endregion

# region: sol-double
from turtle import *

for i in range(3):
    forward(200)
    right(120)
# endregion

# region: sol-pen
from turtle import *

pencolor("red")
pensize(5)
for i in range(3):
    forward(200)
    right(120)
# endregion

# region: sol-walls
from turtle import *

for i in range(4):
    forward(100)
    right(90)
# endregion

# region: sol-roof
from turtle import *

for i in range(4):
    forward(100)
    right(90)

left(60)
forward(100)
right(120)
forward(100)
# endregion

# region: sol-colour
from turtle import *

pencolor("brown")
pensize(4)
for i in range(4):
    forward(100)
    right(90)

pencolor("red")
left(60)
forward(100)
right(120)
forward(100)
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
