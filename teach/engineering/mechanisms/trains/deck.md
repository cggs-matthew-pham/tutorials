---
marp: true
theme: default
html: true
---

# Gear trains

Mechanisms · Gears

<!-- Speaker note: Students add a third gear between two others and find it changes only the direction (an idler), then put two gears on one axle to make a compound train, work out that stage ratios multiply, choose a train for a load no single pair can lift, and see why big ratios come in stages. About 45 minutes (Predict and Try 8 min · Worked example 12 min · Vary 12 min · Practise and Make 13 min). Sources: TeachEngineering: K-12 engineering design challenges (benchmark; the brief and wording are our own), https://www.teachengineering.org/ (checked 12 October 2026). -->

---

## Today

**We are learning to** more than two gears. A gear between two others (an idler) changes the direction but not the ratio; two gears on one axle make a compound train, whose stage ratios multiply. Students test an idler, work out compound trains, find one for a heavy brief, and see why big ratios come in stages.

- I can explain that an idler gear changes the direction of a turn but not the ratio.
- I can work out the overall ratio of a compound train by multiplying its stage ratios.
- I can choose a gear train that meets every criterion in a brief.
- I can explain why big ratios are built in stages.

<!-- Speaker note: Before class: Do Gear up the winch first: this lesson assumes ratio = driven ÷ driver, and that speed and strength change by the same factor. Try every board yourself. With LEGO Technic or Meccano, build 8 → 24 = 8 → 40 on a frame: students can count 15 motor turns for one winch turn, and feel how much easier the output is to hold. Simplifications: no friction or losses (each real mesh loses a few per cent, so a two-stage train loses a little more than one pair), the motor lifts exactly 200 g with no gears, and the gears on a shared axle are drawn on top of each other (in a real train they sit side by side along the axle). Curriculum hooks: Design and Technologies, engineering principles and systems (primary); Science, forces and simple machines; Maths, multiplying ratios and rates (applied). Teacher: Try: ask what the idler is for, if not to change the ratio (reverse the direction; bridge a gap). Teacher: Worked example: point at the two gears on one axle. They turn together, so the second stage starts from a small gear again. Teacher: Find the mistake: ask a student to say what the first stage does to the second stage's input. Teacher: Vary: the hints give the least and the most ratio. Write 7.5 ≤ ratio ≤ 8 on the board. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

## Why it matters

> The bucket is now 1500 g: more than any pair in the box can lift. You can use as many gears as you like. How?

<!-- Speaker note: In Gear up the winch, one pair of gears traded speed for strength. The strongest pair in the box, 8 → 40, makes the winch 5 times stronger: it lifts 1000 g. The new brief: the same motor (**120 turns a minute**, lifts **200 g** with no gears) and drum (**0.1 m** a turn). Lift a **1500 g** bucket **1 m** in **40 s or less**. The box now has **as many** 8, 16, 24 and 40-tooth gears as you need. Two new moves: a gear **between** two others, and two gears on **one axle**. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**Put a 40-tooth gear between the 8 and the 24: 8 → 40 → 24. Compared with 8 → 24 on its own, the winch now…**

- Turns at the same speed with the same strength, but the other way round
- Turns faster, because the big gear spins it
- Turns 5 times slower and is 5 times stronger (40 ÷ 8)
- Turns 15 times slower and is 15 times stronger (5 × 3)

<!-- Speaker note: What happens: Same speed, same strength, other direction. 40 ÷ 8 × 24 ÷ 40 = 24 ÷ 8: the idler's teeth cancel out, and each mesh reverses the turn. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: take a show of hands for each option before anyone opens the board. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fmechanisms%2Ftrains%2Fstep-2&code=widget%3A+train%0Atrain%3A+8+%3E+40+%3E+24%0Achoose%3A+2%0Aload%3A+450%0Aaddload%3A+on%0Anumbers%3A+off%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/mechanisms/trains/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Same speed, same strength, other direction. 40 ÷ 8 × 24 ÷ 40 = 24 ÷ 8: the idler's teeth cancel out, and each mesh reverses the turn.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Check 8 → 24 = 8 → 40, then 16 → 40 = 8 → 24

Now 16 → 40 = 8 → 24. Stage 1 is $40 \div 16 = 2.5$. Start with the overall ratio.

$$\text{stage 1: } 24 \div 8 = 3$$

1) $\text{stage 2: } 40 \div 8 = 5$ — An 8 on the 24's axle turns with it, and drives a 40: the next stage starts small again.
2) $3 \times 5 = 15$ — Stages multiply: the second stage slows down a gear that is already 3 times slower.
3) $120 \div 15 = 8 \text{ turns a minute}$ — Slower by the overall ratio.
4) $200 \times 15 = 3000 \text{ g}$ — Stronger by the same ratio.
5) $10 \div 8 = 1.25 \text{ min} = 75 \text{ s}$ — 1 m takes 10 winch turns.
6) $3000 \ge 1500 \;\checkmark \quad 75 \le 40 \;\times$ — Strong enough, but too slow. Too much ratio costs time.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write stage 1: 24 ÷ 8 = 3 and say "The motor's 8 drives a 24: a ratio of 3, as before." Line 1: write stage 2: 40 ÷ 8 = 5 and say "An 8 on the 24's axle turns with it, and drives a 40: the next stage starts small again." Line 2: write 3 × 5 = 15 and say "Stages multiply: the second stage slows down a gear that is already 3 times slower." Line 3: write 120 ÷ 15 = 8 turns a minute and say "Slower by the overall ratio." Line 4: write 200 × 15 = 3000 g and say "Stronger by the same ratio." Line 5: write 10 ÷ 8 = 1.25 min = 75 s and say "1 m takes 10 winch turns." Line 6: write 3000 1500 ✓ 75 40 × and say "Strong enough, but too slow. Too much ratio costs time." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Check 8 → 24 = 8 → 40, then 16 → 40 = 8 → 24

**Now 16 → 40, then 8 → 24 on the same axle as the 40. What is the overall ratio?**

* Answer: 7.5

<!-- Speaker note: 40 ÷ 16 = 2.5, 24 ÷ 8 = 3, and 2.5 × 3 = 7.5. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Strength

**16 → 40 = 8 → 24: what is the heaviest bucket it can lift, in grams?**

* Answer: 1500

<!-- Speaker note: 200 × 7.5 = 1500 g: just enough. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Time and criteria

**16 → 40 = 8 → 24: how many seconds to lift the bucket 1 m?**

* Answer: 37.5

<!-- Speaker note: The winch turns 120 ÷ 7.5 = 16 times a minute. 10 turns ÷ 16 = 0.625 min = 37.5 s. It lifts 1500 g within 40 s: it passes. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Kai thinks the train lifts the 1500 g bucket. Click the line where Kai's working first goes wrong.**

```
 1  Kai's train: 8 → 24, then an 8-tooth gear on the same axle as the 24 drives a 40.
 2  Stage 1: 24 ÷ 8 = 3
 3  Stage 2: 40 ÷ 8 = 5
 4  Overall ratio = 3 + 5 = 8
 5  Heaviest lift = 200 × 8 = 1600 g, so it lifts the 1500 g bucket.
```

* Answer: line 4

<!-- Speaker note: Line 4: stage ratios multiply, they don't add. Each stage makes the next one 3 times (then 5 times) slower and stronger again: 3 × 5 = 15, so it lifts 3000 g (but takes 75 s). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: choose your train



- **Meet the brief:** 
- **Heavier still:** 
- **Why stages?:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/mechanisms/trains/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Students choose all four gears to meet the brief, then to lift a heavier load as fast as possible: the same reasoning from criteria back to ratio, now with products. The question names why compound trains exist. Hints, in order: The time limit sets the most ratio you can afford: 40 s is a ratio of 8 at most. / The load sets the least: 1500 g ÷ 200 g = 7.5. / Which two stage ratios multiply to between 7.5 and 8? Try 2.5 (16 → 40) and 3 (8 → 24). For students who need more support: Give a table with columns stage 1, stage 2, overall ratio, winch speed, heaviest lift, time, and fill the 8 → 24 = 8 → 40 row together. For early finishers: Each real mesh loses about 5% of the turning force. With two stages the train passes on about 0.95 × 0.95 ≈ 90%. Does 16 → 40 = 8 → 24 still lift 1500 g? What would you change? The hard part, on purpose: Students want to add stage ratios, and expect a big idler to do something. Keep asking 'what does the next stage start from?' and 'which teeth cancel?' When students get stuck: A student adds the stage ratios. Ask: Stage 1 turns the middle axle 3 times slower. What does stage 2 do to that? Fix: Each stage slows down what the stage before already slowed: multiply. / A student thinks a big idler makes the winch stronger. Ask: Write the two meshes as ratios. Which number appears on top and on the bottom? Fix: The idler's teeth cancel: the ratio is last ÷ first. / A student loses track of which gear drives which. Ask: Follow the turn from the motor: which gear does it push, and what turns with that gear? Fix: Meshing gears push each other; gears on one axle turn together. / A student picks the strongest train and ignores the time limit. Ask: It lifts it. Is it fast enough? Fix: Find the least ratio (load) and the most (time), then aim between. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Compound ratio

**10 → 30, then 10 → 20 on the same axle. What is the overall ratio?**

* Answer: 6

<!-- Speaker note: 30 ÷ 10 = 3, 20 ÷ 10 = 2, and 3 × 2 = 6. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Idler

**A simple train 8 → 16 → 24: the 16 is an idler. What is the ratio?**

* Answer: 3

<!-- Speaker note: Last ÷ first: 24 ÷ 8 = 3. The idler cancels out. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Direction

**Three gears in a row, each meshing with the next. The motor gear turns clockwise. Which way does the last gear turn?**

- Anticlockwise
- Clockwise
- It depends on the sizes of the gears

* Answer: Clockwise

<!-- Speaker note: Two meshes: clockwise, then anticlockwise, then clockwise again. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Speed

**Motor 120 turns a minute, train 8 → 40 = 8 → 24 (ratio 15). How many turns a minute does the winch make?**

* Answer: 8

<!-- Speaker note: 120 ÷ 15 = 8. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A clock

**A clock's hour hand turns 12 times slower than its minute hand. Its gears do this in two stages, 3 × 4. Which pairs could do it?**

- 8 → 96 in one pair, then an idler
- 8 → 24, then 8 → 40 on the same axle
- 12 → 24, then 12 → 36 on the same axle
- 8 → 24, then 10 → 40 on the same axle

* Answer: 8 → 24, then 10 → 40 on the same axle

<!-- Speaker note: 24 ÷ 8 = 3 and 40 ÷ 10 = 4: 3 × 4 = 12. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a brief only a train can meet



- **A brief for a train:** 
- **Evaluate:** Stretch: real meshes each lose about 5% of the turning force. Work out what your train can really lift, and whether it still meets your brief.

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/mechanisms/trains/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Writing a brief no single pair can meet, then meeting it, reverses the process again: students reason from the load to the least ratio, from the time to the most, then to two stages that multiply into the gap. Hints, in order: The strongest single pair is 8 → 40: ratio 5, so 1000 g at most. Your bucket must be heavier. / Each second of time limit allows a ratio of 0.2 here (40 s for a ratio of 8), so set a limit that leaves room. / Find the least ratio (load ÷ 200), the most (time limit ÷ 5), then two stages that multiply to fit between. -->

<!-- Speaker note: Teacher: compare briefs. Who has the narrowest gap between least and most ratio? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A motor turning 240 times a minute drives 10 → 30, then 10 → 40 on the same axle. How fast does the output turn, and how many times stronger is it?**

* Ratio 3 × 4 = 12, so 240 ÷ 12 = 20 turns a minute, 12 times stronger.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: levers and pulleys (planned), the same trade of distance for force. Real examples: clocks (hour and minute hands), electric screwdrivers and drills (motor to chuck), car gearboxes, bike hub gears. Code links: a short Python loop can try every train from the box against a brief; the board's Make counts them for students. -->
