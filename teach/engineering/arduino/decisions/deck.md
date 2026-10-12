---
marp: true
theme: default
html: true
---

# Values and decisions

Arduino · Writing C++

<!-- Speaker note: Students read a sketch that stores a knob's reading in an int and switches an LED with if and else, test it across the threshold, meet the two classic slips (a missing ; that stops the upload, and = in an if that makes it always true), fix both, and light the LED in a band with &&. About 45 minutes (Predict and Try 6 min · Worked example 10 min · Vary 12 min · Tinkercad 8 min · Practise and Make 9 min). Sources: Arduino language reference (link), https://www.arduino.cc/reference/en/ (checked 12 October 2026). -->

---

## Today

**We are learning to** a variable is declared with its type, int level = 0;. analogRead(A0) gives 0 to 1023, and if (level > 500) { … } else { … } decides. == compares; a single = sets the variable, even inside an if. Every statement ends with ;, or the sketch won't upload.

- I can declare an int and store a reading in it.
- I can write an if and else to decide.
- I can fix a missing ; and an = that should be a comparison.

<!-- Speaker note: Before class: The board stops the upload for a missing ; (naming the line) like the real compiler, and runs = in an if as an assignment, as C++ does (the real compiler gives at most a warning). An undeclared name is an error too. The micro:bit night light (Circuits › Sensors that vary) is the same decision. Teacher: Find the mistake: ask what value level has after line 9. Teacher: Vary, won't upload: insist they read the message before looking. -->

---

## Why it matters

> The night light on the micro:bit decided with a threshold. Same idea, new words: what does it look like in C++, and which two tiny slips stop it working?

<!-- Speaker note: ```cpp int level = 0; // a whole-number variable, starting at 0 void loop() { level = analogRead(A0); // 0 to 1023, as on the micro:bit if (level > 500) { // compare digitalWrite(13, HIGH); } else { digitalWrite(13, LOW); } delay(100); } ``` `int` means a whole number. `>` `<` `>=` `<=` `==` `!=` compare. The `{ }` after `if` holds what to do when it is true; `else { }` when it isn't. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**The knob is turned all the way down. After level = analogRead(A0); what is level, and is the LED on?**

- LOW, and the LED is off
- 0, and the LED is on
- 1023, and the LED is on
- 0, and the LED is off

<!-- Speaker note: What happens: level is 0 (analogRead gives 0 to 1023), 0 is not greater than 500, so the else switches the LED off. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask which kind of thing level holds. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fengineering%2Farduino%2Fdecisions%2Fstep-2&code=widget%3A+arduino%0Aled%3A+13%0Aknob%3A+A0%0Alevel%3A+20%0Aedit%3A+off%0Acode%3A+int+level+%3D+0%3B%0Acode%3A%0Acode%3A+void+setup%28%29+%7B%0Acode%3A+pinMode%2813%2C+OUTPUT%29%3B%0Acode%3A+%7D%0Acode%3A%0Acode%3A+void+loop%28%29+%7B%0Acode%3A+level+%3D+analogRead%28A0%29%3B%0Acode%3A+if+%28level+%3E+500%29+%7B%0Acode%3A+digitalWrite%2813%2C+HIGH%29%3B%0Acode%3A+%7D+else+%7B%0Acode%3A+digitalWrite%2813%2C+LOW%29%3B%0Acode%3A+%7D%0Acode%3A+delay%28100%29%3B%0Acode%3A+%7D%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/engineering/arduino/decisions/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* level is 0 (analogRead gives 0 to 1023), 0 is not greater than 500, so the else switches the LED off.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Read it

Now: what happens at exactly 500?

$$\text{int level = 0;}$$

1) $\text{level = analogRead(A0);}$ — Store the knob's reading (0 to 1023) in level.
2) $\text{if (level > 500)}$ — Is it greater than 500? True or false.
3) $\text{true: digitalWrite(13, HIGH);}$ — The first { } runs: LED on.
4) $\text{false: digitalWrite(13, LOW);}$ — The else { } runs: LED off.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write int level = 0; and say "A whole-number variable called level, starting at 0." Line 1: write level = analogRead(A0); and say "Store the knob's reading (0 to 1023) in level." Line 2: write if (level > 500) and say "Is it greater than 500? True or false." Line 3: write true: digitalWrite(13, HIGH); and say "The first runs: LED on." Line 4: write false: digitalWrite(13, LOW); and say "The else runs: LED off." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Read it

**The knob reads 500 exactly. Is the LED on?**

- Only if level is an int
- No: 500 is not greater than 500
- Yes: 500 is the threshold
- It flickers

* Answer: No: 500 is not greater than 500

<!-- Speaker note: level > 500 is false for 500, so the else runs. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam's LED stays on whatever the knob does. Click the line where Sam's sketch goes wrong.**

```
 1  int level = 0;
 2  
 3  void setup() {
 4    pinMode(13, OUTPUT);
 5  }
 6  
 7  void loop() {
 8    level = analogRead(A0);
 9    if (level = 500) {
10      digitalWrite(13, HIGH);
11    } else {
12      digitalWrite(13, LOW);
13    }
14  }
```

* Answer: line 9

<!-- Speaker note: Line 9: level = 500 sets level to 500 and the if uses that value, which isn't 0, so it is always true. Comparing needs == (or here, >). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change one thing



- **Below 300:** 
- **Won't upload:** 
- **Always on:** 

[Open this step](https://tutorials.learningwaypoints.com/engineering/arduino/decisions/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Changing the comparison, then fixing each slip on the board, gives students the compiler's message and the logic symptom to recognise. For students who need more support: A card: '= sets, == compares, every statement ends with ;'. For early finishers: Use two LEDs (pins 13 and 12): one for below 300, one for above 700. The hard part, on purpose: The two slips are invisible at a glance. Teach students to read the error's line number first, and to say '= sets, == compares' aloud. When students get stuck: A student's LED is always on. Ask: What does a single = do? Fix: Use > or ==. / A student can't find the ; slip. Ask: Which line does the message name? Look at the end of it. Fix: Add the ; -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build it in Tinkercad



<!-- Speaker note: What this step is for: Tinkercad's real compiler gives its own error for a missing ; and its own behaviour for =, so students meet both in a second tool. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which is true?

**level is 300. Which condition is true?**

- level == 301
- level &gt; 300
- level &gt;= 300
- level &lt; 300

* Answer: level &gt;= 300

<!-- Speaker note: >= includes the value itself. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Between

**if (level &gt; 300 &amp;&amp; level &lt; 700) means…**

- level is below 300 or above 700
- Nothing: &amp;&amp; is a typo
- level is between 300 and 700
- level is 300 or 700

* Answer: level is between 300 and 700

<!-- Speaker note: && means and: both must be true. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a middle band



[Open this step](https://tutorials.learningwaypoints.com/engineering/arduino/decisions/?full=step-7#step-7)

<!-- Speaker note: What this step is for: Combining two comparisons with && to light the LED only in a band applies the lesson to a new condition. Hints, in order: Two conditions, both true: &&. / if (level > 300 && level < 700) / Test it: turn the knob through the whole range. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Write an if that switches pin 13 on when level is 800 or more, and off otherwise.**

* if (level &gt;= 800) { digitalWrite(13, HIGH); } else { digitalWrite(13, LOW); }

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Talking to the computer (print values to see what the board sees). Python: the same if and else; Python uses : and indentation where C++ uses { }. -->
