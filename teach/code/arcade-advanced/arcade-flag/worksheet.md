---
title: "True or false"
subtitle: "Arcade advanced skills · Power-ups · Lesson 8"
---

# True or false

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A mushroom in Mario, a power pellet in Pac-Man, a shield in a space shooter: each one is a variable that is true for a while.


:::teacher-note

**In one sentence:** Students use a true or false variable to remember whether a shield is on, see that it stays true until a block sets it back, and build a power pellet.

**Students should be able to say:** I can use a true or false variable to remember whether a power-up is on. I can set it back to false at the right moment. I can build a power-up from a variable, an event and a rule.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the two overlap events. The background turns dark blue while the shield is on.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/346709292274.png?v=47f4aa848d3e1a4f)

:::keep-together

**You catch one star. How long does the shield last?**

☐ 5 seconds

☐ Until the next rock hits you

☐ For the rest of the game

☐ One frame

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** For the rest of the game. Catching the star sets shield to true, and no block ever sets it back to false.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/346709292274.png?v=47f4aa848d3e1a4f)

:::keep-together

### Shield on, shield off

**Fill in what happens when a rock hits the ship.**

{{rows 1}}

| shield | lives before | lives after | score change |
|---|---|---|---|
| false | 3 |   |   |
| true | 3 |   |   |
| false | 1 |   |   |

:::


:::teacher-note

**Answer:** 2, 0, 3, 5, 0, 0

The if asks shield every time a rock hits. True: 5 points and no life lost. False: lose a life.

:::


:::keep-together

### True or false, or a number?

**Which needs true or false, and which needs a number?**

Groups: true or false, a number

- Is the shield on?: {{field-15}}
- How many lives are left?: {{field-15}}
- Has the player found the key?: {{field-15}}
- How many shots are left?: {{field-15}}

:::


:::teacher-note

**Answer:** Is the shield on? → true or false; How many lives are left? → a number; Has the player found the key? → true or false; How many shots are left? → a number

A yes-or-no question needs true or false. How many needs a number.

:::


:::keep-together

### Tom's shield

**Tom's shield smashes every rock for the rest of the game after one star. What is missing?**

☐ An if in on start

☐ A block that sets shield back to false

☐ Another set shield to true

☐ A second star

:::


:::teacher-note

**Answer:** A block that sets shield back to false

A true or false variable stays as it is until a block changes it. Nothing sets shield back to false, so it stays true.

:::


:::typical

## Modify


**One smash.** Make the shield **break** after it smashes one rock.

**Bonus star.** If the shield is **already on**, a star is worth 3 points.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**One smash:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/858f1b1690c5.png?v=4b28af940075aa0d)

**Bonus star:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/996f262a783f.png?v=2244f72d4a86dcfd)

:::

:::


## Mix it up


:::keep-together

**colours is 9, 4, 2, 7 and level is 2. What number does colours[level] give?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 2

Places start at 0: place 0 is 9, place 1 is 4, place 2 is 2.

:::


## Make

A ghost chases you. A **power pellet** appears every 6 seconds. Make it a power-up:

- a variable `hunting` is **false** at the start,
- catching a pellet sets it to **true** (show it with a background colour),
- touching the ghost while hunting scores 5 and sets hunting back to **false**; otherwise it costs a life.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/8e55241f2262.png?v=455ef1f3693eefdf)

:::


:::wider

## Change a key and a door

Find the key, then reach the door. Right now the door opens with no key. Use `hasKey` so the door only opens if you have the key, and if you don't, splash "Locked!" and move the explorer back a step (or the splash comes back every frame).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**Name the three parts of a power-up, using the shield as the example.**

{{lines-3}}

:::


:::teacher-note

**Answer:** A variable that remembers it (shield), an event that changes it (catching a star sets it to true), and a rule that uses it (if shield, a rock costs no life).

:::

