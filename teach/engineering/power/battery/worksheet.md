---
title: "Choosing a battery"
subtitle: "Power and motors · Batteries · Lesson 4"
---

# Choosing a battery

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Your robot drives beautifully for four minutes, then crawls. A 9 V battery, more volts than the AA pack: shouldn't that be better?


:::teacher-note

**In one sentence:** Students compare a 9 V PP3 with 4 × AA for a robot, work out run time from capacity and draw with an 80% margin, find why NiMH cells fail a voltage range, and choose a battery against voltage, run time and weight, which leads to a LiPo.

**Students should be able to say:** I can work out a battery's run time from its capacity and the current. I can choose a battery against a brief's criteria. I can explain the difference between voltage and capacity.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**A robot draws 350 mA. Which runs it for longer: a 9 V PP3 (500 mAh) or 4 × AA (6 V, 2000 mAh)?**

☐ The 9 V: it has more volts

☐ 4 × AA: four times the capacity

☐ The same: both are batteries

☐ You can't tell without the motor's speed

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 4 × AA: about 343 minutes against about 86. Voltage doesn't decide how long; capacity and current do.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: run time


:::keep-together

### Hours and minutes

1. $2000\text{ mAh} \div 350\text{ mA} \approx 5.7\text{ h}$ — Capacity ÷ current gives hours.
2. $5.7 \times 60 \approx 343\text{ min}$ — In minutes.
3. $2000 \times 0.8 = 1600\text{ mAh}$ — Plan on about 80%: voltage sags near empty, and rechargeables are damaged by running flat.
4. $1600 \div 350 \times 60 \approx 274\text{ min}$ — A safer estimate.

Now the LiPo.

**A 1000 mAh LiPo powers a robot drawing 900 mA. Using only 80% of it, how many minutes does it last? (nearest whole minute)**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 53

1000 × 0.8 = 800 mAh; 800 ÷ 900 = 0.89 h ≈ 53 minutes.

:::


:::keep-together

### Find the mistake

**Sam's robot is no faster with the new pack. Click the line where Sam's reasoning first goes wrong.**

```
 1  The robot needs a strong battery.
 2  The 2200 mAh pack has a bigger number than the 1000 mAh pack.
 3  So it is more powerful and will make the robot faster.
 4  Sam buys the 2200 mAh pack.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: mAh is how much charge it holds, so the 2200 pack lasts longer. Speed depends on voltage (both packs are 7.4 V here), not capacity.

:::


:::typical

## Vary: a hungrier robot


**900 mA, one hour.** 

**Rechargeables.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Run times


:::keep-together

### Hours

**A 2200 mAh pack at 1100 mA, using all of it. How many hours?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 2

2200 ÷ 1100 = 2 hours.

:::


:::keep-together

### Capacity needed

**You need 90 minutes at 600 mA, using 80% of the battery. What capacity, at least? (mAh)**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 1125

600 mA × 1.5 h = 900 mAh needed; 900 ÷ 0.8 = 1125 mAh.

:::


## Make: a light robot


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**A 1500 mAh pack and a robot drawing 500 mA. Using 80%, how long does it run?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 1500 × 0.8 = 1200 mAh; 1200 ÷ 500 = 2.4 h = 144 minutes.

:::

