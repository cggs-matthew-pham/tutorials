---
marp: true
theme: default
html: true
---

# Drive with gestures

AI robots · Drive with a model

<!-- Speaker note: Students drive a robot with hand gestures recognised by their own Teachable Machine model; each label becomes a mode the robot acts on until the next label. About 50 minutes (Predict and Run 8 min · Drive with your model 15 min (typical) · Investigate 8 min · Modify 10 min · Make 10 min). -->

---

## Today

**We are learning to** a model's label reaches the robot as a word, and the robot turns it into a mode. The robot keeps acting on the last mode until a new label arrives.

- I can turn labels from a model into moves on a robot.
- I can explain why the robot keeps doing the last thing it was told.
- I can make the robot do something safe with a word it doesn't know.

<!-- Speaker note: Before class: **The idea:** the model only names a gesture (Forward, Left…). The board sends that word to a **bridge** micro:bit on the computer, which passes it on by radio to the robot. The robot's **on radio received string** remembers the word as its **mode**, and **forever** acts on the mode until a new word arrives. So when the hand leaves the camera, the robot keeps going: the problem the next lesson fixes. **Prerequisites:** Robotics challenges (modes, radio remote) and micro:bit and the computer (training in Teachable Machine, serial, the radio bridge). The bridge program is printed in the lesson. **Without robots:** the simulator's buttons stand in for the model (A Left, B Right, A+B Forward, logo Stop), and with radio it shows two robots, each driven by the other micro:bit. The model step is typical. **With robots:** per pair, a robot with its micro:bit, a second micro:bit as the bridge on a data cable, Chrome or Edge, and a webcam. Give each pair its own radio group. Gestures are hands only; photos stay in the browser, and Upload my model shares the model, not the photos. Teacher: Drive with your model: insist on class names that match exactly; Mia's robot is the reason. -->

---

## Why it matters

> Some wheelchairs and drones can be steered by head movements or hand signs instead of a joystick. A camera and a trained model turn each movement into a command.

<!-- Speaker note: You have trained a model (Train a recycling sorter), sent its labels to a micro:bit, and built a radio bridge (micro:bit and the computer). Now the labels drive a **robot**. Train a model with four hand gestures, **Forward**, **Left**, **Right** and **Stop**, and the bridge passes each label on to the robot by radio. In the simulator, the micro:bit's buttons stand in for the model: **A** sends Left, **B** sends Right, **A+B** sends Forward and the **logo** sends Stop. With radio, the simulator shows two robots, and each micro:bit's buttons drive the **other** robot. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/aaa5ebb10d89.png?v=53a5e150986c005c)

**The model sends Forward. Then your hand leaves the camera and the board sends nothing more. What does the robot do?**

- Drives forward for one second, then stops
- Stops
- Turns left
- Keeps driving forward

<!-- Speaker note: What happens: It keeps driving forward. on radio received string only sets the mode; forever keeps acting on the last mode until a new label arrives. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: many say it stops. Ask: what does forever do when no new message arrives? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It keeps driving forward. on radio received string only sets the mode; forever keeps acting on the last mode until a new label arrives.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/ai-robots/ai-drive/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/ai-robots/ai-drive/?full=step-2#step-2)

<!-- Speaker note: Press **A+B** on one micro:bit and watch the **other** robot. Then try **A**, **B** and the **logo**. Students should be able to say: I drove the other robot with A, B, A+B and the logo, and saw that it keeps doing the last thing it was told. -->

<!-- Speaker note: Teacher: watch the other robot, as in Remote control. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fcode%2Fai-robots%2Fai-drive%2Fstep-3&code=widget%3A+classifier%0Aclasses%3A+Forward%2C+Left%2C+Right%2C+Stop%0Awebcam%3A+on%0Aserial%3A+on%0Athreshold%3A+0.8%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/code/ai-robots/ai-drive/?full=step-3#step-3)

<!-- Speaker note: 1. In Teachable Machine, train four classes named exactly **Forward**, **Left**, **Right** and **Stop** (a hand sign each), and export with **Upload my model**. 2. Download the robot program to the robot's micro:bit, and the **bridge program** below to a second micro:bit plugged into the computer. 3. Paste your model link, click **Load**, **Connect a micro:bit** (the bridge), then **Try it on the webcam**. The bridge program (from A radio bridge): -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/aaa5ebb10d89.png?v=53a5e150986c005c)

<!-- Speaker note: What this step is for: The model only names a gesture; the robot's program decides what each name does and keeps doing it, so the label is a mode. -->

<!-- Speaker note: Teacher: the else as a safe default is the seed of the next lesson. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Who decides

**Where is it decided that Left means turn left slowly?**

- In the bridge micro:bit
- In the robot's program
- In the board
- In Teachable Machine

* Answer: In the robot's program

<!-- Speaker note: The model sends the word Left. The robot's if turns that word into wheel speeds. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mia's robot

**Mia named her class forward (small f). She shows the Forward sign. What does her robot do?**

- Turns left
- Drives forward
- Stops: forward matches no branch, so else runs
- Shows an error

* Answer: Stops: forward matches no branch, so else runs

<!-- Speaker note: Words must match exactly. Here the else is a safe default: a word the robot doesn't know makes it stop. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mode and forever

**Why does on radio received string only set the mode, while forever drives the motors?**

- Messages arrive at any time; forever keeps driving between them and checks the mode every time round
- Forever runs only when a message arrives
- Radio blocks can't use motors
- It makes the radio faster

* Answer: Messages arrive at any time; forever keeps driving between them and checks the mode every time round

<!-- Speaker note: As in Robotics challenges: the handler remembers the latest command, and forever acts on it continuously. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Back:** Add a fifth label, **Back**. (With a real model, add a fifth class too.)
- **Show what it heard:** Make the robot's micro:bit show the **first letter** of each label it hears, so you can tell whether a wrong move came from the model or the code.

[Open this step](https://tutorials.learningwaypoints.com/code/ai-robots/ai-drive/?full=step-5#step-5)

<!-- Speaker note: What this step is for: A new gesture needs a new class in the model and a new branch on the robot; showing the mode helps you see what the robot heard. Hints, in order: Add an else if: mode = Back, with robot motor tank −50 −50. / For testing, shaking the micro:bit sends Back (on shake: radio send string Back). / In on radio received string, after setting the mode: show string, the first letter of the mode (Text › char from). For students who need more support: Run the lesson with the simulator buttons only; demonstrate the model drive at the front. For early finishers: Add a gesture that plays a horn (robot play tone) without changing the mode. The hard part, on purpose: Keeping the class names, the words sent and the robot's checks identical. When the robot ignores a gesture, ask them to read the label the board sends and the word the robot checks for. When students get stuck: The robot doesn't move when the webcam shows a gesture. Ask: Does the board show the label being sent? Are the bridge and robot in the same group? Fix: Connect the bridge on the board; match the radio groups. / The robot stops whatever gesture is shown. Ask: Do your class names match the words in the robot's ifs exactly? Fix: Rename the classes (Forward, Left, Right, Stop), export and paste the new link. / The robot jerks between moves. Ask: Does the model flicker between two gestures? Fix: Add more varied photos of the confused gestures, or hold each gesture still. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a **gesture robot** with four moves (**Forward**, **Left**, **Right**, **Spin**) that stops for any other word, with **green** lights while going forward and **red** when stopped. Add test-remote buttons so you can try it in the simulator.

[Open this step](https://tutorials.learningwaypoints.com/code/ai-robots/ai-drive/?full=step-6#step-6)

<!-- Speaker note: Hints, in order: In forever: one branch per label (Forward, Left, Right, Spin), else stop. / Robot set color is in Robot: green when going forward, red when stopped. Shake sends Spin for testing. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**The model sends Left, then nothing. What does the robot do, and why?**

* It keeps turning left: the radio handler set the mode to Left, and forever keeps acting on the mode until a new label arrives.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: the same robot driven by a model on a wrist micro:bit (CreateAI), with no camera or computer. Real world: gesture-controlled wheelchairs and drones. -->
