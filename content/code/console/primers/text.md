---
title: Text in, text out in 5 minutes
---
## The idea in plain words

A **console** program works with text instead of pictures. It shows a question, waits for someone to type an answer, and replies. Three pieces do almost all of it:

- `input("What is your name? ")` shows the question and waits. Whatever is typed is given back and stored in a variable: `name = input(...)`.
- `print(...)` shows a line of text.
- `+` joins pieces of text into one: `"Hello, " + name + "!"`. Spaces only appear where they are inside the quotes.

The catch: `input()` always gives back **text**, even when someone types digits. `"5" + "5"` is `"55"`. To calculate, turn the text into a number with `int("5")`; to join a number onto text, turn it back into text with `str(5)`. And because `int("twelve")` stops the program with an error, a careful program checks first: `text.isdigit()` is True only when every character is a digit.

## Why programmers use it

- **Every app takes input.** Forms, search boxes, chat windows and ticket machines are the same idea with a nicer screen.
- **What people type is not what you expect.** Checking input before using it (validation) is one of the most important habits in programming.
- **It is the bridge.** The turtle course's ideas (variables, decisions, loops, functions) carry straight over; only the screen changes.

## An everyday picture, and where it breaks

A console program is a person at a ticket counter: they ask a question, listen, and reply.

Where it breaks: the person at the counter hears "five" as a number. The program hears the **characters** you typed, so 5 is the text `"5"` until `int()` turns it into a number. That is why 5 and 5 can make 55.

## Try it yourself (5 minutes)

1. In a console lesson's playground, run `name = input("Name? ")` then `print("Hi " + name)`. Click the line in the console, type, and press Enter.
2. Try `a = input("A? ")`, `b = input("B? ")`, `print(a + b)` with 5 and 5. Then wrap each input in `int(...)` and run again.
3. Type `twelve` into the int() version and read the error. Then look at how Lesson 2 checks with `isdigit()`.

## Questions students ask

- **Why does the console look different from the turtle playground?** Programs that do not use the turtle get a console instead of a drawing. If a program imports turtle, the drawing comes back.
- **Can I type a decimal like 2.5?** `isdigit()` says no (the dot is not a digit) and `int()` cannot read it. `float()` can, but this course sticks to whole numbers.
