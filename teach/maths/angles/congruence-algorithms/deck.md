---
marp: true
theme: default
html: true
---

# Algorithms for congruence

Angles and shapes · Algorithms

<!-- Speaker note: Students follow, order, fix and design algorithms that decide whether two triangles are congruent, similar or neither, testing them on one pair of every kind (AC9M8SP04, nodes 1 and 2). About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 10 min · Practise and Make 15 min). -->

---

## Today

**We are learning to** an algorithm can decide whether two triangles are congruent, similar or neither by asking about their equal parts in a careful order: the congruence tests first, then the similarity conditions, and 'not enough to tell' when nothing fits. You test it on one pair of every kind, find what it misses, and fix it.

- I can follow an algorithm for two triangles and say which test it used.
- I can find a pair of triangles an algorithm gets wrong, and fix it.
- I can design and test my own algorithm, and describe how it works.

<!-- Speaker note: Before class: Do the Run board yourself first. Students need the congruence tests, similar triangles and the shape-classifying algorithms from Year 7. The one idea: order matters (congruent before similar, because congruent triangles are similar too), every case needs a path, and the algorithm is only trusted once it has been tested on one pair of each kind. The common mistake is an algorithm that accepts any angle with two sides (Raj's SSA mistake). The board is the same key used for classifying shapes; each specimen is a pair of triangles. Answer "yes" only when the description says the parts are equal. The improved key adds step G for SAS similarity, a gap students find in Modify. Wider: compare two correct algorithms for the fewest questions; write the algorithm in Python with if and elif. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Why it matters

> A design program has to decide whether two parts it is given will fit each other exactly, fit after scaling, or not fit at all. What questions should it ask, and in what order?

<!-- Speaker note: An algorithm can decide whether two triangles are **congruent**, **similar** or **neither**. It looks at the parts that are known to be equal (or in the same ratio) and asks yes/no questions about them. Three things make it work: - **Order**: test congruence before similarity, because congruent triangles are similar too. - **Every case**: each test (SSS, SAS, ASA or AAS, RHS, and AA, SSS and SAS for similarity) has a path, and "not enough to tell" catches the rest. - **Testing**: run it on one pair of every kind, including SSA, which must not be called congruent. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**An algorithm asks only: 'Are all three pairs of angles equal? Yes: congruent.' Two triangles both have angles 40°, 60° and 80°, but one is twice as big. What does it say?**

- Similar
- Congruent
- Not enough to tell

<!-- Speaker note: What happens: Congruent, which is wrong. Equal angles make the triangles similar; congruence needs a matching side too. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what equal angles alone tell you. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fmaths%2Fangles%2Fcongruence-algorithms%2Fstep-2&code=widget%3A+key%0Astep+A%3A+Are+all+three+pairs+of+sides+equal%3F+%7C+Congruent+%28SSS%29+%7C+B%0Astep+B%3A+Are+two+pairs+of+sides+equal%2C+with+the+angle+between+them+equal+too%3F+%7C+Congruent+%28SAS%29+%7C+C%0Astep+C%3A+Are+two+pairs+of+angles+equal%3F+%7C+D+%7C+E%0Astep+D%3A+Is+a+pair+of+matching+sides+equal+too%3F+%7C+Congruent+%28ASA+or+AAS%29+%7C+Similar+%28AA%29%0Astep+E%3A+Do+both+have+a+right+angle%2C+with+equal+hypotenuses+and+another+pair+of+equal+sides%3F+%7C+Congruent+%28RHS%29+%7C+F%0Astep+F%3A+Are+all+three+pairs+of+sides+in+the+same+ratio%3F+%7C+Similar+%28SSS%29+%7C+Neither%2C+or+not+enough+to+tell%0Aspecimen%3A+Congruent+%28SAS%29+%7C+Both%3A+sides+4+cm+and+9+cm%2C+with+a+50%C2%B0+angle+between+them.%0Aspecimen%3A+Similar+%28AA%29+%7C+Both%3A+angles+40%C2%B0+and+65%C2%B0.+The+sides+between+those+angles+are+8+cm+in+one+and+16+cm+in+the+other.%0Aspecimen%3A+Congruent+%28SSS%29+%7C+One+has+sides+5%2C+6+and+7+cm%3B+the+other+has+sides+7%2C+5+and+6+cm.%0Aspecimen%3A+Neither%2C+or+not+enough+to+tell+%7C+Both%3A+sides+6+cm+and+8+cm%2C+and+a+30%C2%B0+angle+opposite+the+6+cm+side+%28not+between+them%29.%0Aspecimen%3A+Congruent+%28RHS%29+%7C+Both%3A+a+right+angle%2C+a+13+cm+hypotenuse+and+a+5+cm+side.%0Aspecimen%3A+Congruent+%28ASA+or+AAS%29+%7C+Both%3A+angles+40%C2%B0+and+65%C2%B0%2C+and+the+side+between+them+is+8+cm.%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/maths/angles/congruence-algorithms/?full=step-2#step-2)

<!-- Speaker note: Answer "yes" only when the description tells you the parts are equal. Open **The whole key** to see the algorithm as numbered steps. -->

<!-- Speaker note: Teacher: ask which question separates congruent from similar. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Congruent, which is wrong. Equal angles make the triangles similar; congruence needs a matching side too.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Order the steps

**Put the steps of a short algorithm in order. It leaves out RHS and the other similarity tests; the Run algorithm has them.**

```maths
If a matching pair of sides is equal too, say "congruent (ASA or AAS)"; if not, say "similar".
If not, and two pairs of angles are equal, check the sides next.
If all three pairs of sides are equal, say "congruent (SSS)" and stop.
If not, and two pairs of sides and the angle between them are equal, say "congruent (SAS)" and stop.
If two pairs of sides and any angle are equal, say "congruent" and stop.
Otherwise, say "not enough to tell".
List the equal parts of the two triangles.
```

<!-- Speaker note: List the parts, test SSS, then SAS, then two angles (with or without a matching side), and finish with 'not enough to tell'. Correct order: List the equal parts of the two triangles. If all three pairs of sides are equal, say "congruent (SSS)" and stop. If not, and two pairs of sides and the angle between them are equal, say "congruent (SAS)" and stop. If not, and two pairs of angles are equal, check the sides next. If a matching pair of sides is equal too, say "congruent (ASA or AAS)"; if not, say "similar". Otherwise, say "not enough to tell". -->

<!-- Speaker note: Teacher: ask Raj which angle the SSA pair has. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Raj tests his algorithm on triangles with sides 6 cm and 8 cm and a 30° angle opposite the 6 cm side, and it says congruent. Click the line that is wrong.**

```
 1  Raj writes an algorithm to decide if two triangles are congruent.
 2  Step 1: if all three pairs of sides are equal, say "congruent".
 3  Step 2: if two pairs of sides and any pair of angles are equal, say "congruent".
 4  Step 3: otherwise, say "not enough to tell".
```

* Answer: line 3

<!-- Speaker note: Line 3: 'any pair of angles' lets SSA through. The angle must be between the two sides (SAS). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace a pair

**Two triangles both have angles 50° and 60°. The sides between those angles are 5 cm and 10 cm. Trace the Run algorithm. Where does it end?**

- Similar (AA): two angles equal, but the matching sides are not
- Congruent (ASA)
- Congruent (SSS)
- Neither

* Answer: Similar (AA): two angles equal, but the matching sides are not

<!-- Speaker note: A no, B no, C yes (two angles), D no (5 ≠ 10): similar with scale factor 2. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Find a gap and fix it



- **A gap:** 
- **The fix:** 
- **The longest path:** 
- **Test again:** 

[Open this step](https://tutorials.learningwaypoints.com/maths/angles/congruence-algorithms/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A pair the first algorithm wrongly sends to 'not enough to tell' (SAS similarity) shows a gap; adding a step and re-testing is the fix. For students who need more support: Give the questions on cards and the six test pairs on cards; students order the questions, then run each pair through. For early finishers: Write the algorithm in Python with if, elif and else, and test it on your six pairs. What is the fewest number of questions that separates all the answers? The hard part, on purpose: Answering from what is known, not what could be worked out. Ask 'does the description say that?' before every yes. When students get stuck: A student answers yes to SSS for the RHS pair (by working out the third side). Ask: Does the description give all three sides? Fix: Answer from what is given; RHS has its own question. / A student answers yes at step B for the RHS pair. Ask: Is the right angle between the hypotenuse and the 5 cm side? Fix: The right angle is between the two shorter sides; RHS has its own question at E. / A student puts the similarity question first. Ask: What would a congruent pair be called then? Fix: Ask the most specific question (congruent) first. / A student's algorithm has no answer for some pairs. Ask: Where does a 'no' at your last question go? Fix: End with a catch-all: 'not enough to tell'. -->

<!-- Speaker note: Teacher: ask what test case would have found the gap. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## RHS

**Both triangles have a right angle, a 10 cm hypotenuse and a 6 cm side. Which answers does the algorithm give, in order?**

- Yes at A: congruent (SSS)
- No, Yes: congruent (SAS)
- No, No, Yes: two angles
- No, No, No, then Yes at E: congruent (RHS)

* Answer: No, No, No, then Yes at E: congruent (RHS)

<!-- Speaker note: A no, B no (the right angle is not between them), C no, E yes: RHS. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## SSA

**Both triangles have sides 7 cm and 5 cm, and a 40° angle opposite the 5 cm side (not between them). What should a correct algorithm say?**

- Congruent (SAS)
- Congruent (RHS)
- Similar
- Not enough to tell

* Answer: Not enough to tell

<!-- Speaker note: SSA can give two different triangles, so the algorithm must not say congruent. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Describe it

**Which describes the algorithm best?**

- It checks similarity first, then congruence
- It measures every side and angle
- It only checks sides
- It checks the congruence tests first, then the similarity conditions, and says 'not enough to tell' if none fit

* Answer: It checks the congruence tests first, then the similarity conditions, and says 'not enough to tell' if none fit

<!-- Speaker note: Most specific first (congruent), then the wider class (similar), then a catch-all. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: parallelograms

**Review: in parallelogram ABCD, angle A = 75°. What is angle B, in degrees?**

* Answer: 105

<!-- Speaker note: A and B are neighbours (co-interior): 180 − 75 = 105°. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your own algorithm

Write an algorithm that sorts pairs of triangles into **congruent**, **similar** and **not enough to tell**. Draw it as a flowchart or write numbered steps. Swap with a partner: trace their algorithm on your test pairs, and describe in words how it works.

[Open this step](https://tutorials.learningwaypoints.com/maths/angles/congruence-algorithms/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Designing and testing their own algorithm shows whether they order the tests, cover every case and check it. Hints, in order: Start from the tests you know: SSS, SAS, ASA or AAS, RHS. / Write one test pair of triangles for each answer, including SSA. -->

<!-- Speaker note: Teacher: ask a partner to trace your algorithm on an SSA pair. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why must an algorithm for congruence not answer 'congruent' when two sides and any angle are equal?**

* If the angle is not between the sides (SSA), two different triangles can fit, so they might not be congruent.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This covers AC9M8SP04. Where it leads: algorithms in code (the Code pathways), and similar triangles in trigonometry (Year 10). -->
