---
order: 3
unit: accounts
node: AC9TDI8P13 n3
shape: 5e
title: Spot the phish
summary: "Phishing messages pretend to be someone you trust to get a password, money or a click. The signs: a sender address that isn't quite right, pressure or a deadline, a request for a password or payment, and a link that goes somewhere other than its text. When unsure, go to the site or person yourself."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The email says it's from school IT, and the link says school.example/login. Would you click?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8495
  url: http://127.0.0.1:8495/index.html
  readySelector: ".cycard"
  layout: full
explainPicture: { ref: cyber.yml#explain-pic, caption: "Ava's inbox: four messages to mark Safe or Report, each link checkable before deciding." }
explainClip:
  query: { code: "@cyber.yml#explain", fresh: 1, id: explain }
  caption: "Checking a link"
  say: "An email from school IT."
  clip:
    - click: "Check link in Your account will be closed today"
    - caption: { text: "The link says school.example/login, but really goes to schooI-help.example: a capital I, not an l.", say: "The link text and where it really goes don't match." }
    - wait: 1600
    - click: "Your account will be closed today: Report"
    - expect: { selector: "#gsum", contains: "1 correctly" }
    - caption: { text: "Report it: a lookalike address, a deadline, and a link that lies.", say: "Report it." }
    - wait: 1400
---
**Your mission:** members are getting suspicious messages. Sort Ava's inbox, then make sure the club's own emails can't be mistaken for a trick.

## Engage: where does it go?

```step
stage: predict
insight: "Committing to where a link goes tests the new move: the words of a link and where it really goes can differ."
check:
  type: predict
  q: "An email's link says school.example/login. Where will clicking it take you?"
  options: ["Wherever the link really points, which might not be school.example", "Always to school.example/login: that's what it says", "Nowhere until you type your password", "To your email inbox"]
  actual: "Wherever it really points. The words of a link can say anything; check where it goes before you trust it."
```

## Explore: sort the inbox

```step
stage: run
insight: "Students sort real-looking messages, checking links, and find the signs by getting some wrong first."
try: { playground: board, starter: "cyber.yml#explore", height: 620 }
check: { type: board, text: "Mark every message Safe or Report. Check the links before you decide.", when: "a = 4 and c >= 2", explain: "Two are phishing: a prize with a countdown and a password request, and a lookalike \"School IT\" whose link goes somewhere else." }
```

Was your prediction right?

## Explain: the signs

```step
stage: investigate
insight: "The teacher models checking one message live, naming each sign. Sam trusts the display name, the misconception planted after the method."
check:
  type: bug
  code: "working.txt#sam"
  text: "Sam gets an email. Click the line where it first goes wrong."
  answer: 3
  fault: logic
  misconception: right-name-is-safe
  explain: "Line 3: anyone can type any name. Check the address it really came from, and whether a teacher would ever ask for gift cards (never)."
```

**Phishing** is a message pretending to be someone you trust, to get something from you.

```worked
\text{who sent it?} :: Look at the address, not just the name. A lookalike (schooI with a capital I) is a warning.
\text{pressure?} :: Deadlines, threats and prizes are there to make you act before you think.
\text{what does it want?} :: A password, a code, money or gift cards: real organisations don't ask for these by message.
\text{where does the link go?} :: Check it. If the text and the destination differ, don't click.
\text{unsure?} :: Go to the site or person yourself (type the address, use the app, ask in person).
```

### Find the mistake

## Elaborate: trickier messages

```step
stage: modify
insight: "One change: trickier messages, including a real one that looks like a phish and a phish from the right-looking address."
try: { playground: board, starter: "cyber.yml#elaborate", height: 680 }
check: { type: board, text: "A harder inbox. Mark all five correctly.", when: "a = 5", explain: "The gift-card favour, the delivery fee and the \"reply with your password\" are phish; the parcel tracking and the library are real. The request, not the look, gives it away." }
```

## Elaborate: the club's own email

```step
stage: make
insight: "Reversing the process: students make a real message that can't be mistaken for a phish, using every sign in reverse."
try: { playground: board, starter: "cyber.yml#make", height: 520 }
hint: ["Read each feature of the newsletter as if it were in Ava's inbox.", "Fix the sender, the subject, the link text and what it asks for."]
check: { type: board, text: "The club's newsletter looks like a phish, so members ignore it. Fix every feature.", when: "a = 1", explain: "The real address, a calm subject, a link that shows where it goes, and no requests: the opposite of every phishing sign." }
```

## Evaluate: look back

```step
stage: info
tasks:
  - check:
      type: question
      q: "A text from \"your bank\" says your card is locked and gives a link to unlock it. What's the safest move?"
      options: ["Open the bank's own app or type its address yourself and check there", "Tap the link quickly before the card stays locked", "Reply asking if it's real", "Forward it to a friend to check"]
      answer: 0
      feedback: [null, "Speed is what the message wants from you.", "Replying tells them your number is real.", "Your friend can't see where it came from either."]
      explain: "Go to the real place yourself; never through the message's link."
  - check: { type: reflect, text: "I can list the signs of a phishing message and say what to do when I'm unsure." }
```

### The bank text

### Look back
