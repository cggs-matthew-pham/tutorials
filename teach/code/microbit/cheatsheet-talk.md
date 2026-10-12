---
title: "Talk: cheat sheet"
subtitle: "micro:bit Foundations"
---

# Talk

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**radio set group**: Picks a channel (0 to 255). Only micro:bits in the same group hear each other. Radio.

![radio set group](https://tutorials.learningwaypoints.com/_pictures/makecode/radio-set-group.png?v=c4ad40541593e499)

```makecode
radio.setGroup(1)
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

**radio send string**: Sends a word to every other micro:bit in the group. Radio.

![radio send string](https://tutorials.learningwaypoints.com/_pictures/makecode/radio-send-string.png?v=e8f49054b7d9de37)

```makecode
radio.sendString("hi")
```

:::

:::keep-together

**on radio received string**: Runs each time a word arrives; receivedString holds it. Radio.

![on radio received string](https://tutorials.learningwaypoints.com/_pictures/makecode/on-radio-received-string.png?v=2e4be96fbc6f9840)

```makecode
radio.onReceivedString(function (receivedString) {
    blocks
})
```

:::
