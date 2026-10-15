---
marp: true
theme: default
html: true
---

# Triangles hold their shape

Structures · Frames and trusses

<!-- Speaker note: Students watch a square frame on pins collapse under a sideways push, brace it with one diagonal, learn the counting rule (members + 3 = 2 × joints for a pin and a roller), and brace two- and three-storey towers with the fewest members. About 40 minutes (Predict and Try 8 min · Worked example 8 min · Vary 10 min · Practise and Make 14 min). Sources: TeachEngineering: K-12 engineering design challenges (benchmark; the briefs and wording are our own), https://www.teachengineering.org/ (checked 12 October 2026). -->

---

## Today

**We are learning to** a square frame on pins folds flat when pushed sideways; a triangle can't change shape without a member stretching. Students brace frames with diagonals, use the counting rule (members = 2 × joints − 3) to find how many they need, and brace a tower with the fewest members.

- I can explain why triangles keep their shape and squares don't.
- I can use the counting rule to say how many members a frame needs.
- I can brace a frame with the fewest members.

<!-- Speaker note: Before class: Straws and pipe cleaners, or card strips and split pins: a square and a triangle side by side settle this in a minute. The counting rule m + 3 = 2j is for flat frames on a pin and a roller (three support reactions). It is necessary but not sufficient: members can be in the wrong place (two diagonals in one panel and none in another), so always test. The board finds collapse directly. Curriculum hooks: Design and Technologies, engineering principles and systems; Maths, linear relations (the rule). Teacher: Try: let students try both diagonals. Teacher: Worked example: count ways to move (2 per joint) against things that stop them (members and supports). Teacher: Vary: ask a student who added two diagonals to one panel what went wrong. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> Why are bridges, cranes and towers full of triangles, and not squares?

<!-- Speaker note: A frame on **pins** can only stay in shape if its members stop the joints moving. A **triangle** can't change shape unless a side changes length. A **square** can: it leans over into a diamond, with every side the same length. Engineers **brace** frames with **diagonals** that turn them into triangles. Here a square frame stands on a pin (A) and a roller (B); a **500 N** sideways push (the wind) acts at D. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**Each member of the square can take 5000 N. The wind pushes 500 N sideways at D. The frame…**

- Slides off the roller
- Holds easily: 500 N is small
- Breaks one member
- Folds over: it changes shape without any member stretching

<!-- Speaker note: What happens: It folds over. The members are strong enough, but a square on pins can lean without any member changing length, so nothing resists. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: hold up a square of straws and push its corner. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fstructures%2Ftriangles%2Fstep-2&code=widget%3A+truss%0Ajoint+A%3A+0%2C+0+pin%0Ajoint+B%3A+2%2C+0+roller%0Ajoint+C%3A+2%2C+2%0Ajoint+D%3A+0%2C+2%0Amember%3A+A-B%2C+B-C%2C+C-D%2C+D-A%0Aload+D%3A+500+right%0Astrength%3A+5000%0Abuckle%3A+20000%0Aedit%3A+on%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/structures/triangles/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It folds over. The members are strong enough, but a square on pins can lean without any member changing length, so nothing resists.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## The rule

$$\text{joints } j = 4,\; \text{members } m = 4$$

1) $m + 3 = 2j$ — Each joint gives 2 ways to move (sideways and up); the pin and roller hold 3 of them. Each member holds one.
2) $4 + 3 = 7 \ne 8$ — One short: the square can move one way (it leans).
3) $5 + 3 = 8 = 2 \times 4 \;\checkmark$ — Add one diagonal: rigid, with none spare.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write joints j = 4, members m = 4 and say "The square: 4 joints, 4 members." Line 1: write m + 3 = 2j and say "Each joint gives 2 ways to move (sideways and up); the pin and roller hold 3 of them. Each member holds one." Line 2: write 4 + 3 = 7 8 and say "One short: the square can move one way (it leans)." Line 3: write 5 + 3 = 8 = 2 × 4 ✓ and say "Add one diagonal: rigid, with none spare." -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The rule

**A frame has 8 joints, on a pin and a roller. How many members does it need to be rigid with none spare?**

* Answer: 13

<!-- Speaker note: 2 × 8 − 3 = 13. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Zoe thinks she needs 15 members. Click the line where her working first goes wrong.**

```
 1  Zoe's frame has 6 joints, on a pin and a roller.
 2  The rule: members + 3 = 2 × joints.
 3  So members = 2 × 6 + 3 = 15.
 4  She needs 15 members to make it rigid.
```

* Answer: line 3

<!-- Speaker note: Line 3: members + 3 = 2 × joints, so members = 2 × 6 − 3 = 9. She added 3 instead of taking it away. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: a taller tower



- **Two storeys:** 
- **Both diagonals:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/structures/triangles/?full=step-4#step-4)

<!-- Speaker note: What this step is for: The rule predicts the number before students build: two panels, two diagonals. Hints, in order: Count: 6 joints, so 2 × 6 − 3 = 9 members. You have 7. / One diagonal in each square. For students who need more support: Give the rule as a fill-in: joints ___, × 2 = ___, − 3 = ___ members. For early finishers: Take the pin and roller away and use two pins instead (four support forces). How does the counting rule change? The hard part, on purpose: Students think stronger members fix a wobbly frame. Ask whether any member changes length when the square leans. When students get stuck: A student adds members but it still collapses. Ask: Is there a square panel with no diagonal? Fix: One diagonal in every square panel. / A student adds 3 in the rule. Ask: Do supports add ways to move, or take them away? Fix: They take 3 away: members = 2 × joints − 3. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A crane arm

**A crane arm has 10 joints, on a pin and a roller. How many members does it need?**

* Answer: 17

<!-- Speaker note: 2 × 10 − 3 = 17. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Rigid?

**A frame has 7 joints and 10 members, on a pin and a roller. Is it rigid?**

- No: it needs 11
- Yes
- It has a spare member

* Answer: No: it needs 11

<!-- Speaker note: 2 × 7 − 3 = 11, so with 10 it can change shape one way. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A gate

**A wooden gate sags at the corner away from its hinges. What should you add?**

- A diagonal brace across the gate
- A third hinge on the same side
- Paint
- Thicker rails

* Answer: A diagonal brace across the gate

<!-- Speaker note: A diagonal turns the gate's rectangle into triangles, so it can't lean. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: brace a tower



- **Three storeys:** 
- **Evaluate:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/structures/triangles/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Three storeys: students use the rule to plan, then build with the fewest members. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A frame has 9 joints on a pin and a roller. How many members does it need to be rigid with none spare?**

* 2 × 9 − 3 = 15.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Design a bridge. Real examples: gates, scaffolding, electricity pylons, cranes, the Eiffel Tower. -->
