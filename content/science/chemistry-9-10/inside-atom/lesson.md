---
order: 1
node: AC9S9U06 n1
unit: atoms
title: What's inside an atom?
summary: An atom has a tiny, dense nucleus of protons and neutrons, with electrons in shells around it. The number of protons (the atomic number) decides the element; protons plus neutrons give the mass number.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8256
  url: http://127.0.0.1:8256/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Carbon-12 as a Bohr model: 6 protons and 6 neutrons in the nucleus, 6 electrons in shells (not to scale)." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Inside an atom"
  say: "Protons decide the element; protons plus neutrons give the mass."
  clip:
    - caption: { text: "Carbon: 6 protons and 6 neutrons in the nucleus, 6 electrons around it.", say: "Carbon has six protons and six neutrons in its nucleus, and six electrons." }
    - wait: 3600
    - click: { selector: "[aria-label=\"Protons: more\"]" }
    - caption: { text: "Add one proton: now it is nitrogen. The protons decide the element.", say: "Add one proton and it becomes nitrogen: the protons decide the element." }
    - wait: 3300
    - click: { selector: "[aria-label=\"Protons: less\"]" }
    - click: { selector: "[aria-label=\"Neutrons: more\"]" }
    - caption: { text: "Add a neutron instead: still carbon, but heavier. Carbon-13.", say: "Add a neutron instead: still carbon, but heavier. Carbon thirteen." }
    - wait: 1500
    - caption: { text: "Nearly all the mass is in the tiny nucleus.", say: "Nearly all the mass is in the tiny nucleus." }
    - wait: 800
hook: "If an atom were the size of a football stadium, its nucleus would be a marble on the centre spot. Yet that marble holds nearly all the mass."
---
In Year 7 the particles in the particle model had no parts. This lesson opens one up.

## Engage: counting the parts

```step
stage: predict
insight: "Asking for neutrons from the atomic and mass numbers tests the new move before students meet it; wrong options are the usual slips (mass number taken as neutrons, or added to the atomic number)."
check:
  type: predict
  q: "A carbon atom has atomic number 6 and mass number 12. How many neutrons does it have?"
  options: ["6", "12", "18", "None: the mass is all protons"]
  actual: "6. The mass number counts protons plus neutrons, and the atomic number counts protons, so 12 − 6 = 6 neutrons. A neutral carbon atom also has 6 electrons."
```

## Explore: build carbon-12

```step
stage: run
insight: "Building the atom particle by particle makes the atomic number, mass number and charge things students can count, not definitions to recite."
try: { playground: board, starter: "boards.yml#carbon", height: 720 }
check: { type: board, text: "Build carbon-12: a neutral atom.", when: "t = 1" }
```

Use **+** and **−** for protons, neutrons and electrons. The board names the element from the protons, and adds up the mass number and the charge. Red: protons. Grey: neutrons. Blue: electrons.

## Explain: protons, neutrons, electrons

```step
stage: investigate
insight: "Separating what each particle contributes (identity, mass, charge) and tying the nucleus to evidence is the hinge for isotopes and decay."
tasks:
  - check:
      type: question
      q: "Where is nearly all of an atom's mass?"
      options: ["In the nucleus: protons and neutrons have mass 1 each, an electron about 1/1840", "Spread evenly through the atom", "In the electrons, because they fill most of the space"]
      answer: 0
      feedback: [null, "The nucleus is tiny but dense; the rest is mostly empty space.", "Electrons take up the space but have almost no mass."]
      explain: "Protons and neutrons each have a relative mass of 1; an electron about 1/1840. So the nucleus, a tiny fraction of the atom's size, holds nearly all its mass."
  - check:
      type: sort
      q: "Proton, neutron or electron?"
      options: ["Proton", "Neutron", "Electron"]
      items:
        - ["Charge +1", "Proton"]
        - ["No charge", "Neutron"]
        - ["Charge −1", "Electron"]
        - ["Mass about 1/1840 of a proton", "Electron"]
        - ["In the nucleus; its number decides the element", "Proton", "Change the protons and you change the element."]
        - ["In the nucleus; changing its number changes the mass, not the element", "Neutron"]
        - ["In shells around the nucleus", "Electron"]
  - check:
      type: number
      q: "Sodium has atomic number 11 and mass number 23. How many neutrons does a sodium atom have?"
      answer: 12
      explain: "Mass number minus atomic number: 23 − 11 = 12 neutrons."
  - check:
      type: number
      q: "How many electrons does a neutral sodium atom have?"
      answer: 11
      explain: "Neutral means no overall charge: as many electrons (−) as protons (+), so 11."
  - check:
      type: question
      q: "Rutherford fired alpha particles at thin gold foil. Most went straight through, but a few bounced back. What did that show?"
      options: ["An atom is mostly empty space, with a tiny, dense, positive nucleus", "Atoms are solid balls", "The positive charge is spread evenly through the atom"]
      answer: 0
      feedback: [null, "Solid balls would stop most of them.", "That was the earlier 'plum pudding' model; it could not bounce any back."]
      explain: "Only a tiny, dense, positive centre could turn a few alpha particles right round while letting most pass. The model of the atom changed because of this evidence."
  - check: { type: reflect, text: "I can describe the nuclear atom and use the atomic and mass numbers to count its protons, neutrons and electrons." }
```

### Where the mass is

### Three particles

### Neutrons

### Electrons

### The evidence

### In your own words

In your book: draw a carbon-12 atom and label the nucleus, protons, neutrons and electrons. Under it, explain how you got each number from "atomic number 6, mass number 12".

## Elaborate: chlorine

```step
stage: modify
tier: typical
insight: "A bigger atom with an odd mass number checks the counting rule without the symmetry of carbon (6, 6, 6)."
try: { playground: board, starter: "boards.yml#chlorine", height: 720 }
tasks:
  - check: { type: board, text: "Build chlorine-35 (atomic number 17).", when: "t = 1" }
  - check:
      type: question
      q: "You add one proton to a chlorine atom. What is it now?"
      options: ["Argon: a different element", "Still chlorine, just heavier", "A chlorine ion"]
      answer: 0
      feedback: [null, "That would be adding a neutron.", "Ions have a different number of electrons, not protons."]
      explain: "The atomic number (protons) decides the element: 18 protons is argon."
```

### Chlorine-35

### One more proton

## Elaborate: an ion

```step
stage: modify
tier: wider
insight: "Changing only electrons shows charge comes from the electron count while the element stays the same, ready for ions in bonding."
try: { playground: board, starter: "boards.yml#ion", height: 720 }
tasks:
  - check: { type: board, text: "Make a sodium ion with a charge of +1.", when: "t = 1" }
  - check:
      type: question
      q: "How did you give sodium a charge of +1?"
      options: ["Took away one electron, so there is one more proton than electrons", "Added a proton", "Added a neutron"]
      answer: 0
      feedback: [null, "That makes a different element.", "Neutrons have no charge."]
      explain: "Losing an electron leaves 11 protons (+11) and 10 electrons (−10): a charge of +1. It is still sodium."
```

### A sodium ion

### Where the charge came from

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about carbon's neutrons with the atom I built." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- An atom has a tiny, dense **nucleus** of **protons** (charge +1, mass 1) and **neutrons** (no charge, mass 1), with **electrons** (charge −1, mass about 1/1840) in **shells** around it.
- **Atomic number** = protons; it decides the element. **Mass number** = protons + neutrons.
- A neutral atom has as many electrons as protons. An **ion** has gained or lost electrons.
- The nuclear model replaced earlier models because of evidence, such as Rutherford's gold foil experiment.
