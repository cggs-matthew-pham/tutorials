---
title: A whole game in 5 minutes
---
## The idea in plain words

A game is a loop, things that move, and questions asked every frame. Each **star** is an object of a `Star` class (as in Objects with turtles) that keeps its own `x`, `y` and `speed`, and has `move()` and `draw()` methods; the loop asks every star to move, then to draw. **Collision** is a question: is this star close enough to the paddle, across **and** up and down (`abs(self.x - x) < 12 and abs(self.y - y) < 8`)? A caught star adds to the score and restarts at the top. **Lives** count misses, and at 0 the game stops; calling `init()` again starts over.

Then the game becomes the student's own: sprites drawn in microStudio's **Sprites** tab (`screen.drawSprite("star", x, y, w, h)`), sounds from `audio.beep("C E G")`, and a playtest with a friend.

## Why programmers use it

- **Objects keep the loop short**: new kinds of thing are a class and a list, not more code in `update()`.
- **Collision checks** like this (boxes around things) are how most 2D games decide what touched what.
- **Playtesting** is how designers find what is too hard, too easy or confusing.

## An everyday picture, and where it breaks

A referee watching a game: every moment, they check each player against the rules (offside? out of bounds?). It breaks because a referee can miss things; the game loop checks every star, every frame, without fail.

## Try it yourself (5 minutes)

1. Paste Catch and score's Run code into a microStudio project and play it.
2. Change `< 12` in `touches()` to `< 30`: what happens to the game?
3. Draw a sprite named `star` in the Sprites tab and use `screen.drawSprite` in the star's `draw()`.

## Questions students ask

- **Why does the score jump by lots at once?** The star was not restarted, so it scores every frame it touches.
- **Where do sounds go?** In `update()`, where the thing happens, never in `draw()` (which runs every frame).
- **Can people see my game?** Only if the project is made public; then anyone can play and copy it, under your nickname.

## How it connects

This is the turtle course's Catch the turtle and Objects with turtles' falling stars, in a real engine. Next steps beyond the course: microStudio's maps, music and multiplayer (its Help tab), or Godot, whose GDScript reads much like Python.
