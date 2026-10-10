---
title: Working with text in 5 minutes
---
## The idea in plain words

Text (a **string**) has its own commands, called with a dot after it:

- `text.strip()` removes spaces from both ends.
- `text.lower()` and `text.upper()` change the capitals.
- `text.split()` cuts the text into a list of words at the spaces.

Each one gives back **new** text and leaves the original alone, so store the result: `command = command.strip()`. They can be chained: `input("> ").strip().lower().split()`. A word is picked by its place, like any list: `words[0]` is the first word, and `word[0]` is the first letter of a word.

## Why programmers use them

- **People type messily**: extra spaces, capitals, more words than expected. Tidying first makes a program forgiving.
- **Comparisons are exact**: `"Yes" == "yes"` is False, so tidy before comparing.
- **Commands are words**: `split()` is the first step of every chatbot, search box and text adventure.

## An everyday picture, and where it breaks

Tidying text is like a teacher reading a messy answer: ignore the smudges, then read the words. Where it breaks: Python does not read meaning. "Yes", "yep" and "sure" are three different texts; the program only understands what you check for.

## Try it yourself (5 minutes)

1. Run `print("  Hello World ".strip().lower().split())`.
2. Run Lesson 1's parser and type `  TAKE lamp `.
3. Change the parser to accept `y` as well as `yes` with `in ["yes", "y"]`.

## Questions students ask

- **Why didn't my text change?** The method gave back new text; store it with `=`.
- **Why is the first word words[0]?** List places start at 0, as in the turtle course's lists.
