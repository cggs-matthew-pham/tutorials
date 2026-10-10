---
title: A radio bridge in 5 minutes
---
## The idea in plain words

A micro:bit on a USB cable can't go far. A **bridge** micro:bit stays plugged into the computer and **relays**:

- **radio in → serial out**: on radio received value → serial write value, so readings from across the room reach the computer.
- **serial in → radio out**: on serial data received → radio send string, so commands from the computer reach the micro:bit across the room.

Both micro:bits need the same **radio group**, and a micro:bit never hears its own radio messages.

## Why programmers use it

Smart-home hubs, farm sensor networks and wildlife cameras all send readings by radio to one hub, which passes them on to a computer or the internet. The hub is a bridge.

## An everyday picture, and where it breaks

A bridge is an interpreter between two people who speak different languages: one by phone (radio), one by note (serial). Where it breaks: if the two micro:bits are in different groups, the interpreter can't hear; if three people share one group, they all talk at once.

## Try it yourself (5 minutes)

1. Open **A radio bridge** and run it: the simulator shows two micro:bits.
2. Change the temperature on one and watch Show data.
3. With two real micro:bits, plug one in, put the other on a battery pack, and connect the board.

## Questions students ask

- **"Nothing arrives."** Same radio group on both? Is the far one switched on?
- **"Another pair's readings appear."** You chose the same group: pick your own.
- **"Why isn't the bridge's own temperature shown?"** A micro:bit never hears its own radio messages.

## How it connects

The AI lessons send a model's labels through this bridge to a sorting flap or a robot.
