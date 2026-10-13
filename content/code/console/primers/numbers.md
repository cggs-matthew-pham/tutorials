---
title: Numbers from text in 5 minutes
---
## The idea in plain words

What `input()` gives back is always **text**, even when someone types digits. `"5" + "5"` is `"55"`. To calculate, turn the text into a number with `int("5")`.

`int("twelve")` stops the program with an error, so a careful program checks first. `text.isdigit()` asks the text whether every character is a digit and gives back `True` or `False`. The dot means "ask this text". An `if` uses the answer: convert inside the `if`, and reply politely in the `else`.

## Why programmers use them

- **What people type is not what you expect.** Checking input before using it (validation) is one of the most important habits in programming.
- **Real apps do this on every box.** A form that says "Please enter a valid quantity" asked a question like `isdigit()` first.
- **A crash is a bad reply.** The `else` turns it into a helpful one.

## An everyday picture, and where it breaks

A door with a lock that asks "is this a key?" before turning.

Where it breaks: `isdigit()` only checks the shape of the text. 0 is all digits, so it passes even when 0 makes no sense. Checking that a number is sensible is a second question.

## Try it yourself (5 minutes)

1. Run `a = input("A? ")`, `b = input("B? ")`, `print(a + b)` with 5 and 5. Then wrap each input in `int(...)` and run again.
2. Type `twelve` into the `int()` version and read the error.
3. Add an `if text.isdigit():` check around it and run it again with `twelve`.

## Questions students ask

- **Can I type a decimal like 2.5?** `isdigit()` says no (the dot is not a digit) and `int()` cannot read it. `float()` can, but this course sticks to whole numbers.
- **Why not just use try and except?** That is a good second way, and it comes later. Checking first shows the idea in the simplest form.
