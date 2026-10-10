---
order: 6
unit: createai
title: Train movements
summary: A movement is a short recording of x, y and z acceleration. micro:bit CreateAI learns the shape of those recordings from your samples, so it tells movements apart by how they move, and the model then runs on the micro:bit itself.
language: makecode
explainPicture: motion.ts#log
hook: "A smartwatch counts your steps and knows when you start running, without a camera and without sending anything to a computer. A small model on the watch reads its motion sensor."
---
In Teachable Machine the model learned from **photos** and ran on the **computer**. In **micro:bit CreateAI** it learns from **movements**, measured by the micro:bit's motion sensor (the **accelerometer**), and the finished model runs **on the micro:bit**.

**You need:** a micro:bit (a **V2** to run the model on the micro:bit later), a battery pack, and **Chrome or Edge**. CreateAI connects by Bluetooth, or by radio through a second micro:bit plugged into the computer; it shows you which.

## Predict

```step
stage: predict
check:
  type: predict
  q: "You train four actions: still, walking, running and jumping, with the micro:bit on your wrist. Which two will the model mix up most?"
  options: ["Walking and running", "Still and jumping", "Still and running", "Jumping and still"]
  actual: "Walking and running. Both are a steady swing of the arm, again and again; running is faster and bigger. The model has to learn that difference from your samples, while still and jumping look nothing alike."
```

## What a movement looks like

```step
stage: run
code: motion.ts#log
try: { playground: microbit, starter: "motion.ts#log" }
check: { type: reflect, text: "I tilted the simulated micro:bit and watched x, y and z change under Show data." }
```

This logger sends **x**, **y** and **z** acceleration 20 times a second. Run it, open **Show data**, and tilt the simulated micro:bit with the mouse. Each movement is a pattern in three lines.

## Walk and run

```step
stage: run
tier: typical
insight: "On a real micro:bit, walking and running make the same shape of wave at different speeds and sizes: that is what the model has to tell apart."
try: { playground: board, starter: "boards.yml#motion", height: 600 }
check: { type: board, text: "Download the logger to a micro:bit, connect it, and record yourself walking on the spot, then running on the spot.", when: "n_x >= 200" }
```

Hold the micro:bit (still plugged in) at your side. Walk on the spot for five seconds, then run on the spot. Compare the waves.

## Train in CreateAI

```step
stage: run
check: { type: reflect, text: "I trained still, walking, running and jumping in CreateAI, with at least three samples each, and tested the model." }
```

1. Open [micro:bit CreateAI](https://createai.microbit.org/) and start a new session. Follow its steps to connect your micro:bit; put it in the battery pack on your wrist or in your hand.
2. Make four actions: **still**, **walking**, **running** and **jumping**. Record **at least three samples** of each (a sample is one second of movement).
3. Click **Train model**, then test it: the testing page shows the action it estimates and how sure it is.

## Investigate

```step
stage: investigate
insight: "A sample is a second of x, y and z readings; the model learns the patterns in the samples it is given, so variety in who and how matters as much as it did for photos, and where the model runs changes what it needs."
tasks:
  - check:
      type: question
      q: "What does CreateAI record in one sample?"
      options: ["About a second of x, y and z acceleration readings", "A video of you moving", "One reading of x, y and z", "Your heart rate"]
      answer: 0
      explain: "A movement happens over time, so a sample is a short recording of all three directions, like the waves on the board."
  - check:
      type: question
      q: "Your model knows your running. A friend runs with the micro:bit held differently, and it says walking. What is the fix?"
      options: ["Add running samples from other people and other ways of holding it", "Train for longer", "Record more of your own running", "Rename the actions"]
      answer: 0
      explain: "Same idea as the recycling sorter: the model only knows the examples it was given. Add the variety it is missing."
  - check:
      type: question
      q: "The Teachable Machine sorter ran on the computer. This model runs on the micro:bit. Which is true?"
      options: ["Once downloaded, it works on battery power with no computer, camera or connection", "It still needs the computer to think", "It sends your movements to the internet", "It only works while CreateAI is open"]
      answer: 0
      explain: "The model is copied into the micro:bit's program. A V2 runs it by itself, like the model in a smartwatch."
```

### A sample

### A friend's run

### Where it runs

## Improve the model

```step
stage: modify
insight: "Testing on someone who didn't train it, and adding what they do differently, makes the model work for more people."
tasks:
  - check: { type: reflect, text: "A partner who didn't train the model tested each action; I added samples of the ones it got wrong and retrained." }
  - check: { type: reflect, text: "I recorded still samples that include fidgeting and shuffling, so standing around is not mistaken for walking." }
```

### Partner test

Swap micro:bits with a partner. Test each other's models: do each action three times. Add samples of the actions it got wrong (yours and theirs), retrain, and test again.

### Not quite still

Real "still" includes fidgeting and shifting your weight. Record still samples that include those.

## Make

```step
stage: make
check: { type: reflect, text: "My activity model recognises each of my four actions three times in a row for someone who didn't train it." }
```

Finish an **activity model** that recognises still, walking, running and jumping for **someone who didn't train it**: three times in a row for each action. Keep the CreateAI session open (or save it): next lesson you code with it.
