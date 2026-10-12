---
marp: true
theme: default
html: true
---

# Four-bar linkages

Linkages and cams · Changing motion

<!-- Speaker note: Students turn a four-bar linkage, find that a longer crank jams, learn the rule for whether the crank can turn fully (shortest + longest ≤ the other two, with the crank shortest), design a wiper with a swing of at least 100°, and search for a linkage whose swing falls in a range. About 45 minutes (Predict and Try 10 min · Worked example 10 min · Vary 10 min · Practise and Make 15 min). Sources: TeachEngineering: K-12 engineering design challenges (benchmark; the briefs and wording are our own), https://www.teachengineering.org/ (checked 12 October 2026). -->

---

## Today

**We are learning to** four bars joined at pivots turn a crank into a rocking arm, if their lengths allow it. Students find a crank that jams, learn the rule that predicts whether it can turn all the way (shortest + longest ≤ the other two), and design a windscreen wiper with a big enough swing.

- I can name the four bars of a four-bar linkage and what each one does.
- I can use the rule to say whether a crank can turn all the way round.
- I can change bar lengths to meet a swing criterion.

<!-- Speaker note: Before class: Card strips and split pins make linkages students can feel jam. Meccano strips work too. Simplifications: rigid bars, no friction, pivots with no play, and the linkage is assembled one way up (the board keeps the coupler and rocker meeting above the frame). The rule (Grashof's condition) is about whether some bar can turn fully; which one depends on which bar is shortest. Curriculum hooks: Design and Technologies, engineering principles and systems (primary); Maths, inequalities and measurement (Years 9–10). Teacher: Try: have students find the exact longest crank, then check it with the sum. Teacher: Worked example: write the four lengths sorted on the board every time. Teacher: Vary: the shortest-frame question opens double cranks; a picture of a locomotive's coupling rods helps. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> A windscreen wiper swings back and forth, but its motor turns round and round. Four bars do it. Why can't they be any lengths you like?

<!-- Speaker note: A **linkage** is bars joined at pivots. In a **four-bar linkage**, one bar is the **frame** (the ground: it doesn't move, and holds two pivots), the **crank** turns on one pivot, the **rocker** swings on the other, and the **coupler** joins their ends. Four-bar linkages are everywhere: windscreen wipers, bike pedals and legs, oil pumps, folding chairs, excavator arms. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**The crank is 30 mm and turns all the way round. Make it 55 mm (the other bars stay the same). What happens?**

- It turns all the way, with the same swing
- It turns all the way, with a bigger swing
- It jams part of the way round
- The rocker turns all the way round too

<!-- Speaker note: What happens: It jams. With a 55 mm crank, at some angles the coupler and rocker together can't reach the crank's end, so the linkage locks. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students choose a bigger swing. Keep their reason for after the jam. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fengineering%2Flinkages%2Ffourbar%2Fstep-2&code=widget%3A+motion%0Amode%3A+linkage%0Acrank%3A+30%0Acoupler%3A+80%0Arocker%3A+60%0Aground%3A+70%0Achoose%3A+on%0Anumbers%3A+off%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/engineering/linkages/fourbar/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It jams. With a 55 mm crank, at some angles the coupler and rocker together can't reach the crank's end, so the linkage locks.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Check 30, 80, 60, 70, then 55, 80, 60, 70

$$\text{sorted: } 30, 60, 70, 80$$

1) $30 + 80 = 110$ — Add the shortest and the longest.
2) $60 + 70 = 130$ — Add the other two.
3) $110 \le 130 \;\checkmark$ — No more than the other two: one bar can go all the way round. The crank is the shortest, so it is the crank.
4) $55 + 80 = 135 > 60 + 70 = 130 \;\times$ — With a 55 mm crank: more than the other two, so no bar can go all the way round. It jams.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write sorted: 30, 60, 70, 80 and say "List the four lengths, shortest to longest." Line 1: write 30 + 80 = 110 and say "Add the shortest and the longest." Line 2: write 60 + 70 = 130 and say "Add the other two." Line 3: write 110 130 ✓ and say "No more than the other two: one bar can go all the way round. The crank is the shortest, so it is the crank." Line 4: write 55 + 80 = 135 > 60 + 70 = 130 × and say "With a 55 mm crank: more than the other two, so no bar can go all the way round. It jams." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Check 30, 80, 60, 70, then 55, 80, 60, 70

**Bars 40, 90, 60 and 70 mm (crank 40). Can the crank turn all the way?**

- Yes: 40 + 90 = 130 is no more than 60 + 70 = 130
- No: 40 + 90 is more than 60 + 70
- Yes: 40 + 60 = 100 is less than 90 + 70
- No: the coupler is too long

* Answer: Yes: 40 + 90 = 130 is no more than 60 + 70 = 130

<!-- Speaker note: Shortest + longest = 40 + 90 = 130, the other two = 130. Not more, and the crank is the shortest, so it turns (only just). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Ava thinks her crank turns all the way. Click the line where her working first goes wrong.**

```
 1  Ava's bars: crank 55, coupler 80, rocker 60, ground 70 (mm).
 2  Shortest + second shortest = 55 + 60 = 115.
 3  The other two = 80 + 70 = 150.
 4  115 is less than 150, so the crank turns all the way round.
```

* Answer: line 2

<!-- Speaker note: Line 2: add the shortest and the longest: 55 + 80 = 135. That is more than 60 + 70 = 130, so the crank jams. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: a wiper



- **A wiper:** 
- **Shortest frame:** 

[Open this step](https://tutorials.learningwaypoints.com/engineering/linkages/fourbar/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A longer crank gives a bigger swing, up to the limit the rule sets: students meet a swing criterion within the rule. Hints, in order: A longer crank swings the rocker farther. / Keep shortest + longest no more than the other two. / Try 40 mm. For students who need more support: Give a table: four lengths, sorted, shortest + longest, other two, turns fully? Fill the first row together. For early finishers: Find a linkage where the rule holds exactly (shortest + longest = the other two). What does it do at the moment it lines up, and why do engineers avoid it? The hard part, on purpose: Students add the wrong pair, or forget that the crank must be the shortest bar. Have them sort the four lengths before anything else. When students get stuck: A student adds the wrong two bars. Ask: Which is the shortest and which is the longest? Fix: Sort first, then add the ends of the list. / A student expects a longer crank always to give a bigger swing. Ask: Did it turn all the way? Fix: Only up to the limit the rule sets. / A student is lost after changing several bars. Ask: Change one bar at a time. What did that one change do? Fix: One change, one test. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Yes or no

**Bars 20, 50, 40 and 45 mm (crank 20). Can the crank turn all the way?**

- Yes
- No

* Answer: Yes

<!-- Speaker note: 20 + 50 = 70, no more than 40 + 45 = 85. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Again

**Bars 35, 100, 50 and 70 mm (crank 35). Can the crank turn all the way?**

- Yes
- No

* Answer: No

<!-- Speaker note: 35 + 100 = 135, more than 50 + 70 = 120: it jams. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A limit

**Coupler 90, rocker 70 and ground 80 mm. What is the longest crank (shorter than all of them) that still turns all the way, in mm?**

* Answer: 60

<!-- Speaker note: crank + 90 ≤ 70 + 80 = 150, so the crank can be up to 150 − 90 = 60 mm. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a wiper to a range



- **Into range:** 
- **Evaluate:** 

[Open this step](https://tutorials.learningwaypoints.com/engineering/linkages/fourbar/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Several bars may change now: students search a design space with the rule as a guide and the board as the test. Hints, in order: Start by making the crank longer: that grows the swing. / If it jams, check the rule: shortest + longest against the other two. / A shorter rocker also swings farther. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Bars 25, 75, 55 and 60 mm, with the 25 mm bar as the crank. Can the crank turn all the way? Show the sums.**

* 25 + 75 = 100, 55 + 60 = 115; 100 ≤ 115 and the crank is shortest, so yes.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: the Capstone projects (Physical computing) include a lift and a sorter where these mechanisms meet motors. Real examples: windscreen wipers, bike and leg, oil pump jacks, excavator arms, folding chairs, Theo Jansen's Strandbeest. -->
