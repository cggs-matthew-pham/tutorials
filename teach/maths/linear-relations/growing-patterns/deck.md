---
marp: true
theme: default
html: true
---

# Growing patterns

Linear relations · Rules, tables and graphs

<!-- Speaker note: Students find the rule for a visually growing pattern from what each figure adds, use it for a figure they have not drawn, and work backwards from a count (AC9M7A05, node 1). About 45 minutes (Predict and Run 8 min · Investigate 15 min · Modify 12 min · Practise and Make 10 min). -->

---

## Today

**We are learning to** in a growing pattern, look at what each new figure adds. That gives a rule, and the rule gives any figure without drawing it.

- I can find what each figure of a growing pattern adds, and write a rule like s = 3n + 1.
- I can use a rule to work out a figure I have not drawn.
- I can work backwards from a count to the figure number.

<!-- Speaker note: Before class: Do the Run and Modify boards yourself first. The board draws what each figure adds in orange: that is the whole idea of the lesson. The rule's two numbers have meanings students can see: the number in front of n is how many each figure adds, and the number added on is what every figure has before that (the first stick, the centre dot, the starting group). The rest of the course builds on this: in y = mx + c, m is the amount added each step and c is the starting amount. The common mistake is scaling: Figure 10 = 10 × Figure 1. It fails because the parts are shared. Ben's working plants it after the method. -->

---

## Why it matters

> Tiles along a path, seats around joined tables, fence posts and rails: each one grows by the same amount every time. A rule tells you how many you need for any length.

<!-- Speaker note: A **growing pattern** is a set of figures where each one adds the same amount to the one before. Number the figures 1, 2, 3, … and call the figure number $n$. In this lesson you find a **rule** that gives the number of sticks (or dots) in figure $n$, so you can work out a figure you have not drawn. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A row of squares is made of sticks. Figure 1 (one square) has 4 sticks, Figure 2 has 7 and Figure 3 has 10. How many sticks does Figure 10 have?**

- 13
- 30
- 31
- 40

<!-- Speaker note: What happens: 31. Each new square adds 3 sticks (it shares a side with the square before), so Figure 10 has 4 + 9 × 3 = 31. Another way: 3 × 10 + 1 = 31. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: take a show of hands. 40 (10 × 4) is the common wrong answer. Do not correct it: the board settles it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fmaths%2Flinear-relations%2Fgrowing-patterns%2Fstep-2&code=widget%3A+pattern%0Ashape%3A+squares%0An%3A+1%2C+10%2C+1%0Acount%3A+on%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/maths/linear-relations/growing-patterns/?full=step-2#step-2)

<!-- Speaker note: Move through the figures with the slider or the − and + buttons. The orange sticks are the ones each figure adds. -->

<!-- Speaker note: Teacher: before moving to Figure 10, ask: what does each figure add, and why only 3? Point at the shared side. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 31. Each new square adds 3 sticks (it shares a side with the square before), so Figure 10 has 4 + 9 × 3 = 31. Another way: 3 × 10 + 1 = 31.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Finding the rule

Here is how to turn the squares pattern into a rule.

$$n: 1, 2, 3, 4 \;\to\; s: 4, 7, 10, 13$$

1) $+3 \text{ each time}$ — Each new square needs 3 more sticks: a top, a bottom and a side.
2) $3n$ — So figure $n$ has $n$ lots of 3 sticks...
3) $3n + 1$ — ...plus the first stick on the left, which every figure has.
4) $s = 3n + 1$ — The rule: sticks = 3 × figure number + 1.
5) $n = 10: \; s = 3(10) + 1 = 31$ — Use the rule for a figure you have not drawn.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write n: 1, 2, 3, 4 s: 4, 7, 10, 13 and say "Count the sticks in the first few figures and put them in a table." Line 1: write +3 each time and say "Each new square needs 3 more sticks: a top, a bottom and a side." Line 2: write 3n and say "So figure n has n lots of 3 sticks..." Line 3: write 3n + 1 and say "...plus the first stick on the left, which every figure has." Line 4: write s = 3n + 1 and say "The rule: sticks = 3 × figure number + 1." Line 5: write n = 10: s = 3(10) + 1 = 31 and say "Use the rule for a figure you have not drawn." -->

<!-- Speaker note: Teacher: model the worked example live. Build the table, circle the +3s, then say 'n lots of 3, plus the 1 on the left'. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Finding the rule

**The triangle pattern: Figure 1 has 3 sticks, Figure 2 has 5, Figure 3 has 7. Fill in the table.**

| figure n | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| sticks s | 3 | 5 | 7 | ? | ? |

* Answer: 9, 11

<!-- Speaker note: Each new triangle adds 2 sticks: 7, 9, 11. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Ben works out Figure 10 of the squares pattern. Click the line where his reasoning goes wrong.**

```
 1  Figure 1 has 4 sticks.
 2  Figure 10 has 10 squares, so it is 10 lots of Figure 1.
 3  So Figure 10 has 4 × 10 = 40 sticks.
```

* Answer: line 2

<!-- Speaker note: Line 2: the squares share sides, so Figure 10 is not 10 separate copies of Figure 1. Each new square adds only 3 sticks: 3 × 10 + 1 = 31. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Your turn

**Write a rule for the number of sticks $s$ in figure $n$ of the triangle pattern (3, 5, 7, 9, …).**

* Answer: 2n + 1

<!-- Speaker note: s = 2n + 1: each triangle adds 2 sticks, plus the 1 stick at the start. Check Figure 3: 2 × 3 + 1 = 7. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## New patterns



- **Triangles:** Each task loads a new pattern. Use the board to see what each figure adds.
- **A cross of dots:** 
- **A starting group:** 
- **Backwards:** 

[Open this step](https://tutorials.learningwaypoints.com/maths/linear-relations/growing-patterns/?full=step-4#step-4)

<!-- Speaker note: What this step is for: One change at a time: a different amount added, a pattern of dots, a different starting group, and working backwards from a count to the figure. Hints, in order: The rule is s = 3n + 1, and s is 46. / Take away the 1, then share by 3: backtracking. For students who need more support: Give squared paper or matchsticks to build Figures 1 to 4. Fill a table before writing any rule. For early finishers: A pattern of tables in a row: one table seats 4, each extra table seats 2 more people. Write the rule, then find how many tables seat 40. When students get stuck: A student multiplies Figure 1 (Ben's mistake). Ask: Build Figure 2 from Figure 1. How many sticks did you add? Fix: The new square shares a side, so it adds 3, not 4. Count the orange sticks on the board. / A student writes s = 3n and is one short. Ask: Check Figure 1 with your rule. What is missing? Fix: Every figure has something before the repeating part (the first stick). Add it on. / A student puts the count in as n when working backwards. Ask: Which number in the question is the figure, and which is the count? Fix: Write the rule with the count in: 3n + 1 = 46, then undo + 1 and × 3. -->

<!-- Speaker note: Teacher: before the backwards task, ask: is 46 the figure number or the number of sticks? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Table to rule

**A pattern has 5, 9, 13, 17 dots in Figures 1 to 4. Write a rule for the dots $s$ in figure $n$.**

* Answer: 4n + 1

<!-- Speaker note: It adds 4 each time, and Figure 1 is 4 + 1: s = 4n + 1. -->

<!-- Speaker note: Teacher: ask students to check each rule on Figure 1 and Figure 2 before answering. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A far figure

**A pattern's rule is $s = 5n + 3$. How many are in Figure 12?**

* Answer: 63

<!-- Speaker note: 5 × 12 + 3 = 60 + 3 = 63. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Backwards again

**Using $s = 2n + 1$ (the triangles), which figure has 25 sticks?**

* Answer: 12

<!-- Speaker note: 2n + 1 = 25, so 2n = 24 and n = 12. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review

**Review: solve $3n + 1 = 31$.**

* Answer: 10

<!-- Speaker note: 3n = 30, so n = 10. That is the squares pattern: Figure 10 has 31 sticks. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: design a pattern

Design your own growing pattern of dots: $a$ dots in each new column, and $b$ dots to start with. Make Figure 10 have exactly 52 dots. Is there more than one way?

Stretch: write the rule for your pattern, and say how many dots Figure 100 has.

[Open this step](https://tutorials.learningwaypoints.com/maths/linear-relations/growing-patterns/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Designing a pattern to hit a target count reverses the lesson: from the rule's numbers to the picture. Hints, in order: Figure 10 has 10 columns of a dots, plus b in the starting group: 10a + b. / Try a = 5. How many must the starting group have for 52? -->

<!-- Speaker note: Teacher: collect different designs that give 52. Is there more than one? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A pattern has 6, 11, 16 tiles in Figures 1 to 3. Write the rule and find Figure 20.**

* s = 5n + 1; Figure 20 has 101 tiles.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: tables from rules (any rule, not only patterns), then plotting the table as points, which lie on a straight line. The two numbers of a pattern rule become m and c later in the course. Where it leads in class: any repeated build (fencing, tiling, seating), and spreadsheet formulas that fill down. -->
