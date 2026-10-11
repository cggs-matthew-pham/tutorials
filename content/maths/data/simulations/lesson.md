---
order: 14
unit: chance
node: [AC9M8P03 n1, AC9M8P03 n2]
uses: [AC9M8P02 n1, AC9M7P02 n2]
title: Simulating compound events
summary: "A computer can repeat a chance experiment thousands of times in a second. Run a simulation of two events, record the results in a frequency table, and compare the relative frequency with the probability from the sample space."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "In a board game you roll two dice every turn. Which total should you hope for, and how sure can you be? Rolling by hand would take all lesson; a simulation takes a second."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8332
  url: http://127.0.0.1:8332/index.html
  readySelector: "#gtrial"
  layout: full
explainPicture: { ref: sim.yml#explain-pic, caption: "Two dice: a total of 8 is 5 of the 36 outcomes, P = 5/36 ≈ 0.14. A simulation's relative frequency should come close to this over many trials." }
explainClip:
  query: { code: "@sim.yml#explain", fresh: 1, id: explain }
  caption: "A simulation"
  say: "Many trials, recorded in a table, then compared with the probability."
  clip:
    - caption: { text: "Event A: a total of 8, P(A) = 5/36 ≈ 0.14. Run 10 trials.", say: "A total of eight has probability five out of thirty-six. Ten trials first." }
    - click: Run 10
    - wait: 1400
    - caption: { text: "1000 more: the relative frequency settles near 0.14.", say: "A thousand more, and it settles near the probability." }
    - click: Run 1000
    - expect: { selector: "#gtrial", contains: "Trial 1010" }
    - wait: 2000
---
A **simulation** uses random numbers to act out a chance experiment, many times and quickly. Each repeat is a **trial**. Record the results in a **frequency table**, then find the **relative frequency** of the event: how many times it happened ÷ the number of trials.

The board is one digital tool. In a spreadsheet, `=RANDBETWEEN(1,6)` is one roll of a dice: a whole number from 1 to 6, each equally likely.

## Predict: the most common total

```step
stage: predict
insight: "Committing to the most likely sum of two dice shows whether they think the sums 2 to 12 are equally likely."
check:
  type: predict
  q: "Two dice are rolled 100 times and the totals recorded. Which total will probably come up most often?"
  options: ["12", "They will all come up about the same", "7"]
  actual: "7. More pairs make 7 (six of the 36) than any other total; 2 and 12 have just one pair each."
```

## Run: 100 trials

```step
stage: run
insight: "Running 100 trials of two dice and reading the frequency table shows the middle totals come up most, as the grid predicts."
try: { playground: board, starter: "sim.yml#run", height: 760 }
check: { type: board, text: "Run at least 100 trials. Which total came up most in the table? Is the relative frequency of 7 close to P(7)? Compare with your prediction.", when: "u >= 100", explain: "7 usually comes up most, close to 1/6 of the time. In 100 trials it can be a little off: the next step looks at why." }
```

The table counts each total. The **Probability** column comes from the grid: the number of pairs with that total out of 36.

## Investigate: reading a simulation

```step
stage: investigate
insight: "Relative frequency is count ÷ trials; a short run can't show a probability is 0 (Ella); simulating two dice means adding two dice, not one random total."
tasks:
  - check:
      type: number
      q: "In 200 simulated rolls of two dice, a total of 7 came up 31 times. What is its relative frequency?"
      answer: 0.155
      tolerance: 0.0005
      feedback:
        - ["31", "Divide by the number of trials."]
      explain: "31 ÷ 200 = 0.155, close to 1/6 ≈ 0.167."
  - check:
      type: bug
      code: "working.txt#ella"
      text: "Ella runs a short simulation. Click the line where her conclusion goes wrong."
      answer: 3
      fault: logic
      misconception: sim-too-few
      explain: "Line 3: in 20 rolls, a 1-in-36 event more often than not doesn't happen at all. P(12) = 1/36 from the grid; a short run can't show it is impossible."
  - check:
      type: question
      q: "In a spreadsheet, A2 and B2 each hold =RANDBETWEEN(1,6), one dice each. Which formula in C2 simulates the total of two dice?"
      options: ["=RANDBETWEEN(1,12)", "=A2+B2", "=RANDBETWEEN(2,12)", "=A2*B2"]
      answer: 1
      feedback: ["A total of 1 is impossible, and the totals are not equally likely.", null, "That makes 2 to 12 equally likely, but a total of 7 is six times as likely as 12.", "That multiplies the dice."]
      explain: "Add the two dice. One random number from 2 to 12 would make every total equally likely, which two dice don't."
```

### Relative frequency

Here is the routine.

```worked
\text{Event: total of 9};\ P = \tfrac{4}{36} \approx 0.11 :: Predict from the grid first.
\text{Run } 500 \text{ trials: } 9 \text{ came up } 58 \text{ times} :: Simulate and record.
58 \div 500 = 0.116 :: Relative frequency.
0.116 \approx 0.11 :: Close: more trials would make it closer still.
```

### Find the mistake

Read Ella's working. How many times would you expect a 12 in 20 rolls?

### Two dice in a spreadsheet

## Modify: more trials, other events

```step
stage: modify
insight: "More trials bring the relative frequency close to the probability; a different compound event (coins) behaves the same; A and not A always share the trials."
try: { playground: board, starter: "sim.yml#run", height: 760 }
tasks:
  - starter: "sim.yml#run"
    check: { type: board, text: "Run 1000 trials or more of two dice. Is the relative frequency of 7 within 0.04 of P(7) now?", when: "u >= 1000 and e < 0.04", explain: "With 1000 trials the relative frequency is almost always within about 0.03 of 1/6." }
  - starter: "sim.yml#coins"
    check: { type: board, text: "Two coins: the board shows P(at least one head) = 3/4. Say why, using the four outcomes. Then run 1000 trials or more: does the relative frequency agree?", when: "u >= 1000 and e < 0.05", explain: "Only TT has no head, so 3 of the 4 outcomes: 3/4. The relative frequency settles near 0.75." }
  - check:
      type: question
      q: "In a simulation, A happened 380 times in 500 trials. How many times did not A happen?"
      options: ["500", "You can't tell", "120", "380"]
      answer: 2
      feedback: ["That is every trial.", "Every trial is in A or not A.", null, "That is A."]
      explain: "500 − 380 = 120. Relative frequencies 0.76 and 0.24 add to 1, just like complementary probabilities."
  - check:
      type: number
      q: "Two dice are rolled 600 times. About how many times do you expect a total of 7?"
      answer: 100
      tolerance: 0
      explain: "1/6 × 600 = 100. A simulation will give a number near 100, not exactly."
```

### 1000 trials

### At least one head

### A and not A

### Expected count

## Practise: simulations

```step
stage: practise
insight: "Recording results in a frequency table and judging a simulation, mixed; trusting a short run is the planted slip; 'or' is the review."
tasks:
  - check:
      type: trace
      text: "A simulation of two coins recorded these 20 trials: HT, HH, TT, TH, HH, HT, TT, HH, TH, HT, TT, HH, HT, TH, TT, HH, HT, TH, TT, HH. Fill in the frequency table."
      table: |
        | outcome | HH | HT | TH | TT |
        | count | [6] | [5] | [4] | [5] |
      explain: "Tally each outcome: 6 + 5 + 4 + 5 = 20 trials. The relative frequency of HH is 6 ÷ 20 = 0.3, near P(HH) = 0.25."
  - check:
      type: question
      q: "Two classes simulate a total of 7 on two dice. Class A: 9 times in 40 trials. Class B: 170 times in 1000. Which estimate is more reliable?"
      options: ["Class A: its relative frequency (0.225) is bigger", "They are equally good", "Neither: simulations don't work", "Class B"]
      answer: 3
      feedback: ["Reliability comes from the number of trials.", "1000 trials beat 40.", "Large simulations give good estimates.", null]
      explain: "More trials: 0.17 from 1000 trials is far steadier than 0.225 from 40."
  - check:
      type: question
      q: "A simulated relative frequency is 0.31 and the probability from the sample space is 1/3. What should you say?"
      options: ["The probability is wrong", "The probability is really 0.31", "They agree well enough", "The simulation is broken"]
      answer: 2
      feedback: ["1/3 comes from counting equally likely outcomes.", "A simulation estimates; the sample space gives the exact value.", null, "Some difference is normal."]
      explain: "They are close: the difference is chance. Relative frequency varies, and settles near the probability as the trials grow."
  - check:
      type: answer
      q: "Review: 30 students, 18 play netball, 10 play hockey, 4 play both. What is P(netball or hockey)?"
      answer: "24/30"
      feedback:
        - ["28/30", "The 4 with both are counted twice."]
      explain: "18 + 10 − 4 = 24, so 24/30 = 4/5."
```

### A frequency table

### Which estimate

### Close enough

### Review: or

## Make: your own simulation

```step
stage: make
insight: "Choosing an event, predicting, simulating and describing the result is the whole cycle of a simulation."
try: { playground: board, starter: "sim.yml#free", height: 760 }
hint: ["Choose any event, such as 'the total is a prime number' or 'both dice are odd'.", "Work out P(A) from the grid before you press Run."]
check: { type: board, text: "Choose your own event on two dice, work out its probability, then run at least 1000 trials.", when: "n >= 1 and u >= 1000", explain: "Your relative frequency should be close to your probability. If it isn't, check your count of outcomes." }
```

Describe your result in a sentence: the event, its probability, the relative frequency after your trials, and whether they agree.
