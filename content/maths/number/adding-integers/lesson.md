---
order: 2
unit: integers
node: AC9M7N07 n2
title: Adding and subtracting integers
summary: Start at the first number and move along the line. Adding a negative moves left; subtracting moves the opposite way to adding, so subtracting a negative moves right.
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A temperature that rises 9 degrees from −4 °C, a lift that goes down 5 floors from level 2, a bank balance below zero: all of them are moves along a number line."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8161
  url: http://127.0.0.1:8161/index.html
  readySelector: "#sl-a"
  layout: full
explainPicture: { ref: sum.yml#explain-pic, caption: "$5 - (-3)$: adding $-3$ would go left 3, so subtracting goes right 3, to 8." }
explainClip:
  query: { code: "@sum.yml#explain", fresh: 1, id: explain }
  caption: "Adding and subtracting are moves along the line"
  say: "Adding and subtracting are moves along the number line."
  clip:
    - caption: { text: "−3 + 5: start at −3 and move right 5, to 2.", say: "Negative three plus five: start at negative three, and move right five." }
    - wait: 300
    - caption: { text: "Subtracting goes the opposite way: −3 − 5 is left 5, to −8.", say: "Subtracting goes the opposite way: left five." }
    - click: Subtract
    - wait: 300
    - caption: { text: "Now subtract a negative: −3 − (−2).", say: "Now subtract negative two." }
    - click: Make b smaller
    - click: Make b smaller
    - click: Make b smaller
    - click: Make b smaller
    - click: Make b smaller
    - click: Make b smaller
    - click: Make b smaller
    - wait: 400
    - caption: { text: "Adding −2 would go left, so subtracting it goes right 2, to −1.", say: "Adding negative two goes left, so subtracting it goes right." }
    - expect: { selector: "#nlsum", contains: "−3 − (−2) = −1" }
    - wait: 1200
---
In the last lesson, further left on the number line meant less. Now the line is for working out: **start at the first number, then move**.

Adding a positive number moves right. In this lesson you find out what adding a negative does, and what subtracting does, including subtracting a negative.

## Predict: subtracting a negative

```step
stage: predict
insight: "Committing to an answer for 5 − (−3) before the board shows it makes the move of subtracting a negative a test of their idea."
check:
  type: predict
  q: "What is $5 - (-3)$?"
  options:
    - "$8$"
    - "$2$"
    - "$-8$"
    - "$-2$"
  actual: "5 − (−3) = 8. Adding −3 would move left 3; subtracting goes the opposite way, so it moves right 3, from 5 to 8."
```

Start at 5. Which way does subtracting move you? Which way does the minus sign on $-3$ point?

## Run: subtract on the line

```step
stage: run
insight: "Changing b from 3 to −3 while subtracting shows the jump turn round: subtracting moves the opposite way to adding b, which is drawn faintly above."
try: { playground: board, starter: "sum.yml#run", height: 420 }
check: { type: board, text: "The board shows $5 - 3$. Change $b$ to $-3$. Was your prediction right?", when: "a = 5 and b = -3" }
```

The blue jump starts at $a$ and lands on $R$. When you subtract, the faint dashed arrow shows which way adding $b$ would go. Watch it as you make $b$ smaller, past zero.

## Investigate: which way to move

```step
stage: investigate
insight: "One rule covers all four cases: adding moves the way the number points (right for positive, left for negative), subtracting moves the opposite way. Mia's mistake treats the minus sign of the number as the operation."
tasks:
  - check:
      type: answer
      q: "Work out $4 + (-6)$."
      answer: "-2"
      feedback:
        - ["10", "That adds 6. Adding a negative moves left: from 4, go left 6."]
        - ["2", "Count from 4: left 6 goes past zero, to −2."]
      explain: "Start at 4. Adding −6 moves left 6: 3, 2, 1, 0, −1, −2."
  - check:
      type: bug
      code: "working.txt#mia"
      text: "Mia works out $5 - (-3)$. Click the line where her working goes wrong."
      answer: 3
      fault: logic
      misconception: subtract-negative
      explain: "Line 3: adding −3 would move left 3, but this is subtracting, so the move is the opposite way: right 3. 5 − (−3) = 8."
  - check:
      type: sort
      q: "From the first number, does each sum move right or left?"
      options: ["Moves right", "Moves left"]
      items:
        - ["2 + 3", "Moves right"]
        - ["2 + (−3)", "Moves left"]
        - ["2 − 3", "Moves left"]
        - ["2 − (−3)", "Moves right", "Adding −3 would go left, so subtracting it goes right."]
        - ["−5 + 4", "Moves right"]
        - ["−2 − 4", "Moves left"]
```

### Moves on the line

Here is how to use the line for each kind of sum.

```worked
-2 + 5 :: Start at the first number, $-2$.
-2 + 5 = 3 :: Adding a positive moves right: 5 to the right lands on 3.
4 + (-6) = -2 :: Adding a negative moves left: from 4, left 6 lands on $-2$.
5 - (-3) :: Subtracting moves the opposite way to adding.
\text{adding } {-3} \text{ is left 3, so subtracting it is right 3} :: Find the way adding would go, then turn round.
5 - (-3) = 8 :: From 5, right 3 lands on 8. Subtracting $-3$ is the same as adding 3.
```

### Find the mistake

Read Mia's working one line at a time. Which line moves the wrong way?

### Right or left?

Adding moves the way the number points; subtracting moves the opposite way. Sort each sum.

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: crossing zero when adding, adding a negative, subtracting past zero, subtracting a negative, then the edge case of subtracting a number from itself."
try: { playground: board, starter: "sum.yml#add", height: 420 }
tasks:
  - starter: "sum.yml#add"
    hint: "Start at −6 and move right 4."
    check: { type: answer, q: "Work out $-6 + 4$. Set the board to check.", answer: "-2", feedback: [["-10", "Adding 4 moves right, towards zero."], ["2", "From −6, right 4 is still below zero."]], explain: "From −6, right 4: −5, −4, −3, −2." }
  - starter: "sum.yml#add"
    hint: "Adding a negative moves left."
    check: { type: answer, q: "Work out $3 + (-7)$. Set the board to check.", answer: "-4", feedback: [["10", "That moves right. Adding a negative moves left."], ["4", "From 3, left 7 goes past zero."]], explain: "From 3, left 7 lands on −4." }
  - starter: "sum.yml#subtract"
    hint: "Subtracting 5 moves left 5, past zero."
    check: { type: answer, q: "Work out $2 - 5$. Set the board to check.", answer: "-3", feedback: [["3", "That is 5 − 2. Start at 2, then move left 5."], ["7", "Subtracting a positive moves left."]], explain: "From 2, left 5: 1, 0, −1, −2, −3." }
  - starter: "sum.yml#subtract"
    hint: ["Adding −6 would move left. Subtracting goes the other way.", "From −4, right 6."]
    check: { type: answer, q: "Work out $-4 - (-6)$. Set the board to check.", answer: "2", feedback: [["-10", "That moved left. Subtracting a negative moves right."], ["-2", "From −4, right 6 goes past zero."]], explain: "Subtracting −6 moves right 6: from −4 to 2." }
  - starter: "sum.yml#subtract"
    hint: "Where does subtracting a number from itself always land?"
    check: { type: answer, q: "Edge case: work out $-5 - (-5)$.", answer: "0", feedback: [["-10", "Subtracting −5 moves right 5, not left."], ["10", "Start at −5, not at 0."]], explain: "From −5, right 5 lands on 0: any number minus itself is 0." }
```

### Adding across zero

Each task changes one thing. First: start below zero and add a positive.

### Adding a negative

Now the number you add is negative.

### Subtracting past zero

A positive subtracted from a smaller number.

### Subtracting a negative

The move from the Predict step.

### A number minus itself

## Practise: mixed sums

```step
stage: practise
insight: "Adding and subtracting with negatives in mixed forms and a context; the review question keeps ordering from the last lesson fresh."
tasks:
  - check:
      type: answer
      q: "Work out $-7 + 3$."
      answer: "-4"
      feedback:
        - ["-10", "Adding 3 moves right, towards zero."]
        - ["4", "From −7, right 3 is still below zero."]
      explain: "From −7, right 3 lands on −4."
  - check:
      type: answer
      q: "Work out $3 - 8$."
      answer: "-5"
      feedback:
        - ["5", "That is 8 − 3. Start at 3 and move left 8."]
      explain: "From 3, left 8 lands on −5."
  - check:
      type: answer
      q: "Work out $-2 - (-6)$."
      answer: "4"
      feedback:
        - ["-8", "That moved left. Subtracting a negative moves right."]
        - ["-4", "From −2, right 6 goes past zero."]
      explain: "Subtracting −6 moves right 6: from −2 to 4."
  - check:
      type: answer
      q: "At 6 am it is $-4$ °C. By noon it is 9 degrees warmer. What is the temperature at noon?"
      answer: "5"
      feedback:
        - ["-13", "Warmer is up the line, to the right."]
        - ["13", "Start at −4, not at 4."]
      explain: "−4 + 9 = 5 °C."
  - check:
      type: question
      q: "Review: which is greater, $-3$ or $-8$?"
      options: ["$-3$", "$-8$"]
      answer: 0
      feedback: [null, "Further left is less. Which is further left?"]
      explain: "−3 > −8: −3 is to the right of −8."
```

### Adding

### Subtracting

### A negative subtracted

### Temperature

### Review

## Make: a subtraction that grows

```step
stage: make
insight: "Choosing numbers to make a given answer reverses the lesson: from the result back to the move, and it needs subtracting a negative."
try: { playground: board, starter: "sum.yml#make", height: 420 }
hint: ["Press − to subtract.", "To land above where you start, subtracting has to move right. What kind of number does that?"]
check: { type: board, text: "Make a subtraction that gives 10, where the number you subtract is negative.", when: "o = -1 and b < 0 and r = 10", explain: "Subtracting a negative moves right, so a − b = 10 with b negative, such as 4 − (−6) = 10 or 2 − (−8) = 10." }
```

Use the + and − buttons and both sliders. The answer must be 10, and you must subtract a negative number.

Stretch: find two different subtractions that give $-3$, one subtracting a positive and one subtracting a negative.
