---
order: 5
unit: codes
title: One key to lock and unlock
summary: XOR mixes a number with a key. Doing it again with the same key brings the number back, so one shared key works in both directions.
language: makecode
hook: "Most of the secret messages on the internet are locked with a key that both ends already share. The locking step is much like this lesson, only with far bigger numbers."
---
A computer stores numbers as patterns of **bits** (0s and 1s). **XOR** (written `^`) compares two numbers bit by bit: where the bits differ the answer has a 1, where they match it has a 0.

```
  7 = 111
  5 = 101
7 ^ 5 = 010 = 2
```

Now the useful part: **do it again with the same key and you get the original back**. 2 ^ 5 = 7. So the sender computes `message ^ key`, and the receiver computes `received ^ key`. One shared key, one operation, both directions.

## Predict

```step
stage: predict
code: xor.ts#predict
check:
  type: predict
  q: "A is pressed. The radio carries a number. What does the receiving micro:bit show?"
  options: ["2", "5", "7", "12"]
  actual: "7. The radio carried 7 ^ 5 = 2. The receiver computes 2 ^ 5 = 7, the original number."
```

## Run

```step
stage: run
code: xor.ts#predict
try: { playground: microbit, starter: "xor.ts#predict" }
check: { type: reflect, text: "I pressed A and saw 7 on the receiver, even though the radio carried a different number." }
```

Open **Show data** in the simulator and find the number the radio carried.

## Investigate

```step
stage: investigate
code: xor.ts#predict
insight: "XOR with a key scrambles a number, and XOR with the same key unscrambles it. A wrong key gives a wrong answer, not an error."
tasks:
  - check:
      type: number
      q: "What number does the radio carry when the sender encrypts 6 with key 3? (6 is 110 in bits and 3 is 011.)"
      answer: 5
      explain: "110 XOR 011 = 101, which is 5."
  - check:
      type: question
      q: "The sender encrypted 6 with key 3, so the radio carries 5. A receiver wrongly uses key 4. What does it show?"
      options: ["An error message", "1", "6", "Nothing"]
      answer: 1
      explain: "5 ^ 4 = 101 ^ 100 = 001 = 1. The receiver gets a wrong number and no warning. Nothing in XOR tells you the key was wrong."
  - check:
      type: question
      q: "Why does the receiver use the very same operation the sender used?"
      options: ["Because XOR undoes itself when you repeat it with the same key", "Because the radio flips the bits back", "Because the micro:bit remembers the number", "Because 5 is a special key"]
      answer: 0
      explain: "(message ^ key) ^ key = message. The key cancels itself."
```

### Locking a number

### A wrong key

### Why it works both ways

## Modify

```step
stage: modify
insight: "Both micro:bits must hold the same key. Change one and they stop understanding each other."
try: { playground: microbit, starter: "xor.ts#predict" }
hint: "B adds one to key (back to 1 after 15) and shows it. Make both micro:bits agree before pressing A."
check: { type: code, text: "B changes the key and shows it.", rules: { contains: ["input.onButtonPressed(Button.B", "key+=1", "basic.showNumber(key)"] } }
```

Let **B** change the key and show it. Set the key the same on both micro:bits, then press **A**. Then make the keys different. What happens?

## Make

```step
stage: make
try: { playground: microbit, starter: "xor.ts#make" }
tasks:
  - hint:
      - "A variable pin holds 4271; A sends pin ^ key by radio."
      - "On radio received number, show received number ^ key."
    check: { type: code, text: "A door keypad sends a PIN locked with the key; the receiver unlocks it and shows it.", rules: { contains: ["radio.sendNumber(pin^key)", "receivedNumber^key", "basic.showNumber("] } }
  - check:
      type: question
      q: "Press A three times. The radio carries the same number each time. Why might that be a problem for a door keypad?"
      options: ["It is not a problem", "Anyone who hears the number once has a number that works every time", "The micro:bit runs out of numbers", "The key changes each time"]
      answer: 1
      explain: "The locked PIN is the same every time. A listener doesn't need the key to repeat it. You will fix this in the Challenge–response lesson."
```

### The PIN

### The same number again

Send a four-digit PIN, locked with a shared key, to a second micro:bit that unlocks and shows it.
