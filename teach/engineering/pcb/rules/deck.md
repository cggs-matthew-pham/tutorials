---
marp: true
theme: default
html: true
---

# Design rules and ordering

Your own board · From breadboard to board

<!-- Speaker note: Students set trace widths against current from a table, find a trace too wide to squeeze between header pins and route it around, then work out the cost of a board order (setup plus per board). About 40 minutes (Predict and Try 8 min · Worked example 10 min · Vary 8 min · Practise and Make 14 min). Sources: KiCad documentation: PCB editor and design rules (benchmark; wording our own), https://docs.kicad.org/ (checked 12 October 2026). -->

---

## Today

**We are learning to** a trace that carries a motor's current must be wider than one that carries a signal, or it heats up. Students set trace widths against current, meet a trace too wide to pass between pins, then work out what an order of boards costs.

- I can choose a trace width from the current it carries.
- I can explain why two design rules can force a longer route.
- I can work out what an order of boards costs, per board.

<!-- Speaker note: Before class: The width table is IPC-2221 for 1 oz copper on an outer layer with a 10 °C rise, rounded down. Real design tools have calculators for this; the numbers change with copper thickness, inner layers and the rise you accept. The 0.4 mm squeeze assumes 2.54 mm pin spacing, 1.7 mm pads and 0.2 mm clearance each side. Board makers' prices change; the lesson uses round numbers. Check a current price before ordering for a class. Curriculum hooks: Design and Technologies, materials and technologies (properties of copper), engineering principles and systems; Science, electric circuits (Year 9); Maths, rates and costs. Teacher: Try: ask why SIG can stay thin. Teacher: Worked example: point at both rules on the board: the width table and the gap between pins. -->

---

## Why it matters

> The motor board works on the bench, then a trace turns brown and lifts off. Why that trace, and not the others?

<!-- Speaker note: A trace is a strip of copper, so it has **resistance**: the more current through it, and the thinner it is, the hotter it gets. **Design rules** are the limits a board must meet before it is made: trace width for current, gaps between copper, hole sizes. The design tool checks them all (a **design rule check**, DRC). This board drives a motor. **VM** brings the motor's power in from J1, **U1** switches it, and **MA** and **MB** go out to the motor on J2. **SIG** is the control signal from J3. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**Every trace is 0.25 mm wide. The motor draws 1.5 A. Which trace is most likely to overheat?**

- SIG, the control signal
- None: copper never overheats
- VM, the motor's power
- They all heat the same

<!-- Speaker note: What happens: VM (and GND, MA, MB): they carry 1.5 A. SIG carries a few thousandths of an amp, so a thin trace is fine for it. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: show a photo of a burnt trace, if you have one. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fengineering%2Fpcb%2Frules%2Fstep-2&code=widget%3A+pcb%0Amode%3A+rules%0Agrid%3A+18%2C+10%0Apart+J1%3A+header2+at+0%2C3+turn+1%0Apart+U1%3A+dip8+at+7%2C2%0Apart+J2%3A+header2+at+17%2C3+turn+1%0Apart+J3%3A+header4+at+6%2C9%0Anet+VM%3A+J1.1%2C+U1.8%0Anet+GND%3A+J1.2%2C+U1.4%0Anet+MA%3A+U1.6%2C+J2.1%0Anet+MB%3A+U1.5%2C+J2.2%0Anet+SIG%3A+U1.1%2C+J3.1%0Acurrent+VM%3A+1.5%0Acurrent+GND%3A+1.5%0Acurrent+MA%3A+1.5%0Acurrent+MB%3A+1.5%0Acurrent+SIG%3A+0.02%0Asqueeze%3A+SIG%0Atrace+VM%3A+top+0%2C3+1%2C3+2%2C3+3%2C3+4%2C3+5%2C3+5%2C2+6%2C2+7%2C2%0Atrace+GND%3A+bottom+0%2C4+1%2C4+2%2C4+3%2C4+4%2C4+5%2C4+5%2C5+5%2C6+6%2C6+7%2C6+8%2C6+9%2C6+10%2C6+10%2C5%0Atrace+MA%3A+top+9%2C2+9%2C1+10%2C1+11%2C1+12%2C1+13%2C1+14%2C1+15%2C1+16%2C1+16%2C2+16%2C3+17%2C3%0Atrace+MB%3A+top+10%2C2+11%2C2+12%2C2+13%2C2+14%2C2+15%2C2+15%2C3+15%2C4+16%2C4+17%2C4%0Atrace+SIG%3A+top+7%2C5+7%2C6+7%2C7+7%2C8+6%2C8+6%2C9%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/engineering/pcb/rules/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* VM (and GND, MA, MB): they carry 1.5 A. SIG carries a few thousandths of an amp, so a thin trace is fine for it.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Choose the width

$$\text{VM carries } 1.5 \text{ A}$$

1) $0.5 \text{ mm} \to 1.4 \text{ A} < 1.5 \;\times$ — Too thin: it would run hot.
2) $1 \text{ mm} \to 2.4 \text{ A} \ge 1.5 \;\checkmark$ — The narrowest width that passes, with a margin.
3) $\text{between header pins: } \le 0.4 \text{ mm}$ — A second rule: the gap between pins leaves room for 0.4 mm only.
4) $1 \text{ mm} > 0.4 \text{ mm} \Rightarrow \text{route around}$ — A trace that needs 1 mm can't squeeze between pins, so it takes the long way.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write VM carries 1.5 A and say "Find the current each net carries (the motor's datasheet gives it)." Line 1: write 0.5 mm 1.4 A < 1.5 × and say "Too thin: it would run hot." Line 2: write 1 mm 2.4 A 1.5 ✓ and say "The narrowest width that passes, with a margin." Line 3: write between header pins: 0.4 mm and say "A second rule: the gap between pins leaves room for 0.4 mm only." Line 4: write 1 mm > 0.4 mm route around and say "A trace that needs 1 mm can't squeeze between pins, so it takes the long way." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Choose the width

**A heater trace carries 2.8 A. Which is the narrowest width that passes?**

- 1.5 mm
- 1 mm
- 2 mm
- 0.5 mm

* Answer: 1.5 mm

<!-- Speaker note: 1.5 mm is safe to 3.2 A, which is at least 2.8 A. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two rules meet

**MA must carry 1.5 A, and its shortest path squeezes between two header pins (0.4 mm of room). What should the designer do?**

- Make MA 1 mm and squeeze it through anyway
- Lower the motor's current
- Make MA 0.4 mm and squeeze it through
- Route MA around the header, at 1 mm wide

* Answer: Route MA around the header, at 1 mm wide

<!-- Speaker note: Two rules meet: width for current, and room between pins. The longer route around satisfies both. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: a squeeze



[Open this step](https://tutorials.learningwaypoints.com/engineering/pcb/rules/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Two rules in one board: students set widths and choose a path for the squeezed net. For students who need more support: Give the width table on paper with a column to write each net's current. For early finishers: Some makers charge less per board for more boards (a price break). How would you decide how many spares to order? The hard part, on purpose: Students want every trace wide 'to be safe'. Ask what it costs in space, and where the trace has to go. When students get stuck: A trace still fails after widening. Ask: Does it squeeze between pins? Fix: Route it around, then widen it. / A student picks the first width that looks big. Ask: What does the table say that width carries? Fix: Find the narrowest width whose current is at least the net's. / A student divides the setup cost wrongly. Ask: What does the whole order cost? Fix: Setup + boards × price, then divide by the number of boards. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Width

**A trace carries 0.9 A. Which is the narrowest width that passes? (0.25 mm 0.8 A · 0.5 mm 1.4 A · 1 mm 2.4 A)**

- 0.5 mm
- 0.25 mm
- 1 mm

* Answer: 0.5 mm

<!-- Speaker note: 0.25 mm is safe only to 0.8 A; 0.5 mm to 1.4 A. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## An order

**A board maker charges $20 to set up an order and $1.50 a board. What do 10 boards cost, in dollars?**

* Answer: 35

<!-- Speaker note: 20 + 10 × 1.50 = $35. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Per board

**Same prices: what does each board cost when you order 40, in dollars?**

* Answer: 2

<!-- Speaker note: 20 + 40 × 1.50 = $80, and 80 ÷ 40 = $2 a board. The setup cost is shared by more boards. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: ready to order



- **Pass the rules:** 
- **Order:** 
- **Evaluate:** 

[Open this step](https://tutorials.learningwaypoints.com/engineering/pcb/rules/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Students fix every rule on the board, then reason about the order: the full move from design to manufacture. -->

<!-- Speaker note: Teacher: discuss what else a design rule check catches (hole sizes, gaps between copper, unrouted nets). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A trace carries 2 A. Which width (0.5 mm 1.4 A, 1 mm 2.4 A, 1.5 mm 3.2 A) do you choose, and why not the others?**

* 1 mm: the narrowest safe for 2 A; 0.5 mm would overheat, and 1.5 mm takes more room than needed.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: the Capstone projects' Design a PCB, where students design, check and (optionally) order a real board. Real tools: KiCad's and EasyEDA's design rule check; board makers' instant quotes. -->
