---
title: "Your own game"
subtitle: "MakeCode Arcade · Final challenge: Space dodger · Lesson 14"
---

# Your own game

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every game studio works this way: a one-page pitch, a rough prototype, then playtest, fix, and add one thing at a time until it is fun.


:::teacher-note

**In one sentence:** An optional, open project. Students turn the pitch card and prototype from lesson 13 into a game of their own, in three milestones with goals only, then look ahead to tilemaps, animation and extensions.

**Students should be able to say:** I can plan a game and choose the building blocks it needs. I can build a game in playable milestones, testing after each one. I can improve my game from what I see when someone else plays it.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Kai's pitch card: *a bee collects flowers before winter comes; the hard part is a wasp that chases the bee*.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/2e92c7efba09.png?v=688494621cce16db)

:::keep-together

**This is Kai's prototype for a bee game. You collect 10 flowers. What happens?**

☐ A harder level starts

☐ You win

☐ Nothing: the score keeps going up and the game never ends

☐ You lose a life

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Nothing. The game has a player, a goal and a score, but no danger and no way to win or lose, so it never ends.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Make: Build your game

Build your prototype again here (you planned it, so it is quick), or copy it across: in your **Will it work in Arcade?** playground switch to **JavaScript**, copy everything, then paste it into **JavaScript** here.

**Milestone 1: the core loop.** The smallest version of your game that someone could play:

- a **player** the controller moves (or makes jump),
- something to **collect** or **reach**,
- a **danger** to avoid,
- a **score**.

Play it for one minute. Is the core idea fun? If not, change it now, before you add more.

**Milestone 2: win and lose.** Give your game an ending. Choose what fits your pitch card:

- **lives** that run out (the game ends at zero by itself),
- a **countdown** (the game ends when time is up),
- a **target**: reach a score, or a place, and call **game over** with a win.

Test both endings: win once and lose once.

**Milestone 3: one polish.** Choose **one** idea from the course:

- **levels** that get harder (a level variable and a list),
- a **power-up** (a true/false variable and a timer),
- a **chaser** that follows the player,
- **gravity** and jumping.

Then ask someone to play your game. Watch without helping, and write down where they got stuck.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Milestone 1: the core loop:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/eac29671332e.png?v=530e8b0a6b400351)

**Milestone 2: win and lose:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/9015ba65b311.png?v=da25f2aae9b9b626)

**Milestone 3: one polish:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/bf76e1919df9.png?v=019ac8688dfba91e)

:::


:::wider

## Arcade's real tools

You have built a whole game from the course's building blocks. Real Arcade games use a few more tools that are worth exploring next, with your teacher:

- **Tilemaps** (in Scene): draw a level from tiles, with walls the player cannot pass and floors to stand on. The camera can follow the player through a world much bigger than the screen. Platformers, mazes and adventures use them.
- **Animation**: a sprite can flip through several pictures, so a character walks or a coin spins.
- **Extensions** (in the toolbox, the Extensions button): extra blocks other people have written, for example for menus, dialogue or saving a game.

Which one would make your game better, and how?

:::


## Exit ticket

:::keep-together

**What did you change after someone else played your game, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Any change tied to what the player did, for example: they kept losing straight away, so I slowed the enemies down.

:::

