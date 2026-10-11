---
title: The game loop in 5 minutes
---
## The idea in plain words

A game engine runs your game for you. You write three functions and the engine calls them: `init()` **once** at the start, then `update()` and `draw()` **about 60 times a second** for as long as the game runs. `update()` changes things (positions, the score); `draw()` clears the screen and draws everything where it is now. Each pass is a **frame**. Movement is a small change every frame: `x += 1` sixty times a second is a smooth slide.

Keys are read the same way: every frame, `update()` asks whether a key is down (`pressed("LEFT")`) and moves a little if so. This is **polling**; the turtle course's `onkey` was an **event** (a function called once per press).

The students' games live on **microstudio.dev**, a free, open-source game engine in the browser (MIT licence). Our lessons show each game playing on the page, and students copy the code into their own microStudio project. microStudio's Python is ordinary Python (Brython), with `screen`, `keyboard` and `audio` ready to use. The screen is 200 tall, with `(0, 0)` in the middle and `y` going **up**.

## Why programmers use it

- **Every engine works this way**: MakeCode Arcade, Pico-8, Godot and Unity all call an update and a draw every frame.
- **Separating update from draw** keeps the rules of the game apart from how it looks.
- **Polling** suits smooth, held movement; events suit one-off actions (a menu click).

## An everyday picture, and where it breaks

A flip book: each page is a frame, drawn a tiny bit different from the last; flicked fast, it moves. It breaks because a flip book is drawn in advance, while a game draws each page just before showing it, from what the player is doing now.

## Try it yourself (5 minutes)

1. Open microstudio.dev, create a project, choose Python, paste Lesson 1's Run code into `main` and press Run.
2. Change `x += 1` to `x += 3`. Then to `x -= 1`.
3. Delete `screen.clear(...)` and run it: why the smear?

## Questions students ask

- **Why doesn't my code run from top to bottom?** It does, once, to define the functions; then the engine calls them.
- **Why `global` again?** `update()` changes a variable made outside it, exactly as in the turtle events lesson.
- **What is `pressed()`?** A two-line helper students copy: microStudio's `keyboard.LEFT` does not exist until the first key press, so the helper checks first.
- **Do I need an account?** Not to start (guests can make projects), but guest projects are deleted after about 15 days.

## How it connects

The turtle course's events (`ontimer` moving a target) were a slow game loop. Objects with turtles' falling stars come back in the next unit as objects that move and draw themselves.
