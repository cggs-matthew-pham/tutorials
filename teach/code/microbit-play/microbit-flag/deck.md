---
marp: true
theme: default
html: true
---

# True or false

micro:bit: talk and play · Time

<!-- Speaker note: Students use a variable that holds true or false to remember what is happening now, and fix a cheat in a reaction tester. About 40 minutes (Predict and Run 6 min · Investigate 12 min · Modify 8 min · Mix it up 3 min · Make 8 min · Class vote 3 min). -->

---

## Today

**We are learning to** use a variable that holds true or false to remember what is happening now, so each event can check it.

- I can use a true/false variable to remember what is happening.
- I can check a true/false variable with if.
- I can say why it must be set back.

<!-- Speaker note: Before class: A variable can hold **true** or **false** (Logic). It remembers one yes-or-no fact, such as *is the heart showing?* Each event either **sets** it (the heart appears: true) or **asks** about it with **if**. The usual bug is forgetting to set it back, so it keeps saying true and every later press counts. `if waiting` asks "is waiting true?"; there is no need to write = true. Teacher: Mix it up: the stopwatch from last lesson, with two B presses. -->

---

## Why it matters

> A lift only opens its doors when it has stopped, and a ticket gate only lets you through once per ticket. Each one remembers a single yes-or-no fact.

<!-- Speaker note: Last lesson's reaction tester has a cheat: press **A** before the heart and you still get a time. To fix it, the micro:bit must **remember** whether the heart is showing. A variable can hold **true** or **false** (in **Logic**), and an **if** can ask about it. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:286](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5e40e0f8ff87.png?v=270c225625b3348c)

**You press B, then press A before the heart appears. What does A show?**

- A number, as if you had reacted
- The heart, straight away
- A cross for too early
- Nothing

<!-- Speaker note: What happens: A number. A always shows running time − start, so an early press still gets a time. Nothing in the program knows whether the heart is showing. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: an early press still gets a time. Let students find the cheat. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* A number. A always shows running time − start, so an early press still gets a time. Nothing in the program knows whether the heart is showing.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-flag/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-flag/?full=step-2#step-2)

<!-- Speaker note: Press **B**, then press **A** straight away, before the heart. Students should be able to say: I pressed A before the heart and saw that it still gave me a time. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/f150782369e9.png?v=33e184f5f3458521)

<!-- Speaker note: What this step is for: A true/false variable remembers what is happening now. Each event sets it or asks about it, and it must be set back, or it keeps saying true. -->

<!-- Speaker note: Teacher: the trace follows waiting through five events. Raj's bug is this lesson's misconception. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Follow waiting

**This version remembers whether the heart is showing in waiting. Fill in waiting after each event, and what A shows.**

| event | waiting after | shows |
|---|---|---|
| B pressed | false | nothing |
| A pressed too early | ? | ? |
| heart appears | ? | heart |
| A pressed | ? | ? |
| A pressed again | ? | ? |

* Answer: false, cross, true, false, the time, false, cross

<!-- Speaker note: waiting is true only from the heart until the first A. A sets it back to false, so a second press is too early again. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Raj's second press

**Raj sets waiting to true when the heart appears, but never sets it back to false. He presses A once and gets a time. What does a second press of A show?**

- The same time again
- Another time, a bigger one
- A cross
- Nothing

* Answer: Another time, a bigger one

<!-- Speaker note: waiting is still true, so the if says yes again and shows running time − start, which has grown. Set waiting to false after the first press. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## In Python

```python
def on_button_pressed_a():
    global waiting
    if waiting:
        waiting = False
        basic.show_number(input.running_time() - start)
    else:
        basic.show_icon(IconNames.NO)
input.on_button_pressed(Button.A, on_button_pressed_a)
```

`global waiting` lets the function change the `waiting` made outside it. Blocks do this for you.

**The same program in Python. Match each line with what it does.**

| | |
|---|---|
| `waiting = True` | A. remembers that the heart is showing |
| `if waiting:` | B. asks: is the heart showing? |
| `else:` | C. the heart is not showing: too early |

* Answer: waiting = True → A. remembers that the heart is showing; if waiting: → B. asks: is the heart showing?; else: → C. the heart is not showing: too early

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Hold the flag <span style="font-size:.6em;color:#64748b">(4 min)</span>

One student holds a flag up only while the heart is 'showing' (the teacher holds up a heart card). Others clap: a clap counts only if the flag is up, and the first counted clap lowers it.

<!-- Speaker note: Forget to lower the flag and every clap counts: Raj's bug. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **One button:** The variable `on` is made for you. Make **A** switch the light on when it is off, and off when it is on.
- **Is it on?:** Make a **shake** show whether the light is on.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-flag/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A true/false variable can remember any fact, such as whether a light is on, and flip it each time. Hints, in order: In on button A pressed: if on, clear the screen and set on to false. / else: show the lights and set on to true. Then delete the B event. / In on shake: if on, show a tick; else show a cross. For students who need more support: Give students the if … else in A already built, and ask them only to set waiting in the right places. For early finishers: Make the light switch remember how many times it was switched on, and show it on A+B. The hard part, on purpose: Knowing where to set it and where to ask. Ask: when does this fact become true, and when does it stop being true? When students get stuck: Every press shows a cross. Ask: Where is waiting set to true? Fix: Set waiting to true after the heart appears. / A second press still gives a time. Ask: Where is waiting set back to false? Fix: Set waiting to false inside the if, straight after the press is counted. / The if will not take waiting. Ask: Is waiting a variable from Variables? Fix: Drag the waiting variable straight into the if's hexagon slot. -->

<!-- Speaker note: Teacher: a light switch with one button: the same idea, a different fact. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

![h:190](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ce546a0091db.png?v=7904d5a663b28b21)

<!-- Speaker note: A stopwatch from last lesson. What this step is for: Each time is one running time minus the same start, until start is set again. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**A stores start; B shows running time − start. Fill in what B shows.**

| press | running time | B shows |
|---|---|---|
| A | 1000 | (start) |
| B | 1600 | ? |
| B | 2500 | ? |

* Answer: 600, 1500

<!-- Speaker note: B does not change start, so both times are measured from the A press at 1000: 600, then 1500. What this step is for: Each time is one running time minus the same start, until start is set again. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Fix the cheat. `waiting` is made for you.

- At the start of **B**, set `waiting` to false.
- When the heart appears, set `waiting` to true.
- In **A**: *if* waiting, set it to false and show the time; *else* show a cross (too early).

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-flag/?full=step-6#step-6)

<!-- Speaker note: Hints, in order: At the start of B, set waiting to false. When the heart appears, set waiting to true. / In A: if waiting, set it to false and show the time; else show a cross. -->

<!-- Speaker note: Teacher: this fixes the cheat; it is the core of the final challenge. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a class vote

Each micro:bit can vote **yes** once with **A**; after that, it shows a cross. Make **B** vote **no**, also only once (one vote each, yes or no).

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-flag/?full=step-7#step-7)

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try to cheat <span style="font-size:.6em;color:#64748b">(3 min)</span>

Swap with the next pair and try to cheat their reaction tester.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A program sets waiting to true when the heart appears, and never to false. What goes wrong?**

* Every press after the heart counts, not only the first, because waiting stays true.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: the final challenge. Build the reaction timer from scratch, then race a friend over radio. -->
