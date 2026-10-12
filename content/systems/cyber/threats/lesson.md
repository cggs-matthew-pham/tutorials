---
order: 5
unit: system
node: AC9TDI10P13 n1
assumes: [AC9TDI10K01]
shape: 5e
title: Threat models
summary: "A threat model follows the data through a system on a data-flow diagram: where it travels, where it is stored, and who can change it. Each point has its own risk (read on the way, copied from storage, used by the wrong person) and its own defence (HTTPS, hashing and encryption, access control and MFA). One defence doesn't cover them all."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The club app has HTTPS: the padlock is showing. Is it secure?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8497
  url: http://127.0.0.1:8497/index.html
  readySelector: ".cycard"
  layout: full
explainPicture: { ref: cyber.yml#explain-pic, caption: "The club app's data-flow diagram, with three points to defend: sign-in, the password database and the admin page." }
explainClip:
  query: { code: "@cyber.yml#explain", fresh: 1, id: explain }
  caption: "One point, one risk, one defence"
  say: "Follow the data."
  clip:
    - click: "Member signs in (browser → app): Read on the way"
    - caption: { text: "At sign-in, the password travels across the network: it could be read on the way.", say: "At sign in, the password could be read on the way." }
    - wait: 1200
    - click: "Member signs in (browser → app): HTTPS (encrypt on the way)"
    - expect: { selector: "#gsum", contains: "1 of 3 points defended" }
    - caption: { text: "HTTPS encrypts it on the way. Two points left, each with a different risk.", say: "H T T P S encrypts it on the way. Two points left." }
    - wait: 1500
---
**Your mission:** before the club app launches, map where members' data goes and name a defence for every point where it could go wrong.

## Engage: is the padlock enough?

```step
stage: predict
insight: "Committing to whether HTTPS secures the whole app tests the new move: each point in a data flow needs its own defence."
check:
  type: predict
  q: "The club app uses HTTPS (the padlock). Which data does that protect?"
  options: ["Only data travelling between the browser and the app", "Everything: the stored passwords and the admin page too", "Only the photos", "Nothing: the padlock is decoration"]
  actual: "Only data on the way. Stored passwords and who may use the admin page need their own defences."
```

## Explore: defend each point

```step
stage: run
insight: "Students match a risk and a defence to each point of the diagram and find that one defence doesn't fit all."
try: { playground: board, starter: "cyber.yml#explore", height: 600 }
check: { type: board, text: "For each point in the diagram, choose what could go wrong and the defence that fits.", when: "d = n and r = n", explain: "Sign-in: read on the way, HTTPS. Stored passwords: copied from storage, hash them. Admin page: used by the wrong person, access control and MFA." }
```

Was your prediction right?

## Explain: follow the data

```step
stage: investigate
insight: "The teacher models the threat-model questions on one point. Sam trusts HTTPS for everything, the misconception planted after the method."
check:
  type: bug
  code: "working.txt#sam"
  text: "Sam secures the club app. Click the line where it first goes wrong."
  answer: 4
  fault: logic
  misconception: https-solves-all
  explain: "Line 4: HTTPS only protects data while it travels. The stored passwords and the admin page are still open."
```

A **threat model** follows the data through a system and asks, at each point, what could go wrong and what stops it.

```worked
\text{draw the flow} :: Browser → app → database, plus anyone who can change things (the admin).
\text{travelling} :: Data on the network can be read on the way: encrypt it (HTTPS).
\text{stored} :: Data in a database can be copied: hash passwords, encrypt the rest.
\text{who may act} :: A page that changes data can be used by the wrong person: access control and MFA.
\text{check} :: Every point has a defence; no single defence covers every point.
```

### Find the mistake

## Elaborate: photos

```step
stage: modify
insight: "One change: a new feature adds two points to the diagram, one travelling and one about who may see."
try: { playground: board, starter: "cyber.yml#elaborate", height: 720 }
check: { type: board, text: "Members can now upload photos. Defend all five points.", when: "d = n and r = n", explain: "The upload travels (HTTPS); who can see each photo is about the wrong person (access control). New features add new points." }
```

## Elaborate: messages

```step
stage: make
insight: "Applying the model to a feature on their own: students place each point and its defence without the earlier diagram."
try: { playground: board, starter: "cyber.yml#make", height: 600 }
hint: ["Is the message travelling, stored, or being opened by someone?", "Who should be allowed to read a conversation?"]
check: { type: board, text: "The committee wants members to message each other. Threat-model the new feature.", when: "d = n and r = n", explain: "Sending: HTTPS. Saved messages: encrypt them. Opening a conversation: only the people in it (access control)." }
```

## Evaluate: look back

```step
stage: info
tasks:
  - check:
      type: question
      q: "The school's canteen app lets parents top up lunch money. Which point needs access control most?"
      options: ["Changing whose account the money goes to", "Showing the menu", "Loading the logo", "Showing opening hours"]
      answer: 0
      feedback: [null, "Anyone may see the menu.", "The logo is public.", "Opening hours are public."]
      explain: "Pages that change data, or money, are where the wrong person does harm."
  - check: { type: reflect, text: "I can follow data through a system and name a risk and a defence at each point." }
```

### The canteen app

### Look back
