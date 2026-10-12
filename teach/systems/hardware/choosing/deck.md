---
marp: true
theme: default
html: true
---

# Choose the hardware

Inside a computer · Specs and speed

<!-- Speaker note: Students compare two computers on different jobs, follow four steps to a justified choice, and build the cheapest computer that meets a media-lab brief within a budget (AC9TDI8K01 node 3). About 45 minutes (Predict and Try 7 min · Worked example 10 min · Vary 8 min · Practise 8 min · Make 12 min). Sources: Digital Technologies Hub: Digital systems (hardware specifications; compare specifications in an online store), https://www.digitaltechnologieshub.edu.au/teach-and-assess/classroom-resources/topics/digital-systems/ (checked 12 October 2026). -->

---

## Today

**We are learning to** choosing hardware starts from the job, not the biggest numbers: work out what the job needs most, compare the options on that, weigh the trade-offs, and spend the budget where the bottleneck is.

- I can choose hardware for a job and justify it with specs.
- I can explain a trade-off between two specs (more RAM or a faster processor).
- I can stay within a budget by spending on the bottleneck.

<!-- Speaker note: Before class: Try the boards yourself. The one idea: choose for the job. Scaffold the reasoning with the four steps (what the job needs, compare on that, weigh the trade-offs, justify) on the board all lesson. Prices on the board are made up but in proportion, and the cheapest Make answer is 8 cores at 3.0 GHz, 16 GB RAM and a 1 TB SSD ($780, 53 s); 8 cores at 4.0 GHz is $900 and 41 s. Real prices change; the Digital Technologies Hub suggests comparing specs in an online computer store, which works well as an extension. The same Option A versus B comparison gives different winners for different jobs; that is the point of Vary. Teacher: Try: ask why B's extra RAM did nothing for the export. Teacher: Worked example: model the four steps aloud, then ask where the $60 for RAM went. Teacher: Vary: ask why the game load is a tie. -->

---

## Why it matters

> Two computers cost about the same. One has twice the cores, the other four times the RAM. Which is better?

<!-- Speaker note: There is no best computer, only the best one **for a job**. Choosing hardware means working out what the job needs most, comparing the options on that, and weighing what each choice costs. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**For exporting video, Option A has 8 cores and 8 GB of RAM; Option B has 4 cores and 32 GB of RAM. Both cost about $700. Which exports faster?**

- Neither can export video
- The same: they cost the same
- Option A: the export uses all 8 cores
- Option B: it has four times the RAM

<!-- Speaker note: What happens: Option A: 61 seconds against B's 103. The export needs processor power most; A swaps a little, but its cores matter more. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose B hold Sam's misconception; Try settles it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fhardware%2Fchoosing%2Fstep-2&code=widget%3A+hardware%0Adevice+A%3A+8+3+8+ssd+1024+50+0%0Adevice+B%3A+4+3+32+ssd+1024+50+0%0Adevice%3A+A%0Apick%3A+none%0Ajobs%3A+video%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/hardware/choosing/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Option A: 61 seconds against B's 103. The export needs processor power most; A swaps a little, but its cores matter more.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Video editing, step by step

Now work out A with 16 GB.

$$\text{1. What does the job need?}$$

1) $\text{2. Compare on that}$ — A: 50 s processor + 8 s swapping + 3 s = 61 s. B: 100 s + 3 s = 103 s.
2) $\text{3. Weigh the trade-offs}$ — A is short of RAM (it swaps); B has RAM it can't use but half the cores.
3) $\text{4. Justify}$ — Choose A: the processor is the export's bottleneck. Add RAM to 16 GB if the budget allows: 53 s.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write 1. What does the job need? and say "The export uses up to 8 cores and needs 16 GB of RAM." Line 1: write 2. Compare on that and say "A: 50 s processor + 8 s swapping + 3 s = 61 s. B: 100 s + 3 s = 103 s." Line 2: write 3. Weigh the trade-offs and say "A is short of RAM (it swaps); B has RAM it can't use but half the cores." Line 3: write 4. Justify and say "Choose A: the processor is the export's bottleneck. Add RAM to 16 GB if the budget allows: 53 s." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Video editing, step by step

**Option A with its RAM raised from 8 GB to 16 GB (costs $60 more). How many seconds is the export now?**

* Answer: 53

<!-- Speaker note: Processor 1200 ÷ (8 × 3) = 50 s, storage 3 s, no swapping: 53 s, for $780. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam chooses a computer for video editing. Click the line where it first goes wrong.**

```
 1  Option B has 32 GB of RAM; Option A has 8 GB.
 2  32 is the bigger number.
 3  So Option B is better for every job.
 4  Sam buys Option B for video editing.
```

* Answer: line 3

<!-- Speaker note: Line 3: a bigger number only helps if that part is the job's bottleneck. For exporting video it is the processor, so A is the better choice. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A different job

**Same two options, but the job is keeping 30 browser tabs open. Which is better?**

- The same
- Option B: tabs need RAM, and A has to swap
- Option A: more cores
- Neither

* Answer: Option B: tabs need RAM, and A has to swap

<!-- Speaker note: B: 2 s against A's 6 s. A different job, a different best choice. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change the job



- **Tabs:** 
- **Game:** 
- **Download:** 

[Open this step](https://tutorials.learningwaypoints.com/systems/hardware/choosing/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task keeps the two options and changes one thing, the job, so the best choice changes with it, including jobs where neither option wins. For students who need more support: The four steps as a card with blanks: The job needs ___. Option ___ is better at that. The trade-off is ___. I choose ___ because ___. For early finishers: A school can rent time on a cloud server instead of buying 30 media-lab computers. When would that be the better choice? The hard part, on purpose: The Make has no single obvious answer and the budget pushes back. Let students run, overspend and adjust; the four steps are the scaffold, not the teacher. When students get stuck: A student picks the option with the bigger numbers (Sam's mistake). Ask: Which part is this job's slowest? Fix: Compare the options on that part. / A student is over budget and stuck. Ask: Which parts did you upgrade that aren't on the red bar? Fix: Take the money back from those. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A school laptop

**A Year 8 student's laptop: web browsing, documents and video calls. Where should the money go?**

- A graphics card
- 4 TB of storage
- A 32-core processor
- Enough RAM (about 8–16 GB), an SSD and good Wi-Fi

* Answer: Enough RAM (about 8–16 GB), an SSD and good Wi-Fi

<!-- Speaker note: Tabs need RAM, starting and opening need an SSD, calls need the network. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## AI

**A computer for training AI models. Which one part matters most?**

- A bigger screen
- A graphics card
- A big hard disk
- A faster network

* Answer: A graphics card

<!-- Speaker note: Training is millions of small sums: a graphics card does thousands at once. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A file server

**A school file server where 1,000 students save and open work. Which pair matters most?**

- The fastest single core
- Lots of storage and a fast network
- A graphics card and a big screen
- The smallest, cheapest parts

* Answer: Lots of storage and a fast network

<!-- Speaker note: Everyone's files have to fit, and many people send and fetch them at the same time. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: bottlenecks

**Review: a laptop with a hard disk takes 2 minutes to start up. What is the bottleneck?**

- Network
- Graphics
- Storage size
- Storage speed

* Answer: Storage speed

<!-- Speaker note: Starting up reads programs from storage: an SSD fixes it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: the media lab



- **Build it:** 
- **Justify it:** Then: write one sentence a parent could read: which computer, and why.

[Open this step](https://tutorials.learningwaypoints.com/systems/hardware/choosing/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Building the cheapest computer that meets a brief reverses the process: start from the job, the target and the budget, choose the parts, then justify the choice. Hints, in order: Run the export on the old laptop and find the slowest part. / The export can use up to 8 cores and needs 16 GB of RAM; a hard disk adds a minute. / Spend on the processor first, then RAM, then an SSD; leave the network and graphics card. -->

<!-- Speaker note: Teacher: collect the cheapest working builds on the board and compare the justifications. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Two laptops cost the same. One has more RAM, the other a faster processor. Which would you choose for a student who keeps many tabs open, and why?**

* The one with more RAM: many tabs need working space, and too little RAM swaps to storage. The faster processor wouldn't fix that.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next in Digital systems: Networks (bandwidth and packets) or Security and privacy (Years 9–10). Links: Engineering › Physical computing (choosing a board for a project). -->
