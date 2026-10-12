---
marp: true
theme: default
html: true
---

# Prove it with a challenge

Secret messages · Trust

<!-- Speaker note: Students build a challenge-and-response lock so that a heard answer cannot be used again, then add a lockout after three wrong answers. About 50 minutes (Predict and Run 10 min · Investigate 10 min · Modify 8 min · Make 18 min). -->

---

## Today

**We are learning to** a password sent again and again is the same every time. A challenge that changes each time makes each answer good for one use only.

- I can describe the four steps of a challenge and response.
- I can explain why an answer heard once does not open the lock again.
- I can say what never crosses the air.

<!-- Speaker note: Before class: **The idea:** to prove you know a secret without saying it, the other side sets a random question, **the challenge**, and you answer it using the secret. A fresh challenge each time means an old answer fits only the old challenge. **Everyday picture:** a bank clerk who asks for a random character of your password each time. Where it breaks: if the same question comes up, the answer works again; the challenge must be random and not repeat. **Honest limits:** the answer function here, (n × key + 3) mod 100, is a toy: someone who collects enough challenges and answers can work out the key, and with only 90 possible challenges they repeat soon. Real systems use a **hash function** (a one-way mix) and huge challenges. Tell students the toy is for learning the shape of the idea. **Same program on both micro:bits:** the simulator runs two copies. The one where A is pressed acts as the key; the other acts as the lock. -->

---

## Why it matters

> Car key fobs, tap-to-pay cards and building passes do not send a fixed code. The reader sends a random number, and the card answers in a way only it can. Next time the number is different.

<!-- Speaker note: In the XOR lesson the keypad sent the **same locked PIN every time**. Anyone who ever heard that number has a number that works today, tomorrow and next week, without ever knowing the key. The fix is a **challenge and response**: 1. The key micro:bit **knocks**. 2. The lock picks a **random challenge** and sends it. 3. The key micro:bit works out an **answer** from the challenge and the secret key, and sends it. 4. The lock works out the same answer itself and opens only if they match. The secret key never goes through the air, and the answer is different whenever the challenge is. In the code the challenge travels under the name `chall`, not `challenge`: **send value** names are 8 characters at most (Agreeing a key in the open), and `challenge` has 9. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/7abe47c17eee.png?v=326263dc0ec2acac)

**The key micro:bit knocks. The lock picks the challenge 50. The answer is (n × 7 + 3) remainder 100. What answer goes through the air?**

- 7
- 50
- 53
- 353

<!-- Speaker note: What happens: 53. 50 × 7 + 3 = 353, and the remainder after dividing by 100 is 53. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask for the working before the options. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 53. 50 × 7 + 3 = 353, and the remainder after dividing by 100 is 53.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/microbit-security/challenge-response/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/microbit-security/challenge-response/?full=step-2#step-2)

<!-- Speaker note: Press **A** a few times. Open **Show data** and compare the challenge and answer numbers each time. Students should be able to say: I knocked several times and saw a tick each time, with a different challenge and answer each time. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/7abe47c17eee.png?v=326263dc0ec2acac)

<!-- Speaker note: What this step is for: A fixed answer works forever once it has been heard. An answer that depends on a fresh challenge works once. The key proves itself without ever being sent. -->

<!-- Speaker note: Teacher: ask what a listener has after hearing one full exchange (a challenge and its answer), and whether it helps with the next one. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Working out an answer

**The lock picks the challenge 20. What answer opens the lock? (n × 7 + 3, remainder after dividing by 100.)**

* Answer: 43

<!-- Speaker note: 20 × 7 + 3 = 143, and the remainder after dividing by 100 is 43. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## An answer heard before

**Yesterday the lock's challenge was 50 and the answer 53. Today the lock picks a new challenge. Why is 53 unlikely to open it today?**

- 53 is used up
- Radio forgets old numbers
- The lock changes its key
- The new challenge is almost certainly different, so its answer is different

* Answer: The new challenge is almost certainly different, so its answer is different

<!-- Speaker note: The answer depends on the challenge. A new challenge gives a new answer, so an old answer fits only the old challenge. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What crosses the air

**For each item, does it cross the air in the challenge-and-response?**

Groups: Crosses the air · Never crosses the air

The knock · The challenge · The answer · The secret key

* Answer: The knock → Crosses the air; The challenge → Crosses the air; The answer → Crosses the air; The secret key → Never crosses the air

<!-- Speaker note:  -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Make the lock count how many times it opened, and show the count when **B** is pressed.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit-security/challenge-response/?full=step-4#step-4)

<!-- Speaker note: What this step is for: The lock can keep a record of what happened, such as how many times it opened. Hints, in order: Make a variable opened. Add one to it when the answer is right. B shows it. For students who need more support: Give the lockout in outline: students fill in the conditions. For early finishers: Make the challenge 3 digits and store it as a number. Why does a longer challenge repeat less often? The hard part, on purpose: Why a fixed password fails once heard, and a fresh challenge doesn't. Ask what a listener could reuse, and whether the answer ever repeats. When students get stuck: The lock always shows a cross. Ask: Do both micro:bits have the same secretKey? Is the answer function the same? Fix: Use the same secretKey and answer function on both. / The tick appears on the wrong micro:bit. Ask: Which micro:bit checks the answer? Fix: The micro:bit that picked the challenge also checks the answer; the knocker only answers. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make the lock safer. After **three wrong answers** it shows a skull and ignores knocks for **five seconds**. Why does this help against someone who just guesses?

[Open this step](https://tutorials.learningwaypoints.com/code/microbit-security/challenge-response/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: Add one to wrong when an answer is wrong and set wrong to 0 when it is right. / On a knock, if wrong is 3 or more: show a skull, pause 5 seconds, set wrong to 0. Otherwise send the challenge. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does a challenge and response protect a lock better than a fixed password?**

* The answer depends on a fresh challenge, so an answer that was heard before no longer fits.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: capture-the-flag puzzles, then defend a whole system. -->
