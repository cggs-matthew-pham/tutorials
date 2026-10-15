---
marp: true
theme: default
html: true
---

# Agreeing a key in the open

Secret messages · Trust

<!-- Speaker note: Students agree a key over an open channel with a Diffie–Hellman style exchange using small numbers, then use it as the key for XOR. About 55 minutes (Predict and Run 12 min · Investigate 12 min · Modify 10 min · Make 18 min). -->

---

## Today

**We are learning to** both ends need the same key, but anything sent by radio is public. Each end mixes a private number with public numbers, swaps the mixes, and both arrive at the same key without it ever being sent.

- I can explain why a key cannot simply be sent by radio.
- I can say which numbers cross the air and which stay private in a key exchange.
- I can use an agreed number as the key for a cipher.

<!-- Speaker note: Before class: **The idea:** two ends agree a shared key while everyone listens. Each mixes a private number with public numbers, swaps the mixes, and mixes again with its private number. Both reach the same number, which was never sent. This is the **Diffie–Hellman** key exchange, the idea behind the padlock in a browser. **Everyday picture:** paint. Everyone knows the common colour (yellow). Each person adds a private colour and shares the mixture. Each then adds their private colour to the other's mixture. Both end with the same colour, and nobody can un-mix the shared one to find the private colours. Where it breaks: with numbers there is no real un-mixing for big numbers, but for tiny numbers you can just try them all. **The maths:** students need only the pattern "power, then remainder". The check numbers are small. The program does the working (modPow, a loop, as in micro:bit Foundations). **Honest limits:** P = 23 can be broken by trying all private numbers (the third Investigate task says so). Also, a key exchange does not say **who** you are talking to: an unknown micro:bit could do the exchange too. That need, to prove who is who, is the next lessons' job. -->

---

## Why it matters

> Every time you open a secure web page, your computer and a server agree a key with a stranger, in public, in less than a second. This lesson is the idea behind it, with numbers small enough to follow by hand.

<!-- Speaker note: The last lesson needs both micro:bits to hold the **same key**. How do they get it? If one sends the key by radio, everyone in the group hears it (lesson 1). Meeting in person works for two friends, but not for a phone and a web server. The trick: agree a key **in public** without ever sending it. 1. Two **public numbers** are known to everyone: **P = 23** and **G = 5**. 2. Each micro:bit picks a **private number** and never tells anyone: say 6 and 15. 3. Each sends a **mix**: **G to the power of its private number, remainder after dividing by P**. 5⁶ mod 23 is **8**; 5¹⁵ mod 23 is **19**. These are sent over the air. 4. Each takes the other's mix and raises it to its **own** private number, mod P. 19⁶ mod 23 = **2**, and 8¹⁵ mod 23 = **2**. They match, and the key 2 was never sent. The function **modPow** does "base to the power, remainder after dividing by prime" with a loop. **Behind the code:** the mix travels with **radio send value** (in **Radio**), which sends a short **name** and a number together: here the name `mix` and the number. **on radio received value** gives the receiver both, as `name` and `value`, and `name == "mix"` checks the name; text must match exactly, capital letters included. A name can be **8 characters at most**: a longer name is cut short on the way, so it no longer matches. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ef9830d64217.png?v=3bb74d45cbdf0417)

**One micro:bit has private number 6 (this program) and the other has 15. Both press A, so each hears the other's mix. What does each micro:bit show?**

- 6 on one and 15 on the other
- 2 on both
- 8 on one and 19 on the other
- 23 on both

<!-- Speaker note: What happens: 2 on both. The micro:bit with 6 receives 19 and shows 19⁶ mod 23 = 2; the one with 15 receives 8 and shows 8¹⁵ mod 23 = 2. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: let students work out the mixes on paper or with a calculator first. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 2 on both. The micro:bit with 6 receives 19 and shows 19⁶ mod 23 = 2; the one with 15 receives 8 and shows 8¹⁵ mod 23 = 2.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/microbit-security/key-sharing/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/microbit-security/key-sharing/?full=step-2#step-2)

<!-- Speaker note: Each simulated micro:bit picks its own random private number. Press **A** on both (one after the other) and compare the numbers shown. Students should be able to say: I pressed A on both simulated micro:bits and both showed the same number, even though each picked a different private number. -->

<!-- Speaker note: Teacher: remind them to press A on both micro:bits before reading the numbers. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ef9830d64217.png?v=3bb74d45cbdf0417)

<!-- Speaker note: What this step is for: The shared key is worked out on each micro:bit from a private number that never leaves it. What goes through the air is not enough to find the key quickly, once the numbers are big. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mixes and keys

**A micro:bit with private number 3 sends its mix: 5³ mod 23. What number goes out? (5³ = 125.)**

* Answer: 10

<!-- Speaker note: 125 ÷ 23 is 5 with remainder 10, so the mix is 10. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What goes across

**Which of these cross the air, and which stay on one micro:bit?**

Groups: Crosses the air · Stays on one micro:bit

P and G · The mix (8 or 19) · A private number (6 or 15) · The shared key (2)

* Answer: P and G → Crosses the air; The mix (8 or 19) → Crosses the air; A private number (6 or 15) → Stays on one micro:bit; The shared key (2) → Stays on one micro:bit

<!-- Speaker note:  -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why the toy numbers are weak

**With P = 23 anyone who hears the mixes could simply try every private number from 1 to 22. Why is the real thing safe?**

- It sends the mixes twice
- It uses a secret radio group
- The real P and private numbers have hundreds of digits, so there are far too many to try
- Only the first mix is public

* Answer: The real P and private numbers have hundreds of digits, so there are far too many to try

<!-- Speaker note: This is the same lesson as the Caesar cipher: a small number of keys can be tried one by one. Real systems use numbers so large that trying them all would take longer than the age of the universe. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

First press **A** on both micro:bits, so each works out **shared**. Then let **B** send the number 7 locked with **shared**, and show it unlocked on the other.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-security/key-sharing/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Once both ends have the same number, it can be the key for the cipher from the last lesson. Hints, in order: B sends a secret number locked with shared: radio send number (7 ^ shared). On radio received number, show received number ^ shared. For students who need more support: Give the exchange complete and ask only for the locked PIN. For early finishers: Change P and G. Which private numbers still give a match? (All of them do: the method works for any P and G.) The hard part, on purpose: Following a key exchange where the shared key never travels. Ask them to trace on paper what each micro:bit sends and what it keeps private. When students get stuck: The two micro:bits show different numbers. Ask: Did you press A on both before looking? Does each hear the other's mix? Fix: Both must send a mix and receive one. Use the same group. / The numbers are far too large or wrong. Ask: Is modPow taking the remainder at every step? Fix: result = (result × base) % prime inside the loop. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Put it together: **A** sends your mix and each micro:bit works out the shared key and shows a tick; **B** sends a PIN locked with it; the other micro:bit unlocks and shows the PIN. The key was never sent.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-security/key-sharing/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: A sends the mix; when a mix arrives, work out shared and show a tick. / B sends pin ^ shared; a number received is shown after ^ shared. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Which of the numbers go across the air in a key exchange?**

* P, G and the two mixes. The private numbers and the shared key never do.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: how does the receiver know a message was not changed on the way? -->
