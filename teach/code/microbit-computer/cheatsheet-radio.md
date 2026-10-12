---
title: "A radio bridge: cheat sheet"
subtitle: "micro:bit and the computer"
---

# A radio bridge

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**radio set group**: Picks a channel (0 to 255). Only micro:bits in the same group hear each other. Radio.

![radio set group](https://tutorials.learningwaypoints.com/_pictures/makecode/radio-set-group.png?v=c4ad40541593e499)

```makecode
radio.setGroup(1)
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

:::keep-together

**radio send value**: Sends a name and a number by radio, such as bin and 1. Radio.

![radio send value](https://tutorials.learningwaypoints.com/_pictures/makecode/radio-send-value.png?v=f4801ee9986f14b4)

```makecode
radio.sendValue("bin", 1)
```

:::

:::keep-together

**on radio received value**: Runs each time a name and number arrive by radio. Radio.

![on radio received value](https://tutorials.learningwaypoints.com/_pictures/makecode/on-radio-received-value.png?v=911c71e3c19c0e90)

```makecode
radio.onReceivedValue(function (name, value) {
    blocks
})
```

:::
