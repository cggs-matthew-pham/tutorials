---
order: 2
node: AC9S10U01 n3
assumes: [AC9S10U01 n2]   # mitosis: taught in class (no tutorial yet)
unit: genetics
title: Why is every sperm and egg different?
summary: "Meiosis makes gametes. The chromosome pairs separate and each gamete gets one chromosome from each pair, chosen at random, so it has half the number and a different combination. With 23 pairs there are over 8 million combinations."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8223
  url: http://127.0.0.1:8223/index.html
  readySelector: "#gpanel"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Meiosis"
  say: "Meiosis gives each gamete one chromosome from each pair, chosen at random."
  clip:
    - caption: { text: "Three pairs: one of each pair came from each parent.", say: "Three pairs of chromosomes: one of each pair came from each parent." }
    - wait: 3610
    - click: "Make a gamete"
    - caption: { text: "A gamete gets one from each pair, chosen at random.", say: "A gamete gets one from each pair, chosen at random." }
    - wait: 2950
    - click: "Make a gamete"
    - click: "Make a gamete"
    - caption: { text: "Each gamete is a different mix: over 8 million in humans.", say: "Each gamete is a different mix: over eight million possible in humans." }
    - wait: 600
hook: "You and your brother or sister came from the same two parents. The chance that two of their sperm or eggs carry exactly the same chromosomes is tiny."
---
Chromosomes come in pairs, one from each parent. This lesson: how gametes get half, and why each is different.

## Engage: copies or combinations?

```step
stage: predict
insight: "Students who think gametes are identical copies of the parent's cells won't expect variety; the board makes many different gametes from one cell."
check:
  type: predict
  q: "One person makes millions of sperm (or thousands of eggs). What do you predict about their chromosomes?"
  options: ["They are all identical", "Each has half the chromosomes, but the combination of which ones differs from gamete to gamete", "Each has the full 46", "Each has a random number of chromosomes"]
  actual: "Each has 23, one from each pair, but which one of each pair is random, so almost every gamete is a different combination."
```

## Explore: make gametes

```step
stage: run
insight: "Making gametes from a cell with three pairs and counting the different combinations shows where the variety comes from."
try: { playground: board, starter: "boards.yml#meiosis", height: 560 }
check: { type: board, text: "Make gametes until you have found at least six different combinations.", when: "u >= 6" }
```

Red chromosomes came from this person's mother, blue from their father. Press **Make a gamete** many times. How many chromosomes does each gamete get? How many different combinations can you find?

## Explain: meiosis

```step
stage: investigate
insight: "Counting combinations (2 × 2 × 2) and scaling to 23 pairs turns the board's variety into a rule."
tasks:
  - check:
      type: question
      q: "On the board, every gamete had three chromosomes. Which is true?"
      options: ["Each gamete gets exactly one chromosome from each pair", "Each gamete gets any three chromosomes", "Each gamete gets all the red ones or all the blue ones", "Each gamete gets the whole pair from one chromosome"]
      answer: 0
      feedback: [null, "Never two from the same pair.", "Mixtures of red and blue happen.", "Pairs separate."]
  - check:
      type: number
      q: "With 3 pairs, each with 2 choices, how many different gametes are possible?"
      answer: 8
      explain: "2 × 2 × 2 = 8."
  - check:
      type: question
      q: "Humans have 23 pairs. About how many different combinations are possible?"
      options: ["2 to the power 23: over 8 million", "23: one new combination for each pair", "2 × 23 = 46: two choices for each of 23 pairs", "23 × 23 = 529"]
      answer: 0
      feedback: [null, "Each pair doesn't add one combination: it doubles the number there already.", "That adds the choices. Choices for different pairs multiply: 2 × 2 × 2 … 23 times.", "Each pair has 2 choices, so multiply 2 by itself 23 times, not 23 by itself."]
  - check: { type: reflect, text: "I can explain how meiosis halves the chromosome number and makes every gamete a different combination." }
```

### One of each pair

### Three pairs

### 23 pairs

### In your own words

In your book: draw a cell with two pairs of chromosomes and all four gametes it could make.

## Elaborate: meiosis and mitosis

```step
stage: modify
insight: "Contrasting meiosis with ordinary cell division stops students mixing them up."
check:
  type: sort
  q: "Meiosis (making gametes) or mitosis (growth and repair)?"
  options: ["Meiosis", "Mitosis"]
  items:
    - ["Makes sperm and egg cells", "Meiosis"]
    - ["New cells have 46 chromosomes", "Mitosis"]
    - ["New cells have 23 chromosomes", "Meiosis"]
    - ["New cells are genetically identical to the parent cell", "Mitosis"]
    - ["New cells are all genetically different", "Meiosis"]
    - ["Healing a cut", "Mitosis"]
```

## Elaborate: even more variety

```step
stage: modify
tier: wider
insight: "Adding random fertilisation (and crossing over) shows why siblings are almost never identical."
check:
  type: question
  q: "Each parent can make over 8 million different gametes. Ignoring crossing over, roughly how many different children could two parents have?"
  options: ["About 8 million × 8 million: around 70 trillion", "About 16 million", "About 8 million", "46"]
  answer: 0
  feedback: [null, "Any sperm can meet any egg: multiply.", "It's one from each, so multiply.", "Both parents' gametes vary."]
  explain: "Crossing over (pairs swapping pieces during meiosis) adds far more variety still."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first prediction about gametes with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Meiosis** makes gametes: chromosome pairs separate; each gamete gets **one from each pair**, so it has **half** the number.
- Which of each pair goes into a gamete is **random**: 2 × 2 × 2 … for 23 pairs, over **8 million** combinations.
- Random fertilisation (and crossing over) multiply the variety.
