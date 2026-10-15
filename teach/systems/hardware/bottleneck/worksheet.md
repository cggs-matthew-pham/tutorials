---
title: "Find the bottleneck"
subtitle: "Inside a computer · Specs and speed · Lesson 2"
---

# Find the bottleneck

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** An old laptop takes a minute and a half to load a game level. You can upgrade one part. Which?


:::teacher-note

**In one sentence:** Students run jobs on an old laptop, see how long each part takes, find each job's bottleneck and upgrade only that part (AC9TDI8K01 node 2).

**Students should be able to say:** I can explain how a spec affects how fast a job runs. I can find the bottleneck for a job. I can say which upgrade will help, and why others won't.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**An old laptop (2 cores, 2.0 GHz, 8 GB RAM, 1 TB hard disk) takes 90 seconds to load a game level. Which one upgrade helps most?**

☐ A processor twice as fast

☐ A faster internet connection

☐ Twice the RAM

☐ Swap the hard disk for an SSD

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The SSD: the hard disk takes 80 of the 90 seconds. A processor twice as fast saves only 5 seconds.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: where the 90 seconds go


:::keep-together

### Loading a game level on the old laptop

1. $\text{processor} = 40 \div (2 \times 2) = 10\ \text{s}$ — Work ÷ (cores it can use × GHz).
2. $\text{storage} = 8000\ \text{MB} \div 100\ \text{MB/s} = 80\ \text{s}$ — A hard disk reads about 100 MB a second.
3. $\text{total} = 10 + 80 = 90\ \text{s}$ — RAM is big enough (no swapping) and nothing is downloaded.
4. $\text{bottleneck: storage}$ — 80 s is the biggest part.
5. $\text{SSD: } 8000 \div 2000 = 4\ \text{s, total } 14\ \text{s}$ — Upgrade the bottleneck: 90 s becomes 14 s.

Now try a faster processor instead.

**Same old laptop, but with a processor twice as fast (4 GHz) and still the hard disk. How many seconds does the game level take now?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 85

Processor 40 ÷ (2 × 4) = 5 s, storage still 80 s: 85 s. Upgrading a part that isn't the bottleneck barely helps.

:::


:::keep-together

### Find the mistake

**Sam picks an upgrade. Click the line where it first goes wrong.**

```
 1  The old laptop takes 90 seconds to load a game level.
 2  The storage takes 80 of those seconds: it is the bottleneck.
 3  A 2 TB hard disk is bigger than the 1 TB one, so it will load faster.
 4  So Sam buys the 2 TB hard disk.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: size is how much it holds, not how fast it reads. A 2 TB hard disk still reads at hard disk speed; an SSD is about 20 times faster.

:::


:::keep-together

### Fix the cause

**The tabs job swaps to the hard disk because the RAM is too small. Which upgrade fixes the cause?**

☐ A bigger hard disk

☐ More RAM, so nothing needs swapping

☐ A faster network

☐ Closing the laptop lid

:::


:::teacher-note

**Answer:** More RAM, so nothing needs swapping

With enough RAM, nothing is swapped: the RAM time goes to zero. (An SSD makes swapping faster but doesn't stop it.)

:::


:::typical

## Vary: one change each


**More tabs.** 

**Download.** 

**AI.** 

**Not the bottleneck.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Name the bottleneck


:::keep-together

### Video call

**A video call goes blocky and freezes, but the laptop is new and fast. What is the most likely bottleneck?**

☐ The screen

☐ The network

☐ The storage

☐ The processor

:::


:::teacher-note

**Answer:** The network

Live video needs data to keep arriving: the network is the bottleneck.

:::


:::keep-together

### Starting up

**An old computer with a hard disk takes two minutes to start up. Which upgrade helps most?**

☐ An SSD

☐ A bigger hard disk

☐ A graphics card

☐ A faster network

:::


:::teacher-note

**Answer:** An SSD

Starting up reads gigabytes of programs from storage: an SSD reads them about 20 times faster.

:::


:::keep-together

### AI

**Why do companies train AI models on graphics cards rather than processors?**

☐ Processors can't do maths

☐ Graphics cards have more storage

☐ AI is millions of small, simple sums, and a graphics card does thousands at once

☐ AI needs a screen

:::


:::teacher-note

**Answer:** AI is millions of small, simple sums, and a graphics card does thousands at once

Many simple sums at once is exactly what a graphics card is built for.

:::


:::keep-together

### Review: specs

**Review: which spec empties when the power goes off?**

☐ RAM

☐ Processor speed

☐ Storage

☐ Network

:::


:::teacher-note

**Answer:** RAM

RAM is the working space; storage is what it keeps.

:::


## Make: fix the slow export

Then: what is the bottleneck on your own device when it feels slow?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**A laptop with 8 GB of RAM gets slow with many tabs open. Name the bottleneck and the best upgrade, and say why a faster processor won't fix it.**

{{lines-3}}

:::


:::teacher-note

**Answer:** RAM is the bottleneck: it runs out and swaps to storage. More RAM stops the swapping. A faster processor only speeds the part that wasn't slow.

:::

