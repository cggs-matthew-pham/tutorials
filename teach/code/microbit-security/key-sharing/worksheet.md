---
title: "Agreeing a key in the open"
subtitle: "Secret messages · Trust · Lesson 6"
---

# Agreeing a key in the open

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every time you open a secure web page, your computer and a server agree a key with a stranger, in public, in less than a second. This lesson is the idea behind it, with numbers small enough to follow by hand.


:::teacher-note

**In one sentence:** Students agree a key over an open channel with a Diffie–Hellman style exchange using small numbers, then use it as the key for XOR.

**Students should be able to say:** I can explain why a key cannot simply be sent by radio. I can say which numbers cross the air and which stay private in a key exchange. I can use an agreed number as the key for a cipher.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/ef9830d64217.png?v=3bb74d45cbdf0417)

:::keep-together

**One micro:bit has private number 6 (this program) and the other has 15. Both press A, so each hears the other's mix. What does each micro:bit show?**

☐ 6 on one and 15 on the other

☐ 2 on both

☐ 8 on one and 19 on the other

☐ 23 on both

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 2 on both. The micro:bit with 6 receives 19 and shows 19⁶ mod 23 = 2; the one with 15 receives 8 and shows 8¹⁵ mod 23 = 2.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/ef9830d64217.png?v=3bb74d45cbdf0417)

:::keep-together

### Mixes and keys

**A micro:bit with private number 3 sends its mix: 5³ mod 23. What number goes out? (5³ = 125.)**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 10

125 ÷ 23 is 5 with remainder 10, so the mix is 10.

:::


:::keep-together

### What goes across

**Which of these cross the air, and which stay on one micro:bit?**

Groups: Crosses the air, Stays on one micro:bit

- P and G: {{field-15}}
- The mix (8 or 19): {{field-15}}
- A private number (6 or 15): {{field-15}}
- The shared key (2): {{field-15}}

:::


:::teacher-note

**Answer:** P and G → Crosses the air; The mix (8 or 19) → Crosses the air; A private number (6 or 15) → Stays on one micro:bit; The shared key (2) → Stays on one micro:bit

:::


:::keep-together

### Why the toy numbers are weak

**With P = 23 anyone who hears the mixes could simply try every private number from 1 to 22. Why is the real thing safe?**

☐ It sends the mixes twice

☐ It uses a secret radio group

☐ The real P and private numbers have hundreds of digits, so there are far too many to try

☐ Only the first mix is public

:::


:::teacher-note

**Answer:** The real P and private numbers have hundreds of digits, so there are far too many to try

This is the same lesson as the Caesar cipher: a small number of keys can be tried one by one. Real systems use numbers so large that trying them all would take longer than the age of the universe.

:::


:::typical

## Modify

First press **A** on both micro:bits, so each works out **shared**. Then let **B** send the number 7 locked with **shared**, and show it unlocked on the other.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/8e4d1408161f.png?v=8cdff3ae1aecc675)

:::

:::


## Make

Put it together: **A** sends your mix and each micro:bit works out the shared key and shows a tick; **B** sends a PIN locked with it; the other micro:bit unlocks and shows the PIN. The key was never sent.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/0f8a5df4c891.png?v=cc7b59639bfeda05)

:::


## Exit ticket

:::keep-together

**Which of the numbers go across the air in a key exchange?**

{{lines-3}}

:::


:::teacher-note

**Answer:** P, G and the two mixes. The private numbers and the shared key never do.

:::

