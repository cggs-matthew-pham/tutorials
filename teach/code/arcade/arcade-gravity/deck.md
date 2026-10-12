---
marp: true
theme: default
html: true
---

# Gravity and jumping

MakeCode Arcade · Gravity and levels

<!-- Speaker note: Students give a sprite gravity (acceleration down), build a floor with an if in on game update, and make a jump that only works from the ground, then build a runner game. About 50 minutes (Predict and Run 8 min · Investigate 15 min · Modify 10 min · Make 12 min · Trampoline 5 min). -->

---

## Today

**We are learning to** give a sprite gravity, build a floor with an if, and make it jump, but only from the ground.

- I can give a sprite gravity with ay and explain why it falls faster and faster.
- I can make a jump with a negative vy, and build a floor with an if in on game update.
- I can explain why a jump needs a check that the player is on the ground.

<!-- Speaker note: Before class: **Velocity** (vx, vy) is how far the engine moves a sprite every frame. **Acceleration** (ay) is how much the engine changes the velocity: with ay 300, vy grows by 300 every second, a little each frame. So a sprite with ay falls **faster and faster**, like a dropped ball. A **jump** is a speed upwards: **vy = -150** (negative, because y counts down the screen). Gravity slows the jump, stops it at the top, and brings the sprite back down. Nothing in an empty Arcade game is solid, so a falling sprite drops off the screen. This lesson builds a **floor** by hand: in **on game update** (every frame), *if player bottom > 100*, set the bottom back to 100 and vy to 0. **bottom** is the y of the sprite's lowest edge. In real Arcade games, **tilemaps** (worlds drawn from squares in the tile editor) do this for you: wall tiles stop sprites, and the camera can scroll. That is a later step; building the floor first shows what a wall does. The trap: a jump with no ground check lets the player jump again in mid-air, and keep climbing. Try the Make task yourself: it reuses the jumper's blocks plus a timer and an overlap from lesson 4. Teacher: Leo's jump is the lesson's misconception. Ask: where is the player when A is pressed the second time? Teacher: Read the floor if aloud, and point out the Python version: the same if, inside a function the game calls every frame. Teacher: Engine note: a tilemap wall is this if, done by the engine. Mention that platformers are one of the game types Arcade is built for. Teacher: Trampoline: setting vy to a negative number at the floor makes a bounce instead of a stop. -->

---

## Why it matters

> Mario, Sonic and every runner game on a phone: you press jump, you rise, you slow down, you fall back. That curve is two numbers and one rule.

<!-- Speaker note: You know **velocity**: vx and vy say how far the engine moves a sprite every frame. Arcade has a third number, **ay**: the **acceleration** down. Every frame, the engine adds a little to **vy**, so the sprite falls **faster and faster**. That is gravity. A **jump** is just a speed **upwards**: a **negative vy** (y counts down, so up is negative). Gravity then slows the sprite, stops it, and pulls it back down. Set ay in **Sprites**: the same block as set vx, with **ay** chosen in its dropdown. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:290](https://tutorials.learningwaypoints.com/_pictures/makecode/code/61b8f2b5bc6d.png?v=f3c810cb435ec575)

**The ball starts near the top with ay 300 and nothing else. What does it do?**

- Falls at the same speed all the way
- Stays where it is
- Falls and stops at the bottom edge
- Falls faster and faster, and drops off the bottom of the screen

<!-- Speaker note: What happens: It falls faster and faster and drops off the bottom of the screen. ay makes vy grow every frame, and nothing tells the ball where the ground is. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: many students expect the ball to stop at the bottom. Nothing tells it where the ground is. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It falls faster and faster and drops off the bottom of the screen. ay makes vy grow every frame, and nothing tells the ball where the ground is.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/arcade/arcade-gravity/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/arcade/arcade-gravity/?full=step-2#step-2)

<!-- Speaker note: Watch the ball closely: does it fall at a steady speed? Press the restart button under the simulator to see it again. Students should be able to say: I watched the ball fall (restart to see it again) and compared with my prediction. -->

<!-- Speaker note: Teacher: ask whether it falls at a steady speed. It speeds up: that is acceleration. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/2a50a788a823.png?v=e8c933e575867e1c)

<!-- Speaker note: Leo's player has gravity, a floor and a jump. Run and jump with the **A** button (space on the keyboard). **The floor.** There is no ground in this game, so the program builds one. In **on game update**, every frame: *if player bottom > 100*, put the bottom back at 100 and set vy to 0. **bottom** is the y of the sprite's bottom edge (choose it in the dropdown of the x block). In Python the floor is the same if, inside the function the game calls every frame: **Engine note.** Arcade can do the floor for you. A **tilemap** is a game world drawn from squares (tiles) in the tile editor; tiles marked as **walls** stop sprites by themselves, and the **camera** can scroll along a world much bigger than the screen. That is why platformers suit Arcade so well. This course builds the floor by hand first, so tile walls make sense when you meet them: a wall is this if, done by the engine. What this step is for: Gravity is acceleration: the engine adds ay to vy every second, a little each frame, so a fall speeds up and a jump (a negative vy) slows, stops and comes back. With no tilemap there is no floor, so an if in on game update builds one, and a jump must check the player is on it. -->

<!-- Speaker note: Teacher: the trace shows vy growing; the number task shows a jump slowing to a stop. Draw the jump as an arch on the board. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Faster and faster

**A sprite starts still (vy 0) with ay 300. Gravity adds 300 to vy every second. Fill in vy.**

| seconds | vy (speed down) |
|---|---|
| 0 | 0 |
| 0.5 | ? |
| 1 | ? |
| 2 | ? |

* Answer: 150, 300, 600

<!-- Speaker note: Every second vy grows by ay, 300. That is why a fall speeds up: the sprite moves further each frame than the frame before. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Top of the jump

**Now the player jumps: vy is set to -150 (up), with ay 300. How many seconds until it stops rising (vy is 0)?**

* Answer: 0.5

<!-- Speaker note: Gravity adds 300 every second, so after 0.5 seconds -150 has become 0: the top of the jump. Then vy is positive and the player falls back down. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Leo's jump

**This is Leo's jumper. Pressing A once jumps well, but pressing it again and again makes his player fly off the top of the screen. Why?**

- ay should be negative
- The floor in on game update pushes him up
- -150 is too big a number
- Nothing checks the player is on the ground, so every press jumps again, even in mid-air

* Answer: Nothing checks the player is on the ground, so every press jumps again, even in mid-air

<!-- Speaker note: A jump only sets vy to -150. Leo's A event does that on every press, wherever the player is, so each press in the air starts a new jump higher up. The jump should only happen when the player stands on the floor. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **No flying:** This is Leo's game. Fix it: **A** only jumps when the player is **on the ground**.
- **Moon jump:** Change the jump speed and the gravity. What does ay 100 feel like? And ay 600? Pick the pair you like best.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-gravity/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A jump belongs in an if: the press only counts when the player is standing on the floor. Hints, in order: Drag an if into the on A pressed block, around set vy. / The question: player bottom ≥ 100 (from Logic, with bottom from Sprites). / Make the jump weaker or stronger: a smaller or bigger negative vy. / Then change ay: try 100 for the Moon, 600 for a heavy planet. For students who need more support: Give students the jumper (floor and jump done) as their Make starter, so they add only the rocks and the lives. For early finishers: Make the rocks speed up: keep a speed variable that grows by 5 each time a rock is made. Or add a coin in the air that is only reachable with a jump. The hard part, on purpose: Gravity as acceleration, and a jump only from the ground. Ask what vy does over a few frames, and where the player must be to jump. When students get stuck: The player falls through the bottom of the screen. Ask: What happens when the player's bottom goes past 100? Fix: Add the floor if in on game update: set bottom to 100 and vy to 0. / The player can fly by pressing A again and again. Ask: Where must the player be for a jump to make sense? Fix: Put an if around set vy in the A event: only when bottom ≥ 100. / The jump does nothing, or the player sinks. Ask: Is vy set to a negative or a positive number? Fix: A jump is up, and up is negative: vy = -150. / The rocks float in mid-air, or pass under the player. Ask: What y do the rocks start at? Fix: Near the floor: about 98, so they sit on y 100. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a **runner**. The player stays on the left; the world comes to them:

- the player has **gravity** and stands on a **floor** at y 100,
- **A** jumps, but only from the ground,
- a **rock** slides in from the right every 1.5 seconds,
- a hit costs a **life** (three lives, then game over).

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-gravity/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: Gravity, a floor in on game update and a jump from the ground: the same blocks as your fixed jumper. / A timer (on game update every 1500 ms) makes a rock at x 160 near the floor, with a negative vx so it slides left. / A Player–Enemy overlap: destroy the rock and change life by -1. -->

<!-- Speaker note: Teacher: the player does not move left and right; the rocks come to the player. Rocks need a y near 98 so they sit on the floor. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a trampoline

This acrobat never stops bouncing: the floor sets vy to **-180** instead of 0. Make the bounces higher, then make the trampoline a little higher up the screen (both numbers in the if must change).

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-gravity/?full=step-6#step-6)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does a jump need an if that checks the player is on the ground?**

* A jump only sets vy upwards. Without the check, every press of A jumps again, even in mid-air, so the player can fly.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: levels, so the runner can get harder. Real Arcade platformers use tilemaps (walls drawn in the tile editor) and a camera that follows the player; point keen students to the tilemap tutorials on the Arcade home page. Class ideas: test gravity values for different planets; time a jump in the simulator. -->
