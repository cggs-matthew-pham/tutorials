---
order: 5
unit: battery
title: LiPo safety
summary: "LiPo packs are light and give big currents, but they store a lot of energy in a soft pouch. Damaged, over-charged or run-flat cells can swell and catch fire. The rules: inspect every time, charge on a balance charger in a fire-safe bag while someone watches, never run below the cutoff, store at storage charge, and retire any pack that swells. Required before any LiPo use; your teacher signs it off."
language: maths
hook: "Drones, racing robots and phones all use lithium batteries because nothing else is as light for the power. The same energy, released all at once, is a fire. What keeps it in?"
---
**LiPo** (lithium polymer) packs are rated by cells: a **2S** pack has two cells, 7.4 V nominal (4.2 V a cell full, about 3.0–3.3 V a cell empty). They are the right choice when weight and current matter, and the wrong one when nobody is following the rules below.

Your school's risk assessment decides whether LiPos are used at all. AA and NiMH packs meet every brief in this course.

## Predict: a puffy pack

```step
stage: predict
insight: "Committing to what to do with a slightly swollen pack surfaces the 'it still works' instinct before the rules are taught."
check:
  type: predict
  q: "A LiPo pack is slightly puffy, but it still powers the robot. What should you do?"
  options: ["Stop using it, tell your teacher, and have it disposed of safely", "Keep using it until it stops working", "Charge it slowly to fix it", "Squeeze it flat and tape it"]
  actual: "Stop. Swelling means gas from damaged cells; it can fail and catch fire, especially when charged. It goes to safe disposal, never the bin."
```

## Investigate: safe or not?

```step
stage: investigate
insight: "Sorting real habits into safe and unsafe builds the rules from cases, each with its reason."
tasks:
  - check:
      type: sort
      q: "Safe or unsafe?"
      options: ["Safe", "Unsafe"]
      items:
        - ["Charging in a LiPo bag on a tiled bench, with someone there", "Safe"]
        - ["Charging overnight in a backpack", "Unsafe", "Unwatched, on something that burns, with nowhere for heat to go."]
        - ["Using a balance charger set to LiPo and the right cell count", "Safe"]
        - ["Charging a LiPo on a NiMH charger", "Unsafe", "Wrong voltages: it can overcharge the cells."]
        - ["Running the robot until it stops completely", "Unsafe", "Below about 3 V a cell, LiPos are damaged: use a low-voltage alarm or cutoff."]
        - ["Storing packs at storage charge (about 3.8 V a cell) in a fire-safe box", "Safe"]
        - ["Putting a dented pack back in the robot", "Unsafe", "Physical damage can short the cells inside."]
        - ["Unplugging a pack that is getting hot and moving everyone away", "Safe"]
      explain: "Inspect, charge supervised on the right charger in a safe place, never run flat, store at storage charge, retire damaged packs."
  - check:
      type: question
      q: "Why does a LiPo need a balance charger?"
      options: ["It charges each cell to the same voltage, so no cell is overcharged", "It charges faster", "It makes the pack hold more", "It's only needed for big packs"]
      answer: 0
      feedback: [null, "Speed isn't the point.", "Capacity is fixed.", "Every multi-cell LiPo needs it."]
      explain: "Cells drift apart; charging the pack as a whole could push one cell over 4.2 V."
```

### Sort them

### Balance charging

## Practise: the numbers

```step
stage: practise
insight: "The voltages that mark full, storage and empty, for a 2S pack."
tasks:
  - check:
      type: number
      q: "A 2S pack is full at 4.2 V a cell. What does the whole pack read when full?"
      answer: 8.4
      feedback:
        - [7.4, "7.4 V is the nominal (middle) voltage."]
      explain: "2 × 4.2 = 8.4 V."
  - check:
      type: question
      q: "A 2S pack reads 6.2 V after a run. What should you do?"
      options: ["Stop using it now: that is 3.1 V a cell, near empty", "Keep going: it still has charge", "Store it like that", "Charge it on a NiMH charger"]
      answer: 0
      feedback: [null, "Below about 3.0–3.3 V a cell causes damage.", "Store at about 3.8 V a cell.", "Always a LiPo balance charger."]
      explain: "6.2 ÷ 2 = 3.1 V a cell: recharge it (on a balance charger) before storing."
```

### Full

### After a run

## Make: the charging routine

```step
stage: make
insight: "Putting the routine in order makes it something students can follow on the day, not just know."
check:
  type: parsons
  code: "steps.txt#charge"
  text: "Put the charging routine in order."
  explain: "Inspect, contain, connect correctly, set the charger, supervise, finish."
```

## Sign-off

```step
stage: make
insight: "LiPo use is a teacher decision, not a self-paced tick: this step records the conversation."
check: { type: reflect, text: "My teacher has gone through these rules with me, shown me the school's charger, bag and disposal bin, and agreed I can use a LiPo pack in this project." }
```
