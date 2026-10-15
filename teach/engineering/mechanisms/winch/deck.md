---
marp: true
theme: default
html: true
---

# Gear up the winch

Mechanisms · Gears

<!-- Speaker note: Students fit gears to a motor-driven winch, find by testing that a small gear driving a big one is slower and stronger by the same factor, work out ratio, speed, strength and lift time, choose pairs for a brief, meet a brief where constraints conflict, then write a brief of their own. About 45 minutes (Predict and Try 8 min · Worked example 12 min · Vary 12 min · Practise and Make 13 min). Sources: TeachEngineering: K-12 engineering design challenges (benchmark; the brief and wording are our own), https://www.teachengineering.org/ (checked 12 October 2026). -->

---

## Today

**We are learning to** a gear ratio trades speed for turning force: a small gear driving a big gear turns the output slower but stronger, by the same factor. Students test gears on a winch, work out the ratio, speed, strength and lift time, then choose a pair that meets a brief, and find a brief where the constraints conflict.

- I can work out a gear ratio as driven teeth ÷ driver teeth.
- I can explain that a ratio makes the output slower and stronger by the same factor.
- I can check a design against every criterion in a brief.
- I can explain what to do when no design meets every constraint.

<!-- Speaker note: Before class: Try every board yourself. LEGO Technic or Meccano gears make a good start before the board: mark a tooth on each gear, turn the small one once and count. Simplifications: no friction or losses (real gear meshes lose a few per cent each), the motor lifts exactly 200 g with no gears, and the bucket rises at a steady speed. Years 9–10 can add 80% efficiency per mesh. Curriculum hooks: Design and Technologies, engineering principles and systems (primary); Science, forces and simple machines; Maths, ratio and rates (applied, not taught). If the class has not met ratio, do that first. Maths for the time: 1 m ÷ 0.1 m a turn = 10 winch turns; turns ÷ turns a minute × 60 = seconds. Teacher: Try: the dot moves a third of a turn. Ask how many motor turns make one winch turn. Teacher: Worked example: model it live, line by line, before revealing the prepared lines. Teacher: Find the mistake: ask which gear is being driven in Sam's design. Teacher: Vary, too heavy: stop the class here. Who would they talk to, and what would they offer? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Why it matters

> A small motor can lift 200 g. The bucket is 450 g. You can't change the motor, but you have a box of gears. How do you lift it, and what do you give up?

<!-- Speaker note: A motor turns fast but can only lift a little. A **winch** winds rope onto a drum to lift a load. Put a **gear** on the motor (the **driver**) and a gear on the winch (the **driven** gear), and the teeth push each other round. The brief: the motor turns **120 times a minute** and lifts **200 g** with no gears. The drum winds **0.1 m** of rope each turn. Lift a **450 g** bucket **1 m** in **15 s or less**. The kit has one each of 8, 16, 24 and 40-tooth gears. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**The 8-tooth gear on the motor drives the 24-tooth gear on the winch. Compared with the motor, the winch turns…**

- 3 times slower, but no stronger
- The same speed, but 3 times stronger
- 3 times slower and 3 times stronger
- 3 times faster and 3 times stronger

<!-- Speaker note: What happens: 3 times slower and 3 times stronger. The speed and the strength change by the same factor, in opposite directions. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask a few students to say why they chose their option before the Try. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fmechanisms%2Fwinch%2Fstep-2&code=widget%3A+gears%0Adriver%3A+8%0Adriven%3A+24%0Aload%3A+450%0Aaddload%3A+on%0Anumbers%3A+off%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/mechanisms/winch/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 3 times slower and 3 times stronger. The speed and the strength change by the same factor, in opposite directions.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Check 8 → 24, then 16 → 40

Now do the same for 16 → 40. The ratio is $40 \div 16 = 2.5$. Start with the winch's speed.

$$\text{ratio} = 24 \div 8 = 3$$

1) $120 \div 3 = 40 \text{ turns a minute}$ — Slower by the ratio: divide the motor's speed.
2) $200 \times 3 = 600 \text{ g}$ — Stronger by the same ratio: multiply what the motor lifts.
3) $1 \div 0.1 = 10 \text{ winch turns}$ — The drum winds 0.1 m each turn, so 1 m takes 10 turns.
4) $10 \div 40 = 0.25 \text{ min} = 15 \text{ s}$ — Time = turns ÷ turns a minute; times 60 for seconds.
5) $600 \ge 450 \;\checkmark \quad 15 \le 15 \;\checkmark$ — Check both criteria: strong enough and fast enough. 8 → 24 passes.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write ratio = 24 ÷ 8 = 3 and say "Ratio = driven teeth ÷ driver teeth. The winch needs 3 motor turns for each of its own." Line 1: write 120 ÷ 3 = 40 turns a minute and say "Slower by the ratio: divide the motor's speed." Line 2: write 200 × 3 = 600 g and say "Stronger by the same ratio: multiply what the motor lifts." Line 3: write 1 ÷ 0.1 = 10 winch turns and say "The drum winds 0.1 m each turn, so 1 m takes 10 turns." Line 4: write 10 ÷ 40 = 0.25 min = 15 s and say "Time = turns ÷ turns a minute; times 60 for seconds." Line 5: write 600 450 ✓ 15 15 ✓ and say "Check both criteria: strong enough and fast enough. 8 → 24 passes." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 18px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Check 8 → 24, then 16 → 40

**Now 16 → 40 (ratio 2.5). How many turns a minute does the winch make?**

* Answer: 48

<!-- Speaker note: 120 ÷ 2.5 = 48 turns a minute. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Strength

**16 → 40: what is the heaviest bucket it can lift, in grams?**

* Answer: 500

<!-- Speaker note: 200 × 2.5 = 500 g. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Time and criteria

**16 → 40: how many seconds to lift the bucket 1 m?**

* Answer: 12.5

<!-- Speaker note: 1 m needs 10 winch turns. 10 ÷ 48 = 0.208 minutes = 12.5 s. It lifts 450 g (500 ≥ 450) within 15 s, so 16 → 40 passes too. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam's winch stalls with the 450 g bucket. Click the line where Sam's working first goes wrong.**

```
 1  Sam puts the 24-tooth gear on the motor and the 8-tooth gear on the winch.
 2  ratio = 24 ÷ 8 = 3
 3  So the winch is 3 times stronger: it lifts 3 × 200 = 600 g.
 4  600 g is more than 450 g, so it will lift the bucket.
```

* Answer: line 2

<!-- Speaker note: Line 2: the ratio is driven ÷ driver. The 8-tooth gear is now the driven one, so the ratio is 8 ÷ 24 = 1/3. The winch turns 3 times faster and is 3 times weaker: it lifts only about 67 g. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change one thing



- **A lighter bucket:** 
- **A faster motor:** 
- **Too heavy:** 
- **When nothing passes:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/mechanisms/winch/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one thing in the brief: a lighter load, a faster motor, then a load so heavy that no pair meets both criteria. The last is the engineering point: constraints can conflict, and someone has to decide. For students who need more support: Give a table with columns ratio, winch speed, heaviest lift, time, and fill the 8 → 24 row together. For early finishers: Two pairs in a row (a compound train): 8 → 24, then 8 → 40 on the same axle. What is the overall ratio? Could it lift 700 g, and how long would it take? The hard part, on purpose: Students treat speed and strength as separate. Keep returning to 'same factor, opposite directions', and to which gear is being driven. When students get stuck: A student says the bigger gear turns faster. Ask: Count the winch turns for one motor turn. Is it more or less than one? Fix: The big gear has more teeth to push past, so it turns less. / A student divides the driver by the driven gear (the ratio upside down). Ask: Which gear is being driven? Put that one on top. Fix: Ratio = driven ÷ driver. / A student changes only the speed (or only the strength). Ask: Hang more load. Did the strength change as well as the speed? Fix: Both change, by the same ratio. / A student checks only the load. Ask: Your design lifts it. Is it fast enough? Fix: Check every criterion in the brief. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Ratio

**The 16-tooth gear on the motor drives the 24-tooth gear on the winch. What is the ratio?**

* Answer: 1.5

<!-- Speaker note: 24 ÷ 16 = 1.5. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Speed

**Motor 120 turns a minute, ratio 5. How many turns a minute does the winch make?**

* Answer: 24

<!-- Speaker note: 120 ÷ 5 = 24. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Strength

**The 24-tooth gear on the motor drives the 16-tooth gear on the winch. The motor lifts 200 g with no gears. What is the heaviest lift now, to the nearest gram?**

* Answer: 133

<!-- Speaker note: Ratio 16 ÷ 24 = 2/3, so 200 × 2/3 ≈ 133 g. Faster, but weaker. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A bike

**On a bike's lowest gear (small gear at the pedals, big gear at the back wheel) hills feel easy. What do you give up?**

- Speed: you pedal many times for each turn of the wheel
- Strength: it is harder to push
- Grip on the road
- Nothing: lower gears are just better

* Answer: Speed: you pedal many times for each turn of the wheel

<!-- Speaker note: Small driving big: slower and stronger. Easy on hills, slow on the flat. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: write a brief



- **Exactly one pair:** 
- **Evaluate:** Stretch: write a brief where no pair passes, then argue which constraint the client should relax, and why.

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/mechanisms/winch/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Writing a brief with exactly one passing pair reverses the process: students reason from the criteria to the gears, and the board tests every pair in the kit, as an engineer's checking tool would. Hints, in order: Start from a pair and its numbers: what is the most it can lift, and how long does it take? / Choose a load only one pair is strong enough for, or a time limit only one pair is fast enough for. / For example 550 g: only 8 → 24 (600 g) and 8 → 40 (1000 g) are strong enough. Now pick a time limit only one of them meets. -->

<!-- Speaker note: Teacher: compare briefs. Did anyone make one pass by speed and another by strength? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**An 8-tooth gear drives a 40-tooth gear. The motor turns 100 times a minute and lifts 50 g on its own. How fast does the output turn, and what can it lift?**

* Ratio 40 ÷ 8 = 5, so 100 ÷ 5 = 20 turns a minute, and 50 × 5 = 250 g.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Gear trains (idlers and compound trains), then levers and pulleys (planned). Code links: a short Python loop can test every gear pair against the brief; the board's Make does this for them. Physical computing: a motor and a servo on a real winch (Power and motors). -->
