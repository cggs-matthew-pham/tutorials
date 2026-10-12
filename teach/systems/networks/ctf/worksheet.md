---
title: "Network capture the flag"
subtitle: "Networks · Network capture the flag · Lesson 5"
---

# Network capture the flag

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** The club's network is sending its secrets where anyone can pick them up. Find four of them before someone else does.


:::teacher-note

**In one sentence:** The Networks challenge. Students find four flags in the club's own (made-up) network traffic, each with one idea from the course (readable unencrypted packets, packet numbers to reorder a message, the packet TCP must resend, and the quickest route round an overloaded router), then fix every device that sends readable data (AC9TDI8K02 nodes 2 and 5). Defensive throughout. A 5E mission lesson.

**Students should be able to say:** I can find which data on a network anyone could read. I can use packet numbers to rebuild a message and find a missing packet. I can find a route round a busy router and say how to fix readable traffic.

**Width:** the unmarked parts are the floor every student does (Engage, Explore, Explain, Evaluate). Typical and Wider sections add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Engage


:::keep-together

**A device on the club Wi-Fi sends a message without HTTPS. Who could read it?**

☐ Anyone on the same network who picks it up, and anyone along its way

☐ Nobody: Wi-Fi scrambles everything

☐ Only the device it was sent to

☐ Only people without the Wi-Fi password

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Anyone on the network or along the way who captures it. Only encryption all the way (HTTPS) keeps it private.

:::


## Explore

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Explain: what the flags show

1. $\text{Flag 1}$ — Data sent without encryption can be read by anyone who picks it up.
2. $\text{Flag 2}$ — Packets take different routes; their numbers put the message back together.
3. $\text{Flag 3}$ — Numbers also show which packet is missing, so TCP asks for just that one.
4. $\text{Flag 4}$ — Routers send packets round busy or broken parts of the network.

### Find the mistake

:::keep-together

**Sam checks the club network. Click the line where it first goes wrong.**

```
 1  The club Wi-Fi has a password.
 2  Only members know the password.
 3  So everything sent on the club Wi-Fi is private.
 4  So the display board doesn't need HTTPS.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: everyone with the password is on the network too, and past the router the data travels the internet. Only HTTPS protects it all the way.

:::


## Make: Elaborate: fix the network


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Why do packets carry numbers? Give two reasons.**

{{lines-3}}

:::


:::teacher-note

**Answer:** So the receiver can put them back in order, and so it can tell which one is missing and ask for just that one (TCP).

:::

