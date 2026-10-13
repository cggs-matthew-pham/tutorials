---
order: 2
unit: talk
moveId: send-and-receive
reviews: [name-a-job]
introduces: [radio, radio-number]
assumes: [function]
title: Send and receive
summary: Send a number by radio, and react on another micro:bit when it arrives.
language: makecode
explainPicture: lesson.ts#predict
hook: "Wireless doorbells, car keys and walkie-talkies all send small radio messages to a receiver tuned to the same channel."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#predict", lesson: "code/microbit-play/microbit-radio", target: "microbit" }
  caption: "Radio sends messages between micro:bits"
  say: "Radio sends small messages between micro:bits."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "radio set group picks a channel. Only the same group hears."
        say: "radio set group picks a channel. Only micro:bits in the same group hear each other."
    - caption:
        text: "send number goes to every other micro:bit in the group."
        say: "send number goes to every other micro:bit in the group."
    - click: "Run"
    - wait: 600
    - caption:
        text: "on radio received runs each time a message arrives."
        say: "on radio received is an event. It runs each time a message arrives."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Micro:bits can talk to each other by **radio**. One sends a message; every micro:bit nearby in the same **group** (like a walkie-talkie channel) receives it. You find radio blocks in **Radio**.

As soon as your program uses radio, the simulator shows **two** micro:bits. Both run the same program, so you can press a button on one and watch the other.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "There are two micro:bits running this program. You press A on the first one. What happens?"
  options: ["The heart shows on the first micro:bit", "The heart shows on the second micro:bit", "The heart shows on both", "Nothing happens"]
  fault: logic
  misconception: hears-own-message
  actual: "The heart shows on the second micro:bit. The first one sends the message; the others in group 1 receive it. A micro:bit does not receive its own message."
```

**send number** sends; **on radio received** waits for a message to arrive.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: microbit, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I pressed A on each micro:bit in turn and watched which one showed the heart." }
```

Press **A** on the first micro:bit, then on the second.

## Investigate

```step
stage: investigate
code: lesson.ts#predict
insight: "send number reaches every other micro:bit in the same group, and on radio received is an event that runs each time a message arrives."
tasks:
  - check:
      type: match
      q: "Match each block with what it does."
      pairs:
        - ["radio set group 1", "tunes in to channel 1, so only group 1 messages arrive"]
        - ["radio send number 1", "sends 1 to every other micro:bit in the group"]
        - ["on radio received", "runs each time a message arrives"]
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
insight: "Any event can send a message, and a group number of your own keeps your micro:bits to themselves."
try: { playground: microbit, starter: "lesson.ts#predict" }
tasks:
  - hint: ["Drag in on shake from Input.", "Put radio send number inside it."]
    check: { type: code, text: "Make a shake send a message too, so the heart also shows on the other micro:bit.", rules: { inside: { "input.onGesture(Gesture.Shake": ["radio.sendNumber("] } } }
  - check: { type: reflect, text: "I changed the group to a number of my own, so only my micro:bits hear each other." }
```

### Shake to send

Make a **shake** send a message too. Shake one micro:bit and watch the other.

### Your own channel

In a classroom full of micro:bits, everyone on group 1 hears everyone else. Choose your own group number (0 to 255) and agree it with your partner.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "A function runs once for each call, wherever the call is."
check:
  type: number
  q: "flash is called twice from A and once from shake. You press A, then shake. How many flashes in all?"
  answer: 3
  explain: "A calls flash twice and shake calls it once: 2 + 1 = 3 flashes."
```

A function from last lesson, with no radio in it.

## Make

```step
stage: make
try: { playground: microbit, starter: "lesson.ts#make" }
hint:
  - "Make a function ring that flashes a picture, and call it from on radio received."
  - "On the sender: on button A pressed, radio send number 1."
check: { type: code, text: "A doorbell: A sends a number, and the other micro:bit calls a function of yours when it arrives.", rules: { defs: 1, calls: 1, contains: ["radio.sendNumber(", "radio.onReceivedNumber("] } }
unlocks: [on-radio-received]
```

Make a **doorbell**. Pressing **A** on the front door's micro:bit sends a number. The micro:bit inside calls a function, **ring**, that flashes a bell or a face (your choice).

## Change a quiet signal

```step
stage: modify
try: { playground: microbit, starter: "lesson.ts#quiet" }
```

A teacher presses A, and every student's micro:bit shows a raised hand: time to listen. Choose your own picture and group, then make **B** send the signal too.

```teacher
summary: "Students send a number by radio and react on another micro:bit when it arrives, and see that only micro:bits in the same group hear each other."
time: 40
timing: "Predict and Run 8 min · Investigate 10 min · Modify 6 min · Mix it up 3 min · Make 9 min · Quiet signal 4 min"
goals:
  - I can send a number from one micro:bit to another.
  - I can react when a radio message arrives.
  - I can say why both micro:bits need the same group.
before: |
  **Radio** sends short messages between micro:bits. **radio set group** chooses a channel (0 to 255); only micro:bits in the same group hear each other. **send number** sends to every other micro:bit in the group (never to itself). **on radio received** is an event: it runs each time a message arrives. In the simulator, a second micro:bit appears once the program uses radio; both run the same program. Using the number that arrived (**receivedNumber**) is next lesson. With real micro:bits in a classroom, pairs must choose their own group number or they will hear everyone.
running:
  - "Predict: many students say 'on both'. Ask: who is listening, and who is talking? Or: does a walkie-talkie play your own voice back to you?"
  - "Run: press A on each micro:bit in turn. The heart always shows on the other one."
  - "Investigate: Ella's groups are the most common real-classroom problem. The Python peek shows radio received as one more function the micro:bit calls."
  - "Modify: any event can send. Then each pair picks a group."
  - "Mix it up: counting function calls, from last lesson."
  - "Make: the doorbell calls a function from on radio received."
stuck:
  - see: "Nothing arrives."
    ask: "Are both micro:bits in the same group? Are you pressing on the sender?"
    fix: "Check radio set group on both, and press on one while watching the other."
  - see: "The heart shows on the micro:bit that was pressed."
    ask: "Is there a show icon inside the button event as well?"
    fix: "Keep the button event for sending only; showing belongs in on radio received."
  - see: "The second micro:bit is missing from the simulator."
    ask: "Is there a radio block in the program?"
    fix: "The second micro:bit appears once any radio block is used."
stretch: "Make the doorbell ring differently for a shake (a knock) and for A (the bell). How does the receiver know which? (Next lesson.)"
support: "Give students the ring function already made, and ask them to add the sender and the receiver."
leads: "Next lesson: the number that arrives can say which message it was, so one receiver does different things. Class idea: a relay where a message passes around the room micro:bit to micro:bit."
exit:
  q: "Two micro:bits run the same radio program, but one is in group 3 and one in group 4. What happens when A is pressed on either?"
  a: "Nothing arrives: each only hears messages sent to its own group."
explain: |
  **radio set group** picks a channel. Only micro:bits in the **same group** hear each other.

  **send number** sends to every **other** micro:bit in the group (not to itself).

  **on radio received** is an **event**: it runs each time a message arrives.
solutions:
  step-4#t1: lesson.ts#sol-shake
  step-6: lesson.ts#sol-make
struggle: "Two micro:bits, one group, and a micro:bit never hears itself. When nothing arrives, ask which one is sending and which group each is in."
class:
  activities:
    - at: investigate
      title: Channels
      minutes: 4
      do: |
        Students hold a group number card. One student whispers a message to their group number; only students with the same card may react.
      notes: "Swap one student's card: they miss everything. That is Ella's bug."
    - at: end
      title: Ring the bell
      minutes: 3
      do: |
        Pair up with real micro:bits (or two simulators). Agree a group, then ring each other's doorbell.
```

```code lesson.ts#predict
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showIcon(IconNames.Heart)
    basic.pause(500)
    basic.clearScreen()
})
```

```code lesson.ts#sol-shake
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
input.onGesture(Gesture.Shake, function () {
    radio.sendNumber(1)
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showIcon(IconNames.Heart)
    basic.pause(500)
    basic.clearScreen()
})
```

```code lesson.ts#review
function flash () {
    basic.showIcon(IconNames.Heart)
    basic.pause(200)
    basic.clearScreen()
    basic.pause(200)
}
input.onButtonPressed(Button.A, function () {
    flash()
    flash()
})
input.onGesture(Gesture.Shake, function () {
    flash()
})
```

```code lesson.ts#make
radio.setGroup(1)
```

```code lesson.ts#sol-make
function ring () {
    basic.showIcon(IconNames.Happy)
    basic.pause(300)
    basic.clearScreen()
    basic.pause(300)
    basic.showIcon(IconNames.Happy)
}
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
radio.onReceivedNumber(function (receivedNumber) {
    ring()
})
```

```code lesson.ts#quiet
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showLeds(`
        . # # . .
        . # # # .
        . # # # #
        . # # # .
        . # # # .
        `)
})
```
