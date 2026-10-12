---
title: "Who can see your data?"
subtitle: "Networks · Keeping it safe · Lesson 3"
---

# Who can see your data?

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** You type your PIN on the café's free Wi-Fi. Between you and the bank, who else gets a copy?


:::teacher-note

**In one sentence:** Students send a PIN past an eavesdropper on café Wi-Fi, first in plain text and then encrypted with a shift key, to explain why data must be encrypted in transit and show that encryption is reversible with the key (AC9TDI8K02 nodes 3 and 4).

**Students should be able to say:** I can explain why data needs encrypting when it is sent. I can encrypt and decrypt a short message with a key. I can say what makes a key weak.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**You type your PIN into a website on a café's free Wi-Fi. The website has **no encryption**. Who could read the PIN on its way to the bank?**

☐ Only people with a password to the bank

☐ Anyone on the café Wi-Fi, or on any network it passes through

☐ Nobody: packets are private

☐ Only the bank

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Anyone on the path. Packets cross the café's Wi-Fi and other networks you don't control, and plain text can be read by anyone who copies them.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: encrypt, then send


:::keep-together

### PIN 4821 with key 3

1. $\text{PIN 4821}$ — Your message, before it leaves.
2. $\text{P} \to \text{S},\ \text{I} \to \text{L},\ \text{N} \to \text{Q}$ — Encrypt: each letter moves 3 along.
3. $4821 \to 7154$ — Each digit moves 3 along, wrapping round after 9 (8 → 1).
4. $\text{SLQ 7154}$ — This is what travels, and all Eve can copy.
5. $\text{SLQ 7154} \to \text{PIN 4821}$ — The bank moves everything 3 back: decrypt with the same key.

This shift (a Caesar cipher) is easy to break, as the Secret messages course shows. Real encryption uses far stronger maths, but works the same way: a public method and a secret key.

**With key 3, every letter moves 3 along (A → D) and every digit moves 3 along (7 → 0). What does **CAT 12** become?**

☐ ZXQ 89

☐ FDW 45

☐ CAT 12

☐ DBU 23

:::


:::teacher-note

**Answer:** FDW 45

C→F, A→D, T→W, 1→4, 2→5.

:::


:::keep-together

### Find the mistake

**Sam decides whether it is safe to type a password. Click the line where the reasoning first goes wrong.**

```
 1  I am on the café's free Wi-Fi.
 2  The website has no padlock, so nothing is encrypted.
 3  My message only goes to the bank, so only the bank sees it.
 4  So it is safe to type my password here.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: the message goes to the bank, but it passes through the café Wi-Fi and other networks first, and anyone there can copy it. Without encryption, they can read it.

:::


:::keep-together

### Why reversible?

**Why must encryption be **reversible**?**

☐ The receiver has to turn it back into the real message with the key

☐ So it takes less space

☐ It doesn't have to be

☐ So that Eve can read it too

:::


:::teacher-note

**Answer:** The receiver has to turn it back into the real message with the key

Encrypt with the key, decrypt with the key. If it couldn't be reversed, nobody could read the message, including the bank.

:::


:::typical

## Vary: one setting at a time


**Encryption on.** 

**Key 0.** 

**Key 10.** 

**Too few keys.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Keep it safe


:::keep-together

### What needs encrypting

**Which of these most needs encrypting when you send it?**

☐ The time of a public bus timetable

☐ A news headline

☐ Your bank password

☐ The weather forecast you're reading

:::


:::teacher-note

**Answer:** Your bank password

Passwords, card numbers and private messages must be encrypted; public information is less of a worry (though encrypting everything also hides what you are reading).

:::


:::keep-together

### Decrypt

**A message was encrypted with key 3. You receive **KHOOR**. What did it say?**

☐ KHOOR

☐ HELLO

☐ GDKKN

☐ NKRRU

:::


:::teacher-note

**Answer:** HELLO

Move each letter back 3: K→H, H→E, O→L, O→L, R→O.

:::


:::keep-together

### The padlock

**What does the padlock in a browser's address bar mean?**

☐ The site has no adverts

☐ Data between you and the website is encrypted (HTTPS)

☐ The website is honest and safe to buy from

☐ Nobody can see that you visited the site

:::


:::teacher-note

**Answer:** Data between you and the website is encrypted (HTTPS)

HTTPS encrypts what travels between your browser and that website.

:::


:::keep-together

### Review: packets

**Review: a packet is lost on the way. With TCP, what happens?**

☐ The whole message starts again

☐ The message arrives with a gap

☐ The receiver never confirms it, so it is sent again

☐ The router rebuilds it

:::


:::teacher-note

**Answer:** The receiver never confirms it, so it is sent again

TCP resends only the packet that was never acknowledged.

:::


## Make: a safe key

Then: the Secret messages course (Code) builds this cipher on micro:bits, cracks it, and shares a key safely.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Why should a password be encrypted before it is sent? Encrypt CAB with key 2.**

{{lines-3}}

:::


:::teacher-note

**Answer:** Packets pass through equipment other people control, so anyone on the path could copy plain text. CAB → ECD.

:::

