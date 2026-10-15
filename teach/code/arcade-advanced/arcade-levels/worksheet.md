---
title: "Level up"
subtitle: "Arcade advanced skills · Levels · Lesson 6"
---

# Level up

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Almost every game gets harder as you play. Behind it is one number, the level, and one place where it changes.


:::teacher-note

**In one sentence:** Students keep the level in a variable, change it where the score changes with a goal that moves up, see why a level-up in on game update fires every frame, and add levels to their runner.

**Students should be able to say:** I can use a variable to remember the level, and change it by 1. I can put a level-up where the score changes, with a goal that moves up. I can explain why a level-up in on game update happens every frame.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the Player–Food overlap. What is **goal** after the first level-up?

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/7e3c142f3068.png?v=8e670d24f65bd560)

:::keep-together

**You collect 5 coins, then one more. What happens?**

☐ Every coin is a new level

☐ At 5 coins: Level 2. At 6: Level 3

☐ At 5 coins the first enemy is replaced by a faster one

☐ At 5 coins: a Level 2 splash and a second enemy. At 6: nothing new

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** At 5 coins the if is true: level becomes 2, goal becomes 10, a splash shows Level 2 and addEnemy makes a second enemy. At 6 coins, 6 is less than 10, so nothing new happens.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/7e3c142f3068.png?v=8e670d24f65bd560)

:::keep-together

### Level and goal

**level starts at 1 and goal at 5. Fill in level and goal after each coin.**

{{rows 1}}

| score | level | goal |
|---|---|---|
| 0 | 1 | 5 |
| 5 |   |   |
| 6 |   |   |
| 10 |   |   |

:::


:::teacher-note

**Answer:** 2, 10, 2, 10, 3, 15

The level only goes up when the score reaches goal, and goal moves up by 5 each time, so the next level is 5 coins away.

:::


:::keep-together

### Ben's game

**Ben deleted change goal by 5. What happens after his 5th coin?**

☐ The level never goes up

☐ Nothing: the game works the same

☐ The game ends

☐ Every coin after that is a new level, because score ≥ 5 stays true

:::


:::teacher-note

**Answer:** Every coin after that is a new level, because score ≥ 5 stays true

Without the moving goal, the question score ≥ 5 is true for coin 6, 7, 8 and every coin after, so each one levels up.

:::


:::keep-together

### Zoe's levels

Zoe's level-up:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/17f7baa90863.png?v=04a0d9b34b036071)

**Zoe moved the level-up into on game update (below). The moment she reaches 5 points the splashes never stop, though she collects no more coins. Why?**

☐ The goal is too small

☐ The splash adds points

☐ score ≥ 5 should be score &gt; 5

☐ on game update runs every frame, and the score stays 5 or more, so the if is true every frame

:::


:::teacher-note

**Answer:** on game update runs every frame, and the score stays 5 or more, so the if is true every frame

An if in on game update is asked every frame. Once the score is 5, the question stays true, so the level goes up again and again. Level up where the score changes: in the overlap.

:::


:::typical

## Modify


**Shorter levels.** Make a new level come every **3** coins.

**Bonus life.** Give the player a **bonus life** at every new level. One block, in the right place.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Shorter levels:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b57e63553625.png?v=edd4902806a00ac2)

**Bonus life:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/49ecbf09cee0.png?v=e75e8f753673d626)

:::

:::


## Mix it up


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/c9aa84d9b824.png?v=9c9e739b5c583bd0)

:::keep-together

**Ana raises the floor: the floor if now puts the player's bottom at 80. Her jump still asks bottom ≥ 100. What number should the jump ask about now?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 80

Standing now means bottom is 80. At ≥ 100 the jump never works, because the player never gets that low.

:::


## Make

This is your runner from last lesson. Every rock that appears scores a point. Give it **levels**:

- every **10** points the level goes up, with a splash,
- each new level, the rocks are **faster** (change speed by -20: they fly left),
- the level-up goes **where the score changes**: in the timer.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/833116d8dc1c.png?v=1ce17bdd247a1174)

:::


:::wider

## Change a fishing game

Catch fish with the net. Every 5 fish the level goes up and the fish swim faster. Make the water **darker** at every level too: one block, in the level-up.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**Why does a level-up go in the event where the score changes, not in on game update?**

{{lines-3}}

:::


:::teacher-note

**Answer:** on game update runs every frame, so while the score stays high enough the level goes up every frame. In the event it is asked only when the score changes.

:::

