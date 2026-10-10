---
title: Serial in 5 minutes
---
## The idea in plain words

A micro:bit plugged into a computer can send and receive **text, one line at a time**, down the USB cable. This is called **serial**.

- **serial write value** sends a named reading, such as `light:128`. Whatever is listening (MakeCode's **Show data**, the board on the lesson page, a spreadsheet) turns the lines into a table or graph.
- **on serial data received** runs when a whole line arrives from the computer; **serial read line** gives its text.
- Both sides must agree on the words: `happy` is not `Happy`.

## Why programmers use it

Science data loggers, 3D printers, laser cutters and robot arms all talk to computers this way: short lines of text, one command or reading per line. It is the simplest way for two programs on different devices to work together.

## An everyday picture, and where it breaks

Serial is like passing notes along a desk: one note at a time, each finished before the next. Where it breaks: a note in a language the reader doesn't know (a word the program doesn't check for) is ignored, and if the cable is in use by another page (MakeCode connected in another tab), no one else can pass notes.

## Try it yourself (5 minutes)

1. Open **Send data to the computer**, run the logger in the simulator and click **Show data**.
2. Drag the simulator's light level and watch the graph.
3. With a real micro:bit in Chrome or Edge, download the program and click **Connect a micro:bit** on the board.

## Questions students ask

- **"Connect lists nothing."** Use Chrome or Edge, and a USB cable that carries data (some only charge).
- **"It says the micro:bit is busy."** MakeCode is connected to it in another tab: disconnect there first.
- **"Why does my word do nothing?"** It must match the program's word exactly, capitals included.

## How it connects

The radio bridge passes these lines on by radio, and the AI lessons send a model's labels the same way.
