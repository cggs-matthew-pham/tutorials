# region: garden
from turtle import *

speed(0)
colours = ["red", "orange", "pink", "purple"]
stem = 50
head = 10

penup()
goto(-150, -80)
pendown()

for i in range(len(colours)):
    # stem
    if i % 2 == 0:
        pencolor("green")
    else:
        pencolor("darkgreen")
    pensize(3)
    left(90)
    forward(stem + i * 10)

    # flower head
    fillcolor(colours[i])
    begin_fill()
    circle(head)
    end_fill()
    head = head + 4

    # back down, then along to the next flower
    penup()
    backward(stem + i * 10)
    right(90)
    forward(70)
    pendown()
# endregion

# region: bug
from turtle import *

speed(0)
colours = ["red", "orange", "pink", "purple"]
stem = 50
head = 10

penup()
goto(-150, -80)
pendown()

for i in range(len(colours)):
    pensize(3)
    left(90)
    forward(stem + i * 10)
    head = 10
    fillcolor(colours[i])
    begin_fill()
    circle(head)
    end_fill()
    head = head + 4
    penup()
    backward(stem + i * 10)
    right(90)
    forward(70)
    pendown()
# endregion

# region: modify
from turtle import *

speed(0)
colours = ["red", "orange", "pink", "purple"]
stem = 50
head = 10

penup()
goto(-150, -80)
pendown()

for i in range(len(colours)):
    if i % 2 == 0:
        pencolor("green")
    else:
        pencolor("darkgreen")
    pensize(3)
    left(90)
    forward(stem + i * 10)

    fillcolor(colours[i])
    begin_fill()
    circle(head)
    end_fill()
    head = head + 4

    penup()
    backward(stem + i * 10)
    right(90)
    forward(70)
    pendown()

# 1. Add two more colours. Make sure they fit on the screen.
# 2. Make every stem the same height.
# endregion

# region: sol-colours
from turtle import *

speed(0)
colours = ["red", "orange", "pink", "purple", "gold", "teal"]
stem = 50
head = 10

penup()
goto(-200, -80)
pendown()

for i in range(len(colours)):
    if i % 2 == 0:
        pencolor("green")
    else:
        pencolor("darkgreen")
    pensize(3)
    left(90)
    forward(stem + i * 10)

    fillcolor(colours[i])
    begin_fill()
    circle(head)
    end_fill()
    head = head + 4

    penup()
    backward(stem + i * 10)
    right(90)
    forward(70)
    pendown()
# endregion

# region: sol-same
from turtle import *

speed(0)
colours = ["red", "orange", "pink", "purple"]
stem = 50
head = 10

penup()
goto(-150, -80)
pendown()

for i in range(len(colours)):
    if i % 2 == 0:
        pencolor("green")
    else:
        pencolor("darkgreen")
    pensize(3)
    left(90)
    forward(stem)

    fillcolor(colours[i])
    begin_fill()
    circle(head)
    end_fill()
    head = head + 4

    penup()
    backward(stem)
    right(90)
    forward(70)
    pendown()
# endregion
