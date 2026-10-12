---
title: "Functions"
subtitle: "MakeCode Arcade · Collections and tools · Lesson 8"
---

# Functions

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A game makes the same thing again and again: another enemy, another coin, another wave. Programmers write that job once, give it a name, and use the name everywhere.


:::teacher-note

**In one sentence:** Students name a job (making an enemy) as a function with a speed parameter, call it from several places, and see in Python that every event block is a function the game calls.

**Students should be able to say:** I can make a function and call it from more than one place. I can give a function a parameter and call it with different values. I can explain that an event block is a function the game calls for me.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

**function spawnEnemy** holds the blocks for one enemy. Inside it, **speed** is whatever number the call hands in.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/4dd9f398080f.png?v=ebbf0f6cc1de3cda)

:::keep-together

**on start calls spawnEnemy three times, with 20, 50 and 100. What do you see?**

☐ One bug, flying at speed 100

☐ Three bugs flying right at the same speed

☐ Three bugs flying right, each at a different speed

☐ Nothing: the function is never used

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Three bugs flying right, each at a different speed. Each call runs the function's blocks once, and speed is the number that call handed in: 20, then 50, then 100.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

The game: a bug flies in from the left every second. Dodge them.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/9db3db39451e.png?v=d33c1050d08295ed)

:::keep-together

### Ava's bugs

Ava's program:

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/b0f71da4d86c.png?v=9ae12c75afda75ee)

**Ava made the spawnEnemy function and an empty timer (below). She runs the game and no bugs ever appear. Why?**

☐ Nothing calls spawnEnemy: making a function does not run it

☐ speed has no value, so the bugs are invisible

☐ The timer is too slow

☐ Functions only work in on start

:::


:::teacher-note

**Answer:** Nothing calls spawnEnemy: making a function does not run it

Making a function only names the job. Its blocks run when a call block runs them. Ava's timer is empty, so the job is never done. A call spawnEnemy block inside the timer makes a bug every second.

:::


:::keep-together

### How many bugs?

**The game runs for 10 seconds. The timer calls spawnEnemy(40) every 1000 ms. How many times do the blocks inside spawnEnemy run?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 10

Once per call, and the timer calls it once a second: about 10 times in 10 seconds, so about 10 bugs.

:::


:::keep-together

### The same game in Python

MakeCode can show every program in Python. Here is part of this one:

```python
def spawn_enemy(speed):
    global bug
    bug = sprites.create(img("""..."""), SpriteKind.enemy)
    bug.set_position(0, randint(10, 110))
    bug.vx = speed

def on_update_interval():
    spawn_enemy(40)
game.on_update_interval(1000, on_update_interval)

def on_on_overlap(sprite, otherSprite):
    otherSprite.destroy()
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)
```

Look at what Python did with **on game update every** and **on overlap**: each one is a `def`, a function, and the line after it **hands** that function to the game. The game calls it for you: every second, or every time two sprites touch. Every event block you have used is a function.

**This is the game in Python (press Python at the top of the editor). Match each Python line with what it does.**

A. hands that function to the game to call every second

B. uses whatever number the call handed in

C. makes the function, with a parameter called speed

D. makes a function from the blocks inside on game update every

E. calls spawn_enemy, with speed 40

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `def spawn_enemy(speed):` | |
| `bug.vx = speed` | |
| `def on_update_interval():` | |
| `game.on_update_interval(1000, on_update_interval)` | |
| `spawn_enemy(40)` | |

:::


:::teacher-note

**Answer:** def spawn_enemy(speed): → C. makes the function, with a parameter called speed; bug.vx = speed → B. uses whatever number the call handed in; def on_update_interval(): → D. makes a function from the blocks inside on game update every; game.on_update_interval(1000, on_update_interval) → A. hands that function to the game to call every second; spawn_enemy(40) → E. calls spawn_enemy, with speed 40

:::


:::typical

## Modify


**Random speeds.** Make every bug fly at a **random** speed between 20 and 100. Change the **call**, not the function.

**A point per bug.** Score a point for **every bug** that is made: a survival score. Change the **function**, so every call scores, wherever it is called from.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Random speeds:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/6b72e5db2ecd.png?v=08d1fb145c77effe)

**A point per bug:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/8411170cb086.png?v=e66574482dcc14df)

:::

:::


## Make

Make a **coin collector** that never runs out of coins:

- a function **makeCoin** makes one coin (kind **Food**) at a random place,
- **on start** calls it three times, so there are three coins,
- every time a coin is collected, the overlap calls it again, so there are always three.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/b26c70a4c88e.png?v=e37f248700497506)

:::


:::wider

## Change an aquarium

This aquarium uses one function, **addFish(speed)**, to add every fish. **A** (space on the keyboard) adds a fish at a random speed. Start the tank with five fish instead of three, then add a second parameter so each call also chooses how high the fish swims.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**You make a function spawnEnemy(speed) but never call it. What happens when the game runs?**

{{lines-3}}

:::


:::teacher-note

**Answer:** No enemies appear: a function's blocks only run when something calls it.

:::

