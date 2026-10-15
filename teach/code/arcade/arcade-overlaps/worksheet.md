---
title: "Overlaps and kinds"
subtitle: "Arcade Foundations · Collide and score · Lesson 4"
---

# Overlaps and kinds

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Pac-Man eats a dot, Mario grabs a coin, a ghost catches you: every game is full of things touching, and each touch means something different.


:::teacher-note

**In one sentence:** Students make overlap events that run when two sprites touch, and see that the kinds named in the event decide which event runs.

**Students should be able to say:** I can make something happen when two sprites touch. I can choose a sprite's kind, and say which overlap event a touch will run. I can keep a score.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The coin is made **of kind Food**. Look at the two kinds named in the **on overlap** block.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/4b1949b54a2f.png?v=b2353d1f3291c27e)

:::keep-together

**You steer the player onto the coin. What happens?**

☐ Nothing: they pass through each other

☐ The coin vanishes and the score goes up by 1

☐ The player stops at the coin, like a wall

☐ The player vanishes

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The coin vanishes and a score of 1 appears at the top of the screen. The player is of kind Player and the coin of kind Food, so the Player–Food overlap event runs.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

Collect the coin, then touch the spike.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/0a45cb6129d8.png?v=4d7fabade459e932)

:::keep-together

### Who touches whom?

**Match what touches with what happens in this game.**

A. nothing: no event names Food and Enemy

B. the score goes down 1 and the spike is destroyed

C. the score goes up 1 and the coin vanishes

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `the player touches the coin (Food)` | |
| `the player touches the spike (Enemy)` | |
| `the coin and the spike touch` | |

:::


:::teacher-note

**Answer:** the player touches the coin (Food) → C. the score goes up 1 and the coin vanishes; the player touches the spike (Enemy) → B. the score goes down 1 and the spike is destroyed; the coin and the spike touch → A. nothing: no event names Food and Enemy

:::


:::keep-together

### Which sprite?

**In the Player–Food event, which sprite is otherSprite?**

☐ The coin it touched

☐ Every Food sprite in the game

☐ The player

☐ The spike

:::


:::teacher-note

**Answer:** The coin it touched

The event hands over both sprites: sprite is the one of the first kind (Player), otherSprite the one of the second kind (Food). So destroy otherSprite removes the coin that was touched.

:::


:::keep-together

### Ava's star

Ava's overlap event is the same as this game's. She made her star like this:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/97c7643a8b43.png?v=767b7c370bc6069e)

**Ava added a star to her game and steers onto it. Nothing happens: no score, the star stays. Why?**

☐ Stars cannot be destroyed

☐ The star was made of kind Player, so no Player–Food event runs

☐ The overlap event needs to be inside on start

☐ The score only counts coins

:::


:::teacher-note

**Answer:** The star was made of kind Player, so no Player–Food event runs

The create block starts with of kind Player, and Ava did not change it. Her overlap event is for Player touching Food, so a Player touching a Player runs nothing. Choose Food in the star's kind dropdown.

:::


:::typical

## Modify


**Worth more.** Make each coin worth **5** points.

**A second coin.** Add a second coin, of kind **Food**, somewhere else on the screen. Does it need its own overlap event?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Worth more:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/9e216e530f15.png?v=79b025fe792417eb)

**A second coin:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/836deb368149.png?v=f5d73f6e88c58aec)

:::

:::


## Mix it up


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b1e35511c441.png?v=8e7ee1b245952275)

:::keep-together

**The ship has move with buttons with speeds 100 and 0. Which arrow keys move it?**

☐ Left and right only

☐ All four

☐ Up and down only

☐ None

:::


:::teacher-note

**Answer:** Left and right only

The first number is the speed across (100) and the second the speed up and down (0), so only left and right do anything.

:::


## Make

Make a **collector** game:

- **good food** (an apple, a gem): touching it scores **1**, and it vanishes
- a **bad item** of kind **Enemy** (a worm, a bomb): touching it takes **1** away, and it is destroyed

Check every create block: is its kind right?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ed69a7acaef2.png?v=98996523cecb6a52)

:::


:::wider

## Change a fruit stall game

Bananas fall into a basket at a market stall. Make them fall faster, then add a rotten tomato of kind **Enemy** that falls too and takes 2 points when caught.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**A coin is made of kind Player. The game has a Player–Food overlap event. Will touching the coin score? Why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** No. The event only runs when a Player touches a Food sprite. The coin is a Player, so no event runs. Change its kind to Food.

:::

