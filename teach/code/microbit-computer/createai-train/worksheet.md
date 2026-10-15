---
title: "Train movements"
subtitle: "micro:bit and the computer · AI on the micro:bit · Lesson 6"
---

# Train movements

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A smartwatch counts your steps and knows when you start running, without a camera and without sending anything to a computer. A small model on the watch reads its motion sensor.


:::teacher-note

**In one sentence:** Students see movements as data (x, y and z over time), train an activity model in micro:bit CreateAI, and improve it until it works for someone who didn't train it.

**Students should be able to say:** I can describe a movement as data: x, y and z acceleration over time. I can train and test a movement model in CreateAI. I can improve a model by adding samples from other people and ways of moving.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**You train four actions: still, walking, running and jumping, with the micro:bit on your wrist. Which two will the model mix up most?**

☐ Jumping and still

☐ Walking and running

☐ Still and jumping

☐ Still and running

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Walking and running. Both are a steady swing of the arm, again and again; running is faster and bigger. The model has to learn that difference from your samples, while still and jumping look nothing alike.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}


:::typical

## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


:::keep-together

### A sample

**What does CreateAI record in one sample?**

☐ A video of you moving

☐ Your heart rate

☐ One reading of x, y and z

☐ About a second of x, y and z acceleration readings

:::


:::teacher-note

**Answer:** About a second of x, y and z acceleration readings

A movement happens over time, so a sample is a short recording of all three directions, like the waves on the board.

:::


:::keep-together

### A friend's run

**Your model knows your running. A friend runs with the micro:bit held differently, and it says walking. What is the fix?**

☐ Add running samples from other people and other ways of holding it

☐ Rename the actions

☐ Record more of your own running

☐ Train for longer

:::


:::teacher-note

**Answer:** Add running samples from other people and other ways of holding it

Same idea as the recycling sorter: the model only knows the examples it was given. Add the variety it is missing.

:::


:::keep-together

### Where it runs

**The Teachable Machine sorter ran on the computer. This model runs on the micro:bit. Which is true?**

☐ It only works while CreateAI is open

☐ It still needs the computer to think

☐ Once downloaded, it works on battery power with no computer, camera or connection

☐ It sends your movements to the internet

:::


:::teacher-note

**Answer:** Once downloaded, it works on battery power with no computer, camera or connection

The model is copied into the micro:bit's program. A V2 runs it by itself, like the model in a smartwatch.

:::


:::typical

## Improve the model


**Partner test.** Swap micro:bits with a partner. Test each other's models: do each action three times. Add samples of the actions it got wrong (yours and theirs), retrain, and test again.

**Not quite still.** Real "still" includes fidgeting and shifting your weight. Record still samples that include those.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Make

Finish an **activity model** that recognises still, walking, running and jumping for **someone who didn't train it**: three times in a row for each action. Keep the CreateAI session open (or save it): next lesson you code with it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Why does the model mix up walking and running more than still and jumping?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Walking and running make similar patterns (a repeated swing) that differ only in speed and size; still and jumping look completely different.

:::

