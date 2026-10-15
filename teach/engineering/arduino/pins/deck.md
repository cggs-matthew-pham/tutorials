---
marp: true
theme: default
html: true
---

# Same circuit, new board

Arduino · A new board

<!-- Speaker note: Students run a blink sketch whose pin number doesn't match the wiring, fix every pin number, see the dim pull-up glow of a missing pinMode, build the circuit on an Uno in Tinkercad blocks and read the C++ beside them, then write a short sketch for a new pin. About 40 minutes (Predict and Try 6 min · Worked example 8 min · Vary 5 min · Tinkercad 12 min · Practise and Make 9 min). Sources: Tinkercad Circuits (Autodesk): simulator, link only, https://www.tinkercad.com/circuits (checked 12 October 2026); Arduino language reference (link), https://www.arduino.cc/reference/en/ (checked 12 October 2026); SparkFun Inventor's Kit Experiment Guide v4.1 (benchmark; CC BY-SA 4.0), https://learn.sparkfun.com/tutorials/sparkfun-inventors-kit-experiment-guide---v41 (checked 12 October 2026). -->

---

## Today

**We are learning to** an Arduino Uno names its pins by number, and the code must use the number of the pin the wire goes to. pinMode sets a pin as an output; digitalWrite switches it HIGH or LOW. The circuit ideas from the micro:bit carry straight over.

- I can match the pin numbers in a sketch to the wiring.
- I can set a pin as an output and switch it on and off.
- I can find the C++ behind Tinkercad's blocks.

<!-- Speaker note: Before class: The board in the lesson runs a subset of Arduino C++ against a model of an Uno (5 V pins, an LED and resistor per pin, simulated time). It behaves like the real board for the things these lessons teach: a missing ; stops the upload, a pin written HIGH without pinMode glows dimly (the internal pull-up), = in an if assigns. It is not a full compiler; real hardware comes in the next unit. Tinkercad: Arduino Uno R3 is in the components list; Code › Blocks + Text shows the generated C++ beside the blocks (it can't be edited until you switch to Text). Same class code as the micro:bit unit. Teacher: Find the mistake: the dim glow is a real effect students will see on hardware; name it the pull-up. Teacher: Tinkercad: ask which block made which line of C++. -->

---

## Why it matters

> Most electronics kits, sensors and project guides assume an Arduino. The circuits are the ones you already know. What changes is the board, and then the language.

<!-- Speaker note: This is an **Arduino Uno**. Like the micro:bit it has pins, but they are named by **number** (0 to 13, plus A0 to A5), and it is programmed in **C++**. The board on this page runs the sketches for you; in Tinkercad Circuits you can build the same thing with blocks and see the C++ beside them. ```cpp void setup() { pinMode(13, OUTPUT); // pin 13 is an output } void loop() { digitalWrite(13, HIGH); // pin 13 on (5 V) delay(500); // wait half a second digitalWrite(13, LOW); // pin 13 off (0 V) delay(500); } ``` -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**The LED (with its resistor) is wired to pin 12. The sketch above uses pin 13. When it runs, the LED…**

- Blinks, but dimly
- Stays on
- Blinks: the code makes it blink
- Stays dark

<!-- Speaker note: What happens: It stays dark. Pin 13 blinks, but nothing is wired to it. The LED is on pin 12, which the code never switches. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask students to point at the pin number in each line of the sketch. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Farduino%2Fpins%2Fstep-2&code=widget%3A+arduino%0Aled%3A+12%0Aedit%3A+off%0Acode%3A+void+setup%28%29+%7B%0Acode%3A+pinMode%2813%2C+OUTPUT%29%3B%0Acode%3A+%7D%0Acode%3A%0Acode%3A+void+loop%28%29+%7B%0Acode%3A+digitalWrite%2813%2C+HIGH%29%3B%0Acode%3A+delay%28500%29%3B%0Acode%3A+digitalWrite%2813%2C+LOW%29%3B%0Acode%3A+delay%28500%29%3B%0Acode%3A+%7D%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/arduino/pins/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It stays dark. Pin 13 blinks, but nothing is wired to it. The LED is on pin 12, which the code never switches.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Every pin number

Now find every line to change.

$$\text{pinMode(13, OUTPUT)}$$

1) $\text{digitalWrite(13, HIGH)}$ — Switches pin 13 to 5 V. Nothing is wired there.
2) $\text{digitalWrite(13, LOW)}$ — Switches pin 13 back to 0 V.
3) $\text{LED on pin 12}$ — Pin 12 is never set up or switched, so the LED stays dark.
4) $\text{fix: 12 in every line}$ — Or move the wire to pin 13. Code and wiring must agree.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write pinMode(13, OUTPUT) and say "Sets pin 13 up as an output. Pin 13, not the LED's pin 12." Line 1: write digitalWrite(13, HIGH) and say "Switches pin 13 to 5 V. Nothing is wired there." Line 2: write digitalWrite(13, LOW) and say "Switches pin 13 back to 0 V." Line 3: write LED on pin 12 and say "Pin 12 is never set up or switched, so the LED stays dark." Line 4: write fix: 12 in every line and say "Or move the wire to pin 13. Code and wiring must agree." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Every pin number

**Which lines must change so the sketch blinks the LED on pin 12?**

- Only pinMode
- All three: pinMode and both digitalWrite lines
- Only the first digitalWrite
- None: change the wire instead

* Answer: All three: pinMode and both digitalWrite lines

<!-- Speaker note: Every line that names a pin must name 12: setting it up, switching it on and switching it off. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam's LED is on pin 13. It doesn't blink: it just glows very dimly now and then. Click the line where Sam's sketch goes wrong.**

```
 1  void setup() {
 2    pinMode(12, OUTPUT);
 3  }
 4  
 5  void loop() {
 6    digitalWrite(13, HIGH);
 7    delay(500);
 8    digitalWrite(13, LOW);
 9    delay(500);
10  }
```

* Answer: line 2

<!-- Speaker note: Line 2: pin 13 was never set as an OUTPUT (pin 12 was). Writing HIGH to a pin that is still an input only switches on its weak pull-up, so the LED glows dimly instead of lighting. -->

<style scoped>pre, marp-pre { font-size: 0.58em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change the pin



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/arduino/pins/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Changing every pin number in the code, then running it, applies the move directly. Hints, in order: Three lines name a pin. / pinMode(12, OUTPUT); digitalWrite(12, HIGH); digitalWrite(12, LOW); For students who need more support: A printed sketch with the pin numbers highlighted. For early finishers: Wire a second LED on pin 9 and blink them in turn. The hard part, on purpose: C++ looks dense after blocks. Read it aloud line by line and point at the pin number in each. When students get stuck: A student changes only pinMode. Ask: Which pin does each digitalWrite line switch? Fix: Every line that names a pin. / Upload fails with a ; error. Ask: Which line does the message name, and how does it end? Fix: Every statement ends with ; -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build it in Tinkercad



<!-- Speaker note: What this step is for: Building the circuit on an Uno in Tinkercad with blocks, then opening the Blocks + Text view, shows that the blocks are this C++. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Set up a pin

**A buzzer is wired to pin 8. Which line sets it up?**

- pinMode(8);
- digitalWrite(8, OUTPUT);
- pinMode(8, OUTPUT);
- pinMode(OUTPUT, 8);

* Answer: pinMode(8, OUTPUT);

<!-- Speaker note: pinMode(pin, mode): pin 8, as an OUTPUT. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A dim glow

**An LED glows very dimly instead of lighting, and the pin numbers all match. What is the most likely cause?**

- The pin was never set with pinMode(pin, OUTPUT)
- delay is too short
- The LED is the wrong way round
- The resistor is too small

* Answer: The pin was never set with pinMode(pin, OUTPUT)

<!-- Speaker note: HIGH on a pin left as an input only turns on its weak pull-up: a faint glow. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your own sketch



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/arduino/pins/?full=step-7#step-7)

<!-- Speaker note: What this step is for: Writing pinMode and digitalWrite from scratch for a new pin puts the lesson's two lines together without a model to copy. Hints, in order: setup() runs first: set the pin up there. / pinMode(7, OUTPUT); in setup(), digitalWrite(7, HIGH); in loop(). / Every line ends with ; -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**An LED is wired to pin 4. Write the two lines that set it up and switch it on.**

* pinMode(4, OUTPUT); (in setup) and digitalWrite(4, HIGH); (in loop).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Reading the C++ (what setup() and loop() do, and timing with delay). Circuits with the micro:bit: the same loop and resistor ideas. -->
