---
title: Reading inputs in 5 minutes
---
## The idea in plain words

A pin set as an **input** reads the voltage on it. **Digital read** gives 1 when the pin is joined to 3.3 V and 0 when it is joined to GND. A button joins the pin to 3.3 V only while it is held, so when it is up something else has to hold the pin at 0: a **pull-down resistor** to GND. Without it the pin is joined to nothing (**floating**), picks up electrical noise, and reads 0 or 1 at random.

**Analog read** gives a number from 0 to 1023 for 0 to 3.3 V. A knob (potentiometer) or a light sensor in a **voltage divider** changes the voltage on the pin, so the number changes. The number is not volts: 1023 means 3.3 V, and 512 about half that. A program compares the number with a **threshold** to decide, as a night light does.

## What students get wrong

- **An unconnected pin reads 0.** It floats.
- **The number is the volts.** It is a scale from 0 to 1023.
- **Brighter always means a bigger number.** It depends which way round the divider is wired.

## The words

**input**, **digital read**, **pull-down**, **floating**, **analog read**, **potentiometer**, **voltage divider**, **threshold**.
