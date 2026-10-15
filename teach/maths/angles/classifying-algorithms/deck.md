---
marp: true
theme: default
html: true
---

# Algorithms for classifying shapes

Angles and shapes · Algorithms

<!-- Speaker note: Students follow, fix and test algorithms that classify triangles and quadrilaterals, and describe how each works (AC9M7SP04, nodes 1 and 2). About 40 minutes (Predict and Run 8 min · Investigate 10 min · Modify 10 min · Practise and Make 12 min). -->

---

## Today

**We are learning to** an algorithm is a clear set of steps and decisions. A classification algorithm asks yes/no questions about a shape's sides and angles, in an order that gives each shape its own name, and you test it on one shape of every class.

- I can follow an algorithm and say what each decision does.
- I can put the questions of a classifier in an order that works.
- I can test an algorithm on one shape of every class.

<!-- Speaker note: Before class: Do the Run board yourself first. Students need the triangle and quadrilateral classes (Classifying shapes lessons). The one idea: each shape must reach its own name, so the most specific question comes first. A short algorithm can be wrong; testing on one shape of every class finds it (Pia's mistake). The board follows the key one question at a time; it is the same tool students use for living things in science. Students design on paper: the Make task asks for an algorithm for triangles by angles, drawn as a flowchart or written as numbered steps. Judging two algorithms for efficiency (fewest questions) and for edge cases (the kite) are wider ideas. This links to Code: an algorithm written in steps is a program with `if` and `else`. -->

---

## Why it matters

> A sorting machine at a factory has to name every shape that rolls past, with no one to help. What questions would you build into it, and in what order?

<!-- Speaker note: An **algorithm** is a precise set of steps, including decisions, that always gives the right result. A **classification algorithm** sorts shapes into classes by asking yes/no questions about their **attributes** (sides, angles, parallel sides). It can be drawn as a **flowchart** or a **decision tree**, or written as numbered steps (pseudocode). Two things make one work: every shape reaches exactly one answer, and the questions are in the right order. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**An algorithm asks only: 'Are two sides equal? Yes: isosceles. No: scalene.' A triangle has sides 4, 4 and 4. What does it say?**

- Equilateral
- Scalene
- Isosceles

<!-- Speaker note: What happens: Isosceles. Two sides are equal, so it says yes. It never tells the equilateral triangle apart from the others. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what the machine should say for the equilateral triangle. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fmaths%2Fangles%2Fclassifying-algorithms%2Fstep-2&code=widget%3A+key%0Astep+A%3A+Are+all+three+sides+equal%3F+%7C+Equilateral+%7C+B%0Astep+B%3A+Are+two+sides+equal%3F+%7C+Isosceles+%7C+Scalene%0Aspecimen%3A+Scalene+%7C+Sides+3+cm%2C+4+cm+and+5+cm.%0Aspecimen%3A+Isosceles+%7C+Sides+5+cm%2C+5+cm+and+3+cm.%0Aspecimen%3A+Equilateral+%7C+Sides+4+cm%2C+4+cm+and+4+cm.%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/maths/angles/classifying-algorithms/?full=step-2#step-2)

<!-- Speaker note: Read each shape's description, answer the question, and press the button to go on. -->

<!-- Speaker note: Teacher: ask which triangle the algorithm gets wrong, and why. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Isosceles. Two sides are equal, so it says yes. It never tells the equilateral triangle apart from the others.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Fix the algorithm

**How can you fix the one-question triangle algorithm?**

- Remove the scalene answer
- Ask 'Are two sides equal?' twice
- Ask about angles instead
- Ask 'Are all three sides equal?' first, then 'Are two sides equal?'

* Answer: Ask 'Are all three sides equal?' first, then 'Are two sides equal?'

<!-- Speaker note: Test the most specific class first. An equilateral triangle then gets its own name before the wider question is asked. -->

<!-- Speaker note: Teacher: ask what test shapes Pia should have used. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Pia tests her algorithm on a rectangle. Click the line where she wrongly decides it works.**

```
 1  Pia writes an algorithm for four-sided shapes.
 2  1. Are there two pairs of parallel sides? If yes, say "parallelogram".
 3  2. If not, is there one pair? If yes, say "trapezium".
 4  She tests it on a rectangle: step 1 says yes, so it says "parallelogram".
 5  She decides it works, because a rectangle is a parallelogram.
```

* Answer: line 5

<!-- Speaker note: Line 5: the algorithm gives a rectangle the name of the wider family. It should ask 'four right angles?' (or 'is it a rectangle?') before it settles for parallelogram. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Testing

**How should you test a classification algorithm?**

- Read it through once
- Count its steps
- Run it on at least one shape of every class and check each name
- Run it on one shape and check the name

* Answer: Run it on at least one shape of every class and check each name

<!-- Speaker note: One example of every class shows missing branches and wrong orders. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Design and test



- **Order the steps:** Measure first. Which question is the most specific?
- **The triangles:** 
- **The quadrilaterals:** 
- **A shape it was not made for:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/angles/classifying-algorithms/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Ordering the decisions of a triangle algorithm, running the quadrilateral one, and finding the shape it cannot handle shows design, tracing and limits. For students who need more support: Give students the questions on cards and ask them to lay out the order before they use the board. For early finishers: Compare two correct algorithms for the same job: which asks fewer questions on average? Then write the triangle algorithm in Python with `if` and `else`. The hard part, on purpose: Ordering the questions. Ask students to say which shape each question separates before they put it in a position. When students get stuck: A student asks the general question first. Ask: What would a square be called by this question? Fix: Ask the most specific question first. / A student tests on one shape. Ask: Which classes has your test not reached? Fix: Test one shape of every class. / A student has a path with no end. Ask: Where does a 'no' lead? Fix: Every yes and every no must lead on to another question or a name. -->

<!-- Speaker note: Teacher: ask students to describe the quad algorithm in words. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Tracing algorithms

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fmaths%2Fangles%2Fclassifying-algorithms%2Fstep-5&code=widget%3A+key%0Astep+A%3A+Are+all+four+sides+equal%3F+%7C+B+%7C+C%0Astep+B%3A+Are+all+four+angles+right+angles%3F+%7C+Square+%7C+Rhombus%0Astep+C%3A+Are+there+two+pairs+of+parallel+sides%3F+%7C+D+%7C+Trapezium%0Astep+D%3A+Are+all+four+angles+right+angles%3F+%7C+Rectangle+%7C+Parallelogram%0Aspecimen%3A+Rectangle+%7C+Sides+6+cm+and+4+cm%2C+with+four+right+angles.%0Aspecimen%3A+Trapezium+%7C+One+pair+of+parallel+sides%3B+the+other+two+sides+are+not+parallel.%0Aspecimen%3A+Rhombus+%7C+Four+sides+of+5+cm%3B+angles+60%C2%B0+and+120%C2%B0.%0Aspecimen%3A+Square+%7C+Four+sides+of+5+cm+and+four+right+angles.%0Aspecimen%3A+Parallelogram+%7C+Sides+6+cm+and+4+cm%3B+angles+70%C2%B0+and+110%C2%B0%3B+both+pairs+of+opposite+sides+parallel.%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/maths/angles/classifying-algorithms/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Counting questions and tracing the path for a shape, mixed; the number of questions a key needs is the planted idea; the triangle review keeps classes fresh. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Questions for scalene

**In the fixed triangle algorithm, how many questions does a scalene triangle need before it is named?**

* Answer: 2

<!-- Speaker note: Two questions: all three sides equal? No. Two sides equal? No. Scalene. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace a rhombus

**A rhombus (four equal sides, angles 60° and 120°) goes through the quadrilateral algorithm. Which answers does it give, in order?**

- No, then No
- No, then Yes
- Yes (four equal sides), then No (not all right angles)
- Yes, then Yes

* Answer: Yes (four equal sides), then No (not all right angles)

<!-- Speaker note: Four equal sides: yes. All right angles: no. So it is a rhombus. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The longest path

**The quadrilateral algorithm asks at most how many questions before naming any of its five shapes?**

* Answer: 3

<!-- Speaker note: The longest path is A, then C, then D. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: triangles

**Review: a triangle has angles 90°, 45° and 45°. How many of its sides are equal?**

* Answer: 2

<!-- Speaker note: Two equal angles mean two equal sides: an isosceles right-angled triangle. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: design a classifier

Now write an algorithm that sorts triangles by their **angles** into acute, right-angled and obtuse. Test it on one triangle of each class, and say how it works to a partner.

[Open this step](https://studio.learningwaypoints.com/tutorials/maths/angles/classifying-algorithms/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Writing their own algorithm in steps shows whether they put the specific questions first and cover every class. Hints, in order: Answer each question using the shape's description. / If the key names the wrong shape, find the question you answered wrongly. -->

<!-- Speaker note: Teacher: ask a partner to run the algorithm on a shape the author hasn't tried. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why must a classifier ask 'are all three sides equal?' before 'are two sides equal?'**

* An equilateral triangle has two equal sides too, so the wider question would give it the wrong name.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This completes AC9M7SP04. Where it leads: algorithms in code (the Code pathways), flowcharts for other decisions, and decision trees in Probability. -->
