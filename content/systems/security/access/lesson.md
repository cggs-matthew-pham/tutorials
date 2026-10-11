---
order: 3
unit: layers
node: AC9TDI10K01 n3
introduces: [permissions]
title: Who are you, and what may you do?
summary: "Access control has two parts. Authentication proves who you are (a password, and with multi-factor sign-in a code from your phone too). Authorisation (permissions) then decides what you may do. Give each role only what its job needs: least privilege."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "You and your teacher both sign in to the same school system. Why can your teacher change marks and you can't?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8476
  url: http://127.0.0.1:8476/index.html
  readySelector: ".sctable"
  layout: full
explainPicture: { ref: access.yml#explain-pic, caption: "Sign in proves who you are; the permissions table decides what each role may read or change." }
explainClip:
  query: { code: "@access.yml#explain", fresh: 1, id: explain }
  caption: "Sign in, then permissions"
  say: "Sam signs in with the right password."
  clip:
    - type: { into: Password, text: "maple" }
    - click: { selector: ".scsign button" }
    - wait: 800
    - caption: { text: "Signed in: the system knows it is Sam.", say: "Signed in. The system knows who it is." }
    - click: Change Marks
    - expect: { selector: ".scres", contains: "Denied" }
    - caption: { text: "But students may only read Marks: denied.", say: "But students may only read marks." }
    - wait: 1600
---
On a shared system (a school portal, a company network), **access control** decides who gets in and what they may do. It has two separate parts:

- **Authentication**: proving who you are. Usually a password; with **multi-factor** sign-in, also something you have, such as a code on your phone.
- **Authorisation**: what you may do once the system knows who you are, set by **permissions**.

## Predict: signed in, but…

```step
stage: predict
insight: "Committing to whether a signed-in student can change marks tests the new move: authentication and authorisation are separate checks."
check:
  type: predict
  q: "Sam the student signs in with the right password, then tries to change the class marks. What happens?"
  options: ["Denied: signing in proves who Sam is, but students aren't allowed to change marks", "It works: Sam signed in correctly", "Sam is signed out", "It works, but only for Sam's own mark"]
  actual: "Denied. The password proved it is Sam (authentication); the permissions say students may only read Marks (authorisation)."
```

## Try: sign in and try

```step
stage: run
insight: "Signing in as Sam and trying to change Marks settles the prediction: signed in, yet denied."
try: { playground: board, starter: "access.yml#run", height: 580 }
check: { type: board, text: "Sign in as Sam (password maple) and try to change Marks. Then read Marks.", when: "a = 1 and u = 1 and t >= 3", explain: "Sam is signed in (authenticated) but may only read Marks (authorised to read, not change)." }
```

Was your prediction right? Now sign in as Ms Lee and try the same.

## Worked example: two checks

```step
stage: investigate
insight: "Following one request through both checks models the new move, plus why least privilege matters. Sam treats signing in as permission to do anything, the misconception planted after the method."
tasks:
  - check:
      type: question
      q: "Which is **authentication**?"
      options: ["Typing your password to prove who you are", "Being allowed to read a file", "Changing the permissions table", "Logging out"]
      answer: 0
      feedback: [null, "That is authorisation: what you may do.", "That is setting the authorisation rules.", "Logging out ends a session."]
      explain: "Authentication answers \"who are you?\"; authorisation answers \"what may you do?\""
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam explains what signing in allows. Click the line where it first goes wrong."
      answer: 3
      fault: logic
      misconception: signed-in-means-allowed
      explain: "Line 3: signing in only proves who Sam is. What Sam may do is a separate check, the permissions for students."
  - check:
      type: question
      q: "Why add a code from a phone (multi-factor sign-in)?"
      options: ["A stolen password alone is no longer enough to get in", "It makes the password shorter", "It replaces permissions", "It speeds up signing in"]
      answer: 0
      feedback: [null, "The password is still needed.", "It only strengthens authentication.", "It adds a step."]
      explain: "An attacker would need your password and your phone."
```

### One request, two checks

```worked
\text{Sam types "maple"} :: Authentication: is the password right for Sam?
\text{signed in as Sam (student)} :: The system now knows who is asking.
\text{"change Marks"} :: Authorisation: what may students do with Marks?
\text{Students: Marks = read} :: The permissions table says read only.
\text{denied} :: Signed in, but not allowed. Least privilege: each role gets only what its job needs.
```

Now name the authentication step.

### Find the mistake

### Why multi-factor?

## Vary: one change at a time

```step
stage: modify
insight: "Each task changes one thing: a different user, a wrong password, multi-factor sign-in, then the admin's role."
try: { playground: board, starter: "access.yml#modify", height: 580 }
tasks:
  - check: { type: board, text: "Sign in as Ms Lee (password orbit) and change Marks.", when: "a = 1 and u = 2 and o = 1", explain: "Teachers may change Marks: same action, different person, different permission." }
  - check: { type: board, text: "Sign out, then try to sign in as Ms Lee with a wrong password, and change Marks.", when: "a = 0 and t >= 2 and o = 0", explain: "Without signing in, the system doesn't know who you are, so it allows nothing." }
  - check: { type: board, text: "Turn on multi-factor sign-in and sign in as Ms Lee with her password and the code 4096.", when: "m = 1 and a = 1 and u = 2", explain: "Password and code: two factors. A stolen password alone would fail now." }
  - check:
      type: question
      q: "Admins can change Settings but only read Marks. Why not let admins change everything?"
      options: ["Their job doesn't need it, and a stolen admin account could do less damage", "Admins aren't trusted", "It's a mistake in the table", "Admins can't read"]
      answer: 0
      feedback: [null, "It's about limiting harm, not distrust.", "It's deliberate: least privilege.", "They can read Marks."]
      explain: "Least privilege: if an account is misused or stolen, it can only do what that role needs."
```

### A teacher

### Wrong password

### Multi-factor

### The admin role

## Practise: access control

```step
stage: practise
insight: "Sorting examples into authentication and authorisation, judging passwords and permissions, and a review of DNS."
tasks:
  - check:
      type: sort
      q: "Authentication (who are you?) or authorisation (what may you do?)"
      options: ["Authentication", "Authorisation"]
      items:
        - ["Typing a password", "Authentication"]
        - ["A fingerprint unlock", "Authentication"]
        - ["A code from an app on your phone", "Authentication"]
        - ["Students may read but not change Marks", "Authorisation"]
        - ["Only the class teacher can open the gradebook", "Authorisation"]
        - ["A shared folder set to view only", "Authorisation"]
      explain: "Proving identity is authentication; rules about actions are authorisation."
  - check:
      type: question
      q: "Which password is strongest?"
      options: ["purple-otter-sings-at-dawn", "Password1!", "maple", "12345678"]
      answer: 0
      feedback: [null, "Common patterns like this are on every list of guesses.", "One short word is guessed quickly.", "Among the most common passwords."]
      explain: "Length beats tricks: a long passphrase of unrelated words is hard to guess and easy to remember."
  - check:
      type: question
      q: "Review: what does DNS do?"
      options: ["Turns a name into an IP address", "Encrypts web pages", "Checks passwords", "Blocks phishing"]
      answer: 0
      feedback: [null, "That is HTTPS.", "That is authentication.", "DNS answers for any name, real or fake."]
      explain: "It is the internet's address book."
```

### Sort them

### Strong passwords

### Review: DNS

## Make: least privilege

```step
stage: make
insight: "Fixing a permissions table so every role has exactly what its job needs reverses the process: students start from the jobs and set the permissions."
try: { playground: board, starter: "access.yml#make", height: 600 }
hint: ["Students: change their homework, read their marks, no settings.", "Teachers: change homework and marks, no settings.", "Admins: read homework and marks, change settings."]
check: { type: board, text: "This table gives everyone too much. Click cells to set least privilege: students change Homework, read Marks, nothing in Settings; teachers change Homework and Marks, nothing in Settings; admins read Homework and Marks, change Settings.", when: "z = 0 and e = 0", explain: "Every role can do its job and nothing more, so a stolen account can do the least harm." }
```

Then: which account would an attacker most want to steal, and how would you protect it?
