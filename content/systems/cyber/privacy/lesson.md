---
order: 7
unit: system
node: [AC9TDI10P14 n1, AC9TDI10P14 n2]
shape: 5e
title: The Australian Privacy Principles
summary: "The Australian Privacy Principles (APPs) say what organisations must do with personal information: collect only what they need (APP 3), tell people what and why (APP 5), use and share it only for that purpose unless people agree (APP 6), keep it secure (APP 11), and let people see and correct it (APP 12). A privacy policy doesn't override them."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The club gave members' emails to a sports shop. It's in the privacy policy, page 40. Is that allowed?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8499
  url: http://127.0.0.1:8499/index.html
  readySelector: ".cycard"
  layout: full
explainPicture: { ref: cyber.yml#explain-pic, caption: "Five things the club app does with members' information, each to match to a principle and judge: meets it or breaches it." }
explainClip:
  query: { code: "@cyber.yml#explain", fresh: 1, id: explain }
  caption: "Which principle?"
  say: "Check one practice against the principles."
  clip:
    - click: "The sign-up form asks for home: APP 3 Collection"
    - caption: { text: "Asking for data is collection: APP 3 says collect only what you need.", say: "Asking for data is collection. A P P 3." }
    - wait: 1200
    - click: "The sign-up form asks for home: Breaches it"
    - expect: { selector: "#gsum", contains: "1 judged correctly" }
    - caption: { text: "The club never uses home addresses, so collecting them breaches APP 3.", say: "The club never uses them, so it breaches A P P 3." }
    - wait: 1500
---
**Your mission:** the club app holds members' personal information, so the Australian Privacy Principles apply. Audit what it does, fix what breaches them, and write its privacy notice.

## Engage: is it allowed?

```step
stage: predict
insight: "Committing to whether a policy allows anything tests the new move: the principles set limits that a policy can't remove."
check:
  type: predict
  q: "The club's privacy policy says it may share members' details with partners. Can it give their emails to a sports shop for advertising?"
  options: ["Not without asking: sharing for a different purpose needs people's agreement", "Yes: the policy says so", "Yes, as long as the shop is local", "Only on weekends"]
  actual: "Not without asking. APP 6: personal information is used and shared for the purpose it was collected for, unless people agree to more."
```

## Explore: audit the app

```step
stage: run
insight: "Students match practices to principles and judge them, meeting each principle through a concrete case."
try: { playground: board, starter: "cyber.yml#explore", height: 720 }
check: { type: board, text: "For each thing the app does, choose the principle it's about, and whether the app meets it or breaches it.", when: "a = n and b = n", explain: "Collecting unused addresses breaches APP 3; the notice meets APP 5; sharing with the shop breaches APP 6; hashing and encryption meet APP 11; no way to see or correct details breaches APP 12." }
```

Was your prediction right?

## Explain: five principles

```step
stage: investigate
insight: "The teacher models the critique scaffold on one practice: principle, what it requires, what the app does, verdict, change. Sam trusts the policy, the misconception planted after the method."
check:
  type: bug
  code: "working.txt#sam"
  text: "Sam reads the club's privacy policy. Click the line where it first goes wrong."
  answer: 3
  fault: logic
  misconception: policy-means-anything
  explain: "Line 3: advertising isn't why members gave their emails. APP 6 needs their agreement first, whatever the policy says."
```

The **Australian Privacy Principles** (in the Privacy Act 1988) say what organisations must do with **personal information**: anything that identifies a person.

```worked
\text{APP 3 Collection} :: Collect only what you need for your purpose.
\text{APP 5 Notice} :: Tell people what you collect, why, and who to ask.
\text{APP 6 Use and disclosure} :: Use and share it only for that purpose, unless they agree.
\text{APP 11 Security} :: Protect it: hash passwords, encrypt data, limit who can see it.
\text{APP 12 Access} :: Let people see what you hold about them (APP 13: and correct it).
```

### Find the mistake

## Elaborate: fix the breaches

```step
stage: modify
insight: "One change: after the verdict, the change that would meet the principle, the last step of the critique scaffold."
try: { playground: board, starter: "cyber.yml#elaborate", height: 820 }
check: { type: board, text: "Audit the app again. For each breach, choose the change that would meet the principle.", when: "a = n and b = n and c = 3", explain: "Stop collecting addresses (APP 3), ask before sharing (APP 6), add a My details page (APP 12). The other options still breach." }
```

## Elaborate: the privacy notice

```step
stage: make
insight: "Producing a notice that meets APP 5 reverses the audit: from the principle to what a member reads."
try: { playground: board, starter: "cyber.yml#make", height: 600 }
hint: ["Read each line as a member: does it tell you something real?", "Vague lines like 'some information' or 'our partners' tell a member nothing."]
check: { type: board, text: "Write the club app's privacy notice: pick the version of each line that tells a member something real.", when: "a = 1", explain: "What exactly, why exactly, who exactly, how it's protected, and where to go: a notice a member can act on." }
```

## Evaluate: look back

```step
stage: info
tasks:
  - check:
      type: question
      q: "A school's homework app stores students' marks. A student asks to see what it holds about her. Which principle says the school must let her?"
      options: ["APP 12 Access", "APP 3 Collection", "APP 5 Notice", "APP 11 Security"]
      answer: 0
      feedback: [null, "That's about what is collected.", "That's about telling people what and why.", "That's about keeping it safe."]
      explain: "People can ask to see the personal information held about them."
  - check: { type: reflect, text: "I can name five Australian Privacy Principles and use them to critique an app." }
```

### The homework app

### Look back
