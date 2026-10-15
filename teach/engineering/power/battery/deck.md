---
marp: true
theme: default
html: true
---

# Choosing a battery

Power and motors · Batteries

<!-- Speaker note: Students compare a 9 V PP3 with 4 × AA for a robot, work out run time from capacity and draw with an 80% margin, find why NiMH cells fail a voltage range, and choose a battery against voltage, run time and weight, which leads to a LiPo. About 40 minutes (Predict and Try 5 min · Worked example 10 min · Vary 8 min · Practise and Make 17 min). Sources: Energizer AA alkaline datasheet (capacity against current; link), https://data.energizer.com/ (checked 12 October 2026). -->

---

## Today

**We are learning to** voltage (V) is how hard a battery pushes; capacity (mAh) is how much charge it holds. Run time ≈ capacity ÷ current, and plan on using about 80% of it. A battery for a robot has to meet every criterion: voltage in range, enough run time, light enough to carry.

- I can work out a battery's run time from its capacity and the current.
- I can choose a battery against a brief's criteria.
- I can explain the difference between voltage and capacity.

<!-- Speaker note: Before class: Figures are typical, not exact: alkaline AA capacity falls a lot at high current, and PP3s are poor at motor currents (often well under 500 mAh). Check the packs you buy. The board's run time is capacity × usable % ÷ draw. LiPos appear here as the battery that fits; the next lesson is required before anyone uses one. -->

---

## Why it matters

> Your robot drives beautifully for four minutes, then crawls. A 9 V battery, more volts than the AA pack: shouldn't that be better?

<!-- Speaker note: A battery has two numbers that matter here: - **Voltage** (V): how hard it pushes. The motor driver needs it within a range. - **Capacity** (mAh, milliamp-hours): how much charge it holds. 2000 mAh could give 2000 mA for an hour, or 500 mA for 4 hours. **Run time (hours) ≈ capacity (mAh) ÷ current (mA).** -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A robot draws 350 mA. Which runs it for longer: a 9 V PP3 (500 mAh) or 4 × AA (6 V, 2000 mAh)?**

- The 9 V: it has more volts
- 4 × AA: four times the capacity
- The same: both are batteries
- You can't tell without the motor's speed

<!-- Speaker note: What happens: 4 × AA: about 343 minutes against about 86. Voltage doesn't decide how long; capacity and current do. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what the 9 in 9 V tells you, and what it doesn't. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fpower%2Fbattery%2Fstep-2&code=widget%3A+motor%0Amode%3A+battery%0Abattery%3A+pp3%0Adraw%3A+350%0Aneed%3A+30%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/power/battery/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 4 × AA: about 343 minutes against about 86. Voltage doesn't decide how long; capacity and current do.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Hours and minutes

Now the LiPo.

$$2000\text{ mAh} \div 350\text{ mA} \approx 5.7\text{ h}$$

1) $5.7 \times 60 \approx 343\text{ min}$ — In minutes.
2) $2000 \times 0.8 = 1600\text{ mAh}$ — Plan on about 80%: voltage sags near empty, and rechargeables are damaged by running flat.
3) $1600 \div 350 \times 60 \approx 274\text{ min}$ — A safer estimate.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write 2000 mAh ÷ 350 mA 5.7 h and say "Capacity ÷ current gives hours." Line 1: write 5.7 × 60 343 min and say "In minutes." Line 2: write 2000 × 0.8 = 1600 mAh and say "Plan on about 80%: voltage sags near empty, and rechargeables are damaged by running flat." Line 3: write 1600 ÷ 350 × 60 274 min and say "A safer estimate." -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Hours and minutes

**A 1000 mAh LiPo powers a robot drawing 900 mA. Using only 80% of it, how many minutes does it last? (nearest whole minute)**

* Answer: 53

<!-- Speaker note: 1000 × 0.8 = 800 mAh; 800 ÷ 900 = 0.89 h ≈ 53 minutes. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam's robot is no faster with the new pack. Click the line where Sam's reasoning first goes wrong.**

```
 1  The robot needs a strong battery.
 2  The 2200 mAh pack has a bigger number than the 1000 mAh pack.
 3  So it is more powerful and will make the robot faster.
 4  Sam buys the 2200 mAh pack.
```

* Answer: line 3

<!-- Speaker note: Line 3: mAh is how much charge it holds, so the 2200 pack lasts longer. Speed depends on voltage (both packs are 7.4 V here), not capacity. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: a hungrier robot



- **900 mA, one hour:** 
- **Rechargeables:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/power/battery/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A bigger current draw, a longer run and the 80% rule change which batteries pass, one criterion at a time. For students who need more support: A table with a row per battery and a column per criterion. For early finishers: Two batteries in series: what happens to the voltage, and to the capacity? In parallel? The hard part, on purpose: Students rank batteries by one number. Keep all three criteria on the board for every candidate. When students get stuck: A student divides current by capacity. Ask: Which is bigger, and which way gives hours? Fix: Capacity ÷ current. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Hours

**A 2200 mAh pack at 1100 mA, using all of it. How many hours?**

* Answer: 2

<!-- Speaker note: 2200 ÷ 1100 = 2 hours. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Capacity needed

**You need 90 minutes at 600 mA, using 80% of the battery. What capacity, at least? (mAh)**

* Answer: 1125

<!-- Speaker note: 600 mA × 1.5 h = 900 mAh needed; 900 ÷ 0.8 = 1125 mAh. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a light robot



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/power/battery/?full=step-6#step-6)

<!-- Speaker note: What this step is for: A brief where weight rules out the AA pack and run time rules out the PP3 leads to the LiPo, and to why it needs the next lesson. Hints, in order: Check each criterion for each battery: voltage, run time (at 80%), weight. / AA packs are too heavy for 80 g. / The 1000 mAh 2S LiPo: 7.4 V, 53 minutes, 60 g. -->

<!-- Speaker note: Teacher: ask students to say which criterion rules out each battery. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A 1500 mAh pack and a robot drawing 500 mA. Using 80%, how long does it run?**

* 1500 × 0.8 = 1200 mAh; 1200 ÷ 500 = 2.4 h = 144 minutes.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: LiPo safety (required before any LiPo use). -->
