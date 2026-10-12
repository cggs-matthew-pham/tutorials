---
title: "Messages with meaning"
subtitle: "micro:bit Foundations · Talk · Lesson 10"
---

# Messages with meaning

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Morse code, flag signals and the numbers a fast-food counter calls out all work because both sides agree what each code means.


:::teacher-note

**In one sentence:** Students send a place number that stands for a word in a list both micro:bits share, and see that a message is a code both sides must agree on.

**Students should be able to say:** I can send a place number and look up the word it stands for. I can explain why both micro:bits need the same list in the same order. I can step through a list with a button and loop back to the start.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The receiver shows **words[receivedNumber]**: the word at the place that arrived.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/cb434abb1fc7.png?v=3a0b862809eb78b0)

:::keep-together

**You press A on one micro:bit, so it sends 2. What does the other micro:bit show?**

☐ No

☐ Hi

☐ 2

☐ Yes

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** No. The receiver looks up place 2 in its list: Hi is at 0, Yes at 1, No at 2.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/98c129ea3961.png?v=5059eba5d8badf69)

:::keep-together

### Choose and send

**This messenger lets you choose a word with A, then send it with B. Fill in choice after each press of A.**

{{rows 1}}

| press | choice after | word shown |
|---|---|---|
| (start) | 0 |  |
| A |   |   |
| A |   |   |
| A |   |   |

:::


:::teacher-note

**Answer:** 1, Yes, 2, No, 0, Hi

Each A adds 1. When choice reaches 3 (the length of the list), the if sets it back to 0, so it loops round the list.

:::


:::keep-together

### Ella and Tom

Ella's list:

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/b48fc8b749f3.png?v=f1c116adf2a66741)

Tom's list:

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/85e2f3d04579.png?v=0060d7492e3d079a)

**Ella and Tom built the messenger, but Tom's list is in a different order. Ella sends Yes, and Tom's micro:bit shows No. Why?**

☐ Only the place number is sent, and the same place holds a different word in Tom's list

☐ The radio changed the number

☐ Lists cannot be sent by radio

☐ Tom's group is wrong

:::


:::teacher-note

**Answer:** Only the place number is sent, and the same place holds a different word in Tom's list

Ella sends place 1. In her list place 1 is Yes; in Tom's it is No. Both micro:bits must use the same list in the same order.

:::


:::keep-together

### Why a number?

**Why send the place number instead of the whole word?**

☐ Radio cannot send words

☐ It is the only block that works

☐ Numbers are prettier

☐ Both micro:bits already have the list, so a small number is all that needs to travel

:::


:::teacher-note

**Answer:** Both micro:bits already have the list, so a small number is all that needs to travel

Radio can send words, but a number is shorter and both sides already know what it stands for. That shared list is a code.

:::


:::keep-together

### In Python

```python
words = ["Hi", "Yes", "No"]

def on_button_pressed_b():
    radio.send_number(choice)
    basic.show_icon(IconNames.YES)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_number(receivedNumber):
    basic.show_string(words[receivedNumber])
radio.on_received_number(on_received_number)
```

The square brackets mean "the item at this place", just like *get value at*.

**The messenger in Python. Match each line with what it does.**

A. sends the place of the chosen word

B. shows the word at the place that arrived

C. makes the shared list

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `words = ["Hi", "Yes", "No"]` | |
| `radio.send_number(choice)` | |
| `basic.show_string(words[receivedNumber])` | |

:::


:::teacher-note

**Answer:** words = ["Hi", "Yes", "No"] → C. makes the shared list; radio.send_number(choice) → A. sends the place of the chosen word; basic.show_string(words[receivedNumber]) → B. shows the word at the place that arrived

:::


:::typical

## Modify


**One more word.** Add a fourth word. Did you need to change anything else? Why not?

**Got it!.** Make the receiver **reply**: when a word arrives, it sends back 99, and the sender shows a tick when 99 arrives. Real messaging apps do this to show "delivered".

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**One more word:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/2e08478c1da2.png?v=e68168ffcd1aeecf)

**Got it!:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/556209082bf1.png?v=5b8750eb832f8840)

:::

:::


## Make

Make a **mood check-in** for the start of class. Each student's micro:bit has a list of moods (at least three). **A** steps through them, **B** sends the chosen one, and the teacher's micro:bit shows it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/b7f4ce89d84c.png?v=2669321c88ba72a7)

:::


:::wider

## Change a quiz buzzer

This buzzer lets you pick an answer, A, B or C, and send it to the quiz master. Add a fourth answer, D, then make the quiz master's micro:bit show a tick after each answer arrives.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**Your micro:bit sends 1. Your list is Hi, Yes, No. Your partner's list is Yes, No, Hi. What does your partner's micro:bit show, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** No. Only the place number travels, and place 1 in your partner's list is No.

:::

