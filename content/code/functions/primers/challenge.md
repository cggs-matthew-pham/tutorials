---
title: Games and apps in 5 minutes
---
## The idea in plain words

A game (or an app) is three things working together:

- **Data**: values that describe what is happening now (score, lives, where the turtle is, whether it is showing).
- **Rules**: what each event means (a click on the turtle scores a point; a miss loses a life).
- **A loop**: a timer that keeps things moving (the turtle hops every second; the clock ticks down).

`True` and `False` are values a variable can hold to remember something that is either so or not: `showing = True` while the turtle is on screen.

## Why it matters

The challenge uses everything from the course in one program, so students see that the pieces fit together. It also previews both directions they can take next: **user interface** (buttons, status bars, control panels, towards Gradio and web pages) and **games** (screens, levels, movement, towards MakeCode Arcade and microStudio).

## An everyday picture, and where it breaks

A board game: the board and pieces are the data, the rulebook is the rules, and taking turns is the loop.

Where it breaks: in a board game, players move the pieces. In a program, the loop and the events change the data, and the screen is redrawn to show it. If the data changes but nothing redraws, the player never sees it.

## Try it yourself (5 minutes)

1. Open Catch the turtle, go to Milestone 3 and paste in the solution from the teacher guide. Press Start and play one round.
2. In the code, change `xs` and `ys` to a path of your own and play again.
3. Change `700` in `ontimer(hide, 700)` to `400`. The turtle hides sooner: a rule changed.

## Questions students ask

- **"Why does my score not change?"** The function that changes it needs the variable in its `global` line.
- **"Why is True written with a capital?"** That is how Python spells it. `true` is not the same.
- **"Can I make my own game?"** Yes: the Make steps are open, and the optional lessons go further.

## How it connects

Finishing Catch the turtle and Power-ups marks the course Challenge complete. Control panel leads towards apps (Gradio, web pages); Game levels leads towards games (MakeCode Arcade, microStudio).
