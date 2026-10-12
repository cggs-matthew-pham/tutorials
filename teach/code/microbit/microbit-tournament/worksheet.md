---
title: "Tournament"
subtitle: "micro:bit Foundations · Final challenge: Reaction timer · Lesson 14"
---

# Tournament

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A tennis scoreboard, a chess clock and an esports bracket all do the same jobs: keep both scores, start the next round, and declare a winner.


:::teacher-note

**In one sentence:** An optional, harder extension of the Radio duel. Students keep a two-place scoreboard list, move a round into a function so rounds carry on, and end the tournament at three wins.

**Students should be able to say:** I can keep a scoreboard in a list and update the right place. I can move a sequence into a function and call it from two places. I can end a game with a target, a message and a reset.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/6180f8a2e1a7.png?v=d334629537f1816d)

:::keep-together

**scores is [2, 1]. You press A+B. What does the micro:bit show?**

☐ 1, then -, then 2

☐ 2, then -, then 1

☐ 21

☐ 3

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 2, then -, then 1. showScores shows place 0 (your score), a dash, then place 1 (the other player's).

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/6180f8a2e1a7.png?v=d334629537f1816d)

:::keep-together

### The scoreboard

**Match each block with what it does to the scoreboard.**

A. adds one to your wins

B. the other player's wins

C. your wins

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `get value at 0 from scores` | |
| `get value at 1 from scores` | |
| `set value at 0 of scores to (scores[0] + 1)` | |

:::


:::teacher-note

**Answer:** get value at 0 from scores → C. your wins; get value at 1 from scores → B. the other player's wins; set value at 0 of scores to (scores[0] + 1) → A. adds one to your wins

:::


:::keep-together

### Two sides of one match

**You lead 2 to 1. What does your partner's scoreboard show?**

☐ 1 - 2

☐ 2 - 1

☐ 3 - 0

☐ Nothing

:::


:::teacher-note

**Answer:** 1 - 2

Your partner's micro:bit runs the same program, but its place 0 is your partner. From their side it is 1 - 2.

:::


:::typical

## Milestone 1: keep score

This is the duel with a scoreboard and a **showScores** function already made. Update `scores` when you win a round and when you lose one. Check with **A+B**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/ebca932acf4b.png?v=43da7bef168a109c)

:::

:::


:::typical

## Milestone 2: the next round

Make a function **startRound** from the blocks inside **B**. After each round, both players see the scores, and the **winner's** micro:bit starts the next round.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/f39f7761091e.png?v=3ac8ca81b2d0f6b1)

:::

:::


## Make: Milestone 3: champion

Finish the tournament:

- The first player to **3** wins: their micro:bit sends **3** and shows Champion.
- When **3** arrives, show Game over.
- Both scoreboards reset for the next tournament.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/5c0531678dd6.png?v=64aeeaf06fee6c9c)

:::


:::wider

## Run a class tournament

With real micro:bits, run a knockout: each pair picks its own group number, winners move on and play each other. Ideas to make it yours: first to five, a sound for the champion, or showing the scores after every round on both sides.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**You win a round. Why does your scoreboard add at place 0 while your partner's adds at place 1?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Both run the same program, and each keeps its own player at place 0. Your win is a loss on your partner's side.

:::

