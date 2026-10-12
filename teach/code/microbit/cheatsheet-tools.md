---
title: "Collections and tools: cheat sheet"
subtitle: "micro:bit Foundations"
---

# Collections and tools

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**list**: Many values in order under one name. Places start at 0. Advanced › Arrays.

![list](https://tutorials.learningwaypoints.com/_pictures/makecode/list.png?v=ee34909f625f5a53)

```makecode
let answers = ["Yes", "No"]
```

:::

:::keep-together

**get value at**: The item at a place in the list, counted from 0. Arrays.

![get value at](https://tutorials.learningwaypoints.com/_pictures/makecode/get-value-at.png?v=a1cc5a095ef3b5eb)

```makecode
answers[0]
```

:::

:::keep-together

**length of list**: How many items are in the list. The last place is the length − 1. Arrays.

![length of list](https://tutorials.learningwaypoints.com/_pictures/makecode/length-of-list.png?v=cacaaf90f3d9f82b)

```makecode
answers.length
```

:::

:::keep-together

**pick random**: A random whole number from the first to the second, both included. Math.

![pick random](https://tutorials.learningwaypoints.com/_pictures/makecode/pick-random.png?v=4481696167f9ec86)

```makecode
randint(0, 10)
```

:::

:::keep-together

**function**: A named job. Making it does not run it: a call block runs it. Advanced › Functions.

![function](https://tutorials.learningwaypoints.com/_pictures/makecode/function.png?v=48821160370c0df9)

```makecode
function name () {
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
