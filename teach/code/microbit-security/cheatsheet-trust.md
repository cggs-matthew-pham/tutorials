---
title: "Trust: cheat sheet"
subtitle: "Secret messages"
---

# Trust

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**pause**: Waits before the next block. 1000 ms is one second. Basic › pause.

![pause](https://tutorials.learningwaypoints.com/_pictures/makecode/pause.png?v=8d71eb319eab7f37)

```makecode
basic.pause(500)
```

:::

:::keep-together

**if else**: Exactly one part runs: the first when the condition is true, else the second. Click + on an if block.

![if else](https://tutorials.learningwaypoints.com/_pictures/makecode/if-else.png?v=3ce26c09e1d69482)

```makecode
if (condition) {
    blocks
} else {
    blocks
}
```

:::

:::keep-together

**else if**: Another question, asked only if the ones above were false. The first true one wins.

![else if](https://tutorials.learningwaypoints.com/_pictures/makecode/else-if.png?v=363b938687118320)

```makecode
} else if (condition) {
```

:::

:::keep-together

**pick random**: A random whole number from the first to the second, both included. Math.

![pick random](https://tutorials.learningwaypoints.com/_pictures/makecode/pick-random.png?v=4481696167f9ec86)

```makecode
randint(0, 10)
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
