---
marp: true
theme: default
html: true
---

# Solving by backtracking

Algebra Foundations · Equations

<!-- Speaker note: Students solve one- and two-step equations by backtracking, undoing each step of a function machine in reverse order and checking forwards (AC9M7A03, node 2). About 45 minutes (Predict and Run 8 min · Investigate 12 min · Modify 12 min · Practise 8 min · Make 5 min). -->

---

## Today

**We are learning to** undo what was done to x, last step first, to find the number you started with.

- I can solve a two-step equation by backtracking.
- I can name the step that undoes another (the inverse operation).
- I can undo steps in the right order, last step first, and check my answer forwards.

<!-- Speaker note: Before class: This is a **hinge** lesson: the next lesson's balance method needs the same idea of order. Students who undo steps in the wrong order here will set up every later equation wrongly, so watch for it. Try the last Modify machine yourself ($3(x + 4) = 27$). It adds first and multiplies last, so the first undo is $\div\,3$. That surprises students who always "take away the number first". Teacher: Mia's mistake is the most common error. Ask: what did the machine do last? That is the first thing to undo. -->

---

## Why it matters

> Retracing your steps to find a lost key is backtracking: you undo your route, most recent first. Equations work the same way.

<!-- Speaker note: An equation like $2x + 3 = 11$ is a machine: $x$ goes in, gets multiplied by 2, then 3 is added, and 11 comes out. **Backtracking** runs the machine backwards to find $x$. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**I think of a number. I multiply it by 2, then add 3, and I get 11. What was my number?**

<!-- Speaker note: What happens: 4. Take away the 3 first (11 − 3 = 8), then halve (8 ÷ 2 = 4). Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: take a few answers and ask how each student got there. Someone will describe undoing; name it 'backtracking'. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fmaths%2Falgebra%2Fbacktracking%2Fstep-2&code=widget%3A+machine%0Aops%3A+%C3%97+2%2C+%2B+3%0Aoutput%3A+11%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/maths/algebra/backtracking/?full=step-2#step-2)

<!-- Speaker note: Start from the output, 11. Choose an operation and a number that **undoes** the last step, then keep going back towards $x$. -->

<!-- Speaker note: Teacher: the machine only accepts the step that undoes the last arrow. Wrong steps get a nudge, not the answer. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 4. Take away the 3 first (11 − 3 = 8), then halve (8 ÷ 2 = 4).

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Opposites

To undo a step, do the opposite.

$$3x + 7 = 19$$

1) $19 - 7 = 12$ — Undo the last step first: $+\,7$ is undone by $-\,7$.
2) $12 \div 3 = 4$ — Then undo $\times\,3$ with $\div\,3$.
3) $x = 4$ — That is the number that went in.
4) $3(4) + 7 = 19 \checkmark$ — Check by running the machine forwards.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write 3x + 7 = 19 and say "The machine multiplies x by 3, then adds 7, and gives 19." Line 1: write 19 - 7 = 12 and say "Undo the last step first: +7 is undone by -7." Line 2: write 12 ÷ 3 = 4 and say "Then undo ×3 with ÷3." Line 3: write x = 4 and say "That is the number that went in." Line 4: write 3(4) + 7 = 19 ✓ and say "Check by running the machine forwards." -->

<!-- Speaker note: Teacher: before the worked example, ask the class for the opposite of each step (the matching task). Then reveal the example one line at a time. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Opposites

**Match each step with the step that undoes it.**

| | |
|---|---|
| `+ 7` | A. ÷ 3 |
| `× 3` | B. × 2 |
| `− 4` | C. + 4 |
| `÷ 2` | D. − 7 |

* Answer: + 7 → D. − 7; × 3 → A. ÷ 3; − 4 → C. + 4; ÷ 2 → B. × 2

<!-- Speaker note: Adding and subtracting undo each other. Multiplying and dividing undo each other. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Backtrack it

**Backtrack $5x - 4 = 21$. The machine multiplies by 5, then takes away 4. Write each undo step (such as + 2 or ÷ 3) and the value it gives.**

| step | undo | value |
|---|---|---|
| start | – | 21 |
| 1 | ? | ? |
| 2 | ? | ? |

* Answer: + 4, 25, ÷ 5, 5

<!-- Speaker note: 21 + 4 = 25 undoes the − 4. Then 25 ÷ 5 = 5 undoes the × 5. Check: 5 × 5 − 4 = 21. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Mia backtracks $2x + 3 = 11$, but her check fails. Click the first line that goes wrong.**

```
 1  2x + 3 = 11
 2  11 ÷ 2 = 5.5
 3  5.5 − 3 = 2.5
 4  x = 2.5
 5  Check: 2 × 2.5 + 3 = 8, not 11
```

* Answer: line 2

<!-- Speaker note: Line 2: Mia undid the × 2 first. The machine added 3 last, so that is undone first: 11 − 3 = 8, then 8 ÷ 2 = 4. Check: 2 × 4 + 3 = 11. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## New machines



- **One step:** Each task loads a new machine. Undo every step to find $x$.
- **Taking away:** The machine takes away last this time.
- **Dividing:** This machine divides first.
- **Adding first:** This machine adds 4 **before** it multiplies by 3. As an equation that is $3(x + 4) = 27$: the brackets show the adding happens first.

[Open this step](https://tutorials.learningwaypoints.com/maths/algebra/backtracking/?full=step-4#step-4)

<!-- Speaker note: What this step is for: The order of the machine decides the order of undoing, including when the machine adds before it multiplies (brackets). Hints, in order: The machine took 5 away last. What undoes taking away? / The machine divided by 3 first, so that is the last thing to undo. / This machine adds first and multiplies last. / Undo the × 3 first. For students who need more support: Write the machine as arrows on paper (x → × 2 → + 3 → 11), then draw the backwards arrows underneath with the opposite steps before calculating. For early finishers: Make a three-step machine, such as × 2, + 5, × 3, and write its equation with brackets. Swap with a partner and backtrack each other's. When students get stuck: A student divides first in 2x + 3 = 11 and gets 2.5. Ask: What did the machine do last? What undoes that? Fix: Undo the + 3 first (11 − 3 = 8), then the × 2 (8 ÷ 2 = 4). Check forwards. / A student undoes − 5 by taking away 5 again. Ask: If I take 5 away and want it back, what do I do? Fix: The opposite of taking away is adding: 9 + 5 = 14. / A student stops after one step on a two-step equation. Ask: Is that the number that went in, or a number partway through the machine? Fix: Draw the machine with a box between the steps; keep undoing until you reach x. -->

<!-- Speaker note: Teacher: the brackets task is the point. Ask students to say the machine's order aloud before undoing anything. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two steps

**Solve $4x + 5 = 33$.**

* Answer: 7

<!-- Speaker note: 33 − 5 = 28, then 28 ÷ 4 = 7. Check: 4 × 7 + 5 = 33. -->

<!-- Speaker note: Teacher: insist on the forwards check every time. It catches the order mistake on its own. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## With a fraction

**Solve $\frac{x}{2} - 3 = 4$.**

* Answer: 14

<!-- Speaker note: 4 + 3 = 7, then 7 × 2 = 14. Check: 14 ÷ 2 − 3 = 4. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Taking away

**Solve $6x - 8 = 34$.**

* Answer: 7

<!-- Speaker note: 34 + 8 = 42, then 42 ÷ 6 = 7. Check: 6 × 7 − 8 = 34. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your own machine

Make a machine a friend could backtrack. Run 6 through your two steps, then write the equation.

Stretch: make one where the machine adds first, so your equation needs brackets.

<!-- Speaker note: What this step is for: Building a machine from its input shows that backtracking and running forwards are the same steps in reverse. Hints, in order: Start with 6 and choose two steps, such as × 3 then + 2. / Run 6 through them: 6 × 3 = 18, 18 + 2 = 20. So 3x + 2 = 20. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Solve 5x + 6 = 41 by backtracking. Show each step and check your answer.**

* 41 − 6 = 35, then 35 ÷ 5 = 7. Check: 5 × 7 + 6 = 41.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: the balance method, which does the same undoing to both sides of an equation, and still works when $x$ is on both sides (where backtracking cannot). Where it leads in class: "think of a number" puzzles, and working back from a total, such as the price before a fee was added. -->
