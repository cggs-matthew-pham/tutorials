---
title: "Name a job: cheat sheet"
subtitle: "micro:bit: talk and play"
---

# Name a job

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

**show string**: Scrolls a word or message across the screen. Basic › show string.

![show string](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/show-string.png?v=1f0bc8544ca55fd9)

```makecode
basic.showString("Hello")
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

**on button pressed**: Runs the blocks inside every time the button is pressed. Choose A, B or A+B. Input.

![on button pressed](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/on-button-pressed.png?v=3305e6718c737dc3)

```makecode
input.onButtonPressed(Button.A, function () {
    blocks
})
```

:::

:::keep-together

**on shake**: Runs the blocks inside every time the micro:bit is shaken (or tilted, if you choose another gesture). Input.

![on shake](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/on-shake.png?v=7a6d223834e5ea83)

```makecode
input.onGesture(Gesture.Shake, function () {
    blocks
})
```

:::

:::keep-together

**list**: Many values in order under one name. Places start at 0. Advanced › Arrays.

![list](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/list.png?v=ee34909f625f5a53)

```makecode
let answers = ["Yes", "No"]
```

:::

:::keep-together

**get value at**: The item at a place in the list, counted from 0. Arrays.

![get value at](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/get-value-at.png?v=a1cc5a095ef3b5eb)

```makecode
answers[0]
```

:::

:::keep-together

**pick random**: A random whole number from the first to the second, both included. Math.

![pick random](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/pick-random.png?v=4481696167f9ec86)

```makecode
randint(0, 10)
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

:::keep-together

**shared code**: Send a place number; both micro:bits must hold the same list in the same order.

![shared code](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/shared-code.png?v=c62759be1085673d)

```makecode
let words = ["Hi", "Yes", "No"]
radio.onReceivedNumber(function (receivedNumber) {
    basic.showString(words[receivedNumber])
})
```

:::
