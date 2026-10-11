---
order: 1
unit: specs
node: AC9TDI8K01 n1
introduces: [hardware-specs]
title: What the specs mean
summary: "A spec sheet lists a computer's parts and how much of each it has: processor cores and speed, RAM, storage size and type, network bandwidth and graphics. Each one measures something different, on a phone, a laptop or a server."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Your phone has \"256 GB\" and \"8 GB\" on its box. Which one decides how many apps stay open?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8479
  url: http://127.0.0.1:8479/index.html
  readySelector: ".hwsheet"
  layout: full
explainPicture: { ref: specs.yml#explain-pic, caption: "A spec sheet: processor, RAM, storage, network and graphics, for a phone, a laptop or a server." }
explainClip:
  query: { code: "@specs.yml#explain", fresh: 1, id: explain }
  caption: "What each spec measures"
  say: "A spec sheet lists how much of each part a computer has."
  clip:
    - click: "What does Processor measure?"
    - caption: { text: "Processor: how fast (GHz) and how many things at once (cores).", say: "The processor is the chefs: how fast, and how many." }
    - wait: 1200
    - click: "What does Memory (RAM) measure?"
    - caption: { text: "RAM: how much it can work on at once.", say: "RAM is the bench: what it is working on right now." }
    - wait: 1200
    - click: "What does Storage measure?"
    - expect: { selector: ".hwmeans", contains: "How fast it works" }
    - caption: { text: "Storage: how much it keeps with the power off, and how fast it reads it.", say: "Storage is the pantry: how much it keeps, and how far away." }
    - wait: 1500
---
Every computer, from a phone to a server, has the same main parts. A **spec sheet** (specifications) says how much of each one it has. Each spec measures something different.

## Predict: which spec?

```step
stage: predict
insight: "Committing to which spec decides how many apps stay open tests the new move, what each spec measures, before students read the sheet."
check:
  type: predict
  q: "A laptop slows down when you have 40 browser tabs open. Which spec is most about how much it can work on at the same time?"
  options: ["RAM (GB)", "Storage size (GB)", "Processor speed (GHz)", "Network (Mb/s)"]
  actual: "RAM: it holds everything the computer is working on right now. Storage is what it keeps; the processor is how fast it works."
```

## Try: read the spec sheet

```step
stage: run
insight: "Opening what each row measures settles the prediction: RAM is the working space, not storage or speed."
try: { playground: board, starter: "specs.yml#run", height: 600 }
check: { type: board, text: "Press \"What does it measure?\" on all five rows. Which one is about how much it can work on at once?", when: "p = 5", explain: "RAM. Storage is how much it keeps; the processor is how fast it works; the network is how fast data arrives." }
```

Was your prediction right? Try the phone and the server too.

## Worked example: reading a spec sheet

```step
stage: investigate
insight: "Reading a real advert line by line models the new move: name the part, say what its number measures. Sam adds RAM and storage together, the misconception planted after the method."
tasks:
  - check:
      type: question
      q: "A phone box says **256 GB**. Which spec is that, most likely?"
      options: ["Storage: how much it can keep", "RAM: how much it can work on at once", "Processor speed", "Network speed"]
      answer: 0
      feedback: [null, "Phones have far less RAM than that (about 4 to 16 GB).", "Processor speed is in GHz.", "Network speed is in Mb/s."]
      explain: "Storage. Phone RAM is much smaller, usually 4 to 16 GB."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam reads a phone's spec sheet. Click the line where it first goes wrong."
      answer: 2
      fault: logic
      misconception: ram-is-storage
      explain: "Line 2: RAM and storage are different parts that measure different things. 8 GB of RAM is the working space; 256 GB of storage is what it keeps."
  - check:
      type: question
      q: "Which unit measures how fast data arrives over a network?"
      options: ["Mb/s (megabits a second)", "GB (gigabytes)", "GHz (gigahertz)", "Cores"]
      answer: 0
      feedback: [null, "GB is an amount, not a speed.", "GHz is the processor's speed.", "Cores are in the processor."]
      explain: "Bandwidth is measured in bits a second: Mb/s or Gb/s."
```

### One line at a time

```worked
\text{8-core 3.0 GHz processor} :: 8 cores work on 8 things at once; each takes 3 billion steps a second.
\text{16 GB RAM} :: The working space: running apps and open files. It empties when the power goes off.
\text{512 GB SSD} :: Storage: keeps 512 GB with the power off. SSD is the fast type; HDD is slower.
\text{Wi-Fi, 300 Mb/s} :: Network bandwidth: 300 million bits can arrive each second.
\text{built-in graphics} :: No separate graphics card: the processor's own graphics.
```

Now name the spec on a phone box.

### Find the mistake

### Units

## Vary: phone, laptop, server

```step
stage: modify
insight: "Each task changes one thing, the device, so students see the same specs matter differently: a phone, a laptop, then a server that many people use at once."
try: { playground: board, starter: "specs.yml#modify", height: 600 }
tasks:
  - check:
      type: question
      q: "The board shows the phone. How much RAM does it have?"
      options: ["8 GB", "256 GB", "3.0 GHz", "300 Mb/s"]
      answer: 0
      feedback: [null, "That's its storage.", "That's its processor speed.", "That's its network."]
      explain: "8 GB of RAM to work in, and 256 GB of storage to keep things."
  - check:
      type: question
      q: "Switch to the laptop. What is the biggest difference from the phone?"
      options: ["Twice the RAM, so more open at once", "A faster processor (more GHz)", "A graphics card", "A faster network"]
      answer: 0
      feedback: [null, "Both are 3.0 GHz.", "Neither has one.", "Both are 300 Mb/s."]
      explain: "16 GB against 8 GB: room for more apps and tabs at once. The phone has more cores, but each phone app does less."
  - check:
      type: question
      q: "Switch to the server. Why does it have 128 GB of RAM and a 10 Gb/s network?"
      options: ["Thousands of people use it at once, each with their own work", "Servers play games", "It needs to start faster", "Big numbers look good in adverts"]
      answer: 0
      feedback: [null, "Servers mostly run websites and apps for other people.", "Starting is rare for a server.", "It needs them for its job."]
      explain: "A server answers many people at once: lots of working space and a fast connection."
  - check:
      type: question
      q: "Which device has a graphics card, and what is it for?"
      options: ["The server: thousands of small sums at once, as in AI", "The phone: for the camera", "The laptop: for the screen", "None of them"]
      answer: 0
      feedback: [null, "The phone uses built-in graphics.", "The laptop uses built-in graphics.", "Look at the server's last row."]
      explain: "Servers that train AI models use graphics cards, which do many simple sums at the same time."
```

### The phone

### The laptop

### The server

### Graphics

## Practise: sort the specs

```step
stage: practise
insight: "Sorting spec-sheet phrases by part is the same move in mixed forms, plus a review of how many patterns bits make."
tasks:
  - check:
      type: sort
      q: "Which part does each spec describe?"
      options: ["Processor", "RAM", "Storage", "Network"]
      items:
        - ["3.2 GHz", "Processor"]
        - ["6 cores", "Processor"]
        - ["16 GB, empties when switched off", "RAM"]
        - ["1 TB SSD", "Storage"]
        - ["2 TB hard disk (HDD)", "Storage"]
        - ["Wi-Fi 6, up to 600 Mb/s", "Network"]
      explain: "GHz and cores: processor. Working space: RAM. SSD and HDD: storage. Mb/s: network."
  - check:
      type: question
      q: "Your phone says \"Storage full\". Which part has run out?"
      options: ["Storage", "RAM", "Processor", "Network"]
      answer: 0
      feedback: [null, "RAM fills up while apps run, and frees up when you close them.", "The processor doesn't fill up.", "The network doesn't store anything."]
      explain: "Storage holds your photos and apps. Deleting things frees it."
  - check:
      type: question
      q: "Review: how many different patterns can 8 bits make?"
      options: ["256", "8", "255", "16"]
      answer: 0
      feedback: [null, "Each bit doubles the patterns.", "That's the largest number, not the count.", "That's 4 bits."]
      explain: "2⁸ = 256 patterns, 0 to 255."
```

### Sort

### Storage full

### Review: bits

## Make: build it from an advert

```step
stage: make
insight: "Setting the board to match an advert reverses the process: from the words on a spec sheet to the parts they describe."
try: { playground: board, starter: "specs.yml#make", height: 600 }
hint: ["Start with the processor row: cores, then speed.", "1 TB is 1024 GB.", "1 Gb/s is 1000 Mb/s."]
check: { type: board, text: "An advert says: \"8-core 3.0 GHz processor, 16 GB RAM, 1 TB SSD, 1 Gb/s wired network, built-in graphics.\" Set the spec sheet to match.", when: "k = 8 and g = 30 and r = 16 and s = 1 and z = 1024 and n = 1000 and h = 0", explain: "Every line of the advert is one part and one number. Now you can read any spec sheet." }
```

Then: find the spec sheet of your own phone or laptop (Settings › About). Which numbers are RAM and which are storage?
