---
marp: true
theme: default
html: true
---

# When passwords fail

Cyber safety and privacy · Protect your accounts

<!-- Speaker note: Students watch one leaked password open all of Ava's accounts, then stop the spread with a different long passphrase for each account and a password manager (AC9TDI8P13 node 1). A 5E mission lesson. About 40 minutes (Engage and Explore 12 min · Explain 8 min · Elaborate 14 min · Evaluate 6 min). -->

---

## Today

**We are learning to** passwords fail in three predictable ways: a site leaks its list, one password reused everywhere lets that leak open every account, and common or personal passwords are on the lists people try first. Long random passphrases, a different one for every site, fix it.

- I can explain how a password gets out, and why reusing one makes it worse.
- I can say what makes a password hard to guess.
- I can set up accounts so one leak stays at one site.

<!-- Speaker note: Before class: Try the board yourself. Every name and address is made up. The one idea: one leak spreads through reuse, and guessable passwords fall without any leak. Fixes: a different long passphrase for each site, kept in a password manager. This is a 5E mission lesson: Explore has a goal and the first attempt fails on purpose. Model the Explain live: replay the leak on the board and name each part (breach, reuse, guessable). Avoid asking students about their own passwords; talk about Ava's. Unplugged: hand out a key ring with one key that opens every door, then ask what happens when one copy is lost. Teacher: Evaluate: collect answers to the breach question; link to MFA next lesson. -->

---

## Why it matters

> A game site Ava used once has just been hacked. Is her school email safe?

<!-- Speaker note: **Your mission:** you are the Coding Club's new security officer. Your first job: help Ava, a member, keep her accounts safe. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Engage: predict

**Ava uses the password sunshine1 for her school email, a game site, the club app and an online shop. The game site leaks its passwords. How many of her accounts are now open to someone else?**

- All four
- Just the game site
- None: the passwords were secret
- Two: the game site and the shop

<!-- Speaker note: What happens: All four. Whoever has the leaked list tries the same password everywhere, and sunshine1 is on every list of common passwords anyway. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask who picked "just the game site"; let Explore answer it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fcyber%2Fpasswords%2Fstep-2&code=widget%3A+cyber%0Amode%3A+breach%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/cyber/passwords/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? -->

<!-- Speaker note: Teacher: ask what had to change for the leak to stop at one account. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* All four. Whoever has the leaked list tries the same password everywhere, and sunshine1 is on every list of common passwords anyway.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Explain: why passwords fail

**Sam makes a stronger password. Click the line where it first goes wrong.**

```
 1  Sam's password used to be password.
 2  Sam changes it to P@ssw0rd! with symbols and capitals.
 3  Swapping letters for symbols makes it very hard to guess.
 4  So it is safe to use on every site.
```

* Answer: line 3

<!-- Speaker note: Line 3: swaps like @ for a and 0 for o are so common that they are on the guessing lists too. Length and randomness make a password strong, and it still shouldn't be reused. What this step is for: The teacher models the three ways a password fails, naming what students just saw. Sam's symbol swap comes after the method. -->

<!-- Speaker note: Teacher: replay the leak; name breach, reuse and guessable as each appears. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Elaborate: a new set of problems

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fcyber%2Fpasswords%2Fstep-4&code=widget%3A+cyber%0Amode%3A+breach%0Aset%3A+mixed%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/cyber/passwords/?full=step-4#step-4)

<!-- Speaker note: What this step is for: The same idea in a new case: Ava's new passwords fail in two different ways (reuse and guessable), one change at a time. -->

<!-- Speaker note: Teacher: ask which of Ava's new passwords failed for which reason. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Elaborate: let a manager do it



[Open this step](https://studio.learningwaypoints.com/tutorials/systems/cyber/passwords/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Students set up the habit that makes good passwords realistic: a password manager makes and remembers a different passphrase for every account. Hints, in order: Nobody can remember four random passphrases, and then forty. / Use the password manager, then leak again. For students who need more support: A card: long (four random words), different for every site, kept in a password manager. For early finishers: Look up whether passkeys could replace passwords. What would a leak of a passkey site expose? The hard part, on purpose: Students want a rule ("8 characters with a symbol"). Let the board show that a symbol swap still falls, and point at length and difference instead. When students get stuck: A student thinks P@ssw0rd! is strong (Sam's mistake). Ask: Pick it on the board. What does it say about guessing it? Fix: Symbol swaps are on the lists; length and randomness count. / A student uses one strong passphrase for everything. Ask: Press Leak! What happens to the others? Fix: Strong but reused still spreads; each account needs its own. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Ava's game site leaks. Name two things that would have kept her other accounts safe.**

* A different password on each account; long, random passphrases (not on any common list); a password manager to make and remember them.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: A second lock (MFA). Teacher note: the eSafety Commissioner and the Australian Cyber Security Centre both publish student-friendly guidance on passphrases (check current pages before linking). -->
