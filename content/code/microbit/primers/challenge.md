---
title: The Pocket pet challenge in 5 minutes
---
## The idea in plain words

The challenge builds a **pocket pet**: a pet that lives on the micro:bit. It uses every lesson in the course and adds nothing new.

- **forever** with a **pause** makes a variable, `hunger`, go up by itself as time passes.
- **on button A pressed** feeds it: hunger goes down, with an **if** so it never goes below 0.
- **if … else if … else** turns the number into a face: happy, tired or sad.
- **on shake** picks a trick from a **list** with *pick random 0 to length − 1*.

It is built in **three milestones** with less help each time: most of the steps, then an outline, then a goal only. **Pocket pet** marks the course **Challenge complete**.

## Why programmers use it

Real programs are combinations: state (variables), time (loops), events, decisions and data (lists) working together. A pet makes the combination visible, and students can test it by looking after it.

## An everyday picture, and where it breaks

A pet is a fuel gauge with a face: time drains it, you top it up, and the face shows how full it is.

Where it breaks: a gauge that never drains by itself is not a pet. In code, that is a change block outside forever: hunger never moves unless someone presses a button.

## Try it yourself (5 minutes)

1. In Pocket pet, run the first program and wait 10 seconds: hunger counts up by itself.
2. Swap the number for faces with if … else if … else, and press A to feed it.
3. Add a trick of your own to the list and shake.

## Questions students ask

- **"Why does hunger never change?"** The change block is not inside forever.
- **"Why is my pet always sad?"** Check the order of the questions: < 3 first, then < 6.
- **"Why does hunger go below 0?"** Only take 1 away if hunger > 0.

## How it connects

The next course, **micro:bit: talk and play**, names jobs as functions, connects micro:bits by radio and measures time, ending with a reaction game and a radio duel.
