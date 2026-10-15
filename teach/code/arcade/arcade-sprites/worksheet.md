---
title: "Sprites on the screen"
subtitle: "Arcade Foundations · Sprites and movement · Lesson 1"
---

# Sprites on the screen

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every 2D game you have played, from Pac-Man to Mario, is pictures placed on a grid of tiny squares, then moved.


:::teacher-note

**In one sentence:** Students place sprites on the Arcade screen and see that x counts across from the left and y counts down from the top.

**Students should be able to say:** I can make a sprite and draw its picture. I can place a sprite with x and y, and say where on the screen a position is. I can explain why a bigger y is lower on a game screen.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

These blocks sit in **on start**. Lock in where you think the duck will be.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/3fd4b78d6435.png?v=07f3ce6345b8b9cb)

:::keep-together

**The duck is set to x 20, y 100. Where on the screen does it appear?**

☐ Near the bottom left

☐ Near the bottom right

☐ Near the top left

☐ In the middle

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Near the bottom left. x 20 is near the left edge. y counts down from the top, so y 100 is near the bottom (the screen is 120 tall).

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

This scene has a sun, a cloud and the duck. Change the numbers in the playground to test your answers.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/c19f6dce2d51.png?v=7bc0b835ec1610b8)

:::keep-together

### Where is it?

**Match each position with where a sprite there appears.**

A. the bottom right corner

B. the middle of the screen

C. near the top right corner

D. near the bottom, halfway across

E. the top left corner

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `(0, 0)` | |
| `(80, 60)` | |
| `(160, 120)` | |
| `(80, 110)` | |
| `(150, 10)` | |

:::


:::teacher-note

**Answer:** (0, 0) → E. the top left corner; (80, 60) → B. the middle of the screen; (160, 120) → A. the bottom right corner; (80, 110) → D. near the bottom, halfway across; (150, 10) → C. near the top right corner

:::


:::keep-together

### Down by how much?

**A sprite is at (80, 60). You change its y to 90. How many pixels does it move down?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 30

y counts down, so 90 is 30 more than 60: the sprite moves 30 pixels down the screen.

:::


:::keep-together

### Mia's sun

Mia changed one block:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/6c3ce6cd00bf.png?v=364611dfd768a47d)

**Mia wants her sun high in the sky. She sets its position to (140, 110), because 'a bigger y is higher'. Where does her sun appear?**

☐ In the middle

☐ High in the top right

☐ Off the screen

☐ Low, near the bottom right

:::


:::teacher-note

**Answer:** Low, near the bottom right

On a game screen y counts down from the top, so 110 is near the bottom. For a sun high in the sky, Mia needs a small y, such as 15.

:::


:::typical

## Modify


**Change the sky.** Pick a new sky colour, and move the sun to the other top corner.

**Add your own sprite.** Draw a third sprite (a flower, a rock, a bug) and place it near the bottom. Give it its own name: click the variable's name in its block and choose **New variable**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Add your own sprite:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/6d9a7a8fe1c8.png?v=87716aea18fa96fc)

:::

:::


## Make

Make a **scene at the pond** (or anywhere you like):

- something in the **sky**, near the top
- something on the **ground**, near the bottom
- something in the **middle**
- something tucked into a **corner**

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/68d0e8880cea.png?v=0aa0e6ce478e7cf2)

:::


:::wider

## Change a start screen

This game's start screen is upside down: the title sits at the bottom and the characters float at the top. Move the title near the top, and stand the hero and the monster near the bottom, facing each other.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**A sprite is at (80, 20). Is it near the top or near the bottom? How do you know?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Near the top. y counts down from the top edge, and 20 is small, so it is close to the top.

:::

