---
order: 8
unit: binary
node: AC9TDI8K04 n4
title: Bits all the way down
summary: "Every kind of data ends up as bits: a character becomes its code, and the code becomes 8 bits (A is 65, which is 01000001). A pixel is three codes, so 24 bits. The chain is always the same: data, then numbers, then binary."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "You now know how text, pictures and sound become numbers, and how numbers become bits. What does the letter A actually look like inside the computer?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8327
  url: http://127.0.0.1:8327/index.html
  readySelector: ".bcard"
  layout: full
explainPicture: { ref: cards.yml#explain-pic, caption: "The letter A: code 65, which on 8 bits (one byte) is 01000001: the 64 card and the 1 card." }
explainClip:
  query: { code: "@cards.yml#explain", fresh: 1, id: explain }
  caption: "A, 65, 01000001"
  say: "The letter A has the code sixty five."
  clip:
    - caption: { text: "A has the code 65. 65 = 64 + 1.", say: "Sixty five is sixty four plus one." }
    - click: "Card 64, face down (0)"
    - click: "Card 1, face down (0)"
    - expect: { selector: "#gsum", contains: "01000001" }
    - caption: { text: "So A is stored as 01000001: one byte.", say: "So A is stored as one byte of bits." }
    - wait: 1500
---
The data lessons showed that text, pictures and sound are all stored as numbers. The binary lessons showed how a number is stored as bits. Put the two together and every piece of data is a chain: **data → number → bits**. Eight bits make a **byte**, which holds 0 to 255: one character code, one colour amount or one sound sample.

## Predict: the letter A

```step
stage: predict
insight: "Committing to how A sits in memory tests the new move: the character becomes its code, and the code becomes a fixed number of bits."
check:
  type: predict
  q: "The letter **A** has the code 65. How is it stored in the computer's memory?"
  options: ["01000001", "65", "A", "1"]
  actual: "01000001. The computer stores only bits: 65 = 64 + 1, so on 8 bits (one byte) the 64 and 1 places are 1."
```

## Try: one byte for A

```step
stage: run
insight: "Setting the code 65 on eight cards settles the prediction: A becomes 01000001."
try: { playground: board, starter: "cards.yml#run", height: 420 }
check: { type: board, text: "Set the eight cards to 65, the code for A. What pattern of bits is it?", when: "n = 65 and b = 8", explain: "65 = 64 + 1, so A is 01000001: one byte." }
```

Was your prediction right? The leading 0 keeps every character the same length: 8 bits.

## Worked example: trace the chain

```step
stage: investigate
insight: "Tracing a character and a pixel through data → number → binary models the new move. Sam counts one bit per character, the misconception planted after the method."
tasks:
  - check:
      type: answer
      q: "One pixel is three numbers (red, green, blue), each one byte. How many **bits** is one pixel?"
      answer: "24"
      feedback:
        - ["3", "That is the bytes. Each byte is 8 bits."]
        - ["8", "That is one colour amount. A pixel has three."]
      explain: "3 bytes × 8 bits = 24 bits."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam works out how many bits the word cat takes. Click the line where it first goes wrong."
      answer: 3
      fault: logic
      misconception: char-one-bit
      explain: "Line 3: one bit can only be 0 or 1, not one of all the letters. Each character's code needs a byte: 8 bits. So cat is 3 × 8 = 24 bits."
  - check:
      type: question
      q: "The byte **01000001** is in memory. What does it mean?"
      options: ["It depends on how a program reads it: A as text, 65 as a number, a dark shade as a colour amount", "Always the letter A", "Always the number 65", "Nothing until it is decoded"]
      answer: 0
      feedback: [null, "Only a text program reads it as A.", "Only as a number. A paint program reads it as a shade.", "It is data; the encoding gives it a meaning."]
      explain: "Bits are just bits. The encoding (text, number, colour, sound) decides what they mean, as in Everything is numbers."
```

### Text and a pixel

```worked
\text{A} \to 65 :: Text: the character's code.
65 = 64 + 1 \to 01000001 :: Binary on 8 bits: one byte.
\text{yellow} \to 255, 255, 0 :: A pixel: three colour amounts.
11111111\ 11111111\ 00000000 :: Each amount is one byte: 24 bits for the pixel.
\text{data} \to \text{numbers} \to \text{bits} :: Every kind of data follows the same chain.
```

Now count the bits in a pixel.

### Find the mistake

### What does a byte mean?

## Vary: one letter at a time

```step
stage: modify
insight: "Each task changes one character or one value: H to I (one more), H to h (one card, the 32), a colour amount at full, a sound sample at the middle, then a space."
try: { playground: board, starter: "cards.yml#modify", height: 420 }
tasks:
  - check: { type: board, text: "The cards show 72, the code for H. Make 73, the code for I.", when: "n = 73", explain: "One more: only the 1 card changed. 01001001." }
  - check: { type: board, text: "Now make 104, the code for lower case h. Which card did you have to add?", when: "n = 104", explain: "104 = 72 + 32: lower case adds the 32 card. 01101000." }
  - check: { type: board, text: "Make 255, a colour amount at full.", when: "n = 255", explain: "255 is every card up: 11111111, the biggest byte." }
  - check: { type: board, text: "Make 128, a sound sample at the middle (silence).", when: "n = 128", explain: "128 is just the left card: 10000000." }
  - check: { type: board, text: "Make 32, the code for a space.", when: "n = 32", explain: "A space is 00100000: still a whole byte, though nothing shows." }
```

### H to I

### Lower case

### Full colour

### Silence

### A space

## Practise: bytes and bits

```step
stage: practise
insight: "Counting bytes and bits for text, images and sound, and reading a byte back to a character."
tasks:
  - check:
      type: answer
      q: "How many bits does the word **hello** take, at one byte a character?"
      answer: "40"
      feedback:
        - ["5", "That is the bytes. Each byte is 8 bits."]
        - ["13", "Multiply: 5 characters × 8 bits."]
      explain: "5 bytes × 8 = 40 bits."
  - check:
      type: answer
      q: "A 2 × 2 picture, three bytes a pixel. How many bytes?"
      answer: "12"
      feedback:
        - ["4", "That is the pixels. Each pixel is three bytes."]
        - ["96", "That is the bits. The question asks for bytes."]
      explain: "4 pixels × 3 = 12 bytes (96 bits)."
  - check:
      type: question
      q: "Music often uses 65 536 levels a sample. How many bytes is each sample?"
      options: ["2 (16 bits)", "1 (8 bits)", "65 536", "4"]
      answer: 0
      feedback: [null, "One byte holds 256 levels.", "That is the number of levels, not the size.", "Two bytes are enough: 2¹⁶ = 65 536."]
      explain: "2¹⁶ = 65 536, so 16 bits: 2 bytes."
  - check:
      type: question
      q: "As text, which character is the byte **01000010**?"
      options: ["B (66)", "A (65)", "b (98)", "2"]
      answer: 0
      feedback: [null, "A is 01000001. Add up the places of this one.", "b would also have the 32 card.", "The digit 2 is 50."]
      explain: "64 + 2 = 66, which is B."
```

### Bits in a word

### Bytes in a picture

### Sound samples

### Byte to character

## Make: a lower case letter

```step
stage: make
insight: "Building the byte for lower case a from the code rule reverses the chain: from a character to its code to its bits, with the number hidden."
try: { playground: board, starter: "cards.yml#make", height: 420 }
hint: ["Capital A is 65. Lower case letters are 32 more.", "97 = 64 + 32 + 1.", "Turn up the 64, 32 and 1 cards."]
check: { type: board, text: "The number is hidden. Set the cards to the byte for lower case a.", when: "n = 97", explain: "a is 65 + 32 = 97 = 64 + 32 + 1, so 01100001." }
```

Then write your initials as bytes.
