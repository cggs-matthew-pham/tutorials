---
marp: true
theme: default
html: true
---

# Defend the door lock

Secret messages · Defend the system

<!-- Speaker note: Students audit a radio door lock, match each weakness to a tool from the course, and harden it in three milestones: a cipher, a keyed checksum and a challenge and response. About 60 minutes (Predict and Run 8 min · Audit 10 min · Milestone 1 10 min · Milestones 2 and 3 25 min · Report 5 min). -->

---

## Today

**We are learning to** a radio door lock has three weaknesses. Find each one, name the tool from this course that fixes it, and build the fixes in milestones.

- I can audit a system and name its weaknesses.
- I can match each weakness with a tool that fixes it.
- I can build a lock that is private, notices changes and cannot be reused.

<!-- Speaker note: Before class: **The idea:** the course's three tools answer three different questions: **who can read it** (a cipher), **was it changed** (a checksum with a key) and **is this a fresh message from someone who has the key** (challenge and response). A secure system usually needs all three. **Framing:** this is the defender's job. Students audit and harden their own system. The lesson does not have them attack each other's locks. If students want to test each other, run it as 'pass the pair': swap pairs' final locks, and try the real key against the lock; the lock should open for the key and refuse everything else. **The final system:** the key micro:bit knocks with a keyed checksum; the lock checks it, sends a random challenge, the key answers using the secret key, and the lock opens only on the right answer. The secret key never crosses the air. **Limits to say aloud:** these are classroom versions. The XOR step reveals the key if someone knows both a locked and an unlocked value; the answer function is not a one-way function; keys have to be shared safely first (the key exchange lesson). Real systems use proven tools, not ones we invented. **Challenge milestones:** Milestone 1 has most of the code; milestone 2 outlines; milestone 3 gives goals only. Students who finish quickly can add the lockout from the Challenge–response lesson. Teacher: Audit: ask students to say each weakness in their own words before they pick the tool. Teacher: Milestone 3: students must see that the old 'OPEN' code is gone; the answer replaces it. -->

---

## Why it matters

> Security teams run 'red team, blue team' exercises. The blue team defends: they audit their own system, find where it is weak, and fix it before anyone else can find the same weakness.

<!-- Speaker note: This is the **blue team** challenge: you defend a system you own. Below is a **radio door lock**: the key micro:bit sends the door code, and the lock opens if the code is right. It works. Your job is to **audit** it (find its weaknesses), then **harden** it with what you have built. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:348](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b93341699a3e.png?v=c574889743213f20)

**A is pressed on the key micro:bit. A third micro:bit in the same radio group is switched on. Which micro:bits can read the door code 4271?**

- Only the lock and the key
- Only the lock
- Every micro:bit in the group
- None: radio is private

<!-- Speaker note: What happens: Every micro:bit in the group. The code goes out as plain text, which is the lesson from the very first lesson in this course. Take two or three predictions before anyone runs it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Every micro:bit in the group. The code goes out as plain text, which is the lesson from the very first lesson in this course.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/microbit-security/ctf-defend/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/microbit-security/ctf-defend/?full=step-2#step-2)

<!-- Speaker note: Students should be able to say: I pressed A and saw the lock open with a tick. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Audit

![h:348](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b93341699a3e.png?v=c574889743213f20)

<!-- Speaker note: What this step is for: Each weakness has a matching tool: privacy needs a cipher, a changed message needs a checksum, and a reusable message needs a challenge and response. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the weaknesses

**Match each weakness of the door lock with the tool that fixes it.**

Groups: Encrypt it with a shared key · Add a checksum with a secret key · Use a challenge and response

The code 4271 goes out as plain text, so every micro:bit in the group can read it · The lock can't tell a damaged or changed message from a real one · The same message opens the lock every time, so one that was heard once works again

* Answer: The code 4271 goes out as plain text, so every micro:bit in the group can read it → Encrypt it with a shared key; The lock can't tell a damaged or changed message from a real one → Add a checksum with a secret key; The same message opens the lock every time, so one that was heard once works again → Use a challenge and response

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The key

**Which fix needs the key to be agreed beforehand, or by a key exchange?**

- All three: each uses the secret key
- Only the checksum
- Only the challenge and response
- None of them

* Answer: All three: each uses the secret key

<!-- Speaker note: The cipher, the keyed checksum and the answer function all use the same secret key, so both ends need it before they start. That is what a key exchange is for. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 1: lock the code

Send the code **locked with secretKey** instead of as text, and have the lock unlock it before checking.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-security/ctf-defend/?full=step-4#step-4)

<!-- Speaker note: What this step is for: The first fix is the one from the XOR lesson: the lock and the key share a number, and the code travels locked with it. Hints, in order: A sends 4271 ^ secretKey as a number. / On radio received number, open if received number ^ secretKey is 4271. For students who need more support: Share the milestone 2 code and ask students to explain it before they build milestone 3. For early finishers: Add the lockout after three wrong answers from the Challenge–response lesson. The hard part, on purpose: Matching each weakness to its tool and keeping the keys the same on both sides. When the lock fails, ask them to name the weakness each milestone fixes. When students get stuck: The lock never opens. Ask: Do both micro:bits have the same secretKey? Is the answer function the same? Fix: Use one secretKey and one answer function in the same program on both. / The lock opens for the wrong key. Ask: Do you compare the answer with answer(challenge) on the lock? Fix: Compare value with answer(challenge); keep challenge in a variable on the lock. / Milestone 3 and the checksum work separately but not together. Ask: Which block handles each name (KNOCK, CHALL, ANSWER)? Fix: One on radio received value block with if, else if on the name. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Milestones 2 and 3: harden it



- **Milestone 2: a checksum on the knock:** Replace the locked code with a **knock** that carries a keyed checksum. The lock goes on only if the checksum matches.
- **Milestone 3: a challenge and response:** Instead of a fixed code, the lock sends a **random challenge**; the key answers it, and the lock opens only on the right answer. The functions **checksum** and 

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-security/ctf-defend/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: A sends the word KNOCK as a name with its checksum: radio send value (KNOCK, checksum(KNOCK)). The lock only goes on if the checksum matches. / The lock picks randint(10, 99), sends it as CHALL, and the key micro:bit sends back answer(value) as ANSWER. The lock opens only if the answer is answer(challenge). -->

---

## Report

Every protection in your lock rests on one secret key. Security is the habit of asking "what could go wrong here?", then fixing each answer.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name the three weaknesses of the starting lock and the fix for each.**

* Readable by the group: encrypt with a shared key. A changed message can't be told: a keyed checksum. A heard message works again: challenge and response.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Where this leads: real systems use proven libraries, long keys, hash functions and certificates. The ideas here are the same. -->
