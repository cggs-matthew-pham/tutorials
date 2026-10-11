---
title: A quiz page in 5 minutes
---
## The idea in plain words

A quiz page is **data** and a little **memory**. The data is an array of question objects (`{ text, choices, answer }`). The memory is two variables: `current`, which question is on the screen, and `score`. Showing a question makes a button for each choice with `createElement`. A click calls `check(choice)`, which compares the choice with the answer using `===` (three equals signs: one `=` would change the variable and always be true), changes the score, moves on, and shows the next question or the end. Everything on the page is a picture of the data and those two variables.

## Why programmers use it

- **Data-driven pages**: one more object in the array gives one more question, with no new code.
- **Small state, simple code**: only the things that change are variables.
- **Playtesting** shows what a quiz does to a real person.

## An everyday picture, and where it breaks

A teacher with a stack of cards: the next card is `questions[current]`, and a tally on paper is the score. It breaks because the page forgets everything when it is closed; remembering needs somewhere to store it.

## Try it yourself (5 minutes)

1. Add a fourth question to the array.
2. Make right answers green and wrong answers red.
3. Show "You scored 2 of 3" at the end.

## Questions students ask

- **Why does every answer say Correct?** The check uses `=` instead of `===`.
- **Why do the buttons pile up?** Empty the choices box before making new buttons.
- **Can I keep the scores?** Not on this page: it forgets when closed. A server or the browser's storage can keep them.

## How it connects

This is the Catch the turtle, Catch the circle and Power-ups challenges as a web page. The optional lesson shows the real browser Console.
