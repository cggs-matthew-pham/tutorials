---
title: "Remember and sense: cheat sheet"
subtitle: "micro:bit Foundations"
---

# Remember and sense

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**show number**: Shows a number; numbers above 9 scroll. Basic › show number.

![show number](https://tutorials.learningwaypoints.com/_pictures/makecode/show-number.png?v=a64f8810d68a8157)

```makecode
basic.showNumber(0)
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

**light level**: How bright it is: 0 (dark) to 255 (bright). Input.

![light level](https://tutorials.learningwaypoints.com/_pictures/makecode/light-level.png?v=98bf933f9fb35337)

```makecode
input.lightLevel()
```

:::

:::keep-together

**temperature**: How warm it is, in degrees Celsius. Input.

![temperature](https://tutorials.learningwaypoints.com/_pictures/makecode/temperature.png?v=c5bf20b2a9741321)

```makecode
input.temperature()
```

:::

:::keep-together

**plot bar graph**: Lights more LEDs for a bigger value. The second number is the biggest value. Led.

![plot bar graph](https://tutorials.learningwaypoints.com/_pictures/makecode/plot-bar-graph.png?v=afe06b13e3545c85)

```makecode
led.plotBarGraph(value, 255)
```

:::
