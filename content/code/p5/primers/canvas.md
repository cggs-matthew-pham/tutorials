---
title: Shapes and movement in 5 minutes
---
## The idea in plain words

p5.js draws on a **canvas**: a rectangle of pixels where `(0, 0)` is the **top left** and `y` counts **down**. A sketch has two special functions that p5 runs for you. `setup()` runs **once**; `draw()` runs **about 60 times a second**, and each run is a frame. Movement is a small change to a variable every frame, drawn again where it now is. `if` and comparisons let the sketch decide, for example to turn round at an edge or to react to `mouseX`.

## Why programmers use it

- **One loop for everything**: games, animations and data pictures all repeat "change, then draw".
- **Variables as state**: the values the sketch keeps between frames are how it remembers where things are.

## An everyday picture, and where it breaks

A flick book: each page is a frame and the movement is the tiny change between them. It breaks because a flick book's pages are fixed, while `draw()` works out each page as it goes.

## Try it yourself (5 minutes)

1. Run the first sketch and change a number in `circle(...)`.
2. Move `fill(...)` below the shape. What happens, and why?
3. Make a shape move by adding to a variable in `draw()`.

## Questions students ask

- **Why is my shape upside down?** `y` counts down from the top, so a bigger `y` is lower on the canvas.
- **Why did the colour not change?** `fill` only colours shapes drawn after it.
- **Where did my old picture go?** `background(...)` at the start of `draw()` clears it each frame.

## How it connects

This is turtle drawing and the events lesson in JavaScript: the same loops, variables and decisions, with a different way of saying them.
