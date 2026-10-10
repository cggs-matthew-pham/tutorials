---
order: 2
unit: usb
title: Commands from the computer
summary: The computer can send lines of text too. The micro:bit reads each whole line and its program decides what the word means, so both sides must agree on every word.
language: makecode
explainPicture: commands.ts#predict
hook: "A 3D printer, a laser cutter and a robot arm in a factory all take orders from a computer as short lines of text: move here, heat up, stop. The machine's own program decides what each line means."
---
Last lesson the micro:bit sent lines to the computer. Now the computer sends lines to the micro:bit: the board has buttons that each send a word.

**You need:** a micro:bit, a USB cable, and **Chrome or Edge**. The MakeCode simulator cannot receive lines from the computer, so this lesson runs on a real micro:bit. Without one, do the Predict, Investigate, Modify and Make steps in the editor and check them with a partner.

## Predict

```step
stage: predict
code: commands.ts#predict
check:
  type: predict
  q: "The computer sends the line Happy (with a capital H) to a micro:bit running this program. What does it show?"
  options: ["Nothing", "A happy face", "A sad face", "The word Happy"]
  actual: "Nothing. The program checks for happy with a small h. Text must match exactly, so Happy matches neither branch."
```

## Run it on a micro:bit

```step
stage: run
code: commands.ts#predict
try: { playground: microbit, starter: "commands.ts#predict" }
check: { type: reflect, text: "I downloaded the program to my micro:bit and left it plugged in." }
```

Click **Download** and copy the program to your micro:bit. Leave it plugged in. If the editor is connected to the micro:bit, disconnect it there first.

## Send commands

```step
stage: run
tier: typical
insight: "Seeing which words work and which don't makes exact matching concrete: the micro:bit acts only on the words its program checks for."
try: { playground: board, starter: "boards.yml#buttons", height: 520 }
check: { type: board, text: "Send happy and sad with the buttons, then type Happy yourself.", when: "sent_happy >= 1 and sent_sad >= 1 and n_sent >= 3" }
```

Click **Connect a micro:bit**, then the **Happy** and **Sad** buttons. Then type **Happy** in the box and send it. What happens?

## Investigate

```step
stage: investigate
code: commands.ts#predict
insight: "on serial data received runs once per whole line; read line gives the line's text, and the program's if chooses what each word does."
tasks:
  - check:
      type: question
      q: "When does on serial data received run?"
      options: ["Each time a whole line arrives (it ends with a new line)", "Every half second", "Only when the micro:bit starts", "When a button on the micro:bit is pressed"]
      answer: 0
      explain: "It waits for the end of a line, then runs once. read line gives you that line, without its new line."
  - check:
      type: question
      q: "Ben's micro:bit never reacts, whatever the board sends. His program starts with on serial data received with delimiters comma. Why?"
      options: ["It waits for a comma, but the board ends each line with a new line, so it never runs", "Commas are not allowed in serial", "He needs a forever block", "The cable is too slow"]
      answer: 0
      explain: "The delimiter is the character that ends a message. The board ends each line with a new line, so the micro:bit must wait for a new line."
  - check:
      type: question
      q: "Why is it useful for the micro:bit to send a reply, such as ok?"
      options: ["The computer then knows the command arrived and was understood", "Replies make the cable faster", "The micro:bit forgets the command otherwise", "Replies are needed for the LEDs to work"]
      answer: 0
      explain: "Without a reply the sender can't tell whether a command arrived, or whether it was a word the micro:bit doesn't know."
```

### When it runs

### Ben's micro:bit

```makecode
serial.onDataReceived(serial.delimiters(Delimiters.Comma), function () {
    command = serial.readLine()
    if (command == "happy") {
        basic.showIcon(IconNames.Happy)
    }
})
let command = ""
```

### Replies

## Modify

```step
stage: modify
insight: "A new command needs a new branch; a reply for every line, including words the program doesn't know, tells the computer what happened."
try: { playground: microbit, starter: "commands.ts#predict" }
tasks:
  - hint: "Add an else if: command = heart, then show icon heart."
    check: { type: code, text: "Add a heart command that shows a heart.", rules: { inside: { "serial.onDataReceived": ["command==\"heart\"", "basic.showIcon(IconNames.Heart)"] } } }
  - hint: ["serial write line is in Serial.", "Add an else at the end for any other word: serial write line ?"]
    check: { type: code, text: "Reply ok to happy and sad, and ? to any other word.", rules: { inside: { "serial.onDataReceived": ["serial.writeLine(\"ok\")", "serial.writeLine(\"?\")"] } } }
```

### A new command

Add a **heart** command. On the board, type **heart** in the box to test it.

### Reply

Make the micro:bit **reply**: **ok** when it knows the word, **?** when it doesn't. The board shows the replies.

## Make

```step
stage: make
try: { playground: microbit, starter: "commands.ts#make" }
hint:
  - "Three branches: on, off and count; an else for anything else."
  - "on: show leds with every LED lit; off: clear screen; count: show number and send it back with serial write value."
check: { type: code, text: "A desk lamp the computer controls: on, off, count (how many commands so far), a reply to each, and ? for other words.", rules: { inside: { "serial.onDataReceived": ["command==\"on\"", "command==\"off\"", "basic.clearScreen()", "serial.writeLine(\"?\")", "serial.writeValue(\"count\""] } } }
```

Make a **desk lamp** the computer controls. **on** lights every LED, **off** clears the screen, **count** shows (and sends back) how many commands it has had. Reply **ok** to on and off and **?** to anything else.

## Test the lamp

```step
stage: info
tier: typical
try: { playground: board, starter: "boards.yml#lamp", height: 520 }
check: { type: board, text: "Send on, off and count to your lamp, and get a count back.", when: "sent_on >= 1 and sent_off >= 1 and n_lines >= 3" }
```

Download your lamp to a micro:bit, connect it, and use the buttons. Type a word it doesn't know, too.
