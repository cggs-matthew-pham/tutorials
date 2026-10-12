---
marp: true
theme: default
html: true
---

# Everything is numbers

Data representation · Data as numbers

<!-- Speaker note: Students switch one set of numbers between text, grey shades and sound to see that all data is stored as numbers and that an encoding gives the numbers their meaning (AC9TDI8K03 node 1). About 35 minutes (Predict and Try 6 min · Worked example 10 min · Vary 9 min · Practise and Make 10 min). -->

---

## Today

**We are learning to** a computer stores text, pictures and sound all as numbers. The same numbers mean different things depending on how a program reads them: 72 is the letter H to a text program, a dark grey to a paint program and a sound level to a music program.

- I can say how text, pictures and sound are all stored.
- I can explain why the same number can mean different things.
- I can give an example of a number standing for something that is not a number.

<!-- Speaker note: Before class: Try the board yourself first: switch between Text, Grey shades and Sound. The one idea (the kit's hinge for AC9TDI8K03): every kind of data is stored as integers, and an **encoding** (the rule a program reads them with) gives them meaning. The next three lessons look at each encoding properly (text codes, RGB pixels, sound samples); then the binary lessons show how each number is stored. Simplifications to say out loud if asked: text codes here are ASCII (A = 65); real text uses Unicode, which includes the same codes for these letters. Real pictures use three numbers per pixel (red, green, blue), not one grey. Real sound uses many thousands of samples a second. Teacher: Try: ask whether the top row changed when they switched. Teacher: Worked example: before each line, ask what 72 will be under the next rule. Teacher: Vary: ask why 10 shows nothing as text but a fine shade as grey. -->

---

## Why it matters

> A message, a photo and a song all end up in the same computer memory. What is actually stored there?

<!-- Speaker note: Everything a computer stores, whether a message, a photo or a song, is stored as **numbers**. A number on its own does not say what it is. A program has to read it with a rule, called an **encoding**: a text program reads each number as a letter, a paint program as a colour, a music program as a sound level. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A file holds three numbers: 72, 105, 33. A text program opens it and shows **Hi!**. A paint program opens the same file. What does it show?**

- The letters Hi! drawn as a picture
- Three shades of grey, one for each number
- Nothing: a text file cannot be a picture
- The numbers 72, 105 and 33 written out

<!-- Speaker note: What happens: Three shades of grey. The paint program reads each number as a shade (0 black, 255 white), so 72, 105 and 33 are three darkish greys. The letters only exist when a text program reads the numbers. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose "the letters drawn as a picture" think the letters are stored. Ask what the computer actually has. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fdata%2Fdata-as-numbers%2Fstep-2&code=widget%3A+decode%0Anumbers%3A+72%2C+105%2C+33%0Aas%3A+text%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/data/data-as-numbers/?full=step-2#step-2)

<!-- Speaker note: Now try Sound and All three. The top row never changes. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Three shades of grey. The paint program reads each number as a shade (0 black, 255 white), so 72, 105 and 33 are three darkish greys. The letters only exist when a text program reads the numbers.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Read 72 three ways

Now read 255 as a shade.

$$72$$

1) $72 \to \text{H}$ — As text: the letter whose code is 72.
2) $72 \to \text{dark grey}$ — As a grey shade: 0 is black and 255 is white, so 72 is darkish.
3) $72 \to \text{below the middle}$ — As sound: 128 is the middle (silence), so 72 is a level below it.
4) $\text{same number, different rule}$ — The encoding, not the number, decides what it means.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write 72 and say "The number stored. It is the same in every row." Line 1: write 72 H and say "As text: the letter whose code is 72." Line 2: write 72 dark grey and say "As a grey shade: 0 is black and 255 is white, so 72 is darkish." Line 3: write 72 below the middle and say "As sound: 128 is the middle (silence), so 72 is a level below it." Line 4: write same number, different rule and say "The encoding, not the number, decides what it means." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Read 72 three ways

**A paint program reads numbers as grey shades from 0 (black) to 255 (white). What does it show for 255?**

- Mid grey
- Black
- White
- The letter ÿ

* Answer: White

<!-- Speaker note: 255 is the top of the scale, so it is white. The same 255 in a text file would be read as a character instead. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam reasons about a file holding 72, 105, 33. Click the line where the reasoning first goes wrong.**

```
 1  A file holds the numbers 72, 105, 33.
 2  A text program shows them as "Hi!".
 3  So the numbers 72, 105, 33 mean "Hi!".
 4  A paint program opens the same file.
 5  It shows the letters "Hi!" drawn as a picture.
```

* Answer: line 3

<!-- Speaker note: Line 3: the numbers don't mean Hi! by themselves. Hi! is what a text program makes of them. A paint program reads the same numbers as greys, so line 5 is wrong because line 3 was. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A number for something else

**Which of these is an example of a number standing for something that is not a number?**

- 65 kg written on a scale
- 65 as the answer to 60 + 5
- 65 written in a maths book
- 65 stored for the letter A in a text message

* Answer: 65 stored for the letter A in a text message

<!-- Speaker note: In text, the letter A is stored as the number 65. The 65 is a code for a letter, not an amount. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change one number



- **White:** 
- **Black:** 
- **The next letters:** 
- **Silence:** 
- **Not a letter:** 

[Open this step](https://tutorials.learningwaypoints.com/systems/data/data-as-numbers/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one number and watches all three readings at once: white, black, the next letters, silence, then a control code that is a valid shade but not a visible letter. For students who need more support: Give a short code table (A = 65 … Z = 90, a = 97 … z = 122) for Make. For early finishers: Open any small image or text file in a hex viewer (or ask the teacher to show one). Can you find the letter codes in a text file? The hard part, on purpose: Students think the letters or colours are in the file and the numbers are a translation. Keep pointing at the top row: that is all the computer has; the rows below are what programs make of it. When students get stuck: A student says the file contains the word Hi! (Sam's mistake). Ask: What does the top row show? Is there an H in it? Fix: The file holds 72, 105, 33. Hi! is what a text program makes of them. / A student can't find a letter's code in Make. Ask: What is A's code? How far along the alphabet is your letter? Fix: Count on from A = 65 (or a = 97 for lower case). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Letter codes

**In text, A is stored as 65 and the letters go in order. What number stores C?**

* Answer: 67

<!-- Speaker note: A is 65, B is 66, C is 67. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Wrong program

**A music program opens a text file. What will you most likely hear?**

- Noise: it reads the letter codes as sound levels
- The program refuses to open it
- The text read aloud
- Silence

* Answer: Noise: it reads the letter codes as sound levels

<!-- Speaker note: The music program reads every letter code as a sound level, so meaningful text becomes meaningless noise. The data is fine; the rule is wrong for it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Shades

**A grey shade of 0 is…**

- Invisible
- Black
- Mid grey
- White

* Answer: Black

<!-- Speaker note: 0 means no light, so black. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## File types

**Why does a file need to say what kind of data it holds (for example .txt or .png)?**

- Because text and pictures are stored as different kinds of electricity
- So the program knows which rule to read the numbers with
- So the numbers take up less space
- It doesn't: every program can tell from the numbers

* Answer: So the program knows which rule to read the numbers with

<!-- Speaker note: The numbers alone don't say what they are. The file type tells programs which encoding to use. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: write a word

Then switch the reading: what does your word look like as grey shades, and as sound?

[Open this step](https://tutorials.learningwaypoints.com/systems/data/data-as-numbers/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Building a word from letter codes reverses the process: students start from the meaning and set the numbers that encode it. Hints, in order: Capital letters start at A = 65 and go in order. Lower case starts at a = 97. / Y is the 25th letter, so its code is 65 + 24 = 89. / e is 97 + 4 = 101 and s is 97 + 18 = 115. -->

<!-- Speaker note: Teacher: have students check their word as shades and as sound. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**The number 66 is stored in memory. Give two different things it could mean.**

* Any two of: the letter B (as text), a dark grey (as a shade), a sound level below the middle (as audio), or the number 66 itself. Which one depends on the program's encoding.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Text as numbers (character codes and Unicode). Where it leads: images as RGB pixels and sound as samples (the rest of AC9TDI8K03), then binary: how each number is stored with only 0 and 1. -->
