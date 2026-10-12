# region: panel
from turtle import *
from ui import inside, draw_button

speed(0)
penup()
hideturtle()

xs = [-120, 0, 120, 120, 0, -120]
ys = [70, 110, 70, -20, -50, -20]
place = 0
tx = 0
ty = 0
score = 0
showing = False
time_left = 30
playing = False
delay = 1000

names = ["New game", "Pause", "Go"]
bxs = [-190, -60, 70]


def draw_scene():
    clear()
    goto(-190, 160)
    write(score, False, "left", ("Arial", 20, "normal"))
    goto(150, 160)
    write(time_left, False, "left", ("Arial", 20, "normal"))
    for i in range(len(names)):
        draw_button(bxs[i], -190, 120, 40, names[i])
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
        ontimer(hide, delay - 300)
        ontimer(hop, delay)


def hide():
    global showing
    if showing:
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


def go():
    global playing
    if playing == False and time_left > 0:
        playing = True
        hop()
        ontimer(tick, 1000)


def press(name):
    global score, time_left, place, playing
    if name == "New game":
        playing = False
        score = 0
        time_left = 30
        place = 0
        draw_scene()
        ontimer(go, 1100)
    if name == "Pause":
        playing = False
        hideturtle()
    if name == "Go":
        go()


def clicked(x, y):
    global score, showing
    if playing and showing and inside(x, y, tx - 20, ty - 20, 40, 40):
        score = score + 1
        showing = False
        hideturtle()
        draw_scene()
    for i in range(len(names)):
        if inside(x, y, bxs[i], -190, 120, 40):
            press(names[i])


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: difficulty
from turtle import *
from ui import inside, draw_button

speed(0)
penup()
hideturtle()

xs = [-120, 0, 120, 120, 0, -120]
ys = [70, 110, 70, -20, -50, -20]
place = 0
tx = 0
ty = 0
score = 0
showing = False
time_left = 30
playing = False
delay = 1000

names = ["New game", "Pause", "Go"]
bxs = [-190, -60, 70]

# Difficulty row: add three lists here (levels, lxs, delays), draw the row at y = -140
# with a loop in draw_scene, and in clicked set delay = delays[i] for the button clicked.


def draw_scene():
    clear()
    goto(-190, 160)
    write(score, False, "left", ("Arial", 20, "normal"))
    goto(150, 160)
    write(time_left, False, "left", ("Arial", 20, "normal"))
    for i in range(len(names)):
        draw_button(bxs[i], -190, 120, 40, names[i])
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
        ontimer(hide, delay - 300)
        ontimer(hop, delay)


def hide():
    global showing
    if showing:
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


def go():
    global playing
    if playing == False and time_left > 0:
        playing = True
        hop()
        ontimer(tick, 1000)


def press(name):
    global score, time_left, place, playing
    if name == "New game":
        playing = False
        score = 0
        time_left = 30
        place = 0
        draw_scene()
        ontimer(go, 1100)
    if name == "Pause":
        playing = False
        hideturtle()
    if name == "Go":
        go()


def clicked(x, y):
    global score, showing
    if playing and showing and inside(x, y, tx - 20, ty - 20, 40, 40):
        score = score + 1
        showing = False
        hideturtle()
        draw_scene()
    for i in range(len(names)):
        if inside(x, y, bxs[i], -190, 120, 40):
            press(names[i])


draw_scene()
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
ys = [70, 110, 70, -20, -50, -20]
place = 0
tx = 0
ty = 0
score = 0
showing = False
time_left = 30
playing = False
delay = 1000

names = ["New game", "Pause", "Go"]
bxs = [-190, -60, 70]

levels = ["Easy", "Medium", "Hard"]
lxs = [-190, -60, 70]
delays = [1300, 1000, 700]


def draw_scene():
    clear()
    goto(-190, 160)
    write(score, False, "left", ("Arial", 20, "normal"))
    goto(150, 160)
    write(time_left, False, "left", ("Arial", 20, "normal"))
    for i in range(len(names)):
        draw_button(bxs[i], -190, 120, 40, names[i])
    for i in range(len(levels)):
        draw_button(lxs[i], -140, 120, 40, levels[i])
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
        ontimer(hide, delay - 300)
        ontimer(hop, delay)


def hide():
    global showing
    if showing:
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


def go():
    global playing
    if playing == False and time_left > 0:
        playing = True
        hop()
        ontimer(tick, 1000)


def press(name):
    global score, time_left, place, playing
    if name == "New game":
        playing = False
        score = 0
        time_left = 30
        place = 0
        draw_scene()
        ontimer(go, 1100)
    if name == "Pause":
        playing = False
        hideturtle()
    if name == "Go":
        go()


def clicked(x, y):
    global score, showing, delay
    if playing and showing and inside(x, y, tx - 20, ty - 20, 40, 40):
        score = score + 1
        showing = False
        hideturtle()
        draw_scene()
    for i in range(len(names)):
        if inside(x, y, bxs[i], -190, 120, 40):
            press(names[i])
    for i in range(len(levels)):
        if inside(x, y, lxs[i], -140, 120, 40):
            delay = delays[i]


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: sol-theme
from turtle import *
from ui import inside, draw_button

speed(0)
penup()
hideturtle()

xs = [-120, 0, 120, 120, 0, -120]
ys = [70, 110, 70, -20, -50, -20]
place = 0
tx = 0
ty = 0
score = 0
showing = False
time_left = 30
playing = False
delay = 1000

names = ["New game", "Pause", "Go"]
bxs = [-190, -60, 70]

levels = ["Easy", "Medium", "Hard"]
lxs = [-190, -60, 70]
delays = [1300, 1000, 700]

themes = ["Day", "Night", "Sea"]
txs = [-190, -60, 70]
backgrounds = ["white", "lightgrey", "lightblue"]


def draw_scene():
    clear()
    goto(-190, 160)
    write(score, False, "left", ("Arial", 20, "normal"))
    goto(150, 160)
    write(time_left, False, "left", ("Arial", 20, "normal"))
    for i in range(len(names)):
        draw_button(bxs[i], -190, 120, 40, names[i])
    for i in range(len(levels)):
        draw_button(lxs[i], -140, 120, 40, levels[i])
    for i in range(len(themes)):
        draw_button(txs[i], 120, 120, 40, themes[i])
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
        ontimer(hide, delay - 300)
        ontimer(hop, delay)


def hide():
    global showing
    if showing:
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


def go():
    global playing
    if playing == False and time_left > 0:
        playing = True
        hop()
        ontimer(tick, 1000)


def press(name):
    global score, time_left, place, playing
    if name == "New game":
        playing = False
        score = 0
        time_left = 30
        place = 0
        draw_scene()
        ontimer(go, 1100)
    if name == "Pause":
        playing = False
        hideturtle()
    if name == "Go":
        go()


def clicked(x, y):
    global score, showing, delay
    if playing and showing and inside(x, y, tx - 20, ty - 20, 40, 40):
        score = score + 1
        showing = False
        hideturtle()
        draw_scene()
    for i in range(len(names)):
        if inside(x, y, bxs[i], -190, 120, 40):
            press(names[i])
    for i in range(len(levels)):
        if inside(x, y, lxs[i], -140, 120, 40):
            delay = delays[i]
    for i in range(len(themes)):
        if inside(x, y, txs[i], 120, 120, 40):
            bgcolor(backgrounds[i])


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
# endregion
