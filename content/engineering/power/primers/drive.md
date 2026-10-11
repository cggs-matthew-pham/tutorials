---
title: Driving a motor in 5 minutes
---
## The idea in plain words

**A pin is a signal, not a power supply.** An Uno pin can safely give about 20 mA (40 mA at most). A small 6 V gear motor draws about 150 mA running and several hundred when it starts or stalls. So the pin only *switches* something that can carry the current: a **transistor** for one direction, or a **motor driver** (an **H-bridge**, such as the L293D or TB6612) for both directions. The motor gets its current from its own **battery**.

An H-bridge has two direction inputs (IN1, IN2: one HIGH and one LOW for forwards, swapped for backwards, both the same to stop) and an enable input (ENA) that takes PWM from `analogWrite` to set the speed.

With two supplies (USB for the board, a battery for the motor) the **grounds must be joined**: a signal is a voltage *compared with ground*, so the driver can't read the board's pins without a shared 0 V. Powering a motor from the board's own 5V pulls that 5V down when the motor starts, and the board resets.

A motor is a coil: switching it off makes a voltage spike. A **flyback diode** across the motor (drivers usually have them built in) gives that spike somewhere safe to go.

## What students get wrong

- **If the code is right, the motor runs.** Power comes before code.
- **Speed and direction come from one signal.** Two jobs, two kinds of input.
- **Separate supplies need no connection.** Join the grounds.

## The words

**transistor**, **motor driver**, **H-bridge**, **enable**, **PWM**, **common ground**, **flyback diode**, **stall current**.
