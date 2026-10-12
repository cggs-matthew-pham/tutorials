# region: states
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
showing = False
time_left = 30
state = "title"


def big(text, x, y):
    goto(x, y)
    write(text, False, "left", ("Arial", 28, "bold"))


def draw_scene():
    clear()
    if state == "title":
        big("Catch the turtle", -140, 40)
        draw_button(-60, -180, 120, 40, "Play")
    if state == "play":
        goto(-190, 160)
        write(score, False, "left", ("Arial", 20, "normal"))
        goto(150, 160)
        write(time_left, False, "left", ("Arial", 20, "normal"))
    if state == "over":
        big("Game over", -90, 40)
        big(score, -10, -10)
        draw_button(-60, -180, 120, 40, "Again")
    goto(tx, ty)


def hop():
    global place, tx, ty, showing
    if state == "play":
        tx = xs[place]
        ty = ys[place]
        place = (place + 1) % len(xs)
        goto(tx, ty)
        showturtle()
        showing = True
        ontimer(hide, 700)
        ontimer(hop, 1000)


def hide():
    global showing
    if showing:
        showing = False
        hideturtle()


def tick():
    global time_left, state
    if state == "play":
        time_left = time_left - 1
        if time_left == 0:
            state = "over"
            hideturtle()
        else:
            ontimer(tick, 1000)
        draw_scene()


def start():
    global score, time_left, place, state
    score = 0
    time_left = 30
    place = 0
    state = "play"
    draw_scene()
    hop()
    ontimer(tick, 1000)


def clicked(x, y):
    global score, showing
    if state == "play" and showing and inside(x, y, tx - 20, ty - 20, 40, 40):
        score = score + 1
        showing = False
        hideturtle()
        draw_scene()
    if state != "play" and inside(x, y, -60, -180, 120, 40):
        start()


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: levels
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
showing = False
time_left = 30
state = "title"

# Levels: add level = 1 and delay = 1000. Every 5 points, go up a level and take 150 off delay
# (but never below 400). Show the level at goto(-30, 160), and use delay in hop().


def big(text, x, y):
    goto(x, y)
    write(text, False, "left", ("Arial", 28, "bold"))


def draw_scene():
    clear()
    if state == "title":
        big("Catch the turtle", -140, 40)
        draw_button(-60, -180, 120, 40, "Play")
    if state == "play":
        goto(-190, 160)
        write(score, False, "left", ("Arial", 20, "normal"))
        goto(150, 160)
        write(time_left, False, "left", ("Arial", 20, "normal"))
    if state == "over":
        big("Game over", -90, 40)
        big(score, -10, -10)
        draw_button(-60, -180, 120, 40, "Again")
    goto(tx, ty)


def hop():
    global place, tx, ty, showing
    if state == "play":
        tx = xs[place]
        ty = ys[place]
        place = (place + 1) % len(xs)
        goto(tx, ty)
        showturtle()
        showing = True
        ontimer(hide, 700)
        ontimer(hop, 1000)


def hide():
    global showing
    if showing:
        showing = False
        hideturtle()


def tick():
    global time_left, state
    if state == "play":
        time_left = time_left - 1
        if time_left == 0:
            state = "over"
            hideturtle()
        else:
            ontimer(tick, 1000)
        draw_scene()


def start():
    global score, time_left, place, state
    score = 0
    time_left = 30
    place = 0
    state = "play"
    draw_scene()
    hop()
    ontimer(tick, 1000)


def clicked(x, y):
    global score, showing
    if state == "play" and showing and inside(x, y, tx - 20, ty - 20, 40, 40):
        score = score + 1
        showing = False
        hideturtle()
        draw_scene()
    if state != "play" and inside(x, y, -60, -180, 120, 40):
        start()


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: glide
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
showing = False
time_left = 30
state = "title"
level = 1
delay = 1000


def big(text, x, y):
    goto(x, y)
    write(text, False, "left", ("Arial", 28, "bold"))


def draw_scene():
    clear()
    if state == "title":
        big("Catch the turtle", -140, 40)
        draw_button(-60, -180, 120, 40, "Play")
    if state == "play":
        goto(-190, 160)
        write(score, False, "left", ("Arial", 20, "normal"))
        goto(150, 160)
        write(time_left, False, "left", ("Arial", 20, "normal"))
        goto(-30, 160)
        write(level, False, "left", ("Arial", 20, "normal"))
    if state == "over":
        big("Game over", -90, 40)
        big(score, -10, -10)
        draw_button(-60, -180, 120, 40, "Again")
    goto(tx, ty)


# Moving turtle: instead of jumping, the turtle walks to the next spot in 10 small steps,
# one every 50 milliseconds. Add steps, dx and dy, a move() function that takes one step and
# calls ontimer(move, 50) while steps > 0, and make hop() set dx, dy and steps, then call move().


def hop():
    global place, tx, ty, showing
    if state == "play":
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
    global time_left, state
    if state == "play":
        time_left = time_left - 1
        if time_left == 0:
            state = "over"
            hideturtle()
        else:
            ontimer(tick, 1000)
        draw_scene()


def start():
    global score, time_left, place, state, level, delay
    level = 1
    delay = 1000
    score = 0
    time_left = 30
    place = 0
    state = "play"
    draw_scene()
    hop()
    ontimer(tick, 1000)


def clicked(x, y):
    global score, showing, level, delay
    if state == "play" and showing and inside(x, y, tx - 20, ty - 20, 40, 40):
        score = score + 1
        if score % 5 == 0 and delay > 400:
            level = level + 1
            delay = delay - 150
        showing = False
        hideturtle()
        draw_scene()
    if state != "play" and inside(x, y, -60, -180, 120, 40):
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
showing = False
time_left = 30
state = "title"
level = 1
delay = 1000
steps = 0
dx = 0
dy = 0


def big(text, x, y):
    goto(x, y)
    write(text, False, "left", ("Arial", 28, "bold"))


def draw_scene():
    clear()
    if state == "title":
        big("Catch the turtle", -140, 40)
        draw_button(-60, -180, 120, 40, "Play")
    if state == "play":
        goto(-190, 160)
        write(score, False, "left", ("Arial", 20, "normal"))
        goto(150, 160)
        write(time_left, False, "left", ("Arial", 20, "normal"))
        goto(-30, 160)
        write(level, False, "left", ("Arial", 20, "normal"))
    if state == "over":
        big("Game over", -90, 40)
        big(score, -10, -10)
        draw_button(-60, -180, 120, 40, "Again")
    goto(tx, ty)


def move():
    global tx, ty, steps
    if state == "play" and steps > 0:
        tx = tx + dx
        ty = ty + dy
        goto(tx, ty)
        steps = steps - 1
        ontimer(move, 50)


def hop():
    global place, showing, steps, dx, dy
    if state == "play":
        dx = (xs[place] - tx) / 10
        dy = (ys[place] - ty) / 10
        steps = 10
        place = (place + 1) % len(xs)
        showturtle()
        showing = True
        move()
        ontimer(hide, delay - 300)
        ontimer(hop, delay)


def hide():
    global showing
    if showing:
        showing = False
        hideturtle()


def tick():
    global time_left, state
    if state == "play":
        time_left = time_left - 1
        if time_left == 0:
            state = "over"
            hideturtle()
        else:
            ontimer(tick, 1000)
        draw_scene()


def start():
    global score, time_left, place, state, level, delay
    level = 1
    delay = 1000
    score = 0
    time_left = 30
    place = 0
    state = "play"
    draw_scene()
    hop()
    ontimer(tick, 1000)


def clicked(x, y):
    global score, showing, level, delay
    if state == "play" and showing and inside(x, y, tx - 20, ty - 20, 40, 40):
        score = score + 1
        if score % 5 == 0 and delay > 400:
            level = level + 1
            delay = delay - 150
        showing = False
        hideturtle()
        draw_scene()
    if state != "play" and inside(x, y, -60, -180, 120, 40):
        start()


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: sol-levels
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
showing = False
time_left = 30
state = "title"
level = 1
delay = 1000


def big(text, x, y):
    goto(x, y)
    write(text, False, "left", ("Arial", 28, "bold"))


def draw_scene():
    clear()
    if state == "title":
        big("Catch the turtle", -140, 40)
        draw_button(-60, -180, 120, 40, "Play")
    if state == "play":
        goto(-190, 160)
        write(score, False, "left", ("Arial", 20, "normal"))
        goto(150, 160)
        write(time_left, False, "left", ("Arial", 20, "normal"))
        goto(-30, 160)
        write(level, False, "left", ("Arial", 20, "normal"))
    if state == "over":
        big("Game over", -90, 40)
        big(score, -10, -10)
        draw_button(-60, -180, 120, 40, "Again")
    goto(tx, ty)


def hop():
    global place, tx, ty, showing
    if state == "play":
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
    global time_left, state
    if state == "play":
        time_left = time_left - 1
        if time_left == 0:
            state = "over"
            hideturtle()
        else:
            ontimer(tick, 1000)
        draw_scene()


def start():
    global score, time_left, place, state, level, delay
    level = 1
    delay = 1000
    score = 0
    time_left = 30
    place = 0
    state = "play"
    draw_scene()
    hop()
    ontimer(tick, 1000)


def clicked(x, y):
    global score, showing, level, delay
    if state == "play" and showing and inside(x, y, tx - 20, ty - 20, 40, 40):
        score = score + 1
        if score % 5 == 0 and delay > 400:
            level = level + 1
            delay = delay - 150
        showing = False
        hideturtle()
        draw_scene()
    if state != "play" and inside(x, y, -60, -180, 120, 40):
        start()


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
# endregion

# region: sol-best
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
showing = False
time_left = 30
state = "title"
best = 0
level = 1
delay = 1000
steps = 0
dx = 0
dy = 0


def big(text, x, y):
    goto(x, y)
    write(text, False, "left", ("Arial", 28, "bold"))


def draw_scene():
    clear()
    if state == "title":
        big("Catch the turtle", -140, 40)
        draw_button(-60, -180, 120, 40, "Play")
    if state == "play":
        goto(-190, 160)
        write(score, False, "left", ("Arial", 20, "normal"))
        goto(150, 160)
        write(time_left, False, "left", ("Arial", 20, "normal"))
        goto(-30, 160)
        write(level, False, "left", ("Arial", 20, "normal"))
    if state == "over":
        big("Game over", -90, 40)
        big(score, -10, -10)
        goto(-60, -60)
        write("Best:", False, "left", ("Arial", 16, "normal"))
        goto(0, -60)
        write(best, False, "left", ("Arial", 16, "bold"))
        draw_button(-60, -180, 120, 40, "Again")
    goto(tx, ty)


def move():
    global tx, ty, steps
    if state == "play" and steps > 0:
        tx = tx + dx
        ty = ty + dy
        goto(tx, ty)
        steps = steps - 1
        ontimer(move, 50)


def hop():
    global place, showing, steps, dx, dy
    if state == "play":
        dx = (xs[place] - tx) / 10
        dy = (ys[place] - ty) / 10
        steps = 10
        place = (place + 1) % len(xs)
        showturtle()
        showing = True
        move()
        ontimer(hide, delay - 300)
        ontimer(hop, delay)


def hide():
    global showing
    if showing:
        showing = False
        hideturtle()


def tick():
    global time_left, state, best
    if state == "play":
        time_left = time_left - 1
        if time_left == 0:
            state = "over"
            if score > best:
                best = score
            hideturtle()
        else:
            ontimer(tick, 1000)
        draw_scene()


def start():
    global score, time_left, place, state, level, delay
    level = 1
    delay = 1000
    score = 0
    time_left = 30
    place = 0
    state = "play"
    draw_scene()
    hop()
    ontimer(tick, 1000)


def clicked(x, y):
    global score, showing, level, delay
    if state == "play" and showing and inside(x, y, tx - 20, ty - 20, 40, 40):
        score = score + 1
        if score % 5 == 0 and delay > 400:
            level = level + 1
            delay = delay - 150
        showing = False
        hideturtle()
        draw_scene()
    if state != "play" and inside(x, y, -60, -180, 120, 40):
        start()


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
# endregion
