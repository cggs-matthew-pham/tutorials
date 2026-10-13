---
title: Projectiles and reading a game in 5 minutes
---
## The idea in plain words

A **projectile** (in **Sprites**) is a sprite fired from another sprite, with a speed across and down. It has its own kind, **Projectile**, so the overlap that catches a hit names Projectile and Enemy, not Player. The engine removes a projectile once it leaves the screen.

**Read a game** is a review lesson with nothing new: a complete game, longer than anything so far. Students find the blocks that do each job (make an enemy, fire, score a hit), trace what they do, and change just those to change the game.

## Why programmers use them

Firing is the heart of every shoot 'em up, and its kind keeps a shot's rules apart from the player's. Reading before changing is how programmers work on code they did not write: find the part that does the job, change only that.

## An everyday picture, and where it breaks

A projectile is a ball thrown by a player: once it leaves the hand, it flies on its own.

Where it breaks: in a game the ball is not the player, so "the player touched the enemy" never sees a hit by the ball. The game needs a rule for the ball's own kind.

## Try it yourself (5 minutes)

1. In the Projectiles lesson, fire at the alien with the A button (space on the keyboard).
2. Change the overlap to Player and Enemy and fire again: the shots pass straight through.
3. In Read a game, find the one number that decides how often enemies arrive.

## Questions students ask

- **"Why do my shots go straight through?"** The overlap names Player and Enemy. A shot is a Projectile.
- **"Why does the shot go the wrong way?"** Its speeds are vx and vy: vx across, vy down. A shot upwards has a negative vy.
- **"Do I need to destroy shots that miss?"** No: the engine removes a projectile once it leaves the screen.

## How it connects

The final challenge, Space dodger, uses rocks, lives, timers and decisions together. Arcade advanced skills starts with every sprite of a kind: one press that does something to every alien at once.
