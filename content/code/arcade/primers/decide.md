---
title: Decisions in 5 minutes
---
## The idea in plain words

An **if** block asks a yes-or-no question (a **condition**), such as *car x > 160*. When the answer is yes (**true**), it runs the blocks inside. When it is no (**false**), it skips them and does nothing.

**else** adds an "otherwise": exactly one of the two parts runs. **else if** adds more questions, asked from the top; the **first true one** runs and the rest are skipped.

In Arcade the big question is **when** an if is asked. A game redraws the screen about **30 times a second**; each drawing is a **frame**. **on game update** runs its blocks every frame, so an if inside it keeps asking for as long as the game runs. **on start** runs once, before the game begins, so an if there is asked one time and never again.

Comparisons are in **Logic**: `<` less than, `>` greater than, `≤` and `≥` with "or equal to". A sprite's **x** and **y** blocks are in **Sprites**. Remember y counts **down** the screen.

## Why programmers use them

Decisions are what make a game react: wrap around when you leave the screen, change the music in a safe zone, turn an enemy towards you, make a guard turn at the end of its walk. Each one is a position (a number) and a question, asked every frame.

## An everyday picture, and where it breaks

A lifeguard watching the pool: every few seconds she asks "is anyone in the deep end who shouldn't be?", and acts the moment the answer is yes. That is an if in **on game update**. An if in **on start** is a lifeguard who looks once when the pool opens, sees nobody, and goes home.

Where it breaks: a lifeguard blows her whistle once. An if in on game update acts **every frame** while its question stays true, so anything inside it (a point, a lost life) happens 30 times a second unless the blocks inside also make the question false (as wrap-around does by moving the car back to x 0).

## Try it yourself (5 minutes)

1. In the If lesson, run the car: it wraps around the screen. Then load Sam's version (the if in on start): the car drives away for good.
2. In the Else lesson, run away from the cat with the arrow keys. It only follows you left and right.
3. Add a second if … else for y and vy. Now it chases you everywhere. Then load the follow version: one block does the same.

## Questions students ask

- **"Why doesn't my if do anything?"** Check where it is. In on start it is asked once, before anything has moved.
- **"Why does my enemy run away?"** The speeds are the wrong way round. If the player has a bigger x, they are to the right, so the enemy's vx must be positive.
- **"Why does my score shoot up?"** Something inside on game update runs every frame. Put it inside the if, and make sure the if stops being true.
- **"Why build the chaser if follow does it?"** So you know what follow does. Your own version can do things follow cannot, such as chase only when the player is close, or run away.

## How it connects

Next unit fires projectiles, steered by the same if and else. In Arcade advanced skills the same idea gives a floor for jumping (*if the player's bottom is below the ground, stop falling*), and the Level up lesson shows the trap from the other side: an if that stays true in on game update fires every frame.
