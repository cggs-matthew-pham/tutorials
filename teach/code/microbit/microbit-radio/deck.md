---
marp: true
theme: default
html: true
---

# Send and receive

micro:bit Foundations · Talk

<!-- Speaker note: Students send numbers between micro:bits by radio, react when a message arrives, and see that on radio received is one more event. About 50 minutes (Predict and Run 8 min · Investigate 15 min · Modify 12 min · Make 10 min · Doorbell 5 min). -->

---

## Today

**We are learning to** send a number by radio from one micro:bit to another, and react when it arrives.

- I can send a number by radio and react when one arrives.
- I can explain why micro:bits must share a radio group.
- I can make the receiver react differently to different numbers.

<!-- Speaker note: Before class: **Radio** sends short messages between micro:bits. **radio set group** chooses a channel (0 to 255); only micro:bits in the same group hear each other. **send number** sends to every other micro:bit in the group (never to itself). **on radio received** is an event: it runs each time a message arrives, and **receivedNumber** holds the number that came. In the simulator, a second micro:bit appears once the program uses radio; both run the same program. With real micro:bits in a classroom, pairs must choose their own group number or they will hear everyone. Teacher: Doorbell: send string sends a word; the receiver gets receivedString. -->

---

## Why it matters

> Wireless doorbells, car keys and walkie-talkies all send small radio messages to a receiver tuned to the same channel.

<!-- Speaker note: Micro:bits can talk to each other by **radio**. One sends a message; every micro:bit nearby in the same **group** (like a walkie-talkie channel) receives it. You find radio blocks in **Radio**. As soon as your program uses radio, the simulator shows **two** micro:bits. Both run the same program, so you can press a button on one and watch the other. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:246](https://tutorials.learningwaypoints.com/_pictures/makecode/code/737ef21acef2.png?v=4469acfc4ba74015)

**There are two micro:bits running this program. You press A on the first one. What happens?**

- Nothing happens
- The heart shows on both
- The heart shows on the second micro:bit
- The heart shows on the first micro:bit

<!-- Speaker note: What happens: The heart shows on the second micro:bit. The first one sends the message; the others in group 1 receive it. A micro:bit does not receive its own message. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: many students say 'on both'. Ask: who is listening, and who is talking? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The heart shows on the second micro:bit. The first one sends the message; the others in group 1 receive it. A micro:bit does not receive its own message.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/microbit/microbit-radio/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/microbit/microbit-radio/?full=step-2#step-2)

<!-- Speaker note: Press **A** on the first micro:bit, then on the second. Students should be able to say: I pressed A on each micro:bit in turn and watched which one showed the heart. -->

<!-- Speaker note: Teacher: press A on each micro:bit in turn. The heart always shows on the other one. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:246](https://tutorials.learningwaypoints.com/_pictures/makecode/code/737ef21acef2.png?v=4469acfc4ba74015)

<!-- Speaker note: What this step is for: on radio received is an event: it runs each time a message arrives from another micro:bit in the same group, and receivedNumber holds what was sent. -->

<!-- Speaker note: Teacher: Ella's groups are the most common real-classroom problem. The Python peek shows radio received as one more function the micro:bit calls. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What each block does

**Match each block with what it does.**

| | |
|---|---|
| `radio set group 1` | A. sends 1 to every other micro:bit in the group |
| `radio send number 1` | B. holds the number that arrived |
| `on radio received` | C. runs each time a message arrives |
| `receivedNumber` | D. tunes in to channel 1, so only group 1 messages arrive |

* Answer: radio set group 1 → D. tunes in to channel 1, so only group 1 messages arrive; radio send number 1 → A. sends 1 to every other micro:bit in the group; on radio received → C. runs each time a message arrives; receivedNumber → B. holds the number that arrived

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 18px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Ella's micro:bits

**Ella loads the program onto two real micro:bits. Pressing A on either does nothing. She changed one to radio set group 2. Why does nothing arrive?**

- send number needs a pause
- Group 2 is broken
- The two micro:bits are in different groups, so neither hears the other
- Radio only works in the simulator

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

<style scoped>pre, marp-pre { font-size: 0.67em; line-height: 1.25; }</style>

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

## Modify



- **Two messages:** Make **B** send 2. The receiver shows a heart for 1 and a sad face for 2.
- **Your own channel:** In a classroom full of micro:bits, everyone on group 1 hears everyone else. Choose your own group number (0 to 255) and agree it with your partner.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-radio/?full=step-4#step-4)

<!-- Speaker note: What this step is for: receivedNumber lets one event react differently to different messages, using if from the Decide unit. Hints, in order: Make B send 2. / In on radio received: if receivedNumber = 1, show the heart; else if receivedNumber = 2, show a sad face. receivedNumber is dragged out of the event block. For students who need more support: Give students the receiver with if … else if already built, and ask them to add the senders. For early finishers: Make a two-way chat: each micro:bit sends 1 for 'yes' and 2 for 'no', and shows a tick or cross when the other answers. The hard part, on purpose: Two micro:bits, one group, and a micro:bit never hears itself. When nothing arrives, ask which one is sending and which group each is in. When students get stuck: Nothing arrives. Ask: Are both micro:bits in the same group? Are you pressing on the sender? Fix: Check radio set group on both, and press on one while watching the other. / The receiver shows the same picture for every number. Ask: Where do you check which number arrived? Fix: Use if receivedNumber = 1 … else if receivedNumber = 2 inside on radio received. / receivedNumber cannot be found in Variables. Ask: Where does receivedNumber come from? Fix: Drag it out of the on radio received block itself. -->

<!-- Speaker note: Teacher: using receivedNumber with if revisits the Decide unit. Then each pair picks a group. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make **bike signals by radio**: the rider presses buttons on one micro:bit, and the one on the back of the bike shows the signal.

- **A** sends 1: left arrow.
- **B** sends 2: right arrow.
- **Shake** sends 3: a stop picture.

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-radio/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: Three senders: A, B and shake, each sending a different number. / One on radio received, with if and else if for each number. -->

<!-- Speaker note: Teacher: three numbers, three pictures. Remind students that each number is a code both micro:bits agree on. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a doorbell

This doorbell sends a **word** instead of a number (**send string**). Make it send your name, then make **B** send a different message, such as "come in".

[Open this step](https://tutorials.learningwaypoints.com/code/microbit/microbit-radio/?full=step-6#step-6)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Two micro:bits run the same radio program, but one is in group 3 and one in group 4. What happens when A is pressed on either?**

* Nothing arrives: each only hears messages sent to its own group.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: messages with meaning. A number can stand for a word in a list both micro:bits share. Class ideas: a relay where a message passes around the room micro:bit to micro:bit; a quiz buzzer where the first press locks out the others. -->
