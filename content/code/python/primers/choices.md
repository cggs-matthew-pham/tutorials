---
title: Decisions and lists in 5 minutes
---
## The idea in plain words

A **decision** lets the program choose. `if score > 10:` asks a question; the indented lines under it run only when the answer is yes, and the lines under `else:` run when it is no. `elif` asks another question when the first answer was no.

A **list** keeps many values in order under one name: `colours = ["red", "blue", "green"]`. `for c in colours:` takes them one at a time. Each item has a **place**, counted from 0: `colours[0]` is the first.

## Why programmers use them

- **Decisions** are how programs respond: a traffic light, a passing score, a correct password.
- **Lists** keep data separate from instructions. Add a colour to the list and the loop draws one more square, with no change to the code.

## An everyday picture, and where it breaks

An `if` is a fork in a path with a sign: "if it is raining, take the left path". A list is a numbered row of lockers.

Where it breaks: the lockers start at number **0**, not 1. A list of 5 items has places 0 to 4, and asking for place 5 is an error. Expect this surprise; it is the most common list bug.

## Try it yourself (5 minutes)

1. In the playground, run `print(7 % 2)` and `print(8 % 2)`. `%` is the **remainder** after dividing (not percent): 1 for odd numbers, 0 for even.
2. Write a loop `for i in range(6):` with `if i % 2 == 0: print("even")` and `else: print("odd")` under it.
3. Make `colours = ["red", "blue", "green"]` and `print(colours[1])`. It prints blue.

## Questions students ask

- **"Why two equals signs?"** One `=` stores a value. Two `==` ask whether two things are equal.
- **"Why does my list start at 0?"** The place number counts how far an item is from the start. The first item is 0 steps away.
- **"What does the colon do?"** It ends the question line. The indented lines below are what happens.

## How it connects

Decisions are the hit test in Build a button and the rules in the final game. Lists hold the game's path and the buttons on a control panel.
