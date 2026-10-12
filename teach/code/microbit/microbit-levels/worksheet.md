---
title: "Fake-outs and levels"
subtitle: "micro:bit Foundations · Final challenge: Reaction timer · Lesson 13"
---

# Fake-outs and levels

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Arcade games keep you playing by getting harder as you improve, and by trying to trick you. Both are a few rules on top of the game you already built.


:::teacher-note

**In one sentence:** An optional, harder extension of the Reaction timer. Students add decoy signals, levels with target times kept in a list, and lives, managing several pieces of state at once.

**Students should be able to say:** I can use two true/false variables to tell different moments apart. I can use a variable as the place in a list, so a rule gets harder. I can manage lives, levels and an end to the game.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/0173e3579a8b.png?v=51e31adf5947f1a1)

:::keep-together

**Over many rounds, how often does a cross appear instead of the heart?**

☐ Every round

☐ Never

☐ About half the rounds

☐ About 1 round in 3

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** About 1 round in 3. pick random 0 to 2 gives 0, 1 or 2 equally often, and only 0 shows the cross.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

The game keeps one target per level in a list. **A+B** shows the target for the current level.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/deab02ca0b36.png?v=2a6a9e936f30f4b6)

:::keep-together

### Targets per level

**targets is 800, 600, 450, 350, 300. What must you beat at each level?**

{{rows 1}}

| level | target to beat (ms) |
|---|---|
| 0 |   |
| 2 |   |
| 4 |   |

:::


:::teacher-note

**Answer:** 800, 450, 300

The level number is the place in the list, counted from 0.

:::


:::keep-together

### After the last level

**There are 5 targets. You beat level 4. What must the game do next?**

☐ Show 300 again

☐ Use place 5

☐ Stop: there is no place 5, so you have won (level equals the length of the list)

☐ Start again at place 1

:::


:::teacher-note

**Answer:** Stop: there is no place 5, so you have won (level equals the length of the list)

Places run from 0 to 4. When level reaches 5, the length of the list, there are no targets left: the player has won.

:::


:::typical

## Milestone 1: fake-outs

`decoy` is true while the cross is showing. Make **A** catch you out when you press during a cross: add **else if decoy** and show a skull.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/09a9e518035b.png?v=1e7356203df304ea)

:::

:::


:::typical

## Milestone 2: levels

Each good press must beat **targets[level]** to go up a level. Show the new level when you go up, and a sad face when you are too slow.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/853c970d7ea2.png?v=1443b650e08d1e6b)

:::

:::


## Make: Milestone 3: lives

Finish the game:

- You start with **3 lives**. Pressing on a cross or being too slow loses one.
- At **0 lives**: show Game over and your level, then start again.
- Beat the **last** target: you are the champion.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/9b3f4e4a5be6.png?v=fdf4a8e19484054d)

:::


:::wider

## Make it yours

Change the rules to make it your game. Ideas: more levels, a different chance of a fake-out, a shorter wait at higher levels, or a sound for each level.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**level is 2 and targets is 800, 600, 450, 350, 300. What time must you beat, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 450 ms: level 2 is the place in the list, counted from 0.

:::

