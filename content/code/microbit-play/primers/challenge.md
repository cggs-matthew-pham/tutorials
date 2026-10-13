---
title: The final challenge in 5 minutes
---
## The idea in plain words

The challenge builds a **reaction game**: press B, wait a random time, then press A as fast as you can when the heart appears. It adds nothing new; every part was taught in the course:

- **running time** (Time between): store it when the heart appears (`start`); at the press, *running time − start* is the reaction time.
- **true/false** (True or false): a variable such as `waiting` is true only while the heart is showing, so an early press can be caught.

The **Radio duel** turns it into a two-player race: both micro:bits run the same program and agree a code (0 get ready, 1 go, 2 I pressed first, 3 I won). Each lesson is built in **three milestones** with less help each time: the steps, then a goal, then goals only.

**Reaction timer** and **Radio duel** mark the course **Challenge complete**. Two optional lessons go further for students who want more: **Fake-outs and levels** (decoys, a list of targets, lives) and **Tournament** (a scoreboard list and rounds that start themselves).

## Why programmers use it

Real programs are combinations: state (variables), events, decisions, data (lists) and named jobs (functions) working together. A game makes the combination visible, and students can test it by playing.

## An everyday picture, and where it breaks

A reaction timer is a starting pistol and a stopwatch: the pistol fires at an unpredictable moment, the stopwatch starts, and stops when you move.

Where it breaks: a stopwatch that starts when you press go (not when the pistol fires) times the wrong thing. In code, that is setting `start` at the wrong moment, which makes every time huge.

## Try it yourself (5 minutes)

1. In the Reaction timer, press B, wait for the heart, then press A. Good times are 200 to 400 ms.
2. Press A before the heart: without `waiting` it still shows a number. That is the cheat Milestone 2 fixes.
3. In the Radio duel, press B on one simulated micro:bit and race yourself with A on either.

## Questions students ask

- **"Why is my time 15000?"** `start` was never set, or was set before the wait. Set it straight after the heart.
- **"Why does every press show a cross?"** `waiting` is never set to true. Set it after the heart appears.
- **"Why do both players win?"** Check `racing` before counting a press, and set it to false straight away.
- **"Is the simulator fair?"** Close enough for practice; real micro:bits make the duel far more exciting.

## How it connects

Robotics challenges comes next: the same ideas (events, sensors, decisions, functions, radio) driving a two-wheeled robot, first in the robot simulator, then on a real robot.
