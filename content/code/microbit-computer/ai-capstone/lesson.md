---
order: 8
unit: capstone
title: "Capstone: your own AI sorter"
summary: Choose a sorting problem, build a fair test set first, train and improve a Teachable Machine model until every group passes, connect a micro:bit build that acts safely on its labels, and report what it still gets wrong.
language: makecode
explainPicture: build.ts#sol-build
hook: "Engineers who build an AI system are asked two questions before it is used: how did you test it, and when does it fail? This time the problem, the data and the answers are yours."
---
You have trained a model, tested it fairly, fixed it by changing its data, and sent its labels to a micro:bit. Now do it all on a problem **you choose**, in four milestones with less help each time.

Some ideas: **ripe or unripe** fruit; **LEGO** bricks by colour or size; **tidy or messy** desk; **book or not a book**; **wet or dry** washing (photos only); a **recycling** sorter for your school's own bins. Two to four classes, plus a **Neither** class for everything else.

## Plan

```step
stage: info
check: { type: reflect, text: "I wrote down my problem, my classes (including Neither), where the model will be used, and what the micro:bit does for each label." }
```

Write in your book or a document:

1. The **problem** and who it helps.
2. The **classes** (with exact names, as you will type them in Teachable Machine), including **Neither**.
3. **Where** it will be used: the background, the light, the distance. These become your test groups.
4. What the **micro:bit** does for each label, and what it does when it is **unsure**.

## Milestone 1: build the test set first

```step
stage: modify
insight: "A fair test is made before training, from photos the model will never train on, taken in the conditions where it will be used."
try: { playground: board, starter: "boards.yml#photos", height: 760 }
check: { type: board, text: "Add at least 24 test photos in at least 3 groups, with every class in every group.", when: "n_photos >= 24 and n_groups >= 3" }
```

Take your **test photos before you train**, and keep them apart from your training photos. For each class, take photos in **at least three groups**: different places, light or distances where the model will be used. On the board, choose the class, name the group, then **Add photos**. (The photos stay in this browser only.)

## Milestone 2: train, test, improve

```step
stage: modify
insight: "Improving means finding the weakest group and changing the training data for it, not just raising the overall score."
try: { playground: board, starter: "boards.yml#photos", height: 760 }
check: { type: board, text: "Get 80% or more overall, with no group below 60%.", when: "acc_all >= 0.8 and acc_min >= 0.6" }
```

Train in Teachable Machine (new photos, not your test photos), export with **Upload my model**, and paste the link. Find the **weakest group**, work out what its failures share, change the training data, and test again. Keep a note of each change and its scores.

## Milestone 3: the build

```step
stage: make
try: { playground: microbit, starter: "build.ts#start" }
check: { type: code, text: "The micro:bit acts on each of your labels, does something safe for anything else (Unsure, Neither, or a word it doesn't know), and replies with what it did.", rules: { inside: { "serial.onDataReceived": ["serial.readLine()", "if(label==", "}else{", "serial.writeValue("] } } }
```

Program the micro:bit: one branch for each of your labels, an **else** that does something safe, and a **reply** (serial write value) saying what it did. A servo flap, lights, a sound or the screen: your choice. If the build is across the room, add the radio bridge.

## Milestone 4: the whole system

```step
stage: run
tier: typical
try: { playground: board, starter: "boards.yml#system", height: 760 }
check: { type: board, text: "Run the whole system: at least 5 labels sent from the webcam and 5 replies from the micro:bit.", when: "n_sent >= 5 and n_replies >= 5" }
```

Load your model, connect your micro:bit, and run it on the webcam with real items. Watch what happens when you show something that is in no class at all.

## Report

```step
stage: info
check: { type: reflect, text: "I wrote my report: the problem, my test set, my scores by group before and after, what I changed, what it still gets wrong, and who or what it might fail for." }
```

Write a one-page report (or a two-minute talk):

- The **problem** and your **classes**.
- Your **test set**: groups and how many photos.
- **Scores by group**, first and final, and **what you changed** in the data each time.
- What the micro:bit does, including when the model is **unsure**.
- What it **still gets wrong**, and **who or what it might fail for** if a real person relied on it.
