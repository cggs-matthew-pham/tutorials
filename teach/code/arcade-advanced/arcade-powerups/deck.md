---
marp: true
theme: default
html: true
---

# Power-ups

Arcade advanced skills · Final challenge: Power-ups and your own game

<!-- Speaker note: Challenge: students grow the shield game into a prize box with a blaster that runs out, a smart bomb that uses every sprite of a kind, and a power-up of their own design. About 60 minutes (Predict, Run, Investigate 12 min · Milestone 1 15 min · Milestone 2 13 min · Milestone 3 20 min). -->

---

## Today

**We are learning to** challenge: grow the shield game into a prize box: a blaster with limited ammo, a smart bomb, then a power-up of your own.

- I can use true or false and a countdown to make a power-up that runs out.
- I can combine earlier moves into a bigger game with less help.
- I can say which jobs Arcade's engine does and which rules my blocks decide.

<!-- Speaker note: Before class: Nothing new: the challenge combines true or false (the shield), counting down (shieldTime, ammo) and every sprite of a kind (the smart bomb). A power-up is always three parts: a **variable** that remembers it, an **event** that changes it, and a **rule** that uses it. The Investigate match starts a thread for the next lesson: **the engine** (velocity, overlaps noticed, game over at zero lives, auto destroy) does the same jobs in every game, while **game rules** are the blocks you write. Teacher: Sam's shield revisits If, every frame: on start runs once, so an if there is asked once. Teacher: Milestone 1: the prize is random, so students may need a few stars to test the blaster. They can set prize to 1 while testing. Teacher: Milestone 2: the smart bomb is Every one of a kind again. Teacher: Milestone 3: goals only. Ask each student to say their power-up as three parts: variable, event, rule. -->

---

## Why it matters

> A mushroom in Mario, a power pellet in Pac-Man, a shield in a space shooter: each one is a variable that changes the rules for a while.

<!-- Speaker note: Your shield game from the last two lessons: catch a star and you get a **shield** for 5 seconds. Now a star becomes a **prize box**. You will add three prizes, one milestone each, with less help each time. Everything you need is from earlier lessons: true or false, counting down, and every sprite of a kind. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Power-up cards <span style="font-size:.6em;color:#64748b">(3 min)</span>

Each pair draws a card for their fourth power-up: name, variable, event, rule, how long.

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/3caedb68a828.png?v=95ce34b189d7b832)

**The shield has 2 seconds left and you catch another star. How long does the shield last now?**

- It switches off
- 2 seconds
- 5 seconds
- 7 seconds

<!-- Speaker note: What happens: 5 seconds. The star sets shieldTime to 5, which throws away the 2 that were left. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: set throws away what is left (from Run out). Ask whether that is fair. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 5 seconds. The star sets shieldTime to 5, which throws away the 2 that were left.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/arcade-advanced/arcade-powerups/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/arcade-advanced/arcade-powerups/?full=step-2#step-2)

<!-- Speaker note: Catch a star, then another before the shield ends. Students should be able to say: I caught two stars close together and compared with my prediction. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/3caedb68a828.png?v=95ce34b189d7b832)

<!-- Speaker note: What this step is for: Arcade's engine moves sprites, notices touches and ends the game; the rules (what a touch means, when a power-up is on) are the blocks you write. -->

<!-- Speaker note: Teacher: name the split. Ask students for one more example of each. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Game rule or engine?

**Who decides each thing: Arcade's engine, or a game rule in your blocks? Match them.**

| | |
|---|---|
| `Each rock slides left a little every frame` | A. engine: auto destroy removes it |
| `The game ends when the lives reach 0` | B. engine: info ends the game at zero lives |
| `A star that leaves the screen is removed` | C. game rule: your if decides |
| `Catching a star turns the shield on` | D. game rule: your overlap event decides |
| `A rock costs no life while the shield is on` | E. engine: velocity moves it every frame |

* Answer: Each rock slides left a little every frame → E. engine: velocity moves it every frame; The game ends when the lives reach 0 → B. engine: info ends the game at zero lives; A star that leaves the screen is removed → A. engine: auto destroy removes it; Catching a star turns the shield on → D. game rule: your overlap event decides; A rock costs no life while the shield is on → C. game rule: your if decides

<!-- Speaker note: The engine does the same jobs in every game. The rules are what make this game yours, and they are where the bugs (and the fun) live. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sam's shield

![h:264](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ae20cc71550e.png?v=810be60a19dafabd)

**Sam wants the shield to switch off when shieldTime reaches 0. He puts the blocks below in on start. He catches a star, and shieldTime counts down to 0. What happens to the shield?**

- It never switches off: the if was asked once, at the start, before the star was caught
- It switches off at 0
- It switches off straight away
- The game ends

* Answer: It never switches off: the if was asked once, at the start, before the star was caught

<!-- Speaker note: Blocks in on start run once, before the game begins. The if is never asked again. A check that must keep happening goes in a timer or in on game update. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 1: a blaster with limited ammo

Now a star gives a random prize: `prize` is 0 (the shield) or 1 (the blaster, still empty).

- Prize 1 sets `ammo` to **5**.
- **A** (space on the keyboard) fires a shot only **if ammo > 0**, and each shot takes 1 from `ammo`.
- A shot that hits a rock destroys both.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/arcade-advanced/arcade-powerups/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A number variable limits an action: the button event asks the variable first, and a prize refills it. Hints, in order: In the else of the star overlap: set ammo to 5. Then add on A button pressed with if ammo > 0. / Inside the if: projectile from ship with vx 100, vy 0, then change ammo by -1. A Projectile–Enemy overlap destroys both and adds points. For students who need more support: A student who finishes Milestone 1 has the key idea. For Milestone 3, offer the extra life (change life by 1) as a first power-up, then ask for one more of their own. For early finishers: Show the ammo on screen with the ship's say block after each shot. The hard part, on purpose: Holding several power-ups in one program. Ask students to point at the variable, the event and the rule for each prize. When students get stuck: A fires forever, or never. Ask: What is ammo at the start, and where does it change? Fix: ammo starts at 0, a prize-1 star sets it to 5, and each shot changes it by -1, all inside if ammo > 0. / Shots pass through rocks. Ask: Which kinds does your overlap event name? Fix: A shot is a Projectile, so the event must be Projectile overlaps Enemy. / The bomb destroys only one rock. Ask: Is the destroy inside the for element block? Fix: Destroy value, inside the loop. / A prize never comes up. Ask: What range does pick random use? Fix: 0 to the number of prizes minus 1. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 2: a smart bomb

Add a third prize: a **smart bomb** that destroys every rock on the screen, a point for each.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/arcade-advanced/arcade-powerups/?full=step-5#step-5)

<!-- Speaker note: What this step is for: for element of a list of every sprite of a kind does a job once for each, so one prize can clear the screen. Hints, in order: Change prize to pick random 0 to 2, and turn the else into else if prize = 1 (the blaster). The new else is the bomb. / In the bomb: for element value of array of sprites of kind Enemy, destroy value and change score by 1. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Milestone 3: your own power-up

Design a **fourth power-up** and add it to the prizes:

- Decide what it does and how long it lasts.
- A star now picks one of **four** prizes.
- Play it: is it too strong, too weak, or just right?

[Open this step](https://studio.learningwaypoints.com/tutorials/code/arcade-advanced/arcade-powerups/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Designing a power-up from goals alone shows whether a student can turn a game idea into a variable, an event that changes it, and a rule that uses it. Hints, in order: Pick random 0 to 3, and one more else if. The last else is yours. / Ideas: an extra life, a slow-down (a variable the rock timer uses for vx), or a magnet that makes stars follow the ship. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Fair test <span style="font-size:.6em;color:#64748b">(5 min)</span>

Play the next pair's game. Rate their power-up: too strong, too weak, or just right?

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name the three parts of a power-up in your game, using the shield as the example.**

* A variable that remembers it (shield), an event that changes it (catching a star sets it to true), and a rule that uses it (if shield, a rock costs no life).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Will it work in Arcade?, judging which games Arcade does well by the building blocks they need. Class ideas: a power-up design jam where pairs swap power-ups and rate them for fairness; draw a power-up card (name, variable, event, rule, how long). -->
