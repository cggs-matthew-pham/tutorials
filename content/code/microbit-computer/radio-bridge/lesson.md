---
order: 3
unit: radio
title: A radio bridge
summary: A micro:bit on the cable relays messages by radio, so the micro:bit doing the work can be anywhere in the room. The bridge passes radio to serial one way and serial to radio the other.
language: makecode
introduces: [radio-value, value-name-limit]
explainPicture: bridge.ts#predict
hook: "Smart-home sensors, farm soil probes and wildlife cameras send their readings by radio to one hub, and the hub passes them on to a computer. The hub is a bridge."
---
A micro:bit on a cable can't go far. In this lesson a second micro:bit, anywhere in the room, sends its readings by **radio** to the micro:bit on the cable, which passes them on to the computer. That micro:bit is a **bridge**.

The same program goes on both micro:bits: each part only does something on the micro:bit where it makes sense. In the simulator you will see two micro:bits running it.

Readings travel with **radio send value** (in **Radio**): a short **name**, such as `temp`, and a number together. **on radio received value** gives the bridge both, as `name` and `value`. A name can be **8 characters at most**: a longer one, such as `temperature`, is cut short on the way.

## Predict

```step
stage: predict
code: bridge.ts#predict
check:
  type: predict
  q: "The micro:bit across the room is at 24 °C. What does the computer receive from the bridge?"
  options: ["A line: temp:24", "Nothing: radio can't reach a computer", "A line: 24", "The radio signal itself"]
  actual: "temp:24. The far micro:bit sends the name and value by radio; the bridge's on radio received value passes them on with serial write value."
```

## Run

```step
stage: run
code: bridge.ts#predict
try: { playground: microbit, starter: "bridge.ts#predict" }
check: { type: reflect, text: "I changed the temperature on one simulated micro:bit and saw the values arrive under Show data." }
```

The simulator runs the program on two micro:bits. Change the **temperature** on one of them, then open **Show data** to see what the other passes on.

## Across the room

```step
stage: run
tier: typical
insight: "With two real micro:bits, the readings from one arrive on the computer through the other: the bridge is just relaying."
try: { playground: board, starter: "boards.yml#graph", height: 600 }
check: { type: board, text: "Collect at least 5 temperature readings through the bridge.", when: "n_temp >= 5" }
```

Download the program to **two** micro:bits. Plug one in and connect it here; put the other on a battery pack across the room (or hold it in your hands to warm it up).

## Investigate

```step
stage: investigate
code: bridge.ts#predict
insight: "A bridge relays: radio in becomes serial out, and (with one more block) serial in becomes radio out. Both micro:bits must share a radio group."
tasks:
  - check:
      type: match
      q: "Match each block with the job it does in the bridge."
      pairs:
        - ["on radio received value → serial write value", "radio to the computer"]
        - ["on serial data received → radio send string", "the computer to radio"]
        - ["radio set group", "only micro:bits in the same group hear each other"]
  - check:
      type: question
      q: "Ben's far micro:bit is in radio group 7 and his bridge is in group 8. What does the board show?"
      options: ["Nothing arrives", "The values arrive twice", "The values arrive slowly", "Only the first value arrives"]
      answer: 0
      explain: "Radio messages reach only micro:bits in the same group. Ben's bridge never hears the readings."
  - check:
      type: question
      q: "Both micro:bits run the same program, so the bridge also sends its own temperature by radio. Why doesn't the bridge's own temperature appear on the board?"
      options: ["A micro:bit never hears its own radio messages", "The bridge has no temperature sensor", "The board ignores the bridge", "Two values can't share a name"]
      answer: 0
      explain: "Radio goes to every other micro:bit in the group, never back to the sender. So only the far micro:bit's readings arrive. (If you use three micro:bits, give them different names.)"
```

### Two directions

### Ben's bridge

```makecode
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
})
radio.setGroup(8)
```

### Its own messages

## Modify

```step
stage: modify
insight: "Adding a value on the far side needs no change to the bridge; adding the computer-to-radio direction needs one more block."
try: { playground: microbit, starter: "bridge.ts#predict" }
tasks:
  - hint: "In forever, add radio send value light, light level."
    check: { type: code, text: "The far micro:bit sends its light level too.", rules: { inside: { "basic.forever": ["radio.sendValue(\"temp\"", "radio.sendValue(\"light\",input.lightLevel())"] } } }
  - hint: ["On serial data received: radio send string, read line. That is the computer-to-radio direction.", "On radio received string: if receivedString = beep, play a tone (Music)."]
    check: { type: code, text: "The computer can send beep through the bridge, and the far micro:bit beeps.", rules: { inside: { "serial.onDataReceived": ["radio.sendString(serial.readLine())"], "radio.onReceivedString": ["receivedString==\"beep\"", "music."] } } }
```

### Light too

Send the **light level** as well. Did you have to change the bridge?

### Beep

Add the other direction: the bridge passes each line from the computer on by radio, and the far micro:bit **beeps** when it receives **beep**.

## Make

```step
stage: make
try: { playground: microbit, starter: "bridge.ts#make" }
hint:
  - "The bridge part: serial to radio, and radio to serial (from the last step)."
  - "The far part: send temp and light every second; on radio received string alarm show a cross and send alarm 1; clear clears the screen and sends alarm 0."
check: { type: code, text: "A room monitor: a bridge both ways; the far micro:bit sends temperature and light every second, shows an alarm on alarm and clears on clear, and reports alarm 1 or 0.", rules: { inside: { "serial.onDataReceived": ["radio.sendString(serial.readLine())"], "radio.onReceivedValue": ["serial.writeValue(name,value)"], "radio.onReceivedString": ["receivedString==\"alarm\"", "receivedString==\"clear\"", "radio.sendValue(\"alarm\""] }, count: { "radio.sendValue(": 4 } } }
```

Make a **room monitor**: the far micro:bit reports **temperature** and **light** every second, shows an alarm (a cross) when the computer sends **alarm**, clears it on **clear**, and reports **alarm 1** or **alarm 0** so the computer knows it worked.

## Test the monitor

```step
stage: info
tier: typical
try: { playground: board, starter: "boards.yml#monitor", height: 600 }
check: { type: board, text: "Use the board to set and clear the alarm, and see alarm 1 and 0 come back.", when: "sent_alarm >= 1 and sent_clear >= 1 and n_alarm >= 2" }
```

Download your monitor to two micro:bits, connect the bridge here, and try **Alarm** and **Clear**.
