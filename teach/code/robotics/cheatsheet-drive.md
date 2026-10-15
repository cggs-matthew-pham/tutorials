---
title: "Drive: cheat sheet"
subtitle: "Robotics challenges"
---

# Drive

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**robot start**: Picks which robot you have. Put it first, in on start, before any other robot block. Robot › robot … start.

![robot start](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/robot-start.png?v=20bb4e92fb0e1d6c)

```makecode
robot.elecfreaksCuteBot.start()
```

:::

:::keep-together

**robot motor tank for a time**: The same, then waits that many milliseconds before the next block. Click + on the block to add the time. It does not stop the motors: follow it with robot motor stop.

![robot motor tank for a time](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/robot-motor-tank-for-a-time.png?v=65425f1cdae2e94e)

```makecode
robot.motorTank(50, -50, 500)
```

:::

:::keep-together

**robot motor stop**: Stops both wheels. End every move and every program that should finish with it.

![robot motor stop](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/robot-motor-stop.png?v=94ff757debd65bbc)

```makecode
robot.motorStop()
```

:::

:::keep-together

**on button pressed**: Runs the blocks inside every time the button is pressed. Choose A, B or A+B. Input.

![on button pressed](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/on-button-pressed.png?v=3305e6718c737dc3)

```makecode
input.onButtonPressed(Button.A, function () {
    blocks
})
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

**function**: A named job. Making it does not run it: a call block runs it. Advanced › Functions.

![function](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/function.png?v=48821160370c0df9)

```makecode
function name () {
    blocks
}
```

:::
