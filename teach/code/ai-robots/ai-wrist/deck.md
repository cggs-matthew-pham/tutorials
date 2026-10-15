---
marp: true
theme: default
html: true
---

# A wrist remote

AI robots · Drive with a model

<!-- Speaker note: Students drive the robot from a wrist micro:bit running a CreateAI movement model, so the model runs on the remote and the robot's program is unchanged. About 45 minutes (Predict and Run 8 min · On your wrist 12 min (typical) · Investigate 8 min · Modify 8 min · Make 10 min). -->

---

## Today

**We are learning to** a model can run on the remote itself. A wrist micro:bit running a CreateAI model turns its own movements into the same words the webcam sent, so the robot's program doesn't change and no computer or camera is needed.

- I can turn a micro:bit model's actions into radio commands.
- I can explain why the robot's program doesn't change when the model does.
- I can make the remote send a safe command when the model is unsure.

<!-- Speaker note: Before class: **The idea:** the robot only ever receives words (Forward, Left, Right, Stop). Any model that sends those words can drive it. Here the model runs **on a wrist micro:bit** (trained in CreateAI, needing a **V2**): on ML … start sends a word by radio. No computer, camera or bridge is needed once both micro:bits are programmed. **In the simulator:** the lesson's editor has the robot blocks and the Machine Learning blocks with practice actions; one program holds both parts and the ML panel picks the action (walking for forward, waving for left, clapping for right, still for stop). Open it full screen so the panel and the robots show. This has not yet been tried in the live editor: check before class. **With hardware:** students reuse their CreateAI skills from micro:bit and the computer: train four tilt actions with the micro:bit on the wrist (a strap or band and a battery pack), Edit in MakeCode, add radio send string and set group, and download to the V2. Every pair needs its own radio group. -->

---

## Why it matters

> Some controllers for drones and assistive devices are worn on the wrist or hand: tilt to steer, hold still to stop. The model lives in the controller, so there is no camera to point and no laptop to carry.

<!-- Speaker note: Last lesson, a model on the **computer** watched your hand through the webcam, and the bridge sent its labels to the robot. In **AI on the micro:bit** (micro:bit and the computer) you trained a model on **movements** that runs on the micro:bit itself. Put that micro:bit on your **wrist** and it can be the remote: each action it recognises becomes a radio command. In the simulator, one program holds both parts and the **ML panel** chooses the action. The practice actions stand in for the ones you will train: **walking** for push forward, **waving** for tilt left, **clapping** for tilt right, **still** for stop. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/64727c79ab25.png?v=e307d2015bb5fa25)

**You swap the webcam model for this wrist remote. What has to change in the robot's part of the program?**

- Nothing: it still receives the same words
- It needs a camera
- It needs the bridge program
- It needs the Machine Learning blocks

<!-- Speaker note: What happens: Nothing. The robot only ever sees the words Forward, Left, Right and Stop. It doesn't matter whether a webcam model or a wrist model sent them. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: some say the robot needs the ML blocks. Ask: what does the robot receive? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Nothing. The robot only ever sees the words Forward, Left, Right and Stop. It doesn't matter whether a webcam model or a wrist model sent them.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/ai-robots/ai-wrist/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/ai-robots/ai-wrist/?full=step-2#step-2)

<!-- Speaker note: Open the editor full screen. In the ML panel, choose **walking**, then **waving**, **clapping** and **still**, and watch the **other** robot. Students should be able to say: I chose walking, waving, clapping and still in the ML panel and watched the other robot follow. -->

<!-- Speaker note: Teacher: choose actions in the ML panel and watch the other robot. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/ai-robots/ai-wrist/?full=step-3#step-3](https://studio.learningwaypoints.com/tutorials/code/ai-robots/ai-wrist/?full=step-3#step-3)

<!-- Speaker note: 1. In [CreateAI](https://createai.microbit.org/), train four actions with the micro:bit on your wrist: **forward** (tip your hand forward), **left**, **right** (tip it sideways) and **still**. 2. Click **Edit in MakeCode** and add **radio send string** to each **on ML … start**, with the same words as the robot uses, and **radio set group** to match. Download it to the **V2** on your wrist. 3. Download the robot part (from the Run step) to the robot's micro:bit. Students should be able to say: I trained four tilt actions in CreateAI, added the radio blocks in Edit in MakeCode, and drove the robot from my wrist. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/64727c79ab25.png?v=e307d2015bb5fa25)

<!-- Speaker note: What this step is for: The model now runs on the remote: no camera, no computer, but the same rules apply: words must match, an unsure model needs a safe word, and the robot keeps its last mode. -->

<!-- Speaker note: Teacher: unknown sending nothing is the safety gap; holding a tilt sends once, which sets up the watchdog lesson. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Unknown

**The wrist model isn't sure of any action (unknown). What does this program send?**

- Unknown
- Forward
- Nothing, so the robot keeps doing whatever it was doing
- Stop

* Answer: Nothing, so the robot keeps doing whatever it was doing

<!-- Speaker note: There is no on ML unknown start, so nothing is sent and the robot keeps its last mode. Sending Stop for unknown is the safe choice. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Holding a tilt

**You hold your hand tipped forward for ten seconds. How many times does the wrist send Forward?**

- Several times a second
- Ten times
- Never
- Once, when the action starts

* Answer: Once, when the action starts

<!-- Speaker note: on ML start runs when the estimated action changes, so one Forward. If the radio message is lost, the robot never hears it: the next lesson's watchdog and repeated labels deal with that. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which model where

**Webcam model on the computer, or wrist model on the micro:bit: which suits each?**

Groups: Webcam model · Wrist model

Reading printed signs held up to the robot's route · Steering with no laptop nearby, outside · Recognising what an object looks like · Nothing about you is seen or sent anywhere

* Answer: Reading printed signs held up to the robot's route → Webcam model; Steering with no laptop nearby, outside → Wrist model; Recognising what an object looks like → Webcam model; Nothing about you is seen or sent anywhere → Wrist model

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Unsure means stop:** 
- **Show what you sent:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/code/ai-robots/ai-wrist/?full=step-5#step-5)

<!-- Speaker note: What this step is for: The remote's job is choosing words; showing what it sent and sending Stop for unknown make it honest and safe. Hints, in order: Add on ML start, choose unknown, and send Stop. / In each on ML start, after sending: show arrow (north, west, east), and a square for still. For students who need more support: Give the robot part complete (it is unchanged); students write only the wrist part. For early finishers: Use certainty (%) for forward to set the speed: a small tilt drives slowly, a big tilt drives fast. The hard part, on purpose: Two programs on two micro:bits that must agree on the radio group and the words. Ask them to read both sides aloud before changing either. When students get stuck: The robot doesn't respond to the wrist. Ask: Same radio group on both? Do the words match exactly? Fix: Match the group and the words (capitals included). / No ML panel in the simulator. Ask: Is the editor full screen and the simulator running? Fix: Open full screen and restart the simulator. / The real wrist model mixes up left and right. Ask: How different are the left and right samples? Did you train both hands? Fix: Add samples of each tilt, held the same way you'll use it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a **full wrist remote**: Forward, Left, Right, a **Spin** (jumping, or a flick you train) and Stop, with **unknown** sending Stop and the wrist showing each command. Add Spin to the robot's part.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/ai-robots/ai-wrist/?full=step-6#step-6)

<!-- Speaker note: Hints, in order: Wrist: one on ML start per action, each sending a word and showing what it sent; jumping sends Spin; unknown sends Stop. / Robot: in forever, one branch per word, with Spin as motor tank 60 −60, and else stop. -->

<!-- Speaker note: Teacher: Spin needs a branch on both sides: the remote's word and the robot's move. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why didn't the robot's program change when the webcam model was replaced by a wrist model?**

* The robot only receives words. As long as the new model sends the same words, the robot doesn't care where they came from.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: what the robot should do when the model is unsure or goes quiet. Real world: wearable controllers for drones and assistive devices. -->
