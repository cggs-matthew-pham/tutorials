---
order: 5
node: AC9S10U02 n2
unit: evolution
title: Why did the beetles change?
summary: "Natural selection: individuals vary; more are born than survive; those best suited to the environment are more likely to survive and reproduce, passing on their alleles. Over generations the population changes. Individuals don't change to suit the environment."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8240
  url: http://127.0.0.1:8240/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "A population of beetles: each one a slightly different colour, on pale ground." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Natural selection"
  say: "The population changes because survivors pass on their colours; no beetle changes."
  clip:
    - caption: { text: "Beetles vary in colour. Birds eat the ones that stand out most.", say: "Beetles vary in colour. Birds eat the ones that stand out most." }
    - wait: 3610
    - click: "Let the birds hunt"
    - wait: 2500
    - caption: { text: "Survivors breed, and their young are like them.", say: "The survivors breed, and their young are like them." }
    - wait: 2620
    - click: "Survivors breed"
    - wait: 1500
    - click: "Let the birds hunt"
    - wait: 2500
    - click: "Survivors breed"
    - wait: 1500
    - caption: { text: "Over generations the population blends in. No single beetle changed.", say: "Over generations the population blends in, but no single beetle changed." }
    - wait: 800
hook: "After a bushfire, the ground is black. A few years later, a beetle population on it is darker than before. No beetle changed colour."
---
Individuals vary. This lesson: what happens to that variation when some individuals are more likely to survive.

## Engage: who changes?

```step
stage: predict
insight: "Students who think individuals adapt because they need to will choose the 'beetles turn darker' answer; the board's beetles never change their own colour."
check:
  type: predict
  q: "Birds eat the beetles they can see most easily. Over many generations the population becomes better camouflaged. How?"
  options: ["Each beetle changes colour to hide, because it needs to", "Beetles that blend in survive more often and have more offspring, so the population's colours shift", "The birds teach the beetles", "Beetles choose a ground that matches"]
  actual: "Beetles that blend in survive and breed more, so their offspring (with similar colours) make up more of the next generation. Individuals never change; the population does."
```

## Explore: be the bird

```step
stage: run
insight: "Hunting as the bird, then watching the average colour shift over generations, makes selection something students caused."
try: { playground: science, starter: "boards.yml#hunt", height: 640 }
check: { type: board, text: "Hunt and breed for three generations.", expect: { done: true } }
```

You are a bird. Click beetles to eat them (as fast as you can, like a hungry bird). Then press **Survivors breed**. Compare the bar charts: the start and the latest generation.

## Explain: natural selection

```step
stage: investigate
insight: "Putting the steps of natural selection in order and rejecting the 'need' explanation is the hinge."
tasks:
  - check:
      type: sort
      q: "Put the steps of natural selection in order."
      options: ["1st", "2nd", "3rd", "4th", "5th"]
      items:
        - ["Beetles in the population vary in colour", "1st"]
        - ["Birds eat the beetles that stand out most", "2nd"]
        - ["Beetles that blend in are more likely to survive", "3rd"]
        - ["Survivors breed, passing on the alleles for their colour", "4th"]
        - ["Over generations, the population's average colour shifts", "5th"]
  - check:
      type: question
      q: "Did any single beetle on the board change its colour?"
      options: ["No: each beetle kept its colour; the population changed because of who survived and bred", "Yes, the survivors got paler", "Yes, the eaten ones got darker", "Only the babies changed"]
      answer: 0
      feedback: [null, "Survivors kept their colour.", "Eaten beetles were removed.", "Offspring were like their parents, plus a small random change."]
  - check:
      type: question
      q: "What would happen if every beetle started exactly the same colour?"
      options: ["Selection couldn't change the population: there would be no variation to select from", "They would still evolve the same way", "They would all be eaten", "They would turn the ground's colour"]
      answer: 0
      feedback: [null, "Selection needs variation to act on.", "If they're identical, any beetle is equally likely to be eaten.", "Individuals don't change colour."]
  - check:
      type: question
      q: "Over millions of years, populations split apart and natural selection changes each part differently. What does that mean for living things today?"
      options: ["They are all related, in a branching family tree: close relatives share a recent common ancestor", "Each species began separately, so they aren't related", "They form a ladder, with humans at the top as the most evolved"]
      answer: 0
      feedback: [null, "Shared DNA and anatomy say otherwise: they point to common ancestors.", "Evolution branches; it doesn't climb. Every species alive today has been evolving for the same length of time."]
      explain: "Splitting and selection, repeated over millions of years, give a branching tree of life. Every living thing is related; the question is how closely."
  - check:
      type: question
      q: "If relatives share ancestors, which pair would you expect to have the most similar DNA?"
      options: ["A human and a chimpanzee", "A human and a mouse", "A human and a mushroom"]
      answer: 0
      feedback: [null, "Mice are mammals like us, but our line split from theirs much longer ago than from the chimpanzee's.", "We are related to fungi too, but very distantly: our last common ancestor lived over a billion years ago."]
      explain: "The more recently two species shared an ancestor, the more similar their DNA. Comparing DNA is how biologists now draw the tree of life."
  - check:
      type: question
      q: "In Year 7, kingdoms put mushrooms in their own group, and many people think of them as plant-like. DNA shows fungi share a more recent ancestor with animals than with plants. Why don't features alone show this?"
      options: ["Similar features can evolve in unrelated groups, and close relatives can come to look very different", "DNA tests are unreliable", "Fungi evolved from plants"]
      answer: 0
      feedback: [null, "DNA evidence from many genes and many labs agrees.", "Fungi and plants are separate branches; neither came from the other."]
      explain: "Natural selection shapes features to suit each environment, so features can mislead about family. That is why classification moved from kingdoms by features to groups by shared ancestry, and changes as evidence improves."
  - check: { type: reflect, text: "I can explain natural selection in steps without saying individuals change because they need to, and explain why all living things are related." }
```

### The steps

### Who changed

### No variation

### A branching tree

### Closest DNA

### Back to the kingdoms

### In your own words

In your book: explain natural selection for the beetles using the words variation, survive, reproduce, inherit and generations.

## Elaborate: after the bushfire

```step
stage: modify
tier: typical
insight: "Changing the environment and watching the direction of selection reverse shows 'fittest' depends on the environment."
try: { playground: science, starter: "boards.yml#fire", height: 680 }
tasks:
  - check: { type: board, text: "Let the birds hunt for a few generations, darken the ground, and keep going until six generations.", expect: { done: true } }
  - check:
      type: question
      q: "Before the fire, paler beetles survived best. After it, darker ones did. What does that tell you about 'survival of the fittest'?"
      options: ["Fittest means best suited to the current environment, which can change", "Fittest means strongest", "The darker beetles were always fitter", "Fitness doesn't depend on the environment"]
      answer: 0
      feedback: [null, "Strength wasn't involved: colour was.", "On pale ground they were eaten more.", "The board shows it depends on the ground."]
```

### Bushfire

### Fittest

## Elaborate: antibiotic resistance

```step
stage: modify
tier: wider
insight: "Applying natural selection to bacteria and antibiotics transfers the steps to a medical context."
check:
  type: question
  q: "Why does using antibiotics more often make resistant bacteria more common?"
  options: ["Each use kills the bacteria that aren't resistant; any that happen to be resistant survive and multiply", "Antibiotics make bacteria resistant", "Bacteria learn to resist", "It doesn't make a difference"]
  answer: 0
  feedback: [null, "Antibiotics select for resistance that already exists; they don't create it.", "Bacteria don't learn; resistant ones survive.", "It matters: each use leaves the resistant survivors with less competition."]
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about how the beetles changed with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Natural selection:** individuals **vary**; more are born than survive; those **best suited** to the environment are more likely to **survive and reproduce**; they pass on their **alleles**; over **generations**, the population changes.
- **Individuals don't change** to suit the environment; the population does.
- "Fittest" means best suited to the **current** environment. Selection needs **variation**.
- Over millions of years, populations split and diverge: all living things are related in a **branching tree of life**, not a ladder. The more recent the **common ancestor**, the more similar the DNA.
- Features can mislead about relatedness (fungi are closer to animals than to plants), so modern classification uses shared ancestry, and changes as evidence improves.
