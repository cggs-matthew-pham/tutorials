---
marp: true
theme: default
html: true
---

# One key to lock and unlock

Secret messages · Secret codes

<!-- Speaker note: Students lock and unlock numbers with XOR and a shared key, and meet the weakness of sending the same locked message every time. About 45 minutes (Predict and Run 8 min · Investigate 10 min · Modify 8 min · Make 15 min). -->

---

## Today

**We are learning to** xOR mixes a number with a key. Doing it again with the same key brings the number back, so one shared key works in both directions.

- I can lock a number with XOR and a shared key and unlock it with the same key.
- I can explain why a wrong key gives a wrong answer without an error.
- I can say why sending the same locked message each time is a weakness.

<!-- Speaker note: Before class: **The idea:** **XOR** gives a 1 where two bits differ and a 0 where they match. Doing it twice with the same key returns the original, so one key and one operation work in both directions. This is a **shared-key** (symmetric) cipher. **Bits:** the lesson text shows 7 ^ 5 in bits. If students have not met binary, treat the working as a table to read, not something to learn: the check answers can be found by following the pattern. **Two honest limits:** (1) XOR with a short key repeated is breakable; real systems use long keys and better methods. (2) The same message gives the same locked number every time, which the last Make task shows. Both are why the next lessons matter. -->

---

## Why it matters

> Most of the secret messages on the internet are locked with a key that both ends already share. The locking step is much like this lesson, only with far bigger numbers.

<!-- Speaker note: A computer stores numbers as patterns of **bits** (0s and 1s). **XOR** (written `^`) compares two numbers bit by bit: where the bits differ the answer has a 1, where they match it has a 0. ``` 7 = 111 5 = 101 7 ^ 5 = 010 = 2 ``` Now the useful part: **do it again with the same key and you get the original back**. 2 ^ 5 = 7. So the sender computes `message ^ key`, and the receiver computes `received ^ key`. One shared key, one operation, both directions. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:357](https://tutorials.learningwaypoints.com/_pictures/makecode/code/bbda7337c79a.png?v=0f879c9f00a53964)

**A is pressed. The radio carries a number. What does the receiving micro:bit show?**

- 2
- 5
- 7
- 12

<!-- Speaker note: What happens: 7. The radio carried 7 ^ 5 = 2. The receiver computes 2 ^ 5 = 7, the original number. Take two or three predictions before anyone runs it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 7. The radio carried 7 ^ 5 = 2. The receiver computes 2 ^ 5 = 7, the original number.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/microbit-security/shared-key/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/microbit-security/shared-key/?full=step-2#step-2)

<!-- Speaker note: Open **Show data** in the simulator and find the number the radio carried. Students should be able to say: I pressed A and saw 7 on the receiver, even though the radio carried a different number. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:357](https://tutorials.learningwaypoints.com/_pictures/makecode/code/bbda7337c79a.png?v=0f879c9f00a53964)

<!-- Speaker note: What this step is for: XOR with a key scrambles a number, and XOR with the same key unscrambles it. A wrong key gives a wrong answer, not an error. -->

<!-- Speaker note: Teacher: let students do the bit working on paper first. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Locking a number

**What number does the radio carry when the sender encrypts 6 with key 3? (6 is 110 in bits and 3 is 011.)**

* Answer: 5

<!-- Speaker note: 110 XOR 011 = 101, which is 5. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A wrong key

**The sender encrypted 6 with key 3, so the radio carries 5. A receiver wrongly uses key 4. What does it show?**

- An error message
- 6
- 1
- Nothing

* Answer: 1

<!-- Speaker note: 5 ^ 4 = 101 ^ 100 = 001 = 1. The receiver gets a wrong number and no warning. Nothing in XOR tells you the key was wrong. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why it works both ways

**Why does the receiver use the very same operation the sender used?**

- Because XOR undoes itself when you repeat it with the same key
- Because the micro:bit remembers the number
- Because 5 is a special key
- Because the radio flips the bits back

* Answer: Because XOR undoes itself when you repeat it with the same key

<!-- Speaker note: (message ^ key) ^ key = message. The key cancels itself. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Let **B** change the key and show it. Set the key the same on both micro:bits, then press **A**. Then make the keys different. What happens?

[Open this step](https://tutorials.learningwaypoints.com/code/microbit-security/shared-key/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Both micro:bits must hold the same key. Change one and they stop understanding each other. Hints, in order: B adds one to key (back to 1 after 15) and shows it. Make both micro:bits agree before pressing A. For students who need more support: Give the sending half complete. For early finishers: Lock each digit of the PIN separately, using a different key digit for each. The hard part, on purpose: XOR undoes itself with the same key, and a wrong key gives a wrong answer, not an error. Ask them to compare the keys on both micro:bits first. When students get stuck: The receiver shows a different number. Ask: Are the keys the same on both micro:bits? Fix: Make both keys equal; check B was pressed the same number of times on each. / ^ looks odd in the blocks. Ask: Which block is it? Fix: The ^ block is in Math (Advanced), with the other bit operations. -->

<!-- Speaker note: Teacher: wrong keys. Ask: does the receiver know something is wrong? -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make



- **The PIN:** 
- **The same number again:** Send a four-digit PIN, locked with a shared key, to a second micro:bit that unlocks and shows it.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit-security/shared-key/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: A variable pin holds 4271; A sends pin ^ key by radio. / On radio received number, show received number ^ key. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does the receiver use the same key and the same operation as the sender?**

* XOR with the same key undoes itself: (message ^ key) ^ key = message.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: both ends need the same key. How do they agree it without sending it? -->
