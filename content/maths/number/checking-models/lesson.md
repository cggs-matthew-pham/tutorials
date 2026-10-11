---
order: 30
unit: modelling
node: AC9M8M07 n2
uses: [AC9M8M07 n1]
title: Checking a model
summary: "Every model makes assumptions: a steady speed with no stops, a fare with no starting charge, an exchange rate with no fees. When a model's answer and real life differ, look for the assumption that does not hold, then refine the model, for example by adding a fixed starting amount."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A map app says the drive takes 3 hours. It takes 3 and a half. The maths was right; the model was too simple. Finding out why is the last step of modelling."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8321
  url: http://127.0.0.1:8321/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: models.yml#explain-pic, caption: "A taxi fare: $4.20 to start, then $2.10 per km. A 5 km ride costs $4.20 + $10.50 = $14.70." }
explainClip:
  query: { code: "@models.yml#explain", fresh: 1, id: explain }
  caption: "A simple model"
  say: "This model only uses the rate per kilometre."
  clip:
    - caption: { text: "The simple model: $2.10 per km. 5 km costs $10.50.", say: "The simple model. Two dollars ten per kilometre." }
    - wait: 1200
    - caption: { text: "But this taxi's fare starts at $4.20 before you move. What is missing?", say: "But this taxi's fare starts at four dollars twenty. What is missing?" }
    - expect: { selector: "#gsum", contains: "$10.50" }
    - wait: 1500
---
A **model** is a simplified version of a real situation. Every model makes **assumptions**: things it takes to be true to keep the maths simple.

| Model | Assumption | What can go wrong |
|---|---|---|
| time = distance ÷ speed | a steady speed, no stops | traffic and breaks make it slower |
| water bill = rate × litres | no fixed charge | bills add a service charge |
| US dollars = 0.65 × Australian dollars | no fees, a fixed rate | banks charge fees; rates change daily |

To **review** a model: compare its answer with real life, name the assumption that does not hold, and **refine** the model (add the stop, the starting charge, the fee). A simple model is fine when the difference does not matter for the decision.

## Predict: the taxi fare

```step
stage: predict
insight: "Committing to why a simple fare model is wrong shows whether they look for a missing part of the model rather than an arithmetic slip."
check:
  type: predict
  q: "A model says a 5 km taxi ride costs 5 × $2.10 = $10.50. The real fare is $14.70. Why?"
  options: ["The model leaves out a starting charge", "5 × 2.10 is not 10.50", "The taxi went faster than expected", "Taxi fares are random"]
  actual: "The model leaves out a starting charge (a flag fall) of $4.20: 4.20 + 10.50 = 14.70. The arithmetic was fine."
```

## Run: the refined model

```step
stage: run
insight: "Moving along the refined fare line shows the fixed start and the rate working together."
try: { playground: board, starter: "models.yml#run", height: 520 }
check: { type: board, text: "This model adds the $4.20 start. Set the ride to 5 km. Was your prediction right?", when: "x = 5", explain: "4.20 + 2.10 × 5 = $14.70." }
```

## Investigate: assumptions

```step
stage: investigate
insight: "Name the assumption behind a model; a mismatch is usually the assumption, not the arithmetic (Sam blames the maths); refine by adding what was left out."
tasks:
  - check:
      type: question
      q: "A model says a 300 km trip takes 300 ÷ 100 = 3 hours. What does it assume?"
      options: ["The car travels at exactly 100 km/h the whole way, with no stops", "The road is straight", "The car uses no petrol", "Nothing: it is exact"]
      answer: 0
      feedback: [null, "Bends matter only if they change the speed.", "Petrol is not part of this model.", "Every model assumes something."]
      explain: "Steady speed, no stops, no traffic."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam's model and the real trip disagree. Click the line where his review goes wrong."
      answer: 3
      fault: logic
      misconception: model-blame-maths
      explain: "Line 3: 300 ÷ 100 = 3 is right. The assumption (a steady 100 km/h with no stops) did not hold. Refine the model: add the stops, or use a lower average speed."
  - check:
      type: question
      q: "How could you refine the trip model?"
      options: ["Add the time for a stop, or use a lower average speed", "Divide 300 by 100 again", "Make the trip shorter", "Use 3.14 instead of 3"]
      answer: 0
      feedback: [null, "The same calculation gives the same answer.", "That changes the trip, not the model.", "π has nothing to do with it."]
      explain: "Add what the model left out: a 30-minute stop makes it 3.5 hours."
```

### The trip

Here is the routine.

```worked
\text{model: water bill} = \$2.50 \times \text{kL} :: A simple model: 20 kL costs \$50.
\text{real bill: } \$80 :: Compare with what happened.
\text{assumption: no fixed charge} :: Name what the model took to be true.
\$30 + \$2.50 \times 20 = \$80 :: Refine: add the \$30 service charge.
```

### Find the mistake

Read Sam's review. Is the arithmetic wrong, or the model?

### Refine it

## Modify: refine and judge

```step
stage: modify
insight: "Using the refined fare model backwards, naming a hidden assumption, adding stops, and judging when a simple model is enough."
try: { playground: board, starter: "models.yml#run", height: 520 }
tasks:
  - starter: "models.yml#run"
    hint: ["Take off the $4.20 first.", "21.00 ÷ 2.10 = ?"]
    check: { type: board, text: "With the refined model, how far can you ride for $25.20?", when: "x = 10", explain: "25.20 − 4.20 = 21.00, and 21.00 ÷ 2.10 = 10 km." }
  - check:
      type: question
      q: "A money model says 500 Australian dollars buys 500 × 0.65 = 325 US dollars. At the airport you get 305. What assumption failed?"
      options: ["No fees: the exchange counter charges a fee or a worse rate", "500 × 0.65 is not 325", "US dollars are worth more", "The model should divide"]
      answer: 0
      feedback: [null, "The arithmetic is right.", "Not a reason for the gap.", "Multiplying is right for this direction."]
      explain: "The model ignores fees and the counter's own rate."
  - check:
      type: number
      q: "Refine the trip model: 300 km at 100 km/h, plus two 15-minute stops. How many hours does it take?"
      answer: 3.5
      tolerance: 0
      explain: "3 hours driving + 0.5 hours of stops = 3.5 hours."
  - check:
      type: question
      q: "When is the simple trip model (300 ÷ 100 = 3 hours) good enough?"
      options: ["For a rough plan, such as which day to travel", "For a train timetable to the minute", "Never", "Only if the answer is a whole number"]
      answer: 0
      feedback: [null, "A timetable needs more detail.", "Simple models are useful when precision does not matter.", "Whole numbers have nothing to do with it."]
      explain: "A model is good enough when its error does not change the decision."
```

### Backwards

### Exchange fees

### Add the stops

### Good enough

## Practise: checking models

```step
stage: practise
insight: "Assumptions, refined models and a unit-rate review, mixed; blaming the arithmetic for a model's mismatch is the planted slip."
tasks:
  - check:
      type: question
      q: "A model for a phone plan is cost = $0.10 per MB used. The real bill was $20 more than the model said. Jo says: 'The model's sum must be wrong.' What is more likely?"
      options: ["The model leaves out a fixed $20 monthly fee", "Jo is right: the sum is wrong", "The price per MB changed", "The phone company made a mistake"]
      answer: 0
      feedback: [null, "Check the sum first: it is right. A steady $20 gap points to something left out.", "Then the gap would not be exactly $20 every month.", "Possible, but a fixed gap points to a missing fixed charge."]
      explain: "A gap of the same amount every time suggests a fixed charge: cost = 20 + 0.10 × MB."
  - check:
      type: number
      q: "With the refined taxi model ($4.20 plus $2.10 per km), what does an 8 km ride cost, in dollars?"
      answer: 21
      tolerance: 0
      feedback:
        - ["16.8", "Add the $4.20 starting charge."]
      explain: "4.20 + 2.10 × 8 = 4.20 + 16.80 = $21."
  - check:
      type: number
      q: "A refined phone model is cost = 20 + 0.10 × MB. What is the cost for 350 MB, in dollars?"
      answer: 55
      tolerance: 0
      explain: "20 + 0.10 × 350 = 20 + 35 = $55."
  - check:
      type: number
      q: "Review: a car goes 270 km in 3 hours. What is its average speed in km/h?"
      answer: 90
      tolerance: 0
      explain: "270 ÷ 3 = 90 km/h."
```

### The phone plan

### A taxi ride

### Refined phone model

### Review: speed

## Make: a plumber's quote

```step
stage: make
insight: "Using a refined model (a call-out fee plus a rate) backwards, then naming its assumptions."
try: { playground: board, starter: "models.yml#plumber", height: 520 }
hint: ["Take off the $80 call-out first.", "380 ÷ 95 = ?"]
check: { type: board, text: "A plumber charges $80 to come out, then $95 per hour. Find the job length that costs $460.", when: "y = 460", explain: "460 − 80 = 380, and 380 ÷ 95 = 4 hours." }
```

Then name one assumption in the plumber's model, and say how a real bill might differ.
