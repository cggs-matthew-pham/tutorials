---
marp: true
theme: default
html: true
---

# Else and ranges

micro:bit Foundations · Decide

<!-- Speaker note: Students choose between two or more options with if, else if and else, and find that the first true question wins, so the order sets the ranges. About 50 minutes (Predict and Run 8 min · Investigate 15 min · Modify 12 min · Make 10 min · Spirit level 5 min). -->

---

## Today

**We are learning to** choose between two or more options with else and else if, and see that the first true question wins.

- I can use if … else so exactly one of two things happens.
- I can use else if to choose between three or more options.
- I can put questions in the right order so each range works.

<!-- Speaker note: Before class: Click the **+** at the bottom of an if block to add **else** (otherwise) and **else if** (another question). The micro:bit asks the questions **from the top**; the **first true one** runs and the rest are **skipped**. **else** runs only when every question above it is false. That makes ranges simple: *temperature < 15*, then *else if temperature < 25* means 15 to 24, because anything under 15 was already caught. It also makes order matter: ask *> 0* before *> 500* and the second can never run. Tilt in the simulator: move the mouse over the micro:bit. Teacher: Spirit level: fussier means smaller numbers, such as -50 and 50. -->

---

## Why it matters

> A spirit level shows whether a shelf is flat, tilted left or tilted right. One reading, three possible answers, and exactly one of them shows.

<!-- Speaker note: Last lesson the night light needed two **if** blocks: one to turn the lights on, one to turn them off. An **if … else** block does both: *if* the question is true, run the first part; *else* (otherwise), run the second. Click the **+** at the bottom of an if block to add **else** and **else if**. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/3e50420b71f4.png?v=50a4ea63ab42d2d6)

**You tilt the micro:bit a little to the left, just enough that acceleration x is -100. What shows?**

- An arrow pointing right
- Nothing
- The small square
- An arrow pointing left

<!-- Speaker note: What happens: The small square. -100 is not less than -300 and not more than 300, so neither question is true and the else part runs. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: -100 is the trap. It is negative, so many students pick the left arrow. Read the question aloud: is -100 less than -300? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The small square. -100 is not less than -300 and not more than 300, so neither question is true and the else part runs.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/microbit/microbit-else/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/microbit/microbit-else/?full=step-2#step-2)

<!-- Speaker note: Move the mouse over the micro:bit to tilt it. Try a small tilt and a big tilt, left and right. Students should be able to say: I tilted the micro:bit a little and a lot, both ways, and compared what showed with my prediction. -->

<!-- Speaker note: Teacher: small tilts show the square. That middle zone is the else. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/3e50420b71f4.png?v=50a4ea63ab42d2d6)

<!-- Speaker note: What this step is for: The questions are asked from the top. The first true one runs and the rest are skipped; else runs only when none are true. So the order of the questions decides the ranges. -->

<!-- Speaker note: Teacher: the trace pins down the edges (300 is not more than 300). Leo's tilt is the order mistake: the bigger question must be asked first. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace the tilt

**For each value of acceleration x, what shows?**

| acceleration x | shows |
|---|---|
| -500 | ? |
| 0 | ? |
| 400 | ? |
| 300 | ? |

* Answer: left arrow, small square, right arrow, small square

<!-- Speaker note: -500 is less than -300, so the first part runs. 0 and 300 fit neither question (300 is not more than 300), so else runs. 400 is more than 300. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Leo's tilt

Leo's program:

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/7b8ff79eef02.png?v=4a31889817558473)

**Leo wants a small tilt right to show a diamond and a big tilt right to show an arrow. The arrow never appears. Why?**

- The arrow block is broken
- A big tilt is also more than 0, so the first question is true and the rest are skipped
- 500 is too big to reach
- else if only works with &lt;

* Answer: A big tilt is also more than 0, so the first question is true and the rest are skipped

<!-- Speaker note: The questions are asked from the top, and the first true one wins. Any tilt over 500 is also over 0, so the diamond shows. Ask the bigger question first: > 500, then > 0. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## When does else run?

**When does the else part run?**

- Only when every question above it is false
- Always, after the other parts
- Only when the first question is true
- Never: it is for notes

* Answer: Only when every question above it is false

<!-- Speaker note:  -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **One if, not two:** This is last lesson's night light, with two ifs. Rebuild it with one **if … else**.
- **Forward and back:** Add a second **if … else if** that shows an arrow for tilting **forward** and **back** (use **acceleration y**).

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-else/?full=step-4#step-4)

<!-- Speaker note: What this step is for: else replaces the opposite question: one if … else covers both cases, with no gap. Hints, in order: Click the + on the first if block to add else. / Move clear screen into the else part, then delete the second if. / Add a new if under it, asking about acceleration y. / Tilting forward makes y go below 0 (arrow up); back makes it go above 0 (arrow down). For students who need more support: Give students the comfort meter's if … else if … else block with the questions filled in, and ask them to add the pictures and test the edges (14, 15, 24, 25). For early finishers: Make a five-zone tilt meter: big left, small left, level, small right, big right, in one if block. Order the questions so every zone works. The hard part, on purpose: The first true question wins, so the order decides the ranges. Ask them to try one value at a time and say which question is true first. When students get stuck: The else if or else part never runs. Ask: Is an earlier question true for those values too? Fix: Ask the narrower question first, or change the order of the parts. / There is no place for else. Ask: Have you found the + at the bottom of the if block? Fix: Click + to add else, and again to add else if. / Left and right look the wrong way round. Ask: Which way does x go when you tilt left? Fix: Left is below 0 and right is above 0. Check each arrow against its question. -->

<!-- Speaker note: Teacher: rebuilding the night light shows what else replaces: the opposite question, with no gap. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a **comfort meter** for a classroom, in **one** if block with three parts:

- Below **15**: cold (draw it).
- From **15** to **24**: just right (a happy face).
- **25** and above: hot (draw it).

You need only two questions. The order does the rest.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-else/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: One if block with else if and else: three parts. / Ask the lowest range first: temperature < 15, then else if temperature < 25, then else. -->

<!-- Speaker note: Teacher: two questions make three ranges. Ask students to explain why the middle needs no 'and'. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a spirit level

This spirit level points the way to tilt back to flat, and shows a tick when it is level. Make it fussier (a smaller tilt counts as not level), then make it check **forward and back** as well.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-else/?full=step-6#step-6)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**The questions are 'temperature &lt; 15', then 'else if temperature &lt; 25', then else. What shows at 20, and why?**

* The just-right picture. 20 is not less than 15, so the first part is skipped; it is less than 25, so the second part runs.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next unit: lists hold many values, such as the choices in rock paper scissors. Class ideas: a real spirit level on a classroom shelf; a comfort meter by the window with a real micro:bit for a week. -->
