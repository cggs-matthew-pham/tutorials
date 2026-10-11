---
order: 1
unit: moving
node: AC9TDI8K02 n1
title: Wired or wireless
summary: "Links between computers differ in three ways: bandwidth (how much data each second), latency (the delay for each packet) and reliability (how many packets get lost). Cables usually win on all three; Wi-Fi gets slower and less reliable with distance and walls. Which matters most depends on the job."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Gamers plug in a cable; everyone else uses Wi-Fi. Is the cable really better, and better at what?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8473
  url: http://127.0.0.1:8473/index.html
  readySelector: ".nwstat"
  layout: full
explainPicture: { ref: link.yml#explain-pic, caption: "Wi-Fi 12 m away through one wall: less bandwidth, more delay and more packets lost than a cable, so the same file takes longer." }
explainClip:
  query: { code: "@link.yml#explain", fresh: 1, id: explain }
  caption: "Cable, then Wi-Fi"
  say: "A cable sends a big file in under a second."
  clip:
    - caption: { text: "Cable: 1000 Mb/s, 1 ms delay, nothing lost.", say: "A cable is fast, quick and reliable." }
    - wait: 1200
    - click: Wi-Fi
    - click: "Walls: more"
    - click: "Walls: more"
    - expect: { selector: "#gsum", contains: "Wi-Fi" }
    - caption: { text: "Wi-Fi through two walls: slower, more delay, more lost.", say: "Wi-Fi through walls is slower and less reliable." }
    - wait: 1600
---
A **network** joins computers so they can send data to each other. The link between two of them can be **wired** (a cable) or **wireless** (Wi-Fi, mobile data). Three properties describe how good a link is:

- **Bandwidth**: how much data it carries each second, in megabits a second (Mb/s).
- **Latency**: the delay before each packet arrives, in milliseconds (ms).
- **Reliability**: how many packets get lost on the way and have to be sent again.

## Predict: cable or Wi-Fi?

```step
stage: predict
insight: "Committing to which link sends a big file faster tests the new move: link type changes bandwidth, latency and reliability, so the same job takes different times."
check:
  type: predict
  q: "You download a 50 MB game update. Laptop A is plugged into the router by a cable. Laptop B uses Wi-Fi two rooms away. Which finishes first?"
  options: ["A, by a lot", "About the same: Wi-Fi is as fast as a cable now", "B: no wire to slow it down", "It depends only on the internet plan"]
  actual: "A, by a lot. The cable carries more data each second and loses almost nothing; Wi-Fi through walls carries less and loses packets that have to be sent again."
```

## Try: compare the links

```step
stage: run
insight: "Switching the board from cable to Wi-Fi through two walls settles the prediction: every property gets worse and the file takes several times longer."
try: { playground: board, starter: "link.yml#run", height: 480 }
check: { type: board, text: "Note the cable's numbers. Then switch to Wi-Fi and add two walls. How long does the file take now?", when: "w = 2 and k >= 2", explain: "Through two walls, Wi-Fi has far less bandwidth, more delay and more lost packets, so the same 50 MB takes several times longer." }
```

Was your prediction right? Try Mobile too.

## Worked example: three properties

```step
stage: investigate
insight: "Working out a file's time from bandwidth and naming which property each job needs models the new move. Sam mixes up bandwidth and latency, the misconception planted after the method."
tasks:
  - check:
      type: answer
      q: "A link carries 100 Mb/s. How many seconds does a 50 MB file take? (A byte is 8 bits, so 50 MB is 400 megabits.)"
      answer: "4"
      feedback:
        - ["0.5", "Divide the megabits by the speed: 400 ÷ 100."]
        - ["2", "Change megabytes to megabits first: 50 × 8 = 400."]
      explain: "400 megabits ÷ 100 Mb/s = 4 seconds (a little more if packets are lost)."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam plans to fix a laggy game. Click the line where the reasoning first goes wrong."
      answer: 3
      fault: logic
      misconception: bandwidth-is-latency
      explain: "Line 3: bandwidth is how much data a second, not how soon each packet arrives. Lag is latency; a cable, or being closer to the router, cuts the delay. A bigger plan mostly helps big downloads."
  - check:
      type: question
      q: "Why does Wi-Fi lose more packets than a cable?"
      options: ["The signal travels through the air, where walls, distance and other devices weaken or interfere with it", "Wi-Fi packets are bigger", "Wi-Fi is newer, so it has more bugs", "Cables send each packet twice"]
      answer: 0
      feedback: [null, "Packets are the same size either way.", "It is about the signal, not the age of the technology.", "Cables are reliable because the signal is protected inside the wire."]
      explain: "A radio signal spreads out, is blocked by walls and shares the air with other devices, so some packets are damaged or lost."
```

### Time to send a file

```worked
50 \text{ MB} \times 8 = 400 \text{ megabits} :: Speeds are in megabits a second, so change bytes to bits.
400 \div 1000 = 0.4 \text{ s} :: Over a cable at 1000 Mb/s.
400 \div 100 = 4 \text{ s} :: Over Wi-Fi at 100 Mb/s: ten times as long.
\text{latency} \to \text{games, video calls} :: Jobs that go back and forth need a short delay.
\text{bandwidth} \to \text{streaming, downloads} :: Jobs that move a lot of data need a high speed.
\text{reliability} \to \text{every job} :: Lost packets must be sent again, which costs time.
```

Now work out a file's time at 100 Mb/s.

### Find the mistake

### Why Wi-Fi loses packets

## Vary: one change at a time

```step
stage: modify
insight: "Each task changes one thing about the link: the type, the distance, the walls, then mobile data, then choosing the link for a job."
try: { playground: board, starter: "link.yml#modify", height: 500 }
tasks:
  - check: { type: board, text: "Switch to Wi-Fi with no walls. Move the distance to 40 m.", when: "w = 2 and k = 0 and d >= 40", explain: "Distance alone weakens Wi-Fi: less bandwidth and more packets lost." }
  - check: { type: board, text: "Come back to 5 m and add three walls.", when: "w = 2 and d <= 5 and k = 3", explain: "Walls block the signal: even close by, three walls cut the speed a lot." }
  - check: { type: board, text: "Switch to Mobile. Which property is much worse than Wi-Fi close by?", when: "w = 3", explain: "The delay: about 40 ms, because each packet goes through a phone tower and the mobile network first." }
  - check:
      type: question
      q: "For online gaming, which link is best?"
      options: ["A cable: the shortest delay", "Mobile data: it goes everywhere", "Wi-Fi far from the router", "They are all the same"]
      answer: 0
      feedback: [null, "Mobile has the longest delay here.", "Distance adds delay and lost packets.", "Compare the delay on each."]
      explain: "Games need a short delay (low latency), so a cable is best."
```

### Distance

### Walls

### Mobile data

### Best for games

## Practise: which property?

```step
stage: practise
insight: "Matching jobs to the property they need most, a time calculation, and a review of bytes and bits."
tasks:
  - check:
      type: question
      q: "Streaming a 4K movie needs lots of data every second. Which property matters most?"
      options: ["Bandwidth", "Latency", "The colour of the cable", "The number of routers"]
      answer: 0
      feedback: [null, "A movie can buffer, so a small delay doesn't matter much.", "Cables come in many colours; it doesn't matter.", "That affects delay, not how much data a second."]
      explain: "Lots of data a second is bandwidth."
  - check:
      type: question
      q: "A video call keeps freezing and voices arrive late. Which properties are the problem?"
      options: ["Latency and reliability", "Only bandwidth", "Only the size of the screen", "None: calls always do that"]
      answer: 0
      feedback: [null, "A call uses little bandwidth; it suffers from delay and lost packets.", "The screen has nothing to do with it.", "On a good link they don't."]
      explain: "Late voices are latency; freezing is lost packets."
  - check:
      type: answer
      q: "How many seconds does a 100 MB file take over a cable at 1000 Mb/s?"
      answer: "0.8"
      feedback:
        - ["0.1", "Change megabytes to megabits first: 100 × 8 = 800."]
        - ["8", "800 megabits ÷ 1000 Mb/s."]
      explain: "800 ÷ 1000 = 0.8 seconds."
  - check:
      type: answer
      q: "Review: how many bits is one byte?"
      answer: "8"
      explain: "8 bits make a byte, which is why speeds in megabits look 8 times bigger than file sizes in megabytes."
```

### Streaming

### Video calls

### File time

### Review: bytes

## Make: good-enough Wi-Fi

```step
stage: make
insight: "Finding a Wi-Fi setup that meets a time target reverses the process: students start from the requirement and adjust the conditions."
try: { playground: board, starter: "link.yml#make", height: 500 }
hint: ["Distance and walls both slow Wi-Fi.", "Keep the wall, but move the laptop closer to the router.", "Within about 15 m with one wall is fast enough."]
check: { type: board, text: "The laptop must stay on Wi-Fi behind at least one wall. Change the setup so the 50 MB file takes less than 3 seconds.", when: "w = 2 and k >= 1 and s < 3", explain: "Close to the router with one wall, Wi-Fi keeps enough bandwidth and loses few packets. Moving closer often helps more than a faster plan." }
```

Then: where in your house or school is the worst place to sit, and why?
