---
title: "Else and chasing"
subtitle: "MakeCode Arcade · Decide · Lesson 6"
---

# Else and chasing

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** The ghosts in Pac-Man, the zombies in Plants vs. Zombies, a guard walking up and down in a stealth game: each one asks 'where is the player?' and turns that way.


:::teacher-note

**In one sentence:** Students build an enemy that chases the player with if … else by comparing positions, then meet the follow block that does the same steering for them.

**Students should be able to say:** I can use if … else so exactly one of two things happens. I can compare two sprites' positions to decide which way one should move. I can use else if to choose between more than two options. I can explain what the follow block does, because I have built it myself.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`<` means "less than". **vx** is the speed across: positive goes right, negative goes left.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/d1c84a204fa7.png?v=3680f4e17d805c7d)

:::keep-together

**The cat starts at x 20, the mouse at x 140. Nobody touches the keys. What does the cat do?**

☐ Walks right, towards the mouse

☐ Walks right, past the mouse and off the screen

☐ Stays where it is

☐ Walks left, off the screen

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It walks right, towards the mouse. Its x (20) is less than the mouse's x (140), so its vx is set to 30. When it reaches the mouse it wobbles on the spot: each frame the answer flips between yes and no.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/d1c84a204fa7.png?v=3680f4e17d805c7d)

:::keep-together

### Which way?

**For each position, which way does the if … else set the cat's vx?**

{{rows 1}}

| cat x | mouse x | cat vx |
|---|---|---|
| 20 | 140 |   |
| 120 | 50 |   |
| 80 | 81 |   |
| 80 | 80 |   |

:::


:::teacher-note

**Answer:** 30, -30, 30, -30

When cat x is less than mouse x the first part runs (30, go right); otherwise the else part runs (-30, go left). At 80 and 80, 80 is not less than 80, so else runs: that is why the cat wobbles when it reaches the mouse.

:::


:::keep-together

### How many run?

**Each frame, how many of the two set vx blocks run?**

☐ Exactly one: the first when the answer is yes, the else part when it is no

☐ None, unless a button is pressed

☐ Both, one after the other

☐ Only the first one

:::


:::teacher-note

**Answer:** Exactly one: the first when the answer is yes, the else part when it is no

if … else always runs exactly one part. So the cat always has a direction: there is no frame where it forgets.

:::


:::keep-together

### Zoe's cat

Zoe's blocks (load them in the playground and run them):

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/7e1990c4fb9e.png?v=4de52a048d97801f)

**Zoe built her own cat (the playground has her version). The cat runs away from the mouse, then stops at the edge of the screen. Which part is wrong?**

☐ 30 is too slow to catch the mouse

☐ The speeds are the wrong way round: when the mouse is to the right, the cat's vx is set to a negative number

☐ The &lt; should be &gt;, and the speeds are fine

☐ It needs to be in on start

:::


:::teacher-note

**Answer:** The speeds are the wrong way round: when the mouse is to the right, the cat's vx is set to a negative number

When the cat's x is less than the mouse's x, the mouse is to the right, so the cat needs a positive vx (go right). Zoe's cat gets -30 and goes left. Swap the two speeds (or the &lt; and &gt;, but not both).

:::


:::typical

## Modify


**Up and down.** Your cat only chases across. Add a second **if … else** for up and down, using **y** and **vy**.

**Caught!.** Make the game end when the cat touches the mouse.

**Meet the real tool.** Load the **follow** version and run it. Arcade has a block (**follow**, in **Sprites**) that does your chasing in one block. Try a speed of 60.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Up and down:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/dfa89dc8e3b7.png?v=f12abec19dd7f02d)

**Caught!:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/be6aed60a8b5.png?v=97b2bd9883b5c41d)

:::

:::


## Make

Make a **guard** that patrols. The guard already walks right. Make it:

- turn round and walk **left** when it gets past x **140**,
- turn round and walk **right** when it gets past x **20**,

for ever. Use one **if** with an **else if** (the **+** on the if block adds more parts; the **−** takes one away).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/9ba33d38e626.png?v=f1fb27caab0bf4a2)

:::


:::wider

## Change a sheepdog

Here the sheep runs **away** from the dog (you move the dog). Make the sheep run away up and down as well, and make it a bit slower than the dog so you can herd it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**An enemy is at x 100 and the player is at x 30. Should the enemy's vx be positive or negative to chase? Why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Negative. The player has a smaller x, so it is to the left, and a negative vx moves the enemy left.

:::

