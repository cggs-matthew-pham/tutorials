---
title: "Secret codes: cheat sheet"
subtitle: "Secret messages"
---

# Secret codes

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**show number**: Shows a number; numbers above 9 scroll. Basic › show number.

![show number](https://tutorials.learningwaypoints.com/_pictures/makecode/show-number.png?v=a64f8810d68a8157)

```makecode
basic.showNumber(0)
```

:::

:::keep-together

**set variable**: Puts a value in a variable, throwing the old value away. Make the variable in Variables first.

![set variable](https://tutorials.learningwaypoints.com/_pictures/makecode/set-variable.png?v=6d8764e697ba50a8)

```makecode
let count = 0
```

:::

:::keep-together

**change variable**: Adds to a variable's value. Change by -1 counts down. Variables.

![change variable](https://tutorials.learningwaypoints.com/_pictures/makecode/change-variable.png?v=7d44ab57a8c081ee)

```makecode
count += 1
```

:::

:::keep-together

**radio send number**: Sends a number to every other micro:bit in the group. Radio.

![radio send number](https://tutorials.learningwaypoints.com/_pictures/makecode/radio-send-number.png?v=04657dd9e9e41723)

```makecode
radio.sendNumber(0)
```

:::

:::keep-together

**on radio received**: Runs each time a number arrives; receivedNumber holds it. Radio.

![on radio received](https://tutorials.learningwaypoints.com/_pictures/makecode/on-radio-received.png?v=d78e5c441ffede02)

```makecode
radio.onReceivedNumber(function (receivedNumber) {
    blocks
})
```

:::

:::keep-together

**find in text**: The place where something first appears in a text, counted from 0, or -1 if it is not there. Text (find index of … in …).

![find in text](https://tutorials.learningwaypoints.com/_pictures/makecode/find-in-text.png?v=5f776d7982292dd0)

```makecode
alphabet.indexOf(letter)
```

:::

:::keep-together

**remainder**: What is left over after dividing: 27 % 26 is 1. Wraps a count back round to the start. Math (remainder of … ÷ …).

![remainder](https://tutorials.learningwaypoints.com/_pictures/makecode/remainder.png?v=eef5a496f0e812c0)

```makecode
place % 26
```

:::

:::keep-together

**xor with a key**: XOR: compares two numbers bit by bit. Doing it again with the same key brings the number back, so one key locks and unlocks. Written ^ in JavaScript and Python.

![xor with a key](https://tutorials.learningwaypoints.com/_pictures/makecode/xor-with-a-key.png?v=16d3c3e80d950056)

```makecode
message ^ key
```

:::
