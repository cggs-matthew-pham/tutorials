---
order: 13
node: AC9S10U06 n4
unit: periodic
title: Use the table to predict
summary: "The periodic table is not a list to look up but a tool for prediction. An element's group gives its number of outer electrons, and so how reactive it is and what it bonds with; its period gives its number of shells. From the position alone you can predict whether an element is a metal, how it reacts and what its atom looks like."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8296
  url: http://127.0.0.1:8296/index.html
  readySelector: "#gpanel"
  layout: full
hook: "When Mendeleev laid out the elements in 1869 he left gaps and said: an element will be found here, and it will behave like this. He was right. How could a table predict something nobody had seen?"
---
You know shells, groups and trends. Now use the table to predict something you haven't been told.

## Engage: a stranger in group 1

```step
stage: predict
insight: "Students want to look up the answer. The node asks them to reason from position: group gives outer electrons, so reactivity and bonding."
check:
  type: predict
  q: "You are told only that an unfamiliar element sits in group 1, period 4. What can you predict?"
  options: ["It is a metal with one outer electron, which is very reactive, losing that electron to form a 1+ ion", "Nothing: you must look it up", "It is an unreactive gas", "It has 4 outer electrons"]
  actual: "It has one outer electron (group 1), so it is an alkali metal that loses the electron easily, is very reactive and forms 1+ ions. Period 4 means four shells, so it is more reactive than the group 1 elements above it."
```

## Explore: read the table

```step
stage: run
insight: "Finding elements from group and period, and seeing outer electrons on the board, practises using the position as the information."
try: { playground: board, starter: "boards.yml#table", height: 680 }
tasks:
  - starter: "boards.yml#table"
    check: { type: board, text: "Click the element in group 2, period 3. How many outer electrons does it have?", when: "z = 12 and o = 2" }
  - starter: "boards.yml#table"
    check: { type: board, text: "Click the element in group 17 (the halogens), period 2.", when: "z = 9 and o = 7" }
  - starter: "boards.yml#table"
    check: { type: board, text: "Click the element in group 18 (the noble gases), period 3.", when: "z = 18 and o = 8" }
```

### Group 2, period 3

### Group 17, period 2

### Group 18, period 3

## Explain: predicting

```step
stage: investigate
insight: "Predicting outer electrons, shells, reactivity and bonding from position, and explaining two properties from structure, meets the three success criteria."
tasks:
  - check:
      type: number
      q: "An element is in period 3, group 16. How many outer electrons does it have?"
      answer: 6
      explain: "In groups 13 to 18 the group number minus 10 gives the outer electrons: 16 − 10 = 6 (sulfur)."
  - check:
      type: number
      q: "The same element is in period 3. How many electron shells does it have?"
      answer: 3
      explain: "The period number is the number of shells."
  - check:
      type: question
      q: "Which is more reactive, rubidium (group 1, period 5) or lithium (group 1, period 2)?"
      options: ["Rubidium: its outer electron is further from the nucleus and easier to lose", "Lithium: it is smaller", "They are the same, because they are in the same group"]
      answer: 0
      feedback: [null, "Smaller means the outer electron is closer and held tighter.", "Same group, same pattern, but reactivity grows down group 1."]
      explain: "Down group 1 there are more shells, so the outer electron is further away, held less tightly and lost more easily."
  - check:
      type: question
      q: "Chlorine (group 17) forms compounds with sodium (group 1). Predict the ions."
      options: ["Na⁺ and Cl⁻: sodium gives up its one outer electron and chlorine gains one to fill its outer shell", "Na⁻ and Cl⁺", "Na²⁺ and Cl²⁻"]
      answer: 0
      feedback: [null, "Metals lose electrons; non-metals gain them.", "Sodium has one outer electron to give and chlorine needs one to complete its shell."]
      explain: "Group 1 loses 1 electron, group 17 gains 1, so they combine one to one: NaCl."
  - check:
      type: question
      q: "Why are the noble gases (group 18) almost unreactive?"
      options: ["Their outer shells are full, so they have no need to gain, lose or share electrons", "They are gases, and gases don't react", "They are too light to react"]
      answer: 0
      feedback: [null, "Oxygen, fluorine and chlorine are gases and react readily: it is the full shell that matters.", "Helium is light but neon and argon are heavier: it is the full shell."]
      explain: "A full outer shell is stable. Atoms of other elements react to reach that arrangement."
  - check: { type: reflect, text: "I can use an element's position in the table to predict its outer electrons, shells and reactivity." }
```

### Outer electrons

### Shells

### Down a group

### Bonding

### Noble gases

### In your own words

In your book: choose an element you haven't studied (such as potassium or fluorine). Write its group and period, then predict its outer electrons, shells, reactivity and the ion it forms, and say how you worked it out.

## Elaborate: a flame test

```step
stage: modify
tier: typical
insight: "Flame tests are the classic evidence that atoms have electron shells with fixed energies."
check:
  type: question
  q: "Sodium salts give a yellow flame and copper salts a green flame. What does this tell you about the atoms?"
  options: ["Electrons jump between shells with fixed energies and give out light of a colour set by each element", "All metals burn the same", "The colour comes from the flame, not the metal"]
  answer: 0
  feedback: [null, "The colours differ, so they don't.", "The colour changes with the metal, not the flame."]
  explain: "When an electron falls from a higher to a lower shell it gives out light of one fixed colour. Each element has its own pattern, a fingerprint you can use to identify it."
```

## Elaborate: gaps in the table

```step
stage: modify
tier: wider
insight: "Mendeleev's gaps and predictions show the table working as a predictive model before atomic structure was understood."
check:
  type: question
  q: "Mendeleev left gaps and predicted the properties of the missing elements, such as the one later named germanium. Why was this good evidence for his table?"
  options: ["The predictions came true when the elements were found, so the pattern in the table was real", "He had already found the elements", "The table was copied from another scientist"]
  answer: 0
  feedback: [null, "The elements were found afterwards.", "He built the table from patterns in the elements' properties."]
  explain: "A model that predicts something new, and is then confirmed, is more convincing than one that only fits what is already known."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the unfamiliar element with how I now use the table." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- The **group** gives the number of outer electrons; the **period** gives the number of shells.
- Outer electrons decide reactivity and bonding: group 1 loses one electron, group 17 gains one, group 18 is stable.
- Reactivity grows **down** group 1 and falls **down** group 17.
- The table is a **predictive model**: Mendeleev's gaps predicted elements before anyone found them.
