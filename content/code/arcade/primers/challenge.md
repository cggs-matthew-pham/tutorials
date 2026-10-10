---
title: Building a game in 5 minutes
---
## The idea in plain words

The challenge builds **Space dodger**: a ship moves up and down, rocks fly in from the right, a hit costs a life, and the score counts the seconds you survive. It uses every idea from the course, with only two new blocks:

- **auto destroy** (the **set flag** block in Sprites): a sprite is removed once it leaves the screen, so rocks that miss do not pile up.
- **high score** (in Info): the best score so far in this browser. The game over screen shows it by itself.

**Power-ups** adds a shield (a **true/false** variable that a 1-second timer switches off), a blaster with limited **ammo** (a number the A button checks first), and a power-up each student designs. Each lesson is built in **three milestones** with less help each time: most of the code, then an outline, then goals only.

**Space dodger**, **Power-ups** and **Will it work in Arcade?** mark the course **Challenge complete**. The optional **Your own game** turns the pitch card from lesson 13 into a finished game, with goals only.

## Game rule or engine?

Every Arcade game splits into two kinds of work:

- **The engine** (what Arcade does for you, the same in every game): moves sprites by their velocity every frame, notices when two kinds overlap, shows the score, lives and countdown, ends the game at zero lives or time, keeps the high score, removes auto-destroy sprites.
- **Game rules** (what your blocks decide, different in every game): what a touch means, when a rock appears and how fast, whether the shield is on, how many shots are left, when the player wins.

Naming the split helps students debug (a rule they wrote is where the bug is) and helps them judge which games suit Arcade: a game whose hard part the engine already does is quick to build.

## Why programmers use milestones

Real programs are combinations: state (variables), events, decisions, lists and named jobs working together. Building in milestones keeps a game playable at every stage, so each change can be tested by playing. Game studios work the same way: prototype, playtest, change one thing.

## An everyday picture, and where it breaks

A power-up is a "free entry" wristband at a fair: while you wear it, the ride rules change for you, and it comes off at closing time.

Where it breaks: the wristband only comes off if someone checks the time. In code, a check written in **on start** is asked once, before the game begins, so the shield never switches off. The countdown must sit in a timer.

## Try it yourself (5 minutes)

1. In Space dodger, play the Run step: every rock comes down the middle. One pick random block turns it into a game.
2. Take destroy out of the Player–Enemy overlap and touch one rock: all three lives go at once.
3. In Power-ups, catch a star in the Run step: the shield never ends. That is Milestone 1's job.

## Questions students ask

- **"Why did one rock take all my lives?"** The overlap runs every frame the sprites touch. Destroy the rock in the event.
- **"Why does my score race up?"** It is in **on game update** (every frame). Use **on game update every 1000 ms**.
- **"Why does my shield never switch off?"** The countdown is in on start, or the if for 0 is outside the timer.
- **"Why does A not fire?"** ammo starts at 0. A star with the blaster prize sets it.
- **"Where did my high score go?"** It is kept in this browser; another browser starts again at 0.

## Which games suit Arcade? (for teachers)

Lesson 13 and Your own game ask students to judge their ideas against this table. The engine facts were written from knowledge of Arcade; spot-check them in the editor.

| | Game types | Why |
|---|---|---|
| **Built for it** | catch and collect, dodge, top-down shooters, endless runners, single-screen sports (pong, keepy-uppy), mazes and top-down adventures, side-scrolling platformers, two to four players on one keyboard | every part is a built-in block: sprites and kinds, the controller, velocity and gravity, overlap events, score, lives, countdown, and tilemaps with walls and a scrolling camera |
| **Possible, with work** | quizzes and stories (the screen is small), card and board games (no mouse: move a cursor with the controller), RPGs with inventories and dialogue, turning cars or ships (sprites do not rotate: draw a picture for each direction), sprites bouncing off each other (you code the maths), saving progress beyond the high score | no block does it, so you build it from the building blocks or add an extension |
| **Not a good fit** | 3D or first person, realistic physics (stacking, tumbling, Angry Birds), detailed high-resolution art, hundreds of moving sprites, typing-heavy games, real-world data, online play inside our lessons | the screen is 160 × 120 in 16 colours, overlaps are events rather than pushes, there is no physics engine or 3D, and MakeCode's own online multiplayer (a join code for 2 to 4 players) needs MakeCode's sharing, which is switched off in our embedded editor |

## How it connects

This ends Arcade Foundations. Next steps are Arcade's real tools: **tilemaps** (walls, floors and a camera that scrolls through a bigger world), **animation** and **extensions**, led by the teacher. The same ideas (events, state, decisions, lists, functions) carry into games in text code later.
