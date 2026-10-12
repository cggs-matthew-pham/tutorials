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

# Draw a staircase with a loop.
# endregion

# region: bug
from turtle import *

for i in range(4):
    forward(100)
right(90)
# endregion

# region: triangle
from turtle import *

for i in range(3):
    forward(100)
    right(120)
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

# region: sol-stairs
from turtle import *

for i in range(5):
    left(90)
    forward(20)
    right(90)
    forward(20)
# endregion

# region: sol-stairs10
from turtle import *

for i in range(10):
    left(90)
    forward(20)
    right(90)
    forward(20)
# endregion
