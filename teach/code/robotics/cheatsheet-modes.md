---
title: "Modes: cheat sheet"
subtitle: "Robotics challenges"
---

# Modes

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**robot play tone**: Plays a note on the robot's buzzer: a frequency (262 is middle C) for a time in milliseconds.

![robot play tone](https://tutorials.learningwaypoints.com/_pictures/makecode/robot-play-tone.png?v=02f04b7d5b466a3e)

```makecode
robot.playTone(262, 500)
```

:::

:::keep-together

**on logo pressed**: Runs its blocks when you touch the gold logo on the front of the micro:bit (V2 only; on a V1, use on shake). Input › on logo pressed.

![on logo pressed](https://tutorials.learningwaypoints.com/_pictures/makecode/on-logo-pressed.png?v=78cd7efb6c7a191c)

```makecode
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    
})
```

:::

:::keep-together

**show arrow**: Shows an arrow pointing a direction. Basic › more › show arrow.

![show arrow](https://tutorials.learningwaypoints.com/_pictures/makecode/show-arrow.png?v=76907d5b214db2c8)

```makecode
basic.showArrow(ArrowNames.West)
```

:::

:::keep-together

**on shake**: Runs the blocks inside every time the micro:bit is shaken (or tilted, if you choose another gesture). Input.

![on shake](https://tutorials.learningwaypoints.com/_pictures/makecode/on-shake.png?v=7a6d223834e5ea83)

```makecode
input.onGesture(Gesture.Shake, function () {
    blocks
})
```

:::
