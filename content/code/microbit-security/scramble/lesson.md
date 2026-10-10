---
order: 2
unit: messages
title: Scrambling is not a secret
summary: A scrambling method works only while nobody knows the method. A real code has a public method and a secret key.
language: makecode
introduces: [param, return-value, loop-index, text-char]
hook: "A message written backwards looks secret for about ten seconds. The question is what makes a code truly hard to read, and the answer is not hiding the method."
---
A first idea for privacy is to **scramble** the message before sending it. The micro:bit below reverses the text with a **function** (a named job, from micro:bit Foundations). `HELLO` goes out as `OLLEH`.

**Behind the code:** in micro:bit Foundations a function was a named job. This one, **reverse**, also takes a value **in** and hands one **back**:

- `reverse("HELLO")` hands `"HELLO"` to the function, which calls it `text`. A value handed in like this is a **parameter**.
- **return** hands the answer back, so `reverse("HELLO")` can go anywhere a text can, such as inside **send string**.

Inside, a **for index** loop (in **Loops**) visits each place in the text, from 0 up to its length − 1. `text.charAt(i)` is the letter at place `i`, counted from 0 like a list. `result` starts empty, and each time round the next letter is joined on at the **front**, so the text comes out backwards. Every cipher in this course is built this way: a function that walks through a message letter by letter and returns a new one.

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
      q: "In reverse(\"HELLO\"), what is result after the loop has run for i = 0 and then i = 1?"
      options: ["HE", "EH", "H", "OL"]
      answer: 1
      explain: "At i = 0 the letter at place 0, H, is joined in front of the empty result: H. At i = 1, E is joined in front: EH. Each new letter goes on the front, so the order flips."
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

### Inside reverse

The loop runs once for each place in `HELLO`: i is 0, 1, 2, 3, then 4.

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
  - "scramble: start with an empty result, and loop through the places like reverse does. Join each letter and then an X onto the end (MEET becomes MXEXEXTX). Return the result."
  - "unscramble: the real letters sit at places 0, 2, 4 and so on. Loop i from 0 up to half the length, and join on the letter at place i × 2."
check: { type: code, text: "Your own scrambler and unscrambler as two functions: A sends the scrambled text and the receiver shows the unscrambled text.", rules: { contains: ["function scramble(", "function unscramble(", "radio.sendString(scramble(", "unscramble(receivedString)"] } }
```

Invent a scrambling method of your own as two functions, **scramble** and **unscramble**, and send a message through them. Then ask a partner to guess your method from the scrambled text alone. Would it still work once they know it?
