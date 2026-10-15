---
marp: true
theme: default
html: true
---

# Signs: some mistakes cost more

AI robots · Costly mistakes

<!-- Speaker note: Students drive a robot with printed signs read by their own model, and make it more careful where a mistake costs more (a higher threshold for Go, and Go twice in a row). About 50 minutes (Predict and Run 6 min · Read the signs 15 min (typical) · Investigate 8 min · Modify 10 min · Make 10 min). -->

---

## Today

**We are learning to** mistaking Stop for Go is worse than mistaking Left for Right, so the robot should need more confidence before a risky action than a safe one. The board asks 95% for Go and 70% for the rest; the robot also waits for Go twice in a row.

- I can explain why some mistakes by a model cost more than others.
- I can explain how a higher threshold trades speed for safety.
- I can make a robot act on a costly label only when it is sure.

<!-- Speaker note: Before class: **The idea:** a model is sometimes wrong, and not all mistakes are equal. Mistaking **Stop** for **Go** can send a robot off a table; mistaking Left for Right only wastes time. So the board here needs **95%** confidence before it sends Go and **70%** for the others (anything less is **Unsure**), and the robot adds its own caution: it drives only after hearing Go **twice in a row** (about a second, since the board repeats the label every second), while Stop acts at once. The cost of caution: a higher threshold means more Unsures, so the robot stops more often. Put the caution where mistakes are costly, not everywhere. **Materials:** the printable signs (linked in the lesson; two to an A4 page, colour if possible). Training tip: hold each sign at different distances and angles, in different light, and add a **Nothing** class (no sign) if the model guesses a sign for an empty frame. **Without robots:** the simulator's buttons stand in for the model; the board step is typical. Teacher: Read the signs: the moment Go turns into Unsure while Left still counts is the lesson. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> A self-driving car that brakes for a plastic bag is annoying. One that drives through a stop sign is dangerous. Its designers make it much more careful about some decisions than others.

<!-- Speaker note: This time the model reads **printed signs**: [print the four signs](../../../_playground-board/media/classifier/signs/print.html) (**Go**, **Left**, **Right**, **Stop**) and train a class for each, holding the sign at different distances, angles and light. The board on this page does not treat every label the same: it sends **Go** only when the model is **95%** sure, and the others at **70%**. Anything less is **Unsure**. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**The robot is near the edge of a table. Which mistake by the model is worst?**

- Seeing Go when the sign says Stop
- Seeing Stop when the sign says Go
- Seeing Left when the sign says Right
- Seeing Unsure when the sign says Left

<!-- Speaker note: What happens: Seeing Go when the sign says Stop: the robot drives off the table. The other mistakes waste time; this one breaks something. So Go should need the most confidence. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask for a reason with each answer: what breaks? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Seeing Go when the sign says Stop: the robot drives off the table. The other mistakes waste time; this one breaks something. So Go should need the most confidence.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/ai-robots/ai-signs/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/ai-robots/ai-signs/?full=step-2#step-2)

<!-- Speaker note: The robot is last lesson's, with Go in place of Forward: **A** Left, **B** Right, **A+B** Go, **logo** Stop. Without new labels, the watchdog stops it after two seconds. Students should be able to say: I drove the other robot with A, B, A+B and the logo, and let it stop by itself. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fcode%2Fai-robots%2Fai-signs%2Fstep-3&code=widget%3A+classifier%0Aclasses%3A+Go%2C+Left%2C+Right%2C+Stop%0Awebcam%3A+on%0Aserial%3A+on%0Athreshold%3A+0.7%0Athreshold+Go%3A+0.95%0Aunsure%3A+on%0Arepeat%3A+1%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/ai-robots/ai-signs/?full=step-3#step-3)

<!-- Speaker note: Show **Go** far away, tilted or half covered. Watch the label on the board: when is Go sent, and when does it say Unsure? Try the same with **Left**. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Lower

**What happens if Go also needed only 70%?**

- The robot never moves
- The model gets more accurate
- The robot moves sooner, but a Stop sign mistaken for Go now and then makes it drive on
- Nothing changes

* Answer: The robot moves sooner, but a Stop sign mistaken for Go now and then makes it drive on

<!-- Speaker note: A lower threshold sends Go more often, including the times the model is wrong. -->

<!-- Speaker note: Teacher: the sort generalises; ask for one more example from each group. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Higher everywhere

**What happens if every label needed 95%?**

- Nothing changes
- It ignores Stop
- It drives faster
- The robot is very safe but often stops (Unsure) when a sign is clear enough to a person

* Answer: The robot is very safe but often stops (Unsure) when a sign is clear enough to a person

<!-- Speaker note: Too much caution everywhere makes a robot that keeps stopping. Caution goes where mistakes are costly. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Where caution goes

**Sort each decision: should it need high confidence or is lower fine?**

Groups: High confidence · Lower is fine

A car decides the road ahead is clear · A music app guesses which song to play next · A robot decides it is safe to drive forward · A photo app suggests who might be in a picture, for you to confirm

* Answer: A car decides the road ahead is clear → High confidence; A music app guesses which song to play next → Lower is fine; A robot decides it is safe to drive forward → High confidence; A photo app suggests who might be in a picture, for you to confirm → Lower is fine

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Stop at once:** Make **Stop** act the moment it arrives, without waiting for forever: stop, red lights, a beep.
- **Go twice:** The board repeats each label every second, so "Go twice in a row" means about a second of steady Go. Make the robot wait for that before driving.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/ai-robots/ai-signs/?full=step-5#step-5)

<!-- Speaker note: What this step is for: The robot can add its own caution: act on a Stop at once, but act on Go only when it has heard it twice in a row. Hints, in order: In on radio received string, after setting the mode: if mode = Stop, then robot motor stop, set color red and play a tone. / Make a variable goCount. In on radio received string: if the word is Go, change goCount by 1, else set it to 0. / In forever, drive forward only if mode = Go and goCount ≥ 2 (Logic › and). For students who need more support: Give the goCount blocks; students only add the and in forever. For early finishers: Add a Slow sign that drives at half speed, and decide what threshold it needs. The hard part, on purpose: Accepting that some mistakes matter more, so the thresholds differ. Ask which wrong answer would be worst, and set that label's threshold first. When students get stuck: Go never gets sent. Ask: What confidence does the board show for Go? Fix: Retrain Go with more photos (closer, steadier, better light) until it passes 95%. / The robot turns the wrong way. Ask: Which way did the arrow point when you trained? Fix: Check the class names; retrain if Left and Right photos were swapped. / The robot never drives even with a clear Go. Ask: Does goCount reset only for words other than Go? Fix: Add 1 for Go, set 0 for anything else, and drive when goCount ≥ 2. -->

<!-- Speaker note: Teacher: goCount is the robot's own threshold; link it back to the board's 95%. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a **careful sign robot**: **Go** only after hearing it twice in a row, **Left** and **Right** turn, and **anything else** (Stop, Unsure, a word it doesn't know, or two seconds of silence) stops it. Lights: **green** going, **yellow** turning, **red** stopped.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/ai-robots/ai-signs/?full=step-6#step-6)

<!-- Speaker note: Hints, in order: Start from what you built: goCount, lastHeard and the watchdog. / Lights: green going, yellow turning, red stopped. Go a little slower (40) so there is time to react. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does Go need a higher threshold than Left?**

* Mistaking Stop for Go can cause a crash; mistaking Left for Right only wastes time. Costly actions need more confidence.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: the delivery robot challenge, where the robot's own sensor can overrule the model. Real world: thresholds in self-driving cars, medical screening and spam filters. -->
