---
title: "Levels"
subtitle: "MakeCode Arcade · Gravity and levels · Lesson 10"
---

# Levels

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Almost every game gets harder as you play: faster ghosts, more aliens, a new world. Behind it is one number, the level, and a list of what each level is like.


:::teacher-note

**In one sentence:** Students keep the level in a variable and per-level settings in lists, start each level with a startLevel function, see why a level-up in on game update fires every frame, and build a three-level dodger with a win.

**Students should be able to say:** I can use a variable to remember the level, and a list to hold what changes per level. I can write a startLevel function that clears the old level and sets up the new one. I can explain why a level-up in on game update happens every frame, and put it where the score changes instead.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read **startLevel** first, then the Player–Food overlap.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/364f7c04edea.png?v=f2359f4ea0b40d01)

:::keep-together

**You collect 5 coins. What happens?**

☐ A second enemy joins the first one

☐ A splash says Level 2, and a faster enemy appears in place of the old one

☐ A splash says Level 1 again

☐ The game ends with a win

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** A splash says Level 2 and a faster enemy replaces the old one. At 5 points level becomes 1, startLevel destroys the old enemy, shows level + 1, and makes a new enemy at speeds[1], which is 70.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/364f7c04edea.png?v=f2359f4ea0b40d01)

:::keep-together

### What startLevel does

**speeds is 40, 70, 100. Fill in what startLevel does at each level.**

{{rows 1}}

| level | splash shows Level … | enemy speed |
|---|---|---|
| 0 | 1 |   |
| 1 |   |   |
| 2 |   |   |

:::


:::teacher-note

**Answer:** 40, 2, 70, 3, 100

The level is the place in the list, counted from 0, so level 0 uses 40. The splash adds 1, because players count levels from 1.

:::


:::keep-together

### Which block does what?

**Match each block in this game with its job.**

A. moves the target score up, so the next level-up needs 5 more points

B. moves the player on to the next level

C. clears away the old level's enemy

D. ends the game after the last level

E. the speed for this level, looked up in the list

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `destroy all sprites of kind Enemy` | |
| `speeds[level]` | |
| `change level by 1` | |
| `change goal by 5` | |
| `if level = 3 then game over (win)` | |

:::


:::teacher-note

**Answer:** destroy all sprites of kind Enemy → C. clears away the old level's enemy; speeds[level] → E. the speed for this level, looked up in the list; change level by 1 → B. moves the player on to the next level; change goal by 5 → A. moves the target score up, so the next level-up needs 5 more points; if level = 3 then game over (win) → D. ends the game after the last level

:::


:::keep-together

### Zoe's levels

Zoe's level-up:

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/4f70ba51427c.png?v=6d375cd06e56c00f)

**Zoe moved the level-up into on game update (below). The moment she reaches 5 points, the splashes never stop: Level 2, Level 3, Level 4, Level 5 … even though she collects no more coins. Why?**

☐ on game update runs every frame, and the score stays 5 or more, so the if is true every frame and levels up every time

☐ The list is too short

☐ score ≥ 5 should be score &gt; 5

☐ startLevel adds points

:::


:::teacher-note

**Answer:** on game update runs every frame, and the score stays 5 or more, so the if is true every frame and levels up every time

An if in on game update is asked every frame. Once the score is 5, the question stays true, so the level goes up again and again. Level up where the score changes (in the overlap), or check a target that moves up (goal), so the question becomes false again.

:::


:::typical

## Modify


**A colour per level.** Give each level its own **background colour**, from a new list. Set it in **startLevel**.

**Bonus life.** Give the player a **bonus life** at the start of every level. One block, in the right place.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A colour per level:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/dce85af14738.png?v=4b8d8e45f3a2d2ff)

**Bonus life:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/a6e707b29146.png?v=a13fec4d9131b5b1)

:::

:::


## Make

This dodger scores a point for every rock. Give it **three levels**:

- each level has its own **background colour** and **rock speed** (faster each level), from lists,
- **startLevel** clears the old rocks, sets the colour and splashes the level,
- every 10 points, the level goes up (level up where the score changes, not in on game update),
- after level 3, the player **wins** (game over, win).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/bd6ec86c68fa.png?v=e0f73f8f984412c6)

:::


:::wider

## Change a fishing game

Catch fish with the net. Every 5 fish the water gets deeper and the fish swim faster. Add a **fourth level** (both lists need a fourth item, and the win must move), then make the deepest level's fish the fastest yet.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**speeds is 40, 70, 100 and level is 1. What speed does the enemy get, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 70: level 1 is the second place in the list, because places are counted from 0.

:::

