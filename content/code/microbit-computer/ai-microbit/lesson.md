---
order: 5
unit: ai
title: A model drives a micro:bit
summary: The board sends your model's label down the USB cable as a line of text. The micro:bit's program decides what each label does, and must also handle labels it doesn't expect.
language: makecode
explainPicture: sorter.ts#predict
hook: "A sorting machine's camera and its motors are separate parts. The camera's model only says 'Plastic'; a small controller decides which flap to move. The two have to agree on every word."
---
Last lesson you trained a model that labels photos. Now its labels drive a micro:bit, the same way the board's buttons did in **Commands from the computer**: the board sends the label as a **line of text** over the USB cable, and the micro:bit's program decides what to do.

**You need:** a micro:bit, a USB cable, and **Chrome or Edge** on a laptop or Chromebook (other browsers can't talk to a micro:bit). The MakeCode simulator can't receive these messages, so the board steps run on a real micro:bit.

## Predict

```step
stage: predict
code: sorter.ts#predict
check:
  type: predict
  q: "Your model has a Neither class. The board sends \"Neither\" to a micro:bit running this program. What does it show?"
  options: ["L", "Nothing", "P", "An error"]
  actual: "L. The program checks only for \"Paper\"; else catches every other line, including \"Neither\"."
```

## Run it on a micro:bit

```step
stage: run
code: sorter.ts#predict
try: { playground: microbit, starter: "sorter.ts#predict" }
check: { type: reflect, text: "I downloaded the program to my micro:bit and left it plugged in." }
```

Click **Download** in the editor and copy the program to your micro:bit. Leave it plugged in. If the editor is **connected** to the micro:bit, disconnect it (or close that tab): only one page can use the cable at a time.

## Send labels

```step
stage: run
tier: typical
insight: "Watching each label leave the board and the micro:bit's display change makes the message concrete: a word, nothing more."
try: { playground: board, starter: "boards.yml#send", height: 760 }
check: { type: board, text: "Connect your micro:bit and send at least three labels.", when: "n_sent >= 3" }
```

Paste your model's link and click **Load**, then **Connect a micro:bit** and choose it in the list. Click a test photo to send its label, or use the webcam: it sends a label once the same label has held above 80% confidence for a moment. Watch the micro:bit.

## Investigate

```step
stage: investigate
code: sorter.ts#predict
insight: "The model sends only a word; the receiving program gives it meaning, so both sides must agree on the exact words, and the program must handle words it doesn't expect."
tasks:
  - check:
      type: question
      q: "What travels down the USB cable when the board sends a label?"
      options: ["A line of text, such as Paper", "The photo", "The whole model", "A number from 1 to 3"]
      answer: 0
      explain: "Only the label, as text, ending with a new line. The micro:bit never sees the photo or the model."
  - check:
      type: question
      q: "Ben's model has classes Paper and Plastic. His micro:bit never shows anything. Why?"
      options: ["He checks for \"paper\" and \"plastic\", but the board sends \"Paper\" and \"Plastic\"", "His micro:bit is too slow", "Serial only works with numbers", "He needs a forever block"]
      answer: 0
      explain: "Text has to match exactly, capital letters included. Both sides must agree on every word."
  - check:
      type: question
      q: "Why does the webcam wait for a label to hold for a moment above 80% before sending it?"
      options: ["So a model that flickers between two labels doesn't make the micro:bit jump back and forth", "The cable is slow", "The micro:bit can only read one label a minute", "So the model can retrain"]
      answer: 0
      explain: "When the model is unsure, its top label changes many times a second. Acting on every change would make a sorter jitter."
```

### What is sent

### Ben's sorter

```makecode
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    label = serial.readLine()
    if (label == "paper") {
        basic.showString("P")
    } else if (label == "plastic") {
        basic.showString("L")
    }
})
let label = ""
```

### Unsure labels

## Modify

```step
stage: modify
insight: "Giving every label its own branch, and replying, makes the two sides agree."
try: { playground: microbit, starter: "sorter.ts#predict" }
tasks:
  - hint: "Change else to else if, and add a third branch: label = \"Neither\"."
    check: { type: code, text: "Plastic shows L, and Neither shows a cross (show icon).", rules: { inside: { "serial.onDataReceived": ["label==\"Plastic\"", "label==\"Neither\"", "basic.showIcon(IconNames.No)"] } } }
  - hint: ["serial write value is in Serial. Give it a name such as bin and a number.", "Paper sends bin 1, Plastic bin 2, anything else bin 0."]
    check: { type: code, text: "The micro:bit replies with which bin it chose (bin 1, 2 or 0).", rules: { count: { "serial.writeValue(\"bin\"": 3 } } }
```

### Neither

Give **Neither** its own branch that shows a cross, and make **Plastic** a branch of its own too.

### Reply

A sorter should say what it did. Make the micro:bit **reply** with **serial write value**: `bin` 1 for Paper, 2 for Plastic, 0 for anything else. On the board, the replies appear under the buttons.

## Over radio

```step
stage: modify
tier: typical
insight: "A micro:bit on the cable can pass each label on by radio, so the build that acts on it can be anywhere in the room."
try: { playground: microbit, starter: "sorter.ts#bridge" }
check: { type: code, text: "On radio received string, show the first letter and send the value got 1 back.", rules: { inside: { "radio.onReceivedString": ["basic.showString(receivedString.charAt(0))", "radio.sendValue(\"got\",1)"] } } }
```

A sorter on a conveyor belt is not plugged into a laptop. This is the **bridge** from **A radio bridge**: the micro:bit on the cable passes each line on by **radio**, and passes radio values back to the board. Add **on radio received string** so a second micro:bit shows the first letter of each label and replies **got 1**. Download the same program to both micro:bits; plug one into the computer.

## Make a sorting flap

```step
stage: make
try: { playground: microbit, starter: "sorter.ts#make" }
hint:
  - "A servo on pin P0: servo write pin P0 to 30 for Paper, 150 for Plastic and 90 (the middle) for anything else."
  - "After each move, send the bin back by radio: radio send value bin 1, 2 or 0."
check: { type: code, text: "A sorting flap: the radio label sets a servo on P0 to one angle per label, the middle for anything else, and replies with the bin.", rules: { count: { "pins.servoWritePin(AnalogPin.P0": 3, "radio.sendValue(\"bin\"": 3 }, inside: { "radio.onReceivedString": ["receivedString==\"Paper\""] } } }
```

Build a **sorting flap**: a servo on **P0** on the second micro:bit tips left for **Paper**, right for **Plastic**, and stays in the middle for anything else, then replies with the bin. Try it with your model and real items.

## On a real micro:bit

```step
stage: info
```

- **Chrome or Edge only.** Safari, Firefox and iPads can't connect.
- **"The micro:bit is busy"**: another tab (often MakeCode) is using the cable. Disconnect it there or close that tab.
- **Same radio group** on both micro:bits, and a different group for every pair in the room.
- A servo needs more power than USB sometimes gives: if it twitches or the micro:bit resets, use a battery pack or a servo board.
