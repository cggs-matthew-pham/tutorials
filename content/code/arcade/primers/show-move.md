---
title: Sprites and movement in 5 minutes
---
## The idea in plain words

An Arcade game is made of **sprites**: small pictures the game can place, move and test. The screen is **160 pixels across and 120 down**.

- A sprite's **position** is two numbers, **(x, y)**. x counts across from the **left**; y counts **down** from the **top**. So (0, 0) is the top left corner and (80, 60) is the middle.
- A sprite's **velocity** (vx, vy) is a **speed** in pixels per second. The game engine moves the sprite a little every **frame** (each redraw of the screen, about 30 a second), and keeps going until something changes it.
- **move with buttons** hands a sprite to the arrow keys, and **on A button pressed** is an **event**: it runs its blocks each time A is pressed.

The **simulator** (the little game console beside the blocks) runs the game straight away. Click it first so it hears the keyboard: arrow keys or W, A, S, D move, space or Z is A.

## Why programmers use them

Every 2D game is pictures on a grid, moved. A game engine saves work: you say *where* a sprite starts and *how fast* it goes, and the engine draws every frame. Velocity is how clouds drift, cars drive and balls fly without a single loop.

## An everyday picture, and where it breaks

A position is a pin on a map: it says where you are now. A velocity is cruise control in a car: set it once, and the car keeps going at that speed until you brake.

Where it breaks: setting a speed is not "move this far". A sprite with vx 30 does not stop after 30 pixels; it drives off the edge of the screen unless something stops it (stay in screen, bounce on wall, or a new velocity).

## Try it yourself (5 minutes)

1. In the first lesson, change the duck's y from 100 to 20. It jumps to the top, because y counts down.
2. In the second lesson, run the plane. Steer it, then watch the cloud bounce by itself.
3. Change the cloud's velocity from 30 to -30, and to 30, 20. Which way does it go each time?

## Questions students ask

- **"Why is my sprite at the bottom when I wanted the top?"** y counts down from the top. Use a small y.
- **"Why do the arrow keys do nothing?"** Click the game screen first, and check move with buttons names your sprite.
- **"Why did my sprite slide away for ever?"** You set its velocity (a speed), not its position. Change x to move it once.
- **"Why did my old sprite disappear when I made a new one?"** Both use the same variable name. Click the name and choose New variable.

## How it connects

Next unit sprites notice each other: an overlap event runs when two sprites touch. Velocity returns with timers (enemies that fly in), chasing, and gravity, which is a change of velocity every frame.
