---
title: Menus and testing in 5 minutes
---
## The idea in plain words

A **menu** is `while True:`, a loop whose question is always yes, with `break` as the way out. Each lap shows the choices, asks for one, and runs one branch of an `if` / `elif`, with `else` for anything else. `break` leaves the whole loop, and the program carries on after it.

A **test case** is an input and the output you expect, written down before running. If the menu's replies come from a function, each test is one line: `print(reply("9") == "Please choose 1 or 2.")` shows `True` or `False`. A good list of tests includes the wrong inputs.

## Why programmers use them

- **Menus are everywhere.** ATMs, settings screens and text adventures are a loop, a decision and a way out.
- **Tests catch what you did not think of.** Writing the expected output first stops you from deciding a wrong answer looks fine.
- **Functions make code testable.** A function can be called with any input, with no typing.

## An everyday picture, and where it breaks

A café counter: ask what they want, add it to the order, ask again, until they say that is all.

Where it breaks: a person at the counter knows when to stop. A program only stops when a line says so, so a menu with no `break` is a menu that never ends.

## Try it yourself (5 minutes)

1. In the till, type a few choices, then something silly, then pay. Watch which branch runs each time.
2. Remove the `break` line, run it, and press Stop. What does that tell you?
3. Write three test cases for the till (what to type, what it should reply) and run them.

## Questions students ask

- **Is while True a mistake?** Not when there is a `break`. It reads as "keep going until I say stop".
- **Why test with a function and not by typing?** Typing the same choices every time is slow and easy to get wrong. A test line runs in a blink.
