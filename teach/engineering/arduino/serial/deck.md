---
marp: true
theme: default
html: true
---

# Talking to the computer

Arduino · Writing C++

<!-- Speaker note: Students open the serial line in setup(), print a knob's reading every loop and watch it change, build lines with print and println, meet C++'s "words" + number trap (it moves along the text instead of joining), fix a missing Serial.begin, and print a percentage with map. About 40 minutes (Predict and Try 5 min · Worked example 9 min · Vary 8 min · Tinkercad 8 min · Practise and Make 10 min). Sources: Arduino language reference: Serial (link), https://www.arduino.cc/reference/en/language/functions/communication/serial/ (checked 12 October 2026). -->

---

## Today

**We are learning to** serial.begin(9600) in setup() opens a line to the computer; Serial.println(level) sends a value and starts a new line, and Serial.print stays on the same line. The serial monitor shows what the board sees, which is how you test and debug a sketch. In C++, "words" + a number does not join them.

- I can print a value to the serial monitor.
- I can use print and println to build a line.
- I can use printing to find out what my sketch sees.

<!-- Speaker note: Before class: The board behaves like the real one: nothing prints without Serial.begin, and "words" + a number moves along the text (pointer arithmetic), printing the end of the words or nonsense. A real board would print whatever happens to be in memory; ours prints a few shaded blocks. The baud rate (9600) must match the monitor's setting on real hardware; the board here ignores it. Teacher: Find the mistake: show that Python would join them; C++ doesn't. -->

---

## Why it matters

> Your sketch decides from a number you can't see. When the LED does something odd, how do you find out what the board actually read?

<!-- Speaker note: The **serial monitor** shows text the board sends over the USB cable. On this page it is under the board; in Tinkercad and the Arduino IDE it is a panel you open. ```cpp void setup() { Serial.begin(9600); // open the line to the computer (9600 bits a second) } void loop() { Serial.print("Level: "); // words, and stay on this line Serial.println(level); // the number, then a new line } ``` -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**The knob is halfway. loop() runs Serial.println(level); after level = analogRead(A0);. What does the serial monitor show?**

- level
- Nothing
- 512, on a new line each time
- Level: 512

<!-- Speaker note: What happens: 512 (halfway on 0 to 1023), one line every time loop() runs. println prints the variable's value, not its name. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask why it is not 'level'. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Farduino%2Fserial%2Fstep-2&code=widget%3A+arduino%0Aknob%3A+A0%0Alevel%3A+50%0Aedit%3A+off%0Acode%3A+int+level+%3D+0%3B%0Acode%3A%0Acode%3A+void+setup%28%29+%7B%0Acode%3A+Serial.begin%289600%29%3B%0Acode%3A+%7D%0Acode%3A%0Acode%3A+void+loop%28%29+%7B%0Acode%3A+level+%3D+analogRead%28A0%29%3B%0Acode%3A+Serial.println%28level%29%3B%0Acode%3A+delay%28250%29%3B%0Acode%3A+%7D%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/arduino/serial/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 512 (halfway on 0 to 1023), one line every time loop() runs. println prints the variable's value, not its name.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Build a line

Now pick the pair that does this.

$$\text{Serial.begin(9600);}$$

1) $\text{Serial.print("Level: ");}$ — Send the words. The cursor stays on this line.
2) $\text{Serial.println(level);}$ — Send the value of level (512), then a new line.
3) $\text{monitor: Level: 512}$ — One line per loop().

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write Serial.begin(9600); and say "In setup(): open the line. Nothing prints without it." Line 1: write Serial.print("Level: "); and say "Send the words. The cursor stays on this line." Line 2: write Serial.println(level); and say "Send the value of level (512), then a new line." Line 3: write monitor: Level: 512 and say "One line per loop()." -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Build a line

**Which pair of lines prints Level: 512 on one line, then starts a new line?**

- Serial.println("Level: "); Serial.print(level);
- Serial.println("Level: "); Serial.println(level);
- Serial.print("Level: "); Serial.print(level);
- Serial.print("Level: "); Serial.println(level);

* Answer: Serial.print("Level: "); Serial.println(level);

<!-- Speaker note: print stays on the line; println ends it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam's monitor shows bits of Level: and then nonsense instead of Level: 512. Click the line where Sam's sketch goes wrong.**

```
 1  int level = 0;
 2  
 3  void setup() {
 4    Serial.begin(9600);
 5  }
 6  
 7  void loop() {
 8    level = analogRead(A0);
 9    Serial.println("Level: " + level);
10    delay(250);
11  }
```

* Answer: line 9

<!-- Speaker note: Line 9: in C++, "Level: " + level doesn't join them (as Python would); it moves level characters along the text and prints what is there. Use Serial.print("Level: "); then Serial.println(level); -->

<style scoped>pre, marp-pre { font-size: 0.53em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change one thing



- **Add a label:** 
- **Nothing printed:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/arduino/serial/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Adding a label shows print and println together; removing Serial.begin shows why it is in setup(). For students who need more support: A card: print = same line, println = new line, begin first. For early finishers: Print Level: 512 (dark) or Level: 512 (light) depending on a threshold. The hard part, on purpose: Python habits: + to join text. Show what the board really prints, then the two-line fix. When students get stuck: Nothing prints. Ask: Which line opens the line to the computer? Fix: Serial.begin(9600); in setup(). / All the numbers run together on one line. Ask: Which call starts a new line? Fix: println. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build it in Tinkercad



<!-- Speaker note: What this step is for: Tinkercad's serial monitor is the one students will use for the real board, so they practise opening and reading it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Print and println

**loop() is Serial.print(1); Serial.print(2); Serial.println(3);. What does the monitor show after two loops?**

- 123123 on one line
- 6, then 6
- 123 on one line, then 123 on the next
- 1, 2 and 3 on separate lines, twice

* Answer: 123 on one line, then 123 on the next

<!-- Speaker note: print, print, println: one line of 123 per loop. -->

<!-- Speaker note: Teacher: link back to the night light. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Debugging

**A night light comes on in daylight. What is the most useful first step?**

- Print the reading and compare it with the threshold
- Rewrite the whole sketch
- Add a longer delay
- Swap the LED

* Answer: Print the reading and compare it with the threshold

<!-- Speaker note: Printing the value shows whether the reading or the threshold is the problem. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: print a percentage



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/arduino/serial/?full=step-7#step-7)

<!-- Speaker note: What this step is for: Printing a calculated value (with map) combines a variable, a calculation and println: the monitor then shows the knob as people think of it. Hints, in order: map(value, fromLow, fromHigh, toLow, toHigh) rescales a number. / int percent = map(level, 0, 1023, 0, 100); / Serial.println(percent); and test at both ends of the knob. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Write the two lines in loop() that print Temp: and then the value of temp on one line.**

* Serial.print("Temp: "); Serial.println(temp);

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Outputs that vary (analogWrite and PWM). Code: micro:bit and the computer uses the same serial idea from MakeCode. -->
