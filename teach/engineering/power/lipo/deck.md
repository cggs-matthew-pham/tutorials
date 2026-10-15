---
marp: true
theme: default
html: true
---

# LiPo safety

Power and motors · Batteries

<!-- Speaker note: A teacher-led safety lesson. Students decide what to do with a swollen pack, sort charging and storage habits into safe and unsafe, work out full and empty voltages for a 2S pack, put the charging routine in order, and are signed off by the teacher before any LiPo use. About 30 minutes (Predict 3 min · Sort 10 min · Practise 5 min · Routine 5 min · Sign-off 7 min). -->

---

## Today

**We are learning to** liPo packs are light and give big currents, but they store a lot of energy in a soft pouch. Damaged, over-charged or run-flat cells can swell and catch fire. The rules: inspect every time, charge on a balance charger in a fire-safe bag while someone watches, never run below the cutoff, store at storage charge, and retire any pack that swells. Required before any LiPo use; your teacher signs it off.

- I can inspect a LiPo pack and know when to retire it.
- I can follow the charging routine.
- I can say the full, storage and empty voltages for a pack.

<!-- Speaker note: Before class: Follow your school's risk assessment and the manufacturer's instructions; they override this page. Figures: full 4.2 V a cell, nominal 3.7 V, storage about 3.8 V, do not discharge below about 3.0–3.3 V a cell (set the low-voltage cutoff or alarm). Charge at 1 C or less unless the pack says otherwise. Have ready: a balance charger, a LiPo bag, a non-flammable surface, a bucket of sand, and the school's battery disposal route. A swollen pack goes to disposal, never the general bin. This lesson is a prerequisite: no student uses a LiPo until the sign-off step is done with you. AA or NiMH packs meet every brief in this course. Teacher: Sort: ask for the reason behind each unsafe habit. Teacher: Sign-off: talk to each student or group; this is the record that you did. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> Drones, racing robots and phones all use lithium batteries because nothing else is as light for the power. The same energy, released all at once, is a fire. What keeps it in?

<!-- Speaker note: **LiPo** (lithium polymer) packs are rated by cells: a **2S** pack has two cells, 7.4 V nominal (4.2 V a cell full, about 3.0–3.3 V a cell empty). They are the right choice when weight and current matter, and the wrong one when nobody is following the rules below. Your school's risk assessment decides whether LiPos are used at all. AA and NiMH packs meet every brief in this course. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A LiPo pack is slightly puffy, but it still powers the robot. What should you do?**

- Squeeze it flat and tape it
- Charge it slowly to fix it
- Stop using it, tell your teacher, and have it disposed of safely
- Keep using it until it stops working

<!-- Speaker note: What happens: Stop. Swelling means gas from damaged cells; it can fail and catch fire, especially when charged. It goes to safe disposal, never the bin. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: let students argue for 'it still works' before revealing why not. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Stop. Swelling means gas from damaged cells; it can fail and catch fire, especially when charged. It goes to safe disposal, never the bin.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sort them

**Safe or unsafe?**

Groups: Safe · Unsafe

Charging in a LiPo bag on a tiled bench, with someone there · Charging overnight in a backpack · Using a balance charger set to LiPo and the right cell count · Charging a LiPo on a NiMH charger · Running the robot until it stops completely · Storing packs at storage charge (about 3.8 V a cell) in a fire-safe box · Putting a dented pack back in the robot · Unplugging a pack that is getting hot and moving everyone away

* Answer: Charging in a LiPo bag on a tiled bench, with someone there → Safe; Charging overnight in a backpack → Unsafe; Using a balance charger set to LiPo and the right cell count → Safe; Charging a LiPo on a NiMH charger → Unsafe; Running the robot until it stops completely → Unsafe; Storing packs at storage charge (about 3.8 V a cell) in a fire-safe box → Safe; Putting a dented pack back in the robot → Unsafe; Unplugging a pack that is getting hot and moving everyone away → Safe

<!-- Speaker note: Inspect, charge supervised on the right charger in a safe place, never run flat, store at storage charge, retire damaged packs. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Balance charging

**Why does a LiPo need a balance charger?**

- It makes the pack hold more
- It's only needed for big packs
- It charges faster
- It charges each cell to the same voltage, so no cell is overcharged

* Answer: It charges each cell to the same voltage, so no cell is overcharged

<!-- Speaker note: Cells drift apart; charging the pack as a whole could push one cell over 4.2 V. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Full

**A 2S pack is full at 4.2 V a cell. What does the whole pack read when full?**

* Answer: 8.4

<!-- Speaker note: 2 × 4.2 = 8.4 V. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## After a run

**A 2S pack reads 6.2 V after a run. What should you do?**

- Stop using it now: that is 3.1 V a cell, near empty
- Keep going: it still has charge
- Charge it on a NiMH charger
- Store it like that

* Answer: Stop using it now: that is 3.1 V a cell, near empty

<!-- Speaker note: 6.2 ÷ 2 = 3.1 V a cell: recharge it (on a balance charger) before storing. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: the charging routine



<!-- Speaker note: What this step is for: Putting the routine in order makes it something students can follow on the day, not just know. For students who need more support: A printed card of the routine and the three voltages, kept by the charging station. For early finishers: Look up the C rating on a LiPo label. What does 25 C mean for a 1000 mAh pack's maximum current? The hard part, on purpose: Students treat LiPos like any battery because they look harmless. Show the school's fire-safe bag and disposal arrangements in person. When students get stuck: A student wants to charge at home. Ask: Who will be watching it, and on what surface? Fix: School rules: charging only at school, supervised. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Sign-off



<!-- Speaker note: What this step is for: LiPo use is a teacher decision, not a self-paced tick: this step records the conversation. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Give three rules for charging a LiPo.**

* Any three of: balance charger set to LiPo and the right cell count; in a fire-safe bag on a non-flammable surface; never left unattended; inspect first and never charge a damaged or swollen pack; charge at 1 C or less.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Back to Choosing a battery, or on to a Make project: a two-motor drive base (pairs with Mechanisms for gearing and the robotics simulator). -->
