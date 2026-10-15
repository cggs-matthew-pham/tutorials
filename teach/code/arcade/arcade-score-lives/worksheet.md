---
title: "Score and lives"
subtitle: "Arcade Foundations · Collide and score · Lesson 5"
---

# Score and lives

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Three hearts in the corner and a game that can end: that is what turns moving sprites into a game you can win or lose.


:::teacher-note

**In one sentence:** Students give the player lives, make a hit cost one life, and see that the engine ends the game at 0 lives and that an overlap runs every frame while sprites touch.

**Students should be able to say:** I can give the player lives and let the game end by itself. I can make a hit cost exactly one life. I can explain why an enemy must be destroyed (or moved) when it hits the player.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

There is no **game over** block in this program. Lock in what you think happens.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/979edd6e59db.png?v=fdefe0f42b67a68d)

:::keep-together

**The player has 3 lives and cannot move. Three rocks fly at it. What happens?**

☐ Nothing ends the game, because there is no game over block

☐ The first rock takes all 3 lives

☐ The player loses all 3 lives, then the game ends by itself

☐ The lives go to 0, then -1, -2, and the game keeps going

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Each rock that hits takes a life and is destroyed. After three hits the lives reach 0, and Arcade shows GAME OVER by itself: you never need a game over block for running out of lives.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

Dodge the rocks with the arrow keys and collect the heart. Lose on purpose once, too.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/a0ed127385b9.png?v=c9d0bb0e7f57ef46)

:::keep-together

### Count the lives

**Play this game in your head. Fill in the lives after each thing happens.**

{{rows 1}}

| what happens | lives after |
|---|---|
| (start) | 3 |
| a rock hits the player |   |
| a rock flies past |   |
| the player collects the heart |   |
| a rock hits the player |   |

:::


:::teacher-note

**Answer:** 2, 2, 3, 2

Only a touch runs an overlap event, so a rock that flies past changes nothing. The heart's Player–Food event adds one.

:::


:::keep-together

### Sam's dodger

Sam's overlap event:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/4157f57f428e.png?v=ed56f0b2eaaa871f)

**Sam's player touches one rock and the game is over straight away, though he started with 3 lives. Why?**

☐ Rocks always end the game

☐ The rock is not destroyed, so the overlap event runs again every frame while they touch

☐ changeLifeBy(-1) takes away all the lives

☐ setLife(3) only gives one life

:::


:::teacher-note

**Answer:** The rock is not destroyed, so the overlap event runs again every frame while they touch

An overlap event runs every frame (about 30 times a second) while the two sprites still touch. The rock is still touching after the first life is gone, so the next frame takes another. Destroy the rock (or move it away) in the event.

:::


:::keep-together

### Kai's ending

**Kai wants his game to end when the lives run out. What does he need to add?**

☐ A game over block in on start

☐ A game over block in the overlap event

☐ Nothing: the engine ends the game at 0 lives

☐ A countdown

:::


:::teacher-note

**Answer:** Nothing: the engine ends the game at 0 lives

Arcade ends the game by itself when the lives reach 0.

:::


:::typical

## Modify


**More hearts.** Start the player with **5** lives.

**A point too.** Make the heart give a **point** as well as a life.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**More hearts:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/f21092fac653.png?v=d115e04430bdbe62)

**A point too:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/e05fa6e9fb6b.png?v=0016e93967931b15)

:::

:::


## Mix it up


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/0fd4dd1aafd4.png?v=9c4c86b45bec3221)

:::keep-together

**A coin of kind Food moves left towards the player at vx -30. When it reaches the player, which event runs?**

☐ Neither: moving sprites cannot overlap

☐ The Player–Enemy overlap

☐ The Player–Food overlap

☐ Both

:::


:::teacher-note

**Answer:** The Player–Food overlap

The engine carries the coin to the player. It is Food, so the Player–Food event runs.

:::


## Make

The rocks fly already. Make it a game:

- the player starts with **3 lives**
- each rock that hits takes **one** life, and is destroyed

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/6c966dea1bff.png?v=75c633cae3591fad)

:::


:::wider

## Change a dodgeball game

Balls bounce around the court; each hit costs a life. Add a fourth ball, give the player 5 lives, and make the balls a little faster.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**In a dodge game one touch takes all three lives. What one block is missing, and why does it matter?**

{{lines-3}}

:::


:::teacher-note

**Answer:** destroy otherSprite in the Player–Enemy overlap. The overlap runs every frame while the sprites touch, so without it the same enemy takes a life each frame.

:::

