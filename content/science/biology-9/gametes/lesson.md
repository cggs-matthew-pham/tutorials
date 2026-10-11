---
order: 5
node: AC9S9U02 n1
unit: reproduction
title: What makes a sex cell special?
summary: "Gametes (sperm and egg, or the nuclei in pollen and ovules) carry half the usual number of chromosomes, so fertilisation restores the full set. Each is specialised: sperm to swim and get in, the egg to feed the embryo and let only one sperm in."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8217
  url: http://127.0.0.1:8217/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "A sperm (head, midpiece, tail) and an egg (much larger, with a food store): each carries 23 chromosomes." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Sperm and egg"
  say: "Gametes carry half the chromosomes, so fertilisation restores the full number."
  clip:
    - caption: { text: "A sperm and an egg: each carries half the chromosomes.", say: "A sperm and an egg: each carries half the chromosomes." }
    - wait: 2950
    - click: { selector: "#board [fill=\"#e39b4c\"]" }
    - expect: { selector: "body", contains: "Midpiece" }
    - caption: { text: "The midpiece is packed with mitochondria to power the tail.", say: "The midpiece is packed with mitochondria to power the tail." }
    - caption: { text: "23 chromosomes from each gamete make 46 in the fertilised egg.", say: "Twenty three from each gamete make forty six in the fertilised egg." }
    - wait: 600
hook: "A human egg is just big enough to see without a microscope. A sperm is one of the smallest cells in the body. Together they make one cell that grows into a person."
---
In Year 8 you met specialised cells. This lesson: the cells made for reproduction.

## Engage: how many chromosomes?

```step
stage: predict
insight: "Students who think gametes have the full set won't see why fertilisation doesn't double the number; the answer sets up the 'half' idea."
check:
  type: predict
  q: "Your body cells have 46 chromosomes. How many does a human sperm or egg cell have?"
  options: ["46, like every other cell", "23: half", "92: double", "None: gametes have no nucleus"]
  actual: "23: half. When a sperm (23) fertilises an egg (23), the new cell has 46 again. If gametes had 46, the number would double every generation."
```

## Explore: a sperm and an egg

```step
stage: run
insight: "Clicking each feature and reading what it does links structure to the gamete's job."
try: { playground: board, starter: "boards.yml#gametes", height: 520 }
check: { type: board, text: "Find the nucleus and the special features of the sperm and the egg.", when: "n = k" }
```

Click each part to see what it is and what it does.

## Explain: built for the job

```step
stage: investigate
insight: "Matching each feature to the job it makes possible is the hinge; the chromosome number question checks 'half'."
tasks:
  - check:
      type: match
      q: "Match each feature to its job."
      pairs:
        - ["Sperm's tail", "Swims towards the egg"]
        - ["Midpiece full of mitochondria", "Releases energy for swimming"]
        - ["Acrosome", "Enzymes digest a way into the egg"]
        - ["Egg's food store", "Feeds the embryo in its first days"]
        - ["Jelly coat", "Changes after one sperm enters, so no others can"]
  - check:
      type: question
      q: "Why must a gamete have half the number of chromosomes?"
      options: ["So that when two gametes join, the new cell has the full number again", "Because gametes are small", "So the offspring has half as many genes", "To save energy"]
      answer: 0
      feedback: [null, "An egg is huge but still has 23.", "The offspring has the full number: half from each parent.", "It's about keeping the number the same each generation."]
  - check:
      type: question
      q: "Why are millions of sperm released, but only one egg?"
      options: ["Most sperm never reach the egg; the egg is large and costly to make because it holds food", "Only one sperm can swim", "Eggs are smaller", "Sperm have no nucleus"]
      answer: 0
      feedback: [null, "Many swim; few arrive.", "The egg is far larger.", "Each sperm carries a nucleus with 23 chromosomes."]
  - check: { type: reflect, text: "I can explain why gametes have half the chromosomes and how a sperm and an egg are specialised." }
```

### Features

### Half

### Numbers

### In your own words

In your book: draw a sperm and an egg, label three features, and write what each one is for.

## Elaborate: plants make gametes too

```step
stage: modify
tier: typical
insight: "Seeing pollen's tough wall (no tail) shows plant gametes solve the same problem, getting the male nucleus to the egg, another way."
try: { playground: board, starter: "boards.yml#pollen", height: 520 }
tasks:
  - check: { type: board, text: "Find the nucleus in the pollen grain and the egg, and the pollen's wall.", when: "n = k" }
  - check:
      type: question
      q: "A pollen grain can't swim. How does its male nucleus reach the egg?"
      options: ["Wind or animals carry the pollen to a flower; a pollen tube then grows down to the ovule", "It swims through the air", "The egg moves to the pollen", "It doesn't: plants don't use gametes"]
      answer: 0
      feedback: [null, "No tail: it is carried.", "The egg stays inside the ovule.", "Flowering plants reproduce sexually with gametes."]
```

### Pollen

### Getting there

## Elaborate: counting chromosomes

```step
stage: modify
tier: wider
insight: "Applying 'half' to an unfamiliar organism checks the rule, not the number 46."
check:
  type: number
  q: "A dog's body cells have 78 chromosomes. How many are in a dog's sperm cell?"
  answer: 39
  explain: "Half of 78. The egg also has 39, so the puppy's cells have 78."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about chromosomes in gametes with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Gametes** are sex cells: sperm and egg in animals; the male nucleus in pollen and the egg in the ovule in flowering plants.
- Gametes have **half** the chromosomes (23 in humans), so **fertilisation** restores the full number (46).
- **Sperm:** tail, midpiece of mitochondria, acrosome. **Egg:** large, food store, a coat that lets in only one sperm.
