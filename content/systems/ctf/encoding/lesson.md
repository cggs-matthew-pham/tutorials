---
order: 1
unit: skills
node: AC9TDI8K02 n4
introduces: [encoding]
assumes: [text-as-numbers, binary]
shape: 5e
title: Encoding is not encryption
summary: "Binary, hex and base64 are encodings: the same data written another way by a public rule. They look scrambled, but anyone can turn them back, so they hide nothing. Encryption needs a secret key as well: without it, the data can't be read. Use encryption to keep something secret, and hashing (Security and privacy) to store passwords."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The club app stored its admin password as cm9ib3RzMjAyNg==. It looks like nonsense. Is it safe?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8542
  url: http://127.0.0.1:8542/index.html
  readySelector: ".ecform"
  layout: full
explainPicture: { ref: encode.yml#explain-pic, caption: "One message written five ways: plain text, binary, hex, base64 and encrypted with a key word. Eve tries every public decoder on whatever is sent." }
explainClip:
  query: { code: "@encode.yml#explain", fresh: 1, id: explain }
  caption: "Who can read it?"
  say: "Send a message past Eve."
  clip:
    - click: "Send as Base64"
    - caption: { text: "Base64 looks scrambled, but its rule is public: Eve decodes it straight away.", say: "Base 64 looks scrambled, but anyone can decode it." }
    - wait: 1400
    - type: { into: Key word, text: gears }
    - press: Enter
    - click: "Send as Encrypted"
    - expect: { selector: "#gsum", contains: "can't read" }
    - caption: { text: "Encrypted with a key word: Eve has no key, so she can't read it. Ava has it.", say: "Encrypted with a key. Eve can't read it." }
    - wait: 1500
---
**Your mission:** the club sends meeting places and stores passwords. Find out which ways of writing them actually keep them secret, before anyone else does.

## Engage: does it look safe?

```step
stage: predict
insight: "Committing to whether scrambled-looking data is safe tests the new move: encoding is a public rule, and only a key keeps data secret."
check:
  type: predict
  q: "The club app stored its admin password as cm9ib3RzMjAyNg== (base64). Could someone who copies it read the password?"
  options: ["Yes: base64 is a public rule anyone can undo", "No: it looks like random letters", "Only with the club's key", "Only if they guess it"]
  actual: "Yes. Base64 has no key: anyone can decode it, and it says robots2026."
```

## Explore: get it past Eve

```step
stage: run
insight: "Students try every encoding against an eavesdropper and find only the keyed one works, failing first."
try: { playground: board, starter: "encode.yml#explore", height: 600 }
tasks:
  - check: { type: board, text: "Send the meeting message as base64. Can Eve read it?", when: "f = 3 and e = 1", explain: "Yes: Eve tries the base64 decoder, which anyone can use." }
  - check: { type: board, text: "Send it so Eve can't read it but Ava can. Ava's key word is gears.", when: "e = 0 and q = 1", explain: "Only Encrypted, with the key word Ava shares, gets past Eve. Binary, hex and base64 are public rules." }
```

### Base64

### Past Eve

Was your prediction right?

## Explain: encoding, encryption, hashing

```step
stage: investigate
insight: "The teacher models deciding whether a form of data has a key. Sam trusts hex, the misconception planted after the method."
check:
  type: bug
  code: "working.txt#sam"
  text: "Sam stores the admin password. Click the line where it first goes wrong."
  answer: 3
  fault: logic
  misconception: encoding-is-encryption
  explain: "Line 3: hex is a public rule. Anyone who copies the database reads robots. Passwords should be stored as salted hashes."
```

```worked
\text{encoding} :: Binary, hex, base64: the same data by a public rule. No key, so anyone can undo it.
\text{encryption} :: A rule plus a secret key. Without the key, it can't be read; with it, it can.
\text{hashing} :: One-way: you can check a password against it, but not turn it back. For storing passwords.
\text{test} :: Ask: is there a secret key? If not, it isn't secret.
```

### Find the mistake

## Elaborate: decode it

```step
stage: modify
insight: "One change at a time: a single encoding, then layers of them, showing that stacking public rules still hides nothing."
try: { playground: board, starter: "encode.yml#stored", height: 440 }
tasks:
  - starter: "encode.yml#stored"
    check: { type: board, text: "Decode the stored admin password from the hook.", when: "d = 1", explain: "Base64 gives robots2026. The club must change it and store a hash instead." }
  - starter: "encode.yml#hex"
    check: { type: board, text: "A message from the club's old app. Which rule was used? Decode it.", when: "d = 1", explain: "Hex: pairs of digits 0 to 9 and a to f. It says meet in room 12." }
  - starter: "encode.yml#layers"
    check: { type: board, text: "This one was encoded twice. Undo both layers.", when: "d = 1", explain: "Base64, then binary: bring a robot. Two public rules are still public." }
```

### The stored password

### Which rule?

### Two layers

## Elaborate: Ava's reply

```step
stage: make
insight: "Reversing the explore: reading an encrypted reply needs the shared key, the one thing an encoding never has."
try: { playground: board, starter: "encode.yml#key", height: 440 }
hint: ["Try the public decoders first: do any work?", "It's encrypted. You and Ava share a key word."]
check: { type: board, text: "Ava replied with the door code, encrypted with your shared key word. Read it.", when: "d = 1", explain: "With gears it reads the code is 4417. Without the key word, no decoder helps." }
```

## Evaluate: look back

```step
stage: info
tasks:
  - check:
      type: question
      q: "A website says your password is \"encrypted\" and shows it in base64 on your account page. What's wrong?"
      options: ["Base64 isn't encryption: anyone can decode it, and a password shouldn't be shown at all", "Nothing: base64 is a kind of encryption", "It should use hex instead", "It should show it in binary"]
      answer: 0
      feedback: [null, "No key, no secret.", "Hex is public too.", "Binary is public too."]
      explain: "Passwords should be stored as salted hashes and never shown back."
  - check: { type: reflect, text: "I can tell encoding from encryption, and say which one keeps data secret." }
```

### The account page

### Look back
