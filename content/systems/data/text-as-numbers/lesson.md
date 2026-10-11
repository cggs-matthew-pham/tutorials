---
order: 2
unit: numbers
node: AC9TDI8K03 n2
introduces: [text-as-numbers]
title: Text as numbers
summary: "Text is stored as a list of numbers, one for each character. Every character has its own code: A is 65, a is 97, a space is 32 and even the digit 7 has a code (55). Unicode gives codes to over a hundred thousand characters, including emoji."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Every message you send is stored as a list of numbers. What list is your name?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8469
  url: http://127.0.0.1:8469/index.html
  readySelector: ".dcell"
  layout: full
explainPicture: { ref: text.yml#explain-pic, caption: "Hi 7! stored as text: H 72, i 105, a space 32, the digit 7 as 55, and ! 33. Every character has a code, even the space and the digit." }
explainClip:
  query: { code: "@text.yml#explain", fresh: 1, id: explain }
  caption: "Characters and their codes"
  say: "Each character you type is stored as its code."
  clip:
    - caption: { text: "Hi is stored as 72, 105.", say: "Hi is stored as seventy two, one hundred and five." }
    - wait: 1200
    - type: { into: "Type text", text: " 7", append: true }
    - expect: { selector: "#gsum", contains: "32, 55" }
    - caption: { text: "A space is 32. The digit 7 is 55, not 7.", say: "A space has a code. So does the digit seven." }
    - wait: 1800
---
In Everything is numbers, the numbers 72, 105, 33 were read as the text Hi!. Text is stored that way: as a list of numbers, one for each **character** (a letter, digit, space or symbol). Each character's number is its **code**.

## Predict: how is CAB stored?

```step
stage: predict
insight: "Committing to how a word is stored shows whether students expect one code per character (and A = 65 counting on), alphabet positions, or the letters themselves stored."
check:
  type: predict
  q: "In text, **A** is stored as 65 and **B** as 66. How is the word **CAB** stored?"
  options: ["67, 65, 66", "3, 1, 2", "One number for the whole word", "As the letters C, A, B themselves"]
  actual: "67, 65, 66. Each character has its own code, and the capital letters count on from A = 65, so C is 67. The computer stores only the numbers."
```

## Try: type a word

```step
stage: run
insight: "Typing CAB and reading the codes settles the prediction: one code per character, in order."
try: { playground: board, starter: "text.yml#run", height: 460 }
check: { type: board, text: "Type CAB in the box. What numbers are stored?", when: "n = 3 and a = 67 and b = 65 and c = 66", explain: "C is 67, A is 65, B is 66: one code for each character, in the order you typed them." }
```

Was your prediction right? Now try your name.

## Worked example: Hi 7!

```step
stage: investigate
insight: "Encoding Hi 7! one character at a time models the new move, including the cases students forget: lower case has its own codes, a space is a character, and a digit is a character with a code. Sam stores the digit 7 as 7, the misconception planted after the method."
tasks:
  - check:
      type: answer
      q: "Lower case letters start at a = 97. What number stores lower case **c**?"
      answer: "99"
      feedback:
        - ["67", "67 is capital C. Lower case letters have their own codes, starting at a = 97."]
        - ["3", "3 is c's place in the alphabet. Count on from a = 97."]
      explain: "a is 97, b is 98, c is 99. Each lower case letter is 32 more than its capital (C is 67)."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam stores the text \"Year 7\" as numbers. Click the line where the working first goes wrong."
      answer: 4
      fault: logic
      misconception: digit-char-code
      explain: "Line 4: in text, the 7 is a character like any other, and its code is 55 (the digits start at 0 = 48). 7 is the code for a control character, not the digit."
  - check:
      type: question
      q: "Why do **A** and **a** have different codes?"
      options: ["They are different characters, so the computer must be able to tell them apart", "Lower case letters are smaller, so they need a bigger number", "They don't: A and a are both 65", "So that lower case takes up more space"]
      answer: 0
      feedback: [null, "The size on screen has nothing to do with the code.", "Type A, then a, on the board: 65 and 97.", "Each code takes the same space."]
      explain: "A and a look different and mean different things in passwords and names, so each has its own code. That is why passwords are case sensitive."
```

### Encode Hi 7!

```worked
\text{H} \to 72 :: Capital letters start at A = 65. H is the 8th letter: 65 + 7.
\text{i} \to 105 :: Lower case has its own codes, starting at a = 97. Each is 32 more than its capital (I is 73).
\text{space} \to 32 :: A space is a character too, so it has a code.
\text{7} \to 55 :: The digit 7 is a character. Digits start at 0 = 48, so 7 is 55.
\text{!} \to 33 :: Symbols have codes as well.
\text{Hi 7!} \to 72, 105, 32, 55, 33 :: Text is the list of codes, in order.
```

Now find lower case c.

### Find the mistake

### Capital or lower case?

## Vary: change one character

```step
stage: modify
insight: "Each task changes one thing in the typed text: case, one letter, a digit, a space, then a character beyond one byte (Unicode)."
try: { playground: board, starter: "text.yml#modify", height: 480 }
tasks:
  - check: { type: board, text: "Type cab in lower case. How did the codes change?", when: "n = 3 and a = 99 and b = 97 and c = 98", explain: "Each code went up by 32: c is 99, a is 97, b is 98." }
  - check: { type: board, text: "Now type Cab: only the first letter is a capital.", when: "n = 3 and a = 67 and b = 97 and c = 98", explain: "Only the first code changed back to 67." }
  - check: { type: board, text: "Type just the digit 7.", when: "n = 1 and a = 55", explain: "The digit 7 is stored as 55. To the computer, a digit in text is a character, not an amount." }
  - check: { type: board, text: "Type two words with a space between them, such as hi there.", when: "n > 2 and w >= 1", explain: "The space is stored as 32, between the codes of the two words." }
  - check: { type: board, text: "Type an emoji or an accented letter such as é or ñ. What happens to the code?", when: "u > 126", explain: "These characters have codes too, from Unicode, which gives codes to over a hundred thousand characters. Codes above 255 do not fit in one byte (0 to 255), so they are stored in two to four bytes." }
```

### Lower case

### One capital

### A digit

### A space

### Beyond A to Z

## Practise: codes

```step
stage: practise
insight: "Codes both ways, a digit and a space, case in passwords, and a review that the same numbers read as another kind of data mean something else."
tasks:
  - check:
      type: answer
      q: "Capital letters run from A = 65. What is the code for **Z**?"
      answer: "90"
      feedback:
        - ["91", "Z is the 26th letter, so it is 25 after A: 65 + 25."]
        - ["26", "That is Z's place in the alphabet. Count on from A = 65."]
      explain: "65 + 25 = 90."
  - check:
      type: question
      q: "Which list stores the text **Go 2**?"
      options: ["71, 111, 32, 50", "71, 111, 2", "7, 15, 2", "71, 111, 50"]
      answer: 0
      feedback: [null, "The digit 2 is a character: its code is 50. And the space needs a code too.", "Those are alphabet positions, not codes.", "The space between the words is a character too: 32."]
      explain: "G 71, o 111, space 32, digit 2 is 50."
  - check:
      type: question
      q: "Your password is **cat** but you type **Cat**. Why does it fail?"
      options: ["C is stored as 67 but c is 99, so the codes don't match", "The computer can't read capital letters", "Passwords ignore capitals", "Cat is longer than cat"]
      answer: 0
      feedback: [null, "It can: C is 67.", "Most don't: they compare the codes, and the codes differ.", "They have the same number of characters."]
      explain: "The computer compares codes, and 67 is not 99."
  - check:
      type: question
      q: "What character has the code 97 + 25 = 122?"
      options: ["z", "Z", "y", "The number 122"]
      answer: 0
      feedback: [null, "Capital Z is 90. 97 starts the lower case letters.", "y is 121, one less.", "As text, 122 is a character's code."]
      explain: "97 is a, so 97 + 25 is the 26th lower case letter, z."
  - check:
      type: question
      q: "Review: a text file holds 72, 105. A paint program opens it. What does it show?"
      options: ["Two shades of grey", "The word Hi", "Nothing", "The numbers 72 and 105 as text"]
      answer: 0
      feedback: [null, "Hi is what a text program makes of the numbers.", "It shows the numbers read as shades.", "A paint program reads numbers as colours, not text."]
      explain: "The same numbers, read with a different rule: two dark greys."
```

### Last letter

### A list of codes

### Passwords

### Code to character

### Review: same numbers

## Make: change case with numbers

```step
stage: make
insight: "Changing the codes to turn HI into hi, without typing, reverses the process: students use the rule (lower case is 32 more) to set the numbers directly."
try: { playground: board, starter: "text.yml#make", height: 440 }
hint: ["Lower case is 32 more than its capital.", "H is 72, so h is 72 + 32.", "Change 72 to 104 and 73 to 105."]
check: { type: board, text: "The board shows HI (72, 73). Change only the numbers so the text reads hi in lower case.", when: "a = 104 and b = 105", explain: "Each lower case letter is 32 more than its capital: 72 + 32 = 104 (h) and 73 + 32 = 105 (i)." }
```

Stretch: the Caesar cipher in Secret messages adds the same number to every code. What would adding 1 to every code in HI make?
