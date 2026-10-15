---
marp: true
theme: default
html: true
---

# Send and receive

micro:bit: talk and play · Talk

<!-- Speaker note: Students send a number by radio and react on another micro:bit when it arrives, and see that only micro:bits in the same group hear each other. About 40 minutes (Predict and Run 8 min · Investigate 10 min · Modify 6 min · Mix it up 3 min · Make 9 min · Quiet signal 4 min). -->

---

## Today

**We are learning to** send a number by radio, and react on another micro:bit when it arrives.

- I can send a number from one micro:bit to another.
- I can react when a radio message arrives.
- I can say why both micro:bits need the same group.

<!-- Speaker note: Before class: **Radio** sends short messages between micro:bits. **radio set group** chooses a channel (0 to 255); only micro:bits in the same group hear each other. **send number** sends to every other micro:bit in the group (never to itself). **on radio received** is an event: it runs each time a message arrives. In the simulator, a second micro:bit appears once the program uses radio; both run the same program. Using the number that arrived (**receivedNumber**) is next lesson. With real micro:bits in a classroom, pairs must choose their own group number or they will hear everyone. Teacher: Mix it up: counting function calls, from last lesson. -->

---

## Why it matters

> Wireless doorbells, car keys and walkie-talkies all send small radio messages to a receiver tuned to the same channel.

<!-- Speaker note: Micro:bits can talk to each other by **radio**. One sends a message; every micro:bit nearby in the same **group** (like a walkie-talkie channel) receives it. You find radio blocks in **Radio**. As soon as your program uses radio, the simulator shows **two** micro:bits. Both run the same program, so you can press a button on one and watch the other. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:246](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/737ef21acef2.png?v=4469acfc4ba74015)

**There are two micro:bits running this program. You press A on the first one. What happens?**

- The heart shows on the second micro:bit
- The heart shows on both
- The heart shows on the first micro:bit
- Nothing happens

<!-- Speaker note: What happens: The heart shows on the second micro:bit. The first one sends the message; the others in group 1 receive it. A micro:bit does not receive its own message. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: many students say 'on both'. Ask: who is listening, and who is talking? Or: does a walkie-talkie play your own voice back to you? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The heart shows on the second micro:bit. The first one sends the message; the others in group 1 receive it. A micro:bit does not receive its own message.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-radio/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-radio/?full=step-2#step-2)

<!-- Speaker note: Press **A** on the first micro:bit, then on the second. Students should be able to say: I pressed A on each micro:bit in turn and watched which one showed the heart. -->

<!-- Speaker note: Teacher: press A on each micro:bit in turn. The heart always shows on the other one. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:246](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/737ef21acef2.png?v=4469acfc4ba74015)

<!-- Speaker note: What this step is for: send number reaches every other micro:bit in the same group, and on radio received is an event that runs each time a message arrives. -->

<!-- Speaker note: Teacher: Ella's groups are the most common real-classroom problem. The Python peek shows radio received as one more function the micro:bit calls. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What each block does

**Match each block with what it does.**

| | |
|---|---|
| `radio set group 1` | A. runs each time a message arrives |
| `radio send number 1` | B. sends 1 to every other micro:bit in the group |
| `on radio received` | C. tunes in to channel 1, so only group 1 messages arrive |

* Answer: radio set group 1 → C. tunes in to channel 1, so only group 1 messages arrive; radio send number 1 → B. sends 1 to every other micro:bit in the group; on radio received → A. runs each time a message arrives

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Ella's micro:bits

**Ella loads the program onto two real micro:bits. Pressing A on either does nothing. She changed one to radio set group 2. Why does nothing arrive?**

- Radio only works in the simulator
- send number needs a pause
- The two micro:bits are in different groups, so neither hears the other
- Group 2 is broken

* Answer: The two micro:bits are in different groups, so neither hears the other

<!-- Speaker note: A micro:bit only receives messages sent to its own group. One is on channel 1 and one on channel 2, so every message goes unheard. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## The same program in Python

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

<style scoped>pre, marp-pre { font-size: 0.82em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The same program in Python

**The same program in Python. Match each line with what it does.**

| | |
|---|---|
| `radio.send_number(1)` | A. sends the number 1 |
| `def on_received_number(receivedNumber):` | B. makes the function that runs when a number arrives |
| `radio.on_received_number(on_received_number)` | C. hands that function to the micro:bit to call for each message |

* Answer: radio.send_number(1) → A. sends the number 1; def on_received_number(receivedNumber): → B. makes the function that runs when a number arrives; radio.on_received_number(on_received_number) → C. hands that function to the micro:bit to call for each message

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Channels <span style="font-size:.6em;color:#64748b">(4 min)</span>

Students hold a group number card. One student whispers a message to their group number; only students with the same card may react.

<!-- Speaker note: Swap one student's card: they miss everything. That is Ella's bug. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Shake to send:** Make a **shake** send a message too. Shake one micro:bit and watch the other.
- **Your own channel:** In a classroom full of micro:bits, everyone on group 1 hears everyone else. Choose your own group number (0 to 255) and agree it with your partner.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-radio/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Any event can send a message, and a group number of your own keeps your micro:bits to themselves. Hints, in order: Drag in on shake from Input. / Put radio send number inside it. For students who need more support: Give students the ring function already made, and ask them to add the sender and the receiver. For early finishers: Make the doorbell ring differently for a shake (a knock) and for A (the bell). How does the receiver know which? (Next lesson.) The hard part, on purpose: Two micro:bits, one group, and a micro:bit never hears itself. When nothing arrives, ask which one is sending and which group each is in. When students get stuck: Nothing arrives. Ask: Are both micro:bits in the same group? Are you pressing on the sender? Fix: Check radio set group on both, and press on one while watching the other. / The heart shows on the micro:bit that was pressed. Ask: Is there a show icon inside the button event as well? Fix: Keep the button event for sending only; showing belongs in on radio received. / The second micro:bit is missing from the simulator. Ask: Is there a radio block in the program? Fix: The second micro:bit appears once any radio block is used. -->

<!-- Speaker note: Teacher: any event can send. Then each pair picks a group. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

![h:303](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/979c1e5e0758.png?v=6e11d1281982efc0)

<!-- Speaker note: A function from last lesson, with no radio in it. What this step is for: A function runs once for each call, wherever the call is. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**flash is called twice from A and once from shake. You press A, then shake. How many flashes in all?**

* Answer: 3

<!-- Speaker note: A calls flash twice and shake calls it once: 2 + 1 = 3 flashes. What this step is for: A function runs once for each call, wherever the call is. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a **doorbell**. Pressing **A** on the front door's micro:bit sends a number. The micro:bit inside calls a function, **ring**, that flashes a bell or a face (your choice).

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-radio/?full=step-6#step-6)

<!-- Speaker note: Hints, in order: Make a function ring that flashes a picture, and call it from on radio received. / On the sender: on button A pressed, radio send number 1. -->

<!-- Speaker note: Teacher: the doorbell calls a function from on radio received. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a quiet signal

A teacher presses A, and every student's micro:bit shows a raised hand: time to listen. Choose your own picture and group, then make **B** send the signal too.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-radio/?full=step-7#step-7)

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Ring the bell <span style="font-size:.6em;color:#64748b">(3 min)</span>

Pair up with real micro:bits (or two simulators). Agree a group, then ring each other's doorbell.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Two micro:bits run the same radio program, but one is in group 3 and one in group 4. What happens when A is pressed on either?**

* Nothing arrives: each only hears messages sent to its own group.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: the number that arrives can say which message it was, so one receiver does different things. Class idea: a relay where a message passes around the room micro:bit to micro:bit. -->
