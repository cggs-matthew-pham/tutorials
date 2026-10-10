---
title: AI on the micro:bit in 5 minutes
---
## The idea in plain words

**micro:bit CreateAI** trains a model on **movements** instead of photos. A movement is a short recording (about a second) of the micro:bit's **x, y and z** acceleration. You record samples of each action (still, walking, running, jumping), train, and test.

- The finished model runs **on the micro:bit** (a V2): no camera, no computer, nothing sent anywhere.
- In MakeCode, the **Machine Learning** blocks run code when the estimated action **changes**: on ML … start (once per stretch), on ML … stop (with how long it lasted), and **unknown** when no action is sure enough.

## Why programmers use it

Fitness trackers, fall detectors and game controllers all run small models on the device itself: faster, private, and working without a connection.

## An everyday picture, and where it breaks

It's like recognising a friend's walk from across the playground: the pattern matters, not one moment. Where it breaks: someone who walks differently, or holds the micro:bit differently, looks like a stranger until you add their samples.

## Try it yourself (5 minutes)

1. Open [createai.microbit.org](https://createai.microbit.org/) in Chrome or Edge and connect a micro:bit (Bluetooth, or a second micro:bit by radio).
2. Record three samples each of still and waving; train and test.
3. Click Edit in MakeCode to see the Machine Learning blocks.

## Questions students ask

- **"It can't find my micro:bit."** Chrome or Edge, battery pack on, Bluetooth allowed (or use the radio route).
- **"It calls everything walking."** Add more, varied samples of the other actions.
- **"Why does my count go up only once?"** on ML start runs when the action begins, not again while it carries on.

## How it connects

The photo model ran on the computer and needed the cable; this one runs on the micro:bit. The capstone chooses the right kind for a problem.
