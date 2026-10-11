---
order: 15
unit: algorithms
node: [AC9M7SP04 n1, AC9M7SP04 n2]
title: Algorithms for classifying shapes
summary: "An algorithm is a clear set of steps and decisions. A classification algorithm asks yes/no questions about a shape's sides and angles, in an order that gives each shape its own name, and you test it on one shape of every class."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A sorting machine at a factory has to name every shape that rolls past, with no one to help. What questions would you build into it, and in what order?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8300
  url: http://127.0.0.1:8300/index.html
  readySelector: "#gpanel"
  layout: full
explainClip:
  query: { code: "@keys.yml#explain", fresh: 1, id: explain }
  caption: "Following an algorithm"
  say: "Answer one question at a time."
  clip:
    - caption: { text: "Sides 5, 5 and 3. Are all three equal? No.", say: "Sides five, five and three. Are all three equal? No." }
    - click: "No"
    - caption: { text: "Are two sides equal? Yes: isosceles.", say: "Are two sides equal? Yes. Isosceles." }
    - click: "Yes"
    - expect: { selector: "body", contains: "Isosceles" }
    - wait: 1500
---
An **algorithm** is a precise set of steps, including decisions, that always gives the right result. A **classification algorithm** sorts shapes into classes by asking yes/no questions about their **attributes** (sides, angles, parallel sides). It can be drawn as a **flowchart** or a **decision tree**, or written as numbered steps (pseudocode).

Two things make one work: every shape reaches exactly one answer, and the questions are in the right order.

## Predict: an algorithm with one question

```step
stage: predict
insight: "Committing to what a one-question triangle algorithm says about an equilateral triangle shows whether they check the order and the cases."
check:
  type: predict
  q: "An algorithm asks only: 'Are two sides equal? Yes: isosceles. No: scalene.' A triangle has sides 4, 4 and 4. What does it say?"
  options: ["Isosceles", "Equilateral", "Scalene"]
  actual: "Isosceles. Two sides are equal, so it says yes. It never tells the equilateral triangle apart from the others."
```

Would you be happy with that answer from a sorting machine?

## Run: follow the algorithm

```step
stage: run
insight: "Following a two-question algorithm on three test triangles shows the order that gives the equilateral triangle its own name."
try: { playground: board, starter: "keys.yml#triangles", height: 600 }
check: { type: board, text: "Follow this two-question algorithm for each triangle in turn. How does it name the 4, 4, 4 triangle? Compare with your prediction.", when: "n = 3 and e = 0", explain: "Asking 'all three equal?' first gives the equilateral triangle its own name. The one-question algorithm called it isosceles." }
```

Read each shape's description, answer the question, and press the button to go on.

## Investigate: what goes wrong

```step
stage: investigate
insight: "Order and missing cases are the problems; the general question first gives a less specific name (Pia); testing needs one of each class."
tasks:
  - check:
      type: question
      q: "How can you fix the one-question triangle algorithm?"
      options: ["Ask 'Are all three sides equal?' first, then 'Are two sides equal?'", "Ask 'Are two sides equal?' twice", "Remove the scalene answer", "Ask about angles instead"]
      answer: 0
      feedback: [null, "Asking twice changes nothing.", "Then a scalene triangle has nowhere to go.", "Angles can work, but the one-question problem remains."]
      explain: "Test the most specific class first. An equilateral triangle then gets its own name before the wider question is asked."
  - check:
      type: bug
      code: "working.txt#pia"
      text: "Pia tests her algorithm on a rectangle. Click the line where she wrongly decides it works."
      answer: 5
      fault: logic
      misconception: algo-general-first
      explain: "Line 5: the algorithm gives a rectangle the name of the wider family. It should ask 'four right angles?' (or 'is it a rectangle?') before it settles for parallelogram."
  - check:
      type: question
      q: "How should you test a classification algorithm?"
      options: ["Run it on at least one shape of every class and check each name", "Run it on one shape and check the name", "Read it through once", "Count its steps"]
      answer: 0
      feedback: [null, "One shape can hide a missing case.", "An error in the order only shows when it is run.", "A short algorithm can still be wrong."]
      explain: "One example of every class shows missing branches and wrong orders."
```

### Fix the algorithm

Which class does the algorithm confuse with another?

### Find the mistake

Read Pia's working. What name did the rectangle get?

### Testing

## Modify: design and test

```step
stage: modify
insight: "Ordering the decisions of a triangle algorithm, running the quadrilateral one, and finding the shape it cannot handle shows design, tracing and limits."
try: { playground: board, starter: "keys.yml#triangles", height: 600 }
tasks:
  - check:
      type: parsons
      code: "steps.txt#triangle"
      text: "Put the steps of a triangle algorithm in order."
      extra: ["Ask: is one angle a right angle? If yes, say scalene and stop."]
      explain: "Measure first. Test equilateral before isosceles. Scalene is what is left, so it needs no question."
  - starter: "keys.yml#triangles"
    check: { type: board, text: "Run the fixed algorithm on all three triangles. Does every one get the right name?", when: "n = 3 and e = 0", explain: "With the specific question first, each triangle reaches its own name." }
  - starter: "keys.yml#quads"
    check: { type: board, text: "Run the quadrilateral algorithm on all five shapes.", when: "n = 5 and e = 0", explain: "Every shape reaches its own name, and the algorithm asks at most three questions." }
  - check:
      type: question
      q: "A kite (two pairs of equal neighbouring sides, no parallel sides) is put through the quadrilateral algorithm. What happens?"
      options: ["It is called a trapezium, which is wrong: the algorithm has no kite branch", "It is called a kite", "The algorithm stops with no answer", "It is called a rhombus"]
      answer: 0
      feedback: [null, "The algorithm has no kite name.", "Every path ends in a name.", "A kite does not have four equal sides in general."]
      explain: "It answers 'no' to the first questions and ends at trapezium. An algorithm only works for the cases it was designed for: add a branch for kites."
```

### Order the steps

Measure first. Which question is the most specific?

### The triangles

### The quadrilaterals

### A shape it was not made for

## Practise: tracing algorithms

```step
stage: practise
insight: "Counting questions and tracing the path for a shape, mixed; the number of questions a key needs is the planted idea; the triangle review keeps classes fresh."
try: { playground: board, starter: "keys.yml#quads", height: 600 }
tasks:
  - check:
      type: answer
      q: "In the fixed triangle algorithm, how many questions does a scalene triangle need before it is named?"
      answer: "2"
      feedback:
        - ["1", "A scalene triangle answers no to 'all equal?' and no to 'two equal?'."]
      explain: "Two questions: all three sides equal? No. Two sides equal? No. Scalene."
  - check:
      type: question
      q: "A rhombus (four equal sides, angles 60° and 120°) goes through the quadrilateral algorithm. Which answers does it give, in order?"
      options: ["Yes (four equal sides), then No (not all right angles)", "No, then Yes", "Yes, then Yes", "No, then No"]
      answer: 0
      feedback: [null, "A rhombus has four equal sides.", "Its angles are not all right angles.", "It has four equal sides."]
      explain: "Four equal sides: yes. All right angles: no. So it is a rhombus."
  - check:
      type: answer
      q: "The quadrilateral algorithm asks at most how many questions before naming any of its five shapes?"
      answer: "3"
      feedback:
        - ["4", "The longest path has three questions: A, C and D."]
      explain: "The longest path is A, then C, then D."
  - check:
      type: answer
      q: "Review: a triangle has angles 90°, 45° and 45°. How many of its sides are equal?"
      answer: "2"
      feedback:
        - ["3", "Equal sides sit opposite equal angles. Two angles are equal."]
      explain: "Two equal angles mean two equal sides: an isosceles right-angled triangle."
```

### Questions for scalene

### Trace a rhombus

### The longest path

### Review: triangles

## Make: design a classifier

```step
stage: make
insight: "Writing their own algorithm in steps shows whether they put the specific questions first and cover every class."
try: { playground: board, starter: "keys.yml#quads", height: 600 }
hint: ["Answer each question using the shape's description.", "If the key names the wrong shape, find the question you answered wrongly."]
check: { type: board, text: "Run the quadrilateral algorithm on all five shapes again, and say each answer aloud as you go.", when: "n = 5 and e = 0", explain: "Every shape reaches its own name." }
```

Now write an algorithm that sorts triangles by their **angles** into acute, right-angled and obtuse. Test it on one triangle of each class, and say how it works to a partner.
