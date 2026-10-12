---
marp: true
theme: default
html: true
---

# Everyone in the group hears

Secret messages · Messages in the air

<!-- Speaker note: Students learn that a radio group is a shared channel, so plain-text radio messages are public to everyone in the group. About 40 minutes (Predict and Run 8 min · Investigate 10 min · Modify 8 min · Make 12 min). -->

---

## Today

**We are learning to** a radio group is a channel, not a lock. Every micro:bit in the group hears every message, so anything sent in plain text is public to the group.

- I can say who hears a message sent by radio.
- I can explain why a group number does not make a message private.
- I can send and receive a text message by radio.

<!-- Speaker note: Before class: **The idea:** radio goes to everyone. A **radio group** is a channel number; it decides who is listening, not who is allowed to listen. Anything sent in plain text can be read by any micro:bit set to that group. **Why start here:** the whole course answers one question: if everyone in the group hears everything, how do we keep a message private, know it was not changed, and know who sent it? Students should leave this lesson feeling that question is real. **Hardware:** the course works in the simulator throughout. Real micro:bits make it better: **give every pair its own group** and write the numbers on the board. -->

---

## Why it matters

> A school bus radio, a walkie-talkie, a baby monitor: if your radio is on the same channel, you hear it. That is how radio works, and it is why secret messages need more than a channel number.

<!-- Speaker note: Radio is how micro:bits talk without a cable. Each one is set to a **radio group** (a number from 0 to 255). A micro:bit sends to **every other micro:bit in its group** and to nobody outside it. This course is about a question that follows: if a message goes out to everyone in the group, how can any of it be private? You will build the answers: secret codes, a way to share a key, a way to spot a changed message, and a way to prove who sent it. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:309](https://tutorials.learningwaypoints.com/_pictures/makecode/code/14516c587b83.png?v=875754a843dfc39e)

**Four micro:bits are switched on: three in group 5 and one in group 6. A is pressed on one micro:bit in group 5. How many micro:bits show MEET AT 3?**

- 0
- 2
- 3
- 4

<!-- Speaker note: What happens: 2. The message reaches the other two micro:bits in group 5. The sender does not hear itself, and group 6 is a different channel. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most say 3 or 4. Ask: does the sender hear itself? Is group 6 listening? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 2. The message reaches the other two micro:bits in group 5. The sender does not hear itself, and group 6 is a different channel.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/microbit-security/radio-public/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/microbit-security/radio-public/?full=step-2#step-2)

<!-- Speaker note: The simulator runs the program on two micro:bits. Press **A** on one and watch the other. Students should be able to say: I pressed A on one simulated micro:bit and saw the message arrive on the other. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:309](https://tutorials.learningwaypoints.com/_pictures/makecode/code/14516c587b83.png?v=875754a843dfc39e)

<!-- Speaker note: What this step is for: A group number picks a channel. It does not hide anything: every micro:bit set to that group hears every message, in plain text. -->

<!-- Speaker note: Teacher: Mia's 'secret' group is the key misconception. Ask what a stranger would have to do to hear it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The group number

**Mia says: 'Group 99 keeps our messages private, because nobody knows the number.' Is she right?**

- No, but only because the sender hears it too
- No: any micro:bit set to group 99 hears everything, and there are only 256 groups to try
- Yes, nobody can guess 99
- Yes, as long as the message is short

* Answer: No: any micro:bit set to group 99 hears everything, and there are only 256 groups to try

<!-- Speaker note: A group is like a radio station number. Anyone who tunes to it hears everything on it, and with only 256 groups, finding the busy one is quick. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The blocks

**Match each block with what it does.**

| | |
|---|---|
| `radio set group 5` | A. send text to every micro:bit in the group |
| `radio send string` | B. run when text arrives from another micro:bit |
| `on radio received string` | C. choose the channel to talk on |

* Answer: radio set group 5 → C. choose the channel to talk on; radio send string → A. send text to every micro:bit in the group; on radio received string → B. run when text arrives from another micro:bit

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Who hears it

**Who hears a message sent from a micro:bit in group 5?**

Groups: Hears it · Does not hear it

Another micro:bit in group 5, across the room · A micro:bit in group 6 · A micro:bit in group 5 in the next classroom · The micro:bit that sent it

* Answer: Another micro:bit in group 5, across the room → Hears it; A micro:bit in group 6 → Does not hear it; A micro:bit in group 5 in the next classroom → Hears it; The micro:bit that sent it → Does not hear it

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Make **B** send a second message of your own. Every micro:bit in the group would read it.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit-security/radio-public/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Adding a message is easy; so is anyone's reading it. Nothing in the program hides the text. Hints, in order: Copy the A block, change it to Button B and change the text. For students who need more support: Give the doorbell with the receiving part complete. For early finishers: Add a third micro:bit in the same group and see that both hear A's message. The hard part, on purpose: A group number is a channel, not a lock. Ask who else can hear the message before they assume it is private. When students get stuck: Nothing arrives. Ask: Are both micro:bits in the same group? Is the other one running the program? Fix: Use the same radio set group number on both. / Messages from other pairs appear. Ask: Which group number are you using? Fix: Pick your own number and download again. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a **doorbell**. Pressing **A** on one micro:bit sends **RING**; the other shows an icon and plays a tone. You will meet this doorbell again: by the end of the course it will be a lock that is hard to fool.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit-security/radio-public/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: Pressing A sends the word RING. / On radio received string: if the text is RING, show an icon and play a tone. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does a radio group number not make a message private?**

* Every micro:bit set to that group hears every message in it, so the text is public to the group.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: hide the message from anyone who is listening, starting with a simple scrambling method. -->
