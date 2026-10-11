---
order: 1
node: AC9S7U01 n2
assumes: [AC9S7U01 n1]   # purpose of classification: taught in class (no tutorial yet)
unit: classification
title: Plant, animal or something else?
summary: Living things are sorted into kingdoms (animals, plants, fungi, protists and bacteria) using features you can observe, and you can justify each placement with those features.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8207
  url: http://127.0.0.1:8207/index.html
  readySelector: "#gpanel"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Sorting into kingdoms"
  say: "Living things are sorted into kingdoms by features you can observe."
  clip:
    - caption: { text: "Sort a kangaroo by its features, one question at a time.", say: "Let's sort a kangaroo by its features, one question at a time." }
    - click: "Yes"
    - caption: { text: "Does it make its own food using sunlight? No: it eats grass.", say: "Does it make its own food using sunlight? No. It eats grass." }
    - click: "No"
    - caption: { text: "Does it absorb food from dead material, like a fungus? No.", say: "Does it absorb its food from dead material, like a fungus? No." }
    - click: "No"
    - expect: { selector: "body", contains: "Kangaroo" }
    - caption: { text: "It eats other living things: an animal.", say: "It eats other living things, so it belongs in the animal kingdom." }
    - caption: { text: "Kingdoms sort by features. They aren't family trees: DNA shows who is related.", say: "Kingdoms sort by features; DNA shows which living things are really related." }
    - wait: 800
hook: "A mushroom pops up on the lawn overnight. It grows from the ground and doesn't walk away, so it must be a plant. Right?"
---
There are millions of kinds of living things. This lesson is about the biggest groups scientists sort them into, and the features that decide.

## Engage: the mushroom

```step
stage: predict
insight: "Students who sort by 'grows in the ground, doesn't move' will call a mushroom a plant; the key's feeding question separates fungi."
check:
  type: predict
  q: "Is a mushroom a plant?"
  options: ["Yes: it grows in the ground and doesn't move", "No: it can't make its own food from sunlight, so it belongs to a different group", "Yes: it's alive and isn't an animal"]
  actual: "No. A mushroom isn't green and can't make food from sunlight; it absorbs food from dead material. It belongs to the fungi."
```

## Explore: a key to the kingdoms

```step
stage: run
insight: "Placing specimens with feature questions shows that kingdoms are decided by observable features, not by first impressions."
try: { playground: board, starter: "boards.yml#kingdoms", height: 560 }
check: { type: board, text: "Use the key to place at least 5 specimens in their kingdom.", when: "n >= 5" }
```

Choose a specimen, read its description, and answer each question about it. The key tells you its kingdom.

## Explain: features decide

```step
stage: investigate
insight: "Sorting a wider set with the deciding feature, and naming an awkward case, builds the repertoire and the habit of justifying."
tasks:
  - check:
      type: sort
      q: "Which kingdom does each belong to?"
      options: ["Animals", "Plants", "Fungi", "Protists", "Bacteria"]
      items:
        - ["Kookaburra", "Animals"]
        - ["Wattle tree", "Plants"]
        - ["Yeast (used to make bread rise)", "Fungi", "Not green, absorbs sugar: a fungus, even though it is one cell."]
        - ["Paramecium (one cell with a nucleus, in pond water)", "Protists"]
        - ["Huntsman spider", "Animals"]
        - ["Kelp (a giant brown seaweed)", "Protists", "Algae like kelp make food from sunlight but are usually grouped with protists, not plants. A boundary case."]
        - ["Bacteria that cause tooth decay", "Bacteria"]
        - ["Grass", "Plants"]
        - ["Mould on an orange", "Fungi"]
        - ["Coral", "Animals", "It looks like a plant, but coral polyps are tiny animals that catch food."]
  - check:
      type: question
      q: "Which feature best separates plants from fungi?"
      options: ["Plants make their own food using sunlight; fungi absorb food from other material", "Plants grow in soil; fungi don't", "Fungi are smaller than plants"]
      answer: 0
      feedback: [null, "Many fungi grow in soil, and some plants don't.", "Some fungi are huge underground; some plants are tiny."]
  - check:
      type: question
      q: "Why do scientists use observable features to classify?"
      options: ["Anyone can check them, so everyone sorts the same organism the same way", "They are the most interesting features", "Because organisms choose their own group"]
      answer: 0
      feedback: [null, "Interesting isn't the point: checkable is.", "Groups are decided by people, using evidence."]
  - check:
      type: question
      q: "DNA evidence shows which living things share a recent common ancestor. Which is a mushroom's closer relative?"
      options: ["A sea star (an animal)", "A fern (a plant)", "Neither: fungi aren't related to anything"]
      answer: 0
      feedback: [null, "Ferns and mushrooms both grow on the forest floor and stay put, but that's a feature, not family. DNA puts fungi closer to animals.", "All living things are related; the question is how closely."]
      explain: "Fungi and animals share a more recent common ancestor than fungi and plants do. Kingdoms sort by features; they don't always show who is related."
  - check:
      type: question
      q: "Scientists once used two kingdoms (plants and animals), then five, and now group life into three domains. Why did it keep changing?"
      options: ["New evidence (microscopes, then DNA) showed groups that didn't fit the old system", "The earlier scientists were careless", "Living things have evolved into new kingdoms since then"]
      answer: 0
      feedback: [null, "They sorted carefully with the evidence they had. What new evidence came later?", "The organisms didn't change in a few hundred years; what we know about them did."]
      explain: "Microscopes revealed single-celled life that was neither plant nor animal; DNA showed that 'bacteria' are really two very different groups (bacteria and archaea), and that protists aren't one family. Classification is a model, revised when the evidence demands it."
  - check: { type: reflect, text: "I placed five organisms in their kingdoms and gave the feature that decided each one, and I can explain why kingdoms aren't family trees." }
```

### Sort them

### Plants or fungi

### Why features

### Closer relatives

### Why it changed

### In your own words

In your book: choose five organisms, one from each kingdom, and write the observable feature that places each one.

## Elaborate: a hard one

```step
stage: modify
tier: typical
insight: "A boundary case shows that the kingdom model is a human tool with limits, not a fact of nature."
check:
  type: question
  q: "Euglena is a single cell that swims with a tail, and it is green: it makes food from sunlight, but also eats when it is dark. Why is it hard to classify?"
  options: ["It has features of both plants (makes food) and animals (moves and eats)", "It is too small to see", "It doesn't have any features"]
  answer: 0
  feedback: [null, "Microscopes let us see it clearly; the problem is its mix of features.", "It has plenty of features: they just don't fit one group."]
  explain: "It is placed with the protists, but it shows why classification systems keep changing as we learn more."
```

## Elaborate: the full address of a kangaroo

```step
stage: modify
tier: wider
insight: "The Linnaean hierarchy extends kingdoms into nested groups, each level sharing more features."
check:
  type: parsons
  code: "hierarchy.txt#order"
  text: "Put the red kangaroo's classification in order, from the biggest group to the smallest."
  explain: "Kingdom, phylum, class, order, family, genus, species: each level is a smaller group that shares more features. The two-part scientific name is genus + species: Osphranter rufus."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my answer about the mushroom with what the key showed." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Living things are grouped by **observable features** into **kingdoms**: animals, plants, fungi, protists and bacteria.
- **Plants** make their own food from sunlight; **fungi** absorb food from other material; **animals** eat other living things.
- **Protists** are mostly single cells with a nucleus; **bacteria** are single tiny cells with no nucleus.
- Some organisms (Euglena, algae) are hard to place: classification is a tool that changes with evidence.
- Kingdoms sort by **features**; they don't always show who is **related**. Fungi are closer relatives of animals than of plants, and protists aren't one family.
- Scientists now group life by evolutionary relationships, using DNA: **three domains** (bacteria, archaea and eukaryotes). The five kingdoms are still a useful way to sort what you can see.
