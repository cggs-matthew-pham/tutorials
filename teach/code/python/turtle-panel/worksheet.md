---
title: "Optional: Control panel"
subtitle: "Python Foundations with Turtle · Final challenge: Catch the turtle · Lesson 14"
---

# Optional: Control panel

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every app is a panel of controls over some state. Build the panel from data, and adding a control is one more item in a list.


:::teacher-note

**In one sentence:** An optional lesson in the user interface direction. Students turn the game into an app with rows of buttons built from lists, so adding a control means adding to a list.

**Students should be able to say:** I can draw a row of buttons from lists with a loop. I can find which button was clicked with a loop. I can add a control to an app by adding to its lists.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`names` and `bxs` hold one button each at the same index. `draw_scene` loops over them to draw, and `clicked` loops over them to check.

```python
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
```

:::keep-together

**You click at x = 0 on the row of buttons. Which button is pressed?**

☐ Go

☐ Pause

☐ New game

☐ None of them

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Pause: its button starts at bxs[1] = -60 and is 120 wide, so it covers x from -60 to 60.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
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
```

:::keep-together

### Follow a click

**A click at x = 100, y = -170. Follow the loop in clicked.**

{{rows 1}}

| i | bxs[i] | inside? |
|---|---|---|
| 0 | -190 | no |
| 1 |   |   |
| 2 |   |   |

:::


:::teacher-note

**Answer:** -60, no, 70, yes

Only the third button covers x = 100 (it runs from 70 to 190), so press("Go") runs.

:::


:::keep-together

### Keep the lists in step

**You add a fourth name to names but forget to add a position to bxs. What happens?**

☐ The button appears at x = 0

☐ Nothing changes

☐ An error: the loop asks for bxs[3], which does not exist

☐ Python adds a position for you

:::


:::teacher-note

**Answer:** An error: the loop asks for bxs[3], which does not exist

The loops go up to len(names), so they ask for a fourth position. Parallel lists must stay the same length.

:::


:::typical

## difficulty row

Add a second row: **Easy**, **Medium** and **Hard**. Each one sets how fast the turtle hops. Three more lists, two more loops.

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
```

:::

:::


## Make: your own controls

Add a row of controls you design. **Where this leads:** in Gradio, you list the controls (`gr.Button`, `gr.Radio`) and Gradio draws them and checks the clicks for you. On a web page, HTML draws the buttons and JavaScript listens for clicks. You have just built what both of them do.

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
```

:::


## Exit ticket

:::keep-together

**A panel has names = ["A", "B", "C"] and bxs = [-190, -60, 70], each button 120 wide. Which button does a click at x = -100 press?**

{{lines-3}}

:::


:::teacher-note

**Answer:** A. Its button runs from -190 to -70, and -100 is inside that range.

:::

