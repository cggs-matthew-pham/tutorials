---
marp: true
theme: default
html: true
---

# Fake-outs and levels

micro:bit: talk and play · Final challenge: Reaction duel

<!-- Speaker note: An optional, harder extension of the Reaction timer. Students add decoy signals, levels with target times kept in a list, and lives, managing several pieces of state at once. About 60 minutes (Predict, Run, Investigate 10 min · Milestone 1 10 min · Milestone 2 15 min · Milestone 3 20 min · Make it yours 5 min). -->

---

## Today

**We are learning to** make the reaction game harder. Decoys you must not press, a list of target times that get tighter each level, and three lives.

- I can use two true/false variables to tell different moments apart.
- I can use a variable as the place in a list, so a rule gets harder.
- I can manage lives, levels and an end to the game.

<!-- Speaker note: Before class: This lesson is **optional**: it is for students who finished the Reaction timer and Radio duel and want a harder challenge. It needs nothing new, only more of the same ideas at once. A **decoy** (a cross instead of the heart) appears about one round in three (*pick random 0 to 2 = 0*); a second true/false variable, `decoy`, remembers that moment. **Levels** use a list of target times, `targets`: the current level is the place in the list, so *reaction < targets[level]* gets harder as the level rises. When the level reaches the length of the list, the player has won. **Lives** count mistakes. Teacher: Milestone 1: else if decoy. Read A aloud: 'if waiting, time it; else if a cross is showing, caught out; else too early'. Teacher: Milestone 2: targets[level] is the key idea: a variable chooses the place in the list. Teacher: Milestone 3: goals only. Encourage students to plan on paper first: when do lives go down, when does the game end? -->

---

## Why it matters

> Arcade games keep you playing by getting harder as you improve, and by trying to trick you. Both are a few rules on top of the game you already built.

<!-- Speaker note: This lesson goes further than the Reaction timer, for one player. You will add three rules, one milestone each: 1. **Fake-outs:** sometimes a cross appears instead of the heart. Do **not** press! 2. **Levels:** each level has a target time to beat, kept in a **list**, and the targets get tighter. 3. **Lives:** three mistakes and it is game over. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/0173e3579a8b.png?v=51e31adf5947f1a1)

**Over many rounds, how often does a cross appear instead of the heart?**

- About half the rounds
- Every round
- About 1 round in 3
- Never

<!-- Speaker note: What happens: About 1 round in 3. pick random 0 to 2 gives 0, 1 or 2 equally often, and only 0 shows the cross. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: about one in three. Ask why 0 to 2 gives a third. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* About 1 round in 3. pick random 0 to 2 gives 0, 1 or 2 equally often, and only 0 shows the cross.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-levels/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-levels/?full=step-2#step-2)

<!-- Speaker note: Press **B** about ten times. Count the crosses. Students should be able to say: I pressed B about ten times and counted how many crosses appeared. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/deab02ca0b36.png?v=2a6a9e936f30f4b6)

<!-- Speaker note: The game keeps one target per level in a list. **A+B** shows the target for the current level. What this step is for: A list can hold the rules of a game: one target per level, found by using the level number as the place. -->

<!-- Speaker note: Teacher: the list holds the rules of the game. The last question previews Milestone 3's win condition. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Targets per level

**targets is 800, 600, 450, 350, 300. What must you beat at each level?**

| level | target to beat (ms) |
|---|---|
| 0 | ? |
| 2 | ? |
| 4 | ? |

* Answer: 800, 450, 300

<!-- Speaker note: The level number is the place in the list, counted from 0. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## After the last level

**There are 5 targets. You beat level 4. What must the game do next?**

- Stop: there is no place 5, so you have won (level equals the length of the list)
- Use place 5
- Show 300 again
- Start again at place 1

* Answer: Stop: there is no place 5, so you have won (level equals the length of the list)

<!-- Speaker note: Places run from 0 to 4. When level reaches 5, the length of the list, there are no targets left: the player has won. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 1: fake-outs

`decoy` is true while the cross is showing. Make **A** catch you out when you press during a cross: add **else if decoy** and show a skull.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-levels/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A second true/false variable remembers a second kind of moment, and else if tells the moments apart. Hints, in order: decoy is already set to true when the cross shows. In A, add else if decoy. / Inside it: set decoy to false and show a skull (caught out). For students who need more support: Students who find this heavy can stop after Milestone 2; the levels alone make a good game. For early finishers: Make the decoy chance grow with the level: pick random 0 to (4 − level), so higher levels trick you more often. The hard part, on purpose: Which check comes first in the A button, and a list of targets by level. Ask them to say the order of the questions before testing. When students get stuck: Pressing on a cross shows the too-early cross, not the skull. Ask: Which is checked first in A: waiting, decoy, or else? Fix: Order: if waiting … else if decoy … else. / The level goes up even when slow. Ask: Which way round is the comparison? Fix: Use reaction < targets[level]: faster than the target. / Something goes wrong after the last level. Ask: Which places exist in targets? Fix: When level equals the length of targets, the player has won: show Champion and start again. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 2: levels

Each good press must beat **targets[level]** to go up a level. Show the new level when you go up, and a sad face when you are too slow.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-levels/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Comparing with a list item, chosen by a variable, lets the same rule get harder as the variable grows. Hints, in order: After working out reaction: if reaction < get value at level from targets. / If so: change level by 1 and show it. Else: show a sad face. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Milestone 3: lives

Finish the game:

- You start with **3 lives**. Pressing on a cross or being too slow loses one.
- At **0 lives**: show Game over and your level, then start again.
- Beat the **last** target: you are the champion.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-levels/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Writing the end of the game from goals alone shows whether a student can manage several pieces of state at once. Hints, in order: A variable lives starts at 3. Change it by -1 for a press on a cross, and for a press that is too slow. / At the end of A: if lives = 0, show Game over and the level, then reset level and lives. When level reaches the length of targets, show Champion. -->

<!-- Speaker note: Teacher: let students swap games and play each other's. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make it yours

Change the rules to make it your game. Ideas: more levels, a different chance of a fake-out, a shorter wait at higher levels, or a sound for each level.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-levels/?full=step-7#step-7)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**level is 2 and targets is 800, 600, 450, 350, 300. What time must you beat, and why?**

* 450 ms: level 2 is the place in the list, counted from 0.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: The other optional lesson, Tournament, takes the Radio duel further with a scoreboard list. Class ideas: a class high-level board; students design a sixth level and argue what its target should be. -->
