---
marp: true
theme: default
html: true
---

# Name a job

micro:bit: talk and play · Name a job

<!-- Speaker note: Students name a job as a function and call it from several places, and see in Python that every event block is a function the micro:bit calls. About 45 minutes (Predict and Run 8 min · Investigate 12 min · Modify 10 min · Mix it up 3 min · Make 9 min · Alarm 3 min). -->

---

## Today

**We are learning to** name some blocks once as a function, then call it by name wherever you need it.

- I can make a function and call it from more than one place.
- I can say why a function is better than copied blocks.
- I can explain that an event block is a function the micro:bit calls for me.

<!-- Speaker note: Before class: A **function** is a named job: some blocks with a name, made once in **Advanced › Functions**. Making it does **not** run it. It runs when a **call** block calls it, once per call. One copy serves every call, so a change to the function reaches every place at once; copied blocks have to be changed in every copy. The **Python** button at the top of the editor shows the same program as text: every event block (*on button A pressed*) becomes a function, handed to the micro:bit to call. Students only read the Python. Functions with inputs (parameters) come later, in Secret messages. Teacher: Say it plainly: an event block is a function. You make it; the micro:bit calls it on each press. Teacher: Mix it up: a random pick that misses an item, from the last course. -->

---

## Why it matters

> A recipe says 'make the sauce' and the sauce is written once, on another page. Programs name their jobs the same way.

<!-- Speaker note: When the same blocks are needed in several places, you can **name** them once as a **function**, then **call** it by name wherever you need it. Make one in **Advanced › Functions › Make a Function**. The **call** block then appears in the same place. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:303](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/06c8ee0a6a7a.png?v=1e692d0e2154b176)

**You press A once. How many times does the heart flash?**

- Twice
- Four times
- Once
- It keeps flashing

<!-- Speaker note: What happens: Twice. The flashHeart blocks run each time the function is called, and A calls it two times. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: some students expect one flash per press. Point at the two call blocks. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Twice. The flashHeart blocks run each time the function is called, and A calls it two times.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-functions/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-functions/?full=step-2#step-2)

<!-- Speaker note: Press **A** and count the flashes. Students should be able to say: I pressed A, counted the flashes and compared with my prediction. -->

<!-- Speaker note: Teacher: count together. Each call runs the whole function once. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:303](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/06c8ee0a6a7a.png?v=1e692d0e2154b176)

<!-- Speaker note: What this step is for: A function's blocks run only when it is called, once per call, so one copy serves every place that calls it. Every event block is a function too. -->

<!-- Speaker note: Teacher: Noah's mistake (making but never calling) and the two copies are this lesson's ideas. Then switch the editor to Python together before the match. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Noah's flash

Noah's program:

![h:303](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/d9ff58b98112.png?v=031f8f68d86b4119)

**Noah made the flashHeart function. He presses A and nothing happens. Why?**

- Nothing calls flashHeart: making a function does not run it
- Functions only work with B
- He needs a pause first
- The function is too long

* Answer: Nothing calls flashHeart: making a function does not run it

<!-- Speaker note: Making a function only names the job. It runs when a call block runs it. Noah's A event is empty, so nothing calls it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two copies

**Without a function, the flash blocks are copied into A and into shake. You change the heart to a diamond in A only. What goes wrong?**

- Both flash a diamond
- A flashes a diamond and shake still flashes a heart
- Nothing
- The program stops

* Answer: A flashes a diamond and shake still flashes a heart

<!-- Speaker note: Copied blocks have to be changed in every copy. With a function there is one copy, so one change reaches every call. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## The same program in Python

MakeCode can show every program in Python. Here is this one:

```python
def flash_heart():
    basic.show_icon(IconNames.HEART)
    basic.pause(200)
    basic.clear_screen()
    basic.pause(200)
def on_button_pressed_a():
    flash_heart()
    flash_heart()
input.on_button_pressed(Button.A, on_button_pressed_a)
```

Look at what Python did with **on button A pressed**: the blocks inside became a function, and the micro:bit calls it on each press.

<style scoped>pre, marp-pre { font-size: 0.63em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The same program in Python

**This is the same program in Python (press Python at the top of the editor). Match each Python line with what it does.**

| | |
|---|---|
| `def flash_heart():` | A. calls it: runs its blocks once |
| `flash_heart()` | B. makes the function flash_heart |
| `def on_button_pressed_a():` | C. makes a function from the blocks inside on button A pressed |
| `input.on_button_pressed(Button.A, on_button_pressed_a)` | D. hands that function to the micro:bit to call on each press |

* Answer: def flash_heart(): → B. makes the function flash_heart; flash_heart() → A. calls it: runs its blocks once; def on_button_pressed_a(): → C. makes a function from the blocks inside on button A pressed; input.on_button_pressed(Button.A, on_button_pressed_a) → D. hands that function to the micro:bit to call on each press

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Call the move <span style="font-size:.6em;color:#64748b">(4 min)</span>

The class agrees one move, 'the wave' (two arm positions). The teacher calls "wave, wave, jump"; students do each move when it is called, and not before.

<!-- Speaker note: Agreeing the move is making the function; calling its name runs it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Three flashes:** Make **B** flash the heart **three** times. Use the function: do not copy the blocks.
- **A second job:** Make a function **flashSad** that flashes a sad face. Call it when the micro:bit is shaken.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-functions/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Calling a function more times reuses it for free, and a second function names a second job. Hints, in order: Drag in on button B pressed, then three call flashHeart blocks from Functions. / Make a Function called flashSad, with show icon sad face, pause, clear screen, pause. / Then call it from on shake. For students who need more support: Give students the two dance functions already made with one picture each, and ask them to add a second picture and the calls. For early finishers: Make a third move and a routine of all three, called from A+B. The hard part, on purpose: Making a function does nothing until it is called. When a press does nothing, ask which block calls the function. When students get stuck: Nothing happens when the button is pressed. Ask: Which block calls your function? Fix: Add a call block (from Functions) inside the button event. / The call block is missing from the toolbox. Ask: Have you made the function yet? Fix: Make the function first; its call block then appears under Functions. / The student copied the flash blocks instead of calling. Ask: If you change the picture, how many places must you change? Fix: Delete the copy and call the function instead. -->

<!-- Speaker note: Teacher: three flashes means three calls, not copied blocks. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b00ea82d283a.png?v=7d4385e9bed994c9)

<!-- Speaker note: Sol's team picker, from the last course. What this step is for: A random place must reach from 0 to length − 1, or some items never come up. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**Sol's team picker has five names, but picks from 0 to 3. Whose name never comes up?**

- Ava
- Eve
- Nobody's: they all come up
- Dev

* Answer: Eve

<!-- Speaker note: Eve is the fifth name, at place 4. pick random 0 to 3 never reaches place 4. Picking from 0 to length − 1 would. What this step is for: A random place must reach from 0 to length − 1, or some items never come up. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a **stick-figure dance**. Make two dance moves as functions (for example *wave* and *jump*), each with two or more pictures. Then choreograph: **A** and **B** each call a move, and a **shake** calls a routine of both.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-functions/?full=step-6#step-6)

<!-- Speaker note: Hints, in order: Make two functions, such as wave and jump. Each has two or more show leds pictures. / A calls one, B calls the other, and shake calls both, one after the other. -->

<!-- Speaker note: Teacher: two dance moves as functions, then a routine. Let students perform their dance for the class. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change an alarm

This alarm beeps and flashes three times when A is pressed, using one function. Make the function's beep higher or lower, then make **B** sound a longer alarm (more calls).

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-functions/?full=step-7#step-7)

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Dance off <span style="font-size:.6em;color:#64748b">(3 min)</span>

Perform your micro:bit's dance for the next pair: they press the buttons, you name the function each one calls.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**You make a function, but never call it. What happens when the program runs?**

* Nothing from that function: its blocks only run when something calls it.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next unit: radio. on radio received is one more event block, so one more function the micro:bit calls. Class idea: a class dance where each group writes one move as a function. -->
