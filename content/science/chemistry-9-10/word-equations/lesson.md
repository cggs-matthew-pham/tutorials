---
order: 6
node: [AC9S9U07 n1, AC9S9U07 n3]
assumes: [AC9S9U07 n2]   # word equations do not need the atom model; Where do the atoms go? (n2) comes next, on purpose
unit: equations
title: What goes in, what comes out?
summary: "In a chemical reaction the reactants are used up and new substances, the products, are made. A word equation names them: reactants → products. It must include every product (burning a fuel makes water as well as carbon dioxide), but it shows no amounts or atoms."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8264
  url: http://127.0.0.1:8264/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Methane and oxygen (the reactants) reacting to make carbon dioxide and water (the products)." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Reactants and products"
  say: "Reactants are used up; products are the new substances made."
  clip:
    - caption: { text: "The reactants: methane and oxygen.", say: "The reactants are methane and oxygen." }
    - wait: 2600
    - caption: { text: "They are used up. New substances appear: carbon dioxide and water, the products.", say: "They are used up, and new substances appear: carbon dioxide and water." }
    - wait: 4200
    - caption: { text: "Word equation: methane + oxygen → carbon dioxide + water.", say: "The word equation: methane plus oxygen gives carbon dioxide plus water." }
    - wait: 1500
hook: "A gas stove burns methane with a blue flame. Hold a cold spoon above it and drops of water appear. Where did the water come from?"
---
You know the signs of a chemical change: a new substance is made. This lesson names what goes in and what comes out.

## Engage: burning methane

```step
stage: predict
insight: "The common error at this node is leaving out a product, usually water from burning; the distractors drop water, drop oxygen, or name things that are not substances."
check:
  type: predict
  q: "Methane (natural gas) burns in air. Which word equation names everything that goes in and comes out?"
  options: ["methane + oxygen → carbon dioxide + water", "methane + oxygen → carbon dioxide", "methane → carbon dioxide + water", "methane + oxygen → smoke + heat"]
  actual: "methane + oxygen → carbon dioxide + water. Methane contains carbon and hydrogen: the carbon ends up in carbon dioxide and the hydrogen in water (the drops on the cold spoon). Oxygen from the air is a reactant too. Heat is energy given out, not a substance, so it is not in the equation."
```

## Explore: watch the reaction

```step
stage: run
insight: "Watching the reactant counts fall and the product counts rise makes 'used up' and 'made' concrete before the words are named."
try: { playground: science, starter: "boards.yml#burn", height: 580 }
check: { type: board, text: "Burn the methane until the target is reached.", expect: { done: true } }
```

Watch the counts beside the board. Which substances go down? Which new ones appear?

## Explain: reactants and products

```step
stage: investigate
insight: "Naming reactants and products, tying products to new properties and the signs of a reaction, and saying what a word equation leaves out sets up symbolic equations."
tasks:
  - check:
      type: sort
      q: "methane + oxygen → carbon dioxide + water. Reactant or product?"
      options: ["Reactant", "Product"]
      items:
        - ["methane", "Reactant"]
        - ["oxygen", "Reactant", "Oxygen from the air takes part, even though you can't see it."]
        - ["carbon dioxide", "Product"]
        - ["water", "Product", "The hydrogen in methane ends up in water."]
  - check:
      type: question
      q: "What does the arrow in a word equation mean?"
      options: ["Reacts to make", "Equals: the two sides are the same substances", "Is mixed with"]
      answer: 0
      feedback: [null, "The products are new substances, different from the reactants.", "Mixing is a physical change; the arrow shows a reaction."]
      explain: "Reactants → products: read the arrow as 'react to make'."
  - check:
      type: question
      q: "Why are carbon dioxide and water counted as new substances, and not just methane and oxygen in a new shape?"
      options: ["They have different properties: methane burns and water puts fires out", "They are heavier", "They are gases"]
      answer: 0
      feedback: [null, "Mass is conserved overall; that is not what makes them new.", "Methane and oxygen are gases too."]
      explain: "A product is a new substance with its own properties. The atoms are the same; how they are joined is different (next lesson)."
  - check:
      type: sort
      q: "Is it a sign that a chemical reaction has made a new product?"
      options: ["Sign of a reaction", "Not on its own"]
      items:
        - ["Bubbles of a new gas", "Sign of a reaction"]
        - ["A colour change in a mixture", "Sign of a reaction"]
        - ["A solid forming when two clear solutions mix", "Sign of a reaction"]
        - ["Ice melting into water", "Not on its own", "Still water: a change of state, not a new substance."]
        - ["Sugar disappearing in tea", "Not on its own", "Dissolving: the sugar is still there."]
  - check:
      type: question
      q: "What does a word equation NOT tell you?"
      options: ["How many particles of each substance react, or which atoms they contain", "Which substances react", "Which substances are made"]
      answer: 0
      feedback: [null, "It names the reactants.", "It names the products."]
      explain: "Word equations name the substances only. Formulas and balanced equations (two lessons on) show the atoms and amounts."
  - check: { type: reflect, text: "I can name the reactants and products of a reaction and say what a word equation shows and does not show." }
```

### Reactants and products

### The arrow

### New substances

### Signs of a reaction

### What it leaves out

### In your own words

In your book: write the word equation for burning methane, label the reactants and products, and add one sentence on what the equation does not show.

## Practise: word equations

```step
stage: practise
insight: "Word equations need fluency (practise here): the same check each time, does it name every reactant and every product, across burning, neutralisation, displacement and acid with a carbonate."
tasks:
  - check:
      type: question
      q: "Magnesium burns in oxygen with a bright white flame, leaving white magnesium oxide."
      options: ["magnesium + oxygen → magnesium oxide", "magnesium → magnesium oxide", "magnesium oxide → magnesium + oxygen", "magnesium + oxygen → light"]
      answer: 0
      feedback: [null, "Where did the oxide's oxygen come from? Oxygen is a reactant.", "That is the reaction backwards.", "Light is energy, not a substance."]
      explain: "magnesium + oxygen → magnesium oxide."
  - check:
      type: question
      q: "Hydrochloric acid neutralises sodium hydroxide, making salt (sodium chloride) and water."
      options: ["hydrochloric acid + sodium hydroxide → sodium chloride + water", "hydrochloric acid + sodium hydroxide → sodium chloride", "hydrochloric acid + sodium hydroxide → water", "sodium chloride + water → hydrochloric acid + sodium hydroxide"]
      answer: 0
      feedback: [null, "An acid and a base make a salt and water: water is missing.", "The salt is missing.", "That is backwards."]
      explain: "acid + base → salt + water."
  - check:
      type: question
      q: "A zinc strip is put in blue copper sulfate solution. Copper forms on the zinc, and zinc sulfate is left in solution."
      options: ["zinc + copper sulfate → zinc sulfate + copper", "zinc + copper sulfate → copper", "zinc sulfate + copper → zinc + copper sulfate", "zinc + copper → zinc sulfate"]
      answer: 0
      feedback: [null, "Where did the sulfate go? Zinc sulfate is a product too.", "That is backwards.", "Copper sulfate is the reactant, not copper."]
      explain: "Zinc takes the place of copper: zinc + copper sulfate → zinc sulfate + copper."
  - check:
      type: question
      q: "Hydrochloric acid is added to marble chips (calcium carbonate). It fizzes. The products are calcium chloride, water and carbon dioxide."
      options: ["calcium carbonate + hydrochloric acid → calcium chloride + water + carbon dioxide", "calcium carbonate + hydrochloric acid → carbon dioxide", "calcium carbonate + hydrochloric acid → calcium chloride + carbon dioxide", "calcium carbonate → calcium chloride + water + carbon dioxide"]
      answer: 0
      feedback: [null, "The fizz is only one product; there are three.", "Water is missing.", "The acid is a reactant too."]
      explain: "Acid + carbonate → salt + water + carbon dioxide (the fizz)."
```

### Magnesium

### Neutralisation

### Displacement

### Fizzing marble

## Elaborate: magnesium burning

```step
stage: modify
tier: typical
insight: "A second reaction on the board, with a metal and a single product, checks that students can name reactants and products from what they see."
try: { playground: science, starter: "boards.yml#magnesium", height: 580 }
tasks:
  - check: { type: board, text: "Burn the magnesium until the target is reached.", expect: { done: true } }
  - check:
      type: question
      q: "The white ash after burning magnesium is heavier than the magnesium ribbon was. Why?"
      options: ["Oxygen from the air joined the magnesium to make magnesium oxide", "Burning makes new atoms", "The ash soaks up water"]
      answer: 0
      feedback: [null, "Atoms are never made in a reaction.", "The extra mass is oxygen, a reactant."]
      explain: "The word equation shows it: magnesium + oxygen → magnesium oxide. The product contains the oxygen as well."
```

### Magnesium oxide

### The heavier ash

## Elaborate: why sodium hides

```step
stage: modify
tier: wider
insight: "Reactive elements are found in nature as products of reactions, which explains why ores and salts, not pure metals, are what we mine."
try: { playground: science, starter: "boards.yml#sodium", height: 580 }
tasks:
  - check: { type: board, text: "React sodium with chlorine until the target is reached.", expect: { done: true } }
  - check:
      type: question
      q: "Sodium is never found as a pure metal in nature, but there is plenty of sodium chloride in seawater. Why?"
      options: ["Sodium reacts so readily that any sodium has long since reacted, leaving it in compounds", "Sodium dissolves in seawater as a metal", "Sodium is a rare element"]
      answer: 0
      feedback: [null, "Sodium metal reacts with water; it doesn't stay as a metal.", "Sodium is one of the commonest elements on Earth, but always in compounds."]
      explain: "Reactive elements end up as products. Getting sodium (or iron, or aluminium) back as the element takes another reaction, and usually a lot of energy."
```

### Sodium chloride

### Sodium in nature

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about burning methane with the board." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- In a chemical reaction the **reactants** are used up and new substances, the **products**, are made. Products have different properties.
- A **word equation** names them: reactants → products. Read the arrow as "react to make".
- Include every reactant and product: burning a fuel that contains hydrogen makes water as well as carbon dioxide; oxygen from the air is a reactant.
- Heat and light are energy, not substances, so they are not in the equation.
- A word equation shows no amounts and no atoms: formulas and balanced equations do.
