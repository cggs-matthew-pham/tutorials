---
title: "A list per level"
subtitle: "Arcade advanced skills · Levels · Lesson 7"
---

# A list per level

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Faster ghosts, a new colour, more aliens: each level is a row in a table. A list is one column of that table.


:::teacher-note

**In one sentence:** Students keep per-level settings in lists, look them up with the level as the place (counted from 0), start each level with a startLevel function, and build a three-level dodger with a win.

**Students should be able to say:** I can keep what changes per level in a list. I can look up the value for this level, knowing places start at 0. I can write a startLevel function that clears the old level and sets up the new one.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read **startLevel**, then the Player–Food overlap.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/364f7c04edea.png?v=f2359f4ea0b40d01)

:::keep-together

**The game starts and startLevel runs with level 0. What speed does the enemy get?**

☐ 0

☐ 40

☐ 70

☐ 100

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 40. Level 0 is the first place in the list, because places are counted from 0.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/364f7c04edea.png?v=f2359f4ea0b40d01)

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

### Kai's levels

**Kai starts his level at 1, not 0. What goes wrong?**

☐ The enemy never appears

☐ The first level is already fast (70), and there is no place 3 for the last level

☐ Nothing: lists start at 1

☐ The splash says Level 0

:::


:::teacher-note

**Answer:** The first level is already fast (70), and there is no place 3 for the last level

speeds[1] is the second item, 70, so the slow level is skipped. After two level-ups he asks for speeds[3], and a list of 3 items only has places 0, 1 and 2.

:::


:::keep-together

### Which block does what?

**Match each block in this game with its job.**

A. the speed for this level, looked up in the list

B. clears away the old level's enemy

C. moves the player on to the next level

D. ends the game after the last level

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `destroy all sprites of kind Enemy` | |
| `speeds[level]` | |
| `change level by 1` | |
| `if level = 3 then game over (win)` | |

:::


:::teacher-note

**Answer:** destroy all sprites of kind Enemy → B. clears away the old level's enemy; speeds[level] → A. the speed for this level, looked up in the list; change level by 1 → C. moves the player on to the next level; if level = 3 then game over (win) → D. ends the game after the last level

:::


:::typical

## Modify


**A colour per level.** Give each level its own **background colour**, from a new list. Set it in **startLevel**.

**A fourth level.** Add a **fourth level** with the fastest enemy yet. What else must change?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A colour per level:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/dce85af14738.png?v=4b8d8e45f3a2d2ff)

**A fourth level:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/2693008b40c7.png?v=36026ecf189e29d4)

:::

:::


## Mix it up


:::keep-together

**goal starts at 4, and each level-up changes goal by 4. At what score does the third level-up happen?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 12

The level goes up at 4, then goal is 8, then 12: the third level-up is at 12.

:::


## Make

This dodger scores a point for every rock. Give it **three levels**:

- each level has its own **background colour** and **rock speed** (faster each level), from lists,
- **startLevel** clears the old rocks, sets the colour and splashes the level,
- every 10 points, the level goes up (where the score changes),
- after level 3, the player **wins** (game over, win).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/bd6ec86c68fa.png?v=e0f73f8f984412c6)

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

