---
order: 2
unit: accounts
node: AC9TDI8P13 n2
shape: 5e
title: A second lock
summary: "Multi-factor authentication asks for something you have (a phone, a security key) or are (a fingerprint) as well as something you know. A leaked password alone is no longer enough. Codes can still be tricked out of you by a fake sign-in page; a security key only answers the real site."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Ava's passwords have all leaked. Can she still keep her accounts?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8494
  url: http://127.0.0.1:8494/index.html
  readySelector: ".cycard"
  layout: full
explainPicture: { ref: cyber.yml#explain-pic, caption: "Ava's four accounts, each with a choice of second factor: none, SMS code, app code or security key." }
explainClip:
  query: { code: "@cyber.yml#explain", fresh: 1, id: explain }
  caption: "A second factor"
  say: "Every password has leaked."
  clip:
    - click: "Someone tries the leaked passwords"
    - caption: { text: "With only passwords, all four accounts are broken into.", say: "With only a password, every account falls." }
    - wait: 1400
    - click: "School email: App code"
    - click: "Game site: SMS code"
    - click: "Club app: App code"
    - click: "Online shop: Security key"
    - click: "Someone tries the leaked passwords"
    - expect: { selector: "#gsum", contains: "4 blocked" }
    - caption: { text: "A second factor on each: the password isn't enough any more.", say: "With a second factor, the leaked password is not enough." }
    - wait: 1600
---
**Your mission:** the worst has happened. Every one of Ava's passwords is on a leaked list. Keep her accounts hers anyway.

## Engage: the password is out

```step
stage: predict
insight: "Committing to whether a leaked password is enough tests the new move: a second factor is something the attacker doesn't have."
check:
  type: predict
  q: "Ava's school email password has leaked, but she has turned on codes sent to her phone. Someone types in her password. What happens?"
  options: ["They are asked for the code, and they don't have her phone, so they're stopped", "They get straight in: they have the password", "The account is deleted", "Ava's phone gets the password"]
  actual: "Stopped. The password is only half; the code comes to Ava's phone, which they don't have."
```

## Explore: keep the accounts

```step
stage: run
insight: "Students watch a leaked password open everything, then add second factors until nothing opens."
try: { playground: board, starter: "cyber.yml#explore", height: 580 }
tasks:
  - check: { type: board, text: "Press Attempt: someone tries the leaked passwords. What happens?", when: "t = 1 and i = 4", explain: "Every account falls: a password is all they need." }
  - check: { type: board, text: "Give every account a second factor, then try again.", when: "t = 1 and i = 0", explain: "Blocked everywhere: they have the passwords, but not Ava's phone or key." }
```

Was your prediction right?

### Attempt

### Add a second factor

## Explain: something you know, have or are

```step
stage: investigate
insight: "The teacher models the three kinds of factor and names why a second one blocks a leaked password. Sam leaves an account unprotected, the misconception planted after the method."
check:
  type: bug
  code: "working.txt#sam"
  text: "Sam decides which accounts need a second factor. Click the line where it first goes wrong."
  answer: 4
  fault: logic
  misconception: mfa-only-important
  explain: "Line 4: a taken game account can message Sam's friends, spend money, and help someone guess or reset other accounts. Turn MFA on wherever it's offered."
```

**Multi-factor authentication** (MFA) asks for two different kinds of proof:

```worked
\text{something you know} :: A password or PIN. This is the part that leaks.
\text{something you have} :: A phone (an SMS or app code) or a security key you plug in or tap.
\text{something you are} :: A fingerprint or face, usually to unlock the phone or key.
\text{two kinds} \Rightarrow \text{a leak isn't enough} :: Someone with the password still needs the thing Ava has.
```

### Find the mistake

## Elaborate: the fake page

```step
stage: modify
insight: "One change: a fake sign-in page that asks for the code as well. Codes typed into it can be passed on; a security key only answers the real site."
try: { playground: board, starter: "cyber.yml#elaborate", height: 600 }
tasks:
  - check: { type: board, text: "Give every account an SMS or app code. Then switch on the fake sign-in page (Ava types her code into it) and attempt.", when: "p = 1 and t = 1 and n = 4 and k = 0 and i = 4", explain: "The fake page passed Ava's codes straight on: codes help, but they can be tricked out of you." }
  - check: { type: board, text: "With the fake page still on, protect every account.", when: "p = 1 and t = 1 and i = 0", explain: "Security keys: a key checks which site is asking and only answers the real one, so the fake page gets nothing." }
```

### Codes and a fake page

### Hold anyway

## Elaborate: one key

```step
stage: make
insight: "Choosing factors under a limit (one security key) reverses the process: from what matters most to the protection it gets."
try: { playground: board, starter: "cyber.yml#make", height: 600 }
hint: ["Which account would hurt most to lose? Email can reset all the others.", "Key on the school email; app codes on the rest."]
check: { type: board, text: "Ava has one security key. Use it where it matters most, give every other account a code, and attempt with the fake page off.", when: "k = 1 and e = 1 and n = 4 and t = 1 and i = 0 and p = 0", explain: "Email gets the key: whoever controls your email can reset everything else. Codes protect the rest against a leaked password." }
```

## Evaluate: look back

```step
stage: info
tasks:
  - check:
      type: question
      q: "Ava gets a text with a sign-in code she didn't ask for. A minute later someone calls, says they're from the school and asks her to read out the code. What should she do?"
      options: ["Refuse, hang up, and change her password: someone has it", "Read it out: they're from the school", "Ignore the text and carry on", "Reply to the text with the code"]
      answer: 0
      feedback: [null, "No real helper ever needs your code.", "The text means someone typed her password.", "The code must never be shared."]
      explain: "An unexpected code means someone has her password. The call is the trick for the second half."
  - check: { type: reflect, text: "I can explain how a second factor protects an account when the password has leaked, and why a security key also beats a fake page." }
```

### The phone call

### Look back
