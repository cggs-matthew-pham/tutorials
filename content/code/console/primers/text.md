---
title: Text in, text out in 5 minutes
---
## The idea in plain words

A **console** program works with text instead of pictures. It shows a line, waits for someone to type an answer, and replies. Three pieces do almost all of it:

- `print("...")` shows a line of text. Text goes in quotes, and the quotes are not shown.
- `+` joins pieces of text into one: `"Hello, " + name`. It adds nothing, so a space only appears where it is inside the quotes.
- `input("question")` shows the question, waits, and gives back what was typed. Store it with `name = input(...)`.

A number cannot be joined onto text: `"Score: " + 5` is an error. `str(5)` makes a text copy that can be joined.

## Why programmers use them

- **Every app shows and asks.** Forms, chat windows and ticket machines are the same idea with a nicer screen.
- **Messages are built from pieces.** A greeting, a name and a count are joined into the line a person reads.
- **It is the bridge.** The turtle courses' ideas (variables, decisions, loops, functions) carry straight over; only the screen changes.

## An everyday picture, and where it breaks

A console program is a person at a counter: they say something, listen, and reply.

Where it breaks: the person at the counter hears a whole sentence. The program only holds what it was told to store, so an answer that is not stored in a name is gone.

## Try it yourself (5 minutes)

1. Run `name = input("Name? ")` then `print("Hi " + name)`. Click the line in the console, type, and press Enter.
2. Take the space out of the quotes in `"Hi "` and run it again. Where did the space come from?
3. Try `print("Score: " + 5)` and read the message. Then fix it with `str(5)`.

## Questions students ask

- **Why does the console look different from the turtle playground?** Programs that do not use the turtle get a console instead of a drawing. If a program imports turtle, the drawing comes back.
- **Why quotes?** Without quotes Python looks for a name. With quotes it uses the text itself.
