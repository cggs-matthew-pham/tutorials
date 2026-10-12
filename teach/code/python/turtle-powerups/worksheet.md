---
title: "Power-ups"
subtitle: "Python Foundations with Turtle · Final challenge: Catch the turtle · Lesson 13"
---

# Power-ups

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Games and apps are built from the same parts: buttons that change state, and rules about what each change means.


:::teacher-note

**In one sentence:** The second half of the final challenge. Students add lives, a status bar, a gold turtle worth 5 and an upgrade bought with points, then invent a power-up of their own.

**Students should be able to say:** I can tell which parts of a program are the user interface and which are the rules. I can write a function with four parameters and use it several times. I can add a rule that costs something, and explain why the cost is fair.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

This is your game with **lives** in place of misses. Read `hide()`: what changes when the turtle escapes?

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
```

:::keep-together

**You start a game and miss three turtles in a row. What happens?**

☐ The game ends after the first miss

☐ Lives goes below 0 and the game carries on

☐ Nothing: misses are not counted

☐ Lives goes 3, 2, 1, 0 and the game stops with the Start button back

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Each miss takes a life. At 0, playing becomes False, so hop stops and the Start button is drawn again.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

Look at the program again: which lines draw things the player sees, and which lines decide what happens?

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
```

:::keep-together

**Each part of a game is user interface, a game rule, or both. Match them.**

A. user interface: the player acts

B. user interface: shows the state

C. game rule: what an event means

D. game rule: a reward

E. both: a control that follows a rule

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `The status bar showing score, lives and time` | |
| `The Start button` | |
| `Losing a life when a turtle escapes` | |
| `A gold turtle worth 5 points` | |
| `A button that costs 5 points to use` | |

:::


:::teacher-note

**Answer:** The status bar showing score, lives and time → B. user interface: shows the state; The Start button → A. user interface: the player acts; Losing a life when a turtle escapes → C. game rule: what an event means; A gold turtle worth 5 points → D. game rule: a reward; A button that costs 5 points to use → E. both: a control that follows a rule

Apps are mostly user interface around some rules; games are mostly rules with some user interface. You are building both.

:::


:::typical

## Add the power-ups


**Status bar.** Write `label(x, y, name, value)` and use it to show **Score**, **Lives** and **Time** across the top. One function, three calls.

**Gold turtle.** Every third spot, the turtle is gold: draw a gold circle under it, and make catching it worth **5**.

**Upgrade button.** While playing, the button says **Slow (5)**. Clicking it spends 5 points and slows the turtle down by 200 milliseconds, but only if you can afford it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Status bar:**

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
```

**Gold turtle:**

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
```

**Upgrade button:**

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
```

:::

:::


## Make: your own power-up

Invent a power-up of your own. Decide what it does, what it costs and when it can be used, then build it. Write one sentence (as a comment at the top) that explains why the cost is fair.

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
```

:::


## Exit ticket

:::keep-together

**Name one part of your game that is user interface and one that is a game rule.**

{{lines-3}}

:::


:::teacher-note

**Answer:** For example: the status bar is user interface (it shows the state); losing a life on a miss is a game rule.

:::

