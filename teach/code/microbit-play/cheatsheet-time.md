---
title: "Time: cheat sheet"
subtitle: "micro:bit: talk and play"
---

# Time

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**show number**: Shows a number; numbers above 9 scroll. Basic › show number.

![show number](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/show-number.png?v=a64f8810d68a8157)

```makecode
basic.showNumber(0)
```

:::

:::keep-together

**forever**: Runs the blocks inside again and again. Blocks in on start run only once.

![forever](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/forever.png?v=06c5a9f772195371)

```makecode
basic.forever(function () {
    blocks
})
```

:::

:::keep-together

**animation**: Pictures inside forever repeat, in order. Each pause holds the picture before it.

![animation](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/animation.png?v=fb4ea14713a57b11)

```makecode
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.pause(500)
    basic.showIcon(IconNames.SmallHeart)
    basic.pause(500)
})
```

:::

:::keep-together

**running time**: Milliseconds since the micro:bit switched on. Take one from a later one to time something. Input › more.

![running time](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/running-time.png?v=e93a58660d013d8e)

```makecode
input.runningTime()
```

:::

:::keep-together

**time it**: Store running time at the start; later, running time − start is how long it took (ms).

![time it](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/time-it.png?v=c438835f572bf384)

```makecode
start = input.runningTime()
basic.showNumber(input.runningTime() - start)
```

:::

:::keep-together

**true or false**: A variable can hold true or false, to remember what is happening now. Logic.

![true or false](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/true-or-false.png?v=02e6650347e64f71)

```makecode
waiting = true
```

:::
