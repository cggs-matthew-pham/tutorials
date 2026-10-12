---
marp: true
theme: default
html: true
---

# Delivery robot

AI robots · Final challenge: Delivery robot

<!-- Speaker note: Students build a sign-driven delivery robot in three milestones; its distance sensor overrules the model, it reports back through the bridge, and it counts deliveries. About 60 minutes (Predict, Run and Investigate 12 min · Milestone 1 10 min · Milestone 2 15 min · Full system 8 min (typical) · Milestone 3 12 min). -->

---

## Today

**We are learning to** build a sign-driven delivery robot in three milestones. Its own distance sensor overrules the model, it reports back through the bridge, and it counts its deliveries.

- I can make a robot's own sensor overrule a model's label.
- I can send a robot's readings back to the computer through a bridge.
- I can explain why a safety check goes first in an if, else if chain.

<!-- Speaker note: Before class: **The challenge:** everything from AI robots plus Robotics challenges. The robot starts as the careful sign robot (Go twice, Unsure and silence stop it). The milestones add no new blocks: 1. **The sensor wins:** `if obstacle distance < 15 → stop` goes **first** in forever. The model only knows what the camera sees on the sign; the sensor knows what is in front of the robot. Jo's robot (the check last) is the mistake to watch for. 2. **Report back:** a second forever sends `dist` twice a second; `blocked 1` and `blocked 0` go once each, using a variable (the same "send once" idea as Patrol and alert). The bridge turns them into lines such as `dist:23`, which the board shows as values. 3. **Deliveries:** a Stop that arrives while going is a delivery; count it, send it back, show it. **Without robots:** every milestone works in the simulator (buttons stand in for the model; drag a box to block). The full-system step is typical. Teacher: Milestone 2: check blocked is sent once, not every loop; the board's message list shows it. Teacher: Milestone 3: let teams choose their delivery story and signs. -->

---

## Why it matters

> Delivery robots on footpaths and in hospitals follow instructions, but their own sensors always get the last word: if something is in the way, they stop, whatever they were told.

<!-- Speaker note: The challenge puts the course together. You start from your **careful sign robot** (Signs: some mistakes cost more): Go after two Gos, Left and Right turn, everything else stops, with a watchdog. Then, in three milestones with less help each time: 1. The robot's **distance sensor overrules the model**: something in the way means stop, whatever the sign says. 2. The robot **reports back** through the bridge: its distance, and when it is blocked. 3. It **counts deliveries** and makes the system yours. In the simulator, the buttons stand in for the model (A Left, B Right, A+B Go, logo Stop). Drag a box in front of a robot to block it. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/aef0dfb1fd15.png?v=f050f579f5f5bb27)

**The model reads Go (twice), and the robot sets off. A box is in its way. What happens?**

- It stops at the box
- It turns back
- It drives round the box
- It drives into the box

<!-- Speaker note: What happens: It drives into the box. The model only reads the sign; nothing in this program looks at what is in front of the robot. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most expect it to stop. Ask: which line looks at the box? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It drives into the box. The model only reads the sign; nothing in this program looks at what is in front of the robot.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/ai-robots/ai-delivery/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/ai-robots/ai-delivery/?full=step-2#step-2)

<!-- Speaker note: Press **A+B** twice on one micro:bit, then drag a box in front of the **other** robot. Students should be able to say: I sent Go twice with A+B, put a box in the robot's way, and watched it push the box. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Model or sensor

**Which part should decide each of these?**

Groups: The model (camera on the sign) · The robot's own sensor

Which way the sign says to go · Whether a box is right in front of the robot · Whether it's safe to keep driving forward this moment · Whether the delivery stop has been reached (the Stop sign)

* Answer: Which way the sign says to go → The model (camera on the sign); Whether a box is right in front of the robot → The robot's own sensor; Whether it's safe to keep driving forward this moment → The robot's own sensor; Whether the delivery stop has been reached (the Stop sign) → The model (camera on the sign)

<!-- Speaker note:  -->

<!-- Speaker note: Teacher: Jo's robot is the order mistake; trace the if, else if aloud with mode = Go. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Jo's robot

**Jo checks the distance in the last else if, after Go, Left and Right. Her robot still drives into boxes on Go. Why?**

- The watchdog stops the check
- Boxes are invisible to the sensor
- When the mode is Go, the Go branch runs first and the distance check is never reached
- The sensor is broken

* Answer: When the mode is Go, the Go branch runs first and the distance check is never reached

<!-- Speaker note: An if, else if chain runs only the first branch that matches. A check that must always win goes first. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 1: the sensor wins



[Open this step](https://tutorials.learningwaypoints.com/code/ai-robots/ai-delivery/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A safety check that overrules everything else goes first in forever. Hints, in order: Robot obstacle distance is in Robot › Sensors. / In forever, before the Go branch: if obstacle distance < 15, then stop and set red; turn the old if into else if. For students who need more support: Give milestone 1's if complete; students write the reports in milestone 2. For early finishers: Make the robot slow down (motor tank 20) between 15 and 30 cm, and stop under 15. The hard part, on purpose: Putting the sensor check first so it overrules the model. When the robot pushes boxes, ask which question in the chain is asked first. When students get stuck: The robot still pushes boxes. Ask: Where is the distance check in the if, else if chain? Fix: Make it the first if; turn the Go branch into else if. / blocked arrives over and over. Ask: What stops it being sent again next time round forever? Fix: Send only if blocked is false, then set blocked to true. / No values arrive on the board. Ask: Is the bridge connected, in the same radio group, running the bridge program? Fix: Connect the bridge and match the groups. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 2: report back

- The robot sends its **distance** by radio twice a second.
- When it stops for something, it sends **blocked 1**, once; when the way is clear, **blocked 0**, once.

The bridge passes these on to the board, where they appear as values (in_dist, in_blocked).

[Open this step](https://tutorials.learningwaypoints.com/code/ai-robots/ai-delivery/?full=step-5#step-5)

<!-- Speaker note: What this step is for: The robot can send its own readings back through the bridge, so the person at the computer sees what the robot senses, not only what the model saw. Hints, in order: A second forever: radio send value dist, obstacle distance, then pause 500. / A variable blocked (false at the start). When it stops for a box and blocked is false: radio send value blocked 1 and set blocked to true. When the way is clear again: send blocked 0 and set it to false. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fcode%2Fai-robots%2Fai-delivery%2Fstep-6&code=widget%3A+classifier%0Aclasses%3A+Go%2C+Left%2C+Right%2C+Stop%0Awebcam%3A+on%0Aserial%3A+on%0Athreshold%3A+0.7%0Athreshold+Go%3A+0.95%0Aunsure%3A+on%0Arepeat%3A+1%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/code/ai-robots/ai-delivery/?full=step-6#step-6)

<!-- Speaker note: Download milestone 2 to the robot, and the bridge program to the micro:bit on the computer. Drive with your signs and watch the robot's distance arrive. Block it with your hand. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Milestone 3: deliveries

Count **deliveries**: a Stop sign that arrives while the robot is going. Send the count back and show it when the robot is shaken. Then make it yours: a library book trolley, a lunch-order runner, a parcel robot. Change the signs, lights and sounds to suit.

[Open this step](https://tutorials.learningwaypoints.com/code/ai-robots/ai-delivery/?full=step-7#step-7)

<!-- Speaker note: What this step is for: A finished system counts what it has done and tells people, so they can trust it without watching it. Hints, in order: A delivery is a Stop sign that arrives while the robot was going (mode = Go). / Send the count with send value. Pick a short name, such as done: names are 8 characters at most, so deliveries would be cut short. -->

---

## On real robots

- **Each team needs its own radio group** for its bridge and robot.
- A real distance sensor misses thin things (chair legs) and soft things (a jumper). What else should a delivery robot check before it moves?
- Your robot trusts the model only for the sign, and its own sensor for safety. Real delivery robots do the same with many more sensors.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does the distance check go before the Go branch?**

* An if, else if chain runs only the first match; the safety check must win whatever the model says, so it goes first.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Where this leads: real robots fuse a camera model with many sensors (distance, bump, line), and safety checks always win. The Python pathway's Machine learning with Gradio trains models in code. -->
