---
marp: true
theme: default
html: true
---

# Design for the printer

Design and print · Designing for the printer

<!-- Speaker note: Students turn an L-bracket through four print orientations, find the one that needs supports and the one with layers along the load, apply both questions to a hook and other shapes, see Sam's bracket snap across its layers, check orientations in the school's slicer, and justify an orientation for a part of their own. About 40 minutes (Predict and Try 6 min · Worked example 8 min · Slicer 10 min · Practise and Make 10 min). -->

---

## Today

**We are learning to** a printer builds in layers: an overhang more than about 45° from vertical needs supports, and a part is weakest across its layer lines. Choose the way up that needs no supports and runs the layers along the load.

- I can tell when a part needs supports.
- I can choose a print orientation so the load runs along the layers.

<!-- Speaker note: Before class: The 45° rule is a rule of thumb; bridges (short spans between two supports) print without supports too. The board's four orientations are drawn for one bracket; the slicer shows the real supports and time. Teacher: Slicer: show layer preview colouring. -->

---

## Why it matters

> Two brackets, same file, same printer, same plastic. One holds a shelf of books; the other snaps the first day. The only difference is which way up they were printed.

<!-- Speaker note: Each layer sits on the one below. A wall leaning more than about **45°** from vertical has nothing underneath, so the slicer adds **supports** (extra plastic you break off later). And layers stick to each other less well than plastic sticks to itself along a layer, so a printed part is **weakest across its layer lines**. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**An L-shaped bracket will hold up a shelf. Which way should it be printed to be strongest?**

- Upside down
- It makes no difference
- Flat on its side
- Foot down, arm up

<!-- Speaker note: What happens: Flat on its side: no supports, and every layer runs along both arms, so the load pulls along the layers, not across them. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: have two printed bars ready to snap after the reveal. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fcad%2Forient%2Fstep-2&code=widget%3A+fab%0Amode%3A+orient%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/cad/orient/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Flat on its side: no supports, and every layer runs along both arms, so the load pulls along the layers, not across them.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Overhang, then load

Now try a hook.

$$\text{overhang} > 45^\circ \Rightarrow \text{supports}$$

1) $\text{layers across the load} \Rightarrow \text{weak}$ — Layers bond less well to each other.
2) $\text{bracket: flat on its side}$ — No overhangs, and the layers run along both arms.
3) $\text{check both, every part}$ — Supports cost plastic and finish; weak layers cost the part.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write overhang > 45^ supports and say "Each layer needs something under it." Line 1: write layers across the load weak and say "Layers bond less well to each other." Line 2: write bracket: flat on its side and say "No overhangs, and the layers run along both arms." Line 3: write check both, every part and say "Supports cost plastic and finish; weak layers cost the part." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Overhang, then load

**A hook will hang a bag from its curved end. The load pulls down the hook's length. Which way up should it be printed?**

- Standing up, curve at the bottom
- Flat, so the layers run along the hook
- Standing up, curve at the top
- It makes no difference

* Answer: Flat, so the layers run along the hook

<!-- Speaker note: Flat: no tall overhangs, and the layers run along the load. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam's bracket snaps across the arm the first day. Click the line where Sam's reasoning first goes wrong.**

```
 1  Sam prints the shelf bracket foot down, arm up.
 2  It needs no supports, and it looks perfect.
 3  The plastic is the same all the way through, so it is equally strong every way.
 4  So it will hold the shelf.
```

* Answer: line 3

<!-- Speaker note: Line 3: a printed part is weakest across its layers. Foot down, the shelf load bends the arm across them. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make it in the slicer



<!-- Speaker note: What this step is for: In the school's slicer, supports and layer direction are visible before printing: the habit to build. For students who need more support: A card with the two questions: what overhangs? which way does the load pull? For early finishers: Why do some parts get split into two pieces for printing and glued? The hard part, on purpose: Layer direction is invisible on screen. Snap two printed test bars (one printed flat, one upright) in front of the class. When students get stuck: A student chooses the way that looks most like the finished object. Ask: Which way does the load pull, and which way do the layers run? Fix: Turn it so they run the same way. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which way?

**Which of these need supports printed as described?**

Groups: Needs supports · No supports

A letter T standing up, its bar at the top · A letter T lying flat · A pyramid standing on its base · A pyramid standing on its point · A cube with a round hole straight through, top to bottom

* Answer: A letter T standing up, its bar at the top → Needs supports; A letter T lying flat → No supports; A pyramid standing on its base → No supports; A pyramid standing on its point → Needs supports; A cube with a round hole straight through, top to bottom → No supports

<!-- Speaker note: Anything that sticks out sideways over nothing (the T's bar, an upside-down pyramid) needs supports; sloping in at 45° or less doesn't. What this step is for: Applying both questions to new parts. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: choose and justify



- **A phone stand:** 
- **My part:** 

<!-- Speaker note: What this step is for: Choosing an orientation for a new part and giving both reasons is the design decision students will make on every print. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Give two reasons to choose a print orientation.**

* To avoid overhangs that need supports, and so the load runs along the layers rather than across them.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Slicer trade-offs. -->
