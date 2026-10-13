---
title: Gravity and jumping in 5 minutes
---
## The idea in plain words

**Gravity** is one more number on a sprite. **vx** and **vy** (velocity) are how far the engine moves it every frame; **ay** (acceleration) is how much the engine changes vy. With ay 300, vy grows by 300 every second, so a sprite falls **faster and faster**. A **jump** is a speed upwards: a **negative vy**, because y counts down the screen. Gravity slows the jump, stops it and brings the sprite back.

An empty Arcade screen has no ground, so a falling sprite drops out of sight. Students build a **floor** with an if in **on game update**: if the player's **bottom** (the y of its lowest edge) is below 100, put it back at 100 and set vy to 0. A jump should only happen from that floor, so the jump goes inside *if bottom ≥ 100*.

## Why programmers use them

Gravity and a floor are the heart of platformers and runners.

## An everyday picture, and where it breaks

Gravity is a ball thrown up in the playground: it slows, stops at the top and comes back faster.

Where it breaks: a real ball lands on the real ground. In Arcade nothing is solid until you say so, either with your own if or with **tilemap** walls.

## Engine note: tilemaps

Real Arcade platformers use a **tilemap**: a world drawn from squares (tiles) in the tile editor. Wall tiles stop sprites by themselves (a floor without an if), and the **camera** can follow the player through a world bigger than the screen. This is why platformers suit Arcade so well. The course builds the floor by hand first so that a wall makes sense: it is the same if, done by the engine. Tilemaps live in a project's assets rather than in its code, so the lessons leave them for later.

## Try it yourself (5 minutes)

1. In the Gravity lesson, run the falling ball and watch it speed up.
2. In Jump from the ground, press A again and again: the player flies. Then load the fixed version and try again.

## Questions students ask

- **"Why does my player fall through the floor?"** There is no floor yet. Add the if in on game update.
- **"Why can I fly?"** Every press of A jumps, even in the air. Only jump when the bottom is on the floor.
- **"Why is a jump negative?"** y counts down the screen, so up is negative.

## How it connects

Next unit adds levels to the runner. Will it work in Arcade? puts platformers near the top of the games Arcade suits, because of gravity and tilemaps. Skillmaps: Jungle Jump Platformer and Monster Truck Racer.
