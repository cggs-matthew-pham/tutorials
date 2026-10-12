---
marp: true
theme: default
html: true
---

# Breaking a Caesar cipher

Secret messages · Secret codes

<!-- Speaker note: Students break Caesar ciphers by trying every key, learn that the number of possible keys decides strength, and capture their first flag. About 40 minutes (Predict and Run 8 min · Investigate 10 min · Modify 6 min · Flag 10 min (typical)). -->

---

## Today

**We are learning to** a Caesar cipher has only 25 useful keys, so trying them all breaks it in moments. Seeing why is how you learn what a strong key needs.

- I can break a Caesar cipher by trying every key.
- I can explain why a cipher with only 25 keys is weak.
- I can say why a longer message does not make a Caesar cipher stronger.

<!-- Speaker note: Before class: **The idea:** a cipher's strength comes from how many keys there are to try and how little the cipher text gives away. The Caesar cipher has 25. A computer tries them all in a blink; a person with the program tries them in a minute. **Framing for students:** this is how codes are tested. Everyone here is breaking messages given to them, as a code designer does before trusting a code. We are not breaking anyone's private messages. **Letter counts:** in English E is the most common letter, then T, A, O. In a long Caesar cipher text the most common letter is probably E shifted by the key. Do the Investigate task on the board together. **Flags:** a flag is the answer to a puzzle in a fixed form, `WP{...}`. The page stores only a scrambled fingerprint (a hash) of the right answer, so view source does not give it away. The answer is below in the notes: **WP{keys matter}**. -->

---

## Why it matters

> People who design codes spend their time breaking them. A code is only trusted once many people have tried hard to break it and failed.

<!-- Speaker note: Last lesson you built a cipher. Now you find out how strong it is, by breaking messages that **you** are given. This is how codes are tested: the people who build them try to break them first. The program below tries a key each time you press **A**: it decrypts a secret message with key 1, then 2, then 3, and so on. A person reads each attempt and spots the one that makes sense. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/ab9fd85cb603.png?v=26c8b3d4c2f4db1e)

**The secret is KHOOR. You press A three times. What does the micro:bit show after the third press?**

- JGNNQ
- KHOOR
- HELLO
- IFMMP

<!-- Speaker note: What happens: HELLO. Press 3 tries key 3, which undoes the shift of 3 (K→H, H→E, O→L, O→L, R→O). Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most do not see that press 3 undoes key 3. Replay it slowly. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* HELLO. Press 3 tries key 3, which undoes the shift of 3 (K→H, H→E, O→L, O→L, R→O).

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/microbit-security/crack/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/microbit-security/crack/?full=step-2#step-2)

<!-- Speaker note: Students should be able to say: I pressed A until readable English appeared, and I saw which key it was. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/ab9fd85cb603.png?v=26c8b3d4c2f4db1e)

<!-- Speaker note: What this step is for: A Caesar cipher has only 25 keys, so trying them all is quick. Letter counts break it even faster. A strong code needs a huge number of possible keys, and more than that. -->

<!-- Speaker note: Teacher: ask whether any letter other than E could be most common in a very short message. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## How many tries

**At most, how many different keys do you have to try to break any Caesar cipher message? (Key 0 changes nothing.)**

* Answer: 25

<!-- Speaker note: The shift can be 1 to 25, so 25 tries is the most it can take. On average about 13. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Counting letters

**In English, the most common letter is E. In a long cipher text the most common letter is L. What is the likely key?**

- 3
- 7
- 11
- 25

* Answer: 7

<!-- Speaker note: L is 7 places after E (E→F→G→H→I→J→K→L). So the key is probably 7. Counting letters finds a Caesar key without trying them all. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A longer message

**Lee says: 'If I use a 100-letter message instead of a 5-letter one, it is harder to break.' Is that right for a Caesar cipher?**

- Yes, longer is stronger
- No, because the key changes each letter
- No: a longer message gives more clues, and the key is still one of 25
- Yes, but only with spaces

* Answer: No: a longer message gives more clues, and the key is still one of 25

<!-- Speaker note: Strength comes from how many keys are possible, not how long the message is. A longer message actually makes letter counting work better. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Count how many keys you try: **B** shows the number of tries so far.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit-security/crack/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A person is doing the work of recognising English. A program can count the tries for them. Hints, in order: Add a variable tries, add one to it each time A is pressed, and show it when B is pressed. For students who need more support: Tell students to read each attempt aloud and say 'sense or nonsense'. For early finishers: Add a third button that tries the next key by itself every second and stops when you press it. The hard part, on purpose: Trying every key systematically and spotting readable text. Ask how many keys there are and how they'll know which one is right. When students get stuck: The flag is not accepted. Ask: Did you type WP{ then the message in lower case, then }? Is the space in the right place? Fix: The message has a space in the middle: WP{keys matter}. / Nothing readable appears for any key. Ask: Did you change the cipher text in the program? Fix: Start again from the step's starter. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Capture the flag

Your first **flag**. A flag is a secret answer that proves you solved a puzzle. Use the program (it already holds the cipher text) to find the message, then type the flag in the exact form: `WP{` + the message in lower case + `}`.

For example, a message **HELLO THERE** would give the flag `WP{hello there}`.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit-security/crack/?full=step-5#step-5)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why can a Caesar cipher be broken so quickly?**

* There are only 25 keys, so trying them all is quick; letter counts shorten it further.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: a cipher with a much bigger key. -->
