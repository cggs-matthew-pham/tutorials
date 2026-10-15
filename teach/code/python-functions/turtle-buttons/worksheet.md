---
title: "Build a button"
subtitle: "Python functions and events · Interaction · Lesson 8"
---

# Build a button

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Frameworks give you a button in one line. Underneath, it is a rectangle, a label and a check that a click landed inside. You are about to build all three.


:::teacher-note

**In one sentence:** Students build a working button from scratch (a rectangle, a label and a check that a click landed inside), and find out what every app's buttons are really doing.

**Students should be able to say:** I can check whether a click landed inside a rectangle. I can make a click change a variable and redraw the screen. I can explain what a button does behind the scenes.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The button's corner is at `(bx, by)`. It is `bw` wide and `bh` high. A click at `(x, y)` is inside when `x` is between `bx` and `bx + bw`, **and** `y` is between `by` and `by + bh`.

```python
from turtle import *

speed(0)
hideturtle()
bx = -60
by = -25
bw = 120
bh = 50

penup()
goto(bx, by)
pendown()
for i in range(2):
    forward(bw)
    left(90)
    forward(bh)
    left(90)
penup()
goto(bx + 10, by + 15)
write("Press me")


def clicked(x, y):
    if x > bx and x < bx + bw and y > by and y < by + bh:
        print("button pressed")
    else:
        print("missed")


onscreenclick(clicked)
listen()
mainloop()
```

:::keep-together

**You click the very centre of the picture, at (0, 0). What does the program print?**

☐ missed

☐ button pressed

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** button pressed. The button runs from x = -60 to 60 and from y = -25 to 25, and (0, 0) is inside it.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

The program above counts presses. `draw_scene` redraws everything, and `clicked` checks the click.

```python
from turtle import *

speed(0)
hideturtle()
bx = -60
by = -25
bw = 120
bh = 50
count = 0


def draw_scene():
    clear()
    penup()
    goto(bx, by)
    pendown()
    for i in range(2):
        forward(bw)
        left(90)
        forward(bh)
        left(90)
    penup()
    goto(bx + 10, by + 15)
    write("Click me")
    goto(-20, 70)
    write(count, False, "left", ("Arial", 24, "normal"))


def clicked(x, y):
    global count
    if x > bx and x < bx + bw and y > by and y < by + bh:
        count = count + 1
        draw_scene()


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
```

:::keep-together

### Test some clicks

**The button runs from x = -60 to 60 and y = -25 to 25. Fill in whether each click is inside.**

{{rows 1}}

| click x | click y | inside? |
|---|---|---|
| 0 | 0 | yes |
| 80 | 0 |   |
| -30 | 20 |   |
| 10 | 40 |   |

:::


:::teacher-note

**Answer:** no, yes, no

A click is inside only when all four comparisons are true. x = 80 is past the right edge, and y = 40 is above the top.

:::


:::keep-together

### Find the right edge

**A button has bx = -60 and bw = 120. What is the largest x that counts as the right edge?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 60

The right edge is bx + bw = -60 + 120 = 60.

:::


:::keep-together

### Spot the bug

**Every click counts as a press, even one far from the button. Click the wrong line.**

```
 1  bx = -60
 2  by = -25
 3  bw = 120
 4  bh = 50
 5  
 6  def clicked(x, y):
 7      if x > bx or x < bx + bw or y > by or y < by + bh:
 8          print("button pressed")
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 7

With or, one true comparison is enough, and x &gt; bx alone is true for most clicks. A click is inside only when all four are true, so they are joined with and.

:::


:::typical

## Modify


**Move and resize it.** Make the button bigger and move it to a new place.

**Change what a click does.** Make each click add 5 instead of 1.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Move and resize it:**

```python
from turtle import *

speed(0)
hideturtle()
bx = -100
by = -80
bw = 200
bh = 70
count = 0


def draw_scene():
    clear()
    penup()
    goto(bx, by)
    pendown()
    for i in range(2):
        forward(bw)
        left(90)
        forward(bh)
        left(90)
    penup()
    goto(bx + 10, by + 25)
    write("Click me")
    goto(-20, 70)
    write(count, False, "left", ("Arial", 24, "normal"))


def clicked(x, y):
    global count
    if x > bx and x < bx + bw and y > by and y < by + bh:
        count = count + 1
        draw_scene()


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
```

**Change what a click does:**

```python
from turtle import *

speed(0)
hideturtle()
bx = -60
by = -25
bw = 120
bh = 50
count = 0


def draw_scene():
    clear()
    penup()
    goto(bx, by)
    pendown()
    for i in range(2):
        forward(bw)
        left(90)
        forward(bh)
        left(90)
    penup()
    goto(bx + 10, by + 15)
    write("Click me")
    goto(-20, 70)
    write(count, False, "left", ("Arial", 24, "normal"))


def clicked(x, y):
    global count
    if x > bx and x < bx + bw and y > by and y < by + bh:
        count = count + 5
        draw_scene()


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
```

:::

:::


## Mix it up

Work this out on paper first.

:::keep-together

**The student clicks at x = 120. How many times does "pressed" appear?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 0

120 is not between 0 and 100, so the condition is false and the print does not run. Zero times.

:::


## Make

Build a counter with **two buttons**: `+1` on the left and `-1` on the right, with the number shown above.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

speed(0)
hideturtle()
count = 0


def draw_button(bx, by, label):
    penup()
    goto(bx, by)
    pendown()
    for i in range(2):
        forward(100)
        left(90)
        forward(50)
        left(90)
    penup()
    goto(bx + 40, by + 18)
    write(label)


def draw_scene():
    clear()
    draw_button(-120, -25, "+1")
    draw_button(20, -25, "-1")
    goto(-10, 70)
    write(count, False, "left", ("Arial", 24, "normal"))


def clicked(x, y):
    global count
    if x > -120 and x < -20 and y > -25 and y < 25:
        count = count + 1
    if x > 20 and x < 120 and y > -25 and y < 25:
        count = count - 1
    draw_scene()


draw_scene()
onscreenclick(clicked)
listen()
mainloop()
```

:::


:::wider

## Pick a background colour

A control panel is a list of buttons. This program keeps the button names in a list, draws one button for each with a loop, and uses a loop in `clicked` to find which one was pressed. Add `"lightgreen"` to the list and see a fifth button appear. Then change the panel so the buttons sit in two rows.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

speed(0)
hideturtle()
names = ["white", "yellow", "lightblue", "pink", "lightgreen"]
# Where each button goes: three on the top row, two below.
bxs = [-170, -60, 50, -170, -60]
bys = [20, 20, 20, -40, -40]
bw = 100
bh = 40


def draw_button(bx, by, label):
    penup()
    goto(bx, by)
    pendown()
    for i in range(2):
        forward(bw)
        left(90)
        forward(bh)
        left(90)
    penup()
    goto(bx + 10, by + 12)
    write(label)


def clicked(x, y):
    for i in range(len(names)):
        if x > bxs[i] and x < bxs[i] + bw and y > bys[i] and y < bys[i] + bh:
            bgcolor(names[i])


for i in range(len(names)):
    draw_button(bxs[i], bys[i], names[i])

onscreenclick(clicked)
listen()
mainloop()
```

:::

:::


:::wider

## Use your toolkit

You wrote the drawing and the click check by hand. Real programs keep them in a module. `ui` holds both as functions: `draw_button` and `inside`. Use them to add a second button that takes one away. Compare how many lines this took with your hand-built version.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *
from ui import draw_button, inside

speed(0)
hideturtle()
count = 0
draw_button(-140, -25, 120, 50, "Add one")
draw_button(20, -25, 120, 50, "Take one")


def clicked(x, y):
    global count
    if inside(x, y, -140, -25, 120, 50):
        count = count + 1
        print(count)
    if inside(x, y, 20, -25, 120, 50):
        count = count - 1
        print(count)


onscreenclick(clicked)
listen()
mainloop()
```

:::

:::


## Exit ticket

:::keep-together

**A button has bx = 0, by = 0, bw = 100, bh = 40. Is a click at (50, 50) inside? Why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** No. x = 50 is between 0 and 100, but y = 50 is above the top edge (0 + 40 = 40).

:::

