---
order: 1
unit: messages
title: Everyone in the group hears
summary: A radio group is a channel, not a lock. Every micro:bit in the group hears every message, so anything sent in plain text is public to the group.
language: makecode
hook: "A school bus radio, a walkie-talkie, a baby monitor: if your radio is on the same channel, you hear it. That is how radio works, and it is why secret messages need more than a channel number."
---
Radio is how micro:bits talk without a cable. Each one is set to a **radio group** (a number from 0 to 255). A micro:bit sends to **every other micro:bit in its group** and to nobody outside it.

This course is about a question that follows: if a message goes out to everyone in the group, how can any of it be private? You will build the answers: secret codes, a way to share a key, a way to spot a changed message, and a way to prove who sent it.

## Predict

```step
stage: predict
code: radio.ts#predict
check:
  type: predict
  q: "Four micro:bits are switched on: three in group 5 and one in group 6. A is pressed on one micro:bit in group 5. How many micro:bits show MEET AT 3?"
  options: ["0", "2", "3", "4"]
  actual: "2. The message reaches the other two micro:bits in group 5. The sender does not hear itself, and group 6 is a different channel."
```

## Run

```step
stage: run
code: radio.ts#predict
try: { playground: microbit, starter: "radio.ts#predict" }
check: { type: reflect, text: "I pressed A on one simulated micro:bit and saw the message arrive on the other." }
```

The simulator runs the program on two micro:bits. Press **A** on one and watch the other.

## Investigate

```step
stage: investigate
code: radio.ts#predict
insight: "A group number picks a channel. It does not hide anything: every micro:bit set to that group hears every message, in plain text."
tasks:
  - check:
      type: question
      q: "Mia says: 'Group 99 keeps our messages private, because nobody knows the number.' Is she right?"
      options: ["Yes, nobody can guess 99", "No: any micro:bit set to group 99 hears everything, and there are only 256 groups to try", "Yes, as long as the message is short", "No, but only because the sender hears it too"]
      answer: 1
      explain: "A group is like a radio station number. Anyone who tunes to it hears everything on it, and with only 256 groups, finding the busy one is quick."
  - check:
      type: match
      q: "Match each block with what it does."
      pairs:
        - ["radio set group 5", "choose the channel to talk on"]
        - ["radio send string", "send text to every micro:bit in the group"]
        - ["on radio received string", "run when text arrives from another micro:bit"]
  - check:
      type: sort
      q: "Who hears a message sent from a micro:bit in group 5?"
      options: ["Hears it", "Does not hear it"]
      items:
        - ["Another micro:bit in group 5, across the room", "Hears it"]
        - ["A micro:bit in group 6", "Does not hear it"]
        - ["A micro:bit in group 5 in the next classroom", "Hears it"]
        - ["The micro:bit that sent it", "Does not hear it"]
```

### The group number

### The blocks

### Who hears it

## Modify

```step
stage: modify
insight: "Adding a message is easy; so is anyone's reading it. Nothing in the program hides the text."
try: { playground: microbit, starter: "radio.ts#predict" }
hint: "Copy the A block, change it to Button B and change the text."
check: { type: code, text: "A sends one message and B sends a different one.", rules: { contains: ["input.onButtonPressed(Button.A", "input.onButtonPressed(Button.B", "radio.sendString("], count: { "radio.sendString(": 2 } } }
```

Make **B** send a second message of your own. Every micro:bit in the group would read it.

## Make

```step
stage: make
try: { playground: microbit, starter: "radio.ts#make" }
hint:
  - "Pressing A sends the word RING."
  - "On radio received string: if the text is RING, show an icon and play a tone."
check: { type: code, text: "A doorbell: A sends RING; a micro:bit that receives RING shows an icon and plays a tone.", rules: { contains: ["radio.sendString(\"RING\"", "receivedString==\"RING\"", "basic.showIcon(", "music."] } }
```

Make a **doorbell**. Pressing **A** on one micro:bit sends **RING**; the other shows an icon and plays a tone. You will meet this doorbell again: by the end of the course it will be a lock that is hard to fool.
