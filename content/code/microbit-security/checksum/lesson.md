---
order: 7
unit: trust
title: Has the message changed?
summary: A checksum is a small number worked out from a message and sent with it. If the number the receiver works out is different, the message was damaged or changed on the way.
language: makecode
assumes: [radio-value, value-name-limit]
hook: "A bar code, a bank card number and a downloaded file all carry a small check number. If one digit is wrong, the scanner or the browser notices and refuses to trust it."
---
Radio can garble a message (a bit flips in the air), and a message can be changed on purpose. Encryption keeps a message **private**; it does not tell you it is **unchanged**. A **checksum** is the tool for that.

The sender works out a small number from the message (here: add up each letter's place in the alphabet, keep the last digit) and sends it with the message. The receiver works it out again. If the two differ, something changed.

**send value** sends a name and a number together (Agreeing a key in the open). Here the name is the message itself and the number is its checksum, so each message can be **8 characters at most**: a longer one is cut short on the way and fails its own checksum.

## Predict

```step
stage: predict
code: checksum.ts#predict
check:
  type: predict
  q: "The receiver gets A's message, then B's message (HELLP with HELLO's checksum). What does it show?"
  options: ["HELLO, then HELLP", "HELLO, then a cross", "A cross, then HELLO", "HELLP, then HELLO"]
  actual: "HELLO, then a cross. The first matches its checksum (HELLO adds up to 7). HELLP adds up to 8, so it doesn't match the 7 that arrived."
```

## Run

```step
stage: run
code: checksum.ts#predict
try: { playground: microbit, starter: "checksum.ts#predict" }
check: { type: reflect, text: "I pressed A and B and saw that B's changed message was rejected." }
```

**B** pretends the message was damaged on the way: the text changed but the checksum is still the old one.

## Investigate

```step
stage: investigate
code: checksum.ts#predict
insight: "A checksum notices accidents. Because anyone can work out the same number from the public method, it does not notice a deliberate change; a secret key mixed into the checksum does."
tasks:
  - check:
      type: number
      q: "What is the checksum of KEY? (K is 10, E is 4, Y is 24. Add them and keep the last digit.)"
      answer: 8
      explain: "10 + 4 + 24 = 38, and the last digit is 8."
  - check:
      type: question
      q: "A message HELLO changes to EHLLO (two letters swap). Does this checksum notice?"
      options: ["Yes, always", "No: the letters add to the same total", "Only for short messages", "Yes, because the order changed"]
      answer: 1
      explain: "Addition ignores order, so swapped letters give the same checksum. That is a weakness of this simple checksum. Real checksums are sensitive to order."
  - check:
      type: question
      q: "Someone changes the message in the air and also works out the new checksum with the same public method. What does the receiver think?"
      options: ["It spots the change", "Nothing wrong: the checksum matches the changed message", "It shows an error", "It asks for the key"]
      answer: 1
      explain: "A public checksum protects against accidents, not against a person who deliberately changes the message. If the checksum also needs a secret key, nobody without the key can produce a matching one."
```

### Working it out

### Swapped letters

### A deliberate change

## Modify

```step
stage: modify
insight: "Starting the total from a secret number makes the checksum depend on a key that only the two ends know."
try: { playground: microbit, starter: "checksum.ts#predict" }
hint: "Make a variable secretKey = 7, and start total from secretKey instead of 0."
check: { type: code, text: "The checksum starts from a secret key.", rules: { contains: ["secretKey=7", "total=secretKey"] } }
```

Mix a **secret key** into the checksum. Both micro:bits know it, and nobody else does, so only they can work out a matching number.

## Make

```step
stage: make
try: { playground: microbit, starter: "checksum.ts#make" }
hint:
  - "A sends MEET with its checksum; B sends a damaged MEAT with MEET's checksum."
  - "On receiving, show a tick when the checksum matches; otherwise add one to bad and show a cross. A+B shows bad."
check: { type: code, text: "A sends a good message and B a damaged one; the receiver shows a tick or a cross, and counts the bad ones.", rules: { contains: ["checksum(name)==value", "basic.showIcon(IconNames.Yes)", "bad+=1", "input.onButtonPressed(Button.AB"] } }
```

Make a **message checker**: the receiver shows a tick for a good message and a cross for a bad one, and **A+B** shows how many bad messages have arrived.
