---
order: 8
unit: review
node: [AC9TDI10P13 n1, AC9TDI10P14 n3]
assumes: [AC9TDI10K01]
shape: 5e
title: Security review
summary: "Before the club app launches, review it like a security team: inspect its accounts, its data and its system, choose the fix that really closes each weakness, and collect a flag for each section you make safe. Everything from the course comes together: unique passphrases and MFA, collecting only what is needed, hashed passwords, a real privacy notice, HTTPS and updates."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The club app launches tomorrow. Seven weaknesses are hiding in it. Find and fix them all."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8540
  url: http://127.0.0.1:8540/index.html
  readySelector: ".cycard"
  layout: full
explainPicture: { ref: cyber.yml#explain-pic, caption: "The security review: three sections of the club app (Accounts, Data, System), each with weaknesses to inspect and fix." }
explainClip:
  query: { code: "@cyber.yml#explain", fresh: 1, id: explain }
  caption: "Inspect, then fix"
  say: "Review the club app."
  clip:
    - click: "Inspect Accounts 1"
    - caption: { text: "The admin account uses the same password as the game site.", say: "The admin password is the game site's password." }
    - wait: 1000
    - click: "Add a ! to the end of it"
    - caption: { text: "Not enough: a leaked password with ! added is one of the first guesses.", say: "Not enough. That's one of the first guesses." }
    - wait: 1400
    - click: "Give it a unique passphrase"
    - expect: { selector: "#gsum", contains: "1 of 7" }
    - caption: { text: "A unique passphrase closes it. Each section, fully fixed, shows its flag.", say: "A unique passphrase closes it." }
    - wait: 1500
---
**Your mission:** the club app launches tomorrow. Review it the way a security team reviews its own systems: inspect every part, choose fixes that really close each weakness, and collect a flag for each section you make safe. Each flag looks like **WP{…}**.

## Engage: why review it yourself?

```step
stage: predict
insight: "Committing to why a team reviews its own system frames the finale: find and fix weaknesses before launch, defensively."
check:
  type: predict
  q: "Why does a security team review its own app before it launches?"
  options: ["To find and fix weaknesses before anyone can use them", "To prove the programmers made no mistakes", "Because apps can't be fixed after launch", "To make the app run faster"]
  actual: "To find and fix them first. Fixing before launch is cheaper and nobody's data is exposed."
```

## Explore: the review

```step
stage: run
insight: "Students apply every lesson of the course to one system, and the wrong fixes explain why they fall short."
try: { playground: board, starter: "cyber.yml#explore", height: 760 }
check: { type: board, text: "Inspect every part of the club app and fix all seven weaknesses.", when: "x = n", explain: "Accounts: unique passphrase and a security key. Data: only what's needed, salted hashes and a real notice. System: HTTPS and an update from the real source." }
```

Was your prediction right?

## Explain: the flags

```step
stage: investigate
insight: "Each flag marks a section made safe; the explain for each names the course idea behind it."
tasks:
  - check:
      type: flag
      q: "Flag 1: the Accounts section, once both its weaknesses are fixed, shows a flag. Type it."
      hash: 66a0ee317da6c26d4e5a9c8a50ffd9228b64df09ad16097e0b209ce4b89be373
      explain: "A unique passphrase stops a leak elsewhere opening this account (Passwords); a security key stops a stolen or phished password being enough (Second factors)."
  - check:
      type: flag
      q: "Flag 2: the Data section's flag. Type it."
      hash: a60701c70fd3aab1f8b33fcfb834310a19841dda0e7f3c220b95f400452511db
      explain: "Collect only what's needed (footprint, APP 3), store salted hashes so a copied database gives away no passwords (APP 11), and tell members what and why (APP 5)."
  - check:
      type: flag
      q: "Flag 3: the System section's flag. Type it."
      hash: bc19c7f9c39d3a5b93755e279986ebe2d97f796e20d195f3dcdfc73a2c660c1b
      explain: "HTTPS protects data on the way (threat model); updating the add-on from its real source closes a supply-chain weakness."
```

```worked
\text{Accounts} :: User weaknesses: reused passwords and no second factor. Fix: unique passphrases and MFA.
\text{Data} :: Privacy and storage: unneeded fields, passwords as typed, no notice. Fix: collect less, hash, tell people.
\text{System} :: Travelling and supply chain: no HTTPS, an old add-on. Fix: HTTPS and updates from the real source.
\text{wrong fixes} :: Each wrong option sounds helpful but leaves the weakness open: ask what it actually stops.
```

### Accounts

### Data

### System

## Elaborate: launch day

```step
stage: make
insight: "The same review with no second tries: every fix must be right first time, showing the course's ideas are secure."
try: { playground: board, starter: "cyber.yml#launch", height: 760 }
hint: ["For each weakness, ask what each fix actually stops.", "A fix that only sounds careful (rename, hide, ask nicely) leaves the weakness open."]
check: { type: board, text: "The launch-day copy has the same seven weaknesses. Fix every one, choosing the right fix first time.", when: "x = n and w = 0", explain: "Seven right first time: the club app is ready to launch." }
```

## Evaluate: look back

```step
stage: info
tasks:
  - check:
      type: question
      q: "After launch, which habit keeps the club app safe longest?"
      options: ["Review it again whenever it changes, and install updates", "Never change it again", "Hide its address", "Turn off its error messages"]
      answer: 0
      feedback: [null, "New flaws are found in old code too.", "Addresses get found.", "That hides problems; it doesn't fix them."]
      explain: "Security isn't done once: every new feature adds points to the threat model, and updates fix flaws found later."
  - check: { type: reflect, text: "I can review a system's accounts, data and setup, and choose fixes that really close each weakness." }
```

### Keeping it safe

### Look back
