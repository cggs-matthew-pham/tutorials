---
title: "Text as numbers"
subtitle: "Data representation · Data as numbers · Lesson 2"
---

# Text as numbers

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every message you send is stored as a list of numbers. What list is your name?


:::teacher-note

**In one sentence:** Students type words and read their character codes to see that text is a list of codes, one per character, including spaces, digits and lower case, and that Unicode gives codes to every character (AC9TDI8K03 node 2).

**Students should be able to say:** I can say how a word is stored as numbers. I can find the code of a letter, a space or a digit. I can explain why some characters need more than one byte.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**In text, **A** is stored as 65 and **B** as 66. How is the word **CAB** stored?**

☐ One number for the whole word

☐ As the letters C, A, B themselves

☐ 3, 1, 2

☐ 67, 65, 66

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 67, 65, 66. Each character has its own code, and the capital letters count on from A = 65, so C is 67. The computer stores only the numbers.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: Hi 7!


:::keep-together

### Encode Hi 7!

1. $\text{H} \to 72$ — Capital letters start at A = 65. H is the 8th letter: 65 + 7.
2. $\text{i} \to 105$ — Lower case has its own codes, starting at a = 97. Each is 32 more than its capital (I is 73).
3. $\text{space} \to 32$ — A space is a character too, so it has a code.
4. $\text{7} \to 55$ — The digit 7 is a character. Digits start at 0 = 48, so 7 is 55.
5. $\text{!} \to 33$ — Symbols have codes as well.
6. $\text{Hi 7!} \to 72, 105, 32, 55, 33$ — Text is the list of codes, in order.

Now find lower case c.

**Lower case letters start at a = 97. What number stores lower case **c**?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 99

a is 97, b is 98, c is 99. Each lower case letter is 32 more than its capital (C is 67).

:::


:::keep-together

### Find the mistake

**Sam stores the text "Year 7" as numbers. Click the line where the working first goes wrong.**

```
 1  Store the text "Year 7" as numbers.
 2  Y is 89, e is 101, a is 97, r is 114.
 3  The space between the words is 32.
 4  The 7 is a number already, so it is stored as 7.
 5  So "Year 7" is 89, 101, 97, 114, 32, 7.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

Line 4: in text, the 7 is a character like any other, and its code is 55 (the digits start at 0 = 48). 7 is the code for a control character, not the digit.

:::


:::keep-together

### Capital or lower case?

**Why do **A** and **a** have different codes?**

☐ They are different characters, so the computer must be able to tell them apart

☐ So that lower case takes up more space

☐ Lower case letters are smaller, so they need a bigger number

☐ They don't: A and a are both 65

:::


:::teacher-note

**Answer:** They are different characters, so the computer must be able to tell them apart

A and a look different and mean different things in passwords and names, so each has its own code. That is why passwords are case sensitive.

:::


:::typical

## Vary: change one character


**Lower case.** 

**One capital.** 

**A digit.** 

**A space.** 

**Beyond A to Z.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Codes


:::keep-together

### Last letter

**Capital letters run from A = 65. What is the code for **Z**?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 90

65 + 25 = 90.

:::


:::keep-together

### A list of codes

**Which list stores the text **Go 2**?**

☐ 7, 15, 2

☐ 71, 111, 50

☐ 71, 111, 32, 50

☐ 71, 111, 2

:::


:::teacher-note

**Answer:** 71, 111, 32, 50

G 71, o 111, space 32, digit 2 is 50.

:::


:::keep-together

### Passwords

**Your password is **cat** but you type **Cat**. Why does it fail?**

☐ Passwords ignore capitals

☐ C is stored as 67 but c is 99, so the codes don't match

☐ The computer can't read capital letters

☐ Cat is longer than cat

:::


:::teacher-note

**Answer:** C is stored as 67 but c is 99, so the codes don't match

The computer compares codes, and 67 is not 99.

:::


:::keep-together

### Code to character

**What character has the code 97 + 25 = 122?**

☐ y

☐ The number 122

☐ z

☐ Z

:::


:::teacher-note

**Answer:** z

97 is a, so 97 + 25 is the 26th lower case letter, z.

:::


:::keep-together

### Review: same numbers

**Review: a text file holds 72, 105. A paint program opens it. What does it show?**

☐ Two shades of grey

☐ The word Hi

☐ Nothing

☐ The numbers 72 and 105 as text

:::


:::teacher-note

**Answer:** Two shades of grey

The same numbers, read with a different rule: two dark greys.

:::


## Make: change case with numbers

Stretch: the Caesar cipher in Secret messages adds the same number to every code. What would adding 1 to every code in HI make?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Write the codes for the text Hi 5.**

{{lines-3}}

:::


:::teacher-note

**Answer:** 72, 105, 32, 53 (the digit 5 is 48 + 5).

:::

