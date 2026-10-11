---
order: 2
node: AC9S9U06 n2
woven: [AC9S9I04]
unit: atoms
title: Same element, different atoms?
summary: "Isotopes are atoms of the same element (same number of protons) with different numbers of neutrons. They react in the same way but have different masses, and some are unstable: they are radioactive."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8261
  url: http://127.0.0.1:8261/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain-pic, caption: "Carbon-14: 6 protons and 8 neutrons. Two more neutrons than carbon-12, but still carbon." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Isotopes"
  say: "Same protons, same element. Different neutrons, different isotope."
  clip:
    - caption: { text: "Carbon-12: 6 protons and 6 neutrons. Stable.", say: "Carbon twelve: six protons, six neutrons, stable." }
    - wait: 2600
    - click: { selector: "[aria-label=\"Neutrons: more\"]" }
    - caption: { text: "One more neutron: carbon-13. Still carbon, still stable.", say: "One more neutron: carbon thirteen, still stable." }
    - wait: 2800
    - click: { selector: "[aria-label=\"Neutrons: more\"]" }
    - caption: { text: "Another: carbon-14. Still carbon, but unstable: it is radioactive.", say: "Another: carbon fourteen. Still carbon, but radioactive." }
    - wait: 3200
    - caption: { text: "Same protons, different neutrons: isotopes of one element.", say: "Same protons, different neutrons: isotopes of carbon." }
    - wait: 800
hook: "Every living thing contains a tiny amount of carbon that is slowly turning into nitrogen. That carbon is how scientists date bones and charcoal tens of thousands of years old."
---
The number of protons decides the element. This lesson asks what happens when only the neutrons change.

## Engage: two kinds of carbon

```step
stage: predict
insight: "Asking what differs between carbon-12 and carbon-14 tests whether students separate the protons (the element) from the neutrons (the mass); the distractors change the protons, the electrons or the element."
check:
  type: predict
  q: "Carbon-12 and carbon-14 both have 6 protons. What is different about a carbon-14 atom?"
  options: ["It has 2 more neutrons", "It has 2 more protons", "It has 2 more electrons", "It is a different element"]
  actual: "2 more neutrons. Both are carbon because both have 6 protons. The mass number counts protons and neutrons, so 14 − 6 = 8 neutrons, against 6 in carbon-12. Carbon-12 and carbon-14 are isotopes of carbon."
```

## Explore: make the carbon isotopes

```step
stage: run
insight: "Changing only the neutrons while the name stays 'Carbon' makes 'same element, different mass' something students see; the board's stable or radioactive line adds that isotopes can differ in stability."
try: { playground: board, starter: "boards.yml#carbon", height: 720 }
check: { type: board, text: "Keep 6 protons and make carbon-13 and carbon-14 as well.", when: "z = 6 and i >= 3" }
```

Use **+** and **−** for the neutrons and watch the name at the top, the mass number and the line that says whether the nucleus is stable. Try a few more neutrons, or fewer.

## Explain: isotopes

```step
stage: investigate
insight: "Sorting what is the same and what differs between two isotopes, and why the electrons stay the same, sets up both 'same chemistry' and 'different stability' for decay and half-life."
tasks:
  - check:
      type: question
      q: "What are isotopes?"
      options: ["Atoms of the same element with different numbers of neutrons", "Atoms of different elements with the same mass number", "Atoms that have gained or lost electrons"]
      answer: 0
      feedback: [null, "Different elements have different numbers of protons; isotopes share them.", "That is an ion."]
      explain: "Same protons (so the same element), different neutrons (so a different mass number)."
  - check:
      type: sort
      q: "Carbon-12 and carbon-14 atoms: same or different?"
      options: ["Same", "Different"]
      items:
        - ["Number of protons", "Same"]
        - ["Number of electrons (neutral atoms)", "Same"]
        - ["Number of neutrons", "Different"]
        - ["Mass number", "Different"]
        - ["How they react with oxygen", "Same", "Reactions depend on the electrons, and both have 6."]
        - ["Whether the nucleus is stable", "Different", "Carbon-12 is stable; carbon-14 is radioactive."]
  - check:
      type: number
      q: "Chlorine has two common isotopes, chlorine-35 and chlorine-37 (17 protons). How many neutrons are in chlorine-37?"
      answer: 20
      explain: "37 − 17 = 20 neutrons. Chlorine-35 has 18."
  - check:
      type: question
      q: "Why does carbon-14 burn in oxygen just like carbon-12?"
      options: ["Reactions depend on the electrons, and both have 6 arranged the same way", "The neutrons do the reacting", "It doesn't: carbon-14 does not burn"]
      answer: 0
      feedback: [null, "Neutrons sit in the nucleus and take no part in reactions.", "It burns the same way: only its nucleus is different."]
      explain: "Isotopes of an element have the same number of electrons, so they react in the same way. Only the nucleus differs."
  - check:
      type: question
      q: "Some isotopes are unstable. What does that mean?"
      options: ["The nucleus will decay, giving out radiation and often becoming a different element", "The atom will react violently with water", "The electrons keep leaving the atom"]
      answer: 0
      feedback: [null, "That is about reactions, which depend on electrons, not on the nucleus.", "Instability is about the nucleus, not the electrons."]
      explain: "An unstable (radioactive) nucleus has a mix of protons and neutrons that does not last. It decays, giving out radiation. Most elements have both stable and unstable isotopes."
  - check: { type: reflect, text: "I can say what isotopes are, what is the same and what is different about them, and use names like carbon-14." }
```

### What isotopes are

### Same or different

### Chlorine

### Same reactions

### Unstable isotopes

### In your own words

In your book: draw carbon-12 and carbon-14 side by side and label what is the same and what is different. Then write a sentence using the word "isotope".

## Elaborate: where carbon-14 comes from

```step
stage: modify
tier: typical
insight: "Making carbon-14 from nitrogen-14 shows that a nucleus can change into another element, ready for decay, and gives carbon-14 a real source."
try: { playground: board, starter: "boards.yml#nitrogen", height: 720 }
tasks:
  - check: { type: board, text: "High in the air, a neutron from space hits a nitrogen-14 nucleus. The nucleus takes in the neutron and a proton is knocked out. Make the carbon-14 that results (a neutral atom).", when: "t = 1" }
  - check:
      type: question
      q: "Plants take in carbon dioxide, including a little made with carbon-14. Animals eat the plants. Why does that matter for dating old bones?"
      options: ["Every living thing has the same small share of carbon-14; after death no new carbon-14 comes in, and what is there slowly decays", "Bones make carbon-14 after death", "Carbon-14 turns into carbon-12 as bones age"]
      answer: 0
      feedback: [null, "Nothing makes new carbon-14 inside a dead body.", "Carbon-14 decays into nitrogen-14 (beta decay), not carbon-12."]
      explain: "While alive, an animal or plant keeps topping up its carbon-14. After death the share falls steadily. Measuring how much is left tells how long ago it died (you will see how in the half-life lesson)."
```

### Making carbon-14

### Living things

## Elaborate: chlorine's mass of 35.5

```step
stage: modify
tier: wider
insight: "The relative atomic mass on the periodic table is an average over isotopes, which explains why it is not a whole number."
try: { playground: board, starter: "boards.yml#chlorine", height: 720 }
tasks:
  - check: { type: board, text: "Make chlorine-37.", when: "t = 1" }
  - check:
      type: number
      q: "About 3 in every 4 chlorine atoms are chlorine-35, and 1 in 4 is chlorine-37. What is the average mass number? (to 1 decimal place)"
      answer: 35.5
      tolerance: 0.05
      explain: "(3 × 35 + 1 × 37) ÷ 4 = 142 ÷ 4 = 35.5. That is why the periodic table gives chlorine a relative atomic mass of 35.5."
```

### Chlorine-37

### The average

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about carbon-14 with the isotopes I built." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Isotopes** are atoms of the same element (same number of protons) with different numbers of neutrons, so different mass numbers. We name them by mass number: carbon-12, carbon-13, carbon-14.
- Isotopes have the same number of electrons, so they react in the same way.
- Some isotopes are **stable**. Others are **unstable** (radioactive): their nuclei decay, giving out radiation.
- Carbon-14 is made in the air from nitrogen-14 and taken in by living things, which is why it can date things that were once alive.
