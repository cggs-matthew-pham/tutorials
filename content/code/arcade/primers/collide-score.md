---
title: Overlaps, score and lives in 5 minutes
---
## The idea in plain words

Sprites pass through each other, but the game notices when they **overlap** (touch). Three ideas make that into a game:

- Every sprite has a **kind**: Player, Food, Enemy or Projectile. The create block starts with **of kind Player**, so change it for coins and monsters.
- An **on overlap** event names **two kinds**. It runs when a sprite of the first kind touches a sprite of the second kind, and for no other pair. Inside, **sprite** is the first one and **otherSprite** the second.
- **Info** blocks keep a **score**, **lives** and a **countdown** at the top of the screen, and **end the game by themselves** when the lives or the countdown reach 0.

A **timer** event, **on game update every 1000 ms**, runs its blocks again every so many milliseconds (1000 ms is one second). It can make a new enemy each time.

## Why programmers use them

Nearly every game rule is "when this touches that, do something": eat the dot, lose a life, open the door. Kinds let one event cover every coin in the game. Info and timers are jobs the engine does for you, so a game can be built in a lesson.

## An everyday picture, and where it breaks

Kinds are like coloured wristbands at a school sports day: the rule "red meets blue, blue scores a point" works for every child, whatever their name. A child with the wrong wristband is ignored by the rule.

Where it breaks: an overlap is not a single tap. It runs **every frame** (about 30 times a second) **while the sprites still touch**. An enemy that is not destroyed or moved away takes a life every frame, and the game ends at once.

## Try it yourself (5 minutes)

1. In Overlaps and kinds, collect the coin, then change the coin's kind to Player. Now it cannot be collected.
2. In Score, lives and timers, play the dodge game and lose on purpose. No game over block was needed.
3. Take destroy out of the Player–Enemy event and touch one rock. All the lives go at once.

## Questions students ask

- **"Why doesn't touching the coin do anything?"** Check its kind matches the second kind in the overlap event.
- **"Why did the player vanish instead of the coin?"** Destroy otherSprite, not sprite.
- **"Why did one hit take all my lives?"** The enemy is still touching. Destroy it in the overlap event.
- **"Why do no enemies appear?"** Start them at x 160 with a negative vx, inside the timer, not in on start.

## How it connects

The Decide unit adds `if` inside **on game update**, checked every frame (wrap-around, safe zones, chasers). Projectiles bring a fourth kind, and the final challenge, Space dodger, is this unit's dodge game grown up.
