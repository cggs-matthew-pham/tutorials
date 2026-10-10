---
title: A robot driven by a model in 5 minutes
---
## The idea in plain words

A model trained on gestures sends a **word** (Forward, Left, Stop) through the bridge to the robot by radio. The robot's program does the rest:

- **on radio received string** remembers the word as the robot's **mode**; **forever** acts on the mode until a new word arrives.
- The model can be on the computer (a webcam model and a bridge) or **on a wrist micro:bit** (a CreateAI model sending words by radio). The robot's program is the same either way: it only sees words.
- So when the model goes quiet, the robot keeps going. Two safety nets fix that:
  - **Unsure**: the board sends it when no label is confident enough, and the robot stops.
  - A **watchdog**: the robot remembers when the last word arrived and stops if too long passes. The board repeats its label every second so a working robot never trips it.

## Why programmers use it

Gesture-driven wheelchairs, drones and delivery robots all separate "what the model thinks" from "what the machine does", and all need a safe action for doubt and for silence.

## An everyday picture, and where it breaks

A train driver must keep pressing a pedal (a dead man's switch): if they stop, the train brakes. The watchdog is that pedal. Where it breaks: if the signal is only sent when something changes, a steady "all fine" looks like silence, which is why the board repeats.

## Try it yourself (5 minutes)

1. In **Drive with gestures**, press A+B on one simulated micro:bit: the other robot drives and keeps going.
2. In **A wrist remote**, open the editor full screen and choose actions in the ML panel.
3. In **When the model is unsure**, press A+B once: the robot stops by itself after two seconds.

## Questions students ask

- **"Why does it keep going?"** Forever acts on the last mode until a new word arrives.
- **"Why does it stop while I'm still showing Forward?"** The board isn't repeating, or the radio groups differ.

## How it connects

Robotics challenges taught modes and radio; micro:bit and the computer taught the model and the bridge. Here they meet.
