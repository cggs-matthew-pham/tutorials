---
marp: true
theme: default
html: true
---

# When the model is unsure

AI robots · Drive with a model

<!-- Speaker note: Students make a model-driven robot safe when the model is unsure (the board sends Unsure) and when it goes quiet (a watchdog stops the robot after a few seconds of silence). About 45 minutes (Predict and Run 8 min · With your model 10 min (typical) · Investigate 8 min · Modify 8 min · Make 10 min). -->

---

## Today

**We are learning to** a robot driven by a model needs a safe action for when the model is unsure and for when it goes quiet. The board sends Unsure and repeats its label; the robot stops on Unsure, and a watchdog stops it when nothing arrives.

- I can make a robot stop when the model is unsure.
- I can make a robot stop when it hears nothing for a while (a watchdog).
- I can explain why the board repeats its label every second.

<!-- Speaker note: Before class: **The idea:** a robot driven by a model needs a **safe action** for two different problems: - **The model can't decide** (no label above 80%): the board sends **Unsure**, and the robot's else (or an Unsure branch) stops it. - **Nothing arrives** (laptop asleep, cable out, out of radio range): a **watchdog** remembers when the last message came (`lastHeard = running time`) and stops the robot when too long has passed. For the watchdog to work, a robot that is working fine must keep hearing from the board, so the board **repeats the current label every second** (a heartbeat). Without the repeat, holding Forward steadily would trip the watchdog. **Without robots:** in the simulator, A+B sends Forward once and B sends Unsure; the model step is typical. Teacher: With your model: unplugging the bridge is the most convincing moment; do it at the front. -->

---

## Why it matters

> A delivery robot loses its connection in a lift. Should it keep rolling the way it was going, or stop and wait? Safety engineers decide this before anything is built.

<!-- Speaker note: In Drive with gestures, the robot kept going when your hand left the camera (and a wrist remote only sends when its action changes). Two things fix that: - The board sends **Unsure** when no label is confident enough (it needs 80% here), so the robot can stop. - The board sends the current label **again every second**. If the robot hears **nothing** for two seconds (the laptop sleeps, the cable comes out, the robot drives out of radio range), a **watchdog** stops it. In the simulator, **A+B** sends Forward **once**, like a model that then goes quiet, and **B** sends Unsure. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ddc33dd7c8ed.png?v=1bfc3c20ade72fd6)

**You press A+B once, then nothing else. What does the other robot do?**

- Doesn't move
- Drives forward and never stops
- Drives forward for about two seconds, then stops
- Stops at once

<!-- Speaker note: What happens: About two seconds forward, then it stops. Each message resets lastHeard; when two seconds pass with no message, the watchdog sets the mode to Stop. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most say it never stops (that was last lesson). Ask: what does lastHeard remember? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* About two seconds forward, then it stops. Each message resets lastHeard; when two seconds pass with no message, the watchdog sets the mode to Stop.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/ai-robots/ai-unsure/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/ai-robots/ai-unsure/?full=step-2#step-2)

<!-- Speaker note: Press **A+B** once and count. Then press A+B and, before it stops, **B**. Students should be able to say: I pressed A+B once and saw the robot stop by itself, then pressed B to send Unsure. -->

<!-- Speaker note: Teacher: count the seconds aloud together. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fcode%2Fai-robots%2Fai-unsure%2Fstep-3&code=widget%3A+classifier%0Aclasses%3A+Forward%2C+Left%2C+Right%2C+Stop%0Awebcam%3A+on%0Aserial%3A+on%0Athreshold%3A+0.8%0Aunsure%3A+on%0Arepeat%3A+1%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/ai-robots/ai-unsure/?full=step-3#step-3)

<!-- Speaker note: Use your model from last lesson and the same bridge. Show **Forward**, then slide your hand half out of the frame. The board shows **Unsure** and sends it. Then unplug the bridge for three seconds: the robot stops by itself. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ddc33dd7c8ed.png?v=1bfc3c20ade72fd6)

<!-- Speaker note: What this step is for: Unsure covers a model that can't decide; the watchdog covers silence. Both lead to the safe action, stop, and the repeated label keeps a working robot from tripping the watchdog. -->

<!-- Speaker note: Teacher: the why repeat question is the hard one; draw a timeline of messages. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Unsure or silent

**Match each problem with what keeps the robot safe.**

| | |
|---|---|
| `The model is 55% Forward and 45% Left` | A. the board sends Unsure, and the robot stops |
| `The laptop goes to sleep` | B. else: stop |
| `The model sends a word the robot doesn't know` | C. the watchdog stops the robot after 2 seconds of silence |

* Answer: The model is 55% Forward and 45% Left → A. the board sends Unsure, and the robot stops; The laptop goes to sleep → C. the watchdog stops the robot after 2 seconds of silence; The model sends a word the robot doesn't know → B. else: stop

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why repeat

**The board stopped repeating the label every second, and only sent it when it changed. What would happen when you hold Forward steadily?**

- The watchdog never runs
- The robot stops after 2 seconds, even though you're still showing Forward
- The robot speeds up
- Nothing different

* Answer: The robot stops after 2 seconds, even though you're still showing Forward

<!-- Speaker note: The watchdog can't tell silence because nothing changed from silence because something broke. Repeating the label every second says: still here, still Forward. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why stop

**Why stop, rather than keep doing the last thing, when unsure?**

- Stopping saves battery
- The model needs the robot still to retrain
- It is the only action robots can do
- For a moving robot, stopping is the action least likely to hurt someone or break something

* Answer: For a moving robot, stopping is the action least likely to hurt someone or break something

<!-- Speaker note: A safe default depends on the machine: for a robot on wheels it is stop. (For a plane it would not be!) -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **A quicker watchdog:** 
- **Show unsure:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/code/ai-robots/ai-unsure/?full=step-5#step-5)

<!-- Speaker note: What this step is for: The watchdog's time and the Unsure action are design choices: shorter is safer but less forgiving of a slow connection. Hints, in order: Change 2000 to 1000 in the watchdog's if. / Add an else if: mode = Unsure, then robot motor stop and robot set color yellow. For students who need more support: Give the watchdog's if complete; students add only the actions inside it. For early finishers: Slow down instead of stopping when Unsure arrives once, and stop only after three Unsures in a row. The hard part, on purpose: Deciding what the robot does when the model isn't sure, and the watchdog timing. Ask what should happen when nothing has been heard for a while, before they build it. When students get stuck: The robot stops every two seconds even while the gesture is held. Ask: Is the board repeating the label (repeat: 1)? Is the robot's radio group right? Fix: Use this lesson's board; check the group. / The robot never stops after silence. Ask: Is lastHeard set in on radio received string? Is the check in forever? Fix: Set lastHeard on every message and compare in forever. / The robot beeps over and over. Ask: Does it beep only when the mode first becomes Lost? Fix: Beep only if the mode wasn't Lost already. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

This starter has **no watchdog**. Add one that, after **1.5 seconds** of silence, stops the robot, turns its lights **red** and **beeps once**. Any new label should set it going again.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/ai-robots/ai-unsure/?full=step-6#step-6)

<!-- Speaker note: Hints, in order: Remember when the last message arrived (lastHeard = running time) in on radio received string. / In forever: if running time − lastHeard > 1500, set the mode to Lost. Beep once when it first becomes Lost (only if the mode wasn't Lost already). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does a robot need both an Unsure action and a watchdog?**

* Unsure handles a model that can't decide; the watchdog handles getting no messages at all. Both make the robot stop.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: some mistakes cost more than others. Real world: dead man's switches on trains, heartbeat checks in drones and delivery robots. -->
