---
title: Building with gates in 5 minutes
---
## The idea in plain words

A **logic gate** takes bits in and gives one bit out (AND, OR, NOT, and combinations like NAND and XOR). Wire one gate's output into another's input and you get a **circuit**: work it out row by row, each gate using the bits that arrive on its own wires. Any truth table can be built from AND, OR and NOT, and even from NAND gates alone.

**Adding** is a truth table too. A **half adder** adds two bits: sum = A XOR B, carry = A AND B. A **full adder** also takes a carry in from the place to its right. Chain one full adder per place and the carries ripple left: that is how a processor adds binary numbers. If the last carry has nowhere to go, the answer needs more bits (overflow).

## Links

Data representation's *Why binary: logic gates* introduces gates, truth tables and the half adder; this course reviews them and goes further. *Bits all the way down* covers overflow.

## What students get wrong

- **Every gate looks at the switches.** Each gate uses only what arrives on its own wires.
- **In binary, 1 + 1 = 2.** There is no digit 2: it is 0, carry 1.

## The words

**circuit**, **truth table**, **NAND**, **XOR**, **half adder**, **full adder**, **carry**, **overflow**.
