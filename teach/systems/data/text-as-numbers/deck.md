---
marp: true
theme: default
html: true
---

# Text as numbers

Data representation · Data as numbers

<!-- Speaker note: Students type words and read their character codes to see that text is a list of codes, one per character, including spaces, digits and lower case, and that Unicode gives codes to every character (AC9TDI8K03 node 2). About 35 minutes (Predict and Try 6 min · Worked example 10 min · Vary 9 min · Practise and Make 10 min). Sources: The Unicode Standard: code charts, https://www.unicode.org/charts/ (checked 12 October 2026). -->

---

## Today

**We are learning to** text is stored as a list of numbers, one for each character. Every character has its own code: A is 65, a is 97, a space is 32 and even the digit 7 has a code (55). Unicode gives codes to over a hundred thousand characters, including emoji.

- I can say how a word is stored as numbers.
- I can find the code of a letter, a space or a digit.
- I can explain why some characters need more than one byte.

<!-- Speaker note: Before class: Do the Try board yourself: type a few words, then an emoji. The one idea: text is a list of character codes, in order. The codes here are ASCII, which Unicode keeps for the first 128 characters; Unicode then gives codes to every script and to emoji. Bytes come up as "0 to 255 fits in one byte"; the binary lessons explain why. Links: Secret messages (Code pathway) builds ciphers that shift these codes; this lesson is the theory those lessons assume. Teacher: Try: have everyone type their first name and compare: whose code list is longest? Teacher: Worked example: before the 7 line, ask what the digit's code will be. Teacher: Vary: ask why the emoji's code is so big. -->

---

## Why it matters

> Every message you send is stored as a list of numbers. What list is your name?

<!-- Speaker note: In Everything is numbers, the numbers 72, 105, 33 were read as the text Hi!. Text is stored that way: as a list of numbers, one for each **character** (a letter, digit, space or symbol). Each character's number is its **code**. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**In text, **A** is stored as 65 and **B** as 66. How is the word **CAB** stored?**

- One number for the whole word
- As the letters C, A, B themselves
- 3, 1, 2
- 67, 65, 66

<!-- Speaker note: What happens: 67, 65, 66. Each character has its own code, and the capital letters count on from A = 65, so C is 67. The computer stores only the numbers. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose 3, 1, 2 used alphabet positions; ask what A's code is. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fdata%2Ftext-as-numbers%2Fstep-2&code=widget%3A+decode%0Anumbers%3A+72%2C+105%0Aas%3A+text%0Aswitch%3A+off%0Atype%3A+on%0Atable%3A+on%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/data/text-as-numbers/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Now try your name. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 67, 65, 66. Each character has its own code, and the capital letters count on from A = 65, so C is 67. The computer stores only the numbers.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Encode Hi 7!

Now find lower case c.

$$\text{H} \to 72$$

1) $\text{i} \to 105$ — Lower case has its own codes, starting at a = 97. Each is 32 more than its capital (I is 73).
2) $\text{space} \to 32$ — A space is a character too, so it has a code.
3) $\text{7} \to 55$ — The digit 7 is a character. Digits start at 0 = 48, so 7 is 55.
4) $\text{!} \to 33$ — Symbols have codes as well.
5) $\text{Hi 7!} \to 72, 105, 32, 55, 33$ — Text is the list of codes, in order.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write H 72 and say "Capital letters start at A = 65. H is the 8th letter: 65 + 7." Line 1: write i 105 and say "Lower case has its own codes, starting at a = 97. Each is 32 more than its capital (I is 73)." Line 2: write space 32 and say "A space is a character too, so it has a code." Line 3: write 7 55 and say "The digit 7 is a character. Digits start at 0 = 48, so 7 is 55." Line 4: write ! 33 and say "Symbols have codes as well." Line 5: write Hi 7! 72, 105, 32, 55, 33 and say "Text is the list of codes, in order." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Encode Hi 7!

**Lower case letters start at a = 97. What number stores lower case **c**?**

* Answer: 99

<!-- Speaker note: a is 97, b is 98, c is 99. Each lower case letter is 32 more than its capital (C is 67). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam stores the text "Year 7" as numbers. Click the line where the working first goes wrong.**

```
 1  Store the text "Year 7" as numbers.
 2  Y is 89, e is 101, a is 97, r is 114.
 3  The space between the words is 32.
 4  The 7 is a number already, so it is stored as 7.
 5  So "Year 7" is 89, 101, 97, 114, 32, 7.
```

* Answer: line 4

<!-- Speaker note: Line 4: in text, the 7 is a character like any other, and its code is 55 (the digits start at 0 = 48). 7 is the code for a control character, not the digit. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Capital or lower case?

**Why do **A** and **a** have different codes?**

- They are different characters, so the computer must be able to tell them apart
- So that lower case takes up more space
- Lower case letters are smaller, so they need a bigger number
- They don't: A and a are both 65

* Answer: They are different characters, so the computer must be able to tell them apart

<!-- Speaker note: A and a look different and mean different things in passwords and names, so each has its own code. That is why passwords are case sensitive. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change one character



- **Lower case:** 
- **One capital:** 
- **A digit:** 
- **A space:** 
- **Beyond A to Z:** 

[Open this step](https://tutorials.learningwaypoints.com/systems/data/text-as-numbers/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one thing in the typed text: case, one letter, a digit, a space, then a character beyond one byte (Unicode). For students who need more support: Give the code table: A = 65 … Z = 90, a = 97 … z = 122, 0 = 48 … 9 = 57, space = 32. For early finishers: Look up the Unicode code for an emoji you like (or type it on the board). Why do emoji make text messages bigger? The hard part, on purpose: Students treat a digit in text as an amount (7 stored as 7). Have them type 7 on the board and read the code aloud before the Worked example. When students get stuck: A student writes 7 for the digit 7 (Sam's mistake). Ask: What does the board show when you type 7? Fix: In text a digit is a character: 0 is 48, so 7 is 55. / A student forgets the space. Ask: How many characters are in hi there, counting the gap? Fix: The space is a character too: 32. / A student can't find a lower case code. Ask: What is the capital's code? Fix: Add 32. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Last letter

**Capital letters run from A = 65. What is the code for **Z**?**

* Answer: 90

<!-- Speaker note: 65 + 25 = 90. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A list of codes

**Which list stores the text **Go 2**?**

- 7, 15, 2
- 71, 111, 50
- 71, 111, 32, 50
- 71, 111, 2

* Answer: 71, 111, 32, 50

<!-- Speaker note: G 71, o 111, space 32, digit 2 is 50. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Passwords

**Your password is **cat** but you type **Cat**. Why does it fail?**

- Passwords ignore capitals
- C is stored as 67 but c is 99, so the codes don't match
- The computer can't read capital letters
- Cat is longer than cat

* Answer: C is stored as 67 but c is 99, so the codes don't match

<!-- Speaker note: The computer compares codes, and 67 is not 99. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Code to character

**What character has the code 97 + 25 = 122?**

- y
- The number 122
- z
- Z

* Answer: z

<!-- Speaker note: 97 is a, so 97 + 25 is the 26th lower case letter, z. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: same numbers

**Review: a text file holds 72, 105. A paint program opens it. What does it show?**

- Two shades of grey
- The word Hi
- Nothing
- The numbers 72 and 105 as text

* Answer: Two shades of grey

<!-- Speaker note: The same numbers, read with a different rule: two dark greys. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: change case with numbers

Stretch: the Caesar cipher in Secret messages adds the same number to every code. What would adding 1 to every code in HI make?

[Open this step](https://tutorials.learningwaypoints.com/systems/data/text-as-numbers/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Changing the codes to turn HI into hi, without typing, reverses the process: students use the rule (lower case is 32 more) to set the numbers directly. Hints, in order: Lower case is 32 more than its capital. / H is 72, so h is 72 + 32. / Change 72 to 104 and 73 to 105. -->

<!-- Speaker note: Teacher: ask what rule they used to turn capitals into lower case. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Write the codes for the text Hi 5.**

* 72, 105, 32, 53 (the digit 5 is 48 + 5).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Colour and images (each pixel is numbers). Where it leads: Secret messages (shifting codes to make a cipher), and the binary lessons (why one byte holds 0 to 255). -->
