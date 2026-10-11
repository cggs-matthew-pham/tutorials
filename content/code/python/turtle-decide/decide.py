# region: predict
from turtle import *


def size_colour(size):
    if size > 50:
        return "red"
    else:
        return "blue"


print(size_colour(80))
print(size_colour(30))
# endregion

# region: run
from turtle import *

speed(0)


def size_colour(size):
    if size > 50:
        return "red"
    else:
        return "blue"


sizes = [20, 60, 35, 80, 50]

penup()
goto(-160, 0)
for s in sizes:
    dot(s, size_colour(s))
    forward(80)
# endregion

# region: bug
def count_big(sizes):
    for s in sizes:
        count = 0
        if s > 50:
            count = count + 1
    return count


print(count_big([20, 60, 35, 80]))
# endregion

# region: sol-elif
from turtle import *

speed(0)


def size_colour(size):
    if size > 50:
        return "red"
    elif size > 30:
        return "orange"
    else:
        return "blue"


sizes = [20, 60, 35, 80, 50]

penup()
goto(-160, 0)
for s in sizes:
    dot(s, size_colour(s))
    forward(80)
# endregion

# region: sol-count
from turtle import *

speed(0)


def size_colour(size):
    if size > 50:
        return "red"
    else:
        return "blue"


def count_big(sizes):
    count = 0
    for s in sizes:
        if s > 50:
            count = count + 1
    return count


sizes = [20, 60, 35, 80, 50]

penup()
goto(-160, 0)
for s in sizes:
    dot(s, size_colour(s))
    forward(80)

print(count_big(sizes))
# endregion

# region: make
from turtle import *

speed(0)

scores = [45, 80, 62, 30, 95]

# Write def score_colour(score) that returns a colour: green for 70 or more,
# orange for 50 or more, red for anything less.
# Then draw a bar for each score, as tall as the score, in its colour.
# endregion

# region: sol-make
from turtle import *

speed(0)

scores = [45, 80, 62, 30, 95]


def score_colour(score):
    if score >= 70:
        return "green"
    elif score >= 50:
        return "orange"
    else:
        return "red"


def bar(height, colour):
    fillcolor(colour)
    begin_fill()
    for i in range(2):
        forward(30)
        left(90)
        forward(height)
        left(90)
    end_fill()


penup()
goto(-150, -80)
pendown()
for s in scores:
    bar(s * 2, score_colour(s))
    penup()
    forward(50)
    pendown()
# endregion
