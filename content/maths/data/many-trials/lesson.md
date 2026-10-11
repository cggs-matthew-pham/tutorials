---
order: 8
unit: chance
node: AC9M7P02 n2
title: Many trials
summary: "Over a few trials the relative frequency jumps about; over many it settles close to the probability. That is why more trials give a better estimate, and why a run of tails does not make heads 'due'."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Flip a coin ten times and you might get 7 heads. Flip it ten thousand times and you will be very close to half. Why does more help?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8186
  url: http://127.0.0.1:8186/index.html
  readySelector: ".ctally"
  layout: full
explainPicture: { ref: chance.yml#pic, caption: "2000 flips: the relative frequency of heads jumps about at first, then settles near 0.5 (dashed)." }
explainClip:
  query: { code: "@chance.yml#explain", fresh: 1, id: explain }
  caption: "More trials, a steadier estimate"
  say: "The more trials, the closer the relative frequency gets to the probability."
  clip:
    - caption: { text: "10 flips: the relative frequency can be far from 0.5.", say: "With ten flips, it can be far from a half." }
    - click: Run 10
    - wait: 900
    - caption: { text: "1000 more: the line settles close to the dashed 0.5.", say: "A thousand more, and the line settles near a half." }
    - click: Run 1000
    - wait: 1400
---
In Predict and test you saw that a short experiment rarely matches the expected count. This lesson asks what happens as the number of trials grows.

The **relative frequency** (count ÷ trials) jumps about over the first few trials, then settles closer and closer to the **probability**. This is called the **law of large numbers**. It is why a large experiment (or a simulation) gives a good estimate of a probability you cannot work out from a sample space.

## Predict: 10 or 1000?

```step
stage: predict
insight: "Committing to which experiment lands closer to half shows whether they expect larger samples to be more reliable."
check:
  type: predict
  q: "Which is more likely to give a relative frequency of heads between 0.45 and 0.55: 10 flips, or 1000 flips?"
  options:
    - "1000 flips"
    - "10 flips"
    - "Both are equally likely"
  actual: "1000 flips. In 10 flips, getting 3 or 7 heads (0.3 or 0.7) is common. Over 1000 flips the relative frequency is almost always within 0.05 of 0.5."
```

Picture 10 flips. How likely is exactly 5 heads?

## Run: watch it settle

```step
stage: run
insight: "Running 10 flips, then a thousand, on one graph shows the early jumps and the settling: relative frequency approaches the probability as trials grow."
try: { playground: board, starter: "chance.yml#run", height: 620 }
check: { type: board, text: "Run 10 flips, then keep going to at least 1000. Watch the line. Was your prediction right?", when: "t >= 1000" }
```

Where is the line after 10 flips? After 1000? Press Start again and run it again: does the start look the same?

## Investigate: settling, not balancing

```step
stage: investigate
insight: "Relative frequency settles because each new trial counts for less as the total grows, not because earlier results are balanced out. Zara's mistake thinks the coin remembers."
tasks:
  - check:
      type: answer
      q: "After 1000 flips, a coin has shown 482 heads. What is the relative frequency of heads? (A decimal.)"
      answer: "0.482"
      form: decimal
      feedback:
        - ["482", "Divide by 1000."]
      explain: "482 ÷ 1000 = 0.482: close to 0.5."
  - check:
      type: bug
      code: "working.txt#zara"
      text: "Zara thinks about her next flip. Click the line where her reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: gamblers-fallacy
      explain: "Line 3: the coin does not remember. Each flip is still 1/2 heads. Five tails in a row is unusual but not impossible, and it is not 'balanced out'; it just matters less as more flips are added."
  - check:
      type: question
      q: "Why does the relative frequency settle down over many trials?"
      options: ["Each new trial changes the total by less and less, so the fraction moves less", "The coin starts landing heads more to catch up", "After 1000 trials the outcomes stop being random"]
      answer: 0
      feedback: [null, "The coin has no memory: each flip is still 1/2.", "Every flip is still random."]
      explain: "One more head changes 7/10 a lot, but 501/1000 hardly at all."
```

### Settling, not balancing

Here is why more trials help.

```worked
\tfrac{7}{10} = 0.7 :: Ten flips: one result changes the fraction by 0.1.
\tfrac{7}{10} \to \tfrac{8}{11} \approx 0.73 :: One more head moves it a lot.
\tfrac{501}{1000} \to \tfrac{502}{1001} \approx 0.5015 :: After 1000 flips, one more head barely moves it.
\text{each flip: } P(H) = \tfrac{1}{2} :: The coin has no memory: nothing is "due".
```

Now find the relative frequency after 1000 flips.

### Find the mistake

Read Zara's reasoning. Does the coin know what happened before?

### Why it settles

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a dice instead of a coin, a mystery bag estimated from data, the size of the error, then the edge case of a long run."
try: { playground: board, starter: "chance.yml#dice", height: 620 }
tasks:
  - starter: "chance.yml#dice"
    hint: "Run 1000 at a time. P(6) is 1/6 ≈ 0.167."
    check: { type: board, text: "Roll at least 2000 times. Does the relative frequency of sixes settle near $\\tfrac{1}{6} \\approx 0.167$?", when: "t >= 2000", explain: "After 2000 rolls the relative frequency is usually within about 0.02 of 0.167." }
  - starter: "chance.yml#mystery"
    hint: ["You cannot see the bag. Run at least 1000 draws (each counter goes back in).", "Relative frequency of red × 10 estimates how many of the 10 counters are red."]
    check: { type: board, text: "A mystery bag holds 10 counters, red and yellow. Draw (with replacement) at least 1000 times and estimate how many are red.", when: "t >= 1000", explain: "The relative frequency of red settles near 0.3, so about 3 of the 10 counters are red." }
  - check:
      type: question
      q: "Which experiment gives the more trustworthy estimate of P(red) for a spinner?"
      options: ["5000 spins with 1520 reds", "20 spins with 8 reds"]
      answer: 0
      feedback: [null, "20 spins can easily be far from the true probability."]
      explain: "More trials give a relative frequency closer to the probability: 1520/5000 = 0.304."
  - check:
      type: question
      q: "Edge case: in 10 000 flips of a fair coin, will there be any runs of 5 tails in a row?"
      options: ["Almost certainly, many: long runs happen in long experiments", "No: the law of large numbers stops them", "Only if the coin is unfair"]
      answer: 0
      feedback: [null, "The law is about the relative frequency, not about each flip.", "Runs happen with fair coins."]
      explain: "In 10 000 flips, a run of 5 tails is expected hundreds of times; the overall fraction still settles near 1/2."
```

### A dice

Each task changes one thing.

### A mystery bag

### Which to trust

### Long runs

## Practise: many trials

```step
stage: practise
insight: "Relative frequency, estimating from experiments and judging sample size, mixed; the gambler's slip planted again; the review keeps expected counts fresh."
tasks:
  - check:
      type: answer
      q: "A drawing pin landed point-up 312 times in 800 throws. Estimate the probability it lands point-up. (A decimal.)"
      answer: "0.39"
      form: decimal
      feedback:
        - ["312", "Divide by 800."]
      explain: "312 ÷ 800 = 0.39. A pin has no sample space of equal outcomes, so experiments are the way to estimate."
  - check:
      type: question
      q: "A roulette wheel landed on red 8 times in a row. What is true about the next spin?"
      options: ["Red is exactly as likely as before", "Black is now more likely", "Red is now more likely: it is on a streak"]
      answer: 0
      feedback: [null, "The wheel does not remember: no colour is 'due'.", "Streaks do not change the chances."]
      explain: "Each spin is independent: the probability does not change."
  - check:
      type: answer
      q: "Using your estimate of 0.39, how many point-up landings would you expect in 200 throws?"
      answer: "78"
      feedback:
        - ["39", "200 × 0.39."]
      explain: "200 × 0.39 = 78."
  - check:
      type: answer
      q: "Review: how many heads do you expect in 300 flips of a fair coin?"
      answer: "150"
      feedback:
        - ["0.5", "Multiply by 300."]
      explain: "300 × 1/2 = 150."
```

### Estimate

### Streaks

### Use the estimate

### Review: expected count

## Make: how many is enough?

```step
stage: make
insight: "Running trials until the estimate is within 0.01 of the probability makes the law of large numbers concrete: closeness costs many trials."
try: { playground: board, starter: "chance.yml#run", height: 620 }
hint: ["Run 1000 at a time.", "Keep going until the relative frequency of heads is between 0.49 and 0.51."]
check: { type: board, text: "Keep flipping until you have at least 1000 flips and the relative frequency of heads is within 0.01 of 0.5.", when: "t >= 1000 and e <= 0.01", explain: "It usually takes a few thousand flips. Getting within 0.01 is much harder than within 0.1." }
```

How many flips did it take? Compare with others.
