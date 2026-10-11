---
title: Lists, objects and functions in 5 minutes
---
## The idea in plain words

Three tools for keeping a sketch short. An **array** is a list: `[40, 90, 150]`, read by place (`heights[0]` is the first, because counting starts at 0). An **object** keeps the values of one thing together: `{ x: 20, y: 30, speed: 2 }`, read with a dot (`star.speed`). A **function** is code with a name: you define it once and call it as often as you like, giving it values through **parameters** and getting an answer back with **return**. A list of objects, a loop over it, and a function that works on one object make the shape of most games.

## Why programmers use it

- **Many things, one piece of code**: a hundred stars are a list and a loop, not three hundred variables.
- **Names for ideas**: `drawFlower(x, y, size)` says what the code is for.
- **One place to fix**: change a function once and every call changes.

## An everyday picture, and where it breaks

A recipe card: the recipe is written once (the definition) and cooked as many times as you like (the calls), with the amounts changed each time (the parameters). It breaks because a recipe is not cooked by writing it; a function does nothing until it is called.

## Try it yourself (5 minutes)

1. Run the stars sketch and add a `size` property to each star.
2. Write a function that draws a face, then call it three times with different positions.
3. Change one capital letter in a call. What does the error say?

## Questions students ask

- **Why does it say `speed` is not defined?** The speed belongs to the star: write `star.speed`.
- **Why does my function draw nothing?** It is defined but never called.
- **What is `i`?** The counter of a `for` loop: 0, then 1, then 2, and so on.

## How it connects

These are the lists, objects (without classes) and functions of the Python units, in JavaScript. Next: the final challenge puts them all in one game.
