---
marp: true
theme: default
html: true
---

# Functions

micro:bit Foundations · Collections and tools

<!-- Speaker note: Students name a job as a function and call it from several places, add a parameter, and see in Python that every event block is a function the micro:bit calls. About 50 minutes (Predict and Run 8 min · Investigate 15 min · Modify 12 min · Make 10 min · Alarm 5 min). -->

---

## Today

**We are learning to** name a job once as a function, then use it from anywhere. Then see that every event block is a function too.

- I can make a function and call it from more than one place.
- I can give a function a parameter and call it with different values.
- I can explain that an event block is a function the micro:bit calls for me.

<!-- Speaker note: Before class: A **function** is a named job: some blocks with a name, made once in **Advanced › Functions**. Making it does **not** run it. It runs when a **call** block calls it, once per call. A **parameter** is an input to the function, such as `points` in *showScore(points)*, so one function can do a slightly different job each time. This lesson starts the **Python peek**: the **Python** button at the top of the editor shows the same program as text. The big reveal is that every event block (*on button A pressed*) becomes a function in Python, handed to the micro:bit to call when the event happens. Students only read the Python; nobody needs to write it. Teacher: Say it plainly: an event block is a function. You make it; the micro:bit calls it on each press. Teacher: Alarm: the beep is inside the function, so changing it changes every call. -->

---

## Why it matters

> A recipe card says 'make the sauce (see page 12)' instead of writing the sauce out every time. A function is that named job, written once and used everywhere.

<!-- Speaker note: When the same blocks are needed in several places, you can **name** them once as a **function**, then **call** it by name wherever you need it. Make one in **Advanced › Functions › Make a Function**. The **call** block then appears in the same place. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:303](https://tutorials.learningwaypoints.com/_pictures/makecode/code/06c8ee0a6a7a.png?v=1e692d0e2154b176)

**You press A once. How many times does the heart flash?**

- It keeps flashing
- Once
- Four times
- Twice

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

[tutorials.learningwaypoints.com/code/microbit/microbit-functions/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/microbit/microbit-functions/?full=step-2#step-2)

<!-- Speaker note: Press **A** and count the flashes. Students should be able to say: I pressed A, counted the flashes and compared with my prediction. -->

<!-- Speaker note: Teacher: count together. Each call runs the whole function once. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:303](https://tutorials.learningwaypoints.com/_pictures/makecode/code/06c8ee0a6a7a.png?v=1e692d0e2154b176)

<!-- Speaker note: What this step is for: A function's blocks run only when it is called, once per call. Every event block is a function too: in Python you can see it handed to the micro:bit. -->

<!-- Speaker note: Teacher: Noah's mistake (making but never calling) is this lesson's misconception. Then switch the editor to Python together and read it line by line before the match. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Noah's flash

Noah's program:

![h:303](https://tutorials.learningwaypoints.com/_pictures/makecode/code/3e3f713a27d0.png?v=8ee9a305b449a786)

**Noah made the flashHeart function. He presses A and nothing happens. Why?**

- Functions only work with B
- He needs a pause first
- The function is too long
- Nothing calls flashHeart: making a function does not run it

* Answer: Nothing calls flashHeart: making a function does not run it

<!-- Speaker note: Making a function only names the job. It runs when a call block runs it. Noah's A event is empty, so nothing calls it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

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

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The same program in Python

**This is the same program in Python (press Python at the top of the editor). Match each Python line with what it does.**

| | |
|---|---|
| `def flash_heart():` | A. makes a function from the blocks inside on button A pressed |
| `flash_heart()` | B. hands that function to the micro:bit to call on each press |
| `def on_button_pressed_a():` | C. calls it: runs its blocks once |
| `input.on_button_pressed(Button.A, on_button_pressed_a)` | D. makes the function flash_heart |

* Answer: def flash_heart(): → D. makes the function flash_heart; flash_heart() → C. calls it: runs its blocks once; def on_button_pressed_a(): → A. makes a function from the blocks inside on button A pressed; input.on_button_pressed(Button.A, on_button_pressed_a) → B. hands that function to the micro:bit to call on each press

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What is an event?

**What is an event block, such as on button A pressed, really?**

- A variable that stores A
- A list of buttons
- A loop that checks A again and again
- A function that the micro:bit calls each time A is pressed

* Answer: A function that the micro:bit calls each time A is pressed

<!-- Speaker note: In Python you can see it: the blocks inside become a function, and the micro:bit calls that function every time the event happens. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Three flashes:** Make **B** flash the heart **three** times. Use the function: do not copy the blocks.
- **A function with an input:** Make a function **showScore** with a number **parameter** called `points`. It shows the word Score, then the number. Make **A+B** call it with 5. Then try other

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-functions/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Calling a function more times reuses it for free, and a parameter lets one function do a slightly different job each time. Hints, in order: Drag in on button B pressed, then three call flashHeart blocks from Functions. / Make a Function called showScore. Click Add a parameter › Number, and name it points. / Inside: show string Score, then show number points (drag points out of the function block). Call showScore with 5 on A+B. For students who need more support: Give students the two dance functions already made with one picture each, and ask them to add a second picture and the calls. For early finishers: Make a function flash(times) with a parameter, using a repeat block from Loops so it flashes that many times. The hard part, on purpose: Making a function does nothing until it is called. When a press does nothing, ask which block calls the function. When students get stuck: Nothing happens when the button is pressed. Ask: Which block calls your function? Fix: Add a call block (from Functions) inside the button event. / The call block is missing from the toolbox. Ask: Have you made the function yet? Fix: Make the function first; its call block then appears under Functions. / The parameter number has no effect. Ask: Inside the function, which number do you show? Fix: Drag the points variable out of the function's header into show number. -->

<!-- Speaker note: Teacher: three flashes means three calls, not copied blocks. The parameter task is new: show where Add a parameter is. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a **stick-figure dance**. Make two dance moves as functions (for example *wave* and *jump*), each with two or more pictures. Then choreograph: **A** and **B** each call a move, and a **shake** calls a routine of both.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-functions/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: Each dance move is a function with two or more show leds pictures inside. / Call the moves from the buttons. A shake could call both, one after the other. -->

<!-- Speaker note: Teacher: two dance moves as functions, then a routine. Let students perform their dance for the class. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change an alarm

This alarm beeps and flashes three times when A is pressed, using one function. Make the function's beep higher or lower, then make **B** sound a longer alarm (more calls).

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-functions/?full=step-6#step-6)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**You make a function, but never call it. What happens when the program runs?**

* Nothing from that function: its blocks only run when something calls it.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next unit: radio. on radio received is one more event block, so one more function the micro:bit calls. From here, most lessons include a short Python peek. Class ideas: a class dance where each group writes one move as a function. -->
