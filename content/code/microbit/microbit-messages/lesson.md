---
order: 10
unit: talk
title: Messages with meaning
summary: Send a small number that stands for a word in a list both micro:bits share.
language: makecode
explainPicture: messages.ts#chooser
hook: "Morse code, flag signals and the numbers a fast-food counter calls out all work because both sides agree what each code means."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@messages.ts#chooser", lesson: "code/microbit/microbit-messages", target: "microbit" }
  caption: "A shared list is a code"
  say: "If both micro:bits have the same list, a place number is enough."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "Send the place number, not the word."
        say: "So you send the place number, not the word itself."
    - caption:
        text: "The receiver shows get value at receivedNumber."
        say: "The receiver shows the word at that place in its own list."
    - click: "Run"
    - wait: 600
    - caption:
        text: "It only works if both lists match, in the same order."
        say: "The code only works if both lists match, in the same order."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson, 1 meant "left" and 2 meant "right" because you decided so. A **list** makes that agreement clear: if both micro:bits have the same list of words, sending a **place number** is enough. The receiver looks up the word at that place.

## Predict

```step
stage: predict
code: messages.ts#predict
check:
  type: predict
  q: "You press A on one micro:bit, so it sends 2. What does the other micro:bit show?"
  options: ["2", "Hi", "Yes", "No"]
  actual: "No. The receiver looks up place 2 in its list: Hi is at 0, Yes at 1, No at 2."
```

The receiver shows **words[receivedNumber]**: the word at the place that arrived.

## Run

```step
stage: run
code: messages.ts#predict
try: { playground: microbit, starter: "messages.ts#predict" }
check: { type: reflect, text: "I pressed A and checked which word the other micro:bit showed." }
```

Press **A** on one micro:bit and read the word on the other.

## Investigate

```step
stage: investigate
code: messages.ts#chooser
insight: "A message is a code both sides must share: the same list, in the same order. Sending the place number keeps the message small."
tasks:
  - check:
      type: trace
      text: "This messenger lets you choose a word with A, then send it with B. Fill in choice after each press of A."
      table: |
        | press | choice after | word shown |
        | (start) | 0 | |
        | A | [1] | [Yes] |
        | A | [2] | [No] |
        | A | [0] | [Hi] |
      explain: "Each A adds 1. When choice reaches 3 (the length of the list), the if sets it back to 0, so it loops round the list."
  - check:
      type: question
      q: "Ella and Tom built the messenger, but Tom's list is in a different order. Ella sends Yes, and Tom's micro:bit shows No. Why?"
      options: ["The radio changed the number", "Only the place number is sent, and the same place holds a different word in Tom's list", "Tom's group is wrong", "Lists cannot be sent by radio"]
      answer: 1
      fault: logic
      misconception: shared-code-mismatch
      explain: "Ella sends place 1. In her list place 1 is Yes; in Tom's it is No. Both micro:bits must use the same list in the same order."
  - check:
      type: question
      q: "Why send the place number instead of the whole word?"
      options: ["Numbers are prettier", "Both micro:bits already have the list, so a small number is all that needs to travel", "Radio cannot send words", "It is the only block that works"]
      answer: 1
      explain: "Radio can send words, but a number is shorter and both sides already know what it stands for. That shared list is a code."
  - check:
      type: match
      q: "The messenger in Python. Match each line with what it does."
      pairs:
        - ["words = [\"Hi\", \"Yes\", \"No\"]", "makes the shared list"]
        - ["radio.send_number(choice)", "sends the place of the chosen word"]
        - ["basic.show_string(words[receivedNumber])", "shows the word at the place that arrived"]
```

### Choose and send

**A** steps through the list; **B** sends the place number of the chosen word.

### Ella and Tom

Ella's list:

```makecode
let words = ["Hi", "Yes", "No"]
```

Tom's list:

```makecode
let words = ["Yes", "No", "Hi"]
```

### Why a number?

### In Python

```python
words = ["Hi", "Yes", "No"]

def on_button_pressed_b():
    radio.send_number(choice)
    basic.show_icon(IconNames.YES)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_number(receivedNumber):
    basic.show_string(words[receivedNumber])
radio.on_received_number(on_received_number)
```

The square brackets mean "the item at this place", just like *get value at*.

## Modify

```step
stage: modify
insight: "Adding to the shared list needs no other change, because the loop back to 0 uses the list's length. A reply message is just another agreed number."
try: { playground: microbit, starter: "messages.ts#chooser" }
tasks:
  - hint: "Click the + on the list block and type a new word."
    check: { type: code, text: "Add a fourth word to the list.", rules: { count: { "\",\"": 3 } } }
  - hint: ["Choose a number that is not a place in the list, such as 99, to mean 'got it'.", "In on radio received: if receivedNumber = 99, show a tick; else show the word and send 99 back."]
    check: { type: code, text: "Reply with 99 when a message arrives, and show a tick when 99 comes back.", rules: { contains: ["radio.sendNumber(99)", "receivedNumber==99"] } }
```

### One more word

Add a fourth word. Did you need to change anything else? Why not?

### Got it!

Make the receiver **reply**: when a word arrives, it sends back 99, and the sender shows a tick when 99 arrives. Real messaging apps do this to show "delivered".

## Make

```step
stage: make
try: { playground: microbit, starter: "messages.ts#make" }
hint:
  - "You need a list of moods and a variable for the chosen place."
  - "A steps through (back to 0 at the end), B sends the place, and on radio received shows moods[receivedNumber]."
check: { type: code, text: "A mood check-in: A chooses a mood from a list, B sends its place, and the other micro:bit shows the mood.", rules: { count: { "\",\"": 2 }, contains: ["radio.sendNumber(", "radio.onReceivedNumber(", "[receivedNumber]"] } }
```

Make a **mood check-in** for the start of class. Each student's micro:bit has a list of moods (at least three). **A** steps through them, **B** sends the chosen one, and the teacher's micro:bit shows it.

## Change a quiz buzzer

```step
stage: modify
try: { playground: microbit, starter: "messages.ts#buzzer" }
```

This buzzer lets you pick an answer, A, B or C, and send it to the quiz master. Add a fourth answer, D, then make the quiz master's micro:bit show a tick after each answer arrives.
