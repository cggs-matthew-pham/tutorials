---
title: "If, every frame"
subtitle: "Arcade Foundations · Decide · Lesson 7"
---

# If, every frame

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** In Pac-Man, go off one side of the screen and you come back on the other. The game is asking 'has Pac-Man gone off the edge?' many times every second.


:::teacher-note

**In one sentence:** Students put an if inside on game update to make wrap-around and a safe zone, and find that an if in on start is asked only once.

**Students should be able to say:** I can put an if inside on game update so the game keeps checking a question. I can compare a sprite's x or y with a number using &lt; and &gt;. I can explain why an if in on start does not keep checking.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`>` means "more than". The screen is 160 pixels across.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/01cf15795937.png?v=69cf1a87048a295d)

:::keep-together

**The car drives right at speed 50. What happens when it reaches the right edge?**

☐ It comes back in on the left, again and again

☐ It stops at the edge

☐ It bounces back to the left

☐ It drives off the screen and is gone

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It comes back in on the left, again and again. on game update asks 'is car x more than 160?' every frame; once the car is past the edge the answer is yes, so its x is set to 0.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/01cf15795937.png?v=69cf1a87048a295d)

:::keep-together

### How long until it wraps?

**The car starts at x 10 and moves 50 pixels every second. After how many seconds does it first jump back to the left?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 3

It must get from 10 to past 160: that is 150 pixels. At 50 pixels a second, that takes 3 seconds. Until then the question is asked every frame and the answer is no.

:::


:::keep-together

### How often?

**About how often does the if inside on game update ask 'is car x more than 160?'**

☐ Only when the car reaches the edge

☐ Once, when the game starts

☐ Once a second

☐ About 30 times a second, for as long as the game runs

:::


:::teacher-note

**Answer:** About 30 times a second, for as long as the game runs

on game update runs every frame, about 30 times a second. Most of the time the answer is no and nothing happens; the frame the car is past the edge, the answer is yes.

:::


:::keep-together

### Sam's tidy version

Sam's program (it is in the playground: run it):

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/a49e12760bf0.png?v=21855b14fd52add2)

Fix it: drag the if into an **on game update** block.

**Sam thought on game update was untidy, so he moved the if into on start (the playground has his version). The car drives off the screen and never comes back. Why?**

☐ on start runs once, before the game begins: the if asks its question one time, when the car is at x 10, and never again

☐ x can never be more than 160

☐ An if only works with a button

☐ The car is too fast for the if to see it

:::


:::teacher-note

**Answer:** on start runs once, before the game begins: the if asks its question one time, when the car is at x 10, and never again

Blocks in on start run once, at the start. Then the car is at x 10, so the answer is no, and the question is never asked again. To keep checking, the if must be in on game update.

:::


:::typical

## Modify


**Both ways.** Now you drive the car (left and right arrows). Drive off the right: it wraps. Drive off the left: it is lost. Add a second **if** so the left edge wraps too.

**Count the laps.** Score a point each time the car wraps around the right edge.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Both ways:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/004e514fd3c8.png?v=ca0a8accc495834f)

**Count the laps:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/2b3b56039e1a.png?v=a3c2271b7dc735d7)

:::

:::


## Mix it up


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/779635f21351.png?v=170dec330da6e0ab)

:::keep-together

**This timer runs every 2000 ms and makes one rock each time. How many rocks has it made after 6 seconds?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 3

2000 ms is two seconds, so it runs at 2, 4 and 6 seconds: 3 rocks.

:::


## Make

Make a **safe zone** at the top of the screen. Move the hero with the arrow keys.

- When the hero is in the top **30** pixels, the background turns a different colour.
- When the hero leaves, the colour goes back (a second **if**).

Remember: y counts **down**, so the top of the screen is a **small** y.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/7aff20f80630.png?v=ed03a73b2a5967f9)

:::


:::wider

## Change a lift

This lift rises up the building and, at the top, goes straight back to the ground floor. Make it slower, and make it go back to the ground floor from the **third floor** (about y 40) instead of the top.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**Why does an if that checks 'player x &gt; 150' work in on game update but not in on start?**

{{lines-3}}

:::


:::teacher-note

**Answer:** on game update runs every frame, so the question keeps being asked while the player moves. on start runs once, before the game begins, so the question is asked one time and never again.

:::

