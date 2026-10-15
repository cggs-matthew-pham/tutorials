---
marp: true
theme: default
html: true
---

# Kinds of weakness

Cyber safety and privacy · Secure the system

<!-- Speaker note: Students sort incidents at fictional club apps into software, user and supply-chain weaknesses with the fix for each, then review the Coding Club's own app (AC9TDI10P13 node 2). Descriptive and defensive throughout. A 5E mission lesson. About 45 minutes (Engage and Explore 10 min · Explain 10 min · Elaborate 18 min · Evaluate 7 min). -->

---

## Today

**We are learning to** systems have three kinds of weakness. Software: a flaw in the app's own code (fix: update and test). User: what people do, like weak or shared passwords or being tricked (fix: training, strong passwords, MFA). Supply chain: something the app relies on, like an add-on or library, goes bad (fix: check and update what you rely on). Perfect code alone doesn't make a system safe.

- I can describe software, user and supply-chain weaknesses.
- I can match each kind to a fix.
- I can spot each kind in a system before it goes wrong.

<!-- Speaker note: Before class: Try the board yourself. The clubs and incidents are made up. The one idea: weaknesses come from the app's own code, from people, and from what the app relies on; each needs its own fix. This lesson stays descriptive and defensive: what each kind is and how it is fixed. Node 3 (exploring a vulnerability in the student's own software) is left to class, with the teacher, on the students' own projects. Wider: news reports of real breaches can be sorted into the three kinds. Choose the reports yourself. Teacher: Evaluate: discuss what the school should do about the old maps library. -->

---

## Why it matters

> Three clubs' apps went wrong this year. One had a bug, one had a password on a sticky note, and one trusted a free add-on. Which was the club's fault?

<!-- Speaker note: **Your mission:** other clubs' apps have had incidents. Learn from them, then check the Coding Club's app for the same kinds of weakness before anything goes wrong. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Engage: predict

**A club's programmers test every line of their app's code and find no bugs. Is the app safe?**

- Not necessarily: people and the add-ons it relies on can still be weak
- Yes: no bugs means no way in
- Only if it has a padlock
- Yes, until it gets more members

<!-- Speaker note: What happens: Not necessarily. A shared password or a bad add-on lets someone in however good the club's own code is. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask who was at fault in each of the hook's three stories. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fcyber%2Fweaknesses%2Fstep-2&code=widget%3A+cyber%0Amode%3A+weakness%0Aset%3A+kinds%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/cyber/weaknesses/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? -->

<!-- Speaker note: Teacher: ask which incident was hardest to place, and why. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Not necessarily. A shared password or a bad add-on lets someone in however good the club's own code is.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Explain: three kinds

**Sam's team checks their app. Click the line where it first goes wrong.**

```
 1  Sam's team tests every part of the club app's code.
 2  They find no mistakes in it.
 3  So nobody can get into the app.
 4  So they don't need MFA, or to update the add-ons.
```

* Answer: line 3

<!-- Speaker note: Line 3: their own code is only one kind of weakness. People and add-ons can still let someone in, so they still need MFA and updates. What this step is for: The teacher models naming the kind and its fix for each incident. Sam trusts bug-free code, the misconception planted after the method. -->

<!-- Speaker note: Teacher: model naming the kind and the fix for one incident. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Elaborate: six incidents

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fcyber%2Fweaknesses%2Fstep-4&code=widget%3A+cyber%0Amode%3A+weakness%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/cyber/weaknesses/?full=step-4#step-4)

<!-- Speaker note: What this step is for: One change: more incidents, and now the fix as well as the kind. -->

<!-- Speaker note: Teacher: ask why the lookalike library name is supply chain and not user. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Elaborate: our own app



[Open this step](https://studio.learningwaypoints.com/tutorials/systems/cyber/weaknesses/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Applying the kinds to a new system: the club's own app, before anything has gone wrong. Hints, in order: Is the problem in the club's own code, in what people do, or in something the app relies on? / Each kind has its own fix. For students who need more support: A card with the three kinds, an example and a fix for each. For early finishers: Find a news report of a real breach and sort its causes into the three kinds. The hard part, on purpose: Students call every incident software because it happened in an app. Ask: whose action, or whose code, was the weak part? When students get stuck: A student thinks bug-free code means safe (Sam's mistake). Ask: Could a shared password let someone in, even with perfect code? Fix: Code is one kind of weakness of three. / A student puts the lookalike library under User. Ask: What did the app end up relying on? Fix: Something it relies on went bad: supply chain. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name the three kinds of weakness with one fix for each.**

* Software (test and update the code), user (training, strong passwords, MFA), supply chain (check and update what you rely on).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: The Australian Privacy Principles. -->
