---
order: 4
unit: signs
title: "Signs: some mistakes cost more"
summary: Mistaking Stop for Go is worse than mistaking Left for Right, so the robot should need more confidence before a risky action than a safe one. The board asks 95% for Go and 70% for the rest; the robot also waits for Go twice in a row.
language: makecode
extensions: [robot]
explainPicture: robot.ts#predict
hook: "A self-driving car that brakes for a plastic bag is annoying. One that drives through a stop sign is dangerous. Its designers make it much more careful about some decisions than others."
---
This time the model reads **printed signs**: [print the four signs](../../../_playground-board/media/classifier/signs/print.html) (**Go**, **Left**, **Right**, **Stop**) and train a class for each, holding the sign at different distances, angles and light.

The board on this page does not treat every label the same: it sends **Go** only when the model is **95%** sure, and the others at **70%**. Anything less is **Unsure**.

## Predict

```step
stage: predict
check:
  type: predict
  q: "The robot is near the edge of a table. Which mistake by the model is worst?"
  options: ["Seeing Go when the sign says Stop", "Seeing Left when the sign says Right", "Seeing Stop when the sign says Go", "Seeing Unsure when the sign says Left"]
  actual: "Seeing Go when the sign says Stop: the robot drives off the table. The other mistakes waste time; this one breaks something. So Go should need the most confidence."
```

## Run

```step
stage: run
code: robot.ts#predict
try: { playground: microbit, starter: "robot.ts#predict" }
check: { type: reflect, text: "I drove the other robot with A, B, A+B and the logo, and let it stop by itself." }
```

The robot is last lesson's, with Go in place of Forward: **A** Left, **B** Right, **A+B** Go, **logo** Stop. Without new labels, the watchdog stops it after two seconds.

## Read the signs

```step
stage: run
tier: typical
insight: "A borderline Go becomes Unsure while a borderline Left still counts: the same model behaves more carefully exactly where a mistake costs more."
try: { playground: board, starter: "boards.yml#signs", height: 700 }
check: { type: board, text: "Drive with the signs: send Go and Stop, and find a way of holding Go that makes the board say Unsure.", when: "sent_go >= 1 and sent_stop >= 1 and sent_unsure >= 1" }
```

Show **Go** far away, tilted or half covered. Watch the label on the board: when is Go sent, and when does it say Unsure? Try the same with **Left**.

## Investigate

```step
stage: investigate
insight: "A threshold trades caution for speed: a higher one means fewer wrong Gos but more Unsures (stops). Put the high threshold where a mistake costs most."
tasks:
  - check:
      type: question
      q: "What happens if Go also needed only 70%?"
      options: ["The robot moves sooner, but a Stop sign mistaken for Go now and then makes it drive on", "Nothing changes", "The robot never moves", "The model gets more accurate"]
      answer: 0
      explain: "A lower threshold sends Go more often, including the times the model is wrong."
  - check:
      type: question
      q: "What happens if every label needed 95%?"
      options: ["The robot is very safe but often stops (Unsure) when a sign is clear enough to a person", "It drives faster", "Nothing changes", "It ignores Stop"]
      answer: 0
      explain: "Too much caution everywhere makes a robot that keeps stopping. Caution goes where mistakes are costly."
  - check:
      type: sort
      q: "Sort each decision: should it need high confidence or is lower fine?"
      options: ["High confidence", "Lower is fine"]
      items:
        - ["A car decides the road ahead is clear", "High confidence"]
        - ["A music app guesses which song to play next", "Lower is fine"]
        - ["A robot decides it is safe to drive forward", "High confidence"]
        - ["A photo app suggests who might be in a picture, for you to confirm", "Lower is fine"]
```

### Lower

### Higher everywhere

### Where caution goes

## Modify

```step
stage: modify
insight: "The robot can add its own caution: act on a Stop at once, but act on Go only when it has heard it twice in a row."
try: { playground: microbit, starter: "robot.ts#predict" }
tasks:
  - hint: "In on radio received string, after setting the mode: if mode = Stop, then robot motor stop, set color red and play a tone."
    check: { type: code, text: "Stop acts at once, as soon as it arrives: the robot stops, turns red and beeps.", rules: { inside: { "radio.onReceivedString": ["mode==\"Stop\"", "robot.motorStop()", "robot.setColor(0xff0000)", "robot.playTone("] } } }
  - hint: ["Make a variable goCount. In on radio received string: if the word is Go, change goCount by 1, else set it to 0.", "In forever, drive forward only if mode = Go and goCount ≥ 2 (Logic › and)."]
    check: { type: code, text: "The robot drives forward only after hearing Go twice in a row.", rules: { contains: ["goCount+=1", "goCount=0", "mode==\"Go\"&&goCount>=2"] } }
```

### Stop at once

Make **Stop** act the moment it arrives, without waiting for forever: stop, red lights, a beep.

### Go twice

The board repeats each label every second, so "Go twice in a row" means about a second of steady Go. Make the robot wait for that before driving.

## Make

```step
stage: make
try: { playground: microbit, starter: "robot.ts#make" }
hint:
  - "Start from what you built: goCount, lastHeard and the watchdog."
  - "Lights: green going, yellow turning, red stopped. Go a little slower (40) so there is time to react."
check: { type: code, text: "A careful sign robot: Go only after two Gos in a row, Left and Right turn, anything else (Stop, Unsure, a word it doesn't know, or silence) stops it, with green, yellow and red lights.", rules: { contains: ["goCount>=2", "input.runningTime()-lastHeard>", "robot.setColor(0x00ff00)", "robot.setColor(0xffff00)", "robot.setColor(0xff0000)", "robot.motorStop()"] } }
```

Make a **careful sign robot**: **Go** only after hearing it twice in a row, **Left** and **Right** turn, and **anything else** (Stop, Unsure, a word it doesn't know, or two seconds of silence) stops it. Lights: **green** going, **yellow** turning, **red** stopped.
