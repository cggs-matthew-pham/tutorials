---
title: "Packets"
subtitle: "Networks · Moving data · Lesson 2"
---

# Packets

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** The internet never sends your message in one piece. So how does it ever arrive whole?


:::teacher-note

**In one sentence:** A full 5E lesson (AC9TDI8K02 node 2). Students write what they think will go wrong, watch a message go to pieces on the board (no fixes, nothing named), invent their own fix with two plain switches (Numbers, Ask again) and find a second fix by avoiding busy router C. Only then do they explain it in their own words and meet the names: packet, router, acknowledgement, TCP. Elaborate takes the idea to broken links and live video.

**Students should be able to say:** I can explain why data is sent in packets. I can describe what happens when a packet is lost. I can explain how TCP gets the whole message there in order.

**Width:** the unmarked parts are the floor every student does (Engage, Explore, Explain, Evaluate). Typical and Wider sections add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Engage

When you send a message, a photo or a video, it is chopped into small pieces. The pieces travel separately, through computers run by other people, and some of those computers are busy. There is no right answer yet: write what you think.

:::keep-together

**The internet never sends a message in one piece. MEET AT NOON is chopped into 4 pieces, and each piece finds its own way to Ali through routers, some of them busy. What could go wrong on the way? Write your best guess.**

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The pieces took different routes, so they arrived in a different order, and one was lost at busy router C. With nothing but letters on them, Ali's computer just joined them in the order they came.

:::


## Explore

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Explore

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Explain: what you invented has names


:::keep-together

### Explain it yourself

**In your own words: how did your first fix get the whole message to Ali, in order, with every link working? Say what each piece carried and what Ali's computer did.**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** Each piece carried a number as well as its letters. (so Ali's computer knows where each piece goes); Ali's computer put the pieces in order by their numbers. (they took different routes, so they arrived in a different order); It confirmed each piece it got, and saw that number 2 was missing. (a gap in the numbers shows what was lost); Only piece 2 was sent again. (it was the only piece never confirmed)

Numbers put the pieces in order and show the gap; confirming each piece means only the one never confirmed is sent again.

:::


:::keep-together

### Give it names

What you invented has names. The pieces are **packets**: each carries a piece of the data, a **number** and the address it is going to. **Routers** are the computers along the way; each one reads a packet's address and passes it on. When Ali's computer confirms a packet, that is an **acknowledgement**. Your Ask again switch was **TCP**: the set of rules that has the receiver acknowledge each packet, so any packet never acknowledged is sent again. Your first fix, step by step:

1. $\text{MEE | T·A | T·N | OON}$ — Split into 4 packets of 3 characters (· is the space). Each gets a number: 1 to 4.
2. $\text{routes differ}$ — Each router passes each packet on. Busy router C is slow.
3. $\text{arrive: } 3, 1, 4$ — Packet 2 was lost at C; the others arrived out of order.
4. $\text{TCP: acknowledge } 1, 3, 4$ — Ali's computer confirms each packet it gets. Packet 2 is never confirmed.
5. $\text{packet 2 sent again}$ — Only the missing packet is resent.
6. $1, 2, 3, 4 \to \text{MEET AT NOON}$ — The numbers put the message back in order.

**Match each name to what you did on the board.**

A. A computer on the way that passes each piece on

B. A piece of the message, with its number and where it is going

C. The rules your Ask again switch followed: confirm each piece, send again any that isn't confirmed

D. Ali's computer confirming a piece arrived

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `Packet` | |
| `Router` | |
| `Acknowledgement` | |
| `TCP` | |

:::


:::teacher-note

**Answer:** Packet → B. A piece of the message, with its number and where it is going; Router → A. A computer on the way that passes each piece on; Acknowledgement → D. Ali's computer confirming a piece arrived; TCP → C. The rules your Ask again switch followed: confirm each piece, send again any that isn't confirmed

Your Numbers and Ask again switches are how TCP works: numbered packets, acknowledged by the receiver, with unacknowledged ones sent again.

:::


:::keep-together

### Two fixes

**Your second fix, cutting off router C, also worked, with no numbers at all. Why does the internet use numbers and resending instead?**

☐ Cutting links is against the rules of the internet

☐ Numbered packets travel faster

☐ Routers can only pass on numbered packets

☐ Nobody knows ahead of time which router will be busy or which link will break, so every message needs a way to recover

:::


:::teacher-note

**Answer:** Nobody knows ahead of time which router will be busy or which link will break, so every message needs a way to recover

You could avoid C because you could see it was busy. Real networks change all the time, so the receiver needs a way to fix whatever happens: numbers and acknowledgements.

:::


:::keep-together

### Find the mistake

**Sam explains what happens to a lost packet. Click the line where it first goes wrong.**

```
 1  The message is split into 4 numbered packets.
 2  Packet 2 is lost at a busy router.
 3  So the whole message must be sent again from the start.
 4  That is why a download starts again when one packet is lost.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: with TCP, the receiver confirms each packet it gets. Only the packet that was never confirmed is sent again, not the whole message.

:::


:::typical

## Elaborate: when the network breaks


:::keep-together

### Video calls

**A live video call doesn't wait for lost packets: it doesn't use TCP. A packet goes missing during a call. What do you notice?**

☐ The whole call starts again

☐ The call freezes until the packet is sent again

☐ A small glitch, and the call carries on

☐ Nothing: packets are never lost on calls

:::


:::teacher-note

**Answer:** A small glitch, and the call carries on

On a live call a late packet is useless, so it is skipped and you see a glitch. For a file or a message, TCP waits for the missing packet, because every piece matters.

:::

:::


## Exit ticket

:::keep-together

**A message is split into 5 packets and packet 3 is lost. What does TCP do, and how does the message end up in order?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The receiver never confirms packet 3, so the sender sends it again. The receiver puts the packets in order by their numbers.

:::

