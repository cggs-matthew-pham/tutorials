---
title: "A wrist remote"
subtitle: "AI robots · Drive with a model · Lesson 2"
---

# A wrist remote

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Some controllers for drones and assistive devices are worn on the wrist or hand: tilt to steer, hold still to stop. The model lives in the controller, so there is no camera to point and no laptop to carry.


:::teacher-note

**In one sentence:** Students drive the robot from a wrist micro:bit running a CreateAI movement model, so the model runs on the remote and the robot's program is unchanged.

**Students should be able to say:** I can turn a micro:bit model's actions into radio commands. I can explain why the robot's program doesn't change when the model does. I can make the remote send a safe command when the model is unsure.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/64727c79ab25.png?v=e307d2015bb5fa25)

:::keep-together

**You swap the webcam model for this wrist remote. What has to change in the robot's part of the program?**

☐ Nothing: it still receives the same words

☐ It needs a camera

☐ It needs the bridge program

☐ It needs the Machine Learning blocks

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Nothing. The robot only ever sees the words Forward, Left, Right and Stop. It doesn't matter whether a webcam model or a wrist model sent them.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}


:::typical

## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

:::


## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/64727c79ab25.png?v=e307d2015bb5fa25)

:::keep-together

### Unknown

**The wrist model isn't sure of any action (unknown). What does this program send?**

☐ Unknown

☐ Forward

☐ Nothing, so the robot keeps doing whatever it was doing

☐ Stop

:::


:::teacher-note

**Answer:** Nothing, so the robot keeps doing whatever it was doing

There is no on ML unknown start, so nothing is sent and the robot keeps its last mode. Sending Stop for unknown is the safe choice.

:::


:::keep-together

### Holding a tilt

**You hold your hand tipped forward for ten seconds. How many times does the wrist send Forward?**

☐ Several times a second

☐ Ten times

☐ Never

☐ Once, when the action starts

:::


:::teacher-note

**Answer:** Once, when the action starts

on ML start runs when the estimated action changes, so one Forward. If the radio message is lost, the robot never hears it: the next lesson's watchdog and repeated labels deal with that.

:::


:::keep-together

### Which model where

**Webcam model on the computer, or wrist model on the micro:bit: which suits each?**

Groups: Webcam model, Wrist model

- Reading printed signs held up to the robot's route: {{field-15}}
- Steering with no laptop nearby, outside: {{field-15}}
- Recognising what an object looks like: {{field-15}}
- Nothing about you is seen or sent anywhere: {{field-15}}

:::


:::teacher-note

**Answer:** Reading printed signs held up to the robot's route → Webcam model; Steering with no laptop nearby, outside → Wrist model; Recognising what an object looks like → Webcam model; Nothing about you is seen or sent anywhere → Wrist model

:::


:::typical

## Modify


**Unsure means stop.** 

**Show what you sent.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Unsure means stop:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/8370d970b3cd.png?v=5f879e4f48e40135)

**Show what you sent:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/61ae41de2dac.png?v=be85f65b744116ce)

:::

:::


## Make

Make a **full wrist remote**: Forward, Left, Right, a **Spin** (jumping, or a flick you train) and Stop, with **unknown** sending Stop and the wrist showing each command. Add Spin to the robot's part.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/e120c9ecc6cd.png?v=5cc56948421afc29)

:::


## Exit ticket

:::keep-together

**Why didn't the robot's program change when the webcam model was replaced by a wrist model?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The robot only receives words. As long as the new model sends the same words, the robot doesn't care where they came from.

:::

