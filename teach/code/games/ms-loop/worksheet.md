---
title: "A game loop"
subtitle: "Games with microStudio · The game loop · Lesson 1"
---

# A game loop

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every game you have played redraws the whole screen about 60 times a second. Between pictures, the game moves everything a tiny bit.


:::teacher-note

**In one sentence:** Students meet microStudio's game loop (init once, then update and draw 60 times a second), copy a moving-dot game into their own microStudio project, fix a missing global, then make a dot move up and bounce, and make two things move their own way.

**Students should be able to say:** I can make a game in microStudio and run it. I can say what init, update and draw each do, and when they run. I can make something move by changing a value in update and drawing it in draw.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Nobody calls `update()` in this code. Who does, and how often?

```python
def init():
    global x
    x = 0

def update():
    global x
    x += 1

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRound(x, 0, 10, 10, "rgb(255,210,0)")
```

:::keep-together

**What happens when the game runs?**

☐ A yellow dot sits still in the middle

☐ Nothing: no function is called

☐ A yellow dot slides to the right and off the screen

☐ A yellow dot jumps to x = 1 and stops

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The dot slides right. update() runs 60 times a second, so x goes up by 1 each time: 60 steps to the right every second. Nothing brings it back, so it slides off the edge.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
def init():
    global x
    x = -100

def update():
    global x
    x += 1
    if x > 100:
        x = -100

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRound(x, 0, 10, 10, "rgb(255,210,0)")
    screen.drawText("x = " + str(x), 0, 80, 10, "#FFF")
```

:::keep-together

### When does each run?

**Match each function with when the engine runs it.**

A. after each update, to show things

B. 60 times a second, to change things

C. once, when the game starts

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `init()` | |
| `update()` | |
| `draw()` | |

:::


:::teacher-note

**Answer:** init() → C. once, when the game starts; update() → B. 60 times a second, to change things; draw() → A. after each update, to show things

:::


:::keep-together

### How far?

**The game has run for 2 seconds. About how far has the dot moved?**

☐ 200 steps

☐ 2 steps

☐ 120 steps

☐ 60 steps

:::


:::teacher-note

**Answer:** 120 steps

update() runs 60 times a second and adds 1 to x each time: 2 × 60 = 120 steps (it wraps back to -100 after 200).

:::


:::keep-together

### Spot the bug

**This stops with an error: cannot access local variable 'x'. Click the line where it goes wrong.**

```
 1  def init():
 2      global x
 3      x = 0
 4  
 5  def update():
 6      x += 1
 7  
 8  def draw():
 9      screen.clear("rgb(10,10,40)")
10      screen.fillRound(x, 0, 10, 10, "rgb(255,210,0)")
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 6

x += 1 changes x, but update() has no global x line, so Python looks for an x made inside update() and finds none. Add global x as the first line of update().

:::


:::typical

## Modify


**Up, not across.** In your microStudio project, make the dot move **up** the screen instead, and start again at the bottom.

**Bounce.** Make the dot **bounce** off each edge instead of starting again. The game on this page shows a bouncing dot.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Up, not across:**

```python
def init():
    global y
    y = -100

def update():
    global y
    y += 1
    if y > 100:
        y = -100

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRound(0, y, 10, 10, "rgb(255,210,0)")
    screen.drawText("y = " + str(y), 0, 80, 10, "#FFF")
```

**Bounce:**

```python
def init():
    global x, dx
    x = 0
    dx = 1

def update():
    global x, dx
    x += dx
    if x > 100 or x < -100:
        dx = -dx

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRound(x, 0, 10, 10, "rgb(255,210,0)")
```

:::

:::


## Make: something that moves

Start from this empty game in microStudio and make at least **two things move** in different ways: one faster than the other, one going the other way, one changing size... The game on this page is one idea. `screen.fillRect(x, y, width, height, colour)` draws a box, `screen.fillRound(...)` a dot, and `screen.drawText(text, x, y, size, colour)` writes.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
def init():
    global t
    t = 0

def update():
    global t
    t += 1

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRound(t % 200 - 100, 40, 12, 12, "rgb(255,210,0)")
    screen.fillRound(100 - t % 200, -40, 12, 12, "rgb(255,100,120)")
    screen.drawText("Frames: " + str(t), 0, 80, 10, "#FFF")
```

:::


:::wider

## Where this leads

Every game engine works this way: Unity, Godot, Pico-8 and MakeCode Arcade all call an update and a draw function every frame. Next: move something with the arrow keys.

:::


## Exit ticket

:::keep-together

**Why does draw() start with screen.clear(...)?**

{{lines-3}}

:::


:::teacher-note

**Answer:** draw() runs 60 times a second; without clearing, every old picture of the dot would stay, making a smear.

:::

