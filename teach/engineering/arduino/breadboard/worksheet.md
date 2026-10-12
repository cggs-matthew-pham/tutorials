---
title: "From simulator to breadboard"
subtitle: "Arduino · Real hardware · Lesson 6"
---

# From simulator to breadboard

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Real parts don't snap together like Tinkercad's. A breadboard holds them with hidden metal strips underneath. Put a leg in the wrong hole and the circuit quietly doesn't work. Which holes are joined?


:::teacher-note

**In one sentence:** Students click breadboard holes to see the hidden strips, fix an LED whose legs share a strip, trace a loop strip by strip, straddle the gap and use the rails, build the circuit on a real breadboard and upload the blink, then place every part themselves.

**Students should be able to say:** I can say which breadboard holes are joined. I can place parts so each leg is in a different strip. I can build a circuit on a real breadboard and upload a sketch.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**The LED's long leg is in c8 and its short leg in d8. The rest of the circuit is fine. The LED…**

☐ Burns out

☐ Lights dimly

☐ Lights: both legs are in holes

☐ Stays dark: both legs are in the same strip, so the current goes round it

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It stays dark. c8 and d8 are in the same strip (column 8), so the strip joins its two legs and the current takes the easy path round the LED.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: trace the strips


:::keep-together

### Strip by strip

1. $\text{pin 13} \to \text{a3}$ — The wire puts pin 13 into column 3's strip (a3–e3).
2. $\text{resistor: b3} \to \text{b7}$ — One leg in column 3, one in column 7: it joins the two strips.
3. $\text{LED: c7 (+)} \to \text{c8 (−)}$ — Long leg in column 7, short leg in column 8.
4. $\text{d8} \to \text{GND}$ — The GND wire takes column 8 back to the Uno.
5. $\text{one loop, four strips}$ — Every part bridges two strips; no part has both legs in one.

Now: which holes are joined to a3?

**Which holes are joined to a3?**

☐ a1 to a17

☐ None: each hole is separate

☐ Every hole in column 3, a to j

☐ b3, c3, d3 and e3

:::


:::teacher-note

**Answer:** b3, c3, d3 and e3

Column 3's top strip: a3 to e3.

:::


:::keep-together

### Find the mistake

**Sam thinks this LED (long leg c7, short leg c8) is shorted out. It isn't. Click the line where Sam's reasoning first goes wrong.**

```
 1  The LED's long leg is in c7 and its short leg in c8.
 2  Row c joins c7 and c8.
 3  So the current goes from c7 to c8 through the row.
 4  So the LED is shorted out, and Sam moves it.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Line 2: rows aren't joined. c7 is in column 7's strip and c8 in column 8's, so the LED's legs are in different strips: the loop goes through it.

:::


:::typical

## Vary: the gap and the rails


**Across the gap.** 

**On the rails.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


:::typical

## Build it for real

Before you plug in the USB cable: check that 5V and GND are never in the same strip.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Which holes?


:::keep-together

### Which holes?

**A resistor has one leg in a12 and the other in a16. Which holes are joined to the second leg?**

☐ a12 to a16

☐ Every hole in row a

☐ b16, c16, d16 and e16

☐ f16 to j16

:::


:::teacher-note

**Answer:** b16, c16, d16 and e16

Column 16's top strip.

:::


:::keep-together

### A short

**A wire goes from 5V straight into the same strip as a wire from GND. What happens?**

☐ A short circuit: a huge current; unplug it at once

☐ Nothing: no parts are in the way

☐ The LED gets brighter

☐ The board turns off safely, no harm done

:::


:::teacher-note

**Answer:** A short circuit: a huge current; unplug it at once

5V joined straight to GND has no resistance to limit the current.

:::


## Make: build it from scratch


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**An LED's legs are in b14 and e14. Will it light? Why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** No: both legs are in column 14's strip, so the current goes round it.

:::

