---
order: 7
unit: talk
title: Remote control
summary: One micro:bit sends numbers by radio; the robot turns each number into a move.
language: makecode
extensions: [robot]
explainPicture: remote.ts#predict
hook: "Rescue robots go into collapsed buildings and bomb-disposal robots up to suspicious bags, while the person driving stays far away and safe. Each button press is a short message over radio."
---
In micro:bit Foundations you sent radio messages between micro:bits. Now the messages drive a robot. The **remote** sends a number for each button; the **robot** listens and turns each number into a move. Both micro:bits must be in the same **radio group**.

When a program uses radio, the simulator shows **two micro:bits and two robots**, running the same program. Each micro:bit is a remote for the **other** robot.

## Predict

```step
stage: predict
code: remote.ts#predict
check:
  type: predict
  q: "You press A on the first micro:bit. Which robot drives forward?"
  options: ["The second robot", "The first robot", "Both robots", "Neither: radio cannot drive robots"]
  actual: "The second robot. The first micro:bit sends 1; a micro:bit never hears its own messages, so only the second micro:bit receives 1 and drives its robot."
```

## Run

```step
stage: run
code: remote.ts#predict
try: { playground: microbit, starter: "remote.ts#predict" }
check: { type: reflect, text: "I pressed A, B and A+B on one micro:bit and watched which robot moved." }
```

Press **A**, **B** and **A+B** on the **first** micro:bit, and watch the **second** robot. Then try the buttons on the second micro:bit.

## Investigate

```step
stage: investigate
code: remote.ts#predict
insight: "The remote only sends a number. The robot decides what each number means, so both sides must agree on the code and the radio group."
tasks:
  - check:
      type: match
      q: "Match each button with the number it sends and what the robot does."
      pairs:
        - ["A sends 1", "drive forward until told otherwise"]
        - ["B sends 2", "turn right a little, then stop"]
        - ["A+B sends 0", "stop"]
  - check:
      type: question
      q: "Ben has two programs: one for his remote, one for his robot. Pressing A does nothing. Why?"
      options: ["Radio does not work with robots", "The remote is in radio group 1 and the robot in group 2, so the robot never hears the message", "The robot needs a forever block", "He should send a word, not a number"]
      answer: 1
      fault: logic
      misconception: radio-group-mismatch
      explain: "Radio messages only reach micro:bits in the same group. Ben's remote sends on group 1, but his robot listens on group 2."
```

### The code

Match each button with its message and the robot's move.

### Ben's robot

Ben's remote:

```makecode
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
radio.setGroup(1)
```

Ben's robot:

```makecode
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        robot.motorTank(50, 50)
    }
})
robot.elecfreaksCuteBot.start()
radio.setGroup(2)
```

## Modify

```step
stage: modify
insight: "A new command needs a new number on the remote and a new branch on the robot."
try: { playground: microbit, starter: "remote.ts#modify" }
tasks:
  - hint: "show number is in Basic. Put it at the top of on radio received, and drag receivedNumber into it."
    check: { type: code, text: "The robot's micro:bit shows each number it receives.", rules: { inside: { "radio.onReceivedNumber": ["basic.showNumber(receivedNumber)"] } } }
  - hint: ["on shake sends 3. In on radio received, add an else if: receivedNumber = 3.", "Inside it: robot motor tank −50 −50 for 1000 ms, then robot motor stop."]
    check: { type: code, text: "Add a reverse command: shaking the remote sends 3, and the robot backs up for 1 second.", rules: { contains: ["radio.sendNumber(3)", "receivedNumber==3", "robot.motorTank(-50,-50"] } }
```

### Show the message

A driver needs to know what the robot heard. Make the robot's micro:bit **show each number** it receives.

### Reverse

Add a fourth command: **shaking** the remote sends **3**, and the robot **backs up** for one second.

## Make

```step
stage: make
try: { playground: microbit, starter: "remote.ts#make" }
hint:
  - "Four buttons: A, B, A+B and the logo. Each sends a different number."
  - "In on radio received, one branch per number: small left turn, small right turn, forward for 1 second, stop."
check: { type: code, text: "A rescue-robot remote: left, right, forward and stop, each a different number.", rules: { count: { "radio.sendNumber(": 4, "robot.motorTank(": 3 }, inside: { "radio.onReceivedNumber": ["robot.motorStop()"] } } }
```

Make a remote for a **rescue robot** that moves in small, careful steps:

- **A**: turn a little left
- **B**: turn a little right
- **A+B**: drive forward for one second
- **logo**: stop

Use the first micro:bit to steer the second robot round a box and back.

## On a real robot

```step
stage: info
```

With real micro:bits, download the program to the **remote** and to the micro:bit in the **robot**. Things to notice:

- **Use your own radio group.** Every pair in the room needs a different group, or your remote drives someone else's robot.
- The remote does not need to be in a robot. If it shows an error without one, ask your teacher for a copy without the robot start block.
- Radio reaches across a classroom, but walls and bodies weaken it.
