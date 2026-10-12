---
title: "Messages in the air: cheat sheet"
subtitle: "Secret messages"
---

# Messages in the air

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

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

**clear screen**: Turns every LED off. Basic › more › clear screen.

![clear screen](https://tutorials.learningwaypoints.com/_pictures/makecode/clear-screen.png?v=9a6a060da8000463)

```makecode
basic.clearScreen()
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

**if**: Runs the blocks inside only when the condition is true; does nothing when it is false. Logic.

![if](https://tutorials.learningwaypoints.com/_pictures/makecode/if.png?v=72087ebc2d4bdc6c)

```makecode
if (condition) {
    blocks
}
```

:::

:::keep-together

**function with a parameter**: A function with an input. Call it with a value: showScore(5). Functions › Add a parameter.

![function with a parameter](https://tutorials.learningwaypoints.com/_pictures/makecode/function-with-a-parameter.png?v=94223ef9f9942f02)

```makecode
function showScore (points: number) {
    blocks
}
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

**for index**: Runs the blocks inside once for each number from 0 up to the last one, with index set to that number each time. Loops.

![for index](https://tutorials.learningwaypoints.com/_pictures/makecode/for-index.png?v=2a2cf432ac29ec31)

```makecode
for (let index = 0; index <= 4; index++) {
    blocks
}
```

:::

:::keep-together

**letter at**: The letter at a place in a text. Places start at 0, as in a list. Text (char from … at).

![letter at](https://tutorials.learningwaypoints.com/_pictures/makecode/letter-at.png?v=874b73275cffc9f3)

```makecode
message.charAt(0)
```

:::

:::keep-together

**length of text**: How many letters (and spaces) a text has. The last letter is at place length − 1. Text.

![length of text](https://tutorials.learningwaypoints.com/_pictures/makecode/length-of-text.png?v=e95ddf9137cb9db2)

```makecode
message.length
```

:::

:::keep-together

**join**: Joins two texts, one after the other: "AB" + "C" is "ABC". Text (join).

![join](https://tutorials.learningwaypoints.com/_pictures/makecode/join.png?v=ff7bf449e2022960)

```makecode
result = letter + result
```

:::
