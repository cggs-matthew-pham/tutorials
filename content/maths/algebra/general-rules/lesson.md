---
order: 6
unit: expressions
title: An expression for any case
summary: Say what the letter stands for, write an expression for the situation, then test it with a number you can check. One expression then gives the answer for every case.
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A party for 5 people, 50 people or 500: one expression gives the cost for all of them, if you say clearly what the letter stands for."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8147
  url: http://127.0.0.1:8147/index.html
  readySelector: "#sl-g"
  layout: full
explainPicture: { ref: formula.yml#pic, caption: "Let $g$ be the number of guests. A hall costs 60 dollars plus 5 dollars per guest: $C = 5g + 60$. With 10 guests: $5 \\times 10 + 60 = 110$ dollars." }
explainClip:
  query: { code: "@formula.yml#explain", fresh: 1, id: explain }
  caption: "Say what the letter stands for, then write the expression"
  say: "Say what the letter stands for, then write the expression."
  clip:
    - caption: { text: "A hall: 60 dollars, plus 5 dollars for each guest.", say: "A hall costs sixty dollars, plus five dollars for each guest." }
    - caption: { text: "Let g be the number of guests.", say: "Let g stand for the number of guests." }
    - caption: { text: "g guests cost 5g. Add the hire: C = 5g + 60.", say: "g guests cost five g. Add the hire: five g plus sixty." }
    - wait: 400
    - caption: { text: "Test it: 10 guests cost 50 + 60 = 110 dollars.", say: "Test it: ten guests cost fifty plus sixty: one hundred and ten." }
    - click: Make g bigger
    - caption: { text: "The same expression gives any number of guests.", say: "The same expression gives the cost for any number of guests." }
    - expect: { selector: ".rulework", contains: "C = 5 × 20 + 60 = 160 dollars" }
    - wait: 1200
---
So far each expression was written from one sentence about a number. A real situation has parts: a fee, a price for each one, a number of people. To write one expression for all of it, first say **what the letter stands for**, then build the expression, then **test** it with a case you can check in words. After that one expression gives the answer for any number.

## Predict: what should the letter be?

```step
stage: predict
insight: "Committing to what the letter stands for exposes letting it stand for the thing that is being worked out, instead of the quantity that changes."
check:
  type: predict
  q: "A school trip costs 12 dollars per student plus a 50 dollar bus. You want one expression for the total cost. What should the letter stand for?"
  options: ["The number of students", "The total cost", "The 12 dollars", "The bus"]
  actual: "The number of students. It is the quantity that changes from trip to trip. The cost is worked out from it (12n + 50), and 12 and 50 are constants."
```

If $n$ is the number of students, what does 1 student cost? What do 10 cost?

## Run: one expression, many trips

```step
stage: run
insight: "Moving n and reading off the cost shows that one expression gives every case, and the parts mean what the story says."
try: { playground: board, starter: "formula.yml#run", height: 420 }
check: { type: board, text: "$n$ is the number of students on the trip. How much does a trip of 20 students cost?", when: "n = 20" }
```

The rule is $C = 12n + 50$. Set $n$ to 0: what does the 50 mean? What does the 12 mean? Was your prediction right?

## Investigate: from a situation to an expression

```step
stage: investigate
insight: "Name the letter, write what changes, add what is paid once, then test with one case; the letter stands for a number, not for the objects."
tasks:
  - check:
      type: answer
      q: "A phone plan costs 15 dollars a month plus 4 dollars per GB. Let $g$ be the number of GB used. Write an expression for the monthly cost."
      answer: "4g + 15"
      feedback:
        - ["15g + 4", "The 15 dollars is paid once, whatever you use. Which amount is multiplied by g?"]
        - ["19g", "Don't combine them. The 15 is paid once; only the 4 is paid for each GB."]
      explain: "4g + 15: 4 dollars for each of g GB, plus 15 dollars once."
  - check:
      type: question
      q: "Zoe starts with \"Let $n$ be the cost\" for tickets that cost 9 dollars each. Why is that not a good start?"
      options:
        - "The cost changes with the number of tickets, so the letter should stand for the number of tickets"
        - "A letter can never stand for a cost"
        - "9 should be the letter"
      answer: 0
      explain: "The cost depends on how many tickets there are. Let n be the number of tickets, then the cost is 9n."
  - check:
      type: bug
      code: "working.txt#pia"
      text: "Pia writes the cost of $a$ apples at 3 dollars each. Click the line where her thinking goes wrong."
      answer: 2
      fault: logic
      misconception: letter-as-object
      explain: "Line 2: 3a means 3 × a: 3 dollars times the number of apples. It does not mean \"3 apples\". The letter a stands for how many apples, a number."
```

### A hall

Here is how to build an expression for a situation.

```worked
\text{Hall: 60 dollars, plus 5 dollars per guest} :: A hall costs 60 dollars to hire, and then 5 dollars for each guest.
\text{Let } g = \text{number of guests} :: Say what the letter stands for. The number of guests changes, so $g$ stands for that.
5g :: Each guest costs 5 dollars, so $g$ guests cost $5 \times g$.
5g + 60 :: Add the hire, which is paid once.
g = 10: \; 5(10) + 60 = 110 :: Test with a case you can check in words: 10 guests cost 50 + 60 = 110 dollars.
g = 40: \; 5(40) + 60 = 260 :: Now the same expression gives any case, with no counting.
```

### Find the mistake

Read Pia's working one line at a time. What does the letter $a$ stand for?

### Your turn

Say what the letter stands for first. Then build the expression.

## Modify: new situations

```step
stage: modify
insight: "One change at a time: a fee plus a rate, a quantity that goes down, two letters, and using the expression for a big case."
try: { playground: board, starter: "formula.yml#taxi", height: 420 }
tasks:
  - starter: "formula.yml#taxi"
    check:
      type: answer
      q: "A taxi costs 3 dollars to get in plus 2 dollars per km. Let $d$ be the number of km. Write an expression for the fare."
      answer: "2d + 3"
      feedback:
        - ["3d + 2", "The 3 dollars is paid once, to get in. Which amount is paid for each km?"]
      explain: "2d + 3. Check with d = 4: 8 + 3 = 11 dollars."
  - starter: "formula.yml#tank"
    check:
      type: answer
      q: "A tank holds 100 litres and loses 4 litres each minute. Let $m$ be the minutes. Write an expression for the litres left."
      answer: "100 - 4m"
      feedback:
        - ["100 + 4m", "The tank is losing water, so take 4m away."]
        - ["4m - 100", "Start from the 100 litres you have and take away what has gone: 100 − 4m."]
      explain: "100 − 4m: it starts at 100 and 4 litres go each minute. Check with m = 5: 100 − 20 = 80."
  - starter: "formula.yml#tickets"
    check:
      type: answer
      q: "Adult tickets cost 8 dollars and child tickets cost 5 dollars. Let $a$ be the number of adults and $c$ the number of children. Write an expression for the total cost."
      answer: "8a + 5c"
      feedback:
        - ["13ac", "Adults and children cost different amounts. Work out each group, then add them."]
        - ["8c + 5a", "Check which price goes with which group: adults cost 8 dollars."]
      explain: "8a + 5c: 8 dollars for each of a adults, plus 5 dollars for each of c children."
  - starter: "formula.yml#use"
    check:
      type: answer
      q: "Tickets cost $T = 12n + 6$ dollars for $n$ tickets (6 dollars booking). Use the expression to find the cost of 50 tickets."
      answer: "606"
      feedback:
        - ["56", "Put n = 50 in: 12 × 50, then add the 6 dollar booking."]
        - ["600", "Don't forget the 6 dollar booking fee."]
      explain: "12 × 50 + 6 = 600 + 6 = 606 dollars."
```

### A taxi

The board follows the situation and shows the result. Write your expression, then check it with a number.

### A tank

### Two groups

### A big case

## Practise: build and use

```step
stage: practise
insight: "Naming the letter, building the expression and using it for a larger case, mixed; the review is brackets."
tasks:
  - check:
      type: answer
      q: "A plumber charges 60 dollars call-out plus 40 dollars per hour. Let $h$ be the number of hours. Write an expression for the cost."
      answer: "40h + 60"
      feedback:
        - ["60h + 40", "The call-out fee is paid once. The 40 dollars is paid for each hour."]
      explain: "40h + 60: 40 dollars for each hour, plus 60 dollars once."
  - check:
      type: answer
      q: "Using $40h + 60$, what does a job of 3.5 hours cost, in dollars?"
      answer: "200"
      feedback:
        - ["350", "That multiplies 40 + 60 by 3.5. The 60 is paid once, so only 40 is multiplied."]
      explain: "40 × 3.5 + 60 = 140 + 60 = 200 dollars."
  - check:
      type: question
      q: "Cupcakes cost 3 dollars each. What should the letter $c$ stand for in the expression $3c$ for the total cost?"
      options: ["The number of cupcakes", "Cupcakes", "The cost"]
      answer: 0
      explain: "c is a number: how many cupcakes. 3c is then 3 dollars times that number."
  - check:
      type: answer
      q: "Review: find $3(n + 4)$ when $n = 5$."
      answer: "27"
      feedback:
        - ["19", "That is 3 × 5 + 4. Do the brackets first: 5 + 4, then × 3."]
      explain: "3 × (5 + 4) = 3 × 9 = 27."
  - check:
      type: answer
      q: "Review: write an expression for \"add 5 to $n$, then multiply the result by 2\"."
      answer: "2(n + 5)"
      feedback:
        - ["2n + 5", "That doubles only n. The 2 multiplies the whole n + 5: use brackets."]
      explain: "2(n + 5): add 5 first, then double the whole result."
```

### A plumber

### Using it

### The letter

### Review one

### Review two

## Make: a situation of your own

```step
stage: make
insight: "Inventing a situation and its expression reverses the lesson: from an expression back to a story."
check: { type: reflect, text: "I wrote what my letter stands for, wrote an expression for my own situation, and tested it with a number I could check in words." }
```

Make up a situation with a fee paid once and a price for each one: a club, a game, a delivery. Write "Let ___ be the number of ___." Then write an expression for the total, and test it with one case.

Stretch: swap with a partner and see if they can write your expression from the story alone.
