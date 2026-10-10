---
order: 6
unit: trust
title: Agreeing a key in the open
summary: Both ends need the same key, but anything sent by radio is public. Each end mixes a private number with public numbers, swaps the mixes, and both arrive at the same key without it ever being sent.
language: makecode
hook: "Every time you open a secure web page, your computer and a server agree a key with a stranger, in public, in less than a second. This lesson is the idea behind it, with numbers small enough to follow by hand."
---
The last lesson needs both micro:bits to hold the **same key**. How do they get it? If one sends the key by radio, everyone in the group hears it (lesson 1). Meeting in person works for two friends, but not for a phone and a web server.

The trick: agree a key **in public** without ever sending it.

1. Two **public numbers** are known to everyone: **P = 23** and **G = 5**.
2. Each micro:bit picks a **private number** and never tells anyone: say 6 and 15.
3. Each sends a **mix**: **G to the power of its private number, remainder after dividing by P**. 5⁶ mod 23 is **8**; 5¹⁵ mod 23 is **19**. These are sent over the air.
4. Each takes the other's mix and raises it to its **own** private number, mod P. 19⁶ mod 23 = **2**, and 8¹⁵ mod 23 = **2**. They match, and the key 2 was never sent.

The function **modPow** does "base to the power, remainder after dividing by prime" with a loop.

## Predict

```step
stage: predict
code: keys.ts#predict
check:
  type: predict
  q: "One micro:bit has private number 6 (this program) and the other has 15. Both press A, so each hears the other's mix. What does each micro:bit show?"
  options: ["8 on one and 19 on the other", "2 on both", "6 on one and 15 on the other", "23 on both"]
  actual: "2 on both. The micro:bit with 6 receives 19 and shows 19⁶ mod 23 = 2; the one with 15 receives 8 and shows 8¹⁵ mod 23 = 2."
```

## Run

```step
stage: run
code: keys.ts#run
try: { playground: microbit, starter: "keys.ts#run" }
check: { type: reflect, text: "I pressed A on both simulated micro:bits and both showed the same number, even though each picked a different private number." }
```

Each simulated micro:bit picks its own random private number. Press **A** on both (one after the other) and compare the numbers shown.

## Investigate

```step
stage: investigate
code: keys.ts#predict
insight: "The shared key is worked out on each micro:bit from a private number that never leaves it. What goes through the air is not enough to find the key quickly, once the numbers are big."
tasks:
  - check:
      type: number
      q: "A micro:bit with private number 3 sends its mix: 5³ mod 23. What number goes out? (5³ = 125.)"
      answer: 10
      explain: "125 ÷ 23 is 5 with remainder 10, so the mix is 10."
  - check:
      type: sort
      q: "Which of these cross the air, and which stay on one micro:bit?"
      options: ["Crosses the air", "Stays on one micro:bit"]
      items:
        - ["P and G", "Crosses the air"]
        - ["The mix (8 or 19)", "Crosses the air"]
        - ["A private number (6 or 15)", "Stays on one micro:bit"]
        - ["The shared key (2)", "Stays on one micro:bit"]
  - check:
      type: question
      q: "With P = 23 anyone who hears the mixes could simply try every private number from 1 to 22. Why is the real thing safe?"
      options: ["It uses a secret radio group", "The real P and private numbers have hundreds of digits, so there are far too many to try", "It sends the mixes twice", "Only the first mix is public"]
      answer: 1
      explain: "This is the same lesson as the Caesar cipher: a small number of keys can be tried one by one. Real systems use numbers so large that trying them all would take longer than the age of the universe."
```

### Mixes and keys

### What goes across

### Why the toy numbers are weak

## Modify

```step
stage: modify
insight: "Once both ends have the same number, it can be the key for the cipher from the last lesson."
try: { playground: microbit, starter: "keys.ts#run" }
hint: "B sends a secret number locked with shared: radio send number (7 ^ shared). On radio received number, show received number ^ shared."
check: { type: code, text: "B sends a number locked with the agreed key; the other micro:bit unlocks it.", rules: { contains: ["radio.sendNumber(7^shared)", "receivedNumber^shared", "radio.sendValue(\"mix\""] } }
```

First press **A** on both micro:bits, so each works out **shared**. Then let **B** send the number 7 locked with **shared**, and show it unlocked on the other.

## Make

```step
stage: make
try: { playground: microbit, starter: "keys.ts#make" }
hint:
  - "A sends the mix; when a mix arrives, work out shared and show a tick."
  - "B sends pin ^ shared; a number received is shown after ^ shared."
check: { type: code, text: "A key exchange, then a locked PIN: A sends the mix and the key is worked out, B sends the PIN locked with it, and the receiver unlocks it.", rules: { contains: ["radio.sendValue(\"mix\",modPow(G,secret,P))", "shared=modPow(value,secret,P)", "radio.sendNumber(pin^shared)", "receivedNumber^shared"] } }
```

Put it together: **A** sends your mix and each micro:bit works out the shared key and shows a tick; **B** sends a PIN locked with it; the other micro:bit unlocks and shows the PIN. The key was never sent.
