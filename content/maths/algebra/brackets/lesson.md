---
order: 5
unit: expressions
node: AC9M7A02 n2
title: When brackets are needed
summary: Brackets keep a part together so it is worked out first. If a sentence says to do something to a whole result, such as "add 3, then double it", the expression needs brackets.
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "\"Add 4, then double it\" and \"double it, then add 4\" sound alike. They give different answers, and different expressions."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8146
  url: http://127.0.0.1:8146/index.html
  readySelector: "#sl-n"
  layout: full
explainPicture: { ref: formula.yml#pic, caption: "\"Add 3 to $n$, then double the result\": the brackets keep $n + 3$ together, so $2(n + 3)$. With $n = 4$: $2(4 + 3) = 14$. Without brackets, $2n + 3 = 11$." }
explainClip:
  query: { code: "@formula.yml#explain", fresh: 1, id: explain }
  caption: "Brackets keep a part together"
  say: "Brackets keep a part together, so it is worked out first."
  clip:
    - caption: { text: "\"Add 3 to n, then double the result.\"", say: "Add three to n, then double the result." }
    - wait: 400
    - caption: { text: "First step: add 3 to n. That is n + 3.", say: "The first step is n plus three." }
    - caption: { text: "Double the whole result: brackets keep n + 3 together.", say: "Double the whole result, so brackets keep n plus three together." }
    - wait: 400
    - caption: { text: "2(n + 3). With n = 4: 4 + 3 = 7, then double: 14.", say: "With four: four plus three is seven, doubled is fourteen." }
    - click: Make n bigger
    - caption: { text: "n = 5: 5 + 3 = 8, doubled is 16.", say: "With five: eight, doubled, is sixteen." }
    - expect: { selector: ".rulework", contains: "T = 2(5 + 3) = 16" }
    - wait: 1200
---
In the last lesson each sentence was written from left to right. Some sentences need more care: "add 3 to $n$, then double *the result*" doubles the whole of $n + 3$. **Brackets** group that part so it is worked out first.

## Predict: stickers

```step
stage: predict
insight: "Committing to an expression exposes leaving the brackets out, so the doubling only applies to n."
check:
  type: predict
  q: "Dan has $n$ stickers. He gets 3 more, then doubles the lot. Which expression is the number he ends with?"
  options: ["$2n + 3$", "$2(n + 3)$", "$n + 6$", "$5n$"]
  actual: "2(n + 3). He adds 3 first (n + 3), then doubles all of it. 2n + 3 would double only his own stickers and add 3 afterwards."
```

Try Dan with 4 stickers: 4 and 3 more is 7, doubled is 14. Which expression gives 14?

## Run: check the words

```step
stage: run
insight: "The board follows the words exactly, so its number for n = 4 shows which expression keeps the order of the steps."
try: { playground: board, starter: "formula.yml#run", height: 400 }
check: { type: board, text: "Set $n = 4$. Dan has 4 stickers, gets 3 more and doubles the lot. How many does the board show?", when: "n = 4" }
```

Work out $2 \times 4 + 3$ and $2(4 + 3)$. Which one matches the board?

## Investigate: where do the brackets go?

```step
stage: investigate
insight: "Brackets go around the part that is done first, when something is then done to the whole result."
tasks:
  - check:
      type: answer
      q: "Write an expression for \"add 4 to $n$, then multiply the result by 5\"."
      answer: "5(n + 4)"
      feedback:
        - ["5n + 4", "That multiplies only n. The 5 should multiply the whole n + 4: use brackets."]
        - ["5 + n + 4", "That adds. \"Multiply the result by 5\" means 5 lots of the whole n + 4."]
      explain: "5(n + 4): the brackets keep n + 4 together. Check with n = 1: 1 + 4 = 5, then × 5 = 25, and 5(1 + 4) = 25."
  - check:
      type: question
      q: "Which expression means \"subtract 3 from $n$, then divide the result by 2\"?"
      options: ["$\\frac{n - 3}{2}$", "$n - \\frac{3}{2}$", "$\\frac{n}{2} - 3$"]
      answer: 0
      explain: "The whole of n − 3 is divided by 2. The fraction bar works like brackets. Check with n = 11: 11 − 3 = 8, and 8 ÷ 2 = 4."
  - check:
      type: bug
      code: "working.txt#jo"
      text: "Jo writes \"add 2 to $x$, then multiply by 6\". Click the line where she goes wrong."
      answer: 3
      fault: logic
      misconception: missing-brackets
      explain: "Line 3: 6x + 2 multiplies only x, then adds 2. To multiply the whole x + 2 by 6 she needs brackets: 6(x + 2). Check with x = 1: 1 + 2 = 3, × 6 = 18, but 6 × 1 + 2 = 8."
```

### Add 3, then double

Here is how to decide where the brackets go.

```worked
\text{add 3 to } n, \text{ then double the result} :: Find the step done first, and what is done to its result.
n + 3 :: The first step: add 3 to $n$.
\text{double the result} :: "The result" is the whole of $n + 3$, not just $n$.
2(n + 3) :: Brackets keep $n + 3$ together, so it is worked out first and then doubled.
n = 4: \; 2(4 + 3) = 2 \times 7 = 14 :: Check: add 3 to 4 to get 7, then double it.
2n + 3 :: Compare: this doubles $n$ only and then adds 3. For $n = 4$ it gives 11, not 14.
```

### Find the mistake

Read Jo's working one line at a time. Which operation is done to the whole of $x + 2$?

### Your turn

Say the steps, then decide whether a part needs brackets.

## Modify: new sentences

```step
stage: modify
insight: "One change at a time: subtract first, a sentence that needs no brackets, two letters, and dividing the whole result."
try: { playground: board, starter: "formula.yml#sub-first", height: 400 }
tasks:
  - starter: "formula.yml#sub-first"
    check:
      type: answer
      q: "Write an expression for \"subtract 2 from $n$, then multiply the result by 3\"."
      answer: "3(n - 2)"
      feedback:
        - ["3n - 2", "That multiplies only n, then subtracts 2. Subtract first, then multiply the whole result: use brackets."]
        - ["3 - n - 2", "Multiply the whole result by 3."]
      explain: "3(n − 2). Check with n = 5: 5 − 2 = 3, then × 3 = 9."
  - starter: "formula.yml#no-brackets"
    check:
      type: answer
      q: "Write an expression for \"multiply $n$ by 3, then add 2\"."
      answer: "3n + 2"
      feedback:
        - ["3(n + 2)", "That adds 2 first. Here n is multiplied first, then 2 is added: no brackets needed."]
      explain: "3n + 2. Brackets are only needed when a later step applies to a result that was made by an earlier add or subtract."
  - starter: "formula.yml#two-letters"
    check:
      type: answer
      q: "Write an expression for \"add $a$ and $b$, then multiply the result by 4\"."
      answer: "4(a + b)"
      feedback:
        - ["4a + b", "That multiplies only a. The 4 multiplies the whole sum: use brackets."]
      explain: "4(a + b). Check with a = 2 and b = 3: 2 + 3 = 5, then × 4 = 20."
  - starter: "formula.yml#halve"
    check:
      type: answer
      q: "Write an expression for \"add 5 to $n$, then halve the result\"."
      answer: "(n + 5)/2"
      feedback:
        - ["n + 5/2", "That halves only the 5. The whole n + 5 is halved: put it in brackets, or over the fraction bar."]
        - ["n/2 + 5", "That halves n and then adds 5. Add the 5 first, then halve the whole."]
      explain: "(n + 5)/2. Check with n = 3: 3 + 5 = 8, then halved is 4."
```

### Subtract, then multiply

The board does what the words say. Write your expression, then check it with a number.

### No brackets

### Two letters

### Halving

## Practise: brackets or not?

```step
stage: practise
insight: "Choosing when brackets are needed, mixed, with one question where they are not; the review is substituting."
tasks:
  - check:
      type: answer
      q: "Books cost 8 dollars each. Write an expression for the cost of $n$ books after taking 5 dollars off the total."
      answer: "8n - 5"
      feedback:
        - ["8(n - 5)", "The 5 dollars comes off the total after the books are multiplied. No brackets: 8n − 5."]
      explain: "8n − 5: the books cost 8n, then 5 dollars is taken off."
  - check:
      type: answer
      q: "A group of $n$ adults and 3 children each pay 6 dollars. Write an expression for the total."
      answer: "6(n + 3)"
      feedback:
        - ["6n + 3", "The 3 children pay 6 dollars each too. Everyone pays 6, so multiply the whole group n + 3."]
      explain: "6(n + 3): the group has n + 3 people and each pays 6 dollars."
  - check:
      type: question
      q: "When $n = 5$, which is bigger, $2(n + 3)$ or $2n + 3$?"
      options: ["$2(n + 3)$, which is 16", "$2n + 3$, which is 13", "They are the same"]
      answer: 0
      explain: "2(5 + 3) = 2 × 8 = 16 and 2 × 5 + 3 = 13. Brackets change the answer."
  - check:
      type: answer
      q: "Review: find $4(n - 1)$ when $n = 6$."
      answer: "20"
      feedback:
        - ["23", "That is 4 × 6 − 1. Do the brackets first: 6 − 1, then × 4."]
      explain: "4 × (6 − 1) = 4 × 5 = 20."
```

### Books

### A group

### Which is bigger?

### Review

## Make: find the rule

```step
stage: make
insight: "Finding an expression with brackets from a mystery board reverses the lesson: from numbers back to the order of steps."
try: { playground: board, starter: "formula.yml#make", height: 400 }
hint: ["Try n = 1, 2 and 3. How much does T go up each time?", "At n = 1 the board shows 0. What step makes that zero?"]
check:
  type: answer
  q: "The mystery board follows a rule in $n$. Move $n$ and watch $T$. Write an expression for $T$, using brackets."
  answer: "5(n - 1)"
  feedback:
    - ["5n - 1", "Check n = 1: the board shows 0, but 5 × 1 − 1 = 4."]
    - ["5(n + 1)", "Check n = 1: the board shows 0, but 5(1 + 1) = 10."]
  explain: "T = 5(n − 1): subtract 1 from n, then multiply the result by 5."
```

Say the steps in words: what does the rule do first, and what next?

Stretch: write a rule of your own with brackets and ask a partner to find it from the board.
