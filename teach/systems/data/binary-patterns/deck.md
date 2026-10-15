---
marp: true
theme: default
html: true
---

# How many patterns?

Data representation · Binary numbers

<!-- Speaker note: Students count up on binary cards to find that n bits make 2ⁿ patterns and hold 0 to 2ⁿ − 1, see a count overflow, and choose how many bits a number needs (AC9TDI8K04). About 40 minutes (Predict and Try 8 min · Worked example 10 min · Vary 12 min · Practise and Make 10 min). Sources: CS Unplugged: Binary numbers (CC BY-SA 4.0), https://www.csunplugged.org/en/topics/binary-numbers/ (checked 12 October 2026). -->

---

## Today

**We are learning to** each extra bit doubles the number of patterns: n bits make 2ⁿ patterns. One pattern is 0, so the largest number is 2ⁿ − 1: four bits hold 0 to 15, eight bits (a byte) hold 0 to 255. Count one past the largest and the bits overflow back to 0.

- I can work out how many patterns some bits can make.
- I can find the biggest number some bits can hold.
- I can explain overflow, and choose how many bits a number needs.

<!-- Speaker note: Before class: Do the Try and Vary boards yourself first. Students need Bits and binary numbers (reading binary) and powers of 2 from maths. The one idea: each extra bit doubles the number of patterns, so $n$ bits make $2^n$ patterns, and because one pattern is 0, the largest number is $2^n - 1$. Overflow is what happens when you count past it. Real examples worth a minute: colour values 0 to 255 (one byte each); the micro:bit LED brightness 0 to 255; game scores and counters that wrapped round. Students who have done Arcade or micro:bit can look for 255 limits in the blocks. Teacher: Try: ask how many presses it took to get from 0 to 1111, and how many patterns that makes. Teacher: Worked example: pause before line 3 and ask why we multiply, not add. Teacher: Vary: before Add a card, ask students to predict the new card's value and the new biggest number. -->

---

## Why it matters

> Colour values in a program stop at 255, and old game scores wrapped round to 0. Both come from the same rule about bits.

<!-- Speaker note: In Bits and binary numbers, each card was worth double the card on its right. Now the question is how many different numbers a set of cards can show, and what happens when you run out. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**You have four cards, worth 8, 4, 2 and 1. What is the **biggest** number they can show?**

- 4
- 15
- 16
- 1111

<!-- Speaker note: What happens: 15. All four cards face up: 8 + 4 + 2 + 1 = 15. There are 16 patterns, but one of them is 0, so the biggest is 15. 1111 is 15 written in binary. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose 16 counted the patterns but forgot 0; 4 counted the cards. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fdata%2Fbinary-patterns%2Fstep-2&code=widget%3A+bits%0Abits%3A+4%0An%3A+0%0Acount%3A+on%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/data/binary-patterns/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Watch the 1 card as you count: it flips every time. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 15. All four cards face up: 8 + 4 + 2 + 1 = 15. There are 16 patterns, but one of them is 0, so the biggest is 15. 1111 is 15 written in binary.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Count the patterns

Now try five bits.

$$1111 = 8 + 4 + 2 + 1 = 15$$

1) $0000 = 0$ — All cards face down is the smallest.
2) $2 \times 2 \times 2 \times 2 = 2^4 = 16$ — Each card has 2 choices, so each card doubles the patterns.
3) $0 \text{ to } 15$ — 16 patterns, and one of them is 0, so the biggest is 15.
4) $2^4 - 1 = 15$ — With $n$ bits: $2^n$ patterns, and the biggest number is $2^n - 1$.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write 1111 = 8 + 4 + 2 + 1 = 15 and say "All cards face up is the biggest number." Line 1: write 0000 = 0 and say "All cards face down is the smallest." Line 2: write 2 × 2 × 2 × 2 = 2^4 = 16 and say "Each card has 2 choices, so each card doubles the patterns." Line 3: write 0 to 15 and say "16 patterns, and one of them is 0, so the biggest is 15." Line 4: write 2^4 - 1 = 15 and say "With n bits: 2^n patterns, and the biggest number is 2^n - 1." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the patterns

**What is the biggest number **five** bits can show?**

* Answer: 31

<!-- Speaker note: 11111 = 16 + 8 + 4 + 2 + 1 = 31. Five bits make 2⁵ = 32 patterns: 0 to 31. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam works out how many numbers 4 bits can show. Click the line where the working first goes wrong.**

```
 1  How many numbers can 4 bits show?
 2  Each bit is up or down: 2 choices.
 3  4 bits: 2 × 2 × 2 × 2 = 16 patterns.
 4  So 4 bits show the numbers 1 to 16.
 5  The biggest number is 16.
```

* Answer: line 4

<!-- Speaker note: Line 4: the 16 patterns are 0000 to 1111, so the numbers are 0 to 15. Sam left out 0 (all cards face down). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Three bits

**How many different patterns can **three** bits make?**

* Answer: 8

<!-- Speaker note: 2 × 2 × 2 = 8 patterns: 000, 001, 010, 011, 100, 101, 110, 111. That is 0 to 7. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: one change at a time



- **One past the biggest:** 
- **Add a card:** 
- **Six cards:** 
- **A byte:** 
- **How many bits?:** Keep doubling: 1, 3, 7, 15, 31, 63, 127. Which is the first that reaches 100?

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/data/binary-patterns/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one thing: one more past the largest (overflow), one more card (patterns double), another card, then a byte, then the edge case of choosing how many bits a number needs. For students who need more support: Keep a doubling table beside the board: bits 1 to 8, patterns 2 to 256, biggest 1 to 255. For early finishers: How many bits would you need to give every person on Earth (about 8 billion) a different number? (33: 2³² is about 4.3 billion, 2³³ about 8.6 billion.) The hard part, on purpose: Forgetting that one pattern is 0, so saying 4 bits go up to 16. Ask "what do the cards show when they are all face down?" every time a largest number comes up. When students get stuck: A student says 4 bits hold 1 to 16 (Sam's mistake). Ask: What number do the cards show when they are all face down? Fix: 0 is one of the patterns, so the 16 patterns are 0 to 15. / A student says 10 bits make 20 patterns. Ask: What happens to the patterns when you add one card? Fix: Each card doubles them: 2, 4, 8, 16, …, so multiply. / A student thinks overflow is an error message. Ask: What does + 1 do to 1111 if there is no fifth card? Fix: Every card flips down: the computer just loses the carry. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Ten bits

**How many different patterns can **ten** bits make?**

* Answer: 1024

<!-- Speaker note: $2^{10} = 1024$ patterns, so ten bits hold 0 to 1023. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Score overflow

**An old game stores the score in one byte. The score is 255 and the player scores 1 more point. What does the score show?**

- 256
- An error message
- 255
- 0

* Answer: 0

<!-- Speaker note: 255 is 11111111. Adding 1 overflows: every bit flips to 0 and the score shows 0. Real games have had bugs like this. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Colour values

**In many programs, the amount of red in a colour goes from 0 to 255. How many bits store it?**

* Answer: 8

<!-- Speaker note: 0 to 255 is 256 values, and $2^8 = 256$. So each colour amount is one byte. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Three bits

**What is the biggest number **three** bits can show?**

* Answer: 7

<!-- Speaker note: 111 = 4 + 2 + 1 = 7. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: read binary

**Review: what number is **10101** in binary?**

* Answer: 21

<!-- Speaker note: 10101 = 16 + 4 + 1 = 21. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: enough bits

Then: how many more students could join before you need a seventh card?

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/data/binary-patterns/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Choosing the fewest cards for a given range reverses the process: students start from the largest number needed and work out the bits, then check it on the board. Hints, in order: How big a number must the cards show? Add cards until they can show it. / Five cards stop at 31. Is that enough for 39? / Six cards: 32 + 4 + 2 + 1. -->

<!-- Speaker note: Teacher: have students say the range first (0 to 39), then the bits. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**How many patterns can 6 bits make, and what is the biggest number they can hold?**

* 2⁶ = 64 patterns, so 0 to 63. The biggest is 63.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Builds on: the data as numbers lessons. Colour amounts (0 to 255) are one byte each, and 16-bit audio has 2¹⁶ = 65 536 levels: ask students to explain both now. Where it leads: data sizes (bytes, kilobytes) and, in Years 9–10, compression. -->
