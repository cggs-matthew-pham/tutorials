---
title: Lists and functions in 5 minutes
---
## The idea in plain words

A **list** (MakeCode calls it an **array**, in **Advanced › Arrays**) holds many values in order under one name, such as `answers`. Each item has a **place** (an **index**) counted from **0**, so a list of 3 uses places 0, 1 and 2, and the last place is the **length − 1**. To pick at random: *pick random 0 to (length − 1)*, then *get value at* that place.

A **function** (in **Advanced › Functions**) is a named job: some blocks with a name. Making it does not run it; a **call** block runs it, once per call. A **parameter** is an input, such as `points` in *showScore(points)*.

From this unit on, students also see the **Python** view of their programs. The big idea: every event block is a function, handed to the micro:bit to call when the event happens.

## Why programmers use them

Lists keep many related values together (a playlist, a menu, a list of levels), so one block can work with any of them. Functions name a job once, so it can be used everywhere and fixed in one place.

## An everyday picture, and where it breaks

A list is a row of numbered lockers, starting at locker 0. A function is a recipe card: "make the sauce (see card 12)".

Where they break: people count from 1, so locker 3 in a row of 3 does not exist. And writing a recipe card does not cook anything until someone follows it, just as making a function does not run it until it is called.

## Try it yourself (5 minutes)

1. In the Lists lesson, shake the magic 8-ball a few times. Add an answer and shake again.
2. Change *pick random 0 to …* to start at 1: the first answer never comes up.
3. In the Functions lesson, press A, then press **Python** at the top of the editor and find `def`.

## Questions students ask

- **"Why does it start at 0?"** It counts how far from the start an item is: the first is 0 steps away.
- **"Why doesn't my function do anything?"** Nothing calls it. Add a call block.
- **"Where is the call block?"** It appears under Functions once the function has been made.
- **"Do I have to write the Python?"** No: it is there to read, so the step to text code later is smaller.

## How it connects

Radio messages use a shared list as a code (a number stands for a word), and the challenge keeps target times in a list and moves a round into a function.
