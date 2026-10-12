---
marp: true
theme: default
html: true
---

# Remembering a bit

From gates to a processor · A machine that remembers

<!-- Speaker note: Students set and reset a latch made of two NOR gates, see it keep its bit with both switches off, and store a number in a 4-bit register of latches (AC9TDI8K04 node 3, extended; the kit names adder circuits as going further). About 40 minutes (Predict and Try 6 min · Worked example 10 min · Vary 12 min · Practise and Make 12 min). -->

---

## Today

**We are learning to** feed two gates' outputs back into each other and they hold a bit: a latch. Set makes it 1, Reset makes it 0, and with both off it keeps what it had. Latches side by side make a register that stores a number.

- I can explain how a latch remembers a bit.
- I can say what Set and Reset do, and what happens with both off.
- I can store a number in a register and explain why it stays.

<!-- Speaker note: Before class: Try the boards yourself. The one idea: a loop of gates keeps its bit. This is the first circuit whose output depends on what happened before, not only on its inputs now. The board's register Store button stands in for a clock signal (a D flip-flop in real chips); the lesson keeps that detail out. Real RAM mostly uses capacitors (DRAM) rather than latches, with latches (SRAM) in caches and registers; both need power. Teacher: Try: ask which wire carries the memory. Teacher: Worked example: trace the both-off row: what does each gate get? Teacher: Vary: after both on, ask why designers avoid it. -->

---

## Why it matters

> A gate's output changes the moment its inputs change. So how does a computer remember anything?

<!-- Speaker note: Every gate so far forgets: change its inputs and its output changes straight away. To remember, a circuit needs a loop: outputs fed back in as inputs. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A latch has a Set switch and a Reset switch. Turn Set on: Q becomes 1. Now turn Set off again. What is Q?**

- It flickers between 0 and 1
- 0: nothing is switched on
- Still 1: it remembers
- It depends on the time

<!-- Speaker note: What happens: Still 1. Each gate's output keeps the other gate in the state that holds Q at 1, until Reset changes it. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who said 0 hold Sam's misconception; Try settles it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Flogic%2Fremember%2Fstep-2&code=widget%3A+gates%0Amode%3A+latch%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/logic/remember/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Follow the dashed wires: each NOR gate's output goes into the other. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Still 1. Each gate's output keeps the other gate in the state that holds Q at 1, until Reset changes it.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Four settings

Now try Reset.

$$S = 1, R = 0 \Rightarrow Q = 1$$

1) $S = 0, R = 0 \Rightarrow Q \text{ stays}$ — Both off: each gate's output holds the other where it is. This is the memory.
2) $S = 0, R = 1 \Rightarrow Q = 0$ — Reset: the top NOR's output goes to 0.
3) $S = 1, R = 1$ — Not allowed: Q and not Q both become 0, which makes no sense for one bit.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write S = 1, R = 0 Q = 1 and say "Set: the bottom NOR's output goes to 0, which lets the top one make Q = 1." Line 1: write S = 0, R = 0 Q stays and say "Both off: each gate's output holds the other where it is. This is the memory." Line 2: write S = 0, R = 1 Q = 0 and say "Reset: the top NOR's output goes to 0." Line 3: write S = 1, R = 1 and say "Not allowed: Q and not Q both become 0, which makes no sense for one bit." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Four settings

**Q is 1. Reset goes on, then off again. What is Q now?**

- 0
- 1

* Answer: 0

<!-- Speaker note: Reset sets Q to 0; letting go keeps it at 0. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam explains the latch. Click the line where it first goes wrong.**

```
 1  Set goes on, so Q becomes 1.
 2  Set goes off again, so Q goes back to 0, like a lamp.
 3  So the latch only shows 1 while Set is held on.
 4  That means gates can't remember anything.
```

* Answer: line 2

<!-- Speaker note: Line 2: a latch is not a lamp. With Set and Reset both off, Q keeps the 1: that is memory. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why RAM forgets

**Why does RAM lose everything when the power goes off?**

- Its bits are held by circuits like latches, which need power to keep feeding each other
- Power cuts damage it
- The processor deletes it
- It copies everything to storage first

* Answer: Its bits are held by circuits like latches, which need power to keep feeding each other

<!-- Speaker note: No power, no loop, no bit. Storage keeps data a different way (magnetism or trapped charge). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: latches and a register



- **Reset:** 
- **Both on:** 
- **Store a number:** 
- **Keep it:** 

[Open this step](https://tutorials.learningwaypoints.com/systems/logic/remember/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one thing: reset and release, both switches on (the edge case), then four latches as a register that stores and keeps a number. For students who need more support: A four-row table: S, R, Q after. Students fill it from the board. For early finishers: Look up a D flip-flop. How does it make sure the register changes only on the clock tick? The hard part, on purpose: Feedback is strange: an output that is also an input. Don't explain the NOR details first; let students see Q stay 1, then trace why. When students get stuck: A student says the latch is just a lamp (Sam's mistake). Ask: What is Q with both switches off, after Set? After Reset? Fix: Different answers for the same switches: it remembers. / A student changes the data and expects the register to follow. Ask: When does the register copy the data? Fix: Only on Store (in a processor, on a clock tick). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Register size

**A register is 8 latches side by side. What is the biggest number it can hold?**

- 8
- 128
- 255
- 256

* Answer: 255

<!-- Speaker note: 8 bits: 0 to 255. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## RAM in bits

**A computer has 8 GB of RAM. About how many bits is that?**

- About 64 billion
- About 8 million
- About 8 billion
- About 8

* Answer: About 64 billion

<!-- Speaker note: 8 billion bytes × 8 bits = about 64 billion bits, each held by a tiny circuit. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: RAM and storage

**Review: which part keeps your files when the computer is switched off?**

- Storage
- RAM
- The processor's registers
- The clock

* Answer: Storage

<!-- Speaker note: Storage (SSD or hard disk) keeps data without power. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: hold a number

Then: what would you need to store 16 bits?

[Open this step](https://tutorials.learningwaypoints.com/systems/logic/remember/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Leaving the register holding one number while the data switches show another reverses the process: students decide what is stored and prove it stays. Hints, in order: 12 is 8 + 4. / Set 1100, press Store. / Then change the data switches to 0011 and don't press Store. -->

<!-- Speaker note: Teacher: ask what the register would hold after one more Store. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Set goes on then off, then Reset goes on then off. What is Q after each step, and why does the latch count as memory?**

* 1, 1, 0, 0. With both switches off it keeps its last value, so its output depends on what happened before.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: A tiny processor (fetch, decode, execute). Links: Inside a computer (RAM empties without power; storage keeps data). -->
