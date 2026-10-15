---
title: "Timers"
subtitle: "Arcade Foundations · Collide and score · Lesson 6"
---

# Timers

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Enemies that keep on coming, raindrops that never stop: a game that runs for minutes is made by a few blocks that run again and again.


:::teacher-note

**In one sentence:** Students use a timer event to make a new enemy every second, from a random height, and see that both the timer and pick random run again each time.

**Students should be able to say:** I can use a timer to make a new enemy again and again. I can choose how often a timer runs. I can give each new sprite a random place.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The rock is made **inside** the timer, not in on start.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/3aefa7e7c5f5.png?v=bae0808342973c21)

:::keep-together

**The timer runs every 1000 ms and makes a rock each time. You watch for 5 seconds. How many rocks have appeared?**

☐ 0

☐ 1

☐ 5

☐ 1000

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 5. The timer runs once every second, and each time it makes a new rock: 5 seconds, 5 rocks.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

Dodge the rocks with the arrow keys.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/70ebc25ef707.png?v=91fa947c076ae343)

:::keep-together

### How many?

**The timer runs every 500 ms. How many rocks has it made after 10 seconds?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 20

500 ms is half a second, so the timer runs twice a second: 20 times in 10 seconds.

:::


:::keep-together

### Ava's rocks

Ava's program:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/7c1d15693fd6.png?v=adae39729f1270d7)

**Ava picks a random height once, in on start, and stores it in y. Every rock in her timer uses y. What does she see?**

☐ Rocks at every height at once

☐ No rocks

☐ Each rock comes at a different height

☐ Every rock comes at the same height

:::


:::teacher-note

**Answer:** Every rock comes at the same height

pick random ran once, in on start, so y never changes. Put pick random inside the timer, so each new rock gets a new number.

:::


:::keep-together

### How often?

**Match each timer with how often it runs.**

A. once a second

B. twice a second

C. once every two seconds

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `every 1000 ms` | |
| `every 500 ms` | |
| `every 2000 ms` | |

:::


:::teacher-note

**Answer:** every 1000 ms → A. once a second; every 500 ms → B. twice a second; every 2000 ms → C. once every two seconds

:::


:::typical

## Modify


**Faster rocks.** Make a rock come every **half a second**.

**Random heights.** Give each rock a **random** height, so they don't all come through the middle.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Faster rocks:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/2fc5b31c130c.png?v=984f52ad38675457)

**Random heights:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/916d34286362.png?v=2c282852ea741394)

:::

:::


## Mix it up


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/a349e1d91e6d.png?v=80c822d339b35d6c)

:::keep-together

**The player starts with 2 lives. Fill in the lives after each thing happens.**

{{rows 1}}

| what happens | lives after |
|---|---|
| (start) | 2 |
| collects a heart |   |
| a rock hits |   |
| a rock hits |   |

:::


:::teacher-note

**Answer:** 3, 2, 1

The heart's Player–Food event adds one life; each rock that hits takes one and is destroyed.

:::


## Make

Make a **30-second dodge game** (bats in a cave, asteroids, traffic):

- the player starts with **3 lives**
- a **countdown** of 30 seconds (**start countdown**, in Info): survive it to finish
- every second, a new **enemy** flies in from the **right edge** at a **random height**
- each touch takes **one** life

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/494db859a416.png?v=3207766510f154d4)

:::


:::wider

## Change a rain dodger

Someone is walking home in the rain without an umbrella. Make the rain heavier (more drops, falling faster), then give the walker 5 lives and a 40-second walk home.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**A timer runs every 2000 ms and makes one enemy each time. How many enemies after 10 seconds?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 5. It runs once every two seconds.

:::

