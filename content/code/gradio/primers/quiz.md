---
title: A quiz app in 5 minutes
---
## The idea in plain words

**Questions as data.** Each question is a dictionary (`{"q": ..., "choices": [...], "answer": ...}`), and the questions are a list. One loop makes a `gr.Radio` input for each question; the marking function compares each answer with its question's `answer`, counts a score and builds feedback. Adding a question means adding data, plus one more parameter for its answer.

**Objects** (the optional lesson). A class, `Question`, bundles each question's data with the code that uses it: `check(guess)` and `feedback(guess)` are methods, and inside them `self.answer` is that question's own answer. The marking function just asks each question to check itself.

## Why programmers use them

- **Data-driven apps** change by editing data, not code: a teacher can swap the questions without touching the logic.
- **Objects** keep related data and behaviour together, which is how large apps (and Gradio itself) are built.

## An everyday picture, and where it breaks

A stack of question cards with the answer on the back: the loop deals each card as a question, and marking flips each one over. It breaks because the computer compares exactly: "Carbon Dioxide" is not "Carbon dioxide", so answers must match the choices character for character.

## Try it yourself (5 minutes)

1. Run Lesson 3's quiz, get one wrong, read the feedback.
2. Add a fourth question to the list and the matching parameter.
3. Leave a question blank and see what `None` does.

## Questions students ask

- **Why one parameter per question?** Gradio passes one value per input. `def mark(*answers):` takes any number as a list (a stretch).
- **What is None?** Python's word for "no value": a Radio with nothing chosen gives None.
- **Do I need Objects with turtles first?** No; the optional class lesson explains what it needs.
