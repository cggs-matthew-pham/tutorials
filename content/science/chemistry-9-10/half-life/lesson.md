---
order: 4
unit: atoms
title: How long does radioactivity last?
summary: "Each unstable nucleus decays at random, but a large sample halves in a fixed time: its half-life. After one half-life half is left, after two a quarter, after three an eighth. Half-lives range from minutes to billions of years, which decides what each isotope is used for."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8262
  url: http://127.0.0.1:8262/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain-pic, caption: "100 iodine-131 nuclei after 3 half-lives (24 days): about an eighth are left. The number halves every 8 days." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Half-life"
  say: "A radioactive sample halves in a fixed time: its half-life."
  clip:
    - caption: { text: "100 iodine-131 nuclei. Half-life: 8 days.", say: "A hundred iodine one thirty one nuclei. The half-life is eight days." }
    - wait: 3000
    - click: "Wait one half-life"
    - caption: { text: "After 8 days, about half are left.", say: "After eight days, about half are left." }
    - wait: 2600
    - click: "Wait one half-life"
    - caption: { text: "After 16 days, about a quarter: half of the half.", say: "After sixteen days, about a quarter: half of the half." }
    - wait: 3200
    - caption: { text: "Which nucleus goes next is random, but the sample halves every 8 days.", say: "Which nucleus goes next is random, but the sample halves every eight days." }
    - click: "Wait one half-life"
    - wait: 3600
hook: "Doctors give patients a radioactive drug in the morning that is almost gone by the next day. Yet some uranium in the rocks under you was made before the Earth formed, and about half of it is still there."
---
Unstable nuclei decay. This lesson asks how fast.

## Engage: two half-lives

```step
stage: predict
insight: "The prediction separates 'halves each half-life' from the common belief that two half-lives make the whole sample decay (or that it falls by the same amount each time)."
check:
  type: predict
  q: "A sample has 80 iodine-131 nuclei. Half of any sample decays in 8 days. How many are left after 16 days?"
  options: ["20", "0: two halves make a whole", "40", "60"]
  actual: "About 20. In the first 8 days half of the 80 go, leaving 40. In the next 8 days half of those 40 go, leaving 20. It halves each time; it never takes the same number twice."
```

## Explore: watch a sample decay

```step
stage: run
insight: "Watching single nuclei vanish at random while the graph still halves every 8 days separates the random event from the predictable pattern; running it twice shows the randomness."
try: { playground: board, starter: "boards.yml#iodine", height: 760 }
tasks:
  - check: { type: board, text: "Run the sample for 6 half-lives (48 days).", when: "c >= 1" }
  - check: { type: board, text: "Start again and run it a second time. Did the same nuclei decay? Did the graph change much?", when: "c >= 2" }
```

### One run

Press **Run** (or **Wait one half-life**, one half-life at a time). Orange squares have not decayed yet. Watch the graph against the dashed lines at half, a quarter and an eighth.

### Again

Press **Start again** for a new sample of 100 and run it again.

## Explain: half-life

```step
stage: investigate
insight: "Calculating by repeated halving, then asking what half-life cannot tell you (which nucleus, when) and what does not change it, is the node's whole model."
tasks:
  - check:
      type: question
      q: "What is the half-life of a radioactive isotope?"
      options: ["The time for half the nuclei in a sample to decay", "Half the time it takes the whole sample to decay", "The time for one nucleus to decay halfway"]
      answer: 0
      feedback: [null, "The sample never quite all decays: it keeps halving.", "A nucleus decays all at once or not at all."]
      explain: "The half-life is the time for half the nuclei in a sample to decay. It is the same however big the sample is and however long it has been decaying."
  - check:
      type: number
      q: "A sample starts with 800 nuclei. How many are left after 3 half-lives?"
      answer: 100
      explain: "800 → 400 → 200 → 100. After 3 half-lives, an eighth is left."
  - check:
      type: number
      q: "Carbon-14 has a half-life of 5730 years. How many years until a quarter of a sample is left?"
      answer: 11460
      explain: "A quarter is left after 2 half-lives: 2 × 5730 = 11 460 years."
  - check:
      type: question
      q: "You watch one carbon-14 nucleus. When will it decay?"
      options: ["No one can say: it could be in a second or in 50 000 years", "In exactly 5730 years", "Within 5730 years for certain"]
      answer: 0
      feedback: [null, "5730 years is when about half of a large sample has gone, not when any one nucleus goes.", "About half the nuclei last longer than one half-life."]
      explain: "Decay is random for each nucleus. Only for a large sample can we say how many will go in a given time."
  - check:
      type: question
      q: "A sample is heated, crushed and dissolved in acid. What happens to its half-life?"
      options: ["Nothing: half-life is the same whatever you do to the sample", "It gets shorter", "It gets longer"]
      answer: 0
      feedback: [null, "Heat and chemicals act on the electrons, not on the nucleus.", "Nothing everyday reaches the nucleus."]
      explain: "Half-life is a property of the nucleus. Temperature, pressure and chemical reactions change the electrons around it, not the nucleus."
  - check: { type: reflect, text: "I can say what half-life means and work out how much of a sample is left after a number of half-lives." }
```

### What half-life is

### Three half-lives

### Carbon-14

### One nucleus

### Nothing changes it

### In your own words

In your book: sketch the graph from the board and mark one half-life on it. Then write how much of a sample of 64 nuclei is left after 1, 2, 3 and 4 half-lives.

## Elaborate: fluorine-18 in hospitals

```step
stage: modify
tier: typical
insight: "Matching a short half-life to medical imaging gives half-life a purpose: the isotope must last long enough to take the picture, then fade quickly."
try: { playground: board, starter: "boards.yml#fluorine", height: 760 }
tasks:
  - check: { type: board, text: "Run fluorine-18 for 6 half-lives.", when: "c >= 1" }
  - check:
      type: number
      q: "Fluorine-18 has a half-life of 110 minutes. What percentage of it is left 330 minutes after it is made?"
      answer: 12.5
      tolerance: 0.1
      explain: "330 minutes is 3 half-lives: 100% → 50% → 25% → 12.5%."
  - check:
      type: question
      q: "Fluorine-18 is used in PET scans: it is made in the hospital, injected, and its radiation is detected outside the body. Why does a half-life of about 2 hours suit this?"
      options: ["Long enough to make, inject and scan, short enough that little is left in the body by the next day", "So the patient stays radioactive for years, ready for the next scan", "Any half-life would do: it makes no difference"]
      answer: 0
      feedback: [null, "Doctors want the dose to fade quickly.", "A half-life of seconds would be gone before the scan; one of years would keep exposing the patient."]
      explain: "After a day (about 13 half-lives) less than a thousandth is left. Isotopes for dating rocks, by contrast, need half-lives of millions or billions of years."
```

### Fluorine-18

### After 330 minutes

### Why 2 hours

## Elaborate: dating the past

```step
stage: modify
tier: wider
insight: "Radiocarbon dating uses half-life backwards; its limit (too little carbon-14 left after about 50 000 years) explains why the oldest dates for people in Australia come from other methods that agree with it."
try: { playground: board, starter: "boards.yml#carbon", height: 760 }
tasks:
  - check: { type: board, text: "Run carbon-14 for 6 half-lives.", when: "c >= 1" }
  - check:
      type: number
      q: "Charcoal from an old fireplace has an eighth of the carbon-14 that living wood has. Carbon-14's half-life is 5730 years. About how old is it, in years?"
      answer: 17190
      tolerance: 10
      explain: "An eighth is left after 3 half-lives: 3 × 5730 = 17 190 years."
  - check:
      type: question
      q: "Radiocarbon dating works back to about 50 000 years. Why not further?"
      options: ["After about 9 half-lives less than a five-hundredth of the carbon-14 is left, too little to measure reliably", "Carbon-14 stops decaying after 50 000 years", "Nothing older than 50 000 years contains carbon"]
      answer: 0
      feedback: [null, "It keeps decaying at the same rate; there is just very little left.", "Old charcoal and bone still contain carbon, but almost none of it is carbon-14."]
      explain: "Each half-life halves what is left: after 9 half-lives (about 52 000 years) less than 0.2% remains, and tiny traces of modern carbon would swamp it."
  - check:
      type: question
      q: "Sites in northern Australia show First Peoples were there more than 60 000 years ago. Radiocarbon dates the younger layers; older layers are dated by other methods, such as luminescence (when sand grains were last in sunlight). Why does using more than one method matter?"
      options: ["Independent methods that agree make the dates much more trustworthy", "Radiocarbon is always wrong", "It doesn't: one method is enough"]
      answer: 0
      feedback: [null, "Radiocarbon is reliable within its range; it just can't reach that far back.", "Each method has its own assumptions; agreement between them is strong evidence."]
      explain: "Where their ranges overlap the methods are checked against each other, and agreement between independent methods is strong evidence. Together with First Peoples' own knowledge of Country, they show people have lived in Australia for more than 60 000 years."
```

### Carbon-14

### An old fireplace

### The limit

### More than 60 000 years

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about iodine-131 after 16 days with the board." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Each unstable nucleus decays at random: no one can say which will go next, or when.
- A large sample decays in a predictable way: half of it goes in one **half-life**, half of what is left in the next, and so on (1/2, 1/4, 1/8 …).
- Half-life is a property of the isotope; heat, pressure and chemical reactions don't change it.
- Short half-lives suit medical imaging (fluorine-18, about 2 hours); long ones suit dating (carbon-14, 5730 years; uranium-238, 4.5 billion years).
