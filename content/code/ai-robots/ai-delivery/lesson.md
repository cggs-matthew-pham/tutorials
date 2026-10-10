---
order: 5
unit: challenge
title: Delivery robot
summary: Build a sign-driven delivery robot in three milestones. Its own distance sensor overrules the model, it reports back through the bridge, and it counts its deliveries.
language: makecode
extensions: [robot]
explainPicture: robot.ts#predict
hook: "Delivery robots on footpaths and in hospitals follow instructions, but their own sensors always get the last word: if something is in the way, they stop, whatever they were told."
---
The challenge puts the course together. You start from your **careful sign robot** (Signs: some mistakes cost more): Go after two Gos, Left and Right turn, everything else stops, with a watchdog. Then, in three milestones with less help each time:

1. The robot's **distance sensor overrules the model**: something in the way means stop, whatever the sign says.
2. The robot **reports back** through the bridge: its distance, and when it is blocked.
3. It **counts deliveries** and makes the system yours.

In the simulator, the buttons stand in for the model (A Left, B Right, A+B Go, logo Stop). Drag a box in front of a robot to block it.

## Predict

```step
stage: predict
code: robot.ts#predict
check:
  type: predict
  q: "The model reads Go (twice), and the robot sets off. A box is in its way. What happens?"
  options: ["It drives into the box", "It stops at the box", "It drives round the box", "It turns back"]
  actual: "It drives into the box. The model only reads the sign; nothing in this program looks at what is in front of the robot."
```

## Run

```step
stage: run
code: robot.ts#predict
try: { playground: microbit, starter: "robot.ts#predict" }
check: { type: reflect, text: "I sent Go twice with A+B, put a box in the robot's way, and watched it push the box." }
```

Press **A+B** twice on one micro:bit, then drag a box in front of the **other** robot.

## Investigate

```step
stage: investigate
insight: "The model knows only what the camera sees; the robot's sensor knows what is in front of it. The sensor must win, so its check comes first."
tasks:
  - check:
      type: sort
      q: "Which part should decide each of these?"
      options: ["The model (camera on the sign)", "The robot's own sensor"]
      items:
        - ["Which way the sign says to go", "The model (camera on the sign)"]
        - ["Whether a box is right in front of the robot", "The robot's own sensor"]
        - ["Whether it's safe to keep driving forward this moment", "The robot's own sensor"]
        - ["Whether the delivery stop has been reached (the Stop sign)", "The model (camera on the sign)"]
  - check:
      type: question
      q: "Jo checks the distance in the last else if, after Go, Left and Right. Her robot still drives into boxes on Go. Why?"
      options: ["When the mode is Go, the Go branch runs first and the distance check is never reached", "The sensor is broken", "Boxes are invisible to the sensor", "The watchdog stops the check"]
      answer: 0
      explain: "An if, else if chain runs only the first branch that matches. A check that must always win goes first."
```

### Model or sensor

### Jo's robot

## Milestone 1: the sensor wins

```step
stage: modify
insight: "A safety check that overrules everything else goes first in forever."
try: { playground: microbit, starter: "robot.ts#predict" }
hint:
  - "Robot obstacle distance is in Robot › Sensors."
  - "In forever, before the Go branch: if obstacle distance < 15, then stop and set red; turn the old if into else if."
check: { type: code, text: "If something is closer than 15 cm, the robot stops and shows red, whatever the model says.", rules: { contains: ["robot.obstacleDistance()<15", "}elseif(mode==\"Go\"&&goCount>=2"] } }
```

## Milestone 2: report back

```step
stage: modify
insight: "The robot can send its own readings back through the bridge, so the person at the computer sees what the robot senses, not only what the model saw."
try: { playground: microbit, starter: "robot.ts#sol-m1" }
hint:
  - "A second forever: radio send value dist, obstacle distance, then pause 500."
  - "A variable blocked (false at the start). When it stops for a box and blocked is false: radio send value blocked 1 and set blocked to true. When the way is clear again: send blocked 0 and set it to false."
check: { type: code, text: "The robot sends its distance twice a second, and sends blocked 1 once when it stops for something and blocked 0 once when the way is clear.", rules: { contains: ["radio.sendValue(\"dist\",robot.obstacleDistance())", "radio.sendValue(\"blocked\",1)", "radio.sendValue(\"blocked\",0)", "blocked=true", "blocked=false"] } }
```

- The robot sends its **distance** by radio twice a second.
- When it stops for something, it sends **blocked 1**, once; when the way is clear, **blocked 0**, once.

The bridge passes these on to the board, where they appear as values (in_dist, in_blocked).

## Try the full system

```step
stage: run
tier: typical
try: { playground: board, starter: "boards.yml#deliver", height: 700 }
check: { type: board, text: "Drive with your signs while the robot reports back: get Go sent, and at least 10 replies from the robot.", when: "sent_go >= 1 and n_replies >= 10" }
```

Download milestone 2 to the robot, and the bridge program to the micro:bit on the computer. Drive with your signs and watch the robot's distance arrive. Block it with your hand.

## Milestone 3: deliveries

```step
stage: make
insight: "A finished system counts what it has done and tells people, so they can trust it without watching it."
try: { playground: microbit, starter: "robot.ts#sol-m2" }
hint:
  - "A delivery is a Stop sign that arrives while the robot was going (mode = Go)."
  - "Send the count with send value. Pick a short name, such as done: names are 8 characters at most, so deliveries would be cut short."
check: { type: code, text: "The robot counts deliveries (a Stop that arrives while going), sends the count back, and shows it when shaken.", rules: { contains: ["receivedString==\"Stop\"&&mode==\"Go\"", "deliveries+=1", ",deliveries)", "basic.showNumber(deliveries)"] } }
```

Count **deliveries**: a Stop sign that arrives while the robot is going. Send the count back and show it when the robot is shaken. Then make it yours: a library book trolley, a lunch-order runner, a parcel robot. Change the signs, lights and sounds to suit.

## On real robots

```step
stage: info
```

- **Each team needs its own radio group** for its bridge and robot.
- A real distance sensor misses thin things (chair legs) and soft things (a jumper). What else should a delivery robot check before it moves?
- Your robot trusts the model only for the sign, and its own sensor for safety. Real delivery robots do the same with many more sensors.
