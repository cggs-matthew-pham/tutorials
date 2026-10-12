---
title: "Talk: cheat sheet"
subtitle: "Robotics challenges"
---

# Talk

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**play melody**: Plays notes on the micro:bit: a letter for each note, - for a rest, at a speed in beats per minute. Until done waits for the tune to end; in background moves on at once. Music › play melody.

![play melody](https://tutorials.learningwaypoints.com/_pictures/makecode/play-melody.png?v=913caed5baca3719)

```makecode
music.play(music.stringPlayable("C D E F G A B C5", 120), music.PlaybackMode.UntilDone)
```

:::

:::keep-together

**play tone**: Plays one note on the micro:bit for a number of beats. In background, so the program carries on. Music › play tone.

![play tone](https://tutorials.learningwaypoints.com/_pictures/makecode/play-tone.png?v=0e134e007839e702)

```makecode
music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
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

**show number**: Shows a number; numbers above 9 scroll. Basic › show number.

![show number](https://tutorials.learningwaypoints.com/_pictures/makecode/show-number.png?v=a64f8810d68a8157)

```makecode
basic.showNumber(0)
```

:::

:::keep-together

**pause**: Waits before the next block. 1000 ms is one second. Basic › pause.

![pause](https://tutorials.learningwaypoints.com/_pictures/makecode/pause.png?v=8d71eb319eab7f37)

```makecode
basic.pause(500)
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

**change variable**: Adds to a variable's value. Change by -1 counts down. Variables.

![change variable](https://tutorials.learningwaypoints.com/_pictures/makecode/change-variable.png?v=7d44ab57a8c081ee)

```makecode
count += 1
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

**radio send number**: Sends a number to every other micro:bit in the group. Radio.

![radio send number](https://tutorials.learningwaypoints.com/_pictures/makecode/radio-send-number.png?v=04657dd9e9e41723)

```makecode
radio.sendNumber(0)
```

:::

:::keep-together

**on radio received**: Runs each time a number arrives; receivedNumber holds it. Radio.

![on radio received](https://tutorials.learningwaypoints.com/_pictures/makecode/on-radio-received.png?v=d78e5c441ffede02)

```makecode
radio.onReceivedNumber(function (receivedNumber) {
    blocks
})
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

**true or false**: A variable can hold true or false, to remember what is happening now. Logic.

![true or false](https://tutorials.learningwaypoints.com/_pictures/makecode/true-or-false.png?v=02e6650347e64f71)

```makecode
waiting = true
```

:::
