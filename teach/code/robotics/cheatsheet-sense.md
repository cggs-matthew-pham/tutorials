---
title: "Sense: cheat sheet"
subtitle: "Robotics challenges"
---

# Sense

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**robot motor tank**: Sets the left and right wheel speeds, from −100 to 100. Same speeds go straight, opposite speeds spin, different speeds curve. The robot keeps going until another motor block.

![robot motor tank](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/robot-motor-tank.png?v=267ed27d58b05471)

```makecode
robot.motorTank(50, 50)
```

:::

:::keep-together

**robot obstacle distance**: How far away the nearest thing in front is, in centimetres (up to 40; 40 means nothing in range). Read it again in forever to follow it.

![robot obstacle distance](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/robot-obstacle-distance.png?v=3a773f13431ecf24)

```makecode
robot.obstacleDistance()
```

:::

:::keep-together

**robot detect line**: True when that line sensor (left or right) is over the dark line. Steer towards the side that still sees it.

![robot detect line](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/robot-detect-line.png?v=96d6d29162fa0067)

```makecode
robot.detectLine(RobotLineDetector.Left)
```

:::

:::keep-together

**robot set color**: Sets the robot's lights to a colour. Click the colour to choose another; black turns them off.

![robot set color](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/robot-set-color.png?v=4838be0688b10ec8)

```makecode
robot.setColor(0xff0000)
```

:::

:::keep-together

**show icon**: Shows a ready-made picture. Basic › show icon; click the picture to choose another.

![show icon](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/show-icon.png?v=62c1c7fc8fc2feb3)

```makecode
basic.showIcon(IconNames.Heart)
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

**pick random**: A random whole number from the first to the second, both included. Math.

![pick random](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/pick-random.png?v=4481696167f9ec86)

```makecode
randint(0, 10)
```

:::
