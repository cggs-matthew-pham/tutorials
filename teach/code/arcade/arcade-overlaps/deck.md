---
marp: true
theme: default
html: true
---

# Overlaps and kinds

MakeCode Arcade · Collide and score

<!-- Speaker note: Students make overlap events that run when two sprites touch, and see that the kinds named in the event decide which event runs. About 45 minutes (Predict and Run 8 min · Investigate 12 min · Modify 10 min · Make 10 min · Fruit stall 5 min). -->

---

## Today

**We are learning to** make something happen when two sprites touch, and use kinds to decide which event runs.

- I can make something happen when two sprites touch.
- I can choose a sprite's kind, and say which overlap event a touch will run.
- I can keep score and move a sprite to a random place.

<!-- Speaker note: Before class: An **overlap** is two sprites touching. **on sprite of kind Player overlaps otherSprite of kind Food** (Sprites › Overlaps) is an **event**: it runs when a sprite of the **first kind** touches a sprite of the **second kind**, and never for any other pair. Inside it, **sprite** is the first one (the player) and **otherSprite** the second (the coin that was touched). Every sprite has a **kind**: Player, Food, Enemy or Projectile. The create block starts with **of kind Player**, so a forgotten kind is the most common bug: a coin made as a Player is never collected. **change score by** (Info) shows a score at the top of the screen. **pick random** (Math) gives a new random whole number each time it runs. Try the Make task yourself: two sprites, two overlap events. Teacher: Fruit stall: a missed banana falls off the screen and never returns; that is fixed with an if in the Decide unit. -->

---

## Why it matters

> Pac-Man eats a dot, Mario grabs a coin, a ghost catches you: every game is full of things touching, and each touch means something different.

<!-- Speaker note: Last lesson sprites moved, but flew straight through each other. Now they notice. When two sprites touch, they **overlap**, and an **on overlap** event can run. Every sprite has a **kind**: Player, Food, Enemy or Projectile. Until now every sprite said **of kind Player**. This lesson the kind matters: it is how the game tells a coin from a monster. Click the simulator, then steer with the arrow keys. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:308](https://tutorials.learningwaypoints.com/_pictures/makecode/code/80326e2ba7d3.png?v=b398dc39e1cea138)

**You steer the player onto the coin. What happens?**

- Nothing: they pass through each other
- The coin vanishes and the score goes up by 1
- The player stops at the coin, like a wall
- The player vanishes

<!-- Speaker note: What happens: The coin vanishes and a score of 1 appears at the top of the screen. The player is of kind Player and the coin of kind Food, so the Player–Food overlap event runs. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students expect the coin to vanish. The real point is why: ask which two kinds the event names. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The coin vanishes and a score of 1 appears at the top of the screen. The player is of kind Player and the coin of kind Food, so the Player–Food overlap event runs.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/arcade/arcade-overlaps/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/arcade/arcade-overlaps/?full=step-2#step-2)

<!-- Speaker note: Steer onto the coin. Watch the top of the screen. Students should be able to say: I steered onto the coin and compared what happened with my prediction. -->

<!-- Speaker note: Teacher: once the coin is gone, nothing is left to do. That sets up the Modify task. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/831d0c889e60.png?v=bb5b112731c01cf8)

<!-- Speaker note: Collect the coin a few times, then touch the spike. What this step is for: An overlap event runs when a sprite of the first kind touches a sprite of the second kind. The kinds decide which event runs: sprite is the first one, otherSprite the second. -->

<!-- Speaker note: Teacher: the match shows that a pair no event names (Food and Enemy) does nothing. Ava's star is the default kind left as Player. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Who touches whom?

**Match what touches with what happens in this game.**

| | |
|---|---|
| `the player touches the coin (Food)` | A. nothing: no event names Food and Enemy |
| `the player touches the spike (Enemy)` | B. the score goes down 1 and the spike is destroyed |
| `the coin and the spike touch` | C. the score goes up 1 and the coin jumps to a random place |

* Answer: the player touches the coin (Food) → C. the score goes up 1 and the coin jumps to a random place; the player touches the spike (Enemy) → B. the score goes down 1 and the spike is destroyed; the coin and the spike touch → A. nothing: no event names Food and Enemy

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which sprite?

**In the Player–Food event, which sprite is otherSprite?**

- The coin it touched
- Every Food sprite in the game
- The player
- The spike

* Answer: The coin it touched

<!-- Speaker note: The event hands over both sprites: sprite is the one of the first kind (Player), otherSprite the one of the second kind (Food). So setting otherSprite's position moves the coin that was touched. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Ava's star

Ava's overlap event is the same as this game's. She made her star like this:

![h:146](https://tutorials.learningwaypoints.com/_pictures/makecode/code/97c7643a8b43.png?v=767b7c370bc6069e)

**Ava added a star to her game and steers onto it. Nothing happens: no score, the star stays. Why?**

- Stars cannot be destroyed
- The star was made of kind Player, so no Player–Food event runs
- The overlap event needs to be inside on start
- The score only counts coins

* Answer: The star was made of kind Player, so no Player–Food event runs

<!-- Speaker note: The create block starts with of kind Player, and Ava did not change it. Her overlap event is for Player touching Food, so a Player touching a Player runs nothing. Choose Food in the star's kind dropdown. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **A coin that comes back:** At the moment the game ends after one coin. Make the coin jump to a **random** spot each time it is collected.
- **Worth more:** Make each coin worth **5** points.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-overlaps/?full=step-4#step-4)

<!-- Speaker note: What this step is for: The blocks inside an overlap event decide what a touch means. randint picks a new random number each time it runs. Hints, in order: Take destroy out of the overlap event. / Put set otherSprite position in its place. From Math, drag pick random 0 to 10 into x and into y. / x between 10 and 150, y between 10 and 110 keeps the coin on the screen. / Change the 1 in change score by 1. For students who need more support: Give students the Food and Enemy sprites already made with the right kinds, and ask them to build only the two overlap events. For early finishers: Add a second kind of good food worth 3 points, and make the bad item jump to a random place instead of being destroyed. The hard part, on purpose: Kinds decide which overlap runs, and sprite versus otherSprite. When a touch does nothing, ask them to read out the kinds of both sprites and the kinds the event names. When students get stuck: Touching the coin does nothing. Ask: What kind is the coin, and what kinds does the overlap event name? Fix: Make the coin of kind Food (the dropdown in its create block), to match Player–Food in the event. / The wrong sprite disappears (the player instead of the coin). Ask: Which sprite does destroy name: sprite or otherSprite? Fix: otherSprite is the one of the second kind (Food). Drag otherSprite into destroy. / The score jumps up by many points in one touch. Ask: What happens to the coin after the touch? Fix: If it stays where it is, the event runs again every frame. Destroy it or move it away (lesson 4 looks at this). / The coin jumps off the screen. Ask: What range did you give pick random? Fix: Use x from 10 to 150 and y from 10 to 110. -->

<!-- Speaker note: Teacher: moving the coin to a random spot (instead of destroying it) turns one touch into a game. Point out pick random runs again each time. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a **collector** game:

- **good food** (an apple, a gem): touching it scores **1**, and it jumps to a **random** place
- a **bad item** of kind **Enemy** (a worm, a bomb): touching it takes **1** away, and it is destroyed

Check every create block: is its kind right?

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-overlaps/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: Two new sprites: one of kind Food, one of kind Enemy. Click the kind in each create block. / Two on overlap blocks (Sprites › Overlaps): Player with Food, and Player with Enemy. / Food: change score by 1, then set otherSprite position to pick random numbers. Enemy: change score by -1, then destroy otherSprite. -->

<!-- Speaker note: Teacher: check every create block's kind before testing. Two overlap events, one per kind. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a fruit stall game

Bananas fall into a basket at a market stall. Make them fall faster, then add a rotten tomato of kind **Enemy** that falls too and takes 2 points when caught.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-overlaps/?full=step-6#step-6)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A coin is made of kind Player. The game has a Player–Food overlap event. Will touching the coin score? Why?**

* No. The event only runs when a Player touches a Food sprite. The coin is a Player, so no event runs. Change its kind to Food.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson adds lives, timers and a game that ends. Class ideas: a recycling sorter (paper is Food, plastic is Enemy); a healthy-eating collector; design a game where the kinds are swapped: what changes? -->
