---
order: 1
unit: genetics
title: Where are the instructions?
summary: "DNA carries the instructions for an organism. It is coiled into chromosomes in the nucleus; a gene is a section of DNA that codes for a protein. Alleles are different versions of the same gene."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8222
  url: http://127.0.0.1:8222/index.html
  readySelector: "#gpanel"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "From body to gene"
  say: "DNA carries the instructions; a gene is a section of DNA."
  clip:
    - caption: { text: "Zoom in from a person to a single gene.", say: "Zoom in from a person to a single gene." }
    - wait: 2620
    - click: "Zoom in"
    - caption: { text: "Nearly every cell has the same DNA, in its nucleus.", say: "Nearly every cell has the same DNA, in its nucleus." }
    - wait: 2950
    - click: "Zoom in"
    - click: "Zoom in"
    - caption: { text: "A chromosome is one long, coiled DNA molecule.", say: "A chromosome is one long, coiled DNA molecule." }
    - wait: 2290
    - click: "Zoom in"
    - click: "Zoom in"
    - caption: { text: "A gene is a section of DNA: the code for one protein.", say: "A gene is a section of DNA: the code for one protein." }
hook: "Unwound, the DNA in one of your cells would be about two metres long. It fits in a nucleus a hundredth of a millimetre across."
---
In Year 9 you learnt gametes carry half the chromosomes. This lesson: what a chromosome is made of, and what a gene is.

## Engage: bigger or smaller?

```step
stage: predict
insight: "Students who confuse gene, chromosome and DNA can't order them by size; the zoom puts them in order."
check:
  type: predict
  q: "Put these in order from biggest to smallest: gene, chromosome, nucleus, DNA molecule."
  options: ["Nucleus, chromosome, gene, DNA", "Nucleus, chromosome, DNA molecule, gene (a section of it)", "Gene, chromosome, DNA, nucleus", "Chromosome, nucleus, gene, DNA"]
  actual: "Nucleus, then chromosome (one long, coiled DNA molecule), then a gene, which is a short section of that DNA."
```

## Explore: zoom in

```step
stage: run
insight: "Zooming from a person to one gene in six steps shows each structure inside the last."
try: { playground: board, starter: "boards.yml#zoom", height: 540 }
check: { type: board, text: "Zoom all the way in from the body to a single gene.", when: "l = 5" }
```

Press **Zoom in** and read each level before going on.

## Explain: DNA, genes and alleles

```step
stage: investigate
insight: "Separating the gene (the section of DNA) from the allele (a version) and the characteristic is the hinge."
tasks:
  - check:
      type: match
      q: "Match each word to its meaning."
      pairs:
        - ["DNA", "A long molecule carrying the coded instructions"]
        - ["Chromosome", "One long DNA molecule, tightly coiled"]
        - ["Gene", "A section of DNA that codes for one protein"]
        - ["Allele", "One version of a gene"]
  - check:
      type: question
      q: "There is one gene affecting earlobe shape, but people have attached or free earlobes. How?"
      options: ["People have different alleles (versions) of the same gene", "There is one gene for attached and another for free", "The environment decides", "Only some people have the gene"]
      answer: 0
      feedback: [null, "It's one gene in the same place on the chromosome; its versions differ.", "Earlobe shape is mostly inherited.", "Everyone has the gene; the version differs."]
  - check:
      type: question
      q: "Your body cells have 46 chromosomes. Why are they described as 23 pairs?"
      options: ["One of each pair came from each parent, and the two carry the same genes (perhaps different alleles)", "Each chromosome copies itself", "Boys and girls have different chromosomes", "Pairs are easier to count"]
      answer: 0
      feedback: [null, "Copying happens before division, but the pairs come from the two parents.", "Only one pair (the sex chromosomes) differs.", "There's a biological reason."]
  - check: { type: reflect, text: "I can explain how DNA, genes, chromosomes and alleles are related." }
```

### Words

### Alleles

### Pairs

### In your own words

In your book: draw a nested diagram (cell, nucleus, chromosome, DNA, gene) and label an allele.

## Elaborate: from code to characteristic

```step
stage: modify
tier: typical
insight: "Ordering the steps from gene to characteristic answers 'what do genes do?'"
check:
  type: sort
  q: "Put the steps in order."
  options: ["1st", "2nd", "3rd", "4th"]
  items:
    - ["A gene's sequence of bases (A, T, C, G) is read", "1st"]
    - ["The cell builds a protein from that code", "2nd"]
    - ["The protein does a job (a pigment, an enzyme, a structure)", "3rd"]
    - ["A characteristic appears (such as eye colour)", "4th"]
```

## Elaborate: the same code everywhere

```step
stage: modify
tier: wider
insight: "Recognising that all cells hold the same DNA but use different genes links back to specialised cells."
check:
  type: question
  q: "A nerve cell and a skin cell from the same person have the same DNA. Why do they look and work so differently?"
  options: ["Each cell uses (switches on) different genes", "They have different chromosomes", "Skin cells lose most of their DNA", "Nerve cells have extra genes"]
  answer: 0
  feedback: [null, "The chromosomes are the same.", "They keep all of it.", "No extra genes: just different ones in use."]
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first order of nucleus, chromosome, DNA and gene with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **DNA** carries coded instructions as a sequence of bases (A, T, C, G).
- A **chromosome** is one long DNA molecule, coiled; humans have 46, in 23 pairs (one of each pair from each parent).
- A **gene** is a section of DNA coding for a protein; **alleles** are different versions of one gene.
