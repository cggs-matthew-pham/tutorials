# region: checker
from turtle import *

size = 40
penup()
goto(-160, 0)
pendown()

for i in range(8):
    if i % 2 == 0:
        fillcolor("black")
    else:
        fillcolor("white")
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    forward(size)
# endregion

# region: print
from turtle import *

size = 40
penup()
goto(-160, 0)
pendown()

for i in range(8):
    print(i, i % 2)
    if i % 2 == 0:
        fillcolor("black")
    else:
        fillcolor("white")
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    forward(size)
# endregion

# region: modify
from turtle import *

size = 40
penup()
goto(-160, 0)
pendown()

for i in range(8):
    if i % 2 == 0:
        fillcolor("black")
    else:
        fillcolor("white")
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    forward(size)

# Change the two colours, then add a third colour for every third square.
# endregion

# region: make
from turtle import *

penup()
goto(-180, 0)
pendown()

for i in range(10):
    # Draw a shape here. Use an if / else to decide which kind of shape it is.
    pass
    forward(40)
# endregion

# region: light
from turtle import *

light = "green"   # try "red" or "orange"

if light == "red":
    fillcolor("red")
    print("Stop")
elif light == "orange":
    fillcolor("orange")
    print("Get ready")
else:
    fillcolor("green")
    print("Go")

begin_fill()
circle(50)
end_fill()
# endregion

# region: bug
from turtle import *

for i in range(8):
    if i % 2 = 0:
        fillcolor("black")
    else:
        fillcolor("white")
    begin_fill()
    circle(20)
    end_fill()
    forward(50)
# endregion

# region: sol-colours
from turtle import *

size = 40
penup()
goto(-160, 0)
pendown()

for i in range(8):
    if i % 2 == 0:
        fillcolor("navy")
    else:
        fillcolor("gold")
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    forward(size)
# endregion

# region: sol-third
from turtle import *

size = 40
penup()
goto(-160, 0)
pendown()

for i in range(8):
    if i % 3 == 0:
        fillcolor("green")
    elif i % 2 == 0:
        fillcolor("navy")
    else:
        fillcolor("gold")
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    forward(size)
# endregion

# region: sol-make
from turtle import *

penup()
goto(-180, 0)
pendown()

for i in range(10):
    if i % 2 == 0:
        circle(15)
    else:
        for side in range(4):
            forward(30)
            left(90)
    penup()
    forward(40)
    pendown()
# endregion

# region: sol-light
from turtle import *

light = "flashing"

if light == "red":
    fillcolor("red")
    print("Stop")
elif light == "orange":
    fillcolor("orange")
    print("Get ready")
elif light == "flashing":
    fillcolor("yellow")
    print("Slow down")
else:
    fillcolor("green")
    print("Go")

begin_fill()
circle(50)
end_fill()
# endregion
