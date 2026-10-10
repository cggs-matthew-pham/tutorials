# region: colours
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

# region: index
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue"]

print(colours[0])
print(colours[2])
print(len(colours))

pencolor(colours[2])
pensize(5)
circle(60)
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

# Add two more colours to the list, then change the first one.
# endregion

# region: make
from turtle import *

heights = [30, 80, 50, 100, 60]

penup()
goto(-100, -100)
pendown()

# Draw one bar for each height in the list.
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

# region: bug
from turtle import *

colours = ["red", "blue", "green"]

for i in range(4):
    pencolor(colours[i])
    circle(20 + i * 10)
# endregion

# region: sol-add
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
size = 30

penup()
goto(-170, 0)
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

# region: sol-first
from turtle import *

colours = ["pink", "orange", "yellow", "green", "blue", "indigo", "violet"]
size = 30

penup()
goto(-170, 0)
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
    pendown()
# endregion

# region: sol-scores
from turtle import *

scores = [55, 92, 70, 40, 81]
pass_mark = 70
width = 30

penup()
goto(-100, -100)
pendown()

for score in scores:
    if score > 85:
        fillcolor("gold")
    elif score >= pass_mark:
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
