---
order: 10
unit: defend
title: Defend the door lock
summary: A radio door lock has three weaknesses. Find each one, name the tool from this course that fixes it, and build the fixes in milestones.
language: makecode
hook: "Security teams run 'red team, blue team' exercises. The blue team defends: they audit their own system, find where it is weak, and fix it before anyone else can find the same weakness."
---
This is the **blue team** challenge: you defend a system you own. Below is a **radio door lock**: the key micro:bit sends the door code, and the lock opens if the code is right.

It works. Your job is to **audit** it (find its weaknesses), then **harden** it with what you have built.

## Predict

```step
stage: predict
code: lock.ts#weak
check:
  type: predict
  q: "A is pressed on the key micro:bit. A third micro:bit in the same radio group is switched on. Which micro:bits can read the door code 4271?"
  options: ["Only the lock", "Only the lock and the key", "Every micro:bit in the group", "None: radio is private"]
  actual: "Every micro:bit in the group. The code goes out as plain text, which is the lesson from the very first lesson in this course."
```

## Run

```step
stage: run
code: lock.ts#weak
try: { playground: microbit, starter: "lock.ts#weak" }
check: { type: reflect, text: "I pressed A and saw the lock open with a tick." }
```

## Audit

```step
stage: investigate
code: lock.ts#weak
insight: "Each weakness has a matching tool: privacy needs a cipher, a changed message needs a checksum, and a reusable message needs a challenge and response."
tasks:
  - check:
      type: sort
      q: "Match each weakness of the door lock with the tool that fixes it."
      options: ["Encrypt it with a shared key", "Add a checksum with a secret key", "Use a challenge and response"]
      items:
        - ["The code 4271 goes out as plain text, so every micro:bit in the group can read it", "Encrypt it with a shared key"]
        - ["The lock can't tell a damaged or changed message from a real one", "Add a checksum with a secret key"]
        - ["The same message opens the lock every time, so one that was heard once works again", "Use a challenge and response"]
  - check:
      type: question
      q: "Which fix needs the key to be agreed beforehand, or by a key exchange?"
      options: ["Only the checksum", "Only the challenge and response", "All three: each uses the secret key", "None of them"]
      answer: 2
      explain: "The cipher, the keyed checksum and the answer function all use the same secret key, so both ends need it before they start. That is what a key exchange is for."
```

### Find the weaknesses

### The key

## Milestone 1: lock the code

```step
stage: modify
insight: "The first fix is the one from the XOR lesson: the lock and the key share a number, and the code travels locked with it."
try: { playground: microbit, starter: "lock.ts#step1" }
hint:
  - "A sends 4271 ^ secretKey as a number."
  - "On radio received number, open if received number ^ secretKey is 4271."
check: { type: code, text: "The code is locked with the shared key and the lock unlocks it before comparing.", rules: { contains: ["radio.sendNumber(4271^secretKey)", "receivedNumber^secretKey", "==4271"] } }
```

Send the code **locked with secretKey** instead of as text, and have the lock unlock it before checking.

## Milestones 2 and 3: harden it

```step
stage: make
try: { playground: microbit, starter: "lock.ts#make" }
tasks:
  - hint: "A sends the word KNOCK as a name with its checksum: radio send value (KNOCK, checksum(KNOCK)). The lock only goes on if the checksum matches."
    check: { type: code, text: "The knock carries a keyed checksum and the lock checks it.", rules: { contains: ["radio.sendValue(\"KNOCK\",checksum(\"KNOCK\"))", "checksum(\"KNOCK\")==value"] } }
  - hint: "The lock picks randint(10, 99), sends it as CHALL, and the key micro:bit sends back answer(value) as ANSWER. The lock opens only if the answer is answer(challenge)."
    check: { type: code, text: "A new challenge each knock, answered with the secret key; the lock opens only on the right answer.", rules: { contains: ["randint(", "radio.sendValue(\"CHALL\"", "radio.sendValue(\"ANSWER\",answer(value))", "value==answer(challenge)"] } }
```

### Milestone 2: a checksum on the knock

Replace the locked code with a **knock** that carries a keyed checksum. The lock goes on only if the checksum matches.

### Milestone 3: a challenge and response

Instead of a fixed code, the lock sends a **random challenge**; the key answers it, and the lock opens only on the right answer. The functions **checksum** and **answer** are already in the starter: you built them in earlier lessons.

## Report

```step
stage: info
check:
  type: question
  q: "Your final lock fixes three weaknesses. Which one weakness is still there, however well you build it?"
  options: ["Nothing: it is perfectly secure", "If the secret key is lost or leaked, all three protections fail", "The radio group is too small", "Challenges are always too short"]
  answer: 1
  explain: "Everything rests on the key. Real systems protect keys carefully, change them regularly, and use much stronger tools than these classroom versions. Security is an ongoing job, not a finish line."
```

Every protection in your lock rests on one secret key. Security is the habit of asking "what could go wrong here?", then fixing each answer.
