---
title: "Send and receive"
subtitle: "micro:bit: talk and play · Talk · Lesson 2"
---

# Send and receive

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Wireless doorbells, car keys and walkie-talkies all send small radio messages to a receiver tuned to the same channel.


:::teacher-note

**In one sentence:** Students send a number by radio and react on another micro:bit when it arrives, and see that only micro:bits in the same group hear each other.

**Students should be able to say:** I can send a number from one micro:bit to another. I can react when a radio message arrives. I can say why both micro:bits need the same group.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

**send number** sends; **on radio received** waits for a message to arrive.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/737ef21acef2.png?v=4469acfc4ba74015)

:::keep-together

**There are two micro:bits running this program. You press A on the first one. What happens?**

☐ The heart shows on the second micro:bit

☐ The heart shows on both

☐ The heart shows on the first micro:bit

☐ Nothing happens

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


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/737ef21acef2.png?v=4469acfc4ba74015)

:::keep-together

### What each block does

**Match each block with what it does.**

A. runs each time a message arrives

B. sends 1 to every other micro:bit in the group

C. tunes in to channel 1, so only group 1 messages arrive

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `radio set group 1` | |
| `radio send number 1` | |
| `on radio received` | |

:::


:::teacher-note

**Answer:** radio set group 1 → C. tunes in to channel 1, so only group 1 messages arrive; radio send number 1 → B. sends 1 to every other micro:bit in the group; on radio received → A. runs each time a message arrives

:::


:::keep-together

### Ella's micro:bits

**Ella loads the program onto two real micro:bits. Pressing A on either does nothing. She changed one to radio set group 2. Why does nothing arrive?**

☐ Radio only works in the simulator

☐ send number needs a pause

☐ The two micro:bits are in different groups, so neither hears the other

☐ Group 2 is broken

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


**Shake to send.** Make a **shake** send a message too. Shake one micro:bit and watch the other.

**Your own channel.** In a classroom full of micro:bits, everyone on group 1 hears everyone else. Choose your own group number (0 to 255) and agree it with your partner.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Shake to send:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/bb6ddd0c5944.png?v=95968cbdcc33600c)

:::

:::


## Mix it up

A function from last lesson, with no radio in it.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/979c1e5e0758.png?v=6e11d1281982efc0)

:::keep-together

**flash is called twice from A and once from shake. You press A, then shake. How many flashes in all?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 3

A calls flash twice and shake calls it once: 2 + 1 = 3 flashes.

:::


## Make

Make a **doorbell**. Pressing **A** on the front door's micro:bit sends a number. The micro:bit inside calls a function, **ring**, that flashes a bell or a face (your choice).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/50f125d98aa5.png?v=65390697041e2eab)

:::


:::wider

## Change a quiet signal

A teacher presses A, and every student's micro:bit shows a raised hand: time to listen. Choose your own picture and group, then make **B** send the signal too.

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

