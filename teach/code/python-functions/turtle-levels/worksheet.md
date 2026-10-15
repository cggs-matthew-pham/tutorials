---
title: "Optional: Game levels"
subtitle: "Python functions and events · Final challenge: Catch the turtle · Lesson 12"
---

# Optional: Game levels

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every game is a loop that updates its data and redraws, and a few screens it moves between.


:::teacher-note

**In one sentence:** An optional lesson in the games direction. Students add screens (title, play, game over), levels that speed up and a turtle that walks between spots, the way game engines move sprites.

**Students should be able to say:** I can use a state variable to switch between screens. I can make a game harder as the score rises. I can make something move smoothly with small steps on a timer.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`state` is `"title"`, `"play"` or `"over"`. `draw_scene` draws a different screen for each one.

```python
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
```

:::keep-together

**The 30 seconds run out. What is on the screen?**

☐ The title screen

☐ Nothing: the program has stopped

☐ Game over, your score, and an Again button

☐ The turtle keeps hopping

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** tick sets state to "over", and draw_scene draws the over screen: Game over, the score and Again.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

Find every line that changes `state`. Which event causes each change?

```python
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
```

:::keep-together

**Why does this game use state with three values instead of playing = True or False?**

☐ The game has three screens, and True or False can only tell two apart

☐ So the timer works

☐ Python needs a string to draw text

☐ Strings are faster than True and False

:::


:::teacher-note

**Answer:** The game has three screens, and True or False can only tell two apart

Title, play and over are three different situations. Two values cannot tell the title screen from game over.

:::


:::typical

## levels and a moving turtle


**Levels.** Every 5 points, go up a level and make the turtle faster. Show the level at the top.

**Moving turtle.** Make the turtle walk to each spot instead of jumping, in 10 small steps. It is harder to catch, and you can see where it is heading.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Levels:**

```python
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
```

**Moving turtle:**

```python
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
```

:::

:::


## Make: your own game rule

Add a rule that makes the game your own. **Where this leads:** MakeCode Arcade and microStudio give you sprites that move by themselves and screens to switch between. Under the hood they run the same loop you just built: update the data, check for hits, redraw.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
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
```

:::


## Exit ticket

:::keep-together

**Why does this game use state = "title", "play" or "over" instead of playing = True or False?**

{{lines-3}}

:::


:::teacher-note

**Answer:** There are three screens, and True or False can only tell two situations apart.

:::

