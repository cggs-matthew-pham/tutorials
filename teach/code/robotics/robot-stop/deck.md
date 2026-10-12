---
marp: true
theme: default
html: true
---

# Stop before you crash

Robotics challenges · Sense

<!-- Speaker note: Students read the robot's distance sensor inside forever and stop before an obstacle, then build a parking robot that slows down as things get closer. About 45 minutes (Predict and Run 8 min · Investigate 10 min · Modify 8 min · Make 12 min · Real robot 7 min (optional)). -->

---

## Today

**We are learning to** read the robot's distance sensor again and again, and stop before it hits something.

- I can read the robot's distance sensor as a number in centimetres.
- I can make the robot stop when something is closer than a distance I choose.
- I can explain why the sensor must be read again and again.

<!-- Speaker note: Before class: The robot's **distance sensor** (ultrasonic) times an echo and reports how far away the nearest object is, in centimetres, up to **40**. With nothing in range it reports 40. In blocks this is **robot obstacle distance (cm)**, in the **Robot** drawer. The idea is the same as the micro:bit sensors lessons: a sensor is a number the world keeps changing, so the program must read it again in **forever** to follow it. Here the stakes are visible: read it once and the robot crashes. Every program starts with a block that picks the robot (**Elecfreaks Cutebot** here). Schools with another supported robot (DFRobot Maqueen, Yahboom Tiny:bit and others in the robot extension) change only that block; everything else is the same. **robot motor tank** sets the left and right wheel speeds (−100 to 100). The simulator has one arena: a looping line and some boxes. Students drag the boxes and the robot with the mouse. The robot does not stop instantly: it slows over a short distance, like a car, which is why the stop distance is 15 cm, not 1. Teacher: Real robot (optional): this is where tuning happens. Expect different stop distances on carpet and desks. -->

---

## Why it matters

> A car's parking sensor beeps faster as you back towards a wall, and a robot vacuum turns before it bumps the couch. Both measure how far away things are, many times a second.

<!-- Speaker note: This robot has a **distance sensor** on its front. It sends out a sound too high for people to hear and times the echo, so it can tell how many centimetres away the nearest object is (up to 40). In blocks, **robot obstacle distance (cm)** gives that number. You find it in **Robot**. In the simulator, the robot drives around a small arena with a looping track and some boxes. You can **drag the robot** and **drag the boxes** with the mouse. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:216](https://tutorials.learningwaypoints.com/_pictures/makecode/code/c611a4d71605.png?v=38416a4285f35650)

**A box is in front of the robot. What happens when the program runs?**

- The robot crashes into the box, because it only checks the distance once
- The robot drives up to the box, then backs away
- The robot drives forward and stops a little before the box
- The robot stops straight away, without moving

<!-- Speaker note: What happens: It drives forward and stops a little before the box. forever reads the distance again and again, so the moment it drops below 15 cm, the robot stops. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most say it stops before the box. A few pick 'crashes because it checks once': ask them to hold that thought for Mia's robot. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It drives forward and stops a little before the box. forever reads the distance again and again, so the moment it drops below 15 cm, the robot stops.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/robotics/robot-stop/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/robotics/robot-stop/?full=step-2#step-2)

<!-- Speaker note: The robot simulator appears beside the micro:bit. Drag a box into the robot's path (or drag the robot so it faces a box), then restart the simulator. Watch the blue wave: that is the sensor's beam. Students should be able to say: I dragged a box in front of the robot, watched what happened, and compared it with my prediction. -->

<!-- Speaker note: Teacher: students must drag a box into the robot's path first. If the robot drives off, drag it back and face it at a box. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:278](https://tutorials.learningwaypoints.com/_pictures/makecode/code/fc6c4f678136.png?v=b6c5947fe7a78a6c)

<!-- Speaker note: This version also shows an **X** when it stops, so you can see the moment the question became true. What this step is for: The robot only knows how far away something is when the program reads the sensor. Reading it in forever, many times a second, lets it react in time. -->

<!-- Speaker note: Teacher: Mia's robot is the run-once mistake from micro:bit Foundations, in a place where it matters. Ask: when did Mia's program check the distance? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What does it read?

**With nothing in front of the robot, what does obstacle distance give?**

- 0
- Nothing: the block stops working
- A random number
- 40, the farthest the sensor can measure

* Answer: 40, the farthest the sensor can measure

<!-- Speaker note: The sensor can measure up to 40 cm. With nothing in range, the robot reports 40, so 'distance < 15' is false and it keeps driving. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why 15?

**Why stop at 15 cm instead of 1 cm?**

- The sensor cannot measure 1 cm
- 1 cm would make the robot reverse
- The robot keeps rolling a little after it is told to stop, so it needs room
- 15 is the robot's top speed

* Answer: The robot keeps rolling a little after it is told to stop, so it needs room

<!-- Speaker note: Like a car, the robot slows down over a short distance after it is told to stop. Stopping early leaves room. Faster robots need more room. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mia's robot

Mia's program:

![h:312](https://tutorials.learningwaypoints.com/_pictures/makecode/code/71704a87b6d5.png?v=b8b799fb0c009ca7)

**Mia's robot crashes into every box. Which part is wrong?**

- motor stop is the wrong block
- 15 should be 50
- The if is not inside forever, so the distance is checked once, at the very start
- The speed is too high

* Answer: The if is not inside forever, so the distance is checked once, at the very start

<!-- Speaker note: Without forever, the if runs once, before the robot has moved. The box is far away then, so the robot never checks again and drives straight into it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Stop farther away:** Make the robot stop when the box is closer than **25 cm**. Drag a box in front and test it.
- **Stop sign:** Show an **X** on the micro:bit when the robot stops.

[Open this step](https://tutorials.learningwaypoints.com/code/robotics/robot-stop/?full=step-4#step-4)

<!-- Speaker note: What this step is for: The number in the question decides how close the robot gets, and anything can happen when the question is true. Hints, in order: Change 15 to 25 in the if. / show icon is in Basic. / Put it inside the if, under robot motor stop. Choose the X. For students who need more support: Give the parking robot's if / else if / else blocks with the numbers filled in, and ask students to drag in the right motor block for each part. For early finishers: Make a 'nervous' robot: when something comes closer than 10 cm, it reverses (robot motor tank −30 −30) for half a second, then stops. The hard part, on purpose: The robot only knows the distance when the program reads it, many times a second. Ask where the sensor is read and how often. When students get stuck: The robot drives straight off without stopping. Ask: Is there a box in front of it? Can you see the blue beam touch the box? Fix: Drag a box into its path, or turn the robot to face one. / The robot never moves. Ask: Is robot motor tank there, and are both numbers above 0? Fix: Add robot motor tank 50 50 (in on start for the Predict program, or inside the else for the parking robot). / The parking robot never stops. Ask: Which question does your if ask first? Fix: Ask about the closest distance (less than 10) first: the first true question wins. / The real robot stops in a different place from the simulator. Ask: What is different about the real floor and batteries? Fix: Normal: real robots coast and their sensors are noisy. Change the numbers until it works on your floor. -->

<!-- Speaker note: Teacher: 25 cm leaves a bigger gap. Ask why a real car's parking sensor starts beeping much farther away. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a **parking robot**, like a car easing into a parking space:

- closer than **10 cm**: stop
- closer than **30 cm**: drive slowly (20)
- otherwise: drive at 50

Test it by dragging a box towards the robot, and away again.

[Open this step](https://tutorials.learningwaypoints.com/code/robotics/robot-stop/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: Inside forever: if the distance is less than 10, stop. Else if it is less than 30, drive slowly. Else, drive at 50. / Click the + on the if block to add else if and else. Slow is robot motor tank 20 20. -->

<!-- Speaker note: Teacher: three answers from one number, so if / else if / else, checked in order. The order matters: 'less than 30' first would catch 5 cm too, and the robot would never stop. -->

---

## On a real robot

The same program runs on a real Cutebot: download it and put the robot on the floor facing a wall or a box. Things to notice and tune:

- **Readings jump about.** Real sensors are noisy, and soft things (a jumper, a cushion) send back weak echoes. Test with a book or a box.
- **Stopping distance changes with the floor.** On carpet the robot stops sooner than on a smooth desk. Change 10 and 30 until it stops cleanly.
- **Batteries matter.** Weak batteries make the robot slower, so it may stop shorter.

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does Mia's robot crash when the if is not inside forever?**

* It checks the distance once, at the start, when the box is still far away. It never checks again, so it never stops.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: instead of stopping, turn away and keep exploring, like a robot vacuum. Real-world links for discussion: parking sensors, automatic doors, warehouse robots that slow down near people. -->
