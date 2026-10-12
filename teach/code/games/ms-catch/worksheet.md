---
title: "Catch and score"
subtitle: "Games with microStudio · A whole game · Lesson 4"
---

# Catch and score

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A game is a loop, things that move, and one question asked every frame: are these two touching?


:::teacher-note

**In one sentence:** Students put the paddle and the stars together, test touching with abs() and and, see why a caught star must restart, fix a score that sets instead of adds, then add lives, a game over, a restart on Space, and a power-up of their own.

**Students should be able to say:** I can check whether two things touch, every frame. I can keep a score and lives, and end the game when the lives run out. I can start a game again by calling init().

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`abs()` gives a distance without its sign: `abs(-4)` is `4`. Work out each distance across and up.

```python
def touches(sx, sy, x, y):
    return abs(sx - x) < 12 and abs(sy - y) < 8

print(touches(10, -76, 0, -80))
print(touches(30, -80, 0, -80))
```

:::keep-together

**What does it print?**

☐ True, then False

☐ True, then True

☐ False, then True

☐ False, then False

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** True, then False. The first star is 10 across and 4 up from the paddle: both are close enough (under 12 and under 8). The second is 30 across, too far.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
import random

class Star:
    def __init__(self, x):
        self.x = x
        self.y = 100
        self.speed = random.randint(5, 15) / 10

    def move(self):
        self.y -= self.speed
        if self.y < -100:
            self.restart()

    def touches(self, x, y):
        return abs(self.x - x) < 12 and abs(self.y - y) < 8

    def restart(self):
        self.y = 100
        self.x = random.randint(-90, 90)

    def draw(self):
        screen.fillRound(self.x, self.y, 8, 8, "rgb(255,210,0)")

def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0

def init():
    global stars, px, score
    stars = []
    for i in range(4):
        stars.append(Star(-60 + i * 40))
    px = 0
    score = 0

def update():
    global px, score
    if pressed("LEFT"):
        px -= 2
    if pressed("RIGHT"):
        px += 2
    for star in stars:
        star.move()
        if star.touches(px, -80):
            score += 1
            star.restart()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
    screen.drawText("Score: " + str(score), 0, 88, 10, "#FFF")
```

:::keep-together

### Close enough

**Why does touches() use and, not or?**

☐ A star must be close across and close up and down at the same time to touch

☐ It makes no difference

☐ and is faster than or

☐ or would never be true

:::


:::teacher-note

**Answer:** A star must be close across and close up and down at the same time to touch

With or, a star anywhere in the same column (close across, far above) would count as a catch. Touching needs both distances small.

:::


:::keep-together

### Why restart?

**What would happen without star.restart() after score += 1?**

☐ Nothing would change

☐ The star scores once and disappears

☐ The star stays on the paddle and scores a point every frame

☐ The game stops with an error

:::


:::teacher-note

**Answer:** The star stays on the paddle and scores a point every frame

The star would still be touching the paddle next frame, so the score would jump by 60 a second. restart() moves it back to the top.

:::


:::keep-together

### Spot the bug

**The score never goes past 1, however many stars you catch. Click the line that is wrong.**

```
 1  def init():
 2      global score
 3      score = 0
 4  
 5  def update():
 6      global score
 7      for star in stars:
 8          star.move()
 9          if star.touches(px, -80):
10              score = 1
11              star.restart()
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 10

score = 1 sets the score to 1 every time. score += 1 adds one to what it was.

:::


:::typical

## Modify


**Lives.** Give the player **3 lives**: a star that reaches the bottom takes one. At 0 lives, stop the game and show **GAME OVER**.

**Play again.** After GAME OVER, pressing **Space** starts a new game. The game on this page has both changes.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Lives:**

```python
import random

class Star:
    def __init__(self, x):
        self.x = x
        self.y = 100
        self.speed = random.randint(5, 15) / 10

    def move(self):
        self.y -= self.speed

    def touches(self, x, y):
        return abs(self.x - x) < 12 and abs(self.y - y) < 8

    def restart(self):
        self.y = 100
        self.x = random.randint(-90, 90)

    def draw(self):
        screen.fillRound(self.x, self.y, 8, 8, "rgb(255,210,0)")

def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0

def init():
    global stars, px, score, lives
    lives = 3
    stars = []
    for i in range(4):
        stars.append(Star(-60 + i * 40))
    px = 0
    score = 0

def update():
    global px, score, lives
    if lives == 0:
        return
    if pressed("LEFT"):
        px -= 2
    if pressed("RIGHT"):
        px += 2
    for star in stars:
        star.move()
        if star.touches(px, -80):
            score += 1
            star.restart()
        elif star.y < -100:
            lives -= 1
            star.restart()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
    screen.drawText("Score: " + str(score) + "   Lives: " + str(lives), 0, 88, 10, "#FFF")
    if lives == 0:
        screen.drawText("GAME OVER", 0, 0, 20, "rgb(255,100,100)")
```

**Play again:**

```python
import random

class Star:
    def __init__(self, x):
        self.x = x
        self.y = 100
        self.speed = random.randint(5, 15) / 10

    def move(self):
        self.y -= self.speed

    def touches(self, x, y):
        return abs(self.x - x) < 12 and abs(self.y - y) < 8

    def restart(self):
        self.y = 100
        self.x = random.randint(-90, 90)

    def draw(self):
        screen.fillRound(self.x, self.y, 8, 8, "rgb(255,210,0)")

def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0

def init():
    global stars, px, score, lives
    lives = 3
    stars = []
    for i in range(4):
        stars.append(Star(-60 + i * 40))
    px = 0
    score = 0

def update():
    global px, score, lives
    if lives == 0:
        if pressed("SPACE"):
            init()
        return
    if pressed("LEFT"):
        px -= 2
    if pressed("RIGHT"):
        px += 2
    for star in stars:
        star.move()
        if star.touches(px, -80):
            score += 1
            star.restart()
        elif star.y < -100:
            lives -= 1
            star.restart()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
    screen.drawText("Score: " + str(score) + "   Lives: " + str(lives), 0, 88, 10, "#FFF")
    if lives == 0:
        screen.drawText("GAME OVER", 0, 0, 20, "rgb(255,100,100)")
        screen.drawText("Press SPACE to play again", 0, -20, 8, "#FFF")
```

:::

:::


## Make: a power-up

Add a **power-up**: a star that looks different and is worth more when caught (a gold star worth 5, a heart that gives back a life, a slow star that freezes the others...). It can be its own class, or a `Star` with an extra value. The game on this page has a fast gold star worth 5.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import random

class Star:
    def __init__(self, x):
        self.x = x
        self.y = 100
        self.speed = random.randint(5, 15) / 10

    def move(self):
        self.y -= self.speed
        if self.y < -100:
            self.restart()

    def touches(self, x, y):
        return abs(self.x - x) < 12 and abs(self.y - y) < 8

    def restart(self):
        self.y = 100
        self.x = random.randint(-90, 90)

    def draw(self):
        screen.fillRound(self.x, self.y, 8, 8, "rgb(255,210,0)")

def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0

def init():
    global stars, px, score
    stars = []
    for i in range(4):
        stars.append(Star(-60 + i * 40))
    gold = Star(0)
    gold.speed = 2.5
    gold.gold = True
    stars.append(gold)
    px = 0
    score = 0

def update():
    global px, score
    if pressed("LEFT"):
        px -= 2
    if pressed("RIGHT"):
        px += 2
    for star in stars:
        star.move()
        if star.touches(px, -80):
            if hasattr(star, "gold"):
                score += 5
            else:
                score += 1
            star.restart()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
    screen.drawText("Score: " + str(score), 0, 88, 10, "#FFF")
```

:::


:::wider

## Where this leads

You have now built a whole game in a real engine: a loop, input, objects, collisions and a score. Next: draw your own sprites, add sound, and share it.

:::


## Exit ticket

:::keep-together

**Why does a caught star call restart()?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Otherwise it is still touching the paddle next frame and scores again, 60 times a second.

:::

