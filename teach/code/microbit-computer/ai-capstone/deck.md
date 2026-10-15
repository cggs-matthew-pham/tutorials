---
marp: true
theme: default
html: true
---

# Capstone: your own AI sorter

micro:bit and the computer · Capstone: your own AI sorter

<!-- Speaker note: Students build an AI sorter for a problem they choose, in four milestones (test set, model, build, system), and report its scores by group and its limits. About 120 minutes (About two to three lessons: Plan 15 min · Test set 20 min · Train and improve 35 min · Build 25 min · System 10 min (typical) · Report 15 min). -->

---

## Today

**We are learning to** choose a sorting problem, build a fair test set first, train and improve a Teachable Machine model until every group passes, connect a micro:bit build that acts safely on its labels, and report what it still gets wrong.

- I can build a fair test set before training, with groups for the conditions where the model will be used.
- I can improve a model by changing its data for its weakest group.
- I can make a build act safely on a model's labels and report what it still gets wrong.

<!-- Speaker note: Before class: **The capstone** brings the course together on a problem each student (or pair) chooses. The order matters: **test set first**, from photos the model never trains on, in groups that match where it will be used (place, light, distance). The board keeps the test photos **in the student's browser only** (testset: own); they are shrunk to small squares and never uploaded. Remind students not to photograph people. **Milestones:** (1) at least 24 test photos in at least 3 groups; (2) 80% overall with no group under 60% (the board's acc_min); (3) a micro:bit program with a branch per label, a safe else and a reply; (4) the whole system on the webcam (typical: needs a micro:bit). The report is the assessment piece: scores by group before and after, the data changes made, and the limits. **Choosing problems:** steer away from people (faces, emotions, who someone is) and anything where a wrong answer could hurt someone. Good problems have objects students can bring in. Two to four classes plus Neither is plenty. **Without micro:bits:** milestones 1, 2 and 3 work without hardware (3 is checked in the editor); milestone 4 is typical. Teacher: Plan: check class names are exact and that every class has a Neither alternative. Teacher: Test set: check groups are real conditions (window, desk, dim), not just more of the same. Teacher: Improve: ask each student which group is weakest and what its failures share. Teacher: Build: the safe else is the AI robots idea in a new setting. Teacher: Report: ask 'who or what might it fail for?' of every report. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> Engineers who build an AI system are asked two questions before it is used: how did you test it, and when does it fail? This time the problem, the data and the answers are yours.

<!-- Speaker note: You have trained a model, tested it fairly, fixed it by changing its data, and sent its labels to a micro:bit. Now do it all on a problem **you choose**, in four milestones with less help each time. Some ideas: **ripe or unripe** fruit; **LEGO** bricks by colour or size; **tidy or messy** desk; **book or not a book**; **wet or dry** washing (photos only); a **recycling** sorter for your school's own bins. Two to four classes, plus a **Neither** class for everything else. -->

---

## Plan

Write in your book or a document:

1. The **problem** and who it helps.
2. The **classes** (with exact names, as you will type them in Teachable Machine), including **Neither**.
3. **Where** it will be used: the background, the light, the distance. These become your test groups.
4. What the **micro:bit** does for each label, and what it does when it is **unsure**.

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 1: build the test set first

Take your **test photos before you train**, and keep them apart from your training photos. For each class, take photos in **at least three groups**: different places, light or distances where the model will be used. On the board, choose the class, name the group, then **Add photos**. (The photos stay in this browser only.)

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-computer/ai-capstone/?full=step-2#step-2)

<!-- Speaker note: What this step is for: A fair test is made before training, from photos the model will never train on, taken in the conditions where it will be used. For students who need more support: Offer a ready-made problem (the recycling sorter with your school's bins) and a planning template with the four plan questions. For early finishers: Add a second model in CreateAI (a movement) that starts or stops the sorter, so the two models work together. The hard part, on purpose: Making the test set before training and keeping it separate. When the score is 100% at once, ask whether any test photos were also training photos. When students get stuck: The test score is 100% straight away. Ask: Are any test photos also training photos? Are your groups different enough? Fix: Retake test photos apart from training ones, in harder conditions. / One group stays low however much is added. Ask: Do the new training photos look like that group's test photos? Fix: Take training photos in that group's conditions. / The board loses the test photos. Ask: Are you in the same browser and not in a private window? Fix: Use the same browser profile; private windows forget them. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 2: train, test, improve

Train in Teachable Machine (new photos, not your test photos), export with **Upload my model**, and paste the link. Find the **weakest group**, work out what its failures share, change the training data, and test again. Keep a note of each change and its scores.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-computer/ai-capstone/?full=step-3#step-3)

<!-- Speaker note: What this step is for: Improving means finding the weakest group and changing the training data for it, not just raising the overall score. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Milestone 3: the build

Program the micro:bit: one branch for each of your labels, an **else** that does something safe, and a **reply** (serial write value) saying what it did. A servo flap, lights, a sound or the screen: your choice. If the build is across the room, add the radio bridge.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-computer/ai-capstone/?full=step-4#step-4)

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fcode%2Fmicrobit-computer%2Fai-capstone%2Fstep-5&code=widget%3A+classifier%0Atestset%3A+own%0Awebcam%3A+on%0Aserial%3A+on%0Aunsure%3A+on%0Athreshold%3A+0.8%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/microbit-computer/ai-capstone/?full=step-5#step-5)

<!-- Speaker note: Load your model, connect your micro:bit, and run it on the webcam with real items. Watch what happens when you show something that is in no class at all. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Report

Write a one-page report (or a two-minute talk):

- The **problem** and your **classes**.
- Your **test set**: groups and how many photos.
- **Scores by group**, first and final, and **what you changed** in the data each time.
- What the micro:bit does, including when the model is **unsure**.
- What it **still gets wrong**, and **who or what it might fail for** if a real person relied on it.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why build the test set before training?**

* So it holds photos the model never trained on, from the conditions where it will be used: a fair test of whether it works there.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Where this leads: AI robots (a robot driven by a model, with safety rules), and the Python pathway's Machine learning with Gradio. Real world: model cards and test reports for AI systems. -->
