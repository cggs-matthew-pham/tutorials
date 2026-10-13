---
title: Radio in 5 minutes
---
## The idea in plain words

Micro:bits can send short messages to each other by **radio** (blocks in **Radio**).

- **radio set group** picks a channel (0 to 255). Only micro:bits in the **same group** hear each other.
- **send number** sends to every **other** micro:bit in the group. A micro:bit never receives its own message.
- **on radio received** is an **event**: it runs each time a message arrives, and **receivedNumber** holds what came, so one receiver can do something different for each message.

A number can stand for anything, as long as both sides agree. The neatest way is a **list both micro:bits share**: send the place number, and the receiver looks up the word. That agreement is a **code**.

In the simulator, a second micro:bit appears as soon as a program uses radio. Both run the same program.

## Why programmers use them

Wireless doorbells, car keys, game controllers and smart lights all send tiny messages that mean something agreed in advance. The skill is designing the code: what each message means, and what each side does when it arrives.

## An everyday picture, and where it breaks

Radio groups are walkie-talkie channels: everyone on channel 7 hears everyone else on channel 7. A shared list is a codebook: "1 means yes, 2 means no".

Where it breaks: two pairs on the same channel hear each other's messages, and two people with different codebooks misread every message. Both happen in real classrooms.

## Try it yourself (5 minutes)

1. In the Send and receive lesson, press A on one simulated micro:bit: the heart shows on the other.
2. In Which message?, press A and then B on one micro:bit: the other shows a different picture for each.
3. In A shared code, press A to choose a word and B to send it.
4. With real micro:bits, set two to different groups and try again: nothing arrives.

## Questions students ask

- **"Why does nothing arrive?"** Check both are in the same group, and press on one while watching the other.
- **"Why didn't my own micro:bit show it?"** A micro:bit does not receive its own messages.
- **"Can it send words?"** Yes, with send string, but a number from a shared list is shorter.
- **"Why do we hear other groups' messages?"** They chose the same group number. Pick a different one.

## How it connects

The Radio duel uses a code of four messages (get ready, go, I pressed first, I won) to keep two players' micro:bits in step.
