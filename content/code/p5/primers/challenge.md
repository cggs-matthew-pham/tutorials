---
title: A game with a click in 5 minutes
---
## The idea in plain words

An **event function** is one p5 calls when something happens: `mousePressed()` on each click, `keyPressed()` on each key. The game keeps a list of falling balls (objects). When the player clicks, the event function checks each ball: if `dist(mouseX, mouseY, ball.x, ball.y) < 20` the click is **close**, so the score goes up and the ball restarts. A missed ball costs a life, and at zero lives the game shows GAME OVER until a key starts it again. The optional lesson uses `sin`, `cos` and `map` to make moving patterns.

## Why programmers use it

- **Events** are how every interactive program waits for people.
- **Distance checks** decide what touched what in most 2D games.
- **Playtesting** shows what is too hard, too easy or confusing.

## An everyday picture, and where it breaks

A doorbell: nothing happens until someone presses it, and then a short piece of code runs. It breaks because the doorbell rings once, while `draw()` also keeps running between clicks.

## Try it yourself (5 minutes)

1. Play the game and change `< 20` to `< 40`. Is it easier or harder?
2. Add a `lives` variable and take one away when a ball falls off the bottom.
3. Give one ball a property that makes it worth more points.

## Questions students ask

- **Why does every click score?** The test is probably `>` where it should be `<`.
- **Why does pressing R do nothing?** Click the picture first so it receives the keys.
- **Why does the score jump by lots?** The ball was not restarted, so it scores again.

## How it connects

This is Catch the turtle in JavaScript, and a first game for the microStudio course. Beyond it: p5.js's own reference, or the DOM course for changing real web pages.
