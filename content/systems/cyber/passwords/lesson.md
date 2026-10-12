---
order: 1
unit: accounts
node: AC9TDI8P13 n1
shape: 5e
title: When passwords fail
summary: "Passwords fail in three predictable ways: a site leaks its list, one password reused everywhere lets that leak open every account, and common or personal passwords are on the lists people try first. Long random passphrases, a different one for every site, fix it."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A game site Ava used once has just been hacked. Is her school email safe?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8493
  url: http://127.0.0.1:8493/index.html
  readySelector: ".cycard"
  layout: full
explainPicture: { ref: cyber.yml#explain-pic, caption: "Ava's four accounts and their passwords: two are guessable and two share a passphrase." }
explainClip:
  query: { code: "@cyber.yml#explain", fresh: 1, id: explain }
  caption: "One leak, every account"
  say: "Ava uses one password everywhere."
  clip:
    - click: "Leak the Game site's passwords"
    - caption: { text: "The game site leaks, and the same password opens all four accounts.", say: "One leak opens every account." }
    - wait: 1500
    - click: "School email: kettle-moon-river-pencil"
    - click: "Club app: violin-cactus-harbour-tea"
    - click: "Online shop: orbit-velvet-lantern-fig"
    - click: "Leak the Game site's passwords"
    - expect: { selector: "#gsum", contains: "1 of 4" }
    - caption: { text: "A different long passphrase for each: the leak only reaches the game site.", say: "A different passphrase for each account stops the spread." }
    - wait: 1600
---
**Your mission:** you are the Coding Club's new security officer. Your first job: help Ava, a member, keep her accounts safe.

## Engage: one leak

```step
stage: predict
insight: "Committing to how far one leak spreads sets up the new move: reuse turns one breach into many, and guessable passwords fall anyway."
check:
  type: predict
  q: "Ava uses the password sunshine1 for her school email, a game site, the club app and an online shop. The game site leaks its passwords. How many of her accounts are now open to someone else?"
  options: ["All four", "Just the game site", "None: the passwords were secret", "Two: the game site and the shop"]
  actual: "All four. Whoever has the leaked list tries the same password everywhere, and sunshine1 is on every list of common passwords anyway."
```

## Explore: stop the spread

```step
stage: run
insight: "Students make the leak stop at one account, discovering both fixes: a different password for each site, and passwords that can't be guessed."
try: { playground: board, starter: "cyber.yml#explore", height: 600 }
tasks:
  - check: { type: board, text: "Press Leak! How many of Ava's accounts fall?", when: "l = 1 and f = 4", explain: "All four: the leaked password works everywhere." }
  - hint: ["What would stop the game site's password working on her other accounts?", "Give each account a different passphrase, then press Leak! again."]
    check: { type: board, text: "Change Ava's passwords so the next leak only reaches the game site itself. Then leak again.", when: "l = 1 and f = 1", explain: "With a different long passphrase on each account, the leaked one opens nothing else." }
```

Was your prediction right?

### Leak

### Stop the spread

## Explain: why passwords fail

```step
stage: investigate
insight: "The teacher models the three ways a password fails, naming what students just saw. Sam's symbol swap comes after the method."
check:
  type: bug
  code: "working.txt#sam"
  text: "Sam makes a stronger password. Click the line where it first goes wrong."
  answer: 3
  fault: logic
  misconception: symbols-make-strong
  explain: "Line 3: swaps like @ for a and 0 for o are so common that they are on the guessing lists too. Length and randomness make a password strong, and it still shouldn't be reused."
```

What you just did has names. A **breach** is when a site's data leaks. **Reuse** turns one breach into many. Some passwords never needed a breach: they are **guessable**.

```worked
\text{1. a site leaks} :: You can't stop other sites being breached; you can limit the damage.
\text{2. reuse spreads it} :: The leaked password is tried on every other site. One password everywhere means one leak opens everything.
\text{3. guessable falls first} :: Common passwords, symbol swaps and personal details (names, birthdays, pets) are on the lists tried first.
\text{fix: long, random, different} :: Four random words for each site, kept in a password manager so you don't have to remember them.
```

### Find the mistake

## Elaborate: a new set of problems

```step
stage: modify
insight: "The same idea in a new case: Ava's new passwords fail in two different ways (reuse and guessable), one change at a time."
try: { playground: board, starter: "cyber.yml#elaborate", height: 600 }
tasks:
  - check: { type: board, text: "Ava changed her passwords, but a leak still opens all four. Fix them so a leak only reaches the game site.", when: "l = 1 and f = 1", explain: "Two were guessable (sunshine1, her name and year) and two shared a passphrase: every one needed a different long passphrase." }
  - check: { type: board, text: "Check: is there now any account someone could guess without a leak at all?", when: "c = 0", explain: "None: four different passphrases, none on any list." }
```

### Fix the set

### Guessable?

## Elaborate: let a manager do it

```step
stage: make
insight: "Students set up the habit that makes good passwords realistic: a password manager makes and remembers a different passphrase for every account."
try: { playground: board, starter: "cyber.yml#make", height: 600 }
hint: ["Nobody can remember four random passphrases, and then forty.", "Use the password manager, then leak again."]
check: { type: board, text: "Ava says she can't remember four passphrases. Switch on the password manager and test it with a leak.", when: "m = 1 and l = 1 and f = 1", explain: "The manager makes and remembers a different strong passphrase for each site; Ava remembers one (the manager's own), and a leak stays at one site." }
```

## Evaluate: look back

```step
stage: info
tasks:
  - check:
      type: question
      q: "A site you use emails you: it has been breached. What should you do first?"
      options: ["Change that password, and any other account where you used the same one", "Nothing: it's the site's problem", "Delete your email account", "Change only the breached site's password"]
      answer: 0
      feedback: [null, "Your reused password is now on a list.", "That doesn't stop anyone using the leaked password.", "Any account using the same password is open too."]
      explain: "Then turn on a second factor where you can: next lesson."
  - check: { type: reflect, text: "I can explain how one leak can open many accounts, and why a different long passphrase for each site stops it." }
```

### After a breach

### Look back
