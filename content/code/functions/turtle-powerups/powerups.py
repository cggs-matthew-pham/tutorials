# region: lives
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
lives = 3
showing = False
time_left = 30
playing = False


def draw_scene():
    clear()
    goto(-190, 160)
    write(score, False, "left", ("Arial", 20, "normal"))
    goto(-20, 160)
    write(lives, False, "left", ("Arial", 20, "normal"))
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
    global showing, lives, playing
    if showing:
        lives = lives - 1
        showing = False
        hideturtle()
        if lives == 0:
            playing = False
        draw_scene()


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
    global score, lives, time_left, playing, place
    score = 0
    lives = 3
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

# region: status
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
lives = 3
showing = False
time_left = 30
playing = False


# Power-up 1: write label(x, y, name, value) here, then use it three times in draw_scene.


def draw_scene():
    clear()
    goto(-190, 160)
    write(score, False, "left", ("Arial", 20, "normal"))
    goto(-20, 160)
    write(lives, False, "left", ("Arial", 20, "normal"))
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
    global showing, lives, playing
    if showing:
        lives = lives - 1
        showing = False
        hideturtle()
        if lives == 0:
            playing = False
        draw_scene()


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
    global score, lives, time_left, playing, place
    score = 0
    lives = 3
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

# region: gold
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
lives = 3
showing = False
time_left = 30
playing = False


def label(x, y, name, value):
    goto(x, y)
    write(name, False, "left", ("Arial", 14, "normal"))
    goto(x + 55, y)
    write(value, False, "left", ("Arial", 14, "bold"))


def draw_scene():
    clear()
    label(-190, 160, "Score", score)
    label(-50, 160, "Lives", lives)
    label(90, 160, "Time", time_left)
    if playing == False:
        draw_button(-60, -180, 120, 40, "Start")
    goto(tx, ty)


# Power-up 2: a gold turtle. Add gold = False with the other variables,
# decide in hop() whether this spot is gold, draw dot(50, "gold") under it in draw_scene,
# and make a gold catch worth 5.


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
    global showing, lives, playing
    if showing:
        lives = lives - 1
        showing = False
        hideturtle()
        if lives == 0:
            playing = False
        draw_scene()


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
    global score, lives, time_left, playing, place
    score = 0
    lives = 3
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

# region: upgrade
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
lives = 3
showing = False
gold = False
time_left = 30
playing = False


def label(x, y, name, value):
    goto(x, y)
    write(name, False, "left", ("Arial", 14, "normal"))
    goto(x + 55, y)
    write(value, False, "left", ("Arial", 14, "bold"))


def draw_scene():
    clear()
    label(-190, 160, "Score", score)
    label(-50, 160, "Lives", lives)
    label(90, 160, "Time", time_left)
    if playing == False:
        draw_button(-60, -180, 120, 40, "Start")
    if showing and gold:
        goto(tx, ty)
        dot(50, "gold")
    goto(tx, ty)


def hop():
    global place, tx, ty, showing, gold
    if playing:
        tx = xs[place]
        ty = ys[place]
        place = (place + 1) % len(xs)
        if place % 3 == 0:
            gold = True
        else:
            gold = False
        showing = True
        draw_scene()
        showturtle()
        ontimer(hide, 700)
        ontimer(hop, 1000)


def hide():
    global showing, lives, playing
    if showing:
        lives = lives - 1
        showing = False
        hideturtle()
        if lives == 0:
            playing = False
        draw_scene()


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
    global score, lives, time_left, playing, place
    score = 0
    lives = 3
    time_left = 30
    place = 0
    playing = True
    draw_scene()
    hop()
    ontimer(tick, 1000)


# Power-up 3: while playing, the button says "Slow (5)". A click on it spends 5 points
# and adds 200 to delay. Use delay in hop() instead of 1000 (and delay - 300 instead of 700).


def clicked(x, y):
    global score, showing
    if playing and showing and inside(x, y, tx - 20, ty - 20, 40, 40):
        if gold:
            score = score + 5
        else:
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
lives = 3
showing = False
gold = False
time_left = 30
playing = False
delay = 1000


def label(x, y, name, value):
    goto(x, y)
    write(name, False, "left", ("Arial", 14, "normal"))
    goto(x + 55, y)
    write(value, False, "left", ("Arial", 14, "bold"))


def draw_scene():
    clear()
    label(-190, 160, "Score", score)
    label(-50, 160, "Lives", lives)
    label(90, 160, "Time", time_left)
    if playing:
        draw_button(-60, -180, 120, 40, "Slow (5)")
    else:
        draw_button(-60, -180, 120, 40, "Start")
    if showing and gold:
        goto(tx, ty)
        dot(50, "gold")
    goto(tx, ty)


def hop():
    global place, tx, ty, showing, gold
    if playing:
        tx = xs[place]
        ty = ys[place]
        place = (place + 1) % len(xs)
        if place % 3 == 0:
            gold = True
        else:
            gold = False
        showing = True
        draw_scene()
        showturtle()
        ontimer(hide, delay - 300)
        ontimer(hop, delay)


def hide():
    global showing, lives, playing
    if showing:
        lives = lives - 1
        showing = False
        hideturtle()
        if lives == 0:
            playing = False
        draw_scene()


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
    global score, lives, time_left, playing, place, delay
    score = 0
    lives = 3
    delay = 1000
    time_left = 30
    place = 0
    playing = True
    draw_scene()
    hop()
    ontimer(tick, 1000)


def clicked(x, y):
    global score, showing, delay
    if playing and showing and inside(x, y, tx - 20, ty - 20, 40, 40):
        if gold:
            score = score + 5
        else:
            score = score + 1
        showing = False
        hideturtle()
        draw_scene()
    if playing and score >= 5 and inside(x, y, -60, -180, 120, 40):
        score = score - 5
        delay = delay + 200
        draw_scene()
    if playing == False and inside(x, y, -60, -180, 120, 40):
        start()


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: sol-status
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
lives = 3
showing = False
time_left = 30
playing = False


def label(x, y, name, value):
    goto(x, y)
    write(name, False, "left", ("Arial", 14, "normal"))
    goto(x + 55, y)
    write(value, False, "left", ("Arial", 14, "bold"))


def draw_scene():
    clear()
    label(-190, 160, "Score", score)
    label(-50, 160, "Lives", lives)
    label(90, 160, "Time", time_left)
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
    global showing, lives, playing
    if showing:
        lives = lives - 1
        showing = False
        hideturtle()
        if lives == 0:
            playing = False
        draw_scene()


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
    global score, lives, time_left, playing, place
    score = 0
    lives = 3
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

# region: sol-gold
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
lives = 3
showing = False
gold = False
time_left = 30
playing = False


def label(x, y, name, value):
    goto(x, y)
    write(name, False, "left", ("Arial", 14, "normal"))
    goto(x + 55, y)
    write(value, False, "left", ("Arial", 14, "bold"))


def draw_scene():
    clear()
    label(-190, 160, "Score", score)
    label(-50, 160, "Lives", lives)
    label(90, 160, "Time", time_left)
    if playing == False:
        draw_button(-60, -180, 120, 40, "Start")
    if showing and gold:
        goto(tx, ty)
        dot(50, "gold")
    goto(tx, ty)


def hop():
    global place, tx, ty, showing, gold
    if playing:
        tx = xs[place]
        ty = ys[place]
        place = (place + 1) % len(xs)
        if place % 3 == 0:
            gold = True
        else:
            gold = False
        showing = True
        draw_scene()
        showturtle()
        ontimer(hide, 700)
        ontimer(hop, 1000)


def hide():
    global showing, lives, playing
    if showing:
        lives = lives - 1
        showing = False
        hideturtle()
        if lives == 0:
            playing = False
        draw_scene()


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
    global score, lives, time_left, playing, place
    score = 0
    lives = 3
    time_left = 30
    place = 0
    playing = True
    draw_scene()
    hop()
    ontimer(tick, 1000)


def clicked(x, y):
    global score, showing
    if playing and showing and inside(x, y, tx - 20, ty - 20, 40, 40):
        if gold:
            score = score + 5
        else:
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

# region: sol-own
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
lives = 3
showing = False
gold = False
time_left = 30
playing = False
delay = 1000
# My power-up: More time costs 10 points and adds 5 seconds.
# Fair because 10 points is about two gold turtles, and 5 seconds can win them back.


def label(x, y, name, value):
    goto(x, y)
    write(name, False, "left", ("Arial", 14, "normal"))
    goto(x + 55, y)
    write(value, False, "left", ("Arial", 14, "bold"))


def draw_scene():
    clear()
    label(-190, 160, "Score", score)
    label(-50, 160, "Lives", lives)
    label(90, 160, "Time", time_left)
    if playing:
        draw_button(-130, -180, 120, 40, "Slow (5)")
        draw_button(10, -180, 120, 40, "Time (10)")
    else:
        draw_button(-60, -180, 120, 40, "Start")
    if showing and gold:
        goto(tx, ty)
        dot(50, "gold")
    goto(tx, ty)


def hop():
    global place, tx, ty, showing, gold
    if playing:
        tx = xs[place]
        ty = ys[place]
        place = (place + 1) % len(xs)
        if place % 3 == 0:
            gold = True
        else:
            gold = False
        showing = True
        draw_scene()
        showturtle()
        ontimer(hide, delay - 300)
        ontimer(hop, delay)


def hide():
    global showing, lives, playing
    if showing:
        lives = lives - 1
        showing = False
        hideturtle()
        if lives == 0:
            playing = False
        draw_scene()


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
    global score, lives, time_left, playing, place, delay
    score = 0
    lives = 3
    delay = 1000
    time_left = 30
    place = 0
    playing = True
    draw_scene()
    hop()
    ontimer(tick, 1000)


def clicked(x, y):
    global score, showing, delay, time_left
    if playing and showing and inside(x, y, tx - 20, ty - 20, 40, 40):
        if gold:
            score = score + 5
        else:
            score = score + 1
        showing = False
        hideturtle()
        draw_scene()
    if playing and score >= 10 and inside(x, y, 10, -180, 120, 40):
        score = score - 10
        time_left = time_left + 5
        draw_scene()
    if playing and score >= 5 and inside(x, y, -130, -180, 120, 40):
        score = score - 5
        delay = delay + 200
        draw_scene()
    if playing == False and inside(x, y, -60, -180, 120, 40):
        start()


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
# endregion
