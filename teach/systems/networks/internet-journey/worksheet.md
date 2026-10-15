---
title: "Across the internet"
subtitle: "Networks · Keeping it safe · Lesson 4"
---

# Across the internet

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** You press Buy. Less than a second later, a shop on the other side of the world has your order, and nobody on the way could read your card number. What happened in between?


:::teacher-note

**In one sentence:** Students follow an online purchase from laptop to shop on a board and its step log, connecting wired and wireless links, packets, TCP and HTTPS encryption into one end-to-end account, then put the journey in order themselves (AC9TDI8K02 node 5).

**Students should be able to say:** I can describe the journey of data across the internet. I can say where packets, a protocol and encryption each play a part. I can point out which parts of the trip are wired and which are wireless.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**Your card number travels from your laptop to an online shop. Where does it get encrypted?**

☐ At the internet provider

☐ At the shop, when it arrives

☐ At your home router

☐ On your laptop, before it leaves

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** On your laptop, by the browser (HTTPS), before it leaves. Anywhere later would leave the first part of the trip, including the Wi-Fi, readable.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: the whole chain


:::keep-together

### Follow the purchase

1. $\text{encrypt (HTTPS)}$ — On the laptop, before anything is sent (Who can see your data?).
2. $\text{split into packets}$ — Numbered packets (Packets).
3. $\text{Wi-Fi, then fibre}$ — Wireless first, then wired links (Wired or wireless).
4. $\text{routers, different routes}$ — Each packet is passed on towards the shop.
5. $\text{lost packet sent again}$ — TCP: the shop never confirmed it, so it was resent.
6. $\text{reorder, decrypt}$ — The shop rebuilds the message by number and decrypts it with its key.

Now pick out the wireless part.

**Which part of this journey is wireless?**

☐ None of it

☐ Home router to the provider

☐ Provider to the shop

☐ Laptop to the home router (Wi-Fi)

:::


:::teacher-note

**Answer:** Laptop to the home router (Wi-Fi)

Only the first hop is wireless here. Most of the internet is cables and fibre, including under the sea.

:::


:::keep-together

### Find the mistake

**Sam describes how the card number is protected. Click the line where it first goes wrong.**

```
 1  I type my card number and press Buy.
 2  My laptop splits it into packets.
 3  My home router encrypts the packets.
 4  The packets travel across the internet to the shop.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: the browser encrypts the data on the laptop (HTTPS) before it is sent. If the router did it, the packets would cross the Wi-Fi as plain text, where anyone nearby could copy them.

:::


:::keep-together

### HTTPS off

**With HTTPS **off**, who could read the card number?**

☐ Only the shop

☐ Anyone on the Wi-Fi or any network along the way

☐ Nobody, because it is split into packets

☐ Only the internet provider

:::


:::teacher-note

**Answer:** Anyone on the Wi-Fi or any network along the way

Without encryption, every link and router on the way handles readable packets.

:::


:::typical

## Vary: change one thing


**HTTPS off.** 

**HTTPS on.** 

**Slow at the far end.** 

**Without TCP.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## The internet


:::keep-together

### Mobile video

**You watch a video on the school bus on mobile data. Which part of the trip is wireless?**

☐ The video company's servers

☐ The fibre between cities

☐ Phone to the mobile tower

☐ None

:::


:::teacher-note

**Answer:** Phone to the mobile tower

Phone to tower is wireless; from the tower onwards it is mostly fibre.

:::


:::keep-together

### Which protocol?

**Which protocol puts a web page's packets back in order and asks for lost ones?**

☐ Fibre

☐ TCP

☐ Wi-Fi

☐ HTTPS

:::


:::teacher-note

**Answer:** TCP

TCP numbers, acknowledges and resends packets.

:::


:::keep-together

### Review: decrypt

**Review: a message was encrypted with key 2. You receive **JK**. What did it say?**

☐ IJ

☐ JK

☐ LM

☐ HI

:::


:::teacher-note

**Answer:** HI

J → H and K → I: HI.

:::


## Make: put the journey in order

Then: which steps would change if you used mobile data instead of home Wi-Fi?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Describe the journey of a password from your phone to a website in four steps, naming where encryption, packets and TCP each come in.**

{{lines-3}}

:::


:::teacher-note

**Answer:** Encrypted on the phone (HTTPS); split into packets; sent over wireless then wired links through routers, with TCP resending lost packets; put back in order and decrypted by the website.

:::

