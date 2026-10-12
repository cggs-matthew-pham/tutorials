# region: picks
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue"]

pensize(8)
for i in range(len(colours)):
    pencolor(colours[i])
    forward(50)
    right(72)
# endregion

# region: modify
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue"]

pensize(8)
for i in range(len(colours)):
    pencolor(colours[i])
    forward(50)
    right(72)

# Add two more colours to the list, then change the first one.
# Notice that you do not need to change the loop.
# endregion

# region: bug
from turtle import *

colours = ["red", "blue", "green"]

for i in range(4):
    pencolor(colours[i])
    circle(20 + i * 10)
# endregion

# region: review
from turtle import *

sizes = [20, 40, 60]

for i in range(len(sizes)):
    forward(sizes[i])
    right(360 / len(sizes))
# endregion

# region: sol-add
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]

pensize(8)
for i in range(len(colours)):
    pencolor(colours[i])
    forward(50)
    right(360 / len(colours))
# endregion

# region: sol-first
from turtle import *

colours = ["pink", "orange", "yellow", "green", "blue"]

pensize(8)
for i in range(len(colours)):
    pencolor(colours[i])
    forward(50)
    right(72)
# endregion
