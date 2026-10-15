---
marp: true
theme: default
html: true
---

# Pick from a list

micro:bit Foundations · Lists

<!-- Speaker note: Students pick an item from a list at random with pick random 0 to length − 1, so every item can come up however long the list grows. About 40 minutes (Predict and Run 7 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 8 min · Team picker 4 min). -->

---

## Today

**We are learning to** pick an item from a list at random, so it works however long the list grows.

- I can pick a random item from a list.
- I can say why the range is 0 to length − 1.
- I can add items to a list without changing the random part.

<!-- Speaker note: Before class: **pick random** (Math) gives a whole number between two numbers. **length of array** (Arrays) counts the items. A random item is **get value at (pick random 0 to length − 1)**: the length is one more than the last place, because places start at 0. Using the length means new items are included without changing anything else. Teacher: Mix it up: last lesson's chooser, traced by hand. -->

---

## Why it matters

> A magic 8-ball, a game that deals a random card, a playlist on shuffle: each picks a place at random, then takes the item at that place.

<!-- Speaker note: Last lesson you took an item out of a list by its place. Now the micro:bit chooses the place. **pick random** (in **Math**) gives a whole number between two numbers, a different one each time. **length of list** (in **Arrays**) counts the items in a list. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:160](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b4fc2fb5580c.png?v=d2a847d695c709cc)

**You shake this magic 8-ball twice. Can it give the same answer both times?**

- It always says Yes
- No: it never repeats until every answer has been used
- Yes: each shake picks a new random place, and it can be the same one
- No: it goes in order, Yes, then No, then Maybe

<!-- Speaker note: What happens: Yes. Each shake picks a random place from 0 to 2, with no memory of the last one, so the same place can come up twice. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: some students think it cycles through or never repeats. Random has no memory. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Roll a dice <span style="font-size:.6em;color:#64748b">(3 min)</span>

Roll a real dice twice. Can it give the same number both times?

<!-- Speaker note: Roll a real dice twice to settle it: random has no memory. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Yes. Each shake picks a random place from 0 to 2, with no memory of the last one, so the same place can come up twice.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/microbit/microbit-pick/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-pick/?full=step-2#step-2)

<!-- Speaker note: Click **SHAKE** several times. Does an answer ever come up twice in a row? Students should be able to say: I shook it several times and compared the answers with my prediction. -->

<!-- Speaker note: Teacher: shake several times. Repeats happen. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:160](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b4fc2fb5580c.png?v=d2a847d695c709cc)

<!-- Speaker note: What this step is for: pick random 0 to length − 1 gives any place in the list, so every item can come up, and new items are included without changing anything else. -->

<!-- Speaker note: Teacher: Kai counts from 1; Ana's range stays fixed when her list grows. Both are fixed by 0 to length − 1. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which places?

**The list has 3 answers. Which places can pick random 0 to length − 1 choose?**

- Only 0
- 0, 1 or 2
- 1, 2 or 3
- 0, 1, 2 or 3

* Answer: 0, 1 or 2

<!-- Speaker note: The length is 3, so it picks from 0 to 2: exactly the three places. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Kai's 8-ball

Kai's program:

![h:136](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/761497ee179c.png?v=aac3d8854c9eccbc)

**Kai's magic 8-ball never says Yes, and sometimes shows nothing at all. Why?**

- pick random is broken
- The list needs four items
- Places start at 0, but Kai picks from 1 to 3: he skips Yes and asks for a place that is not there
- Yes is too short to show

* Answer: Places start at 0, but Kai picks from 1 to 3: he skips Yes and asks for a place that is not there

<!-- Speaker note: Yes is at place 0, which Kai never picks, and place 3 does not exist. Picking from 0 to length − 1 covers every item. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Ana's longer list

**Ana added two answers, so the list has five. Her code still picks from 0 to 2. What happens?**

- The two new answers never come up
- Only the new answers come up
- All five come up
- It shows an error

* Answer: The two new answers never come up

<!-- Speaker note: 0 to 2 only reaches the first three places. Picking from 0 to length − 1 grows with the list. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Draw a card <span style="font-size:.6em;color:#64748b">(3 min)</span>

Three cards numbered 0, 1 and 2 go in a hat. A student draws one, reads the item at that place, and puts it back.

<!-- Speaker note: Add two more items to the board but not to the hat: they never come up. That is Ana's bug. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Every answer:** Fix Ana's 8-ball with **length of list**, so all five answers can come up. Shake to check.
- **How many?:** Make **A** show how many answers are in the list.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-pick/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Using the list's length means the program still works when the list grows. Hints, in order: length of array is in Arrays. Drag it into the second number of pick random. / Then take 1 away from it with the minus block from Math. / Drag in on button A pressed, with show number length of array answers. For students who need more support: Give students the list and the on shake block with show string already in, and ask them only to build get value at with pick random. For early finishers: Make a dice: a list of six show leds pictures is hard to make, so use show number pick random 1 to 6 instead, and say why this one starts at 1. The hard part, on purpose: Why it is length − 1. Ask them to count the places of a 3-item list aloud from 0. When students get stuck: One item never comes up. Ask: Which places can pick random choose from? Fix: Pick from 0 to length − 1, not from 1 and not a fixed number. / The minus block will not fit. Ask: Is it the round number minus block from Math? Fix: Drag Math's 0 − 0 block into the slot, then put length of array on its left and 1 on its right. / A number shows instead of the word. Ask: Is the random number inside get value at? Fix: pick random gives the place; get value at turns the place into the item. -->

<!-- Speaker note: Teacher: students fix Ana's 8-ball with length, then show the length. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

![h:320](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/cd681334681f.png?v=3078d02528747d9f)

<!-- Speaker note: What this step is for: A variable can be the place: change it, and get value at takes out a different item. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**This is last lesson's mood chooser. choice starts at 0. You press A four times. Which mood shows after the 4th press?**

- Happy
- Hungry
- Nothing
- Tired

* Answer: Tired

<!-- Speaker note: The presses make choice 1, 2, then 3, which goes back to 0, then 1. Place 1 is Tired. What this step is for: A variable can be the place: change it, and get value at takes out a different item. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make **rock, paper, scissors**. Each shake shows Rock, Paper or Scissors, picked at random from a list. Play against a friend with their own micro:bit (or the simulator).

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-pick/?full=step-6#step-6)

<!-- Speaker note: Hints, in order: Make a list with Rock, Paper and Scissors. / In on shake: show string get value at pick random 0 to length of list − 1. -->

<!-- Speaker note: Teacher: rock, paper, scissors is the same pattern with new items. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a team picker

This picks a name at random from a class list. Put in names from your class, then make **B** show how many names there are.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-pick/?full=step-7#step-7)

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Play a round <span style="font-size:.6em;color:#64748b">(3 min)</span>

Play rock, paper, scissors against the next pair: both shake at once.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A list has 6 items. What should pick random choose between, and why?**

* 0 and 5 (0 to length − 1), because places start at 0, so the last of 6 items is at place 5.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: the final challenge, a pocket pet that uses everything in this course. -->
