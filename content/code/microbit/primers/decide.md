---
title: Decisions in 5 minutes
---
## The idea in plain words

An **if** block asks a yes-or-no question (a **condition**), such as *light level < 50*. When the answer is yes (**true**), it runs the blocks inside. When it is no (**false**), it skips them and does nothing.

**else** adds an "otherwise": exactly one of the two parts runs. **else if** adds more questions. The micro:bit asks them **from the top**, runs the **first true one** and skips the rest. **else** runs only when none are true.

Comparisons are in **Logic**: `<` less than, `>` greater than, `≤` and `≥` with "or equal to".

## Why programmers use them

Decisions are what make a device respond: street lights switch on in the dark, a fridge beeps when it is too warm, a phone rotates its screen when tilted. Each one is a sensor number and a question.

## An everyday picture, and where it breaks

A security guard at a door with a list of questions, asked in order: "Are you staff? Go in. Otherwise, are you a visitor? Sign in. Otherwise, wait here." The first yes decides what happens, and nobody is asked the later questions.

Where it breaks: if the first question is too wide ("Are you a person?"), everyone goes in and the later questions never get asked. That is why the order of else if matters: ask the narrow question first.

## Try it yourself (5 minutes)

1. In the If lesson, run the night light. Drag the light down, then back up: the lights stay on.
2. Add a second if: *light level ≥ 50*, with clear screen inside. Try again.
3. In the Else lesson, tilt the micro:bit a little and a lot. A small tilt shows the else picture.

## Questions students ask

- **"Why don't the lights go off?"** An if does nothing when its question is false. Something else has to turn them off: a second if, or else.
- **"Which way round are < and >?"** Read it aloud: "light level less than 50". The small end points at the smaller number.
- **"Why does my else if never run?"** An earlier question is also true for those values. Ask the narrower one first.

## How it connects

The challenge uses decisions to check whether a press came too early, and to keep the best score: *if this time < best, set best to this time*.
