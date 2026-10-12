---
marp: true
theme: default
html: true
---

# A second lock

Cyber safety and privacy · Protect your accounts

<!-- Speaker note: Students watch leaked passwords open every account, then add second factors (SMS, app code, security key), see codes tricked out by a fake sign-in page, and protect the most important account with a key (AC9TDI8P13 node 2). A 5E mission lesson. About 40 minutes (Engage and Explore 10 min · Explain 8 min · Elaborate 16 min · Evaluate 6 min). -->

---

## Today

**We are learning to** multi-factor authentication asks for something you have (a phone, a security key) or are (a fingerprint) as well as something you know. A leaked password alone is no longer enough. Codes can still be tricked out of you by a fake sign-in page; a security key only answers the real site.

- I can explain what multi-factor authentication adds to a password.
- I can name the three kinds of factor.
- I can choose second factors for accounts, most important first.

<!-- Speaker note: Before class: Try the board yourself. The one idea: a second, different kind of proof means a leaked password alone isn't enough. Simplifications: the board shows the outcome, not how a fake page works; real security keys and passkeys check the site's address, which is why they resist fake pages. SMS codes can also be lost to SIM swapping; mention it only if asked. Unplugged: a locker with a combination lock and a key lock together. Teacher: Evaluate: discuss the phone call: what made it convincing? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> Ava's passwords have all leaked. Can she still keep her accounts?

<!-- Speaker note: **Your mission:** the worst has happened. Every one of Ava's passwords is on a leaked list. Keep her accounts hers anyway. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Engage: predict

**Ava's school email password has leaked, but she has turned on codes sent to her phone. Someone types in her password. What happens?**

- They are asked for the code, and they don't have her phone, so they're stopped
- They get straight in: they have the password
- Ava's phone gets the password
- The account is deleted

<!-- Speaker note: What happens: Stopped. The password is only half; the code comes to Ava's phone, which they don't have. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what the attacker would still be missing. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fcyber%2Fmfa%2Fstep-2&code=widget%3A+cyber%0Amode%3A+mfa%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/cyber/mfa/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? -->

<!-- Speaker note: Teacher: ask why every account fell in the first attempt. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Stopped. The password is only half; the code comes to Ava's phone, which they don't have.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Explain: something you know, have or are

**Sam decides which accounts need a second factor. Click the line where it first goes wrong.**

```
 1  Sam has a second factor on the bank app.
 2  Sam's game account just has a password.
 3  Nobody would bother breaking into a game account.
 4  So nothing bad can happen if someone gets into it.
```

* Answer: line 4

<!-- Speaker note: Line 4: a taken game account can message Sam's friends, spend money, and help someone guess or reset other accounts. Turn MFA on wherever it's offered. What this step is for: The teacher models the three kinds of factor and names why a second one blocks a leaked password. Sam leaves an account unprotected, the misconception planted after the method. -->

<!-- Speaker note: Teacher: list know, have, are on the board with examples from students' lives. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Elaborate: the fake page

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fcyber%2Fmfa%2Fstep-4&code=widget%3A+cyber%0Amode%3A+mfa%0Afake%3A+on%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/cyber/mfa/?full=step-4#step-4)

<!-- Speaker note: What this step is for: One change: a fake sign-in page that asks for the code as well. Codes typed into it can be passed on; a security key only answers the real site. -->

<!-- Speaker note: Teacher: ask what the key knows that Ava might not (which site is asking). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Elaborate: one key



[Open this step](https://tutorials.learningwaypoints.com/systems/cyber/mfa/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Choosing factors under a limit (one security key) reverses the process: from what matters most to the protection it gets. Hints, in order: Which account would hurt most to lose? Email can reset all the others. / Key on the school email; app codes on the rest. For students who need more support: A card: know (password), have (phone, key), are (fingerprint). Two different kinds = MFA. For early finishers: Find out what a passkey is and how it differs from a password plus a code. The hard part, on purpose: The fake-page task makes codes look weak. Keep the balance: codes stop leaked passwords, which is most attacks; keys also stop fake pages. When students get stuck: A student says MFA is only for important accounts (Sam's mistake). Ask: What could someone do with your game account? Fix: Message friends, spend money, reset other accounts: MFA wherever it's offered. / A student puts keys on everything in the Make. Ask: How many keys does Ava have? Fix: One: the account that resets the others (email). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Ava's password leaks but she has an app code turned on. Explain why her account is still safe, and one way it could still be lost.**

* The attacker doesn't have her phone, so can't get the code. She could be tricked into typing the code into a fake page or reading it out.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Spot the phish. -->
