---
order: 3
unit: talk
moveId: message-decides
reviews: [send-and-receive]
introduces: [radio-string]
assumes: [if, else, radio, radio-number, function]
title: Which message?
summary: Use the number that arrives by radio to do something different for each message, and send words as well as numbers.
language: makecode
explainPicture: lesson.ts#predict
hook: "A garage door opener has one receiver but two buttons: open and close. The receiver reads which code arrived and acts on it."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#predict", lesson: "code/microbit-play/microbit-which", target: "microbit" }
  caption: "receivedNumber holds the number that arrived"
  say: "receivedNumber holds the number that arrived."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "One on radio received block gets every message."
        say: "One on radio received block gets every message."
    - caption:
        text: "if and else if check which number it was."
        say: "if and else if check which number it was."
    - click: "Run"
    - wait: 600
    - caption:
        text: "send string sends a word. receivedString holds it."
        say: "send string sends a word, and receivedString holds it."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson every message did the same thing: a heart. But **on radio received** also tells you **what** arrived. **receivedNumber** holds the number that was sent, so the receiver can ask about it with **if**.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "You press B on the first micro:bit. What does the second micro:bit show?"
  options: ["A sad face", "A heart", "A heart, then a sad face", "The number 2"]
  fault: logic
  misconception: one-handler-per-message
  actual: "A sad face. B sends 2. On the second micro:bit receivedNumber is 2, so the first question is false and the else if part runs."
```

A sends 1 and B sends 2. One **on radio received** block checks which arrived.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: microbit, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I pressed A and B on one micro:bit and compared what the other showed with my prediction." }
```

Press **A**, then **B**, on one micro:bit. Watch the other.

## Investigate

```step
stage: investigate
code: lesson.ts#predict
insight: "One on radio received runs for every message, and receivedNumber says which one arrived, so if and else if can do something different for each."
tasks:
  - check:
      type: trace
      text: "What does the receiver show for each number that arrives?"
      table: |
        | receivedNumber | shows |
        | 1 | [heart] |
        | 2 | [sad face] |
        | 5 | [nothing] |
      explain: "1 and 2 each have a question. 5 makes both questions false, and there is no else, so nothing happens."
  - check:
      type: question
      q: "Max wants 1 to show a heart and 2 a sad face. He drags in a second on radio received block for 2, and it greys out. What should he do?"
      options: ["Use one on radio received, with if receivedNumber = 1 … else if receivedNumber = 2", "Use a different group for 2", "Send 2 twice", "Put the second block in forever"]
      answer: 0
      fault: logic
      misconception: one-handler-per-message
      explain: "Every number arrives in the same on radio received block. receivedNumber says which one came, and if … else if picks what to do."
  - check:
      type: match
      q: "The receiver in Python. Match each line with what it does."
      pairs:
        - ["def on_received_number(receivedNumber):", "runs for every number that arrives"]
        - ["if receivedNumber == 1:", "checks whether the number was 1"]
        - ["elif receivedNumber == 2:", "otherwise, checks whether it was 2"]
```

### Trace the messages

### Max's second block

### In Python

```python
def on_received_number(receivedNumber):
    if receivedNumber == 1:
        basic.show_icon(IconNames.HEART)
    elif receivedNumber == 2:
        basic.show_icon(IconNames.SAD)
radio.on_received_number(on_received_number)
```

`elif` is Python's short way to write *else if*.

## Modify

```step
stage: modify
insight: "Each new message is one more agreed number and one more question. Words travel the same way with send string."
try: { playground: microbit, starter: "lesson.ts#predict" }
tasks:
  - hint: ["Drag in on shake with radio send number 3.", "Click + on the receiver's if to add another else if: receivedNumber = 3."]
    check: { type: code, text: "A shake sends 3, and the receiver shows a surprised face for 3.", rules: { contains: ["radio.sendNumber(3)", "receivedNumber==3"] } }
  - hint: ["radio send string is in Radio. Put it in on button A+B pressed, with hi.", "Drag in on radio received receivedString, with show string receivedString."]
    check: { type: code, text: "A+B sends the word hi, and the receiver shows the word that arrived.", rules: { contains: ["radio.sendString(", "radio.onReceivedString(function(receivedString){basic.showString(receivedString)"] } }
```

### A third message

Make a **shake** send 3, and the receiver show a surprised face when 3 arrives.

### Send a word

**send string** sends a word, and **on radio received receivedString** holds the word that arrived. Make **A+B** send *hi*, and the receiver show it.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "A message reaches every other micro:bit in the same group, and no others."
check:
  type: question
  q: "Three micro:bits run this program. The first and second are in group 1; the third is in group 2. You press A on the first. Which show the heart?"
  options: ["Only the second", "The second and the third", "All three", "Only the first"]
  answer: 0
  explain: "The first one sends and never hears itself. The second is in the same group, so it hears. The third is in group 2, so it hears nothing."
```

Last lesson's program, on three micro:bits.

## Make

```step
stage: make
try: { playground: microbit, starter: "lesson.ts#make" }
hint:
  - "Three senders: A sends 1, B sends 2, shake sends 3."
  - "One on radio received, with if receivedNumber = 1 … else if = 2 … else if = 3."
check: { type: code, text: "Bike signals by radio: A, B and shake send three different numbers, and the other micro:bit shows a different picture for each.", rules: { count: { "radio.sendNumber(": 3, "receivedNumber==": 3 }, contains: ["radio.onReceivedNumber("] } }
unlocks: [which-message]
```

Make **bike signals by radio**: the rider presses buttons on one micro:bit, and the one on the back of the bike shows the signal.

- **A** sends 1: left arrow.
- **B** sends 2: right arrow.
- **Shake** sends 3: a stop picture.

## Change a doorbell

```step
stage: modify
try: { playground: microbit, starter: "lesson.ts#doorbell" }
```

This doorbell sends a **word** instead of a number. Make it send your name, then make **B** send a different message, such as "come in".

```teacher
summary: "Students use receivedNumber to do something different for each radio message, and send words with send string."
time: 40
timing: "Predict and Run 7 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 9 min · Doorbell 3 min"
goals:
  - I can make the receiver do something different for each number that arrives.
  - I can send a word by radio and show it.
  - I can agree a code of numbers with a partner.
before: |
  **on radio received** runs for **every** number that arrives, and **receivedNumber** (drag it out of the block) holds which number it was. One receiver block with **if … else if** handles every message; a second on radio received block greys out. **send string** and **on radio received receivedString** do the same for words. Each number is a code both micro:bits agree on: 1 means left, 2 means right.
running:
  - "Predict: some students expect the number 2 to show. Ask what the receiver does with receivedNumber."
  - "Run: A and B on one, watch the other."
  - "Investigate: the 5 in the trace shows that a number with no question does nothing. Max's second block is this lesson's misconception."
  - "Modify: a third number, then a word with send string."
  - "Mix it up: groups again, from last lesson."
  - "Make: three agreed numbers, three pictures."
stuck:
  - see: "The receiver shows the same picture for every number."
    ask: "Where do you check which number arrived?"
    fix: "Use if receivedNumber = 1 … else if receivedNumber = 2 inside on radio received."
  - see: "receivedNumber cannot be found in Variables."
    ask: "Where does receivedNumber come from?"
    fix: "Drag it out of the on radio received block itself."
  - see: "A word is sent but nothing shows."
    ask: "Which on radio received block is it, number or string?"
    fix: "Words arrive in on radio received receivedString."
stretch: "Make a two-way chat: each micro:bit sends 1 for 'yes' and 2 for 'no', and shows a tick or cross when the other answers."
support: "Give students the receiver with if … else if already built, and ask them to add the senders."
leads: "Next lesson: a list both micro:bits share turns the numbers into words. Class idea: a quiz buzzer where A and B are two answers."
exit:
  q: "A receiver checks if receivedNumber = 1 and else if receivedNumber = 2. What happens when 3 arrives?"
  a: "Nothing. Both questions are false and there is no else."
explain: |
  **on radio received** runs for **every** message. **receivedNumber** holds the number that arrived.

  So one receiver can do something different for each message: **if** receivedNumber = 1, **else if** receivedNumber = 2.

  **send string** sends a word, and **receivedString** holds the word that arrived.
solutions:
  step-4#t1: lesson.ts#sol-three
  step-4#t2: lesson.ts#sol-word
  step-6: lesson.ts#sol-make
struggle: "One receiver for every message. Ask what receivedNumber holds when B is pressed."
class:
  activities:
    - at: investigate
      title: Agree a code
      minutes: 4
      do: |
        Pairs agree what 1, 2 and 3 mean (left, right, stop). One holds up fingers silently; the other acts it out.
      notes: "A number only means something if both sides agree what it means."
    - at: end
      title: Ride along
      minutes: 3
      do: |
        One partner is the rider, the other the back light. The rider sends a signal; the back light calls out what it shows.
```

```code lesson.ts#predict
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(2)
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        basic.showIcon(IconNames.Heart)
    } else if (receivedNumber == 2) {
        basic.showIcon(IconNames.Sad)
    }
})
```

```code lesson.ts#sol-three
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(2)
})
input.onGesture(Gesture.Shake, function () {
    radio.sendNumber(3)
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        basic.showIcon(IconNames.Heart)
    } else if (receivedNumber == 2) {
        basic.showIcon(IconNames.Sad)
    } else if (receivedNumber == 3) {
        basic.showIcon(IconNames.Surprised)
    }
})
```

```code lesson.ts#sol-word
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(2)
})
input.onGesture(Gesture.Shake, function () {
    radio.sendNumber(3)
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("hi")
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        basic.showIcon(IconNames.Heart)
    } else if (receivedNumber == 2) {
        basic.showIcon(IconNames.Sad)
    } else if (receivedNumber == 3) {
        basic.showIcon(IconNames.Surprised)
    }
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
})
```

```code lesson.ts#review
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

```code lesson.ts#make
radio.setGroup(1)
```

```code lesson.ts#sol-make
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(2)
})
input.onGesture(Gesture.Shake, function () {
    radio.sendNumber(3)
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        basic.showArrow(ArrowNames.West)
    } else if (receivedNumber == 2) {
        basic.showArrow(ArrowNames.East)
    } else if (receivedNumber == 3) {
        basic.showIcon(IconNames.Surprised)
    }
})
```

```code lesson.ts#doorbell
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    radio.sendString("ding")
})
radio.onReceivedString(function (receivedString) {
    basic.showIcon(IconNames.Heart)
    basic.showString(receivedString)
})
```
