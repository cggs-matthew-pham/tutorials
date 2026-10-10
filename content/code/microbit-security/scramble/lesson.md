---
order: 2
unit: messages
title: Scrambling is not a secret
summary: A scrambling method works only while nobody knows the method. A real code has a public method and a secret key.
language: makecode
hook: "A message written backwards looks secret for about ten seconds. The question is what makes a code truly hard to read, and the answer is not hiding the method."
---
A first idea for privacy is to **scramble** the message before sending it. The micro:bit below reverses the text with a **function** (a named job, from micro:bit Foundations). `HELLO` goes out as `OLLEH`.

## Predict

```step
stage: predict
code: scramble.ts#predict
check:
  type: predict
  q: "A is pressed. What does the other micro:bit show?"
  options: ["HELLO", "OLLEH", "H", "Nothing"]
  actual: "OLLEH. The receiver shows exactly what the radio carried, and the radio carried the reversed text. The receiver never undoes it."
```

## Run

```step
stage: run
code: scramble.ts#predict
try: { playground: microbit, starter: "scramble.ts#predict" }
check: { type: reflect, text: "I ran it and saw OLLEH on the receiver." }
```

## Investigate

```step
stage: investigate
code: scramble.ts#predict
insight: "Scrambling with a method everyone knows hides nothing from someone who knows the method. A code needs a secret, and the secret must be separate from the method."
tasks:
  - check:
      type: question
      q: "Sam knows the sender reverses every message. A message arrives: OLLEH. What does Sam do to read it?"
      options: ["Nothing: it is secret", "Reverse it again", "Try all 256 groups", "Ask the sender to send it twice"]
      answer: 1
      explain: "Reversing twice gets back the original. Once the method is known, the scrambling is no protection."
  - check:
      type: match
      q: "Match each part of a code with its job."
      pairs:
        - ["The method", "the steps for scrambling and unscrambling; can be public"]
        - ["The key", "a secret value the method needs; only the two people know it"]
        - ["The plain text", "the message before it is scrambled"]
        - ["The cipher text", "the scrambled message that travels"]
  - check:
      type: question
      q: "Which is the better rule for a code?"
      options: ["Keep the method secret and hope", "Assume the method is known, and keep only the key secret", "Use a longer method", "Send the message twice"]
      answer: 1
      explain: "Methods leak: they get copied, written down and guessed. A key can be changed in a moment, so the key is what to protect."
```

### Undoing it

### The parts of a code

### What to protect

## Modify

```step
stage: modify
insight: "The receiver must undo the sender's scrambling, using the same function."
try: { playground: microbit, starter: "scramble.ts#predict" }
hint: "In on radio received string, show reverse(received string)."
check: { type: code, text: "The receiver reverses the text back before showing it.", rules: { contains: ["basic.showString(reverse(receivedString))"] } }
```

Make the receiver show **HELLO** again.

## Make

```step
stage: make
try: { playground: microbit, starter: "scramble.ts#make" }
hint:
  - "scramble: build a result text, adding each letter and then an X after it (MEET becomes MXEXEXTX)."
  - "unscramble: take every second letter, starting at the first."
check: { type: code, text: "Your own scrambler and unscrambler as two functions: A sends the scrambled text and the receiver shows the unscrambled text.", rules: { contains: ["function scramble(", "function unscramble(", "radio.sendString(scramble(", "unscramble(receivedString)"] } }
```

Invent a scrambling method of your own as two functions, **scramble** and **unscramble**, and send a message through them. Then ask a partner to guess your method from the scrambled text alone. Would it still work once they know it?
