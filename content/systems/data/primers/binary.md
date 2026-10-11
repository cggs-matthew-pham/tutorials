---
title: Binary numbers in 5 minutes
---
## The idea in plain words

A **bit** is one switch that is either off (0) or on (1). Inside a computer a bit is a voltage that is low or high, or a tiny spot magnetised one way or the other. Two states are easy to tell apart reliably, even when the signal is weak or noisy, so computers store everything with them.

To make bigger numbers, put bits side by side. In **binary** each place is worth double the place on its right: 1, 2, 4, 8, 16, …. Add the places that hold a 1: $10110 = 16 + 4 + 2 = 22$. This is the same idea as place value in base 10, where each column is worth ten times the one on its right.

With $n$ bits there are $2^n$ different patterns, so they can hold the numbers $0$ to $2^n - 1$. Four bits hold 0 to 15 (16 patterns); eight bits, a **byte**, hold 0 to 255. Counting one past the largest number **overflows**: every bit flips back to 0.

## Why it matters

Text, colours, pictures and sound are all stored as numbers, and those numbers as bits. The limits students meet later (colour values stop at 255, a game score wraps round) come straight from counting patterns.

## What students get wrong

- **Reading binary as a base-10 number.** 101 read as "one hundred and one". Say it digit by digit and add the places.
- **Counting the places from the left.** The 1 place is always on the right.
- **Forgetting 0.** Four bits make 16 patterns, but the largest number is 15, because one pattern is 0.

## Where it comes from

The cards are CS Unplugged's binary numbers activity (csunplugged.org, CC BY-SA 4.0). Doing it with real cards before the board works well.

## The words

**bit**, **binary**, **place value**, **byte**, **pattern**, **overflow**.
