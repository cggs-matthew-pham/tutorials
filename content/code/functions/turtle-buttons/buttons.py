# region: hit
from turtle import *

speed(0)
hideturtle()
bx = -60
by = -25
bw = 120
bh = 50

penup()
goto(bx, by)
pendown()
for i in range(2):
    forward(bw)
    left(90)
    forward(bh)
    left(90)
penup()
goto(bx + 10, by + 15)
write("Press me")


def clicked(x, y):
    if x > bx and x < bx + bw and y > by and y < by + bh:
        print("button pressed")
    else:
        print("missed")


onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: counter
from turtle import *

speed(0)
hideturtle()
bx = -60
by = -25
bw = 120
bh = 50
count = 0


def draw_scene():
    clear()
    penup()
    goto(bx, by)
    pendown()
    for i in range(2):
        forward(bw)
        left(90)
        forward(bh)
        left(90)
    penup()
    goto(bx + 10, by + 15)
    write("Click me")
    goto(-20, 70)
    write(count, False, "left", ("Arial", 24, "normal"))


def clicked(x, y):
    global count
    if x > bx and x < bx + bw and y > by and y < by + bh:
        count = count + 1
        draw_scene()


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: make
from turtle import *

speed(0)
hideturtle()
count = 0

# Make a counter with two buttons, "+1" on the left and "-1" on the right.
# Draw both buttons, and show the number above them.
# Each click must check which button (if any) it landed inside.
# endregion

# region: panel
from turtle import *

speed(0)
hideturtle()
names = ["white", "yellow", "lightblue", "pink"]
bw = 100
bh = 40
by = -20


def draw_button(bx, label):
    penup()
    goto(bx, by)
    pendown()
    for i in range(2):
        forward(bw)
        left(90)
        forward(bh)
        left(90)
    penup()
    goto(bx + 10, by + 12)
    write(label)


def clicked(x, y):
    for i in range(len(names)):
        bx = -220 + i * 110
        if x > bx and x < bx + bw and y > by and y < by + bh:
            bgcolor(names[i])


for i in range(len(names)):
    draw_button(-220 + i * 110, names[i])

onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: toolkit
from turtle import *
from ui import draw_button, inside

speed(0)
hideturtle()
count = 0
draw_button(-60, -25, 120, 50, "Add one")


def clicked(x, y):
    global count
    if inside(x, y, -60, -25, 120, 50):
        count = count + 1
        print(count)


onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: bug
bx = -60
by = -25
bw = 120
bh = 50

def clicked(x, y):
    if x > bx or x < bx + bw or y > by or y < by + bh:
        print("button pressed")
# endregion

# region: sol-move
from turtle import *

speed(0)
hideturtle()
bx = -100
by = -80
bw = 200
bh = 70
count = 0


def draw_scene():
    clear()
    penup()
    goto(bx, by)
    pendown()
    for i in range(2):
        forward(bw)
        left(90)
        forward(bh)
        left(90)
    penup()
    goto(bx + 10, by + 25)
    write("Click me")
    goto(-20, 70)
    write(count, False, "left", ("Arial", 24, "normal"))


def clicked(x, y):
    global count
    if x > bx and x < bx + bw and y > by and y < by + bh:
        count = count + 1
        draw_scene()


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: sol-five
from turtle import *

speed(0)
hideturtle()
bx = -60
by = -25
bw = 120
bh = 50
count = 0


def draw_scene():
    clear()
    penup()
    goto(bx, by)
    pendown()
    for i in range(2):
        forward(bw)
        left(90)
        forward(bh)
        left(90)
    penup()
    goto(bx + 10, by + 15)
    write("Click me")
    goto(-20, 70)
    write(count, False, "left", ("Arial", 24, "normal"))


def clicked(x, y):
    global count
    if x > bx and x < bx + bw and y > by and y < by + bh:
        count = count + 5
        draw_scene()


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: sol-make
from turtle import *

speed(0)
hideturtle()
count = 0


def draw_button(bx, by, label):
    penup()
    goto(bx, by)
    pendown()
    for i in range(2):
        forward(100)
        left(90)
        forward(50)
        left(90)
    penup()
    goto(bx + 40, by + 18)
    write(label)


def draw_scene():
    clear()
    draw_button(-120, -25, "+1")
    draw_button(20, -25, "-1")
    goto(-10, 70)
    write(count, False, "left", ("Arial", 24, "normal"))


def clicked(x, y):
    global count
    if x > -120 and x < -20 and y > -25 and y < 25:
        count = count + 1
    if x > 20 and x < 120 and y > -25 and y < 25:
        count = count - 1
    draw_scene()


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: sol-panel
from turtle import *

speed(0)
hideturtle()
names = ["white", "yellow", "lightblue", "pink", "lightgreen"]
# Where each button goes: three on the top row, two below.
bxs = [-170, -60, 50, -170, -60]
bys = [20, 20, 20, -40, -40]
bw = 100
bh = 40


def draw_button(bx, by, label):
    penup()
    goto(bx, by)
    pendown()
    for i in range(2):
        forward(bw)
        left(90)
        forward(bh)
        left(90)
    penup()
    goto(bx + 10, by + 12)
    write(label)


def clicked(x, y):
    for i in range(len(names)):
        if x > bxs[i] and x < bxs[i] + bw and y > bys[i] and y < bys[i] + bh:
            bgcolor(names[i])


for i in range(len(names)):
    draw_button(bxs[i], bys[i], names[i])

onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: sol-toolkit
from turtle import *
from ui import draw_button, inside

speed(0)
hideturtle()
count = 0
draw_button(-140, -25, 120, 50, "Add one")
draw_button(20, -25, 120, 50, "Take one")


def clicked(x, y):
    global count
    if inside(x, y, -140, -25, 120, 50):
        count = count + 1
        print(count)
    if inside(x, y, 20, -25, 120, 50):
        count = count - 1
        print(count)


onscreenclick(clicked)
listen()
mainloop()
# endregion
