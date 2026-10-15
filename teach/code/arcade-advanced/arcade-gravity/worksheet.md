---
title: "Gravity"
subtitle: "Arcade advanced skills · Platforms · Lesson 4"
---

# Gravity

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Mario, Sonic and every runner game on a phone: you press jump, you rise, you slow down, you fall back. That curve is gravity.


:::teacher-note

**In one sentence:** Students give a sprite gravity (acceleration down), see that a fall speeds up and a throw rises, slows and comes back, and use gravity in a catching game.

**Students should be able to say:** I can give a sprite gravity with ay and explain why it falls faster and faster. I can make a sprite go up with a negative vy, and say what gravity does to it. I can read a floor built with an if in on game update.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/61b8f2b5bc6d.png?v=f3c810cb435ec575)

:::keep-together

**The ball starts near the top with ay 300 and nothing else. What does it do?**

☐ Falls faster and faster, and drops off the bottom of the screen

☐ Falls at the same speed all the way

☐ Falls and stops at the bottom edge

☐ Stays where it is

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It falls faster and faster and drops off the bottom of the screen. ay makes vy grow every frame, and nothing tells the ball where the ground is.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

This ball has gravity and a floor. Press **A** (space) to throw it up.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/93ebc449753a.png?v=5f3d400d27c42f57)

:::keep-together

### Faster and faster

**A sprite starts still (vy 0) with ay 300. Gravity adds 300 to vy every second. Fill in vy.**

{{rows 1}}

| seconds | vy (speed down) |
|---|---|
| 0 | 0 |
| 0.5 |   |
| 1 |   |
| 2 |   |

:::


:::teacher-note

**Answer:** 150, 300, 600

Every second vy grows by ay, 300. That is why a fall speeds up: the sprite moves further each frame than the frame before.

:::


:::keep-together

### Top of the throw

**The ball is thrown up: vy is set to -150, with ay 300. How many seconds until it stops rising (vy is 0)?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 0.5

Gravity adds 300 every second, so after 0.5 seconds -150 has become 0: the top of the throw. Then vy is positive and it falls back down.

:::


:::keep-together

### The floor

**What does the if in on game update do?**

☐ It makes the ball jump

☐ It runs once, at the start

☐ It turns gravity off

☐ It is a floor: when the ball's bottom goes past 100, it puts it back at 100 and stops it falling

:::


:::teacher-note

**Answer:** It is a floor: when the ball's bottom goes past 100, it puts it back at 100 and stops it falling

Every frame it asks whether the ball has sunk below y 100. If so, it puts the bottom back at 100 and sets vy to 0: the ball lands.

:::


:::typical

## Modify


**Higher.** Make **A** throw the ball higher.

**Moon gravity.** Change **ay**. What does ay 100 feel like? And ay 600?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Higher:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/3f50549e79dc.png?v=a2307efaa8129f4f)

:::

:::


## Mix it up


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/66009c30c307.png?v=46bb1255ddcc76a2)

:::keep-together

**spawnEnemy(speed) sets bug vx to speed. The timer calls spawnEnemy(-40). Which way does the bug fly?**

☐ It stays still

☐ Left

☐ Up

☐ Right

:::


:::teacher-note

**Answer:** Left

speed is -40, so vx is -40: a negative vx moves the bug left.

:::


## Make

Make an **apple drop**. The basket moves along the bottom:

- every second an **apple** falls from a random place at the top,
- each apple has **gravity**, so it speeds up as it falls,
- catching one **scores** a point.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/3771e8b7a827.png?v=36a7d140161a492a)

:::


:::wider

## Change a trampoline

This acrobat never stops bouncing: the floor sets vy to **-180** instead of 0. Make the bounces higher, then make the trampoline a little higher up the screen (both numbers in the if must change).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**A sprite with ay 200 starts still. What is its vy after 2 seconds, and why is it not still 0?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 400. Gravity adds 200 to vy every second.

:::

