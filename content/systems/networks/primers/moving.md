---
title: Moving data in 5 minutes
---
## The idea in plain words

A **network** joins computers so they can send data. Links can be **wired** (cable, fibre) or **wireless** (Wi-Fi, mobile). Three properties decide how well a link works: **bandwidth** (how much data each second, in megabits a second), **latency** (the delay for one packet, in milliseconds) and **reliability** (how many packets get lost). Cables usually win on all three; wireless wins on freedom to move.

Data is not sent as one long stream. It is split into **packets**, each numbered and addressed. Routers pass each packet on, and packets may take different routes, arrive out of order, or get lost at a busy router. The **TCP** protocol has the receiver confirm each packet; anything not confirmed is sent again, and the numbers put the message back in order.

## What students get wrong

- **Bandwidth and latency as the same thing.** A faster plan (more bandwidth) does not fix lag (delay).
- **A lost packet means starting again.** Only the missing packet is sent again.
- **Packets arrive in order.** They often don't; the numbers fix it.

## The words

**bandwidth**, **latency**, **reliability**, **packet**, **router**, **protocol**, **TCP**, **acknowledgement**.
