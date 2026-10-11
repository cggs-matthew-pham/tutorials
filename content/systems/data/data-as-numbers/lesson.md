---
order: 1
unit: numbers
node: AC9TDI8K03 n1
title: Everything is numbers
summary: "A computer stores text, pictures and sound all as numbers. The same numbers mean different things depending on how a program reads them: 72 is the letter H to a text program, a dark grey to a paint program and a sound level to a music program."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A message, a photo and a song all end up in the same computer memory. What is actually stored there?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8322
  url: http://127.0.0.1:8322/index.html
  readySelector: ".dcell"
  layout: full
explainPicture: { ref: numbers.yml#explain-pic, caption: "72, 105, 33 read three ways: as text they spell Hi!, as grey shades they are three greys, as sound they are three levels below the middle line." }
explainClip:
  query: { code: "@numbers.yml#explain", fresh: 1, id: explain }
  caption: "One set of numbers, three meanings"
  say: "These three numbers are all the computer stores."
  clip:
    - caption: { text: "Read as text, 72, 105, 33 spell Hi!", say: "Read as text, they spell hi." }
    - wait: 1200
    - click: Grey shades
    - caption: { text: "Read as grey shades, the same numbers are three greys.", say: "Read as shades, the same numbers are greys." }
    - wait: 1200
    - click: Sound
    - caption: { text: "Read as sound, they are three levels.", say: "Read as sound, they are levels." }
    - wait: 1200
    - click: All three
    - expect: { selector: "#gsum", contains: "72, 105, 33" }
    - caption: { text: "The numbers never changed. Only the rule for reading them did.", say: "The numbers never changed. Only the rule did." }
    - wait: 1500
---
Everything a computer stores, whether a message, a photo or a song, is stored as **numbers**. A number on its own does not say what it is. A program has to read it with a rule, called an **encoding**: a text program reads each number as a letter, a paint program as a colour, a music program as a sound level.

## Predict: one file, two programs

```step
stage: predict
insight: "Committing to what a paint program shows for numbers a text program shows as Hi! tests the new move: the same numbers take a different meaning under a different encoding."
check:
  type: predict
  q: "A file holds three numbers: 72, 105, 33. A text program opens it and shows **Hi!**. A paint program opens the same file. What does it show?"
  options: ["Three shades of grey, one for each number", "The letters Hi! drawn as a picture", "Nothing: a text file cannot be a picture", "The numbers 72, 105 and 33 written out"]
  actual: "Three shades of grey. The paint program reads each number as a shade (0 black, 255 white), so 72, 105 and 33 are three darkish greys. The letters only exist when a text program reads the numbers."
```

## Try: read the same numbers

```step
stage: run
insight: "Switching the board from text to grey shades settles the prediction: the numbers stay 72, 105, 33 while what they show changes."
try: { playground: board, starter: "numbers.yml#run", height: 460 }
check: { type: board, text: "The board reads 72, 105, 33 as text. Switch it to read them as grey shades. Did the numbers change?", when: "r = 2", explain: "The numbers are still 72, 105, 33. Read as shades they are three greys, because the rule for reading them changed, not the data." }
```

Now try Sound and All three. The top row never changes.

## Worked example: one number, three meanings

```step
stage: investigate
insight: "Reading 72 with each rule in turn models the new move: the number is fixed and the encoding gives it its meaning. Sam treats the letters as part of the data, the misconception planted after the method."
tasks:
  - check:
      type: question
      q: "A paint program reads numbers as grey shades from 0 (black) to 255 (white). What does it show for 255?"
      options: ["White", "Black", "Mid grey", "The letter ÿ"]
      answer: 0
      feedback: [null, "0 is black. 255 is the other end.", "Mid grey is about 128.", "That is what a text program might show. A paint program shows a shade."]
      explain: "255 is the top of the scale, so it is white. The same 255 in a text file would be read as a character instead."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam reasons about a file holding 72, 105, 33. Click the line where the reasoning first goes wrong."
      answer: 3
      fault: logic
      misconception: data-meaning-fixed
      explain: "Line 3: the numbers don't mean Hi! by themselves. Hi! is what a text program makes of them. A paint program reads the same numbers as greys, so line 5 is wrong because line 3 was."
  - check:
      type: question
      q: "Which of these is an example of a number standing for something that is not a number?"
      options: ["65 stored for the letter A in a text message", "65 kg written on a scale", "65 as the answer to 60 + 5", "65 written in a maths book"]
      answer: 0
      feedback: [null, "That 65 is a number of kilograms: it is still a number.", "That 65 is a number.", "That 65 is a number."]
      explain: "In text, the letter A is stored as the number 65. The 65 is a code for a letter, not an amount."
```

### Read 72 three ways

```worked
72 :: The number stored. It is the same in every row.
72 \to \text{H} :: As text: the letter whose code is 72.
72 \to \text{dark grey} :: As a grey shade: 0 is black and 255 is white, so 72 is darkish.
72 \to \text{below the middle} :: As sound: 128 is the middle (silence), so 72 is a level below it.
\text{same number, different rule} :: The encoding, not the number, decides what it means.
```

Now read 255 as a shade.

### Find the mistake

### A number for something else

## Vary: change one number

```step
stage: modify
insight: "Each task changes one number and watches all three readings at once: white, black, the next letters, silence, then a control code that is a valid shade but not a visible letter."
try: { playground: board, starter: "numbers.yml#modify", height: 520 }
tasks:
  - check: { type: board, text: "Make the first number 255. What happens in each row?", when: "a = 255", explain: "As a shade, 255 is white. As sound, it is the loudest level above the middle. As text, it is not one of the basic letters." }
  - check: { type: board, text: "Now make the first number 0.", when: "a = 0", explain: "0 is black as a shade, the lowest level as sound, and a control code (not a letter) as text." }
  - check: { type: board, text: "Make the first number 74. What letter is it? (H is 72.)", when: "a = 74", explain: "Letters have codes in order: H is 72, I is 73, J is 74." }
  - check: { type: board, text: "Make all three numbers 128. What does the sound row show?", when: "a = 128 and b = 128 and c = 128", explain: "128 is the middle line, so the sound is silent. As shades, 128 is mid grey." }
  - check: { type: board, text: "Make the first number 10. What does the text row show?", when: "a = 10", explain: "10 is a fine shade and sound level, but as text it is a control code (a new line), not a letter you can see. Not every number means something useful under every rule." }
```

### White

### Black

### The next letters

### Silence

### Not a letter

## Practise: which rule?

```step
stage: practise
insight: "Choosing the encoding from what a program shows, the next letter code, and a program reading data with the wrong rule."
tasks:
  - check:
      type: answer
      q: "In text, A is stored as 65 and the letters go in order. What number stores C?"
      answer: "67"
      feedback:
        - ["66", "66 is B. Count on two from A."]
        - ["3", "3 is C's place in the alphabet. Its code starts from A = 65."]
      explain: "A is 65, B is 66, C is 67."
  - check:
      type: question
      q: "A music program opens a text file. What will you most likely hear?"
      options: ["Noise: it reads the letter codes as sound levels", "The text read aloud", "Silence", "The program refuses to open it"]
      answer: 0
      feedback: [null, "Reading text aloud needs a program that reads the numbers as letters first.", "Only 128 is silent; letter codes are mostly below that, so there is sound.", "Some programs refuse, but the numbers can be read as sound: that is the noise you hear."]
      explain: "The music program reads every letter code as a sound level, so meaningful text becomes meaningless noise. The data is fine; the rule is wrong for it."
  - check:
      type: question
      q: "A grey shade of 0 is…"
      options: ["Black", "White", "Mid grey", "Invisible"]
      answer: 0
      feedback: [null, "255 is white.", "About 128 is mid grey.", "0 is a colour too: no light, so black."]
      explain: "0 means no light, so black."
  - check:
      type: question
      q: "Why does a file need to say what kind of data it holds (for example .txt or .png)?"
      options: ["So the program knows which rule to read the numbers with", "So the numbers take up less space", "Because text and pictures are stored as different kinds of electricity", "It doesn't: every program can tell from the numbers"]
      answer: 0
      feedback: [null, "The name doesn't change the size of the numbers.", "Everything is stored the same way, as numbers. Only the reading rule differs.", "The same numbers can be text, a picture or sound, so the numbers alone can't say."]
      explain: "The numbers alone don't say what they are. The file type tells programs which encoding to use."
```

### Letter codes

### Wrong program

### Shades

### File types

## Make: write a word

```step
stage: make
insight: "Building a word from letter codes reverses the process: students start from the meaning and set the numbers that encode it."
try: { playground: board, starter: "numbers.yml#make", height: 460 }
hint: ["Capital letters start at A = 65 and go in order. Lower case starts at a = 97.", "Y is the 25th letter, so its code is 65 + 24 = 89.", "e is 97 + 4 = 101 and s is 97 + 18 = 115."]
check: { type: board, text: "Change the three numbers so the text reads Yes (capital Y, then lower case e and s).", when: "a = 89 and b = 101 and c = 115", explain: "Y is 89, e is 101, s is 115. A paint program would show the same numbers as three greys." }
```

Then switch the reading: what does your word look like as grey shades, and as sound?
