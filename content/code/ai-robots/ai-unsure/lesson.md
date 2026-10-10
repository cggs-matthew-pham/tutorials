---
order: 3
unit: drive
title: When the model is unsure
summary: A robot driven by a model needs a safe action for when the model is unsure and for when it goes quiet. The board sends Unsure and repeats its label; the robot stops on Unsure, and a watchdog stops it when nothing arrives.
language: makecode
extensions: [robot]
explainPicture: robot.ts#predict
hook: "A delivery robot loses its connection in a lift. Should it keep rolling the way it was going, or stop and wait? Safety engineers decide this before anything is built."
---
In Drive with gestures, the robot kept going when your hand left the camera (and a wrist remote only sends when its action changes). Two things fix that:

- The board sends **Unsure** when no label is confident enough (it needs 80% here), so the robot can stop.
- The board sends the current label **again every second**. If the robot hears **nothing** for two seconds (the laptop sleeps, the cable comes out, the robot drives out of radio range), a **watchdog** stops it.

In the simulator, **A+B** sends Forward **once**, like a model that then goes quiet, and **B** sends Unsure.

## Predict

```step
stage: predict
code: robot.ts#predict
check:
  type: predict
  q: "You press A+B once, then nothing else. What does the other robot do?"
  options: ["Drives forward for about two seconds, then stops", "Drives forward and never stops", "Doesn't move", "Stops at once"]
  actual: "About two seconds forward, then it stops. Each message resets lastHeard; when two seconds pass with no message, the watchdog sets the mode to Stop."
```

## Run

```step
stage: run
code: robot.ts#predict
try: { playground: microbit, starter: "robot.ts#predict" }
check: { type: reflect, text: "I pressed A+B once and saw the robot stop by itself, then pressed B to send Unsure." }
```

Press **A+B** once and count. Then press A+B and, before it stops, **B**.

## With your model

```step
stage: run
tier: typical
insight: "With a real model, half-shown gestures and an empty frame produce Unsure, and the robot stops instead of carrying on."
try: { playground: board, starter: "boards.yml#unsure", height: 700 }
check: { type: board, text: "Show a gesture half in the frame, or none, until the board sends Unsure.", when: "sent_unsure >= 1 and sent_forward >= 1" }
```

Use your model from last lesson and the same bridge. Show **Forward**, then slide your hand half out of the frame. The board shows **Unsure** and sends it. Then unplug the bridge for three seconds: the robot stops by itself.

## Investigate

```step
stage: investigate
code: robot.ts#predict
insight: "Unsure covers a model that can't decide; the watchdog covers silence. Both lead to the safe action, stop, and the repeated label keeps a working robot from tripping the watchdog."
tasks:
  - check:
      type: match
      q: "Match each problem with what keeps the robot safe."
      pairs:
        - ["The model is 55% Forward and 45% Left", "the board sends Unsure, and the robot stops"]
        - ["The laptop goes to sleep", "the watchdog stops the robot after 2 seconds of silence"]
        - ["The model sends a word the robot doesn't know", "else: stop"]
  - check:
      type: question
      q: "The board stopped repeating the label every second, and only sent it when it changed. What would happen when you hold Forward steadily?"
      options: ["The robot stops after 2 seconds, even though you're still showing Forward", "Nothing different", "The robot speeds up", "The watchdog never runs"]
      answer: 0
      explain: "The watchdog can't tell silence because nothing changed from silence because something broke. Repeating the label every second says: still here, still Forward."
  - check:
      type: question
      q: "Why stop, rather than keep doing the last thing, when unsure?"
      options: ["For a moving robot, stopping is the action least likely to hurt someone or break something", "Stopping saves battery", "The model needs the robot still to retrain", "It is the only action robots can do"]
      answer: 0
      explain: "A safe default depends on the machine: for a robot on wheels it is stop. (For a plane it would not be!)"
```

### Unsure or silent

### Why repeat

### Why stop

## Modify

```step
stage: modify
insight: "The watchdog's time and the Unsure action are design choices: shorter is safer but less forgiving of a slow connection."
try: { playground: microbit, starter: "robot.ts#predict" }
tasks:
  - hint: "Change 2000 to 1000 in the watchdog's if."
    check: { type: code, text: "Make the watchdog stop the robot after one second of silence.", rules: { contains: ["input.runningTime()-lastHeard>1000", "mode=\"Stop\""] } }
  - hint: "Add an else if: mode = Unsure, then robot motor stop and robot set color yellow."
    check: { type: code, text: "When Unsure, stop and show yellow lights, so you can see why it stopped.", rules: { inside: { "basic.forever": ["mode==\"Unsure\"", "robot.setColor(0xffff00)"] } } }
```

### A quicker watchdog

### Show unsure

## Make

```step
stage: make
try: { playground: microbit, starter: "robot.ts#make" }
hint:
  - "Remember when the last message arrived (lastHeard = running time) in on radio received string."
  - "In forever: if running time − lastHeard > 1500, set the mode to Lost. Beep once when it first becomes Lost (only if the mode wasn't Lost already)."
check: { type: code, text: "A lost-signal alarm: after 1.5 seconds of silence the robot stops, shows red lights and beeps once; any new label sets it going again.", rules: { inside: { "radio.onReceivedString": ["lastHeard=input.runningTime()"], "basic.forever": ["input.runningTime()-lastHeard>1500", "robot.playTone(", "robot.setColor(0xff0000)", "robot.motorStop()"] } } }
```

This starter has **no watchdog**. Add one that, after **1.5 seconds** of silence, stops the robot, turns its lights **red** and **beeps once**. Any new label should set it going again.
