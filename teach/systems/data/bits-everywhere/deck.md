---
marp: true
theme: default
html: true
---

# Bits all the way down

Data representation · Binary numbers

<!-- Speaker note: Students trace characters, colours and sound samples from data to numbers to bytes on eight binary cards, closing the loop between data representation and binary (AC9TDI8K04 node 4). About 35 minutes (Predict and Try 6 min · Worked example 10 min · Vary 9 min · Practise and Make 10 min). -->

---

## Today

**We are learning to** every kind of data ends up as bits: a character becomes its code, and the code becomes 8 bits (A is 65, which is 01000001). A pixel is three codes, so 24 bits. The chain is always the same: data, then numbers, then binary.

- I can turn a character into its code and then into binary.
- I can work out how many bits a word or a picture takes.
- I can explain that all data becomes bits.

<!-- Speaker note: Before class: The integration node (the kit calls it the cross-standard point between K03 and K04): students assemble data → number → binary for two kinds of data. Simplification: text here is one byte a character (ASCII). Unicode characters beyond 255 take two to four bytes (Text as numbers). Teacher: Worked example: ask what the 24 bits of a black pixel look like. Teacher: Vary: ask why lower case is always the 32 card added. -->

---

## Why it matters

> You now know how text, pictures and sound become numbers, and how numbers become bits. What does the letter A actually look like inside the computer?

<!-- Speaker note: The data lessons showed that text, pictures and sound are all stored as numbers. The binary lessons showed how a number is stored as bits. Put the two together and every piece of data is a chain: **data → number → bits**. Eight bits make a **byte**, which holds 0 to 255: one character code, one colour amount or one sound sample. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**The letter **A** has the code 65. How is it stored in the computer's memory?**

- 65
- A
- 01000001
- 1

<!-- Speaker note: What happens: 01000001. The computer stores only bits: 65 = 64 + 1, so on 8 bits (one byte) the 64 and 1 places are 1. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose 65 or A haven't joined the two halves yet; the Try does it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fdata%2Fbits-everywhere%2Fstep-2&code=widget%3A+bits%0Abits%3A+8%0An%3A+0%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/data/bits-everywhere/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? The leading 0 keeps every character the same length: 8 bits. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 01000001. The computer stores only bits: 65 = 64 + 1, so on 8 bits (one byte) the 64 and 1 places are 1.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Text and a pixel

Now count the bits in a pixel.

$$\text{A} \to 65$$

1) $65 = 64 + 1 \to 01000001$ — Binary on 8 bits: one byte.
2) $\text{yellow} \to 255, 255, 0$ — A pixel: three colour amounts.
3) $11111111\ 11111111\ 00000000$ — Each amount is one byte: 24 bits for the pixel.
4) $\text{data} \to \text{numbers} \to \text{bits}$ — Every kind of data follows the same chain.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write A 65 and say "Text: the character's code." Line 1: write 65 = 64 + 1 01000001 and say "Binary on 8 bits: one byte." Line 2: write yellow 255, 255, 0 and say "A pixel: three colour amounts." Line 3: write 111111111111111100000000 and say "Each amount is one byte: 24 bits for the pixel." Line 4: write data numbers bits and say "Every kind of data follows the same chain." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Text and a pixel

**One pixel is three numbers (red, green, blue), each one byte. How many **bits** is one pixel?**

* Answer: 24

<!-- Speaker note: 3 bytes × 8 bits = 24 bits. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam works out how many bits the word cat takes. Click the line where it first goes wrong.**

```
 1  How many bits does the word cat take?
 2  c, a and t are three characters.
 3  Each character is one bit.
 4  So cat takes 3 bits.
```

* Answer: line 3

<!-- Speaker note: Line 3: one bit can only be 0 or 1, not one of all the letters. Each character's code needs a byte: 8 bits. So cat is 3 × 8 = 24 bits. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What does a byte mean?

**The byte **01000001** is in memory. What does it mean?**

- Always the number 65
- Nothing until it is decoded
- Always the letter A
- It depends on how a program reads it: A as text, 65 as a number, a dark shade as a colour amount

* Answer: It depends on how a program reads it: A as text, 65 as a number, a dark shade as a colour amount

<!-- Speaker note: Bits are just bits. The encoding (text, number, colour, sound) decides what they mean, as in Everything is numbers. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: one letter at a time



- **H to I:** 
- **Lower case:** 
- **Full colour:** 
- **Silence:** 
- **A space:** 

[Open this step](https://tutorials.learningwaypoints.com/systems/data/bits-everywhere/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one character or one value: H to I (one more), H to h (one card, the 32), a colour amount at full, a sound sample at the middle, then a space. For students who need more support: Keep the 128 64 32 16 8 4 2 1 card values written above the board. For early finishers: A phone photo is about 4000 × 3000 pixels. Roughly how many bytes before compression? (36 million.) Why do we need compression? The hard part, on purpose: Students think a character is one bit. Ask how many different things one bit can be (two), then how many characters there are. When students get stuck: A student says a character is one bit (Sam's mistake). Ask: How many values can one bit hold? How many letters are there? Fix: A byte holds 256 values: enough for a character code. / A student mixes bytes and bits. Ask: How many bits in a byte? Fix: 8. Multiply bytes by 8 to get bits. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Bits in a word

**How many bits does the word **hello** take, at one byte a character?**

* Answer: 40

<!-- Speaker note: 5 bytes × 8 = 40 bits. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Bytes in a picture

**A 2 × 2 picture, three bytes a pixel. How many bytes?**

* Answer: 12

<!-- Speaker note: 4 pixels × 3 = 12 bytes (96 bits). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sound samples

**Music often uses 65 536 levels a sample. How many bytes is each sample?**

- 2 (16 bits)
- 65 536
- 1 (8 bits)
- 4

* Answer: 2 (16 bits)

<!-- Speaker note: 2¹⁶ = 65 536, so 16 bits: 2 bytes. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Byte to character

**As text, which character is the byte **01000010**?**

- 2
- B (66)
- A (65)
- b (98)

* Answer: B (66)

<!-- Speaker note: 64 + 2 = 66, which is B. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a lower case letter

Then write your initials as bytes.

[Open this step](https://tutorials.learningwaypoints.com/systems/data/bits-everywhere/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Building the byte for lower case a from the code rule reverses the chain: from a character to its code to its bits, with the number hidden. Hints, in order: Capital A is 65. Lower case letters are 32 more. / 97 = 64 + 32 + 1. / Turn up the 64, 32 and 1 cards. -->

<!-- Speaker note: Teacher: have students write their initials as bytes on paper. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Write the letter C as a byte. How many bits is the word Hi?**

* C = 67 = 64 + 2 + 1 = 01000011. Hi = 2 bytes = 16 bits.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This closes the Data representation course. Next (Years 9–10): Making data smaller (compression). Code links: Secret messages shifts these codes; colour values in turtle are these bytes. -->
