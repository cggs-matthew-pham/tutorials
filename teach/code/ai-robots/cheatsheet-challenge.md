---
title: "Final challenge: Delivery robot: cheat sheet"
subtitle: "AI robots"
---

# Final challenge: Delivery robot

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**robot obstacle distance**: How far away the nearest thing in front is, in centimetres (up to 40; 40 means nothing in range). Read it again in forever to follow it.

![robot obstacle distance](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/robot-obstacle-distance.png?v=3a773f13431ecf24)

```makecode
robot.obstacleDistance()
```

:::

:::keep-together

**show number**: Shows a number; numbers above 9 scroll. Basic › show number.

![show number](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/show-number.png?v=a64f8810d68a8157)

```makecode
basic.showNumber(0)
```

:::

:::keep-together

**pause**: Waits before the next block. 1000 ms is one second. Basic › pause.

![pause](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/pause.png?v=8d71eb319eab7f37)

```makecode
basic.pause(500)
```

:::

:::keep-together

**true or false**: A variable can hold true or false, to remember what is happening now. Logic.

![true or false](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/true-or-false.png?v=02e6650347e64f71)

```makecode
waiting = true
```

:::

:::keep-together

**radio send value**: Sends a name and a number by radio, such as bin and 1. Radio.

![radio send value](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/radio-send-value.png?v=f4801ee9986f14b4)

```makecode
radio.sendValue("bin", 1)
```

:::
