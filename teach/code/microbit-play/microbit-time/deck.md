---
marp: true
theme: default
html: true
---

# Time between

micro:bit: talk and play · Time

<!-- Speaker note: Students store the running time at one moment and take it away from a later reading, to measure how long something took. About 40 minutes (Predict and Run 8 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 8 min · Egg timer 3 min). -->

---

## Today

**We are learning to** store the running time at one moment and take it away from a later one, to measure how long something took.

- I can measure how long something took with running time.
- I can say why running time on its own is a big number.
- I can turn milliseconds into seconds.

<!-- Speaker note: Before class: **running time** (Input › more) is the number of milliseconds since the micro:bit switched on. It never restarts at a press, so on its own it is a big number. Timing is a subtraction: store running time in a variable at the start (`start`), then later show *running time − start*. 1000 ms is one second; dividing by 1000 gives seconds with a decimal. In the simulator, timings are a little longer than on a real micro:bit. Teacher: Mix it up: a random wait, from Pick from a list and the forever lesson's pause. -->

---

## Why it matters

> A stopwatch, a lap timer and a game's reaction score all do one subtraction: the time now, take away the time it started.

<!-- Speaker note: The micro:bit keeps count of time. **running time** (in **Input › more**) gives the number of **milliseconds** since the micro:bit switched on. 1000 ms is one second. On its own it is a very big number; the trick is to take one reading away from another. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:190](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ce546a0091db.png?v=7904d5a663b28b21)

**You press A when the running time is 5000, and B when it is 7500. What does B show?**

- 2500
- 5000
- 7500
- 12500

<!-- Speaker note: What happens: 2500. A stores 5000 in start. B shows running time − start: 7500 − 5000 = 2500 ms, two and a half seconds. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: some students choose 7500, the running time itself. Ask what start holds. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 2500. A stores 5000 in start. B shows running time − start: 7500 − 5000 = 2500 ms, two and a half seconds.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-time/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-time/?full=step-2#step-2)

<!-- Speaker note: Press **A**, count to three in your head, then press **B**. Is the number close to 3000? Students should be able to say: I pressed A, waited, pressed B, and compared the number with how long I waited. -->

<!-- Speaker note: Teacher: press A, count three, press B. Close to 3000? -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:190](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ce546a0091db.png?v=7904d5a663b28b21)

<!-- Speaker note: What this step is for: running time counts from when the micro:bit started, so a time between two moments is one reading taken away from another. -->

<!-- Speaker note: Teacher: Zara's stopwatch is this lesson's misconception: running time is not a stopwatch that starts at the press. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace the times

**Fill in the number B shows.**

| start (A pressed) | running time when B is pressed | B shows |
|---|---|---|
| 5200 | 5450 | ? |
| 8000 | 11000 | ? |
| 12000 | 12180 | ? |

* Answer: 250, 3000, 180

<!-- Speaker note: B shows running time minus start: how many milliseconds passed between A and B. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Zara's stopwatch

**Zara's B shows only running time, with no start taken away. She presses A, waits 2 seconds, presses B, and sees 14231. Why?**

- The micro:bit is slow
- 14231 is 2 seconds
- running time counts from when the micro:bit started, not from A
- A changed the running time

* Answer: running time counts from when the micro:bit started, not from A

<!-- Speaker note: running time never restarts at a press. It counts from switch-on, so the time between two moments is one reading minus the other. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Milliseconds to seconds

**B shows 2500. How many seconds is that?**

* Answer: 2.5

<!-- Speaker note: 1000 ms is one second, so 2500 ms is 2.5 seconds. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## The clock on the wall <span style="font-size:.6em;color:#64748b">(3 min)</span>

Read the classroom clock and write the time. In one minute, read it again. How long passed?

<!-- Speaker note: Nobody restarts the wall clock to time something: we subtract two readings. That is running time − start. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **In seconds:** Make **B** show seconds, not milliseconds.
- **Shake to start:** Make a **shake** start the stopwatch as well as **A**.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-time/?full=step-4#step-4)

<!-- Speaker note: What this step is for: The time between can be turned into seconds, and any event can be the start. Hints, in order: Drag the division block from Math into show number. / Put running time − start on the left and 1000 on the right. / Drag in on shake, with set start to running time inside. For students who need more support: Give students the make with start already set when the heart appears, and ask them only to build the subtraction in A. For early finishers: Make a lap timer: B shows the time since the last B, not since A (set start again after showing). The hard part, on purpose: Seeing why the subtraction is needed. Ask what running time was when the micro:bit started, and what it is now. When students get stuck: The time shown is huge, like 15000. Ask: Is start set before the time is shown? Fix: Set start to running time at the moment the timing begins. / The time shown is negative. Ask: Which way round is the subtraction? Fix: running time − start: the later reading first. / B shows 0 every time. Ask: Is start set in the same event that shows the time? Fix: Set start in A (or when the heart appears), and show the time in B. -->

<!-- Speaker note: Teacher: seconds by dividing; a second event can start the timing. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

![h:238](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5e8186bfa90d.png?v=3fc5950b8803389b)

<!-- Speaker note: What this step is for: pick random gives any whole number from the first to the second, so a pause can be different every time. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**B clears the screen, pauses for pick random 1000 to 4000, then shows the heart. What is the longest the heart can take to appear, in milliseconds?**

* Answer: 4000

<!-- Speaker note: pick random 1000 to 4000 can give any whole number from 1000 up to 4000, so the longest wait is 4000 ms: four seconds. What this step is for: pick random gives any whole number from the first to the second, so a pause can be different every time. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Press **B** and a heart appears after a random wait. Make **A** show how many milliseconds you took to press it.

1. When the heart appears, set `start` to **running time**.
2. When **A** is pressed, show **running time − start**.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-time/?full=step-6#step-6)

<!-- Speaker note: Hints, in order: When the heart appears, set start to running time. / In on button A pressed: show number running time − start. -->

<!-- Speaker note: Teacher: this is the heart of the reaction timer in the final challenge. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change an egg timer

This timer starts when the micro:bit switches on, and again whenever **A** is pressed. It shows a small square until 5 seconds have passed, then an alarm face. Make it a 3-minute timer (180000 ms), and choose your own pictures.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-time/?full=step-7#step-7)

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Race a friend <span style="font-size:.6em;color:#64748b">(3 min)</span>

Try the reaction make three times each with the next pair. Who is fastest?

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**start is 3000. Running time is 3750 when B is pressed. What does running time − start show, and what does it mean?**

* 750: 750 milliseconds passed between storing start and pressing B.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: a true/false variable, so an early press does not count. Class idea: time how long the class takes to go silent after the quiet signal. -->
