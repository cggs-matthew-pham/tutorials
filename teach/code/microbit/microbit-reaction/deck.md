---
marp: true
theme: default
html: true
---

# Reaction timer

micro:bit Foundations · Final challenge: Reaction timer

<!-- Speaker note: Students build a reaction game in three milestones, using events, variables, a random wait, a true/false variable, decisions and a best score. About 60 minutes (Predict, Run, Investigate 12 min · Milestone 1 10 min · Milestone 2 15 min · Milestone 3 15 min · Why random 5 min). -->

---

## Today

**We are learning to** build a reaction game that uses everything so far. Wait for the heart, press A as fast as you can, and beat your best.

- I can time something with running time and a variable.
- I can use a true/false variable to remember what is happening.
- I can combine events, variables and decisions into a game.

<!-- Speaker note: Before class: This lesson uses everything from the course, with only two new blocks: **running time** (milliseconds since the micro:bit switched on) and **true/false** values for a variable (in Logic). Timing is a subtraction: store running time when the heart appears (`start`), then at the press show *running time − start*. The milestones fade the help: Milestone 1 gives nearly all the code, Milestone 2 gives an outline, Milestone 3 gives only goals. Play it yourself first; good times are 200 to 400 ms, and the simulator adds a little delay. The core is Milestones 1 and 2; Milestone 3 and the Why random step finish the lesson for most students. Teacher: Milestone 1: two blocks. If times look huge, start was never set. Teacher: Milestone 2: waiting is true only while the heart shows. Read the A event aloud: 'if we are waiting for a press, time it; else, too early'. Teacher: Milestone 3: starting best at 99999 means any first time beats it, so no 'or' is needed. Teacher: Why random: a fixed wait can be counted, so it stops measuring reactions. -->

---

## Why it matters

> Sprinters, racing drivers and goalkeepers train their reactions with timers like this. You already know every idea it needs.

<!-- Speaker note: Press **B** to start. After a random wait, a heart appears: press **A** as fast as you can, and the micro:bit shows how many milliseconds you took. You will build it in three milestones, with less help each time. **Behind the code:** **running time** (in **Input › more**) gives the number of milliseconds since the micro:bit switched on (1000 ms is one second). Taking one running time from a later one gives how long passed in between. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:238](https://tutorials.learningwaypoints.com/_pictures/makecode/code/5e8186bfa90d.png?v=3fc5950b8803389b)

**You press B three times, waiting for the heart each time. Does the heart take the same time to appear each time?**

- The same time every time
- It never appears
- A different time each time, between 1 and 4 seconds
- It appears straight away

<!-- Speaker note: What happens: A different time each time. pick random chooses a new wait from 1000 to 4000 ms on every press. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: the random wait is what makes it a reaction game. Let students try to guess and fail. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* A different time each time. pick random chooses a new wait from 1000 to 4000 ms on every press.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/microbit/microbit-reaction/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/microbit/microbit-reaction/?full=step-2#step-2)

<!-- Speaker note: Press **B** a few times. Can you guess when the heart will appear? Students should be able to say: I pressed B several times and could not guess when the heart would come. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:286](https://tutorials.learningwaypoints.com/_pictures/makecode/code/5e40e0f8ff87.png?v=270c225625b3348c)

<!-- Speaker note: This version already times you. Read it carefully. What this step is for: A time is a variable set at one moment and compared with running time later. Without a record of whether the heart is showing, early presses get counted too. -->

<!-- Speaker note: Teacher: the trace is a subtraction. The 'too early' question sets up Milestone 2: let students find the cheat. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace the times

**start is set when the heart appears. Fill in the number shown when A is pressed.**

| start (heart appears) | running time when A is pressed | number shown |
|---|---|---|
| 5200 | 5450 | ? |
| 8000 | 8320 | ? |
| 12000 | 12180 | ? |

* Answer: 250, 320, 180

<!-- Speaker note: The number shown is running time minus start: how many milliseconds passed between the heart and the press. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Too early

**You press A before the heart appears. What happens in this version?**

- It still shows a number, as if you reacted
- It shows a cross
- Nothing
- The heart appears straight away

* Answer: It still shows a number, as if you reacted

<!-- Speaker note: A always shows running time minus start, so an early press still gets a number. A cheat! Milestone 2 fixes it. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## In Python

```python
start = 0

def on_button_pressed_b():
    global start
    basic.clear_screen()
    basic.pause(randint(1000, 4000))
    basic.show_icon(IconNames.HEART)
    start = input.running_time()
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_button_pressed_a():
    basic.show_number(input.running_time() - start)
input.on_button_pressed(Button.A, on_button_pressed_a)
```

`global start` lets the function change the `start` made outside it. Blocks do this for you.

<style scoped>pre, marp-pre { font-size: 0.57em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## In Python

**The same program in Python. Match each line with what it does.**

| | |
|---|---|
| `basic.pause(randint(1000, 4000))` | A. waits a random time, from 1 to 4 seconds |
| `start = input.running_time()` | B. stores the time the heart appeared |
| `basic.show_number(input.running_time() - start)` | C. shows how long since the heart appeared |

* Answer: basic.pause(randint(1000, 4000)) → A. waits a random time, from 1 to 4 seconds; start = input.running_time() → B. stores the time the heart appeared; basic.show_number(input.running_time() - start) → C. shows how long since the heart appeared

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 1: time the press

The variable `start` is made but never set, and **A** does nothing yet.

1. When the heart appears, set `start` to **running time**.
2. When **A** is pressed, show **running time − start**.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-reaction/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Timing is two readings of running time: one stored at the start, one taken at the press. Hints, in order: Straight after the heart: set start to running time. / In on button A pressed: show number (running time − start). The − block is in Math. For students who need more support: Pair students for Milestone 3: one reads the goals aloud while the other builds. For early finishers: Show a rating after each time: under 250 a happy face, under 400 a meh face, otherwise a sad face (if, else if, else). The hard part, on purpose: A time is a variable set at one moment and compared later, plus a flag to stop early presses. Ask when start is set and when waiting becomes true. When students get stuck: The time shown is huge, like 15000. Ask: When is start set? Fix: Set start to running time straight after the heart is shown. / Every press shows a cross. Ask: Where is waiting set to true? Fix: Set waiting to true after the heart appears (after start is set). / The best time never changes, or is always the latest time. Ask: What is best at the start, and which way round is your comparison? Fix: Start best at 99999, and use if reaction < best. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 2: no cheating

**Behind the code:** a variable can hold **true** or **false** (in **Logic**). `waiting` is true only while the heart is showing.

- At the start of **B**, set `waiting` to false.
- When the heart appears, set `waiting` to true.
- In **A**: *if* waiting, set it to false and show the time; *else* show a cross (too early).

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-reaction/?full=step-5#step-5)

<!-- Speaker note: What this step is for: A true/false variable remembers what is happening now, so each event can check it. Hints, in order: Set waiting to true just after start is set, and to false at the start of B. / In A: if waiting, set waiting to false and show the time; else show a cross. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Milestone 3: beat your best

Keep a **best time**:

- A new variable `best` remembers your fastest time.
- When you beat it, the micro:bit celebrates.
- **A+B** shows your best.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-reaction/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Combining a variable, a comparison and an event into a rule shows whether a student can put the course's ideas together. Hints, in order: Keep the time in a variable called reaction before showing it. Start best at 99999, so any first time beats it. / If reaction < best: set best to reaction, and show a happy face. A+B shows best. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Why random?

Play this version a few times. Then try to beat your times by counting instead of watching.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-reaction/?full=step-7#step-7)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A reaction game waits a random time, then shows a heart and starts timing. Pressing A shows your time only if a variable waiting is true, and waiting becomes true when the heart shows. Why is waiting needed? What would happen without it?**

* Without it, pressing A before the heart still shows a number, so players could cheat by pressing early.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Radio duel, the same game for two players over radio. Class ideas: a class reaction leaderboard on the board; does reaction time change after exercise? (a quick science investigation with real micro:bits). -->
