---
title: Gravity and levels in 5 minutes
---
## The idea in plain words

**Gravity** is one more number on a sprite. **vx** and **vy** (velocity) are how far the engine moves it every frame; **ay** (acceleration) is how much the engine changes vy. With ay 300, vy grows by 300 every second, so a sprite falls **faster and faster**. A **jump** is a speed upwards: a **negative vy**, because y counts down the screen. Gravity slows the jump, stops it and brings the sprite back.

An empty Arcade screen has no ground, so a falling sprite drops out of sight. Students build a **floor** with an if in **on game update**: if the player's **bottom** (the y of its lowest edge) is below 100, put it back at 100 and set vy to 0. A jump should only happen from that floor, so the jump goes inside *if bottom ≥ 100*.

**Levels** are three ideas students already have: a **variable** `level` (starting at 0), a **list** of what changes per level (`speeds[level]`, places counted from 0), and a **function** `startLevel` that clears the old enemies, shows a **splash** and sets up the new level. The level goes up where the score changes, and after the last level the game ends with a win.

## Why programmers use them

Gravity and a floor are the heart of platformers and runners. Levels keep players playing: each one a little faster or busier, with a new look, while the program stays the same and only a list changes.

## An everyday picture, and where it breaks

Gravity is a ball thrown up in the playground: it slows, stops at the top and comes back faster. Levels are a swimming programme: the same lesson each week, but the card for your level says how far and how fast.

Where they break: a real ball lands on the real ground. In Arcade nothing is solid until you say so, either with your own if or with **tilemap** walls. And a game does not know you have already gone up a level: an if in on game update keeps asking every frame, so *if score ≥ 5* stays true and levels up again and again. Level up in the event where the score changes, or move the target up.

## Engine note: tilemaps

Real Arcade platformers use a **tilemap**: a world drawn from squares (tiles) in the tile editor. Wall tiles stop sprites by themselves (a floor without an if), and the **camera** can follow the player through a world bigger than the screen. This is why platformers suit Arcade so well. The course builds the floor by hand first so that a wall makes sense: it is the same if, done by the engine. Tilemaps live in a project's assets rather than in its code, so the lessons leave them for later.

## Try it yourself (5 minutes)

1. In the Gravity lesson, run the falling ball. Then load the jumper and jump with the A button (space on the keyboard).
2. Press A again in mid-air: nothing happens, because of the if. Remove the if and try again.
3. In the Levels lesson, collect 5 coins and watch the splash and the faster enemy.

## Questions students ask

- **"Why does my player fall through the floor?"** There is no floor yet. Add the if in on game update.
- **"Why can I fly?"** Every press of A jumps, even in the air. Only jump when the bottom is on the floor.
- **"Why is a jump negative?"** y counts down the screen, so up is negative.
- **"Why does the level shoot up?"** The level-up is in on game update, which runs every frame. Move it to where the score changes.
- **"Why does it say Level 0?"** Lists count from 0; show level + 1 to players.

## How it connects

The final challenge, Space dodger, uses timers, lists and levels together, and the last lessons ask which games suit Arcade: platformers are near the top, because of gravity and tilemaps.
