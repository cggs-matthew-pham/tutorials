# region: halves
from turtle import *

pensize(6)
for i in range(6):
    if i < 3:
        pencolor("red")
    else:
        pencolor("blue")
    forward(60)
    right(60)
# endregion

# region: modify
from turtle import *

pensize(6)
for i in range(6):
    if i < 3:
        pencolor("red")
    else:
        pencolor("blue")
    forward(60)
    right(60)

# Change the number so 4 sides are red and 2 are blue.
# endregion

# region: bug
from turtle import *

pensize(6)
for i in range(6):
    if i = 3:
        pencolor("red")
    else:
        pencolor("blue")
    forward(60)
    right(60)
# endregion

# region: make
from turtle import *

size = 10
pensize(5)
for i in range(12):
    # Choose the colour here: red while size is small, blue once it is big.
    forward(size)
    right(90)
    size = size + 10
# endregion

# region: sol-four
from turtle import *

pensize(6)
for i in range(6):
    if i < 4:
        pencolor("red")
    else:
        pencolor("blue")
    forward(60)
    right(60)
# endregion

# region: sol-make
from turtle import *

size = 10
pensize(5)
for i in range(12):
    if size < 60:
        pencolor("red")
    else:
        pencolor("blue")
    forward(size)
    right(90)
    size = size + 10
# endregion
