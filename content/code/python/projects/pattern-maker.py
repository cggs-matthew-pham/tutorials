from turtle import *

speed(0)
penup()
goto(-200, 0)
size = 20

for i in range(12):
    if i % 3 == 0:
        fillcolor("gold")
    elif i % 3 == 1:
        fillcolor("tomato")
    else:
        fillcolor("teal")
    pendown()
    begin_fill()
    for side in range(4):
        forward(size)
        left(90)
    end_fill()
    penup()
    forward(size + 6)
    size = size + 2
