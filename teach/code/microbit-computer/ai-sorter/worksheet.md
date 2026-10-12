---
title: "Train a recycling sorter"
subtitle: "micro:bit and the computer · A model drives a build · Lesson 4"
---

# Train a recycling sorter

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Recycling centres use cameras and trained models to sort paper from plastic on a fast conveyor belt. Before a centre trusts one, someone has to test it on items it has never seen.


:::teacher-note

**In one sentence:** Students train a Paper/Plastic image model in Teachable Machine, test it on photos it has never seen, and fix it by changing the training data.

**Students should be able to say:** I can train an image model and test it on photos it has never seen. I can work out accuracy, overall and for each group of test photos. I can find what a model's mistakes share and fix it by changing its training data.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**Your model gets your own items right almost every time on the webcam. The board tests it on other paper and plastic photographed on a messy bench. Its score on the messy bench will be…**

☐ Much lower than on plain backgrounds

☐ Exactly 50%: it guesses

☐ About the same: it has learned what paper is

☐ Higher: more objects help it

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Much lower. The model learned from photos on one plain background, so the background is part of what it learned. On a messy bench it is often wrong.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Read the results


:::keep-together

### Accuracy

**A model gets 23 of 32 test photos right. What is its accuracy, as a percentage (to the nearest whole number)?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 72

Accuracy is correct ÷ total: 23 ÷ 32 = 0.72, or 72%.

:::


:::keep-together

### What the failures share

**This model scores: plain 8/8, messy 4/8, low light 5/8, not paper or plastic 0/8. Its training photos were all on one plain desk. Why does it fail on the messy bench?**

☐ It needs more training epochs

☐ It cannot tell the item from the background it was trained on

☐ Messy photos are harder for every model, so nothing can be done

☐ It has forgotten what paper is

:::


:::teacher-note

**Answer:** It cannot tell the item from the background it was trained on

Every training photo had the same plain desk, so the desk is part of what the model learned. On a cluttered bench it is guessing.

:::


:::keep-together

### Your turn

**Another model scores well everywhere except low light. Which fix is most likely to work?**

☐ Rename the classes

☐ Add more photos on the same bright desk

☐ Add training photos taken in low light

☐ Train for longer

:::


:::teacher-note

**Answer:** Add training photos taken in low light

Look for what the failures share (low light), then add training photos that have it. Change the data, not the settings.

:::


:::keep-together

### Sam's model

**Sam's model scores 50% on the messy bench. Sam adds 100 more photos of the same items on the same desk. The messy score doesn't change. What went wrong?**

☐ The new photos were like the old ones, so they added no variety

☐ The board's test is unfair

☐ Sam needed to delete the old photos first

☐ 100 photos is too many

:::


:::teacher-note

**Answer:** The new photos were like the old ones, so they added no variety

More of the same data teaches the model nothing new. Sam needs photos on different backgrounds.

:::


:::typical

## Fix the data


**Backgrounds.** Retrain your model with photos of the items on **at least three different backgrounds** (or upload the **varied photos**). Export, paste the new link and **Load**.

**Unbalanced classes.** 

**Neither.** Look at the **not paper or plastic** group: the model gives a can or a jar a label anyway, often with high confidence. A model always picks one of its classes. Add a third class called **Neither** with photos of other things (cans, glass, fruit), retrain and test again.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Diagnose


:::keep-together

### Midday photos

**A model was trained on photos taken at midday by a window. It scores 100% plain, 88% messy, 25% low light. What is the problem, and the fix?**

☐ Too few classes: add a Neither class

☐ No dim photos in training: add photos taken in low light

☐ Too many photos: delete some

☐ The test is unfair: ignore low light

:::


:::teacher-note

**Answer:** No dim photos in training: add photos taken in low light

:::


:::keep-together

### A confident can

**A model scores 90% on paper and plastic but labels every can as Plastic with 95% confidence. What is the problem, and the fix?**

☐ High confidence means it is right: nothing to fix

☐ Cans are too shiny for any model

☐ It has no class for other things: add a Neither class

☐ It needs more plastic photos

:::


:::teacher-note

**Answer:** It has no class for other things: add a Neither class

:::


:::keep-together

### Lopsided classes

**Paper has 80 photos and Plastic has 15. The model calls most plastic items Paper. What is the problem, and the fix?**

☐ The classes are unbalanced: give each class about the same number of photos

☐ Plastic is harder to see: add a filter

☐ Retrain with the same photos

☐ It needs a Neither class

:::


:::teacher-note

**Answer:** The classes are unbalanced: give each class about the same number of photos

:::


## Make a sorter you would trust

Use what you found: varied backgrounds and light, balanced classes, and a **Neither** class. Then ask a classmate to bring three items your model has never seen. Does it still work?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}


:::wider

## Evaluate

Write one or two sentences: which items or conditions your sorter would still get wrong, and what a real recycling centre would need to test before trusting it.

**Revision summary**

- A model learns only from the examples you give it: it works on inputs like its training data and fails on others.
- **Accuracy** = correct ÷ total. Test on photos the model has never seen, and look at each **group**, not just the overall score.
- Find what the failures share, then **change the data**: more variety, balanced classes, a class for "none of these".
- A model always picks one of its classes, and it can be confident and wrong.

:::


## Exit ticket

:::keep-together

**A model scores 95% on its own desk and 50% in the canteen. What do you do?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Find what the canteen photos have that the training photos don't (background, light), and add training photos like that.

:::

