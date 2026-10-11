---
order: 5
node: AC9S9U06 n5
unit: atoms
title: From uranium to lead
summary: "An unstable nucleus often decays into another unstable one, and a decay chain ends only when a stable nucleus is reached. Each alpha decay lowers the atomic number by 2 and the mass number by 4; each beta decay raises the atomic number by 1 and leaves the mass number alone. Uranium-238 reaches stable lead-206 after eight alpha and six beta decays."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8295
  url: http://127.0.0.1:8295/index.html
  readySelector: "#gpanel"
  layout: full
hook: "A grain of uranium doesn't decay once. It sets off a chain of fourteen steps, passing through radon, a gas that seeps into some basements, and ends as lead. How can you follow it?"
---
You know alpha and beta decay and half-life. Now put them in a row.

## Engage: where does it end?

```step
stage: predict
insight: "Students expect decay to end after one step. The node's point is that each step often leaves another unstable nucleus, so the chain continues until the nucleus is stable: alpha decays shrink it, beta decays fix its balance of neutrons and protons."
check:
  type: predict
  q: "A uranium-238 nucleus decays by emitting an alpha particle. What is the new nucleus like?"
  options: ["Thorium-234, which is also unstable and decays again", "Stable lead straight away", "The same uranium, only lighter", "A pile of loose protons"]
  actual: "Thorium-234 (atomic number 90, mass number 234), which is unstable too. The chain carries on through a series of alpha and beta decays until a stable nucleus, lead-206, is reached."
```

## Explore: follow the chain

```step
stage: run
insight: "Choosing alpha or beta at each step from the atomic and mass numbers, and watching the nucleus change element, makes the bookkeeping rule something students use, not recite."
try: { playground: board, starter: "boards.yml#radon", height: 660 }
tasks:
  - starter: "boards.yml#radon"
    check: { type: board, text: "Radon-222 is unstable. Decay it step by step until the isotope is stable.", when: "s = 1" }
  - starter: "boards.yml#uranium"
    check: { type: board, text: "Start from uranium-238 and follow the chain to the end. It has eight alpha decays and six beta decays.", when: "s = 1 and x = 8 and y = 6" }
```

### Radon to lead

Use Alpha decay or Beta decay at each step. The board tells you whether that is how the isotope really decays.

### The long chain

Each step changes the atomic number and the mass number. Keep an eye on both.

## Explain: tracking numbers

```step
stage: investigate
insight: "Applying the two rules to one step, to a whole chain and then to the question of why it stops covers the three success criteria."
tasks:
  - check:
      type: number
      q: "Uranium-238 has atomic number 92. After one alpha decay, what is the new atomic number?"
      answer: 90
      explain: "An alpha particle carries away 2 protons, so 92 − 2 = 90 (thorium)."
  - check:
      type: number
      q: "And the new mass number, after the alpha decay from mass number 238?"
      answer: 234
      explain: "An alpha particle has 4 particles (2 protons and 2 neutrons), so 238 − 4 = 234."
  - check:
      type: number
      q: "Thorium-234 (atomic number 90) then decays by beta emission. What is the new atomic number?"
      answer: 91
      explain: "A neutron becomes a proton, so the atomic number goes up by 1: 91 (protactinium). The mass number stays at 234."
  - check:
      type: number
      q: "Uranium-238 ends as lead-206. By how much does the mass number fall in total?"
      answer: 32
      explain: "238 − 206 = 32."
  - check:
      type: number
      q: "Only alpha decays change the mass number, by 4 each time. How many alpha decays are in the chain?"
      answer: 8
      explain: "32 ÷ 4 = 8 alpha decays. They lower the atomic number by 16, from 92 to 76; beta decays raise it back to 82."
  - check:
      type: question
      q: "Why does the chain stop at lead-206?"
      options: ["Its nucleus has a stable balance of protons and neutrons, so it doesn't decay", "It has run out of energy", "It has become too small"]
      answer: 0
      feedback: [null, "Decay doesn't stop because energy runs out: lead-206's nucleus is stable, so it has no reason to decay.", "Getting smaller is part of the chain, but decay stops only when the mix of protons and neutrons is stable."]
      explain: "Uranium-238's nucleus is too big, with too many neutrons, to last. Alpha decays make it smaller; beta decays turn spare neutrons into protons. When it reaches a mix of protons and neutrons that lasts, nothing more happens."
  - check: { type: reflect, text: "I can follow a decay chain, track the atomic and mass numbers at each step, and say why it ends." }
```

### Atomic number

### Mass number

### Beta step

### Total fall

### Alpha count

### Why it stops

### In your own words

In your book: write the first four steps of the uranium-238 chain as nuclei, for example ²³⁸U → ²³⁴Th + α. Show the atomic and mass number after each step.

## Elaborate: radon in the home

```step
stage: modify
tier: typical
insight: "Radon is the best-known step in the chain, because it is a gas and shows why the order of the steps matters in the real world."
check:
  type: question
  q: "Radon-222 is a gas made in the uranium chain, and it seeps up from rock into some buildings. Why is it of more concern than the solid isotopes before it?"
  options: ["As a gas it can be breathed in, and it decays to more radioactive solids inside the lungs", "It is hotter", "It has a longer half-life than uranium"]
  answer: 0
  feedback: [null, "Temperature isn't the issue.", "Its half-life is under four days, far shorter than uranium's."]
  explain: "The earlier solids stay in the rock. A gas gets out and can be breathed in, so its later decay products are released next to lung tissue. Good ventilation helps."
```

## Elaborate: missing mass

```step
stage: modify
tier: wider
insight: "The energy released in decay links to mass, which is the idea behind nuclear power."
check:
  type: question
  q: "The total mass of the products of a decay is slightly less than the mass of the original nucleus. What does physics say happened to the 'missing' mass?"
  options: ["It became the energy carried away by the radiation (E = mc²)", "It was destroyed", "It left as a gas"]
  answer: 0
  feedback: [null, "Neither mass nor energy is destroyed: one turns into the other.", "A gas would have mass we could weigh."]
  explain: "A tiny amount of mass becomes a large amount of energy, which is why a small amount of radioactive material releases so much energy."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the first decay with what the chain looks like." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A **decay chain** is a series of decays that ends only at a **stable** nucleus.
- **Alpha** decay: atomic number −2, mass number −4. **Beta** decay: atomic number +1, mass number unchanged.
- Uranium-238 ends as lead-206 after **8 alpha** and **6 beta** decays.
- Alpha decays make the nucleus smaller and beta decays fix its balance of neutrons to protons, until it is stable.
