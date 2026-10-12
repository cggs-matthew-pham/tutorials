---
title: "Remembering a bit"
subtitle: "From gates to a processor · A machine that remembers · Lesson 3"
---

# Remembering a bit

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A gate's output changes the moment its inputs change. So how does a computer remember anything?


:::teacher-note

**In one sentence:** Students set and reset a latch made of two NOR gates, see it keep its bit with both switches off, and store a number in a 4-bit register of latches (AC9TDI8K04 node 3, extended; the kit names adder circuits as going further).

**Students should be able to say:** I can explain how a latch remembers a bit. I can say what Set and Reset do, and what happens with both off. I can store a number in a register and explain why it stays.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**A latch has a Set switch and a Reset switch. Turn Set on: Q becomes 1. Now turn Set off again. What is Q?**

☐ It flickers between 0 and 1

☐ 0: nothing is switched on

☐ Still 1: it remembers

☐ It depends on the time

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Still 1. Each gate's output keeps the other gate in the state that holds Q at 1, until Reset changes it.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: the latch's rules


:::keep-together

### Four settings

1. $S = 1, R = 0 \Rightarrow Q = 1$ — Set: the bottom NOR's output goes to 0, which lets the top one make Q = 1.
2. $S = 0, R = 0 \Rightarrow Q \text{ stays}$ — Both off: each gate's output holds the other where it is. This is the memory.
3. $S = 0, R = 1 \Rightarrow Q = 0$ — Reset: the top NOR's output goes to 0.
4. $S = 1, R = 1$ — Not allowed: Q and not Q both become 0, which makes no sense for one bit.

Now try Reset.

**Q is 1. Reset goes on, then off again. What is Q now?**

☐ 0

☐ 1

:::


:::teacher-note

**Answer:** 0

Reset sets Q to 0; letting go keeps it at 0.

:::


:::keep-together

### Find the mistake

**Sam explains the latch. Click the line where it first goes wrong.**

```
 1  Set goes on, so Q becomes 1.
 2  Set goes off again, so Q goes back to 0, like a lamp.
 3  So the latch only shows 1 while Set is held on.
 4  That means gates can't remember anything.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Line 2: a latch is not a lamp. With Set and Reset both off, Q keeps the 1: that is memory.

:::


:::keep-together

### Why RAM forgets

**Why does RAM lose everything when the power goes off?**

☐ Its bits are held by circuits like latches, which need power to keep feeding each other

☐ Power cuts damage it

☐ The processor deletes it

☐ It copies everything to storage first

:::


:::teacher-note

**Answer:** Its bits are held by circuits like latches, which need power to keep feeding each other

No power, no loop, no bit. Storage keeps data a different way (magnetism or trapped charge).

:::


:::typical

## Vary: latches and a register


**Reset.** 

**Both on.** 

**Store a number.** 

**Keep it.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Memory


:::keep-together

### Register size

**A register is 8 latches side by side. What is the biggest number it can hold?**

☐ 8

☐ 128

☐ 255

☐ 256

:::


:::teacher-note

**Answer:** 255

8 bits: 0 to 255.

:::


:::keep-together

### RAM in bits

**A computer has 8 GB of RAM. About how many bits is that?**

☐ About 64 billion

☐ About 8 million

☐ About 8 billion

☐ About 8

:::


:::teacher-note

**Answer:** About 64 billion

8 billion bytes × 8 bits = about 64 billion bits, each held by a tiny circuit.

:::


:::keep-together

### Review: RAM and storage

**Review: which part keeps your files when the computer is switched off?**

☐ Storage

☐ RAM

☐ The processor's registers

☐ The clock

:::


:::teacher-note

**Answer:** Storage

Storage (SSD or hard disk) keeps data without power.

:::


## Make: hold a number

Then: what would you need to store 16 bits?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Set goes on then off, then Reset goes on then off. What is Q after each step, and why does the latch count as memory?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 1, 1, 0, 0. With both switches off it keeps its last value, so its output depends on what happened before.

:::

