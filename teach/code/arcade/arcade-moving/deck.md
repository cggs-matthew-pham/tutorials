---
marp: true
theme: default
html: true
---

# Move with the controller

Arcade Foundations · Sprites and movement

<!-- Speaker note: Students hand a sprite to the arrow keys with move with buttons, and see that its two numbers are speeds across and down, not a place. About 40 minutes (Predict and Run 7 min · Investigate 10 min · Modify 10 min · Make 8 min · Goalkeeper 5 min). -->

---

## Today

**We are learning to** hand a sprite to the arrow keys with move with buttons, and choose how fast it goes across and down.

- I can let the player steer a sprite with the arrow keys.
- I can choose which way a sprite can move, and how fast.
- I can keep a sprite on the screen.

<!-- Speaker note: Before class: **move with buttons** (Controller) hands a sprite to the arrow keys: it moves while a key is held. Its two numbers (click + to show them) are the **speeds** across and up and down, in pixels per second; 0 stops movement that way. They are not a position. **on A button pressed** is an event: it runs each time A (space or Z) is pressed. Students must click the simulator before it hears keys. -->

---

## Why it matters

> In every game you have played, a button press becomes movement on the screen. One block makes that link.

<!-- Speaker note: Last lesson every sprite stood still. Now the player steers one. **move with buttons** (in **Controller**) hands a sprite to the arrow keys (or W, A, S, D). Click the **+** on the block to show its two numbers: the **speed across** and the **speed up and down**, in pixels per second. Click the simulator first, so it hears the keyboard. The **A** button is space (or Z) on the keyboard. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:290](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/4f242e5e1b78.png?v=2927c184021fc1c1)

**The plane has move with buttons with speeds 100 and 0. You hold the up arrow. What happens?**

- The plane flies up
- Nothing: the plane can only move left and right
- The plane flies up and to the right
- The plane jumps to x 100, y 0

<!-- Speaker note: What happens: Nothing. The second number is the speed up and down, and it is 0, so up and down do nothing. The numbers are speeds, not a place. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: some students read the numbers as a place (100, 0). Ask what happens while a key is held. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Nothing. The second number is the speed up and down, and it is 0, so up and down do nothing. The numbers are speeds, not a place.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/arcade/arcade-moving/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/arcade/arcade-moving/?full=step-2#step-2)

<!-- Speaker note: Click the game screen, then press each arrow key. Students should be able to say: I pressed all four arrow keys and compared what happened with my prediction. -->

<!-- Speaker note: Teacher: all four arrows. Up and down do nothing. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/6c50e64bc9bd.png?v=ac929fc8a2742d5a)

<!-- Speaker note: Fly the plane with the arrow keys. Press **A** (space) and see what that event does. What this step is for: move with buttons links the arrow keys to one sprite, and its two numbers are its speeds across and down: a speed of 0 means it cannot move that way. -->

<!-- Speaker note: Teacher: Kim's cloud shows that the block steers only the sprite it names. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What does it do?

**Match each block with what it does to a sprite.**

| | |
|---|---|
| `move with buttons` | A. stops it at the edge of the screen |
| `set stay in screen` | B. runs its blocks each time A is pressed |
| `set position` | C. puts it at one place, once |
| `on A button pressed` | D. lets the arrow keys steer it, while a key is held |

* Answer: move with buttons → D. lets the arrow keys steer it, while a key is held; set stay in screen → A. stops it at the edge of the screen; set position → C. puts it at one place, once; on A button pressed → B. runs its blocks each time A is pressed

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 18px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which way is faster?

**A sprite has move with buttons with speeds 50 and 100. Which way does it move faster?**

- Left and right
- Up and down
- The same both ways
- Neither: it jumps to (50, 100)

* Answer: Up and down

<!-- Speaker note: The first number (50) is the speed across, the second (100) the speed up and down. 100 is faster. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Kim's cloud

**Kim's arrow keys move the cloud, not her plane. What did she do?**

- The plane needs a velocity
- Her move with buttons block names the cloud
- The cloud was made first
- The plane is the wrong kind

* Answer: Her move with buttons block names the cloud

<!-- Speaker note: move with buttons steers only the sprite it names. Click the sprite's name in the block and choose plane. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Remote control <span style="font-size:.6em;color:#64748b">(4 min)</span>

One student is the sprite. The class holds up cards: across speed and up-down speed. The 'remote' presses arrows; the sprite moves only the ways its speeds allow.

<!-- Speaker note: A speed card of 0 means that direction is locked. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Only across:** Make the plane fly left and right only, like a ship along the bottom of the screen.
- **Dash:** Add an event: each press of **A** dashes the plane 30 pixels to the right. Press it a few times.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/arcade/arcade-moving/?full=step-4#step-4)

<!-- Speaker note: What this step is for: The two numbers set which way the player can move, and how fast. A position change in an event moves a sprite once per press. Hints, in order: Click the + on the move plane with buttons block to show two speeds. / The second number is the speed up and down. 0 means no up and down at all. / Drag in on A button pressed from Controller. / From Sprites, drag change plane x by inside it, and make it 30. For students who need more support: Give students the ship with move with buttons already in, and ask them only to set the two speeds and keep it on the screen. For early finishers: Make A dash right and B dash left, and make the ship faster across than the plane was. The hard part, on purpose: Reading the two numbers as speeds, not a place. Ask what each number does while a key is held. When students get stuck: The arrow keys do nothing. Ask: Did you click the simulator? Is there a move with buttons block? Fix: Click once on the game screen so it hears the keyboard, and check move with buttons names the right sprite. / The sprite flies off the edge. Ask: What stops it at the edge? Fix: Add set stay in screen for that sprite. / The sprite moves up and down when it should not. Ask: Which number is the speed up and down? Fix: Click + on move with buttons; set the second number to 0. -->

<!-- Speaker note: Teacher: the dash changes x by 30: a position change, once per press. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a **ship** for a space game:

- it sits near the **bottom** of the screen
- the arrow keys move it **left and right only**
- it **cannot leave** the screen

[Open this step](https://studio.learningwaypoints.com/tutorials/code/arcade/arcade-moving/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: move with buttons is in Controller. Click + to show the two speeds. / Across only: the second speed is 0. set stay in screen is in Sprites. -->

<!-- Speaker note: Teacher: speeds 100 and 0, plus stay in screen. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a goalkeeper

This goalkeeper guards a goal on the left. Make it move **up and down only**, a bit slower, and keep it on the screen.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/arcade/arcade-moving/?full=step-6#step-6)

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Escape test <span style="font-size:.6em;color:#64748b">(3 min)</span>

Swap ships with the next pair. Can theirs leave the screen?

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**move with buttons has speeds 0 and 80. Which arrow keys do something?**

* Only up and down. The first number, the speed across, is 0.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: a speed the engine applies by itself, so a sprite keeps moving with nobody pressing anything. -->
