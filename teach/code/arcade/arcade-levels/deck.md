---
marp: true
theme: default
html: true
---

# Levels

MakeCode Arcade · Gravity and levels

<!-- Speaker note: Students keep the level in a variable and per-level settings in lists, start each level with a startLevel function, see why a level-up in on game update fires every frame, and build a three-level dodger with a win. About 55 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min · Fishing 5 min). -->

---

## Today

**We are learning to** keep the player's level in a variable, keep what changes per level in a list, and start each level with one function.

- I can use a variable to remember the level, and a list to hold what changes per level.
- I can write a startLevel function that clears the old level and sets up the new one.
- I can explain why a level-up in on game update happens every frame, and put it where the score changes instead.

<!-- Speaker note: Before class: A game with levels is three ideas students already have. A **variable** `level` remembers where the player is (it starts at **0**). A **list** such as `speeds` (40, 70, 100) holds what changes per level; `speeds[level]` looks up the value at that **place**, counted from 0, so level 0 uses 40. A **function** `startLevel` sets up a level: **destroy all sprites of kind Enemy** (clears the old ones), a **splash** (a message that waits for A) and a new enemy at `speeds[level]`. The splash shows `level + 1` with **join** (Text), because players count from 1. The level-up lives in the coin overlap, where the score changes: *if score ≥ goal*, change level by 1 and change goal by 5, then win after level 3 (**game over** with win) or start the next level. **goal** is a target that moves up. The trap: put *if score ≥ 5* in **on game update** and it fires **every frame** while the score stays 5 or more, so the level races up (and the splash comes back every time A is pressed). Try the Make task yourself: it is the biggest program so far (about 25 blocks), so allow time. Teacher: Zoe's level-up is the lesson's misconception, the other side of lesson 5: an if in on game update is asked every frame, so anything in it happens every frame while it stays true. Teacher: Fishing: a fourth level needs a fourth item in both lists and the win moved to level 4. -->

---

## Why it matters

> Almost every game gets harder as you play: faster ghosts, more aliens, a new world. Behind it is one number, the level, and a list of what each level is like.

<!-- Speaker note: A game with levels needs three things you already know: 1. a **variable**, `level`, that remembers where the player is, 2. a **list** (in **Arrays**) that holds what changes from level to level, such as `speeds`: 40, 70, 100. Places in a list are counted from **0**, so level 0 is the first level, 3. a **function**, `startLevel`, that sets a level up: it clears away the old enemies (**destroy all sprites of kind**, in Sprites), shows the level with a **splash**, and makes a new enemy at the speed `speeds[level]`. The splash uses **join** (in **Text**) to stick the word *Level* and a number together. Players count from 1, so it shows `level + 1`. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/364f7c04edea.png?v=f2359f4ea0b40d01)

**You collect 5 coins. What happens?**

- A second enemy joins the first one
- A splash says Level 2, and a faster enemy appears in place of the old one
- A splash says Level 1 again
- The game ends with a win

<!-- Speaker note: What happens: A splash says Level 2 and a faster enemy replaces the old one. At 5 points level becomes 1, startLevel destroys the old enemy, shows level + 1, and makes a new enemy at speeds[1], which is 70. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students expect a splash and a faster enemy. Some expect a second enemy: point at destroy all sprites of kind. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* A splash says Level 2 and a faster enemy replaces the old one. At 5 points level becomes 1, startLevel destroys the old enemy, shows level + 1, and makes a new enemy at speeds[1], which is 70.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/arcade/arcade-levels/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/arcade/arcade-levels/?full=step-2#step-2)

<!-- Speaker note: Collect coins and dodge the purple enemy. Press **A** (space on the keyboard) to close each splash. Can you win? Students should be able to say: I reached level 2 (or further) and compared with my prediction. -->

<!-- Speaker note: Teacher: winning takes 15 coins. Ask who reached level 3. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/364f7c04edea.png?v=f2359f4ea0b40d01)

<!-- Speaker note: What this step is for: One variable remembers the level; a list holds what changes per level, looked up with the level as the place (counted from 0); startLevel clears the old level and sets up the new one. A level-up belongs where the score changes, because an if in on game update fires every frame while it stays true. -->

<!-- Speaker note: Teacher: the trace practises lists counted from 0. The match names the job of each block. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What startLevel does

**speeds is 40, 70, 100. Fill in what startLevel does at each level.**

| level | splash shows Level … | enemy speed |
|---|---|---|
| 0 | 1 | ? |
| 1 | ? | ? |
| 2 | ? | ? |

* Answer: 40, 2, 70, 3, 100

<!-- Speaker note: The level is the place in the list, counted from 0, so level 0 uses 40. The splash adds 1, because players count levels from 1. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which block does what?

**Match each block in this game with its job.**

| | |
|---|---|
| `destroy all sprites of kind Enemy` | A. moves the target score up, so the next level-up needs 5 more points |
| `speeds[level]` | B. moves the player on to the next level |
| `change level by 1` | C. clears away the old level's enemy |
| `change goal by 5` | D. ends the game after the last level |
| `if level = 3 then game over (win)` | E. the speed for this level, looked up in the list |

* Answer: destroy all sprites of kind Enemy → C. clears away the old level's enemy; speeds[level] → E. the speed for this level, looked up in the list; change level by 1 → B. moves the player on to the next level; change goal by 5 → A. moves the target score up, so the next level-up needs 5 more points; if level = 3 then game over (win) → D. ends the game after the last level

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Zoe's levels

Zoe's level-up:

![h:264](https://tutorials.learningwaypoints.com/_pictures/makecode/code/4f70ba51427c.png?v=6d375cd06e56c00f)

**Zoe moved the level-up into on game update (below). The moment she reaches 5 points, the splashes never stop: Level 2, Level 3, Level 4, Level 5 … even though she collects no more coins. Why?**

- on game update runs every frame, and the score stays 5 or more, so the if is true every frame and levels up every time
- The list is too short
- score ≥ 5 should be score &gt; 5
- startLevel adds points

* Answer: on game update runs every frame, and the score stays 5 or more, so the if is true every frame and levels up every time

<!-- Speaker note: An if in on game update is asked every frame. Once the score is 5, the question stays true, so the level goes up again and again. Level up where the score changes (in the overlap), or check a target that moves up (goal), so the question becomes false again. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **A colour per level:** Give each level its own **background colour**, from a new list. Set it in **startLevel**.
- **Bonus life:** Give the player a **bonus life** at the start of every level. One block, in the right place.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-levels/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Anything that changes per level can go in a list and be set in startLevel, and anything in startLevel happens at the start of every level. Hints, in order: Make a new list, colours, with three numbers, in on start. Arrays has the list block. / In startLevel: set background color to (get value at level from colours). / change life by 1 (Info) goes inside startLevel. For students who need more support: Give students the Make game with the lists and startLevel already made, so they add only the level-up and the win. For early finishers: Add a fourth list, the number of enemies per level, and use a repeat loop in startLevel to make that many. The hard part, on purpose: The level-up if runs every frame, and list places start at 0. When levels race up, ask how often that block runs. When students get stuck: The level races up as soon as the score reaches the target. Ask: Where is the level-up if, and how often does that block run? Fix: Move it into the event where the score changes (the overlap or the timer), or make the target goal go up each time. / Old enemies stay on the screen at the next level. Ask: What does startLevel do first? Fix: Add destroy all sprites of kind Enemy at the top of startLevel. / The splash says Level 0, or the speed is wrong by one level. Ask: Where does the list start counting? Fix: Places start at 0. The level starts at 0, and the splash shows level + 1. / The game crashes or the enemy stops after the last level. Ask: What is speeds[3] when the list has 3 items? Fix: There is no place 3. Check level = 3 and end the game (win) before calling startLevel. -->

<!-- Speaker note: Teacher: a second list (colours) works exactly like speeds. The bonus life shows that startLevel runs once per level. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

This dodger scores a point for every rock. Give it **three levels**:

- each level has its own **background colour** and **rock speed** (faster each level), from lists,
- **startLevel** clears the old rocks, sets the colour and splashes the level,
- every 10 points, the level goes up (level up where the score changes, not in on game update),
- after level 3, the player **wins** (game over, win).

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-levels/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: In on start: a list of three rock speeds (negative, they fly left), a list of three colours, and a goal of 10. Call startLevel. / startLevel: destroy all Enemy sprites, set the background from the colours list, splash the level. / In the timer, set rock vx to the speed for this level. After change score: if score ≥ goal, change level by 1, change goal by 10, then if level = 3 game over (win), else startLevel. -->

<!-- Speaker note: Teacher: encourage students to plan on paper first: which lists, what goes in startLevel, where the level-up goes. Rock speeds are negative because rocks fly left. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a fishing game

Catch fish with the net. Every 5 fish the water gets deeper and the fish swim faster. Add a **fourth level** (both lists need a fourth item, and the win must move), then make the deepest level's fish the fastest yet.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-levels/?full=step-6#step-6)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**speeds is 40, 70, 100 and level is 1. What speed does the enemy get, and why?**

* 70: level 1 is the second place in the list, because places are counted from 0.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next unit: the final challenge, Space dodger, where students build a complete game in milestones. Class ideas: design a level table on paper (speed, colour, enemies, goal) before coding it; swap games and play each other's level 3. -->
