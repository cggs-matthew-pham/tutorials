---
marp: true
theme: default
html: true
---

# If and else

micro:bit Foundations · Decide

<!-- Speaker note: Students use if … else to choose between two things, and see that exactly one part runs each time: the else runs only when the question is false. About 40 minutes (Predict and Run 8 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 8 min · Desk lamp 3 min). -->

---

## Today

**We are learning to** use one if … else block to choose between two things, so exactly one of them happens.

- I can use if … else to choose between two things.
- I can say when the else part runs.
- I can turn two ifs into one if … else.

<!-- Speaker note: Before class: Click the **+** at the bottom of an if block to add **else** (otherwise). If the question is true, the first part runs; if false, the else part runs. Exactly one of the two runs each time, so if … else has no gap (like two ifs that miss a value) and no overlap. **else if** (more questions in a row) is the next lesson. Teacher: Mix it up: an if with no else, from last lesson, inside a counter. -->

---

## Why it matters

> A bike light is on in the dark and off in daylight. Never both, never neither: one question decides which.

<!-- Speaker note: Last lesson the night light needed two **if** blocks: one to turn the lights on, one to turn them off. An **if … else** block does both: *if* the question is true, run the first part; *else* (otherwise), run the second. Click the **+** at the bottom of an if block to add **else**. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/714f300bb86e.png?v=b2c428d5e432f9a8)

**The light level is 20 (dark). Which parts of the if … else run, each time round forever?**

- The first part, then the else part: on, then cleared
- Only the first part: the lights come on
- Only the else part
- Neither part

<!-- Speaker note: What happens: Only the first part. 20 is less than 50, so the question is true and the lights come on. The else part runs only when the question is false. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: some students think both parts run, one after the other. Ask: what does 'otherwise' mean? Ask the 'both' group to read the block aloud with 'otherwise' in place of else. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Only the first part. 20 is less than 50, so the question is true and the lights come on. The else part runs only when the question is false.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/microbit/microbit-else/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-else/?full=step-2#step-2)

<!-- Speaker note: Drag the light slider down to dark, then back up to bright. Do the lights go off now? Students should be able to say: I dragged the light down and back up, and compared what happened with my prediction. -->

<!-- Speaker note: Teacher: dark then bright. The lights go off now, because the else part clears them. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/714f300bb86e.png?v=b2c428d5e432f9a8)

<!-- Speaker note: What this step is for: else runs exactly when the question is false, so one if … else covers both cases with no gap and no overlap. -->

<!-- Speaker note: Teacher: the trace pins down the edge: 50 is not less than 50. Kim's flicker is the belief that else always runs too. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace the light

**For each light level, what does the night light do?**

| light level | does |
|---|---|
| 20 | ? |
| 200 | ? |
| 50 | ? |
| 49 | ? |

* Answer: lights on, clears the screen, clears the screen, lights on

<!-- Speaker note: Below 50 the question is true, so the first part runs. 50 and above, it is false, so the else part runs. 50 is not less than 50. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Kim's flicker

**Kim thinks that in the dark her night light turns the lights on and then the else part clears them straight away, so it flickers. Is she right?**

- No: the else part never runs
- Yes, but only on a real micro:bit
- No: each time round, only one part runs
- Yes: the else part always runs after the if part

* Answer: No: each time round, only one part runs

<!-- Speaker note: if … else runs exactly one of its two parts. In the dark the question is true, so only the first part runs, every time round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## When does else run?

**When does the else part run?**

- Only when the question is true
- Only when the question is false
- Never: it is for notes
- Always, after the first part

* Answer: Only when the question is false

<!-- Speaker note: else means otherwise: it runs when the question is false, and only then. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Two doors <span style="font-size:.6em;color:#64748b">(3 min)</span>

Two signs on two doors: 'true' and 'else'. The teacher reads a question about each student in turn; they walk through exactly one door.

<!-- Speaker note: Nobody can go through both doors, and nobody stays behind. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **One if, not two:** This is the two-if night light. Rebuild it with one **if … else**.
- **A dim glow:** Make the else part show a small dot or square, so the light glows a little in the day.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-else/?full=step-4#step-4)

<!-- Speaker note: What this step is for: else replaces the opposite question: one if … else does the job of two ifs. Hints, in order: Click the + on the first if to add else. / Move clear screen into the else part, then delete the second if. / Swap clear screen in the else part for show icon, and choose the small square. For students who need more support: Give students the if … else already in forever with the question filled in, and ask them only to fill each part. For early finishers: Make the bike light flash in the dark (show, pause, clear, pause) and glow steadily in the day. The hard part, on purpose: Believing both parts run. Ask them to say the block aloud with 'otherwise' in place of else. When students get stuck: There is no else in the if block. Ask: Where is the + on the if block? Fix: Click the + at the bottom of the if. It adds an else part. / The lights stay on in the day. Ask: Which part clears the screen, and when does it run? Fix: Put clear screen (or the small square) in the else part. / Two ifs and an else, and the picture flickers. Ask: How many questions do you need for two choices? Fix: One question and an else. Delete the second if. -->

<!-- Speaker note: Teacher: rebuilding the night light shows what else replaces: the opposite question. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

![h:326](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/f776d197b683.png?v=0e8de4ffdbdfd5e5)

<!-- Speaker note: A counter with a prize, from earlier lessons. What this step is for: An if with no else does nothing when its question is false. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**Each press of A adds 1 to count, shows it, and shows a diamond (the prize) if count is 5. What shows straight after the 6th press?**

- Nothing
- 6
- The diamond
- 5

* Answer: 6

<!-- Speaker note: After the 6th press count is 6, which is shown. 6 is not 5, so the if does nothing: no diamond. What this step is for: An if with no else does nothing when its question is false. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a **bike light** with one **if … else**:

- When it is **dark** (light level below 50): light all the LEDs.
- **Else**: show a small square, to save the battery.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-else/?full=step-6#step-6)

<!-- Speaker note: Hints, in order: One if … else inside forever. The question is about the light level. / If it is dark (light level < 50), light all the LEDs. Else, show a small square. -->

<!-- Speaker note: Teacher: one if … else, one question. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a desk lamp

This desk lamp lights up when the room is dim. Make it switch at 120 instead, and show a moon you draw when it is on.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-else/?full=step-7#step-7)

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Test the edge <span style="font-size:.6em;color:#64748b">(3 min)</span>

Show your bike light to the next pair. Drag the light slider through 50.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**In an if … else, when does the else part run?**

* Only when the question is false. Exactly one of the two parts runs each time.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: else if, for three or more choices, where the order of the questions matters. -->
