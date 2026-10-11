---
order: 14
node: [AC9S10U07 n1, AC9S10U07 n2, AC9S10U07 n3, AC9S10U07 n4]
unit: rates
title: What kind of reaction is it?
summary: "Many reactions follow one of three patterns. Synthesis: two substances join into one (A + B → AB). Decomposition: one substance breaks into simpler ones (AB → A + B). Displacement: a more reactive element takes the place of a less reactive one (A + BC → AC + B). Spotting the pattern lets you predict the products."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8278
  url: http://127.0.0.1:8278/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Zinc and copper oxide: zinc, the more reactive metal, takes the oxygen and leaves copper behind. A displacement reaction." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Three kinds of reaction"
  say: "Join together, break apart, or swap places: three patterns of reaction."
  clip:
    - caption: { text: "Zinc atoms and copper oxide particles.", say: "Zinc atoms, and copper oxide particles." }
    - wait: 2400
    - caption: { text: "Zinc is more reactive than copper, so it takes the oxygen: zinc oxide.", say: "Zinc is more reactive than copper, so it takes the oxygen." }
    - wait: 3600
    - caption: { text: "Copper is left on its own. One element has displaced another.", say: "Copper is left on its own: displaced by the zinc." }
    - wait: 3400
    - caption: { text: "Joining is synthesis; breaking apart is decomposition; swapping is displacement.", say: "Joining is synthesis, breaking apart is decomposition, swapping is displacement." }
    - wait: 800
hook: "Drop an iron nail into blue copper sulfate solution and it comes out coated in copper, while the blue slowly fades. Iron has pushed copper out of its compound."
---
You can balance equations and follow atoms through a reaction. This lesson sorts reactions into patterns.

## Engage: the iron nail

```step
stage: predict
insight: "Students who think nothing happens, or that the metals simply mix, haven't met reactivity; the displacement pattern is the new idea."
check:
  type: predict
  q: "An iron nail is put in copper sulfate solution. Iron is more reactive than copper. What happens?"
  options: ["Iron takes copper's place: iron sulfate forms and copper coats the nail", "Nothing: metals don't react with solutions", "The copper sulfate turns into iron", "The iron and copper mix to make an alloy"]
  actual: "Iron takes copper's place: iron + copper sulfate → iron sulfate + copper. The more reactive metal displaces the less reactive one from its compound. That is a displacement reaction."
```

## Explore: three patterns

```step
stage: run
insight: "Watching one example of each pattern, with the atom tally, gives students the three shapes before they name them."
try: { playground: science, starter: "boards.yml#synthesis", height: 520 }
tasks:
  - starter: "boards.yml#synthesis"
    check: { type: board, text: "Run the synthesis until the target is reached. How many substances go in, and how many come out?", expect: { done: true } }
  - starter: "boards.yml#decomposition"
    check: { type: board, text: "Now the decomposition.", expect: { done: true } }
  - starter: "boards.yml#displacement"
    check: { type: board, text: "Now the displacement.", expect: { done: true } }
```

### Synthesis

Magnesium burning: two substances join into one.

### Decomposition

Hydrogen peroxide breaking down: one substance into two.

### Displacement

Zinc and copper oxide: one element swaps into a compound.

## Explain: spotting the pattern

```step
stage: investigate
insight: "Classifying unfamiliar equations by their shape, then predicting a product, is the node's 'patterns, not memorisation'."
tasks:
  - check:
      type: match
      q: "Match each pattern to its name."
      pairs:
        - ["A + B → AB", "Synthesis"]
        - ["AB → A + B", "Decomposition"]
        - ["A + BC → AC + B", "Displacement"]
      explain: "Join, break apart, swap."
  - check:
      type: sort
      q: "Which kind of reaction is it?"
      options: ["Synthesis", "Decomposition", "Displacement"]
      items:
        - ["iron + sulfur → iron sulfide", "Synthesis"]
        - ["2H₂ + O₂ → 2H₂O", "Synthesis"]
        - ["calcium carbonate → calcium oxide + carbon dioxide", "Decomposition", "Heating limestone to make lime."]
        - ["2H₂O → 2H₂ + O₂ (electricity passed through water)", "Decomposition"]
        - ["magnesium + copper sulfate → magnesium sulfate + copper", "Displacement"]
        - ["chlorine + sodium bromide → sodium chloride + bromine", "Displacement", "Non-metals can displace each other too."]
  - check:
      type: question
      q: "Zinc is more reactive than copper. What are the products of zinc + copper sulfate?"
      options: ["Zinc sulfate + copper", "Zinc copper sulfate", "No reaction", "Copper zinc + sulfate"]
      answer: 0
      feedback: [null, "A displacement swaps one element for another; it doesn't add it.", "Zinc is more reactive, so it does displace copper.", "Sulfate stays joined to a metal."]
      explain: "The more reactive metal (zinc) takes the less reactive one's place: zinc + copper sulfate → zinc sulfate + copper."
  - check:
      type: question
      q: "Copper is put into zinc sulfate solution. What happens?"
      options: ["Nothing: copper is less reactive, so it can't displace zinc", "Copper sulfate and zinc form", "The copper dissolves"]
      answer: 0
      feedback: [null, "Displacement only goes one way: more reactive replaces less reactive.", "Copper doesn't react with zinc sulfate."]
      explain: "Reactivity decides whether a displacement happens."
  - check: { type: reflect, text: "I can classify a reaction as synthesis, decomposition or displacement, and predict the products." }
```

### Three patterns

### Classify them

### Predict the products

### The other way round

### In your own words

In your book: write one example of each kind of reaction as a word equation, and draw the pattern underneath (A + B → AB and so on).

## Elaborate: the other way round

```step
stage: modify
tier: typical
insight: "Running the reverse displacement and seeing nothing happen makes reactivity the deciding factor, not a rule to memorise."
try: { playground: science, starter: "boards.yml#backwards", height: 520 }
check:
  type: question
  q: "On this board, copper is mixed with zinc oxide. Watch it for a while. Why does no reaction happen?"
  options: ["Copper is less reactive than zinc, so it can't take the oxygen from zinc", "The temperature is too low", "There isn't enough copper"]
  answer: 0
  feedback: [null, "Even heated strongly, copper won't take oxygen from zinc oxide.", "More copper wouldn't help."]
  explain: "A displacement goes only from more reactive to less reactive. The reactivity series (potassium, sodium, calcium, magnesium, aluminium, zinc, iron, copper, silver, gold) predicts which way."
```

## Elaborate: making useful things

```step
stage: modify
tier: wider
insight: "Two industrial reactions (iron from its ore, lime from limestone) connect reaction types to useful products."
tasks:
  - check:
      type: question
      q: "In a blast furnace, carbon takes oxygen from iron oxide: iron oxide + carbon → iron + carbon dioxide. Which kind of reaction is this, and why does it work?"
      options: ["Displacement: carbon is more reactive than iron, so it takes the oxygen", "Synthesis: iron and carbon join", "Decomposition: iron oxide breaks apart on its own"]
      answer: 0
      feedback: [null, "Iron ends up on its own, not joined to carbon.", "The carbon is needed to take the oxygen."]
      explain: "Metals less reactive than carbon (zinc, iron, copper) are extracted from their ores this way."
  - check:
      type: question
      q: "Builders heat limestone (calcium carbonate) to make lime (calcium oxide) for cement. Which kind of reaction is this?"
      options: ["Decomposition", "Synthesis", "Displacement"]
      answer: 0
      feedback: [null, "One substance becomes two.", "Nothing swaps places."]
      explain: "calcium carbonate → calcium oxide + carbon dioxide. Cement making releases a lot of carbon dioxide for this reason."
```

### Iron from rock

### Lime from limestone

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the iron nail with what displacement means." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Synthesis**: substances join into one (A + B → AB), such as magnesium burning.
- **Decomposition**: one substance breaks into simpler ones (AB → A + B), such as hydrogen peroxide → water + oxygen, often with heat or electricity.
- **Displacement**: a more reactive element takes a less reactive one's place (A + BC → AC + B). It doesn't happen the other way round.
- Spot the pattern to classify a reaction and predict its products.
