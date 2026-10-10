# region: polygon
from turtle import *

sides = 5
size = 80
angle = 360 / sides

for i in range(sides):
    forward(size)
    right(angle)
# endregion

# region: print
from turtle import *

sides = 5
size = 80
angle = 360 / sides
print(angle)

for i in range(sides):
    forward(size)
    right(angle)
# endregion

# region: modify
from turtle import *

sides = 5
size = 80
angle = 360 / sides

for i in range(sides):
    forward(size)
    right(angle)

# Change one number at the top to draw a hexagon, then a 12-sided shape.
# endregion

# region: make
from turtle import *

size = 5

for i in range(50):
    forward(size)
    right(90)
    # Make the line longer every time round the loop.
# endregion

# region: plan
from turtle import *

scale = 20   # pixels per metre
width = 6    # metres
depth = 4

for i in range(2):
    forward(width * scale)
    right(90)
    forward(depth * scale)
    right(90)
# endregion

# region: bug
from turtle import *

sides = 5
size = 80
angle = 360 * sides

for i in range(sides):
    forward(size)
    right(angle)
# endregion

# region: sol-sides
from turtle import *

sides = 12
size = 40
angle = 360 / sides

for i in range(sides):
    forward(size)
    right(angle)
# endregion

# region: sol-colour
from turtle import *

sides = 6
size = 80
angle = 360 / sides
colour = "purple"

pencolor(colour)
for i in range(sides):
    forward(size)
    right(angle)
# endregion

# region: sol-spiral
from turtle import *

size = 5

for i in range(50):
    forward(size)
    right(90)
    size = size + 5
# endregion

# region: sol-plan
from turtle import *

scale = 20   # pixels per metre
width = 8    # metres
depth = 5

for i in range(2):
    forward(width * scale)
    right(90)
    forward(depth * scale)
    right(90)

# A second room beside the first: 4 m by 5 m.
forward(width * scale)
for i in range(2):
    forward(4 * scale)
    right(90)
    forward(depth * scale)
    right(90)
# endregion
