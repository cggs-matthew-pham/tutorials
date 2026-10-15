---
title: "Every one of a kind"
subtitle: "Arcade advanced skills · Many sprites · Lesson 1"
---

# Every one of a kind

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A smart bomb clears the screen, a freeze spell stops every enemy, a magnet pulls in every coin: one press, every sprite of a kind.


:::teacher-note

**In one sentence:** Students get a list of every sprite of a kind with array of sprites of kind, and use a for element loop to do something to each one.

**Students should be able to say:** I can do something to every sprite of a kind with one press. I can say how many times a for element loop runs. I can put blocks inside a loop when they should happen for each sprite.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

B is enter (or X) on the keyboard.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/4dbf2ceced67.png?v=d6a8014dda547b08)

:::keep-together

**There are 6 aliens falling. You press B. What happens?**

☐ Nothing: the aliens have no names

☐ All 6 aliens stop

☐ Only the newest alien stops

☐ Only one alien stops: the loop runs once

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** All 6 stop. array of sprites of kind Enemy is a list of all 6, and the for element loop runs set value vy to 0 once for each, with value as that alien.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/4dbf2ceced67.png?v=d6a8014dda547b08)

:::keep-together

### How many times?

**There are 4 aliens on the screen when you press B. How many times does set value vy to 0 run?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 4

The list has 4 aliens, and the loop runs its blocks once for each one.

:::


:::keep-together

### Mia's smart bomb

Mia's B event:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ecafa7b7968d.png?v=314ca7509a155868)

**Mia's smart bomb has change score by 1 after the loop, not inside it. There are 5 aliens. She presses B. How much does the score go up?**

☐ 0

☐ 1

☐ 5

☐ 6

:::


:::teacher-note

**Answer:** 1

Only the blocks inside the loop run once per alien. A block after the loop runs once, when the loop has finished.

:::


:::keep-together

### In Python

```python
def on_b_pressed():
    for value in sprites.all_of_kind(SpriteKind.enemy):
        value.vy = 0
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)
```

**The loop in Python. Match each part with what it does.**

A. a list of every enemy right now

B. runs the indented lines once for each item

C. stops this one alien

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `sprites.all_of_kind(SpriteKind.enemy)` | |
| `for value in …:` | |
| `value.vy = 0` | |

:::


:::teacher-note

**Answer:** sprites.all_of_kind(SpriteKind.enemy) → A. a list of every enemy right now; for value in …: → B. runs the indented lines once for each item; value.vy = 0 → C. stops this one alien

:::


:::typical

## Modify


**Back to the top.** Make **B** send every alien back to the top as it freezes them.

**Speed up.** Make **A** speed every alien up.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Back to the top:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/c76b5e074cdb.png?v=910c922846ec7d54)

**Speed up:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/e26d8e746ad1.png?v=c9ec1babeab91cc5)

:::

:::


## Mix it up


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/70615f5cb486.png?v=d8fd8e6094d8334d)

:::keep-together

**A shot is fired, misses, and flies off the top of the screen. What happens to it?**

☐ The engine removes it

☐ It becomes an alien

☐ It comes back at the bottom

☐ It stays above the screen for ever

:::


:::teacher-note

**Answer:** The engine removes it

The engine removes a projectile as soon as it leaves the screen.

:::


## Make

The aliens come twice as fast now. Make a **smart bomb** on the **B** button:

- every alien on the screen is destroyed,
- you score **one point for each** alien.

Count the aliens before you press B, and check the score goes up by that many.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/15f68fb9aabb.png?v=7566dbd467abf843)

:::


:::wider

## Change a firework show

**A** launches a rocket; **B** makes every rocket in the sky burst off in a random direction. Make the rockets launch faster, and make **B** also change the background colour, so the sky flashes when they burst.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**There are 5 enemies on the screen. A for element loop over array of sprites of kind Enemy contains change score by 1. How much does the score go up?**

{{lines-3}}

:::


:::teacher-note

**Answer:** By 5. The list has 5 enemies, and the loop runs its blocks once for each one.

:::

