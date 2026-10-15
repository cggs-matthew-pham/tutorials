---
marp: true
theme: default
html: true
---

# Pull or push

Structures · Frames and trusses

<!-- Speaker note: Students test a roof truss and read which members pull (tension) and push (compression), explain why slanted members carry more than their share, find that a taller roof halves the forces each time its height doubles, and choose a height that keeps every member within 600 N and the timber within budget. About 40 minutes (Predict and Try 8 min · Worked example 10 min · Vary 6 min · Practise and Make 16 min). Sources: TeachEngineering: K-12 engineering design challenges (benchmark; the briefs and wording are our own), https://www.teachengineering.org/ (checked 12 October 2026). -->

---

## Today

**We are learning to** in a frame joined by pins, every member either pulls (tension) or pushes (compression). Students test a roof truss, read which members pull and push, find that a taller roof means smaller forces, and choose a roof height that keeps every member within its limit and the budget.

- I can say whether a member of a frame is in tension (pulls) or compression (pushes).
- I can explain why a flatter roof has bigger forces in its members.
- I can choose a design that meets a force limit and a budget.

<!-- Speaker note: Before class: The board is a pin-jointed truss: members are straight, joined by pins that can't hold a turn, so each member only pulls or pushes along its length; loads act at joints; members weigh nothing. It is solved by the stiffness method (all members equally stiff), so frames with spare members work too. A quick demonstration: two rulers leaning together on a table, feet free, then with a string tying the feet. The string goes tight. Curriculum hooks: Design and Technologies, engineering principles and systems (primary); Science, forces (Year 7); Maths, proportion. Teacher: Try: point at the colours; blue pulls, red pushes. Teacher: Worked example: fill in the three heights from the board as a table, then find the rule. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> A roof holds up a load of tiles. Which of its beams are being stretched, and which are being squashed?

<!-- Speaker note: A **structure** holds a load up without moving. A **truss** is a frame of straight **members** joined at **pins**, like a roof frame, a crane arm or a bridge. Because the joints are pins, each member can only **pull** or **push** along its length: - **Tension**: the member is being stretched; it pulls on its joints (blue on the board). - **Compression**: the member is being squashed; it pushes on its joints (red). The roof truss here is 4 m wide. **A** sits on a fixed support (a pin), **B** on a roller that can slide sideways. A **1000 N** load presses on the top joint, **C**. Forces are in newtons; a minus sign means a push. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**The load presses down on C. Which member is being stretched (pulled)?**

- All three: the load stretches everything
- A-B, along the bottom
- None: a load only squashes
- A-C, a sloping side

<!-- Speaker note: What happens: A-B. The sloping members push the feet A and B outwards; the bottom member holds them together, so it is stretched. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: draw the roof and ask students to mark each member 'stretch' or 'squash' before testing. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fstructures%2Fforces%2Fstep-2&code=widget%3A+truss%0Ajoint+A%3A+0%2C+0+pin%0Ajoint+B%3A+4%2C+0+roller%0Ajoint+C%3A+2%2C+2%0Amember%3A+A-B%2C+A-C%2C+B-C%0Aload+C%3A+1000+down%0Astrength%3A+2000%0Abuckle%3A+8000%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/structures/forces/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* A-B. The sloping members push the feet A and B outwards; the bottom member holds them together, so it is stretched.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Three heights

Now a 2000 N load on the same 4 m roof, 2 m tall.

$$\text{height } 1 \text{ m: } A\text{-}B = 1000 \text{ N}$$

1) $\text{height } 2 \text{ m: } A\text{-}B = 500 \text{ N}$ — Twice as tall: half the pull.
2) $\text{height } 4 \text{ m: } A\text{-}B = 250 \text{ N}$ — Twice again: half again.
3) $A\text{-}B = \frac{1000 \times 4}{4 \times \text{height}}$ — The pull is load × span ÷ (4 × height).

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write height 1 m: A-B = 1000 N and say "Test the roof with C at 1 m: the bottom pulls 1000 N." Line 1: write height 2 m: A-B = 500 N and say "Twice as tall: half the pull." Line 2: write height 4 m: A-B = 250 N and say "Twice again: half again." Line 3: write A-B = 1000 × 44 × height and say "The pull is load × span ÷ (4 × height)." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Three heights

**Span 4 m, height 2 m, and a 2000 N load. How hard does the bottom member pull, in newtons?**

* Answer: 1000

<!-- Speaker note: 2000 × 4 ÷ (4 × 2) = 1000 N. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Flatter

**A builder wants a flatter roof (lower C) to save timber. What happens to the forces?**

- They stay the same: the load hasn't changed
- They get bigger: flatter members must pull and push harder
- They get smaller: less timber, less force
- Only the bottom member changes

* Answer: They get bigger: flatter members must pull and push harder

<!-- Speaker note: A flatter roof needs bigger forces in every member. That is the trade: less material, more force. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: raise the roof



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/structures/forces/?full=step-4#step-4)

<!-- Speaker note: What this step is for: The slider lets students check the rule against the board. For students who need more support: Give a table: height, pull in A-B, push in A-C, cost. Fill the first row together. For early finishers: Add a vertical member from C down to the middle of A-B (add a joint there in your head). What force would it carry, and why? The hard part, on purpose: Students think a load only squashes. Ask what would happen to the feet if the bottom member were cut. When students get stuck: A student thinks the bottom member is squashed. Ask: If you cut it, what would the feet do? Fix: They would spread apart, so the member is holding them together: tension. / A student expects the slanted push to be 500 N. Ask: How much of a slanted push points straight up? Fix: Only part, so the push must be bigger. / A student keeps raising the roof to cut forces. Ask: What happens to the cost? Fix: Taller means longer members: a trade-off. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A wider roof

**A roof 6 m wide and 3 m tall holds 1200 N at the top. How hard does the bottom member pull, in newtons?**

* Answer: 600

<!-- Speaker note: 1200 × 6 ÷ (4 × 3) = 600 N. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Pull or push

**Pull or push? Sort each member.**

Groups: Tension (pulls) · Compression (pushes)

A rope holding up a swing · A table leg · The cable of a crane · A pillar holding up a roof · The bottom member of a roof truss

* Answer: A rope holding up a swing → Tension (pulls); A table leg → Compression (pushes); The cable of a crane → Tension (pulls); A pillar holding up a roof → Compression (pushes); The bottom member of a roof truss → Tension (pulls)

<!-- Speaker note: Ropes and cables can only pull. Legs and pillars push back against the load. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a roof to a brief



- **A brief:** 
- **Evaluate:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/structures/forces/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Two criteria pull in opposite directions: a taller roof means smaller forces but costs more timber. Only one height meets both. Hints, in order: Members here can only take 600 N, pulling or pushing. / Taller makes the forces smaller, but the members longer and dearer. / Test each height from 3 m up and watch both the forces and the cost. -->

<!-- Speaker note: Teacher: let students tell you why 3 m fails (force) and 4 m fails (cost). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A roof truss 6 m wide and 1.5 m tall carries 900 N at the top. How hard does the bottom member pull, and is it in tension or compression?**

* 900 × 6 ÷ (4 × 1.5) = 900 N, in tension.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Triangles hold their shape. Real examples: roof trusses, A-frames, ladders, crane jibs, the Sydney Harbour Bridge's arch and deck. -->
