---
title: "Bits all the way down"
subtitle: "Data representation · Binary numbers · Lesson 8"
---

# Bits all the way down

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** You now know how text, pictures and sound become numbers, and how numbers become bits. What does the letter A actually look like inside the computer?


:::teacher-note

**In one sentence:** Students trace characters, colours and sound samples from data to numbers to bytes on eight binary cards, closing the loop between data representation and binary (AC9TDI8K04 node 4).

**Students should be able to say:** I can turn a character into its code and then into binary. I can work out how many bits a word or a picture takes. I can explain that all data becomes bits.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**The letter **A** has the code 65. How is it stored in the computer's memory?**

☐ 65

☐ A

☐ 01000001

☐ 1

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 01000001. The computer stores only bits: 65 = 64 + 1, so on 8 bits (one byte) the 64 and 1 places are 1.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: trace the chain


:::keep-together

### Text and a pixel

1. $\text{A} \to 65$ — Text: the character's code.
2. $65 = 64 + 1 \to 01000001$ — Binary on 8 bits: one byte.
3. $\text{yellow} \to 255, 255, 0$ — A pixel: three colour amounts.
4. $11111111\ 11111111\ 00000000$ — Each amount is one byte: 24 bits for the pixel.
5. $\text{data} \to \text{numbers} \to \text{bits}$ — Every kind of data follows the same chain.

Now count the bits in a pixel.

**One pixel is three numbers (red, green, blue), each one byte. How many **bits** is one pixel?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 24

3 bytes × 8 bits = 24 bits.

:::


:::keep-together

### Find the mistake

**Sam works out how many bits the word cat takes. Click the line where it first goes wrong.**

```
 1  How many bits does the word cat take?
 2  c, a and t are three characters.
 3  Each character is one bit.
 4  So cat takes 3 bits.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: one bit can only be 0 or 1, not one of all the letters. Each character's code needs a byte: 8 bits. So cat is 3 × 8 = 24 bits.

:::


:::keep-together

### What does a byte mean?

**The byte **01000001** is in memory. What does it mean?**

☐ Always the number 65

☐ Nothing until it is decoded

☐ Always the letter A

☐ It depends on how a program reads it: A as text, 65 as a number, a dark shade as a colour amount

:::


:::teacher-note

**Answer:** It depends on how a program reads it: A as text, 65 as a number, a dark shade as a colour amount

Bits are just bits. The encoding (text, number, colour, sound) decides what they mean, as in Everything is numbers.

:::


:::typical

## Vary: one letter at a time


**H to I.** 

**Lower case.** 

**Full colour.** 

**Silence.** 

**A space.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Bytes and bits


:::keep-together

### Bits in a word

**How many bits does the word **hello** take, at one byte a character?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 40

5 bytes × 8 = 40 bits.

:::


:::keep-together

### Bytes in a picture

**A 2 × 2 picture, three bytes a pixel. How many bytes?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 12

4 pixels × 3 = 12 bytes (96 bits).

:::


:::keep-together

### Sound samples

**Music often uses 65 536 levels a sample. How many bytes is each sample?**

☐ 2 (16 bits)

☐ 65 536

☐ 1 (8 bits)

☐ 4

:::


:::teacher-note

**Answer:** 2 (16 bits)

2¹⁶ = 65 536, so 16 bits: 2 bytes.

:::


:::keep-together

### Byte to character

**As text, which character is the byte **01000010**?**

☐ 2

☐ B (66)

☐ A (65)

☐ b (98)

:::


:::teacher-note

**Answer:** B (66)

64 + 2 = 66, which is B.

:::


## Make: a lower case letter

Then write your initials as bytes.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Write the letter C as a byte. How many bits is the word Hi?**

{{lines-3}}

:::


:::teacher-note

**Answer:** C = 67 = 64 + 2 + 1 = 01000011. Hi = 2 bytes = 16 bits.

:::

