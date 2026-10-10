---
order: 7
unit: mixtures
title: Distillation and chromatography
summary: Distillation collects a liquid by boiling and condensing it; chromatography separates dissolved substances such as dyes. Explain each principle and when distillation beats evaporation.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8247
  url: http://127.0.0.1:8247/index.html
  readySelector: "#board svg"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Distillation"
  say: "Distillation separates by boiling point: the vapour is cooled and collected."
  clip:
    - caption: { text: "Seawater: water with dissolved salt.", say: "Seawater is water with dissolved salt." }
    - wait: 1630
    - click: "Heat the seawater"
    - wait: 2500
    - caption: { text: "The water boils off. The condenser cools the vapour back to liquid.", say: "The water boils off, and the condenser cools the vapour back to liquid." }
    - wait: 3000
    - caption: { text: "Pure water collects in the flask; the salt stays behind.", say: "Pure water collects in the flask, and the salt stays behind." }
    - wait: 800
hook: "Ships at sea make fresh water by boiling seawater and catching the steam. Forensic scientists find out which pen wrote a note by letting water creep up a strip of paper."
---
Two more techniques. Distillation uses the same property as evaporation (boiling point) but keeps the vapour. Chromatography separates substances that are **all** dissolved.

## Engage: fresh water from seawater

```step
stage: predict
insight: "Predicting the collected liquid sets up the key difference from evaporation: the vapour is kept."
check:
  type: predict
  q: "Seawater is heated in a flask. A tube carries the steam through a cold jacket into a second, empty flask. What collects in the second flask?"
  options: ["Fresh water", "Salty water", "Salt", "Nothing"]
  actual: "Fresh water. Only water particles boil off; the salt stays behind in the first flask."
```

## Explore: run both techniques

```step
stage: run
insight: "Watching single particles travel through the condenser makes 'collect the vapour' concrete; the chromatogram shows black ink is a mixture."
try: { playground: science, starter: "boards.yml#distil", height: 520 }
tasks:
  - starter: "boards.yml#distil"
    check: { type: board, text: "Distil the seawater until the first flask is dry.", expect: { done: true } }
  - starter: "boards.yml#chroma"
    check: { type: board, text: "Run the chromatography.", expect: { done: true } }
  - check:
      type: question
      q: "Which pen wrote the note?"
      options: ["Pen A", "Pen B", "Neither"]
      answer: 1
      explain: "Pen B's dyes match the note's exactly. Pen A has an extra red dye."
```

### Distillation

Blue: water particles. Orange: salt particles.

### Chromatography

Ink spots from a note and two black pens sit on a pencil line. The bottom of the paper is dipped in water.

### Which pen?

## Explain: distillation is not just evaporation

```step
stage: investigate
insight: "The node's response mode is structured reasoning: compare the two techniques feature by feature (same property, different outcome, different equipment)."
tasks:
  - check:
      type: sort
      q: "Both techniques heat a liquid until it turns to gas. Sort each statement."
      options: ["Evaporation only", "Distillation only", "Both"]
      items:
        - ["Uses the difference in boiling point", "Both", "The liquid boils far below the dissolved solid."]
        - ["Needs heat", "Both"]
        - ["The vapour escapes into the air", "Evaporation only"]
        - ["The vapour is cooled and collected as a liquid", "Distillation only", "This is the key difference."]
        - ["You end up with only the solid", "Evaporation only"]
        - ["You end up with the liquid and the solid", "Distillation only"]
        - ["Needs a condenser and a collecting flask", "Distillation only", "Extra equipment to catch the vapour."]
      explain: "Same property, different outcome: distillation keeps the vapour by cooling it."
  - check:
      type: question
      q: "Why do the dyes in the ink end up at different heights?"
      options: ["Heavier dyes sink lower", "Each dye dissolves in the water and sticks to the paper differently, so the water carries each one a different distance", "The water makes new colours as it rises", "The dyes evaporate at different speeds"]
      answer: 1
      feedback: ["It isn't weight: every dye is pulled up by the water, against gravity.", null, "The colours were in the ink all along. The water only separates them.", "Nothing evaporates here. The water carries the dyes up the paper."]
      explain: "Dyes that dissolve well and stick weakly travel furthest."
  - check: { type: reflect, text: "I wrote the principle of each technique, a mixture each one suits, and what makes distillation different from evaporation." }
```

### Compare

### The dyes

### In your own words

In your book: explain the principle of each technique and name a mixture each one suits.

## Elaborate: distillation or evaporation?

```step
stage: modify
tier: typical
insight: "The choice depends on what you want to keep: if you need the liquid, distil."
check:
  type: sort
  q: "Both use the same property. Which would you choose?"
  options: ["Evaporation", "Distillation"]
  items:
    - ["A salt farm wants salt from seawater.", "Evaporation", "Only the salt is wanted. Sun and wind do it for free."]
    - ["A ship needs drinking water from seawater.", "Distillation", "The water is what's wanted, so the vapour must be collected."]
    - ["A lab wants very pure water with nothing dissolved in it.", "Distillation", "Distilled water leaves every dissolved substance behind."]
    - ["You want sugar crystals from sugar syrup.", "Evaporation", "Only the sugar is wanted."]
    - ["You want to keep both the water and the salt from a salt solution.", "Distillation", "Distillation collects the water and leaves the salt."]
  explain: "Ask: do I need the liquid? If yes, distil."
```

## Elaborate: three techniques, three properties

```step
stage: modify
tier: wider
insight: "Crystallisation, chromatography and distillation each use a different property."
check:
  type: sort
  q: "Which property does each technique use?"
  options: ["Boiling point", "How well each substance dissolves and sticks to the paper", "How much solid can stay dissolved"]
  items:
    - ["Crystallisation: a hot, concentrated solution is left to cool, and crystals form.", "How much solid can stay dissolved", "Less solid can stay dissolved as the solution cools, so it comes out as crystals."]
    - ["Chromatography: food colourings separate on paper.", "How well each substance dissolves and sticks to the paper", "Each colouring travels a different distance."]
    - ["Distillation: alcohol is separated from water.", "Boiling point", "Alcohol boils at about 78 °C, water at 100 °C."]
```

## Elaborate: First Nations knowledge and plant oils

```step
stage: modify
tier: wider
insight: "Traditional and modern methods of getting substances out of plants both rely on property differences."
check:
  type: sort
  q: "Which property or process does each step use?"
  options: ["Breaking up the leaves so substances can get out", "Some substances dissolve in water", "The oil is carried away with steam, then condensed", "The oil floats on the water"]
  items:
    - ["Crushing tea tree leaves", "Breaking up the leaves so substances can get out"]
    - ["Soaking crushed leaves in water", "Some substances dissolve in water"]
    - ["Modern steam distillation: steam passes through the leaves", "The oil is carried away with steam, then condensed"]
    - ["Modern steam distillation: separating the collected liquid", "The oil floats on the water", "The oil is drawn off the top of the condensed water."]
```

The Bundjalung people of northern New South Wales have long used the leaves of the tea tree, crushing them or soaking them in water to use as medicine. Today tea tree oil is extracted by steam distillation.

## Elaborate: reading a chromatogram

```step
stage: modify
tier: wider
insight: "Rf values turn a chromatogram into evidence, and a single spot is evidence, not proof."
tasks:
  - check: { type: number, q: "The blue spot moved 8.0 cm. What is its Rf value?", answer: 0.8, tolerance: 0.02, explain: "8.0 ÷ 10.0 = 0.80" }
  - check: { type: number, q: "The red spot moved 5.0 cm. What is its Rf value?", answer: 0.5, tolerance: 0.02, explain: "5.0 ÷ 10.0 = 0.50" }
  - check:
      type: question
      q: "An unknown dye has Rf = 0.50 in the same setup. Which dye could it be?"
      options: ["The red dye", "The blue dye", "None of them"]
      answer: 0
      explain: "Same Rf value, same conditions: probably the same substance."
  - check:
      type: question
      q: "A green ink gives just one spot. What can you conclude?"
      options: ["It is probably one dye, but two dyes with the same Rf value would also give one spot", "It is definitely a pure substance", "The test failed"]
      answer: 0
      explain: "Testing again with a different solvent would check."
```

Chemists compare spots with the **Rf value**: the distance the spot moved divided by the distance the water moved, both measured from the pencil line. In the Pen A lane, the water moved **10.0 cm**.

### Blue

### Red

### Unknown dye

### One spot

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first prediction with what happened and can say what changed in my thinking." }
```

What did you think would collect in the second flask? Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Distillation separates a liquid from what is dissolved in it by boiling the liquid and cooling the vapour back into a liquid somewhere else.
- Evaporation and distillation use the same property (boiling point), but distillation collects the vapour and evaporation lets it escape.
- Chromatography separates a mixture of dissolved substances, such as dyes, because each is carried a different distance.
- Distillation suits seawater (to get water). Chromatography suits inks, food colourings and plant pigments.
