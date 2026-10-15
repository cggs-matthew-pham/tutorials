---
title: "Has the message changed?"
subtitle: "Secret messages · Trust · Lesson 7"
---

# Has the message changed?

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A bar code, a bank card number and a downloaded file all carry a small check number. If one digit is wrong, the scanner or the browser notices and refuses to trust it.


:::teacher-note

**In one sentence:** Students send messages with a checksum, see the receiver reject a changed one, and learn why a keyed checksum is needed against deliberate changes.

**Students should be able to say:** I can work out a checksum and use it to check a message. I can explain what a checksum does and does not protect against. I can say why a secret key makes a checksum harder to forge.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/68c7d4d60553.png?v=a7dbd972e609c20c)

:::keep-together

**The receiver gets A's message, then B's message (HELLP with HELLO's checksum). What does it show?**

☐ HELLP, then HELLO

☐ HELLO, then HELLP

☐ A cross, then HELLO

☐ HELLO, then a cross

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** HELLO, then a cross. The first matches its checksum (HELLO adds up to 7). HELLP adds up to 8, so it doesn't match the 7 that arrived.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/68c7d4d60553.png?v=a7dbd972e609c20c)

:::keep-together

### Working it out

**What is the checksum of KEY? (K is 10, E is 4, Y is 24. Add them and keep the last digit.)**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 8

10 + 4 + 24 = 38, and the last digit is 8.

:::


:::keep-together

### Swapped letters

**A message HELLO changes to EHLLO (two letters swap). Does this checksum notice?**

☐ Yes, always

☐ No: the letters add to the same total

☐ Yes, because the order changed

☐ Only for short messages

:::


:::teacher-note

**Answer:** No: the letters add to the same total

Addition ignores order, so swapped letters give the same checksum. That is a weakness of this simple checksum. Real checksums are sensitive to order.

:::


:::keep-together

### A deliberate change

**Someone changes the message in the air and also works out the new checksum with the same public method. What does the receiver think?**

☐ It spots the change

☐ Nothing wrong: the checksum matches the changed message

☐ It asks for the key

☐ It shows an error

:::


:::teacher-note

**Answer:** Nothing wrong: the checksum matches the changed message

A public checksum protects against accidents, not against a person who deliberately changes the message. If the checksum also needs a secret key, nobody without the key can produce a matching one.

:::


:::typical

## Modify

Mix a **secret key** into the checksum. Both micro:bits know it, and nobody else does, so only they can work out a matching number.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/04e9cfe60ff7.png?v=3e864948a81e8555)

:::

:::


## Make

Make a **message checker**: the receiver shows a tick for a good message and a cross for a bad one, and **A+B** shows how many bad messages have arrived.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/26e7e158a67d.png?v=6694490f86052fa4)

:::


## Exit ticket

:::keep-together

**What does a checksum let a receiver notice?**

{{lines-3}}

:::


:::teacher-note

**Answer:** That the message was damaged or changed after the checksum was worked out. A keyed checksum also stops someone making a matching one without the key.

:::

