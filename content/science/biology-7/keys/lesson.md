---
order: 3
node: AC9S7U01 n3
woven: [AC9S7I06]
unit: classification
title: Who is it? Using a key
summary: A dichotomous key identifies an organism by a series of yes-or-no questions about features you can observe. Following each choice carefully leads to the right name; one wrong choice leads to the wrong one.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8208
  url: http://127.0.0.1:8208/index.html
  readySelector: "#gpanel"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Using a dichotomous key"
  say: "A key asks two-way questions about features you can see, one at a time."
  clip:
    - caption: { text: "Read the specimen, then answer each question about it.", say: "Answer each question about the specimen in front of you, one at a time." }
    - caption: { text: "Does it have a backbone? Yes.", say: "Does it have a backbone? Yes." }
    - click: "Yes"
    - caption: { text: "Does it have feathers? No: it has fur.", say: "Does it have feathers? No, it has fur." }
    - click: "No"
    - expect: { selector: "body", contains: "Wombat" }
    - caption: { text: "Each answer leads to the next question, until you reach a name.", say: "Each answer leads on to a name; one wrong answer gives the wrong name." }
    - wait: 800
hook: "A field guide doesn't show you every animal in Australia and ask you to find the match. It asks you a question about the one in front of you, then another, then another."
---
Last lesson: kingdoms. This lesson: a tool for naming organisms one careful choice at a time.

## Engage: how does a key work?

```step
stage: predict
insight: "Students who think a key is a list of names to match will choose that option; working through it one feature at a time is the logic the node needs."
check:
  type: predict
  q: "You have a dichotomous key and an animal you don't know. How do you think you use the key?"
  options: ["Guess the name, then check it in the key", "Answer two-way questions about the animal's features, one at a time, until the key names it", "Look for the picture that matches", "Count its legs and look up the number"]
  actual: "Answer two-way questions about features you can observe, one at a time. Each answer sends you to the next question, until you reach a name."
```

## Explore: identify the specimens

```step
stage: run
insight: "Using a real key, with feedback on wrong turns, makes the binary decision logic concrete."
try: { playground: board, starter: "boards.yml#animals", height: 600 }
check: { type: board, text: "Use the key to identify at least 5 specimens.", when: "n >= 5" }
```

Choose a specimen and read its description carefully. Answer each question about **that** specimen. The name appears only when you get it right.

## Explain: how keys work

```step
stage: investigate
insight: "Naming the feature at each decision and explaining wrong turns is the understanding students need to build keys in node 4."
tasks:
  - check:
      type: question
      q: "Why is it called a dichotomous key?"
      options: ["Each step splits into exactly two choices", "It uses two kinds of feature", "It identifies two organisms"]
      answer: 0
      feedback: [null, "It can use many features, one per step.", "It can identify as many organisms as it has endings."]
      explain: "Dichotomous means dividing into two."
  - check:
      type: question
      q: "A student identified the crocodile as a green tree frog. Where did they most likely go wrong?"
      options: ["At \"Does it have dry, scaly skin?\": they answered no", "At \"Does it have a backbone?\"", "The key is wrong"]
      answer: 0
      feedback: [null, "A crocodile does have a backbone: both frog and crocodile are down the same path until the skin question.", "The key leads to the crocodile when every answer matches its description."]
      explain: "A wrong answer at one step sends you down the wrong branch, and every later answer can't fix it."
  - check:
      type: question
      q: "Which is a good question for a key?"
      options: ["Does it have six legs?", "Is it scary?", "Is it big?", "Is it a kangaroo?"]
      answer: 0
      feedback: [null, "People disagree about what is scary. Questions must be about features everyone can check.", "Big compared with what? It needs a clear yes or no.", "Asking for the name skips the point of the key."]
      explain: "A good question is about an observable feature with a clear yes or no."
  - check: { type: reflect, text: "I can explain, step by step, how I used the key to identify one specimen, naming the feature at each step." }
```

### Two ways

### Wrong turns

### Good questions

### In your own words

In your book: write the path you took to identify the platypus, naming the feature you checked at each step.

## Elaborate: a different key

```step
stage: modify
tier: typical
insight: "Two keys for the same animals reach the same names by different questions, showing that the features, not the order, carry the identification."
try: { playground: board, starter: "boards.yml#second", height: 600 }
tasks:
  - check: { type: board, text: "Identify 3 specimens with this second key.", when: "n >= 3" }
  - check:
      type: question
      q: "The two keys ask different questions in a different order, but give the same names. Why?"
      options: ["Each animal has the same features whichever order you check them in", "One of the keys must be wrong", "Keys always ask the same questions"]
      answer: 0
      feedback: [null, "Both lead every specimen to its correct name.", "Look again: this one starts with legs, not a backbone."]
      explain: "A key is one way of checking features. Different keys can sort the same organisms in different orders."
```

### Second key

### Same names

## Elaborate: a broken key

```step
stage: modify
tier: wider
insight: "Spotting a flaw in a key (a question that doesn't split cleanly) prepares students to build keys of their own."
check:
  type: question
  q: "A key's first question is \"Is it brown?\" The specimens include a brown kangaroo, a grey kangaroo and a brown spider. What is wrong with this question?"
  options: ["Colour varies within a species and isn't reliable: the two kangaroos go different ways", "Nothing: colour is observable", "It should ask about size instead"]
  answer: 0
  feedback: [null, "Observable, yes, but unreliable: animals of the same kind can differ in colour.", "Size is even less clear-cut."]
  explain: "Good keys use features that don't vary within a kind of organism: legs, body covering, backbone."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first idea about how a key works with how I used one." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A **dichotomous key** identifies an organism with a series of **two-way choices** about **observable features**.
- Answer each question about the specimen in front of you; each answer leads to the next step, until you reach a name.
- One wrong answer leads to the wrong name: check each feature carefully.
- Good questions have a clear yes or no and use features that don't vary within a kind (legs, covering, backbone), not colour or size.
