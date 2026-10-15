---
marp: true
theme: default
html: true
---

# Pictures in order

micro:bit Foundations · Show and react

<!-- Speaker note: Students see that blocks in on start run once, from the top, so the order of the blocks is the order of the pictures, and the last one stays. About 35 minutes (Predict and Run 8 min · Investigate 10 min · Modify 7 min · Make 7 min · Door sign 3 min). -->

---

## Today

**We are learning to** show words and pictures on the micro:bit, and see that blocks run once, from top to bottom.

- I can say what the micro:bit will show, in order.
- I can say why the last picture stays on.
- I can make a name badge from words and a picture I draw.

<!-- Speaker note: Before class: No micro:bits needed: the **simulator** (the micro:bit picture beside the blocks) runs every program. Blocks in **on start** run once, when the micro:bit switches on, one after another from the top. This lesson is only about that order; the next one adds **forever**. Try the Make yourself: your name in **show string**, then a **show leds** picture (click the squares to light them). -->

---

## Why it matters

> A shop sign scrolls its name, then shows a picture. It is a short list of instructions, done in order.

<!-- Speaker note: The micro:bit has 25 small lights (LEDs) in a 5 by 5 grid. You program it with **blocks**, and the **simulator** (the picture of a micro:bit next to the blocks) runs your program straight away. No real micro:bit needed. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:204](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/fe0e32dc3d54.png?v=95a208ee6373d2cf)

**What will you see on the micro:bit?**

- Only the big heart
- Both hearts at the same time
- The hearts flashing over and over
- The big heart, then the small heart, which stays

<!-- Speaker note: What happens: The big heart shows, then the small heart, and the small heart stays. The blocks run once, top to bottom, and the last picture stays on. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: take a vote. 'Both hearts at once' is the common wrong answer. Ask: how many blocks does the micro:bit do at a time? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The big heart shows, then the small heart, and the small heart stays. The blocks run once, top to bottom, and the last picture stays on.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/microbit/microbit-leds/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-leds/?full=step-2#step-2)

<!-- Speaker note: The simulator runs the program by itself. Missed it? Press the restart button under the simulator. Students should be able to say: I watched it run and compared it with my prediction. -->

<!-- Speaker note: Teacher: the small heart stays. Say it plainly: blocks run top to bottom, once, and the last picture stays on. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:253](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/ac7384b598a9.png?v=e87681e53586a813)

<!-- Speaker note: What this step is for: Blocks in on start run once, one after another from the top, so the order of the blocks is the order you see, and the last picture stays. -->

<!-- Speaker note: Teacher: students change the order of Lily's sign in the editor; the check ticks when it is right. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Lily's sign

**Lily's sign has three blocks in on start: show string HI, show icon happy face, show icon tick. What do you see?**

- Only the tick
- HI scrolls, then the happy face, then the tick, which stays
- Only HI
- HI, the face and the tick all at once

* Answer: HI scrolls, then the happy face, then the tick, which stays

<!-- Speaker note: The micro:bit does one block at a time, from the top. Each picture replaces the one before, and the tick is last, so it stays. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Ten seconds later

**Ten seconds after the program starts, which picture is on the screen?**

- HI: the first block
- The tick: the last block
- All three, taking turns
- Nothing: the program has finished

* Answer: The tick: the last block

<!-- Speaker note: When the last block has run, the program is finished, and the last picture is still on the LEDs. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Be the micro:bit <span style="font-size:.6em;color:#64748b">(4 min)</span>

One student is the micro:bit and holds up one picture card at a time. The class reads the blocks aloud, top to bottom.

<!-- Speaker note: Holding up one card at a time makes it concrete that each picture replaces the last, and the last card stays up. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Draw your own picture:** Add a **show leds** block at the end and draw a picture. Which picture stays on now?
- **A number first:** Add **show number** at the very top. Type your favourite number.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-leds/?full=step-4#step-4)

<!-- Speaker note: What this step is for: show leds is a picture you draw yourself. It is one more block in the list, run in its turn. Hints, in order: show leds is in Basic. Drag it under the last block. / Click squares in the grid to light them. / show number is in Basic. Drag it to the top and type a number. For students who need more support: Give students the show string block already in on start, and ask them only to add and draw the show leds picture. For early finishers: Make a badge that shows three things in a row, ending with the picture that should stay on all day. The hard part, on purpose: Seeing that the blocks run one at a time. Ask which block ran last, instead of telling them. When students get stuck: Only the last picture seems to show. Ask: Press restart and watch the very start. What scrolls first? Fix: Every block runs, one after another. The last one stays, so it is easy to miss the others. / A show leds block shows nothing. Ask: Which squares did you light? Fix: Click squares in the grid to turn them on. / The blocks sit outside on start and are greyed out. Ask: Which block are they inside? Fix: Drag them inside on start until the block hugs them. -->

<!-- Speaker note: Teacher: show leds is the first time students draw. Ask which picture stays on after they add it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a **name badge**. Your name scrolls across, then a picture you drew stays on the screen.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-leds/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: show string is in Basic. Type your name into it. / Put show leds under show string, so the picture comes last and stays on. -->

<!-- Speaker note: Teacher: the name badge. Let students show each other. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a door sign

This door sign scrolls a word, then shows a face. Make it the sign for your classroom door: your room number, then a picture that says what happens inside.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-leds/?full=step-6#step-6)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**on start has: show icon heart, show icon sad face, show icon tick. What is on the screen at the end?**

* The tick. The blocks run once, top to bottom, and the last picture stays.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: forever, so the pictures repeat instead of stopping on the last one. With real micro:bits, press Download and drag the file onto the micro:bit to run it for real. -->
