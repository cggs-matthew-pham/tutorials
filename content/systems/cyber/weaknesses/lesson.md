---
order: 6
unit: system
node: AC9TDI10P13 n2
shape: 5e
title: Kinds of weakness
summary: "Systems have three kinds of weakness. Software: a flaw in the app's own code (fix: update and test). User: what people do, like weak or shared passwords or being tricked (fix: training, strong passwords, MFA). Supply chain: something the app relies on, like an add-on or library, goes bad (fix: check and update what you rely on). Perfect code alone doesn't make a system safe."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Three clubs' apps went wrong this year. One had a bug, one had a password on a sticky note, and one trusted a free add-on. Which was the club's fault?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8498
  url: http://127.0.0.1:8498/index.html
  readySelector: ".cycard"
  layout: full
explainPicture: { ref: cyber.yml#explain-pic, caption: "Six incidents at other clubs' apps, each to sort into software, user or supply chain, with the fix that would have stopped it." }
explainClip:
  query: { code: "@cyber.yml#explain", fresh: 1, id: explain }
  caption: "Where was the weakness?"
  say: "Three incidents, three kinds of weakness."
  clip:
    - click: "The club app hadn't been updat: Software"
    - caption: { text: "A flaw in the app's own code: a software weakness.", say: "A flaw in the app's own code. Software." }
    - wait: 1000
    - click: "A member gave their password t: User"
    - caption: { text: "A person was tricked: a user weakness.", say: "A person was tricked. User." }
    - wait: 1000
    - click: "A free calendar add-on the app: Supply chain"
    - expect: { selector: "#gsum", contains: "3 of 3" }
    - caption: { text: "Something the app relies on went bad: a supply chain weakness.", say: "Something the app relies on. Supply chain." }
    - wait: 1500
---
**Your mission:** other clubs' apps have had incidents. Learn from them, then check the Coding Club's app for the same kinds of weakness before anything goes wrong.

## Engage: whose fault?

```step
stage: predict
insight: "Committing to whether bug-free code is enough tests the new move: weaknesses also come from people and from what an app relies on."
check:
  type: predict
  q: "A club's programmers test every line of their app's code and find no bugs. Is the app safe?"
  options: ["Not necessarily: people and the add-ons it relies on can still be weak", "Yes: no bugs means no way in", "Only if it has a padlock", "Yes, until it gets more members"]
  actual: "Not necessarily. A shared password or a bad add-on lets someone in however good the club's own code is."
```

## Explore: three incidents

```step
stage: run
insight: "Students sort three incidents by where the weakness was and find the three kinds by contrast."
try: { playground: board, starter: "cyber.yml#explore", height: 560 }
check: { type: board, text: "Where was each weakness: in the app's own code, in what a person did, or in something the app relies on?", when: "t = n", explain: "The missed update is software, the password given away is user, the changed add-on is supply chain." }
```

Was your prediction right?

## Explain: three kinds

```step
stage: investigate
insight: "The teacher models naming the kind and its fix for each incident. Sam trusts bug-free code, the misconception planted after the method."
check:
  type: bug
  code: "working.txt#sam"
  text: "Sam's team checks their app. Click the line where it first goes wrong."
  answer: 3
  fault: logic
  misconception: good-code-is-safe
  explain: "Line 3: their own code is only one kind of weakness. People and add-ons can still let someone in, so they still need MFA and updates."
```

```worked
\text{Software} :: A flaw in the app's own code, such as never checking what is typed. Fix: test it and install updates.
\text{User} :: What people do: weak, shared or reused passwords, or being tricked. Fix: training, strong passwords, MFA.
\text{Supply chain} :: Something the app relies on (an add-on, a library) is out of date, taken over or a lookalike. Fix: check and update what you rely on.
\text{why it matters} :: Each kind is a different way in, so each needs its own fix.
```

### Find the mistake

## Elaborate: six incidents

```step
stage: modify
insight: "One change: more incidents, and now the fix as well as the kind."
try: { playground: board, starter: "cyber.yml#elaborate", height: 760 }
check: { type: board, text: "Sort all six incidents and choose the fix that would have stopped each one.", when: "t = n and f = n", explain: "Software: the missed update and the unchecked long name. User: the phone call and password1. Supply chain: the changed add-on and the lookalike library name." }
```

## Elaborate: our own app

```step
stage: make
insight: "Applying the kinds to a new system: the club's own app, before anything has gone wrong."
try: { playground: board, starter: "cyber.yml#make", height: 560 }
hint: ["Is the problem in the club's own code, in what people do, or in something the app relies on?", "Each kind has its own fix."]
check: { type: board, text: "Your review of the club app found three weaknesses. Name each kind and its fix.", when: "t = n and f = n", explain: "Unchecked input is software, the shared sticky-note password is user, the unchecked add-on is supply chain. Fixing them now is cheaper than after an incident." }
```

## Evaluate: look back

```step
stage: info
tasks:
  - check:
      type: question
      q: "A school app uses a free maps library. The library's makers stop updating it. What kind of weakness is growing?"
      options: ["Supply chain", "User", "Software, in the school's own code", "None, if it still works"]
      answer: 0
      feedback: [null, "No person did anything wrong.", "The school's own code hasn't changed.", "Flaws found later won't be fixed."]
      explain: "The app relies on it. Replace it with a maintained one, or plan to."
  - check: { type: reflect, text: "I can name the three kinds of weakness and a fix for each." }
```

### The maps library

### Look back
