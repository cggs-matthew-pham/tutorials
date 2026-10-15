---
title: "Power-ups"
subtitle: "Arcade advanced skills · Final challenge: Power-ups and your own game · Lesson 10"
---

# Power-ups

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A mushroom in Mario, a power pellet in Pac-Man, a shield in a space shooter: each one is a variable that changes the rules for a while.


:::teacher-note

**In one sentence:** Challenge: students grow the shield game into a prize box with a blaster that runs out, a smart bomb that uses every sprite of a kind, and a power-up of their own design.

**Students should be able to say:** I can use true or false and a countdown to make a power-up that runs out. I can combine earlier moves into a bigger game with less help. I can say which jobs Arcade's engine does and which rules my blocks decide.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the star overlap and the 1-second timer.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/3caedb68a828.png?v=95ce34b189d7b832)

:::keep-together

**The shield has 2 seconds left and you catch another star. How long does the shield last now?**

☐ It switches off

☐ 2 seconds

☐ 5 seconds

☐ 7 seconds

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 5 seconds. The star sets shieldTime to 5, which throws away the 2 that were left.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/3caedb68a828.png?v=95ce34b189d7b832)

:::keep-together

### Game rule or engine?

**Who decides each thing: Arcade's engine, or a game rule in your blocks? Match them.**

A. engine: auto destroy removes it

B. engine: info ends the game at zero lives

C. game rule: your if decides

D. game rule: your overlap event decides

E. engine: velocity moves it every frame

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `Each rock slides left a little every frame` | |
| `The game ends when the lives reach 0` | |
| `A star that leaves the screen is removed` | |
| `Catching a star turns the shield on` | |
| `A rock costs no life while the shield is on` | |

:::


:::teacher-note

**Answer:** Each rock slides left a little every frame → E. engine: velocity moves it every frame; The game ends when the lives reach 0 → B. engine: info ends the game at zero lives; A star that leaves the screen is removed → A. engine: auto destroy removes it; Catching a star turns the shield on → D. game rule: your overlap event decides; A rock costs no life while the shield is on → C. game rule: your if decides

The engine does the same jobs in every game. The rules are what make this game yours, and they are where the bugs (and the fun) live.

:::


:::keep-together

### Sam's shield

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ae20cc71550e.png?v=810be60a19dafabd)

**Sam wants the shield to switch off when shieldTime reaches 0. He puts the blocks below in on start. He catches a star, and shieldTime counts down to 0. What happens to the shield?**

☐ It never switches off: the if was asked once, at the start, before the star was caught

☐ It switches off at 0

☐ It switches off straight away

☐ The game ends

:::


:::teacher-note

**Answer:** It never switches off: the if was asked once, at the start, before the star was caught

Blocks in on start run once, before the game begins. The if is never asked again. A check that must keep happening goes in a timer or in on game update.

:::


:::typical

## Milestone 1: a blaster with limited ammo

Now a star gives a random prize: `prize` is 0 (the shield) or 1 (the blaster, still empty).

- Prize 1 sets `ammo` to **5**.
- **A** (space on the keyboard) fires a shot only **if ammo > 0**, and each shot takes 1 from `ammo`.
- A shot that hits a rock destroys both.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/58e703b1ea2e.png?v=86f60bb54937448f)

:::

:::


:::typical

## Milestone 2: a smart bomb

Add a third prize: a **smart bomb** that destroys every rock on the screen, a point for each.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/1b238def9e59.png?v=1bfa43dc1bd2d804)

:::

:::


## Make: Milestone 3: your own power-up

Design a **fourth power-up** and add it to the prizes:

- Decide what it does and how long it lasts.
- A star now picks one of **four** prizes.
- Play it: is it too strong, too weak, or just right?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/cbf15743b37d.png?v=845debe175e24295)

:::


## Exit ticket

:::keep-together

**Name the three parts of a power-up in your game, using the shield as the example.**

{{lines-3}}

:::


:::teacher-note

**Answer:** A variable that remembers it (shield), an event that changes it (catching a star sets it to true), and a rule that uses it (if shield, a rock costs no life).

:::

