---
order: 3
unit: specs
node: AC9TDI8K01 n3
title: Choose the hardware
summary: "Choosing hardware starts from the job, not the biggest numbers: work out what the job needs most, compare the options on that, weigh the trade-offs, and spend the budget where the bottleneck is."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Two computers cost about the same. One has twice the cores, the other four times the RAM. Which is better?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8481
  url: http://127.0.0.1:8481/index.html
  readySelector: ".hwsheet"
  layout: full
explainPicture: { ref: choose.yml#explain-pic, caption: "Two options for video editing: compare them on the job, not on the biggest numbers." }
explainClip:
  query: { code: "@choose.yml#explain", fresh: 1, id: explain }
  caption: "Choosing for the job"
  say: "Two options for exporting video."
  clip:
    - click: Run the job
    - caption: { text: "Option A, 8 cores: 61 seconds, even though it swaps a little.", say: "Option A, with 8 cores, takes 61 seconds." }
    - wait: 1200
    - click: Option B
    - click: Run the job
    - caption: { text: "Option B, 32 GB of RAM but 4 cores: 103 seconds.", say: "Option B has more RAM but half the cores: 103 seconds." }
    - wait: 1200
    - click: Option A
    - click: "RAM: more"
    - click: Run the job
    - expect: { selector: "#gsum", contains: "53 s" }
    - caption: { text: "A with 16 GB: 53 seconds. Spend on what the job needs.", say: "Option A with 16 gigabytes: 53 seconds. Spend the money where the job needs it." }
    - wait: 1500
---
There is no best computer, only the best one **for a job**. Choosing hardware means working out what the job needs most, comparing the options on that, and weighing what each choice costs.

## Predict: A or B?

```step
stage: predict
insight: "Committing to an option for video editing tests the new move, choose by the job's bottleneck, before students run both."
check:
  type: predict
  q: "For exporting video, Option A has 8 cores and 8 GB of RAM; Option B has 4 cores and 32 GB of RAM. Both cost about $700. Which exports faster?"
  options: ["Option A: the export uses all 8 cores", "Option B: it has four times the RAM", "The same: they cost the same", "Neither can export video"]
  actual: "Option A: 61 seconds against B's 103. The export needs processor power most; A swaps a little, but its cores matter more."
```

## Try: run both

```step
stage: run
insight: "Running the export on both options settles the prediction: the job's bottleneck, not the biggest number, decides."
try: { playground: board, starter: "choose.yml#run", height: 640 }
check: { type: board, text: "Run the export on Option A and on Option B. Which is faster, and what is each one's slowest part?", when: "w >= 2", explain: "A: 61 s, slowest part the processor (plus a little swapping). B: 103 s, the processor: 32 GB of RAM doesn't help when 16 GB is enough." }
```

Was your prediction right?

## Worked example: four steps to a choice

```step
stage: investigate
insight: "Following the four steps (what the job needs, compare on that, weigh the trade-offs, justify) models the new move. Sam picks the biggest number, the misconception planted after the method."
tasks:
  - check:
      type: answer
      q: "Option A with its RAM raised from 8 GB to 16 GB (costs $60 more). How many seconds is the export now?"
      answer: "53"
      feedback:
        - ["61", "With 16 GB nothing swaps, so the 8 s of swapping goes."]
        - ["25", "Only the swapping goes; the processor still takes 50 s."]
      explain: "Processor 1200 ÷ (8 × 3) = 50 s, storage 3 s, no swapping: 53 s, for $780."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam chooses a computer for video editing. Click the line where it first goes wrong."
      answer: 3
      fault: logic
      misconception: biggest-spec-best
      explain: "Line 3: a bigger number only helps if that part is the job's bottleneck. For exporting video it is the processor, so A is the better choice."
  - check:
      type: question
      q: "Same two options, but the job is keeping 30 browser tabs open. Which is better?"
      options: ["Option B: tabs need RAM, and A has to swap", "Option A: more cores", "The same", "Neither"]
      answer: 0
      feedback: [null, "Tabs only use 2 cores at a time.", "A swaps to storage; B doesn't.", "Both can; one is faster."]
      explain: "B: 2 s against A's 6 s. A different job, a different best choice."
```

### Video editing, step by step

```worked
\text{1. What does the job need?} :: The export uses up to 8 cores and needs 16 GB of RAM.
\text{2. Compare on that} :: A: 50 s processor + 8 s swapping + 3 s = 61 s. B: 100 s + 3 s = 103 s.
\text{3. Weigh the trade-offs} :: A is short of RAM (it swaps); B has RAM it can't use but half the cores.
\text{4. Justify} :: Choose A: the processor is the export's bottleneck. Add RAM to 16 GB if the budget allows: 53 s.
```

Now work out A with 16 GB.

### Find the mistake

### A different job

## Vary: change the job

```step
stage: modify
insight: "Each task keeps the two options and changes one thing, the job, so the best choice changes with it, including jobs where neither option wins."
try: { playground: board, starter: "choose.yml#modify", height: 640 }
tasks:
  - check:
      type: question
      q: "Run the tabs job on both. Which option wins?"
      options: ["Option B", "Option A", "They tie"]
      answer: 0
      feedback: [null, "Look at A's RAM bar.", "Look at A's RAM bar."]
      explain: "B: no swapping. For lots of tabs, RAM matters most."
  - check:
      type: question
      q: "Run the game load on both. Which option wins?"
      options: ["They tie: both have the same SSD, which is the bottleneck", "Option A", "Option B"]
      answer: 0
      feedback: [null, "More cores don't help here.", "More RAM doesn't help here."]
      explain: "Both 7.3 s. When the bottleneck is a part they share, their differences don't matter."
  - check:
      type: question
      q: "Run the download on both. What would actually help?"
      options: ["A faster network, on either option", "Option A's extra cores", "Option B's extra RAM", "A bigger SSD"]
      answer: 0
      feedback: [null, "The processor takes under 2 s.", "RAM isn't used up.", "The SSD takes 2.5 s."]
      explain: "Both take about 800 s at 50 Mb/s: the network is the bottleneck."
```

### Tabs

### Game

### Download

## Practise: choose for the job

```step
stage: practise
insight: "Choosing for described jobs without the board is the same move in mixed forms, plus a review of finding the bottleneck."
tasks:
  - check:
      type: question
      q: "A Year 8 student's laptop: web browsing, documents and video calls. Where should the money go?"
      options: ["Enough RAM (about 8–16 GB), an SSD and good Wi-Fi", "A 32-core processor", "A graphics card", "4 TB of storage"]
      answer: 0
      feedback: [null, "Browsing and calls use only a few cores.", "Only games and AI need one.", "School files fit easily on far less."]
      explain: "Tabs need RAM, starting and opening need an SSD, calls need the network."
  - check:
      type: question
      q: "A computer for training AI models. Which one part matters most?"
      options: ["A graphics card", "A big hard disk", "A faster network", "A bigger screen"]
      answer: 0
      feedback: [null, "Storage size doesn't speed up training.", "Training happens on the computer, not over the network.", "The screen does nothing for training."]
      explain: "Training is millions of small sums: a graphics card does thousands at once."
  - check:
      type: question
      q: "A school file server where 1,000 students save and open work. Which pair matters most?"
      options: ["Lots of storage and a fast network", "A graphics card and a big screen", "The fastest single core", "The smallest, cheapest parts"]
      answer: 0
      feedback: [null, "Nobody sits at a file server.", "Many people at once matters more than one fast core.", "It needs room for 1,000 people's files."]
      explain: "Everyone's files have to fit, and many people send and fetch them at the same time."
  - check:
      type: question
      q: "Review: a laptop with a hard disk takes 2 minutes to start up. What is the bottleneck?"
      options: ["Storage speed", "Storage size", "Network", "Graphics"]
      answer: 0
      feedback: [null, "Size is how much it holds, not how fast.", "Starting up reads from the laptop itself.", "Starting up doesn't train or draw much."]
      explain: "Starting up reads programs from storage: an SSD fixes it."
```

### A school laptop

### AI

### A file server

### Review: bottlenecks

## Make: the media lab

```step
stage: make
insight: "Building the cheapest computer that meets a brief reverses the process: start from the job, the target and the budget, choose the parts, then justify the choice."
try: { playground: board, starter: "choose.yml#make", height: 640 }
hint: ["Run the export on the old laptop and find the slowest part.", "The export can use up to 8 cores and needs 16 GB of RAM; a hard disk adds a minute.", "Spend on the processor first, then RAM, then an SSD; leave the network and graphics card."]
tasks:
  - check: { type: board, text: "The school media lab needs computers that export the video in under 60 seconds, hold at least 1 TB of footage, and cost no more than $900. Build one from the old laptop and run the export.", when: "j = 2 and u = 1 and t < 60 and z >= 1024 and c <= 900", explain: "For example 8 cores at 3.0 GHz, 16 GB of RAM and a 1 TB SSD: 53 s for $780. Each dollar went to the job's bottleneck." }
  - check: { type: reflect, text: "I can justify my choice: what the job needed most, and what I left out to stay in budget." }
```

### Build it

### Justify it

Then: write one sentence a parent could read: which computer, and why.
