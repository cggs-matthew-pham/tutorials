---
marp: true
theme: default
html: true
---

# Pocket pet

micro:bit Foundations · Final challenge: Pocket pet

<!-- Speaker note: Students build a pocket pet in three milestones, using forever, events, a variable, ranges with else if, and a random pick from a list. About 55 minutes (Predict, Run, Investigate 12 min · Milestone 1 10 min · Milestone 2 12 min · Milestone 3 12 min · Make it yours 9 min). -->

---

## Today

**We are learning to** build a pet that lives on your micro:bit, using everything in this course. It gets hungry as time passes, you feed it, and its face shows how it feels.

- I can make a number change by itself as time passes.
- I can turn one number into one of several pictures with else if.
- I can put the ideas of the course together into a small game.

<!-- Speaker note: Before class: This challenge uses every lesson in the course and adds nothing new. The pet is a variable, `hunger`, that **forever** makes go up (pause, then change by 1); **A** brings it down (with an **if** so it never goes below 0); **if … else if … else** turns the number into a face; and a **shake** picks a trick from a **list** at random. The milestones fade the help: Milestone 1 gives nearly all the code, Milestone 2 an outline, Milestone 3 only a goal. Build it yourself first; it takes about ten minutes. Teacher: Milestone 1: if hunger never changes, the change block is outside forever. Teacher: Milestone 2: the order of the questions matters, as in The first true question wins. Teacher: Milestone 3: the trick uses pick random 0 to length − 1, from Pick from a list. -->

---

## Why it matters

> Tamagotchis, Neopets and the pets in phone games all run the same loop: time makes a number go up, you bring it down, and a picture shows how things are going.

<!-- Speaker note: Build a **pocket pet**. It gets hungry as time passes, **A** feeds it, its face shows how it feels, and a **shake** makes it do a trick. You already know every block it needs. You will build it in three milestones, with less help each time. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:224](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/83b284c704ce.png?v=6320092bfc4a63ec)

**Nobody presses anything. About what number shows 10 seconds after the pet starts?**

- 0
- 1
- 3
- 10

<!-- Speaker note: What happens: 3. forever waits 3 seconds, then adds 1 to hunger and shows it, again and again: 1 after 3 seconds, 2 after 6, 3 after 9. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: the pause sets the pet's speed of life. Ask what would make it get hungry faster. Count it out together: 3, 6, 9 seconds. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 3. forever waits 3 seconds, then adds 1 to hunger and shows it, again and again: 1 after 3 seconds, 2 after 6, 3 after 9.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/microbit/microbit-pet/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-pet/?full=step-2#step-2)

<!-- Speaker note: Watch for about 10 seconds without pressing anything. Students should be able to say: I watched hunger go up by itself and compared it with my prediction. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/651ffe64a028.png?v=6e8a923ee468bbef)

<!-- Speaker note: This is the finished pet. Read it before you build your own. What this step is for: A pet is a variable that forever changes by itself, events that change it back, and decisions that turn the number into a face. -->

<!-- Speaker note: Teacher: three looks back: an if that guards a number, ranges, and a list with its length. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Feeding

**A feeds the pet: if hunger &gt; 0, change hunger by -1. Why is the if there?**

- So hunger goes up instead
- So A only works once
- To make the pet sleep
- So hunger never goes below 0

* Answer: So hunger never goes below 0

<!-- Speaker note: Without the if, feeding a full pet makes hunger -1, -2, -3. The if only takes 1 away while there is some hunger to take. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Faces

**The face is chosen by if hunger &lt; 3 … else if hunger &lt; 6 … else. What does each hunger show?**

| hunger | face |
|---|---|
| 1 | ? |
| 4 | ? |
| 8 | ? |

* Answer: happy, asleep, sad

<!-- Speaker note: The questions are asked from the top and the first true one wins. 4 is not less than 3, but it is less than 6. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Tricks

**A shake picks a trick with get value at (pick random 0 to length of tricks − 1). You add a fourth trick. What else must change?**

- You need a second list
- The shake block
- Nothing: length of tricks grows with the list
- The 3 in pick random

* Answer: Nothing: length of tricks grows with the list

<!-- Speaker note: length of tricks is now 4, so pick random already reaches the new trick. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Whose job is it? <span style="font-size:.6em;color:#64748b">(4 min)</span>

Four corners of the room: forever, A, face, shake. The teacher reads a job ("gets hungrier", "picks a trick", "eats"); students go to the corner that does it.

<!-- Speaker note: This is the plan for the milestones: each job has one home. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 1: hungry over time

The variable `hunger` and the feeding button **A** are made for you.

1. Inside **forever**, pause for 3 seconds.
2. Then change `hunger` by 1 and show it.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-pet/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Time is just forever with a pause: each time round, the number changes by itself. Hints, in order: Inside forever: pause, then change hunger by 1, then show number hunger. / 3000 ms is 3 seconds. For students who need more support: Pair students for Milestone 3: one reads the goal aloud while the other builds. For early finishers: Add a second need, bored, with its own number, its own button and its own face rule. Which need wins when both are high? The hard part, on purpose: Putting it all in the right blocks. Ask which block each job belongs in: time, button, face or shake. When students get stuck: hunger never changes. Ask: Is the change block inside forever? Fix: Drag change hunger by 1 inside forever, after the pause. / The pet is always sad, or always happy. Ask: Read the questions from the top with hunger at 4. Which is true first? Fix: Ask < 3 first, then < 6, then else. / hunger goes below 0. Ask: What does A do when hunger is already 0? Fix: Only change hunger by -1 if hunger > 0. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 2: a face for each feeling

Swap the number for a face. Choose your own pictures:

- **hunger** below 3: happy.
- Below 6: tired or bored.
- Anything else: sad.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-pet/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Ranges turn one number into one of three faces: the first true question wins. Hints, in order: Replace show number with one if block. Click + to add else if and else. / Ask hunger < 3 first, then hunger < 6. Anything else is very hungry. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Milestone 3: tricks

The list `tricks` is made for you. Make a **shake** show one trick, picked at random. Add a trick of your own to the list.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-pet/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Combining a list, a random place and an event shows whether a student can put the course's ideas together. -->

<!-- Speaker note: Teacher: the sleeping pet needs an if around the change in forever. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make it yours

Give your pet a life of its own. Some ideas:

- It **sleeps** when it is dark (light level), and hunger stops going up.
- **B** plays with it, which makes it hungrier.
- A second need, such as `bored`, with its own number.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-pet/?full=step-7#step-7)

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Pet show <span style="font-size:.6em;color:#64748b">(4 min)</span>

Leave your pet running and visit another table. Can you keep their pet happy for a minute?

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Your pet has: if hunger &lt; 6 tired, else if hunger &lt; 3 happy, else sad. What does it show when hunger is 1, and why?**

* Tired. 1 is less than 6, so the first question is true and the rest are skipped. Ask &lt; 3 first.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Course complete. Next: micro:bit: talk and play, where functions name jobs and radio connects micro:bits. With real micro:bits: keep the pet in a pocket for a lesson and see if it survives. -->
