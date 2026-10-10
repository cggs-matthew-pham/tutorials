---
order: 1
unit: atoms
title: What are particles made of?
summary: The particles of the particle model are atoms. Atoms come in different types, one type for each element, and atom type decides what element a substance is.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8242
  url: http://127.0.0.1:8242/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Air zoomed in: nitrogen and oxygen molecules (two atoms each), a single argon atom and carbon dioxide." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Atoms and elements"
  say: "The particles in the particle model are atoms, or atoms joined together."
  clip:
    - caption: { text: "Air, zoomed in: every particle is made of atoms.", say: "This is air, zoomed in: every particle is made of atoms." }
    - wait: 3280
    - click: "Inspect next particle"
    - caption: { text: "Two nitrogen atoms joined: one element, nitrogen.", say: "Two nitrogen atoms are joined: one element, nitrogen." }
    - wait: 2290
    - click: "Inspect next particle"
    - wait: 1200
    - click: "Inspect next particle"
    - caption: { text: "Oxygen, argon: different elements. There are about 118 types of atom.", say: "Oxygen and argon are other elements; there are about a hundred and eighteen." }
    - wait: 800
hook: "Water, oxygen and carbon dioxide are all made of particles. So why is one a drink, one keeps you alive, and one puts out fires?"
---
In Year 7 every particle was just "a particle". This lesson gives them an identity.

## Engage: are all particles the same?

```step
stage: predict
insight: "Students carrying the Year 7 picture of identical particles will say yes; the board shows particles built from different atoms."
check:
  type: predict
  q: "Air is a mixture of gases. If you could zoom in far enough, what would you see?"
  options: ["Identical particles, because it's all air", "Particles of different kinds, built from smaller pieces of different types", "One continuous substance with no particles", "Particles floating in a little bit of air"]
  actual: "Particles of different kinds. Each is built from atoms, and the atoms come in different types: nitrogen, oxygen, argon, carbon, hydrogen."
```

Decide before you look.

## Explore: zoom into air

```step
stage: run
insight: "Inspecting each kind of particle in air makes 'particles have type' visible before it is named."
try: { playground: science, starter: "boards.yml#air", height: 560 }
check: { type: board, text: "Inspect every kind of particle in the air.", expect: { done: true } }
```

Click a particle (or press **Inspect next particle**) to see what it is made of. Find every kind. Notice the coloured balls: each colour is one **type of atom**.

## Explain: atoms and elements

```step
stage: investigate
insight: "Naming the upgrade explicitly (the particles you know are atoms, and atoms have type) is the hinge: elements and compounds both depend on it."
tasks:
  - check:
      type: question
      q: "In the Year 7 particle model, everything is made of particles. What are those particles made of?"
      options: ["Atoms", "Cells", "Smaller bits of the same substance, all the way down", "Air"]
      answer: 0
      feedback: [null, "Cells are in living things, and cells are themselves made of atoms.", "Break a substance into smaller and smaller bits and you reach atoms; there is nothing smaller of the same substance.", "Air is itself made of particles, and between particles there is nothing at all."]
      explain: "Every particle is an atom, or atoms joined together."
  - check:
      type: question
      q: "What makes oxygen a different element from nitrogen?"
      options: ["Its atoms are a different type", "It has more atoms", "Its atoms are bigger", "It is a different colour"]
      answer: 0
      feedback: [null, "A big sample of nitrogen has more atoms than a small sample of oxygen, and it is still nitrogen.", "Size differs a little between atom types, but type is what matters: every oxygen atom is the same type.", "Oxygen and nitrogen are both colourless. The colours on the board are only a code."]
      explain: "There are about 118 types of atom, one for each element. Atom type decides the element."
  - check:
      type: sort
      q: "True or false?"
      options: ["True", "False"]
      items:
        - ["All the atoms in a sample of pure oxygen are the same type", "True"]
        - ["An element is made of only one type of atom", "True"]
        - ["There are about 118 types of atom", "True"]
        - ["An oxygen atom in water is a different type from an oxygen atom in air", "False", "An oxygen atom is an oxygen atom, wherever it is."]
        - ["Atoms are coloured like the balls on the board", "False", "Atoms have no colour. The colours are a code."]
        - ["Atoms are the smallest piece of an element that is still that element", "True"]
  - check: { type: reflect, text: "I explained, in my own words, how the particles from Year 7 are connected to atoms and elements." }
```

### Particles are atoms

### Atom type

### Check your ideas

### In your own words

In your book, finish this sentence in two or three lines: "The particles in the particle model are… Different elements are different because…"

## Elaborate: which gases are elements?

```step
stage: modify
tier: typical
insight: "Single atoms and two-atom molecules can both be elements: the test is one atom type, not one atom."
try: { playground: science, starter: "boards.yml#noble", height: 520 }
tasks:
  - check: { type: board, text: "Inspect all four gases.", expect: { done: true } }
  - check:
      type: sort
      q: "How is each element's particle made?"
      options: ["Single atoms", "Two atoms of the same type joined"]
      items:
        - ["Helium", "Single atoms"]
        - ["Neon", "Single atoms"]
        - ["Oxygen", "Two atoms of the same type joined"]
        - ["Nitrogen", "Two atoms of the same type joined"]
  - check:
      type: question
      q: "An oxygen particle (O₂) has two atoms. Is oxygen still an element?"
      options: ["Yes: both atoms are the same type", "No: two atoms joined make a compound"]
      answer: 0
      feedback: [null, "A compound needs different atom types joined. Both of these are oxygen."]
      explain: "One type of atom means an element, however many atoms are in each particle."
```

### Inspect the gases

### Single atoms or joined?

### One type, two atoms

## Elaborate: how the idea of atoms grew

```step
stage: modify
tier: wider
insight: "Ordering the models shows the atom as a model refined by evidence, which prepares Year 9 (atoms have parts inside)."
check:
  type: parsons
  code: "models.txt#history"
  text: "Put the ideas about matter in the order they were proposed, earliest first."
  explain: "Democritus (about 400 BCE): atoms as an idea without evidence. Aristotle (about 350 BCE): his four elements won for 2000 years. Boyle (1661): elements defined by experiment. Dalton (1808): atoms explain why elements combine in fixed ratios. In Year 9 the model changes again: atoms have smaller parts inside."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first prediction with what I saw and can say what changed in my thinking." }
```

What did you think air was made of? Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- The particles in the particle model are **atoms** (or atoms joined together).
- There are about 118 **types of atom**, one for each **element**.
- All atoms of one element are the same type. **Atom type decides the element.**
- An element can be single atoms (helium) or atoms of one type joined (oxygen, O₂).
