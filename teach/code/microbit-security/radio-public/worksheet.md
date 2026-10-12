---
title: "Everyone in the group hears"
subtitle: "Secret messages · Messages in the air · Lesson 1"
---

# Everyone in the group hears

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A school bus radio, a walkie-talkie, a baby monitor: if your radio is on the same channel, you hear it. That is how radio works, and it is why secret messages need more than a channel number.


:::teacher-note

**In one sentence:** Students learn that a radio group is a shared channel, so plain-text radio messages are public to everyone in the group.

**Students should be able to say:** I can say who hears a message sent by radio. I can explain why a group number does not make a message private. I can send and receive a text message by radio.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/14516c587b83.png?v=875754a843dfc39e)

:::keep-together

**Four micro:bits are switched on: three in group 5 and one in group 6. A is pressed on one micro:bit in group 5. How many micro:bits show MEET AT 3?**

☐ 0

☐ 2

☐ 3

☐ 4

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 2. The message reaches the other two micro:bits in group 5. The sender does not hear itself, and group 6 is a different channel.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/14516c587b83.png?v=875754a843dfc39e)

:::keep-together

### The group number

**Mia says: 'Group 99 keeps our messages private, because nobody knows the number.' Is she right?**

☐ No, but only because the sender hears it too

☐ No: any micro:bit set to group 99 hears everything, and there are only 256 groups to try

☐ Yes, nobody can guess 99

☐ Yes, as long as the message is short

:::


:::teacher-note

**Answer:** No: any micro:bit set to group 99 hears everything, and there are only 256 groups to try

A group is like a radio station number. Anyone who tunes to it hears everything on it, and with only 256 groups, finding the busy one is quick.

:::


:::keep-together

### The blocks

**Match each block with what it does.**

A. send text to every micro:bit in the group

B. run when text arrives from another micro:bit

C. choose the channel to talk on

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `radio set group 5` | |
| `radio send string` | |
| `on radio received string` | |

:::


:::teacher-note

**Answer:** radio set group 5 → C. choose the channel to talk on; radio send string → A. send text to every micro:bit in the group; on radio received string → B. run when text arrives from another micro:bit

:::


:::keep-together

### Who hears it

**Who hears a message sent from a micro:bit in group 5?**

Groups: Hears it, Does not hear it

- Another micro:bit in group 5, across the room: {{field-15}}
- A micro:bit in group 6: {{field-15}}
- A micro:bit in group 5 in the next classroom: {{field-15}}
- The micro:bit that sent it: {{field-15}}

:::


:::teacher-note

**Answer:** Another micro:bit in group 5, across the room → Hears it; A micro:bit in group 6 → Does not hear it; A micro:bit in group 5 in the next classroom → Hears it; The micro:bit that sent it → Does not hear it

:::


:::typical

## Modify

Make **B** send a second message of your own. Every micro:bit in the group would read it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/6c988be9a4ff.png?v=296344ab725aa5cb)

:::

:::


## Make

Make a **doorbell**. Pressing **A** on one micro:bit sends **RING**; the other shows an icon and plays a tone. You will meet this doorbell again: by the end of the course it will be a lock that is hard to fool.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/8571541411d2.png?v=dc0c6816959cbbbc)

:::


## Exit ticket

:::keep-together

**Why does a radio group number not make a message private?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Every micro:bit set to that group hears every message in it, so the text is public to the group.

:::

