---
order: 8
unit: trust
title: Prove it with a challenge
summary: A password sent again and again is the same every time. A challenge that changes each time makes each answer good for one use only.
language: makecode
hook: "Car key fobs, tap-to-pay cards and building passes do not send a fixed code. The reader sends a random number, and the card answers in a way only it can. Next time the number is different."
---
In the XOR lesson the keypad sent the **same locked PIN every time**. Anyone who ever heard that number has a number that works today, tomorrow and next week, without ever knowing the key.

The fix is a **challenge and response**:

1. The key micro:bit **knocks**.
2. The lock picks a **random challenge** and sends it.
3. The key micro:bit works out an **answer** from the challenge and the secret key, and sends it.
4. The lock works out the same answer itself and opens only if they match.

The secret key never goes through the air, and the answer is different whenever the challenge is.

## Predict

```step
stage: predict
code: lock.ts#predict
check:
  type: predict
  q: "The key micro:bit knocks. The lock picks the challenge 50. The answer is (n × 7 + 3) remainder 100. What answer goes through the air?"
  options: ["50", "53", "353", "7"]
  actual: "53. 50 × 7 + 3 = 353, and the remainder after dividing by 100 is 53."
```

## Run

```step
stage: run
code: lock.ts#predict
try: { playground: microbit, starter: "lock.ts#predict" }
check: { type: reflect, text: "I knocked several times and saw a tick each time, with a different challenge and answer each time." }
```

Press **A** a few times. Open **Show data** and compare the challenge and answer numbers each time.

## Investigate

```step
stage: investigate
code: lock.ts#predict
insight: "A fixed answer works forever once it has been heard. An answer that depends on a fresh challenge works once. The key proves itself without ever being sent."
tasks:
  - check:
      type: number
      q: "The lock picks the challenge 20. What answer opens the lock? (n × 7 + 3, remainder after dividing by 100.)"
      answer: 43
      explain: "20 × 7 + 3 = 143, and the remainder after dividing by 100 is 43."
  - check:
      type: question
      q: "Yesterday the lock's challenge was 50 and the answer 53. Today the lock picks a new challenge. Why is 53 unlikely to open it today?"
      options: ["53 is used up", "The new challenge is almost certainly different, so its answer is different", "The lock changes its key", "Radio forgets old numbers"]
      answer: 1
      explain: "The answer depends on the challenge. A new challenge gives a new answer, so an old answer fits only the old challenge."
  - check:
      type: sort
      q: "For each item, does it cross the air in the challenge-and-response?"
      options: ["Crosses the air", "Never crosses the air"]
      items:
        - ["The knock", "Crosses the air"]
        - ["The challenge", "Crosses the air"]
        - ["The answer", "Crosses the air"]
        - ["The secret key", "Never crosses the air"]
```

### Working out an answer

### An answer heard before

### What crosses the air

## Modify

```step
stage: modify
insight: "The lock can keep a record of what happened, such as how many times it opened."
try: { playground: microbit, starter: "lock.ts#predict" }
hint: "Make a variable opened. Add one to it when the answer is right. B shows it."
check: { type: code, text: "The lock counts how many times it opened; B shows the count.", rules: { contains: ["opened+=1", "input.onButtonPressed(Button.B", "basic.showNumber(opened)"] } }
```

Make the lock count how many times it opened, and show the count when **B** is pressed.

## Make

```step
stage: make
try: { playground: microbit, starter: "lock.ts#make" }
hint:
  - "Add one to wrong when an answer is wrong and set wrong to 0 when it is right."
  - "On a knock, if wrong is 3 or more: show a skull, pause 5 seconds, set wrong to 0. Otherwise send the challenge."
check: { type: code, text: "After three wrong answers the lock refuses to give a challenge for five seconds.", rules: { contains: ["wrong+=1", "wrong>=3", "basic.pause(5000)", "radio.sendValue(\"challenge\""] } }
```

Make the lock safer. After **three wrong answers** it shows a skull and ignores knocks for **five seconds**. Why does this help against someone who just guesses?
