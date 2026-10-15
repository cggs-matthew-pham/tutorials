---
title: "Catch the turtle"
subtitle: "Python functions and events · Final challenge: Catch the turtle · Lesson 9"
---

# Catch the turtle

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every game is a few rules, some data and a loop. You already know all three.


:::teacher-note

**In one sentence:** The final challenge. Students build a game in three milestones, each with less help, using everything from the course; the turtle hops along a path and players catch it before it hides.

**Students should be able to say:** I can combine variables, decisions, lists, functions and events in one program. I can use True and False to remember what is happening right now. I can build a working game step by step, testing as I go.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`hop()` moves the turtle to the next spot in the two lists, then asks the timer to run `hop` again in 1000 milliseconds.

```python
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
```

:::keep-together

**The turtle starts at place 0. Where is it after its fourth hop?**

☐ Bottom right (120, -50)

☐ Top right (120, 60)

☐ Top left (-120, 60)

☐ Top middle (0, 110)

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Bottom right (120, -50): the fourth hop uses place 3, the fourth number in each list.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
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
```

:::keep-together

### Trace the path

**Fill in place after each hop. The lists have 6 spots.**

{{rows 1}}

| hop | place used | place after |
|---|---|---|
| 1 | 0 | 1 |
| 2 | 1 |   |
| 6 | 5 |   |
| 7 |   | 1 |

:::


:::teacher-note

**Answer:** 2, 0, 0

(5 + 1) % 6 is 0, so after the sixth hop place goes back to the start of the lists.

:::


:::keep-together

### Change the path

**You want the turtle to visit a seventh spot. What do you change?**

☐ Add a number to xs only

☐ Change % len(xs) to % 7

☐ Add one number to xs and one to ys

☐ Add another hop() call

:::


:::teacher-note

**Answer:** Add one number to xs and one to ys

Each spot is one x and one y at the same place in the two lists. len(xs) already counts the new spot.

:::


:::keep-together

### Spot the bug

**Every click should add a point, but the first click stops with an error. Click the line where it goes wrong.**

```
 1  from turtle import *
 2  
 3  hideturtle()
 4  score = 0
 5  
 6  def add_point(x, y):
 7      score = score + 1
 8      clear()
 9      write(score, False, "left", ("Arial", 20, "normal"))
10  
11  onscreenclick(add_point)
12  mainloop()
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 7

Without global score, the line score = score + 1 makes a new score inside add_point and tries to read it before it has a value (UnboundLocalError). Add global score as the first line of the function so it changes the score made outside. Your game needs the same line in every function that changes score.

:::


:::typical

## Milestone 1: catch it

The turtle now remembers where it is in `tx` and `ty`. Fill in `clicked` so that a click on the turtle adds a point. Run it and try to catch the turtle.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
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
```

:::

:::


:::typical

## Milestone 2: now you see it

Too easy? Now the turtle only shows for 0.7 seconds. `showing` is `True` while it is there and `False` when it is gone. Follow the three comments that start with **Milestone 2**.

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
```

:::

:::


## Make: Milestone 3: game on

Make it a real game: a **Start** button, a 30 second timer, and a score that resets each game. The comment at the top lists the five parts. If you get stuck, the hints show one part at a time.

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
```

:::


:::wider

## Path or random?

Play a few games. Do you start moving to the next spot before the turtle arrives? Then try random spots instead. `random` is a module someone else wrote, just like your `ui.py`. `random.randint(-150, 150)` picks a whole number from -150 up to 150, a new one each time it runs, so the turtle lands somewhere new on every hop. The first number is the lowest it can pick and the second is the highest. Swap the first two lines of `hop()` for the two lines above. Copy `import random` to the top and `random.` before `randint` as they are for now; a later lesson explains how they work. Then change the numbers so the turtle only appears in the top half of the screen.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**A catch game scores a click with if showing and inside(x, y):, where showing is True only while the turtle is on screen. Why check showing as well as inside?**

{{lines-3}}

:::


:::teacher-note

**Answer:** So a click only scores while the turtle is visible. After it hides, clicking its old spot should not count.

:::

