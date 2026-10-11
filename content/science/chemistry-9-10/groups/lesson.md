---
order: 9
unit: periodic
title: Why do elements in a group behave alike?
summary: Elements in the same group have the same number of outer-shell electrons, so they react in similar ways. Group 1 metals lose their one outer electron easily; group 17 non-metals gain one easily; group 18 has full shells and hardly reacts.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8259
  url: http://127.0.0.1:8259/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Lithium (2, 1): one outer electron (orange), like every element in group 1." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Groups and outer electrons"
  say: "Elements in a group have the same number of outer electrons, so they behave alike."
  clip:
    - caption: { text: "Lithium: 2, 1. One outer electron.", say: "Lithium: two, one. One outer electron." }
    - wait: 1800
    - click: "Sodium"
    - caption: { text: "Sodium: 2, 8, 1. Potassium: 2, 8, 8, 1. Each has one outer electron.", say: "Sodium and potassium each have one outer electron too." }
    - wait: 1700
    - click: "Potassium"
    - wait: 1500
    - caption: { text: "Same outer electrons, same group, similar reactions: very reactive metals.", say: "Same outer electrons, same group, similar reactions: very reactive metals." }
    - wait: 4400
    - click: "Chlorine"
    - caption: { text: "Group 17: seven outer electrons, one short of full. Reactive non-metals.", say: "Group seventeen has seven outer electrons, one short of full." }
    - wait: 800
hook: "Lithium, sodium and potassium look nothing alike in a jar, yet drop any of them in water and they fizz across the surface. Why do they behave the same?"
---
Last lesson: electrons fill shells. This lesson uses the outer shell to read the periodic table.

## Engage: three fizzing metals

```step
stage: predict
insight: "Students who think similar behaviour comes from similar size or total electrons pick a distractor; the table shows outer electrons as the shared feature."
check:
  type: predict
  q: "Lithium, sodium and potassium all react with water in the same way. What do you predict their atoms have in common?"
  options: ["The same number of outer-shell electrons", "The same total number of electrons", "The same mass", "Full outer shells"]
  actual: "Each has one outer-shell electron: lithium 2, 1; sodium 2, 8, 1; potassium 2, 8, 8, 1. Elements in the same group have the same number of outer electrons, so they react in similar ways."
```

## Explore: group 1

```step
stage: run
insight: "Clicking down a column and seeing the same single orange electron each time makes the group's shared feature visible."
try: { playground: board, starter: "boards.yml#alkali", height: 760 }
check: { type: board, text: "Look at lithium, sodium and potassium. Count the outer electrons of each.", when: "n >= 3" }
```

Click an element to see its shells. The outer electrons are orange.

## Explain: outer electrons decide

```step
stage: investigate
insight: "Using outer-electron counts to place and explain whole groups (1, 2, 17, 18) is the bridge from atomic structure to the table's organisation."
tasks:
  - check:
      type: sort
      q: "Which group does each belong to?"
      options: ["Group 1", "Group 2", "Group 17", "Group 18"]
      items:
        - ["Lithium (2, 1)", "Group 1"]
        - ["Magnesium (2, 8, 2)", "Group 2"]
        - ["Fluorine (2, 7)", "Group 17"]
        - ["Chlorine (2, 8, 7)", "Group 17"]
        - ["Neon (2, 8)", "Group 18"]
        - ["Argon (2, 8, 8)", "Group 18"]
        - ["Potassium (2, 8, 8, 1)", "Group 1"]
  - check:
      type: question
      q: "Why do the noble gases (group 18) hardly react?"
      options: ["Their outer shells are full, so they don't tend to lose, gain or share electrons", "They are gases", "They have no electrons"]
      answer: 0
      feedback: [null, "Chlorine and fluorine are gases too, and very reactive.", "They have electrons: their shells are full."]
  - check:
      type: question
      q: "Element X is in group 17. What do you predict about it?"
      options: ["Seven outer electrons; it gains one easily, so it is a reactive non-metal", "One outer electron; a reactive metal", "A full outer shell; unreactive"]
      answer: 0
      feedback: [null, "That's group 1.", "That's group 18."]
  - check:
      type: question
      q: "Why do sodium (group 1) and chlorine (group 17) react together so readily?"
      options: ["Sodium loses one electron easily and chlorine gains one easily", "They are both metals", "They have the same number of outer electrons"]
      answer: 0
      feedback: [null, "Sodium is a metal; chlorine is a non-metal.", "Sodium has one; chlorine has seven."]
      explain: "Each ends up with a full outer shell: sodium by losing one electron, chlorine by gaining one. They form sodium chloride (salt)."
  - check: { type: reflect, text: "I can explain why elements in the same group behave alike, using their outer electrons." }
```

### Sort by group

### Noble gases

### Predict X

### Sodium and chlorine

### In your own words

In your book: explain why lithium and potassium react in similar ways, but neon and sodium do not. Use outer electrons in your answer.

## Elaborate: halogens and noble gases

```step
stage: modify
tier: typical
insight: "A second and third group on the same board, one reactive and one not, show the principle working across the table, not just in group 1."
try: { playground: board, starter: "boards.yml#halogens", height: 760 }
tasks:
  - check: { type: board, text: "Look at fluorine and chlorine (group 17), then helium, neon and argon (group 18).", when: "n >= 5" }
  - check:
      type: question
      q: "Helium has only 2 electrons, not 8. Why is it in group 18?"
      options: ["Its only shell holds 2, so its outer shell is full, like the other noble gases", "It's a mistake in the table", "It has 8 electrons"]
      answer: 0
      feedback: [null, "Its place is chosen by its behaviour and its full shell.", "Count them on the board: 2."]
```

### Halogens and noble gases

### Helium

## Elaborate: down the group

```step
stage: modify
tier: wider
insight: "A trend within a group (reactivity rising down group 1) extends the model: the outer electron's distance from the nucleus matters too."
check:
  type: question
  q: "Potassium reacts with water much more violently than lithium. Why, when both have one outer electron?"
  options: ["Potassium's outer electron is further from the nucleus, so it is held less tightly and lost more easily", "Potassium has more outer electrons", "Potassium is heavier"]
  answer: 0
  feedback: [null, "Both have one; count them on the board.", "Mass isn't what decides how easily an electron is lost."]
  explain: "More shells means the outer electron is further out and more shielded by the inner electrons: easier to lose, so more reactive."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about lithium, sodium and potassium with what the table showed." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Elements in the same **group** have the same number of **outer-shell electrons**, so they react in similar ways.
- **Group 1** (alkali metals): one outer electron, easily lost: very reactive metals.
- **Group 17** (halogens): seven outer electrons, one short of full: very reactive non-metals.
- **Group 18** (noble gases): full outer shells: hardly react.
- The **period** (row) tells you how many shells an atom has.
