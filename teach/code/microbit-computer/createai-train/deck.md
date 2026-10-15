---
marp: true
theme: default
html: true
---

# Train movements

micro:bit and the computer · AI on the micro:bit

<!-- Speaker note: Students see movements as data (x, y and z over time), train an activity model in micro:bit CreateAI, and improve it until it works for someone who didn't train it. About 50 minutes (Predict and Run 8 min · Walk and run 5 min (typical) · Train 15 min · Investigate 7 min · Improve 10 min · Make 5 min). -->

---

## Today

**We are learning to** a movement is a short recording of x, y and z acceleration. micro:bit CreateAI learns the shape of those recordings from your samples, so it tells movements apart by how they move, and the model then runs on the micro:bit itself.

- I can describe a movement as data: x, y and z acceleration over time.
- I can train and test a movement model in CreateAI.
- I can improve a model by adding samples from other people and ways of moving.

<!-- Speaker note: Before class: **The idea:** a movement is a short recording of the accelerometer's **x, y and z** readings. CreateAI's model learns the patterns in the samples it is given (a sample is about a second), so the lessons from the recycling sorter carry over: the model knows only its examples, and variety (other people, other ways of holding it) is the fix. The new part is **where the model runs**: on the micro:bit itself, with no camera, computer or connection. **CreateAI** ([createai.microbit.org](https://createai.microbit.org/)) is free and needs no account. In **Chrome or Edge** it connects by **Bluetooth** with one micro:bit, or by **radio** through a second micro:bit on a USB data cable if the computer has no Web Bluetooth. iPads and Android tablets use the CreateAI app. Any micro:bit can collect data and train; running the model on the micro:bit (next lesson) needs a **V2**. School device policies can block Web Bluetooth or WebUSB: test one device before class. **Without micro:bits:** the logger runs in the simulator (tilt it and use Show data), but training needs real micro:bits; run the CreateAI steps as a demonstration. Teacher: Walk and run: put two students' graphs side by side. Teacher: Train: three samples each is the minimum; more, varied samples are better. Teacher: Improve: the partner test is the recycling sorter's messy bench again. -->

---

## Why it matters

> A smartwatch counts your steps and knows when you start running, without a camera and without sending anything to a computer. A small model on the watch reads its motion sensor.

<!-- Speaker note: In Teachable Machine the model learned from **photos** and ran on the **computer**. In **micro:bit CreateAI** it learns from **movements**, measured by the micro:bit's motion sensor (the **accelerometer**), and the finished model runs **on the micro:bit**. **You need:** a micro:bit (a **V2** to run the model on the micro:bit later), a battery pack, and **Chrome or Edge**. CreateAI connects by Bluetooth, or by radio through a second micro:bit plugged into the computer; it shows you which. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**You train four actions: still, walking, running and jumping, with the micro:bit on your wrist. Which two will the model mix up most?**

- Jumping and still
- Walking and running
- Still and jumping
- Still and running

<!-- Speaker note: What happens: Walking and running. Both are a steady swing of the arm, again and again; running is faster and bigger. The model has to learn that difference from your samples, while still and jumping look nothing alike. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most get walking and running. Ask: what is different about them? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Walking and running. Both are a steady swing of the arm, again and again; running is faster and bigger. The model has to learn that difference from your samples, while still and jumping look nothing alike.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/microbit-computer/createai-train/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/microbit-computer/createai-train/?full=step-2#step-2)

<!-- Speaker note: This logger sends **x**, **y** and **z** acceleration 20 times a second. Run it, open **Show data**, and tilt the simulated micro:bit with the mouse. Each movement is a pattern in three lines. Students should be able to say: I tilted the simulated micro:bit and watched x, y and z change under Show data. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fcode%2Fmicrobit-computer%2Fcreateai-train%2Fstep-3&code=widget%3A+serial%0Aplot%3A+x%2C+y%2C+z%0Awindow%3A+5%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/microbit-computer/createai-train/?full=step-3#step-3)

<!-- Speaker note: Hold the micro:bit (still plugged in) at your side. Walk on the spot for five seconds, then run on the spot. Compare the waves. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/microbit-computer/createai-train/?full=step-4#step-4](https://studio.learningwaypoints.com/tutorials/code/microbit-computer/createai-train/?full=step-4#step-4)

<!-- Speaker note: 1. Open [micro:bit CreateAI](https://createai.microbit.org/) and start a new session. Follow its steps to connect your micro:bit; put it in the battery pack on your wrist or in your hand. 2. Make four actions: **still**, **walking**, **running** and **jumping**. Record **at least three samples** of each (a sample is one second of movement). 3. Click **Train model**, then test it: the testing page shows the action it estimates and how sure it is. Students should be able to say: I trained still, walking, running and jumping in CreateAI, with at least three samples each, and tested the model. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A sample

**What does CreateAI record in one sample?**

- A video of you moving
- Your heart rate
- One reading of x, y and z
- About a second of x, y and z acceleration readings

* Answer: About a second of x, y and z acceleration readings

<!-- Speaker note: A movement happens over time, so a sample is a short recording of all three directions, like the waves on the board. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A friend's run

**Your model knows your running. A friend runs with the micro:bit held differently, and it says walking. What is the fix?**

- Add running samples from other people and other ways of holding it
- Rename the actions
- Record more of your own running
- Train for longer

* Answer: Add running samples from other people and other ways of holding it

<!-- Speaker note: Same idea as the recycling sorter: the model only knows the examples it was given. Add the variety it is missing. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Where it runs

**The Teachable Machine sorter ran on the computer. This model runs on the micro:bit. Which is true?**

- It only works while CreateAI is open
- It still needs the computer to think
- Once downloaded, it works on battery power with no computer, camera or connection
- It sends your movements to the internet

* Answer: Once downloaded, it works on battery power with no computer, camera or connection

<!-- Speaker note: The model is copied into the micro:bit's program. A V2 runs it by itself, like the model in a smartwatch. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Improve the model



- **Partner test:** Swap micro:bits with a partner. Test each other's models: do each action three times. Add samples of the actions it got wrong (yours and theirs), retrain, and t
- **Not quite still:** Real "still" includes fidgeting and shifting your weight. Record still samples that include those.

<!-- Speaker note: What this step is for: Testing on someone who didn't train it, and adding what they do differently, makes the model work for more people. For students who need more support: Train in pairs: one moves, one records. For early finishers: Add a fifth action (such as star jumps) and find which existing action it gets confused with. The hard part, on purpose: Collecting enough varied samples per action. When everything is recognised as one action, ask how many samples each has and how different they are. When students get stuck: CreateAI can't find the micro:bit. Ask: Is it Chrome or Edge? Is the battery pack on? Does the computer have Bluetooth? Fix: Follow CreateAI's connection steps; use the radio route with a second micro:bit if Bluetooth is blocked. / Everything is recognised as one action. Ask: How many samples does each action have, and how different are they? Fix: Add samples so each action has a similar number, with clear movements. / Standing still is called walking. Ask: What did your still samples look like? Fix: Record still with small fidgets and shifts. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Finish an **activity model** that recognises still, walking, running and jumping for **someone who didn't train it**: three times in a row for each action. Keep the CreateAI session open (or save it): next lesson you code with it.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does the model mix up walking and running more than still and jumping?**

* Walking and running make similar patterns (a repeated swing) that differ only in speed and size; still and jumping look completely different.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: code with the model, using the Machine Learning blocks. Real world: fitness trackers, fall detection for older people, gesture controls in game controllers. -->
