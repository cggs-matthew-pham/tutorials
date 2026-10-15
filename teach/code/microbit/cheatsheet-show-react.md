---
title: "Show and react: cheat sheet"
subtitle: "micro:bit Foundations"
---

# Show and react

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

**show number**: Shows a number; numbers above 9 scroll. Basic › show number.

![show number](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/show-number.png?v=a64f8810d68a8157)

```makecode
basic.showNumber(0)
```

:::

:::keep-together

**show arrow**: Shows an arrow pointing a direction. Basic › more › show arrow.

![show arrow](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/show-arrow.png?v=76907d5b214db2c8)

```makecode
basic.showArrow(ArrowNames.West)
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

**on shake**: Runs the blocks inside every time the micro:bit is shaken (or tilted, if you choose another gesture). Input.

![on shake](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/on-shake.png?v=7a6d223834e5ea83)

```makecode
input.onGesture(Gesture.Shake, function () {
    blocks
})
```

:::
