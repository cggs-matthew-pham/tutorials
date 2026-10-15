---
marp: true
theme: default
html: true
---

# Find the bottleneck

Inside a computer · Specs and speed

<!-- Speaker note: Students run jobs on an old laptop, see how long each part takes, find each job's bottleneck and upgrade only that part (AC9TDI8K01 node 2). About 40 minutes (Predict and Try 7 min · Worked example 10 min · Vary 12 min · Practise and Make 11 min). Sources: Digital Technologies Hub: Digital systems (hardware specifications), https://www.digitaltechnologieshub.edu.au/teach-and-assess/classroom-resources/topics/digital-systems/ (checked 12 October 2026). -->

---

## Today

**We are learning to** a job is only as fast as its slowest part, the bottleneck. Run jobs on an old laptop, see how long each part takes, and upgrade the part that matters: more RAM for many tabs, an SSD for loading, a faster network for downloads, a graphics card for AI.

- I can explain how a spec affects how fast a job runs.
- I can find the bottleneck for a job.
- I can say which upgrade will help, and why others won't.

<!-- Speaker note: Before class: Try the boards yourself. The one idea: the slowest part decides. This is the hinge for lesson 3: without it, choosing hardware becomes picking the biggest numbers. The model is simplified on purpose and says so: times add up part by part, the work amounts are made up but in proportion, a hard disk reads about 100 MB/s and an SSD about 2000 MB/s, and when RAM is too small the computer swaps to storage. Real computers overlap these steps and use caches, so real timings are messier; the idea that the slowest part dominates holds. Hands-on: open Task Manager (Windows) or Activity Monitor (macOS) while a big download or video export runs, and look at which graph is at the top. Teacher: Try: ask what is different about the three red bars. Teacher: Worked example: before the SSD line, ask which part an upgrade should target. Teacher: Vary: after task 4, ask why 32 cores didn't help. -->

---

## Why it matters

> An old laptop takes a minute and a half to load a game level. You can upgrade one part. Which?

<!-- Speaker note: Every job uses several parts. Each part takes some time, and the **slowest part**, the **bottleneck**, decides how long you wait. Upgrade the bottleneck and the job speeds up; upgrade anything else and it barely changes. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**An old laptop (2 cores, 2.0 GHz, 8 GB RAM, 1 TB hard disk) takes 90 seconds to load a game level. Which one upgrade helps most?**

- A processor twice as fast
- A faster internet connection
- Twice the RAM
- Swap the hard disk for an SSD

<!-- Speaker note: What happens: The SSD: the hard disk takes 80 of the 90 seconds. A processor twice as fast saves only 5 seconds. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose the processor will meet the 85 s answer in the worked example. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fhardware%2Fbottleneck%2Fstep-2&code=widget%3A+hardware%0Adevice%3A+old%0Apick%3A+none%0Ajobs%3A+tabs%2C+game%2C+download%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/hardware/bottleneck/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Look at the red bar each time. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The SSD: the hard disk takes 80 of the 90 seconds. A processor twice as fast saves only 5 seconds.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Loading a game level on the old laptop

Now try a faster processor instead.

$$\text{processor} = 40 \div (2 \times 2) = 10\ \text{s}$$

1) $\text{storage} = 8000\ \text{MB} \div 100\ \text{MB/s} = 80\ \text{s}$ — A hard disk reads about 100 MB a second.
2) $\text{total} = 10 + 80 = 90\ \text{s}$ — RAM is big enough (no swapping) and nothing is downloaded.
3) $\text{bottleneck: storage}$ — 80 s is the biggest part.
4) $\text{SSD: } 8000 \div 2000 = 4\ \text{s, total } 14\ \text{s}$ — Upgrade the bottleneck: 90 s becomes 14 s.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write processor = 40 ÷ (2 × 2) = 10s and say "Work ÷ (cores it can use × GHz)." Line 1: write storage = 8000MB ÷ 100MB/s = 80s and say "A hard disk reads about 100 MB a second." Line 2: write total = 10 + 80 = 90s and say "RAM is big enough (no swapping) and nothing is downloaded." Line 3: write bottleneck: storage and say "80 s is the biggest part." Line 4: write SSD: 8000 ÷ 2000 = 4s, total 14s and say "Upgrade the bottleneck: 90 s becomes 14 s." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Loading a game level on the old laptop

**Same old laptop, but with a processor twice as fast (4 GHz) and still the hard disk. How many seconds does the game level take now?**

* Answer: 85

<!-- Speaker note: Processor 40 ÷ (2 × 4) = 5 s, storage still 80 s: 85 s. Upgrading a part that isn't the bottleneck barely helps. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam picks an upgrade. Click the line where it first goes wrong.**

```
 1  The old laptop takes 90 seconds to load a game level.
 2  The storage takes 80 of those seconds: it is the bottleneck.
 3  A 2 TB hard disk is bigger than the 1 TB one, so it will load faster.
 4  So Sam buys the 2 TB hard disk.
```

* Answer: line 3

<!-- Speaker note: Line 3: size is how much it holds, not how fast it reads. A 2 TB hard disk still reads at hard disk speed; an SSD is about 20 times faster. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Fix the cause

**The tabs job swaps to the hard disk because the RAM is too small. Which upgrade fixes the cause?**

- A bigger hard disk
- More RAM, so nothing needs swapping
- A faster network
- Closing the laptop lid

* Answer: More RAM, so nothing needs swapping

<!-- Speaker note: With enough RAM, nothing is swapped: the RAM time goes to zero. (An SSD makes swapping faster but doesn't stop it.) -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: one change each



- **More tabs:** 
- **Download:** 
- **AI:** 
- **Not the bottleneck:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/hardware/bottleneck/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one part for a different job: RAM for tabs, network for a download, a graphics card for AI, then a non-example where a big processor upgrade does almost nothing. For students who need more support: A three-step card: run it, find the longest bar, change only that part. For early finishers: After you fix one bottleneck, another part becomes the slowest. Fix the game load until the processor is the bottleneck, then keep going: when does it stop being worth it? The hard part, on purpose: Students reach for "a faster processor" for everything. Let them try it on the download (Vary task 4) and see almost nothing change, rather than telling them. When students get stuck: A student buys a bigger hard disk to speed it up (Sam's mistake). Ask: Does a bigger pantry make the chef walk faster? Fix: Size is how much; SSD versus HDD is how fast. / A student upgrades everything. Ask: Which bar got shorter, and which ones didn't change? Fix: Only the bottleneck's upgrade made a real difference. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Video call

**A video call goes blocky and freezes, but the laptop is new and fast. What is the most likely bottleneck?**

- The screen
- The network
- The storage
- The processor

* Answer: The network

<!-- Speaker note: Live video needs data to keep arriving: the network is the bottleneck. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Starting up

**An old computer with a hard disk takes two minutes to start up. Which upgrade helps most?**

- An SSD
- A bigger hard disk
- A graphics card
- A faster network

* Answer: An SSD

<!-- Speaker note: Starting up reads gigabytes of programs from storage: an SSD reads them about 20 times faster. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## AI

**Why do companies train AI models on graphics cards rather than processors?**

- Processors can't do maths
- Graphics cards have more storage
- AI is millions of small, simple sums, and a graphics card does thousands at once
- AI needs a screen

* Answer: AI is millions of small, simple sums, and a graphics card does thousands at once

<!-- Speaker note: Many simple sums at once is exactly what a graphics card is built for. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: specs

**Review: which spec empties when the power goes off?**

- RAM
- Processor speed
- Storage
- Network

* Answer: RAM

<!-- Speaker note: RAM is the working space; storage is what it keeps. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: fix the slow export

Then: what is the bottleneck on your own device when it feels slow?

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/hardware/bottleneck/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Making the video export meet a target with one change reverses the process: start from the time wanted, find the bottleneck, change only that. Hints, in order: Run it first and find the red bar. / The processor is the bottleneck. Which processor spec can the job use more of? / The export can use up to 8 cores. -->

<!-- Speaker note: Teacher: ask who used 16 cores and whether that was better than 8 (the export can only use 8). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A laptop with 8 GB of RAM gets slow with many tabs open. Name the bottleneck and the best upgrade, and say why a faster processor won't fix it.**

* RAM is the bottleneck: it runs out and swaps to storage. More RAM stops the swapping. A faster processor only speeds the part that wasn't slow.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Choose the hardware (a job, a budget and trade-offs). Links: Networks (bandwidth versus latency: a video call needs both). -->
