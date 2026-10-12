---
title: Functions in 5 minutes
---
## The idea in plain words

A **function** is a named set of steps. `def square():` teaches Python a new word, `square`, and the indented lines say what it means. Writing the `def` does nothing on its own; the steps run when you **call** it: `square()`.

A **parameter** is an input: `def square(size):` lets each call choose, `square(50)` or `square(150)`. A function can also **return** an answer: `def metres(m): return m * 20` gives back a number other code can use, like `forward(metres(5))`. A **module** is a file of related functions that other programs import.

## Why programmers use them

- **Write once, use many times.** Three squares are three calls, not three copies.
- **Fix once.** A change inside the function updates every call. With copies, every copy needs the same fix, and missing one leaves a bug.
- **Build big from small.** Small tested pieces (a wall, a roof) combine into bigger ones (a house, a street).
- **Share.** Modules let one person's functions be used by everyone, which is how Python's libraries work.

## An everyday picture, and where it breaks

A function is a recipe card. Writing the card does not cook anything; following it (calling) does. A parameter is "serves 4" on the card: the same recipe for a different amount. `return` is handing the finished dish back to whoever asked for it.

Where it breaks: `print` is like showing someone a photo of the dish. They can see it, but they cannot eat it. A function that prints instead of returning gives nothing back, which is why the Returns lesson's bug stops with an error.

## Try it yourself (5 minutes)

1. In the playground, write `def square():` with a loop of four `forward(100)` and `right(90)` under it. Run it: nothing is drawn.
2. Add `square()` at the bottom (not indented). Now a square appears.
3. Change the def to `def square(size):`, use `forward(size)`, and call `square(50)` then `square(100)`.

## Questions students ask

- **"Why doesn't my def draw anything?"** It only describes the steps. Call it by name with brackets.
- **"What's the difference between a parameter and an argument?"** The parameter is the name in the def (`size`); the argument is the value in the call (`50`).
- **"When do I use return instead of print?"** When another part of the program needs the answer. Print is only for people to read.

## How it connects

Every later lesson is built from functions: event handlers in Interaction, `draw_button` and `inside` in the `ui` module, and every part of the final game.
