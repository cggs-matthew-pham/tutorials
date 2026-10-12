---
title: "A model drives a build: cheat sheet"
subtitle: "micro:bit and the computer"
---

# A model drives a build

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**show string**: Scrolls a word or message across the screen. Basic › show string.

![show string](https://tutorials.learningwaypoints.com/_pictures/makecode/show-string.png?v=1f0bc8544ca55fd9)

```makecode
basic.showString("Hello")
```

:::

:::keep-together

**servo write pin**: Turns a servo on that pin to an angle from 0 to 180 (90 is the middle). Pins.

![servo write pin](https://tutorials.learningwaypoints.com/_pictures/makecode/servo-write-pin.png?v=a28b990ef0513ae8)

```makecode
pins.servoWritePin(AnalogPin.P0, 90)
```

:::

:::keep-together

**letter at**: The letter at a place in a text. Places start at 0, as in a list. Text (char from … at).

![letter at](https://tutorials.learningwaypoints.com/_pictures/makecode/letter-at.png?v=874b73275cffc9f3)

```makecode
message.charAt(0)
```

:::
