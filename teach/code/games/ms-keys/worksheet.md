---
title: "Keys and movement"
subtitle: "Games with microStudio · The game loop · Lesson 2"
---

# Keys and movement

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A game asks the keyboard a question 60 times a second: is the left arrow down right now?


:::teacher-note

**In one sentence:** Students check the arrow keys every frame in update() to move a paddle, trace its position frame by frame, find why keyboard.LEFT fails before a key is pressed, keep the paddle on the screen, add up and down, and make a player with an extra key of their own.

**Students should be able to say:** I can move something with the arrow keys in a game loop. I can keep a value between two limits with if. I can explain why a held key moves something smoothly.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

How many times does `update()` run while you hold the key?

```python
def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0

def init():
    global px
    px = 0

def update():
    global px
    if pressed("LEFT"):
        px -= 2
    if pressed("RIGHT"):
        px += 2

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
```

:::keep-together

**You hold the right arrow for one second. What happens to the paddle?**

☐ It moves 120 steps right, smoothly

☐ It moves right and keeps going after you let go

☐ It moves 2 steps right, once

☐ It jumps to the right edge

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It moves 120 steps right. update() runs 60 times in that second, and each time the key is down px goes up by 2. Let go and pressed("RIGHT") is false, so it stops.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0

def init():
    global px
    px = 0

def update():
    global px
    if pressed("LEFT"):
        px -= 2
    if pressed("RIGHT"):
        px += 2

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
    screen.drawText("px = " + str(px), 0, 80, 10, "#FFF")
```

:::keep-together

### Trace the paddle

**px starts at 0. Fill in px after each frame.**

{{rows 1}}

| frame | key down | px |
|---|---|---|
| 1 | RIGHT | 2 |
| 2 | RIGHT |   |
| 3 | none |   |
| 4 | LEFT |   |

:::


:::teacher-note

**Answer:** 4, 4, 2

Each frame with RIGHT down adds 2, a frame with no key changes nothing, and LEFT takes 2 away.

:::


:::keep-together

### Faster

**How would you make the paddle move faster?**

☐ Change px -= 2 and px += 2 to a bigger number, such as 4

☐ Hold the key down harder

☐ Call update() twice

☐ Change -80 to a bigger number

:::


:::teacher-note

**Answer:** Change px -= 2 and px += 2 to a bigger number, such as 4

The paddle moves 2 steps a frame. 4 steps a frame is twice as fast. -80 is how high up the paddle is drawn.

:::


:::keep-together

### Spot the bug

**This looks right, but it stops with AttributeError: no attribute 'LEFT' before any key is pressed. Click the line where it goes wrong.**

```
 1  def init():
 2      global px
 3      px = 0
 4  
 5  def update():
 6      global px
 7      if keyboard.LEFT:
 8          px -= 2
 9      if keyboard.RIGHT:
10          px += 2
11  
12  def draw():
13      screen.clear("rgb(10,10,40)")
14      screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 7

microStudio adds keyboard.LEFT only after the first key press, so asking for it before then fails. The pressed() helper first checks the key is there with hasattr, so it is safe from the first frame.

:::


:::typical

## Modify


**Stay on the screen.** Hold the right arrow for a while: the paddle disappears off the edge. Make it **stop at both edges**. The game on this page does.

**Up and down too.** Make the up and down arrows move the paddle too.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Stay on the screen:**

```python
def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0

def init():
    global px
    px = 0

def update():
    global px
    if pressed("LEFT"):
        px -= 2
    if pressed("RIGHT"):
        px += 2
    if px > 90:
        px = 90
    if px < -90:
        px = -90

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
    screen.drawText("px = " + str(px), 0, 80, 10, "#FFF")
```

**Up and down too:**

```python
def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0

def init():
    global px, py
    px = 0
    py = -80

def update():
    global px, py
    if pressed("UP"):
        py += 2
    if pressed("DOWN"):
        py -= 2
    if pressed("LEFT"):
        px -= 2
    if pressed("RIGHT"):
        px += 2

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRect(px, py, 24, 6, "rgb(100,200,255)")
    screen.drawText("px = " + str(px), 0, 80, 10, "#FFF")
```

:::

:::


## Make: a player that moves

Make a player you can move all four ways, then add one thing of your own: a key that makes it go faster, a different colour when it is moving, wrapping round to the other side at the edges... Key names include `"SPACE"`, `"ENTER"` and letters such as `"Q"` (`"LEFT"` and the other arrows also work with W, A, S and D). The game on this page goes fast while you hold Space.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0

def init():
    global x, y
    x = 0
    y = 0

def update():
    global x, y
    step = 1
    if pressed("SPACE"):
        step = 3
    if pressed("LEFT"):
        x -= step
    if pressed("RIGHT"):
        x += step
    if pressed("UP"):
        y += step
    if pressed("DOWN"):
        y -= step

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRound(x, y, 14, 14, "rgb(120,255,160)")
    screen.drawText("Hold SPACE to go fast", 0, 85, 8, "#FFF")
```

:::


:::wider

## Where this leads

Asking every frame is called **polling**; MakeCode and Godot can do both, polling and events. Next: lots of stars falling at once, each one an object.

:::


## Exit ticket

:::keep-together

**Why does the paddle stop when you let go of the key?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Each frame update() asks whether the key is down; when it is not, px is not changed, so the paddle stays where it is.

:::

