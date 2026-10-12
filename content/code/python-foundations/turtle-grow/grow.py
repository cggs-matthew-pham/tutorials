# region: spiral
from turtle import *

size = 0

for i in range(30):
    forward(size)
    right(90)
    size = size + 5
# endregion

# region: bug
from turtle import *

size = 10

for i in range(30):
    forward(size)
    right(90)
size = size + 5
# endregion

# region: modify
from turtle import *

size = 0

for i in range(30):
    forward(size)
    right(90)
    size = size + 5

# Change the amount added so the spiral grows faster.
# endregion

# region: make
from turtle import *

size = 0

for i in range(30):
    forward(size)
    right(90)
    size = size + 5
    # Make the pen thicker every pass too.
# endregion

# region: sol-faster
from turtle import *

size = 0

for i in range(30):
    forward(size)
    right(90)
    size = size + 10
# endregion

# region: sol-make
from turtle import *

size = 0
width = 1

for i in range(30):
    pensize(width)
    forward(size)
    right(90)
    size = size + 5
    width = width + 0.5
# endregion
