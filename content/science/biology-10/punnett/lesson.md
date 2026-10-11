---
order: 3
node: AC9S10U01 n4
unit: genetics
title: Can you predict the offspring?
summary: "A Punnett square shows every way two parents' gametes can combine for one gene. It gives the probability of each genotype and phenotype (such as 3 in 4 showing the dominant trait for Pp × Pp), not a guaranteed count."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8224
  url: http://127.0.0.1:8224/index.html
  readySelector: "#gpanel"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "A Punnett square"
  say: "A Punnett square shows every combination of the parents' gametes."
  clip:
    - caption: { text: "Each Bb parent makes two kinds of gamete: B or b.", say: "Each Bb parent makes two kinds of gamete: B or b." }
    - wait: 3280
    - click: { selector: "[aria-label=\"Parent 1 gamete 1\"]" }
    - click: { selector: "[aria-label=\"Parent 1 gamete 2\"]" }
    - click: { selector: "[aria-label=\"Parent 1 gamete 2\"]" }
    - click: { selector: "[aria-label=\"Parent 2 gamete 1\"]" }
    - click: { selector: "[aria-label=\"Parent 2 gamete 2\"]" }
    - click: { selector: "[aria-label=\"Parent 2 gamete 2\"]" }
    - caption: { text: "Every combination of gametes fills the grid.", say: "Every combination of gametes fills the grid." }
    - wait: 1960
    - click: { selector: "[aria-label=\"Offspring 1, 1\"]" }
    - click: { selector: "[aria-label=\"Offspring 1, 2\"]" }
    - click: { selector: "[aria-label=\"Offspring 1, 2\"]" }
    - click: { selector: "[aria-label=\"Offspring 2, 1\"]" }
    - click: { selector: "[aria-label=\"Offspring 2, 1\"]" }
    - click: { selector: "[aria-label=\"Offspring 2, 2\"]" }
    - click: { selector: "[aria-label=\"Offspring 2, 2\"]" }
    - click: { selector: "[aria-label=\"Offspring 2, 2\"]" }
    - caption: { text: "1 BB : 2 Bb : 1 bb. Each child has a 3 in 4 chance of brown eyes.", say: "One BB, two Bb, one bb: a three in four chance of brown eyes." }
hook: "Two purple-flowered pea plants can have white-flowered offspring. Gregor Mendel counted thousands of them in the 1860s and found the same ratio every time."
---
Gametes get one of each pair at random. This lesson: following one gene from parents to offspring.

## Engage: where does white come from?

```step
stage: predict
insight: "Students who think offspring must look like a parent can't explain white from purple × purple; the square shows the hidden recessive allele."
check:
  type: predict
  q: "Two purple-flowered pea plants, both Pp, are crossed. Purple (P) is dominant, white (p) recessive. What do you predict?"
  options: ["All offspring purple", "Mostly purple, about 1 in 4 white", "Half purple, half white", "All pale purple (a blend)"]
  actual: "Mostly purple, about 1 in 4 white. Each parent passes on p half the time; a pp offspring (1 chance in 4) is white."
```

## Explore: fill the square

```step
stage: run
insight: "Filling the gametes and grid by hand, then breeding 100 offspring, links the square to real counts that vary around 75%."
try: { playground: board, starter: "boards.yml#peas", height: 600 }
check: { type: board, text: "Fill in the gametes and the grid correctly, then breed some offspring.", when: "f = 1 and n >= 100" }
```

Click each gamete box to choose the allele it carries, then each grid cell for the offspring's genotype. When it's right, press **Breed 100 offspring** a few times and compare the percentage with the square.

## Explain: genotype, phenotype, probability

```step
stage: investigate
insight: "Using the vocabulary and reading the square as a probability is the hinge."
tasks:
  - check:
      type: match
      q: "Match each word to its meaning."
      pairs:
        - ["Genotype", "The pair of alleles, such as Pp"]
        - ["Phenotype", "The characteristic you see, such as purple flowers"]
        - ["Homozygous", "Two identical alleles (PP or pp)"]
        - ["Heterozygous", "Two different alleles (Pp)"]
        - ["Recessive", "Shows only when there is no dominant allele"]
  - check:
      type: question
      q: "From Pp × Pp, a gardener grows 4 seeds. Are exactly 3 purple and 1 white?"
      options: ["Not necessarily: each seed has a 3 in 4 chance of purple, so small numbers vary; large numbers get close to 75%", "Yes, always exactly 3 and 1", "No, it's always half and half", "No: the square only works for animals"]
      answer: 0
      feedback: [null, "Each seed is a separate chance: your breeds of 100 varied too.", "The square gives 3 : 1.", "Mendel used peas."]
  - check:
      type: question
      q: "Why can two purple parents have a white offspring?"
      options: ["Both carry a hidden recessive p allele, and the offspring got p from each", "White came from a mutation every time", "The environment made it white", "One parent was really white"]
      answer: 0
      feedback: [null, "No mutation is needed: both parents carry p.", "The square explains it with the alleles alone.", "Both parents were Pp: purple."]
  - check:
      type: question
      q: "In a family tree (pedigree), shaded shapes show people with a recessive condition. Two unshaded parents have a shaded child. What are the parents' genotypes?"
      options: ["Both Ff: each carries one hidden f allele", "One is FF and the other ff", "Both FF", "Both ff"]
      answer: 0
      feedback: [null, "An ff parent would have the condition, so would be shaded.", "FF × FF can only give FF children: none could be ff.", "ff parents would both be shaded."]
  - check: { type: reflect, text: "I can draw a Punnett square for one gene and give the probability of each phenotype." }
```

### Words

### Probability

### Hidden alleles

### Family tree

### In your own words

In your book: draw the Pp × Pp square and write the genotype ratio and the phenotype ratio.

## Practise: a different cross

```step
stage: practise
insight: "A second cross with a homozygous recessive parent gives a 1 : 1 ratio, so students can't just memorise 3 : 1."
try: { playground: board, starter: "boards.yml#test", height: 600 }
tasks:
  - check: { type: board, text: "Fill in the square for a heterozygous black guinea pig crossed with a white one.", when: "f = 1" }
  - check:
      type: question
      q: "What fraction of the offspring do you expect to be white?"
      options: ["1 in 2", "1 in 4", "None", "All"]
      answer: 0
      feedback: [null, "That's for Bb × Bb.", "The white parent always gives b, so half are bb.", "The black parent gives B half the time."]
```

### Bb × bb

### White offspring

## Elaborate: is it hiding a b?

```step
stage: modify
tier: typical
insight: "Choosing the cross that reveals a hidden allele (a test cross) uses the square in reverse."
try: { playground: board, starter: "boards.yml#choose", height: 620 }
check:
  type: question
  q: "A black guinea pig could be BB or Bb. You cross it with a white (bb) one and get several white babies. What was its genotype?"
  options: ["Bb: a white baby needs a b from each parent", "BB", "bb", "You can't tell"]
  answer: 0
  feedback: [null, "BB × bb gives only Bb: all black.", "A bb guinea pig would be white.", "One white baby is enough."]
```

Use the board to try BB × bb and Bb × bb before you answer.

## Elaborate: a family tree

```step
stage: modify
tier: wider
insight: "Reasoning about carriers in a human context applies the square to a real recessive condition."
check:
  type: question
  q: "Cystic fibrosis is caused by a recessive allele (f). Two parents without it have a child who has it. What is the chance their next child has it?"
  options: ["1 in 4: both parents must be Ff carriers", "1 in 2", "0: it can't happen twice", "1 in 1"]
  answer: 0
  feedback: [null, "Ff × Ff gives ff 1 time in 4.", "Each child is a new 1 in 4 chance; earlier children don't change it.", "Only ff children have it."]
  explain: "Each pregnancy is independent: the chance stays 1 in 4 every time."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first prediction about the pea cross with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Genotype:** the alleles (PP, Pp, pp). **Phenotype:** the characteristic seen.
- A **dominant** allele shows when present; a **recessive** one only in **homozygous** form (pp).
- A **Punnett square** gives the **probability** of each offspring: Pp × Pp gives 1 PP : 2 Pp : 1 pp, so 3 : 1 purple to white; Bb × bb gives 1 : 1.
- Real numbers vary around the prediction, especially when there are few offspring.
