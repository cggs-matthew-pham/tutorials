---
title: "Drive with a model: cheat sheet"
subtitle: "AI robots"
---

# Drive with a model

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**robot start**: Picks which robot you have. Put it first, in on start, before any other robot block. Robot › robot … start.

![robot start](https://tutorials.learningwaypoints.com/_pictures/makecode/robot-start.png?v=20bb4e92fb0e1d6c)

```makecode
robot.elecfreaksCuteBot.start()
```

:::

:::keep-together

**robot motor tank**: Sets the left and right wheel speeds, from −100 to 100. Same speeds go straight, opposite speeds spin, different speeds curve. The robot keeps going until another motor block.

![robot motor tank](https://tutorials.learningwaypoints.com/_pictures/makecode/robot-motor-tank.png?v=267ed27d58b05471)

```makecode
robot.motorTank(50, 50)
```

:::

:::keep-together

**robot motor stop**: Stops both wheels. End every move and every program that should finish with it.

![robot motor stop](https://tutorials.learningwaypoints.com/_pictures/makecode/robot-motor-stop.png?v=94ff757debd65bbc)

```makecode
robot.motorStop()
```

:::

:::keep-together

**robot set color**: Sets the robot's lights to a colour. Click the colour to choose another; black turns them off.

![robot set color](https://tutorials.learningwaypoints.com/_pictures/makecode/robot-set-color.png?v=4838be0688b10ec8)

```makecode
robot.setColor(0xff0000)
```

:::

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

**show icon**: Shows a ready-made picture. Basic › show icon; click the picture to choose another.

![show icon](https://tutorials.learningwaypoints.com/_pictures/makecode/show-icon.png?v=62c1c7fc8fc2feb3)

```makecode
basic.showIcon(IconNames.Heart)
```

:::

:::keep-together

**show string**: Scrolls a word or message across the screen. Basic › show string.

![show string](https://tutorials.learningwaypoints.com/_pictures/makecode/show-string.png?v=1f0bc8544ca55fd9)

```makecode
basic.showString("Hello")
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

**forever**: Runs the blocks inside again and again. Blocks in on start run only once.

![forever](https://tutorials.learningwaypoints.com/_pictures/makecode/forever.png?v=06c5a9f772195371)

```makecode
basic.forever(function () {
    blocks
})
```

:::

:::keep-together

**on button pressed**: Runs the blocks inside every time the button is pressed. Choose A, B or A+B. Input.

![on button pressed](https://tutorials.learningwaypoints.com/_pictures/makecode/on-button-pressed.png?v=3305e6718c737dc3)

```makecode
input.onButtonPressed(Button.A, function () {
    blocks
})
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

:::keep-together

**set variable**: Puts a value in a variable, throwing the old value away. Make the variable in Variables first.

![set variable](https://tutorials.learningwaypoints.com/_pictures/makecode/set-variable.png?v=6d8764e697ba50a8)

```makecode
let count = 0
```

:::

:::keep-together

**if**: Runs the blocks inside only when the condition is true; does nothing when it is false. Logic.

![if](https://tutorials.learningwaypoints.com/_pictures/makecode/if.png?v=72087ebc2d4bdc6c)

```makecode
if (condition) {
    blocks
}
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

**running time**: Milliseconds since the micro:bit switched on. Take one from a later one to time something. Input › more.

![running time](https://tutorials.learningwaypoints.com/_pictures/makecode/running-time.png?v=e93a58660d013d8e)

```makecode
input.runningTime()
```

:::

:::keep-together

**letter at**: The letter at a place in a text. Places start at 0, as in a list. Text (char from … at).

![letter at](https://tutorials.learningwaypoints.com/_pictures/makecode/letter-at.png?v=874b73275cffc9f3)

```makecode
message.charAt(0)
```

:::
