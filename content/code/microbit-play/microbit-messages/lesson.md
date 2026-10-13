---
order: 4
unit: talk
moveId: shared-code
reviews: [message-decides, first-true-wins]
assumes: [variable, variable-update, if, else, list, list-index, length, radio, radio-number]
title: A shared code
summary: Send a place number that stands for a word in a list both micro:bits share.
language: makecode
explainPicture: lesson.ts#chooser
hook: "Morse code, flag signals and the numbers a fast-food counter calls out all work because both sides agree what each code means."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#chooser", lesson: "code/microbit-play/microbit-messages", target: "microbit" }
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
code: lesson.ts#predict
check:
  type: predict
  q: "You press A on one micro:bit, so it sends 2. What does the other micro:bit show?"
  options: ["2", "Hi", "Yes", "No"]
  actual: "No. The receiver looks up place 2 in its list: Hi is at 0, Yes at 1, No at 2."
```

The receiver shows **get value at receivedNumber**: the word at the place that arrived.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: microbit, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I pressed A and checked which word the other micro:bit showed." }
```

Press **A** on one micro:bit and read the word on the other.

## Investigate

```step
stage: investigate
code: lesson.ts#chooser
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
```

**A** steps through the list; **B** sends the place number of the chosen word.

### Choose and send

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

In Python, the receiver is one line: `basic.show_string(words[receivedNumber])`. The square brackets mean "the item at this place", just like *get value at*.

## Modify

```step
stage: modify
insight: "Adding to the shared list needs no other change, because the loop back to 0 uses the list's length. A reply is just another agreed number."
try: { playground: microbit, starter: "lesson.ts#chooser" }
tasks:
  - hint: "Click + on the list block. Both micro:bits run the same program, so one change updates both lists."
    check: { type: code, text: "Add a fourth word to the list.", rules: { count: { "\",\"": 3 } } }
  - hint: ["In on radio received: if receivedNumber = 99, show a tick; else show the word and send 99.", "Ask about 99 first, because 99 is not a place in the list."]
    check: { type: code, text: "Reply with 99 when a message arrives, and show a tick when 99 comes back.", rules: { contains: ["radio.sendNumber(99)", "receivedNumber==99"] } }
```

### One more word

Add a fourth word. Did you need to change anything else? Why not?

### Got it!

Make the receiver **reply**: when a word arrives, it sends back 99, and the sender shows a tick when 99 arrives. Real messaging apps do this to show "delivered".

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "The first true question wins, so the order of the questions about receivedNumber decides what each number does."
check:
  type: trace
  text: "What does this receiver show for each number that arrives?"
  table: |
    | receivedNumber | shows |
    | 1 | [happy face] |
    | 2 | [sad face] |
    | 5 | [cross] |
  explain: "5 is more than 3, so the first part runs. 2 is not more than 3, but it is more than 1. 1 is neither, so else runs."
```

## Make

```step
stage: make
try: { playground: microbit, starter: "lesson.ts#make" }
hint:
  - "Make a list of moods and a variable mood. A changes mood by 1 and goes back to 0 at the end of the list."
  - "B sends mood. on radio received shows get value at receivedNumber."
check: { type: code, text: "A mood check-in: A chooses a mood from a list, B sends its place, and the other micro:bit shows the mood.", rules: { count: { "\",\"": 2 }, contains: ["radio.sendNumber(", "radio.onReceivedNumber(", "[receivedNumber]"] } }
unlocks: [shared-code]
```

Make a **mood check-in** for the start of class. Each student's micro:bit has a list of moods (at least three). **A** steps through them, **B** sends the chosen one, and the teacher's micro:bit shows it.

## Change a quiz buzzer

```step
stage: modify
try: { playground: microbit, starter: "lesson.ts#buzzer" }
```

This buzzer lets you pick an answer, A, B or C, and send it to the quiz master. Add a fourth answer, D, then make the quiz master's micro:bit show a tick after each answer arrives.

```teacher
summary: "Students send a place number that stands for a word in a list both micro:bits share, and see that a message is a code both sides must agree on."
time: 45
timing: "Predict and Run 7 min · Investigate 12 min · Modify 10 min · Mix it up 3 min · Make 9 min · Quiz buzzer 4 min"
goals:
  - I can send a place number and look up the word it stands for.
  - I can explain why both micro:bits need the same list in the same order.
  - I can step through a list with a button and loop back to the start.
before: |
  This lesson joins earlier ideas: **lists** (places from 0), **variables** (the chosen place) and **radio**. Both micro:bits hold the same list of words. Instead of sending a word, the sender sends its **place number**; the receiver shows the word at that place (*get value at receivedNumber*). That shared list is a **code**, and both sides must agree on it exactly: same words, same order. Stepping through a list uses a variable that goes up by 1 and goes back to 0 when it reaches the length. A reply (such as 99 for "got it") is just another agreed number that is not a place in the list.
running:
  - "Predict: many say 2. Ask what the receiver does with the number (looks it up)."
  - "Run: it shows No. Say it plainly: the number is a code for a word both sides know."
  - "Investigate: the trace shows the loop back to 0. Ella and Tom is this lesson's misconception: a code only works if both sides share it."
  - "Modify: adding a word needs nothing else changed, because of the length. The reply task is how real apps show 'delivered'."
  - "Mix it up: else if over receivedNumber, where the order of the questions matters."
  - "Make: a mood check-in. With real micro:bits, the teacher's micro:bit can sit at the front."
stuck:
  - see: "The wrong word shows."
    ask: "Are both lists the same, in the same order?"
    fix: "Make the lists match exactly on both micro:bits."
  - see: "Pressing A past the end shows nothing or an error."
    ask: "What happens when choice reaches the length of the list?"
    fix: "Add if choice = length of words, set choice to 0."
  - see: "The tick shows instead of the word, or the word shows instead of the tick."
    ask: "Which number means 'got it', and is it checked first?"
    fix: "Check receivedNumber = 99 first; else show the word."
stretch: "Send two numbers in one message: the sender's player number times 10, plus the word's place (so 23 means player 2 said word 3). Decode it on the receiver."
support: "Give students the mood list and the A stepping blocks, and ask them to add the sending and receiving."
leads: "Next unit: time. The micro:bit can measure how long something takes. Class ideas: a class emoji vote; a secret code where groups invent their own word lists and swap them."
exit:
  q: "Your micro:bit sends 1. Your list is Hi, Yes, No. Your partner's list is Yes, No, Hi. What does your partner's micro:bit show, and why?"
  a: "No. Only the place number travels, and place 1 in your partner's list is No."
explain: |
  If both micro:bits have the **same list**, a **place number** is all you need to send. The receiver shows the word at that place: *get value at receivedNumber*.

  The shared list is a **code**. It only works if both sides use the same words in the same order.
solutions:
  step-4#t1: lesson.ts#sol-word
  step-4#t2: lesson.ts#sol-reply
  step-6: lesson.ts#sol-make
struggle: "Both sides must share the same list in the same order. When the wrong word shows, ask them to compare the two lists item by item."
class:
  activities:
    - at: investigate
      title: Codebooks
      minutes: 4
      do: |
        Pairs each write a list of three words. One holds up a place number; the other says the word at that place in their own list.
      notes: "Swap one pair's lists into a different order. The code breaks: that is Ella and Tom."
    - at: end
      title: Check in
      minutes: 3
      do: |
        Send your mood to the next pair's micro:bit. Did they get the mood you meant?
```

```code lesson.ts#predict
let words = ["Hi", "Yes", "No"]
radio.setGroup(1)
radio.onReceivedNumber(function (receivedNumber) {
    basic.showString(words[receivedNumber])
})
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(2)
})
```

```code lesson.ts#chooser
let words = ["Hi", "Yes", "No"]
let choice = 0
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    choice += 1
    if (choice == words.length) {
        choice = 0
    }
    basic.showString(words[choice])
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(choice)
    basic.showIcon(IconNames.Yes)
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showString(words[receivedNumber])
})
```

```code lesson.ts#sol-word
let words = ["Hi", "Yes", "No", "Help"]
let choice = 0
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    choice += 1
    if (choice == words.length) {
        choice = 0
    }
    basic.showString(words[choice])
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(choice)
    basic.showIcon(IconNames.Yes)
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showString(words[receivedNumber])
})
```

```code lesson.ts#sol-reply
let words = ["Hi", "Yes", "No", "Help"]
let choice = 0
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    choice += 1
    if (choice == words.length) {
        choice = 0
    }
    basic.showString(words[choice])
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(choice)
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 99) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showString(words[receivedNumber])
        radio.sendNumber(99)
    }
})
```

```code lesson.ts#review
radio.setGroup(1)
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber > 3) {
        basic.showIcon(IconNames.No)
    } else if (receivedNumber > 1) {
        basic.showIcon(IconNames.Sad)
    } else {
        basic.showIcon(IconNames.Happy)
    }
})
```

```code lesson.ts#make
radio.setGroup(1)
```

```code lesson.ts#sol-make
let moods = ["Happy", "Tired", "Hungry", "Excited"]
let mood = 0
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    mood += 1
    if (mood == moods.length) {
        mood = 0
    }
    basic.showString(moods[mood])
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(mood)
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showString(moods[receivedNumber])
})
```

```code lesson.ts#buzzer
let answers = ["A", "B", "C"]
let pick = 0
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    pick += 1
    if (pick == answers.length) {
        pick = 0
    }
    basic.showString(answers[pick])
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(pick)
    basic.clearScreen()
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showString(answers[receivedNumber])
})
```
