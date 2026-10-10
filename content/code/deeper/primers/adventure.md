---
title: Errors, the adventure and files in 5 minutes
---
## The idea in plain words

**try and except.** `try:` runs some lines; if one causes the error named after `except`, Python jumps there instead of stopping, then carries on:

    try:
        n = int(text)
    except ValueError:
        print("That is not a number.")

Name the error you expect (`ValueError`, `KeyError`, `ZeroDivisionError`); others still stop the program, which is what you want for real mistakes.

**The text adventure** joins the course's pieces: a loop that reads a command, a parser (`strip`, `lower`, `split`), the world as data (dictionaries of rooms, exits and things) and a bag (a list). Each command is one `elif` branch; each rule of the world is one check.

**Files** let a program remember after it stops. `open(name, "w")` empties a file and writes to it; `open(name)` reads it. `json.dump(game, f)` writes a dictionary as text and `json.load(f)` gives it back. The first time there is no file, which is a `FileNotFoundError`, caught like any other error. Lesson 6 runs in the Python playground (real Python, Pyodide), whose files are kept in the student's browser and shown in its Files tab.

## Why programmers use them

- **Programs meet bad input, missing files and lost connections.** Catching the error and carrying on sensibly is what makes software feel solid.
- **Games are data plus rules.** Change the dictionaries and you have a new game; the loop stays the same.
- **Saving is writing the data down.** Because the world is already data, saving it is one `json.dump`.

## An everyday picture, and where it breaks

`try` is a safety net under one trick: it catches one kind of fall. A net for a ValueError does not catch a KeyError.

## Try it yourself (5 minutes)

1. Run Lesson 4's ticket program with `three`, `3.5` and `-2`.
2. Play the finished adventure: find the key, open the shed, take the crown.
3. Add a room to the adventure: one entry in `rooms`, `exits` and `things`, and an exit to it.
4. Run Lesson 6's visit counter twice, reload the page, run it again, and open the Files tab.

## Questions students ask

- **Why not catch every error with a bare except?** It hides real mistakes, such as a typo in a variable name.
- **Why is the shed locked check before moving?** The rule decides whether the move happens, so it must come first.
- **Where is the file?** In the browser, for this course: it stays after the page closes, but not on another device or after clearing the browser's data. In Python on a computer it would be in the program's folder.
