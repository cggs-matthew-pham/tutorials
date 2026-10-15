---
title: "Talk over USB: cheat sheet"
subtitle: "micro:bit and the computer"
---

# Talk over USB

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**show icon**: Shows a ready-made picture. Basic › show icon; click the picture to choose another.

![show icon](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/show-icon.png?v=62c1c7fc8fc2feb3)

```makecode
basic.showIcon(IconNames.Heart)
```

:::

:::keep-together

**show leds**: Draw your own picture: click squares to light them (# is on). Basic › show leds.

![show leds](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/show-leds.png?v=d2388bb5780cba4a)

```makecode
basic.showLeds(`
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .
    `)
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

**clear screen**: Turns every LED off. Basic › more › clear screen.

![clear screen](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/clear-screen.png?v=9a6a060da8000463)

```makecode
basic.clearScreen()
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

**on button pressed**: Runs the blocks inside every time the button is pressed. Choose A, B or A+B. Input.

![on button pressed](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/on-button-pressed.png?v=3305e6718c737dc3)

```makecode
input.onButtonPressed(Button.A, function () {
    blocks
})
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

**light level**: How bright it is: 0 (dark) to 255 (bright). Input.

![light level](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/light-level.png?v=98bf933f9fb35337)

```makecode
input.lightLevel()
```

:::

:::keep-together

**temperature**: How warm it is, in degrees Celsius. Input.

![temperature](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/temperature.png?v=c5bf20b2a9741321)

```makecode
input.temperature()
```

:::

:::keep-together

**acceleration**: Tilt: x is left (below 0) and right (above 0), y is forward and back. Input › more.

![acceleration](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/acceleration.png?v=70ba2835f0b413c2)

```makecode
input.acceleration(Dimension.X)
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

**serial write value**: Sends a line such as light:128 down the USB cable. The board graphs it; MakeCode's simulator shows it under Show data. Serial.

![serial write value](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/serial-write-value.png?v=a994f99d4d065565)

```makecode
serial.writeValue("light", input.lightLevel())
```

:::

:::keep-together

**serial write line**: Sends a line of text down the USB cable. Serial.

![serial write line](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/serial-write-line.png?v=5c74f5582cc8927c)

```makecode
serial.writeLine("ok")
```

:::

:::keep-together

**on serial data received**: Runs each time a whole line arrives over USB (it ends with a new line). Serial.

![on serial data received](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/on-serial-data-received.png?v=79517be54efced9f)

```makecode
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    blocks
})
```

:::

:::keep-together

**serial read line**: The line that arrived, as text, without its new line. Use it inside on serial data received. Serial.

![serial read line](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/serial-read-line.png?v=a565ae306bff7655)

```makecode
serial.readLine()
```

:::
