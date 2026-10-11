---
order: 20
unit: ratio
node: AC9M7N08 n1
uses: [AC9M7N04 n1]   # equivalent fractions: parts of a whole (Equivalent fractions)
title: What is a ratio?
summary: "2 red counters and 3 blue: the ratio of red to blue is 2 : 3 (part to part); red to all the counters is 2 : 5 (part to whole). Order matters."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A fruit punch is 2 cups of juice for every 3 cups of lemonade. Swap them and it tastes completely different. How do we write a recipe like that down?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8290
  url: http://127.0.0.1:8290/index.html
  readySelector: "#sl-a"
  layout: full
explainPicture: { ref: rt.yml#explain-pic, caption: "2 red blocks and 3 blue blocks: red to blue is 2 : 3, red to all the blocks is 2 : 5." }
explainClip:
  query: { code: "@rt.yml#explain", fresh: 1, id: explain }
  caption: "Part to part and part to whole"
  say: "A ratio compares quantities."
  clip:
    - caption: { text: "2 red and 3 blue: red to blue is 2 : 3.", say: "Two red to three blue is two to three." }
    - wait: 1400
    - caption: { text: "Red to all the blocks is 2 : 5.", say: "Red to the whole is two to five." }
    - wait: 1400
    - click: Make the second number bigger
    - expect: { selector: "#gsum", contains: "2 : 4" }
    - caption: { text: "Add a blue: now 2 : 4 and 2 : 6.", say: "Add a blue block and both ratios change." }
    - wait: 1400
---
A **ratio** compares two (or more) quantities of the same kind. "2 red to 3 blue" is written $2 : 3$. The order matters: red first means 2 comes first.

There are two kinds of comparison:

- **Part to part:** red to blue is $2 : 3$.
- **Part to whole:** red to *all* the counters is $2 : 5$, because there are $2 + 3 = 5$ counters in all. This is the same as the fraction $\tfrac{2}{5}$.

## Predict: red to blue

```step
stage: predict
insight: "Committing to a ratio shows whether they write the order asked for (2 : 3), reverse it (3 : 2) or compare to the whole (2 : 5)."
check:
  type: predict
  q: "A bag has 2 red counters and 3 blue counters. What is the ratio of red to blue?"
  options: ["2 : 3", "3 : 2", "2 : 5", "5 : 2"]
  actual: "2 : 3. Red comes first, so 2 comes first. 3 : 2 is blue to red; 2 : 5 is red to all the counters."
```

How many counters are in the bag altogether?

## Run: build the bag

```step
stage: run
insight: "Building 3 red for every 5 blue shows the ratio as rows of equal blocks, and the whole as the blocks added together."
try: { playground: board, starter: "rt.yml#run", height: 420 }
check: { type: board, text: "Make 3 red blocks for every 5 blue. What is the ratio of red to the whole?", when: "a = 3 and b = 5", explain: "Red to blue is 3 : 5. In all there are 3 + 5 = 8 blocks, so red to the whole is 3 : 8." }
```

The board always shows both: part to part, and part to whole.

## Investigate: part to part, part to whole

```step
stage: investigate
insight: "Part to whole adds the parts, so the second number is the total; Pip writes part to part when asked for part to whole. The order matters."
tasks:
  - check:
      type: answer
      q: "A bag has 2 red and 3 blue counters. The ratio of red to all the counters is $2 : ?$"
      answer: "5"
      feedback:
        - ["3", "That is red to blue. 'All the counters' means red and blue together."]
      explain: "2 + 3 = 5 counters in all, so red to all is 2 : 5."
  - check:
      type: bug
      code: "working.txt#pip"
      text: "Pip finds the ratio of apples to all the fruit. Click the line where the working goes wrong."
      answer: 3
      fault: logic
      misconception: ratio-part-whole
      explain: "Line 3: 4 : 3 is apples to pears. Apples to all the fruit is 4 : 7, the 7 from line 2."
  - check:
      type: question
      q: "A drink has 2 cups of blue cordial and 5 cups of water. What is the ratio of water to cordial?"
      options: ["5 : 2", "2 : 5", "5 : 7", "7 : 2"]
      answer: 0
      feedback: [null, "That is cordial to water. Water is named first.", "That is water to the whole drink.", "That is the whole drink to cordial."]
      explain: "Water first: 5, then cordial: 2. The ratio of water to cordial is 5 : 2."
```

### Whole bag

Add the parts to find the whole.

### Find the mistake

### Which way round?

## Modify: change the bag

```step
stage: modify
insight: "Changing one number at a time, then turning part to whole into a fraction, links ratio to the fractions students know."
try: { playground: board, starter: "rt.yml#modify", height: 420 }
tasks:
  - check: { type: board, text: "Show 4 dogs for every 3 cats. What is the ratio of dogs to the whole?", when: "a = 4 and b = 3", explain: "Dogs to cats is 4 : 3, and 4 + 3 = 7, so dogs to all the animals is 4 : 7." }
  - check:
      type: answer
      q: "At a school the ratio of walkers to bus riders is $3 : 2$. How many parts are there altogether?"
      answer: "5"
      feedback:
        - ["6", "That multiplies 3 × 2. The whole is parts added together: 3 + 2."]
        - ["1", "Each side is a part. The whole is the parts together."]
      explain: "3 + 2 = 5 parts."
  - check:
      type: answer
      q: "A shelter has 3 dogs and 5 cats. What fraction of the animals are dogs?"
      answer: "3/8"
      form: simplest
      feedback:
        - ["3/5", "That compares dogs to cats. The whole is 3 + 5 = 8 animals."]
      explain: "Dogs to all the animals is 3 : 8, so $\\tfrac{3}{8}$ of the animals are dogs."
  - check:
      type: question
      q: "A drink is made with juice and water in the ratio $1 : 4$. Is it strong or weak?"
      options: ["Weak: only 1 part juice in every 5 parts", "Strong: 1 part is the first number", "Strong: there are 4 parts", "You cannot tell"]
      answer: 0
      feedback: [null, "The first number is just the amount of juice: 1 part.", "4 parts is water, not juice.", "1 part juice to 4 parts water is 1 in 5: weak."]
      explain: "1 part juice to 4 parts water: 1 of every 5 parts is juice, so $\\tfrac{1}{5}$ juice."
```

### Dogs and cats

### Add the parts

### As a fraction

### Strong or weak?

## Practise: ratios

```step
stage: practise
insight: "Writing a ratio in the order asked, part to whole, and a review of estimation."
tasks:
  - check:
      type: answer
      q: "A box has 5 pens and 8 pencils. The ratio of pencils to pens is $8 : ?$"
      answer: "5"
      feedback:
        - ["13", "That is the whole box. Pens is a part."]
      explain: "Pencils first: 8, then pens: 5. 8 : 5."
  - check:
      type: answer
      q: "In the same box, the ratio of pens to all the items is $5 : ?$"
      answer: "13"
      feedback:
        - ["8", "That is pens to pencils. Add the parts for the whole."]
      explain: "5 + 8 = 13 items, so pens to all the items is 5 : 13."
  - check:
      type: answer
      q: "A team won 7 games and lost 3. The ratio of wins to losses is $7 : ?$"
      answer: "3"
      feedback:
        - ["10", "That is wins to all the games played."]
      explain: "Wins first: 7. Losses: 3. 7 : 3."
  - check:
      type: answer
      q: "Review: estimate $6.8 \\times 31$."
      answer: "210"
      feedback:
        - ["21", "7 × 30 = 210: keep the size."]
      explain: "6.8 ≈ 7 and 31 ≈ 30, so 7 × 30 = 210."
```

### Pencils to pens

### Pens to all

### Wins to losses

### Review: estimating

## Make: a three-colour mix

```step
stage: make
insight: "A ratio can have three parts, and the whole is all of them added; making 10 parts shows many ratios give the same total."
try: { playground: board, starter: "rt.yml#make", height: 460 }
hint: ["3 + ? + ? = 10.", "Try 3 : 2 : 5 or 3 : 4 : 3."]
check: { type: board, text: "Make a three-colour ratio with 10 parts in all, and 3 parts of the first colour.", when: "t = 10 and a = 3", explain: "For example 3 : 2 : 5 or 3 : 3 : 4. The whole is the parts added: 3 + 2 + 5 = 10." }
```

Then write the ratio of the first colour to the whole.
