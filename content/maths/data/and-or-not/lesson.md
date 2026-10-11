---
order: 13
unit: chance
node: AC9M8P02 n2
uses: [AC9M8P02 n1, AC9M8P01 n2]
title: And, or and not
summary: "'A and B' means both happen; 'A or B' means at least one happens (both included); 'not A' is everything else. Read them from a Venn diagram, a two-way table or a grid, counting each outcome once."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A raffle prize goes to someone who plays sport or music. In a class of 30, 20 play sport and 13 play music. How many are in the draw?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8331
  url: http://127.0.0.1:8331/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "Dog or cat: everything inside the circles, 9 + 4 + 6 = 19. The 4 with both are counted once." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "And, or"
  say: "And is the overlap. Or is everything inside the circles."
  clip:
    - caption: { text: "Dog and cat: only the overlap, 4.", say: "Dog and cat is the overlap: four." }
    - click: Dog and Cat
    - wait: 1000
    - caption: { text: "Dog or cat: add the rest of both circles. 19 of 30.", say: "Dog or cat is everything inside the circles: nineteen." }
    - click: Dog only
    - click: Cat only
    - expect: { selector: "#gsum", contains: "19 of 30" }
    - wait: 1500
---
Probability questions often join events with **and**, **or** and **not**. On a Venn diagram, each one is a set of regions.

## Predict: sport or music

```step
stage: predict
insight: "Committing to P(sport or music) shows whether they add the totals and count the overlap twice."
check:
  type: predict
  q: "30 students: 20 play sport, 13 play music, 8 play both. What is P(a student plays sport or music)?"
  options: ["8/30", "25/30", "33/30"]
  actual: "25/30. 12 sport only, 8 both and 5 music only: each counted once. 33/30 counts the 8 twice (and a probability can't be more than 1)."
```

## Run: choose the regions

```step
stage: run
insight: "Choosing 'or' on the diagram shows it is three regions, with the overlap counted once."
try: { playground: board, starter: "board.yml#run", height: 560 }
check: { type: board, text: "Choose the students who play sport or music. How many are there? Compare with your prediction.", when: "x = 1 and y = 1 and z = 1 and w = 0", explain: "Sport only, both and music only: 12 + 8 + 5 = 25, so P = 25/30 = 5/6." }
```

| Words | Regions | In the Sport and Music class |
|---|---|---|
| A **and** B | the overlap only | 8 |
| A **or** B | anything inside the circles (one, the other, or both) | 12 + 8 + 5 = 25 |
| **not** A | everything outside A | 5 + 5 = 10 |
| **neither** | outside both circles | 5 |

In maths, **or** includes both. In everyday talk "or" sometimes means one but not both ("tea or coffee?"); in maths that is **exactly one**. To find P(A or B) from totals, add them and take away the overlap once: 20 + 13 − 8 = 25.

## Investigate: counting once

```step
stage: investigate
insight: "'And' is one cell; 'or' adds the totals then takes the overlap once; adding the totals alone counts both twice (Zoe)."
tasks:
  - check:
      type: answer
      q: "30 students: 13 have a dog, 10 have a cat and 4 have both. What is P(a dog and a cat)?"
      answer: "4/30"
      feedback:
        - ["23/30", "That adds dogs and cats. And means both: the overlap."]
      explain: "Both is the overlap: 4 of 30 = 2/15."
  - check:
      type: bug
      code: "working.txt#zoe"
      text: "Zoe works out P(dog or cat) for the same class. Click the line where she goes wrong."
      answer: 3
      fault: logic
      misconception: or-double-count
      explain: "Line 3: the 4 with both are in the 13 and in the 10, so they are counted twice. 13 + 10 − 4 = 19, so P = 19/30."
  - check:
      type: question
      q: "A dice is rolled. A is 'an even number' and B is 'more than 4'. Which outcomes are in A or B?"
      options: ["2, 4, 6, 5, 6", "5", "2, 4, 5, 6", "6"]
      answer: 2
      feedback: ["6 is one outcome: list it once.", "That is B but not A.", null, "That is A and B."]
      explain: "Even: 2, 4, 6. More than 4: 5, 6. Either or both: 2, 4, 5, 6, so P(A or B) = 4/6."
```

### And

Here is the routine for "or" from totals.

```worked
P(\text{juice}) = \tfrac{35}{60},\ P(\text{milk}) = \tfrac{28}{60},\ P(\text{both}) = \tfrac{15}{60} :: 60 people.
35 + 28 - 15 = 48 :: Add the totals, then take the overlap away once.
P(\text{juice or milk}) = \tfrac{48}{60} :: Everyone inside the circles.
P(\text{neither}) = 1 - \tfrac{48}{60} = \tfrac{12}{60} :: Neither is the complement of "or".
```

### Find the mistake

Read Zoe's working. Where are the 4 students with both?

### Or on a dice

## Modify: not, or and neither

```step
stage: modify
insight: "'Not' and 'or' on the diagram and on a two-dice grid, and 'neither' as the complement of 'or'."
try: { playground: board, starter: "board.yml#notmusic", height: 560 }
tasks:
  - starter: "board.yml#notmusic"
    hint: "Not music is everything outside the Music circle."
    check: { type: board, text: "Choose the students who do not play music.", when: "x = 1 and w = 1 and y = 0 and z = 0", explain: "Sport only and neither: 12 + 5 = 17, so P(not music) = 17/30 = 1 − 13/30." }
  - starter: "board.yml#dice"
    hint: ["A sum over 9 is 10, 11 or 12.", "Doubles run down the diagonal. If you chose the sums over 9 first, two doubles are already chosen."]
    check: { type: board, text: "Two dice: choose every outcome with a sum over 9 or a double.", when: "r = 1", explain: "6 sums over 9 and 6 doubles, but (5, 5) and (6, 6) are both: 6 + 6 − 2 = 10 outcomes, 10/36." }
  - check:
      type: answer
      q: "30 students: 13 have a dog, 10 have a cat and 4 have both. What is P(neither)?"
      answer: "11/30"
      feedback:
        - ["7/30", "Take the overlap away once: 13 + 10 − 4 = 19 have a dog or a cat."]
      explain: "Neither is the complement of 'dog or cat': 1 − 19/30 = 11/30."
  - check:
      type: question
      q: "Which means the same as 'at least one of A and B'?"
      options: ["A and B", "Not A", "Neither", "A or B"]
      answer: 3
      feedback: ["That needs both.", "That ignores B.", "That is none of them.", null]
      explain: "At least one of them: A, B or both. That is the maths 'or'."
```

### Not music

### Over 9 or a double

### Neither

### At least one

## Practise: and, or, not

```step
stage: practise
insight: "Reading and, or, not and exactly one from tables and totals, mixed; counting the overlap twice is the planted slip; exactly one separates the maths or from the everyday one."
tasks:
  - check:
      type: answer
      q: "A two-way table of 50 people: 12 wear glasses and are left-handed, 18 wear glasses and are right-handed, 5 are left-handed without glasses, 15 neither. What is P(glasses or left-handed)?"
      answer: "35/50"
      feedback:
        - ["47/50", "The 12 with both are in the glasses count and the left-handed count."]
      explain: "12 + 18 + 5 = 35, so 35/50 = 7/10."
  - check:
      type: answer
      q: "For the same 50 people, what is P(left-handed and no glasses)?"
      answer: "5/50"
      explain: "One cell: 5 of 50 = 1/10."
  - check:
      type: number
      q: "P(A) = 0.5, P(B) = 0.4 and P(A and B) = 0.2. What is P(A or B)?"
      answer: 0.7
      tolerance: 0.001
      feedback:
        - ["0.9", "Take the overlap away once: 0.5 + 0.4 − 0.2."]
      explain: "0.5 + 0.4 − 0.2 = 0.7."
  - check:
      type: answer
      q: "In the Sport and Music class (12 sport only, 8 both, 5 music only, 5 neither), what is P(exactly one of sport and music)?"
      answer: "17/30"
      feedback:
        - ["25/30", "That is sport or music, which includes the 8 who do both. Exactly one leaves them out."]
      explain: "Sport only and music only: 12 + 5 = 17, so 17/30. This is the everyday 'one or the other, not both'."
```

### Glasses or left-handed

### Left-handed, no glasses

### Using the rule

### Exactly one

## Make: an 'or' event

```step
stage: make
insight: "Building an 'or' event to a given size makes them handle the overlap on purpose."
try: { playground: board, starter: "board.yml#make", height: 640 }
hint: ["Pick two events that overlap, such as 'the second dice is 1' and 'the sum is 5 or less'.", "Count each, then take away the outcomes in both."]
check: { type: board, text: "Two dice: make an event of the form 'A or B', where A and B overlap, with exactly 15 outcomes.", when: "n = 15", explain: "One way: the sum is 9 or more (10 outcomes) or the first dice is 3 (6 outcomes). (3, 6) is in both, so 10 + 6 − 1 = 15." }
```

Write your events A and B in words, and how many outcomes are in A, in B and in both.
