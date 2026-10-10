---
order: 3
unit: equations
title: How do you balance an equation?
summary: A balanced equation has the same number of each kind of atom on both sides, because atoms are only rearranged. You balance it by changing the coefficients in front of formulas, never the formulas themselves.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8257
  url: http://127.0.0.1:8257/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain-pic, caption: "2 Na + Cl₂ → 2 NaCl: two sodium atoms and two chlorine atoms on each side." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Balancing an equation"
  say: "Change only the numbers in front until every kind of atom matches."
  clip:
    - caption: { text: "Sodium and chlorine make sodium chloride. Count each kind of atom.", say: "Sodium and chlorine make sodium chloride. Count each kind of atom." }
    - wait: 3000
    - caption: { text: "Two chlorine atoms on the left, one on the right.", say: "There are two chlorine atoms on the left, but one on the right." }
    - wait: 3000
    - click: { selector: "[aria-label=\"NaCl: more\"]" }
    - caption: { text: "Make two NaCl. Chlorine matches; now sodium doesn't.", say: "Make two sodium chloride. Chlorine matches, but now sodium doesn't." }
    - wait: 3200
    - click: { selector: "[aria-label=\"Na: more\"]" }
    - caption: { text: "Two sodium on the left too. Balanced: the same atoms on both sides.", say: "Two sodium on the left too: balanced, with the same atoms on both sides." }
    - wait: 800
hook: "Chemists write reactions in a shorthand that has to obey one rule: no atom may appear or vanish."
---
Last lesson: atoms are rearranged, never made or destroyed. This lesson writes that down as an equation.

## Engage: water from hydrogen

```step
stage: predict
insight: "The prediction contrasts the legal move (coefficients) with the commonest slip (changing a formula), before students try either."
check:
  type: predict
  q: "Hydrogen burns in oxygen to make water: H₂ + O₂ → H₂O. There are 2 oxygen atoms on the left but only 1 on the right. What do you predict fixes it?"
  options: ["Write H₂O₂ instead of H₂O", "Put a 2 in front of H₂O, then a 2 in front of H₂", "Take one oxygen atom away", "Nothing: equations don't need to match"]
  actual: "2 H₂ + O₂ → 2 H₂O. Only the numbers in front (coefficients) may change. H₂O₂ is hydrogen peroxide, a different substance, and atoms can't be taken away."
```

## Explore: balance it

```step
stage: run
insight: "Seeing whole molecules appear and the tally change with each coefficient makes balancing a count of real atoms, not a number puzzle."
try: { playground: board, starter: "boards.yml#water", height: 720 }
check: { type: board, text: "Balance the equation with the smallest whole numbers.", when: "l = 1" }
```

Use **+** and **−** to change how many of each molecule there are. Watch the drawing and the atom tally: balanced means every row says "same".

## Explain: why only the coefficients

```step
stage: investigate
insight: "Rejecting the subscript change and linking the tally to conservation of mass makes balancing a scientific constraint, not a rule."
tasks:
  - check:
      type: question
      q: "Why can't you balance it by changing H₂O to H₂O₂?"
      options: ["H₂O₂ is a different substance (hydrogen peroxide), not water", "You can: it balances the oxygen", "H₂O₂ has too many atoms to draw"]
      answer: 0
      feedback: [null, "It balances the count but describes the wrong product.", "The size isn't the problem: the substance is."]
      explain: "The small numbers (subscripts) say what the substance is. Coefficients say how many molecules there are, which is the only thing you can choose."
  - check:
      type: number
      q: "How many hydrogen atoms are in 2 H₂O?"
      answer: 4
      explain: "Each H₂O has 2 hydrogen atoms; two of them have 4."
  - check:
      type: number
      q: "In CH₄ + 2 O₂ → CO₂ + 2 H₂O, how many oxygen atoms are on the products side?"
      answer: 4
      explain: "CO₂ has 2 oxygen atoms; 2 H₂O have 2 more: 4 in all, matching 2 O₂ on the left."
  - check:
      type: question
      q: "Why does a balanced equation show that mass is conserved?"
      options: ["The same atoms are on both sides, and each atom keeps its mass", "The same molecules are on both sides", "Products always weigh more than reactants"]
      answer: 0
      feedback: [null, "The molecules change; the atoms don't.", "Mass doesn't change in a reaction; it can seem to in an open container if a gas escapes or enters."]
      explain: "Same atoms in, same atoms out, so the same total mass."
  - check: { type: reflect, text: "I can balance an equation by changing only coefficients, check it by counting atoms, and say why that shows conservation of mass." }
```

### Formulas are fixed

### Counting atoms

### Oxygen in methane

### Conservation of mass

### In your own words

In your book: balance H₂ + Cl₂ → HCl. Draw the molecules on each side and count the atoms of each element to show it balances.

## Practise: three more

```step
stage: practise
insight: "Balancing is a precision skill (practise here): three equations with different starting moves build fluency with the same check each time."
try: { playground: board, starter: "boards.yml#methane", height: 720 }
tasks:
  - starter: "boards.yml#methane"
    check: { type: board, text: "Balance the burning of methane: CH₄ + O₂ → CO₂ + H₂O.", when: "l = 1" }
  - starter: "boards.yml#ammonia"
    check: { type: board, text: "Balance the making of ammonia: N₂ + H₂ → NH₃.", when: "l = 1" }
  - starter: "boards.yml#magnesium"
    check: { type: board, text: "Balance magnesium burning: Mg + O₂ → MgO.", when: "l = 1" }
```

### Methane

Start with the atom that appears in only one substance on each side.

### Ammonia

### Magnesium

## Elaborate: the heavier ash

```step
stage: modify
tier: wider
insight: "An open-system result that seems to break conservation of mass is explained by the balanced equation: oxygen came in from the air."
check:
  type: question
  q: "Magnesium ribbon burns in an open crucible, and the white ash weighs more than the ribbon did. Has mass been created?"
  options: ["No: oxygen atoms from the air joined the magnesium (2 Mg + O₂ → 2 MgO), so the product includes their mass", "Yes: burning makes extra mass", "No: the scale must be wrong"]
  answer: 0
  feedback: [null, "Count the atoms in the balanced equation: where did the oxygen come from?", "The result is real and repeatable; something entered the container."]
  explain: "In an open system, gases can enter or leave. Weigh everything, including the oxygen used, and the mass is the same before and after."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about balancing H₂ + O₂ → H₂O with what the board showed." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A **balanced equation** has the same number of each kind of atom on both sides.
- Balance by changing **coefficients** (the numbers in front). Never change **subscripts**: they define the substance.
- Use the smallest whole numbers, and check by counting atoms of each element.
- A balanced equation shows **conservation of mass**: the same atoms, so the same mass.
