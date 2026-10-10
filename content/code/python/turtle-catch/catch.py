# region: hop
from turtle import *

speed(0)
penup()

xs = [-120, 0, 120, 120, 0, -120]
ys = [60, 110, 60, -50, -100, -50]
place = 0


def hop():
    global place
    goto(xs[place], ys[place])
    place = (place + 1) % len(xs)
    ontimer(hop, 1000)


hop()
mainloop()
# endregion

# region: catch
from turtle import *
from ui import inside

speed(0)
penup()

xs = [-120, 0, 120, 120, 0, -120]
ys = [60, 110, 60, -50, -100, -50]
place = 0
tx = 0
ty = 0
score = 0


def hop():
    global place, tx, ty
    tx = xs[place]
    ty = ys[place]
    place = (place + 1) % len(xs)
    goto(tx, ty)
    ontimer(hop, 1000)


def show_score():
    clear()
    goto(-190, 160)
    write(score, False, "left", ("Arial", 20, "normal"))
    goto(tx, ty)


def clicked(x, y):
    global score
    # Milestone 1: if the click (x, y) is inside a 40 by 40 box around
    # the turtle, add 1 to score and call show_score().
    # The box starts at (tx - 20, ty - 20). pass means "do nothing yet": replace it.
    pass


hop()
show_score()
onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: blink
from turtle import *
from ui import inside

speed(0)
penup()
hideturtle()

xs = [-120, 0, 120, 120, 0, -120]
ys = [60, 110, 60, -50, -100, -50]
place = 0
tx = 0
ty = 0
score = 0
misses = 0
showing = False


def hop():
    global place, tx, ty, showing
    tx = xs[place]
    ty = ys[place]
    place = (place + 1) % len(xs)
    goto(tx, ty)
    # Milestone 2a: show the turtle, set showing to True,
    # and hide it again after 700 milliseconds with ontimer(hide, 700).
    ontimer(hop, 1000)


def hide():
    global showing, misses
    # Milestone 2b: if the turtle is still showing, nobody caught it:
    # add 1 to misses, set showing to False and hide the turtle.
    pass


def show_score():
    clear()
    goto(-190, 160)
    write(score, False, "left", ("Arial", 20, "normal"))
    goto(tx, ty)


def clicked(x, y):
    global score, showing
    # Milestone 2c: only a showing turtle can be caught. When it is, hide it straight away.
    if inside(x, y, tx - 20, ty - 20, 40, 40):
        score = score + 1
        show_score()


hop()
show_score()
onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: game
from turtle import *
from ui import inside, draw_button

speed(0)
penup()
hideturtle()

xs = [-120, 0, 120, 120, 0, -120]
ys = [60, 110, 60, -50, -100, -50]
place = 0
tx = 0
ty = 0
score = 0
misses = 0
showing = False

# Milestone 3: make it a game.
#   1. Add time_left = 30 and playing = False.
#   2. Draw a Start button with draw_button(-60, -180, 120, 40, "Start") when not playing.
#   3. A click on Start sets everything back to the beginning, sets playing to True and starts hop().
#   4. A tick() function takes 1 away from time_left every second (ontimer), and stops the game at 0.
#   5. hop() and catching only work while playing is True.


def hop():
    global place, tx, ty, showing
    tx = xs[place]
    ty = ys[place]
    place = (place + 1) % len(xs)
    goto(tx, ty)
    showturtle()
    showing = True
    ontimer(hide, 700)
    ontimer(hop, 1000)


def hide():
    global showing, misses
    if showing:
        misses = misses + 1
        showing = False
        hideturtle()


def show_score():
    clear()
    goto(-190, 160)
    write(score, False, "left", ("Arial", 20, "normal"))
    goto(tx, ty)


def clicked(x, y):
    global score, showing
    if showing and inside(x, y, tx - 20, ty - 20, 40, 40):
        score = score + 1
        showing = False
        hideturtle()
        show_score()


hop()
show_score()
onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: solution
from turtle import *
from ui import inside, draw_button

speed(0)
penup()
hideturtle()

xs = [-120, 0, 120, 120, 0, -120]
ys = [60, 110, 60, -50, -100, -50]
place = 0
tx = 0
ty = 0
score = 0
misses = 0
showing = False
time_left = 30
playing = False


def draw_scene():
    clear()
    goto(-190, 160)
    write(score, False, "left", ("Arial", 20, "normal"))
    goto(150, 160)
    write(time_left, False, "left", ("Arial", 20, "normal"))
    if playing == False:
        draw_button(-60, -180, 120, 40, "Start")
    goto(tx, ty)


def hop():
    global place, tx, ty, showing
    if playing:
        tx = xs[place]
        ty = ys[place]
        place = (place + 1) % len(xs)
        goto(tx, ty)
        showturtle()
        showing = True
        ontimer(hide, 700)
        ontimer(hop, 1000)


def hide():
    global showing, misses
    if showing:
        misses = misses + 1
        showing = False
        hideturtle()


def tick():
    global time_left, playing
    if playing:
        time_left = time_left - 1
        if time_left == 0:
            playing = False
            hideturtle()
        else:
            ontimer(tick, 1000)
        draw_scene()


def start():
    global score, misses, time_left, playing, place
    score = 0
    misses = 0
    time_left = 30
    place = 0
    playing = True
    draw_scene()
    hop()
    ontimer(tick, 1000)


def clicked(x, y):
    global score, showing
    if playing and showing and inside(x, y, tx - 20, ty - 20, 40, 40):
        score = score + 1
        showing = False
        hideturtle()
        draw_scene()
    if playing == False and inside(x, y, -60, -180, 120, 40):
        start()


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: random
import random

# Random spots instead of the path: replace the first two lines of hop() with these.
tx = random.randint(-150, 150)
ty = random.randint(-120, 120)
# endregion

# region: sol-catch
from turtle import *
from ui import inside

speed(0)
penup()

xs = [-120, 0, 120, 120, 0, -120]
ys = [60, 110, 60, -50, -100, -50]
place = 0
tx = 0
ty = 0
score = 0


def hop():
    global place, tx, ty
    tx = xs[place]
    ty = ys[place]
    place = (place + 1) % len(xs)
    goto(tx, ty)
    ontimer(hop, 1000)


def show_score():
    clear()
    goto(-190, 160)
    write(score, False, "left", ("Arial", 20, "normal"))
    goto(tx, ty)


def clicked(x, y):
    global score
    if inside(x, y, tx - 20, ty - 20, 40, 40):
        score = score + 1
        show_score()


hop()
show_score()
onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: sol-blink
from turtle import *
from ui import inside, draw_button

speed(0)
penup()
hideturtle()

xs = [-120, 0, 120, 120, 0, -120]
ys = [60, 110, 60, -50, -100, -50]
place = 0
tx = 0
ty = 0
score = 0
misses = 0
showing = False


def hop():
    global place, tx, ty, showing
    tx = xs[place]
    ty = ys[place]
    place = (place + 1) % len(xs)
    goto(tx, ty)
    showturtle()
    showing = True
    ontimer(hide, 700)
    ontimer(hop, 1000)


def hide():
    global showing, misses
    if showing:
        misses = misses + 1
        showing = False
        hideturtle()


def show_score():
    clear()
    goto(-190, 160)
    write(score, False, "left", ("Arial", 20, "normal"))
    goto(tx, ty)


def clicked(x, y):
    global score, showing
    if showing and inside(x, y, tx - 20, ty - 20, 40, 40):
        score = score + 1
        showing = False
        hideturtle()
        show_score()


hop()
show_score()
onscreenclick(clicked)
listen()
mainloop()
# endregion
