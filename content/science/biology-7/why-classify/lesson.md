---
order: 1
node: AC9S7U01 n1
woven: [AC9S7H02]
unit: classification
title: Why sort living things?
summary: "Scientists classify living things to identify them, to talk about them clearly (one name the whole world understands), and to see how they are related. A classification is built for a purpose, and different systems can suit different purposes."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8270
  url: http://127.0.0.1:8270/index.html
  readySelector: "#gpanel"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Why classify?"
  say: "Classifying helps us identify living things and talk about them clearly."
  clip:
    - caption: { text: "An animal you don't know. Groups based on features help you name it.", say: "An animal you don't know. Groups based on its features help you name it." }
    - wait: 1000
    - click: "Yes"
    - caption: { text: "A backbone. No feathers.", say: "It has a backbone, and no feathers." }
    - click: "No"
    - click: "No"
    - expect: { selector: "body", contains: "Red kangaroo" }
    - caption: { text: "Identified. Now everyone can use one name for it, and know its relatives.", say: "Identified. Now everyone can use one name, and know what it is related to." }
    - wait: 1200
hook: "There are about 2 million named species of living things, and millions more not yet named. Without a system, how would anyone find their way around them?"
---
A short lesson: why we classify at all, before the kingdoms and keys.

## Engage: a new beetle

```step
stage: predict
insight: "Students who see classification as tidying up, or as just making lists, pick those options; the purposes (identify, communicate, show relationships) are what the lesson builds."
check:
  type: predict
  q: "A scientist finds a beetle she has never seen. Why does it help that beetles are already classified and named?"
  options: ["She can work out what it is, or show it is new, and tell other scientists exactly which beetle she means", "It doesn't help: classification is just a tidy list", "So the beetle can be put in a museum", "So she knows how many legs it has"]
  actual: "Classification lets her identify it (or show it is a new species), and its name lets scientists everywhere know exactly which beetle she means. Its group also tells her what it is related to."
```

## Explore: identify with a key

```step
stage: run
insight: "Using a short key shows one purpose in action: features organised into groups let you identify something you don't know."
try: { playground: board, starter: "boards.yml#key", height: 600 }
check: { type: board, text: "Use the key to identify two of the animals.", when: "n >= 2" }
```

Answer each question about the animal shown. The key is built from groups: backbone or not, then feathers or not.

## Explain: what classification is for

```step
stage: investigate
insight: "Naming the purposes, then telling classification apart from a plain list, meets the node's success criteria in a few minutes."
tasks:
  - check:
      type: sort
      q: "Is it a reason scientists classify living things?"
      options: ["A reason to classify", "Not a reason"]
      items:
        - ["To identify an organism they don't know", "A reason to classify"]
        - ["To use names every scientist understands", "A reason to classify", "One scientific name, whatever language you speak."]
        - ["To see which organisms are related", "A reason to classify"]
        - ["To make the living world look neat", "Not a reason"]
        - ["To decide which organisms are better", "Not a reason", "Groups describe features and relationships, not worth."]
  - check:
      type: question
      q: "Which is classification, not just a list?"
      options: ["Grouping animals by shared features, such as backbone or no backbone, then smaller groups inside", "Writing animals in alphabetical order", "Numbering animals in the order you saw them"]
      answer: 0
      feedback: [null, "Alphabetical order tells you nothing about the animals themselves.", "That records when you saw them, not what they are like."]
      explain: "Classification groups things by what they share, so the group tells you something about each member."
  - check:
      type: question
      q: "A supermarket groups food by aisle: dairy, bakery, fruit. How is that like scientific classification?"
      options: ["Groups by shared features help people find things and talk about them", "It isn't: only scientists classify", "Both put things in alphabetical order"]
      answer: 0
      feedback: [null, "Everyday life is full of classification.", "Neither does; both group by shared features."]
      explain: "Libraries, supermarkets and phone contacts all classify, for a purpose. Scientific classification's purposes are identifying, communicating and showing relationships."
  - check: { type: reflect, text: "I can give two reasons why living things are classified, and an everyday example of classification." }
```

### Reasons

### Classification or a list

### Everyday classification

### In your own words

In your book: write two reasons why scientists classify living things, and one example of classification from everyday life.

## Elaborate: two ways to group

```step
stage: modify
tier: typical
insight: "Comparing two systems for one purpose shows a classification is chosen for what it is meant to do."
try: { playground: board, starter: "boards.yml#key", height: 600 }
tasks:
  - check: { type: board, text: "Identify the rest of the animals with the key.", when: "n >= 5" }
  - check:
      type: question
      q: "You could group these animals by where they live (land, water, air) or by body features (backbone, feathers, fur). Which is more useful for showing how they are related?"
      options: ["Body features: a platypus and a kangaroo share fur and milk, though one swims", "Where they live: animals in the same place are related", "Both are equally useful for every purpose"]
      answer: 0
      feedback: [null, "A crocodile and a fish both live in water but are not close relatives.", "Each suits a different purpose: habitat groups help an ecologist; feature groups show relationships."]
      explain: "Grouping by habitat suits some jobs (planning a reserve); grouping by shared features suits others (showing relationships). The purpose decides the system."
```

### Finish the key

### Which system

## Elaborate: other ways of knowing

```step
stage: modify
tier: wider
insight: "Different knowledge systems classify for different purposes; comparing them shows classification as purposeful and made by people."
try: { playground: board, starter: "boards.yml#key", height: 600 }
tasks:
  - check: { type: board, text: "Identify two animals with the key again.", when: "n >= 2" }
  - check:
      type: question
      q: "Many Aboriginal and Torres Strait Islander peoples group plants and animals in ways tied to Country: by uses, seasons, relationships between species and cultural knowledge. Scientific classification groups by shared features and ancestry. What does comparing them show?"
      options: ["Each system is built for its purposes, and each holds knowledge the other may not", "Only one of them can be correct", "Classification systems never change"]
      answer: 0
      feedback: [null, "They answer different questions, and they can inform each other.", "Scientific classification itself has changed many times (see Kingdoms)."]
      explain: "Every classification reflects the purposes and knowledge of the people who built it. Ecologists increasingly work with First Peoples' knowledge of species and seasons."
```

### The key again

### Different purposes

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the new beetle with what classification is for." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Scientists classify living things to **identify** them, to **communicate** clearly (one name everyone understands) and to show how they are **related**.
- Classification groups by shared features; a list (alphabetical, by date) does not.
- Every classification is built for a purpose; different purposes can suit different systems.
