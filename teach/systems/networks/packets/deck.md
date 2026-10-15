---
marp: true
theme: default
html: true
---

# Packets

Networks · Moving data

<!-- Speaker note: A full 5E lesson (AC9TDI8K02 node 2). Students write what they think will go wrong, watch a message go to pieces on the board (no fixes, nothing named), invent their own fix with two plain switches (Numbers, Ask again) and find a second fix by avoiding busy router C. Only then do they explain it in their own words and meet the names: packet, router, acknowledgement, TCP. Elaborate takes the idea to broken links and live video. About 45 minutes (Engage 5 min · Explore 15 min · Explain 12 min · Elaborate 8 min · Evaluate 5 min). -->

---

## Today

**We are learning to** data is sent as small numbered packets, not one long stream. You watch a message go to pieces, invent your own fix, then put names to it: routers pass packets on by different routes, numbers put them back in order, and TCP has the receiver confirm each one so a lost packet is sent again.

- I can explain why data is sent in packets.
- I can describe what happens when a packet is lost.
- I can explain how TCP gets the whole message there in order.

<!-- Speaker note: Before class: This is inquiry first (5E): students explore and invent before anything is explained. The words packet, acknowledgement and TCP appear only in Explain, after students have written their own explanation. If you usually teach explicitly, this is the lesson to try the difference. Try both Explore boards yourself. The first has no fix: Ali always gets a jumbled message with a gap. The second has two switches, Numbers and Ask again (TCP, not yet named); the goals can be met two ways (both switches with every link working, or no switches with C cut off). Engage works well unplugged first: cut MEET AT NOON into four strips with no numbers, hand them out across the room, have students pass them to an "Ali" by different paths, and keep one strip "lost". Ask Ali to read out what arrived. Then have students write their guesses. Explain: let students write first, then share two or three explanations before anyone opens Give it names. Then name each part of what they did on the projector, and reveal the worked lines. The "Explain it to me" drawer opens once Engage is answered and uses the names, so ask students to leave it until after Explain. Simplifications: real packets carry about 1500 bytes, and real TCP uses acknowledgement numbers and timers; the board waits until everything else has arrived before asking again. Without numbers the board's Ask again gives up, since TCP needs sequence numbers to know what is missing. Router C is set to be busy (slow, and it loses the second packet). Review: open the next lesson with a quick question on this one, and this one with one on Wired or wireless (which link loses the most packets?). Links: Secret messages' checksum lesson is how a receiver tells a packet was damaged. Teacher: Explore, invent a fix: ask what Ali's computer would need on each piece. When Numbers shows a gap, ask how it could get the missing piece. Teacher: Explore, switches off: if nobody thinks of breaking links, ask where the trouble starts. Teacher: Two fixes: ask whether you would always know which router is busy. Teacher: Evaluate: have students reread their Engage guess and say one thing they would change. -->

---

## Why it matters

> The internet never sends your message in one piece. So how does it ever arrive whole?

<!-- Speaker note: **Your mission:** get the message **MEET AT NOON** to your friend Ali, across a network of six routers. One of them, router C, is busy. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Engage: predict

**The internet never sends a message in one piece. MEET AT NOON is chopped into 4 pieces, and each piece finds its own way to Ali through routers, some of them busy. What could go wrong on the way? Write your best guess.**

<!-- Speaker note: What happens: The pieces took different routes, so they arrived in a different order, and one was lost at busy router C. With nothing but letters on them, Ali's computer just joined them in the order they came. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: read a few guesses aloud without judging. Note who pictures one pipe. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fnetworks%2Fpackets%2Fstep-2&code=widget%3A+network%0Amode%3A+packets%0Amessage%3A+MEET+AT+NOON%0Asize%3A+3%0Asizes%3A+on%0Adrop%3A+2%0Anumbers%3A+off%0Atcp%3A+off%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/networks/packets/?full=step-2#step-2)

<!-- Speaker note: Your guess from the start is beside the board. Compare it with what happens. -->

<!-- Speaker note: Teacher: ask what they saw, not why. Push on the sort: did they see the routers sort anything? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The pieces took different routes, so they arrived in a different order, and one was lost at busy router C. With nothing but letters on them, Ali's computer just joined them in the order they came.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fnetworks%2Fpackets%2Fstep-3&code=widget%3A+network%0Amode%3A+packets%0Amessage%3A+MEET+AT+NOON%0Asize%3A+3%0Adrop%3A+2%0Anumbers%3A+off%0Atcp%3A+off%0Aswitches%3A+numbers%2C+tcp%0Atcpname%3A+Ask+again%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/networks/packets/?full=step-3#step-3)

<!-- Speaker note: There is more than one way to get the message there. Find two. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Explain it yourself

**In your own words: how did your first fix get the whole message to Ali, in order, with every link working? Say what each piece carried and what Ali's computer did.**

* Answer: Each piece carried a number as well as its letters. (so Ali's computer knows where each piece goes); Ali's computer put the pieces in order by their numbers. (they took different routes, so they arrived in a different order); It confirmed each piece it got, and saw that number 2 was missing. (a gap in the numbers shows what was lost); Only piece 2 was sent again. (it was the only piece never confirmed)

<!-- Speaker note: Numbers put the pieces in order and show the gap; confirming each piece means only the one never confirmed is sent again. -->

<!-- Speaker note: Teacher: students write before the names. Share two explanations, then name each part. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Give it names

What you invented has names. The pieces are **packets**: each carries a piece of the data, a **number** and the address it is going to. **Routers** are the computers along the way; each one reads a packet's address and passes it on. When Ali's computer confirms a packet, that is an **acknowledgement**. Your Ask again switch was **TCP**: the set of rules that has the receiver acknowledge each packet, so any packet never acknowledged is sent again. Your first fix, step by step:

$$\text{MEE | T·A | T·N | OON}$$

1) $\text{routes differ}$ — Each router passes each packet on. Busy router C is slow.
2) $\text{arrive: } 3, 1, 4$ — Packet 2 was lost at C; the others arrived out of order.
3) $\text{TCP: acknowledge } 1, 3, 4$ — Ali's computer confirms each packet it gets. Packet 2 is never confirmed.
4) $\text{packet 2 sent again}$ — Only the missing packet is resent.
5) $1, 2, 3, 4 \to \text{MEET AT NOON}$ — The numbers put the message back in order.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write MEE | T·A | T·N | OON and say "Split into 4 packets of 3 characters (· is the space). Each gets a number: 1 to 4." Line 1: write routes differ and say "Each router passes each packet on. Busy router C is slow." Line 2: write arrive: 3, 1, 4 and say "Packet 2 was lost at C; the others arrived out of order." Line 3: write TCP: acknowledge 1, 3, 4 and say "Ali's computer confirms each packet it gets. Packet 2 is never confirmed." Line 4: write packet 2 sent again and say "Only the missing packet is resent." Line 5: write 1, 2, 3, 4 MEET AT NOON and say "The numbers put the message back in order." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Give it names

**Match each name to what you did on the board.**

| | |
|---|---|
| `Packet` | A. A computer on the way that passes each piece on |
| `Router` | B. A piece of the message, with its number and where it is going |
| `Acknowledgement` | C. The rules your Ask again switch followed: confirm each piece, send again any that isn't confirmed |
| `TCP` | D. Ali's computer confirming a piece arrived |

* Answer: Packet → B. A piece of the message, with its number and where it is going; Router → A. A computer on the way that passes each piece on; Acknowledgement → D. Ali's computer confirming a piece arrived; TCP → C. The rules your Ask again switch followed: confirm each piece, send again any that isn't confirmed

<!-- Speaker note: Your Numbers and Ask again switches are how TCP works: numbered packets, acknowledged by the receiver, with unacknowledged ones sent again. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two fixes

**Your second fix, cutting off router C, also worked, with no numbers at all. Why does the internet use numbers and resending instead?**

- Cutting links is against the rules of the internet
- Numbered packets travel faster
- Routers can only pass on numbered packets
- Nobody knows ahead of time which router will be busy or which link will break, so every message needs a way to recover

* Answer: Nobody knows ahead of time which router will be busy or which link will break, so every message needs a way to recover

<!-- Speaker note: You could avoid C because you could see it was busy. Real networks change all the time, so the receiver needs a way to fix whatever happens: numbers and acknowledgements. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam explains what happens to a lost packet. Click the line where it first goes wrong.**

```
 1  The message is split into 4 numbered packets.
 2  Packet 2 is lost at a busy router.
 3  So the whole message must be sent again from the start.
 4  That is why a download starts again when one packet is lost.
```

* Answer: line 3

<!-- Speaker note: Line 3: with TCP, the receiver confirms each packet it gets. Only the packet that was never confirmed is sent again, not the whole message. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Elaborate: when the network breaks

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fnetworks%2Fpackets%2Fstep-5&code=widget%3A+network%0Amode%3A+packets%0Amessage%3A+MEET+AT+NOON%0Asize%3A+3%0Adrop%3A+2%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/networks/packets/?full=step-5#step-5)

<!-- Speaker note: What this step is for: The idea in new situations, one change at a time: TCP and spare routes working together when a link breaks, every route broken, then live video, where resending is the wrong choice. -->

<!-- Speaker note: Teacher: ask why a network has spare links, and who would rather have a glitch than a freeze. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Video calls

**A live video call doesn't wait for lost packets: it doesn't use TCP. A packet goes missing during a call. What do you notice?**

- The whole call starts again
- The call freezes until the packet is sent again
- A small glitch, and the call carries on
- Nothing: packets are never lost on calls

* Answer: A small glitch, and the call carries on

<!-- Speaker note: On a live call a late packet is useless, so it is skipped and you see a glitch. For a file or a message, TCP waits for the missing packet, because every piece matters. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A message is split into 5 packets and packet 3 is lost. What does TCP do, and how does the message end up in order?**

* The receiver never confirms packet 3, so the sender sends it again. The receiver puts the packets in order by their numbers.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Who can see your data? (packets pass through routers you don't control). Code links: micro:bit radio sends short packets; Secret messages adds checksums to them. -->
