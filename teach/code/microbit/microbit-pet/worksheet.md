---
title: "Pocket pet"
subtitle: "micro:bit Foundations · Final challenge: Pocket pet · Lesson 11"
---

# Pocket pet

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Tamagotchis, Neopets and the pets in phone games all run the same loop: time makes a number go up, you bring it down, and a picture shows how things are going.


:::teacher-note

**In one sentence:** Students build a pocket pet in three milestones, using forever, events, a variable, ranges with else if, and a random pick from a list.

**Students should be able to say:** I can make a number change by itself as time passes. I can turn one number into one of several pictures with else if. I can put the ideas of the course together into a small game.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

This is the heart of the pet: time making hunger go up.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/83b284c704ce.png?v=6320092bfc4a63ec)

:::keep-together

**Nobody presses anything. About what number shows 10 seconds after the pet starts?**

☐ 0

☐ 1

☐ 3

☐ 10

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 3. forever waits 3 seconds, then adds 1 to hunger and shows it, again and again: 1 after 3 seconds, 2 after 6, 3 after 9.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

This is the finished pet. Read it before you build your own.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/651ffe64a028.png?v=6e8a923ee468bbef)

:::keep-together

### Feeding

**A feeds the pet: if hunger &gt; 0, change hunger by -1. Why is the if there?**

☐ So hunger goes up instead

☐ So A only works once

☐ To make the pet sleep

☐ So hunger never goes below 0

:::


:::teacher-note

**Answer:** So hunger never goes below 0

Without the if, feeding a full pet makes hunger -1, -2, -3. The if only takes 1 away while there is some hunger to take.

:::


:::keep-together

### Faces

**The face is chosen by if hunger &lt; 3 … else if hunger &lt; 6 … else. What does each hunger show?**

{{rows 1}}

| hunger | face |
|---|---|
| 1 |   |
| 4 |   |
| 8 |   |

:::


:::teacher-note

**Answer:** happy, asleep, sad

The questions are asked from the top and the first true one wins. 4 is not less than 3, but it is less than 6.

:::


:::keep-together

### Tricks

**A shake picks a trick with get value at (pick random 0 to length of tricks − 1). You add a fourth trick. What else must change?**

☐ You need a second list

☐ The shake block

☐ Nothing: length of tricks grows with the list

☐ The 3 in pick random

:::


:::teacher-note

**Answer:** Nothing: length of tricks grows with the list

length of tricks is now 4, so pick random already reaches the new trick.

:::


:::typical

## Milestone 1: hungry over time

The variable `hunger` and the feeding button **A** are made for you.

1. Inside **forever**, pause for 3 seconds.
2. Then change `hunger` by 1 and show it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/4c8128a7cdd8.png?v=923d01192e19299a)

:::

:::


:::typical

## Milestone 2: a face for each feeling

Swap the number for a face. Choose your own pictures:

- **hunger** below 3: happy.
- Below 6: tired or bored.
- Anything else: sad.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ad978494dfa5.png?v=33b895b321224a61)

:::

:::


## Make: Milestone 3: tricks

The list `tricks` is made for you. Make a **shake** show one trick, picked at random. Add a trick of your own to the list.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/651ffe64a028.png?v=6e8a923ee468bbef)

:::


:::wider

## Make it yours

Give your pet a life of its own. Some ideas:

- It **sleeps** when it is dark (light level), and hunger stops going up.
- **B** plays with it, which makes it hungrier.
- A second need, such as `bored`, with its own number.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**Your pet has: if hunger &lt; 6 tired, else if hunger &lt; 3 happy, else sad. What does it show when hunger is 1, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Tired. 1 is less than 6, so the first question is true and the rest are skipped. Ask &lt; 3 first.

:::

