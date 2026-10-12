---
order: 4
unit: battery
title: Choosing a battery
assumes: [energy-transfer, electric-current]
summary: "Voltage (V) is how hard a battery pushes; capacity (mAh) is how much charge it holds. Run time ≈ capacity ÷ current, and plan on using about 80% of it. A battery for a robot has to meet every criterion: voltage in range, enough run time, light enough to carry."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Your robot drives beautifully for four minutes, then crawls. A 9 V battery, more volts than the AA pack: shouldn't that be better?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8516
  url: http://127.0.0.1:8516/index.html
  readySelector: ".mtsvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "Four AA cells: 6 V, 2000 mAh, about 100 g." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "How long, not how hard"
  say: "Capacity sets how long it lasts."
  clip:
    - caption: { text: "4 × AA: 2000 mAh at 350 mA lasts about 343 minutes.", say: "Two thousand milliamp hours at three hundred and fifty milliamps." }
    - wait: 2000
    - caption: { text: "Run time ≈ capacity ÷ current. Voltage is a separate question.", say: "Capacity divided by current gives the run time." }
    - wait: 1800
    - expect: { selector: "#gsum", contains: "343 min" }
---
A battery has two numbers that matter here:

- **Voltage** (V): how hard it pushes. The motor driver needs it within a range.
- **Capacity** (mAh, milliamp-hours): how much charge it holds. 2000 mAh could give 2000 mA for an hour, or 500 mA for 4 hours.

**Run time (hours) ≈ capacity (mAh) ÷ current (mA).**

## Predict: the 9 V battery

```step
stage: predict
insight: "Committing to which battery lasts longer tests the new move: run time comes from capacity and current, not voltage."
check:
  type: predict
  q: "A robot draws 350 mA. Which runs it for longer: a 9 V PP3 (500 mAh) or 4 × AA (6 V, 2000 mAh)?"
  options: ["4 × AA: four times the capacity", "The 9 V: it has more volts", "The same: both are batteries", "You can't tell without the motor's speed"]
  actual: "4 × AA: about 343 minutes against about 86. Voltage doesn't decide how long; capacity and current do."
```

## Try: compare them

```step
stage: run
insight: "Switching between the two batteries on the board settles the prediction."
try: { playground: board, starter: "board.yml#run", height: 560 }
check: { type: board, text: "The PP3 is fitted. Note its run time, then try 4 × AA.", when: "c = 2000 and v = 6", explain: "86 minutes for the PP3, 343 for the AA pack: four times the capacity, four times the time." }
```

## Worked example: run time

```step
stage: investigate
insight: "Working run time from capacity and draw, then planning on 80%, models the move. Sam's 'more mAh is more powerful' is planted after the method."
tasks:
  - check:
      type: number
      q: "A 1000 mAh LiPo powers a robot drawing 900 mA. Using only 80% of it, how many minutes does it last? (nearest whole minute)"
      answer: 53
      tolerance: 1
      feedback:
        - [67, "That uses all of it. Plan on 80%."]
        - [1.1, "That is in hours. Times by 60."]
      explain: "1000 × 0.8 = 800 mAh; 800 ÷ 900 = 0.89 h ≈ 53 minutes."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam's robot is no faster with the new pack. Click the line where Sam's reasoning first goes wrong."
      answer: 3
      fault: logic
      misconception: mah-is-strength
      explain: "Line 3: mAh is how much charge it holds, so the 2200 pack lasts longer. Speed depends on voltage (both packs are 7.4 V here), not capacity."
```

### Hours and minutes

```worked
2000\text{ mAh} \div 350\text{ mA} \approx 5.7\text{ h} :: Capacity ÷ current gives hours.
5.7 \times 60 \approx 343\text{ min} :: In minutes.
2000 \times 0.8 = 1600\text{ mAh} :: Plan on about 80%: voltage sags near empty, and rechargeables are damaged by running flat.
1600 \div 350 \times 60 \approx 274\text{ min} :: A safer estimate.
```

Now the LiPo.

### Find the mistake

## Vary: a hungrier robot

```step
stage: modify
insight: "A bigger current draw, a longer run and the 80% rule change which batteries pass, one criterion at a time."
try: { playground: board, starter: "board.yml#vary", height: 560 }
tasks:
  - check: { type: board, text: "The robot now draws 900 mA and must run for an hour. Switch on 'use only 80%'. Does 4 × AA still pass?", when: "u = 80 and c = 2000 and v = 6", explain: "Yes: 1600 mAh ÷ 900 mA ≈ 107 minutes." }
  - check: { type: board, text: "Try 4 × AA NiMH rechargeables. Why do they fail?", when: "v = 4.8", explain: "Voltage: NiMH cells are 1.2 V, so four make 4.8 V, under the driver's 6 V. Six cells (7.2 V) fix that, but weigh 165 g." }
```

### 900 mA, one hour

### Rechargeables

## Practise: run times

```step
stage: practise
insight: "Run time both ways."
tasks:
  - check:
      type: number
      q: "A 2200 mAh pack at 1100 mA, using all of it. How many hours?"
      answer: 2
      feedback:
        - [0.5, "Capacity ÷ current, not the other way round."]
      explain: "2200 ÷ 1100 = 2 hours."
  - check:
      type: number
      q: "You need 90 minutes at 600 mA, using 80% of the battery. What capacity, at least? (mAh)"
      answer: 1125
      tolerance: 5
      feedback:
        - [900, "That uses all of it. Divide by 0.8."]
      explain: "600 mA × 1.5 h = 900 mAh needed; 900 ÷ 0.8 = 1125 mAh."
```

### Hours

### Capacity needed

## Make: a light robot

```step
stage: make
insight: "A brief where weight rules out the AA pack and run time rules out the PP3 leads to the LiPo, and to why it needs the next lesson."
try: { playground: board, starter: "board.yml#make", height: 560 }
hint: ["Check each criterion for each battery: voltage, run time (at 80%), weight.", "AA packs are too heavy for 80 g.", "The 1000 mAh 2S LiPo: 7.4 V, 53 minutes, 60 g."]
check: { type: board, text: "A small robot: 900 mA, at least 45 minutes using 80%, 6–9 V, at most 80 g. Find the battery that meets every criterion.", when: "p = 1 and u = 80", explain: "Only the 1000 mAh LiPo: light, enough voltage, and just enough run time. That is why small robots and drones use LiPos, and why they need the safety rules in the next lesson." }
```
