---
marp: true
theme: default
html: true
---

# And, or and not

Data and chance · Chance

<!-- Speaker note: Students find P(A and B), P(A or B), P(not A) and P(neither) from Venn diagrams, two-way tables and two-dice grids, counting the overlap once (AC9M8P02, node 2). About 40 minutes (Predict and Run 8 min · Investigate 10 min · Modify 12 min · Practise and Make 10 min). -->

---

## Today

**We are learning to** 'A and B' means both happen; 'A or B' means at least one happens (both included); 'not A' is everything else. Read them from a Venn diagram, a two-way table or a grid, counting each outcome once.

- I can find 'and', 'or', 'not' and 'neither' on a Venn diagram, a table or a grid.
- I can work out P(A or B) without counting the overlap twice.
- I can explain that 'or' in maths includes both.

<!-- Speaker note: Before class: Do the Run board yourself first. Students need Venn diagrams and two-way tables, grids, and complements (the last three lessons). The one idea: 'and' is the overlap, 'or' is everything inside the circles (one, the other or both), 'not' is outside a circle, and 'neither' is outside both. The common mistake is adding the totals for 'or' (Zoe's mistake), counting the overlap twice. Inclusive 'or' is the maths meaning; everyday 'or' is often exclusive ("tea or coffee?"). Name the difference once. The addition rule P(A or B) = P(A) + P(B) − P(A and B) appears as a routine, not a formula to memorise. Wider: Venn diagrams with three circles, and checking 'or' with a complement (neither). -->

---

## Why it matters

> A raffle prize goes to someone who plays sport or music. In a class of 30, 20 play sport and 13 play music. How many are in the draw?

<!-- Speaker note: Probability questions often join events with **and**, **or** and **not**. On a Venn diagram, each one is a set of regions. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**30 students: 20 play sport, 13 play music, 8 play both. What is P(a student plays sport or music)?**

- 8/30
- 25/30
- 33/30

<!-- Speaker note: What happens: 25/30. 12 sport only, 8 both and 5 music only: each counted once. 33/30 counts the 8 twice (and a probability can't be more than 1). Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask whether a probability can be more than 1. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fmaths%2Fdata%2Fand-or-not%2Fstep-2&code=widget%3A+venn%0Alabels%3A+Sport%2C+Music%0Acounts%3A+12%2C+8%2C+5%2C+5%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/maths/data/and-or-not/?full=step-2#step-2)

<!-- Speaker note: | Words | Regions | In the Sport and Music class | |---|---|---| | A **and** B | the overlap only | 8 | | A **or** B | anything inside the circles (one, the other, or both) | 12 + 8 + 5 = 25 | | **not** A | everything outside A | 5 + 5 = 10 | | **neither** | outside both circles | 5 | In maths, **or** includes both. In everyday talk "or" sometimes means one but not both ("tea or coffee?"); in maths that is **exactly one**. To find P(A or B) from totals, add them and take away the overlap once: 20 + 13 − 8 = 25. -->

<!-- Speaker note: Teacher: ask how many times the 8 are counted now. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 25/30. 12 sport only, 8 both and 5 music only: each counted once. 33/30 counts the 8 twice (and a probability can't be more than 1).

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## And

Here is the routine for "or" from totals.

$$P(\text{juice}) = \tfrac{35}{60},\ P(\text{milk}) = \tfrac{28}{60},\ P(\text{both}) = \tfrac{15}{60}$$

1) $35 + 28 - 15 = 48$ — Add the totals, then take the overlap away once.
2) $P(\text{juice or milk}) = \tfrac{48}{60}$ — Everyone inside the circles.
3) $P(\text{neither}) = 1 - \tfrac{48}{60} = \tfrac{12}{60}$ — Neither is the complement of "or".

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write P(juice) = 35 ÷ 60,P(milk) = 28 ÷ 60,P(both) = 15 ÷ 60 and say "60 people." Line 1: write 35 + 28 - 15 = 48 and say "Add the totals, then take the overlap away once." Line 2: write P(juice or milk) = 48 ÷ 60 and say "Everyone inside the circles." Line 3: write P(neither) = 1 - 48 ÷ 60 = 12 ÷ 60 and say "Neither is the complement of "or"." -->

<!-- Speaker note: Teacher: ask Zoe where the 4 with both are. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## And

**30 students: 13 have a dog, 10 have a cat and 4 have both. What is P(a dog and a cat)?**

* Answer: 4/30

<!-- Speaker note: Both is the overlap: 4 of 30 = 2/15. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Zoe works out P(dog or cat) for the same class. Click the line where she goes wrong.**

```
 1  30 students: 13 have a dog, 10 have a cat and 4 have both.
 2  "Dog or cat" means a dog, a cat, or both.
 3  P(dog or cat) = 13/30 + 10/30 = 23/30.
```

* Answer: line 3

<!-- Speaker note: Line 3: the 4 with both are in the 13 and in the 10, so they are counted twice. 13 + 10 − 4 = 19, so P = 19/30. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Or on a dice

**A dice is rolled. A is 'an even number' and B is 'more than 4'. Which outcomes are in A or B?**

- 2, 4, 6, 5, 6
- 6
- 2, 4, 5, 6
- 5

* Answer: 2, 4, 5, 6

<!-- Speaker note: Even: 2, 4, 6. More than 4: 5, 6. Either or both: 2, 4, 5, 6, so P(A or B) = 4/6. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Not, or and neither



- **Not music:** 
- **Over 9 or a double:** 
- **Neither:** 
- **At least one:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/data/and-or-not/?full=step-4#step-4)

<!-- Speaker note: What this step is for: 'Not' and 'or' on the diagram and on a two-dice grid, and 'neither' as the complement of 'or'. Hints, in order: Not music is everything outside the Music circle. / A sum over 9 is 10, 11 or 12. / Doubles run down the diagonal. If you chose the sums over 9 first, two doubles are already chosen. For students who need more support: Four mini Venn diagrams with 'and', 'or', 'not A' and 'neither' shaded, as a reference card. For early finishers: Find P(exactly one of A and B) for the Sport and Music class, and write it using 'or', 'and' and 'not'. The hard part, on purpose: The overlap in 'or'. Ask students to point to the overlap and say how many times they have counted it. When students get stuck: A student adds the two totals for 'or'. Ask: Is anyone in both totals? Fix: Add, then take away the overlap once. / A student gives 'and' as everyone in either circle. Ask: Does 'and' need both to be true? Fix: And is the overlap only. / A student leaves out the 'both' people from 'or'. Ask: Does someone with a dog and a cat have a dog or a cat? Fix: In maths, 'or' includes both. -->

<!-- Speaker note: Teacher: ask which outcomes are both over 9 and doubles. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Glasses or left-handed

**A two-way table of 50 people: 12 wear glasses and are left-handed, 18 wear glasses and are right-handed, 5 are left-handed without glasses, 15 neither. What is P(glasses or left-handed)?**

* Answer: 35/50

<!-- Speaker note: 12 + 18 + 5 = 35, so 35/50 = 7/10. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Left-handed, no glasses

**For the same 50 people, what is P(left-handed and no glasses)?**

* Answer: 5/50

<!-- Speaker note: One cell: 5 of 50 = 1/10. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Using the rule

**P(A) = 0.5, P(B) = 0.4 and P(A and B) = 0.2. What is P(A or B)?**

* Answer: 0.7

<!-- Speaker note: 0.5 + 0.4 − 0.2 = 0.7. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exactly one

**In the Sport and Music class (12 sport only, 8 both, 5 music only, 5 neither), what is P(exactly one of sport and music)?**

* Answer: 17/30

<!-- Speaker note: Sport only and music only: 12 + 5 = 17, so 17/30. This is the everyday 'one or the other, not both'. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: an 'or' event

Write your events A and B in words, and how many outcomes are in A, in B and in both.

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/data/and-or-not/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Building an 'or' event to a given size makes them handle the overlap on purpose. Hints, in order: Pick two events that overlap, such as 'the second dice is 1' and 'the sum is 5 or less'. / Count each, then take away the outcomes in both. -->

<!-- Speaker note: Teacher: ask how many outcomes are in A, in B and in both. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**40 students: 25 like maths, 18 like art, 10 like both. Find P(maths or art) and P(neither).**

* 25 + 18 − 10 = 33, so 33/40. Neither: 7/40.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This completes AC9M8P02. Where it leads: simulations of compound events (next lesson), and independent events in Year 10. -->
