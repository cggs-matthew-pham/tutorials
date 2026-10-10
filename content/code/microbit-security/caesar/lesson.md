---
order: 3
unit: codes
title: The Caesar cipher
summary: Shift every letter along the alphabet by a secret number. The method is public; the number is the key.
language: makecode
introduces: [index-of, remainder]
hook: "Julius Caesar is said to have shifted each letter of his orders three places along the alphabet. Anyone who did not know the shift saw nonsense."
---
The **Caesar cipher** shifts every letter along the alphabet by the **key**. With key 3, A becomes D, B becomes E, and Z wraps round to C. The function **shift** moves one letter; **encrypt** shifts every letter of a message. Spaces and numbers pass through unchanged.

Two things are new: `ALPHABET.indexOf(letter)` finds a letter's place in the alphabet (A is 0), and `% 26` ("remainder after dividing by 26") wraps the end of the alphabet back to the start.

## Predict

```step
stage: predict
code: caesar.ts#predict
check:
  type: predict
  q: "A is pressed. What does the micro:bit show?"
  options: ["HELLO", "KHOOR", "EBIIL", "DHOOR"]
  actual: "KHOOR. H→K, E→H, L→O, L→O, O→R: each letter moves three places along."
```

## Run

```step
stage: run
code: caesar.ts#predict
try: { playground: microbit, starter: "caesar.ts#predict" }
check: { type: reflect, text: "I pressed A and compared what scrolled with my prediction." }
```

## Investigate

```step
stage: investigate
code: caesar.ts#predict
insight: "The key is the number of places to shift; % 26 wraps the end of the alphabet; to undo a shift you shift the rest of the way round."
tasks:
  - check:
      type: number
      q: "With key 3, which place does Z (place 25) move to? (A is 0.)"
      answer: 2
      explain: "25 + 3 = 28, and 28 % 26 = 2: place 2 is C. Without % 26 it would run off the end of the alphabet."
  - check:
      type: question
      q: "What does encrypt do with the key 0?"
      options: ["Nothing is changed", "Every letter becomes A", "It stops with an error", "Every letter moves one place"]
      answer: 0
      explain: "A shift of 0 leaves each letter where it is. Key 26 does the same, because 26 % 26 is 0. A key of 0 or 26 would be no secret at all."
  - check:
      type: question
      q: "Ana encrypted a message with key 5. To decrypt it, which key should she use with the same encrypt function?"
      options: ["5 again", "−5, or 21 (26 − 5)", "10", "26"]
      answer: 1
      explain: "Shifting by 5 and then by 21 is 26 places in all: the full circle back to the start. So decrypt(message, key) is encrypt(message, 26 − key)."
```

### Z wraps round

### Key zero

### Going back

## Modify

```step
stage: modify
insight: "Decrypting is encrypting with the rest of the circle."
try: { playground: microbit, starter: "caesar.ts#predict" }
hint: "Make a function decrypt(message, key) that returns encrypt(message, 26 − key). Then show decrypt(encrypt(\"HELLO\", 3), 3)."
check: { type: code, text: "A decrypt function that undoes encrypt, so the micro:bit shows HELLO again.", rules: { contains: ["function decrypt(", "encrypt(message,26-key)", "decrypt(encrypt("] } }
```

Add a **decrypt** function and test it by encrypting and decrypting **HELLO**.

## Make

```step
stage: make
try: { playground: microbit, starter: "caesar.ts#make" }
hint:
  - "A variable key starts at 3. B adds one to key and shows it."
  - "A sends encrypt(MEET AT 3, key) by radio; the receiver shows decrypt(received string, key)."
check: { type: code, text: "A sends an encrypted message by radio; the receiver decrypts it with the same key; B changes the key.", rules: { contains: ["radio.sendString(encrypt(", "decrypt(receivedString,key)", "key+=1"] } }
```

Make a **secret messenger**. **A** sends an encrypted message by radio and the receiver decrypts it with the same key; **B** adds one to the key on this micro:bit. Try it with both micro:bits using the same key, then with different keys. What does the receiver show?
