---
order: 4
unit: expressions
title: Words into expressions
summary: Words such as "more than", "less than", "twice" and "divided by" each mean an operation. Write the operations in the order the words say them, then check with a number.
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "\"Twice as many\", \"5 less than\", \"shared between 4\": every maths sentence about a number can be written with a letter."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8145
  url: http://127.0.0.1:8145/index.html
  readySelector: "#sl-n"
  layout: full
explainPicture: { ref: formula.yml#pic, caption: "\"3 more than twice $n$\": twice $n$ is $2n$, then 3 more gives $2n + 3$. With $n = 4$: $2 \\times 4 + 3 = 11$." }
explainClip:
  query: { code: "@formula.yml#explain", fresh: 1, id: explain }
  caption: "Say it in steps, then write each step"
  say: "Say it in steps, then write each step."
  clip:
    - caption: { text: "\"3 more than twice n\": say it in steps.", say: "Three more than twice n: say it in steps." }
    - wait: 400
    - caption: { text: "Twice n is 2 × n, written 2n.", say: "Twice n is two times n, written two n." }
    - caption: { text: "Then 3 more: add 3. The expression is 2n + 3.", say: "Then three more means add three: two n plus three." }
    - wait: 400
    - caption: { text: "Check with n = 4: twice 4 is 8, and 3 more is 11.", say: "Check with four: twice four is eight, and three more is eleven." }
    - click: Make n bigger
    - caption: { text: "Change n: n = 5 gives 13. The expression still works.", say: "Change n, and the expression still works." }
    - expect: { selector: ".rulework", contains: "T = 2 × 5 + 3 = 13" }
    - wait: 1200
---
A letter can stand for any number, so a sentence about "a number" can be written as an **expression**. Each word that tells you what to do to the number, such as *more than*, *less than*, *twice* or *divided by*, becomes an operation. The skill is writing the operations in the order the words give them.

## Predict: 5 less than n

```step
stage: predict
insight: "Committing to an expression for 'less than' exposes writing the numbers in the order they are spoken: 5 − n."
check:
  type: predict
  q: "$n$ is a number. Which expression means \"5 less than $n$\"?"
  options: ["$n - 5$", "$5 - n$", "$5n$", "$\\frac{n}{5}$"]
  actual: "n − 5. 5 less than 12 is 7, which is 12 − 5. The thing you start from (n) comes first in the subtraction, even though 5 is said first."
```

Try it with a real number: what is 5 less than 12? Which expression gives that?

## Run: what do the words give?

```step
stage: run
insight: "Comparing the board's numbers with the words fixes the meaning of 'less than' before any expression is written."
try: { playground: board, starter: "formula.yml#run", height: 400 }
check: { type: board, text: "Set $n = 12$. The board gives \"5 less than $n$\". What does it show? Does that match your prediction?", when: "n = 12" }
```

The board does what the words say to $n$, and shows the result $T$. Try other values of $n$. Is $5 - n$ ever the same as what the board shows?

## Investigate: from words to an expression

```step
stage: investigate
insight: "Each word names an operation; an expression is those operations written in the order the words say them, and a number check catches a swapped order."
tasks:
  - check:
      type: answer
      q: "Write an expression for \"3 more than $x$\"."
      answer: "x + 3"
      feedback:
        - ["3x", "3x means 3 lots of x. \"More than\" means add."]
        - ["3 - x", "\"More\" means add, not take away."]
      explain: "x + 3. Check with x = 10: 3 more than 10 is 13, and 10 + 3 = 13."
  - check:
      type: question
      q: "A number $n$ is divided by 4. Which expression is that?"
      options: ["$\\frac{n}{4}$", "$\\frac{4}{n}$", "$4n$"]
      answer: 0
      explain: "n ÷ 4 puts n on top: n/4. Check with n = 20: 20 ÷ 4 = 5. 4/n would be 4 ÷ 20."
  - check:
      type: bug
      code: "working.txt#ana"
      text: "Ana writes \"7 less than $n$\". Click the line where she goes wrong."
      answer: 3
      fault: logic
      misconception: reverse-subtract
      explain: "Line 3: \"7 less than n\" means take 7 away from n, so n − 7. Check with n = 10: 7 less than 10 is 3, but 7 − 10 is −3."
```

### Three more than twice n

Here is how to turn words into an expression, one step at a time.

```worked
\text{3 more than twice } n :: Break the words into the parts they name.
\text{twice } n :: Start with the part said first: twice a number is $2 \times n$.
2n :: A number next to a letter means multiply, so write $2n$.
\text{3 more than } 2n :: "More than" means add 3 to that.
2n + 3 :: The expression.
n = 4: \; 2 \times 4 + 3 = 11 :: Check with a number: twice 4 is 8, and 3 more is 11.
```

### Find the mistake

Read Ana's working one line at a time. What is 7 less than 10? What does her expression give?

### Your turn

Write each expression, then try a number to check it.

## Modify: other words

```step
stage: modify
insight: "One change at a time: dividing, adding after multiplying, subtracting after multiplying, and two letters."
try: { playground: board, starter: "formula.yml#half", height: 400 }
tasks:
  - starter: "formula.yml#half"
    check:
      type: answer
      q: "Write an expression for \"half of $n$\"."
      answer: "n/2"
      feedback:
        - ["2n", "That doubles n. Half means divide by 2."]
        - ["n - 2", "That takes 2 away. Half means share into 2 equal parts."]
      explain: "n/2 (or n ÷ 2). Check: half of 6 is 3, and 6 ÷ 2 = 3."
  - starter: "formula.yml#more"
    check:
      type: answer
      q: "Write an expression for \"5 more than 3 times $n$\"."
      answer: "3n + 5"
      feedback:
        - ["5n + 3", "Which number is multiplied by n? \"3 times n\" is 3n, then add 5."]
        - ["8n", "Don't combine them: only the 3 multiplies n, and the 5 is added on after."]
      explain: "3n + 5: 3 times n, then 5 more. Check with n = 4: 3 × 4 + 5 = 17."
  - starter: "formula.yml#less"
    check:
      type: answer
      q: "Write an expression for \"2 less than 4 times $n$\"."
      answer: "4n - 2"
      feedback:
        - ["2 - 4n", "\"2 less than\" means take 2 away from 4n, so 4n comes first."]
        - ["4(n - 2)", "That subtracts 2 from n first. Here 4n is made first, then 2 is taken away."]
      explain: "4n − 2. Check with n = 3: 4 × 3 = 12, and 2 less than that is 10."
  - starter: "formula.yml#product"
    check:
      type: answer
      q: "Write an expression for \"the product of $a$ and $b$\"."
      answer: "ab"
      feedback:
        - ["a + b", "That is the sum. The product is what you get by multiplying."]
      explain: "ab means a × b. Check with a = 3 and b = 4: 3 × 4 = 12."
```

### Half

The board does what the words say, and shows the answer. Write your expression, then check it with a number.

### More than

### Less than

### Two letters

## Practise: say it, then write it

```step
stage: practise
insight: "Turning everyday sentences into expressions, where the order of a subtraction depends on the story; the review is substituting."
tasks:
  - check:
      type: answer
      q: "Ben is $n$ years old. His sister is 6 years older. Write an expression for his sister's age."
      answer: "n + 6"
      feedback:
        - ["6n", "6n means 6 times n. \"6 years older\" means add 6."]
      explain: "n + 6. If Ben is 10, his sister is 16."
  - check:
      type: answer
      q: "Eggs come in boxes of 12. Write an expression for the number of eggs in $b$ boxes."
      answer: "12b"
      feedback:
        - ["12 + b", "Each box holds 12, so b boxes hold 12 × b: multiply, do not add."]
      explain: "12b: 12 eggs in each of b boxes. Check with b = 2: 24 eggs."
  - check:
      type: answer
      q: "A pizza has 8 slices. $n$ slices are eaten. Write an expression for the slices left."
      answer: "8 - n"
      feedback:
        - ["n - 8", "That would be negative if you eat fewer than 8. The slices left are what is taken away from 8."]
      explain: "8 − n: you start with 8 and take n away. Here 8 comes first, unlike \"8 less than n\"."
  - check:
      type: answer
      q: "Review: find $3n + 5$ when $n = 4$."
      answer: "17"
      feedback:
        - ["57", "3n means 3 × n. Multiply, then add 5."]
        - ["32", "That adds first. Multiply before adding."]
      explain: "3 × 4 + 5 = 12 + 5 = 17."
```

### Older

### Eggs

### Pizza

### Review

## Make: find the rule

```step
stage: make
insight: "Reading an expression off a mystery board reverses the lesson: from numbers back to words and an expression."
try: { playground: board, starter: "formula.yml#make", height: 400 }
hint: ["Try n = 0 and n = 1. How much does T go up each time n goes up by 1?", "At n = 0 the board shows −1."]
check:
  type: answer
  q: "The mystery board follows a rule in $n$. Move $n$ and watch $T$. Write an expression for $T$."
  answer: "4n - 1"
  feedback:
    - ["4n + 1", "Check n = 0: the board shows −1, not 1."]
    - ["n - 4", "Check n = 1: the board shows 3, but 1 − 4 is −3."]
  explain: "T = 4n − 1: 4 times n, then 1 less. In words: \"1 less than 4 times n\"."
```

Say your expression in words, the way you did in this lesson.

Stretch: write a story that your expression could describe.
