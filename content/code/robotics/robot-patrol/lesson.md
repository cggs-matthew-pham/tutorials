---
order: 11
unit: challenge
title: Patrol and alert
summary: Build a patrol system in three milestones, a robot and a base that talk both ways, then add an alert log and status lights.
language: makecode
extensions: [robot]
explainPicture: patrol.ts#predict
hook: "Hospitals use robots to carry medicines along set routes, and farms use them to check fences. A person starts and stops them from a base and hears from them only when something is wrong."
---
The assistance challenge puts the course together in a **patrol system**. A robot follows the line (lesson 5) and stops when blocked (lesson 3). A **base** station starts and stops it by radio (lesson 7), and the robot reports problems back once (lesson 9). The robot remembers its job in a **mode** variable (lesson 6). You will build it in three milestones, with less help each time.

As in lesson 9, both micro:bits run the same program: press **A+B** to make one of them the base.

## Predict

```step
stage: predict
code: patrol.ts#predict
check:
  type: predict
  q: "This is where the patrol starts: a robot on its own. You drag a box onto the line in front of it, then drag it away. What happens?"
  options: ["It stops at the box, then carries on along the line once the box is gone", "It stops at the box and never moves again", "It drives round the box", "It follows the line straight into the box"]
  actual: "It stops, then carries on. forever asks about the distance first; while the box is close it stops, and once the way is clear, followLine takes over again."
```

## Run

```step
stage: run
code: patrol.ts#predict
try: { playground: microbit, starter: "patrol.ts#predict" }
check: { type: reflect, text: "I blocked the robot with a box, moved the box away, and watched it carry on." }
```

Drag a box onto the line in front of the robot, wait, then drag it away.

## Investigate

```step
stage: investigate
code: patrol.ts#predict
insight: "In a two-way system each side has its own jobs. Radio handlers only change what the robot remembers (its mode); forever does the driving."
tasks:
  - check:
      type: sort
      q: "In the full patrol system, which jobs belong to the robot, and which to the base?"
      options: ["Robot", "Base"]
      items:
        - ["Follow the line", "Robot", "The robot does the patrolling."]
        - ["Send 'go' and 'stop'", "Base", "A person at the base decides when the patrol runs."]
        - ["Notice something in the way", "Robot", "Only the robot has the distance sensor."]
        - ["Beep and show an X when told of a problem", "Base", "The base alerts the person."]
        - ["Send 'blocked' once", "Robot", "The robot reports what it found."]
  - check:
      type: question
      q: "Jack's robot only twitches when the base sends 'go': it moves for a moment, then stops. Why?"
      options: ["The radio is too weak", "He follows the line inside the radio handler, which runs once per message; nothing keeps the robot patrolling", "He needs a bigger speed", "'go' is the wrong word"]
      answer: 1
      fault: design
      misconception: run-once-vs-forever
      explain: "A radio handler runs once, when the message arrives, so followLine runs once. The handler should only set mode to patrol; forever then calls followLine again and again."
```

### Who does what?

Sort each job to the robot or the base.

### Jack's patrol

Jack's robot, when it hears a message:

```makecode
radio.onReceivedString(function (receivedString) {
    if (receivedString == "go") {
        followLine()
    }
})
```

## Milestone 1: start and stop from the base

```step
stage: modify
insight: "A message changes the mode; forever does the job for the mode."
try: { playground: microbit, starter: "patrol.ts#m1" }
hint:
  - "On the base: A sends the word go, B sends stop (send string, in Radio)."
  - "on radio received receivedString: if role = robot, then set mode to patrol for go, or stop for stop. Set mode to stop in on start."
  - "In forever, inside the robot's if: if mode = patrol, follow the line; else, robot motor stop."
check: { type: code, text: "The base's A sends 'go' and B sends 'stop'; the robot patrols only while its mode is patrol.", rules: { contains: ["radio.sendString(\"go\")", "radio.sendString(\"stop\")", "mode=\"patrol\"", "mode==\"patrol\""] } }
```

The robot follows the line from the moment it starts. Put the base in charge:

1. On the base, **A** sends **"go"** and **B** sends **"stop"**.
2. When a robot hears a message, it sets its **mode**: "patrol" for go, "stop" for stop. It starts in "stop".
3. In **forever**, the robot follows the line only when its mode is "patrol"; otherwise it stops.

## Milestone 2: report back

```step
stage: modify
insight: "Two-way radio needs a few agreed words, each sent once, with each side knowing what they mean."
try: { playground: microbit, starter: "patrol.ts#sol-m1" }
hint:
  - "While patrolling: if the distance is less than 15, stop, and send 'blocked' if not alerted (then set alerted to true). Else send 'clear' if alerted, set alerted to false, and follow the line."
  - "On the base, in on radio received: else if role = base, show an X and beep for 'blocked', and a tick for 'clear'."
check: { type: code, text: "The patrolling robot stops when blocked and tells the base once ('blocked', then 'clear'); the base shows an X and beeps, then a tick.", rules: { contains: ["radio.sendString(\"blocked\")", "radio.sendString(\"clear\")", "alerted=true"], inside: { "radio.onReceivedString": ["IconNames.No", "IconNames.Yes"] } } }
```

Make the robot report problems:

- While patrolling, if something is in the way, the robot **stops** and sends **"blocked"**, once.
- When the way is clear again, it sends **"clear"**, once, and carries on.
- The base shows an **X** and beeps for blocked, and a **tick** for clear.

## Milestone 3: a log and status lights

```step
stage: make
insight: "A finished system tells people what is happening: a log of what went wrong, and a status you can see from across the room."
try: { playground: microbit, starter: "patrol.ts#sol-m2" }
hint:
  - "A variable alerts on the base: change by 1 for each 'blocked'. The logo shows it."
  - "robot set color in three places: green while patrolling, red when blocked, off when stopped."
check: { type: code, text: "The base counts the alerts and shows the count on its logo; the robot's lights show green (patrolling), red (blocked) or off (stopped).", rules: { contains: ["+=1", "input.onLogoEvent("], count: { "robot.setColor(": 3 } } }
```

Finish the system:

- The base keeps a **log**: it counts the alerts and shows the count when its **logo** is touched.
- The robot shows its status in its lights: **green** while patrolling, **red** when blocked, **off** when stopped.

Then make it yours: a hospital delivery robot, a fence checker or a warehouse patrol. Change the messages and pictures to suit.

## On a real robot

```step
stage: info
```

Set up a tape loop and put a bare micro:bit with a person as the base (press A+B on it). Things to notice:

- Every patrol team needs its own radio group.
- A real robot stops at people's feet too: that is a feature, not a bug.
- If the robot goes out of radio range its messages are lost. What should a real patrol robot do then? (Real ones store them and send them later.)
