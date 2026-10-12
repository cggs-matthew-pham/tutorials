---
marp: true
theme: default
html: true
---

# A model drives a micro:bit

micro:bit and the computer · A model drives a build

<!-- Speaker note: Students send their model's labels from the board to a micro:bit over USB, program the micro:bit to act on each label and reply, then pass labels on by radio to a sorting flap. About 50 minutes (Predict and Run 8 min · Send labels 8 min · Investigate 8 min · Modify 10 min · Over radio 6 min (typical) · Make 10 min). -->

---

## Today

**We are learning to** the board sends your model's label down the USB cable as a line of text. The micro:bit's program decides what each label does, and must also handle labels it doesn't expect.

- I can program a micro:bit to act on lines of text it receives over USB.
- I can explain why the sender and receiver must agree on every word.
- I can handle a label my program doesn't expect.

<!-- Speaker note: Before class: **The idea:** the model sends only a word. The receiving program gives it meaning, so both sides must agree on the exact words (capital letters included), and the program needs a sensible action for anything else. **How it works:** the board (in Chrome or Edge) connects to the micro:bit with **Web Serial** at 115200 baud, MakeCode's default. When students click a test photo, the board sends its predicted label as a line of text; with the webcam, it sends a label once it has held above 80% confidence for a moment and differs from the last one sent. Lines the micro:bit sends back (**serial write value** gives `bin:1`) appear on the board. **Hardware:** a micro:bit and USB cable per pair; for Make, a second micro:bit and a small servo on P0. The MakeCode simulator cannot receive serial, so the board steps need real micro:bits. The hardware steps are marked typical, so students without hardware can still complete the lesson. **Before class:** check that Chrome or Edge on student devices lists the micro:bit after **Connect a micro:bit**. Assign each pair a radio group. Teacher: Send labels: students click photos first (reliable), then try the webcam. -->

---

## Why it matters

> A sorting machine's camera and its motors are separate parts. The camera's model only says 'Plastic'; a small controller decides which flap to move. The two have to agree on every word.

<!-- Speaker note: Last lesson you trained a model that labels photos. Now its labels drive a micro:bit, the same way the board's buttons did in **Commands from the computer**: the board sends the label as a **line of text** over the USB cable, and the micro:bit's program decides what to do. **You need:** a micro:bit, a USB cable, and **Chrome or Edge** on a laptop or Chromebook (other browsers can't talk to a micro:bit). The MakeCode simulator can't receive these messages, so the board steps run on a real micro:bit. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/9389c94224dd.png?v=dd2eb3a27a12856a)

**Your model has a Neither class. The board sends "Neither" to a micro:bit running this program. What does it show?**

- Nothing
- An error
- P
- L

<!-- Speaker note: What happens: L. The program checks only for "Paper"; else catches every other line, including "Neither". Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: many say Nothing. Ask: which lines reach else? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* L. The program checks only for "Paper"; else catches every other line, including "Neither".

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/microbit-computer/ai-microbit/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/microbit-computer/ai-microbit/?full=step-2#step-2)

<!-- Speaker note: Click **Download** in the editor and copy the program to your micro:bit. Leave it plugged in. If the editor is **connected** to the micro:bit, disconnect it (or close that tab): only one page can use the cable at a time. Students should be able to say: I downloaded the program to my micro:bit and left it plugged in. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fcode%2Fmicrobit-computer%2Fai-microbit%2Fstep-3&code=widget%3A+classifier%0Atestset%3A+recycling%0Agroups%3A+plain%2C+neither%0Awebcam%3A+on%0Aserial%3A+on%0Athreshold%3A+0.8%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/code/microbit-computer/ai-microbit/?full=step-3#step-3)

<!-- Speaker note: Paste your model's link and click **Load**, then **Connect a micro:bit** and choose it in the list. Click a test photo to send its label, or use the webcam: it sends a label once the same label has held above 80% confidence for a moment. Watch the micro:bit. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/9389c94224dd.png?v=dd2eb3a27a12856a)

<!-- Speaker note: What this step is for: The model sends only a word; the receiving program gives it meaning, so both sides must agree on the exact words, and the program must handle words it doesn't expect. -->

<!-- Speaker note: Teacher: Ben's sorter is the exact-text bug. Ask students to read both sides aloud. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What is sent

**What travels down the USB cable when the board sends a label?**

- A number from 1 to 3
- A line of text, such as Paper
- The whole model
- The photo

* Answer: A line of text, such as Paper

<!-- Speaker note: Only the label, as text, ending with a new line. The micro:bit never sees the photo or the model. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Ben's sorter

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/f4e32b2a3db4.png?v=afe8dce8bfa6f526)

**Ben's model has classes Paper and Plastic. His micro:bit never shows anything. Why?**

- He checks for "paper" and "plastic", but the board sends "Paper" and "Plastic"
- Serial only works with numbers
- He needs a forever block
- His micro:bit is too slow

* Answer: He checks for "paper" and "plastic", but the board sends "Paper" and "Plastic"

<!-- Speaker note: Text has to match exactly, capital letters included. Both sides must agree on every word. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Unsure labels

**Why does the webcam wait for a label to hold for a moment above 80% before sending it?**

- The cable is slow
- So a model that flickers between two labels doesn't make the micro:bit jump back and forth
- The micro:bit can only read one label a minute
- So the model can retrain

* Answer: So a model that flickers between two labels doesn't make the micro:bit jump back and forth

<!-- Speaker note: When the model is unsure, its top label changes many times a second. Acting on every change would make a sorter jitter. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Neither:** Give **Neither** its own branch that shows a cross, and make **Plastic** a branch of its own too.
- **Reply:** A sorter should say what it did. Make the micro:bit **reply** with **serial write value**: `bin` 1 for Paper, 2 for Plastic, 0 for anything else. On the board, 

[Open this step](https://tutorials.learningwaypoints.com/code/microbit-computer/ai-microbit/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Giving every label its own branch, and replying, makes the two sides agree. Hints, in order: Change else to else if, and add a third branch: label = "Neither". / serial write value is in Serial. Give it a name such as bin and a number. / Paper sends bin 1, Plastic bin 2, anything else bin 0. For students who need more support: Give the reply branch complete; students add the Neither branch only. For early finishers: Count how many items go in each bin and show the totals when button A is pressed. The hard part, on purpose: Seeing that the model sends only a word. When the micro:bit does nothing, ask whether the board shows the label leaving and the word matches exactly. When students get stuck: Connect a micro:bit lists nothing. Ask: Is the micro:bit plugged in with a data cable, and are you in Chrome or Edge? Fix: Try another cable (some only charge) and use Chrome or Edge. / The board says the micro:bit is busy. Ask: Is MakeCode connected to it in another tab? Fix: Disconnect it in MakeCode or close that tab, then connect again. / Labels are sent but nothing happens. Ask: Does your program check for exactly the words your model sends? Fix: Match the class names exactly, capital letters included. -->

<!-- Speaker note: Teacher: the reply is how a real sorter reports what it did. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Over radio

A sorter on a conveyor belt is not plugged into a laptop. This is the **bridge** from **A radio bridge**: the micro:bit on the cable passes each line on by **radio**, and passes radio values back to the board. Add **on radio received string** so a second micro:bit shows the first letter of each label and replies **got 1**. Download the same program to both micro:bits; plug one into the computer.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit-computer/ai-microbit/?full=step-6#step-6)

<!-- Speaker note: What this step is for: A micro:bit on the cable can pass each label on by radio, so the build that acts on it can be anywhere in the room. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make a sorting flap

Build a **sorting flap**: a servo on **P0** on the second micro:bit tips left for **Paper**, right for **Plastic**, and stays in the middle for anything else, then replies with the bin. Try it with your model and real items.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit-computer/ai-microbit/?full=step-7#step-7)

<!-- Speaker note: Hints, in order: A servo on pin P0: servo write pin P0 to 30 for Paper, 150 for Plastic and 90 (the middle) for anything else. / After each move, send the bin back by radio: radio send value bin 1, 2 or 0. -->

<!-- Speaker note: Teacher: test the flap angles without the model first by sending from the board's photos. -->

---

## On a real micro:bit

- **Chrome or Edge only.** Safari, Firefox and iPads can't connect.
- **"The micro:bit is busy"**: another tab (often MakeCode) is using the cable. Disconnect it there or close that tab.
- **Same radio group** on both micro:bits, and a different group for every pair in the room.
- A servo needs more power than USB sometimes gives: if it twitches or the micro:bit resets, use a battery pack or a servo board.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**The model sends "Glass", a class the micro:bit's program doesn't check for. What should the program do?**

* Something safe: an else branch that leaves the flap in the middle (or stops), so an unexpected label never causes a wrong action.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: AI on the micro:bit, a model trained on movements that runs on the micro:bit itself. Later, AI robots: a robot driven by a model, where a wrong or unsure label becomes a wrong move. -->
