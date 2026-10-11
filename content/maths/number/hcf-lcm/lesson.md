---
order: 8
unit: powers
node: AC9M7N02 n3
title: HCF and LCM
summary: "Put two prime factorisations side by side. The primes they share multiply to the highest common factor; all the primes (shared ones once) multiply to the lowest common multiple."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "One bus leaves every 12 minutes, another every 18. Both leave at 8:00. When do they next leave together? Primes answer it without listing every time."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8268
  url: http://127.0.0.1:8268/index.html
  readySelector: ".ftpick button"
  layout: full
explainPicture: { ref: tree.yml#explain-pic, caption: "$12 = 2^2 \\times 3$ and $18 = 2 \\times 3^2$. Shared: $2 \\times 3$, so the HCF is 6. All the primes: $2 \\times 2 \\times 3 \\times 3$, so the LCM is 36." }
explainClip:
  query: { code: "@tree.yml#explain", fresh: 1, id: explain }
  caption: "Shared primes"
  say: "Compare the primes of the two numbers."
  clip:
    - caption: { text: "12 = 2 × 2 × 3.", say: "Twelve is two times two times three." }
    - click: Split 12
    - click: 2 × 6
    - click: Split 6
    - click: 2 × 3
    - caption: { text: "18 = 2 × 3 × 3.", say: "Eighteen is two times three times three." }
    - click: Split 18
    - click: 2 × 9
    - click: Split 9
    - click: 3 × 3
    - expect: { selector: "#gsum", contains: "18 = 2 × 3²" }
    - wait: 500
    - caption: { text: "Shared, in the middle: 2 × 3 = 6, the HCF.", say: "The shared primes make six: the highest common factor." }
    - wait: 1100
    - caption: { text: "Everything: 2 × 2 × 3 × 3 = 36, the LCM.", say: "All the primes make thirty-six: the lowest common multiple." }
    - wait: 1100
---
The **highest common factor** (HCF) of two numbers is the biggest number that divides both. The **lowest common multiple** (LCM) is the smallest number both divide into. You can find them by listing, but prime factorisations are quicker for big numbers:

- **HCF:** multiply the primes the two numbers **share**.
- **LCM:** multiply **all** the primes, counting each shared one once.

## Predict: the HCF of 12 and 18

```step
stage: predict
insight: "Committing to an HCF shows whether they want the highest common factor or any common factor, and whether they confuse it with a multiple."
check:
  type: predict
  q: "What is the highest common factor of 12 and 18?"
  options: ["6", "3", "2", "36"]
  actual: "6. 6 divides both 12 and 18, and nothing bigger does. 2 and 3 are common factors but not the highest; 36 is a common multiple."
```

List the factors of each, or think about their primes.

## Run: two trees

```step
stage: run
insight: "Finishing both trees sorts the primes into shared and not shared, and the board multiplies them into the HCF and the LCM."
try: { playground: board, starter: "tree.yml#run", height: 640 }
check: { type: board, text: "Grow trees for 36 and 48. Which primes are in the middle of the diagram? Then use the same method on 12 and 18: was your prediction right?", when: "c = 1 and C = 1", explain: "36 = 2² × 3² and 48 = 2⁴ × 3. Shared: 2 × 2 × 3 = 12 (the HCF). All: 2⁴ × 3² = 144 (the LCM)." }
```

When both trees are finished, a diagram sorts their primes.

## Investigate: shared and all

```step
stage: investigate
insight: "Shared primes give the HCF and all the primes the LCM; Zoe multiplies the numbers, which counts the shared 2 twice. Context decides which one a problem needs."
tasks:
  - check:
      type: answer
      q: "Find the HCF of 24 and 36."
      answer: "12"
      feedback:
        - ["6", "6 divides both, but so does a bigger number."]
        - ["4", "4 divides both, but so does a bigger number."]
        - ["72", "72 is a common multiple, the LCM. The HCF divides both."]
      explain: "24 = 2³ × 3 and 36 = 2² × 3². Shared: 2 × 2 × 3 = 12."
  - check:
      type: bug
      code: "working.txt#zoe"
      text: "Zoe finds the LCM of 6 and 8. Click the line where her working goes wrong."
      answer: 3
      fault: logic
      misconception: lcm-product
      explain: "Line 3: 6 × 8 counts the shared 2 twice. All the primes, the shared one once: 2³ × 3 = 24. 24 is a multiple of both, and lower than 48."
  - check:
      type: reasoning
      q: "Bus A leaves every 12 minutes and bus B every 18 minutes. Both leave at 8:00. After how many minutes do they next leave together? Write each step with its reason."
      steps:
        - ["$12 = 2^2 \\times 3$ and $18 = 2 \\times 3^2$", "prime factorisations, from factor trees"]
        - ["They leave together at common multiples of 12 and 18", "each bus leaves at multiples of its own time"]
        - ["LCM $= 2^2 \\times 3^2 = 36$", "the lowest common multiple: all the primes, shared ones once"]
      picks:
        - step: 3
          options: ["The LCM: the first time that is a multiple of both", "The HCF: the biggest number that divides both", "12 × 18 = 216"]
          answer: 0
          feedback: [null, "The HCF, 6, is less than both times: neither bus has come back by then.", "216 is a common multiple, but not the first."]
      answer: "36"
      feedback:
        - ["6", "6 is the HCF. After 6 minutes neither bus has left again."]
        - ["216", "Both leave together then, but they meet earlier too."]
      explain: "36 minutes, at 8:36: bus A has made 3 trips and bus B 2."
```

### Two factorisations side by side

Here is the method for 12 and 18.

```worked
12 = 2^2 \times 3, \quad 18 = 2 \times 3^2 :: Write both prime factorisations.
\text{HCF} = 2 \times 3 = 6 :: Shared primes: each prime in both, to its lower power.
\text{LCM} = 2^2 \times 3^2 = 36 :: All the primes, each to its higher power (shared ones once).
6 \times 36 = 216 = 12 \times 18 :: A check: HCF × LCM = the two numbers multiplied.
```

Now try one: the HCF of 24 and 36.

### Find the mistake

Read Zoe's working. Is 24 a multiple of 6 and of 8?

### HCF or LCM?

Your working can be short notes. Then choose the reason for the key step.

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a new pair on the board, an LCM, an HCF in context, then numbers that share no primes."
try: { playground: board, starter: "tree.yml#pair", height: 640 }
tasks:
  - starter: "tree.yml#pair"
    hint: "Finish both trees, then read the middle of the diagram."
    check: { type: board, text: "Grow trees for 24 and 60. Write the HCF and the LCM.", when: "c = 1 and C = 1", explain: "24 = 2³ × 3 and 60 = 2² × 3 × 5. HCF = 2² × 3 = 12. LCM = 2³ × 3 × 5 = 120." }
  - check:
      type: answer
      q: "Find the LCM of 4 and 6."
      answer: "12"
      feedback:
        - ["24", "4 × 6 counts the shared 2 twice. Is there a lower multiple of both?"]
        - ["2", "2 is the HCF. The LCM is a multiple of both."]
      explain: "4 = 2² and 6 = 2 × 3: LCM = 2² × 3 = 12."
  - check:
      type: answer
      q: "24 apples and 36 pears are packed into identical bags, with nothing left over. What is the greatest number of bags?"
      answer: "12"
      feedback:
        - ["72", "72 is the LCM: you cannot have more bags than apples."]
        - ["6", "6 bags works, but more is possible."]
      explain: "The number of bags must divide 24 and 36: the HCF is 12 (each bag has 2 apples and 3 pears)."
  - check:
      type: question
      q: "Edge case: 7 and 9 share no primes. What are their HCF and LCM?"
      options: ["HCF 1, LCM 63", "HCF 0, LCM 63", "HCF 63, LCM 1", "No HCF, LCM 16"]
      answer: 0
      feedback: [null, "0 does not divide anything. 1 divides every number.", "That is the wrong way round: the HCF divides both.", "1 always divides both. 16 = 7 + 9 is not a multiple of either."]
      explain: "With no shared primes the HCF is 1, and the LCM is the product: 63."
```

### A new pair

Each task changes one thing.

### An LCM

### In context

### Nothing shared

## Practise: HCF and LCM

```step
stage: practise
insight: "HCF, LCM and a common denominator, mixed; the product as the LCM is the planted slip; the review keeps prime factorisation fresh."
tasks:
  - check:
      type: answer
      q: "Find the LCM of 4 and 10."
      answer: "20"
      feedback:
        - ["40", "4 × 10 counts the shared 2 twice."]
        - ["2", "2 is the HCF."]
      explain: "4 = 2² and 10 = 2 × 5: LCM = 2² × 5 = 20."
  - check:
      type: answer
      q: "Find the HCF of 18 and 30."
      answer: "6"
      feedback:
        - ["3", "3 divides both, but so does a bigger number."]
        - ["2", "2 divides both, but so does a bigger number."]
        - ["90", "90 is the LCM."]
      explain: "18 = 2 × 3² and 30 = 2 × 3 × 5. Shared: 2 × 3 = 6."
  - check:
      type: answer
      q: "To add $\\tfrac{1}{6} + \\tfrac{1}{8}$, both fractions need the same denominator. What is the smallest one that works?"
      answer: "24"
      feedback:
        - ["48", "48 works, but a smaller one does too."]
        - ["14", "Denominators are not added. You need a multiple of 6 and of 8."]
      explain: "The LCM of 6 and 8 is 24 (the next lessons use this)."
  - check:
      type: question
      q: "Review: what is the prime factorisation of 50?"
      options: ["$2 \\times 5^2$", "$2 \\times 25$", "$5 \\times 10$", "$2^2 \\times 5$"]
      answer: 0
      feedback: [null, "25 is not prime.", "10 is not prime.", "That is 20."]
      explain: "50 = 2 × 25 = 2 × 5 × 5 = 2 × 5²."
```

### LCM

### HCF

### A common denominator

### Review: prime factors

## Make: HCF 6, LCM 36

```step
stage: make
insight: "Working backwards from an HCF and an LCM to the two numbers uses the primes in both directions, and the product check (HCF × LCM) ties them together."
hint: ["6 = 2 × 3 and 36 = 2² × 3². Both numbers contain 2 × 3.", "One number takes the extra 2, the other the extra 3."]
check:
  type: reasoning
  q: "Find two numbers, not 6 and 36, whose HCF is 6 and whose LCM is 36. Write how you found them. Then type the smaller of your two numbers."
  steps:
    - ["$6 = 2 \\times 3$ and $36 = 2^2 \\times 3^2$", "prime factorisations of the HCF and the LCM"]
    - ["Both numbers contain $2 \\times 3$; one more 2 and one more 3 are shared out", "the HCF is what both share; the LCM has everything"]
    - ["$2^2 \\times 3 = 12$ and $2 \\times 3^2 = 18$", "giving both extras to one number gives 6 and 36"]
    - ["$12 \\times 18 = 216 = 6 \\times 36$", "HCF × LCM is the two numbers multiplied"]
  answer: "12"
  feedback:
    - ["6", "6 and 36 are not allowed. Share the extra 2 and the extra 3 between the two numbers."]
    - ["216", "That is HCF × LCM, the two numbers multiplied. Type the smaller number."]
  criteria: ["My numbers both divide 36 and are both divided by 6", "I checked the HCF and the LCM of my numbers", "My two numbers multiply to HCF × LCM = 216"]
  explain: "12 and 18: 12 = 2² × 3 and 18 = 2 × 3², HCF 6 and LCM 36. Their product is 216 = 6 × 36."
```

Check: grow trees for your two numbers on paper and compare their primes.
