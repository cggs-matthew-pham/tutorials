---
marp: true
theme: default
html: true
---

# Move with the controller

MakeCode Arcade · Sprites and movement

<!-- Speaker note: Students move sprites with the controller and with a velocity, and see that a velocity keeps a sprite moving every frame while a position moves it once. About 45 minutes (Predict and Run 8 min · Investigate 12 min · Modify 10 min · Make 10 min · Conveyor belt 5 min). -->

---

## Today

**We are learning to** fly a sprite with the arrow keys, and set a speed so the engine keeps another sprite moving by itself.

- I can let the player steer a sprite with the arrow keys and keep it on the screen.
- I can give a sprite a velocity so it moves by itself, and make it bounce off the walls.
- I can explain the difference between setting a position and setting a velocity.

<!-- Speaker note: Before class: A **position** (x, y) is where a sprite is **now**. Setting it moves the sprite once. A **velocity** (vx across, vy down) is a **speed in pixels per second**: the game engine moves the sprite a little every **frame** (each redraw of the screen, about 30 a second), and keeps doing it until something changes the velocity. So *set velocity to 50, 0* does not mean "move 50 pixels"; it means "keep moving right at 50 pixels a second", off the edge if nothing stops it. **move with buttons** (Controller) hands a sprite to the arrow keys; its optional two numbers are the speeds across and down. **on A button pressed** is an **event** block: it runs its blocks each time A is pressed (space or Z on the keyboard). Students must click the simulator before it hears keys. Try the Make task yourself: about six blocks. Teacher: Conveyor belt: twice as fast means doubling vx. Stopping the belt sets each vx to 0 inside the A event. -->

---

## Why it matters

> A car in a racing game, a cloud drifting past, a ball in pong: none of them is pushed by hand every frame. The game is told a speed, and keeps them moving.

<!-- Speaker note: Last lesson every sprite stood still. Now they move, in two ways: - **with the controller**: the player steers with the arrow keys (or W, A, S, D). - **with a speed**, called a **velocity**: the game engine moves the sprite by itself, a little every frame. A **frame** is one redraw of the screen, about 30 times a second. Click the simulator first, so it hears the keyboard. The **A** button is space (or Z) on the keyboard. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:290](https://tutorials.learningwaypoints.com/_pictures/makecode/code/bd0877dbbd08.png?v=e8da5d5192867461)

**The ball's velocity is set to 50 across and 0 down. What does the ball do?**

- Keeps moving right, off the edge of the screen
- Moves 50 pixels right, then stops
- Moves 50 pixels down, then stops
- Jumps to x 50 and stays there

<!-- Speaker note: What happens: It keeps moving right and leaves the screen. A velocity is a speed (50 pixels every second), not a distance, so the engine keeps moving the ball until something changes the speed. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students choose 'moves 50 pixels and stops'. Let them commit; the ball sailing off the screen is the lesson's surprise. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It keeps moving right and leaves the screen. A velocity is a speed (50 pixels every second), not a distance, so the engine keeps moving the ball until something changes the speed.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/arcade/arcade-moving/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/arcade/arcade-moving/?full=step-2#step-2)

<!-- Speaker note: Watch the ball. Press the restart button under the simulator to see it again. Students should be able to say: I watched the ball and compared it with my prediction. -->

<!-- Speaker note: Teacher: ask 'what would make it stop?' Nothing in the program changes the speed, so nothing does. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/5e174b468b2a.png?v=1c2386ad8e93f18c)

<!-- Speaker note: Fly the plane with the arrow keys. Press **A** (space) and see what that event does. Watch the cloud. What this step is for: A position is where a sprite is now; setting it moves the sprite once. A velocity is a speed in pixels per second: the engine moves the sprite a little every frame, so it keeps moving until something changes the velocity. -->

<!-- Speaker note: Teacher: the number task connects speed and distance (pixels per second). Leo's rocket is the same idea as the Predict, inside an event. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What does it do?

**Match each block with what it does to a sprite.**

| | |
|---|---|
| `set position` | A. lets the arrow keys steer it |
| `set velocity` | B. keeps it moving by itself, a little every frame |
| `move with buttons` | C. turns it back when it hits an edge |
| `set stay in screen` | D. stops it at the edge of the screen |
| `set bounce on wall` | E. puts it at one place, once |

* Answer: set position → E. puts it at one place, once; set velocity → B. keeps it moving by itself, a little every frame; move with buttons → A. lets the arrow keys steer it; set stay in screen → D. stops it at the edge of the screen; set bounce on wall → C. turns it back when it hits an edge

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## How far?

**The cloud starts at x 80 with a velocity of 30 across. After 2 seconds, how many pixels has it moved?**

* Answer: 60

<!-- Speaker note: A velocity of 30 means 30 pixels every second. In 2 seconds the engine moves it 30 + 30 = 60 pixels, a tiny step each frame. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Leo's rocket

Leo's rocket is not moved by the controller. He added this event:

![h:128](https://tutorials.learningwaypoints.com/_pictures/makecode/code/6a4a28478c56.png?v=9b920872bb173760)

**Leo wants A to make his rocket hop 30 pixels to the right. He presses A once. What happens?**

- Nothing: vx only works in on start
- The rocket hops 30 pixels and stops
- The rocket moves 30 pixels up
- The rocket keeps sliding right, off the edge of the screen

* Answer: The rocket keeps sliding right, off the edge of the screen

<!-- Speaker note: vx is a speed, not a distance. Setting it to 30 starts the rocket moving 30 pixels every second, and nothing ever sets it back to 0. A hop of 30 pixels changes the position: change x by 30. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Only across:** Make the plane fly left and right only, like a ship along the bottom of the screen.
- **Dash:** Add an event: each press of **A** dashes the plane 30 pixels to the right. Press it a few times. Does it stop after each dash?

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-moving/?full=step-4#step-4)

<!-- Speaker note: What this step is for: The two numbers in move with buttons are speeds across and down. Changing a position in an event moves a sprite once, each time the event happens. Hints, in order: Click the + on the move plane with buttons block to show two speeds. / The second number is the speed up and down. 0 means no up and down at all. / Drag in on A button pressed from Controller. / From Sprites, drag change plane x by inside it, and make it 30. For students who need more support: Give students the cloud sprite already made, and ask them to add only set velocity and set bounce on wall. For early finishers: Give the cloud a velocity that changes on A (faster) and B (stop), and add a second cloud drifting the other way. The hard part, on purpose: Position versus velocity: one sets where a sprite is, the other how it keeps moving. Ask which one the engine changes every frame. When students get stuck: The arrow keys do nothing. Ask: Did you click the simulator? Is there a move with buttons block? Fix: Click once on the game screen so it hears the keyboard, and check move with buttons names the right sprite. / The sprite flies off the screen and is gone. Ask: What stops it at the edge? Fix: Add set stay in screen (for the player) or set bounce on wall (for a drifting sprite). / A press of A sends the sprite sliding away for ever. Ask: Did you change its position or its velocity? Fix: For a hop, change x (position). Changing vx changes its speed, which lasts until something sets it again. / The cloud does not move at all. Ask: Which sprite does the set velocity block name? Fix: Choose the cloud in the block's dropdown; it may still name the plane. -->

<!-- Speaker note: Teacher: the dash uses change x by 30 (a position), the correct version of Leo's idea. Ask what would happen with change vx by 30 instead. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a **sky game**:

- the player flies the **plane** with the arrow keys
- the plane **cannot leave** the screen
- a **cloud** drifts by itself and **bounces** off the walls

Try to fly through the cloud. (Nothing happens yet: next lesson sprites notice when they touch.)

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-moving/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: Plane: move with buttons (Controller) and set stay in screen (Sprites). / Cloud: a new sprite with its own name, then set velocity and set bounce on wall (both in Sprites). / Give the cloud a velocity down as well as across, so it drifts at a slant and bounces off every wall. -->

<!-- Speaker note: Teacher: the cloud needs its own variable name. A velocity with both numbers non-zero makes a slanting drift that bounces off every wall. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a conveyor belt

This factory belt carries boxes to the right, and the worker moves along the floor. Make the belt run twice as fast, add a third box, then make **A** stop the belt by setting each box's vx to 0.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-moving/?full=step-6#step-6)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A sprite has vx set to 20. Will it move 20 pixels, or keep moving? Why?**

* It keeps moving. vx is a speed (20 pixels every second), and the engine moves the sprite every frame until something changes vx.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson sprites notice each other: an overlap event runs when the plane touches a cloud or a coin. Class ideas: a screensaver of bouncing logos; a 'slow lane, fast lane' scene of cars with different vx; measure a sprite's speed with a stopwatch. -->
