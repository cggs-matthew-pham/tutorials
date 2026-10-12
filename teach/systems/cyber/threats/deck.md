---
marp: true
theme: default
html: true
---

# Threat models

Cyber safety and privacy · Secure the system

<!-- Speaker note: Students use a data-flow diagram of the club app to name a risk and a defence at each point where data travels, is stored or is changed, then threat-model two new features (AC9TDI10P13 node 1). Defensive and conceptual. A 5E mission lesson. About 45 minutes (Engage and Explore 12 min · Explain 8 min · Elaborate 18 min · Evaluate 7 min). -->

---

## Today

**We are learning to** a threat model follows the data through a system on a data-flow diagram: where it travels, where it is stored, and who can change it. Each point has its own risk (read on the way, copied from storage, used by the wrong person) and its own defence (HTTPS, hashing and encryption, access control and MFA). One defence doesn't cover them all.

- I can follow data through a system on a data-flow diagram.
- I can name what could go wrong where data travels, is stored or is changed.
- I can match a defence to each point.

<!-- Speaker note: Before class: Try the board yourself. The club app is made up. The one idea: follow the data; each point (travelling, stored, who may act) has its own risk and its own defence. Typical width: have students draw the data-flow diagram for an app they know (the school canteen, a game) on paper first, then mark the points. Teacher: Evaluate: compare answers for the canteen app. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> The club app has HTTPS: the padlock is showing. Is it secure?

<!-- Speaker note: **Your mission:** before the club app launches, map where members' data goes and name a defence for every point where it could go wrong. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Engage: predict

**The club app uses HTTPS (the padlock). Which data does that protect?**

- Everything: the stored passwords and the admin page too
- Only data travelling between the browser and the app
- Only the photos
- Nothing: the padlock is decoration

<!-- Speaker note: What happens: Only data on the way. Stored passwords and who may use the admin page need their own defences. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what the padlock actually means. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fcyber%2Fthreats%2Fstep-2&code=widget%3A+cyber%0Amode%3A+threat%0Aset%3A+login%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/cyber/threats/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? -->

<!-- Speaker note: Teacher: ask which point they defended wrongly first, and why. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Only data on the way. Stored passwords and who may use the admin page need their own defences.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Explain: follow the data

**Sam secures the club app. Click the line where it first goes wrong.**

```
 1  The club app has three points where data is at risk.
 2  At sign-in, passwords travel from the browser to the app.
 3  Sam turns on HTTPS, which encrypts data on the way.
 4  So all three points are now safe.
```

* Answer: line 4

<!-- Speaker note: Line 4: HTTPS only protects data while it travels. The stored passwords and the admin page are still open. What this step is for: The teacher models the threat-model questions on one point. Sam trusts HTTPS for everything, the misconception planted after the method. -->

<!-- Speaker note: Teacher: model the three questions on the admin page. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Elaborate: photos

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fcyber%2Fthreats%2Fstep-4&code=widget%3A+cyber%0Amode%3A+threat%0Aset%3A+photos%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/cyber/threats/?full=step-4#step-4)

<!-- Speaker note: What this step is for: One change: a new feature adds two points to the diagram, one travelling and one about who may see. -->

<!-- Speaker note: Teacher: ask what the photos feature added to the diagram. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Elaborate: messages



[Open this step](https://tutorials.learningwaypoints.com/systems/cyber/threats/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Applying the model to a feature on their own: students place each point and its defence without the earlier diagram. Hints, in order: Is the message travelling, stored, or being opened by someone? / Who should be allowed to read a conversation? For students who need more support: A card with the three questions: travelling? stored? who may act? For early finishers: Draw the diagram for the canteen app with three actors (parent, school, bank) and defend every arrow. The hard part, on purpose: Students pick HTTPS for everything. Ask: is this data travelling right now, or sitting in the database? When students get stuck: A student thinks HTTPS covers everything (Sam's mistake). Ask: Where is the data at this point: on the network, or in the database? Fix: Each place needs its own defence. / A student confuses hashing with HTTPS. Ask: Is the password moving or stored? Fix: HTTPS on the way, hashing in storage. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name two points in a web app where data is at risk, and the defence for each.**

* Travelling between browser and server (HTTPS); stored passwords (salted hashes); the admin page (access control and MFA).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Kinds of weakness. -->
