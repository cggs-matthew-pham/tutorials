---
title: Building a game in 5 minutes
---
## The idea in plain words

The challenge grows the shield game from the Power-ups unit into a **prize box**: a star gives a shield (true or false, counted down), a blaster with limited **ammo**, a **smart bomb** (every sprite of a kind) or a power-up each student designs. It is built in **three milestones** with less help each time: most of the code, then an outline, then goals only. Nothing is new.

**Will it work in Arcade?** then asks which games the engine is built for, ending in a pitch card and a prototype. **Power-ups** and **Will it work in Arcade?** mark the course **Challenge complete**. The optional **Your own game** turns the pitch card into a finished game, with goals only.

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

1. In Power-ups, catch two stars close together: the second resets the shield to 5 seconds.
2. Set prize to 1 while testing, so every star gives the blaster, and fire until the ammo runs out.

## Questions students ask

- **"Why does the bomb destroy only one rock?"** The destroy is outside the for element loop.
- **"Why does my shield never switch off?"** The countdown is in on start, or the if for 0 is outside the timer.
- **"Why does A not fire?"** ammo starts at 0. A star with the blaster prize sets it.

## Which games suit Arcade? (for teachers)

Will it work in Arcade? and Your own game ask students to judge their ideas against this table. The engine facts were written from knowledge of Arcade; spot-check them in the editor.

| | Game types | Why |
|---|---|---|
| **Built for it** | catch and collect, dodge, top-down shooters, endless runners, single-screen sports (pong, keepy-uppy), mazes and top-down adventures, side-scrolling platformers, two to four players on one keyboard | every part is a built-in block: sprites and kinds, the controller, velocity and gravity, overlap events, score, lives, countdown, and tilemaps with walls and a scrolling camera |
| **Possible, with work** | quizzes and stories (the screen is small), card and board games (no mouse: move a cursor with the controller), RPGs with inventories and dialogue, turning cars or ships (sprites do not rotate: draw a picture for each direction), sprites bouncing off each other (you code the maths), saving progress beyond the high score | no block does it, so you build it from the building blocks or add an extension |
| **Not a good fit** | 3D or first person, realistic physics (stacking, tumbling, Angry Birds), detailed high-resolution art, hundreds of moving sprites, typing-heavy games, real-world data, online play inside our lessons | the screen is 160 × 120 in 16 colours, overlaps are events rather than pushes, there is no physics engine or 3D, and MakeCode's own online multiplayer (a join code for 2 to 4 players) needs MakeCode's sharing, which is switched off in our embedded editor |

## How it connects

This ends Arcade advanced skills. Next steps are Arcade's real tools: **tilemaps** (walls, floors and a camera that scrolls through a bigger world), **animation** and **extensions**, led by the teacher, or practised in Microsoft's skillmaps (arcade.makecode.com/skillmaps): Jungle Jump and Monster Truck Racer for platforms, Save the Galaxy for shooters, and the Game Maker Guide for students making their own. The same ideas (events, state, decisions, lists, functions) carry into games in text code later.
