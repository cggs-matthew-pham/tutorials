---
title: Loops and menus in 5 minutes
---
## The idea in plain words

A `while` loop repeats **for as long as a question is true**: `while guess != secret:` keeps asking until the guess is right. It asks the question before every lap, so something inside the loop must change the answer, or the loop runs for ever (the playground's **Stop** button ends it).

`+=` adds to a variable: `total += 5` is short for `total = total + 5`. It keeps a count or a running total as the loop goes.

A **menu** is `while True:`, a loop whose question is always yes, with `break` as the way out. Each lap shows the choices, asks for one, and runs one branch of an `if` / `elif`.

A **test case** is an input and the output you expect, written down before running. A small table of them, including a wrong choice, is how programmers check a program does what it should.

## Why programmers use them

- **You often cannot know how many times.** A game, a PIN pad or a till keeps going until something happens.
- **Menus are everywhere.** ATMs, settings screens and text adventures are a loop, a decision and a way out.
- **Tests catch what you did not think of.** Writing the expected output first stops you from deciding a wrong answer looks fine.

## An everyday picture, and where it breaks

A `while` loop is "keep stirring while the sauce is lumpy". The cook checks before each stir, and stops when the answer changes.

Where it breaks: if nothing changes the sauce (you forget to stir), the cook checks for ever. In code, `total + points` works out a sum but does not store it, so the total never changes and the loop never ends.

## Try it yourself (5 minutes)

1. Run the guess-the-number game in Lesson 3 and count how many guesses you need. Halving the range each time always wins in five for 1 to 20.
2. In Lesson 4's till, type a few choices, then something silly, then pay. Watch which branch runs each time.
3. Write three test cases for the till (what to type, what total it should print) and run them.

## Questions students ask

- **Is while True a mistake?** Not when there is a `break`. It reads as "keep going until I say stop".
- **for or while?** `for` when you know how many times (four sides of a square); `while` when you are waiting for something to happen (the right guess, the quit choice).
