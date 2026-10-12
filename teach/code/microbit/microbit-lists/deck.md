---
marp: true
theme: default
html: true
---

# Lists

micro:bit Foundations · Collections and tools

<!-- Speaker note: Students keep several values in a list, pick items by place (counted from 0) and at random, and use the list's length so it can grow. About 45 minutes (Predict and Run 8 min · Investigate 12 min · Modify 10 min · Make 10 min · Team picker 5 min). -->

---

## Today

**We are learning to** keep many values in one list, pick one by its place, and pick one at random.

- I can make a list and get an item by its place.
- I can explain why the last place is the length minus 1.
- I can pick a random item from a list of any length.

<!-- Speaker note: Before class: A **list** (MakeCode calls it an **array**, in **Advanced › Arrays**) holds many values in order under one name. Each item has a **place** (an **index**), counted from **0**: in Yes, No, Maybe, Yes is at place 0. So a list of 3 has places 0, 1 and 2, and the last place is always the length minus 1. To pick at random, choose a place with **pick random 0 to (length of list − 1)**. Using the length means the list can grow without changing the random part. Teacher: Team picker: B shows the first name, which is at place 0. -->

---

## Why it matters

> A playlist, a lunch menu, a class roll: each is a list of things in order, and you pick one by its place or at random.

<!-- Speaker note: A variable holds one value. A **list** holds many, in order, under one name, such as `answers`. Each item has a **place number** (an **index**), and the micro:bit counts places from **0**. You find list blocks in **Advanced › Arrays** (an array is another name for a list). -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:309](https://tutorials.learningwaypoints.com/_pictures/makecode/code/c77213580e4c.png?v=77508cf81b1361a2)

**You press A. What does the micro:bit show?**

- Nothing
- Yes
- No
- Maybe

<!-- Speaker note: What happens: No. The places are counted from 0: Yes is at 0, No is at 1, Maybe is at 2. Place 1 is No. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students say Yes. Ask: which place does the micro:bit start counting from? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* No. The places are counted from 0: Yes is at 0, No is at 1, Maybe is at 2. Place 1 is No.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/microbit/microbit-lists/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/microbit/microbit-lists/?full=step-2#step-2)

<!-- Speaker note: Press **A** and read the word as it scrolls. Students should be able to say: I pressed A and compared the word with my prediction. -->

<!-- Speaker note: Teacher: No. Say it plainly: lists count from 0, like a ruler starts at 0. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:160](https://tutorials.learningwaypoints.com/_pictures/makecode/code/b4fc2fb5580c.png?v=d2a847d695c709cc)

<!-- Speaker note: This is a **magic 8-ball**: shake it and it picks a random answer. **pick random 0 to length − 1** chooses a place, and **get value at** takes the item at that place. What this step is for: A list keeps items in order, counted from 0, so the last place is one less than the length. A random place from 0 to length − 1 picks any item. -->

<!-- Speaker note: Teacher: the 8-ball picks a random place. Kai's mistake (counting from 1) is the misconception this lesson targets. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Places

**The list is Yes, No, Maybe. What is at each place?**

| place | item |
|---|---|
| 0 | ? |
| 1 | ? |
| 2 | ? |

* Answer: Yes, No, Maybe

<!-- Speaker note: The first item is at place 0. Three items use places 0, 1 and 2. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The last place

**A list has 5 items. What is the place number of the last one?**

* Answer: 4

<!-- Speaker note: Places start at 0, so 5 items use places 0, 1, 2, 3 and 4. The last place is the length minus 1. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Kai's 8-ball

Kai's program:

![h:136](https://tutorials.learningwaypoints.com/_pictures/makecode/code/761497ee179c.png?v=aac3d8854c9eccbc)

**Kai's magic 8-ball never says Yes, and sometimes it goes wrong. Why?**

- randint is broken
- Places start at 0, but Kai picks from 1 to 3: he skips Yes and asks for a place that is not there
- Yes is too short to show
- The list needs four items

* Answer: Places start at 0, but Kai picks from 1 to 3: he skips Yes and asks for a place that is not there

<!-- Speaker note: Yes is at place 0, which Kai never picks, and place 3 does not exist. Picking from 0 to length − 1 covers every item. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **More answers:** Add two answers of your own. Shake a few times: do the new answers come up? (You did not have to change the random part. Why not?)
- **How many?:** Make **A** show how many answers are in the list.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-lists/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Using the list's length means the program still works when the list grows. Hints, in order: Click the + on the list block to add a place. / Type your answer into each new place. / Use on button A pressed and show number. / length of array is in Arrays. For students who need more support: Give students the 8-ball with the list already made, and ask them only to add answers and test. For early finishers: Make a list of pictures for a dice: shake picks a random face from 1 to 6 (use show number with a random place, or a list of drawings with show leds). The hard part, on purpose: Places start at 0, so the last place is length − 1. When one item never comes up, ask which places random can choose. When students get stuck: The list block has only one or two places. Ask: Where is the + on the list block? Fix: Click + on the list block to add places. / One item never comes up. Ask: Which places can pick random choose from? Fix: Pick from 0 to length − 1, not from 1. / The word does not show, or a number shows instead. Ask: Is it show string or show number? Fix: Words need show string, from Basic. -->

<!-- Speaker note: Teacher: after adding answers, ask why the random part still works (it uses the length). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make **rock, paper, scissors**. Each shake shows Rock, Paper or Scissors, picked at random from a list. Play against a friend with their own micro:bit (or the simulator).

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-lists/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: Make a list called choices with Rock, Paper and Scissors. / Inside on shake: show string, get value at, pick random 0 to length of choices − 1. -->

<!-- Speaker note: Teacher: rock, paper, scissors is the same pattern with new items. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a team picker

This picks a name at random from a class list. Put in names from your class, then make **B** show the first name in the list.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-lists/?full=step-6#step-6)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A list has 4 items. Which places can you use, and which is the last?**

* Places 0, 1, 2 and 3. The last is 3, the length minus 1.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: functions, which name a job so it can be used again. Class ideas: a class question picker; a random task chooser for group work. -->
