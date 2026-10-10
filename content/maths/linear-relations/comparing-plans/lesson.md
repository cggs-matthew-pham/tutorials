---
order: 8
unit: using
title: Comparing two plans
summary: Put two rules on one graph. Where the lines cross they cost the same; on either side, the lower line is the cheaper plan. Then check where the model makes sense.
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Phone plans, gyms and streaming services all ask you to choose between a bigger fee and a lower rate. Two lines on one graph answer it for any amount."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8139
  url: http://127.0.0.1:8139/index.html
  readySelector: "#sl-k"
  layout: full
explainPicture: { ref: graph.yml#pic, caption: "Plan A ($T = 5g + 20$) and Plan B ($T = 40$) cost the same at 4 GB. Below 4 GB, A is lower (cheaper); above 4 GB, B is." }
explainClip:
  query: { code: "@graph.yml#explain", fresh: 1, id: explain }
  caption: "Where the lines cross, the plans cost the same"
  say: "Where the lines cross, the two plans cost the same."
  clip:
    - caption: { text: "Plan A: 20 dollars plus 5 per GB. Plan B: one flat price.", say: "Plan A is twenty dollars plus five per gigabyte; Plan B is one flat price." }
    - caption: { text: "Here B is 30 dollars: the same as A at 2 GB.", say: "Here Plan B is thirty dollars, the same as Plan A at two gigabytes." }
    - wait: 400
    - caption: { text: "Make Plan B 40 dollars: now they cost the same at 4 GB.", say: "Make Plan B forty dollars, and now they cost the same at four gigabytes." }
    - click: Make k bigger
    - wait: 400
    - caption: { text: "Left of the crossing, Plan A is cheaper; right of it, Plan B is.", say: "Left of the crossing, Plan A is cheaper; to the right, Plan B is." }
    - wait: 1200
    - expect: { selector: "#board", contains: "g = 4" }
---
In the last lesson you wrote one rule for one situation. Choosing between two plans needs two rules on the same graph, and a question answered in the situation's own words: which plan, for how much data, and does the answer make sense?

## Predict: which plan?

```step
stage: predict
insight: "Committing to a plan before seeing the graph exposes the belief that the lower fee always wins."
check:
  type: predict
  q: "Plan A costs 20 dollars a month plus 5 dollars per GB. Plan B costs 40 dollars a month for any amount of data. Mia uses 6 GB a month. Which plan is cheaper for her?"
  options: ["Plan A: it has the lower fee", "Plan B", "They cost the same"]
  actual: "Plan B. For 6 GB, Plan A costs 20 + 5 × 6 = 50 dollars and Plan B costs 40. A's lower fee only wins for small amounts of data."
```

Work out what each plan costs for 6 GB. Then think: is there an amount of data where they cost the same?

## Run: where they cost the same

```step
stage: run
insight: "On one graph the two plans' lines cross at a single point: the amount of data where they cost the same, which splits the light users from the heavy ones."
try: { playground: board, starter: "graph.yml#run", height: 640 }
check: { type: board, text: "Drag $P$ to where the two plans cost the same.", when: "P on y = 5x + 20 and P on y = 40" }
```

Plan A is $T = 5g + 20$; Plan B is $T = 40$. Drag $P$ to where the lines cross. Then look at 6 GB: which line is lower there? Was your prediction right?

## Investigate: answering in words

```step
stage: investigate
insight: "The crossing answers 'when do they cost the same'; the lower line answers 'which is cheaper'; and a model only makes sense for some values."
tasks:
  - picture: { ref: graph.yml#pic, caption: "They cross at $(4, 40)$: 4 GB costs 40 dollars on either plan." }
    check:
      type: question
      q: "For 2 GB a month, which plan is cheaper?"
      options: ["Plan A", "Plan B", "They cost the same"]
      answer: 0
      explain: "For 2 GB, Plan A costs 20 + 5 × 2 = 30 dollars and Plan B costs 40. Left of the crossing, Plan A's line is lower."
  - check:
      type: bug
      code: "working.txt#leo"
      text: "Leo compares the plans. Click the line where his reasoning goes wrong."
      answer: 4
      fault: logic
      misconception: fee-decides
      explain: "Line 4: Plan A's lower fee only wins up to 4 GB. After that its 5 dollars per GB adds up, and Plan B is cheaper. Which plan is cheaper depends on how much data you use."
  - check:
      type: question
      q: "The rule $T = 5g + 20$ gives $T = 10$ when $g = -2$. Why does that answer not make sense?"
      options:
        - "You cannot use negative data, so the rule only works for g of 0 or more"
        - "The rule is wrong: it should be T = 5g − 20"
        - "Phone plans can cost less than their fee"
      answer: 0
      explain: "A model only fits the situation for some values. Data used cannot be negative, so the rule (and its line) starts at g = 0."
```

### Comparing the plans

Here is how to compare two plans and answer in words.

```worked
T = 5g + 20, \quad T = 40 :: Plan A and Plan B, as rules. Which is cheaper, and when?
5g + 20 = 40 :: They cost the same where the two rules are equal: where the lines cross.
g = 4, \; T = 40 :: The lines cross at $(4, 40)$. Check: $5 \times 4 + 20 = 40$.
g < 4: \text{ A is cheaper} :: Left of the crossing, Plan A's line is lower.
g > 4: \text{ B is cheaper} :: Right of the crossing, Plan B's line is lower.
g \ge 0 :: The model only makes sense from 0 GB: you cannot use negative data.
```

Answer in words: "Up to 4 GB, Plan A is cheaper. At 4 GB they both cost 40 dollars. Above 4 GB, Plan B is cheaper."

### Find the mistake

Read Leo's working one line at a time. Is his last line true for every amount of data?

### Does it make sense?

Some values of $g$ make sense in the situation, and some do not.

## Modify: new comparisons

```step
stage: modify
insight: "One change at a time: a plan with no fee, one amount catching up with another, two plans that never cross, and a model that stops working."
try: { playground: board, starter: "graph.yml#gyms", height: 620 }
tasks:
  - starter: "graph.yml#gyms"
    hint: "Gym A: 50 dollars to join, then 10 a week. Gym B: no joining fee, 15 a week. Follow both lines until they meet."
    check: { type: board, text: "Gym A is $T = 10w + 50$; Gym B is $T = 15w$. Drag $P$ to where they cost the same.", when: "P on y = 10x + 50 and P on y = 15x", explain: "At 10 weeks both cost 150 dollars. Before that Gym B is cheaper; after it, Gym A." }
  - starter: "graph.yml#savers"
    hint: "Sam starts with 30 dollars and saves 5 a week. Ana starts with nothing and saves 8 a week. When has Ana caught up?"
    check: { type: board, text: "Sam's savings are $S = 5w + 30$; Ana's are $S = 8w$. Drag $P$ to when they have the same amount.", when: "P on y = 5x + 30 and P on y = 8x", explain: "After 10 weeks both have 80 dollars. After that, Ana has more: her rate is bigger." }
  - starter: "graph.yml#parallel"
    check:
      type: question
      q: "Two electricians charge $T = 15h + 30$ and $T = 15h + 50$. When does the second one cost less?"
      options: ["Never: the lines are parallel, so the first is always 20 dollars cheaper", "After 2 hours", "After 4 hours"]
      answer: 0
      explain: "Both charge 15 dollars an hour, so the lines are parallel and never cross. The first is always 20 dollars cheaper, for any job."
  - starter: "graph.yml#battery"
    check:
      type: question
      q: "A battery is modelled by $B = -10h + 100$. What does the model give after 12 hours, and does it make sense?"
      options:
        - "−20%: it does not make sense, so the model only works from 0 to 10 hours"
        - "−20%: the battery is 20% below empty"
        - "120%: the battery is overcharged"
      answer: 0
      explain: "−10 × 12 + 100 = −20. A battery cannot go below 0%: it is flat at 10 hours, and the model stops there."
```

### Gyms

Each task puts a new pair of rules on the board. Drag $P$ to where they cost the same.

### Catching up

Two people saving at different rates, from different starting amounts.

### Never crossing

Two electricians with the same hourly rate.

### When the model stops

A phone battery running down.

## Practise: compare and check

```step
stage: practise
insight: "Finding the crossing, choosing the cheaper plan for a given amount, and saying where a model makes sense, mixed; the review keeps writing rules fresh."
tasks:
  - check:
      type: answer
      q: "Plan C costs 10 dollars plus 8 dollars per GB. Plan D costs 34 dollars for any amount. At how many GB do they cost the same?"
      answer: "3"
      feedback:
        - ["34", "34 is the cost where they meet. How many GB gives that cost on Plan C?"]
        - ["4", "Check: 10 + 8 × 4 = 42, not 34."]
      explain: "10 + 8g = 34, so 8g = 24 and g = 3. Check: 10 + 24 = 34."
  - check:
      type: question
      q: "Using Plans C and D, which is cheaper for 5 GB?"
      options: ["Plan D", "Plan C", "They cost the same"]
      answer: 0
      explain: "Plan C: 10 + 8 × 5 = 50 dollars. Plan D: 34 dollars. Above 3 GB, D is cheaper."
  - check:
      type: question
      q: "Concert tickets cost $T = 12n + 6$ dollars for $n$ tickets. Which values of $n$ make sense?"
      options: ["Whole numbers from 1 up", "Any number, including 2.5", "Any number, including negatives"]
      answer: 0
      explain: "You buy whole tickets, and at least one. The line joins the points, but only the whole numbers are real orders."
  - check:
      type: answer
      q: "Review: an electrician charges a 25 dollar call-out fee plus 9 dollars an hour. Write a rule for the total $T$ for $h$ hours."
      answer: "9h + 25"
      feedback:
        - ["25h + 9", "Which amount is paid once? That one is c."]
      explain: "T = 9h + 25: 9 dollars for each hour (m) and 25 dollars once (c)."
```

### When they are equal

### Which is cheaper?

### Values that make sense

### Review

## Make: design a rival plan

```step
stage: make
insight: "Designing a plan that ties with Plan A at a chosen amount and beats it for heavy users reverses the lesson: from the crossing to the rule."
try: { playground: board, starter: "graph.yml#make", height: 680 }
hint: ["Plan A costs 50 dollars at 6 GB. Your line must pass through (6, 50).", "To be cheaper for heavy users, your rate m must be less than 5. Then choose c so 6m + c = 50."]
check: { type: board, text: "Design Plan B so that it costs the same as Plan A at 6 GB, and is cheaper than Plan A above 6 GB.", when: "6m + c = 50 and m < 5", explain: "Your plan ties with Plan A at 6 GB (50 dollars) and has a lower rate, so it is cheaper for anyone who uses more." }
```

Plan A is $T = 5g + 20$. Set the rate ($m$) and fee ($c$) of your own plan. The green point shows where the two plans cost the same.

Stretch: write an advert for your plan that is honest: who should choose it, and who should not?
