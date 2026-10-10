---
order: 2
unit: drive
title: A wrist remote
summary: A model can run on the remote itself. A wrist micro:bit running a CreateAI model turns its own movements into the same words the webcam sent, so the robot's program doesn't change and no computer or camera is needed.
language: makecode
extensions: [robot, ml]
explainPicture: wrist.ts#predict
hook: "Some controllers for drones and assistive devices are worn on the wrist or hand: tilt to steer, hold still to stop. The model lives in the controller, so there is no camera to point and no laptop to carry."
---
Last lesson, a model on the **computer** watched your hand through the webcam, and the bridge sent its labels to the robot. In **AI on the micro:bit** (micro:bit and the computer) you trained a model on **movements** that runs on the micro:bit itself. Put that micro:bit on your **wrist** and it can be the remote: each action it recognises becomes a radio command.

In the simulator, one program holds both parts and the **ML panel** chooses the action. The practice actions stand in for the ones you will train: **walking** for push forward, **waving** for tilt left, **clapping** for tilt right, **still** for stop.

## Predict

```step
stage: predict
code: wrist.ts#predict
check:
  type: predict
  q: "You swap the webcam model for this wrist remote. What has to change in the robot's part of the program?"
  options: ["Nothing: it still receives the same words", "It needs the Machine Learning blocks", "It needs the bridge program", "It needs a camera"]
  actual: "Nothing. The robot only ever sees the words Forward, Left, Right and Stop. It doesn't matter whether a webcam model or a wrist model sent them."
```

## Run

```step
stage: run
code: wrist.ts#predict
try: { playground: microbit, starter: "wrist.ts#predict" }
check: { type: reflect, text: "I chose walking, waving, clapping and still in the ML panel and watched the other robot follow." }
```

Open the editor full screen. In the ML panel, choose **walking**, then **waving**, **clapping** and **still**, and watch the **other** robot.

## On your wrist

```step
stage: run
tier: typical
insight: "With a real model on a real wrist, the whole system runs on two micro:bits and batteries: the model's decision travels as a word, as before."
check: { type: reflect, text: "I trained four tilt actions in CreateAI, added the radio blocks in Edit in MakeCode, and drove the robot from my wrist." }
```

1. In [CreateAI](https://createai.microbit.org/), train four actions with the micro:bit on your wrist: **forward** (tip your hand forward), **left**, **right** (tip it sideways) and **still**.
2. Click **Edit in MakeCode** and add **radio send string** to each **on ML … start**, with the same words as the robot uses, and **radio set group** to match. Download it to the **V2** on your wrist.
3. Download the robot part (from the Run step) to the robot's micro:bit.

## Investigate

```step
stage: investigate
code: wrist.ts#predict
insight: "The model now runs on the remote: no camera, no computer, but the same rules apply: words must match, an unsure model needs a safe word, and the robot keeps its last mode."
tasks:
  - check:
      type: question
      q: "The wrist model isn't sure of any action (unknown). What does this program send?"
      options: ["Nothing, so the robot keeps doing whatever it was doing", "Stop", "Forward", "Unknown"]
      answer: 0
      explain: "There is no on ML unknown start, so nothing is sent and the robot keeps its last mode. Sending Stop for unknown is the safe choice."
  - check:
      type: question
      q: "You hold your hand tipped forward for ten seconds. How many times does the wrist send Forward?"
      options: ["Once, when the action starts", "Ten times", "Several times a second", "Never"]
      answer: 0
      explain: "on ML start runs when the estimated action changes, so one Forward. If the radio message is lost, the robot never hears it: the next lesson's watchdog and repeated labels deal with that."
  - check:
      type: sort
      q: "Webcam model on the computer, or wrist model on the micro:bit: which suits each?"
      options: ["Webcam model", "Wrist model"]
      items:
        - ["Reading printed signs held up to the robot's route", "Webcam model"]
        - ["Steering with no laptop nearby, outside", "Wrist model"]
        - ["Recognising what an object looks like", "Webcam model"]
        - ["Nothing about you is seen or sent anywhere", "Wrist model"]
```

### Unknown

### Holding a tilt

### Which model where

## Modify

```step
stage: modify
insight: "The remote's job is choosing words; showing what it sent and sending Stop for unknown make it honest and safe."
try: { playground: microbit, starter: "wrist.ts#predict" }
tasks:
  - hint: "Add on ML start, choose unknown, and send Stop."
    check: { type: code, text: "When the wrist model is unsure (unknown), send Stop.", rules: { inside: { "ml.onStart(ml.event.Unknown": ["radio.sendString(\"Stop\")"] } } }
  - hint: "In each on ML start, after sending: show arrow (north, west, east), and a square for still."
    check: { type: code, text: "The wrist shows an arrow for each command it sends, and a square for Stop.", rules: { count: { "basic.showArrow(": 3 }, contains: ["basic.showIcon(IconNames.Square)"] } }
```

### Unsure means stop

### Show what you sent

## Make

```step
stage: make
try: { playground: microbit, starter: "wrist.ts#make" }
hint:
  - "Wrist: one on ML start per action, each sending a word and showing what it sent; jumping sends Spin; unknown sends Stop."
  - "Robot: in forever, one branch per word, with Spin as motor tank 60 −60, and else stop."
check: { type: code, text: "A full wrist remote: Forward, Left, Right, Spin (jumping) and Stop, unknown sends Stop, the wrist shows each command, and the robot drives each one.", rules: { contains: ["ml.onStart(ml.event.Jumping", "radio.sendString(\"Spin\")", "ml.onStart(ml.event.Unknown", "mode==\"Spin\"", "robot.motorTank(60,-60)", "robot.motorStop()"], count: { "radio.sendString(": 6 } } }
```

Make a **full wrist remote**: Forward, Left, Right, a **Spin** (jumping, or a flick you train) and Stop, with **unknown** sending Stop and the wrist showing each command. Add Spin to the robot's part.
