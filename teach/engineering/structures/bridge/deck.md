---
marp: true
theme: default
html: true
---

# Design a bridge

Structures · Frames and trusses

<!-- Speaker note: Students find a pinned deck collapses and a big triangle buckles, learn that a member's buckling load falls with its length squared, build a bridge of short triangles that holds 1000 N, then refine it to cost $300 or less and fail only at 1400 N or more. About 50 minutes (Predict and Try 10 min · Worked example 8 min · Vary 12 min · Practise and Make 20 min). Sources: TeachEngineering: K-12 engineering design challenges (benchmark; the briefs and wording are our own), https://www.teachengineering.org/ (checked 12 October 2026). -->

---

## Today

**We are learning to** long members buckle under a push long before they snap under a pull, so good bridges keep pushed members short. Students find a deck on pins collapses, a big triangle buckles, then design a bridge that holds 1000 N within a budget and test it to failure.

- I can explain why long members buckle under a push.
- I can design a truss whose pushed members are short and whose long members pull.
- I can test a design to failure and talk about its safety factor.

<!-- Speaker note: Before class: Do Pull or push and Triangles hold their shape first. The model: a pin-jointed truss; any member pulls up to 2000 N; a member L m long buckles under 8000 ÷ L² N (Euler's buckling falls with length squared; the constant is chosen for the lesson). The load hangs at C only. A Pratt or Howe truss of 13 members ($293) is the cheapest design that meets the Make brief on this grid; teachers may find others. A spaghetti or straw bridge tested to failure is the natural class follow-up, using the same rules. Curriculum hooks: Design and Technologies, engineering principles and systems (primary); Science, forces; Maths, powers and inverse proportion. Teacher: Try: ask what made A-G fail when its force was under 2000 N. Teacher: Worked example: push on a long straw and a short one. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> An 8 m gap, a 1000 N load in the middle, and $10 a metre for members. What is the cheapest bridge that won't fail?

<!-- Speaker note: A bridge must hold its load, stay within its **budget**, and fail at a load well above what it will carry (a **safety margin**). The span is **8 m**. Deck joints A to E sit along the bottom; F, G and H are above. **A** is on a pin, **E** on a roller, and **1000 N** hangs from **C**. Members cost **$10 a metre**. Any member can **pull** 2000 N. A **push** is different: a long thin member **buckles** (bows sideways) under a much smaller push. Here a member L metres long buckles under 8000 ÷ L² newtons: 2000 N for a 2 m member, but only about 400 N for a 4.5 m one. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**The bridge is only its deck: A-B, B-C, C-D, D-E, joined by pins. With 1000 N at C, it…**

- Holds: 1000 N is less than 2000 N
- Holds, because the supports are strong
- Bends but holds
- Collapses: the pins let it fold at C

<!-- Speaker note: What happens: It collapses. Pins let each joint turn, so a straight row of members folds at C like a chain. Every joint needs members in two directions. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: hang a chain between two hands: why does it sag? -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fengineering%2Fstructures%2Fbridge%2Fstep-2&code=widget%3A+truss%0Ajoint+A%3A+0%2C+0+pin%0Ajoint+B%3A+2%2C+0%0Ajoint+C%3A+4%2C+0%0Ajoint+D%3A+6%2C+0%0Ajoint+E%3A+8%2C+0+roller%0Ajoint+F%3A+2%2C+2%0Ajoint+G%3A+4%2C+2%0Ajoint+H%3A+6%2C+2%0Amember%3A+A-B%2C+B-C%2C+C-D%2C+D-E%0Aload+C%3A+1000+down%0Astrength%3A+2000%0Abuckle%3A+8000%0Acost%3A+10%0Aedit%3A+on%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/engineering/structures/bridge/?full=step-2#step-2)

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It collapses. Pins let each joint turn, so a straight row of members folds at C like a chain. Every joint needs members in two directions.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Buckling

$$\text{buckles at } \frac{8000}{L^2}$$

1) $L = 4.47 \text{ m: } \frac{8000}{20} = 400 \text{ N}$ — The big triangle's sides push about 1118 N: they buckle.
2) $L = 2 \text{ m: } \frac{8000}{4} = 2000 \text{ N}$ — Short members take five times the push.
3) $\text{pulls don't buckle}$ — So long diagonals should pull; pushed members should be short: a Pratt truss does both.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write buckles at 8000 ÷ L^2 and say "Long pushed members are the weak spot." Line 1: write L = 4.47 m: 8000 ÷ 20 = 400 N and say "The big triangle's sides push about 1118 N: they buckle." Line 2: write L = 2 m: 8000 ÷ 4 = 2000 N and say "Short members take five times the push." Line 3: write pulls don't buckle and say "So long diagonals should pull; pushed members should be short: a Pratt truss does both." -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Buckling

**On this board, at what push does a 2.83 m member buckle, to the nearest 10 N?**

* Answer: 1000

<!-- Speaker note: 8000 ÷ 2.83² = 8000 ÷ 8 = 1000 N. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Shorter

**A pushed member is cut in half by bracing it at its middle. How much bigger a push can each half take?**

- 4 times
- 2 times
- The same
- Half as much

* Answer: 4 times

<!-- Speaker note: Buckling goes with 1 ÷ length², so half the length takes 2² = 4 times the push. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: a bridge that holds



[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/structures/bridge/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Students apply both rules (every joint held, short pushes) to build any bridge that holds. Hints, in order: Make every panel a triangle: top members F-G and G-H, end posts A-F and H-E. / Hold B, C and D with members going up (verticals) or across (diagonals). / Put the inner diagonals so they slope down towards C (F-C and H-C): they pull. For students who need more support: Give the Pratt truss as a member list to type in, then ask students to remove one member and test. For early finishers: Find a design that fails at 2000 N or more. What does it cost, and is the extra safety worth it? The hard part, on purpose: Building takes trial and error, and a design can collapse for a missing member or fail for a long pushed one. Ask which of the two happened. When students get stuck: The bridge collapses. Ask: Which joint has members in only one direction? Fix: Every joint needs members in two directions. / A long member fails. Ask: Is it red (pushed)? Can you make it shorter, or make it pull? Fix: Short pushes, long pulls. / It is over budget. Ask: Which members carry 0 N? Fix: Zero-force members may be removable, but test: some hold a joint in place. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Buckling

**On this board, at what push does a 4 m member buckle, in newtons?**

* Answer: 500

<!-- Speaker note: 8000 ÷ 16 = 500 N. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Safety

**A bridge carries 1000 N and fails at 1400 N. What is its safety factor (failure load ÷ working load)?**

* Answer: 1.4

<!-- Speaker note: 1400 ÷ 1000 = 1.4. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Cost

**A bridge uses 14 members of 2 m and 4 of 2.83 m, at $10 a metre. What does it cost, in dollars, to the nearest dollar?**

* Answer: 393

<!-- Speaker note: 28 + 11.32 = 39.32 m, × $10 = $393. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: the cheapest safe bridge



- **The cheapest safe bridge:** 
- **Evaluate:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/engineering/structures/bridge/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Three criteria at once: hold the load, cost no more than $300, and keep a safety margin (fail at 1400 N or more). Students build, test, and test to failure. Hints, in order: Start from the bridge you built in Vary. / Take out any member that isn't needed: every joint still needs members in two directions. / Press Load until it fails: it must hold 1400 N or more. -->

<!-- Speaker note: Teacher: share costs and failure loads on the board; who was cheapest and still safe? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A 3 m member on this board is pushed with 1000 N. Will it buckle? Show the sum.**

* 8000 ÷ 3² = 8000 ÷ 9 ≈ 889 N, less than 1000 N, so it buckles.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: the Capstone projects, where a lift or drive base meets a real structure. Real examples: Pratt and Howe trusses (railway bridges), Warren trusses, the Sydney Harbour Bridge arch, roof trusses. -->
