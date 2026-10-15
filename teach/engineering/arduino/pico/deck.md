---
marp: true
theme: default
html: true
---

# The same project on a Pico

Arduino · Real hardware

<!-- Speaker note: An optional lesson. Students port the plant-water alarm from Arduino C++ to MicroPython on a Raspberry Pi Pico, matching line to line, converting the threshold (0–1023 to 0–65535) and the timing (milliseconds to seconds), ordering the Python, and running it in Wokwi or on a real Pico. About 35 minutes (Predict 3 min · Worked example 12 min · Order 5 min · Wokwi or Pico 10 min · Practise and Make 5 min). Sources: Raspberry Pi Foundation: Introduction to Raspberry Pi Pico (link), https://projects.raspberrypi.org/en/pathways/pico-intro (checked 12 October 2026); MicroPython for the RP2040: quick reference (link), https://docs.micropython.org/en/latest/rp2/quickref.html (checked 12 October 2026); Wokwi (link; terms to check), https://wokwi.com/ (checked 12 October 2026). -->

---

## Today

**We are learning to** a Raspberry Pi Pico runs MicroPython. The ideas carry straight over (pins as outputs, reading a sensor, deciding, timing), but the words change, and so do two numbers: time.sleep takes seconds, and read_u16 gives 0 to 65535, not 0 to 1023.

- I can match Arduino C++ to MicroPython line by line.
- I can convert a threshold and a timing between the two.

<!-- Speaker note: Before class: For schools with Picos: Wokwi simulates the Pico in the browser (check its account and embedding terms); Thonny uploads to a real Pico over USB. The Raspberry Pi Foundation's Introduction to Raspberry Pi Pico path is the follow-on. Simplification: the Pico's ADC is 12-bit, and read_u16 scales it to 16 bits (0–65535). Teacher: Match: point out that Python has no ; and uses indentation instead of { }. -->

---

## Why it matters

> Many schools have Raspberry Pi Picos, and they run Python, which you may already know. Port the plant-water alarm. What changes, and what stays the same?

<!-- Speaker note: The same alarm, in **MicroPython** on a **Raspberry Pi Pico**. The LED is on **GP15**; the sensor is on **GP26**, the Pico's first analog pin. ```python from machine import Pin, ADC import time led = Pin(15, Pin.OUT) # like pinMode(15, OUTPUT) sensor = ADC(26) # an analog input while True: # like loop() level = sensor.read_u16() # 0 to 65535 if level <= 19200: led.value(1) # like digitalWrite(15, HIGH) time.sleep(0.25) # seconds, not milliseconds led.value(0) time.sleep(0.25) else: led.value(0) time.sleep(0.1) ``` -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**On the Arduino, the alarm blinks at 300 or below (out of 1023). Can the Pico sketch keep the number 300?**

- No: the Pico can't read sensors
- No: read_u16 gives 0 to 65535, so 300 is almost bone dry
- Yes: the sensor is the same
- Yes: MicroPython converts it

<!-- Speaker note: What happens: No. The Pico's read_u16 gives 0 to 65535. 300 out of 1023 is about 29%, which is about 19200 out of 65535. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what 300 means as a fraction. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* No. The Pico's read_u16 gives 0 to 65535. 300 out of 1023 is about 29%, which is about 19200 out of 65535.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the lines

**Match each Arduino line to the MicroPython line that does the same job.**

| | |
|---|---|
| `pinMode(15, OUTPUT);` | A. level = sensor.read_u16() |
| `digitalWrite(15, HIGH);` | B. led = Pin(15, Pin.OUT) |
| `level = analogRead(A0);` | C. while True: |
| `delay(250);` | D. led.value(1) |
| `void loop() { … }` | E. time.sleep(0.25) |

* Answer: pinMode(15, OUTPUT); → B. led = Pin(15, Pin.OUT); digitalWrite(15, HIGH); → D. led.value(1); level = analogRead(A0); → A. level = sensor.read_u16(); delay(250); → E. time.sleep(0.25); void loop() { … } → C. while True:

<!-- Speaker note: The same five ideas: set up a pin, switch it, read a sensor, wait, repeat for ever. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Two numbers that change

$$\text{read: } 0 \ldots 1023 \to 0 \ldots 65535$$

1) $300 \div 1023 \approx 0.293$ — The threshold as a fraction of the range.
2) $0.293 \times 65535 \approx 19200$ — The same threshold on the Pico.
3) $\text{delay(250)} \to \text{time.sleep(0.25)}$ — Milliseconds to seconds: ÷ 1000.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write read: 0 1023 0 65535 and say "A different scale, the same voltage." Line 1: write 300 ÷ 1023 0.293 and say "The threshold as a fraction of the range." Line 2: write 0.293 × 65535 19200 and say "The same threshold on the Pico." Line 3: write delay(250) time.sleep(0.25) and say "Milliseconds to seconds: ÷ 1000." -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two numbers that change

**The Arduino threshold is 300 out of 1023. What is that out of 65535? (nearest hundred)**

* Answer: 19200

<!-- Speaker note: 300 ÷ 1023 ≈ 0.293, and 0.293 × 65535 ≈ 19200. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam's Pico port never blinks, and when Sam taps the sensor it stays on for minutes. Click the first line that goes wrong.**

```
 1  from machine import Pin, ADC
 2  import time
 3  led = Pin(15, Pin.OUT)
 4  sensor = ADC(26)
 5  while True:
 6      if sensor.read_u16() <= 300:
 7          led.value(1)
 8          time.sleep(250)
 9          led.value(0)
10          time.sleep(250)
```

* Answer: line 6

<!-- Speaker note: Line 6: 300 is the Arduino's scale. read_u16 gives 0 to 65535, so it should be about 19200. (Line 8 has the other copied number: time.sleep(250) waits 250 seconds.) -->

<style scoped>pre, marp-pre { font-size: 0.58em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: put it together



<!-- Speaker note: What this step is for: Ordering the MicroPython lines checks the structure transfers: imports and set-up first, then the loop with its decision. For students who need more support: A two-column card: Arduino and MicroPython, with the two number changes boxed. For early finishers: Port the PWM brightness lesson: PWM(Pin(15)) and duty_u16(0 to 65535). The hard part, on purpose: Students expect the numbers to carry over. Make the two conversions explicit, on the board, before they run anything. When students get stuck: The alarm never blinks. Ask: What range does read_u16 give? Fix: Convert the threshold. / The LED stays on for minutes. Ask: What unit does time.sleep take? Fix: Seconds. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it in Wokwi or on a Pico



<!-- Speaker note: What this step is for: Running the port on a simulated or real Pico confirms the converted numbers. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Timing

**delay(1500) on the Arduino. What goes in time.sleep( ) on the Pico?**

* Answer: 1.5

<!-- Speaker note: 1500 ms = 1.5 s. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What stayed

**Which part of the alarm needed no change at all?**

- The timing numbers
- The threshold number
- The idea: read, compare with a threshold, blink or stay off
- The pin numbers' names

* Answer: The idea: read, compare with a threshold, blink or stay off

<!-- Speaker note: The design transfers; the language and its numbers change. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: port the fridge alarm



<!-- Speaker note: What this step is for: Converting a three-band brief's thresholds to the Pico's scale applies both number changes to a new design. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name the two numbers that must change when you port the alarm to the Pico, and how.**

* The threshold (scale from 0–1023 to 0–65535, × about 64) and the delays (milliseconds to seconds, ÷ 1000).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Power and motors (Years 9–10). Code: the Python pathway uses the same if, while and indentation. -->
