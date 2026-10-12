---
marp: true
theme: default
html: true
---

# Venn diagrams and two-way tables

Data and chance · Chance

<!-- Speaker note: Students read, build and convert between Venn diagrams and two-way tables for two yes/no properties (AC9M8P02, node 1). About 40 minutes (Predict and Run 8 min · Investigate 10 min · Modify 12 min · Practise and Make 10 min). -->

---

## Today

**We are learning to** when everyone in a group is sorted by two yes/no questions, a Venn diagram and a two-way table show the same four groups: one, the other, both and neither. Each person is in exactly one of them.

- I can sort a group into one, the other, both and neither.
- I can build a Venn diagram or a two-way table from a story.
- I can change a Venn diagram into a two-way table, and back.

<!-- Speaker note: Before class: Do the Run board yourself first. Students need sample spaces and fractions as probabilities. The one idea: two properties make four groups, and every person is in exactly one. The common mistake is writing a whole total (22 like tea) in the 'only' part, counting the overlap twice (Lia's mistake). The board shows the diagram and the table together; choosing a region highlights the matching cell. In Modify, students fill one from the other (the board ticks when all four are right). Probabilities from these (and, or, not) come in two lessons. Tree diagrams and grids (the other representations in 8P02) are next. -->

---

## Why it matters

> In a class of 30, 20 play sport and 13 play music. That adds to 33, more than the class. Nobody miscounted. What is going on?

<!-- Speaker note: A **Venn diagram** shows two properties as overlapping circles inside a box (everyone). A **two-way table** shows the same people in rows and columns, with totals. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**In a class of 30, 20 play sport and 13 play music. 20 + 13 = 33. How can that be?**

- Some play neither
- Someone made a mistake
- Some play both, and were counted twice

<!-- Speaker note: What happens: Some play both. They were counted once with sport and again with music. Here 8 play both. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask who might have been counted twice. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fmaths%2Fdata%2Ftwo-way-tables%2Fstep-2&code=widget%3A+venn%0Alabels%3A+Sport%2C+Music%0Acounts%3A+12%2C+8%2C+5%2C+5%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/maths/data/two-way-tables/?full=step-2#step-2)

<!-- Speaker note: Click a part again to remove it. The table's inside cells match the four parts of the diagram: | | Music | Not music | |---|---|---| | **Sport** | both | sport only | | **Not sport** | music only | neither | -->

<!-- Speaker note: Teacher: ask which two groups make the whole Sport circle. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Some play both. They were counted once with sport and again with music. Here 8 play both.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Neither

Here is the routine. Start in the middle.

$$25 \text{ students: } 15 \text{ dog},\ 10 \text{ cat},\ 4 \text{ both}$$

1) $\text{both} = 4$ — Write the overlap first.
2) $\text{dog only} = 15 - 4 = 11,\ \text{cat only} = 10 - 4 = 6$ — Take the overlap from each total.
3) $\text{neither} = 25 - (11 + 4 + 6) = 4$ — Everyone else.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write 25 students: 15 dog,10 cat,4 both and say "Read the story." Line 1: write both = 4 and say "Write the overlap first." Line 2: write dog only = 15 - 4 = 11,cat only = 10 - 4 = 6 and say "Take the overlap from each total." Line 3: write neither = 25 - (11 + 4 + 6) = 4 and say "Everyone else." -->

<!-- Speaker note: Teacher: ask Lia how many like tea but not coffee. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Neither

**40 people: 22 like tea, 18 like coffee and 7 like both. How many like neither?**

* Answer: 7

<!-- Speaker note: Tea only 22 − 7 = 15, coffee only 18 − 7 = 11. 15 + 7 + 11 = 33, so 40 − 33 = 7 like neither. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Lia draws the Venn diagram for the same 40 people. Click the line where she goes wrong.**

```
 1  In a group of 40 people, 22 like tea, 18 like coffee and 7 like both.
 2  Lia writes 7 in the overlap of the Venn diagram.
 3  She writes 22 in the tea-only part and 18 in the coffee-only part.
 4  Neither: 40 − 22 − 18 − 7 = −7.
```

* Answer: line 3

<!-- Speaker note: Line 3: 22 like tea, but 7 of them are already in the overlap. Tea only is 15 and coffee only is 11. A negative count shows something went wrong. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Tables or diagrams

**Which is easier to read from a two-way table than from a Venn diagram?**

- Nothing: they show different people
- Who is in neither
- Who is in both groups
- The totals, such as how many play sport in all

* Answer: The totals, such as how many play sport in all

<!-- Speaker note: The table has total rows and columns; in a Venn diagram you add the parts yourself. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## From one to the other



- **Diagram to table:** 
- **Table to diagram:** 
- **Exactly one:** 
- **Outside the circles:** 

[Open this step](https://tutorials.learningwaypoints.com/maths/data/two-way-tables/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Filling a table from a diagram and a diagram from a table shows the four cells are the four regions. Hints, in order: Both goes where the Dog row meets the Cat column. / Dog only goes in the Dog row, Not cat column. / The overlap is the cell where Glasses meets Left-handed. For students who need more support: A blank Venn diagram and a blank two-way table on one sheet, with 'both' marked in each. For early finishers: Three properties need three circles: how many regions does that make? Try it for sport, music and art. The hard part, on purpose: The overlap. Ask students to write the 'both' number first, every time, and take it from each total. When students get stuck: A student writes the whole total in the 'only' part. Ask: Are some of those people in the overlap too? Fix: Write both first; only = total − both. / A student forgets the 'neither' group. Ask: Is everyone in a circle? Fix: The box is everyone; neither = total − the other three. / A student mixes up rows and columns in the table. Ask: Read the row name, then the column name: what do both say? Fix: Each inside cell is one row property and one column property. -->

<!-- Speaker note: Teacher: ask where 'both' goes in the table. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Row total

**A two-way table: 18 students walk and own a bike, 7 walk and don't own a bike. How many students walk in all?**

* Answer: 25

<!-- Speaker note: The Walk row: 18 + 7 = 25. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Case only

**60 people: 35 have a phone case, 20 have a screen protector, 12 have both. How many have a case but no screen protector?**

* Answer: 23

<!-- Speaker note: 35 − 12 = 23. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Neither

**In that group of 60, how many have neither?**

* Answer: 17

<!-- Speaker note: Case only 23, both 12, protector only 8: 43. So 60 − 43 = 17 have neither. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: complement

**Review: a bag has 7 counters, 2 of them green. What is P(not green)?**

* Answer: 5/7

<!-- Speaker note: 1 − 2/7 = 5/7. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your own survey

The board shows a finished example (bus and bike) to compare with. Ask your two questions to your class or family, then draw both pictures. Which is quicker to read, and for which question?

[Open this step](https://tutorials.learningwaypoints.com/maths/data/two-way-tables/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Planning a two-question survey and its table and diagram shows they can set up both representations. Hints, in order: Pick two yes/no questions, such as 'Do you catch a bus?' and 'Do you ride a bike?' / Count the overlap first. -->

<!-- Speaker note: Teacher: ask which picture answers 'how many ride a bike in all?' faster. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**50 students: 30 study French, 25 study Japanese, 10 study both. How many study neither?**

* French only 20, Japanese only 15, both 10: 45, so 5 study neither.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This starts AC9M8P02 node 1. Where it leads: grids and tree diagrams (next lesson), and 'and', 'or' and 'not' probabilities. -->
