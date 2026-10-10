---
title: Commands, loops and variables in 5 minutes
---
## The idea in plain words

A program is a list of instructions the computer follows **in order**, top to bottom. `forward(100)` moves the turtle 100 steps; `right(90)` turns it a quarter turn.

A **loop** repeats the lines indented under it: `for i in range(4):` means "do these lines 4 times". A **variable** is a name for a value: `sides = 5` stores 5 under the name `sides`, and the program uses 5 wherever it sees `sides`.

## Why programmers use them

- **Loops** stop programs growing with every repeat. A 4-sided and a 100-sided shape are both 3 lines with a loop.
- **Variables** put a value in one place. Change `sides` once and every line that uses it follows. They can also hold calculations: `angle = 360 / sides` works out the turn for you.

## An everyday picture, and where it breaks

A loop is a recipe step that says "stir 4 times". A variable is a labelled jar: the label stays, the contents can change.

Where it breaks: in maths, `x = x + 5` is impossible. In Python `=` means **store**, read right to left: work out `x + 5`, then put the answer back in `x`. Say "store" aloud instead of "equals" and students follow.

## Try it yourself (5 minutes)

1. Open the Python playground and run `forward(100)` then `right(90)`, four times.
2. Replace them with `for i in range(4):` and the two lines indented under it. Same square.
3. Add `sides = 6` at the top, use `range(sides)` and `right(360 / sides)`. Change `sides` to 3, then 12.

## Questions students ask

- **"Why does it turn 120, not 60, for a triangle?"** The turtle turns at the outside of each corner. All the turns add up to one full turn, 360, so 360 ÷ 3 = 120.
- **"Why do the lines have to be pushed in?"** Indentation tells Python which lines belong to the loop.
- **"Why doesn't `size = size + 5` break?"** It works out the right side first, then stores the result back in `size`.

## How it connects

Loops and variables appear in every later lesson. Next unit adds choices (`if`) and lists; later, functions give a group of steps a name.
