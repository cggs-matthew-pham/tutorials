---
title: "Which message?"
subtitle: "micro:bit: talk and play · Talk · Lesson 3"
---

# Which message?

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A garage door opener has one receiver but two buttons: open and close. The receiver reads which code arrived and acts on it.


:::teacher-note

**In one sentence:** Students use receivedNumber to do something different for each radio message, and send words with send string.

**Students should be able to say:** I can make the receiver do something different for each number that arrives. I can send a word by radio and show it. I can agree a code of numbers with a partner.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

A sends 1 and B sends 2. One **on radio received** block checks which arrived.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b2ec24c13148.png?v=772ce4b675b81a7f)

:::keep-together

**You press B on the first micro:bit. What does the second micro:bit show?**

☐ A heart, then a sad face

☐ A sad face

☐ The number 2

☐ A heart

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** A sad face. B sends 2. On the second micro:bit receivedNumber is 2, so the first question is false and the else if part runs.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b2ec24c13148.png?v=772ce4b675b81a7f)

:::keep-together

### Trace the messages

**What does the receiver show for each number that arrives?**

{{rows 1}}

| receivedNumber | shows |
|---|---|
| 1 |   |
| 2 |   |
| 5 |   |

:::


:::teacher-note

**Answer:** heart, sad face, nothing

1 and 2 each have a question. 5 makes both questions false, and there is no else, so nothing happens.

:::


:::keep-together

### Max's second block

**Max wants 1 to show a heart and 2 a sad face. He drags in a second on radio received block for 2, and it greys out. What should he do?**

☐ Put the second block in forever

☐ Send 2 twice

☐ Use one on radio received, with if receivedNumber = 1 … else if receivedNumber = 2

☐ Use a different group for 2

:::


:::teacher-note

**Answer:** Use one on radio received, with if receivedNumber = 1 … else if receivedNumber = 2

Every number arrives in the same on radio received block. receivedNumber says which one came, and if … else if picks what to do.

:::


:::keep-together

### In Python

```python
def on_received_number(receivedNumber):
    if receivedNumber == 1:
        basic.show_icon(IconNames.HEART)
    elif receivedNumber == 2:
        basic.show_icon(IconNames.SAD)
radio.on_received_number(on_received_number)
```

`elif` is Python's short way to write *else if*.

**The receiver in Python. Match each line with what it does.**

A. runs for every number that arrives

B. checks whether the number was 1

C. otherwise, checks whether it was 2

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `def on_received_number(receivedNumber):` | |
| `if receivedNumber == 1:` | |
| `elif receivedNumber == 2:` | |

:::


:::teacher-note

**Answer:** def on_received_number(receivedNumber): → A. runs for every number that arrives; if receivedNumber == 1: → B. checks whether the number was 1; elif receivedNumber == 2: → C. otherwise, checks whether it was 2

:::


:::typical

## Modify


**A third message.** Make a **shake** send 3, and the receiver show a surprised face when 3 arrives.

**Send a word.** **send string** sends a word, and **on radio received receivedString** holds the word that arrived. Make **A+B** send *hi*, and the receiver show it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A third message:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/2a899259704e.png?v=8a6df3c2a0503026)

**Send a word:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/a404579cf120.png?v=b1213c028173c9d5)

:::

:::


## Mix it up

Last lesson's program, on three micro:bits.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/737ef21acef2.png?v=4469acfc4ba74015)

:::keep-together

**Three micro:bits run this program. The first and second are in group 1; the third is in group 2. You press A on the first. Which show the heart?**

☐ All three

☐ Only the second

☐ Only the first

☐ The second and the third

:::


:::teacher-note

**Answer:** Only the second

The first one sends and never hears itself. The second is in the same group, so it hears. The third is in group 2, so it hears nothing.

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

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/91e6a9b0c01b.png?v=ac7fd464a8190824)

:::


:::wider

## Change a doorbell

This doorbell sends a **word** instead of a number. Make it send your name, then make **B** send a different message, such as "come in".

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**A receiver checks if receivedNumber = 1 and else if receivedNumber = 2. What happens when 3 arrives?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Nothing. Both questions are false and there is no else.

:::

