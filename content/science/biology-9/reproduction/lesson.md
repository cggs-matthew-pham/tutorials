---
order: 7
node: AC9S9U02 n3
assumes: [AC9S9U02 n2]   # reproductive organs: taught in class (no tutorial yet)
unit: reproduction
title: Why don't brothers and sisters look the same?
summary: "In sexual reproduction each offspring gets a random half of each parent's genes, so offspring vary. In asexual reproduction one parent makes genetically identical clones. Variation helps a population survive change; asexual reproduction is fast and needs no partner."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8220
  url: http://127.0.0.1:8220/index.html
  readySelector: "#gpanel"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Sexual and asexual reproduction"
  say: "Sexual reproduction gives varied offspring; asexual reproduction gives clones."
  clip:
    - caption: { text: "Two parents, each with two alleles for three genes.", say: "Two parents, each with two alleles for three genes." }
    - wait: 2620
    - click: "Sexual reproduction: one offspring"
    - click: "Sexual reproduction: one offspring"
    - click: "Sexual reproduction: one offspring"
    - caption: { text: "Each offspring gets a random half from each parent, so they vary.", say: "Each offspring gets a random half from each parent, so they vary." }
    - wait: 3610
    - click: "Asexual reproduction: a clone of parent 1"
    - caption: { text: "One parent: a clone, exactly the same.", say: "With one parent, the offspring is a clone, exactly the same." }
    - wait: 600
hook: "Two kittens from the same litter can be black and ginger. A strawberry plant's runners grow into plants identical to it. Same question, two answers."
---
Gametes carry half a parent's chromosomes. This lesson: what that means for the offspring.

## Engage: same parents, same look?

```step
stage: predict
insight: "Students who expect siblings to be identical, or an exact blend, will be surprised by the board's varied litter."
check:
  type: predict
  q: "Two parents have several offspring. What do you predict?"
  options: ["All the offspring look the same, because they have the same parents", "Each offspring is a different mix of the parents' features", "Each one is an exact half-way blend of the parents", "They all look like one parent"]
  actual: "Each offspring is a different mix. Each gets a random one of each parent's two copies of every gene, so brothers and sisters differ (unless they're identical twins)."
```

## Explore: make some offspring

```step
stage: run
insight: "Making several offspring of each kind side by side shows variation from sexual reproduction and none from asexual."
try: { playground: board, starter: "boards.yml#offspring", height: 600 }
check: { type: board, text: "Make at least six offspring by sexual reproduction and three by asexual reproduction.", when: "o >= 6 and a >= 3" }
```

Press **Sexual reproduction** several times, then **Asexual reproduction**. Compare the offspring with each other and with the parents.

## Explain: two ways to reproduce

```step
stage: investigate
insight: "Sorting features and linking variation to survival is the hinge comparison."
tasks:
  - check:
      type: sort
      q: "Sexual or asexual reproduction?"
      options: ["Sexual", "Asexual"]
      items:
        - ["Two parents", "Sexual"]
        - ["Offspring are clones of the parent", "Asexual"]
        - ["Gametes fuse at fertilisation", "Sexual"]
        - ["No partner needed", "Asexual"]
        - ["Offspring vary", "Sexual"]
        - ["A strawberry plant's runners", "Asexual"]
  - check:
      type: question
      q: "Why are the offspring from sexual reproduction different from each other?"
      options: ["Each gets a random one of each parent's two copies of every gene, so each gets a different combination", "Some offspring get more genes", "The environment changes their genes", "One parent's genes are stronger"]
      answer: 0
      feedback: [null, "Every offspring gets the same number: one copy from each parent.", "On the board, nothing in the environment changed.", "Which copy each gets is random, not a contest."]
  - check:
      type: question
      q: "A new disease kills plants with one particular set of genes. Which population is more likely to survive?"
      options: ["A population from sexual reproduction: some individuals are likely to have genes that resist it", "A population of clones: they are all strong", "Both the same"]
      answer: 0
      feedback: [null, "If the clone's genes are vulnerable, every clone is.", "Variation is what makes the difference."]
  - check:
      type: question
      q: "A cod releases millions of eggs into the sea and leaves them. A kangaroo raises one joey at a time in her pouch for months. Why do both strategies work?"
      options: ["A parent has limited energy: the cod spreads it over millions of eggs that mostly die, the kangaroo puts it into one joey likely to survive", "More offspring is always better, so the cod's way is best", "The kangaroo has one joey because there isn't enough food in Australia", "The cod's eggs are clones, so they don't need care"]
      answer: 0
      feedback: [null, "Almost every cod egg dies; the joey's care makes up for having just one.", "Food matters, but the trade-off is energy: what a parent spends on care it can't spend on more offspring.", "Cod reproduce sexually: each egg is fertilised and different."]
  - check: { type: reflect, text: "I can explain why sexual reproduction makes varied offspring and asexual reproduction makes clones, with an advantage of each." }
```

### Which kind

### Why they vary

### Survival

### Many or few

### In your own words

In your book: draw a table comparing sexual and asexual reproduction (parents, gametes, offspring, one advantage, one disadvantage).

## Elaborate: which suits?

```step
stage: modify
tier: typical
insight: "Weighing speed against variation in contexts shows each strategy has a cost."
check:
  type: question
  q: "Aphids reproduce asexually all summer, then sexually in autumn before winter. Why might that be useful?"
  options: ["Fast cloning while conditions are good; variation before the harsh, changing winter", "They run out of partners in summer", "Cloning only works in warm weather", "It makes no difference"]
  answer: 0
  feedback: [null, "Aphids are everywhere in summer.", "The reason is speed now, variation for later.", "The switch is useful."]
```

## Elaborate: bananas

```step
stage: modify
tier: wider
insight: "A real case where a lack of variation threatens a crop applies the survival argument."
check:
  type: question
  q: "Nearly all supermarket bananas (Cavendish) are clones grown from cuttings. Panama disease is spreading through banana farms. Why are growers worried?"
  options: ["The clones all have the same genes, so if one is vulnerable, every plant is", "Clones grow too slowly", "Clones can't make bananas", "Disease only affects clones"]
  answer: 0
  feedback: [null, "Clones grow fine.", "They fruit normally.", "Varied bananas catch it too, but some resist it; a field of clones shares one weakness."]
  explain: "This happened before: the Gros Michel banana was wiped out of commercial farming in the 1950s by an earlier strain of Panama disease."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about siblings with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Sexual reproduction:** two parents, gametes fuse; each offspring gets a random half of each parent's genes, so offspring **vary**.
- **Asexual reproduction:** one parent, no gametes; offspring are **clones**.
- Variation helps a population survive a changing environment; asexual reproduction is fast and needs no partner.
