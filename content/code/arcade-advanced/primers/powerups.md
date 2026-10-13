---
title: Power-ups in 5 minutes
---
## The idea in plain words

A variable can hold **true** or **false** (Logic). A power-up is three parts: a **variable** that remembers it (`shield` is true while it is on), an **event** that changes it (catching a star sets it to true), and a **rule** that uses it (*if shield*, a rock costs no life). It stays true until a block sets it back to false.

A power-up that **runs out** is a number counting down. For ammo, the A event asks *if ammo > 0* first, then fires and changes ammo by -1, so the count never goes below zero. For time, a timer every second takes 1 off `shieldTime` while the shield is on, and at 0 sets the shield back to false.

## Why programmers use them

Games remember what is happening now (powered up or not, shots left) in variables. Checking before using is how every limited thing works, from ammo to a bank balance.

## An everyday picture, and where it breaks

A power-up is a "free entry" wristband at a fair: while you wear it, the ride rules change for you, and it comes off at closing time.

Where it breaks: the wristband only comes off if someone checks the time. In code, nothing sets the variable back unless a block does, and a check written in **on start** is asked once, before the game begins. The countdown must sit in a timer.

## Try it yourself (5 minutes)

1. In True or false, catch a star: the shield never ends.
2. In Run out, press A five times with three shots: the count goes below zero. Then load the version that checks first.

## Questions students ask

- **"Why does my shield never switch off?"** Nothing sets it back to false, or the countdown is in on start.
- **"Why does A fire for ever?"** The shot is outside if ammo > 0.
- **"Why does A not fire?"** ammo starts at 0. A star sets it.

## How it connects

The final challenge, Power-ups, puts true or false, counting down and every sprite of a kind into one prize box. Skillmap: Save the Galaxy adds power-ups to a shooter.
