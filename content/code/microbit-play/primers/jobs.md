---
title: Functions in 5 minutes
---
## The idea in plain words

A **function** (in **Advanced › Functions**) is a named job: some blocks with a name. Making it does **not** run it; a **call** block runs it, once per call. One copy serves every call, so changing the function changes every place that calls it. Copied blocks have to be changed one by one.

From this course on, students also see the **Python** view of their programs. The big idea: every event block is a function, handed to the micro:bit to call when the event happens.

## Why programmers use them

Functions name a job once, so it can be used everywhere and fixed in one place. In a two-player game, the same "go" signal shown in two places must stay the same, or the race is unfair.

## An everyday picture, and where it breaks

A function is a recipe card: "make the sauce (see card 12)". The recipe is written once and followed whenever a dish needs it.

Where it breaks: writing a recipe card does not cook anything until someone follows it, just as making a function does not run it until it is called.

## Try it yourself (5 minutes)

1. In Name a job, press A and count the flashes: one for each call.
2. Delete the calls in A and press A: nothing happens, though the function is still there.
3. Press **Python** at the top of the editor and find `def`.

## Questions students ask

- **"Why doesn't my function do anything?"** Nothing calls it. Add a call block.
- **"Where is the call block?"** It appears under Functions once the function has been made.
- **"Do I have to write the Python?"** No: it is there to read, so the step to text code later is smaller.
- **"Can a function take a number?"** Yes (a parameter). That comes in Secret messages.

## How it connects

on radio received is one more event block, so one more function the micro:bit calls. The Radio duel uses a function so both players see the same signal.
