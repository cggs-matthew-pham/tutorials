---
order: 7
unit: createai
title: Code with ML blocks
summary: The Machine Learning blocks run code when the model's estimated action changes. on ML start runs once when an action begins, not again while it carries on, and unknown means no action is sure enough.
language: makecode
extensions: [ml]
explainPicture: ml.ts#predict
hook: "A fitness band buzzes when you've been sitting for an hour and counts each rep at the gym. Its model says what you're doing; its program decides what to do about it."
---
CreateAI's **Edit in MakeCode** button opens your model in MakeCode with a **Machine Learning** blocks category. The blocks run your code when the model's **estimated action** changes.

Here, the editor has **practice actions** (still, walking, running, jumping, waving, clapping) instead of a trained model. In the simulator, a panel beside the micro:bit lets you **choose the action** the model "sees". On a real micro:bit, you put the same code into the project CreateAI opens for your own model.

## Predict

```step
stage: predict
code: ml.ts#predict
check:
  type: predict
  q: "You do three jumps without stopping, and the model estimates jumping the whole time. What does the micro:bit show?"
  options: ["1", "3", "Lots of numbers, counting up fast", "Nothing"]
  actual: "1. on ML jumping start runs once, when the estimated action changes to jumping. Three jumps in a row are one stretch of jumping."
```

## Run

```step
stage: run
code: ml.ts#predict
try: { playground: microbit, starter: "ml.ts#predict" }
check: { type: reflect, text: "I chose jumping, then still, then jumping again in the simulator's ML panel, and watched the count." }
```

In the ML panel beside the simulator, choose **jumping**, then **still**, then **jumping** again. When does the count go up?

## Investigate

```step
stage: investigate
code: ml.ts#predict
insight: "Start and stop events mark changes in the estimated action; unknown is what the model says when no action reaches its recognition point, and it needs a sensible response too."
tasks:
  - check:
      type: question
      q: "To count every jump in a long stretch of jumping, what would you need?"
      options: ["A model trained on single jumps, with something else (such as still) between them", "A faster micro:bit", "is ML jumping detected in forever, adding 1 each time round", "Nothing: on ML start already counts every jump"]
      answer: 0
      explain: "The model estimates an action several times a second; the start event fires only when it changes. Counting each jump means each jump must be its own change. is detected in forever would count many times per jump."
  - check:
      type: question
      q: "What does the unknown action mean?"
      options: ["No action is certain enough (above its recognition point)", "The micro:bit is broken", "The model is still training", "A new action the model has learned by itself"]
      answer: 0
      explain: "Like Unsure in the AI robots lessons: when nothing is certain enough, the estimate is unknown. Your program can show it, or do nothing."
  - check:
      type: question
      q: "on ML running stop gives a duration. What is it?"
      options: ["How many milliseconds running lasted, just now", "How far you ran", "How many times you ran", "The certainty of running"]
      answer: 0
      explain: "When the estimate changes away from running, the stop event runs and tells you how long running was the estimate. Add the durations up for total running time."
```

### Counting jumps

### Unknown

### Stop and duration

## Modify

```step
stage: modify
insight: "Stop events with a duration turn a stream of estimates into totals; handling unknown makes the display honest."
try: { playground: microbit, starter: "ml.ts#predict" }
tasks:
  - hint: ["on ML stop (with duration) is in Machine Learning. Choose running.", "Inside it: change running by duration. On button A: show number running ÷ 1000 (rounded)."]
    check: { type: code, text: "Keep a total of running time, and show it in seconds when A is pressed.", rules: { inside: { "ml.onStopDetailed(ml.event.Running": ["running+=duration"], "input.onButtonPressed": ["basic.showNumber("] } } }
  - hint: "on ML start, then choose unknown in the dropdown: show string ?"
    check: { type: code, text: "Show ? when the model isn't sure of any action.", rules: { inside: { "ml.onStart(ml.event.Unknown": ["basic.showString(\"?\")"] } } }
```

### Running time

Keep a **total of running time** and show it in seconds when **A** is pressed. Test it: choose running, wait, then still.

### Not sure

Show **?** when the model isn't sure of any action (**unknown**).

## Make

```step
stage: make
try: { playground: microbit, starter: "ml.ts#make" }
hint:
  - "One on ML start for each action: still, walking, running, jumping, and unknown."
  - "Jumps and running time from earlier. Button A: serial write value jumps, and running (in seconds)."
check: { type: code, text: "An activity tracker: an icon for still, walking and running, a jump count, a clear screen for unknown, total running time, and A sends jumps and running to the computer.", rules: { contains: ["ml.onStart(ml.event.Still", "ml.onStart(ml.event.Walking", "ml.onStart(ml.event.Running", "ml.onStart(ml.event.Jumping", "ml.onStart(ml.event.Unknown", "running+=duration", "serial.writeValue(\"jumps\"", "serial.writeValue(\"running\""] } }
```

Make an **activity tracker**: a picture for **still**, **walking** and **running**, a **jump count**, a blank screen for **unknown**, total **running time**, and button **A** sends the jumps and running seconds to the computer (as in Send data to the computer).

## On your own model

```step
stage: info
```

- Open your model from last lesson in CreateAI and click **Edit in MakeCode**. Your actions are named as you trained them, so choose them in the dropdowns.
- Copy your tracker's blocks across (or rebuild them), **Download** to a **V2** micro:bit, unplug it, add the battery pack: it runs with no computer.
- Plug it back in and press **A** with the board from **Send data to the computer** open to see the totals.
