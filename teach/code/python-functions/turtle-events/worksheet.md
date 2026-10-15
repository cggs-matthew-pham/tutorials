---
title: "Events"
subtitle: "Python functions and events · Interaction · Lesson 7"
---

# Events

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every app you use is waiting: for a tap, a key or a timer. Code runs when an event happens, not from top to bottom.


:::teacher-note

**In one sentence:** Students write programs that wait for clicks, keys and timers, and run a function (a callback) each time something happens.

**Students should be able to say:** I can make a function run when the picture is clicked or a key is pressed. I can explain why the program keeps running and waiting after the last line. I can hand a function over by its name, without brackets.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`onscreenclick(stamp)` hands the function over by **name**. The program then waits in `mainloop()`, and each click runs `stamp` with the place you clicked.

```python
from turtle import *

speed(0)
penup()


def stamp(x, y):
    goto(x, y)
    dot(30, "orange")


onscreenclick(stamp)
listen()
mainloop()
```

:::keep-together

**What happens when you click on the picture?**

☐ Nothing: the program has already finished

☐ The turtle draws a square

☐ The turtle returns to the centre

☐ An orange dot appears where you click

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** An orange dot appears at the spot you clicked. Each click runs the stamp function with the position of the click.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

Look at how the keys work: each `onkey` pairs a function with a key.

```python
from turtle import *

speed(0)


def go_up():
    setheading(90)
    forward(20)


def go_down():
    setheading(270)
    forward(20)


onkey(go_up, "Up")
onkey(go_down, "Down")
listen()
mainloop()
```

:::keep-together

### Match the lines

**Match each line with what it does.**

A. runs go_up each time the Up arrow is pressed

B. keeps the program waiting for events

C. runs step once, after 50 milliseconds

D. runs stamp each time the picture is clicked

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `onscreenclick(stamp)` | |
| `onkey(go_up, "Up")` | |
| `ontimer(step, 50)` | |
| `mainloop()` | |

:::


:::teacher-note

**Answer:** onscreenclick(stamp) → D. runs stamp each time the picture is clicked; onkey(go_up, "Up") → A. runs go_up each time the Up arrow is pressed; ontimer(step, 50) → C. runs step once, after 50 milliseconds; mainloop() → B. keeps the program waiting for events

:::


:::keep-together

### Count the presses

**The program above is running. You press the Up arrow 5 times. How many times does go_up run?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 5

The handler runs once for every press: it is called for you each time the event happens.

:::


:::keep-together

### Spot the bug

**This program should stamp a dot where you click, but it stops with an error. Click the wrong line.**

```
 1  from turtle import *
 2  
 3  def stamp(x, y):
 4      goto(x, y)
 5      dot(30)
 6  
 7  onscreenclick(stamp())
 8  mainloop()
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 7

stamp() with brackets runs the function straight away, before any click. Handing it over needs the name only: onscreenclick(stamp).

:::


:::typical

## Modify


**Restyle the stamp.** Change the size and colour of the dot.

**Stamp a square.** Make each click stamp a square.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Restyle the stamp:**

```python
from turtle import *

speed(0)
penup()


def stamp(x, y):
    goto(x, y)
    dot(50, "purple")


onscreenclick(stamp)
listen()
mainloop()
```

**Stamp a square:**

```python
from turtle import *

speed(0)
penup()


def stamp(x, y):
    goto(x, y)
    pendown()
    for i in range(4):
        forward(30)
        right(90)
    penup()


onscreenclick(stamp)
listen()
mainloop()
```

:::

:::


## Mix it up

Work this out on paper first.

:::keep-together

**The student clicks the screen 5 times. What is score afterwards?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 5

Each click calls add_point once, and each call adds 1. Because of global score, the change is kept between clicks, so score is 5.

:::


## Make

Steer the turtle with the keys: **Up** moves forward 20, **Left** turns left 30 degrees, **Right** turns right 30 degrees.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

speed(0)


def go_up():
    forward(20)


def turn_left():
    left(30)


def turn_right():
    right(30)


onkey(go_up, "Up")
onkey(turn_left, "Left")
onkey(turn_right, "Right")
listen()
mainloop()
```

:::


:::wider

## Count the clicks

Games and apps keep a **score** that changes when events happen. This program keeps `score` in a variable and shows it each time you click.

The `write(score, False, "left", ("Arial", 40, "normal"))` line is a recipe: copy it whenever you want to show a value on the screen. The first part is what to write, and the last bracket sets the font and size.

**Behind the code:** `score` is made outside the function. The line `global score` lets `add_point` change that same `score`. Without it, Python treats `score` inside the function as a new, empty name and stops with an error. Any handler that changes a variable from outside needs `global`.

Make it count by 5 instead of 1, then make a key (`r`) that resets it to zero. Then add a timer: use `ontimer` to add a point every second.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *

hideturtle()
score = 0
penup()
goto(-20, 0)


def show():
    clear()
    write(score, False, "left", ("Arial", 40, "normal"))


def add_point(x, y):
    global score
    score = score + 5
    show()


def reset():
    global score
    score = 0
    show()


def tick():
    global score
    score = score + 1
    show()
    ontimer(tick, 1000)


show()
onscreenclick(add_point)
onkey(reset, "r")
ontimer(tick, 1000)
listen()
mainloop()
```

:::

:::


## Exit ticket

:::keep-together

**What is the difference between onscreenclick(stamp) and onscreenclick(stamp())?**

{{lines-3}}

:::


:::teacher-note

**Answer:** onscreenclick(stamp) hands the function over to run on each click. stamp() with brackets runs it straight away, once, which is wrong here.

:::

