---
order: 3
unit: safe
node: [AC9TDI8K02 n3, AC9TDI8K02 n4]
title: Who can see your data?
summary: "Packets pass through Wi-Fi and routers you don't control, and anyone along the way can copy them. So anything private must be encrypted on your device before it leaves: scrambled with a key, so only someone with the key can turn it back. Encryption only works because it can be reversed."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "You type your PIN on the café's free Wi-Fi. Between you and the bank, who else gets a copy?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8472
  url: http://127.0.0.1:8472/index.html
  readySelector: ".nwbox"
  layout: full
explainPicture: { ref: snoop.yml#explain-pic, caption: "With encryption on, Eve on the café Wi-Fi copies only scrambled text; the bank, which knows the key, turns it back into the PIN." }
explainClip:
  query: { code: "@snoop.yml#explain", fresh: 1, id: explain }
  caption: "Plain or encrypted"
  say: "Eve is listening on the café Wi-Fi."
  clip:
    - caption: { text: "Sent as it is, Eve can read the PIN.", say: "Sent as plain text, Eve reads the PIN." }
    - click: { selector: "button.go" }
    - wait: 3600
    - click: "Encrypt: off"
    - caption: { text: "Encrypted first, Eve sees only scrambled text. The bank has the key.", say: "Encrypted first, Eve sees only scrambled text." }
    - click: { selector: "button.go" }
    - wait: 3600
    - expect: { selector: "#gsum", contains: "scrambled" }
    - wait: 1000
---
In Packets, routers passed each packet along. But who owns those routers? Your packets go through the Wi-Fi you're on, your internet provider and many other networks. Anyone with access to one of them can copy the packets as they pass.

## Predict: who can read it?

```step
stage: predict
insight: "Committing to who can read an unencrypted message tests the new move: packets cross shared equipment, so anyone on the path can read plain text."
check:
  type: predict
  q: "You type your PIN into a website on a café's free Wi-Fi. The website has **no encryption**. Who could read the PIN on its way to the bank?"
  options: ["Anyone on the café Wi-Fi, or on any network it passes through", "Only the bank", "Nobody: packets are private", "Only people with a password to the bank"]
  actual: "Anyone on the path. Packets cross the café's Wi-Fi and other networks you don't control, and plain text can be read by anyone who copies them."
```

## Try: send it plain

```step
stage: run
insight: "Sending the PIN with encryption off settles the prediction: Eve's panel shows it in full."
try: { playground: board, starter: "snoop.yml#run", height: 520 }
check: { type: board, text: "Send the PIN with encryption off. What does Eve see?", when: "f >= 1 and v = 1", explain: "Eve copied the packets as they crossed the café Wi-Fi and read the PIN: nothing stopped her." }
```

Was your prediction right? Now look at the Encrypt button.

## Worked example: encrypt, then send

```step
stage: investigate
insight: "Following the PIN through encryption with key 3 and back models the new move: the scrambled packets are useless to Eve, and reversing with the key restores them. Sam assumes only the receiver sees a message, the misconception planted after the method."
tasks:
  - check:
      type: question
      q: "With key 3, every letter moves 3 along (A → D) and every digit moves 3 along (7 → 0). What does **CAT 12** become?"
      options: ["FDW 45", "ZXQ 89", "CAT 12", "DBU 23"]
      answer: 0
      feedback: [null, "That moved backwards. Encrypting moves forwards by the key.", "Encryption changes the text.", "That is a key of 1."]
      explain: "C→F, A→D, T→W, 1→4, 2→5."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam decides whether it is safe to type a password. Click the line where the reasoning first goes wrong."
      answer: 3
      fault: logic
      misconception: packets-private
      explain: "Line 3: the message goes to the bank, but it passes through the café Wi-Fi and other networks first, and anyone there can copy it. Without encryption, they can read it."
  - check:
      type: question
      q: "Why must encryption be **reversible**?"
      options: ["The receiver has to turn it back into the real message with the key", "So that Eve can read it too", "So it takes less space", "It doesn't have to be"]
      answer: 0
      feedback: [null, "Eve doesn't have the key, so she can't reverse it.", "Encryption doesn't make data smaller.", "A scramble nobody can undo would be useless to the bank too."]
      explain: "Encrypt with the key, decrypt with the key. If it couldn't be reversed, nobody could read the message, including the bank."
```

### PIN 4821 with key 3

```worked
\text{PIN 4821} :: Your message, before it leaves.
\text{P} \to \text{S},\ \text{I} \to \text{L},\ \text{N} \to \text{Q} :: Encrypt: each letter moves 3 along.
4821 \to 7154 :: Each digit moves 3 along, wrapping round after 9 (8 → 1).
\text{SLQ 7154} :: This is what travels, and all Eve can copy.
\text{SLQ 7154} \to \text{PIN 4821} :: The bank moves everything 3 back: decrypt with the same key.
```

This shift (a Caesar cipher) is easy to break, as the Secret messages course shows. Real encryption uses far stronger maths, but works the same way: a public method and a secret key.

### Find the mistake

### Why reversible?

## Vary: one setting at a time

```step
stage: modify
insight: "Each task changes one setting: encryption on, then key 0, then key 10 (which leaves the digits unchanged), then how many keys there are to try."
try: { playground: board, starter: "snoop.yml#modify", height: 520 }
tasks:
  - check: { type: board, text: "Switch encryption on and send.", when: "e = 1 and f >= 1 and v = 0 and k = 1", explain: "Eve copied only scrambled text, and the bank, with the key, read the PIN." }
  - check: { type: board, text: "Set the key to 0 and send. What does Eve see?", when: "e = 1 and s = 0 and f >= 1 and v = 1", explain: "A key of 0 moves nothing, so the message is still plain: the key matters as much as the method." }
  - check: { type: board, text: "Set the key to 10 and send. Look closely at the digits.", when: "s = 10 and z = 1 and f >= 1", explain: "Digits wrap round every 10, so a key of 10 leaves the PIN unchanged while the letters change. Eve still gets the PIN: a weak key." }
  - check:
      type: question
      q: "This shift has only 26 different keys. How could Eve break it without knowing the key?"
      options: ["Try every key until the message makes sense", "She can't, without the key", "Ask the bank", "Wait for the message to be sent twice"]
      answer: 0
      feedback: [null, "26 keys take seconds to try.", "The bank won't help her.", "Seeing it twice doesn't reveal the key."]
      explain: "Trying every key (a brute force attack) breaks it in seconds. Real encryption has so many keys that trying them all would take longer than the age of the universe."
```

### Encryption on

### Key 0

### Key 10

### Too few keys

## Practise: keep it safe

```step
stage: practise
insight: "Choosing what needs encryption, decrypting with a key, the padlock on websites, and a review of packets."
tasks:
  - check:
      type: question
      q: "Which of these most needs encrypting when you send it?"
      options: ["Your bank password", "The time of a public bus timetable", "The weather forecast you're reading", "A news headline"]
      answer: 0
      feedback: [null, "It's public anyway.", "It's public anyway.", "It's public anyway."]
      explain: "Passwords, card numbers and private messages must be encrypted; public information is less of a worry (though encrypting everything also hides what you are reading)."
  - check:
      type: question
      q: "A message was encrypted with key 3. You receive **KHOOR**. What did it say?"
      options: ["HELLO", "NKRRU", "KHOOR", "GDKKN"]
      answer: 0
      feedback: [null, "That moved forward again. Decrypt by moving back 3.", "It needs decrypting.", "That moved back 4."]
      explain: "Move each letter back 3: K→H, H→E, O→L, O→L, R→O."
  - check:
      type: question
      q: "What does the padlock in a browser's address bar mean?"
      options: ["Data between you and the website is encrypted (HTTPS)", "The website is honest and safe to buy from", "Nobody can see that you visited the site", "The site has no adverts"]
      answer: 0
      feedback: [null, "Scam sites can have a padlock too: it protects the trip, not your trust in the site.", "Your provider can still see which site; the padlock hides what is sent.", "Nothing to do with adverts."]
      explain: "HTTPS encrypts what travels between your browser and that website."
  - check:
      type: question
      q: "Review: a packet is lost on the way. With TCP, what happens?"
      options: ["The receiver never confirms it, so it is sent again", "The whole message starts again", "The message arrives with a gap", "The router rebuilds it"]
      answer: 0
      feedback: [null, "Only the missing packet.", "That's without TCP.", "Routers don't rebuild packets."]
      explain: "TCP resends only the packet that was never acknowledged."
```

### What needs encrypting

### Decrypt

### The padlock

### Review: packets

## Make: a safe key

```step
stage: make
insight: "Choosing a key that scrambles both the letters and the digits reverses the process: students start from what Eve must not see and pick the setting."
try: { playground: board, starter: "snoop.yml#make", height: 520 }
hint: ["Key 0 changes nothing.", "Digits wrap round every 10, so keys 10 and 20 leave them unchanged.", "Any key from 1 to 25 that isn't 10 or 20 works."]
check: { type: board, text: "Encryption is on but the key is 0. Choose a key that scrambles both the letters and the digits, send the PIN, and check the bank still reads it.", when: "e = 1 and s > 0 and z = 0 and f >= 1 and v = 0 and k = 1", explain: "Eve copied only scrambled text, digits included, and the bank decrypted it with the key." }
```

Then: the Secret messages course (Code) builds this cipher on micro:bits, cracks it, and shares a key safely.
