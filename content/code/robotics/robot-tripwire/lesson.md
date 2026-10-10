---
order: 12
unit: challenge
optional: true
title: Tripwire
summary: Two robots work together. One stands still as a tripwire and, when the other passes, cues it to do a trick.
language: makecode
extensions: [robot]
explainPicture: tripwire.ts#predict
hook: "Factories put sensors beside conveyor belts: when a box passes, the next machine is told to act. Shops use beams at the door to tell a speaker to chime. One device notices, another acts."
---
An optional challenge: two robots working as a **team**. One robot stands beside the track as a **tripwire**: its distance sensor watches the line. The other robot **patrols**. When the patrol robot passes in front of the tripwire, the tripwire sends a cue by radio, and the patrol robot does a **trick**.

Both robots run the same program. Press **A+B** on a micro:bit to make its robot the tripwire, then **drag** that robot beside the line, facing it. The simulator's distance sensor sees other robots as well as boxes.

## Predict

```step
stage: predict
code: tripwire.ts#predict
check:
  type: predict
  q: "The second robot is the tripwire, beside the line and facing it. What does the tripwire's micro:bit show as the first robot passes?"
  options: ["A surprised face while the robot is in front, then the target again", "A surprised face that stays for ever", "Nothing: a tripwire cannot see robots", "The first robot stops at the tripwire"]
  actual: "A surprised face while the patrol robot is closer than 20 cm, then the target again once it has passed. The tripwire checks again every time round."
```

## Run

```step
stage: run
code: tripwire.ts#predict
try: { playground: microbit, starter: "tripwire.ts#predict" }
check: { type: reflect, text: "I made one robot the tripwire, put it beside the line, and watched it notice the other robot." }
```

Press **A+B** on the second micro:bit. Drag its robot next to the line, pointing at it, about a hand's width away in the simulator. Watch its micro:bit as the first robot goes past.

## Investigate

```step
stage: investigate
code: tripwire.ts#predict
insight: "A tripwire must fire once per pass. Arming and disarming with a true/false variable gives one cue per pass; the robot that gets the cue does its trick in forever, not in the handler."
tasks:
  - check:
      type: question
      q: "Ivy's tripwire sends 'trick' whenever something is closer than 20 cm. Her patrol robot starts its trick again and again as it passes. Why?"
      options: ["Her radio group is wrong", "The robot is in front of the tripwire for many times round forever, so 'trick' is sent many times", "The trick is too long", "Tripwires only work once"]
      answer: 1
      fault: logic
      misconception: alert-repeats
      explain: "forever runs many times while the robot is passing, so the cue is sent many times. Like alerted in lesson 9, an armed variable lets the tripwire fire once, then wait."
  - check:
      type: question
      q: "When the patrol robot hears 'trick', why should the handler only set mode to trick, instead of doing the moves itself?"
      options: ["Handlers cannot use motor blocks", "forever is calling followLine again and again, which would undo the trick's moves straight away", "It saves battery", "The handler runs too late"]
      answer: 1
      explain: "Handlers and forever run side by side. forever keeps setting the motors for line following, so moves made in a handler are overwritten. Setting the mode lets forever do the trick itself, then go back to patrolling."
```

### Ivy's tripwire

Ivy's tripwire, in forever:

```makecode
basic.forever(function () {
    if (role == "tripwire") {
        if (robot.obstacleDistance() < 20) {
            radio.sendString("trick")
        }
    }
})
```

### Who moves the motors?

Think about what forever is doing while the message arrives.

## Milestone 1: arm and fire

```step
stage: modify
insight: "Arm, fire once, disarm: a true/false variable turns a sensor into a one-shot trigger."
try: { playground: microbit, starter: "tripwire.ts#predict" }
hint:
  - "Make a variable armed. On button A: if role = tripwire, set armed to true and show a tick."
  - "In the tripwire's part of forever: if armed and distance < 20, set armed to false, send the word trick, and show a cross."
check: { type: code, text: "A arms the tripwire; when the robot passes, it sends 'trick' once and disarms.", rules: { contains: ["armed=true", "armed=false", "radio.sendString(\"trick\")"] } }
```

Turn the tripwire into a one-shot trigger:

- Pressing **A** on the tripwire **arms** it (show a tick).
- When something passes while it is armed, it sends **"trick"**, **disarms** itself, and shows a cross.

## Milestone 2: the trick

```step
stage: modify
insight: "The handler changes the mode; forever does the trick, then goes back to patrolling."
try: { playground: microbit, starter: "tripwire.ts#sol-m1" }
hint:
  - "Make a variable mode, set to patrol in on start. on radio received: if role = robot and the word is trick, set mode to trick."
  - "In the robot's part of forever: if mode = trick, do the trick (lights and a wiggle), then set mode back to patrol; else follow the line."
check: { type: code, text: "When the patrol robot hears 'trick', it does a trick with its lights, then carries on patrolling.", rules: { contains: ["mode=\"trick\"", "mode==\"trick\"", "mode=\"patrol\""] } }
```

Make the patrol robot do a **trick** when it is cued: lights on, a quick wiggle, lights off, then back to patrolling. Keep the trick short and finish facing the same way, so the robot can find the line again.

## Milestone 3: a self-resetting tripwire

```step
stage: make
insight: "Two devices, each with its own job and memory, working together over radio: that is a small system."
try: { playground: microbit, starter: "tripwire.ts#sol-m2" }
hint:
  - "After the tripwire fires: count the pass (a variable passes, change by 1), show it, pause 5 seconds, then arm again."
  - "Add a sound to the trick with play tone … in background, so the robot keeps moving."
check: { type: code, text: "The tripwire counts the passes, shows the count and re-arms itself; the trick plays a sound.", rules: { contains: ["+=1", "music.play("], count: { "armed=true": 2 } } }
```

Make the team run by itself:

- The tripwire **counts** the passes and shows the count.
- It **re-arms itself** a few seconds after it fires, ready for the next lap.
- The trick plays a **sound** as well.

## On a real robot

```step
stage: info
```

With real robots, the tripwire can be a robot or just a micro:bit with an ultrasonic sensor. Place it a short distance from the track, facing across it. Real readings jump about, so you may need a range (for example between 5 and 20 cm) to ignore false readings near zero.
