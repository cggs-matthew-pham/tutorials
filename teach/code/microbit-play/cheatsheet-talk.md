---
title: "Talk: cheat sheet"
subtitle: "micro:bit: talk and play"
---

# Talk

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**show arrow**: Shows an arrow pointing a direction. Basic › more › show arrow.

![show arrow](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/show-arrow.png?v=76907d5b214db2c8)

```makecode
basic.showArrow(ArrowNames.West)
```

:::

:::keep-together

**set variable**: Puts a value in a variable, throwing the old value away. Make the variable in Variables first.

![set variable](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/set-variable.png?v=6d8764e697ba50a8)

```makecode
let count = 0
```

:::

:::keep-together

**change variable**: Adds to a variable's value. Change by -1 counts down. Variables.

![change variable](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/change-variable.png?v=7d44ab57a8c081ee)

```makecode
count += 1
```

:::

:::keep-together

**counter**: Set the start value once, in on start. change adds to whatever the variable holds now.

![counter](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/counter.png?v=e639875d423eb8ca)

```makecode
let count = 0
input.onButtonPressed(Button.A, function () {
    count += 1
    basic.showNumber(count)
})
```

:::

:::keep-together

**if**: Runs the blocks inside only when the condition is true; does nothing when it is false. Logic.

![if](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/if.png?v=72087ebc2d4bdc6c)

```makecode
if (condition) {
    blocks
}
```

:::

:::keep-together

**if else**: Exactly one part runs: the first when the condition is true, else the second. Click + on an if block.

![if else](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/if-else.png?v=3ce26c09e1d69482)

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

![else if](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/else-if.png?v=363b938687118320)

```makecode
} else if (condition) {
```

:::

:::keep-together

**length of list**: How many items are in the list. The last place is the length − 1. Arrays.

![length of list](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/length-of-list.png?v=cacaaf90f3d9f82b)

```makecode
answers.length
```

:::

:::keep-together

**radio set group**: Picks a channel (0 to 255). Only micro:bits in the same group hear each other. Radio.

![radio set group](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/radio-set-group.png?v=c4ad40541593e499)

```makecode
radio.setGroup(1)
```

:::

:::keep-together

**radio send number**: Sends a number to every other micro:bit in the group. Radio.

![radio send number](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/radio-send-number.png?v=04657dd9e9e41723)

```makecode
radio.sendNumber(0)
```

:::

:::keep-together

**on radio received**: Runs each time a number arrives; receivedNumber holds it. Radio.

![on radio received](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/on-radio-received.png?v=d78e5c441ffede02)

```makecode
radio.onReceivedNumber(function (receivedNumber) {
    blocks
})
```

:::

:::keep-together

**which message**: One on radio received gets every message; receivedNumber says which one arrived.

![which message](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/which-message.png?v=fdaaac2c254ff19c)

```makecode
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        blocks
    } else if (receivedNumber == 2) {
        blocks
    }
})
```

:::

:::keep-together

**radio send string**: Sends a word to every other micro:bit in the group. Radio.

![radio send string](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/radio-send-string.png?v=e8f49054b7d9de37)

```makecode
radio.sendString("hi")
```

:::

:::keep-together

**on radio received string**: Runs each time a word arrives; receivedString holds it. Radio.

![on radio received string](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/on-radio-received-string.png?v=2e4be96fbc6f9840)

```makecode
radio.onReceivedString(function (receivedString) {
    blocks
})
```

:::
