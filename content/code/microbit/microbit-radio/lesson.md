---
order: 9
unit: talk
title: Send and receive
summary: Send a number by radio from one micro:bit to another, and react when it arrives.
language: makecode
introduces: [radio, radio-number, radio-string]
explainPicture: radio.ts#predict
hook: "Wireless doorbells, car keys and walkie-talkies all send small radio messages to a receiver tuned to the same channel."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@radio.ts#predict", lesson: "code/microbit/microbit-radio", target: "microbit" }
  caption: "radio set group picks a channel"
  say: "Radio set group picks a channel. Only the same group can hear."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "send number sends to every other micro:bit in the group."
        say: "send number sends to every other micro:bit in the group, not itself."
    - caption:
        text: "on radio received runs each time a message arrives."
        say: "on radio received is an event. It runs each time a message arrives."
    - click: "Run"
    - wait: 600
    - caption:
        text: "receivedNumber holds the number that came."
        say: "received number holds the number that came."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Micro:bits can talk to each other by **radio**. One sends a message; every micro:bit nearby in the same **group** (like a walkie-talkie channel) receives it. You find radio blocks in **Radio**.

As soon as your program uses radio, the simulator shows **two** micro:bits. Both run the same program, so you can press a button on one and watch the other.

## Predict

```step
stage: predict
code: radio.ts#predict
check:
  type: predict
  q: "There are two micro:bits running this program. You press A on the first one. What happens?"
  options: ["The heart shows on the first micro:bit", "The heart shows on the second micro:bit", "The heart shows on both", "Nothing happens"]
  actual: "The heart shows on the second micro:bit. The first one sends the message; the others in group 1 receive it. A micro:bit does not receive its own message."
```

**send number** sends; **on radio received** waits for a message to arrive.

## Run

```step
stage: run
code: radio.ts#predict
try: { playground: microbit, starter: "radio.ts#predict" }
check: { type: reflect, text: "I pressed A on each micro:bit in turn and watched which one showed the heart." }
```

Press **A** on the first micro:bit, then on the second.

## Investigate

```step
stage: investigate
code: radio.ts#predict
insight: "on radio received is an event: it runs each time a message arrives from another micro:bit in the same group, and receivedNumber holds what was sent."
tasks:
  - check:
      type: match
      q: "Match each block with what it does."
      pairs:
        - ["radio set group 1", "tunes in to channel 1, so only group 1 messages arrive"]
        - ["radio send number 1", "sends 1 to every other micro:bit in the group"]
        - ["on radio received", "runs each time a message arrives"]
        - ["receivedNumber", "holds the number that arrived"]
  - check:
      type: question
      q: "Ella loads the program onto two real micro:bits. Pressing A on either does nothing. She changed one to radio set group 2. Why does nothing arrive?"
      options: ["Radio only works in the simulator", "The two micro:bits are in different groups, so neither hears the other", "send number needs a pause", "Group 2 is broken"]
      answer: 1
      fault: logic
      misconception: radio-group-mismatch
      explain: "A micro:bit only receives messages sent to its own group. One is on channel 1 and one on channel 2, so every message goes unheard."
  - check:
      type: match
      q: "The same program in Python. Match each line with what it does."
      pairs:
        - ["radio.send_number(1)", "sends the number 1"]
        - ["def on_received_number(receivedNumber):", "makes the function that runs when a number arrives"]
        - ["radio.on_received_number(on_received_number)", "hands that function to the micro:bit to call for each message"]
```

### What each block does

Match each radio block with its job.

### Ella's micro:bits

Ella's two micro:bits are set to different groups.

### The same program in Python

```python
radio.set_group(1)

def on_button_pressed_a():
    radio.send_number(1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_received_number(receivedNumber):
    basic.show_icon(IconNames.HEART)
    basic.pause(500)
    basic.clear_screen()
radio.on_received_number(on_received_number)
```

Like a button, a radio message is an event: the micro:bit calls a function each time one arrives.

## Modify

```step
stage: modify
insight: "receivedNumber lets one event react differently to different messages, using if from the Decide unit."
try: { playground: microbit, starter: "radio.ts#modify" }
tasks:
  - hint: ["Make B send 2.", "In on radio received: if receivedNumber = 1, show the heart; else if receivedNumber = 2, show a sad face. receivedNumber is dragged out of the event block."]
    check: { type: code, text: "B sends 2, and the receiver shows a different picture for 1 and for 2.", rules: { contains: ["radio.sendNumber(2)", "receivedNumber==2"] } }
  - check: { type: reflect, text: "I changed the group to a number of my own, so only my micro:bits hear each other." }
```

### Two messages

Make **B** send 2. The receiver shows a heart for 1 and a sad face for 2.

### Your own channel

In a classroom full of micro:bits, everyone on group 1 hears everyone else. Choose your own group number (0 to 255) and agree it with your partner.

## Make

```step
stage: make
try: { playground: microbit, starter: "radio.ts#make" }
hint:
  - "Three senders: A, B and shake, each sending a different number."
  - "One on radio received, with if and else if for each number."
check: { type: code, text: "Bike signals by radio: A, B and shake send three different numbers, and the other micro:bit shows a different picture for each.", rules: { count: { "radio.sendNumber(": 3, "receivedNumber==": 3 }, contains: ["radio.onReceivedNumber("] } }
```

Make **bike signals by radio**: the rider presses buttons on one micro:bit, and the one on the back of the bike shows the signal.

- **A** sends 1: left arrow.
- **B** sends 2: right arrow.
- **Shake** sends 3: a stop picture.

## Change a doorbell

```step
stage: modify
try: { playground: microbit, starter: "radio.ts#doorbell" }
```

This doorbell sends a **word** instead of a number (**send string**). Make it send your name, then make **B** send a different message, such as "come in".
