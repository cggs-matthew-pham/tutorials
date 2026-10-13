---
title: Keep asking in 5 minutes
---
## The idea in plain words

A `while` loop repeats **for as long as a question is true**: `while guess != secret:` keeps asking until the guess is right. It asks the question before every lap, so something inside the loop must change the answer, or the loop runs for ever (the playground's **Stop** button ends it).

`+=` adds to a variable: `total += 5` is short for `total = total + 5`. Set the total to 0 once, before the loop, and it builds up as the loop goes.

## Why programmers use them

- **You often cannot know how many times.** A game, a PIN pad or a till keeps going until something happens.
- **A running total is everywhere.** Scores, steps and shopping baskets all add as they go.
- **Longer programs are readable in parts.** A guessing game is a set-up, a loop, a check and a count.

## An everyday picture, and where it breaks

A `while` loop is "keep stirring while the sauce is lumpy". The cook checks before each stir, and stops when the answer changes.

Where it breaks: if nothing changes the sauce (you forget to stir), the cook checks for ever. In code, a line that asks again must be inside the loop, or the condition never changes.

## Try it yourself (5 minutes)

1. Run the guess-the-number game and count how many guesses you need. Halving the range each time always wins in five for 1 to 20.
2. Move `tries += 1` out of the loop (dedent it) and see what the program says.
3. Change `total = 0` to be inside the loop in the running-total program. What happens?

## Questions students ask

- **for or while?** `for` when you know how many times (four sides of a square); `while` when you are waiting for something to happen (the right guess).
- **What if it never stops?** Press Stop. Then look for the line that should change the condition.
