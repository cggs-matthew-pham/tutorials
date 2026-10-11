---
order: 12
node: AC9S10U06 n3
woven: [AC9S9H01, AC9S9I05]
unit: periodic
title: Why does the periodic table repeat?
summary: "Across a period the outer electrons go up from 1 to 8; then a new shell starts and the count goes back to 1, so a new period begins and the properties repeat. The period number is the number of shells. Across a period, elements change from metals to non-metals."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8263
  url: http://127.0.0.1:8263/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain-pic, caption: "Sodium (2, 8, 1): a third shell has started, so a new period, and 1 outer electron (orange), like lithium." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Periods and outer electrons"
  say: "Each period fills a shell; then the outer electrons start again at one."
  clip:
    - caption: { text: "Lithium: 2, 1. Period 2 starts with 1 outer electron.", say: "Lithium: period two starts with one outer electron." }
    - wait: 2200
    - click: "Neon"
    - caption: { text: "Across the period, one more each time, up to neon: 8, a full shell.", say: "Across the period, one more each time, up to neon, with a full shell." }
    - wait: 3600
    - click: "Sodium"
    - caption: { text: "Sodium: 2, 8, 1. A new shell, a new period, and back to 1 outer electron.", say: "Sodium starts a new shell and a new period, back to one outer electron." }
    - wait: 3800
    - caption: { text: "So the pattern repeats: sodium behaves like lithium.", say: "So the pattern repeats, and sodium behaves like lithium." }
    - wait: 800
hook: "Mendeleev arranged the elements in 1869 and left gaps for ones nobody had found. Years later they were discovered, just as he had predicted. Electrons explain why his pattern worked, but nobody knew about electrons yet."
---
Elements in a group have the same outer electrons. This lesson asks why the table goes in rows, and why the pattern repeats.

## Engage: after neon

```step
stage: predict
insight: "Asking for sodium's outer electrons after neon's 8 tests whether students expect the count to keep rising (9) or to reset as a new shell starts."
check:
  type: predict
  q: "Lithium has 1 outer electron. Each element after it has one more, up to neon with 8 (a full shell). Sodium comes next. How many outer electrons does sodium have?"
  options: ["1", "9", "0", "3"]
  actual: "1. Neon's second shell is full, so sodium's eleventh electron starts a third shell: 2, 8, 1. With 1 outer electron, sodium starts a new row and behaves like lithium."
```

## Explore: across and down

```step
stage: run
insight: "Colouring the table by outer electrons, then by shells, shows the two patterns students need: the count rising across each row and resetting, and each new row starting a new shell."
try: { playground: board, starter: "boards.yml#period2", height: 820 }
tasks:
  - starter: "boards.yml#period2"
    check: { type: board, text: "Click across period 2 from lithium to neon, then sodium. Watch the outer electrons.", when: "n = k" }
  - starter: "boards.yml#starts"
    check: { type: board, text: "Now the table is coloured by shells. Click the first element of each period: H, Li, Na, K.", when: "n = k" }
```

### Outer electrons

The colour shows how many outer electrons each element has. Click each element to see its shells; the outer shell is orange.

### Shells

The colour now shows how many shells each element uses.

## Explain: why it repeats

```step
stage: investigate
insight: "Tying the period to the number of shells and the group to the outer electrons lets students read an element's position as its electron arrangement, and explain repeating properties."
tasks:
  - check:
      type: question
      q: "Why does a new period (row) start at sodium?"
      options: ["Its electrons start filling a new shell", "Sodium is the first metal", "Each row holds exactly 10 elements"]
      answer: 0
      feedback: [null, "Lithium and beryllium are metals too; the reason is the shells.", "Period 1 has 2 elements and periods 2 and 3 have 8."]
      explain: "Each period fills one shell. When a shell is full, the next electron starts a new one, and a new period begins."
  - check:
      type: number
      q: "An element has electrons in shells 2, 8, 8, 2. Which period is it in?"
      answer: 4
      explain: "Four shells: period 4. (It is calcium, in group 2 with 2 outer electrons.)"
  - check:
      type: sort
      q: "Which group? Use the outer electrons."
      options: ["Group 1", "Group 17", "Group 18"]
      items:
        - ["2, 1", "Group 1"]
        - ["2, 8, 8, 1", "Group 1"]
        - ["2, 7", "Group 17"]
        - ["2, 8, 7", "Group 17"]
        - ["2, 8", "Group 18"]
        - ["2, 8, 8", "Group 18", "A full outer shell of 8: a noble gas."]
  - check:
      type: question
      q: "Sulfur is in period 3, group 16. What is its electron arrangement?"
      options: ["2, 8, 6", "2, 8, 8, 6", "2, 6"]
      answer: 0
      feedback: [null, "Period 3 means 3 shells.", "That is oxygen, in period 2."]
      explain: "Period 3: three shells. Group 16: six outer electrons. So 2, 8, 6 (16 electrons, atomic number 16)."
  - check:
      type: question
      q: "Why do properties repeat from one period to the next?"
      options: ["The number of outer electrons repeats, and outer electrons decide how an element reacts", "The atoms get heavier in a repeating way", "Elements were placed to make the pattern look neat"]
      answer: 0
      feedback: [null, "Mass rises steadily; it doesn't repeat.", "The pattern was found in the elements' behaviour before anyone arranged it."]
      explain: "Every period runs from 1 outer electron to a full shell. Elements with the same number of outer electrons, in the same column, react in similar ways."
  - check: { type: reflect, text: "I can explain why a new period starts and why properties repeat, and read an element's shells from its period and group." }
```

### New period

### Period from shells

### Group from shells

### Shells from position

### Why it repeats

### In your own words

In your book: draw period 2 as a row of eight boxes with each element's shells (2, 1 up to 2, 8). Under it, write sodium's shells and explain why it goes under lithium.

## Elaborate: metals to non-metals

```step
stage: modify
tier: typical
insight: "Following period 3 from sodium to argon links metallic character to outer electrons: few to lose on the left, nearly full shells to fill on the right."
try: { playground: board, starter: "boards.yml#period3", height: 820 }
tasks:
  - check: { type: board, text: "Click across period 3 from sodium to argon.", when: "n = k" }
  - check:
      type: question
      q: "Across period 3, the elements change from metals to non-metals. How do outer electrons explain this?"
      options: ["On the left, atoms have 1 to 3 outer electrons that are easily lost (metals); on the right, nearly full shells gain or share electrons (non-metals)", "Atoms on the right are bigger", "Metals have no outer electrons"]
      answer: 0
      feedback: [null, "Across a period atoms actually get a little smaller: more protons pull the same shells in tighter.", "Every atom has outer electrons."]
      explain: "Metals lose outer electrons easily. With more outer electrons, losing them all gets harder, and gaining or sharing to fill the shell takes over."
```

### Period 3

### Metal or non-metal

## Elaborate: Mendeleev's gaps

```step
stage: modify
tier: wider
insight: "Mendeleev's table worked as a pattern before electrons explained it: a pattern can be used to predict before it is understood."
try: { playground: board, starter: "boards.yml#metalloids", height: 820 }
tasks:
  - check: { type: board, text: "Find the two metalloids in the first 20 elements: they sit on the border between the metals and the non-metals.", when: "n = k" }
  - check:
      type: question
      q: "Mendeleev ordered elements by mass and grouped them by how they reacted, leaving gaps. He predicted the properties of a missing element below silicon; germanium was found 17 years later (1886) and matched. What does this show?"
      options: ["A pattern can predict new things before anyone can explain it; electrons later explained why it works", "Mendeleev knew about electron shells", "The table is just a convenient list with no meaning"]
      answer: 0
      feedback: [null, "Electrons were discovered in 1897, almost 30 years later.", "If it were just a list, it could not have predicted germanium."]
      explain: "Good scientific patterns predict. The explanation (outer electrons) came decades later and showed why the pattern works, and why the table is ordered by atomic number, not mass."
```

### Metalloids

### Prediction before explanation

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about sodium's outer electrons with the table." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Each **period** fills one electron shell. The period number is the number of shells an element uses.
- Across a period, the outer electrons go up by 1 each time, from 1 to 8 (a full shell). Then a new shell starts and the count goes back to 1.
- Because the outer electrons repeat, properties repeat: elements in the same **group** behave alike.
- Across a period, elements change from metals (few outer electrons, easily lost) to non-metals (nearly full shells).
