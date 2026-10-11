---
order: 8
unit: periodic
title: How are the electrons arranged?
summary: "Electrons fill shells around the nucleus in order: 2 in the first, 8 in the second, 8 in the third (for the first 20 elements). The electrons in the outer shell decide how an element behaves."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8258
  url: http://127.0.0.1:8258/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Neon: 10 electrons in shells 2, 8. Both shells are full." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Electron shells"
  say: "Electrons fill shells in order: two, then eight, then eight."
  clip:
    - caption: { text: "Neon: 10 electrons, in shells of 2 and 8. Both are full.", say: "Neon has ten electrons, in shells of two and eight. Both are full." }
    - wait: 3200
    - click: { selector: "[aria-label=\"Protons: more\"]" }
    - click: { selector: "[aria-label=\"Neutrons: more\"]" }
    - click: { selector: "[aria-label=\"Neutrons: more\"]" }
    - click: { selector: "[aria-label=\"Electrons: more\"]" }
    - caption: { text: "Sodium's 11th electron can't fit: it starts a new shell. 2, 8, 1.", say: "Sodium's eleventh electron can't fit, so it starts a new shell." }
    - wait: 3000
    - caption: { text: "Shells fill in order: 2, then 8, then 8. The outer shell matters most.", say: "Shells fill in order: two, then eight, then eight. The outer shell matters most." }
    - wait: 800
hook: "Neon glows in signs but never reacts with anything. Sodium, one proton heavier, catches fire in water. The difference is one electron."
---
In Year 9 you met the nuclear atom. This lesson arranges its electrons.

## Engage: sodium's electrons

```step
stage: predict
insight: "Students who think electrons crowd into one shell, or fill shells of any size, show it here; the board fills the shells as they add electrons."
check:
  type: predict
  q: "Sodium has 11 electrons. How do you predict they are arranged around the nucleus?"
  options: ["2, 8, 1 (three shells)", "All 11 in one shell", "2, 9 (two shells)", "8, 3"]
  actual: "2, 8, 1. The first shell holds 2 and the second 8, so the 11th electron starts a third shell. That single outer electron explains a lot about sodium."
```

## Explore: build sodium

```step
stage: run
insight: "Adding electrons one at a time shows each shell filling and a new one starting at 3 and 11, the rule students then state."
try: { playground: board, starter: "boards.yml#sodium", height: 720 }
check: { type: board, text: "Build sodium-23 and watch where each electron goes.", when: "t = 1" }
```

Add protons, neutrons and electrons one at a time. Watch the electrons: when does a new shell start?

## Explain: filling the shells

```step
stage: investigate
insight: "Stating the capacities and finding the outer electrons for any element 1–20 is the fluency the periodic table work depends on."
tasks:
  - check:
      type: question
      q: "How many electrons do the first three shells hold, for the first 20 elements?"
      options: ["2, 8, 8", "2, 2, 2", "8, 8, 8", "2, 4, 8"]
      answer: 0
      feedback: [null, "The first shell holds 2, but the next ones hold more.", "The first shell is smaller: it holds only 2.", "The second shell holds 8, not 4."]
  - check:
      type: question
      q: "Chlorine has 17 electrons. How are they arranged?"
      options: ["2, 8, 7", "2, 15", "8, 8, 1", "2, 8, 8"]
      answer: 0
      feedback: [null, "The second shell is full at 8.", "Start from the first shell, which holds only 2.", "That's 18 electrons: argon."]
  - check:
      type: number
      q: "Magnesium has 12 electrons. How many are in its outer shell?"
      answer: 2
      explain: "2, 8, 2: two outer electrons."
  - check:
      type: number
      q: "Calcium has 20 electrons. How many shells do they fill (or start)?"
      answer: 4
      explain: "2, 8, 8, 2: four shells."
  - check: { type: reflect, text: "I can arrange the electrons of any element from 1 to 20 in shells and find its outer electrons." }
```

### Shell sizes

### Chlorine

### Magnesium

### Calcium

### In your own words

In your book: draw Bohr diagrams for lithium (3), oxygen (8) and potassium (19). Circle the outer shell of each and write how many electrons it has.

## Elaborate: argon and potassium

```step
stage: modify
tier: typical
insight: "Completing argon's third shell, then seeing potassium start a fourth, links full shells to the end of a row in the periodic table."
try: { playground: board, starter: "boards.yml#argon", height: 720 }
tasks:
  - check: { type: board, text: "Finish argon-40: it needs one more electron.", when: "t = 1" }
  - check:
      type: question
      q: "Potassium has one more electron than argon. Where does it go?"
      options: ["It starts a fourth shell: 2, 8, 8, 1", "Into the third shell: 2, 8, 9", "Into the first shell"]
      answer: 0
      feedback: [null, "For the first 20 elements the third shell is full at 8.", "The first shell is full at 2."]
      explain: "A full shell, then a new one: that's why potassium starts a new row of the periodic table."
```

### Argon

### Potassium

## Elaborate: coloured flames

```step
stage: modify
tier: wider
insight: "Flame colours are evidence for fixed energy levels: the observation that pushed the atomic model to shells."
check:
  type: question
  q: "Heated in a flame, sodium glows yellow and potassium lilac. Each element always gives the same colours. What does that suggest about electrons?"
  options: ["They sit at fixed energy levels, different in each element; jumping between them gives out light of particular colours", "Electrons are coloured", "The flame changes colour with temperature, not the element"]
  answer: 0
  feedback: [null, "Electrons have no colour; the light comes from energy changes.", "The same flame gives different colours with different elements."]
  explain: "Each element's emission spectrum is a fingerprint of its electron energy levels: evidence for Bohr's shells."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about sodium's electrons with what the board showed." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Electrons fill **shells** in order: **2**, then **8**, then **8** (then 2 more for potassium and calcium).
- The **outer shell** is the outermost occupied one; its electrons decide how the element reacts.
- A full shell is followed by a new shell, which is why rows of the periodic table end and begin.
