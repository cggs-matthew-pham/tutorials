---
marp: true
theme: default
html: true
---

# Grids and tree diagrams

Data and chance · Chance

<!-- Speaker note: Students list the outcomes of two events in a grid and a tree diagram, count the outcomes in an event and find its probability (AC9M8P02, node 1). About 40 minutes (Predict and Run 8 min · Investigate 10 min · Modify 12 min · Practise and Make 10 min). -->

---

## Today

**We are learning to** two events, one after the other, make a sample space of pairs. A grid or a tree diagram lists every pair once, so you can count the outcomes in an event and find its probability.

- I can list every outcome of two events with a grid or a tree diagram.
- I can count the outcomes in an event and give its probability.
- I can choose between a grid, a tree and a Venn diagram.

<!-- Speaker note: Before class: Do the Run board yourself first. Students need sample spaces (Year 7) and the Venn diagrams and tables from the last lesson. The one idea: two events make pairs, and a grid or tree lists every pair once, so the outcomes are equally likely. The common mistake is merging pairs that differ only in order (Max's HH, TT, one of each), which makes unequal outcomes look equal. Branch probabilities (multiplying along a tree) are Year 10 (AC9M10P01); here every outcome is equally likely and students count. The board lists outcomes rather than drawing spinners, so the lesson says 'equal parts' every time; point it out. Wider: three coins on a tree (8 outcomes), and why a grid can't show them. -->

---

## Why it matters

> A game asks you to toss a coin and roll a dice: you win with heads and an even number. Is that a good chance or a poor one? First you need every way the two can land.

<!-- Speaker note: When two things happen one after the other (toss a coin, then roll a dice), each outcome is a **pair**, such as (H, 4). A **tree diagram** draws the first event's outcomes as branches, then splits every branch into the second event's outcomes. A **grid** puts the first event down the side and the second across the top: it is a two-way table of the outcomes. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**You toss a coin and roll a dice. How many different outcomes are there?**

- 6
- 8
- 12

<!-- Speaker note: What happens: 12. Each of the 2 coin results goes with each of the 6 dice results: 2 × 6 = 12 pairs. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask how many dice results go with heads. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fmaths%2Fdata%2Fgrids-and-trees%2Fstep-2&code=widget%3A+events%0Afirst%3A+coin%0Asecond%3A+dice%0Aview%3A+both%0Atarget%3A+a+%3D+H+and+b+%25+2+%3D+0%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/maths/data/grids-and-trees/?full=step-2#step-2)

<!-- Speaker note:  -->

<!-- Speaker note: Teacher: ask whether the grid and tree show the same 12 outcomes. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 12. Each of the 2 coin results goes with each of the 6 dice results: 2 × 6 = 12 pairs.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Count the pairs

Here is the routine.

$$\text{Spinner with equal red and blue parts};\ \text{then a coin}$$

1) $\text{red} \to \text{H, T};\ \text{blue} \to \text{H, T}$ — Split each branch into every outcome of the second.
2) $2 \times 2 = 4 \text{ outcomes}$ — Count the leaves of the tree.
3) $P(\text{blue, H}) = \tfrac{1}{4}$ — One leaf out of four.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write Spinner with equal red and blue parts;then a coin and say "Two events, one after the other." Line 1: write red H, T;blue H, T and say "Split each branch into every outcome of the second." Line 2: write 2 × 2 = 4 outcomes and say "Count the leaves of the tree." Line 3: write P(blue, H) = 1 ÷ 4 and say "One leaf out of four." -->

<!-- Speaker note: Teacher: ask Max to toss a red and a blue coin. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the pairs

**A spinner has 3 colours and a dice has 6 faces. How many outcomes when you spin, then roll?**

* Answer: 18

<!-- Speaker note: 3 × 6 = 18 pairs. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Max finds the chance of one head and one tail with two coins. Click the line where he goes wrong.**

```
 1  Max tosses two coins and lists what can happen.
 2  The equally likely outcomes are: HH, TT, and one of each.
 3  That is 3 outcomes, and one of them is "one of each".
 4  So P(one head and one tail) = 1/3.
```

* Answer: line 2

<!-- Speaker note: Line 2: one of each can happen two ways, HT and TH. The four equally likely outcomes are HH, HT, TH, TT, so P(one of each) = 2/4 = 1/2. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Three coins

**You toss three coins. Which is the best way to list the outcomes?**

- A tree diagram
- A list of the totals
- A Venn diagram
- A grid

* Answer: A tree diagram

<!-- Speaker note: A tree can keep branching: a column of branches for each event, 2 × 2 × 2 = 8 outcomes. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Other pairs



- **Spinner and coin:** 
- **Sum of 8:** 
- **The same letter:** 
- **Grid or tree:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/data/grids-and-trees/?full=step-4#step-4)

<!-- Speaker note: What this step is for: The same counting on a spinner and coin, two dice and two draws with letters shows a grid or a tree works for any two events. Hints, in order: Look along the diagonal where the sums are 8. For students who need more support: A printed 6 by 6 grid for two dice and a blank two-level tree. For early finishers: Three coins: draw the tree. What is P(exactly two heads)? Why can't the board's grid show this? The hard part, on purpose: Counting HT and TH as different. Ask students to colour the two coins (a red coin and a blue coin) before they list. When students get stuck: A student adds the outcomes (2 + 6 = 8). Ask: How many dice results go with heads? With tails? Fix: Each first outcome pairs with every second outcome: multiply. / A student lists HT and TH once. Ask: If one coin is red and one is blue, is red-heads blue-tails the same as red-tails blue-heads? Fix: Order matters: both are outcomes. / A student says P(sum is 7) = 1/11. Ask: Are the sums 2 to 12 equally likely? Fix: Count pairs in the grid, not the list of sums. -->

<!-- Speaker note: Teacher: ask why the sums of 8 lie on a diagonal. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sum of 7

**Two dice are rolled. What is P(the sum is 7)?**

* Answer: 1/6

<!-- Speaker note: 6 of the 36 pairs make 7: 6/36 = 1/6. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two heads

**Two coins are tossed. What is P(two heads)?**

* Answer: 1/4

<!-- Speaker note: HH is 1 of the 4 outcomes HH, HT, TH, TT. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Meals

**A café offers 4 sandwiches and 3 drinks. How many different sandwich-and-drink meals are there?**

* Answer: 12

<!-- Speaker note: Each sandwich goes with each drink: 4 × 3 = 12. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: neither

**Review: 30 students, 18 play netball, 10 play hockey, 4 play both. How many play neither?**

* Answer: 6

<!-- Speaker note: Netball only 14, both 4, hockey only 6: 24. So 30 − 24 = 6. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a fair game

Write the rule of your game in words, then check a friend's game with the grid.

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/data/grids-and-trees/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Designing an event with probability one half on two dice shows they can count outcomes to a target. Hints, in order: A fair game wins half the time: 18 of 36 outcomes. / An even sum is one way. Find another. -->

<!-- Speaker note: Teacher: ask how many outcomes make a half. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A spinner shows 1, 2 or 3 (equal parts) and a coin is tossed. List the outcomes. What is P(an odd number and heads)?**

* 1H, 1T, 2H, 2T, 3H, 3T: 6 outcomes. 1H and 3H, so 2/6 = 1/3.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This completes AC9M8P02 node 1 with the last lesson. Where it leads: 'and', 'or' and 'not' (next), simulations, and multiplying along branches in Year 10. -->
