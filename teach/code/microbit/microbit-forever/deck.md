---
marp: true
theme: default
html: true
---

# Again and again

micro:bit Foundations · Show and react

<!-- Speaker note: Students move pictures from on start into forever so they repeat, and use pause to set how long each frame stays. About 40 minutes (Predict and Run 8 min · Investigate 10 min · Modify 8 min · Make 10 min · Shop sign 4 min). -->

---

## Today

**We are learning to** put pictures inside forever so they repeat, and use pause to set how long each one stays.

- I can use forever to repeat blocks.
- I can say what pause does inside a loop.
- I can build an animation from pictures and pauses.

<!-- Speaker note: Before class: A program has two places to put blocks. **on start** runs its blocks once. **forever** runs its blocks again and again: a **loop**. Most surprises in this lesson come from which of the two a block is in. Try the Make yourself: three pictures in forever, one drawn with **show leds**. -->

---

## Why it matters

> Scrolling signs at train stations and the lights on a pedestrian crossing run the same simple loop: show a picture, wait, show the next one, and start again.

<!-- Speaker note: Last lesson the blocks in **on start** ran once and the last picture stayed. A program has a second place to put blocks: **forever**. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:204](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/f22e0bb1efd2.png?v=a4265390cb3d4293)

**Ada wants a beating heart. Her hearts are in on start, and forever is empty. What will she see?**

- Only the big heart
- The big heart, then the small heart, which stays
- The hearts beating over and over
- Nothing, because forever is empty

<!-- Speaker note: What happens: The big heart, then the small heart, which stays. Blocks in on start run once. forever repeats, but there is nothing inside it to repeat. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students choose 'beating over and over'. Ask: which block are the hearts inside? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The big heart, then the small heart, which stays. Blocks in on start run once. forever repeats, but there is nothing inside it to repeat.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/microbit/microbit-forever/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-forever/?full=step-2#step-2)

<!-- Speaker note: Watch for a few seconds. Does the heart beat? Students should be able to say: I watched it run and compared it with my prediction. -->

<!-- Speaker note: Teacher: the small heart stays. Last lesson's rule still holds: on start runs once. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:204](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/f22e0bb1efd2.png?v=a4265390cb3d4293)

<!-- Speaker note: What this step is for: Blocks inside forever run again and again: when the last one finishes, forever starts again from the top. pause holds a picture, then the loop carries on. -->

<!-- Speaker note: Teacher: students fix Ada's program in the editor; the check ticks by itself. Take a vote on the pause question before anyone adds a pause. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## How often?

**How many times does forever run the blocks inside it?**

- Again and again, until the micro:bit is switched off
- Twice
- Once

* Answer: Again and again, until the micro:bit is switched off

<!-- Speaker note: forever starts again from its first block as soon as it reaches the last one. That is a loop. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Add a pause

**Ada adds pause 1000 after the small heart, inside forever. What happens?**

- The loop stops after one second
- Nothing changes
- The small heart stays for one second, then the big heart comes back
- Both hearts stay for one second, together

* Answer: The small heart stays for one second, then the big heart comes back

<!-- Speaker note: pause only waits. The small heart stays on for 1000 ms, then forever carries on from the top with the big heart. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Be the loop <span style="font-size:.6em;color:#64748b">(4 min)</span>

Three students hold picture cards in a row. A fourth walks along them, showing each card in turn, and goes back to the start after the last one.

<!-- Speaker note: Add a pause: the walker stops at one card and counts to three. The loop carries on afterwards. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Draw your own picture:** Swap the small heart for a **show leds** block and draw your own picture.
- **Slow the beat:** Add a **pause** between the pictures. Try `500`, then try other numbers.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-forever/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Every frame of an animation is one block in the loop, and pause sets how long each frame stays. Hints, in order: show leds is in Basic. Drag it into forever. / Click squares in the grid to light them. Then delete the small heart. / pause is in Basic. 1000 ms is one second. For students who need more support: Give students two show leds blocks already in forever, and ask them only to draw the pictures and add a pause. For early finishers: Make an animation with five or more frames that tells a tiny story, such as a seed growing into a flower. The hard part, on purpose: on start runs once and forever repeats. When the heart doesn't beat, ask which block the pictures are inside. When students get stuck: The heart does not beat after the fix. Ask: Which block are your hearts inside? Fix: Drag them inside forever, not under it. The block should hug them. / The animation flickers too fast to see. Ask: How long does each picture stay? Fix: Add a pause between pictures, such as 500. / A student thinks the program stopped after a pause. Ask: Watch for two more seconds. What comes after the pause? Fix: pause waits, then forever carries on from where it was. -->

<!-- Speaker note: Teacher: then pause. 1000 ms is one second. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make an animation of **three or more pictures** that plays forever. Draw at least one yourself.

Ideas: a blinking eye, rain falling, a ball bouncing, a waving stick figure.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-forever/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: Each picture is one block inside forever. Start with two, then add a third. / Draw small changes from picture to picture. That is what makes it look like movement. -->

<!-- Speaker note: Teacher: small changes between frames look like movement. Let students show each other. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run a shop sign

This sign scrolls a word, shows a face, then waits, again and again. Make it your own sign: change the word, swap the face, and add a frame.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit/microbit-forever/?full=step-6#step-6)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Your animation has three pictures inside forever. What happens if you move them into on start?**

* They play once, and the last picture stays on.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson adds buttons, so the micro:bit waits for a press before it shows something. Class idea: each table designs one frame and the class joins them into one animation. -->
