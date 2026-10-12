# region: each
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue"]
size = 40

penup()
goto(-130, 0)
pendown()

for c in colours:
    fillcolor(c)
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    penup()
    forward(size + 10)
    pendown()
# endregion

# region: bug
from turtle import *

colours = ["red", "blue", "green"]

for c in colours:
    pencolor(colours[c])
    circle(30)
# endregion

# region: modify
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue"]
size = 40

penup()
goto(-130, 0)
pendown()

for c in colours:
    fillcolor(c)
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    penup()
    forward(size + 10)
    pendown()

# Add two more colours to the list, then move the start so they all fit.
# endregion

# region: scores
from turtle import *

scores = [45, 72, 90, 38, 66]
pass_mark = 50
width = 30

penup()
goto(-100, -100)
pendown()

for score in scores:
    if score >= pass_mark:
        fillcolor("green")
    else:
        fillcolor("red")
    begin_fill()
    forward(width)
    left(90)
    forward(score)
    left(90)
    forward(width)
    left(90)
    forward(score)
    left(90)
    end_fill()
    penup()
    forward(width + 10)
    pendown()
# endregion

# region: make
from turtle import *

heights = [30, 80, 50, 100, 60]

penup()
goto(-100, -100)
pendown()

# Draw one bar for each height in the list.
# endregion

# region: sol-add
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
size = 40

penup()
goto(-190, 0)
pendown()

for c in colours:
    fillcolor(c)
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    penup()
    forward(size + 10)
    pendown()
# endregion

# region: sol-chart
from turtle import *

heights = [30, 80, 50, 100, 60]

penup()
goto(-100, -100)
pendown()

for h in heights:
    pendown()
    forward(20)
    left(90)
    forward(h)
    left(90)
    forward(20)
    left(90)
    forward(h)
    left(90)
    penup()
    forward(30)
# endregion
