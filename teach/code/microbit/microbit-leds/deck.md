---
marp: true
theme: default
html: true
---

# Pictures on the LEDs

micro:bit Foundations · Show and react

<!-- Speaker note: Students see that blocks run in order, once, then use a forever loop to turn pictures into an animation. About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 10 min · Make 10 min · Shop sign 5 min). -->

---

## Today

**We are learning to** show pictures on the micro:bit, then make them move with a loop.

- I can predict what blocks will do, in order.
- I can use forever to repeat blocks.
- I can build an animation from pictures and pauses.

<!-- Speaker note: Before class: No micro:bits needed: the **simulator** (the micro:bit picture beside the blocks) runs every program. A program has two places to put blocks. **on start** runs its blocks once, when the micro:bit switches on. **forever** runs its blocks again and again. Most surprises in this lesson come from which of the two a block is in. Try the Make task yourself first: three pictures in forever, one drawn with **show leds** (click the squares to light them). Teacher: Shop sign: a finished program to change. show string scrolls text, which students will enjoy. -->

---

## Why it matters

> Scrolling signs at train stations and the lights on a pedestrian crossing run the same simple loop: show a picture, wait, show the next one.

<!-- Speaker note: The micro:bit has 25 small lights (LEDs) in a 5 by 5 grid. You program it with **blocks**, and the **simulator** (the picture of a micro:bit next to the blocks) runs your program straight away. No real micro:bit needed. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:204](https://tutorials.learningwaypoints.com/_pictures/makecode/code/fe0e32dc3d54.png?v=95a208ee6373d2cf)

**What will you see on the micro:bit?**

- The hearts flashing over and over
- The big heart, then the small heart, which stays
- Only the small heart
- Only the big heart

<!-- Speaker note: What happens: The big heart shows, then the small heart, and the small heart stays. The blocks run once, top to bottom, and the last picture stays on. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students choose 'flashing over and over'. Ask them to say what happens after the last block runs. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The big heart shows, then the small heart, and the small heart stays. The blocks run once, top to bottom, and the last picture stays on.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/microbit/microbit-leds/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/microbit/microbit-leds/?full=step-2#step-2)

<!-- Speaker note: The simulator runs the program by itself. Missed it? Press the restart button under the simulator. Students should be able to say: I watched it run and compared it with my prediction. -->

<!-- Speaker note: Teacher: the small heart stays. Say it plainly: blocks run top to bottom, once, and the last picture stays on. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:204](https://tutorials.learningwaypoints.com/_pictures/makecode/code/f22e0bb1efd2.png?v=a4265390cb3d4293)

<!-- Speaker note: What this step is for: Blocks in on start run once. Blocks inside forever run again and again, so two pictures become an animation. -->

<!-- Speaker note: Teacher: Ada's program has the hearts in on start and an empty forever. Students spot it, then fix it in the editor. The checks tick by themselves. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the problem

**Ada wants the hearts to keep beating. Her hearts show once, then the small heart just stays. Why?**

- The small heart is the wrong block
- Hearts can only be shown once
- The hearts are in on start, and forever is empty
- The micro:bit needs a pause to repeat

* Answer: The hearts are in on start, and forever is empty

<!-- Speaker note: on start runs its blocks once. Only blocks inside forever repeat, and Ada's forever has nothing in it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## How often?

**How many times does forever run the blocks inside it?**

- Twice
- Once
- Again and again, until the micro:bit is switched off

* Answer: Again and again, until the micro:bit is switched off

<!-- Speaker note: forever starts again from its first block as soon as it reaches the last one. That is a loop. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Draw your own picture:** Swap the small heart for a **show leds** block and draw your own picture.
- **Slow the beat:** Add a **pause** between the pictures. Try `500`, then try other numbers.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-leds/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Every frame of an animation is a block you choose, and pause sets how long each frame stays. Hints, in order: show leds is in Basic. Drag it into forever. / Click squares in the grid to light them. Then delete the small heart. / pause is in Basic. 1000 ms is one second. For students who need more support: Give students two show leds blocks already in forever, and ask them only to draw the pictures and add a pause. For early finishers: Make an animation with five or more frames that tells a tiny story, such as a seed growing into a flower. The hard part, on purpose: on start runs once and forever repeats. When the heart doesn't beat, ask which block the pictures are inside. When students get stuck: The heart does not beat after the fix. Ask: Which block are your hearts inside? Fix: Drag them inside forever, not under it. The block should hug them. / The animation flickers too fast to see. Ask: How long does each picture stay? Fix: Add a pause between pictures, such as 500. / A show leds block shows nothing. Ask: Which squares did you light? Fix: Click squares in the grid to turn them on. -->

<!-- Speaker note: Teacher: show leds is the first time students draw. Then pause: 1000 ms is one second. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make an animation of **three or more pictures** that plays forever. Draw at least one yourself.

Ideas: a blinking eye, rain falling, a ball bouncing, a waving stick figure.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-leds/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: Each picture is one block inside forever. Start with two, then add a third. / Draw small changes from picture to picture. That is what makes it look like movement. -->

<!-- Speaker note: Teacher: small changes between frames look like movement. Let students show each other. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run a shop sign

This sign scrolls a word, shows a face, then waits. Make it your own sign: change the word, swap the face, and add a frame.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-leds/?full=step-6#step-6)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Your animation has three pictures inside forever. What happens if you move them into on start?**

* They play once, and the last picture stays on.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson adds buttons, so the micro:bit waits for a press before it shows something. Class ideas: each table designs one frame and the class joins them into one animation; a classroom sign that scrolls the day's message. With real micro:bits, press Download and drag the file onto the micro:bit to run it for real. -->
