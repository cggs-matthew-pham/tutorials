---
marp: true
theme: default
html: true
---

# Gravity

Arcade advanced skills · Platforms

<!-- Speaker note: Students give a sprite gravity (acceleration down), see that a fall speeds up and a throw rises, slows and comes back, and use gravity in a catching game. About 40 minutes (Predict and Run 7 min · Investigate 12 min · Modify 6 min · Mix it up 3 min · Make 9 min · Trampoline 3 min). -->

---

## Today

**We are learning to** give a sprite gravity with ay, so it falls faster and faster, and a jump rises, slows and comes back down.

- I can give a sprite gravity with ay and explain why it falls faster and faster.
- I can make a sprite go up with a negative vy, and say what gravity does to it.
- I can read a floor built with an if in on game update.

<!-- Speaker note: Before class: **Velocity** (vx, vy) is how far the engine moves a sprite every frame. **Acceleration** (ay) is how much the engine changes the velocity: with ay 300, vy grows by 300 every second, a little each frame. So a sprite with ay falls **faster and faster**, like a dropped ball. A throw or jump is a speed upwards: **vy = -150** (negative, because y counts down). Gravity slows it, stops it at the top, and brings it back down. Nothing in an empty Arcade game is solid, so the lesson's program builds a **floor** with an if in **on game update**. Jumping only from the ground is next lesson. Tilemaps (wall tiles) do the floor for you in real platformers. Teacher: Mix it up: a parameter, from earlier. -->

---

## Why it matters

> Mario, Sonic and every runner game on a phone: you press jump, you rise, you slow down, you fall back. That curve is gravity.

<!-- Speaker note: You know **velocity**: vx and vy say how far the engine moves a sprite every frame. Arcade has a third number, **ay**: the **acceleration** down. Every frame, the engine adds a little to **vy**, so the sprite falls **faster and faster**. That is gravity. Set ay in **Sprites**: the same block as set vx, with **ay** chosen in its dropdown. A **jump** is just a speed **upwards**: a **negative vy** (y counts down, so up is negative). Gravity then slows the sprite, stops it, and pulls it back down. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:290](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/61b8f2b5bc6d.png?v=f3c810cb435ec575)

**The ball starts near the top with ay 300 and nothing else. What does it do?**

- Falls faster and faster, and drops off the bottom of the screen
- Falls at the same speed all the way
- Falls and stops at the bottom edge
- Stays where it is

<!-- Speaker note: What happens: It falls faster and faster and drops off the bottom of the screen. ay makes vy grow every frame, and nothing tells the ball where the ground is. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most expect a steady fall. Watch the ball closely: it speeds up. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Drop a ball <span style="font-size:.6em;color:#64748b">(3 min)</span>

Drop a ball from head height while everyone watches. Does it fall at a steady speed?

<!-- Speaker note: Drop a real ball: it speeds up. That is ay. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It falls faster and faster and drops off the bottom of the screen. ay makes vy grow every frame, and nothing tells the ball where the ground is.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/arcade-advanced/arcade-gravity/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/arcade-advanced/arcade-gravity/?full=step-2#step-2)

<!-- Speaker note: Watch the ball closely: does it fall at a steady speed? Press the restart button under the simulator to see it again. Students should be able to say: I watched the ball fall (restart to see it again) and compared with my prediction. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/93ebc449753a.png?v=5f3d400d27c42f57)

<!-- Speaker note: This ball has gravity and a floor. Press **A** (space) to throw it up. What this step is for: Gravity is acceleration: the engine adds ay to vy every second, a little each frame, so a fall speeds up and a jump (a negative vy) slows, stops and comes back. An if in on game update builds a floor. -->

<!-- Speaker note: Teacher: the trace shows vy growing by ay each second. The throw shows gravity turning a negative vy round. -->

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

## Top of the throw

**The ball is thrown up: vy is set to -150, with ay 300. How many seconds until it stops rising (vy is 0)?**

* Answer: 0.5

<!-- Speaker note: Gravity adds 300 every second, so after 0.5 seconds -150 has become 0: the top of the throw. Then vy is positive and it falls back down. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The floor

**What does the if in on game update do?**

- It makes the ball jump
- It runs once, at the start
- It turns gravity off
- It is a floor: when the ball's bottom goes past 100, it puts it back at 100 and stops it falling

* Answer: It is a floor: when the ball's bottom goes past 100, it puts it back at 100 and stops it falling

<!-- Speaker note: Every frame it asks whether the ball has sunk below y 100. If so, it puts the bottom back at 100 and sets vy to 0: the ball lands. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Throw and catch <span style="font-size:.6em;color:#64748b">(3 min)</span>

Throw a soft ball straight up and watch: fast, slower, stop, faster down.

<!-- Speaker note: That is vy = -150 with gravity adding to it every moment. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Higher:** Make **A** throw the ball higher.
- **Moon gravity:** Change **ay**. What does ay 100 feel like? And ay 600?

[Open this step](https://studio.learningwaypoints.com/tutorials/code/arcade-advanced/arcade-gravity/?full=step-4#step-4)

<!-- Speaker note: What this step is for: ay sets how strong gravity is, and the size of the negative vy sets how high a throw or jump goes. Hints, in order: In on A pressed, change -150 to -220. / Change ay: try 100 for the Moon, 600 for a heavy planet. / Pick the pair (throw and gravity) you like best. For students who need more support: Give students the timer that makes apples, and ask them only to add ay and the catch. For early finishers: Make some apples heavier (bigger ay) and worth more points. The hard part, on purpose: Gravity as acceleration, not a speed. Ask what vy is after one second, then after two. When students get stuck: The ball falls through the bottom of the screen. Ask: What happens when the ball's bottom goes past 100? Fix: The floor if in on game update puts it back. Check it names the ball. / The throw does nothing, or the ball sinks. Ask: Is vy set to a negative or a positive number? Fix: Up is negative: vy = -150. / Apples fall at a steady speed. Ask: Which block gives each apple gravity? Fix: Set apple ay inside the timer, after the apple is made. -->

<!-- Speaker note: Teacher: bigger negative vy is a higher throw; ay is how strong gravity is. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

![h:259](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/66009c30c307.png?v=46bb1255ddcc76a2)

<!-- Speaker note: What this step is for: A parameter is the value the call hands in; a negative vx moves left. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**spawnEnemy(speed) sets bug vx to speed. The timer calls spawnEnemy(-40). Which way does the bug fly?**

- It stays still
- Left
- Up
- Right

* Answer: Left

<!-- Speaker note: speed is -40, so vx is -40: a negative vx moves the bug left. What this step is for: A parameter is the value the call hands in; a negative vx moves left. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make an **apple drop**. The basket moves along the bottom:

- every second an **apple** falls from a random place at the top,
- each apple has **gravity**, so it speeds up as it falls,
- catching one **scores** a point.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/arcade-advanced/arcade-gravity/?full=step-6#step-6)

<!-- Speaker note: Hints, in order: A timer (on game update every 1000 ms) makes an apple of kind Food at the top, at a random x. / Give each apple gravity: set apple ay to 150, inside the timer. / A Player–Food overlap: destroy the apple and change score by 1. -->

<!-- Speaker note: Teacher: ay goes inside the timer, on each new apple. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a trampoline

This acrobat never stops bouncing: the floor sets vy to **-180** instead of 0. Make the bounces higher, then make the trampoline a little higher up the screen (both numbers in the if must change).

[Open this step](https://studio.learningwaypoints.com/tutorials/code/arcade-advanced/arcade-gravity/?full=step-7#step-7)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A sprite with ay 200 starts still. What is its vy after 2 seconds, and why is it not still 0?**

* 400. Gravity adds 200 to vy every second.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: a jump that only works from the ground. Skillmaps: Jungle Jump Platformer and Monster Truck Racer (arcade.makecode.com/skillmaps) practise gravity and jumping with tilemaps. -->
