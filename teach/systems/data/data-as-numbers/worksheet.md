---
title: "Everything is numbers"
subtitle: "Data representation · Data as numbers · Lesson 1"
---

# Everything is numbers

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A message, a photo and a song all end up in the same computer memory. What is actually stored there?


:::teacher-note

**In one sentence:** Students switch one set of numbers between text, grey shades and sound to see that all data is stored as numbers and that an encoding gives the numbers their meaning (AC9TDI8K03 node 1).

**Students should be able to say:** I can say how text, pictures and sound are all stored. I can explain why the same number can mean different things. I can give an example of a number standing for something that is not a number.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**A file holds three numbers: 72, 105, 33. A text program opens it and shows **Hi!**. A paint program opens the same file. What does it show?**

☐ The letters Hi! drawn as a picture

☐ Three shades of grey, one for each number

☐ Nothing: a text file cannot be a picture

☐ The numbers 72, 105 and 33 written out

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Three shades of grey. The paint program reads each number as a shade (0 black, 255 white), so 72, 105 and 33 are three darkish greys. The letters only exist when a text program reads the numbers.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: one number, three meanings


:::keep-together

### Read 72 three ways

1. $72$ — The number stored. It is the same in every row.
2. $72 \to \text{H}$ — As text: the letter whose code is 72.
3. $72 \to \text{dark grey}$ — As a grey shade: 0 is black and 255 is white, so 72 is darkish.
4. $72 \to \text{below the middle}$ — As sound: 128 is the middle (silence), so 72 is a level below it.
5. $\text{same number, different rule}$ — The encoding, not the number, decides what it means.

Now read 255 as a shade.

**A paint program reads numbers as grey shades from 0 (black) to 255 (white). What does it show for 255?**

☐ Mid grey

☐ Black

☐ White

☐ The letter ÿ

:::


:::teacher-note

**Answer:** White

255 is the top of the scale, so it is white. The same 255 in a text file would be read as a character instead.

:::


:::keep-together

### Find the mistake

**Sam reasons about a file holding 72, 105, 33. Click the line where the reasoning first goes wrong.**

```
 1  A file holds the numbers 72, 105, 33.
 2  A text program shows them as "Hi!".
 3  So the numbers 72, 105, 33 mean "Hi!".
 4  A paint program opens the same file.
 5  It shows the letters "Hi!" drawn as a picture.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: the numbers don't mean Hi! by themselves. Hi! is what a text program makes of them. A paint program reads the same numbers as greys, so line 5 is wrong because line 3 was.

:::


:::keep-together

### A number for something else

**Which of these is an example of a number standing for something that is not a number?**

☐ 65 kg written on a scale

☐ 65 as the answer to 60 + 5

☐ 65 written in a maths book

☐ 65 stored for the letter A in a text message

:::


:::teacher-note

**Answer:** 65 stored for the letter A in a text message

In text, the letter A is stored as the number 65. The 65 is a code for a letter, not an amount.

:::


:::typical

## Vary: change one number


**White.** 

**Black.** 

**The next letters.** 

**Silence.** 

**Not a letter.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Which rule?


:::keep-together

### Letter codes

**In text, A is stored as 65 and the letters go in order. What number stores C?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 67

A is 65, B is 66, C is 67.

:::


:::keep-together

### Wrong program

**A music program opens a text file. What will you most likely hear?**

☐ Noise: it reads the letter codes as sound levels

☐ The program refuses to open it

☐ The text read aloud

☐ Silence

:::


:::teacher-note

**Answer:** Noise: it reads the letter codes as sound levels

The music program reads every letter code as a sound level, so meaningful text becomes meaningless noise. The data is fine; the rule is wrong for it.

:::


:::keep-together

### Shades

**A grey shade of 0 is…**

☐ Invisible

☐ Black

☐ Mid grey

☐ White

:::


:::teacher-note

**Answer:** Black

0 means no light, so black.

:::


:::keep-together

### File types

**Why does a file need to say what kind of data it holds (for example .txt or .png)?**

☐ Because text and pictures are stored as different kinds of electricity

☐ So the program knows which rule to read the numbers with

☐ So the numbers take up less space

☐ It doesn't: every program can tell from the numbers

:::


:::teacher-note

**Answer:** So the program knows which rule to read the numbers with

The numbers alone don't say what they are. The file type tells programs which encoding to use.

:::


## Make: write a word

Then switch the reading: what does your word look like as grey shades, and as sound?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**The number 66 is stored in memory. Give two different things it could mean.**

{{lines-3}}

:::


:::teacher-note

**Answer:** Any two of: the letter B (as text), a dark grey (as a shade), a sound level below the middle (as audio), or the number 66 itself. Which one depends on the program's encoding.

:::

