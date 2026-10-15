---
title: "Parameters"
subtitle: "Arcade advanced skills · Many sprites · Lesson 3"
---

# Parameters

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A slow bug, a fast bug, a boss: the same job, make an enemy, with one thing changed. A parameter is that one thing.


:::teacher-note

**In one sentence:** Students give a function a parameter, so each call hands in a value and the same job is done differently each time.

**Students should be able to say:** I can give a function a parameter and call it with different values. I can say where the value comes from inside the function. I can make two kinds of enemy from one function.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Inside **spawnEnemy**, **speed** is whatever number the call hands in.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/4e1441f4f855.png?v=bd1087802f73ffda)

:::keep-together

**on start calls spawnEnemy three times, with 20, 50 and 100. What do you see?**

☐ Nothing: the function is never used

☐ Three bugs flying right at the same speed

☐ One bug, flying at speed 100

☐ Three bugs flying right, each at a different speed

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


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/0e300225a0b1.png?v=02fea027b9d78933)

:::keep-together

### Trace the calls

**The program calls spawnEnemy(30), then spawnEnemy(80), then spawnEnemy(30). Fill in each bug's vx.**

{{rows 1}}

| call | bug's vx |
|---|---|
| spawnEnemy(30) |   |
| spawnEnemy(80) |   |
| spawnEnemy(30) |   |

:::


:::teacher-note

**Answer:** 30, 80, 30

Inside the function, vx is set to speed, and speed is whatever that call handed in.

:::


:::keep-together

### Leo's bugs

**Leo changes the line inside spawnEnemy to set bug vx to 60. His calls still say spawnEnemy(20) and spawnEnemy(100). What happens?**

☐ No bugs appear

☐ The bugs fly at 20 and 100

☐ Every bug flies at 60: the number inside ignores what the calls hand in

☐ The bugs fly at 80 and 160

:::


:::teacher-note

**Answer:** Every bug flies at 60: the number inside ignores what the calls hand in

speed is no longer used, so the value each call hands in is ignored. Put speed back inside, and choose the number in the call.

:::


:::keep-together

### In Python

```python
def spawn_enemy(speed):
    global bug
    bug = sprites.create(img("""..."""), SpriteKind.enemy)
    bug.set_position(0, randint(10, 110))
    bug.vx = speed
def on_update_interval():
    spawn_enemy(40)
game.on_update_interval(1000, on_update_interval)
```

**The function in Python. Match each line with what it does.**

A. makes the function, with a parameter called speed

B. uses whatever number the call handed in

C. calls it, with speed 40

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `def spawn_enemy(speed):` | |
| `bug.vx = speed` | |
| `spawn_enemy(40)` | |

:::


:::teacher-note

**Answer:** def spawn_enemy(speed): → A. makes the function, with a parameter called speed; bug.vx = speed → B. uses whatever number the call handed in; spawn_enemy(40) → C. calls it, with speed 40

:::


:::typical

## Modify


**Random speeds.** Make every bug fly at a **random** speed between 20 and 100. Change the **call**, not the function.

**Choose the height.** Add a second parameter, **height**, and use it for the bug's y.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Random speeds:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/439ed505e88f.png?v=31b4b40f4b65e883)

**Choose the height:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/3f4889fc9178.png?v=cab44b898b7f56f4)

:::

:::


## Mix it up


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/814df8b8c0fb.png?v=6cd82ed0ba4fa463)

:::keep-together

**This timer runs every 500 ms and calls makeCoin each time. How many times have makeCoin's blocks run after 3 seconds?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 6

500 ms is half a second, so the timer runs twice a second: 6 calls in 3 seconds.

:::


## Make

Make **two kinds of bug** from one function:

- a **slow** bug (speed 30) every second
- a **fast** bug (speed 90) every three seconds

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/d491f2389529.png?v=bfa5b9ffb25413d3)

:::


:::wider

## Change an aquarium

This aquarium uses one function, **addFish(speed)**, to add every fish. **A** (space on the keyboard) adds a fish at a random speed. Start the tank with five fish instead of three, then add a second parameter so each call also chooses how high the fish swims.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**spawnEnemy(speed) sets bug vx to speed. The timer calls spawnEnemy(70). How fast is that bug?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 70. speed is the number the call handed in.

:::

