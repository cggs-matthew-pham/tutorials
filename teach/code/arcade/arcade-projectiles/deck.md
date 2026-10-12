---
marp: true
theme: default
html: true
---

# Projectiles and lists

MakeCode Arcade · Collections and tools

<!-- Speaker note: Students fire projectiles with A, find that a projectile is its own kind, and use a list of every enemy with a for element loop to build a smart bomb. About 50 minutes (Predict and Run 8 min · Investigate 15 min · Modify 12 min · Make 10 min · Fireworks 5 min). -->

---

## Today

**We are learning to** fire projectiles with the A button, then use a list of every sprite of a kind to do something to all of them at once.

- I can fire a projectile from a sprite with the A button.
- I can explain why a hit needs a Projectile–Enemy overlap, not Player–Enemy.
- I can use array of sprites of kind and a for element loop to do something to every sprite of a kind.

<!-- Speaker note: Before class: A **projectile** is a sprite fired from another sprite, with a speed across (vx) and down (vy); vy -100 goes straight up. It is a sprite of its **own kind**, **Projectile**, not part of the ship. So a hit needs an overlap event between **Projectile** and **Enemy**. Students often pick Player, because "the player shoots": that is the planted misconception (Ben's shots pass straight through). In an overlap event, **sprite** is the sprite of the first kind (the shot) and **otherSprite** the second (the alien). A **list** (an **array** in MakeCode) is many values in order under one name. **array of sprites of kind Enemy** is a list of every enemy in the game right now. A **for element** loop (MakeCode calls it "for element value of list") runs its blocks once for each item, with **value** standing for that item each time. That is how one button press can reach sprites that have no names. The keyboard: A is space (or Z), B is enter (or X). Try the smart bomb yourself first. Teacher: Fireworks: B already uses a list of Projectiles. Changing the background goes inside on B pressed, not inside the loop (or it changes once per rocket, which is also fine). -->

---

## Why it matters

> Space Invaders, Galaga and every 'shoot 'em up' since: you fire, and the game has to keep track of every shot and every alien on the screen at once.

<!-- Speaker note: So far each sprite had its own name: `ship`, `cat`, `car`. A game with shots flying everywhere cannot name them all. Arcade gives you two tools for that. 1. A **projectile** (in **Sprites**) is a sprite fired from another sprite. It is its **own kind**: **Projectile**. The engine removes it when it leaves the screen. 2. **array of sprites of kind** (in **Sprites**) gives you a **list**: every sprite of that kind in the game right now. A **for element** loop (in **Loops**) then does something to **each one**. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/01f0f80665ac.png?v=ecb699160bda9997)

**You press A (space on the keyboard) once, with the ship right under the alien. What happens?**

- Only the alien disappears
- The shot goes through the alien
- The shot and the alien both disappear, and the score goes up by 1
- The ship disappears

<!-- Speaker note: What happens: The shot and the alien both disappear, and the score goes up by 1. The shot is a Projectile, the alien an Enemy, so the Projectile–Enemy overlap runs: sprite is the shot, otherSprite the alien. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most get this right. Ask: which kind is the shot? (Projectile.) -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The shot and the alien both disappear, and the score goes up by 1. The shot is a Projectile, the alien an Enemy, so the Projectile–Enemy overlap runs: sprite is the shot, otherSprite the alien.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/arcade/arcade-projectiles/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/arcade/arcade-projectiles/?full=step-2#step-2)

<!-- Speaker note: Press the **A** button (space on the keyboard). Then move the ship to one side and fire again: where does the shot go? Students should be able to say: I fired at the alien and compared what happened with my prediction. -->

<!-- Speaker note: Teacher: shots go straight up wherever the ship is: the projectile starts at the ship's position. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/ec0b8ec8c734.png?v=4c1018ab2e9791d0)

<!-- Speaker note: What this step is for: A projectile is its own kind (Projectile), so the overlap that catches a hit names Projectile, not Player. array of sprites of kind gives a list of every sprite of a kind, and a for element loop runs its blocks once for each one. -->

<!-- Speaker note: Teacher: the match reads the whole game. Freeze: press B with a few aliens and count; the loop runs once per alien. Ben's shots: read the kinds aloud. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What does each part do?

**Match each part of this game with what it does.**

| | |
|---|---|
| `projectile from ship with vx 0, vy -100` | A. runs when any shot touches any alien |
| `on game update every 1000 ms` | B. makes a new alien each second |
| `on Projectile overlaps Enemy` | C. the alien that was hit |
| `sprite (in the overlap)` | D. the shot that hit |
| `otherSprite (in the overlap)` | E. fires a shot straight up from the ship |

* Answer: projectile from ship with vx 0, vy -100 → E. fires a shot straight up from the ship; on game update every 1000 ms → B. makes a new alien each second; on Projectile overlaps Enemy → A. runs when any shot touches any alien; sprite (in the overlap) → D. the shot that hit; otherSprite (in the overlap) → C. the alien that was hit

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Freeze them all

**In this version, B freezes every alien: for each value in array of sprites of kind Enemy, set value vy to 0. There are 6 aliens on the screen when you press B. How many times does set value vy to 0 run?**

* Answer: 6

<!-- Speaker note: array of sprites of kind Enemy is a list of all 6 aliens. The for element loop runs its blocks once for each item in the list, with value as that alien: 6 times. Press B in the playground to see them all stop. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Ben's shots

Ben's hit event:

![h:232](https://tutorials.learningwaypoints.com/_pictures/makecode/code/5133dae914b2.png?v=405c63bd4ba12d99)

**Ben wrote his own hit event (below). He fires at the aliens, but every shot passes straight through. Why?**

- The overlap needs to be inside on A pressed
- A projectile is its own kind, Projectile, so a Player–Enemy overlap never notices a shot
- destroy only works on the player
- The shot is too fast to hit anything

* Answer: A projectile is its own kind, Projectile, so a Player–Enemy overlap never notices a shot

<!-- Speaker note: The shot is made by the ship, but it is not the ship: it is a sprite of kind Projectile. Ben's event waits for a Player to touch an Enemy, which only happens if the ship itself crashes into an alien. The first kind should be Projectile. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Make the shots work:** The shots in this game pass through everything. Add the overlap that turns a shot into a hit.
- **Crash!:** Now the aliens can reach the ship without anything happening. Make a crash cost a life.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-projectiles/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each pair of kinds has its own overlap event: Projectile–Enemy is a hit, Player–Enemy is a crash. Hints, in order: on overlap is in Sprites › Overlaps. Choose the kinds Projectile and Enemy. / Inside: destroy sprite, destroy otherSprite, change score by 1. / Add a second on overlap, with the kinds Player and Enemy. / Destroy the alien (otherSprite), and change life by -1. For students who need more support: Give students the on B pressed block with an empty for element loop already in it, and ask them only to choose the list and fill the loop. For early finishers: Give the smart bomb a limit: a bombs variable that starts at 3, goes down by 1 each press, and the bomb only works if bombs > 0. The hard part, on purpose: The overlap must name Projectile, and score changes belong inside the loop. Ask which two kinds touch when a shot hits. When students get stuck: Shots pass straight through the aliens. Ask: Which two kinds does your overlap event name? Fix: The shot is a Projectile. Change the first kind to Projectile. / The smart bomb only scores 1, however many aliens there were. Ask: Is change score inside the loop, or after it? Fix: Inside the loop it runs once per alien. Drag it inside, under destroy value. / The ship disappears when it shoots. Ask: In the overlap event, which sprite is destroyed? Fix: The event is probably Player–Enemy and destroys sprite (the ship). Use Projectile–Enemy. -->

<!-- Speaker note: Teacher: the first task is the hit event from the Predict; the second is a separate Player–Enemy event. Two pairs of kinds, two events. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

The aliens come twice as fast now. Make a **smart bomb** on the **B** button (enter on the keyboard):

- every alien on the screen is destroyed,
- you score **one point for each** alien.

Count the aliens before you press B, and check the score goes up by that many.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-projectiles/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: Start with on B pressed (in Controller). Inside it, a for element loop from Loops. / Drag array of sprites of kind (Sprites) into the loop's list slot, and choose Enemy. / Inside the loop: destroy value, and change score by 1. -->

<!-- Speaker note: Teacher: the loop goes inside on B pressed, and destroy and change score go inside the loop, so they happen once per alien. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a firework show

**A** launches a rocket; **B** makes every rocket in the sky burst off in a random direction. Make the rockets launch faster, and make **B** also change the background colour, so the sky flashes when they burst.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-projectiles/?full=step-6#step-6)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**There are 5 enemies on the screen. A for element loop over array of sprites of kind Enemy contains change score by 1. How much does the score go up?**

* By 5. The list has 5 enemies, and the loop runs its blocks once for each one.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: functions, which name a job such as 'make an enemy' so it can be used in many places. Class ideas: a two-way shooter (shots left and right with a second button); a 'tidy up' button that removes every Food sprite; a game where B makes every enemy chase the player with follow. -->
