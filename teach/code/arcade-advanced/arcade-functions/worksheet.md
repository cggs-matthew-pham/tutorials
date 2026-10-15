---
title: "Functions"
subtitle: "Arcade advanced skills · Many sprites · Lesson 2"
---

# Functions

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A game makes enemies at the start, on a timer and when a level begins. Writing the same blocks three times is how bugs creep in: name the job once instead.


:::teacher-note

**In one sentence:** Students name a job (making an enemy) as a function, call it from several places, and see in Python that every event block is a function the game calls.

**Students should be able to say:** I can make a function and call it from more than one place. I can change a job in one place, for every call. I can explain that an event block is a function the game calls for me.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

**function spawnBug** holds the blocks for one bug. They run only when something **calls** spawnBug.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/80aa436d158f.png?v=0c57515859c38524)

:::keep-together

**on start calls spawnBug three times. What do you see?**

☐ Three bugs, all at the same height

☐ Nothing: a function only runs in a timer

☐ Three bugs flying right

☐ One bug

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Three bugs flying right. Each call runs the function's blocks once, and each run picks its own random height.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

The game: a bug flies in from the left every second. Dodge them.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/c6a748a6c078.png?v=eb3861394d132a48)

:::keep-together

### Ava's bugs

Ava's program:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/8ea0fd0ef7e6.png?v=4f9e59bff220724f)

**Ava made the spawnBug function and an empty timer (below). She runs the game and no bugs ever appear. Why?**

☐ The timer is too slow

☐ The bugs are invisible

☐ Nothing calls spawnBug: making a function does not run it

☐ Functions only work in on start

:::


:::teacher-note

**Answer:** Nothing calls spawnBug: making a function does not run it

Making a function only names the job. Its blocks run when a call block runs them. Ava's timer is empty, so the job is never done.

:::


:::keep-together

### How many bugs?

**The game runs for 10 seconds. The timer calls spawnBug every 1000 ms. How many times do the blocks inside spawnBug run?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 10

Once per call, and the timer calls it once a second: about 10 times in 10 seconds.

:::


:::keep-together

### The same game in Python

```python
def spawn_bug():
    global bug
    bug = sprites.create(img("""..."""), SpriteKind.enemy)
    bug.set_position(0, randint(10, 110))
    bug.vx = 40
def on_update_interval():
    spawn_bug()
game.on_update_interval(1000, on_update_interval)
```

Look at what Python did with **on game update every**: it is a `def`, a function, and the line after it **hands** that function to the game. Every event block you have used is a function the game calls for you.

**This is the game in Python (press Python at the top of the editor). Match each Python line with what it does.**

A. calls it: runs its blocks once

B. makes the function spawn_bug

C. makes a function from the blocks inside on game update every

D. hands that function to the game to call every second

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `def spawn_bug():` | |
| `spawn_bug()` | |
| `def on_update_interval():` | |
| `game.on_update_interval(1000, on_update_interval)` | |

:::


:::teacher-note

**Answer:** def spawn_bug(): → B. makes the function spawn_bug; spawn_bug() → A. calls it: runs its blocks once; def on_update_interval(): → C. makes a function from the blocks inside on game update every; game.on_update_interval(1000, on_update_interval) → D. hands that function to the game to call every second

:::


:::typical

## Modify


**A point per bug.** Score a point for **every bug** that is made: a survival score. Change the **function**, so every call scores.

**An extra bug.** Make **A** call spawnBug too. Does the extra bug score a point?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A point per bug:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/33e3ed2424be.png?v=0f98991a3a066b63)

**An extra bug:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/7484ae93912a.png?v=1f7f3baae89f0436)

:::

:::


## Mix it up


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/63f8d21596c6.png?v=e9752f35eac1a975)

:::keep-together

**There are 3 bugs on the screen. You press B. How many bugs are destroyed?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 3

array of sprites of kind Enemy lists all 3, and the loop destroys each one.

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

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b26c70a4c88e.png?v=e37f248700497506)

:::


:::wider

## Change a snow globe

Snow falls in this globe: a function **addFlake** makes one flake, and a timer calls it. Make every flake fall faster (one change, in the function), then make **A** shake the globe: five extra flakes at once.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**You make a function, but never call it. What happens when the game runs?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Nothing from that function: its blocks only run when something calls it.

:::

