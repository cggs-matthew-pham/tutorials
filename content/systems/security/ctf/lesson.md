---
order: 5
unit: ctf
node: AC9TDI10K01 n5
title: "Capture the flag: secure the portal"
summary: "A security team tests a system before attackers do. Use everything from this course to find four weaknesses in a school portal (a lookalike link, a weak password, a wrong permission and an unlocked message), capture a flag for each, then fix the portal and match each weakness to its fix."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Security teams are paid to find the holes in their own systems first. Today the portal is yours to test."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8478
  url: http://127.0.0.1:8478/index.html
  readySelector: "#scaddr"
  layout: full
explainPicture: { ref: portal.yml#explain-pic, caption: "The portal's permissions: one cell gives a role more than its job needs. Finding it is one of the flags." }
explainClip:
  query: { code: "@portal.yml#explain", fresh: 1, id: explain }
  caption: "Testing the portal"
  say: "Start with the link in a suspicious email."
  clip:
    - type: { into: Address, text: "schoo1.edu.au" }
    - press: Enter
    - expect: { selector: "#gsum", contains: "198.51.100.66" }
    - caption: { text: "The email's link goes to 198.51.100.66, not the school's address.", say: "The link goes somewhere else. That's the first weakness." }
    - wait: 1800
---
A **capture the flag** (CTF) is a security challenge: you look for weaknesses in a system you have permission to test, and each one you find gives you a **flag**, a secret word to type in. Security teams do this to their own systems so they can fix the holes before attackers find them.

The school portal is yours to test. There are four weaknesses, one for each lesson in this course. Each flag looks like **WP{…}**.

## Predict: why test your own system?

```step
stage: predict
insight: "Committing to why defenders attack their own systems frames the challenge: finding a weakness is only useful because it leads to a fix."
check:
  type: predict
  q: "Why do security teams try to break into their **own** school or company systems?"
  options: ["To find and fix the weaknesses before real attackers find them", "To get into other people's accounts", "To slow the system down", "It's against the rules, so they don't"]
  actual: "To fix them first. Testing only systems you have permission to test, and reporting what you find, is called ethical hacking or penetration testing."
```

## Try: a suspicious email

```step
stage: run
insight: "Looking up the email's link starts the investigation with the first lesson in reverse: from a suspicious name to where it really goes."
try: { playground: board, starter: "portal.yml#run", height: 560 }
check: { type: board, text: "An email says: \"Your password expires today. Reset it at schoo1.edu.au.\" Press Go. Where does the link really go?", when: "l = 1", explain: "To 198.51.100.66, not the school (203.0.113.x). The email is phishing: weakness one." }
```

Keep that address in mind for the first flag.

## Investigate: capture four flags

```step
stage: investigate
insight: "Each flag needs one idea from the course applied to the portal: DNS, hashing, permissions and public keys."
try: { playground: board, starter: "portal.yml#dns", height: 560 }
tasks:
  - starter: "portal.yml#dns"
    check:
      type: flag
      q: "Flag 1 (names and addresses). Students should type the real portal's name instead of clicking links. What is the real portal's IP address? Look up school.edu.au. The flag is WP{ then the address, then }."
      hash: 6bdb1349c764e076bfb66881dae63cb4db3ead35cbacdd6a23622a64bd5fa635
      explain: "school.edu.au is 203.0.113.10. The phishing link went to 198.51.100.66."
  - starter: "portal.yml#audit"
    check:
      type: flag
      q: "Flag 2 (hashes). The portal's stored hashes are on the board. The five most common passwords are 123456, password, qwerty, dragon and football. Type each and see whether its hash is in the list. Which user has one of them? The flag is WP{ then the user's name, then }."
      hash: 690c908b2d50b7c568f890d2db59b39aa4054e9f908ded5f5e8595e3e06ed818
      explain: "football hashes to 6382deaf1f5d: zoe's. The other users have long passphrases that are on no guess list."
  - starter: "portal.yml#perms"
    check:
      type: flag
      q: "Flag 3 (permissions). Sign in as Sam (password maple) and test what a student can do. Which file can students change that they should only read? The flag is WP{ then the file name in lower case, then }."
      hash: 0d678b8d55963d68c8e3eca899237b245a7035ab4057998edee6ecbfcdc8d390
      explain: "Students can change Marks. They should only read them."
  - starter: "portal.yml#keys"
    check:
      type: flag
      q: "Flag 4 (keys). The portal sends Alice's new password to her. Which key must lock it so only Alice can read it? Test the choices. The flag is WP{alice-public}, WP{alice-private} or WP{bob-own}: pick the one that works."
      hash: 4fca67ca5713ec5c78e2a0a7ea2c1abb4f36e1db9c500cd0fa600f3d28ab2696
      explain: "Alice's public key (her padlock): anyone can lock with it, only her private key opens it."
```

### Flag 1: the real address

### Flag 2: the weak password

### Flag 3: the wrong permission

### Flag 4: the right key

## Fix: secure the portal

```step
stage: modify
insight: "Turning the findings into fixes is the point of the challenge: least privilege and multi-factor sign-in close two of the holes on the board."
try: { playground: board, starter: "portal.yml#fix", height: 600 }
hint: ["Students should read Marks, not change them.", "Click the Students row's Marks cell until it says read.", "Then switch on multi-factor sign-in."]
check: { type: board, text: "Fix the portal: give every role only what its job needs, and switch on multi-factor sign-in.", when: "z = 0 and e = 0 and m = 1", explain: "Least privilege closes the marks hole, and with MFA a stolen password (like zoe's) is no longer enough to get in." }
```

## Make: the report

```step
stage: make
insight: "Matching each weakness to its fix is the security report: what was found, and what stops it."
check:
  type: sort
  q: "Match each weakness to the fix that stops it."
  options: ["Check the exact address (or type it)", "Long passphrases, stored as salted hashes", "Least privilege", "Multi-factor sign-in", "Lock with the receiver's public key (HTTPS)"]
  items:
    - ["A phishing link to schoo1.edu.au", "Check the exact address (or type it)"]
    - ["zoe's password was on the common list", "Long passphrases, stored as salted hashes"]
    - ["Students could change Marks", "Least privilege"]
    - ["A stolen password let someone sign in", "Multi-factor sign-in"]
    - ["A message sent with no padlock could be read", "Lock with the receiver's public key (HTTPS)"]
  explain: "Every weakness has a fix from this course. A real report lists what was found, how serious it is, and what to change."
```

Then: which weakness would you fix first, and why?
