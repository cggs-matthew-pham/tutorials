---
title: Radio is a shared space in 5 minutes
---
## The idea in plain words

A micro:bit sends a radio message to **every other micro:bit in its group**. The group is a channel number, not a lock. So anything sent in plain text can be read by anyone who tunes to that group.

A **code** (a cipher) scrambles a message so a listener can't read it. A scrambling method that only works while it is secret is fragile: methods get copied, written down and guessed. A good code assumes the method is **known** and depends on a secret **key**.

## Why it matters

Wi-Fi, mobile phones, car keys and bank cards all send messages through the air. Everything in this course is about keeping that traffic private, unchanged and trustworthy.

## An everyday picture, and where it breaks

A group is a classroom where everybody talks aloud: whoever is in the room hears everything. Where it breaks: a classroom has walls, but a radio signal passes through them.

## Try it yourself (5 minutes)

1. Open **Everyone in the group hears** and run it.
2. Press A on one simulated micro:bit and watch the other.
3. Change the group on one micro:bit: it no longer hears.

## Questions students ask

- **"Can't we just use a secret group number?"** There are only 256 groups; anyone can try them all.
- **"Does the sender hear its own message?"** No.
