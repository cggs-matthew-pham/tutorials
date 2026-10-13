---
title: Building a game in 5 minutes
---
## The idea in plain words

The challenge builds **Space dodger**: a ship moves up and down, rocks fly in from the right, a hit costs a life, and the score counts the seconds you survive. It uses every idea from the course, with only two new blocks:

- **auto destroy** (the **set flag** block in Sprites): a sprite is removed once it leaves the screen, so rocks that miss do not pile up.
- **high score** (in Info): the best score so far in this browser. The game over screen shows it by itself.

The lesson is built in **three milestones** with less help each time: most of the code, then an outline, then goals only. Finishing it marks the course **Challenge complete**.

## Why programmers use milestones

Real programs are combinations: variables, events, decisions and timers working together. Building in milestones keeps a game playable at every stage, so each change can be tested by playing. Game studios work the same way: prototype, playtest, change one thing.

## An everyday picture, and where it breaks

Milestones are building a cubby house: first a floor you can stand on, then walls, then a roof. You can use it after every step.

Where it breaks: a cubby's floor stays put, but code that worked can stop working when you add the next part. Play the game after every milestone, not only at the end.

## Try it yourself (5 minutes)

1. In Space dodger, play the Run step: every rock comes down the middle. One pick random block turns it into a game.
2. Take destroy out of the Player–Enemy overlap and touch one rock: all three lives go at once.

## Questions students ask

- **"Why did one rock take all my lives?"** The overlap runs every frame the sprites touch. Destroy the rock in the event.
- **"Why does my score race up?"** It is in **on game update** (every frame). Use **on game update every 1000 ms**.
- **"Where did my high score go?"** It is kept in this browser; another browser starts again at 0.

## How it connects

This ends Arcade Foundations. Arcade advanced skills goes on to every sprite of a kind, functions, gravity and jumping, levels and power-ups. Microsoft's Beginner Skillmap (arcade.makecode.com/skillmaps) practises the same moves inside guided games.
