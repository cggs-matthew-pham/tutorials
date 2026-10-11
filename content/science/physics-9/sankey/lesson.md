---
order: 10
node: [AC9S9U05 n3, AC9S9U05 n4]
unit: conservation
title: What does a Sankey diagram show?
summary: "A Sankey diagram shows energy flowing through a system as bands whose widths are proportional to the amounts. The input splits into the useful output (straight on) and the wasted outputs (bending away). You can read the efficiency off it and see at a glance where energy is wasted, which is how engineers compare real systems."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8288
  url: http://127.0.0.1:8288/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "A coal power station: of 1000 J of chemical energy, 350 J becomes electricity; the rest heats the cooling water and goes up the chimney. Efficiency 35%." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Sankey diagrams"
  say: "Band widths show the amounts of energy: wider means more."
  clip:
    - caption: { text: "A coal power station. 1000 J of chemical energy in, on the left.", say: "A coal power station: a thousand joules of chemical energy in." }
    - wait: 3200
    - caption: { text: "Straight on: 350 J of electricity, the useful output. The widths are to scale.", say: "Straight on, three hundred and fifty joules of electricity, the useful part." }
    - wait: 3800
    - caption: { text: "Bending away: 650 J of waste heat. Efficiency 35%.", say: "Bending away, six hundred and fifty joules of waste heat. Efficiency: thirty five percent." }
    - wait: 3200
hook: "About two thirds of the energy in the coal burned at a power station never becomes electricity. You can see exactly where it goes in one picture."
---
You can calculate efficiency. This lesson draws it, and uses the drawings to compare real systems.

## Engage: reading the bands

```step
stage: predict
insight: "Students who read Sankey bands as separate quantities, or think wider means more efficient, need the 'width = amount, all bands add up' rule."
check:
  type: predict
  q: "In a Sankey diagram, the input band is 1000 J wide. The useful band is about a third as wide. Roughly what is the efficiency?"
  options: ["About 33%", "About 3%", "About 1000%", "You can't tell from widths"]
  actual: "About 33%. Band widths are proportional to energy, so a band a third as wide as the input carries about a third of the energy: an efficiency of about a third."
```

## Explore: build two power stations

```step
stage: run
insight: "Building the diagrams for two power stations from data, and seeing the widths, makes the comparison visible before it is calculated."
try: { playground: board, starter: "boards.yml#coal", height: 680 }
tasks:
  - starter: "boards.yml#coal"
    check: { type: board, text: "A coal power station: 1000 J of chemical energy gives 350 J of electricity, 550 J of heat in the cooling water and 100 J of heat up the chimney. Build its Sankey diagram.", when: "u = 350 and b = 1" }
  - starter: "boards.yml#hydro"
    check: { type: board, text: "A hydro-electric station: 1000 J from falling water gives 900 J of electricity, 60 J of heat and 40 J of sound. Build it.", when: "u = 900 and b = 1" }
```

### Coal

Drag the sliders, or use + and −.

### Hydro

## Explain: reading and using Sankey diagrams

```step
stage: investigate
insight: "Reading values, spotting the biggest waste, judging what the diagram hides, and comparing systems covers construction, interpretation and application."
tasks:
  - check:
      type: question
      q: "What do the widths of the bands in a Sankey diagram show?"
      options: ["The amount of energy in each flow, to scale", "How fast the energy moves", "How important each output is"]
      answer: 0
      feedback: [null, "Speed isn't shown.", "Width is amount, not importance."]
      explain: "Band widths are proportional to energy, and the output bands always add up to the input band (conservation of energy)."
  - check:
      type: question
      q: "In the coal station's diagram, which output is the biggest waste?"
      options: ["Heat in the cooling water (550 J)", "Heat up the chimney (100 J)", "Electricity (350 J)"]
      answer: 0
      feedback: [null, "Narrower band: less energy.", "That's the useful output."]
      explain: "The widest wasted band shows where improvements would save the most: here, the heat carried away by cooling water."
  - check:
      type: number
      q: "A solar panel's Sankey diagram shows 1000 J of light in and 200 J of electricity out. What is its efficiency (%)?"
      answer: 20
      explain: "200 ÷ 1000 × 100% = 20%."
  - check:
      type: question
      q: "What does a Sankey diagram NOT show?"
      options: ["How much the system costs, or the pollution it makes", "Where energy is wasted", "The efficiency"]
      answer: 0
      feedback: [null, "That's exactly what it shows.", "You can read it off the useful band."]
      explain: "It shows energy only. Comparing real systems also needs cost, emissions and whether the energy source runs out."
  - check: { type: reflect, text: "I can build and read a Sankey diagram, find the efficiency and the biggest waste, and say what it doesn't show." }
```

### What widths mean

### Biggest waste

### Solar panel

### What it hides

### In your own words

In your book: sketch the coal and hydro Sankey diagrams side by side. Under them, write which is more efficient and one reason a country might still use the less efficient one.

## Elaborate: a kettle

```step
stage: modify
tier: typical
insight: "A device whose useful output is heat checks that 'useful' depends on the job, not on the type of energy."
try: { playground: board, starter: "boards.yml#kettle", height: 680 }
tasks:
  - check: { type: board, text: "A kettle takes in 2000 J: 1800 J heats the water, 180 J heats the kettle and the air, and 20 J becomes sound. Build its diagram.", when: "u = 1800 and b = 1" }
  - check:
      type: question
      q: "In a kettle, heat is the useful output. In a light bulb, heat is waste. Why?"
      options: ["'Useful' means what the device is for: a kettle's job is heating water", "Kettles make a different kind of heat", "Light bulbs don't really make heat"]
      answer: 0
      feedback: [null, "Heat is heat; the job decides.", "They do: that's their main waste."]
      explain: "The same type of energy can be useful in one device and wasted in another."
```

### The kettle

### Useful depends on the job

## Elaborate: choosing an energy source

```step
stage: modify
tier: wider
insight: "Efficiency is one factor among several in real energy decisions; Sankey diagrams inform but don't decide."
check:
  type: question
  q: "A hydro station is about 90% efficient and a coal station about 35%. Why doesn't every country just build hydro stations?"
  options: ["Hydro needs the right rivers and valleys, and dams flood land; efficiency is only one factor", "Hydro stations make no electricity in winter", "Coal is more efficient really"]
  answer: 0
  feedback: [null, "Rain and snow melt feed rivers all year in many places.", "The figures say otherwise."]
  explain: "Real choices weigh efficiency with cost, location, pollution and whether the source is renewable."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my estimate from band widths with the efficiencies I calculated." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A **Sankey diagram** shows energy flows as bands whose widths are proportional to the amounts.
- The input band splits into the useful output (straight on) and wasted outputs (bending away); outputs always add up to the input.
- Read the efficiency as useful ÷ input, and find the biggest waste by the widest wasted band.
- Sankey diagrams show energy only, not cost or pollution.
