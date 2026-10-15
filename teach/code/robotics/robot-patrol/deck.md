---
marp: true
theme: default
html: true
---

# Patrol and alert

Robotics challenges · Final challenge: Showcase and Patrol

<!-- Speaker note: The assistance challenge. Students build a patrol system in three milestones (the base starts and stops the robot by radio, the robot reports blockages once, then an alert log and status lights), combining line following, distance, modes, roles and two-way radio. About 60 minutes (Predict, Run, Investigate 12 min · Milestone 1 15 min · Milestone 2 18 min · Milestone 3 12 min · Real robot 3 min (optional)). -->

---

## Today

**We are learning to** build a patrol system in three milestones, a robot and a base that talk both ways, then add an alert log and status lights.

- I can control a robot's mode from a base station by radio.
- I can make a robot report a problem once, and report when it is fixed.
- I can give a system a log and a visible status.

<!-- Speaker note: Before class: This is the assistance strand's challenge, using lessons 3 and 5 (distance and line), 6 (mode), 7 (radio commands) and 9 (roles and alert once). The key design rule: **radio handlers only change the mode**; **forever** drives the motors. A move made in a handler would be undone straight away by forever (or, like Jack's patrol, would only run once). Both micro:bits run the same program; A+B makes one the base. The base's A sends "go", B sends "stop". The robot sends "blocked" (once, using alerted) and "clear". The milestones fade the help: Milestone 1 gives three numbered steps, Milestone 2 an outline, Milestone 3 goals only. Each starter is the previous milestone's solution. Showcase and Patrol and alert together mark the course **Challenge complete**. The robots start near the line in the simulator; if one does not pick it up, drag it on. The logo needs a micro:bit V2 (shake works on V1). Teacher: Milestone 1: three steps on the board: send a word, set the mode, act on the mode. Teacher: Milestone 2: the alerted pattern from lesson 9, now with 'clear' too. Test by blocking and unblocking the patrolling robot. Teacher: Milestone 3: a log and status lights. Let groups choose a setting (hospital, farm, warehouse) and rename messages. Teacher: Real robot (optional): one bare micro:bit as the base per team, each team its own radio group. -->

---

## Why it matters

> Hospitals use robots to carry medicines along set routes, and farms use them to check fences. A person starts and stops them from a base and hears from them only when something is wrong.

<!-- Speaker note: The assistance challenge puts the course together in a **patrol system**. A robot follows the line (lesson 5) and stops when blocked (lesson 3). A **base** station starts and stops it by radio (lesson 7), and the robot reports problems back once (lesson 9). The robot remembers its job in a **mode** variable (lesson 6). You will build it in three milestones, with less help each time. As in lesson 9, both micro:bits run the same program: press **A+B** to make one of them the base. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/216a997e270a.png?v=5da525209750f612)

**This is where the patrol starts: a robot on its own. You drag a box onto the line in front of it, then drag it away. What happens?**

- It follows the line straight into the box
- It stops at the box, then carries on along the line once the box is gone
- It drives round the box
- It stops at the box and never moves again

<!-- Speaker note: What happens: It stops, then carries on. forever asks about the distance first; while the box is close it stops, and once the way is clear, followLine takes over again. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: a recap of lessons 3 and 5. Make sure everyone can block and unblock the robot. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It stops, then carries on. forever asks about the distance first; while the box is close it stops, and once the way is clear, followLine takes over again.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/robotics/robot-patrol/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/robotics/robot-patrol/?full=step-2#step-2)

<!-- Speaker note: Drag a box onto the line in front of the robot, wait, then drag it away. Students should be able to say: I blocked the robot with a box, moved the box away, and watched it carry on. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/216a997e270a.png?v=5da525209750f612)

<!-- Speaker note: What this step is for: In a two-way system each side has its own jobs. Radio handlers only change what the robot remembers (its mode); forever does the driving. -->

<!-- Speaker note: Teacher: the sort shows the system's two halves. Jack's patrol is the run-once slip in a new place: a handler runs once per message. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Who does what?

**In the full patrol system, which jobs belong to the robot, and which to the base?**

Groups: Robot · Base

Follow the line · Send 'go' and 'stop' · Notice something in the way · Beep and show an X when told of a problem · Send 'blocked' once

* Answer: Follow the line → Robot; Send 'go' and 'stop' → Base; Notice something in the way → Robot; Beep and show an X when told of a problem → Base; Send 'blocked' once → Robot

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Jack's patrol

Jack's robot, when it hears a message:

![h:224](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/57023115db0a.png?v=d78b05e112192839)

**Jack's robot only twitches when the base sends 'go': it moves for a moment, then stops. Why?**

- He needs a bigger speed
- 'go' is the wrong word
- The radio is too weak
- He follows the line inside the radio handler, which runs once per message; nothing keeps the robot patrolling

* Answer: He follows the line inside the radio handler, which runs once per message; nothing keeps the robot patrolling

<!-- Speaker note: A radio handler runs once, when the message arrives, so followLine runs once. The handler should only set mode to patrol; forever then calls followLine again and again. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 1: start and stop from the base

The robot follows the line from the moment it starts. Put the base in charge:

1. On the base, **A** sends **"go"** and **B** sends **"stop"**.
2. When a robot hears a message, it sets its **mode**: "patrol" for go, "stop" for stop. It starts in "stop".
3. In **forever**, the robot follows the line only when its mode is "patrol"; otherwise it stops.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/robotics/robot-patrol/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A message changes the mode; forever does the job for the mode. Hints, in order: On the base: A sends the word go, B sends stop (send string, in Radio). / on radio received receivedString: if role = robot, then set mode to patrol for go, or stop for stop. Set mode to stop in on start. / In forever, inside the robot's if: if mode = patrol, follow the line; else, robot motor stop. For students who need more support: Pair students for Milestone 2: one builds the robot side, one the base side, then they agree the words. For early finishers: Add a 'home' command: the base's logo sends 'home' and the robot turns round (a 'turn' mode that spins for 1.2 seconds, then goes back to patrol). The hard part, on purpose: Each side has its own job, and radio handlers only set the mode. Ask which part of the program drives the motors. When students get stuck: The robot never moves after 'go'. Ask: What is the robot's role? Does forever check the mode? Fix: Only the robot's micro:bit sets mode; forever follows the line when mode = patrol. Press A on the base, not the robot. / The base beeps again and again. Ask: Is 'blocked' sent only if not alerted? Fix: Send it inside if not alerted, then set alerted to true. / The base and robot both react to the same message. Ask: Does on radio received check the role? Fix: Robot jobs inside if role = robot; base jobs inside else if role = base. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 2: report back

Make the robot report problems:

- While patrolling, if something is in the way, the robot **stops** and sends **"blocked"**, once.
- When the way is clear again, it sends **"clear"**, once, and carries on.
- The base shows an **X** and beeps for blocked, and a **tick** for clear.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/robotics/robot-patrol/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Two-way radio needs a few agreed words, each sent once, with each side knowing what they mean. Hints, in order: While patrolling: if the distance is less than 15, stop, and send 'blocked' if not alerted (then set alerted to true). Else send 'clear' if alerted, set alerted to false, and follow the line. / On the base, in on radio received: else if role = base, show an X and beep for 'blocked', and a tick for 'clear'. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Milestone 3: a log and status lights

Finish the system:

- The base keeps a **log**: it counts the alerts and shows the count when its **logo** is touched.
- The robot shows its status in its lights: **green** while patrolling, **red** when blocked, **off** when stopped.

Then make it yours: a hospital delivery robot, a fence checker or a warehouse patrol. Change the messages and pictures to suit.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/robotics/robot-patrol/?full=step-6#step-6)

<!-- Speaker note: What this step is for: A finished system tells people what is happening: a log of what went wrong, and a status you can see from across the room. Hints, in order: A variable alerts on the base: change by 1 for each 'blocked'. The logo shows it. / robot set color in three places: green while patrolling, red when blocked, off when stopped. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## On a real robot

Set up a tape loop and put a bare micro:bit with a person as the base (press A+B on it). Things to notice:

- Every patrol team needs its own radio group.
- A real robot stops at people's feet too: that is a feature, not a bug.
- If the robot goes out of radio range its messages are lost. What should a real patrol robot do then? (Real ones store them and send them later.)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does the robot's radio handler set the mode instead of driving the motors?**

* A handler runs once per message, and forever keeps driving the motors. Setting the mode lets forever do the job again and again until the mode changes.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Real-world links: hospital delivery robots, farm fence checkers, warehouse robots, pipeline inspection. Discussion: what should the robot do when it cannot reach the base? -->
