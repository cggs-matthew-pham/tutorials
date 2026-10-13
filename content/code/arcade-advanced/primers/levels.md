---
title: Levels in 5 minutes
---
## The idea in plain words

A **level** is a variable that changes by 1. The level-up is an if in the event where the score changes: *if score ≥ goal*, change level by 1 and move **goal** up, so the next level is further away. A **splash** shows the level, joined to the word *Level* with **join** (Text).

What changes per level goes in a **list**: `speeds` is 40, 70, 100, and `speeds[level]` (**get value at**) is the speed for this level. Places are counted from **0**, so the level starts at 0 and the splash shows level + 1. A **function** `startLevel` clears the old enemies, splashes the level and sets up the new one. After the last level, the game ends with a win.

## Why programmers use them

Levels keep players playing: each one a little faster or busier, with a new look, while the program stays the same and only a list changes.

## An everyday picture, and where it breaks

Levels are a swimming programme: the same lesson each week, but the card for your level says how far and how fast.

Where it breaks: a swimmer moves up once. A game does not know it has already moved you up: an if in on game update keeps asking every frame, so *if score ≥ 5* stays true and levels up again and again. Level up in the event where the score changes, and move the goal up.

## Try it yourself (5 minutes)

1. In Level up, collect 5 coins and watch the splash and the second enemy.
2. In A list per level, change the first speed in the list and run: level 1 changes.

## Questions students ask

- **"Why does the level shoot up?"** The level-up is in on game update, which runs every frame, or goal never moves. Move it to where the score changes.
- **"Why does it say Level 0?"** Lists count from 0; show level + 1 to players.
- **"Why does the game break after the last level?"** A list of 3 has places 0, 1 and 2. Win at level 3 before calling startLevel.

## How it connects

Next unit, power-ups: true or false, and numbers that run out. Skillmap: Jungle Jump Platformer builds a level per map.
