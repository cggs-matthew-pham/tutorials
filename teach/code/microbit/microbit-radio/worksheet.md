---
title: "Send and receive"
subtitle: "micro:bit Foundations · Talk · Lesson 9"
---

# Send and receive

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Wireless doorbells, car keys and walkie-talkies all send small radio messages to a receiver tuned to the same channel.


:::teacher-note

**In one sentence:** Students send numbers between micro:bits by radio, react when a message arrives, and see that on radio received is one more event.

**Students should be able to say:** I can send a number by radio and react when one arrives. I can explain why micro:bits must share a radio group. I can make the receiver react differently to different numbers.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

**send number** sends; **on radio received** waits for a message to arrive.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/737ef21acef2.png?v=4469acfc4ba74015)

:::keep-together

**There are two micro:bits running this program. You press A on the first one. What happens?**

☐ Nothing happens

☐ The heart shows on both

☐ The heart shows on the second micro:bit

☐ The heart shows on the first micro:bit

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The heart shows on the second micro:bit. The first one sends the message; the others in group 1 receive it. A micro:bit does not receive its own message.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/737ef21acef2.png?v=4469acfc4ba74015)

:::keep-together

### What each block does

**Match each block with what it does.**

A. sends 1 to every other micro:bit in the group

B. holds the number that arrived

C. runs each time a message arrives

D. tunes in to channel 1, so only group 1 messages arrive

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `radio set group 1` | |
| `radio send number 1` | |
| `on radio received` | |
| `receivedNumber` | |

:::


:::teacher-note

**Answer:** radio set group 1 → D. tunes in to channel 1, so only group 1 messages arrive; radio send number 1 → A. sends 1 to every other micro:bit in the group; on radio received → C. runs each time a message arrives; receivedNumber → B. holds the number that arrived

:::


:::keep-together

### Ella's micro:bits

**Ella loads the program onto two real micro:bits. Pressing A on either does nothing. She changed one to radio set group 2. Why does nothing arrive?**

☐ send number needs a pause

☐ Group 2 is broken

☐ The two micro:bits are in different groups, so neither hears the other

☐ Radio only works in the simulator

:::


:::teacher-note

**Answer:** The two micro:bits are in different groups, so neither hears the other

A micro:bit only receives messages sent to its own group. One is on channel 1 and one on channel 2, so every message goes unheard.

:::


:::keep-together

### The same program in Python

```python
radio.set_group(1)

def on_button_pressed_a():
    radio.send_number(1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_received_number(receivedNumber):
    basic.show_icon(IconNames.HEART)
    basic.pause(500)
    basic.clear_screen()
radio.on_received_number(on_received_number)
```

Like a button, a radio message is an event: the micro:bit calls a function each time one arrives.

**The same program in Python. Match each line with what it does.**

A. sends the number 1

B. makes the function that runs when a number arrives

C. hands that function to the micro:bit to call for each message

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `radio.send_number(1)` | |
| `def on_received_number(receivedNumber):` | |
| `radio.on_received_number(on_received_number)` | |

:::


:::teacher-note

**Answer:** radio.send_number(1) → A. sends the number 1; def on_received_number(receivedNumber): → B. makes the function that runs when a number arrives; radio.on_received_number(on_received_number) → C. hands that function to the micro:bit to call for each message

:::


:::typical

## Modify


**Two messages.** Make **B** send 2. The receiver shows a heart for 1 and a sad face for 2.

**Your own channel.** In a classroom full of micro:bits, everyone on group 1 hears everyone else. Choose your own group number (0 to 255) and agree it with your partner.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Two messages:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/669a39a1d85b.png?v=7faab286875fe5ea)

:::

:::


## Make

Make **bike signals by radio**: the rider presses buttons on one micro:bit, and the one on the back of the bike shows the signal.

- **A** sends 1: left arrow.
- **B** sends 2: right arrow.
- **Shake** sends 3: a stop picture.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/91e6a9b0c01b.png?v=ac7fd464a8190824)

:::


:::wider

## Change a doorbell

This doorbell sends a **word** instead of a number (**send string**). Make it send your name, then make **B** send a different message, such as "come in".

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**Two micro:bits run the same radio program, but one is in group 3 and one in group 4. What happens when A is pressed on either?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Nothing arrives: each only hears messages sent to its own group.

:::

