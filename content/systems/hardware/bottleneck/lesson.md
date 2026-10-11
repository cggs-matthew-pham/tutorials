---
order: 2
unit: specs
node: AC9TDI8K01 n2
title: Find the bottleneck
summary: "A job is only as fast as its slowest part, the bottleneck. Run jobs on an old laptop, see how long each part takes, and upgrade the part that matters: more RAM for many tabs, an SSD for loading, a faster network for downloads, a graphics card for AI."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "An old laptop takes a minute and a half to load a game level. You can upgrade one part. Which?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8480
  url: http://127.0.0.1:8480/index.html
  readySelector: ".hwsheet"
  layout: full
explainPicture: { ref: jobs.yml#explain-pic, caption: "Each part's time for a job: the longest bar is the bottleneck." }
explainClip:
  query: { code: "@jobs.yml#explain", fresh: 1, id: explain }
  caption: "Find the bottleneck"
  say: "The old laptop loads a big game level."
  clip:
    - click: Run the job
    - caption: { text: "Storage takes 80 of the 90 seconds: the hard disk is the bottleneck.", say: "The hard disk takes 80 of the 90 seconds. That is the bottleneck." }
    - wait: 1500
    - click: "Storage type: HDD, switch"
    - click: Run the job
    - expect: { selector: "#gsum", contains: "slowest part Processor" }
    - caption: { text: "An SSD: 14 seconds. Now the processor is the slowest part.", say: "With an SSD it takes 14 seconds, and the processor is now the slowest part." }
    - wait: 1500
---
Every job uses several parts. Each part takes some time, and the **slowest part**, the **bottleneck**, decides how long you wait. Upgrade the bottleneck and the job speeds up; upgrade anything else and it barely changes.

## Predict: one upgrade

```step
stage: predict
insight: "Committing to one upgrade for a slow game load tests the new move, find the bottleneck first, before students see the time bars."
check:
  type: predict
  q: "An old laptop (2 cores, 2.0 GHz, 8 GB RAM, 1 TB hard disk) takes 90 seconds to load a game level. Which one upgrade helps most?"
  options: ["Swap the hard disk for an SSD", "A processor twice as fast", "Twice the RAM", "A faster internet connection"]
  actual: "The SSD: the hard disk takes 80 of the 90 seconds. A processor twice as fast saves only 5 seconds."
```

## Try: run three jobs

```step
stage: run
insight: "Running three jobs on the same old laptop settles the prediction and shows the new move: each job has its own slowest part."
try: { playground: board, starter: "jobs.yml#run", height: 640 }
check: { type: board, text: "Run all three jobs on the old laptop. Which part is the slowest for each one?", when: "y >= 3", explain: "Tabs: RAM (it swaps to the hard disk). Game: storage. Download: network. Same laptop, three different bottlenecks." }
```

Was your prediction right? Look at the red bar each time.

## Worked example: where the 90 seconds go

```step
stage: investigate
insight: "Working out each part's time for the game load models the new move: add the times, find the biggest, see what an upgrade of each part saves. Sam upgrades storage size, not speed, the misconception planted after the method."
tasks:
  - check:
      type: answer
      q: "Same old laptop, but with a processor twice as fast (4 GHz) and still the hard disk. How many seconds does the game level take now?"
      answer: "85"
      feedback:
        - ["45", "Only the processor's 10 seconds halves; the hard disk still takes 80."]
        - ["14", "That's with an SSD, not a faster processor."]
        - ["90", "The processor part does get faster: 10 s becomes 5 s."]
      explain: "Processor 40 ÷ (2 × 4) = 5 s, storage still 80 s: 85 s. Upgrading a part that isn't the bottleneck barely helps."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam picks an upgrade. Click the line where it first goes wrong."
      answer: 3
      fault: logic
      misconception: storage-size-is-speed
      explain: "Line 3: size is how much it holds, not how fast it reads. A 2 TB hard disk still reads at hard disk speed; an SSD is about 20 times faster."
  - check:
      type: question
      q: "The tabs job swaps to the hard disk because the RAM is too small. Which upgrade fixes the cause?"
      options: ["More RAM, so nothing needs swapping", "A bigger hard disk", "A faster network", "Closing the laptop lid"]
      answer: 0
      feedback: [null, "Swapping is slow because of the disk's speed, and the cause is too little RAM.", "The tabs are already loaded.", "That stops everything."]
      explain: "With enough RAM, nothing is swapped: the RAM time goes to zero. (An SSD makes swapping faster but doesn't stop it.)"
```

### Loading a game level on the old laptop

```worked
\text{processor} = 40 \div (2 \times 2) = 10\ \text{s} :: Work ÷ (cores it can use × GHz).
\text{storage} = 8000\ \text{MB} \div 100\ \text{MB/s} = 80\ \text{s} :: A hard disk reads about 100 MB a second.
\text{total} = 10 + 80 = 90\ \text{s} :: RAM is big enough (no swapping) and nothing is downloaded.
\text{bottleneck: storage} :: 80 s is the biggest part.
\text{SSD: } 8000 \div 2000 = 4\ \text{s, total } 14\ \text{s} :: Upgrade the bottleneck: 90 s becomes 14 s.
```

Now try a faster processor instead.

### Find the mistake

### Fix the cause

## Vary: one change each

```step
stage: modify
insight: "Each task changes one part for a different job: RAM for tabs, network for a download, a graphics card for AI, then a non-example where a big processor upgrade does almost nothing."
try: { playground: board, starter: "jobs.yml#modify", height: 640 }
tasks:
  - check: { type: board, text: "Switching tabs takes 86 s. Change one part to get it under 5 seconds, then run it.", when: "j = 1 and u = 1 and t < 5", explain: "More RAM: nothing swaps, so the RAM bar disappears. (An SSD only gets it to about 7 s: it makes swapping faster but doesn't stop it.)" }
  - check: { type: board, text: "Now the download. Change one part to get it under 200 seconds.", when: "j = 4 and u = 1 and t < 200", explain: "A faster network. 5 GB is 40,000 megabits: at 50 Mb/s that is 800 s, at 300 Mb/s about 133 s." }
  - check: { type: board, text: "Train the small AI model. Get it under 60 seconds.", when: "j = 5 and u = 1 and t < 60", explain: "A graphics card does thousands of small sums at once. Even 32 cores at 4 GHz would take over 2 minutes." }
  - check: { type: board, text: "Non-example: give the old laptop 32 cores at 4.0 GHz and run the download again. Is it much faster?", when: "j = 4 and u = 1 and k = 32 and g = 40", explain: "Hardly: the processor was never the bottleneck for a download. The network was." }
```

### More tabs

### Download

### AI

### Not the bottleneck

## Practise: name the bottleneck

```step
stage: practise
insight: "Naming the bottleneck in everyday situations is the same move without the board, plus a review of what each spec measures."
tasks:
  - check:
      type: question
      q: "A video call goes blocky and freezes, but the laptop is new and fast. What is the most likely bottleneck?"
      options: ["The network", "The processor", "The storage", "The screen"]
      answer: 0
      feedback: [null, "A new, fast laptop has plenty of processor.", "A call doesn't read much from storage.", "The screen shows what arrives; it doesn't slow it."]
      explain: "Live video needs data to keep arriving: the network is the bottleneck."
  - check:
      type: question
      q: "An old computer with a hard disk takes two minutes to start up. Which upgrade helps most?"
      options: ["An SSD", "A bigger hard disk", "A faster network", "A graphics card"]
      answer: 0
      feedback: [null, "Bigger isn't faster.", "Starting up reads from storage, not the internet.", "Graphics cards don't load programs."]
      explain: "Starting up reads gigabytes of programs from storage: an SSD reads them about 20 times faster."
  - check:
      type: question
      q: "Why do companies train AI models on graphics cards rather than processors?"
      options: ["AI is millions of small, simple sums, and a graphics card does thousands at once", "Graphics cards have more storage", "AI needs a screen", "Processors can't do maths"]
      answer: 0
      feedback: [null, "Storage isn't what speeds training.", "Training doesn't draw anything.", "They can, a few at a time."]
      explain: "Many simple sums at once is exactly what a graphics card is built for."
  - check:
      type: question
      q: "Review: which spec empties when the power goes off?"
      options: ["RAM", "Storage", "Processor speed", "Network"]
      answer: 0
      feedback: [null, "Storage keeps things with the power off.", "Speed isn't something that empties.", "The network doesn't hold your work."]
      explain: "RAM is the working space; storage is what it keeps."
```

### Video call

### Starting up

### AI

### Review: specs

## Make: fix the slow export

```step
stage: make
insight: "Making the video export meet a target with one change reverses the process: start from the time wanted, find the bottleneck, change only that."
try: { playground: board, starter: "jobs.yml#make", height: 640 }
hint: ["Run it first and find the red bar.", "The processor is the bottleneck. Which processor spec can the job use more of?", "The export can use up to 8 cores."]
check: { type: board, text: "This laptop takes 103 s to export the video. Get it under 60 seconds by changing only one spec.", when: "j = 2 and u = 1 and t < 60 and m = 1", explain: "8 cores: the export uses all of them, so the processor time halves to 50 s. Faster GHz alone only gets to 78 s; more RAM or a bigger SSD saves nothing." }
```

Then: what is the bottleneck on your own device when it feels slow?
