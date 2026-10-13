---
title: Time and true/false in 5 minutes
---
## The idea in plain words

**running time** (in **Input › more**) is the number of milliseconds since the micro:bit switched on. 1000 ms is one second. It never restarts at a press, so timing is a subtraction: store running time in a variable at the start (`start`), then later *running time − start* is how long it took.

A variable can also hold **true** or **false** (in **Logic**). It remembers one yes-or-no fact about what is happening now, such as `waiting`: *is the heart showing?* Each event either sets it or asks about it with **if**, and it must be set back, or it keeps saying true.

## Why programmers use them

Stopwatches, lap timers and game scores all subtract two times. True/false variables are everywhere a device must remember a state: a door is locked, a lift is moving, a round has started.

## An everyday picture, and where it breaks

running time is the clock on the wall: nobody restarts it to time something; you read it twice and subtract. A true/false variable is a flag held up while something is happening.

Where it breaks: reading the wall clock once tells you the time, not how long something took. And a flag that is never lowered says "yes" for ever, so every later press counts.

## Try it yourself (5 minutes)

1. In Time between, press A, count to three, press B: close to 3000.
2. In True or false, press B, then A before the heart: the first version still gives a time.
3. Add `waiting` and press early again: a cross.

## Questions students ask

- **"Why is my time 15000?"** `start` was never set, or was set at the wrong moment.
- **"Why is it negative?"** The subtraction is the wrong way round: running time − start.
- **"Why does every press show a cross?"** `waiting` is never set to true.

## How it connects

The Reaction timer challenge is built from exactly these two ideas plus a random wait. The Radio duel adds radio, so two players race.
