---
title: Training a model in 5 minutes
---
## The idea in plain words

A **model** learns to sort things from **examples** you give it, not from rules you write. In **Teachable Machine** you give it photos for each class (Paper, Plastic), click Train, and it learns patterns in the photos.

- It works on new photos that look like its training photos, and fails on ones that don't.
- **Test it fairly**: on photos it has never seen, in groups for the conditions where it will be used (messy bench, low light). Accuracy = correct ÷ total, for each group.
- **To fix it, change the data**: more variety, balanced classes, a **Neither** class for everything else.
- A model always picks one of its classes, and it can be confident and wrong.

## Why programmers use it

Some jobs have no simple rules: what makes a photo "plastic"? Models learn patterns from examples. Recycling sorters, photo apps and medical scanners all work this way, and all have to be tested before they are trusted.

## An everyday picture, and where it breaks

A model is a student who learned from one textbook's pictures: great on questions like the textbook, lost on anything different. Where it breaks: unlike a student, it can't tell you it's guessing, so you have to test it.

## Try it yourself (5 minutes)

1. Download the plain photos from **Train a recycling sorter** and upload them into Teachable Machine.
2. Train, export with Upload my model, and paste the link into the board.
3. Compare the plain and messy bench scores.

## Questions students ask

- **"It got my items right, why is the score low?"** The test photos are different: other items, places and light.
- **"Can I change a setting to fix it?"** Change the photos instead.
- **"Is the link private?"** Anyone with it can use the model; it does not contain the photos.

## How it connects

The model's labels then drive a micro:bit; CreateAI does the same with movements; the capstone does it all on a problem you choose.
