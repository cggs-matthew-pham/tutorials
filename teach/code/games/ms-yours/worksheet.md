---
title: "Make it yours"
subtitle: "Games with microStudio · A whole game · Lesson 5"
---

# Make it yours

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** The same game feels completely different with your own pictures and sounds: that is most of what makes a game yours.


:::teacher-note

**In one sentence:** Students add sounds with audio.beep where things happen, draw their own sprites in microStudio and draw them with screen.drawSprite, then make and playtest a game of their own and decide how to share it safely.

**Students should be able to say:** I can add sounds and my own sprites to a game. I can make a game with a goal and a way to win or lose. I can improve my game after watching someone play it. I can decide what is safe to share when I publish a game.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`t % 60` is what is left over when `t` is divided by 60. When is it `0`?

```python
def init():
    global t, seconds
    t = 0
    seconds = 0

def update():
    global t, seconds
    t += 1
    if t % 60 == 0:
        seconds += 1
        audio.beep("C E G")

def draw():
    screen.clear("rgb(10,10,40)")
    screen.drawText(str(seconds) + " seconds", 0, 0, 16, "#FFF")
```

:::keep-together

**What do you hear while this game runs?**

☐ One long note that never stops

☐ Three quick notes, C E G, once every second

☐ Nothing: beep only works in draw()

☐ C E G 60 times a second

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Three notes once a second. t goes up 60 times a second, and t % 60 == 0 is true only when t is 60, 120, 180... : once every second.

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
            audio.beep("E G")
            star.restart()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
    screen.drawText("Score: " + str(score), 0, 88, 10, "#FFF")
```

:::keep-together

### Where does the sound go?

**Where is the best place for a sound when a life is lost?**

☐ In init()

☐ In update(), in the if that takes the life

☐ In draw(), every frame

☐ In the Star class's draw()

:::


:::teacher-note

**Answer:** In update(), in the if that takes the life

A sound belongs where the thing happens, once. draw() runs 60 times a second, so a beep there would play over and over.

:::


:::keep-together

### Draw a sprite

**You drew a sprite called star in the Sprites tab. Which line draws it where the star is?**

☐ star.draw("sprite")

☐ screen.drawSprite("star", self.x, self.y, 12, 12)

☐ screen.fillRound("star", self.x, self.y)

☐ sprites.star(self.x, self.y)

:::


:::teacher-note

**Answer:** screen.drawSprite("star", self.x, self.y, 12, 12)

screen.drawSprite takes the sprite's name, where to draw it, and how big. It replaces the fillRound line in the star's draw().

:::


:::keep-together

### Sharing safely

**You publish your game on microStudio so anyone can play it. What should you leave out?**

☐ Your nickname

☐ The sprites you drew

☐ Your full name, school, photo and anything else that says who or where you are

☐ Instructions for how to play

:::


:::teacher-note

**Answer:** Your full name, school, photo and anything else that says who or where you are

A public game can be played and copied by anyone. A nickname is fine; anything that identifies you or where you are is not.

:::


:::typical

## Modify


**Your own sprites.** Draw a **star** and a **player** in microStudio's Sprites tab, and draw them in the game instead of the dot and the box:

**Your own sounds.** Give the game **two different sounds**: one for a catch and another for something else.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Make: your game

Make a game of your own, starting from your catching game or from an empty project: dodge instead of catch, a maze, a racing game, a clicker. It needs a **goal**, a way to **win or lose**, and your own **sprites and sounds**. Then ask a friend to play it **without telling them how**, watch what they do, and change one thing.

**Sharing.** A microStudio project is private until you make it **public**: then anyone can play it, and copy its code, from microStudio's **Explore** page. Ask your teacher before you publish, use a nickname, and leave out your name, school and photos. A guest's projects are deleted after about 15 days, so if you are a guest, make an account or copy your code somewhere safe.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}


:::wider

## Where this leads

From here: microStudio's documentation (the **Help** tab) has maps, music, gamepads and multiplayer. The same ideas carry into bigger engines such as Godot, whose GDScript looks a lot like Python.

:::


## Exit ticket

:::keep-together

**Why does a catch sound go in update() and not in draw()?**

{{lines-3}}

:::


:::teacher-note

**Answer:** It should play once, when the catch happens; draw() runs every frame, so a sound there would repeat 60 times a second.

:::

