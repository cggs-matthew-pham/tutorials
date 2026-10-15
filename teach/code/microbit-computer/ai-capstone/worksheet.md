---
title: "Capstone: your own AI sorter"
subtitle: "micro:bit and the computer · Capstone: your own AI sorter · Lesson 8"
---

# Capstone: your own AI sorter

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Engineers who build an AI system are asked two questions before it is used: how did you test it, and when does it fail? This time the problem, the data and the answers are yours.


:::teacher-note

**In one sentence:** Students build an AI sorter for a problem they choose, in four milestones (test set, model, build, system), and report its scores by group and its limits.

**Students should be able to say:** I can build a fair test set before training, with groups for the conditions where the model will be used. I can improve a model by changing its data for its weakest group. I can make a build act safely on a model's labels and report what it still gets wrong.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Plan

Write in your book or a document:

1. The **problem** and who it helps.
2. The **classes** (with exact names, as you will type them in Teachable Machine), including **Neither**.
3. **Where** it will be used: the background, the light, the distance. These become your test groups.
4. What the **micro:bit** does for each label, and what it does when it is **unsure**.


:::typical

## Milestone 1: build the test set first

Take your **test photos before you train**, and keep them apart from your training photos. For each class, take photos in **at least three groups**: different places, light or distances where the model will be used. On the board, choose the class, name the group, then **Add photos**. (The photos stay in this browser only.)

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


:::typical

## Milestone 2: train, test, improve

Train in Teachable Machine (new photos, not your test photos), export with **Upload my model**, and paste the link. Find the **weakest group**, work out what its failures share, change the training data, and test again. Keep a note of each change and its scores.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Make: Milestone 3: the build

Program the micro:bit: one branch for each of your labels, an **else** that does something safe, and a **reply** (serial write value) saying what it did. A servo flap, lights, a sound or the screen: your choice. If the build is across the room, add the radio bridge.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/4472dc038ecd.png?v=c9e0553563dd0b5b)

:::


:::typical

## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

:::


:::wider

## Report

Write a one-page report (or a two-minute talk):

- The **problem** and your **classes**.
- Your **test set**: groups and how many photos.
- **Scores by group**, first and final, and **what you changed** in the data each time.
- What the micro:bit does, including when the model is **unsure**.
- What it **still gets wrong**, and **who or what it might fail for** if a real person relied on it.

:::


## Exit ticket

:::keep-together

**Why build the test set before training?**

{{lines-3}}

:::


:::teacher-note

**Answer:** So it holds photos the model never trained on, from the conditions where it will be used: a fair test of whether it works there.

:::

