---
marp: true
theme: default
html: true
---

# Wired or wireless

Networks · Moving data

<!-- Speaker note: Students compare cable, Wi-Fi and mobile links on a board to describe bandwidth, latency and reliability, work out file times, and match links to jobs such as gaming, streaming and file transfer (AC9TDI8K02 node 1). About 40 minutes (Predict and Try 6 min · Worked example 12 min · Vary 10 min · Practise and Make 12 min). -->

---

## Today

**We are learning to** links between computers differ in three ways: bandwidth (how much data each second), latency (the delay for each packet) and reliability (how many packets get lost). Cables usually win on all three; Wi-Fi gets slower and less reliable with distance and walls. Which matters most depends on the job.

- I can describe bandwidth, latency and reliability.
- I can compare wired and wireless links.
- I can choose a link for a job and say why.

<!-- Speaker note: Before class: Try the board yourself: switch link types and move the sliders. The model is simplified and says so: cable 1000 Mb/s, 1 ms, nothing lost; Wi-Fi up to 300 Mb/s, losing speed with distance and walls; mobile 50 Mb/s, 40 ms. Real numbers vary a lot with equipment; the comparisons are what matter. Hands-on: run a speed test on a school laptop on Wi-Fi and on a cable (if a port is available) and compare download speed and ping. Teacher: Try: have students write down all three numbers for cable, then for Wi-Fi. Teacher: Worked example: ask why speeds are in megabits but files are in megabytes. Teacher: Vary: ask which is worse, 40 m or three walls. -->

---

## Why it matters

> Gamers plug in a cable; everyone else uses Wi-Fi. Is the cable really better, and better at what?

<!-- Speaker note: A **network** joins computers so they can send data to each other. The link between two of them can be **wired** (a cable) or **wireless** (Wi-Fi, mobile data). Three properties describe how good a link is: - **Bandwidth**: how much data it carries each second, in megabits a second (Mb/s). - **Latency**: the delay before each packet arrives, in milliseconds (ms). - **Reliability**: how many packets get lost on the way and have to be sent again. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**You download a 50 MB game update. Laptop A is plugged into the router by a cable. Laptop B uses Wi-Fi two rooms away. Which finishes first?**

- B: no wire to slow it down
- About the same: Wi-Fi is as fast as a cable now
- A, by a lot
- It depends only on the internet plan

<!-- Speaker note: What happens: A, by a lot. The cable carries more data each second and loses almost nothing; Wi-Fi through walls carries less and loses packets that have to be sent again. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose "about the same" may have fast home Wi-Fi; ask what the walls do. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fnetworks%2Fwired-wireless%2Fstep-2&code=widget%3A+network%0Amode%3A+link%0Alink%3A+wired%0Afile%3A+50%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/networks/wired-wireless/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Try Mobile too. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* A, by a lot. The cable carries more data each second and loses almost nothing; Wi-Fi through walls carries less and loses packets that have to be sent again.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Time to send a file

Now work out a file's time at 100 Mb/s.

$$50 \text{ MB} \times 8 = 400 \text{ megabits}$$

1) $400 \div 1000 = 0.4 \text{ s}$ — Over a cable at 1000 Mb/s.
2) $400 \div 100 = 4 \text{ s}$ — Over Wi-Fi at 100 Mb/s: ten times as long.
3) $\text{latency} \to \text{games, video calls}$ — Jobs that go back and forth need a short delay.
4) $\text{bandwidth} \to \text{streaming, downloads}$ — Jobs that move a lot of data need a high speed.
5) $\text{reliability} \to \text{every job}$ — Lost packets must be sent again, which costs time.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write 50 MB × 8 = 400 megabits and say "Speeds are in megabits a second, so change bytes to bits." Line 1: write 400 ÷ 1000 = 0.4 s and say "Over a cable at 1000 Mb/s." Line 2: write 400 ÷ 100 = 4 s and say "Over Wi-Fi at 100 Mb/s: ten times as long." Line 3: write latency games, video calls and say "Jobs that go back and forth need a short delay." Line 4: write bandwidth streaming, downloads and say "Jobs that move a lot of data need a high speed." Line 5: write reliability every job and say "Lost packets must be sent again, which costs time." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Time to send a file

**A link carries 100 Mb/s. How many seconds does a 50 MB file take? (A byte is 8 bits, so 50 MB is 400 megabits.)**

* Answer: 4

<!-- Speaker note: 400 megabits ÷ 100 Mb/s = 4 seconds (a little more if packets are lost). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam plans to fix a laggy game. Click the line where the reasoning first goes wrong.**

```
 1  My online game lags: my moves show up late.
 2  Lag is the delay (latency) before each packet arrives.
 3  More bandwidth means each packet arrives sooner.
 4  So a faster internet plan will fix the lag.
```

* Answer: line 3

<!-- Speaker note: Line 3: bandwidth is how much data a second, not how soon each packet arrives. Lag is latency; a cable, or being closer to the router, cuts the delay. A bigger plan mostly helps big downloads. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why Wi-Fi loses packets

**Why does Wi-Fi lose more packets than a cable?**

- The signal travels through the air, where walls, distance and other devices weaken or interfere with it
- Wi-Fi is newer, so it has more bugs
- Wi-Fi packets are bigger
- Cables send each packet twice

* Answer: The signal travels through the air, where walls, distance and other devices weaken or interfere with it

<!-- Speaker note: A radio signal spreads out, is blocked by walls and shares the air with other devices, so some packets are damaged or lost. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: one change at a time



- **Distance:** 
- **Walls:** 
- **Mobile data:** 
- **Best for games:** 

[Open this step](https://tutorials.learningwaypoints.com/systems/networks/wired-wireless/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one thing about the link: the type, the distance, the walls, then mobile data, then choosing the link for a job. For students who need more support: A card with the three words and a job for each: bandwidth (streaming), latency (gaming), reliability (everything). For early finishers: Why do some country towns rely on satellite or mobile internet? What does that mean for latency and for school video calls? The hard part, on purpose: Bandwidth and latency get treated as one 'speed'. Use the road picture: bandwidth is how many lanes, latency is how long the trip takes. When students get stuck: A student says a faster plan fixes lag (Sam's mistake). Ask: Is lag about how much data, or how long each packet takes? Fix: Lag is latency; bandwidth is how much data a second. / A student divides megabytes by megabits. Ask: Are the units the same? Fix: Multiply megabytes by 8 first. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Streaming

**Streaming a 4K movie needs lots of data every second. Which property matters most?**

- The colour of the cable
- The number of routers
- Bandwidth
- Latency

* Answer: Bandwidth

<!-- Speaker note: Lots of data a second is bandwidth. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Video calls

**A video call keeps freezing and voices arrive late. Which properties are the problem?**

- None: calls always do that
- Only the size of the screen
- Latency and reliability
- Only bandwidth

* Answer: Latency and reliability

<!-- Speaker note: Late voices are latency; freezing is lost packets. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## File time

**How many seconds does a 100 MB file take over a cable at 1000 Mb/s?**

* Answer: 0.8

<!-- Speaker note: 800 ÷ 1000 = 0.8 seconds. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: bytes

**Review: how many bits is one byte?**

* Answer: 8

<!-- Speaker note: 8 bits make a byte, which is why speeds in megabits look 8 times bigger than file sizes in megabytes. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: good-enough Wi-Fi

Then: where in your house or school is the worst place to sit, and why?

[Open this step](https://tutorials.learningwaypoints.com/systems/networks/wired-wireless/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Finding a Wi-Fi setup that meets a time target reverses the process: students start from the requirement and adjust the conditions. Hints, in order: Distance and walls both slow Wi-Fi. / Keep the wall, but move the laptop closer to the router. / Within about 15 m with one wall is fast enough. -->

<!-- Speaker note: Teacher: compare setups: who kept the most walls? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name two properties that differ between wired and wireless links. Which link would you choose for online exams, and why?**

* Any two of bandwidth, latency, reliability. A cable: it is the most reliable, so the exam is least likely to drop out.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Packets (how a message actually travels, and what happens to lost packets). Where it leads: the internet journey lesson uses both wired and wireless links in one trip. -->
