---
order: 4
unit: layers
node: AC9TDI10K01 n4
title: Hashes and keys
summary: "Good sites never store your password. They store a hash: a one-way scramble that is always the same for the same password, so a login can be checked, but can't be turned back. A salt makes the same password hash differently for each person. Public key encryption works like an open padlock: anyone can lock a message with it, but only the owner's private key opens it."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Websites get hacked and their password lists stolen. If the site did its job, the attackers still don't get your password. How?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8477
  url: http://127.0.0.1:8477/index.html
  readySelector: ".scwrap"
  layout: full
explainPicture: { ref: hk.yml#explain-pic, caption: "Public key: Bob locks the box with Alice's open padlock. Eve has a padlock too, but only Alice's private key opens it." }
explainClip:
  query: { code: "@hk.yml#explain", fresh: 1, id: explain }
  caption: "Stored as a hash"
  say: "The site stores a hash, not the password."
  clip:
    - type: { into: Password, text: "maple" }
    - wait: 600
    - expect: { selector: "#gsum", contains: "Match" }
    - caption: { text: "Hash what you type and compare: a match signs you in.", say: "Hash what is typed and compare." }
    - wait: 1200
    - type: { into: Password, text: "Maple" }
    - wait: 600
    - caption: { text: "One capital letter: a completely different hash.", say: "Change one letter, and the whole hash changes." }
    - wait: 1600
---
This lesson covers two tools that protect data. A **hash** protects passwords where they are **stored**. **Public key** encryption protects secrets while they **travel**, and it is how HTTPS starts.

A **hash** turns any text into a fixed-length scramble. The same input always gives the same hash, but there is no way to work backwards from the hash to the input.

## Predict: a stolen list

```step
stage: predict
insight: "Committing to what a stolen password list contains tests the new move: sites store hashes, which can be checked but not reversed."
check:
  type: predict
  q: "A website is hacked and its list of passwords is stolen. If the site did its job properly, what do the attackers find for your account?"
  options: ["A hash: a scramble that can't be turned back into your password", "Your password", "Your password, encrypted with a key they will find nearby", "Nothing at all"]
  actual: "A hash. The site never kept the password: it stores the hash, and at sign-in hashes what you type and compares."
```

## Try: sign in with a hash

```step
stage: run
insight: "Typing the password and seeing its hash match the stored one settles the prediction: the site checks hashes, never storing the password."
try: { playground: board, starter: "hk.yml#run", height: 520 }
check: { type: board, text: "The site stores only Sam's hash. Type Sam's password (maple). Then change one letter to a capital. What happens to the hash?", when: "m = 0 and n = 5 and d >= 6", explain: "maple matches the stored hash; Maple gives a completely different one. The site can check you without ever storing the password." }
```

Was your prediction right? Watch how many digits change for one letter.

## Worked example: hashes and padlocks

```step
stage: investigate
insight: "Following a sign-in through hashing, then a message through a public padlock, models both tools. Sam thinks a hash can be turned back, the misconception planted after the method."
tasks:
  - check:
      type: question
      q: "Why can a site check your password without storing it?"
      options: ["The same password always gives the same hash, so it compares hashes", "It asks your email provider", "It stores the password in a secret place", "It can't: every site stores passwords"]
      answer: 0
      feedback: [null, "Your email isn't involved in signing in.", "Good sites don't store it anywhere.", "Good sites store only hashes."]
      explain: "Hash what is typed; if it equals the stored hash, the password was right."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam explains how Forgot password works. Click the line where it first goes wrong."
      answer: 3
      fault: logic
      misconception: hash-reversible
      explain: "Line 3: a hash can't be turned back. That is why sites send a reset link instead; a site that emails you your old password is storing it, which is a warning sign."
  - check:
      type: question
      q: "Bob wants to send Alice a secret. Alice has published her open padlock (public key). Who can open a box Bob locks with it?"
      options: ["Only Alice, with her private key", "Anyone with Alice's padlock", "Bob", "Eve, if she copies the box"]
      answer: 0
      feedback: [null, "A padlock locks; it doesn't open. Everyone can have one.", "Once locked, Bob can't open it either.", "Copying the box doesn't give her the key."]
      explain: "Public key: anyone can lock, only the private key opens. HTTPS uses this to agree a secret key with a website."
```

### Two tools

```worked
\text{maple} \to 49ead2b1066b\ldots :: Hashing: a fixed-length scramble of the password.
\text{sign in: hash(typed) = stored?} :: The site compares hashes; it never needs the password.
\text{Maple} \to \text{a completely different hash} :: One small change changes everything, and it can't be reversed.
\text{salt} + \text{maple} :: Adding each user's salt makes the same password hash differently for each person.
\text{public key} = \text{open padlock} :: Anyone can lock a message for Alice with it.
\text{private key} = \text{the only key} :: Only Alice can open it. HTTPS uses this to set up a secret with a website.
```

Now explain how a site checks a password.

### Find the mistake

### Padlocks

## Vary: one change at a time

```step
stage: modify
insight: "Each task changes one thing: a salt for the same password, then the lock Bob uses (Alice's, his own, none)."
try: { playground: board, starter: "hk.yml#salt", height: 520 }
tasks:
  - starter: "hk.yml#salt"
    check: { type: board, text: "Type maple, then switch on the salt. Ana and Ben both use maple. Are their hashes the same?", when: "s = 1 and n = 5", explain: "Different salts, different hashes: a list of pre-hashed common passwords no longer matches, and nobody can tell that two people share a password." }
  - starter: "hk.yml#keys"
    check: { type: board, text: "Bob locks the message with Alice's padlock and sends it.", when: "l = 1 and k = 1 and v = 0", explain: "Eve has the box and even a padlock, but no key: only Alice's private key opens it." }
  - starter: "hk.yml#keys"
    check: { type: board, text: "Now Bob uses his own padlock. Send it.", when: "l = 2 and f >= 1", explain: "Alice can't open it: only Bob has that key. You lock with the receiver's public key." }
  - starter: "hk.yml#keys"
    check: { type: board, text: "Send it with no padlock.", when: "l = 0 and v = 1", explain: "No lock: Eve reads it. That is a site without HTTPS." }
```

### Salt

### Alice's padlock

### Bob's own padlock

### No padlock

## Practise: hashes and keys

```step
stage: practise
insight: "Spotting good and bad password storage, choosing the right key, and a review of access control."
tasks:
  - check:
      type: question
      q: "A site emails you your old password when you click Forgot password. What does that tell you?"
      options: ["It stores your password, not a hash: a bad sign", "It is very secure", "It uses public key encryption", "Nothing"]
      answer: 0
      feedback: [null, "It could only email it if it kept it.", "Encryption in transit doesn't explain it keeping your password.", "It tells you how the site stores passwords."]
      explain: "A hash can't be reversed, so a well-built site can only send a reset link."
  - check:
      type: question
      q: "Why are long passphrases safer even when sites store hashes?"
      options: ["Attackers hash lists of common passwords and compare; a long unusual passphrase isn't on those lists", "Long passwords make the hash longer", "Hashes only work on long passwords", "They aren't safer"]
      answer: 0
      feedback: [null, "Every hash is the same length.", "Any text can be hashed.", "They are, for that reason."]
      explain: "Guessing still works on common passwords: hash the guess, compare. Length and unusual words defeat the guess lists."
  - check:
      type: question
      q: "Which key do you use to send someone a secret?"
      options: ["Their public key", "Their private key", "Your private key", "No key"]
      answer: 0
      feedback: [null, "Only they have that.", "Then they couldn't open it.", "Then anyone could read it."]
      explain: "Lock with the receiver's public key; only their private key opens it."
  - check:
      type: question
      q: "Review: which is authorisation?"
      options: ["Only teachers may change marks", "Typing a password", "A fingerprint", "A code from your phone"]
      answer: 0
      feedback: [null, "That is authentication.", "That is authentication.", "That is authentication."]
      explain: "Authorisation is what you may do once signed in."
```

### Emailed passwords

### Passphrases

### Which key?

### Review: access

## Make: a strong passphrase

```step
stage: make
insight: "Building a passphrase that meets a strength rule reverses the process: students start from what makes a hash hard to guess and make a password to match."
try: { playground: board, starter: "hk.yml#make", height: 480 }
hint: ["Use four or more words that don't go together.", "Separate them with spaces or hyphens.", "Aim for 20 characters or more. Don't use a real password here."]
check: { type: board, text: "Make up (don't use a real one) a passphrase of at least four unrelated words and 20 characters. Watch its hash.", when: "w >= 4 and n >= 20", explain: "Long and unusual: not on any list of common passwords, and still easy to remember." }
```

Then: why should you never use the same password on two sites, even a strong one?
